import React from 'react';
import Link from 'next/link';
import { Gavel, Shield, BookOpen, ExternalLink, Scale } from 'lucide-react';
import { Disclaimer } from './Disclaimer';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center">
                <Gavel className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AI JUDGE</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An advanced virtual courtroom platform designed around Indian legal principles, facilitating structured digital hearings, evidence management, and automated judicial decree synthesis.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 bg-amber-950/30 px-3 py-1.5 rounded border border-amber-800/40 w-fit">
              <Scale className="w-3.5 h-3.5" />
              <span>Aligned with Bharatiya Nyaya Sanhita (BNS)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Courtroom Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/text-courtroom" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Text Virtual Courtroom
                </Link>
              </li>
              <li>
                <Link href="/video-courtroom" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Video Bench Experience
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  Case Repository & Search
                </Link>
              </li>
              <li>
                <Link href="/cases/new" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  File New Petition
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Knowledge */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Legal Framework</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/how-it-works" className="hover:text-amber-400 transition-colors">
                  Six-Step Digital Process
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  Responsible Legal AI & Vision
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-amber-400 transition-colors">
                  Document Authentication (Sec 63 BSA)
                </Link>
              </li>
              <li>
                <Link href="/appeals" className="hover:text-amber-400 transition-colors">
                  Appellate High Court Escalations
                </Link>
              </li>
            </ul>
          </div>

          {/* Systems Status */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">System Information</h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-mono">Bench Availability</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> 24/7 Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Presiding AI Judicial Bench ready for instant preliminary hearings.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Block */}
        <Disclaimer className="mb-8" />

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} AI Judge Virtual Courtroom Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-200">Privacy Policy</Link>
            <Link href="/about" className="hover:text-slate-200">Terms of Judicial Simulation</Link>
            <Link href="/about" className="hover:text-slate-200">Bar Council Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
