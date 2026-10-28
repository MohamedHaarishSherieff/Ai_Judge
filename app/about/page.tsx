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
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="gold">Platform Vision & Purpose</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            About AI Judge
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            AI Judge is an exploratory research and virtual courtroom platform created to model future digital judicial workflows aligned with Indian law and procedural requirements.
          </p>
        </div>

        {/* Section 1: What is AI Judge? */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Gavel className="w-6 h-6 text-amber-400" /> What is AI Judge?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              AI Judge is a specialized legal technology simulation platform designed for lawyers, legal scholars, and judicial researchers. It provides structured text and video courtroom environments that model how digital proceedings can operate efficiently without compromising procedural fairness.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Designed specifically around Indian statutory frameworks—including the Bharatiya Nyaya Sanhita (BNS), Bharatiya Sakshya Adhiniyam (BSA), and the Code of Civil Procedure (CPC)—the platform demonstrates automated case structuring, evidence validation, and preliminary decree draft synthesis.
            </p>
          </div>

          <div className="lg:col-span-5">
            <Card variant="court" className="p-6 space-y-4">
              <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">Core Objective</div>
              <h3 className="text-lg font-bold text-white">Enhancing Judicial Efficiency</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By automating procedural record-keeping, preliminary document screening, and statutory precedent analysis, AI Judge envisions a future where pendency of cases is drastically reduced while maintaining absolute transparency.
              </p>
            </Card>
          </div>
        </div>

        {/* Section 2: Vision & Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white">Our Vision & Core Principles</h2>
            <p className="text-xs text-slate-400">Guiding values for responsible legal technology deployment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Procedural Justice</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ensuring principles of natural justice (audi alteram partem) are strictly enforced in every digital session.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Forensic Integrity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict adherence to electronic evidence authentication standards under Section 63 of Bharatiya Sakshya Adhiniyam.
              </p>
            </Card>

            <Card variant="default" className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Algorithmic Auditability</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every synthetic ruling or legal citation produced by the AI Bench remains fully traceable back to verified case law and statutory texts.
              </p>
            </Card>
          </div>
        </div>

        {/* Section 3: Responsible AI */}
        <Card variant="gold" className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Responsible & Ethical AI Statement</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We explicitly state that AI Judge is designed to complement human legal expertise, not to replace constitutional judges or advocates. Judicial discretion, empathy, and fundamental rights adjudication require human moral agency. AI Judge serves as a decision-support, simulation, and case-workflow system to empower legal practitioners and streamline digital court management.
          </p>
        </Card>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
