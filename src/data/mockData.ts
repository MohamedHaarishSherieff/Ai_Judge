import { Case, Hearing, Message, Document, Evidence, Judgment, Appeal, User } from '@/types';

export const CURRENT_USER: User = {
  id: 'usr-101',
  name: 'Advocate',
  email: 'advocate@court.gov.in',
  role: 'Lawyer',
  organization: 'Chambers of Legal Counsel',
  barId: 'BAR/2026/001',
  avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
};

// Start with clean empty data structures - no hardcoded fake cases!
export const MOCK_CASES: Case[] = [];
export const MOCK_HEARINGS: Hearing[] = [];
export const MOCK_MESSAGES: Message[] = [];
export const MOCK_DOCUMENTS: Document[] = [];
export const MOCK_EVIDENCE: Evidence[] = [];
export const MOCK_APPEALS: Appeal[] = [];

export const MOCK_JUDGMENT: Judgment = {
  id: 'jdg-2026-001',
  caseId: 'AJ-NEW-001',
  caseNumber: 'WP(C) / 2026',
  title: 'Judicial Decree Synthesis',
  courtName: 'HIGH COURT VIRTUAL BENCH',
  date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
  bench: 'AI Senior Presiding Judicial Officer',
  partiesText: 'Petitioner  versus  Respondent',
  background: [
    '1. This digital decree synthesizes the arguments and pleadings submitted during the virtual courtroom proceedings.'
  ],
  issues: [
    'I. Determination of statutory rights and admissibility of submitted electronic records.'
  ],
  petitionerArguments: [
    'Submissions presented by Petitioner Counsel during the text courtroom session.'
  ],
  respondentArguments: [
    'Submissions presented by Respondent Counsel during the text courtroom session.'
  ],
  statutesApplied: [
    'Bharatiya Nyaya Sanhita (BNS), 2023',
    'Bharatiya Sakshya Adhiniyam (BSA), 2023 — Section 63'
  ],
  legalAnalysis: [
    '1. The Bench evaluated the evidence and arguments submitted in the chronological transcript.'
  ],
  findings: [
    'Finding on Issue I: Decided in accordance with statutory compliance and evidence hash verification.'
  ],
  finalOrder: 'DECREED ACCORDINGLY. Digital order passed by the Virtual Bench.',
  judgeSignature: 'Digitally Signed by AI Presiding Judge (Public Key Hash: 0x8F9A...4B21)'
};
