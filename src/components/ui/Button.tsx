import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost' | 'danger' | 'court';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    primary: "bg-white hover:bg-zinc-200 text-black font-extrabold shadow-sm border border-white focus:ring-white",
    secondary: "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-750 border-zinc-800 focus:ring-zinc-400",
    outline: "bg-transparent hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-700 hover:border-zinc-400 focus:ring-zinc-400",
    court: "bg-[#0d0d0d] hover:bg-[#181818] text-white border border-zinc-700 hover:border-white focus:ring-white",
    gold: "bg-white hover:bg-zinc-100 text-black font-extrabold shadow-md border border-white focus:ring-white",
    ghost: "bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white focus:ring-zinc-400",
    danger: "bg-zinc-950 hover:bg-zinc-900 text-red-400 hover:text-red-300 shadow-sm focus:ring-red-500 border border-red-800/80",
  };

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
