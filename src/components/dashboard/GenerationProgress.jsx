import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Loader2, Terminal, Cpu, AlertTriangle, RefreshCw, XCircle, FileText, Info } from 'lucide-react';
import { useGenerator } from '../../contexts/GeneratorContext';
import { Button } from '../ui/Button';

const TIPS = [
  "Tip: AuraCraft parses your prompt to design schemas, routes, and UI components tailored to your needs.",
  "Tip: If you need to make changes, you can always copy your prompt and start again with a tweaked version.",
  "Tip: Once the project is generated, you can download individual files or the entire workspace as a ZIP.",
  "Tip: To run the project locally, unpack the ZIP, run 'npm install', and then 'npm run dev'.",
  "Tip: Multi-model failover checks if the primary model is rate-limited and switches to backup models seamlessly.",
  "Tip: The generated express backend includes error middlewares, routing controllers, and configuration files.",
  "Tip: The database schema is customized based on your prompt (relational for SQL, document-based for MongoDB)."
];

export function GenerationProgress() {
  const { 
    generationSteps, 
    generationState, 
    generationProgress, 
    generationError, 
    retryGeneration, 
    setGenerationState 
  } = useGenerator();

  const [tipIndex, setTipIndex] = useState(0);
  const [lastProgressTime, setLastProgressTime] = useState(Date.now());
  const lastCountRef = useRef(0);

  // Rotate tips if no progress has occurred for 15 seconds
  useEffect(() => {
    const count = generationProgress?.completedFiles?.length || 0;
    if (count !== lastCountRef.current) {
      lastCountRef.current = count;
      setLastProgressTime(Date.now());
    }
  }, [generationProgress?.completedFiles?.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      const stalledDuration = Date.now() - lastProgressTime;
      if (stalledDuration >= 15000) {
        setTipIndex((prev) => (prev + 1) % TIPS.length);
        setLastProgressTime(Date.now()); // reset timer
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastProgressTime]);

  const isStep1 = generationState === 'analyzing';
  const isError = generationState === 'error';

  // Step 1 Analysis Progress Calculation
  const step1CompletedCount = generationSteps.filter((s) => s.status === 'completed').length;
  const step1ProgressPercent = Math.round((step1CompletedCount / (generationSteps.length || 3)) * 100);

  // Step 2 Generation Progress Calculation
  const totalFiles = generationProgress?.totalFiles || 9;
  const completedCount = generationProgress?.completedFiles?.length || 0;
  const step2ProgressPercent = Math.min(
    Math.round((completedCount / totalFiles) * 100),
    99
  ); // Keep at 99% until fully done

  const activeProgressPercent = isStep1 ? step1ProgressPercent : step2ProgressPercent;

  // Check if currentModel contains "Backup"
  const isBackupActive = generationProgress?.currentModel?.toLowerCase().includes('backup') || 
    generationProgress?.completedFiles?.some(f => f.modelUsed?.toLowerCase().includes('backup'));

  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-between rounded-3xl bg-white border border-rose-200 p-6 shadow-xl space-y-6">
      {/* Top Header Card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shadow-xs">
              {isError ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : (
                <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
              )}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 tracking-tight">
                {isError 
                  ? 'Generation failed' 
                  : isStep1 
                    ? 'Analyzing your requirements...' 
                    : 'Generating your project...'}
              </h3>
              <p className="text-xs text-rose-600 font-mono">
                {isError 
                  ? 'Process halted' 
                  : isStep1 
                    ? 'Preparing 3 Stack Architecture Options' 
                    : 'n8n Live Async File Stream Active'}
              </p>
            </div>
          </div>
          {!isError && (
            <span className="text-2xl font-black text-stone-900 font-mono tracking-tighter">
              {activeProgressPercent}%
            </span>
          )}
        </div>

        {/* Progress Bar (not shown for errors) */}
        {!isError && (
          <div className="w-full h-2.5 rounded-full bg-rose-50 border border-rose-100 overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 via-rose-5050 to-rose-600 shadow-xs animate-pulse"
              style={{ width: `${activeProgressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="min-h-[220px] max-h-[360px] overflow-y-auto pr-1 space-y-3 flex flex-col justify-end">
        {isError ? (
          /* Error Layout */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-4 text-center my-auto"
          >
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">Something went wrong</h4>
              <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
                {generationError || 'An unexpected error occurred while generating the project files.'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={retryGeneration}
                icon={RefreshCw}
                size="sm"
              >
                Retry Generation
              </Button>
              <Button
                variant="outline"
                onClick={() => setGenerationState('selecting_stack')}
                size="sm"
              >
                Back to Stacks
              </Button>
            </div>
          </motion.div>
        ) : isStep1 ? (
          /* Step 1 Analysis Stream */
          <div className="space-y-2">
            {generationSteps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                  step.status === 'completed'
                    ? 'bg-emerald-50/40 border-emerald-100 text-stone-800'
                    : step.status === 'in-progress'
                    ? 'bg-rose-50/70 border-rose-200 text-rose-900 shadow-sm'
                    : 'bg-stone-50/50 border-stone-100 text-stone-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {step.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : step.status === 'in-progress' ? (
                    <Loader2 className="w-4 h-4 text-rose-500 animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-stone-200 block shrink-0" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-extrabold text-stone-800 text-xs">{step.title}</span>
                    {step.detail && <span className="text-[10px] text-stone-500 font-mono mt-0.5">{step.detail}</span>}
                  </div>
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-stone-400 shrink-0">
                  {step.status === 'completed' ? 'DONE' : step.status === 'in-progress' ? 'RUNNING' : 'WAITING'}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Step 2 Async Generation Chat Bubbles */
          <div className="space-y-3 py-2">
            {/* Initial Welcome Chat Bubble */}
            <div className="flex items-start gap-2.5 max-w-[85%]">
              <div className="w-6 h-6 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
                <Cpu className="w-3.5 h-3.5 text-stone-500" />
              </div>
              <div className="bg-stone-100/80 border border-stone-200/60 rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-xs text-stone-800 shadow-xs">
                <span className="font-semibold text-stone-900 block mb-0.5">System Agent</span>
                I am initializing the workspace and setting up your selected architecture configuration.
              </div>
            </div>

            {/* Completed Files Chat Bubbles */}
            {generationProgress?.completedFiles?.map((file, fIdx) => (
              <motion.div
                key={file.path + fIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 max-w-[85%]"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-xs text-stone-800 shadow-xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-semibold text-emerald-950">File Writer Agent</span>
                    <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                      {file.modelUsed || 'Primary Model'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-700">
                    <FileText className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Finished writing {file.path}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Currently Writing File Chat Bubble */}
            {generationProgress?.currentFile && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 max-w-[85%]"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                  <Loader2 className="w-3.5 h-3.5 text-rose-500 animate-spin" />
                </div>
                <div className="bg-rose-50/70 border border-rose-200/50 rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-xs text-stone-800 shadow-xs relative">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-semibold text-rose-950">Code Generator</span>
                    <span className="text-[9px] font-mono bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                      {generationProgress.currentModel || 'Primary Model'}
                    </span>
                  </div>
                  <p className="font-semibold text-stone-800 text-[11px]">
                    Writing {generationProgress.currentFile} ({completedCount}/{totalFiles})...
                  </p>
                </div>
              </motion.div>
            )}

            {/* Backup Model Friendly Message */}
            {isBackupActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-2.5 max-w-[85%]"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 animate-bounce">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs text-amber-900 shadow-xs font-semibold">
                  ⚡ Primary model busy, switched to backup to keep things moving
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Rotating Tips and Loading Notice */}
      {!isError && (
        <div className="space-y-3 pt-4 border-t border-rose-100">
          {/* Timeout UI loading notice */}
          {!isStep1 && (
            <p className="text-xs text-stone-500 text-center font-medium leading-relaxed bg-stone-50 border border-stone-200/60 rounded-xl py-2 px-3">
              Generating your project... this can take up to 15 minutes for larger projects. Please keep this tab open.
            </p>
          )}

          {/* Rotating Tip */}
          <div className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-200/40 flex items-start gap-2.5 text-[11px] text-rose-900 leading-normal">
            <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
            <AnimatePresence mode="wait">
              <motion.span
                key={tipIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="font-medium"
              >
                {TIPS[tipIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Console footer stats */}
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-between text-[10px] font-mono text-stone-500">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{isStep1 ? 'Analyze Agent' : 'Live File Progress Agent'} connected</span>
            </div>
            <div className="flex items-center space-x-1.5 text-stone-400">
              <Cpu className="w-3 h-3 shrink-0" />
              <span>Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
