import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, AlertTriangle, ArrowRight, Layers, Database, Server, Layout, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useGenerator } from '../../contexts/GeneratorContext';

export function StackSelectorView() {
  const { analysisResult, confirmAndGenerate, isGenerating } = useGenerator();
  const [selectedId, setSelectedId] = useState(analysisResult?.stackOptions?.[0]?.id || 'stack_1');

  if (!analysisResult || !analysisResult.stackOptions) return null;

  const stackOptions = analysisResult.stackOptions;
  const currentSelectedStack = stackOptions.find((s) => s.id === selectedId) || stackOptions[0];

  const handleGenerate = (stack) => {
    setSelectedId(stack.id);
    confirmAndGenerate(stack);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Analysis Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white border border-rose-200 p-6 shadow-xl space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-100">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="gradient" size="sm" pulse>
                <Sparkles className="w-3.5 h-3.5" /> AI Analysis Complete
              </Badge>
              <span className="text-xs text-stone-500 font-mono">3 Architecture Recommendations Found</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              {analysisResult.projectName || 'Project Architecture Options'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">{analysisResult.description}</p>
          </div>
        </div>

        {/* Extracted Specifications Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/60 space-y-1">
            <span className="text-[11px] text-stone-500 font-semibold block">Styling Engine</span>
            <span className="font-bold text-rose-700">{analysisResult.styling || 'Tailwind CSS'}</span>
          </div>
          <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200/60 space-y-1">
            <span className="text-[11px] text-stone-500 font-semibold block">Authentication</span>
            <span className="font-bold text-orange-700">{analysisResult.authentication || 'JWT / Auth'}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1">
            <span className="text-[11px] text-stone-500 font-semibold block">User Roles</span>
            <span className="font-bold text-amber-800">
              {Array.isArray(analysisResult.userRoles) ? analysisResult.userRoles.join(', ') : 'Admin, User'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 space-y-1">
            <span className="text-[11px] text-stone-500 font-semibold block">Key Features</span>
            <span className="font-bold text-emerald-800">
              {Array.isArray(analysisResult.features) ? `${analysisResult.features.length} Features Planned` : 'Full-Stack Features'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Selectable Stack Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-rose-600 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Select Architecture Stack for Code Generation
          </h3>
          <span className="text-xs text-stone-500">Click a card to choose stack option</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stackOptions.map((stack, idx) => {
            const isSelected = selectedId === stack.id;
            const prosList = Array.isArray(stack.pros) ? stack.pros : [stack.pros];
            const consList = Array.isArray(stack.cons) ? stack.cons : [stack.cons];

            return (
              <motion.div
                key={stack.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedId(stack.id)}
                className={`rounded-3xl p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-white via-rose-50/60 to-orange-50/40 border-2 border-rose-500 shadow-xl shadow-rose-500/15 scale-[1.02]'
                    : 'bg-white border border-rose-200 hover:border-rose-300 shadow-md hover:shadow-lg'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 right-4">
                    <Badge variant="gradient" size="sm">
                      SELECTED STACK
                    </Badge>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Stack Name & Badges */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Option 0{idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-stone-900 leading-tight">
                      {stack.name}
                    </h4>

                    {/* Component Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold flex items-center gap-1">
                        <Layout className="w-3 h-3" /> {stack.frontend}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200 text-[11px] font-semibold flex items-center gap-1">
                        <Server className="w-3 h-3" /> {stack.backend}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold flex items-center gap-1">
                        <Database className="w-3 h-3" /> {stack.database}
                      </span>
                    </div>
                  </div>

                  {/* Pros Section */}
                  <div className="space-y-1.5 pt-3 border-t border-rose-100">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      Advantages:
                    </span>
                    <ul className="space-y-1">
                      {prosList.map((pro, pIdx) => (
                        <li key={pIdx} className="text-xs text-stone-700 flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons Section */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                      Tradeoffs / Cons:
                    </span>
                    <ul className="space-y-1">
                      {consList.map((con, cIdx) => (
                        <li key={cIdx} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Generate CTA Button */}
                <div className="pt-5 mt-4 border-t border-rose-100">
                  <Button
                    variant={isSelected ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                    disabled={isGenerating}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGenerate(stack);
                    }}
                    icon={ArrowRight}
                  >
                    Generate with this Stack
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
