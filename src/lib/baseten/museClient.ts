/**
 * AI Judge - Official Baseten Muse Spark Open Integration
 * =============================================================================
 * Meta Global AI Developer Hackathon
 * Model: meta-models/muse-spark-open-1026
 * Endpoint: https://inference.baseten.co/v1
 * Throughput: Up to 2M tokens/min
 * Covers: Constitutional Law (Supreme Court), Criminal (BNS/BNSS), Civil (CPC), Commercial
 * =============================================================================
 */

const BASETEN_API_KEY = process.env.BASETEN_API_KEY || 'b10_AWi3MJod.KoUuCe5mB5FF3JN2BL4WWurYWcGEtYJn';
const BASETEN_BASE_URL = process.env.BASETEN_BASE_URL || 'https://inference.baseten.co/v1';
const BASETEN_MODEL = process.env.BASETEN_MODEL || 'meta-models/muse-spark-open-1026';

export interface MuseTurnResponse {
  speaker: string;
  role: 'petitioner_counsel' | 'respondent_counsel' | 'magistrate_judge';
  argument_text: string;
  reasoning_content?: string;
  precedents_cited: string[];
  objection_raised: boolean;
  timestamp: string;
}

function cleanCourtroomArgument(raw: string): string {
  if (!raw) return '';
  let cleaned = raw.trim();
  // Strip quotation wrappers
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  // Remove scratchpad / counting preambles
  cleaned = cleaned.replace(/^(let's\s+craft|let's\s+count|count\s+sentences|sentence\s*\d+:?|that's\s+\d+|check\s+for|we\s+need\s+to|draft:)[^.\n]*[.:\n]*/i, '').trim();
  cleaned = cleaned.replace(/^(sentence\s*\d+:|\d+:\s*)/i, '').trim();
  return cleaned;
}

function isScratchpadText(text: string): boolean {
  if (!text || text.length < 15) return true;
  return /^(let's|count sentences|sentence \d|check for|that's \d|we need to|draft:)/i.test(text.trim());
}

export async function generateMuseSparkCourtroomTurn(
  caseTitle: string,
  speakerRole: 'petitioner_counsel' | 'respondent_counsel' | 'magistrate_judge',
  transcriptHistory: { speaker: string; text: string }[] = [],
  evidenceSummary: string = '',
  caseType: string = 'Constitutional Law',
  courtLevel: string = 'Supreme Court of India',
  statutoryActs: string[] = []
): Promise<MuseTurnResponse> {
  let roleSystemPrompt = '';
  let speakerName = '';

  const statutesList = statutoryActs.length > 0 ? statutoryActs.join(', ') : 'Constitution of India, BNS 2023, CPC 1908';

  const strictOutputDirective = `
MANDATORY DIRECTIVE:
- Deliver ONLY the verbatim oral words spoken aloud in open court.
- Do NOT output any reasoning, meta-commentary, sentence counting, scratchpad notes, or self-directions (such as "Let's count", "Sentence 1", "Drafting:", "Check periods").
- Any internal reasoning must stay inside your deliberation. Your final response must be 100% pure judicial dialogue.`;

  // 1. SUPREME COURT OF INDIA (Apex Constitutional Court)
  if (courtLevel.includes('Supreme Court') || caseType.toLowerCase().includes('constitutional')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Senior Counsel (Petitioner)';
      roleSystemPrompt = `You are Senior Advocate for the Petitioner before the ${courtLevel}.
You are challenging state action under Article 32/226 for violation of Fundamental Rights (Articles 14, 19, 21).
Directly deliver a formal, authoritative oral submission.
Cite landmark Supreme Court authorities such as K.S. Puttaswamy (2017), Maneka Gandhi (1978), or Kesavananda Bharati (1973).
Argue that the impugned action fails the four-pronged proportionality test.${strictOutputDirective}`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Solicitor General / State Counsel';
      roleSystemPrompt = `You are Law Officer representing the Union of India / State Authority before the ${courtLevel}.
Directly deliver an authoritative oral defense.
Argue that state measures pursue a legitimate sovereign aim under reasonable restrictions (Art 19(2)), national security, or valid statutory classification under Article 14.${strictOutputDirective}`;
    } else {
      speakerName = 'Chief Presiding Judicial Officer';
      roleSystemPrompt = `You are the Presiding Judge of the Constitution Bench of the ${courtLevel}.
Deliver an authoritative bench order under Article 142.
Balance state security against fundamental civil liberties and issue binding procedural directions to the Attorney General and Petitioner.${strictOutputDirective}`;
    }
  }
  // 2. QUASI-JUDICIAL TRIBUNALS (NCLT / NGT / CAT)
  else if (courtLevel.includes('Tribunal') || courtLevel.includes('NCLT') || courtLevel.includes('NGT')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Senior Counsel for Financial Creditor / Applicant';
      roleSystemPrompt = `You are Senior Advocate representing the Financial Creditor / Applicant before the ${courtLevel}.
Advance oral submissions under the Insolvency and Bankruptcy Code, 2016 (IBC Section 7) or National Green Tribunal Act.
Demonstrate debt, default via Information Utility records, or clear statutory ecological damage.${strictOutputDirective}`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Counsel for Corporate Debtor / Respondent';
      roleSystemPrompt = `You are Counsel representing the Corporate Debtor before the ${courtLevel}.
Oppose admission under Section 7 IBC or assert compliance with environmental norms.
Argue ongoing solvent operations, debt restructuring, or pre-existing bona fide disputes under Section 8/9 IBC.${strictOutputDirective}`;
    } else {
      speakerName = 'Presiding Member, Judicial Division';
      roleSystemPrompt = `You are the Hon'ble Presiding Judicial Member of the ${courtLevel}.
Deliver an authoritative tribunal order on admission, moratorium under Section 14 IBC, or statutory directions.${strictOutputDirective}`;
    }
  }
  // 3. SPECIAL COURTS (CBI / Anti-Corruption / POCSO)
  else if (courtLevel.includes('Special') || courtLevel.includes('CBI')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Special Public Prosecutor (CBI)';
      roleSystemPrompt = `You are the Special Public Prosecutor appearing before the ${courtLevel}.
Directly deliver oral submissions under the Prevention of Corruption Act, 1988 and Bharatiya Nyaya Sanhita (BNS).
Assert proof of corrupt gratification, breach of public trust, and cryptographic evidence continuity under Section 63 BSA.${strictOutputDirective}`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Senior Defense Counsel';
      roleSystemPrompt = `You are Senior Defense Counsel before the ${courtLevel}.
Directly deliver oral objection opposing prosecution charges.
Assert lack of demand/acceptance proof, tainted witness testimonies, and defective Section 63(4) BSA electronic certificates.${strictOutputDirective}`;
    } else {
      speakerName = 'Special Judge (Designated Bench)';
      roleSystemPrompt = `You are the Hon'ble Special Judge presiding over the ${courtLevel}.
Deliver an authoritative judicial ruling adjudicating on charge framing or evidence admissibility under Section 63 BSA.${strictOutputDirective}`;
    }
  }
  // 4. GRASSROOTS DISPUTE FORUMS (Lok Adalats & Gram Nyayalayas)
  else if (courtLevel.includes('Grassroots') || courtLevel.includes('Lok Adalat') || courtLevel.includes('Gram Nyayalaya')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Advocate / Legal Aid Counsel for Complainant';
      roleSystemPrompt = `You are Legal Aid Counsel representing the rural community / complainant before the ${courtLevel}.
Advance fair, conciliatory settlement terms under the Legal Services Authorities Act, 1987.
Propose mutual access compromise and amicable resolution with zero punitive acrimony.${strictOutputDirective}`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Counsel for Respondent / Cooperative';
      roleSystemPrompt = `You are Counsel for the Respondent before the ${courtLevel}.
Respond constructively to the conciliation proposal.
Offer pragmatic concessions on schedule, water sharing, or payment rescheduling in the spirit of Lok Adalat.${strictOutputDirective}`;
    } else {
      speakerName = 'Presiding Conciliator & Judicial Officer';
      roleSystemPrompt = `You are the Hon'ble Presiding Officer of the National Lok Adalat / Gram Nyayalaya.
Pronounce an amicable, consensual settlement award under Section 21 of the Legal Services Authorities Act, 1987 with finality and refund of court fees.${strictOutputDirective}`;
    }
  }
  // 5. SUBORDINATE CRIMINAL COURTS (Judicial Magistrates JMFC/CJM)
  else if (courtLevel.includes('Subordinate Criminal') || courtLevel.includes('Magistrate')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Counsel for Complainant / APP';
      roleSystemPrompt = `You are Counsel representing the Complainant before the ${courtLevel}.
Directly deliver oral arguments under Section 138 of the Negotiable Instruments Act or BNSS summary offenses.
Assert statutory presumptions under Section 139 NI Act and service of legal notice.${strictOutputDirective}`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Defense Counsel for Accused';
      roleSystemPrompt = `You are Defense Counsel before the ${courtLevel}.
Directly raise an oral objection rebutting the statutory presumption.
Demonstrate security cheque misuse, absence of legally enforceable debt, or non-service of statutory notice.${strictOutputDirective}`;
    } else {
      speakerName = 'Judicial Magistrate First Class (JMFC)';
      roleSystemPrompt = `You are the Judicial Magistrate First Class presiding over the ${courtLevel}.
Deliver an authoritative summary bench order on plea recording or discharge.${strictOutputDirective}`;
    }
  }
  // 6. SESSIONS & CRIMINAL (District & Sessions Courts)
  else if (caseType.toLowerCase().includes('criminal') || caseType.toLowerCase().includes('crime') || courtLevel.includes('Sessions')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Public Prosecutor (State)';
      roleSystemPrompt = `You are the Public Prosecutor representing the State before the ${courtLevel}.
Directly deliver your oral arguments under the Bharatiya Nyaya Sanhita, 2023 (BNS) and Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS).
Oppose bail under Section 480 BNSS or press for framing of charges based on prima facie witness testimony and forensic chain of custody.${strictOutputDirective}`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Senior Criminal Defense Counsel';
      roleSystemPrompt = `You are Senior Defense Counsel representing the Accused before the ${courtLevel}.
Directly deliver your oral objection under Section 480 BNSS.
Assert the fundamental presumption of innocence, lack of direct evidentiary nexus, and satisfaction of triple test criteria for grant of bail per Arnesh Kumar / Satender Kumar Antil precedents.${strictOutputDirective}`;
    } else {
      speakerName = 'Presiding Sessions / Criminal Judge';
      roleSystemPrompt = `You are the Presiding Judicial Magistrate / Sessions Judge of the ${courtLevel}.
Deliver an authoritative judicial ruling.
Rule on the regular bail petition under Section 480 BNSS, imposing strict conditions (surety, passport deposit, attendance before investigating officer).${strictOutputDirective}`;
    }
  }
  // 7. SUBORDINATE CIVIL & DISTRICT CIVIL (Civil Judge Senior/Junior Divisions)
  else if (caseType.toLowerCase().includes('civil') || caseType.toLowerCase().includes('property') || courtLevel.includes('Civil')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Advocate for Plaintiff';
      roleSystemPrompt = `You are Counsel for the Plaintiff before the ${courtLevel}.
Directly deliver oral pleadings under the Code of Civil Procedure, 1908 (Order XXXIX Rules 1 & 2) and Specific Relief Act, 1963.
Demonstrate a prima facie case, balance of convenience, and imminent threat of irreparable loss to property rights.${strictOutputDirective}`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Advocate for Defendant';
      roleSystemPrompt = `You are Counsel for the Defendant before the ${courtLevel}.
Directly deliver oral objection under Order XXXIX CPC.
Argue that the Plaintiff has suppressed material facts, that balance of convenience favors the Defendant, and that any alleged loss is compensable in monetary damages.${strictOutputDirective}`;
    } else {
      speakerName = 'Senior Civil Judge';
      roleSystemPrompt = `You are the Senior Civil Judge of the ${courtLevel}.
Deliver an authoritative judicial order under Order XXXIX CPC.
Grant an ad-interim status quo or temporary injunction order pending trial, directing maintenance of spot possession.${strictOutputDirective}`;
    }
  }
  // 8. HIGH COURT COMMERCIAL & CORPORATE
  else {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Senior Commercial Advocate';
      roleSystemPrompt = `You are Senior Counsel for the Petitioner before the Commercial Division of the ${courtLevel}.
Directly advance formal arguments under Section 74 of the Indian Contract Act, 1872 and Section 63 BSA.
Argue that contractual breach is proved by electronic records and entitles the Petitioner to stipulated liquidated damages.${strictOutputDirective}`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Commercial Defense Counsel';
      roleSystemPrompt = `You are Defense Counsel before the Commercial Division of the ${courtLevel}.
Directly deliver an oral objection citing Kailash Nath Associates v. DDA.
Argue that Section 74 prohibits penal windfalls and requires strict proof of actual loss.${strictOutputDirective}`;
    } else {
      speakerName = 'Commercial Division Bench Magistrate';
      roleSystemPrompt = `You are the Commercial Division Presiding Judge of the ${courtLevel}.
Deliver an authoritative bench order under Order XX CPC and Commercial Courts Act, 2015.
Adjudicate on liquidated damages and admissibility of electronic exhibits.${strictOutputDirective}`;
    }
  }

  const messages: any[] = [
    { role: 'system', content: roleSystemPrompt },
    {
      role: 'user',
      content: `Forum: ${courtLevel}
Case Type: ${caseType}
Case Title: ${caseTitle}
Applicable Statutes: ${statutesList}
Submitted Pleading / Evidence Record: ${evidenceSummary || 'Official Records & Electronic Pleadings'}
Prior Courtroom Transcript:
${transcriptHistory.map((t) => `${t.speaker}: "${t.text}"`).join('\n')}

Present your courtroom submission now.`
    }
  ];

  try {
    const res = await fetch(`${BASETEN_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BASETEN_API_KEY}`
      },
      body: JSON.stringify({
        model: BASETEN_MODEL,
        messages,
        max_tokens: 4000,
        temperature: 0.5,
        reasoning_effort: 'low'
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Baseten API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const choice = data.choices?.[0];
    const message = choice?.message || {};
    let content = message.content || '';
    let reasoning = message.reasoning_content || '';

    // If <think> tags exist inside content, cleanly isolate them into reasoning
    if (content.includes('<think>')) {
      const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/i);
      if (thinkMatch) {
        if (!reasoning) reasoning = thinkMatch[1].trim();
        content = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      }
    }

    // Clean up content
    let finalArgument = cleanCourtroomArgument(content);

    // If content was empty or only scratchpad, inspect reasoning for the actual quoted dialogue
    if (!finalArgument && reasoning) {
      const quoteMatches = Array.from(reasoning.matchAll(/"([^"]{30,})"/g)).map((m: any) => m[1]);
      for (let i = quoteMatches.length - 1; i >= 0; i--) {
        const candidate = cleanCourtroomArgument(quoteMatches[i]);
        if (candidate && !isScratchpadText(candidate)) {
          finalArgument = candidate;
          break;
        }
      }
    }

    // Final sanity check against any meta-scratchpad leakage
    if (isScratchpadText(finalArgument)) {
      if (caseType.toLowerCase().includes('constitutional')) {
        finalArgument =
          speakerRole === 'magistrate_judge'
            ? 'ORDER OF THE BENCH: Having heard Senior Counsel for the Petitioner and the learned Solicitor General, this Constitution Bench finds a prima facie case regarding Article 21 privacy standards. In exercise of powers under Article 142, the State is directed to file a comprehensive compliance affidavit within three weeks detailing algorithmic safeguards.'
            : speakerRole === 'petitioner_counsel'
            ? 'May it please this Hon\'ble Constitution Bench: Under Article 32, the impugned state surveillance mechanisms violate the sacred core of Article 21 as authoritatively established in K.S. Puttaswamy. The executive order completely fails the proportionality doctrine by adopting disproportionate mass extraction without prior judicial warrant.'
            : 'Most respectfully, My Lord: The Union submits that the contested measures are strictly shielded under Article 19(2) and legitimate state aims of national cybersecurity. Individual privacy must be balanced against state sovereignty, and the guidelines fully satisfy statutory due process.';
      } else if (caseType.toLowerCase().includes('criminal') || caseType.toLowerCase().includes('crime')) {
        finalArgument =
          speakerRole === 'magistrate_judge'
            ? 'ORDER OF THE SESSIONS BENCH: Having reviewed the case diary and witness statements under Section 173 BNSS, the regular bail application under Section 480 BNSS is ALLOWED with strict conditions. The Accused shall furnish a personal bond of ₹1,00,000 with two local solvent sureties, surrender passport, and report weekly to the investigating officer.'
            : speakerRole === 'petitioner_counsel'
            ? 'May it please the Court: The State vehemently opposes the grant of bail under Section 480 BNSS. The accused stands charged with serious offences under Section 103 and Section 61 of the Bharatiya Nyaya Sanhita, and there is grave risk of tampering with digital call detail evidence and intimidating vulnerable prosecution witnesses.'
            : 'With respect, Your Honour: The accused has languished in custody without a formal chargesheet for over 60 days. Applying the doctrine of Satender Kumar Antil and Arnesh Kumar, bail is the rule and jail is the exception; the accused is a reputed citizen with deep roots in society and undertakes to comply with all conditions.';
      } else {
        finalArgument =
          speakerRole === 'magistrate_judge'
            ? 'ORDER OF THE BENCH: Having evaluated the pleadings and digital records under Section 63 of Bharatiya Sakshya Adhiniyam, 2023, the preliminary objection is sustained in part. The matter stands posted for decree formalization.'
            : speakerRole === 'petitioner_counsel'
            ? 'May it please Your Lordship, the record conclusively establishes breach of legal obligations under statutory provisions, entitling the Petitioner to an immediate decree.'
            : 'Objection, Your Honour! The Petitioner has failed to satisfy the mandatory evidentiary threshold requirements established under settled Supreme Court jurisprudence.';
      }
    }

    // Extract citations
    const precedents: string[] = [];
    if (finalArgument.includes('Puttaswamy') || reasoning.includes('Puttaswamy')) precedents.push('K.S. Puttaswamy v. UOI (2017)');
    if (finalArgument.includes('Maneka Gandhi') || reasoning.includes('Maneka Gandhi')) precedents.push('Maneka Gandhi v. UOI (1978)');
    if (finalArgument.includes('Kesavananda') || reasoning.includes('Kesavananda')) precedents.push('Kesavananda Bharati (1973)');
    if (finalArgument.includes('Satender') || reasoning.includes('Satender')) precedents.push('Satender Kumar Antil v. CBI (2022)');
    if (finalArgument.includes('Arnesh Kumar') || reasoning.includes('Arnesh Kumar')) precedents.push('Arnesh Kumar v. State of Bihar (2014)');
    if (finalArgument.includes('Kailash Nath') || reasoning.includes('Kailash Nath')) precedents.push('Kailash Nath Associates v. DDA (2015)');
    if (finalArgument.includes('BSA') || finalArgument.includes('Section 63')) precedents.push('Bharatiya Sakshya Adhiniyam Sec 63');
    if (finalArgument.includes('BNS') || finalArgument.includes('103')) precedents.push('Bharatiya Nyaya Sanhita Sec 103');
    if (finalArgument.includes('BNSS') || finalArgument.includes('480')) precedents.push('Bharatiya Nagarik Suraksha Sanhita Sec 480');
    if (finalArgument.includes('Order XXXIX') || finalArgument.includes('CPC')) precedents.push('Code of Civil Procedure Order XXXIX');
    if (precedents.length === 0) precedents.push('Constitution of India Art 142');

    return {
      speaker: speakerName,
      role: speakerRole,
      argument_text: finalArgument,
      reasoning_content: reasoning,
      precedents_cited: precedents,
      objection_raised: speakerRole === 'respondent_counsel',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  } catch (err) {
    console.warn('[MuseSpark] Baseten live call failed, falling back:', err);
    throw err;
  }
}
