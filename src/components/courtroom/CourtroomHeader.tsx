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
      <div className="w-full bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800/40">
                {displayId}
              </span>
              <Badge variant="blue">Chat Courtroom</Badge>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                In Session
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-100 mt-1 line-clamp-1">
              {displayTitle}
            </h1>
          </div>
        </div>

        {/* Bench & Hearing status details */}
        <div className="flex items-center gap-4 text-xs shrink-0">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-slate-400 font-medium">{displayCourt}</span>
            <span className="text-[11px] text-amber-400/90 font-mono">
              AI Senior Presiding Judicial Officer
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
