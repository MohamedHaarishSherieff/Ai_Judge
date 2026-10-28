'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, CaseStatusBadge } from '@/components/ui/Badge';
import { MOCK_CASES } from '@/data/mockData';
import { CaseStatus, CaseType } from '@/types';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Plus, 
  MessageSquare, 
  Video, 
  FileText, 
  ArrowRight, 
  LayoutGrid, 
  List, 
  ChevronRight,
  Gavel
} from 'lucide-react';

export default function CasesDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredCases = MOCK_CASES.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesType = typeFilter === 'All' || c.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Page Title & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="gold">Chambers Repository</Badge>
              <span className="text-xs text-slate-400 font-mono">{filteredCases.length} Cases Listed</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">My Cases</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Search, filter, and manage digital petitions, hearing schedules, and statutory decrees.
            </p>
          </div>

          <Link href="/cases/new">
            <Button variant="gold" icon={<Plus className="w-4 h-4" />}>
              Create New Case
            </Button>
          </Link>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by case title, #AJ ID, or case number..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Filters & View Toggles */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-semibold">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Hearing">Hearing</option>
                <option value="Judgment">Judgment</option>
                <option value="Appealed">Appealed</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-semibold">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-900 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="All">All Case Types</option>
                <option value="Criminal Matter">Criminal Matter</option>
                <option value="Civil Dispute">Civil Dispute</option>
                <option value="Constitutional Law">Constitutional Law</option>
                <option value="Corporate & Commercial">Corporate & Commercial</option>
                <option value="Intellectual Property">Intellectual Property</option>
              </select>
            </div>

            {/* View Grid/Table Toggle Buttons */}
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Display Cases: Grid vs Table View */}
        {filteredCases.length === 0 ? (
          <Card variant="bordered" className="p-12 text-center space-y-3">
            <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-300">No Cases Found</h3>
            <p className="text-xs text-slate-500">Try clearing filters or search terms.</p>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map((c) => (
              <Card key={c.id} variant="court" hoverEffect className="p-6 space-y-4 flex flex-col justify-between border-slate-800 hover:border-amber-500/40">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                      {c.id}
                    </span>
                    <CaseStatusBadge status={c.status} />
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-2">{c.title}</h3>
                  <div className="text-xs text-slate-400 font-mono">{c.caseNumber} • {c.courtLevel}</div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{c.summary}</p>

                  <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs space-y-1">
                    <div className="text-[11px] text-slate-400">
                      Petitioner: <span className="text-slate-200 font-semibold">{c.parties[0]?.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Respondent: <span className="text-slate-200 font-semibold">{c.parties[1]?.name}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Next: <span className="text-amber-400">{c.nextHearing || 'TBD'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/text-courtroom/${c.id}`}>
                      <Button variant="ghost" size="sm" icon={<MessageSquare className="w-3.5 h-3.5 text-amber-400" />}>
                        Court
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
        ) : (
          /* Table View */
          <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-4">Case ID & Number</th>
                  <th className="p-4">Title & Type</th>
                  <th className="p-4">Court Level</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Next Hearing</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-400">
                      <div>{c.id}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{c.caseNumber}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-100">{c.title}</div>
                      <div className="text-[11px] text-slate-400">{c.type}</div>
                    </td>
                    <td className="p-4 text-slate-300">{c.courtLevel}</td>
                    <td className="p-4"><CaseStatusBadge status={c.status} /></td>
                    <td className="p-4 font-mono text-amber-300">{c.nextHearing || 'None'}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/text-courtroom/${c.id}`}>
                          <Button variant="ghost" size="sm" icon={<MessageSquare className="w-3.5 h-3.5 text-amber-400" />}>
                            Court
                          </Button>
                        </Link>
                        <Link href={`/cases/${c.id}`}>
                          <Button variant="gold" size="sm">
                            Open
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}
