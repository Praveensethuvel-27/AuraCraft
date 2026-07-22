import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { PromptEditor } from '../components/dashboard/PromptEditor';
import { EmptyDashboardState } from '../components/dashboard/EmptyDashboardState';
import { GenerationProgress } from '../components/dashboard/GenerationProgress';
import { StackSelectorView } from '../components/dashboard/StackSelectorView';
import { ProjectPreview } from '../components/dashboard/ProjectPreview';
import { useGenerator } from '../contexts/GeneratorContext';

export function DashboardPage() {
  const { generationState, currentProject } = useGenerator();

  return (
    <div className="min-h-screen bg-white pb-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto space-y-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div>
              <h1 className="text-base font-bold text-stone-900 tracking-tight">AI Project Studio</h1>
              <p className="text-[11px] text-stone-500">2-Step AI Architecture & Code Synthesis Engine</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-stone-600 font-mono bg-rose-50/60 px-2.5 py-1 rounded-lg border border-rose-200/60">
            <Terminal className="w-3 h-3 text-rose-500" />
            <span>n8n Multi-Agent Active</span>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div>
          {generationState === 'analyzing' || generationState === 'generating' || generationState === 'error' ? (
            <GenerationProgress />
          ) : generationState === 'selecting_stack' ? (
            <StackSelectorView />
          ) : currentProject ? (
            <ProjectPreview />
          ) : (
            <EmptyDashboardState />
          )}
        </div>
      </div>

      {/* Sticky Bottom Prompt Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-white via-white/95 to-transparent pt-3 pb-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <PromptEditor />
        </div>
      </div>
    </div>
  );
}
