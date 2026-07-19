import React from 'react';
import { cn } from '../../utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  loading = false,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400/40 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-orange-400 via-rose-500 to-rose-600 hover:from-orange-500 hover:to-rose-700 text-white shadow-lg shadow-rose-500/25 border border-rose-300/30 hover:scale-[1.01] active:scale-[0.99]',
    secondary: 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700/60 backdrop-blur-md hover:border-rose-400/40',
    glass: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-lg hover:border-rose-300/30',
    outline: 'bg-transparent border border-rose-500/40 hover:bg-rose-500/10 text-rose-300',
    ghost: 'bg-transparent hover:bg-white/5 text-stone-300 hover:text-white',
    danger: 'bg-red-600/80 hover:bg-red-600 text-white border border-red-500/40 shadow-lg shadow-red-600/20'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold',
    xl: 'px-8 py-4 text-lg gap-3 font-semibold rounded-2xl'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
