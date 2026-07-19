import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className = '', hover = true, glow = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/[0.08] p-6 shadow-xl relative overflow-hidden',
        hover && 'transition-all duration-300 hover:border-purple-500/30 hover:bg-zinc-900/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10',
        glow && 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10 before:opacity-50 before:-z-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={cn('flex flex-col space-y-1.5 mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={cn('text-lg font-semibold text-white tracking-tight', className)}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={cn('text-sm text-zinc-400', className)}>{children}</p>;
}

export function CardContent({ children, className = '' }) {
  return <div className={cn('', className)}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={cn('mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between', className)}>{children}</div>;
}
