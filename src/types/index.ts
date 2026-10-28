export type UserRole = 'Lawyer' | 'Client' | 'Observer' | 'Judge';

export type CaseStatus = 
  | 'Draft' 
  | 'Submitted' 
  | 'Hearing' 
  | 'Judgment' 
  | 'Appealed' 
  | 'Closed';

export type CaseType = 
  | 'Criminal Matter' 
  | 'Civil Dispute' 
  | 'Constitutional Law' 
  | 'Corporate & Commercial' 
  | 'Intellectual Property' 
  | 'Family Law';

export type CourtLevel = 
  | 'District Court' 
  | 'High Court of State' 
  | 'Supreme Court of India';

export interface Party {
  id: string;
  name: string;
  role: 'Petitioner' | 'Respondent' | 'Prosecution' | 'Defence' | 'Intervener';
  advocateName?: string;
  barCouncilNo?: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  type: CaseType;
  courtLevel: CourtLevel;
  status: CaseStatus;
  filedDate: string;
  lastHearing?: string;
  nextHearing?: string;
  summary: string;
  parties: Party[];
  statutoryActs: string[]; // e.g. "BNS Section 302", "IPC 420", "Arbitration Act Sec 11"
  issuesForDetermination: string[];
  benchInfo: string;
}

export interface Hearing {
  id: string;
  caseId: string;
  hearingNumber: string;
  title: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'In Session' | 'Completed' | 'Adjourned';
  mode: 'Text' | 'Video';
  presidingJudge: string;
  summaryNote?: string;
}

export type SenderRole = 'AI Judge' | 'Petitioner Counsel' | 'Respondent Counsel' | 'Court Clerk' | 'Observer';

export interface Message {
  id: string;
  caseId: string;
  sender: string;
  senderRole: SenderRole;
  avatar?: string;
  content: string;
  timestamp: string;
  category?: 'Argument' | 'Citation' | 'Ruling' | 'Question' | 'Evidence Citation' | 'Procedural';
  legalReferences?: string[];
  attachedDocIds?: string[];
}

export interface Document {
  id: string;
  caseId: string;
  name: string;
  type: 'Petition' | 'Written Statement' | 'Affidavit' | 'Precedent' | 'Statute' | 'Annexure';
  uploadedBy: string;
  uploadedRole: string;
  uploadedDate: string;
  fileSize: string;
  fileFormat: string;
  status: 'Verified' | 'Pending Verification' | 'Rejected';
  description?: string;
}

export interface EvidenceSegment {
  id: string;
  label: string;
  box: [number, number, number, number]; // [ymin, xmin, ymax, xmax] percentages 0-100
  confidence: number;
  findings: string;
  severity: 'Low' | 'Medium' | 'Critical';
}

export interface ForensicInspectionResult {
  modelUsed: 'SAM 3.1 (Segment Anything)' | 'Rule-based Checksum';
  analyzedAt: string;
  tamperDetected: boolean;
  tamperConfidence: number;
  summary: string;
  segments: EvidenceSegment[];
}

export interface Evidence {
  id: string;
  evidenceCode: string;
  caseId: string;
  title: string;
  category: 'Documentary' | 'Digital Forensics' | 'Physical Item' | 'Video/Audio Recording' | 'Expert Testimony';
  submittedBy: string;
  submissionDate: string;
  status: 'Submitted' | 'Under Review' | 'Admissible' | 'Inadmissible';
  relevanceSummary: string;
  custodyChain: string;
  imageUrl?: string;
  sha256Hash?: string;
  forensicAnalysis?: ForensicInspectionResult;
}

export interface Judgment {
  id: string;
  caseId: string;
  caseNumber: string;
  title: string;
  courtName: string;
  date: string;
  bench: string;
  partiesText: string;
  background: string[];
  issues: string[];
  petitionerArguments: string[];
  respondentArguments: string[];
  statutesApplied: string[];
  legalAnalysis: string[];
  findings: string[];
  finalOrder: string;
  judgeSignature: string;
}

export interface Appeal {
  id: string;
  caseId: string;
  originalCaseNumber: string;
  appellantName: string;
  respondentName: string;
  groundsForAppeal: string[];
  targetCourt: CourtLevel;
  filingDate: string;
  status: 'Pending Admission' | 'Admitted' | 'Stay Granted' | 'Dismissed' | 'Under Review';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  barId?: string;
  avatarUrl?: string;
}
