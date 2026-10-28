import React from 'react';
import { CaseStatus } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'slate' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-sm font-semibold',
  };

  const variantStyles = {
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    slate: 'bg-slate-800 text-slate-300 border border-slate-700',
    gold: 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-950/50',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const CaseStatusBadge: React.FC<{ status: CaseStatus }> = ({ status }) => {
  switch (status) {
    case 'Draft':
      return <Badge variant="slate">Draft</Badge>;
    case 'Submitted':
      return <Badge variant="blue">Submitted</Badge>;
    case 'Hearing':
      return <Badge variant="amber">In Hearing</Badge>;
    case 'Judgment':
      return <Badge variant="emerald">Judgment Passed</Badge>;
    case 'Appealed':
      return <Badge variant="purple">Appealed</Badge>;
    case 'Closed':
      return <Badge variant="slate">Closed</Badge>;
    default:
      return <Badge variant="slate">{status}</Badge>;
  }
};
