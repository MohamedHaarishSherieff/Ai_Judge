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
    ? 'bg-slate-900/95 border-l-4 border-l-amber-500 border-y border-r border-slate-800 shadow-lg gold-glow'
    : isPetitioner
    ? 'bg-slate-900/80 border-l-4 border-l-blue-500 border-y border-r border-slate-800/80'
    : isRespondent
    ? 'bg-slate-900/80 border-l-4 border-l-emerald-500 border-y border-r border-slate-800/80'
    : 'bg-slate-900/60 border border-slate-800';

  const badgeVariant = isJudge
    ? 'gold'
    : isPetitioner
    ? 'blue'
    : isRespondent
    ? 'emerald'
    : 'slate';

  return (
    <div className={`p-4 sm:p-5 rounded-xl ${cardContainerStyle} space-y-3 transition-all`}>
      {/* Header Line */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          {isJudge ? (
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Gavel className="w-4 h-4" />
            </div>
          ) : (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
              isPetitioner ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              <User className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-100">{message.sender}</span>
              <Badge variant={badgeVariant} size="sm">
                {message.senderRole}
              </Badge>
            </div>
            {isJudge && (
              <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1">
                <Scale className="w-3 h-3" /> Presiding Judicial Officer
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
        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-amber-400" /> Citations & Authorities:
          </span>
          {message.legalReferences.map((ref, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 rounded bg-slate-950 text-amber-300/90 font-mono text-[11px] border border-amber-900/40 hover:border-amber-500/50 transition-colors cursor-pointer"
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
