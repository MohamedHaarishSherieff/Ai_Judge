'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, CaseStatusBadge } from '@/components/ui/Badge';
import { MOCK_CASES, MOCK_HEARINGS, MOCK_DOCUMENTS, MOCK_APPEALS, CURRENT_USER } from '@/data/mockData';
import { 
  FolderKanban, 
  Gavel, 
  MessageSquare, 
  Video, 
  FileText, 
  Plus, 
  Calendar, 
  Clock, 
  Upload, 
  Award, 
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Activity
} from 'lucide-react';

export default function UserDashboardPage() {
  const activeCasesCount = MOCK_CASES.filter(c => c.status !== 'Closed').length;
  const pendingDocsCount = MOCK_DOCUMENTS.filter(d => d.status === 'Pending Verification').length + 2;

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl shadow-xl">
          <div className="flex items-center gap-4">
            <img 
              src={CURRENT_USER.avatarUrl} 
              alt={CURRENT_USER.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">Welcome back, {CURRENT_USER.name}</h1>
                <Badge variant="gold">{CURRENT_USER.role}</Badge>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Chambers: {CURRENT_USER.organization} • Bar Registration: {CURRENT_USER.barId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cases/new">
              <Button variant="gold" icon={<Plus className="w-4 h-4" />}>
                File New Case
              </Button>
            </Link>
            <Link href="/text-courtroom">
              <Button variant="secondary" icon={<MessageSquare className="w-4 h-4 text-amber-400" />}>
                Enter Courtroom
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card variant="default" className="p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Active Chambers Cases</span>
              <FolderKanban className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{activeCasesCount}</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" /> 2 Hearing Sessions Scheduled
            </div>
          </Card>

          <Card variant="default" className="p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Upcoming Hearings</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{MOCK_HEARINGS.length}</div>
            <div className="text-[11px] text-amber-300 font-medium">Next: 25 Aug 2026 (11:00 AM)</div>
          </Card>

          <Card variant="default" className="p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Verified Documents</span>
              <FileText className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{MOCK_DOCUMENTS.length}</div>
            <div className="text-[11px] text-slate-400 font-mono">Sec 63 BSA Hash Compliant</div>
          </Card>

          <Card variant="default" className="p-5 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Pending Appeals</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{MOCK_APPEALS.length}</div>
            <div className="text-[11px] text-emerald-400 font-medium">Supreme Court Admitted</div>
          </Card>
        </div>

        {/* Main Grid: Cases & Hearings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Cases Overview */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-amber-400" /> Active Chambers Cases
              </h2>
              <Link href="/cases" className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium">
                View All Cases <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {MOCK_CASES.slice(0, 3).map((c) => (
                <Card key={c.id} variant="bordered" hoverEffect className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 bg-amber-950/60 rounded border border-amber-800/40">
                        {c.id}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">({c.caseNumber})</span>
                    </div>
                    <CaseStatusBadge status={c.status} />
                  </div>

                  <h3 className="text-base font-bold text-white">{c.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{c.summary}</p>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400 font-mono">
                      Bench: <span className="text-slate-200">{c.courtLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/text-courtroom/${c.id}`}>
                        <Button variant="ghost" size="sm" icon={<MessageSquare className="w-3.5 h-3.5 text-amber-400" />}>
                          Text Session
                        </Button>
                      </Link>
                      <Link href={`/cases/${c.id}`}>
                        <Button variant="outline" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Upcoming Hearings & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions Card */}
            <Card variant="gold" className="p-5 space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gavel className="w-4 h-4" /> Quick Chambers Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/cases/new">
                  <button className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left space-y-1 transition-all group">
                    <Plus className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-slate-200">File Case</div>
                  </button>
                </Link>
                <Link href="/documents">
                  <button className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left space-y-1 transition-all group">
                    <Upload className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-slate-200">Upload Doc</div>
                  </button>
                </Link>
                <Link href="/text-courtroom">
                  <button className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left space-y-1 transition-all group">
                    <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-slate-200">Text Court</div>
                  </button>
                </Link>
                <Link href="/video-courtroom">
                  <button className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-left space-y-1 transition-all group">
                    <Video className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-slate-200">Video Court</div>
                  </button>
                </Link>
              </div>
            </Card>

            {/* Upcoming Hearings */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" /> Scheduled Bench Hearings
              </h3>
              <div className="space-y-2">
                {MOCK_HEARINGS.map((h) => (
                  <div key={h.id} className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-amber-400 font-bold">{h.hearingNumber}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-semibold">
                        {h.status}
                      </span>
                    </div>
                    <div className="font-bold text-slate-200">{h.title}</div>
                    <div className="text-slate-400 flex justify-between text-[11px] font-mono">
                      <span>{h.date}</span>
                      <span>{h.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
