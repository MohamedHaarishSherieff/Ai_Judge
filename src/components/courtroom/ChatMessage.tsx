'use client';

import React from 'react';
import { Message } from '@/types';
import { Gavel, Shield, User, FileText, CheckCircle2, Bookmark, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isJudge = message.senderRole === 'AI Judge';
  const isPetitioner = message.senderRole === 'Petitioner Counsel';
  const isRespondent = message.senderRole === 'Respondent Counsel';

  // Role-specific border & background styles
  const cardContainerStyle = isJudge
    ? 'bg-[#0f0f0f] border-l-4 border-l-white border-y border-r border-zinc-800 shadow-xl shadow-black/80'
    : isPetitioner
    ? 'bg-[#080808] border-l-4 border-l-zinc-300 border-y border-r border-zinc-850 border-zinc-800/90 shadow-md shadow-black/50'
    : isRespondent
    ? 'bg-[#060606] border-l-4 border-l-zinc-500 border-y border-r border-zinc-850 border-zinc-800/90 shadow-md shadow-black/50'
    : 'bg-[#080808] border border-zinc-800 shadow-sm';

  const badgeVariant = isJudge
    ? 'gold'
    : isPetitioner
    ? 'court'
    : isRespondent
    ? 'slate'
    : 'slate';

  return (
    <div className={`p-4 sm:p-5 rounded-xl ${cardContainerStyle} space-y-3 transition-all`}>
      {/* Header Line */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          {isJudge ? (
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold shadow-md">
              <Gavel className="w-4 h-4" />
            </div>
          ) : (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
              isPetitioner ? 'bg-zinc-800 text-white border border-zinc-500' : 'bg-zinc-900 text-zinc-300 border border-zinc-700'
            }`}>
              <User className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">{message.sender}</span>
              <Badge variant={badgeVariant} size="sm">
                {message.senderRole}
              </Badge>
            </div>
            {isJudge && (
              <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                <Scale className="w-3 h-3 text-white" /> Presiding Judicial Officer
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {message.category && (
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {message.category}
            </span>
          )}
          <span className="text-xs text-slate-400 font-mono">{message.timestamp}</span>
        </div>
      </div>

      {/* Message Content */}
      <div className="text-sm text-slate-200 leading-relaxed font-sans pl-0.5 whitespace-pre-wrap">
        {message.content}
      </div>

      {/* Statutory & Precedent Citations Footer */}
      {message.legalReferences && message.legalReferences.length > 0 && (
        <div className="pt-2 border-t border-zinc-800 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-zinc-400 font-semibold flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-white" /> Citations & Authorities:
          </span>
          {message.legalReferences.map((ref, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 rounded bg-black text-white font-mono text-[11px] border border-zinc-700 hover:border-white transition-colors cursor-pointer"
            >
              {ref}
            </span>
          ))}
        </div>
      )}

      {/* Attached Document Badges */}
      {message.attachedDocIds && message.attachedDocIds.length > 0 && (
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-blue-400" /> Attached Exhibit:
          </span>
          <span className="px-2.5 py-1 rounded bg-blue-950/40 text-blue-300 border border-blue-800/40 font-mono text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Exhibit P-04 (Sec 63 Certificate)
          </span>
        </div>
      )}
    </div>
  );
};
