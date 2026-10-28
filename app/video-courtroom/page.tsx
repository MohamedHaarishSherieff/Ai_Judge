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
    <div className="min-h-screen flex flex-col bg-black text-zinc-100 relative">
      {/* Background Architectural Chamber Watermark */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-10 pointer-events-none grayscale contrast-125"
        style={{ backgroundImage: `url('/images/courtroom_chamber.jpg')` }}
      />

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center relative z-10 w-full">
        <Card variant="court" className="w-full p-8 sm:p-12 text-center space-y-6 border-zinc-700 bg-zinc-950/90 backdrop-blur-md shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white mx-auto">
            <Video className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <Badge variant="gold">National E-Courts Phase IV Feature</Badge>
            <h1 className="text-3xl font-extrabold text-white">Multimodal Video Courtroom</h1>
            <p className="text-sm sm:text-base text-zinc-300 max-w-lg mx-auto leading-relaxed">
              Real-time video feed integration with multimodal facial forensic analysis and live speech-to-text stenography is currently undergoing security audits under Section 63 BSA.
            </p>
          </div>

          <div className="p-4 bg-black rounded-xl border border-zinc-800 text-xs text-zinc-400 max-w-md mx-auto flex items-center justify-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 text-white shrink-0" />
            <span>Active Judicial Simulation: Proceed to Text / Chat Virtual Courtroom</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/text-courtroom" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full" icon={<MessageSquare className="w-5 h-5 text-black" />}>
                Enter Virtual Courtroom
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="court" size="lg" className="w-full">
                Chambers Home
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
