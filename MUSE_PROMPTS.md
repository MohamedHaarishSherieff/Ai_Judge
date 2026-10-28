# AI Judge - Meta Muse Code CLI Launch Blueprint
> **Kickoff Time**: Oct 26, 2026 @ 9:30 PM IST (12:00 PM ET)  
> **Target**: 1st Place Indie Developer ($150,000) + Open Weights ($10,000) + Agentic ($5,000)

---

## ⚡ Step 0: Once Hackathon API Keys Drop (9:30 PM IST)

When you receive your official sponsored key in Discord or the Cerebral Valley portal, activate it in your terminal:

```powershell
# Set your environment variable:
$env:META_API_KEY = "PASTE_YOUR_KEY_HERE"

# Verify muse recognizes the key:
muse --version
```

---

## ⚔️ Step 1: Scaffold Litigators on Fireworks AI & Baseten ($125 Credits)
> **Model**: `meta-models/muse-spark-open-1026` hosted on Fireworks AI & Baseten  
> **Prize Track**: $10,000 Best Build on Meta Open Weights + $5,000 Agentic

Run this command in PowerShell. `muse` will create the adversarial litigator debate engine using Fireworks/Baseten for sub-50ms token streaming:

```powershell
muse exec "Create a TypeScript module at src/lib/meta/advocates.ts that implements an Adversarial Litigation Debate Engine for AI Judge using Meta's open weights model (muse-spark-open-1026) via Fireworks AI and Baseten.

Requirements:
1. Connect using FIREWORKS_API_KEY and BASETEN_API_KEY from process.env.
2. Define two persistent AI Agent Personas:
   - Senior Counsel for Petitioner: Aggressive, asserting breach of contract, liquidated damages, and BSA Sec 63 admissibility.
   - Senior Counsel for Respondent: Methodical, asserting force majeure, procedural estoppel, and evidentiary flaws.
3. Implement simulateTrialTurn(history: TrialTurn[], latestEvidence?: Evidence): Promise<ReadableStream>
4. Stream tokens in real-time so litigators debate back-and-forth dynamically."
```

---

## 🔬 Step 2: Scaffold SAM 3.1 Visual Evidence Inspection ($150 Meta Credits)
> **Model**: `meta-models/sam-3-1` via Meta Model API  
> **Prize Track**: Multimodal Frontier

Run this command in PowerShell. `muse` will build the visual forensic inspection pipeline:

```powershell
muse exec "Create a TypeScript module at src/lib/meta/sam.ts that connects to Meta's SAM 3.1 visual segmentation API using META_API_KEY.

Requirements:
1. Accept an exhibit image URL or base64 buffer of a disputed legal document (contract, cheque, affidavit).
2. Segment morphological regions: signature boxes, altered date clauses, notary seals, stamp duty watermarks.
3. Calculate an evidentiary integrity score (0.0 to 1.0) and flag anomalies (font mismatch, raster artifacts).
4. Return typed results matching src/types/index.ts ForensicInspectionResult."
```

---

## 🏛️ Step 3: Scaffold Autonomous Magistrate Judge (Muse Wonder / Spark)
> **Model**: `meta-models/muse-wonder` via Meta Model API  
> **Jurisprudence**: Indian BNS, CPC, and BSA Sec 63

Run this command in PowerShell to build the presiding Bench Magistrate:

```powershell
muse exec "Create a TypeScript module at src/lib/meta/judge.ts that implements an Autonomous Judicial Magistrate using Meta Muse Wonder.

Requirements:
1. Evaluate courtroom motions from petitioner and respondent counsel.
2. Intervene procedurally (sustain/overrule objections, issue warnings).
3. Synthesize the final Judicial Decree when arguments conclude, complete with:
   - Case summary and admitted evidence findings.
   - Applicable Indian statutory sections (BNS, CPC, BSA Sec 63).
   - Order directives, penalty amounts, and compliance timelines.
4. Output strictly validated Zod schemas."
```

---

## ⚖️ Step 4: Scaffold Deterministic Legal Compute on Modal Labs ($100 Credits)
> **Platform**: Modal Labs Python Sandbox  
> **Use Case**: Deterministic SHA-256 evidence hashing and statutory compound interest calculation

Run this command in PowerShell:

```powershell
muse exec "Create a TypeScript module at src/lib/meta/modal.ts that connects to our Modal Labs Python sandbox using MODAL_TOKEN_ID and MODAL_TOKEN_SECRET.

Requirements:
1. verifyEvidenceHash(fileBuffer: Buffer): Promise<{ sha256: string, isValid: boolean }>
2. calculateStatutoryInterest(principal: number, interestRate: number, startDate: string, decreeDate: string): Promise<{ totalPayable: number, interestAccrued: number }>
3. Adhere to Section 74 of the Indian Contract Act for penal interest verification."
```

---

## 🚀 Step 5: Wire Streaming Next.js API Route
Run this command in PowerShell to connect the frontend UI to all these engines:

```powershell
muse exec "Create a Next.js App Router API route at app/api/courtroom/stream/route.ts that exposes a Server-Sent Events (SSE) streaming endpoint. It should accept caseId and action ('simulate_turn' | 'inspect_evidence' | 'synthesize_decree'), dispatch to advocates.ts, sam.ts, or judge.ts, and stream real-time updates to the courtroom UI."
```
