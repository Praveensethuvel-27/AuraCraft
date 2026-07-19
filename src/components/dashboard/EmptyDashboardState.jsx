import React from 'react';
import { Sparkles } from 'lucide-react';

export function EmptyDashboardState() {
  return (
    <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-rose-200/80 p-8 flex flex-col items-center justify-center text-center shadow-lg shadow-rose-500/5 relative overflow-hidden my-6">
      {/* Ambient glow */}
      <div className="absolute w-60 h-60 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Center Icon */}
      <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-4 shadow-sm">
        <Sparkles className="w-6 h-6 text-rose-500 animate-pulse" />
      </div>

      <h3 className="text-xl font-bold text-stone-900 tracking-tight mb-1">
        Your generated project will appear here.
      </h3>
      <p className="text-stone-500 text-xs sm:text-sm max-w-sm leading-relaxed">
        Describe your concept in the prompt box at the bottom to synthesize full-stack source code, APIs, and downloadable ZIP packages.
      </p>
    </div>
  );
}
