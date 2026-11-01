'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Scale, Landmark, Shield, 
  HelpCircle, ChevronDown, BookOpen, AlertCircle, RefreshCw, User
} from 'lucide-react';

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

export function NyayaSarathiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Namaste! I am **Nyaya Sarathi (न्याय सारथी)**, your official Sovereign AI Courtroom Guide and Judicial Helpdesk.

I am here to guide you with:
• **How to use this platform**: Simulating trials, forensic seal inspections with SAM 3.1, and synthesizing Order XX decrees.
• **Which court to approach**: Identifying the correct forum among the **8 Courts of India** (Supreme Court, High Court, Sessions, Tribunals, etc.).
• **Lawyer Choice**: Choosing between a **Real Human Lawyer** and an **AI Legal Counsel**.

*How may I assist your legal inquiry today?*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/courtroom/guide-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await res.json();
      const botReply = data.reply || "I am currently unable to reach the neural helpdesk. Please ask regarding application features or judicial forum guidance.";

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "As Nyaya Sarathi, my scope is strictly confined to assisting you with courtroom navigation, application features, and Indian legal jurisdictional guidance. Please ask your question regarding court procedures or platform features.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      title: "🏛️ Which court to choose?",
      prompt: "Which court in India should I approach for my legal problem, and what are the 8 courts available?"
    },
    {
      title: "🔄 Where to switch courts?",
      prompt: "Where is the option to switch between the 8 courts in the courtroom session?"
    },
    {
      title: "👤 Real vs AI Lawyer",
      prompt: "How can I switch to a Real Human Lawyer instead of AI Lawyer, and who acts as the Judge?"
    },
    {
      title: "🔬 Forensic SAM 3.1",
      prompt: "How does the Section 63 BSA forensic evidence inspection with SAM 3.1 work?"
    }
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black border border-zinc-700 shadow-xl text-xs font-mono text-zinc-200 animate-fade-in backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Need Help? Ask Nyaya Sarathi</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 ${
            isOpen 
              ? 'bg-zinc-900 border-zinc-600 text-white rotate-90 scale-95' 
              : 'bg-black border-white text-white hover:bg-white hover:text-black hover:scale-105'
          }`}
          aria-label="Toggle Nyaya Sarathi Helpdesk"
          title="Nyaya Sarathi • Sovereign Courtroom Guide & Helpdesk"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Scale className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white border border-black" />
            </div>
          )}
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] z-50 bg-[#0a0a0a] border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in backdrop-blur-xl">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-black via-zinc-950 to-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shadow-md">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white font-serif">न्याय सारथी (Nyaya Sarathi)</h3>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono">
                  Sovereign Courtroom Navigator & Legal Helpdesk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      role: 'assistant',
                      content: "Chat session refreshed. How can I guide you with court procedures or application features?",
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ]);
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Restart Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick FAQ Suggestion Bar */}
          <div className="px-3 py-2 bg-zinc-950 border-b border-zinc-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-mono">
            {faqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => handleSend(faq.prompt)}
                className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white shrink-0 transition-colors cursor-pointer"
              >
                {faq.title}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans">
            {messages.map((m, idx) => {
              const isAssistant = m.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-zinc-500 font-mono">
                    <span>{isAssistant ? 'न्याय सारथी' : 'You'}</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl max-w-[88%] leading-relaxed whitespace-pre-wrap ${
                      isAssistant
                        ? 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 shadow-sm'
                        : 'bg-white text-black font-medium shadow-md'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-zinc-400 text-xs font-mono max-w-[70%]">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Nyaya Sarathi is consulting judicial records...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Dock */}
          <div className="p-3 bg-zinc-950 border-t border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about app features, court forums, or legal help..."
                className="flex-1 bg-black border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white font-sans"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-40 text-black font-bold transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>
            <div className="text-[9px] text-zinc-500 font-mono text-center pt-2">
              Strictly focused on Indian law & courtroom features • Inquiries outside legal scope redirected
            </div>
          </div>

        </div>
      )}
    </>
  );
}

