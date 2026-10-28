'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MOCK_JUDGMENT } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Gavel, Download, Printer, ArrowLeft, ShieldCheck, Scale, ExternalLink } from 'lucide-react';

export default function JudgmentViewerPage() {
  const params = useParams();
  const j = MOCK_JUDGMENT;

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 w-full">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <Link href={`/cases/${j.caseId}`} className="flex items-center gap-2 text-xs text-amber-400 font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Case Summary
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" icon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>
              Print Decree
            </Button>
            <Button variant="gold" size="sm" icon={<Download className="w-4 h-4" />}>
              Download Official PDF/A
            </Button>
          </div>
        </div>

        {/* Demo Judgment Notice */}
        <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl text-amber-300 text-xs flex items-center justify-between">
          <span className="font-semibold flex items-center gap-1.5">
            <Gavel className="w-4 h-4 text-amber-400" /> DEMONSTRATION JUDICIAL DECREE SYNTHESIS
          </span>
          <span className="font-mono text-[11px] text-amber-400/90">Public Key Verified: 0x8F9A...4B21</span>
        </div>

        {/* Formal Judicial Document Box */}
        <div className="judicial-document p-8 sm:p-14 rounded-2xl space-y-8 border-4 border-amber-900/30 shadow-2xl relative overflow-hidden">
          
          {/* Watermark Emblem Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Scale className="w-96 h-96 text-slate-900" />
          </div>

          {/* Document Header */}
          <div className="text-center space-y-3 pb-8 border-b-2 border-slate-900">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center border-2 border-amber-600 shadow-md">
                <Gavel className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-wider uppercase font-serif text-slate-900">
              {j.courtName}
            </h1>
            <p className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest">{j.bench}</p>
            <div className="text-sm font-bold text-slate-950 font-serif pt-2">{j.caseNumber}</div>
            <div className="text-xs text-slate-700 italic">{j.title}</div>
            <div className="text-xs font-mono text-slate-900 pt-1">DATE OF PRONOUNCEMENT: {j.date}</div>
          </div>

          {/* Litigating Parties */}
          <div className="p-4 bg-slate-100 rounded-lg border border-slate-300 text-center font-serif text-slate-900 text-sm font-semibold">
            {j.partiesText}
          </div>

          {/* Section: Background */}
          <div className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wider font-serif border-b border-slate-400 pb-1 text-slate-950">
              I. BACKGROUND & PROCEDURAL HISTORY
            </h2>
            <div className="space-y-2 text-sm leading-relaxed text-slate-900 font-serif">
              {j.background.map((bg, idx) => (
                <p key={idx}>{bg}</p>
              ))}
            </div>
          </div>

          {/* Section: Issues for Determination */}
          <div className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wider font-serif border-b border-slate-400 pb-1 text-slate-950">
              II. ISSUES FOR DETERMINATION
            </h2>
            <div className="space-y-2 text-sm leading-relaxed text-slate-900 font-serif font-semibold">
              {j.issues.map((iss, idx) => (
                <p key={idx}>{iss}</p>
              ))}
            </div>
          </div>

          {/* Section: Arguments & Authorities */}
          <div className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wider font-serif border-b border-slate-400 pb-1 text-slate-950">
              III. SUBMISSIONS & AUTHORITIES CITED
            </h2>
            <div className="space-y-3 text-sm text-slate-900 font-serif">
              <div>
                <span className="font-bold underline block mb-1">A. Submissions of Appellant / Petitioner:</span>
                {j.petitionerArguments.map((arg, idx) => (
                  <p key={idx} className="mb-1">{arg}</p>
                ))}
              </div>
              <div>
                <span className="font-bold underline block mb-1">B. Submissions of Prosecution / Respondent:</span>
                {j.respondentArguments.map((arg, idx) => (
                  <p key={idx} className="mb-1">{arg}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Statutory Laws Applied */}
          <div className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wider font-serif border-b border-slate-400 pb-1 text-slate-950">
              IV. APPLICABLE STATUTORY PROVISIONS & PRECEDENTS
            </h2>
            <ul className="list-disc pl-5 text-sm font-serif text-slate-900 space-y-1">
              {j.statutesApplied.map((st, idx) => (
                <li key={idx} className="font-semibold">{st}</li>
              ))}
            </ul>
          </div>

          {/* Section: Judicial Analysis */}
          <div className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wider font-serif border-b border-slate-400 pb-1 text-slate-950">
              V. JUDICIAL ANALYSIS & REASONING
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-slate-900 font-serif">
              {j.legalAnalysis.map((ana, idx) => (
                <p key={idx}>{ana}</p>
              ))}
            </div>
          </div>

          {/* Section: Findings */}
          <div className="space-y-3">
            <h2 className="text-base font-bold uppercase tracking-wider font-serif border-b border-slate-400 pb-1 text-slate-950">
              VI. FINDINGS ON ISSUES
            </h2>
            <div className="space-y-2 text-sm font-serif text-slate-900 font-semibold">
              {j.findings.map((fin, idx) => (
                <p key={idx}>{fin}</p>
              ))}
            </div>
          </div>

          {/* Section: Final Order */}
          <div className="p-6 bg-amber-50 border-2 border-amber-800 rounded-xl space-y-3 text-slate-950 font-serif">
            <h2 className="text-base font-bold uppercase tracking-wider text-amber-900 border-b border-amber-800 pb-1">
              VII. FINAL JUDICIAL ORDER & DECREE
            </h2>
            <p className="text-sm font-bold leading-relaxed">{j.finalOrder}</p>
          </div>

          {/* Digital Signature Seal */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-800">
            <div>
              <div className="font-bold text-sm text-slate-950">{j.judgeSignature}</div>
              <div>Bench Cryptographic Seal • SHA-256 Verified</div>
            </div>
            <div className="p-3 bg-slate-900 text-amber-400 rounded-lg border border-amber-600 font-mono text-center">
              DIGITAL SEAL ATTESTED
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
