import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'court' | 'gold';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  className = '',
  ...props
}) => {
  const baseStyles = "rounded-xl p-5 transition-all duration-200";
  
  const variantStyles = {
    default: "bg-slate-900/90 border border-slate-800/80 shadow-lg shadow-black/20",
    bordered: "bg-slate-950/60 border border-slate-700/60 shadow-md",
    court: "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/90 shadow-xl shadow-slate-950/50",
    gold: "bg-slate-900/95 border border-amber-500/30 gold-glow shadow-xl",
  };

  const hoverStyle = hoverEffect ? "hover:-translate-y-1 hover:border-slate-600 hover:shadow-slate-900/50 cursor-pointer" : "";

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};
