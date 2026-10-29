'use client';

import React, { useState } from 'react';
import { Case, Document, Evidence, Hearing } from '@/types';
import { Users, FileText, Shield, AlertCircle, History, BookOpen, ChevronRight, ChevronDown, X, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface CourtroomSidebarProps {
  caseData: Case;
  documents: Document[];
  evidenceList: Evidence[];
  hearings: Hearing[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const CourtroomSidebar: React.FC<CourtroomSidebarProps> = ({
  caseData,
  documents,
  evidenceList,
  hearings,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'docs' | 'evidence' | 'hearings'>('info');

  const content = (
    <div className="w-full h-full flex flex-col bg-slate-950 border-l border-slate-800">
      {/* Mobile Drawer Header */}
      <div className="flex lg:hidden items-center justify-between p-4 border-b border-slate-800">
        <h3 className="font-semibold text-slate-100 text-sm">Case Summary & Digital Record</h3>
        {onCloseMobile && (
          <button onClick={onCloseMobile} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 bg-slate-900 border-b border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab('info')}
          className={`py-3 text-center border-b-2 transition-colors ${
            activeTab === 'info' ? 'border-amber-500 text-amber-400 font-semibold bg-slate-950' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Info
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`py-3 text-center border-b-2 transition-colors ${
            activeTab === 'docs' ? 'border-amber-500 text-amber-400 font-semibold bg-slate-950' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Docs ({documents.length})
        </button>
        <button
          onClick={() => setActiveTab('evidence')}
          className={`py-3 text-center border-b-2 transition-colors ${
            activeTab === 'evidence' ? 'border-amber-500 text-amber-400 font-semibold bg-slate-950' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Evidence
        </button>
        <button
          onClick={() => setActiveTab('hearings')}
          className={`py-3 text-center border-b-2 transition-colors ${
            activeTab === 'hearings' ? 'border-amber-500 text-amber-400 font-semibold bg-slate-950' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          History
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {activeTab === 'info' && (
          <>
            {/* Summary & Court */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">Jurisdiction & Forum</span>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="font-semibold text-slate-200">{caseData.courtLevel}</div>
                <div className="text-slate-400 text-[11px]">{caseData.benchInfo}</div>
              </div>
            </div>

            {/* Parties */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Litigating Parties
              </span>
              <div className="space-y-2">
                {caseData.parties.map((p) => (
                  <div key={p.id} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100">{p.name}</span>
                      <Badge variant={p.role === 'Petitioner' || p.role === 'Prosecution' ? 'blue' : 'emerald'}>
                        {p.role}
                      </Badge>
                    </div>
                    {p.advocateName && (
                      <div className="text-[11px] text-slate-400 mt-1">
                        Advocate: <span className="text-slate-200">{p.advocateName}</span>{p.barCouncilNo ? ` (${p.barCouncilNo})` : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory References */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">Statutory Provisions</span>
              <div className="flex flex-wrap gap-1.5">
                {caseData.statutoryActs.map((act, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-slate-300 text-[11px]">
                    {act}
                  </span>
                ))}
              </div>
            </div>

            {/* Issues for Determination */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Issues For Determination
              </span>
              <ul className="space-y-2">
                {caseData.issuesForDetermination.map((issue, i) => (
                  <li key={i} className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-slate-300 leading-relaxed">
                    <span className="font-mono text-amber-400 mr-1.5">#{i+1}</span> {issue}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Case Pleadings & Petitions</span>
              <Link href={`/cases/${caseData.id}`} className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]">
                Full Vault <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            {documents.map((doc) => (
              <div key={doc.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-200 line-clamp-1">{doc.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0">
                    {doc.type}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>By {doc.uploadedRole}</span>
                  <span>{doc.fileSize}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Admissible Evidence</span>
            </div>
            {evidenceList.map((ev) => (
              <div key={ev.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-amber-400 font-bold">{ev.evidenceCode}</span>
                  <Badge variant={ev.status === 'Admissible' ? 'emerald' : 'amber'}>
                    {ev.status}
                  </Badge>
                </div>
                <div className="font-semibold text-slate-200">{ev.title}</div>
                <p className="text-slate-400 text-[11px] leading-relaxed">{ev.relevanceSummary}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'hearings' && (
          <div className="space-y-3">
            <span className="text-slate-400 font-semibold">Previous Session Log</span>
            {hearings.map((hrg) => (
              <div key={hrg.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-200">
                  <span>{hrg.hearingNumber}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{hrg.date}</span>
                </div>
                <div className="text-slate-300 font-medium">{hrg.title}</div>
                {hrg.summaryNote && (
                  <p className="text-[11px] text-slate-400 italic">"{hrg.summaryNote}"</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:block w-80 shrink-0 h-full">
        {content}
      </aside>

      {/* Mobile drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-80 max-w-full h-full animate-in slide-in-from-right duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
