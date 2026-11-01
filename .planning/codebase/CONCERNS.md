# Technical Concerns & Mitigations

## 1. Inference Token Limits on Reasoning Models
* **Issue:** Meta Muse Spark Open performs native chain-of-thought deliberation. If `reasoning_effort` is unconstrained, deliberation can exhaust the token limit before generating the final courtroom submission.
* **Mitigation:**
  - `reasoning_effort` is explicitly pinned to `'low'` in `src/lib/baseten/museClient.ts`.
  - `max_tokens` is configured to `4000`.
  - Directives explicitly instruct the model to separate reasoning from spoken dialogue.

## 2. API Quotas & Network Partitions
* **Issue:** Live cloud inference endpoints can experience transient outages or network rate-limiting during high-concurrency hackathon judging sessions.
* **Mitigation:**
  - Dual-engine fallback: If the primary Baseten Muse Spark Open endpoint fails, `app/api/courtroom/modal-stream/route.ts` seamlessly routes to the Modal Serverless Legal Engine, ensuring zero crash during live evaluations.

## 3. Legal Hallucination Safeguards
* **Issue:** AI models may fabricate section numbers or non-existent precedents.
* **Mitigation:**
  - Meta's official "Trustworthy Legal Agent" architecture enforces a 3-point **Statutory Verification Checklist Gate** (`verify_checklist`) prior to decree synthesis, checking statutory standing, Section 63 BSA compliance, and *Kailash Nath* actual loss limits.

