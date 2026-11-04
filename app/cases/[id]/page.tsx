'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, CaseStatusBadge } from '@/components/ui/Badge';
import { MOCK_CASES, MOCK_HEARINGS, MOCK_DOCUMENTS, MOCK_EVIDENCE, MOCK_MESSAGES } from '@/data/mockData';
import { Case, Hearing, Document, Evidence } from '@/types';
import { 
  FolderKanban, 
  MessageSquare, 
  Video, 
  FileText, 
  Shield, 
  Award, 
  History, 
  Users, 
  AlertCircle, 
  ExternalLink,
  BookOpen,
  ArrowRight,
  Gavel,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = (params?.id as string) || 'HC-COMM-2026-781';

  const [caseData, setCaseData] = useState<Case>(() => {
    return MOCK_CASES.find(c => c.id === caseId) || MOCK_CASES[0];
  });
  const [hearings, setHearings] = useState<Hearing[]>(() => {
    return MOCK_HEARINGS.filter(h => h.caseId === caseData.id);
  });
  const [documents, setDocuments] = useState<Document[]>(() => {
    return MOCK_DOCUMENTS.filter(d => d.caseId === caseData.id);
  });
  const [evidenceList, setEvidenceList] = useState<Evidence[]>(() => {
    return MOCK_EVIDENCE.filter(e => e.caseId === caseData.id);
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'hearings' | 'arguments' | 'documents' | 'evidence' | 'judgment' | 'appeals'>('overview');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCase = localStorage.getItem('custom_case_' + caseId);
      if (savedCase) {
        try {
          const parsed = JSON.parse(savedCase);
          setCaseData(parsed);

          const savedDocs = localStorage.getItem('custom_docs_' + caseId);
          if (savedDocs) {
            setDocuments(JSON.parse(savedDocs));
          } else {
            setDocuments(MOCK_DOCUMENTS.filter(d => d.caseId === caseId));
          }

          const savedEvidence = localStorage.getItem('custom_evidence_' + caseId);
          if (savedEvidence) {
            setEvidenceList(JSON.parse(savedEvidence));
          } else {
            setEvidenceList(MOCK_EVIDENCE.filter(e => e.caseId === caseId));
          }

          const savedHearings = localStorage.getItem('custom_hearings_' + caseId);
          if (savedHearings) {
            setHearings(JSON.parse(savedHearings));
          } else {
            setHearings(MOCK_HEARINGS.filter(h => h.caseId === caseId));
          }
          return;
        } catch (e) {}
      }

      // If not custom, fetch from mockData
      const found = MOCK_CASES.find(c => c.id === caseId) || MOCK_CASES[0];
      setCaseData(found);
      setHearings(MOCK_HEARINGS.filter(h => h.caseId === found.id));
      setDocuments(MOCK_DOCUMENTS.filter(d => d.caseId === found.id));
      setEvidenceList(MOCK_EVIDENCE.filter(e => e.caseId === found.id));
    }
  }, [caseId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Top Header Card */}
        <div className="p-6 bg-black rounded-2xl border border-zinc-800 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-extrabold text-black px-2.5 py-0.5 rounded bg-white border border-zinc-200">
                  {caseData.id}
                </span>
                <span className="text-xs font-mono text-zinc-400">({caseData.caseNumber})</span>
                <Badge variant="court">{caseData.type}</Badge>
                <CaseStatusBadge status={caseData.status} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">{caseData.title}</h1>
              <p className="text-xs text-zinc-300 font-mono">{caseData.benchInfo}</p>
            </div>

            {/* Quick Action Courtroom Triggers */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href={`/text-courtroom/${caseData.id}`}>
                <Button variant="primary" icon={<MessageSquare className="w-4 h-4 text-black" />}>
                  Enter Text Courtroom
                </Button>
              </Link>
              <Link href={`/video-courtroom?caseId=${caseData.id}`}>
                <Button variant="court" icon={<Video className="w-4 h-4 text-white" />}>
                  Video Hearing
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-black p-1.5 rounded-xl border border-zinc-800 text-xs font-mono no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: FolderKanban },
            { id: 'hearings', label: `Hearings (${hearings.length})`, icon: History },
            { id: 'arguments', label: 'Arguments Log', icon: MessageSquare },
            { id: 'documents', label: `Documents (${documents.length})`, icon: FileText },
            { id: 'evidence', label: `Evidence (${evidenceList.length})`, icon: Shield },
            { id: 'judgment', label: 'Judicial Decree', icon: Gavel },
            { id: 'appeals', label: 'Appeals', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-black font-extrabold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="space-y-6">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 space-y-6">
                <Card variant="bordered" className="p-6 space-y-4 bg-zinc-950 border-zinc-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Statement of Claim & Summary
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">{caseData.summary}</p>
                </Card>

                <Card variant="bordered" className="p-6 space-y-4 bg-zinc-950 border-zinc-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-zinc-400" /> Issues For Determination
                  </h3>
                  <ul className="space-y-3">
                    {caseData.issuesForDetermination.map((issue, idx) => (
                      <li key={idx} className="p-3 bg-black rounded-lg border border-zinc-800 text-xs text-zinc-200 leading-relaxed">
                        <span className="font-bold text-white mr-2 font-mono">ISSUE #{idx+1}:</span> {issue}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <Card variant="bordered" className="p-6 space-y-4 bg-zinc-950 border-zinc-800">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-zinc-400" /> Parties & Representatives
                  </h3>
                  <div className="space-y-3 text-xs">
                    {caseData.parties.map((p) => (
                      <div key={p.id} className="p-3 bg-black rounded-lg border border-zinc-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{p.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold">{p.role}</span>
                        </div>
                        {p.advocateName && (
                          <div className="text-[11px] text-zinc-400 font-mono">Advocate: {p.advocateName} ({p.barCouncilNo})</div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card variant="bordered" className="p-6 space-y-4 bg-zinc-950 border-zinc-800">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Statutory Provisions</h3>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {caseData.statutoryActs.map((act, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {act}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>

            </div>
          )}

          {/* HEARINGS TAB */}
          {activeTab === 'hearings' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Chronological Hearing History</h3>
              <div className="space-y-3">
                {hearings.map((h) => (
                  <Card key={h.id} variant="bordered" className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 border-zinc-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-white font-bold text-sm">{h.hearingNumber}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold">{h.status}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1 font-serif">{h.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{h.summaryNote}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
                      <span className="text-zinc-400">{h.date} ({h.time})</span>
                      <Link href={`/text-courtroom/${caseData.id}`}>
                        <Button variant="outline" size="sm">Session Transcript</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ARGUMENTS TAB */}
          {activeTab === 'arguments' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Pleadings & Oral Submissions Transcript</h3>
              <div className="space-y-3">
                {MOCK_MESSAGES.map((msg) => (
                  <div key={msg.id} className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{msg.sender} ({msg.senderRole})</span>
                      <span className="text-zinc-500 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed font-sans">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-serif">Case Pleadings & Digital Filings</h3>
                <Link href="/cases/new">
                  <Button variant="primary" size="sm" icon={<FileText className="w-4 h-4 text-black" />}>
                    File New Pleading
                  </Button>
                </Link>
              </div>

              {documents.length === 0 ? (
                <Card variant="bordered" className="p-8 text-center space-y-3 bg-zinc-950 border-zinc-800">
                  <FileText className="w-10 h-10 text-zinc-500 mx-auto" />
                  <div className="text-white font-bold">No documents attached yet</div>
                  <p className="text-xs text-zinc-400">File a petition or attach affidavit under Section 63 BSA.</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map((doc) => (
                    <Card key={doc.id} variant="bordered" className="p-4 space-y-3 bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-bold text-white text-sm truncate font-mono">{doc.name}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold shrink-0">
                          {doc.type}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{doc.description}</p>
                      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono flex-wrap gap-2">
                        <span className="truncate">By {doc.uploadedBy}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-emerald-400 font-medium">{doc.fileSize} • BSA Sec. 63</span>
                          <a 
                            href="/documents/Verma_Technologies_v_Bharat_Cloud_Petition.pdf" 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-white hover:bg-zinc-200 text-black font-sans font-bold text-xs rounded transition-colors inline-flex items-center gap-1 shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" /> View PDF
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EVIDENCE TAB */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Admissible Evidence Vault</h3>
              <div className="space-y-3">
                {evidenceList.map((ev) => (
                  <Card key={ev.id} variant="bordered" className="p-4 space-y-2 bg-zinc-950 border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-white text-sm">{ev.evidenceCode}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold">{ev.status}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm font-serif">{ev.title}</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">{ev.relevanceSummary}</p>
                    <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
                      Custody Chain: {ev.custodyChain}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* JUDGMENT TAB */}
          {activeTab === 'judgment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-serif">Synthesized Judicial Decree</h3>
                <Link href={`/cases/${caseData.id}/judgment`}>
                  <Button variant="primary" size="sm" icon={<Gavel className="w-4 h-4 text-black" />}>
                    Open Full Formal Judicial Viewer
                  </Button>
                </Link>
              </div>
              <Card variant="court" className="p-6 space-y-3 bg-zinc-950 border-zinc-800">
                <div className="text-xs font-mono text-white font-bold">DIGITAL DECREE PREVIEW</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Click the button above to view the official formatted judicial decree with court seals, statutory reasoning under BNS & BSA, and final orders.
                </p>
              </Card>
            </div>
          )}

          {/* APPEALS TAB */}
          {activeTab === 'appeals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-serif">Appellate Review Workflow</h3>
                <Link href="/appeals">
                  <Button variant="primary" size="sm" icon={<Award className="w-4 h-4 text-black" />}>
                    File Grounds of Appeal
                  </Button>
                </Link>
              </div>
              <Card variant="bordered" className="p-6 space-y-2 bg-zinc-950 border-zinc-800">
                <div className="text-sm font-bold text-white font-serif">Appellate High Court Escalation</div>
                <p className="text-xs text-zinc-400">
                  Case records and evidentiary logs are ready for automatic appellate escalation to the Supreme Court or High Court Division Bench.
                </p>
              </Card>
            </div>
          )}

        </div>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
