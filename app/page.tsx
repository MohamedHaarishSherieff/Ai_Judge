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
    <div className="min-h-screen flex flex-col bg-[#000000] text-zinc-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-zinc-800">
        {/* Subtle architectural judicial grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold shadow-sm">
                <Gavel className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="font-mono">Bharatiya Sakshya Adhiniyam (BSA 2023) & BNS Bench</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] font-serif">
                Autonomous Digital Courtroom & <br className="hidden sm:inline" />
                <span className="text-zinc-300 underline decoration-zinc-600 underline-offset-8">
                  Civil Dispute Adjudication
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-sans font-normal">
                Modeled after the black-robed traditions of Indian jurisprudence. Engineered to address the 50,000,000+ pending case backlog in Indian civil courts. AI Judge deploys autonomous litigating advocates to argue summary commercial disputes, validates evidence with zero-shot SAM 3.1 morphological forensics, and synthesizes legally enforceable Order XX CPC decrees.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/text-courtroom" className="w-full sm:w-auto">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto" icon={<MessageSquare className="w-5 h-5 text-black" />}>
                    Enter Virtual Bench Session
                  </Button>
                </Link>
                <Link href="/evidence" className="w-full sm:w-auto">
                  <Button 
                    variant="court" 
                    size="lg" 
                    className="w-full sm:w-auto"
                    icon={<Shield className="w-5 h-5 text-white" />}
                  >
                    Evidence Vault (SAM 3.1)
                  </Button>
                </Link>
              </div>

              {/* Institutional Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-zinc-800 text-left max-w-lg mx-auto lg:mx-0 font-mono">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">Modal Labs</div>
                  <div className="text-[11px] text-zinc-400">Serverless Legal Compute</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">Sec 63 BSA</div>
                  <div className="text-[11px] text-zinc-400">SHA-256 Hash Vault</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">Order XX</div>
                  <div className="text-[11px] text-zinc-400">Enforceable CPC Decrees</div>
                </div>
              </div>
            </div>

            {/* Right Hero Institutional Card */}
            <div className="lg:col-span-5">
              <Card variant="court" className="p-7 relative overflow-hidden bg-[#0c0c0c] border-zinc-700 text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-600 flex items-center justify-center text-white mx-auto shadow-lg">
                  <Scale className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-white text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Modal Cloud Engine Operational</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white font-serif">Live Courtroom Docket</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    Petitioner and Respondent counsels present cross-examination, challenge forged evidence with SAM 3.1, and receive binding summary decrees.
                  </p>
                </div>

                {/* Entry Action */}
                <div className="space-y-3 pt-2">
                  <Link href="/text-courtroom" className="block">
                    <Button variant="gold" size="lg" className="w-full justify-between" icon={<MessageSquare className="w-5 h-5 text-black" />}>
                      <span>Enter Chat Courtroom</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </Button>
                  </Link>

                  <Link href="/evidence" className="block">
                    <Button variant="court" size="md" className="w-full justify-between" icon={<Shield className="w-4 h-4 text-white" />}>
                      <span>Inspect Evidence Forensics</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <Users className="w-3.5 h-3.5 text-white" /> 2 Litigating Counsel
                  </span>
                  <span className="text-white font-bold">Instant Access (No Login)</span>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Pillars of Innovation */}
      <section className="py-20 bg-[#050505] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">Judicial Engineering</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              Built for Real Indian Jurisprudence
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Not a generic chatbot. AI Judge enforces statutory procedural codes, cryptographic evidentiary standards, and enforceable decree formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="court" className="p-6 space-y-4 border-zinc-800 hover:border-zinc-500">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <Gavel className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">Adversarial Multi-Agent Bench</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Autonomous legal agents act as Petitioner Counsel, Respondent Counsel, and Presiding Magistrate. They cite Supreme Court of India precedents (*Fateh Chand*, *Maula Bux*) to debate breach of contract.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-400">
                • Autonomous Multi-Turn Cross-Examination
              </div>
            </Card>

            <Card variant="court" className="p-6 space-y-4 border-zinc-800 hover:border-zinc-500">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">SAM 3.1 Forensic Segmentation</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Computer vision inspection isolates disputed signatures, altered notary seals, and typewritten font kerning to generate Section 63 BSA cryptographic integrity certificates with SHA-256 digests.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-400">
                • Zero-Shot Morphological Alteration Detection
              </div>
            </Card>

            <Card variant="court" className="p-6 space-y-4 border-zinc-800 hover:border-zinc-500">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-serif">Deterministic Order XX Decrees</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Runs serverless on Modal Labs to compute exact statutory compound interest under Section 74 of the Indian Contract Act and render enforceable judicial decree sheets with digital seal hashes.
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-400">
                • Microsecond Serverless Cloud Compute
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Workflow Steps Section */}
      <section className="py-20 bg-[#000000] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">Procedural Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              Summary Civil Adjudication in 5 Steps
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Frictionless and transparent. Litigants and advocates enter the virtual bench without login friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <Card key={idx} variant="court" hoverEffect className="p-5 flex flex-col justify-between border-zinc-800 hover:border-zinc-500">
                <div className="space-y-3">
                  <span className="text-2xl font-black text-zinc-600 font-mono">{step.num}</span>
                  <h3 className="text-sm font-bold text-zinc-100">{step.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-mono">Phase {idx+1}/5</span>
                  <CheckCircle2 className="w-4 h-4 text-white" />
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
