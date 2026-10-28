import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerProps {
  className?: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ className = '' }) => {
  return (
    <div className={`p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl text-amber-200/90 text-xs leading-relaxed flex items-start gap-3.5 ${className}`}>
      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold text-amber-300">LEGAL NOTICE & SIMULATION DISCLAIMER:</span>{' '}
        AI Judge is a technology platform and legal research/educational simulation system. It does not replace qualified legal professionals, licensed advocates, or constitute an official court of law, statutory arbitration panel, or binding legal advice under the Advocates Act 1961. All mock cases and proceedings demonstrate future digital courtroom capabilities for educational and research workflow evaluation.
      </div>
    </div>
  );
};
