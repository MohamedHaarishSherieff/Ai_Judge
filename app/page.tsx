'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { VideoUnavailableModal } from '@/components/courtroom/VideoUnavailableModal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Gavel, 
  Scale, 
  MessageSquare, 
  Video, 
  FileText, 
  Shield, 
  Award, 
  History, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Users,
  Sparkles
} from 'lucide-react';

export default function LandingPage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const steps = [
    { num: '01', title: 'Open Courtroom', desc: 'Instantly enter the virtual courtroom. No login or registration needed.' },
    { num: '02', title: 'Represent Clients', desc: 'Two participants act as legal counsel for Petitioner & Respondent.' },
    { num: '03', title: 'Present Arguments', desc: 'Submit arguments, citations, and evidence in real time.' },
    { num: '04', title: 'Bench Evaluation', desc: 'The AI Judge evaluates submissions and asks clarifying questions.' },
    { num: '05', title: 'Receive Decree', desc: 'Synthesize a formal judicial decree based on the proceedings.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-slate-800/60">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-600/15 via-blue-600/15 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm">
                <Gavel className="w-3.5 h-3.5 text-amber-400" />
                <span>Virtual Courtroom for Advocates & Clients</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                The Virtual Courtroom for <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Legal Arguments
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
                AI Judge is an open digital courtroom platform. Two participants act as legal counsel to represent their clients, present formal arguments, and receive structured rulings from an AI Presiding Judge. No login required.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/text-courtroom" className="w-full sm:w-auto">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto" icon={<MessageSquare className="w-5 h-5" />}>
                    Enter Chat Courtroom Now
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto text-slate-400 border-slate-700 hover:text-white" 
                  onClick={() => setVideoModalOpen(true)}
                  icon={<Video className="w-5 h-5" />}
                >
                  Video Courtroom
                </Button>
              </div>

              {/* Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-xl font-bold text-amber-400 font-mono">No Login</div>
                  <div className="text-xs text-slate-400">Instant Open Access</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-100 font-mono">2 Advocates</div>
                  <div className="text-xs text-slate-400">Petitioner & Respondent</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-400 font-mono">AI Bench</div>
                  <div className="text-xs text-slate-400">Presiding Officer</div>
                </div>
              </div>
            </div>

            {/* Right Hero Entry Card */}
            <div className="lg:col-span-5">
              <Card variant="gold" className="p-8 relative overflow-hidden bg-slate-900/95 border-amber-500/40 text-center space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 mx-auto shadow-lg">
                  <Gavel className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <Badge variant="gold">Open Virtual Bench</Badge>
                  <h3 className="text-2xl font-bold text-white">Enter Courtroom Session</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Represent your client as Petitioner Counsel or Respondent Counsel and present arguments directly before the AI Bench.
                  </p>
                </div>

                {/* Entry Action */}
                <div className="space-y-3 pt-2">
                  <Link href="/text-courtroom" className="block">
                    <Button variant="gold" size="lg" className="w-full justify-between" icon={<MessageSquare className="w-5 h-5" />}>
                      <span>Enter Chat Courtroom</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <button 
                    onClick={() => setVideoModalOpen(true)}
                    className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-between text-sm font-medium transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                      <span>Video Courtroom</span>
                    </span>
                    <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">
                      Not Ready Yet
                    </span>
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
                  <Users className="w-3.5 h-3.5 text-amber-400" /> Designed for 2 Litigating Counsel
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-slate-950/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A Courtroom for Litigating Counsel
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              No account creation needed. Enter the courtroom, choose your legal side, and present arguments for your client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((step, idx) => (
              <Card key={idx} variant="bordered" hoverEffect className="p-5 relative flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-2xl font-black text-amber-500/40 font-mono">{step.num}</span>
                  <h3 className="text-base font-bold text-slate-100">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Step {idx+1} of 5</span>
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Disclaimer />
      </section>

      <Footer />

      {/* Video Unavailable Modal */}
      <VideoUnavailableModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </div>
  );
}
