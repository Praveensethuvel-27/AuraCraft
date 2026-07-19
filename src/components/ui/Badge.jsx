import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = 'default', size = 'md', pulse = false, className = '' }) {
  const variants = {
    default: 'bg-stone-800 text-stone-300 border-stone-700/50',
    primary: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    peach: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    blue: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    red: 'bg-red-500/10 text-red-400 border-red-500/30',
    gradient: 'bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-rose-200 border-rose-400/40 shadow-sm shadow-rose-500/10'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm font-medium'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide backdrop-blur-md',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
      )}
      {children}
    </span>
  );
}
