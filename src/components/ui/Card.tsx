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
  const baseStyles = "rounded-xl p-6 transition-all duration-200";
  
  const variantStyles = {
    default: "bg-[#0a0a0a] border border-zinc-800 shadow-md shadow-black/80",
    bordered: "bg-[#050505] border border-zinc-800 shadow-sm",
    court: "bg-gradient-to-b from-[#111111] to-[#070707] border border-zinc-800 shadow-2xl shadow-black",
    gold: "bg-gradient-to-b from-[#141414] to-[#090909] border border-zinc-500/80 shadow-2xl shadow-black",
  };

  const hoverStyle = hoverEffect ? "hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-black cursor-pointer" : "";

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};
