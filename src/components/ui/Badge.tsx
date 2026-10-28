import React from 'react';
import { CaseStatus } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'amber' | 'court' | 'rose' | 'slate' | 'gold';
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
    blue: 'bg-zinc-100 text-zinc-950 font-bold border border-zinc-300',
    emerald: 'bg-zinc-950 text-emerald-400 border border-emerald-800/80 font-mono',
    amber: 'bg-white text-black font-extrabold border border-zinc-300',
    court: 'bg-white text-black font-extrabold border border-zinc-200 shadow-sm',
    rose: 'bg-zinc-950 text-red-400 border border-red-800/80 font-mono',
    slate: 'bg-zinc-900 text-zinc-300 border border-zinc-700',
    gold: 'bg-white text-black font-extrabold border border-zinc-200 shadow-sm',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
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
      return <Badge variant="court">Under Appeal Review</Badge>;
    case 'Closed':
      return <Badge variant="slate">Disposed / Closed</Badge>;
    default:
      return <Badge variant="slate">{status}</Badge>;
  }
};
