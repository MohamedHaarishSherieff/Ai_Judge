'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MOCK_APPEALS } from '@/data/mockData';
import { Appeal } from '@/types';
import { Award, Plus, ArrowRight, CheckCircle2, Gavel, Scale, AlertCircle, FileText } from 'lucide-react';

export default function AppealsPage() {
  const [appeals, setAppeals] = useState<Appeal[]>(MOCK_APPEALS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [origCase, setOrigCase] = useState('AJ-2026-001');
  const [appellant, setAppellant] = useState('');
  const [respondent, setRespondent] = useState('');
  const [ground1, setGround1] = useState('');
  const [targetCourt, setTargetCourt] = useState<any>('Supreme Court of India');

  const handleAddAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appellant) return;

    const newApl: Appeal = {
      id: `apl-${Date.now()}`,
      caseId: origCase,
      originalCaseNumber: 'HC-COMM 4021/2026',
      appellantName: appellant,
      respondentName: respondent || 'Opposing Party',
      groundsForAppeal: [
        ground1 || 'Violation of Section 63 BSA electronic evidence authentication rules.',
        'Misinterpretation of statutory moratorium provisions.'
      ],
      targetCourt,
      filingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Admitted',
    };

    setAppeals([newApl, ...appeals]);
    setIsModalOpen(false);
    setAppellant('');
    setGround1('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="gold">Appellate Division Bench</Badge>
              <span className="text-xs text-slate-400 font-mono">Article 136 / High Court Jurisdiction</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Appeals Portal</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              File grounds of appeal against trial court decrees and escalate cases to Appellate Benches.
            </p>
          </div>

          <Button variant="gold" icon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            Submit Appeal Petition
          </Button>
        </div>

        {/* Appeals List */}
        <div className="space-y-6">
          {appeals.map((apl) => (
            <Card key={apl.id} variant="court" className="p-6 space-y-4 border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                      APPEAL #{apl.id}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Original Case: {apl.originalCaseNumber}</span>
                    <Badge variant="emerald">{apl.status}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {apl.appellantName} v. {apl.respondentName}
                  </h3>
                </div>

                <div className="text-right text-xs font-mono text-slate-400">
                  Target Forum: <span className="text-amber-400 font-bold block">{apl.targetCourt}</span>
                </div>
              </div>

              {/* Grounds for Appeal */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Grounds for Appeal
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {apl.groundsForAppeal.map((g, idx) => (
                    <li key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 leading-relaxed">
                      <span className="font-mono text-amber-400 font-bold mr-2">GROUND #{idx+1}:</span> {g}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">Filing Date: {apl.filingDate}</span>
                <Button variant="outline" size="sm" icon={<FileText className="w-3.5 h-3.5" />}>
                  View Appellate Record
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Disclaimer />
      </main>

      {/* Submit Appeal Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="File Special Leave / High Court Appeal"
      >
        <form onSubmit={handleAddAppeal} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Appellate Forum</label>
            <select
              value={targetCourt}
              onChange={(e) => setTargetCourt(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
            >
              <option value="Supreme Court of India">Supreme Court of India (Article 136 SLP)</option>
              <option value="High Court of State">High Court Division Bench Appeal</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Appellant Name</label>
              <input
                type="text"
                required
                value={appellant}
                onChange={(e) => setAppellant(e.target.value)}
                placeholder="e.g. Kavita Sundaram"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Respondent Name</label>
              <input
                type="text"
                value={respondent}
                onChange={(e) => setRespondent(e.target.value)}
                placeholder="e.g. Union of India & Ors."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Main Ground for Appeal (Statutory Error)</label>
            <textarea
              rows={3}
              required
              value={ground1}
              onChange={(e) => setGround1(e.target.value)}
              placeholder="State key errors of law or natural justice violations in the lower decree..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" icon={<Award className="w-4 h-4" />}>
              Submit Grounds of Appeal
            </Button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
}
