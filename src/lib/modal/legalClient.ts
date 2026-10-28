/**
 * AI Judge - Modal Cloud Legal Client
 * =============================================================================
 * Connects the Next.js frontend to the live Modal serverless legal engine.
 */

const MODAL_ENDPOINT = process.env.MODAL_API_ENDPOINT || 'https://mohamedhaarishsherieff--ai-judge-legal-engine-fastapi-app.us-east.modal.run';

export interface ModalEvidenceVerification {
  filename: string;
  sha256_hash: string;
  submitted_by: string;
  timestamp_utc: string;
  bsa_section_63_compliant: boolean;
  forensic_integrity_score: number;
  tamper_risk_assessment: 'Low' | 'Medium' | 'High';
  chain_of_custody_id: string;
}

export interface ModalInterestCalculation {
  principal_inr: number;
  contractual_rate_pct: number;
  default_duration_days: number;
  compounding: string;
  total_claimable_inr: number;
  accrued_interest_inr: number;
  statutory_mitigation_applied: boolean;
  mitigated_award_inr: number;
  legal_basis: string;
}

export interface ModalLitigationTurn {
  turn_number: number;
  speaker: string;
  role: 'petitioner_counsel' | 'respondent_counsel' | 'magistrate_judge';
  argument_text: string;
  precedents_cited: string[];
  objection_raised: boolean;
  timestamp: string;
}

export interface ModalDecreeResult {
  decree_id: string;
  case_id: string;
  case_title: string;
  bench: string;
  date_of_decree: string;
  verdict: string;
  adjudicated_amounts: {
    principal_inr: number;
    statutory_interest_awarded_inr: number;
    legal_costs_inr: number;
    total_enforceable_sum_inr: number;
  };
  statutory_clauses_applied: string[];
  compliance_directives: string[];
  appeal_limitation_days: number;
  digital_seal_hash: string;
}

/**
 * 1. Verify Evidence Integrity under Section 63 BSA on Modal
 */
export async function verifyEvidenceOnModal(
  fileBytesHex: string,
  filename: string,
  submittedBy: string = 'Petitioner'
): Promise<ModalEvidenceVerification> {
  const res = await fetch(`${MODAL_ENDPOINT}/verify-evidence`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      file_bytes_hex: fileBytesHex,
      filename,
      submitted_by: submittedBy,
    }),
  });

  if (!res.ok) {
    throw new Error(`Modal evidence verification failed: ${res.statusText}`);
  }

  return res.json();
}

/**
 * 2. Calculate Statutory Compound Interest & Damages under Contract Act Sec 74 on Modal
 */
export async function calculateInterestOnModal(
  principalInr: number,
  contractualRatePct: number,
  defaultDays: number,
  compoundingFrequency: string = 'quarterly'
): Promise<ModalInterestCalculation> {
  const res = await fetch(`${MODAL_ENDPOINT}/statutory-interest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      principal_inr: principalInr,
      contractual_rate_pct: contractualRatePct,
      default_days: defaultDays,
      compounding_frequency: compoundingFrequency,
    }),
  });

  if (!res.ok) {
    throw new Error(`Modal interest calculation failed: ${res.statusText}`);
  }

  return res.json();
}

/**
 * 3. Simulate an Adversarial Courtroom Turn on Modal
 */
export async function simulateTrialTurnOnModal(
  caseTitle: string,
  speakerRole: 'petitioner_counsel' | 'respondent_counsel' | 'magistrate_judge',
  transcriptHistory: any[] = [],
  admittedEvidenceSummary: string = ''
): Promise<ModalLitigationTurn> {
  const res = await fetch(`${MODAL_ENDPOINT}/simulate-turn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      case_title: caseTitle,
      speaker_role: speakerRole,
      transcript_history: transcriptHistory,
      admitted_evidence_summary: admittedEvidenceSummary,
    }),
  });

  if (!res.ok) {
    throw new Error(`Modal turn generation failed: ${res.statusText}`);
  }

  return res.json();
}

/**
 * 4. Synthesize Final Judicial Decree on Modal
 */
export async function synthesizeDecreeOnModal(
  caseId: string,
  caseTitle: string,
  principalClaimInr: number,
  transcriptHistory: any[] = []
): Promise<ModalDecreeResult> {
  const res = await fetch(`${MODAL_ENDPOINT}/synthesize-decree`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      case_id: caseId,
      case_title: caseTitle,
      principal_claim_inr: principalClaimInr,
      transcript_history: transcriptHistory,
    }),
  });

  if (!res.ok) {
    throw new Error(`Modal decree synthesis failed: ${res.statusText}`);
  }

  return res.json();
}
