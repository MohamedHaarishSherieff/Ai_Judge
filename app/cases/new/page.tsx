'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  FolderPlus, 
  Users, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Gavel,
  Scale
} from 'lucide-react';

export default function CreateCasePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Corporate & Commercial');
  const [courtLevel, setCourtLevel] = useState('High Court of State');
  const [description, setDescription] = useState('');
  
  // Participants
  const [petitionerName, setPetitionerName] = useState('');
  const [petitionerAdvocate, setPetitionerAdvocate] = useState('');
  const [respondentName, setRespondentName] = useState('');
  const [respondentAdvocate, setRespondentAdvocate] = useState('');

  // Documents
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to newly created mock case details page!
    router.push('/cases/AJ-2026-001');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 w-full">
        
        {/* Title Header */}
        <div className="text-center space-y-2">
          <Badge variant="gold">Digital Case Filing Portal</Badge>
          <h1 className="text-3xl font-extrabold text-white">File New Digital Petition</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Provide initial case details, litigating parties, and supporting affidavits to initiate virtual proceedings.
          </p>
        </div>

        {/* Wizard Step Indicator */}
        <div className="grid grid-cols-4 gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs font-semibold">
          {[
            { num: 1, label: 'Case Info' },
            { num: 2, label: 'Participants' },
            { num: 3, label: 'Documents' },
            { num: 4, label: 'Review & Submit' }
          ].map((s) => (
            <div
              key={s.num}
              className={`p-3 rounded-lg text-center transition-all ${
                currentStep === s.num
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : currentStep > s.num
                  ? 'bg-slate-900 text-emerald-400'
                  : 'text-slate-500'
              }`}
            >
              <div className="text-[10px] font-mono">STEP 0{s.num}</div>
              <div>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form Body */}
        <Card variant="court" className="p-8 border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
            
            {/* STEP 1: CASE INFO */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <FolderPlus className="w-5 h-5 text-amber-400" /> Step 1 — Case & Forum Details
                </h3>

                <div>
                  <label className="block text-slate-200 font-semibold mb-1.5">Case Title / Cause Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. State Financial Corp. v. Apex Logistics Ltd."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-200 font-semibold mb-1.5">Case Classification Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Corporate & Commercial">Corporate & Commercial</option>
                      <option value="Criminal Matter">Criminal Matter</option>
                      <option value="Civil Dispute">Civil Dispute</option>
                      <option value="Constitutional Law">Constitutional Law</option>
                      <option value="Intellectual Property">Intellectual Property</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-200 font-semibold mb-1.5">Court Forum Level</label>
                    <select
                      value={courtLevel}
                      onChange={(e) => setCourtLevel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="District Court">District Court</option>
                      <option value="High Court of State">High Court of State</option>
                      <option value="Supreme Court of India">Supreme Court of India</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-200 font-semibold mb-1.5">Brief Statement of Claim & Statutory Issues</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Summarize the core legal dispute, default details, or constitutional grounds..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: PARTICIPANTS */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Users className="w-5 h-5 text-amber-400" /> Step 2 — Litigating Parties & Counsel
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <span className="font-bold text-blue-400 text-xs uppercase tracking-wider block">Petitioner Side</span>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Petitioner Name</label>
                      <input
                        type="text"
                        value={petitionerName}
                        onChange={(e) => setPetitionerName(e.target.value)}
                        placeholder="e.g. State Financial Corporation"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Petitioner Counsel</label>
                      <input
                        type="text"
                        value={petitionerAdvocate}
                        onChange={(e) => setPetitionerAdvocate(e.target.value)}
                        placeholder="Adv. Rajesh Sharma (D/4829/2012)"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <span className="font-bold text-emerald-400 text-xs uppercase tracking-wider block">Respondent Side</span>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Respondent Name</label>
                      <input
                        type="text"
                        value={respondentName}
                        onChange={(e) => setRespondentName(e.target.value)}
                        placeholder="e.g. Apex Logistics Solutions Ltd."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Respondent Counsel</label>
                      <input
                        type="text"
                        value={respondentAdvocate}
                        onChange={(e) => setRespondentAdvocate(e.target.value)}
                        placeholder="Adv. Meera Sen (MH/1920/2015)"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DOCUMENTS */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <FileText className="w-5 h-5 text-amber-400" /> Step 3 — Initial Pleadings & Evidence Attachment
                </h3>

                <div className="p-8 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-950 text-center space-y-3">
                  <Upload className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
                  <div className="text-slate-200 font-bold text-base">Drag & Drop Petition PDF/A Here</div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Includes automatic SHA-256 hash calculation and Section 63 Bharatiya Sakshya Adhiniyam compliance verification.
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    id="petition-file-input"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || 'Writ_Petition_Original_Filing.pdf')}
                  />
                  <label htmlFor="petition-file-input" className="inline-block">
                    <Button type="button" variant="outline" size="sm">Select File from Computer</Button>
                  </label>

                  {fileName && (
                    <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-amber-500/40 text-amber-300 text-xs font-mono inline-block">
                      Selected: {fileName} (4.8 MB • Hash OK)
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Step 4 — Review Case Summary Before Filing
                </h3>

                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 block font-mono">Case Title:</span>
                      <span className="font-bold text-slate-100 text-sm">{title || 'State Financial Corp. v. Apex Logistics Solutions Ltd.'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">Court Level & Type:</span>
                      <span className="font-bold text-amber-400">{courtLevel} • {type}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 block">Petitioner:</span>
                      <span className="text-slate-200">{petitionerName || 'State Financial Corporation'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Respondent:</span>
                      <span className="text-slate-200">{respondentName || 'Apex Logistics Solutions Ltd.'}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block">Attached Pleadings:</span>
                    <span className="font-mono text-emerald-400">{fileName || 'Writ_Petition_Original_Filing.pdf'} (Sec 63 BSA Compliant)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons Row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Previous Step
                </Button>
              ) : <div />}

              {currentStep < 4 ? (
                <Button type="button" variant="gold" onClick={() => setCurrentStep(currentStep + 1)} icon={<ArrowRight className="w-4 h-4" />}>
                  Next Step
                </Button>
              ) : (
                <Button type="submit" variant="gold" size="lg" icon={<Gavel className="w-5 h-5" />}>
                  Create Case & Initiate Bench
                </Button>
              )}
            </div>

          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
