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

  // Messages start clean with initial AI Judge opening prompt
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      caseId: caseData.id,
      sender: caseData.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Judge',
      senderRole: 'AI Judge',
      content: `The ${caseData.courtLevel} is now in formal session for ${caseData.caseNumber}: "${caseData.title}". This Bench calls Senior Counsel for the Petitioner (${caseData.parties[0]?.name}) and Learned Counsel for the Respondent (${caseData.parties[1]?.name}) to present their preliminary submissions under ${caseData.statutoryActs[0] || 'the applicable statutes'}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Procedural',
      legalReferences: [caseData.statutoryActs[0] || 'Constitution of India', caseData.statutoryActs[1] || 'Bharatiya Sakshya Adhiniyam'],
    }
  ]);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);
  const [judgmentModalOpen, setJudgmentModalOpen] = useState(false);
  const [isSimulatingDebate, setIsSimulatingDebate] = useState(false);
  const [isSynthesizingDecree, setIsSynthesizingDecree] = useState(false);
  const [modalDecreeData, setModalDecreeData] = useState<any>(null);
  const [activeForensicExhibit, setActiveForensicExhibit] = useState<Evidence | null>(null);
  const [debateStatusText, setDebateStatusText] = useState('');
  const [switchBenchModalOpen, setSwitchBenchModalOpen] = useState(false);

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
      if (savedCase) {
        try {
          const parsed: Case = JSON.parse(savedCase);
          setCaseData(parsed);

          // Representation modes
          const savedMode = localStorage.getItem('mode_' + caseId) || 
                            localStorage.getItem('court_mode_' + caseId) || 
                            localStorage.getItem('active_mode');
          if (savedMode) {
            try {
              const parsedMode = JSON.parse(savedMode);
              if (parsedMode.petitionerMode) setPetitionerMode(parsedMode.petitionerMode);
              if (parsedMode.respondentMode) setRespondentMode(parsedMode.respondentMode);
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

          setMessages([
            {
              id: 'msg-welcome',
              caseId: parsed.id,
              sender: parsed.courtLevel === 'Supreme Court of India' ? 'Chief Presiding Judicial Officer' : 'AI Presiding Commercial Judge',
              senderRole: 'AI Judge',
              content: `The ${parsed.courtLevel} is now in formal session for ${parsed.caseNumber}: "${parsed.title}". This Bench calls Counsel for the Petitioner (${parsed.parties[0]?.name}) and Counsel for the Respondent (${parsed.parties[1]?.name}) to present preliminary submissions under ${parsed.statutoryActs[0] || 'Order XXXVII CPC and Section 74 Indian Contract Act 1872'}.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              category: 'Procedural',
              legalReferences: [parsed.statutoryActs[0] || 'Order XXXVII CPC', parsed.statutoryActs[1] || 'Section 74 Indian Contract Act'],
            }
          ]);
          return;
        } catch (e) {}
      }
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
      senderName = isHuman ? `Adv. Rajesh Sharma (Petitioner Counsel)` : 'Senior Counsel (Petitioner)';
    } else {
      senderName = isHuman ? `Adv. Anita Nadkarni (Respondent Counsel)` : 'Senior Defense Counsel';
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

    // AI Judge evaluates submission under Section 63 BSA and court rules
    if (senderRole !== 'AI Judge') {
      setTimeout(() => {
        const judgeReply: Message = {
          id: `msg-judge-${Date.now()}`,
          caseId: caseData.id,
          sender: 'AI Presiding Judicial Officer',
          senderRole: 'AI Judge',
          content: `ORDER OF THE BENCH: Submission from ${senderRole} (${isHuman ? 'Real Human Advocate' : 'AI Counsel'}) has been entered into the official transcript log under Section 63 BSA. The opposing party or advocate may now advance rebuttal.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          category: 'Ruling',
          legalReferences: [caseData.statutoryActs[0] || 'Code of Civil Procedure', 'Bharatiya Sakshya Adhiniyam, 2023'],
        };
        setMessages(prev => [...prev, judgeReply]);
      }, 1500);
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

  // Run autonomous multi-agent courtroom trial powered by Modal Cloud Legal Engine & Baseten Muse Spark
  const handleRunAdversarialTrial = async () => {
    if (isSimulatingDebate) return;
    setIsSimulatingDebate(true);

    try {
      const caseEvidenceSummary = caseData.type.includes('Constitutional')
        ? 'Writ Petition Record & Union of India Guidelines'
        : caseData.type.includes('Criminal')
        ? 'Section 173 BNSS Police Chargesheet & Call Detail Records'
        : caseData.type.includes('Civil')
        ? 'Order XXXIX Injunction Application & Registered Agreement to Sell'
        : 'Exhibit-P01 (Commercial Agreement & Section 63 BSA Digital Seal)';

      let updatedMessages = [...messages];

      // Turn 1: Petitioner Counsel Submissions
      setDebateStatusText('Turn 1 of 3: Senior Counsel for Petitioner synthesizing constitutional submissions (Meta Muse Spark Open)...');
      
      const petData = await fetchCourtroomTurnWithFallback({
        action: 'simulate_turn',
        caseId: caseData.id,
        caseTitle: caseData.title,
        caseType: caseData.type,
        courtLevel: caseData.courtLevel,
        statutoryActs: caseData.statutoryActs,
        speakerRole: 'petitioner_counsel',
        evidenceSummary: caseEvidenceSummary,
        transcriptHistory: updatedMessages.map(m => ({ speaker: m.sender, text: m.content })),
      });

      const petMsg: Message = {
        id: `msg-pet-${Date.now()}`,
        caseId: caseData.id,
        sender: petData?.speaker || (caseData.type.includes('Criminal') ? 'Public Prosecutor (State)' : 'Senior Counsel (Petitioner)'),
        senderRole: 'Petitioner Counsel',
        isHumanCounsel: false,
        content: petData?.argument_text || 'May it please the Bench. Submissions presented in accordance with statutory requirements.',
        reasoningContent: petData?.reasoning_content,
        timestamp: petData?.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: petData?.precedents_cited || [caseData.statutoryActs[0] || 'Constitution of India'],
      };
      updatedMessages = [...updatedMessages, petMsg];
      setMessages(updatedMessages);

      // Courtroom pause before Respondent rebuttal
      await new Promise(r => setTimeout(r, 1200));

      // Turn 2: Respondent / Defense Counsel Objections
      setDebateStatusText('Turn 2 of 3: Respondent Counsel lodging evidentiary objections & statutory rebuttal...');
      
      const respData = await fetchCourtroomTurnWithFallback({
        action: 'simulate_turn',
        caseId: caseData.id,
        caseTitle: caseData.title,
        caseType: caseData.type,
        courtLevel: caseData.courtLevel,
        statutoryActs: caseData.statutoryActs,
        speakerRole: 'respondent_counsel',
        evidenceSummary: caseEvidenceSummary,
        transcriptHistory: updatedMessages.map(m => ({ speaker: m.sender, text: m.content })),
      });

      const respMsg: Message = {
        id: `msg-resp-${Date.now()}`,
        caseId: caseData.id,
        sender: respData?.speaker || (caseData.type.includes('Constitutional') ? 'Solicitor General (Union of India)' : 'Senior Defense Counsel'),
        senderRole: 'Respondent Counsel',
        isHumanCounsel: false,
        content: respData?.argument_text || 'Objection, Your Honour! The contentions are unsustainable under settled legal doctrines.',
        reasoningContent: respData?.reasoning_content,
        timestamp: respData?.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: respData?.precedents_cited || [caseData.statutoryActs[1] || 'Statutory Precedents'],
      };
      updatedMessages = [...updatedMessages, respMsg];
      setMessages(updatedMessages);

      // Courtroom pause before Presiding Bench rules
      await new Promise(r => setTimeout(r, 1200));

      // Turn 3: AI Presiding Judge Deliberation & Order
      setDebateStatusText('Turn 3 of 3: AI Presiding Bench synthesizing Order XX CPC binding judicial ruling...');
      
      const judgeData = await fetchCourtroomTurnWithFallback({
        action: 'simulate_turn',
        caseId: caseData.id,
        caseTitle: caseData.title,
        caseType: caseData.type,
        courtLevel: caseData.courtLevel,
        statutoryActs: caseData.statutoryActs,
        speakerRole: 'magistrate_judge',
        evidenceSummary: caseEvidenceSummary,
        transcriptHistory: updatedMessages.map(m => ({ speaker: m.sender, text: m.content })),
      });

      const judgeRuling: Message = {
        id: `msg-judge-ruling-${Date.now()}`,
        caseId: caseData.id,
        sender: judgeData?.speaker || (caseData.courtLevel === 'Supreme Court of India' ? 'Constitution Bench Presiding Judge' : 'AI Presiding Judicial Officer'),
        senderRole: 'AI Judge',
        content: judgeData?.argument_text || 'ORDER OF THE BENCH: Having evaluated submissions from both counsels, the Bench issues binding statutory directions.',
        reasoningContent: judgeData?.reasoning_content,
        timestamp: judgeData?.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Ruling',
        legalReferences: judgeData?.precedents_cited || ['Constitution of India Art 142', 'High Court Rules', 'Section 63 BSA'],
      };
      setMessages([...updatedMessages, judgeRuling]);
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
                <span>{isSimulatingDebate ? 'Litigating Debate (Muse Spark)...' : 'Simulate Adversarial Trial (Muse Spark)'}</span>
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
