import { NextRequest, NextResponse } from 'next/server';

const BASETEN_API_KEY = process.env.BASETEN_API_KEY || 'b10_AWi3MJod.KoUuCe5mB5FF3JN2BL4WWurYWcGEtYJn';
const BASETEN_BASE_URL = process.env.BASETEN_BASE_URL || 'https://inference.baseten.co/v1';
const BASETEN_MODEL = process.env.BASETEN_MODEL || 'meta-models/muse-spark-open-1026';

const NYAYA_SARATHI_SYSTEM_PROMPT = `You are "Nyaya Sarathi" (न्याय सारथी), the official Sovereign AI Courtroom Guide and Judicial Helpdesk for the AI Judge virtual courtroom platform (e-Courts of India).

PRIMARY MISSION:
1. APPLICATION USAGE GUIDANCE:
   - "Simulate Adversarial Trial": The white action button at the top toolbar runs an autonomous 3-turn debate between Petitioner Counsel, Respondent Counsel, and the AI Presiding Judge powered by Meta Muse Spark Open 1026.
   - "Real Human Lawyer vs AI Lawyer": The Presiding Judge is strictly autonomous AI. However, litigating advocates can be toggled between "🤖 AI Lawyer" and "👤 Real Human Lawyer". When set to Real Lawyer, you enter your own arguments and Bar Council registration number.
   - "Switching Courts (8 Forums of India)": Click "Switch Court Forum" in the right sidebar under Jurisdiction & Forum or the top action bar. The platform supports Supreme Court, High Courts, District & Sessions Courts, Subordinate Civil Courts, Subordinate Criminal Courts (JMFC), Special Courts (CBI/POCSO), Quasi-Judicial Tribunals (NCLT/NGT), and Grassroots Forums (Lok Adalats).
   - "Forensic Evidence Inspection": Click "Inspect Evidence & Seal (Sec 63 BSA)" to open Meta SAM 3.1 multimodal segmentation verifying notary seals, altered signatures, and SHA-256 hashes.
   - "Synthesize Decree (Order XX CPC)": Runs deterministic financial calculations (24% quarterly compounding interest under Sec 34 CPC) and enforces Kailash Nath Associates actual loss caps.

2. JURISDICTIONAL ADVISORY (Which Court to Choose):
   - Fundamental Rights & State Surveillance -> Supreme Court of India (Article 32)
   - State Government Actions, Commercial Writs -> High Courts of the States (Article 226)
   - Major Criminal Offences (BNS Murder, Rape) or Regular Bail -> District & Sessions Courts (BNSS § 480)
   - Property Injunctions, Partition & Specific Performance -> Subordinate Civil Courts (Order XXXIX CPC)
   - Cheque Dishonour, Minor Theft -> Subordinate Criminal Courts (NI Act § 138, JMFC)
   - Anti-Corruption (CBI), POCSO, NDPS -> Special Courts
   - Corporate Insolvency, Environmental Disputes -> Quasi-Judicial Tribunals (NCLT / NGT)
   - Pre-litigation amicable settlement, Rural disputes -> Grassroots Dispute Forums (National Lok Adalat)

STRICT GUARDRAILS & BOUNDARIES:
- If the user asks ANY question unrelated to this application, Indian legal procedures, or judicial forum selection (such as movies, cooking, celebrities, sports, coding assistance outside the app, weather, or casual banter):
  You MUST politely, respectfully, and firmly refuse and guide them back:
  "As Nyaya Sarathi (न्याय सारथी), my scope is strictly confined to assisting you with courtroom navigation, application features, and Indian legal jurisdictional guidance. Please state your query regarding court forums, litigation procedures, or platform capabilities."
- Maintain an institutional, courteous, and dignified judicial tone. Keep answers crisp, clear, and actionable.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const payloadMessages = [
      { role: 'system', content: NYAYA_SARATHI_SYSTEM_PROMPT },
      ...messages.slice(-10) // keep last 10 turns for context
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
          messages: payloadMessages,
          max_tokens: 1500,
          temperature: 0.4,
          reasoning_effort: 'low'
        })
      });

      if (!res.ok) {
        throw new Error(`Baseten API error: ${res.statusText}`);
      }

      const data = await res.json();
      const choice = data.choices?.[0];
      let content = choice?.message?.content || '';

      // Clean think tags if embedded
      if (content.includes('<think>')) {
        content = content.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      }

      return NextResponse.json({ reply: content });
    } catch (apiErr) {
      console.warn('Live Baseten guide call failed, providing rule-based legal guidance:', apiErr);
      
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      
      // Fallback response generator with rule-based domain guidance
      let fallback = '';
      if (lastUserMsg.includes('court') || lastUserMsg.includes('choose') || lastUserMsg.includes('which')) {
        fallback = `To choose the proper judicial forum in India:
• Supreme Court of India: For direct violation of Fundamental Rights under Article 32.
• High Courts: For state administrative actions and writs under Article 226.
• District & Sessions Courts: For serious criminal trials (BNS) and bail under Section 480 BNSS.
• Subordinate Civil Courts: For property title, partition, and injunctions under Order XXXIX CPC.
• Subordinate Criminal Courts (JMFC): For cheque bounce under Section 138 NI Act.
• Quasi-Judicial Tribunals (NCLT/NGT): For corporate insolvency under IBC 2016 or environmental disputes.
• Grassroots Forums (Lok Adalat): For pre-litigation mutual settlement under Legal Services Authorities Act.

You can switch forums directly inside any courtroom session using the 'Switch Court Forum' button in the sidebar!`;
      } else if (lastUserMsg.includes('lawyer') || lastUserMsg.includes('real') || lastUserMsg.includes('ai lawyer')) {
        fallback = `In this platform, the Presiding Judge is strictly autonomous AI to ensure zero bias.
However, for the advocates (Petitioner & Respondent), you can toggle between '🤖 AI Lawyer' and '👤 Real Human Lawyer' in the action bar!
When set to Real Lawyer, you enter your arguments manually along with your Bar Council enrollment registration number.`;
      } else if (lastUserMsg.includes('trial') || lastUserMsg.includes('simulate') || lastUserMsg.includes('how to use')) {
        fallback = `To run an adversarial trial:
1. Enter any virtual courtroom from the Chat Courtroom directory.
2. Click 'Simulate Adversarial Trial (Muse Spark)' at the top left.
3. Watch Meta Muse Spark Open run an oral debate between Petitioner Counsel, Respondent Counsel, and the AI Presiding Judicial Officer.
4. You can also inspect forensic exhibits with SAM 3.1 or synthesize an Order XX decree!`;
      } else {
        fallback = `Welcome to Nyaya Sarathi (न्याय सारथी). I can help you with:
1. Explaining how to use all features of the AI Judge platform.
2. Helping you identify which of the 8 Indian Court Forums to approach for your case.
3. Explaining how to toggle between Real Human Lawyers and AI Advocates.

How may I assist your legal navigation today?`;
      }

      return NextResponse.json({ reply: fallback });
    }
  } catch (error: any) {
    console.error('Guide chat route error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

