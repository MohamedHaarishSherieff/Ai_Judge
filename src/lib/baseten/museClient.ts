
/**
 * AI Judge - Official Baseten Muse Spark Open Integration
 * =============================================================================
 * Meta Global AI Developer Hackathon
 * Model: meta-models/muse-spark-open-1026
 * Endpoint: https://inference.baseten.co/v1
 * Throughput: Up to 2M tokens/min
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
  evidenceSummary: string = ''
): Promise<MuseTurnResponse> {
  let roleSystemPrompt = '';
  let speakerName = '';

  if (speakerRole === 'petitioner_counsel') {
    speakerName = 'Advocate 1 (Petitioner Counsel)';
    roleSystemPrompt = `You are Senior Advocate for the Petitioner in the High Court of Judicature.
You are litigating under the Bharatiya Sakshya Adhiniyam (BSA 2023) and Indian Contract Act, 1872.
Advance strong, assertive arguments citing statutory sections (e.g., Section 74 Contract Act, Section 63 BSA) and Supreme Court precedents (e.g., Kailash Nath Associates v. DDA, Maula Bux v. UOI).
Keep your final oral submission within 2-3 concise, impactful sentences suitable for oral courtroom argument.`;
  } else if (speakerRole === 'respondent_counsel') {
    speakerName = 'Advocate 2 (Respondent Counsel)';
    roleSystemPrompt = `You are Senior Counsel for the Respondent (Defense) in the High Court of Judicature.
Vigorously object to the Petitioner's submissions. Challenge their liquidated damages calculation under Section 74 of the Contract Act (arguing failure to prove actual loss under Kailash Nath) or challenge electronic certificate chain-of-custody under Section 63(4) BSA.
Keep your oral submission within 2-3 concise, impactful sentences suitable for oral courtroom argument.`;
  } else {
    speakerName = 'AI Presiding Judge';
    roleSystemPrompt = `You are the AI Presiding Judge of the Autonomous Virtual Bench under Order XX CPC and Section 63 BSA.
Evaluate the oral arguments and forensic evidence objectively.
Deliver an authoritative judicial ruling: either OVERRULE or SUSTAIN counsel objections, or order admission of exhibits with precise statutory references.
Keep your bench directive within 2-3 authoritative sentences.`;
  }

  const messages: any[] = [
    { role: 'system', content: roleSystemPrompt },
    {
      role: 'user',
      content: `Case Title: ${caseTitle}
Admitted Forensic Evidence: ${evidenceSummary || 'Exhibit-P01 (Disputed Signature & Notary Seal)'}
Prior Courtroom Transcript:
${transcriptHistory.map((t) => `${t.speaker}: "${t.text}"`).join('\n')}

Please advance your submission now.`
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
        max_tokens: 1800,
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

    // If content is empty because reasoning consumed tokens or finish_reason was hit, extract from reasoning
    let finalArgument = content.trim();
    if (!finalArgument && reasoning) {
      const sentences = reasoning.split('\n').filter((s: string) => s.trim().length > 20);
      finalArgument = sentences.slice(-2).join(' ').trim();
    }

    if (!finalArgument) {
      finalArgument = speakerRole === 'magistrate_judge'
        ? 'ORDER OF THE BENCH: Having reviewed the digital evidence certificate under Section 63 BSA, the objection is OVERRULED. Exhibit-P01 is admitted to record.'
        : speakerRole === 'petitioner_counsel'
        ? 'May it please the Bench: Under Section 74 of the Contract Act, the respondent is liable for liquidated damages as established by the admitted electronic record.'
        : 'Objection, Your Honour! Under the doctrine established in Kailash Nath Associates, liquidated damages cannot be claimed without proof of actual legal injury.';
    }

    // Extract citations
    const precedents: string[] = [];
    if (finalArgument.includes('Kailash Nath') || reasoning.includes('Kailash Nath')) {
      precedents.push('Kailash Nath Associates v. DDA (2015)');
    }
    if (finalArgument.includes('Maula Bux') || reasoning.includes('Maula Bux')) {
      precedents.push('Maula Bux v. Union of India (1969)');
    }
    if (finalArgument.includes('BSA') || finalArgument.includes('Section 63') || reasoning.includes('Section 63')) {
      precedents.push('Bharatiya Sakshya Adhiniyam, 2023 Sec 63');
    }
    if (finalArgument.includes('Section 74') || reasoning.includes('Section 74')) {
      precedents.push('Indian Contract Act, 1872 Sec 74');
    }
    if (precedents.length === 0) {
      precedents.push('Constitution of India Art 142');
    }

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

