'use client';

import React, { useState } from 'react';
import { Send, Paperclip, FileText, Shield, Sparkles, BookOpen, User, Scale, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SenderRole } from '@/types';

interface ChatInputProps {
  onSendMessage: (text: string, role: SenderRole, clientName?: string, category?: string) => void;
  onOpenDocumentModal: () => void;
  onOpenEvidenceModal: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onOpenDocumentModal,
  onOpenEvidenceModal,
}) => {
  const [text, setText] = useState('');
  const [activeRole, setActiveRole] = useState<SenderRole>('Petitioner Counsel');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState<'Argument' | 'Citation' | 'Question'>('Argument');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text, activeRole, clientName, category);
    setText('');
  };

  const handleQuickPrompt = (promptText: string, cat: 'Argument' | 'Citation' | 'Question') => {
    setText(promptText);
    setCategory(cat);
  };

  return (
    <div className="w-full bg-slate-950 border-t border-slate-800 p-3 sm:p-4 space-y-3">
      {/* Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1">Quick Prompts:</span>
        <button
          onClick={() => handleQuickPrompt("May it please the Court, representing our client, we submit our opening argument under Section 63 BSA...", "Argument")}
          className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 shrink-0 transition-colors"
        >
          + Submit Opening Argument for Client
        </button>
        <button
          onClick={() => handleQuickPrompt("Objection, Your Honour! The opposing counsel's submission lacks verified electronic record certification.", "Argument")}
          className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 shrink-0 transition-colors"
        >
          + Raise Objection for Client
        </button>
        <button
          onClick={() => handleQuickPrompt("We cite statutory precedent under Bharatiya Nyaya Sanhita (BNS) and request preliminary directions from the Bench.", "Citation")}
          className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 shrink-0 transition-colors"
        >
          + Cite BNS / BSA Precedent
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Role & Client Selection Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          
          {/* Advocate Persona Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-400" /> Submitting As Advocate:
            </span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as SenderRole)}
              className="bg-slate-950 text-slate-100 font-semibold border border-slate-700 rounded px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="Petitioner Counsel">Advocate 1 — Petitioner Counsel</option>
              <option value="Respondent Counsel">Advocate 2 — Respondent Counsel</option>
              <option value="AI Judge">AI Presiding Judge (Simulate Ruling)</option>
            </select>
          </div>

          {/* Optional Client Name Input */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Representing Client:</span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder={activeRole === 'Petitioner Counsel' ? 'Petitioner Client Name' : 'Respondent Client Name'}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500 w-36 sm:w-44"
            />
          </div>
        </div>

        {/* Text Input & Buttons */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type formal legal argument, citation, or response on behalf of your client..."
              rows={2}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (!isRecording) {
                  setIsRecording(true);
                } else {
                  setIsRecording(false);
                  setText(prev => (prev ? `${prev} ` : '') + "[Oral Testimony via Muse Voice Transcribe]: May it please the Bench, we verbally affirm on behalf of our client that the digital record has been verified under Sec 63 BSA.");
                }
              }}
              title={isRecording ? "Stop Recording (Muse Voice Transcribe)" : "Record Oral Testimony (Muse Voice Transcribe)"}
              className={`p-2.5 rounded-lg border transition-all ${
                isRecording
                  ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-500/50'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onOpenDocumentModal}
              title="Attach Document / Petition"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
            >
              <FileText className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenEvidenceModal}
              title="Submit Evidence Record"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
            >
              <Shield className="w-4 h-4" />
            </button>

            <Button
              type="submit"
              variant="gold"
              size="md"
              icon={<Send className="w-4 h-4" />}
            >
              Submit
            </Button>
          </div>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 px-1 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Recording oral legal submission • Streaming to Meta Muse Voice Transcribe...
          </div>
        )}
      </form>
    </div>
  );
};
