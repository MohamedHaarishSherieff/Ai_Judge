'use client';

import React, { useState } from 'react';
import { Gavel, Mic, MicOff, Video as VideoIcon, User, Shield, Sparkles, Scale, Volume2, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface VideoPanelProps {
  caseTitle: string;
  caseNumber: string;
}

export const VideoPanel: React.FC<VideoPanelProps> = ({ caseTitle, caseNumber }) => {
  const [activeSpeaker, setActiveSpeaker] = useState<'judge' | 'petitioner' | 'respondent'>('judge');

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 p-4 space-y-4">
      {/* 2x2 Grid of Video Frames */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        
        {/* Frame 1: AI JUDGE (Prominent) */}
        <div className={`relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 overflow-hidden flex flex-col items-center justify-center transition-all ${
          activeSpeaker === 'judge' ? 'border-amber-500 gold-glow' : 'border-slate-800'
        }`}>
          {/* Top Info Bar */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Gavel className="w-3.5 h-3.5 text-amber-400" />
              <span>Presiding Officer: AI Senior Judge Justice Aditi</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-mono border border-amber-500/30">
              <Activity className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>Analyzing Arguments</span>
            </div>
          </div>

          {/* AI Visual Centerpiece */}
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="relative">
              {/* Animated Glowing Ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500/30 via-blue-500/30 to-amber-500/30 blur-xl animate-pulse" />
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950 border-2 border-amber-500/60 flex items-center justify-center shadow-2xl relative">
                <Scale className="w-12 h-12 text-amber-400" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-base font-bold text-slate-100 flex items-center justify-center gap-2">
                HIGH COURT VIRTUAL BENCH
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Evaluating statutory provisions under Bharatiya Sakshya Adhiniyam & Supreme Court Precedents
              </p>
            </div>

            {/* Audio Waveform Animation */}
            <div className="flex items-center justify-center gap-1 h-6 pt-2">
              <div className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_100ms] h-4" />
              <div className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_200ms] h-6" />
              <div className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_300ms] h-3" />
              <div className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_150ms] h-5" />
              <div className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_250ms] h-2" />
            </div>
          </div>

          {/* Bottom Label */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded border border-slate-800 text-xs font-mono text-amber-400">
            Bench Key: 0x8F9A...4B21 (Verified)
          </div>
        </div>

        {/* Frame 2: LAWYER A (Petitioner) */}
        <div className={`relative rounded-2xl bg-slate-900 border-2 overflow-hidden flex flex-col items-center justify-center transition-all ${
          activeSpeaker === 'petitioner' ? 'border-blue-500 shadow-lg shadow-blue-950/40' : 'border-slate-800'
        }`}>
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <span className="px-2.5 py-1 bg-blue-950/80 text-blue-300 rounded-lg text-xs font-semibold border border-blue-800/60">
              Petitioner Advocate
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" 
              alt="Adv. Rajesh Sharma"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/50 shadow-md"
            />
            <div>
              <div className="text-sm font-bold text-slate-100">Adv. Rajesh Sharma</div>
              <div className="text-xs text-slate-400 font-mono">Bar Council No. D/4829/2012</div>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-400">
            <span className="px-2 py-0.5 bg-slate-950/80 rounded border border-slate-800 font-mono">1080p HD • Mic On</span>
            <button 
              onClick={() => setActiveSpeaker('petitioner')}
              className="px-2.5 py-1 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 rounded border border-blue-500/30 text-[11px]"
            >
              Select Active Speaker
            </button>
          </div>
        </div>

        {/* Frame 3: LAWYER B (Respondent) */}
        <div className={`relative rounded-2xl bg-slate-900 border-2 overflow-hidden flex flex-col items-center justify-center transition-all ${
          activeSpeaker === 'respondent' ? 'border-emerald-500 shadow-lg shadow-emerald-950/40' : 'border-slate-800'
        }`}>
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-800/60">
              Respondent Advocate
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
              alt="Adv. Meera Sen"
              className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500/50 shadow-md"
            />
            <div>
              <div className="text-sm font-bold text-slate-100">Adv. Meera Sen</div>
              <div className="text-xs text-slate-400 font-mono">Bar Council No. MH/1920/2015</div>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-400">
            <span className="px-2 py-0.5 bg-slate-950/80 rounded border border-slate-800 font-mono">1080p HD • Muted</span>
            <button 
              onClick={() => setActiveSpeaker('respondent')}
              className="px-2.5 py-1 bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 rounded border border-emerald-500/30 text-[11px]"
            >
              Select Active Speaker
            </button>
          </div>
        </div>

        {/* Frame 4: Court Reporter & Digital Record Vault */}
        <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-2">
          <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
            <Shield className="w-7 h-7 text-amber-400" />
          </div>
          <div className="text-sm font-semibold text-slate-200">Court Reporter & Evidence Stream</div>
          <p className="text-xs text-slate-400 max-w-xs">
            Real-time cryptographic transcript hashing & SHA-256 evidence verification active.
          </p>
          <span className="px-2.5 py-1 bg-slate-950 rounded text-[11px] font-mono text-emerald-400 border border-slate-800">
            Secured Judicial Vault
          </span>
        </div>

      </div>
    </div>
  );
};
