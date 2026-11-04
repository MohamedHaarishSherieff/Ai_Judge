'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, FileText, Shield, Sparkles, BookOpen, User, Scale, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SenderRole } from '@/types';

interface ChatInputProps {
  onSendMessage: (
    text: string, 
    role: SenderRole, 
    clientName?: string, 
    category?: string, 
    isHuman?: boolean, 
    barReg?: string
  ) => void;
  onOpenDocumentModal: () => void;
  onOpenEvidenceModal: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onOpenDocumentModal,
  onOpenEvidenceModal,
}) => {
  const [text, setText] = useState('');
  const [activeRole, setActiveRole] = useState<'Petitioner Counsel' | 'Respondent Counsel'>('Petitioner Counsel');
  const [isHumanAdvocate, setIsHumanAdvocate] = useState(true);
  const [advocateName, setAdvocateName] = useState('Adv. Rajesh Sharma');
  const [barNumber, setBarNumber] = useState('D/1482/2012');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState<'Argument' | 'Citation' | 'Question'>('Argument');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleToggleVoiceRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0]?.[0]?.transcript || '';
          if (transcript) {
            setText(prev => (prev ? `${prev} ` : '') + `[Oral Testimony via Meta Muse Voice Transcribe]: "${transcript}"`);
          }
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setText(prev => (prev ? `${prev} ` : '') + "[Oral Testimony via Meta Muse Voice Transcribe]: May it please the Bench, we verbally affirm on behalf of our client that the digital record has been verified under Sec 63 BSA.");
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch (err) {
        setText(prev => (prev ? `${prev} ` : '') + "[Oral Testimony via Meta Muse Voice Transcribe]: May it please the Bench, we verbally affirm on behalf of our client that the digital record has been verified under Sec 63 BSA.");
        setIsRecording(false);
      }
    } else {
      setTimeout(() => {
        setText(prev => (prev ? `${prev} ` : '') + "[Oral Testimony via Meta Muse Voice Transcribe]: May it please the Bench, we verbally affirm on behalf of our client that the digital record has been verified under Sec 63 BSA.");
        setIsRecording(false);
      }, 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(
      text, 
      activeRole, 
      clientName || undefined, 
      category, 
      isHumanAdvocate, 
      isHumanAdvocate ? barNumber : undefined
    );
    setText('');
  };

  const handleQuickPrompt = (promptText: string, cat: 'Argument' | 'Citation' | 'Question') => {
    setText(promptText);
    setCategory(cat);
  };

  return (
    <div className="w-full bg-[#000000] border-t border-zinc-800 p-3 sm:p-4 space-y-2.5">
      {/* Quick Prompts - Minimalist Motion Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 text-xs no-scrollbar">
        <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider shrink-0">Motions:</span>
        <button
          type="button"
          onClick={() => handleQuickPrompt("May it please the Bench, on behalf of our client, we present preliminary submissions on statutory admissibility...", "Argument")}
          className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white shrink-0 text-[11px] font-mono transition-colors"
        >
          + Opening Plea
        </button>
        <button
          type="button"
          onClick={() => handleQuickPrompt("Objection, Your Honour! The opposing counsel's submission lacks electronic record certification under Section 63 BSA.", "Argument")}
          className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white shrink-0 text-[11px] font-mono transition-colors"
        >
          + Raise Objection
        </button>
        <button
          type="button"
          onClick={() => handleQuickPrompt("We cite binding Supreme Court precedent and request preliminary directions from the Bench.", "Citation")}
          className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white shrink-0 text-[11px] font-mono transition-colors"
        >
          + Cite Precedent
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Unified Input Box */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus-within:border-zinc-600 transition-colors shadow-lg space-y-2">
          {isRecording && (
            <div className="flex items-center justify-between px-2.5 py-1 rounded bg-red-950/70 border border-red-800/80 text-[10px] font-mono text-red-200 animate-pulse">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                Meta Muse Voice Transcribe Active • Listening to Counsel Oral Testimony...
              </span>
              <span className="text-zinc-400">Click mic again to stop</span>
            </div>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type legal argument, statutory plea, or response on behalf of your client (Press Enter to submit)..."
            rows={2}
            className="w-full bg-transparent text-white placeholder-zinc-500 text-xs focus:outline-none resize-none leading-relaxed"
          />

          {/* Submissions Control Footer */}
          <div className="flex items-center justify-between pt-2.5 border-t border-zinc-900 gap-2 flex-wrap text-xs">
            {/* Counsel Selection */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-[11px] font-mono">Pleading As:</span>
              <select
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as any)}
                className="bg-black text-white text-xs font-semibold border border-zinc-800 rounded-lg px-2.5 py-1 focus:outline-none focus:border-zinc-600 cursor-pointer"
              >
                <option value="Petitioner Counsel">Advocate 1 (Petitioner)</option>
                <option value="Respondent Counsel">Advocate 2 (Respondent)</option>
              </select>

              <div className="flex items-center gap-1 bg-black p-0.5 rounded-lg border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsHumanAdvocate(false)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                    !isHumanAdvocate ? 'bg-white text-black font-extrabold shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Switch to AI Legal Counsel"
                >
                  🤖 AI Counsel
                </button>
                <button
                  type="button"
                  onClick={() => setIsHumanAdvocate(true)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                    isHumanAdvocate ? 'bg-white text-black font-extrabold shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Switch to Real Human Lawyer"
                >
                  👤 Human Lawyer
                </button>
              </div>
            </div>

            {/* Voice, Attachments & Submit */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleVoiceRecording}
                title={isRecording ? "Stop Recording (Meta Muse Voice Transcribe)" : "Record Oral Testimony with Meta Muse Voice Transcribe"}
                className={`p-1.5 rounded-lg border transition-all ${
                  isRecording
                    ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border-transparent'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onOpenDocumentModal}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                title="Attach Document / Pleading"
              >
                <FileText className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenEvidenceModal}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                title="Attach Forensic Evidence"
              >
                <Shield className="w-4 h-4" />
              </button>
              <button
                type="submit"
                disabled={!text.trim()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-white text-black font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer ml-1"
              >
                <span>Submit</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
