import React from 'react';
import { Sparkles, Trash2, Wand2 } from 'lucide-react';
import { useGenerator } from '../../contexts/GeneratorContext';
import { useToast } from '../../contexts/ToastContext';

export function PromptEditor() {
  const { config, updateConfig, startGeneration, isGenerating } = useGenerator();
  const { addToast } = useToast();

  const handleEnhancePrompt = () => {
    if (!config.prompt.trim()) {
      addToast('Type an initial prompt idea first before enhancing.', 'warning');
      return;
    }

    const p = config.prompt.toLowerCase();
    let dbType = 'SQL / PostgreSQL';
    if (p.includes('mongo')) dbType = 'MongoDB';
    else if (p.includes('supabase')) dbType = 'Supabase';
    else if (p.includes('mysql')) dbType = 'MySQL';
    else if (p.includes('sql') || p.includes('postgres')) dbType = 'PostgreSQL SQL';

    const enhanced = `${config.prompt.trim()} Ensure modular architecture, REST API controllers, ${dbType} database schemas, authentication middleware, responsive styling, and Docker build setup.`;
    updateConfig('prompt', enhanced);
    addToast(`Prompt enhanced with ${dbType} production specs!`, 'success');
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      startGeneration();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Ultra Compact Prompt Box */}
      <div className="relative rounded-2xl bg-white border border-rose-300 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200/50 transition-all p-2.5 shadow-lg shadow-rose-500/10">
        {/* Input Textarea */}
        <textarea
          rows={1}
          value={config.prompt}
          onChange={(e) => updateConfig('prompt', e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your application concept... (e.g. Build a Hospital System with React, Express, SQL...)"
          className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none resize-none leading-normal font-sans"
        />

        {/* Floating Action Controls */}
        <div className="flex items-center justify-between pt-1 border-t border-rose-100 mt-1">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleEnhancePrompt}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-medium transition cursor-pointer"
              title="Enhance prompt with AI production rules"
            >
              <Wand2 className="w-2.5 h-2.5 text-rose-500" />
              <span>AI Enhance</span>
            </button>

            {config.prompt && (
              <button
                onClick={() => updateConfig('prompt', '')}
                className="p-0.5 rounded-md text-stone-400 hover:text-red-500 hover:bg-rose-50 transition"
                title="Clear input"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={startGeneration}
            disabled={isGenerating || !config.prompt.trim()}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-orange-400 via-rose-500 to-rose-600 hover:from-orange-500 hover:to-rose-700 text-white font-semibold text-[11px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
          >
            {isGenerating ? (
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" /> Synthesizing...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Generate Project
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
