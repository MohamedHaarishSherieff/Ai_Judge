'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MOCK_EVIDENCE } from '@/data/mockData';
import { Evidence } from '@/types';
import { ForensicEvidenceViewer } from '@/components/courtroom/ForensicEvidenceViewer';
import { Shield, Search, Filter, Plus, CheckCircle2, AlertTriangle, FileCode, Video, Image, HardDrive, Link as LinkIcon, Sparkles, Eye } from 'lucide-react';

export default function EvidenceManagementPage() {
  const [evidenceList, setEvidenceList] = useState<Evidence[]>(MOCK_EVIDENCE);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);

  // Modal State
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('Digital Forensics');
  const [summary, setSummary] = useState('');

  const filteredEvidence = evidenceList.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.evidenceCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newEv: Evidence = {
      id: `ev-${Date.now()}`,
      evidenceCode: code || `EXHIBIT-P${evidenceList.length + 1}`,
      caseId: 'AJ-2026-001',
      title,
      category,
      submittedBy: 'State Financial Corp.',
      submissionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Admissible',
      relevanceSummary: summary || 'Timestamped digital forensic record uploaded to AI court evidence vault.',
      custodyChain: 'Forensic Extraction -> SHA-256 Hash Signed -> Vault Ingested',
    };

    setEvidenceList([newEv, ...evidenceList]);
    setIsSubmitModalOpen(false);
    setCode('');
    setTitle('');
    setSummary('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-zinc-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="gold">Bharatiya Sakshya Adhiniyam Vault</Badge>
              <span className="text-xs text-zinc-400 font-mono">{evidenceList.length} Exhibits Ingested</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-serif">Digital Evidence & Forensics Vault</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
              Section 63 BSA cryptographic chain-of-custody, zero-shot SAM 3.1 tamper detection, and hash verification logs.
            </p>
          </div>

          <Button variant="gold" icon={<Plus className="w-4 h-4 text-black" />} onClick={() => setIsSubmitModalOpen(true)}>
            Submit Evidence Record
          </Button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-zinc-800 text-xs">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search evidence code or title..."
              className="w-full bg-[#121212] border border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-white font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-semibold font-mono">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#121212] text-white border border-zinc-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-white cursor-pointer font-sans"
            >
              <option value="All">All Categories</option>
              <option value="Digital Forensics">Digital Forensics</option>
              <option value="Documentary">Documentary</option>
              <option value="Video/Audio Recording">Video/Audio Recording</option>
              <option value="Expert Testimony">Expert Testimony</option>
            </select>
          </div>
        </div>

        {/* Evidence Grid */}
        {filteredEvidence.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-[#080808] space-y-4 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-white">
              <Shield className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white font-serif">Digital Evidence Vault Empty</h3>
              <p className="text-xs text-zinc-400">
                Submit an exhibit or load our baseline forensic demonstration exhibit to inspect zero-shot SAM 3.1 pixel segmentation.
              </p>
            </div>
            <Button
              variant="gold"
              icon={<Sparkles className="w-4 h-4 text-black" />}
              onClick={() => {
                const demoEv: Evidence = {
                  id: 'ev-demo-01',
                  evidenceCode: 'EXHIBIT-P01',
                  caseId: 'AJ-SESSION-001',
                  title: 'Commercial Agreement & Disputed Notary Seal',
                  category: 'Digital Forensics',
                  submittedBy: 'Petitioner Counsel (State Corp)',
                  submissionDate: new Date().toLocaleDateString('en-GB'),
                  status: 'Under Review',
                  relevanceSummary: 'Disputed promissory covenant. Petitioner alleges forged managing director signature and altered seal under Sec 63 BSA.',
                  custodyChain: 'Encrypted Extraction -> SHA-256 Hash Signed -> Vault Ingested',
                };
                setEvidenceList([demoEv]);
                setSelectedEvidence(demoEv);
              }}
            >
              Load Demo Forensic Exhibit (SAM 3.1)
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvidence.map((ev) => (
              <Card key={ev.id} variant="court" hoverEffect className="p-6 space-y-4 border-zinc-800 hover:border-zinc-500 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-black text-xs px-2.5 py-0.5 rounded bg-white border border-zinc-200">
                      {ev.evidenceCode}
                    </span>
                    <Badge variant={ev.status === 'Admissible' ? 'emerald' : 'court'}>
                      {ev.status}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug font-serif">{ev.title}</h3>
                  <div className="text-xs text-zinc-400 font-mono">Category: {ev.category}</div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{ev.relevanceSummary}</p>
                </div>

                <div className="pt-3 border-t border-zinc-800 space-y-3 text-xs font-mono">
                  <div className="text-zinc-400 flex justify-between">
                    <span>Submitted By:</span>
                    <span className="text-zinc-200 font-semibold">{ev.submittedBy}</span>
                  </div>
                  <div className="p-2 bg-black rounded border border-zinc-800 text-[11px] text-zinc-400 space-y-0.5">
                    <div className="text-white font-semibold flex items-center gap-1">
                      <LinkIcon className="w-3 h-3 text-white" /> Custody Chain:
                    </div>
                    <div className="line-clamp-2 text-zinc-400">{ev.custodyChain}</div>
                  </div>

                  <Button
                    variant="court"
                    size="sm"
                    className="w-full"
                    icon={<Eye className="w-3.5 h-3.5 text-white" />}
                    onClick={() => setSelectedEvidence(ev)}
                  >
                    Inspect with SAM 3.1
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Disclaimer />
      </main>

      {/* Submit Evidence Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit New Evidence Record"
      >
        <form onSubmit={handleAddEvidence} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Exhibit Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. EXHIBIT-P03"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              >
                <option value="Digital Forensics">Digital Forensics</option>
                <option value="Documentary">Documentary</option>
                <option value="Video/Audio Recording">Video/Audio Recording</option>
                <option value="Expert Testimony">Expert Testimony</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Evidence Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Database Audit SHA-256 Checksum Log"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Relevance Summary & Statutory Purpose</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Explain how this evidence establishes claim or defense under Section 63 BSA..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsSubmitModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" icon={<Shield className="w-4 h-4" />}>
              Submit to Evidence Vault
            </Button>
          </div>
        </form>
      </Modal>

      {/* Forensic Inspection Modal */}
      {selectedEvidence && (
        <Modal
          isOpen={!!selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          title={`Forensic Scrutiny: ${selectedEvidence.evidenceCode} — ${selectedEvidence.title}`}
          maxWidth="5xl"
        >
          <ForensicEvidenceViewer
            evidence={selectedEvidence}
            onAdmitToSession={(admitted) => {
              setSelectedEvidence(null);
            }}
          />
        </Modal>
      )}

      <Footer />
    </div>
  );
}
