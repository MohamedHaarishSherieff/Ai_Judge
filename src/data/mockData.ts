import { Case, Hearing, Message, Document, Evidence, Judgment, Appeal, User } from '@/types';

export const CURRENT_USER: User = {
  id: 'usr-101',
  name: 'Advocate Rajesh Sharma',
  email: 'advocate.sharma@sci.gov.in',
  role: 'Lawyer',
  organization: 'Supreme Court & High Court Bar Association',
  barId: 'D/1482/2012',
  avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
};

export const MOCK_CASES: Case[] = [
  {
    id: 'SC-WP-2026-104',
    caseNumber: 'Writ Petition (Civil) No. 104 of 2026',
    title: 'Citizens for Digital Privacy & Liberty v. Union of India & Ors.',
    type: 'Constitutional Law',
    courtLevel: 'Supreme Court of India',
    status: 'Hearing',
    filedDate: '15 Jan 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Constitutional challenge under Article 32 regarding mass automated algorithmic surveillance, asserting violation of Fundamental Rights under Articles 14, 19(1)(a), and 21 (Puttaswamy privacy doctrine).',
    parties: [
      { id: 'p1', name: 'Citizens for Digital Privacy (NGO)', role: 'Petitioner', advocateName: 'Senior Adv. Kapil Salve', barCouncilNo: 'SCBA/1988/042' },
      { id: 'p2', name: 'Union of India (Ministry of Home Affairs)', role: 'Respondent', advocateName: 'Solicitor General Tushar Mehta', barCouncilNo: 'BCI/1985/109' },
    ],
    statutoryActs: [
      'Constitution of India — Article 32 (Writ Jurisdiction)',
      'Constitution of India — Article 21 (Right to Life & Personal Liberty)',
      'Constitution of India — Article 14 (Equality Before Law)',
      'Digital Personal Data Protection Act, 2023',
      'Information Technology Act, 2000 — Section 69'
    ],
    issuesForDetermination: [
      'Whether state surveillance algorithms satisfy the four-pronged proportionality test laid down in K.S. Puttaswamy (2017).',
      'Whether executive data retention policies violate the core fundamental right to privacy under Article 21.'
    ],
    benchInfo: 'Chief Justice of India & 4-Judge Constitution Bench (Courtroom No. 1)',
  },
  {
    id: 'HC-CRL-2026-302',
    caseNumber: 'Criminal Appeal No. 302 of 2026',
    title: 'State of Maharashtra v. Vikram Deshmukh & Ors.',
    type: 'Criminal Matter',
    courtLevel: 'High Court of State',
    status: 'Hearing',
    filedDate: '02 Feb 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Sessions criminal appeal involving charges of criminal conspiracy and breach of public order under Bharatiya Nyaya Sanhita (BNS) Sections 103 and 61, with bail petition under BNSS Section 480.',
    parties: [
      { id: 'p1', name: 'State of Maharashtra (Through CID)', role: 'Prosecution', advocateName: 'Public Prosecutor Adv. Anita Nadkarni', barCouncilNo: 'MAH/2004/819' },
      { id: 'p2', name: 'Vikram Deshmukh (Accused No. 1)', role: 'Defence', advocateName: 'Senior Defense Counsel Adv. Meenakshi Sundaram', barCouncilNo: 'MAH/1997/341' },
    ],
    statutoryActs: [
      'Bharatiya Nyaya Sanhita, 2023 (BNS) — Section 103 (Punishment for Murder)',
      'Bharatiya Nyaya Sanhita, 2023 (BNS) — Section 61 (Criminal Conspiracy)',
      'Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) — Section 480 (Bail Standards)',
      'Bharatiya Sakshya Adhiniyam, 2023 (BSA) — Section 105 (Burden of Proof)'
    ],
    issuesForDetermination: [
      'Whether prima facie circumstantial evidence satisfies threshold criteria for denial of regular bail under Section 480 BNSS.',
      'Whether the chain of custody of digital call detail records (CDR) complies with mandatory Section 63 BSA certificates.'
    ],
    benchInfo: 'Hon\'ble Division Bench (Criminal Appellate Jurisdiction)',
  },
  {
    id: 'DC-CS-2026-088',
    caseNumber: 'Civil Original Suit No. 88 of 2026',
    title: 'Rajiv Singhania v. Mehra Real Estate Developers Ltd.',
    type: 'Civil Dispute',
    courtLevel: 'District Court',
    status: 'Hearing',
    filedDate: '12 Jan 2026',
    nextHearing: 'Tomorrow (10:30 AM)',
    summary: 'Civil suit for specific performance and perpetual prohibitory injunction under Order XXXIX Rules 1 & 2 CPC regarding title encroachment and illegal alienation of commercial ancestral real estate.',
    parties: [
      { id: 'p1', name: 'Rajiv Singhania (Plaintiff)', role: 'Petitioner', advocateName: 'Adv. Suresh Chandran', barCouncilNo: 'D/2010/512' },
      { id: 'p2', name: 'Mehra Real Estate Developers (Defendant)', role: 'Respondent', advocateName: 'Adv. Harish Trivedi', barCouncilNo: 'D/2008/193' },
    ],
    statutoryActs: [
      'Code of Civil Procedure, 1908 (CPC) — Order XXXIX Rules 1 & 2 (Injunctions)',
      'Specific Relief Act, 1963 — Section 16 (Personal Bars to Relief)',
      'Transfer of Property Act, 1882 — Section 53A (Part Performance)',
      'Registration Act, 1908 — Section 17'
    ],
    issuesForDetermination: [
      'Whether plaintiff has established a prima facie case, balance of convenience, and irreparable injury for grant of temporary injunction.',
      'Whether unregistered agreement to sell can be admitted as evidence of part performance under Section 53A TPA.'
    ],
    benchInfo: 'Court of Senior Civil Judge, Original Division',
  },
  {
    id: 'HC-COMM-2026-042',
    caseNumber: 'Commercial Suit No. 42 of 2026',
    title: 'TechMatrix Global Ltd. v. Apex Enterprise Cloud Solutions',
    type: 'Corporate & Commercial',
    courtLevel: 'High Court of State',
    status: 'Hearing',
    filedDate: '08 Jan 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Commercial breach of contract claiming liquidated damages under Section 74 of the Indian Contract Act, 1872 and interim relief under Section 9 of the Arbitration and Conciliation Act.',
    parties: [
      { id: 'p1', name: 'TechMatrix Global Ltd.', role: 'Petitioner', advocateName: 'Senior Adv. Rajesh Sharma', barCouncilNo: 'D/1482/2012' },
      { id: 'p2', name: 'Apex Enterprise Cloud Solutions', role: 'Respondent', advocateName: 'Adv. Vikramaditya Rao', barCouncilNo: 'KAR/2011/724' },
    ],
    statutoryActs: [
      'Indian Contract Act, 1872 — Section 74 (Liquidated Damages vs. Penalty)',
      'Commercial Courts Act, 2015 — Section 12A (Pre-Institution Mediation)',
      'Bharatiya Sakshya Adhiniyam, 2023 — Section 63 (Electronic Evidence)',
      'Arbitration and Conciliation Act, 1996 — Section 9'
    ],
    issuesForDetermination: [
      'Whether liquidated damages clause operates as genuine pre-estimate of loss or unenforceable penal clause per Kailash Nath Associates.',
      'Admissibility of electronic cloud SLA logs under Section 63(4) BSA without continuous device audit.'
    ],
    benchInfo: 'Commercial Division Bench IV, High Court of Judicature',
  }
];

export const MOCK_HEARINGS: Hearing[] = [
  {
    id: 'hr-01',
    caseId: 'SC-WP-2026-104',
    hearingNumber: 'Hearing #03',
    title: 'Preliminary Submissions on Proportionality Doctrine',
    date: '29 Oct 2026',
    time: '11:00 AM',
    status: 'In Session',
    mode: 'Text',
    presidingJudge: 'Chief Justice of India & Constitution Bench',
    summaryNote: 'Bench convened to examine state surveillance data under Article 21 privacy guidelines.'
  },
  {
    id: 'hr-02',
    caseId: 'HC-CRL-2026-302',
    hearingNumber: 'Hearing #02',
    title: 'Arguments on Regular Bail Petition (BNSS Sec 480)',
    date: '29 Oct 2026',
    time: '11:30 AM',
    status: 'Scheduled',
    mode: 'Text',
    presidingJudge: 'Hon\'ble Justice K. G. Balakrishnan',
    summaryNote: 'State prosecution and defense counsel to argue bail conditions and witness protection.'
  },
  {
    id: 'hr-03',
    caseId: 'DC-CS-2026-088',
    hearingNumber: 'Hearing #01',
    title: 'Order XXXIX Injunction Application Arguments',
    date: '30 Oct 2026',
    time: '10:30 AM',
    status: 'Scheduled',
    mode: 'Text',
    presidingJudge: 'Senior Civil Judge, District Court',
    summaryNote: 'Pleadings on balance of convenience regarding real estate construction stay.'
  },
  {
    id: 'hr-04',
    caseId: 'HC-COMM-2026-042',
    hearingNumber: 'Hearing #04',
    title: 'Final Arguments on Damages & Decree Synthesis',
    date: '29 Oct 2026',
    time: '12:00 PM',
    status: 'In Session',
    mode: 'Text',
    presidingJudge: 'Commercial Division Bench Magistrate',
    summaryNote: 'Adversarial oral arguments on liquidated damages under Section 74 Contract Act.'
  }
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-01',
    caseId: 'SC-WP-2026-104',
    name: 'Writ_Petition_Article32_Privacy_Violation.pdf',
    type: 'Petition',
    uploadedBy: 'Senior Adv. Kapil Salve',
    uploadedRole: 'Petitioner Counsel',
    uploadedDate: '15 Jan 2026',
    fileSize: '4.2 MB',
    fileFormat: 'PDF/A',
    status: 'Verified',
    description: 'Formal writ of mandamus pleading violation of Article 21 privacy rights under Puttaswamy benchmark.'
  },
  {
    id: 'doc-02',
    caseId: 'HC-CRL-2026-302',
    name: 'Police_Chargesheet_FIR_Section173_BNSS.pdf',
    type: 'Written Statement',
    uploadedBy: 'Public Prosecutor Nadkarni',
    uploadedRole: 'Petitioner Counsel',
    uploadedDate: '02 Feb 2026',
    fileSize: '8.7 MB',
    fileFormat: 'PDF/A',
    status: 'Verified',
    description: 'Police investigation report and witness statements filed pursuant to Section 173 BNSS.'
  },
  {
    id: 'doc-03',
    caseId: 'DC-CS-2026-088',
    name: 'OrderXXXIX_Injunction_Application_Plaint.pdf',
    type: 'Petition',
    uploadedBy: 'Adv. Suresh Chandran',
    uploadedRole: 'Petitioner Counsel',
    uploadedDate: '12 Jan 2026',
    fileSize: '3.1 MB',
    fileFormat: 'PDF/A',
    status: 'Verified',
    description: 'Civil plaint seeking perpetual injunction and specific performance of registered agreement to sell.'
  },
  {
    id: 'doc-04',
    caseId: 'HC-COMM-2026-042',
    name: 'Master_Service_Agreement_Ex_P01.pdf',
    type: 'Affidavit',
    uploadedBy: 'Senior Adv. Rajesh Sharma',
    uploadedRole: 'Petitioner Counsel',
    uploadedDate: '08 Jan 2026',
    fileSize: '2.8 MB',
    fileFormat: 'PDF/A',
    status: 'Verified',
    description: 'Executed commercial agreement and breach audit log with Section 63 BSA certificate.'
  }
];

export const MOCK_EVIDENCE: Evidence[] = [];
export const MOCK_MESSAGES: Message[] = [];
export const MOCK_APPEALS: Appeal[] = [];

export const MOCK_JUDGMENT: Judgment = {
  id: 'jdg-2026-001',
  caseId: 'SC-WP-2026-104',
  caseNumber: 'Writ Petition (Civil) No. 104 of 2026',
  title: 'Judicial Decree & Constitutional Direction',
  courtName: 'SUPREME COURT OF INDIA • CONSTITUTION BENCH',
  date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
  bench: 'Hon\'ble Chief Justice & Companion Judges',
  partiesText: 'Citizens for Digital Privacy  versus  Union of India & Ors.',
  background: [
    '1. The Petitioner moved this Apex Court under Article 32 seeking constitutional review of state surveillance architecture.'
  ],
  issues: [
    'I. Whether state executive orders satisfy the four-prong proportionality test under Article 21.'
  ],
  petitionerArguments: [
    'Submissions by Senior Counsel asserting violation of fundamental privacy rights under Puttaswamy.'
  ],
  respondentArguments: [
    'Submissions by Solicitor General defending national security and legitimate state aim.'
  ],
  statutesApplied: [
    'Constitution of India — Articles 14, 19, 21, 32',
    'Bharatiya Sakshya Adhiniyam (BSA), 2023 — Section 63'
  ],
  legalAnalysis: [
    '1. The Constitution Bench applied the doctrine of proportionality, finding executive actions must balance state security with individual liberties.'
  ],
  findings: [
    'Issue I: Decided in favor of Petitioner; guidelines issued under Article 142.'
  ],
  finalOrder: 'WRIT ISSUED. State directed to establish independent judicial oversight.',
  judgeSignature: 'Digitally Signed by Presiding Constitution Bench (SHA-256 Verified)'
};
