'use client';

import React, { useState } from 'react';
import { Case, Hearing, IndianCourtForum } from '@/types';
import { Gavel, Shield, Calendar, Clock, Video, FileText, ArrowLeft, Landmark, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { VideoUnavailableModal } from './VideoUnavailableModal';
import { INDIAN_COURT_FORUMS } from '@/data/mockData';
import Link from 'next/link';

interface CourtroomHeaderProps {
  caseData?: Case;
  currentHearing?: Hearing;
  mode?: 'Text' | 'Video';
  onSwitchCourtForum?: (newForum: IndianCourtForum) => void;
}

export const CourtroomHeader: React.FC<CourtroomHeaderProps> = ({
  caseData,
  currentHearing,
  mode = 'Text',
  onSwitchCourtForum,
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [switchModalOpen, setSwitchModalOpen] = useState(false);

  const displayId = caseData?.id || 'AJ-SESSION-001';
  const displayTitle = caseData?.title || 'Virtual Courtroom Session';
  const displayCourt = caseData?.courtLevel || 'High Court Virtual Bench';

  return (
    <>
      <div className="w-full bg-[#000000] border-b border-zinc-800 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/text-courtroom" className="p-2 rounded-lg bg-[#0a0a0a] border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-colors" title="Back to Courtroom Directory">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/60 bg-black flex items-center justify-center shrink-0">
                <img src="/images/ashoka_emblem.jpg" alt="State Emblem" className="w-full h-full object-cover grayscale" />
              </div>
              <span className="text-xs font-mono font-extrabold text-black px-2 py-0.5 rounded bg-white border border-zinc-200">
                {displayId}
              </span>
              <Badge variant="court">Virtual Bench Session</Badge>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-900 text-white border border-zinc-700">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                Bench In Session
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white mt-1 line-clamp-1 font-serif">
              {displayTitle}
            </h1>
          </div>
        </div>

        {/* Bench & Hearing status details */}
        <div className="flex items-center gap-3 text-xs shrink-0 flex-wrap">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-zinc-200 font-bold font-serif">{displayCourt}</span>
            <span className="text-[11px] text-zinc-400 font-mono">
              AI Presiding Judicial Officer (Autonomous Bench)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSwitchModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 text-amber-400 border border-zinc-700 hover:border-amber-400 text-xs font-mono font-medium transition-colors"
            >
              <Landmark className="w-3.5 h-3.5" />
              Switch Forum (8 Courts)
            </button>

            <button
              onClick={() => setVideoModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700 text-xs font-medium transition-colors"
            >
              <Video className="w-3.5 h-3.5 text-slate-500" />
              Switch to Video Court
            </button>
          </div>
        </div>
      </div>

      <VideoUnavailableModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />

      {/* Switch Court Forum Modal */}
      {switchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-700 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white font-serif">Transfer Proceeding to Another Judicial Forum</h3>
              </div>
              <button
                onClick={() => setSwitchModalOpen(false)}
                className="text-zinc-400 hover:text-white font-mono"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Select one of the 8 constitutional or statutory court forums of India to transfer this virtual bench session:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[55vh] overflow-y-auto pr-1">
              {INDIAN_COURT_FORUMS.map((f) => {
                const isCurrent = displayCourt === f.name;
                return (
                  <div
                    key={f.id}
                    onClick={() => {
                      if (onSwitchCourtForum) onSwitchCourtForum(f.name);
                      setSwitchModalOpen(false);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isCurrent
                        ? 'bg-amber-950/40 border-amber-400'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{f.shortName}</span>
                      {isCurrent ? (
                        <span className="text-[10px] text-amber-400 font-mono font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 font-mono">Select →</span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-400 leading-snug line-clamp-2">
                      {f.description}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSwitchModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
