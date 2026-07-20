import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Loader2, Terminal, Cpu } from 'lucide-react';
import { useGenerator } from '../../contexts/GeneratorContext';

export function GenerationProgress() {
  const { generationSteps, generationState } = useGenerator();

  const completedCount = generationSteps.filter((s) => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / (generationSteps.length || 5)) * 100);

  const isStep1 = generationState === 'analyzing';

  return (
    <div className="max-w-4xl mx-auto flex flex-col justify-between rounded-2xl bg-white border border-rose-200 p-4 shadow-lg">
      {/* Top Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
                {isStep1 ? 'Analyzing your requirements...' : 'Generating your project files, this may take a minute...'}
              </h3>
              <p className="text-[11px] text-rose-600 font-mono">
                {isStep1 ? 'Preparing 3 Stack Architecture Options' : 'n8n Multi-Agent AI Code Synthesis Active'}
              </p>
            </div>
          </div>
          <span className="text-xl font-black text-stone-900 font-mono">{progressPercent}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-rose-50 border border-rose-200 overflow-hidden p-0.5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 via-rose-500 to-rose-600 shadow-xs"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Stream */}
      <div className="my-4 space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
        {generationSteps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
              step.status === 'completed'
                ? 'bg-emerald-50/50 border-emerald-200 text-stone-800'
                : step.status === 'in-progress'
                ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-400'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {step.status === 'completed' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : step.status === 'in-progress' ? (
                <Loader2 className="w-3.5 h-3.5 text-rose-500 animate-spin shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full border border-stone-300 block shrink-0" />
              )}
              <div className="flex flex-col">
                <span className="font-semibold text-stone-900 text-xs">{step.title}</span>
                {step.detail && <span className="text-[10px] text-stone-500 font-mono">{step.detail}</span>}
              </div>
            </div>

            <span className="font-mono text-[9px] uppercase text-stone-400">
              {step.status === 'completed' ? 'DONE' : step.status === 'in-progress' ? 'RUNNING' : 'WAITING'}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer console stats */}
      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-600">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-rose-500" />
          <span>{isStep1 ? 'Analyzing your requirements...' : 'Generating your project files, this may take a minute...'}</span>
        </div>
        <div className="flex items-center space-x-2 text-stone-400">
          <Cpu className="w-3 h-3" />
          <span>{isStep1 ? 'Analyze Agent' : 'Code Synthesis Agent'}</span>
        </div>
      </div>
    </div>
  );
}
