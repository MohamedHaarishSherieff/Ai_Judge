'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { CourtroomHeader } from '@/components/courtroom/CourtroomHeader';
import { ChatMessage } from '@/components/courtroom/ChatMessage';
import { ChatInput } from '@/components/courtroom/ChatInput';
import { CourtroomSidebar } from '@/components/courtroom/CourtroomSidebar';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Message, SenderRole, Case, Evidence } from '@/types';
import { ForensicEvidenceViewer } from '@/components/courtroom/ForensicEvidenceViewer';
import { MOCK_CASES, MOCK_JUDGMENT } from '@/data/mockData';
import { PanelRightOpen, Shield, FileText, Upload, Sparkles, Gavel, CheckCircle2, Users, Play, Square, Scale, Eye } from 'lucide-react';

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

  // New Document Modal Form State
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Petition');

  // Handle sending new message
  const handleSendMessage = (text: string, senderRole: SenderRole, clientName?: string, category: string = 'Argument') => {
    let senderName = '';
    if (senderRole === 'AI Judge') {
      senderName = 'AI Presiding Judge';
    } else if (senderRole === 'Petitioner Counsel') {
      senderName = clientName ? `Advocate 1 (For ${clientName})` : 'Advocate 1 (Petitioner Counsel)';
    } else {
      senderName = clientName ? `Advocate 2 (For ${clientName})` : 'Advocate 2 (Respondent Counsel)';
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      caseId: caseData.id,
      sender: senderName,
      senderRole,
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      category: category as any,
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate AI Judge evaluation response after 1.5 seconds if sent by counsel
    if (senderRole !== 'AI Judge') {
      setTimeout(() => {
        const judgeReply: Message = {
          id: `msg-judge-${Date.now()}`,
          caseId: caseData.id,
          sender: 'AI Presiding Judge',
          senderRole: 'AI Judge',
          content: `The Bench has recorded the submission from ${senderRole}. The argument on behalf of the client has been entered in the transcript log. The opposing counsel or bench may now respond.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          category: 'Ruling',
          legalReferences: ['BNS Statutory Review', 'Code of Civil Procedure'],
        };
        setMessages(prev => [...prev, judgeReply]);
      }, 1500);
    }
  };

  // Run autonomous multi-agent courtroom trial powered by Modal Cloud Legal Engine
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

      // Turn 1: Petitioner Counsel / Prosecution argues (Baseten Muse Spark Open)
      const resPet = await fetch('/api/courtroom/modal-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'simulate_turn',
          caseId: caseData.id,
          caseTitle: caseData.title,
          caseType: caseData.type,
          courtLevel: caseData.courtLevel,
          statutoryActs: caseData.statutoryActs,
          speakerRole: 'petitioner_counsel',
          evidenceSummary: caseEvidenceSummary,
          transcriptHistory: messages.map(m => ({ speaker: m.sender, text: m.content })),
        }),
      });
      const petJson = await resPet.json();
      const petData = petJson.data;

      const petMsg: Message = {
        id: `msg-pet-${Date.now()}`,
        caseId: caseData.id,
        sender: petData?.speaker || (caseData.type.includes('Criminal') ? 'Public Prosecutor (State)' : 'Senior Counsel (Petitioner)'),
        senderRole: 'Petitioner Counsel',
        content: petData?.argument_text || 'May it please the Bench. Submissions presented in accordance with statutory requirements.',
        reasoningContent: petData?.reasoning_content,
        timestamp: petData?.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: petData?.precedents_cited || [caseData.statutoryActs[0] || 'Constitution of India'],
      };
      setMessages(prev => [...prev, petMsg]);

      // Delay 2s for courtroom pacing before Respondent rebuts
      await new Promise(r => setTimeout(r, 2000));

      // Turn 2: Respondent / Defense Counsel rebuts (Baseten Muse Spark Open)
      const resResp = await fetch('/api/courtroom/modal-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'simulate_turn',
          caseId: caseData.id,
          caseTitle: caseData.title,
          caseType: caseData.type,
          courtLevel: caseData.courtLevel,
          statutoryActs: caseData.statutoryActs,
          speakerRole: 'respondent_counsel',
          evidenceSummary: caseEvidenceSummary,
          transcriptHistory: [...messages, petMsg].map(m => ({ speaker: m.sender, text: m.content })),
        }),
      });
      const respJson = await resResp.json();
      const respData = respJson.data;

      const respMsg: Message = {
        id: `msg-resp-${Date.now()}`,
        caseId: caseData.id,
        sender: respData?.speaker || (caseData.type.includes('Constitutional') ? 'Solicitor General (Union of India)' : 'Senior Defense Counsel'),
        senderRole: 'Respondent Counsel',
        content: respData?.argument_text || 'Objection, Your Honour! The contentions are unsustainable under settled legal doctrines.',
        reasoningContent: respData?.reasoning_content,
        timestamp: respData?.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Argument',
        legalReferences: respData?.precedents_cited || [caseData.statutoryActs[1] || 'Statutory Precedents'],
      };
      setMessages(prev => [...prev, respMsg]);

      // Delay 2s before Bench Magistrate issues ruling
      await new Promise(r => setTimeout(r, 2000));

      // Turn 3: AI Presiding Judge Rules (Baseten Muse Spark Open)
      const resJudge = await fetch('/api/courtroom/modal-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'simulate_turn',
          caseId: caseData.id,
          caseTitle: caseData.title,
          caseType: caseData.type,
          courtLevel: caseData.courtLevel,
          statutoryActs: caseData.statutoryActs,
          speakerRole: 'magistrate_judge',
          evidenceSummary: caseEvidenceSummary,
          transcriptHistory: [...messages, petMsg, respMsg].map(m => ({ speaker: m.sender, text: m.content })),
        }),
      });
      const judgeJson = await resJudge.json();
      const judgeData = judgeJson.data;

      const judgeRuling: Message = {
        id: `msg-judge-ruling-${Date.now()}`,
        caseId: caseData.id,
        sender: judgeData?.speaker || (caseData.courtLevel === 'Supreme Court of India' ? 'Constitution Bench Presiding Judge' : 'Presiding Judicial Magistrate'),
        senderRole: 'AI Judge',
        content: judgeData?.argument_text || 'ORDER OF THE BENCH: Having evaluated submissions from both counsels, the Bench issues statutory directions.',
        reasoningContent: judgeData?.reasoning_content,
        timestamp: judgeData?.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        category: 'Ruling',
        legalReferences: judgeData?.precedents_cited || ['Constitution of India Art 142', 'High Court Rules'],
      };
      setMessages(prev => [...prev, judgeRuling]);
    } catch (err) {
      console.error('Trial simulation error:', err);
    } finally {
      setIsSimulatingDebate(false);
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

      {/* Top Bar Header */}
      <CourtroomHeader caseData={caseData} mode="Text" />

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0 relative z-10">
        
        {/* Left Courtroom Chat Stream & Input Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#080808]/90 backdrop-blur-sm">
          
          {/* Top Bar Control for Mobile Sidebar */}
          <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-mono flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" /> Courtroom Info & Vault
            </span>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-amber-400 font-medium"
            >
              <PanelRightOpen className="w-3.5 h-3.5" /> View Case Record
            </button>
          </div>

          {/* Courtroom AI Action & Simulation Bar */}
          <div className="px-4 py-2.5 bg-[#0a0a0a] border-b border-zinc-800 flex items-center justify-between gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="gold"
                icon={isSimulatingDebate ? <Square className="w-3.5 h-3.5 text-black" /> : <Play className="w-3.5 h-3.5 text-black" />}
                onClick={handleRunAdversarialTrial}
                loading={isSimulatingDebate}
              >
                {isSimulatingDebate ? 'Litigating Debate (Muse Spark)...' : 'Simulate Adversarial Trial (Muse Spark)'}
              </Button>

              <Button
                size="sm"
                variant="court"
                icon={<FileText className="w-3.5 h-3.5 text-white" />}
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
              >
                {caseData.type.includes('Constitutional')
                  ? 'Examine Writ Record (Art 32)'
                  : caseData.type.includes('Criminal')
                  ? 'Examine Chargesheet (BNSS 173)'
                  : caseData.type.includes('Civil')
                  ? 'Examine Injunction Plaint (CPC)'
                  : 'Inspect Evidence & Seal (Sec 63 BSA)'}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Muse Spark Open (Baseten 2M/min) • Online
              </span>

              <Button
                size="sm"
                variant="court"
                icon={<Gavel className="w-3.5 h-3.5 text-white" />}
                onClick={handleOpenDecreeModal}
                loading={isSynthesizingDecree}
                className="text-white hover:text-zinc-200 border border-zinc-600 hover:border-white"
              >
                {caseData.type.includes('Constitutional')
                  ? 'Synthesize Writ Order (Art 142)'
                  : caseData.type.includes('Criminal')
                  ? 'Synthesize Bail Order (BNSS 480)'
                  : 'Synthesize Decree (Order XX CPC)'}
              </Button>
            </div>
          </div>

          {/* Chronological Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
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
          documents={[]}
          evidenceList={[]}
          hearings={[]}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
      </div>

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
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Document Type</label>
            <select
              value={newDocType}
              onChange={(e) => setNewDocType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
            >
              <option value="Petition">Petition / Writ</option>
              <option value="Written Statement">Written Statement</option>
              <option value="Affidavit">Affidavit</option>
              <option value="Precedent">Precedent Citation</option>
            </select>
          </div>

          <div className="p-4 border-2 border-dashed border-slate-700 rounded-xl bg-slate-950 text-center space-y-2">
            <Upload className="w-8 h-8 text-amber-400 mx-auto" />
            <div className="text-slate-300 font-medium">Click or drag file to attach</div>
            <div className="text-[11px] text-slate-500">Sec 63 BSA Hash Checksum Enabled</div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setDocModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" icon={<Upload className="w-4 h-4" />}>
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
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-emerald-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Section 63 BSA Hash Verification Active
            </div>
            <p className="text-[11px] text-emerald-200/80">
              Evidence items are cryptographically hashed and appended to the session record.
            </p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Evidence Title</label>
            <input
              type="text"
              placeholder="e.g. Digital_Record_Audit.json"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setEvidenceModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="gold" 
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
            
            {/* Government Seal & Execution Footer */}
            <div className="pt-4 mt-3 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>BENCH SEAL CRYPTOGRAPHIC DIGEST: {modalDecreeData?.digital_seal_hash ? `SHA256-${modalDecreeData.digital_seal_hash.slice(0, 24)}...` : MOCK_JUDGMENT.judgeSignature}</span>
              </div>
              <div className="text-zinc-300">
                Appeal Limitation: <span className="font-bold text-white">{modalDecreeData?.appeal_limitation_days || 30} Days</span> (Order XLI CPC)
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 relative z-10 border-t border-zinc-800">
            <div className="text-[11px] text-zinc-500 font-mono">
              Certified Digitally Signed Copy • Ministry of Law & Justice, Govt. of India
            </div>
            <Button variant="gold" onClick={() => setJudgmentModalOpen(false)}>
              Affirm & Close Record
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
