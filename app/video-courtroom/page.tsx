'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Video, MessageSquare, AlertCircle, ArrowRight, Gavel } from 'lucide-react';

export default function VideoCourtroomPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <Card variant="court" className="w-full p-8 sm:p-12 text-center space-y-6 border-slate-800 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
            <Video className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <Badge variant="amber">Feature Under Development</Badge>
            <h1 className="text-3xl font-extrabold text-white">Video Courtroom Is Not Ready Yet</h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              We are currently focusing exclusively on perfecting the <span className="text-amber-400 font-semibold">Chat Courtroom</span> experience. Video and voice courtroom functionality will be integrated in a future release.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 max-w-md mx-auto flex items-center justify-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Please proceed to the Text / Chat Virtual Courtroom</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/text-courtroom" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full" icon={<MessageSquare className="w-5 h-5" />}>
                Enter Chat Courtroom
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
