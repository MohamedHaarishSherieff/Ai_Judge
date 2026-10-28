'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_CASES } from '@/data/mockData';
import { MessageSquare, Gavel, Plus, Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function TextCourtroomListPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="gold">Virtual Text Bench</Badge>
              <span className="text-xs text-slate-400 font-mono">Real-time Transcript Sync</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Chat Courtroom</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Start a fresh virtual courtroom session or open an existing case transcript.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/text-courtroom/session">
              <Button variant="gold" icon={<MessageSquare className="w-4 h-4" />}>
                Start Fresh Chat Courtroom
              </Button>
            </Link>
            <Link href="/cases/new">
              <Button variant="outline" icon={<Plus className="w-4 h-4" />}>
                File New Case
              </Button>
            </Link>
          </div>
        </div>

        {/* Empty State / Available Cases */}
        {MOCK_CASES.length === 0 ? (
          <Card variant="court" className="p-12 text-center space-y-6 max-w-2xl mx-auto border-slate-800 my-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-lg">
              <MessageSquare className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Ready to Begin Legal Proceedings</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                There are no active pre-populated cases. You can start a fresh Chat Courtroom session right away or file a formal case.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/text-courtroom/session">
                <Button variant="gold" size="lg" icon={<MessageSquare className="w-5 h-5" />}>
                  Enter Fresh Chat Courtroom
                </Button>
              </Link>
              <Link href="/cases/new">
                <Button variant="secondary" size="lg" icon={<Plus className="w-5 h-5" />}>
                  File New Case
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> Your Cases
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_CASES.map((c) => (
                <Card key={c.id} variant="court" hoverEffect className="p-6 space-y-4 flex flex-col justify-between border-slate-800">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                        {c.id}
                      </span>
                      <Badge variant="amber">{c.status}</Badge>
                    </div>
                    <h3 className="text-base font-bold text-white">{c.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2">{c.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <Link href={`/text-courtroom/${c.id}`}>
                      <Button variant="gold" size="sm" icon={<MessageSquare className="w-4 h-4" />}>
                        Enter Session
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
