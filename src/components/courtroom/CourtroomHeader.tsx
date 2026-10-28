'use client';

import React, { useState } from 'react';
import { Case, Hearing } from '@/types';
import { Gavel, Shield, Calendar, Clock, Video, FileText, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { VideoUnavailableModal } from './VideoUnavailableModal';
import Link from 'next/link';

interface CourtroomHeaderProps {
  caseData?: Case;
  currentHearing?: Hearing;
  mode?: 'Text' | 'Video';
}

export const CourtroomHeader: React.FC<CourtroomHeaderProps> = ({
  caseData,
  currentHearing,
  mode = 'Text',
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const displayId = caseData?.id || 'AJ-SESSION-001';
  const displayTitle = caseData?.title || 'Virtual Courtroom Session';
  const displayCourt = caseData?.courtLevel || 'High Court Virtual Bench';

  return (
    <>
      <div className="w-full bg-[#000000] border-b border-zinc-800 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg bg-[#0a0a0a] border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-colors">
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
        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-zinc-300 font-medium font-serif">{displayCourt}</span>
            <span className="text-[11px] text-zinc-400 font-mono">
              Presiding Judicial Officer (Order XX CPC)
            </span>
          </div>

          <div className="flex items-center gap-2">
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
    </>
  );
};
