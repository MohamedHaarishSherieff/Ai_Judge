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

  // 1. CONSTITUTIONAL LAW (Supreme Court of India / High Court Writ Bench)
  if (caseType.toLowerCase().includes('constitutional')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Senior Counsel (Petitioner)';
      roleSystemPrompt = `You are Senior Advocate for the Petitioner before the ${courtLevel}.
You are challenging state action under Article 32/226 for violation of Fundamental Rights (Articles 14, 19, 21).
Directly deliver a formal oral submission in 2 to 3 powerful sentences.
Cite landmark Supreme Court authorities such as K.S. Puttaswamy (2017), Maneka Gandhi (1978), or Kesavananda Bharati (1973).
Argue that the impugned action fails the four-pronged proportionality test.`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Solicitor General / State Counsel';
      roleSystemPrompt = `You are Law Officer representing the Union of India / State Authority before the ${courtLevel}.
Directly deliver an oral defense in 2 to 3 powerful sentences.
Argue that state measures pursue a legitimate sovereign aim under reasonable restrictions (Art 19(2)), national security, or valid statutory classification under Article 14.`;
    } else {
      speakerName = 'Chief Presiding Judicial Officer';
      roleSystemPrompt = `You are the Presiding Judge of the Constitution Bench of the ${courtLevel}.
Deliver an authoritative bench order in 2 to 3 sentences under Article 142.
Balance state security against fundamental civil liberties and issue binding procedural directions to the Attorney General and Petitioner.`;
    }
  }
  // 2. CRIMINAL MATTER (Sessions / High Court Criminal Appellate Bench)
  else if (caseType.toLowerCase().includes('criminal') || caseType.toLowerCase().includes('crime')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Public Prosecutor (State)';
      roleSystemPrompt = `You are the Public Prosecutor representing the State before the ${courtLevel}.
Directly deliver your oral arguments in 2 to 3 sentences under the Bharatiya Nyaya Sanhita, 2023 (BNS) and Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS).
Oppose bail under Section 480 BNSS or press for framing of charges based on prima facie witness testimony and forensic chain of custody.`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Senior Criminal Defense Counsel';
      roleSystemPrompt = `You are Senior Defense Counsel representing the Accused before the ${courtLevel}.
Directly deliver your oral objection in 2 to 3 sentences under Section 480 BNSS.
Assert the fundamental presumption of innocence, lack of direct evidentiary nexus, and satisfaction of triple test criteria for grant of bail per Arnesh Kumar / Satender Kumar Antil precedents.`;
    } else {
      speakerName = 'Presiding Sessions / Criminal Judge';
      roleSystemPrompt = `You are the Presiding Judicial Magistrate / Sessions Judge of the ${courtLevel}.
Deliver an authoritative judicial ruling in 2 to 3 sentences.
Rule on the regular bail petition under Section 480 BNSS, imposing strict conditions (surety, passport deposit, attendance before investigating officer).`;
    }
  }
  // 3. CIVIL DISPUTE (District Court / High Court Civil Division)
  else if (caseType.toLowerCase().includes('civil') || caseType.toLowerCase().includes('property')) {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Advocate for Plaintiff';
      roleSystemPrompt = `You are Counsel for the Plaintiff before the ${courtLevel}.
Directly deliver oral pleadings in 2 to 3 sentences under the Code of Civil Procedure, 1908 (Order XXXIX Rules 1 & 2) and Specific Relief Act, 1963.
Demonstrate a prima facie case, balance of convenience, and imminent threat of irreparable loss to property rights.`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Advocate for Defendant';
      roleSystemPrompt = `You are Counsel for the Defendant before the ${courtLevel}.
Directly deliver oral objection in 2 to 3 sentences under Order XXXIX CPC.
Argue that the Plaintiff has suppressed material facts, that balance of convenience favors the Defendant, and that any alleged loss is compensable in monetary damages.`;
    } else {
      speakerName = 'Senior Civil Judge';
      roleSystemPrompt = `You are the Senior Civil Judge of the ${courtLevel}.
Deliver an authoritative judicial order in 2 to 3 sentences under Order XXXIX CPC.
Grant an ad-interim status quo or temporary injunction order pending trial, directing maintenance of spot possession.`;
    }
  }
  // 4. CORPORATE & COMMERCIAL
  else {
    if (speakerRole === 'petitioner_counsel') {
      speakerName = 'Senior Commercial Advocate';
      roleSystemPrompt = `You are Senior Counsel for the Petitioner before the Commercial Division of the ${courtLevel}.
Directly advance formal arguments in 2 to 3 sentences under Section 74 of the Indian Contract Act, 1872 and Section 63 BSA.
Argue that contractual breach is proved by electronic records and entitles the Petitioner to stipulated liquidated damages.`;
    } else if (speakerRole === 'respondent_counsel') {
      speakerName = 'Commercial Defense Counsel';
      roleSystemPrompt = `You are Defense Counsel before the Commercial Division of the ${courtLevel}.
Directly deliver an oral objection in 2 to 3 sentences citing Kailash Nath Associates v. DDA.
Argue that Section 74 prohibits penal windfalls and requires strict proof of actual loss.`;
    } else {
      speakerName = 'Commercial Division Bench Magistrate';
      roleSystemPrompt = `You are the Commercial Division Presiding Judge of the ${courtLevel}.
Deliver an authoritative bench order in 2 to 3 sentences under Order XX CPC and Commercial Courts Act, 2015.
Adjudicate on liquidated damages and admissibility of electronic exhibits.`;
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
        temperature: 0.6
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Baseten API error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const choice = data.choices?.[0];
    const message = choice?.message || {};
    const content = message.content || '';
    const reasoning = message.reasoning_content || '';

    // Clean up content
    let finalArgument = content.trim();
    if (finalArgument.startsWith('"') && finalArgument.endsWith('"')) {
      finalArgument = finalArgument.slice(1, -1).trim();
    }

    // If content is empty because reasoning consumed tokens, extract any quoted draft from reasoning
    if (!finalArgument && reasoning) {
      const quoteMatches = reasoning.match(/"([^"]{40,})"/g);
      if (quoteMatches && quoteMatches.length > 0) {
        finalArgument = quoteMatches[quoteMatches.length - 1].replace(/^"|"$/g, '').trim();
      }
    }

    // Filter out accidental scratchpad or counting lines
    const isScratchpad =
      !finalArgument ||
      /^(let's|count sentences|sentence \d|check for|that's \d|we need to|draft:)/i.test(finalArgument);

    if (isScratchpad) {
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
            ? 'ORDER OF THE BENCH: Having evaluated the pleadings and digital records under Section 63 BSA, the objection is OVERRULED. The matter stands posted for decree formalization.'
            : speakerRole === 'petitioner_counsel'
            ? 'May it please Your Lordship, the record conclusively establishes breach of legal obligations under statutory provisions, entitling the Petitioner to immediate decree.'
            : 'Objection, Your Honour! The Petitioner has failed to satisfy the mandatory threshold requirements established under settled Supreme Court jurisprudence.';
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
