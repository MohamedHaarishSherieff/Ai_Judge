'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  FolderPlus, 
  Upload, 
  Gavel, 
  MessageSquare, 
  FileText, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const stepsDetail = [
    {
      step: '01',
      title: 'Create a Case',
      icon: FolderPlus,
      subtitle: 'Initiate Digital Petition & Jurisdiction',
      desc: 'Advocates or litigants initiate a case by specifying the case title, statutory subject matter (e.g. Criminal, Corporate, Constitutional), jurisdiction level, and litigating parties.',
      details: [
        'Select jurisdiction: District Court, High Court of State, or Supreme Court',
        'Assign Petitioner & Respondent legal advocates',
        'Define key issues for determination under relevant Acts'
      ],
      ctaText: 'Start Case Creation Wizard',
      ctaHref: '/cases/new'
    },
    {
      step: '02',
      title: 'Submit Materials',
      icon: Upload,
      subtitle: 'Pleadings, Precedents & Section 63 Certificates',
      desc: 'Upload formal pleadings, written statements, sworn affidavits, and digital evidence accompanied by mandatory Section 63 BSA certificates.',
      details: [
        'Drag-and-drop PDF/A pleadings',
        'Automated SHA-256 hash checksum calculation',
        'Verification of electronic records chain of custody'
      ],
      ctaText: 'Explore Document Vault',
      ctaHref: '/documents'
    },
    {
      step: '03',
      title: 'Enter Courtroom',
      icon: Gavel,
      subtitle: 'Structured Digital Bench Environment',
      desc: 'Participants join either a Text Virtual Courtroom or a Video Bench Session where the presiding AI Judge opens proceedings.',
      details: [
        'Role-based access: Petitioner Counsel, Respondent Counsel, Judicial Observer',
        'Encrypted session transmission',
        'Presiding Officer bench notification'
      ],
      ctaText: 'Enter Text Courtroom',
      ctaHref: '/text-courtroom'
    },
    {
      step: '04',
      title: 'Conduct Hearing',
      icon: MessageSquare,
      subtitle: 'Chronological Submissions & Objections',
      desc: 'Legal counsel present arguments, cite statutory precedents, and respond to bench inquiries in real time.',
      details: [
        'Chronological transcript log with legal category tags',
        'Instant precedent citation verification',
        'Bench preliminary direction orders'
      ],
      ctaText: 'View Sample Transcript',
      ctaHref: '/text-courtroom/AJ-2026-001'
    },
    {
      step: '05',
      title: 'Receive Judgment',
      icon: FileText,
      subtitle: 'Structured Judicial Decree Synthesis',
      desc: 'The AI Bench synthesizes arguments, statutory provisions, and evidence to deliver a structured decree with background, findings, and final order.',
      details: [
        'Formatted formal court decree layout',
        'Section-by-section statutory reasoning',
        'Digitally signed decree certificate'
      ],
      ctaText: 'View Sample Judgment',
      ctaHref: '/cases/AJ-2026-002/judgment'
    },
    {
      step: '06',
      title: 'Escalate Appeal',
      icon: Award,
      subtitle: 'Appellate High Court & Supreme Court Review',
      desc: 'If aggrieved by a trial or preliminary decree, advocates can file a structured grounds of appeal for appellate division review.',
      details: [
        'Automatic transfer of trial court digital record',
        'Grounds of appeal framing under Article 136 / High Court Rules',
        'Stay application evaluation'
      ],
      ctaText: 'Explore Appeals Portal',
      ctaHref: '/appeals'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="gold">Step-By-Step Workflow Guide</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            How AI Judge Works
          </h1>
          <p className="text-base text-slate-300 leading-relaxed font-sans">
            Explore the 6-stage lifecycle of a virtual case—from initial digital filing to final judicial decree synthesis and appellate review.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
          {stepsDetail.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-lg text-left transition-all ${
                activeStep === idx
                  ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-amber-400">STEP {s.step}</div>
              <div className="text-xs font-semibold truncate">{s.title}</div>
            </button>
          ))}
        </div>

        {/* Step Detail Active Card */}
        {(() => {
          const current = stepsDetail[activeStep];
          const Icon = current.icon;
          return (
            <Card variant="court" className="p-8 lg:p-10 border-slate-800 space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">STAGE {current.step} OF 06</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{current.title}</h2>
                    <p className="text-xs text-slate-400">{current.subtitle}</p>
                  </div>
                </div>

                <Link href={current.ctaHref}>
                  <Button variant="gold" icon={<ArrowRight className="w-4 h-4" />}>
                    {current.ctaText}
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-base font-bold text-slate-100">Overview & Purpose</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">{current.desc}</p>
                </div>

                <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Key Procedural Actions
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {current.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })()}

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
