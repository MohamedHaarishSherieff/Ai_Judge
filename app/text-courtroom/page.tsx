'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_CASES, INDIAN_COURT_FORUMS } from '@/data/mockData';
import { IndianCourtForum } from '@/types';
import { 
  MessageSquare, Gavel, Plus, Sparkles, ArrowRight, Shield, 
  Landmark, Scale, FileText, CheckCircle2, ChevronRight, HelpCircle, 
  Search, AlertCircle, Building2, BookOpen
} from 'lucide-react';

export default function TextCourtroomListPage() {
  const [selectedForum, setSelectedForum] = useState<IndianCourtForum | 'All'>('All');
  const [showHelperModal, setShowHelperModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter cases based on selected forum and search term
  const filteredCases = MOCK_CASES.filter((c) => {
    const matchesForum = selectedForum === 'All' || c.courtLevel === selectedForum;
    const matchesSearch = searchTerm === '' || 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courtLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesForum && matchesSearch;
  });

  // Guided jurisdiction helper options
  const jurisdictionHelpers = [
    {
      label: 'Violation of Fundamental Rights (Privacy, Equality, Liberty)',
      forum: 'Supreme Court of India' as IndianCourtForum,
      reason: 'Article 32 Original Writ Jurisdiction directly before the Supreme Court of India.',
    },
    {
      label: 'State Government Action, Commercial Writs or State Regulatory Seizures',
      forum: 'High Courts of the States' as IndianCourtForum,
      reason: 'Article 226 Constitutional Writ Jurisdiction of the High Court.',
    },
    {
      label: 'Sessions Trial for Serious Criminal Offense or Bail (BNS § 103 / BNSS § 480)',
      forum: 'District & Sessions Courts' as IndianCourtForum,
      reason: 'Court of District & Sessions Judge having plenary trial powers for serious penal offenses.',
    },
    {
      label: 'Property Title, Specific Performance, Injunctions & Tenancy (< ₹20 Lakhs)',
      forum: 'Subordinate Civil Courts' as IndianCourtForum,
      reason: 'Court of Civil Judge (Senior/Junior Division) under the Code of Civil Procedure.',
    },
    {
      label: 'Cheque Dishonour (Section 138 NI Act) or Minor Summary Offenses',
      forum: 'Subordinate Criminal Courts' as IndianCourtForum,
      reason: 'Court of Judicial Magistrate First Class (JMFC) / Chief Judicial Magistrate.',
    },
    {
      label: 'Anti-Corruption (CBI), POCSO Act or Designated Commercial Benches',
      forum: 'Special Courts' as IndianCourtForum,
      reason: 'Statutorily designated Special Court (CBI / POCSO Wing).',
    },
    {
      label: 'Corporate Insolvency (IBC), Company Mergers, or NGT Environmental Claims',
      forum: 'Quasi-Judicial Tribunals' as IndianCourtForum,
      reason: 'Specialized Tribunals (NCLT / NGT / CAT) having exclusive statutory subject jurisdiction.',
    },
    {
      label: 'Pre-Litigation Settlement, Mutual Compromise or Rural Conciliation',
      forum: 'Grassroots Dispute Forums' as IndianCourtForum,
      reason: 'National Lok Adalat & Gram Nyayalaya under Legal Services Authorities Act, 1987.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Sovereign Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold">
                Ministry of Law & Justice • e-Courts Sovereign Grid
              </span>
              <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                8 Judicial Forums Online
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Scale className="w-8 h-8 text-white" />
              Indian Judicial Bench & Courtroom Directory
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Select the appropriate judicial forum based on subject matter and pecuniary jurisdiction. 
              The Presiding Judicial Officer is strictly autonomous AI, with litigating advocates configurable 
              as AI Legal Counsel or Real Human Advocates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              icon={<HelpCircle className="w-4 h-4 text-white" />}
              onClick={() => setShowHelperModal(true)}
              className="border-zinc-700 hover:border-white text-xs"
            >
              Which Court Should I Approach?
            </Button>
            <Link href="/cases/new">
              <Button variant="primary" icon={<Plus className="w-4 h-4 text-black" />} className="text-xs">
                File New Case Petition
              </Button>
            </Link>
          </div>
        </div>

        {/* 8 Indian Judicial Forums Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2 font-bold">
              <Building2 className="w-4 h-4 text-white" />
              Constitutional & Statutory Court Forums of India
            </h2>
            <button
              onClick={() => setSelectedForum('All')}
              className={`text-xs font-mono px-3 py-1 rounded transition-all ${
                selectedForum === 'All' 
                  ? 'bg-white text-black font-extrabold' 
                  : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'
              }`}
            >
              View All Courts ({MOCK_CASES.length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {INDIAN_COURT_FORUMS.map((forum, idx) => {
              const isSelected = selectedForum === forum.name;
              const caseCount = MOCK_CASES.filter((c) => c.courtLevel === forum.name).length;
              
              return (
                <div
                  key={forum.id}
                  onClick={() => setSelectedForum(isSelected ? 'All' : forum.name)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 relative group ${
                    isSelected
                      ? 'bg-zinc-900 border-white shadow-lg shadow-white/5'
                      : 'bg-[#0a0a0a] border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-200 font-bold">
                        Tier 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {caseCount} Active Bench{caseCount === 1 ? '' : 'es'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-zinc-200 transition-colors flex items-center gap-1.5">
                        {forum.shortName}
                      </h3>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        {forum.emblemTag}
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {forum.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>{forum.jurisdictionScope}</span>
                    <span className="text-white font-semibold group-hover:translate-x-0.5 transition-transform">
                      {isSelected ? 'Selected' : 'Select Bench →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search & Active Bench Filter Status */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-zinc-500 ml-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by case title, statute, citation, or legal keywords..."
              className="w-full bg-transparent border-0 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {selectedForum !== 'All' && (
              <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                Filtering by: <span className="text-white font-bold">{selectedForum}</span>
                <button
                  onClick={() => setSelectedForum('All')}
                  className="ml-1 text-zinc-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Active Docket / Courtroom Sessions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-zinc-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Pre-Loaded Demonstration Courtroom Sessions ({filteredCases.length})
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Ready-to-test demonstration cases for each Indian court forum • Click to simulate trial, or click &quot;File New Case Petition&quot; above to start your own.
              </p>
            </div>
            <span className="text-xs text-zinc-400 font-mono shrink-0">
              Instant 1-Click Evaluation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCases.map((c) => (
              <Card
                key={c.id}
                variant="court"
                hoverEffect
                className="p-5 flex flex-col justify-between space-y-4 border-zinc-800 bg-[#0c0c0c] rounded-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-mono font-bold text-white px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800">
                      {c.caseNumber}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 font-semibold">
                        Demonstration
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        {c.courtLevel}
                      </span>
                      <Badge variant="court">{c.status}</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white hover:text-zinc-300 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                      {c.summary}
                    </p>
                  </div>

                  {/* Parties & Bench Info */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-black border border-zinc-900 text-[11px] font-mono">
                    <div>
                      <span className="text-zinc-500 uppercase text-[9px] block">Petitioner</span>
                      <span className="text-zinc-200 truncate block font-medium">{c.parties[0]?.name}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase text-[9px] block">Respondent</span>
                      <span className="text-zinc-200 truncate block font-medium">{c.parties[1]?.name}</span>
                    </div>
                  </div>

                  {/* Statutory Provisions */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.statutoryActs.slice(0, 2).map((act, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                        {act.split('—')[0].trim()}
                      </span>
                    ))}
                    {c.statutoryActs.length > 2 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-500">
                        +{c.statutoryActs.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AI Presiding Judge</span>
                  </div>

                  <Link href={`/text-courtroom/${c.id}`}>
                    <Button variant="primary" size="sm" icon={<MessageSquare className="w-3.5 h-3.5" />}>
                      Enter Virtual Courtroom
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Guided Jurisdiction Modal */}
        {showHelperModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-700 rounded-2xl p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Jurisdictional Guidance: Which Court to Approach?</h3>
                </div>
                <button
                  onClick={() => setShowHelperModal(false)}
                  className="text-zinc-400 hover:text-white text-lg font-mono"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-zinc-300">
                In the Indian legal system, forum competence is governed by constitutional writ limits, 
                statutory subject matter, and pecuniary thresholds. Select your matter type to identify the proper bench:
              </p>

              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {jurisdictionHelpers.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedForum(item.forum);
                      setShowHelperModal(false);
                    }}
                    className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-white hover:bg-zinc-850 cursor-pointer transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white group-hover:text-zinc-200 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-mono text-white bg-black px-2 py-0.5 rounded border border-zinc-700 font-bold">
                        {item.forum}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 leading-relaxed">
                      {item.reason}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-800 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowHelperModal(false)}>
                  Close Guide
                </Button>
              </div>
            </div>
          </div>
        )}

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
