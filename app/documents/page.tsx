'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Disclaimer } from '@/components/layout/Disclaimer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MOCK_DOCUMENTS } from '@/data/mockData';
import { Document } from '@/types';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  CheckCircle2, 
  Eye, 
  Download, 
  ShieldCheck, 
  Plus,
  FilePlus,
  Clock
} from 'lucide-react';

export default function DocumentManagementPage() {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Modal State
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState<any>('Petition');
  const [newDocDescription, setNewDocDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const filteredDocs = documents.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || d.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName) return;

    setIsUploading(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      setUploadProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newDoc: Document = {
            id: `doc-${Date.now()}`,
            caseId: 'AJ-2026-001',
            name: newDocName,
            type: newDocType,
            uploadedBy: 'Adv. Rajesh Sharma',
            uploadedRole: 'Petitioner Counsel',
            uploadedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            fileSize: '3.4 MB',
            fileFormat: 'PDF/A',
            status: 'Verified',
            description: newDocDescription || 'Uploaded pleading with SHA-256 hash checksum.',
          };
          setDocuments(prev => [newDoc, ...prev]);
          setIsUploading(false);
          setUploadProgress(0);
          setIsUploadModalOpen(false);
          setNewDocName('');
          setNewDocDescription('');
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100 relative">
      {/* Background Scales of Justice Watermark */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-10 pointer-events-none grayscale contrast-125"
        style={{ backgroundImage: `url('/images/justice_scales.jpg')` }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative z-10 w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="gold">Section 63 BSA Digital Evidence Repository</Badge>
              <span className="text-xs text-zinc-400 font-mono">{documents.length} Records Authenticated</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Chambers Document & Affidavit Vault</h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Store, cryptographically verify, and attach formal legal pleadings, written statements, and electronic certificates under Section 63 BSA.
            </p>
          </div>

          <Button variant="gold" icon={<Upload className="w-4 h-4 text-black" />} onClick={() => setIsUploadModalOpen(true)}>
            Lodge Digital Affidavit
          </Button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-zinc-950/90 backdrop-blur-md rounded-xl border border-zinc-800 text-xs">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents by name or filing counsel..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-semibold font-mono text-[11px]">Filter Category:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-white cursor-pointer text-xs"
            >
              <option value="All">All Types</option>
              <option value="Petition">Petition</option>
              <option value="Written Statement">Written Statement</option>
              <option value="Affidavit">Affidavit</option>
              <option value="Precedent">Precedent</option>
            </select>
          </div>
        </div>

        {/* Document Cards Table */}
        <div className="overflow-x-auto bg-zinc-950/90 rounded-xl border border-zinc-800 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-4">Document Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Filing Counsel</th>
                <th className="p-4">Date & Size</th>
                <th className="p-4">BSA Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-zinc-300 shrink-0" />
                      <span>{doc.name}</span>
                    </div>
                    {doc.description && (
                      <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{doc.description}</div>
                    )}
                  </td>
                  <td className="p-4"><Badge variant="outline">{doc.type}</Badge></td>
                  <td className="p-4 text-zinc-300">{doc.uploadedBy} ({doc.uploadedRole})</td>
                  <td className="p-4 font-mono text-zinc-400">{doc.uploadedDate} • {doc.fileSize}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-900 text-white border border-zinc-700">
                      <CheckCircle2 className="w-3 h-3 text-white" /> Sec 63 Hash Verified
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white transition-colors" title="Preview Document">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white transition-colors" title="Download PDF/A">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Disclaimer />
      </main>

      {/* Upload Document Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Legal Document / Affidavit"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Document File Name</label>
            <input
              type="text"
              required
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="e.g. Counter_Affidavit_In_Reply.pdf"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category Type</label>
              <select
                value={newDocType}
                onChange={(e) => setNewDocType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-amber-500 focus:outline-none"
              >
                <option value="Petition">Petition</option>
                <option value="Written Statement">Written Statement</option>
                <option value="Affidavit">Affidavit</option>
                <option value="Precedent">Precedent</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Format</label>
              <input type="text" value="PDF/A (Sec 63 BSA)" disabled className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-400 font-mono" />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Brief Description</label>
            <textarea
              rows={2}
              value={newDocDescription}
              onChange={(e) => setNewDocDescription(e.target.value)}
              placeholder="Detail document contents and attached exhibits..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
            />
          </div>

          <div className="p-6 border-2 border-dashed border-slate-700 rounded-xl bg-slate-950 text-center space-y-2">
            <Upload className="w-8 h-8 text-amber-400 mx-auto" />
            <div className="text-slate-200 font-semibold">Drag & Drop PDF File Here</div>
            <div className="text-[11px] text-slate-500">Includes SHA-256 cryptographic checksum calculation</div>
          </div>

          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-amber-400">
                <span>Calculating Sec 63 BSA Hash...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={isUploading} icon={<Upload className="w-4 h-4" />}>
              {isUploading ? 'Uploading...' : 'Upload & Verify'}
            </Button>
          </div>
        </form>
      </Modal>

      <Footer />
    </div>
  );
}
