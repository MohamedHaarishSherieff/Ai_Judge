'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Scale, Gavel, Cpu, ShieldCheck, HeartHandshake, BookOpen, Lock, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100 relative">
      {/* Background Architectural Chamber Watermark */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-10 pointer-events-none grayscale contrast-125"
        style={{ backgroundImage: `url('/images/courtroom_chamber.jpg')` }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 relative z-10 w-full">
        
        {/* Official Header with Ashoka Lion Seal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center mb-3">
            <div className="p-1.5 rounded-full bg-zinc-950 border-2 border-zinc-700 shadow-xl">
              <img 
                src="/images/ashoka_emblem.jpg" 
                alt="State Emblem of India" 
                className="w-20 h-20 rounded-full object-cover" 
              />
            </div>
          </div>
          <Badge variant="gold">National E-Courts Mission • Autonomous Judicial Architecture</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Institutional Architecture of AI Judge
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            A next-generation sovereign legal computation infrastructure engineered for the Department of Justice, Ministry of Law and Justice, Government of India. Designed to eliminate case pendency while upholding the sacred principles of Indian jurisprudence.
          </p>
        </div>

        {/* Section 1: What is AI Judge? */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Judicial Transformation Blueprint
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <Gavel className="w-7 h-7 text-white" /> Autonomous Virtual Bench Architecture
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              AI Judge is a sovereign-tier legal engineering framework purpose-built for the Indian Subcontinent judicial ecosystem. It models how digital proceedings can transition from passive video hearings to active, machine-verified adjudications under the <strong>Code of Civil Procedure, 1908</strong>, <strong>Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023</strong>, and <strong>Bharatiya Sakshya Adhiniyam (BSA), 2023</strong>.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Integrating Meta’s open-weight multimodal models (Llama 3.3 70B, Segment Anything SAM 3.1) with serverless deterministic compute, AI Judge verifies chain-of-custody hashes for electronic pleadings, executes adversarial argument simulations, and computes statutory financial decrees under Section 74 of the Indian Contract Act without computational variance.
            </p>
          </div>

          <div className="lg:col-span-5">
            <Card variant="court" className="p-6 space-y-4 bg-zinc-950/90 border-zinc-700 backdrop-blur-md">
              <div className="text-xs font-mono font-semibold text-white uppercase tracking-wider flex items-center justify-between">
                <span>National Imperative</span>
                <span className="text-[10px] text-zinc-400 font-mono">Article 39A</span>
              </div>
              <h3 className="text-lg font-bold text-white">Eradicating Pendency, Safeguarding Justice</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                With over 44 million pending cases across Indian High Courts and Subordinate Courts, automated procedural record-keeping, electronic evidence authentication, and ratio decidendi structuring can reduce dispute lifecycle from years to hours while maintaining absolute judicial auditability.
              </p>
            </Card>
          </div>
        </div>

        {/* Section 2: Vision & Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Constitutional Pillars of the Virtual Bench</h2>
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
              Faithfully reflecting the traditions of the Bar Council of India & Supreme Court of India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" className="p-6 space-y-3 bg-zinc-950/80 border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Audi Alteram Partem</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ensuring the natural right to be heard is structurally preserved. Both Petitioner and Respondent Senior Counsels have equal adversarial opportunity to advance oral arguments and lodge statutory objections.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3 bg-zinc-950/80 border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Sec 63 BSA Forensic Integrity</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pixel-level zero-shot segmentation autonomously identifies forged signatures, altered seal boundaries, and tampered hash certificates, satisfying Section 63 electronic evidence admissibility requirements.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3 bg-zinc-950/80 border-zinc-800">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Deterministic Accountability</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero hallucinated statutes. Every legal citation, procedural direction, and interest calculation is mathematically executed and bound to verified Supreme Court precedents (e.g., <em>Kailash Nath Associates</em>).
              </p>
            </Card>
          </div>
        </div>

        {/* Section 3: Responsible AI */}
        <Card variant="court" className="p-8 space-y-4 bg-zinc-950 border-2 border-zinc-700 shadow-2xl">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono">
              Institutional Ethics & Human Bench Sovereignty
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            AI Judge is explicitly architected to augment and assist constitutional judges, tribunal members, and enrolled advocates—never to supplant human moral agency. Substantive constitutional discretion, fundamental rights adjudication, and judicial compassion remain the exclusive constitutional purview of human judges under Articles 32, 226, and 136 of the Constitution of India.
          </p>
        </Card>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
