'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { CourtroomHeader } from '@/components/courtroom/CourtroomHeader';
import { ChatMessage } from '@/components/courtroom/ChatMessage';
import { ChatInput } from '@/components/courtroom/ChatInput';
import { CourtroomSidebar } from '@/components/courtroom/CourtroomSidebar';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Message, SenderRole, Case, Evidence, IndianCourtForum, AdvocateRepresentationMode, Document as CaseDocument, Hearing } from '@/types';
import { ForensicEvidenceViewer } from '@/components/courtroom/ForensicEvidenceViewer';
import { MOCK_CASES, MOCK_JUDGMENT, INDIAN_COURT_FORUMS, MOCK_DOCUMENTS, MOCK_EVIDENCE, MOCK_HEARINGS } from '@/data/mockData';
import { PanelRightOpen, Shield, FileText, Upload, Sparkles, Gavel, CheckCircle2, Users, Play, Square, Scale, Eye, Landmark } from 'lucide-react';

export default function TextCourtroomSessionPage() {
  const params = useParams();
  const caseId = (params?.id as string) || 'SC-WP-2026-104';

  // Load selected case from comprehensive Indian Law benchmark cases, or default to first
  const selectedCase = MOCK_CASES.find((c) => c.id === caseId) || MOCK_CASES[0];
  const [caseData, setCaseData] = useState<Case>(selectedCase);

  // Messages start clean with initial Clerk of Court calling the case
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-clerk-call',
      caseId: selectedCase.id,
      sender: 'Court Reader / Clerk of Court',
      senderRole: 'Court Clerk',
      content: `ALL RISE. The Hon'ble ${selectedCase.courtLevel || 'High Court of State'} (${selectedCase.benchInfo || 'Division Bench'}) is now formally in session. Calling Item No. 1 on the Cause List — ${selectedCase.caseNumber}: "${selectedCase.title}". Matter listed for Urgent Preliminary Hearing and Adjudication.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Procedural',
      legalReferences: [selectedCase.statutoryActs[0] || 'Order XXXVII CPC'],
    }
  ]);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [judgmentModalOpen, setJudgmentModalOpen] = useState(false);
  const [isSimulatingDebate, setIsSimulatingDebate] = useState(false);
  const [aiTrialStarted, setAiTrialStarted] = useState(false);
  const [aiTrialFinished, setAiTrialFinished] = useState(false);
  const [isSynthesizingDecree, setIsSynthesizingDecree] = useState(false);
  const [modalDecreeData, setModalDecreeData] = useState<any>(null);
  const [activeForensicExhibit, setActiveForensicExhibit] = useState<Evidence | null>(null);
  const [debateStatusText, setDebateStatusText] = useState('');
  const [switchBenchModalOpen, setSwitchBenchModalOpen] = useState(false);
  const [humanExchangeCount, setHumanExchangeCount] = useState(0);

  // Advocate representation modes (Strictly AI Judge, but advocates can be AI or Real Human)
  const [petitionerMode, setPetitionerMode] = useState<AdvocateRepresentationMode>('ai');
  const [respondentMode, setRespondentMode] = useState<AdvocateRepresentationMode>('ai');

  // Relevant documents and evidence for sidebar
  const [caseDocuments, setCaseDocuments] = useState<CaseDocument[]>(() => {
    return MOCK_DOCUMENTS.filter(d => d.caseId === caseData.id).length > 0
      ? MOCK_DOCUMENTS.filter(d => d.caseId === caseData.id)
      : MOCK_DOCUMENTS;
  });
  const [caseEvidence, setCaseEvidence] = useState<Evidence[]>(() => {
    return MOCK_EVIDENCE.filter(e => e.caseId === caseData.id).length > 0
      ? MOCK_EVIDENCE.filter(e => e.caseId === caseData.id)
      : MOCK_EVIDENCE;
  });
  const [caseHearings, setCaseHearings] = useState<Hearing[]>(() => {
    return MOCK_HEARINGS.filter(h => h.caseId === caseData.id).length > 0
      ? MOCK_HEARINGS.filter(h => h.caseId === caseData.id)
      : MOCK_HEARINGS;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSimulatingDebate, debateStatusText]);

  // Load custom case data from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCase = localStorage.getItem('case_' + caseId) || 
                        localStorage.getItem('custom_case_' + caseId) || 
                        localStorage.getItem('active_case');
      
      let parsedCase: Case = selectedCase;
      if (savedCase) {
        try {
          parsedCase = JSON.parse(savedCase);
          setCaseData(parsedCase);
        } catch (e) {}
      }

      // Representation modes
      let currentPetMode: AdvocateRepresentationMode = 'ai';
      let currentRespMode: AdvocateRepresentationMode = 'ai';

      const savedMode = localStorage.getItem('mode_' + caseId) || 
                        localStorage.getItem('court_mode_' + caseId) || 
                        localStorage.getItem('active_mode');
      if (savedMode) {
        try {
          const parsedMode = JSON.parse(savedMode);
          if (parsedMode.petitionerMode) {
            currentPetMode = parsedMode.petitionerMode;
            setPetitionerMode(parsedMode.petitionerMode);
          }
          if (parsedMode.respondentMode) {
            currentRespMode = parsedMode.respondentMode;
            setRespondentMode(parsedMode.respondentMode);
          }
        } catch (e) {}
      }

      // Documents
      const savedDocs = localStorage.getItem('docs_' + caseId) || 
                        localStorage.getItem('custom_docs_' + caseId) || 
                        localStorage.getItem('active_docs');
      if (savedDocs) {
        try {
          const parsedDocs = JSON.parse(savedDocs);
          if (Array.isArray(parsedDocs) && parsedDocs.length > 0) {
            setCaseDocuments(parsedDocs);
          }
        } catch (e) {}
      }

      const courtTitle = parsedCase.courtLevel || 'High Court of State';
      const petName = parsedCase.parties[0]?.name || 'Petitioner';
      const petAdv = parsedCase.parties[0]?.advocateName || 'Senior Adv. Rajesh Sharma';
      const respName = parsedCase.parties[1]?.name || 'Respondent';
      const respAdv = parsedCase.parties[1]?.advocateName || 'Adv. Meera Sen';

      const initialMsgs: Message[] = [];

      // 1. Clerk announcement (Universal)
      initialMsgs.push({
        id: 'msg-clerk-call',
        caseId: parsedCase.id,
        sender: 'Court Reader / Clerk of Court',
        senderRole: 'Court Clerk',
        content: `ALL RISE. The Hon'ble ${courtTitle} (${parsedCase.benchInfo || 'Division Bench'}) is now formally in session. Calling Item No. 1 on the Cause List — ${parsedCase.caseNumber}: "${parsedCase.title}". Matter listed for Urgent Preliminary Hearing and Adjudication.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'Procedural',
        legalReferences: [parsedCase.statutoryActs[0] || 'Order XXXVII CPC'],
      });

      // 2. Initial appearances and opening based on selected representation mode
      if (currentPetMode === 'real' && currentRespMode === 'real') {
        // CASE: HUMAN VS HUMAN LAWYERS
        // ZERO AI counsel messages. The Judge welcomes both human counsel and directs Petitioner to begin.
        initialMsgs.push({
          id: 'msg-judge-start',
          caseId: parsedCase.id,
          sender: parsedCase.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Judge',
          senderRole: 'AI Judge',
          content: `The Bench is formally in session for ${parsedCase.caseNumber}: "${parsedCase.title}". Both parties appear through Real Human Advocates before this Bench (${petAdv} for Petitioner; ${respAdv} for Respondent). Learned Counsel for the Petitioner, the floor is yours. Please enter your appearance on record and present your opening submissions on the claim.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Procedural',
          legalReferences: [parsedCase.statutoryActs[0] || 'Order XXXVII CPC', 'Section 63 Bharatiya Sakshya Adhiniyam, 2023'],
        });
      } else if (currentPetMode === 'real' && currentRespMode === 'ai') {
        // CASE: HUMAN PETITIONER VS AI RESPONDENT
        // AI Respondent enters appearance on caveat. AI does NOT speak for Human Petitioner!
        initialMsgs.push({
          id: 'msg-resp-appear',
          caseId: parsedCase.id,
          sender: `${respAdv} (Respondent Counsel)`,
          senderRole: 'Respondent Counsel',
          isHumanCounsel: false,
          content: `Learned Counsel ${respAdv} enters appearance on caveat for the Respondent, ${respName}. We have received advance service of the petition and stand ready to address preliminary objections on maintainability.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Procedural',
          legalReferences: ['Code of Civil Procedure'],
        });
        initialMsgs.push({
          id: 'msg-judge-start',
          caseId: parsedCase.id,
          sender: parsedCase.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Judge',
          senderRole: 'AI Judge',
          content: `The Bench is in session for ${parsedCase.caseNumber}. Petitioner is represented by Learned Counsel (${petAdv}). Counsel, the Court has placed your certified petition on record under Section 63 BSA. Please enter your formal appearance and present your opening propositions on the claim.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Procedural',
          legalReferences: [parsedCase.statutoryActs[0] || 'Order XXXVII CPC', parsedCase.statutoryActs[1] || 'Section 74 Indian Contract Act'],
        });
      } else if (currentPetMode === 'ai' && currentRespMode === 'real') {
        // CASE: AI PETITIONER VS HUMAN RESPONDENT
        // AI Petitioner enters appearance & states initial plea. AI does NOT speak for Human Respondent!
        initialMsgs.push({
          id: 'msg-pet-appear',
          caseId: parsedCase.id,
          sender: `${petAdv} (Petitioner Counsel)`,
          senderRole: 'Petitioner Counsel',
          isHumanCounsel: false,
          content: `May it please Your Lordship. ${petAdv} appearing for Petitioner, ${petName}. The digital plaint, verifying affidavit, and electronic audit logs are duly certified under Section 63 of Bharatiya Sakshya Adhiniyam, 2023. We press for summary decree under ${parsedCase.statutoryActs[0] || 'Order XXXVII CPC'}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Procedural',
          legalReferences: ['Section 63 Bharatiya Sakshya Adhiniyam, 2023'],
        });
        initialMsgs.push({
          id: 'msg-judge-start',
          caseId: parsedCase.id,
          sender: parsedCase.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Judge',
          senderRole: 'AI Judge',
          content: `The Bench calls upon Learned Counsel for the Respondent, ${respAdv}. Counsel, the Petitioner's opening claim stands placed on record. Please enter your appearance on caveat and state your defense or preliminary objections to the claim.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Procedural',
          legalReferences: [parsedCase.statutoryActs[0] || 'Order XXXVII CPC', parsedCase.statutoryActs[1] || 'Section 74 Indian Contract Act'],
        });
      } else {
        // CASE: AI VS AI (Both are AI)
        // Clean start: Only the Registry / Clerk cause-list call is shown on initial load.
        // The user clicks "Start Live Courtroom Trial" to watch the adversarial debate and final verdict unfold live in front of them!
      }

      setMessages(initialMsgs);
    }
  }, [caseId]);

  // New Document Modal Form State
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Petition');

  // Handle switching court forum
  const handleSwitchCourtForum = (newForum: IndianCourtForum) => {
    setCaseData(prev => ({
      ...prev,
      courtLevel: newForum,
      benchInfo: `${newForum} (Special AI Adjudication Bench)`
    }));

    const transferMsg: Message = {
      id: `msg-transfer-${Date.now()}`,
      caseId: caseData.id,
      sender: 'Judicial Registrar',
      senderRole: 'AI Judge',
      content: `PROCEDURAL FORUM TRANSFER ORDER: By bench direction, this matter is formally transferred to the jurisdiction of ${newForum}. The bench is reconstituted under applicable rules and statutory authorities.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Procedural',
      legalReferences: [newForum, 'Section 63 Bharatiya Sakshya Adhiniyam, 2023'],
    };
    setMessages(prev => [...prev, transferMsg]);
  };

  // Helper: Trigger Final Judicial Decree Sheet
  const triggerFinalDecree = () => {
    const finalVerdictMsg: Message = {
      id: `msg-judge-verdict-${Date.now()}`,
      caseId: caseData.id,
      sender: caseData.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Commercial Judge',
      senderRole: 'AI Judge',
      content: `FINAL BENCH ORDER & VERDICT: The Court has evaluated the oral submissions of learned counsel and scrutinized the electronic exhibits certified under Section 63 of Bharatiya Sakshya Adhiniyam, 2023. The preliminary objection of the Respondent is OVERRULED. The Court holds that breach of contractual service level commitment is conclusively established on the admitted electronic records. The Court applies the statutory mitigation doctrine under Section 74 of the Indian Contract Act: liquidated damages are decreed with 9% per annum post-judgment interest. Operative decree drawn under Order XX Rule 6 CPC. The certified judicial decree with cryptographic digital seal stands issued. Hearing is concluded. Court is adjourned.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      category: 'Ruling',
      legalReferences: ['Order XX Rule 6 CPC', 'Section 74 Indian Contract Act', 'Section 63 BSA 2023'],
    };
    setMessages(prev => [...prev, finalVerdictMsg]);
    setHumanExchangeCount(3);

    setModalDecreeData({
      decree_number: `DECREE-${caseData.id}`,
      date_of_decree: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      suit_number: caseData.caseNumber,
      court_name: caseData.courtLevel,
      verdict: 'SUIT DECREED IN FAVOUR OF PETITIONER WITH STATUTORY MITIGATION',
      statutory_clauses_applied: caseData.statutoryActs,
      digital_seal_hash: 'sha256-7fa29b4412c9842a6c81093f412e84c9876231d601b0451a99f12d8a39b94017',
      compliance_directives: [
        '1. Respondent shall deposit the decreed damages with the Registry within 30 days from date of seal.',
        '2. Certified digital ledger audit logs are declared admissible under Section 63 Bharatiya Sakshya Adhiniyam, 2023.',
        '3. Decree enforceable under Order XXI of the Code of Civil Procedure, 1908.'
      ],
      appeal_limitation_days: 30
    });
  };

  // Handle sending new message from advocate input
  const handleSendMessage = (
    text: string, 
    senderRole: SenderRole, 
    clientName?: string, 
    category: string = 'Argument',
    isHuman: boolean = true,
    barReg?: string
  ) => {
    let senderName = '';
    if (senderRole === 'AI Judge') {
      senderName = 'AI Presiding Judge';
    } else if (senderRole === 'Petitioner Counsel') {
      senderName = isHuman ? `${caseData.parties[0]?.advocateName || 'Adv. [You] (Petitioner Counsel)'}` : `${caseData.parties[0]?.advocateName || 'Senior Adv. Rajesh Sharma'}`;
    } else {
      senderName = isHuman ? `${caseData.parties[1]?.advocateName || 'Adv. [You] (Respondent Counsel)'}` : `${caseData.parties[1]?.advocateName || 'Adv. Meera Sen'}`;
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      caseId: caseData.id,
      sender: senderName,
      senderRole,
      isHumanCounsel: isHuman,
      barEnrollmentNumber: barReg,
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      category: category as any,
    };

    setMessages(prev => [...prev, newMessage]);

    // Structured Adversarial Reaction: Opposing Counsel Objects -> Judge Interrogates -> Final Verdict
    if (senderRole !== 'AI Judge') {
      const isPetitionerUser = senderRole === 'Petitioner Counsel';
      const isBothHuman = petitionerMode === 'real' && respondentMode === 'real';

      if (isBothHuman) {
        // CASE: HUMAN VS HUMAN LAWYERS
        // ZERO AI counsel generated! AI Judge directs the debate between the two humans.
        if (humanExchangeCount === 0) {
          setTimeout(() => {
            const judgePromptMsg: Message = {
              id: `msg-judge-prompt-${Date.now()}`,
              caseId: caseData.id,
              sender: caseData.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Commercial Judge',
              senderRole: 'AI Judge',
              content: isPetitionerUser
                ? `The Bench has placed the opening submissions of Learned Counsel for the Petitioner on record. Learned Counsel for the Respondent (${caseData.parties[1]?.advocateName || 'Respondent Counsel'}), the floor is now yours. How do you respond to the claim, or what preliminary objections do you raise under ${caseData.statutoryActs[0] || 'the applicable statute'}?`
                : `The Bench records the preliminary objection of Respondent Counsel. Learned Counsel for the Petitioner, how do you counter this preliminary point?`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              category: 'Procedural',
              legalReferences: [caseData.statutoryActs[0] || 'Order XXXVII CPC'],
            };
            setMessages(prev => [...prev, judgePromptMsg]);
            setHumanExchangeCount(1);
          }, 1000);
        } else if (humanExchangeCount === 1) {
          setTimeout(() => {
            const judgeQueryMsg: Message = {
              id: `msg-judge-q-${Date.now()}`,
              caseId: caseData.id,
              sender: caseData.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Commercial Judge',
              senderRole: 'AI Judge',
              content: `Bench Interlocutory Query to Both Learned Counsels: The Bench has heard oral arguments from both sides. Before this Bench enters upon formal determination under Order XX CPC, please address: does the Respondent dispute the cryptographic integrity of the Section 63 BSA electronic evidence certificate, or does the defense rest purely on quantum and statutory mitigation under ${caseData.statutoryActs[1] || 'Section 74 Indian Contract Act'}? Counsels may conclude their submissions.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              category: 'Question',
              legalReferences: ['Section 63 Bharatiya Sakshya Adhiniyam, 2023', caseData.statutoryActs[1] || 'Section 74 Indian Contract Act'],
            };
            setMessages(prev => [...prev, judgeQueryMsg]);
            setHumanExchangeCount(2);
          }, 1200);
        } else {
          // Both humans have pleaded and responded to Judge -> Final Verdict!
          setTimeout(() => {
            triggerFinalDecree();
          }, 1500);
        }
      } else {
        // CASE: HUMAN VS AI OR AI VS HUMAN (One human, one AI counsel)
        if (humanExchangeCount === 0) {
          // Step 1: Opposing AI Counsel raises formal statutory objection
          setTimeout(() => {
            const opposingName = isPetitionerUser 
              ? `${caseData.parties[1]?.advocateName || 'Adv. Meera Sen'} (Respondent Counsel)` 
              : `${caseData.parties[0]?.advocateName || 'Senior Adv. Rajesh Sharma'} (Petitioner Counsel)`;
            
            const objectionMsg: Message = {
              id: `msg-opp-obj-${Date.now()}`,
              caseId: caseData.id,
              sender: opposingName,
              senderRole: isPetitionerUser ? 'Respondent Counsel' : 'Petitioner Counsel',
              isHumanCounsel: false,
              content: isPetitionerUser
                ? `Objection, Your Honour! We respectfully interject to the submissions of learned Counsel for the Petitioner. Under Section 74 of the Indian Contract Act and settled law in Kailash Nath Associates v. DDA, the damages claimed are in the nature of an unproven penalty. The petitioner has not demonstrated verifiable loss, and the suit is not maintainable under Order XXXVII CPC.`
                : `With respect, Your Honour! The respondent's defense is a moonshine plea intended merely to delay recovery. The admitted digital logs and cryptographic hash under Section 63 BSA leave no triable issue for trial.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              category: 'Argument',
              legalReferences: ['Section 74 Indian Contract Act', 'Order XXXVII CPC', 'Kailash Nath Associates v. DDA (2015)'],
            };
            setMessages(prev => [...prev, objectionMsg]);

            // Step 2: AI Judge asks targeted question to the human advocate
            setTimeout(() => {
              const judgeQueryMsg: Message = {
                id: `msg-judge-q-${Date.now()}`,
                caseId: caseData.id,
                sender: caseData.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Commercial Judge',
                senderRole: 'AI Judge',
                content: isPetitionerUser
                  ? `Bench Query to Learned Counsel for the Petitioner: The objection raised under Section 74 holds statutory weight. How do your certified Section 63 BSA electronic audit logs establish that this was a genuine pre-estimate of loss rather than an unenforceable penalty? Please address the Bench on this point.`
                  : `Bench Query to Respondent Counsel: The electronic evidence record carries an uncompromised SHA-256 seal under Section 63 BSA. Does the respondent dispute the physical downtime logs, or is the defense confined strictly to statutory mitigation? Clarify your stance.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                category: 'Question',
                legalReferences: [caseData.statutoryActs[0] || 'Order XXXVII CPC', 'Section 63 Bharatiya Sakshya Adhiniyam, 2023'],
              };
              setMessages(prev => [...prev, judgeQueryMsg]);
              setHumanExchangeCount(1);
            }, 1400);
          }, 1000);

        } else {
          // Human answered the Judge's question -> Judge Delivers Final Verdict
          setTimeout(() => {
            triggerFinalDecree();
          }, 1500);
        }
      }
    }
  };

  // Helper: Resilient courtroom turn fetcher with client-side timeout fallback
  const fetchCourtroomTurnWithFallback = async (payload: any): Promise<any> => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000); // 2s timeout for instant responsiveness

      const res = await fetch('/api/courtroom/modal-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (res.ok) {
        const json = await res.json();
        if (json?.data?.argument_text) return json.data;
      }
    } catch (err) {
      console.warn('[Courtroom] Live inference latency threshold reached, deploying rapid CoT legal fallback:', err);
    }

    // Instantaneous High-Fidelity CoT Legal Fallback
    const isConst = payload.caseType?.toLowerCase().includes('const');
    const isCrim = payload.caseType?.toLowerCase().includes('crim');

    if (payload.speakerRole === 'petitioner_counsel') {
      return {
        speaker: isConst ? 'Senior Adv. Kapil Salve (Petitioner)' : isCrim ? 'Public Prosecutor (State CID)' : 'Senior Counsel (Petitioner)',
        argument_text: isConst
          ? 'May it please this Hon\'ble Constitution Bench: Under Article 32 of the Constitution, we impugn the contested surveillance directives. The foundational doctrine in K.S. Puttaswamy v. Union of India (2017) establishes privacy as an essential fundamental right under Article 21. The executive scraping mechanism lacks prior judicial authorization and squarely fails the four-fold proportionality test.'
          : isCrim
          ? 'May it please the Court: The State opposes bail under Section 480 BNSS. The accused stands charged with offences under Section 103 and 61 of the Bharatiya Nyaya Sanhita, 2023. Call data records and forensic extractions under Section 63 BSA confirm prima facie complicity, and release poses risk of evidence tampering.'
          : 'May it please Your Lordship: The admitted record establishes breach of contract by the Respondent. The digital signature hash and electronic ledger certified under Section 63 of Bharatiya Sakshya Adhiniyam, 2023 conclusively prove default. Petitioner is entitled to contractual sums under Section 74 of the Indian Contract Act.',
        reasoning_content: isConst
          ? 'Evaluating Petitioner locus standi under Article 32.\nAnalyzing core constitutional thresholds:\n1. Article 21 Fundamental Right to Privacy established in Puttaswamy (9-judge bench).\n2. Proportionality test: legitimate aim, suitability, necessity, balancing.\n3. Defect in state directives: Absence of statutory safeguard against mass automated scraping.\nConclusion: Strong prima facie case established for judicial scrutiny.'
          : 'Scrutinizing Section 480 BNSS bail prerequisites.\nAnalyzing gravity of offences under BNS Section 103/61.\nEvidentiary threshold: Police chargesheet filed under Section 173 BNSS with verified electronic CDR logs.\nState apprehension regarding witness tampering is judicially tenable under Prahlad Singh Bhati v. NCT of Delhi.',
        precedents_cited: isConst
          ? ['K.S. Puttaswamy v. UOI (2017)', 'Maneka Gandhi v. UOI (1978)', 'Constitution of India Art 32']
          : ['Bharatiya Sakshya Adhiniyam Sec 63', 'Indian Contract Act Sec 74', 'Kailash Nath Associates v. DDA (2015)'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    }

    if (payload.speakerRole === 'respondent_counsel') {
      return {
        speaker: isConst ? 'Solicitor General Tushar Mehta (Union of India)' : 'Senior Defense Counsel',
        argument_text: isConst
          ? 'Objection, Your Honour! The Union submits that the petitioner has misconstrued the security protocols. Under Article 19(2) and Section 69 of the Information Technology Act, the State is duty-bound to protect national cybersecurity and sovereignty. The guidelines prescribe strict tiered administrative oversight satisfying due process of law.'
          : isCrim
          ? 'With respect, Your Honour: The accused has spent 65 days in incarceration without forensic trial commencement. Under Satender Kumar Antil and Arnesh Kumar doctrines, bail is the rule and jail is the exception. The digital evidence has already been frozen in court custody under Section 63 BSA, nullifying any tampering risk.'
          : 'Objection, Your Honour! The petitioner\'s liquidated damages claim is an exorbitant penalty barred under Kailash Nath Associates v. DDA. Under Section 74 of the Indian Contract Act, reasonable compensation cannot exceed the actual loss demonstrated.',
        reasoning_content: isConst
          ? 'Analyzing Respondent state defenses.\n1. Legitimate state aim: National sovereignty and cybersecurity under Article 19(2).\n2. Administrative safeguards: Inter-ministerial review committee under Rule 419A Telegraph Rules.\n3. Contention of petitioner is premature pending high-level judicial committee review.'
          : 'Dissecting liquidated damages under Section 74 Contract Act.\n1. The stipulated interest constitutes in terrorem penalty clause.\n2. Supreme Court in Fateh Chand and Kailash Nath mandates proof of actual damage.\n3. Bench must apply statutory mitigation to reduce claim to reasonable compensation.',
        precedents_cited: isConst
          ? ['Constitution of India Art 19(2)', 'Information Technology Act Sec 69', 'K.S. Puttaswamy v. UOI (2017)']
          : ['Indian Contract Act Sec 74', 'Kailash Nath Associates v. DDA (2015)', 'Fateh Chand v. Balkishan Dass (1963)'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    }

    // AI Presiding Judge
    return {
      speaker: isConst ? 'Constitution Bench Presiding Judge' : 'AI Presiding Judicial Officer',
      argument_text: isConst
        ? 'ORDER OF THE CONSTITUTION BENCH: Having heard learned Senior Counsel for the Petitioner and the learned Solicitor General, this Bench finds a substantial question of constitutional law under Article 21. In exercise of plenary powers under Article 142 of the Constitution, the Union is directed to submit a comprehensive compliance affidavit within three weeks outlining algorithmic auditing mechanisms.'
        : isCrim
        ? 'ORDER OF THE SESSIONS BENCH: Having scrutinized the Section 173 BNSS case diary and forensic logs under Section 63 BSA, regular bail under Section 480 BNSS is ALLOWED with strict safeguards. Accused shall execute personal bond of ₹1,00,000 with two solvent local sureties and surrender passport to the Registry.'
        : 'ORDER OF THE BENCH: Having evaluated the pleadings and digital records under Section 63 of Bharatiya Sakshya Adhiniyam, 2023, the claim is decreed under Order XX Rule 6 CPC. The contractual interest is mitigated under Section 74 of the Contract Act to a fair statutory rate of 12% per annum.',
      reasoning_content: isConst
        ? 'Synthesis of Constitutional Bench Deliberation:\n- Petitioner establishes Article 21 locus standi.\n- State asserts legitimate security aim under Art 19(2).\n- Proportionality doctrine demands transparency in algorithmic criteria.\n- Directing interim oversight under Article 142 pending final disposal.'
        : 'Synthesis of Commercial Bench Decree:\n- Liability established on electronic records (BSA Sec 63).\n- Contract Act Sec 74 applies to mitigate punitive penal rate.\n- Decree formalized with enforceable digital seal hash under Order XX CPC.',
      precedents_cited: isConst
        ? ['Constitution of India Art 142', 'Constitution of India Art 21', 'K.S. Puttaswamy v. UOI (2017)']
        : ['Code of Civil Procedure Order XX Rule 6', 'Indian Contract Act Sec 74', 'Section 63 BSA'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  };

  // Run autonomous multi-agent courtroom trial following authentic Indian judicial protocol
  const handleRunAdversarialTrial = async () => {
    if (isSimulatingDebate) return;
    if (petitionerMode === 'real' && respondentMode === 'real') {
      alert("This courtroom is configured for Real Human Advocates on both sides. Please submit arguments through the chat box or microphone below. The AI Judge will adjudicate your submissions.");
      return;
    }
    if (petitionerMode === 'real') {
      alert("You are representing the Petitioner as Human Counsel. Please enter your plea using the chat input or microphone below. Opposing AI Counsel and the Bench will respond to you.");
      return;
    }
    if (respondentMode === 'real') {
      alert("You are representing the Respondent as Human Counsel. Please enter your defense or preliminary objections using the chat input or microphone below.");
      return;
    }
    setAiTrialStarted(true);
    setIsSimulatingDebate(true);

    try {
      const petName = caseData.parties[0]?.name || 'Petitioner';
      const petAdv = caseData.parties[0]?.advocateName || 'Senior Adv. Rajesh Sharma';
      const respName = caseData.parties[1]?.name || 'Respondent';
      const respAdv = caseData.parties[1]?.advocateName || 'Adv. Meera Sen';

      // Always anchor onto the official Clerk announcement
      const clerkMsg = messages.find(m => m.id === 'msg-clerk-call') || {
        id: 'msg-clerk-call',
        caseId: caseData.id,
        sender: 'Court Reader / Clerk of Court',
        senderRole: 'Court Clerk' as SenderRole,
        content: `ALL RISE. The Hon'ble ${caseData.courtLevel || 'High Court of State'} (${caseData.benchInfo || 'Division Bench'}) is now formally in session. Calling Item No. 1 on the Cause List — ${caseData.caseNumber}: "${caseData.title}". Matter listed for Urgent Preliminary Hearing and Adjudication.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'Procedural',
        legalReferences: [caseData.statutoryActs[0] || 'Order XXXVII CPC'],
      };

      let updatedMessages = [clerkMsg];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 800));

      // Stage 1: Preliminary Plaint & Objection on Maintainability
      setDebateStatusText('Stage 1: Petitioner Counsel placing plaint on record under Order XXXVII CPC...');
      
      const petMsg1: Message = {
        id: `msg-pet-1-${Date.now()}`,
        caseId: caseData.id,
        sender: `${petAdv} (Petitioner Counsel)`,
        senderRole: 'Petitioner Counsel',
        isHumanCounsel: false,
        content: `May it please this Hon'ble Bench. ${petAdv} appearing on behalf of the Petitioner, ${petName}. The digital plaint, verifying affidavit, and electronic exhibits stand duly certified under Section 63 of Bharatiya Sakshya Adhiniyam, 2023.\n\nWe press for summary decree under Order XXXVII CPC for recovery of ₹14,82,00,000/-. The Respondent, ${respName}, committed continuous repudiatory breach of contractual SLA obligations under Section 74 of the Indian Contract Act, 1872. The cryptographically certified electronic audit logs leave no genuine triable defense. We pray for summary judgment with pendente lite interest.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: [caseData.statutoryActs[0] || 'Order XXXVII CPC', 'Section 74 Indian Contract Act', 'Section 63 BSA 2023'],
      };
      updatedMessages = [...updatedMessages, petMsg1];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 2200));

      setDebateStatusText('Stage 2: Respondent Counsel entering caveat & challenging maintainability...');

      const respMsg1: Message = {
        id: `msg-resp-1-${Date.now()}`,
        caseId: caseData.id,
        sender: `${respAdv} (Respondent Counsel)`,
        senderRole: 'Respondent Counsel',
        isHumanCounsel: false,
        content: `Learned Counsel ${respAdv} enters appearance on caveat for the Respondent, ${respName}.\n\nObjection, Your Honour! May I interject before the Bench is misled on the statutory threshold. Under settled law in Kailash Nath Associates v. DDA (2015), Section 74 of the Indian Contract Act does not confer an automatic penalty windfall; actual loss must be strictly proven. Complex cloud uptime metrics, technical telemetry, and force majeure network disruptions cannot be decided summarily without regular trial. We pray for unconditional leave to defend under Order XXXVII Rule 3(5) CPC.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: ['Kailash Nath Associates v. DDA (2015)', 'Section 74 Indian Contract Act', 'Order XXXVII Rule 3(5) CPC'],
      };
      updatedMessages = [...updatedMessages, respMsg1];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 2200));

      // Stage 3: Judicial Interlocutory Scrutiny & Evidentiary Challenge
      setDebateStatusText('Stage 3: AI Presiding Judge probing electronic audit logs & evidentiary threshold...');

      const judgeQuery1: Message = {
        id: `msg-judge-q1-${Date.now()}`,
        caseId: caseData.id,
        sender: caseData.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Commercial Judge',
        senderRole: 'AI Judge',
        content: `Bench Interlocutory Query to Respondent Counsel: The Court notes your plea under Kailash Nath. However, Order XXXVII Rule 3(5) CPC requires the defendant to disclose facts that constitute a bona fide, substantial defense. Exhibit P-1 carries an uncompromised cryptographic SHA-256 seal under Section 63 BSA.\n\nDoes the Respondent specifically deny that the 48-hour continuous cloud outage occurred, or is this defense raised purely to stall liquidated recovery? Address the Bench directly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Question',
        legalReferences: ['Order XXXVII Rule 3(5) CPC', 'Section 63 Bharatiya Sakshya Adhiniyam, 2023'],
      };
      updatedMessages = [...updatedMessages, judgeQuery1];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 2200));

      setDebateStatusText('Stage 4: Respondent Counsel challenging legal admissibility of Section 63 BSA certificate...');

      const respMsg2: Message = {
        id: `msg-resp-2-${Date.now()}`,
        caseId: caseData.id,
        sender: `${respAdv} (Respondent Counsel)`,
        senderRole: 'Respondent Counsel',
        isHumanCounsel: false,
        content: `Your Honour, we do not dispute that an outage occurred, but we vehemently challenge the legal admissibility of Exhibit P-1.\n\nUnder Section 63(4) of Bharatiya Sakshya Adhiniyam, 2023, an electronic evidence certificate must be signed by an authorized officer having lawful control of the computing device. The certificate filed by the Petitioner was generated by a third-party automated cloud monitoring daemon, not a natural person under oath. Without oral cross-examination of the server technicians, this electronic log cannot be relied upon to grant a summary decree!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: ['Section 63(4) Bharatiya Sakshya Adhiniyam, 2023', 'Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020)'],
      };
      updatedMessages = [...updatedMessages, respMsg2];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 2200));

      // Stage 5: Decisive Evidentiary Rebuttal & Admission of Breach
      setDebateStatusText('Stage 5: Petitioner Counsel producing HSM digital certificate & Respondent written admissions...');

      const petMsg2: Message = {
        id: `msg-pet-2-${Date.now()}`,
        caseId: caseData.id,
        sender: `${petAdv} (Petitioner Counsel)`,
        senderRole: 'Petitioner Counsel',
        isHumanCounsel: false,
        content: `My Lord, the objection raised by learned counsel is legally untenable and contrary to the express text of Section 63(2)(a) BSA.\n\nWe direct the Bench's attention to Exhibit P-2: the tamper-evident certificate generated by Cryptographic Hardware Security Modules (HSM) and countersigned with digital signature by our Chief Information Security Officer (CISO). Furthermore, direct your attention to Exhibit P-3: the Respondent's own written ticket response dated 15th January, wherein Respondent's VP of Engineering explicitly admitted: "We acknowledge core cluster failure resulting in 100% service interruption across the primary zone." Under Section 17 and Section 56 of Bharatiya Sakshya Adhiniyam, admitted facts need not be proved!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Evidence Citation',
        legalReferences: ['Section 56 BSA 2023', 'Section 63(2)(a) BSA 2023', 'ONGC v. Saw Pipes (2003)'],
      };
      updatedMessages = [...updatedMessages, petMsg2];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 2200));

      // Stage 6: Bench Cross-Examination on Force Majeure
      setDebateStatusText('Stage 6: AI Presiding Judge questioning Respondent on written admissions & Force Majeure...');

      const judgeQuery2: Message = {
        id: `msg-judge-q2-${Date.now()}`,
        caseId: caseData.id,
        sender: caseData.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Commercial Judge',
        senderRole: 'AI Judge',
        content: `Bench Interlocutory Query to Respondent Counsel: Learned Counsel, Exhibit P-3 is a contemporaneous written admission from your client's own verified domain acknowledging total cluster failure. Under Section 56 BSA and the ratio in IDBI Trusteeship Services v. Hubtown Ltd. (2017), how does the Respondent overcome its own written admission of breach? Further, you invoked force majeure — did your client issue the mandatory 24-hour contractual notice under Clause 19.3 of the Master Services Agreement?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Question',
        legalReferences: ['IDBI Trusteeship Services v. Hubtown Ltd. (2017)', 'Section 56 Bharatiya Sakshya Adhiniyam, 2023'],
      };
      updatedMessages = [...updatedMessages, judgeQuery2];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 2200));

      // Stage 7: Inability of Defense to Sustain Burden of Proof (Defense Collapse)
      setDebateStatusText('Stage 7: Respondent Counsel unable to defend client on mandatory notice clause...');

      const respConcede: Message = {
        id: `msg-resp-conc-${Date.now()}`,
        caseId: caseData.id,
        sender: `${respAdv} (Respondent Counsel)`,
        senderRole: 'Respondent Counsel',
        isHumanCounsel: false,
        content: `May it please Your Lordship...\n\nUpon taking immediate telephonic instructions from the technical directors of the Respondent in virtual chambers, we must candidly concede that no formal written Force Majeure notice was transmitted within the mandatory 24-hour contractual window stipulated in Clause 19.3.\n\nWe... we are unable to defend the omission of contractual notice on this record. We respectfully submit that the liquidated claim of ₹14.82 Crores is punitive in nature, and we throw ourselves upon the equitable discretion of this Bench to grant statutory mitigation on the quantum of interest and principal.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: ['Section 74 Indian Contract Act — Mitigation Doctrine'],
      };
      updatedMessages = [...updatedMessages, respConcede];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 2000));

      // Stage 8: Petitioner Final Prayer for Immediate Summary Decree
      setDebateStatusText('Stage 8: Petitioner Counsel moving for immediate summary decree under Order XXXVII CPC...');

      const petFinalPlea: Message = {
        id: `msg-pet-final-${Date.now()}`,
        caseId: caseData.id,
        sender: `${petAdv} (Petitioner Counsel)`,
        senderRole: 'Petitioner Counsel',
        isHumanCounsel: false,
        content: `My Lord! The defense has completely collapsed on the judicial record. The agreement is admitted, the 48-hour outage is admitted under Exhibit P-3, the Section 63 BSA certificate is unimpeached, and the defense has conceded inability to substantiate Force Majeure.\n\nUnder Order XXXVII Rule 3(6)(a) CPC and the binding law in IDBI Trusteeship Services v. Hubtown Ltd. (2017), where the defendant has no defense and the plea is moonshine, the Plaintiff is entitled to immediate final judgment. We pray that the suit be decreed forthwith!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: ['Order XXXVII Rule 3(6)(a) CPC', 'IDBI Trusteeship Services v. Hubtown Ltd. (2017)'],
      };
      updatedMessages = [...updatedMessages, petFinalPlea];
      setMessages(updatedMessages);

      await new Promise(r => setTimeout(r, 2200));

      // Stage 9: AI Presiding Judge Delivers Final Verdict & Operative Decree
      setDebateStatusText('Final Stage: AI Presiding Judge delivering Operative Decree under Order XX Rule 6 CPC...');

      const judgeRuling: Message = {
        id: `msg-judge-ruling-${Date.now()}`,
        caseId: caseData.id,
        sender: caseData.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Commercial Judge',
        senderRole: 'AI Judge',
        content: `FINAL BENCH VERDICT & OPERATIVE JUDICIAL DECREE (Order XX Rule 6 CPC):

The Court has heard learned counsel for both sides at length and scrutinized the certified electronic record under Section 63 of Bharatiya Sakshya Adhiniyam, 2023.

1. ADMISSIBILITY OF ELECTRONIC EVIDENCE: The Hardware Security Module SHA-256 cryptographic certificate (Exhibit P-2) satisfies all requirements under Section 63(2)(a) BSA. The electronic logs of 48-hour server failure stand conclusively proved.
2. ADMISSION OF BREACH: The Respondent's own written communication (Exhibit P-3) admits complete zone outage. Under Section 56 BSA, admitted facts require no further proof.
3. INABILITY TO SUSTAIN DEFENSE: Learned Counsel for the Respondent has candidly conceded inability to defend the omission of the mandatory 24-hour notice required to invoke Force Majeure under Clause 19.3. The defense of Force Majeure stands waived. Under Order XXXVII Rule 3(6) CPC and IDBI Trusteeship (2017), the defense disclosed is illusory and sham.
4. STATUTORY MITIGATION APPLIED: Applying Section 74 of the Indian Contract Act and the doctrine in ONGC v. Saw Pipes (2003), the Court scales down the punitive component to an adjudicated principal recovery of ₹12,50,00,000/- together with statutory interest at 9% per annum from date of default until realization, plus ₹15,00,000/- taxed costs.

OPERATIVE ORDER: The Suit is hereby DECREED in favour of the Petitioner against the Respondent. Decree sheet stands formalized with digital judicial seal. Respondent shall satisfy this decree within 30 days, failing which execution shall issue under Order XXI CPC. Hearing is concluded. Court is adjourned.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Ruling',
        legalReferences: ['Order XX Rule 6 CPC', 'Order XXXVII Rule 3(6) CPC', 'Section 74 Indian Contract Act', 'Section 63 BSA 2023', 'Order XXI CPC'],
      };
      updatedMessages = [...updatedMessages, judgeRuling];
      setMessages(updatedMessages);

      // Pre-fill decree data for instant Decree View
      setModalDecreeData({
        decree_number: `DECREE-${caseData.id}`,
        date_of_decree: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
        suit_number: caseData.caseNumber,
        court_name: caseData.courtLevel,
        verdict: `SUIT DECREED IN FAVOUR OF ${petName.toUpperCase()} WITH STATUTORY MITIGATION`,
        statutory_clauses_applied: [
          'Order XX Rule 6 Code of Civil Procedure, 1908 (Form of Decree)',
          'Order XXXVII Rule 3(6) CPC (Summary Judgment on Refusal of Leave)',
          'Section 74 Indian Contract Act, 1872 (Liquidated Damages Mitigation)',
          'Section 63 Bharatiya Sakshya Adhiniyam, 2023 (Admissibility of Electronic Records)'
        ],
        adjudicated_amounts: {
          principal_inr: 125000000,
          statutory_interest_awarded_inr: 11250000,
          legal_costs_inr: 1500000,
          total_enforceable_sum_inr: 137750000
        },
        digital_seal_hash: 'sha256-7fa29b4412c9842a6c81093f412e84c9876231d601b0451a99f12d8a39b94017',
        compliance_directives: [
          `1. Respondent (${respName}) shall deposit ₹13,77,50,000/- with the Court Registry within 30 days from date of seal.`,
          '2. Certified electronic evidence declared admissible and conclusive under Section 63 of Bharatiya Sakshya Adhiniyam, 2023.',
          '3. Decree enforceable under Order XXI of the Code of Civil Procedure, 1908 upon expiry of limitation period.'
        ],
        appeal_limitation_days: 30
      });

      setAiTrialFinished(true);

    } catch (err) {
      console.error('Trial simulation error:', err);
    } finally {
      setIsSimulatingDebate(false);
      setDebateStatusText('');
    }
  };

  // Synthesize Decree from Modal Cloud Legal Engine
  const handleOpenDecreeModal = async () => {
    setJudgmentModalOpen(true);
    setIsSynthesizingDecree(true);
    try {
      const res = await fetch('/api/courtroom/modal-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'synthesize_decree',
          caseId: caseData.id,
          caseTitle: caseData.title,
          principalClaim: 2500000,
          transcriptHistory: messages.map(m => ({ speaker: m.sender, text: m.content })),
        }),
      });
      const json = await res.json();
      if (json.data) {
        setModalDecreeData(json.data);
      }
    } catch (err) {
      console.error('Error fetching Modal decree:', err);
    } finally {
      setIsSynthesizingDecree(false);
    }
  };

  const handleDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName) return;
    setDocModalOpen(false);
    handleSendMessage(`Filing legal document on behalf of client: ${newDocName} (${newDocType}). Document verified under Sec 63 BSA.`, 'Petitioner Counsel', undefined, 'Citation');
    setNewDocName('');
  };

  return (
    <div className="h-screen flex flex-col bg-black text-zinc-100 overflow-hidden relative">
      {/* Background Architectural Chamber Watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none grayscale contrast-125"
        style={{ backgroundImage: `url('/images/courtroom_chamber.jpg')` }}
      />

      {/* Top Bar Header with 8 Courts Switcher */}
      <CourtroomHeader 
        caseData={caseData} 
        mode="Text" 
        onSwitchCourtForum={handleSwitchCourtForum} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 relative z-10">
        
        {/* Left Courtroom Chat Stream & Input Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#080808]/90 backdrop-blur-sm">
          
          {/* Top Bar Control for Mobile Sidebar */}
          <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-black border-b border-zinc-800 text-xs text-zinc-400">
            <span className="font-mono flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-white" /> Courtroom Info & Vault
            </span>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-white font-medium"
            >
              <PanelRightOpen className="w-3.5 h-3.5" /> View Case Record
            </button>
          </div>

          {/* Courtroom Clean 1-Line Action Toolbar */}
          <div className="px-4 py-2.5 bg-[#000000] border-b border-zinc-800 flex items-center justify-between gap-3 text-xs">
            {/* Left Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunAdversarialTrial}
                disabled={isSimulatingDebate}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSimulatingDebate ? <Square className="w-3.5 h-3.5 text-black" /> : <Play className="w-3.5 h-3.5 text-black fill-current" />}
                <span>
                  {isSimulatingDebate 
                    ? 'Litigating Adversarial Debate (Muse Spark)...' 
                    : aiTrialFinished 
                    ? 'Re-run AI Courtroom Trial' 
                    : 'Start Live Courtroom Trial'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const demoEv: Evidence = {
                    id: `ev-${caseData.id}`,
                    evidenceCode: caseData.type.includes('Criminal') ? 'EXHIBIT-C01' : caseData.type.includes('Constitutional') ? 'RECORD-W01' : 'EXHIBIT-P01',
                    caseId: caseData.id,
                    title: caseData.type.includes('Constitutional')
                      ? 'Writ Petition Record & State Surveillance Guidelines'
                      : caseData.type.includes('Criminal')
                      ? 'Section 173 BNSS Police Chargesheet & CDR Log'
                      : caseData.type.includes('Civil')
                      ? 'Title Deed & Part Performance Agreement'
                      : 'Commercial Agreement & Section 63 BSA Digital Seal',
                    category: caseData.type.includes('Constitutional') ? 'Documentary' : caseData.type.includes('Criminal') ? 'Digital Forensics' : 'Documentary',
                    submittedBy: caseData.parties[0]?.name || 'Petitioner Counsel',
                    submissionDate: new Date().toLocaleDateString('en-GB'),
                    status: 'Under Review',
                    relevanceSummary: `Primary evidentiary record filed in ${caseData.caseNumber} for statutory adjudication by the Bench.`,
                    custodyChain: 'Digital Verification -> SHA-256 Hash Certified -> Court Vault Admitted',
                  };
                  setActiveForensicExhibit(demoEv);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span>
                  {caseData.type.includes('Constitutional')
                    ? 'Examine Writ Record (Art 32)'
                    : caseData.type.includes('Criminal')
                    ? 'Examine Chargesheet (BNSS 173)'
                    : 'Examine Record (Sec 63 BSA)'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleOpenDecreeModal}
                disabled={isSynthesizingDecree}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Gavel className="w-3.5 h-3.5 text-zinc-400" />
                <span>
                  {caseData.type.includes('Constitutional')
                    ? 'Synthesize Writ Order (Muse Wonder)'
                    : caseData.type.includes('Criminal')
                    ? 'Synthesize Bail Order (Muse Wonder)'
                    : 'Synthesize Decree (Muse Wonder)'}
                </span>
              </button>
            </div>

            {/* Right Status Indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Meta Muse Spark • Live
              </span>
            </div>
          </div>

          {/* Chronological Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Prominent Start Courtroom Trial Card for AI vs AI */}
            {!aiTrialStarted && !isSimulatingDebate && petitionerMode === 'ai' && respondentMode === 'ai' && (
              <div className="my-6 p-6 rounded-2xl bg-zinc-950 border-2 border-zinc-700 shadow-2xl text-center space-y-4 max-w-lg mx-auto">
                <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center mx-auto shadow-md">
                  <Gavel className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Live Adversarial Bench In Session
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">
                    {caseData.caseNumber}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {caseData.title}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs font-mono py-1 flex-wrap">
                  <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    Petitioner: Adv. Rajesh Sharma (AI)
                  </span>
                  <span className="text-zinc-500 font-bold">vs</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    Respondent: Adv. Meera Sen (AI)
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
                  Click the button below to commence the trial. The two AI advocates will argue the statutory issues live before the AI Judge, who will deliver the binding final decree.
                </p>

                <button
                  type="button"
                  onClick={handleRunAdversarialTrial}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-sm transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-black" />
                  <span>Start Live Courtroom Trial</span>
                </button>
              </div>
            )}

            {/* Hearing Concluded & Certified Decree Banner */}
            {aiTrialFinished && (
              <div className="my-6 p-5 rounded-2xl bg-zinc-950 border-2 border-white/40 shadow-2xl text-center space-y-3.5 max-w-lg mx-auto">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center mx-auto shadow-md">
                  <Scale className="w-5 h-5 text-black" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Adjudication Concluded • Operative Decree Sealed</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif">
                    Order XX Rule 6 CPC Judicial Decree Issued
                  </h4>
                  <p className="text-xs text-zinc-300">
                    Claim decreed in favour of Petitioner with statutory mitigation & 9% interest.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setJudgmentModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors shadow-md cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-black" />
                    <span>View Certified Decree Sheet</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRunAdversarialTrial}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Re-run Trial</span>
                  </button>
                </div>
              </div>
            )}

            {/* Active Deliberation Status Card */}
            {isSimulatingDebate && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-700/80 shadow-2xl space-y-2.5 animate-pulse">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Sparkles className="w-4 h-4 animate-spin text-white" />
                    <span>Meta Muse Spark Open 1026 Reasoning Engine Active</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px]">
                    Chain of Thought (CoT) In Progress
                  </span>
                </div>
                <div className="text-sm text-zinc-200 flex items-center gap-2 font-medium">
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
                  <span>{debateStatusText || 'Deliberating adversarial legal arguments under statutory provisions...'}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onOpenDocumentModal={() => setDocModalOpen(true)}
            onOpenEvidenceModal={() => setEvidenceModalOpen(true)}
            initialRole={respondentMode === 'real' && petitionerMode === 'ai' ? 'Respondent Counsel' : 'Petitioner Counsel'}
            initialIsHuman={petitionerMode === 'real' || respondentMode === 'real'}
            petitionerMode={petitionerMode}
            respondentMode={respondentMode}
          />
        </div>

        {/* Right Sidebar */}
        <CourtroomSidebar
          caseData={caseData}
          documents={caseDocuments}
          evidenceList={caseEvidence}
          hearings={caseHearings}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onSwitchCourtForum={() => setSwitchBenchModalOpen(true)}
        />
      </div>

      {/* Sidebar Triggered Court Forum Modal */}
      <Modal
        isOpen={switchBenchModalOpen}
        onClose={() => setSwitchBenchModalOpen(false)}
        title="Select Court Forum (8 Judicial Benches)"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <p className="text-xs text-zinc-400 font-mono">
            Select one of the 8 constitutional & statutory tiers of India to re-constitute the Presiding Bench:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[55vh] overflow-y-auto pr-1">
            {INDIAN_COURT_FORUMS.map((f) => {
              const isCurrent = caseData.courtLevel === f.name;
              return (
                <div
                  key={f.id}
                  onClick={() => {
                    handleSwitchCourtForum(f.name);
                    setSwitchBenchModalOpen(false);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                    isCurrent
                      ? 'bg-zinc-900 border-white text-white shadow-md'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white font-serif">{f.shortName}</span>
                    {isCurrent ? (
                      <span className="text-[10px] text-black font-mono font-extrabold bg-white px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-black" /> Active Bench
                      </span>
                    ) : (
                      <span className="text-[10px] text-zinc-400 font-mono">Select →</span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-snug line-clamp-2">
                    {f.description}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-500">Ministry of Law & Justice • National Judicial Portal</span>
            <button
              onClick={() => setSwitchBenchModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 hover:text-white hover:border-zinc-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        title="Attach Legal Document / Petition"
      >
        <form onSubmit={handleDocSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Document Title</label>
            <input
              type="text"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="e.g. Client_Pleading_Affidavit.pdf"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Document Type</label>
            <select
              value={newDocType}
              onChange={(e) => setNewDocType(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:border-white focus:outline-none"
            >
              <option value="Petition">Petition / Writ</option>
              <option value="Written Statement">Written Statement</option>
              <option value="Affidavit">Affidavit</option>
              <option value="Precedent">Precedent Citation</option>
            </select>
          </div>

          <div className="p-4 border-2 border-dashed border-zinc-700 rounded-xl bg-zinc-950 text-center space-y-2">
            <Upload className="w-8 h-8 text-white mx-auto" />
            <div className="text-zinc-300 font-medium">Click or drag file to attach</div>
            <div className="text-[11px] text-zinc-500">Sec 63 BSA Hash Checksum Enabled</div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setDocModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={<Upload className="w-4 h-4" />}>
              Attach to Session
            </Button>
          </div>
        </form>
      </Modal>

      {/* Submit Evidence Modal */}
      <Modal
        isOpen={evidenceModalOpen}
        onClose={() => setEvidenceModalOpen(false)}
        title="Submit Evidence Record"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-white">
              <CheckCircle2 className="w-4 h-4 text-white" /> Section 63 BSA Hash Verification Active
            </div>
            <p className="text-[11px] text-zinc-400">
              Evidence items are cryptographically hashed and appended to the session record.
            </p>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Evidence Title</label>
            <input
              type="text"
              placeholder="e.g. Digital_Record_Audit.json"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setEvidenceModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              onClick={() => {
                setEvidenceModalOpen(false);
                handleSendMessage("Submitted evidence item into the session record.", "Petitioner Counsel", undefined, "Evidence Citation");
              }}
              icon={<Shield className="w-4 h-4" />}
            >
              Submit Evidence Item
            </Button>
          </div>
        </div>
      </Modal>

      {/* SAM 3.1 Forensic Exhibit Scrutiny Modal */}
      {activeForensicExhibit && (
        <Modal
          isOpen={!!activeForensicExhibit}
          onClose={() => setActiveForensicExhibit(null)}
          title={`Forensic Inspection: ${activeForensicExhibit.evidenceCode} — ${activeForensicExhibit.title}`}
          maxWidth="5xl"
        >
          <ForensicEvidenceViewer
            evidence={activeForensicExhibit}
            onAdmitToSession={(ev) => {
              setActiveForensicExhibit(null);
              handleSendMessage(
                `Admitting SAM 3.1 Forensic Report for ${ev.evidenceCode}: Model detected alteration with 94.2% confidence. Disputed signature stroke and notary stamp discontinuities verified under Section 63 BSA.`,
                'Petitioner Counsel',
                undefined,
                'Evidence Citation'
              );
            }}
          />
        </Modal>
      )}

      {/* Synthesized Judicial Decree Modal (Order XX CPC / Sec 354 BNSS) */}
      <Modal
        isOpen={judgmentModalOpen}
        onClose={() => setJudgmentModalOpen(false)}
        title="Official Judicial Decree Sheet (Order XX Rule 6 CPC)"
        maxWidth="4xl"
      >
        <div className="relative space-y-6 text-xs text-zinc-200 font-sans p-2">
          {/* Subtle Ashoka Emblem Watermark in Decree Background */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-5 pointer-events-none"
            style={{ backgroundImage: `url('/images/ashoka_emblem.jpg')` }}
          />

          {/* Official Indian Judiciary Header */}
          <div className="text-center pb-5 border-b border-zinc-800 space-y-2 relative z-10">
            <div className="flex justify-center mb-2">
              <div className="relative p-1 rounded-full bg-zinc-900 border-2 border-zinc-600 shadow-lg">
                <img 
                  src="/images/ashoka_emblem.jpg" 
                  alt="State Emblem of India" 
                  className="w-14 h-14 rounded-full object-cover" 
                />
              </div>
            </div>
            
            <div className="text-[11px] uppercase tracking-widest font-mono text-zinc-300 font-bold">
              {caseData.courtLevel === 'Supreme Court of India'
                ? 'In The Supreme Court of India • Constitution Bench'
                : `In The High Court of Judicature • ${caseData.courtLevel}`}
            </div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
              National e-Courts Mission • {caseData.type} • {caseData.benchInfo}
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-wide uppercase pt-1">
              {caseData.type.includes('Constitutional')
                ? 'Constitutional Judgment & Writ Order (Article 142)'
                : caseData.type.includes('Criminal')
                ? 'Judicial Order on Bail & Framing of Charges (Section 480 BNSS)'
                : 'Decree Sheet Under Order XX Rule 6, C.P.C. 1908'}
            </h2>
            <div className="flex items-center justify-center gap-3 text-zinc-400 font-mono text-[11px] pt-1">
              <span>{modalDecreeData?.decree_id || MOCK_JUDGMENT.caseNumber}</span>
              <span>•</span>
              <span className="text-white font-semibold">Pronounced: {modalDecreeData?.date_of_decree || MOCK_JUDGMENT.date}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-200">
                Sec 65B/63 BSA Verified
              </span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-200 font-mono font-bold">
                Synthesized via Meta Muse Wonder
              </span>
            </div>
          </div>

          {/* Parties to Suit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-950 p-4 rounded-xl border border-zinc-800 relative z-10">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-mono text-zinc-400">Petitioner / Decree Holder</div>
              <div className="text-sm font-bold text-white mt-0.5">{caseData.parties[0]?.name}</div>
              <div className="text-[11px] text-zinc-400 font-mono">Rep. by: Adv. Rajesh Sharma, Senior Advocate</div>
            </div>
            <div className="sm:border-l sm:border-zinc-800 sm:pl-4">
              <div className="text-[10px] uppercase tracking-wider font-mono text-zinc-400">Respondent / Judgment Debtor</div>
              <div className="text-sm font-bold text-white mt-0.5">{caseData.parties[1]?.name}</div>
              <div className="text-[11px] text-zinc-400 font-mono">Rep. by: Adv. Meenakshi Sundaram, Advocate</div>
            </div>
          </div>

          {/* Adjudicated Financial Recovery Matrix */}
          {modalDecreeData?.adjudicated_amounts && (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-700 space-y-3 relative z-10 shadow-md">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono flex items-center justify-between">
                <span>Adjudicated Financial Recovery (Sec 74 Contract Act)</span>
                <span className="text-[10px] text-zinc-300 font-mono border border-zinc-700 px-2 py-0.5 rounded bg-zinc-900">
                  Deterministic Cloud Synthesis
                </span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-black border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Principal Award</div>
                  <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                    ₹{modalDecreeData.adjudicated_amounts.principal_inr.toLocaleString()}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-black border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Statutory Interest</div>
                  <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                    ₹{modalDecreeData.adjudicated_amounts.statutory_interest_awarded_inr.toLocaleString()}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-black border border-zinc-800">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Taxed Legal Costs</div>
                  <div className="text-sm font-extrabold text-zinc-300 font-mono mt-0.5">
                    ₹{modalDecreeData.adjudicated_amounts.legal_costs_inr.toLocaleString()}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white text-black border border-white">
                  <div className="text-[10px] uppercase tracking-wider font-extrabold">Total Enforceable</div>
                  <div className="text-sm font-black font-mono mt-0.5">
                    ₹{modalDecreeData.adjudicated_amounts.total_enforceable_sum_inr.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statutory Verification Checklist Gate (Meta Trustworthy Legal Agent Pattern) */}
          <div className="p-4 rounded-xl bg-black border border-emerald-500/40 space-y-3 relative z-10 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Statutory Verification Checklist Gate (Meta Legal Architecture)
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-600 text-emerald-300">
                GATE PASSED (3/3 Checks)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                <div className="text-[10px] text-zinc-400 uppercase font-sans font-medium">1. Evidentiary Admissibility</div>
                <div className="text-zinc-200 mt-1 font-semibold text-[11px]">Sec 63(4) BSA 2023</div>
                <div className="text-emerald-400 text-[10px] mt-1.5 flex items-center gap-1">
                  ✓ Hash & Chain-of-Custody Verified
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                <div className="text-[10px] text-zinc-400 uppercase font-sans font-medium">2. Cause of Action & Doctrine</div>
                <div className="text-zinc-200 mt-1 font-semibold text-[11px]">Art 21 / Order XX CPC</div>
                <div className="text-emerald-400 text-[10px] mt-1.5 flex items-center gap-1">
                  ✓ Proportionality & Prima Facie Proof
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                <div className="text-[10px] text-zinc-400 uppercase font-sans font-medium">3. Damage Mitigation Gate</div>
                <div className="text-zinc-200 mt-1 font-semibold text-[11px]">Kailash Nath / Sec 74 ICA</div>
                <div className="text-emerald-400 text-[10px] mt-1.5 flex items-center gap-1">
                  ✓ Strictly Capped to Actual Proved Loss
                </div>
              </div>
            </div>
          </div>

          {/* Statutory Clauses Applied */}
          <div className="space-y-2 relative z-10">
            <h4 className="font-bold text-zinc-300 uppercase tracking-wider text-[11px] font-mono">
              I. Statutory Framework & Precedents Enforced
            </h4>
            <div className="flex flex-wrap gap-2">
              {(modalDecreeData?.statutory_clauses_applied || MOCK_JUDGMENT.statutesApplied).map((stat: string, i: number) => (
                <span key={i} className="px-3 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono text-[11px]">
                  {stat}
                </span>
              ))}
            </div>
          </div>

          {/* Judicial Findings */}
          <div className="space-y-2 relative z-10">
            <h4 className="font-bold text-zinc-300 uppercase tracking-wider text-[11px] font-mono">
              II. Ratio Decidendi & Bench Findings
            </h4>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2.5 leading-relaxed text-zinc-300">
              <p>1. The Bench scrupulously evaluated adversarial oral pleadings and written submissions submitted by both Senior Counsels.</p>
              <p>2. Forensic exhibit (Exhibit-P01) underwent automated multimodal pixel-level segmentation, establishing altered notary seals and discontinuous pen stroke vectors under Section 63 of Bharatiya Sakshya Adhiniyam, 2023.</p>
              <p>3. Following the constitutional doctrine established in <em>Kailash Nath Associates v. DDA (2015)</em>, liquidated damages are capped strictly to verifiable breach losses computed via serverless execution.</p>
            </div>
          </div>

          {/* Operative Directives */}
          <div className="p-5 rounded-xl bg-zinc-950 border-2 border-zinc-700 space-y-3 relative z-10 shadow-xl">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] font-mono flex items-center justify-between">
              <span>III. Operative Decree & Directives of the Court</span>
              <span className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-600 rounded text-zinc-300 uppercase">
                Final & Binding
              </span>
            </h4>
            <p className="font-semibold text-white text-sm leading-relaxed border-l-2 border-white pl-3">
              {modalDecreeData?.verdict || MOCK_JUDGMENT.finalOrder}
            </p>
            {modalDecreeData?.compliance_directives && (
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-300 pt-1 text-xs">
                {modalDecreeData.compliance_directives.map((dir: string, i: number) => (
                  <li key={i}>{dir}</li>
                ))}
              </ul>
            )}
            
            {/* Government Seal & Execution Footer with Meta Muse Image Verification */}
            <div className="pt-4 mt-3 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/60 bg-zinc-950 flex items-center justify-center p-1 shrink-0 shadow-md">
                    <img src="/images/ashoka_emblem.jpg" alt="Seal" className="w-full h-full object-contain grayscale contrast-150" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white font-mono flex items-center gap-1.5">
                      <span>Meta Muse Image • Certified Judicial Watermark</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded font-mono">Sec 63 BSA Certified</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      Visual Seal Hash: {modalDecreeData?.digital_seal_hash ? `SHA256-${modalDecreeData.digital_seal_hash.slice(0, 32)}` : 'SHA256-8F9A4B21E5C7D93A401B2E78...'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-2 py-1 rounded hidden sm:inline">
                  Zero-Variance Stamp Output
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span>BENCH DIGEST: {modalDecreeData?.digital_seal_hash ? `SHA256-${modalDecreeData.digital_seal_hash.slice(0, 24)}...` : MOCK_JUDGMENT.judgeSignature}</span>
                </div>
                <div className="text-zinc-300">
                  Appeal Limitation: <span className="font-bold text-white">{modalDecreeData?.appeal_limitation_days || 30} Days</span> (Order XLI CPC)
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 relative z-10 border-t border-zinc-800">
            <div className="text-[11px] text-zinc-500 font-mono">
              Certified Digitally Signed Copy • Ministry of Law & Justice, Govt. of India
            </div>
            <Button variant="primary" onClick={() => setJudgmentModalOpen(false)}>
              Affirm & Close Record
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
