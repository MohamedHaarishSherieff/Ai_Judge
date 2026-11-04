import { Case, Hearing, Message, Document, Evidence, Judgment, Appeal, User, CourtForumMetadata } from '@/types';

export const INDIAN_COURT_FORUMS: CourtForumMetadata[] = [
  {
    id: 'supreme-court',
    name: 'Supreme Court of India',
    shortName: 'Supreme Court (Apex)',
    tier: 'Apex Constitutional Court',
    jurisdictionScope: 'Union of India (All States & UTs)',
    description: 'The apex constitutional court and highest appellate authority of the nation, exercising original writ jurisdiction under Article 32, appellate jurisdiction, and inherent plenary powers under Article 142.',
    emblemTag: 'यतो धर्मस्ततो जयः',
    benchDesignation: 'Constitution Bench / Division Bench (Courtroom No. 1)',
    typicalMatters: ['Fundamental Rights Writs (Art 32)', 'Special Leave Petitions (Art 136)', 'Constitutional Validity of Statutes', 'Interstate River & Boundary Disputes'],
    keyStatutes: ['Constitution of India (Articles 14, 19, 21, 32, 142)', 'Supreme Court Rules, 2013']
  },
  {
    id: 'high-courts',
    name: 'High Courts of the States',
    shortName: 'High Court (State)',
    tier: 'State Constitutional & Appellate',
    jurisdictionScope: 'State Jurisdiction / Union Territory',
    description: 'The highest judicial bodies exercising constitutional, writ (Article 226), supervisory (Article 227), and appellate jurisdiction within their respective States or Union Territories.',
    emblemTag: 'State Judicature',
    benchDesignation: 'Division Bench / Single Judge Commercial & Writ Division',
    typicalMatters: ['State Action Writs (Art 226)', 'First Appeals from District Decrees', 'Commercial Contract Disputes', 'Bail Appeals & Criminal Revisions'],
    keyStatutes: ['Constitution of India (Article 226/227)', 'Commercial Courts Act, 2015', 'Letters Patent Act']
  },
  {
    id: 'district-sessions',
    name: 'District & Sessions Courts',
    shortName: 'District & Sessions Court',
    tier: 'Principal District Trial Court',
    jurisdictionScope: 'Judicial District',
    description: 'The primary trial courts at the district level, handling major civil disputes (as District Court) and serious criminal trials (as Sessions Court) for offences carrying life imprisonment or major penalties.',
    emblemTag: 'District Judiciary',
    benchDesignation: 'Court of Principal District & Sessions Judge',
    typicalMatters: ['Major Civil Property Suits', 'BNS Murder & Conspiracy Trials (Sec 103/61)', 'Regular Bail Applications (Sec 480 BNSS)', 'Probate & Partition Decrees'],
    keyStatutes: ['Bharatiya Nyaya Sanhita, 2023 (BNS)', 'Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS § 480)', 'Code of Civil Procedure, 1908']
  },
  {
    id: 'subordinate-civil',
    name: 'Subordinate Civil Courts',
    shortName: 'Civil Judge (Senior/Junior)',
    tier: 'Subordinate Civil Judicature',
    jurisdictionScope: 'Taluk / Sub-Division / City Civil',
    description: 'Lower trial courts (such as Civil Judge Senior & Junior Divisions and Small Causes Courts) handling localized property, monetary recovery, tenancy, and contract disputes within pecuniary limits.',
    emblemTag: 'Civil Division',
    benchDesignation: 'Court of Civil Judge (Senior Division)',
    typicalMatters: ['Specific Performance & Injunctions', 'Tenancy Eviction & Rent Recovery', 'Promissory Note & Loan Enforcements', 'Declaration of Title'],
    keyStatutes: ['Code of Civil Procedure, 1908 (Order XXXIX)', 'Specific Relief Act, 1963', 'Transfer of Property Act, 1882']
  },
  {
    id: 'subordinate-criminal',
    name: 'Subordinate Criminal Courts',
    shortName: 'Judicial Magistrate (CJM/JMFC)',
    tier: 'Magisterial Criminal Judicature',
    jurisdictionScope: 'Magisterial Sub-District',
    description: 'Magistrate courts (such as Chief Judicial Magistrates and Judicial Magistrates First & Second Class) handling summary trials, bailable/non-bailable offenses, cognizable complaints, and mid-level criminal offenses.',
    emblemTag: 'Magistrate Division',
    benchDesignation: 'Court of Judicial Magistrate First Class (JMFC)',
    typicalMatters: ['Cheque Dishonour (NI Act § 138)', 'Theft & Criminal Trespass (BNS)', 'Summary Trials & Police Remand', 'First Production & Bail in Minor Offenses'],
    keyStatutes: ['Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)', 'Negotiable Instruments Act, 1881 (§ 138)', 'Bharatiya Nyaya Sanhita, 2023']
  },
  {
    id: 'special-courts',
    name: 'Special Courts',
    shortName: 'Special CBI / POCSO Court',
    tier: 'Statutory Designated Benches',
    jurisdictionScope: 'Statewide / Designated Zonal Jurisdiction',
    description: 'Dedicated benches established by specific statutes for time-bound disposal of targeted matters like POCSO, corruption (CBI), commercial disputes, NDPS, and family law.',
    emblemTag: 'Designated Bench',
    benchDesignation: 'Court of Special Judge (CBI / Anti-Corruption)',
    typicalMatters: ['Prevention of Corruption Act Trials', 'POCSO Act Child Protection', 'NDPS Narcotics Adjudications', 'Designated Commercial Bench Expeditions'],
    keyStatutes: ['Prevention of Corruption Act, 1988', 'POCSO Act, 2012', 'NDPS Act, 1985', 'Commercial Courts Act, 2015']
  },
  {
    id: 'quasi-judicial-tribunals',
    name: 'Quasi-Judicial Tribunals',
    shortName: 'Tribunals (NCLT / NGT / CAT)',
    tier: 'Specialized Subject Tribunals',
    jurisdictionScope: 'National / Zonal Tribunal Benches',
    description: 'Specialized adjudicatory bodies (such as NCLT, NGT, and CAT) addressing expert subject areas including corporate insolvency, environmental regulation, and administrative disputes.',
    emblemTag: 'Tribunal Bench',
    benchDesignation: 'National Company Law Tribunal (NCLT) Principal Bench',
    typicalMatters: ['Corporate Insolvency Resolution (IBC § 7/9)', 'Mergers & Company Oppression Claims', 'Environmental Damage Compensation (NGT)', 'Civil Service Service Disputes (CAT)'],
    keyStatutes: ['Insolvency and Bankruptcy Code, 2016 (IBC)', 'National Green Tribunal Act, 2010', 'Administrative Tribunals Act, 1985']
  },
  {
    id: 'grassroots-dispute-forums',
    name: 'Grassroots Dispute Forums',
    shortName: 'Lok Adalat / Gram Nyayalaya',
    tier: 'Alternative & Rural Settlement',
    jurisdictionScope: 'Village / Sub-District / Community Benches',
    description: 'Alternative settlement forums (such as Lok Adalats and Gram Nyayalayas) resolving pre-litigation, compoundable offences, and rural community disputes through speedy conciliation.',
    emblemTag: 'जन अदालत',
    benchDesignation: 'Bench of National Lok Adalat & Conciliator',
    typicalMatters: ['Pre-Litigation Bank Recovery Settlement', 'Matrimonial & Family Mutual Conciliation', 'Compoundable Minor Traffic & Civil Disputes', 'Agricultural Land & Water Channel Harmony'],
    keyStatutes: ['Legal Services Authorities Act, 1987', 'Gram Nyayalayas Act, 2008', 'Arbitration and Conciliation Act, 1996']
  }
];

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
  // 1. SUPREME COURT OF INDIA (Apex Constitutional Court)
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

  // 2. HIGH COURTS OF THE STATES (State Constitutional & Appellate)
  {
    id: 'HC-COMM-2026-781',
    caseNumber: 'Commercial Summary Suit No. 418 of 2026',
    title: 'Verma Technologies Pvt. Ltd. v. Bharat Cloud Infrastructure Ltd.',
    type: 'Corporate & Commercial',
    courtLevel: 'High Courts of the States',
    status: 'Hearing',
    filedDate: '04 Nov 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Commercial Summary Suit under Order XXXVII CPC for recovery of ₹14,82,00,000/- on account of persistent cloud outage, SLA default under Section 74 Indian Contract Act 1872, and damages under Section 43A IT Act.',
    parties: [
      { id: 'p1', name: 'Verma Technologies Pvt. Ltd.', role: 'Petitioner', advocateName: 'Senior Adv. Rajesh Sharma', barCouncilNo: 'D/4829/2012' },
      { id: 'p2', name: 'Bharat Cloud Infrastructure Ltd.', role: 'Respondent', advocateName: 'Adv. Meera Sen', barCouncilNo: 'MH/1920/2015' },
    ],
    statutoryActs: [
      'Order XXXVII Code of Civil Procedure, 1908 (Summary Suits)',
      'Indian Contract Act, 1872 — Section 74 (Liquidated Damages)',
      'Bharatiya Sakshya Adhiniyam, 2023 — Section 63 (Electronic Evidence Certificate)',
      'Information Technology Act, 2000 — Section 43A (Failure to Protect Data)'
    ],
    issuesForDetermination: [
      'Whether 96-hour continuous cloud server outage constitutes repudiatory breach of service level agreement under Section 74 ICA.',
      'Whether electronic audit logs and Section 63 BSA certificate are admissible without oral examining of cloud engineers.',
      'Whether the plaintiff is entitled to summary decree under Order XXXVII Rule 3 CPC for ₹14.82 Crores.'
    ],
    benchInfo: "Hon'ble High Court Commercial Division Bench (Courtroom No. 4)",
  },
  {
    id: 'HC-WRIT-2026-512',
    caseNumber: 'Writ Petition No. 512 of 2026',
    title: 'Federation of Retail Traders v. State Commissioner of Revenue',
    type: 'Corporate & Commercial',
    courtLevel: 'High Courts of the States',
    status: 'Hearing',
    filedDate: '22 Jan 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Writ petition under Article 226 challenging arbitrary administrative seizure of digital warehouse stock inventories and seeking enforcement of commercial procedural protections.',
    parties: [
      { id: 'p1', name: 'Federation of Retail Traders', role: 'Petitioner', advocateName: 'Senior Adv. Rajesh Sharma', barCouncilNo: 'D/1482/2012' },
      { id: 'p2', name: 'State Commissioner of Revenue', role: 'Respondent', advocateName: 'Additional Advocate General K. V. Subramanian', barCouncilNo: 'MAH/2001/412' },
    ],
    statutoryActs: [
      'Constitution of India — Article 226 (High Court Writ Powers)',
      'Commercial Courts Act, 2015 — Section 12A',
      'Bharatiya Sakshya Adhiniyam, 2023 — Section 63 (Electronic Evidence Admissibility)',
      'Indian Contract Act, 1872 — Section 74'
    ],
    issuesForDetermination: [
      'Whether the impugned seizure notice by the State Tax Authority was ultra vires and violated principles of natural justice.',
      'Whether digitally signed e-invoices are conclusive evidence under Section 63 BSA.'
    ],
    benchInfo: 'Hon\'ble High Court Division Bench (Commercial & Appellate Jurisdiction)',
  },

  // 3. DISTRICT & SESSIONS COURTS (Primary District Trial Courts)
  {
    id: 'DS-SESS-2026-218',
    caseNumber: 'Sessions Case No. 218 of 2026',
    title: 'State of Maharashtra v. Vikram Deshmukh & Ors.',
    type: 'Criminal Matter',
    courtLevel: 'District & Sessions Courts',
    status: 'Hearing',
    filedDate: '02 Feb 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Sessions criminal trial involving charges of criminal conspiracy and grievous public endangerment under BNS 2023 Sections 103 and 61, with contested bail petition under Section 480 BNSS.',
    parties: [
      { id: 'p1', name: 'State of Maharashtra (Through CID)', role: 'Prosecution', advocateName: 'Public Prosecutor Adv. Anita Nadkarni', barCouncilNo: 'MAH/2004/819' },
      { id: 'p2', name: 'Vikram Deshmukh (Accused No. 1)', role: 'Defence', advocateName: 'Senior Defense Counsel Adv. Meenakshi Sundaram', barCouncilNo: 'MAH/1997/341' },
    ],
    statutoryActs: [
      'Bharatiya Nyaya Sanhita, 2023 (BNS) — Section 103 (Punishment for Murder)',
      'Bharatiya Nyaya Sanhita, 2023 (BNS) — Section 61 (Criminal Conspiracy)',
      'Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) — Section 480 (Regular Bail Standards)',
      'Bharatiya Sakshya Adhiniyam, 2023 (BSA) — Section 105 (Burden of Proof)'
    ],
    issuesForDetermination: [
      'Whether prima facie circumstantial evidence satisfies threshold criteria for denial of regular bail under Section 480 BNSS.',
      'Whether the chain of custody of digital call detail records (CDR) complies with mandatory Section 63 BSA certificates.'
    ],
    benchInfo: 'Court of Principal District & Sessions Judge',
  },

  // 4. SUBORDINATE CIVIL COURTS (Civil Judge Senior/Junior Divisions)
  {
    id: 'SCC-CIV-2026-091',
    caseNumber: 'Original Civil Suit No. 91 of 2026',
    title: 'Kavita Raman v. Urban Heights Apartment Owners Association',
    type: 'Civil Dispute',
    courtLevel: 'Subordinate Civil Courts',
    status: 'Hearing',
    filedDate: '10 Feb 2026',
    nextHearing: 'Tomorrow (11:30 AM)',
    summary: 'Suit for perpetual prohibitory injunction and recovery of maintenance deposit under Order XXXIX Rules 1 & 2 CPC regarding arbitrary restriction of common club access and parking rights.',
    parties: [
      { id: 'p1', name: 'Kavita Raman (Resident/Owner)', role: 'Petitioner', advocateName: 'Adv. Suresh Chandran', barCouncilNo: 'D/2010/512' },
      { id: 'p2', name: 'Urban Heights Association (Managing Committee)', role: 'Respondent', advocateName: 'Adv. Harish Trivedi', barCouncilNo: 'D/2008/193' },
    ],
    statutoryActs: [
      'Code of Civil Procedure, 1908 (CPC) — Order XXXIX Rules 1 & 2 (Temporary Injunctions)',
      'Specific Relief Act, 1963 — Section 38 (Perpetual Injunctions)',
      'Transfer of Property Act, 1882 — Section 53A'
    ],
    issuesForDetermination: [
      'Whether the plaintiff has made out a prima facie case and balance of convenience for status quo ante.',
      'Whether bye-law amendments by the resident association can override original deed of apartment ownership covenants.'
    ],
    benchInfo: 'Court of Civil Judge (Senior Division), City Civil Court',
  },

  // 5. SUBORDINATE CRIMINAL COURTS (Judicial Magistrates JMFC/CJM)
  {
    id: 'SCM-CRIM-2026-144',
    caseNumber: 'Criminal Summary Case No. 144 of 2026',
    title: 'Premier Agro Supplies Ltd. v. Harishankar Grain Mills',
    type: 'Criminal Matter',
    courtLevel: 'Subordinate Criminal Courts',
    status: 'Hearing',
    filedDate: '18 Feb 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Summary criminal prosecution under Section 138 of the Negotiable Instruments Act for cheque dishonour exceeding ₹18,50,000 with notice of demand under BNSS Section 223.',
    parties: [
      { id: 'p1', name: 'Premier Agro Supplies Ltd. (Complainant)', role: 'Prosecution', advocateName: 'Adv. R. K. Shrivastava', barCouncilNo: 'UP/2014/198' },
      { id: 'p2', name: 'Harishankar (Managing Partner / Accused)', role: 'Defence', advocateName: 'Adv. Devendra Verma', barCouncilNo: 'UP/2016/552' },
    ],
    statutoryActs: [
      'Negotiable Instruments Act, 1881 — Section 138 (Dishonour of Cheque)',
      'Negotiable Instruments Act, 1881 — Section 139 (Presumption in Favour of Holder)',
      'Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) — Section 223 (Magistrate Cognizance)',
      'Bharatiya Sakshya Adhiniyam, 2023 — Section 63'
    ],
    issuesForDetermination: [
      'Whether statutory legal notice was served within the prescribed 30-day window under Section 138 proviso (b).',
      'Whether the disputed cheque was issued towards legally enforceable debt or as conditional security.'
    ],
    benchInfo: 'Court of Judicial Magistrate First Class (JMFC) Special NI Act Court',
  },

  // 6. SPECIAL COURTS (CBI / POCSO / Commercial Special Benches)
  {
    id: 'SPEC-CBI-2026-033',
    caseNumber: 'Special CBI Case No. 33 of 2026',
    title: 'Central Bureau of Investigation (CBI) v. Global Maritime Freight & Ors.',
    type: 'Corporate & Commercial',
    courtLevel: 'Special Courts',
    status: 'Hearing',
    filedDate: '05 Jan 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Special CBI Court trial investigating illicit port clearance waivers, public procurement fraud under Prevention of Corruption Act, and verification of altered digital bill-of-lading hashes.',
    parties: [
      { id: 'p1', name: 'Central Bureau of Investigation (CBI Special Unit)', role: 'Prosecution', advocateName: 'Special Public Prosecutor Adv. Arvind Saxena', barCouncilNo: 'D/1993/088' },
      { id: 'p2', name: 'Global Maritime Freight Ltd. & Directors', role: 'Defence', advocateName: 'Senior Adv. Vikramaditya Rao', barCouncilNo: 'KAR/2011/724' },
    ],
    statutoryActs: [
      'Prevention of Corruption Act, 1988 — Section 7 & 13(1)(b)',
      'Bharatiya Nyaya Sanhita, 2023 — Section 318 (Cheating & Fraud)',
      'Bharatiya Sakshya Adhiniyam, 2023 — Section 63(4) (Electronic Certificate Integrity)',
      'Customs Act, 1962 — Section 132'
    ],
    issuesForDetermination: [
      'Admissibility of electronic customs clearing logs where forensic cryptographic seal discontinuity was flagged.',
      'Whether public servant pecuniary advantage was conferred without public tender.'
    ],
    benchInfo: 'Court of Special Judge (CBI & Anti-Corruption Wing)',
  },

  // 7. QUASI-JUDICIAL TRIBUNALS (NCLT / NGT / CAT)
  {
    id: 'TRIB-NCLT-2026-702',
    caseNumber: 'Company Petition (IB) No. 702 of 2026',
    title: 'National Infrastructure Financing Bank v. Apex Telecom Infra Ltd.',
    type: 'Corporate & Commercial',
    courtLevel: 'Quasi-Judicial Tribunals',
    status: 'Hearing',
    filedDate: '14 Jan 2026',
    nextHearing: 'Today (Live Bench)',
    summary: 'Insolvency resolution petition under Section 7 of the Insolvency and Bankruptcy Code (IBC), 2016 for default on ₹125 Crore structured term debt, praying for initiation of Corporate Insolvency Resolution Process (CIRP).',
    parties: [
      { id: 'p1', name: 'National Infrastructure Financing Bank (Financial Creditor)', role: 'Petitioner', advocateName: 'Senior Adv. Siddharth Singhal', barCouncilNo: 'MAH/2005/671' },
      { id: 'p2', name: 'Apex Telecom Infra Ltd. (Corporate Debtor)', role: 'Respondent', advocateName: 'Adv. Rohini Deshmukh', barCouncilNo: 'D/2009/442' },
    ],
    statutoryActs: [
      'Insolvency and Bankruptcy Code, 2016 (IBC) — Section 7 (Initiation of CIRP)',
      'Insolvency and Bankruptcy Code, 2016 — Section 14 (Moratorium Provisions)',
      'Commercial Courts Act, 2015 — Section 12A',
      'Bharatiya Sakshya Adhiniyam, 2023 — Section 63'
    ],
    issuesForDetermination: [
      'Whether the Financial Creditor has conclusively established debt and default via NeSL Information Utility records.',
      'Whether pending pre-litigation restructuring interdicts mandatory admission under Section 7(5) IBC.'
    ],
    benchInfo: 'National Company Law Tribunal (NCLT) Principal Bench, New Delhi',
  },

  // 8. GRASSROOTS DISPUTE FORUMS (Lok Adalats & Gram Nyayalayas)
  {
    id: 'GRASS-LOK-2026-015',
    caseNumber: 'National Lok Adalat Settlement No. 15 of 2026',
    title: 'Gram Vikas Committee v. Kisan Sahakari Cooperative & Anr.',
    type: 'Civil Dispute',
    courtLevel: 'Grassroots Dispute Forums',
    status: 'Hearing',
    filedDate: '25 Jan 2026',
    nextHearing: 'Today (Live Conciliation)',
    summary: 'Pre-litigation village conciliation regarding agricultural canal water distribution, village thoroughfare easement, and amicable micro-loan restructuring under Legal Services Authorities Act.',
    parties: [
      { id: 'p1', name: 'Gram Vikas Committee (Farmers Welfare)', role: 'Petitioner', advocateName: 'Panel Legal Counsel Adv. Mohan Lal Patel', barCouncilNo: 'MP/2012/339' },
      { id: 'p2', name: 'Kisan Sahakari Cooperative', role: 'Respondent', advocateName: 'Adv. Sunita Choudhary', barCouncilNo: 'MP/2015/812' },
    ],
    statutoryActs: [
      'Legal Services Authorities Act, 1987 — Section 19 & 21 (Finality of Lok Adalat Award)',
      'Gram Nyayalayas Act, 2008 — Section 26 (Conciliation Procedures)',
      'Arbitration and Conciliation Act, 1996 — Section 73 (Settlement Agreement)'
    ],
    issuesForDetermination: [
      'Formulation of binding consensual settlement agreement with zero court fee liability under Section 21 LSA Act.',
      'Equitable allocation of canal sluice timing during harvesting season.'
    ],
    benchInfo: 'National Lok Adalat Bench & Gram Nyayalaya Rural Conciliation Panel',
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
  },
  {
    id: 'hr-verma-01',
    caseId: 'HC-COMM-2026-781',
    hearingNumber: 'Hearing #01',
    title: 'Urgent Motion for Summary Summons for Judgment (Order XXXVII Rule 3 CPC)',
    date: 'Today',
    time: '11:00 AM',
    status: 'In Session',
    mode: 'Text',
    presidingJudge: "Hon'ble High Court Commercial Division Bench",
    summaryNote: 'Preliminary hearing on commercial plaint admission and issuance of defendant appearance notice.'
  },
  {
    id: 'hr-writ-01',
    caseId: 'HC-WRIT-2026-512',
    hearingNumber: 'Hearing #01',
    title: 'Notice of Motion for Stay of Warehouse Inventory Seizure',
    date: 'Today',
    time: '11:30 AM',
    status: 'In Session',
    mode: 'Text',
    presidingJudge: "Hon'ble High Court Division Bench",
    summaryNote: 'Arguments on interim injunction against administrative seizure under Article 226.'
  }
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-verma-01',
    caseId: 'HC-COMM-2026-781',
    name: 'Verma_Technologies_v_Bharat_Cloud_Petition.pdf',
    type: 'Petition',
    uploadedBy: 'Senior Adv. Rajesh Sharma',
    uploadedRole: 'Petitioner Counsel',
    uploadedDate: '04 Nov 2026',
    fileSize: '1.84 MB',
    fileFormat: 'PDF/A',
    status: 'Verified',
    description: 'Original Commercial Summary Suit Plaint with Section 63 BSA electronic verification certificate and Tier-IV SLA breach exhibits.'
  },
  {
    id: 'doc-retail-01',
    caseId: 'HC-WRIT-2026-512',
    name: 'Writ_Petition_Article226_Inventory_Seizure.pdf',
    type: 'Petition',
    uploadedBy: 'Senior Adv. Rajesh Sharma',
    uploadedRole: 'Petitioner Counsel',
    uploadedDate: '22 Jan 2026',
    fileSize: '3.4 MB',
    fileFormat: 'PDF/A',
    status: 'Verified',
    description: 'High Court Writ Petition challenging administrative warehouse seizure notices under Article 226.'
  },
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

export const MOCK_EVIDENCE: Evidence[] = [
  {
    id: 'ev-verma-01',
    evidenceCode: 'EXHIBIT-P-1',
    caseId: 'HC-COMM-2026-781',
    title: 'Cloud Outage System Audit Logs & Tier-IV SLA Agreement',
    category: 'Digital Forensics',
    submittedBy: 'Verma Technologies Pvt. Ltd.',
    submissionDate: '04 Nov 2026',
    status: 'Admissible',
    relevanceSummary: 'Timestamped network syslog and downtime audit records demonstrating breach of Tier-IV uptime commitments.',
    custodyChain: 'Extracted directly from production infrastructure, SHA-256 sealed under Sec 63 BSA.',
    sha256Hash: '7fa29b4412c9842a6c81093f412e84c9876231d601b0451a99f12d8a39b94017'
  },
  {
    id: 'ev-writ-01',
    evidenceCode: 'EXHIBIT-W-1',
    caseId: 'HC-WRIT-2026-512',
    title: 'Impugned Inventory Seizure Notice & Warehouse Registry',
    category: 'Documentary',
    submittedBy: 'Federation of Retail Traders',
    submissionDate: '22 Jan 2026',
    status: 'Admissible',
    relevanceSummary: 'Administrative seal order and inventory audit contesting jurisdiction under Article 226.',
    custodyChain: 'Original certified copy presented before High Court Registrar.',
    sha256Hash: '9a31f7823b4112e84c9876231d601b0451a99f12d8a39b940177fa29b4412c98'
  }
];
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
