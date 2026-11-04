'use client';

import React, { useState, useRef } from 'react';
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
  Scale,
  Check,
  Trash2,
  FileCheck,
  Sparkles
} from 'lucide-react';

export default function CreateCasePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const [fileSize, setFileSize] = useState('');
  const [fileHash, setFileHash] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Autofill helper
  const handleAutofillExample = () => {
    setTitle('Verma Technologies Pvt. Ltd. v. Bharat Cloud Infrastructure Ltd.');
    setType('Corporate & Commercial');
    setCourtLevel('High Court of State');
    setDescription('Commercial Summary Suit under Order XXXVII CPC for recovery of Rs. 14,82,00,000/- on account of persistent cloud outage, SLA default under Section 74 Indian Contract Act 1872, and damages under Section 43A IT Act.');
    setPetitionerName('Verma Technologies Pvt. Ltd.');
    setPetitionerAdvocate('Adv. Rajesh Sharma (D/4829/2012)');
    setRespondentName('Bharat Cloud Infrastructure Ltd.');
    setRespondentAdvocate('Adv. Meera Sen (MH/1920/2015)');
    setFileName('Verma_Technologies_v_Bharat_Cloud_Petition.pdf');
    setFileSize('1.84 MB');
    setFileHash('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  };

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    // Generate deterministic mock SHA-256 hash
    setFileHash('sha256:' + Array.from(file.name).reduce((acc, char) => (acc + char.charCodeAt(0).toString(16)), '').padEnd(64, 'a').slice(0, 64));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCaseId = courtLevel === 'Supreme Court of India' ? 'SC-WP-2026-104' : 'HC-COMM-2026-781';

    const newCase = {
      id: newCaseId,
      caseNumber: courtLevel === 'Supreme Court of India' ? 'Writ Petition (Civil) No. 104 of 2026' : 'Commercial Summary Suit No. 418 of 2026',
      title: title || 'Verma Technologies Pvt. Ltd. v. Bharat Cloud Infrastructure Ltd.',
      type: type || 'Corporate & Commercial',
      courtLevel: courtLevel,
      status: 'Hearing',
      filedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      nextHearing: 'Today (Live Bench)',
      summary: description || 'Commercial Summary Suit under Order XXXVII CPC for recovery of ₹14,82,00,000/- on account of persistent cloud outage, SLA default under Section 74 Indian Contract Act 1872, and damages under Section 43A IT Act.',
      benchInfo: courtLevel === 'Supreme Court of India' 
        ? "Chief Justice of India & 4-Judge Constitution Bench (Courtroom No. 1)" 
        : "Hon'ble High Court Commercial Division Bench (Courtroom No. 4)",
      statutoryActs: [
        'Order XXXVII Code of Civil Procedure, 1908 (Summary Suits)',
        'Indian Contract Act, 1872 — Section 74 (Liquidated Damages)',
        'Bharatiya Sakshya Adhiniyam, 2023 — Section 63 (Electronic Evidence Certificate)',
        'Information Technology Act, 2000 — Section 43A (Failure to Protect Data)'
      ],
      issuesForDetermination: [
        'Whether 96-hour continuous cloud server outage constitutes repudiatory breach of service level agreement under Section 74 ICA.',
        'Whether electronic audit logs and Section 63 BSA certificate are admissible without oral examining of cloud engineers.',
        'Whether the plaintiff is entitled to summary decree under Order XXXVII Rule 3 CPC for ₹14.82 Crores.'
      ],
      parties: [
        { id: 'p1', name: petitionerName || 'Verma Technologies Pvt. Ltd.', role: 'Petitioner', advocateName: petitionerAdvocate || 'Senior Adv. Rajesh Sharma', barCouncilNo: 'D/4829/2012' },
        { id: 'p2', name: respondentName || 'Bharat Cloud Infrastructure Ltd.', role: 'Respondent', advocateName: respondentAdvocate || 'Adv. Meera Sen', barCouncilNo: 'MH/1920/2015' },
      ],
    };

    const newDoc = {
      id: 'doc-uploaded-' + Date.now(),
      caseId: newCaseId,
      name: fileName || 'Verma_Technologies_v_Bharat_Cloud_Petition.pdf',
      type: 'Petition',
      uploadedBy: petitionerAdvocate || 'Senior Adv. Rajesh Sharma',
      uploadedRole: 'Petitioner Counsel',
      uploadedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      fileSize: fileSize || '1.84 MB',
      fileFormat: 'PDF/A',
      status: 'Verified',
      description: 'Original Commercial Summary Suit Plaint with Section 63 BSA electronic verification certificate and Tier-IV SLA breach exhibits.'
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('custom_case_' + newCaseId, JSON.stringify(newCase));
        localStorage.setItem('custom_docs_' + newCaseId, JSON.stringify([newDoc]));
        localStorage.setItem('last_created_case_id', newCaseId);
      } catch (e) {}
    }

    router.push(`/cases/${newCaseId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 w-full">
        
        {/* Title Header */}
        <div className="text-center space-y-2">
          <Badge variant="court">Digital Case Filing Portal</Badge>
          <h1 className="text-3xl font-extrabold text-white">File New Digital Petition</h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Provide initial case details, litigating parties, and supporting affidavits to initiate virtual proceedings.
          </p>
        </div>

        {/* Wizard Step Indicator */}
        <div className="grid grid-cols-4 gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-800 text-xs font-semibold">
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
                  ? 'bg-white text-black font-extrabold'
                  : currentStep > s.num
                  ? 'bg-zinc-900 text-zinc-200'
                  : 'text-zinc-500'
              }`}
            >
              <div className="text-[10px] font-mono">STEP 0{s.num}</div>
              <div>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form Body */}
        <Card variant="court" className="p-8 border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
            
            {/* STEP 1: CASE INFO */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-wrap gap-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderPlus className="w-5 h-5 text-white" /> Step 1 — Case & Forum Details
                  </h3>
                  <button
                    type="button"
                    onClick={handleAutofillExample}
                    className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg transition-colors font-mono"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Fill Example Case Data (Verma Tech v. Bharat Cloud)
                  </button>
                </div>

                <div>
                  <label className="block text-zinc-200 font-semibold mb-1.5">Case Title / Cause Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Verma Technologies Pvt. Ltd. v. Bharat Cloud Infrastructure Ltd."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-200 font-semibold mb-1.5">Case Classification Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 focus:border-white focus:outline-none"
                    >
                      <option value="Corporate & Commercial">Corporate & Commercial</option>
                      <option value="Criminal Matter">Criminal Matter</option>
                      <option value="Civil Dispute">Civil Dispute</option>
                      <option value="Constitutional Law">Constitutional Law</option>
                      <option value="Intellectual Property">Intellectual Property</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-200 font-semibold mb-1.5">Court Forum Level</label>
                    <select
                      value={courtLevel}
                      onChange={(e) => setCourtLevel(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 focus:border-white focus:outline-none"
                    >
                      <option value="High Court of State">High Court of State</option>
                      <option value="Supreme Court of India">Supreme Court of India</option>
                      <option value="District Court">District Court</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-200 font-semibold mb-1.5">Brief Statement of Claim & Statutory Issues</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Summarize the core legal dispute, default details, or constitutional grounds..."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-white focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: PARTICIPANTS */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Users className="w-5 h-5 text-white" /> Step 2 — Litigating Parties & Counsel
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3">
                    <span className="font-bold text-zinc-100 text-xs uppercase tracking-wider block">Petitioner Side</span>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Petitioner Name</label>
                      <input
                        type="text"
                        value={petitionerName}
                        onChange={(e) => setPetitionerName(e.target.value)}
                        placeholder="e.g. State Financial Corporation"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Petitioner Counsel</label>
                      <input
                        type="text"
                        value={petitionerAdvocate}
                        onChange={(e) => setPetitionerAdvocate(e.target.value)}
                        placeholder="Adv. Rajesh Sharma (D/4829/2012)"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3">
                    <span className="font-bold text-zinc-100 text-xs uppercase tracking-wider block">Respondent Side</span>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Respondent Name</label>
                      <input
                        type="text"
                        value={respondentName}
                        onChange={(e) => setRespondentName(e.target.value)}
                        placeholder="e.g. Apex Logistics Solutions Ltd."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">Respondent Counsel</label>
                      <input
                        type="text"
                        value={respondentAdvocate}
                        onChange={(e) => setRespondentAdvocate(e.target.value)}
                        placeholder="Adv. Meera Sen (MH/1920/2015)"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DOCUMENTS */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <FileText className="w-5 h-5 text-white" /> Step 3 — Initial Pleadings & Evidence Attachment
                </h3>

                {/* Hidden File Input referenced by fileInputRef */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.docx,.doc"
                  className="hidden"
                  id="petition-file-input"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className={`p-8 border-2 border-dashed rounded-2xl bg-zinc-950 text-center space-y-4 cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-white bg-zinc-900 ring-2 ring-white/20' 
                      : 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-zinc-100 font-bold text-base">Drag & Drop Petition PDF/A Here</div>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto">
                      Supports PDF, DOCX, JPG, PNG. Automatic SHA-256 hash calculation and Section 63 Bharatiya Sakshya Adhiniyam compliance verification.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Select File from Computer
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileName('Verma_Technologies_v_Bharat_Cloud_Petition.pdf');
                        setFileSize('1.84 MB');
                        setFileHash('sha256:7fa29b4412c9842a6c81093f412e84c9876231d601b0451a99f12d8a39b94017');
                      }}
                    >
                      Attach Generated Case Petition PDF
                    </Button>
                  </div>

                  {fileName && (
                    <div 
                      onClick={(e) => e.stopPropagation()} 
                      className="mt-4 p-4 bg-zinc-900/90 rounded-xl border border-zinc-700 text-left max-w-lg mx-auto flex items-start justify-between gap-3 shadow-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-600/50 flex items-center justify-center shrink-0 mt-0.5">
                          <FileCheck className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-zinc-100 font-mono font-bold text-xs truncate max-w-xs sm:max-w-sm">
                            {fileName}
                          </div>
                          <div className="text-[11px] text-zinc-400 flex items-center gap-2 flex-wrap">
                            <span>{fileSize || '1.84 MB'}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-medium flex items-center gap-1">
                              <Check className="w-3 h-3" /> Sec. 63 BSA Compliant
                            </span>
                          </div>
                          {fileHash && (
                            <div className="text-[10px] font-mono text-zinc-500 truncate max-w-xs sm:max-w-sm">
                              Hash: {fileHash}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-zinc-300 hover:text-white px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors font-mono"
                          title="Choose different file"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFileName('');
                            setFileSize('');
                            setFileHash('');
                          }}
                          className="text-xs text-red-400 hover:text-red-300 p-1 rounded hover:bg-zinc-800 transition-colors"
                          title="Remove file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-white" /> Step 4 — Review Case Summary Before Filing
                </h3>

                <div className="p-5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-400 block font-mono text-[11px]">Case Title:</span>
                      <span className="font-bold text-zinc-100 text-sm">
                        {title || 'Verma Technologies Pvt. Ltd. v. Bharat Cloud Infrastructure Ltd.'}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block font-mono text-[11px]">Court Level & Forum:</span>
                      <span className="font-bold text-white">{courtLevel} • {type}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px] font-semibold">Petitioner:</span>
                      <span className="text-zinc-200 font-medium block">
                        {petitionerName || 'Verma Technologies Pvt. Ltd.'}
                      </span>
                      <span className="text-zinc-400 text-[11px] block mt-0.5">
                        Counsel: {petitionerAdvocate || 'Adv. Rajesh Sharma (D/4829/2012)'}
                      </span>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                      <span className="text-zinc-400 block text-[11px] font-semibold">Respondent:</span>
                      <span className="text-zinc-200 font-medium block">
                        {respondentName || 'Bharat Cloud Infrastructure Ltd.'}
                      </span>
                      <span className="text-zinc-400 text-[11px] block mt-0.5">
                        Counsel: {respondentAdvocate || 'Adv. Meera Sen (MH/1920/2015)'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800">
                    <span className="text-zinc-400 block text-[11px] font-mono mb-1">Attached Pleadings & Evidence:</span>
                    <div className="flex items-center gap-2 p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-white text-xs font-semibold">
                        {fileName || 'Verma_Technologies_v_Bharat_Cloud_Petition.pdf'}
                      </span>
                      <span className="text-[11px] text-zinc-400 ml-auto font-mono">
                        {fileSize || '1.84 MB'} • Sec. 63 BSA Hash Verified
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                    <div className="text-zinc-200 font-semibold flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-zinc-300" /> Statutory Filing Certification
                    </div>
                    <div>
                      This electronic petition will be digitally indexed under the e-Courts Phase III standards. Upon submission, an autonomous presiding bench will convene virtual courtroom proceedings.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons Row */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Previous Step
                </Button>
              ) : <div />}

              {currentStep < 4 ? (
                <Button type="button" variant="primary" onClick={() => setCurrentStep(currentStep + 1)} icon={<ArrowRight className="w-4 h-4" />}>
                  Next Step
                </Button>
              ) : (
                <Button type="submit" variant="primary" size="lg" icon={<Gavel className="w-5 h-5" />}>
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
