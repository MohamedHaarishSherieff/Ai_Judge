import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerProps {
  className?: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ className = '' }) => {
  return (
    <div className={`p-4 bg-[#0a0a0a] border border-zinc-700 rounded-xl text-zinc-300 text-xs leading-relaxed flex items-start gap-3.5 ${className}`}>
      <AlertTriangle className="w-5 h-5 text-white shrink-0 mt-0.5" />
      <div>
        <span className="font-bold text-white tracking-wider font-mono">LEGAL NOTICE & STATUTORY SIMULATION DISCLAIMER:</span>{' '}
        AI Judge is an autonomous legal technology simulation platform developed for the Meta Global AI Developer Hackathon. Modeled after the procedural codes of the Indian judiciary—including the Bharatiya Nyaya Sanhita (BNS), Bharatiya Sakshya Adhiniyam (BSA 2023), and Code of Civil Procedure (CPC 1908)—it demonstrates digital dispute resolution and electronic record certification under Section 63 BSA and the Advocates Act 1961.
      </div>
    </div>
  );
};
