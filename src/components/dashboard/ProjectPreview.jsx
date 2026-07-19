import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, RefreshCw, Rocket, Check, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useGenerator } from '../../contexts/GeneratorContext';
import { useToast } from '../../contexts/ToastContext';
import { exportProjectToZip } from '../../services/zipExporter';

export function ProjectPreview() {
  const { currentProject, resetGenerator, setIsDeployModalOpen } = useGenerator();
  const { addToast } = useToast();
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!currentProject) return null;

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      await exportProjectToZip(currentProject);
      addToast(`Downloaded ${currentProject.name} project ZIP archive!`, 'success');
    } catch (err) {
      addToast('Failed to prepare ZIP download.', 'error');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentProject.prompt);
    setCopied(true);
    addToast('Copied original prompt to clipboard.', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {/* Clean Generated Project Result Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-white border border-rose-200 p-4 sm:p-5 shadow-md relative overflow-hidden gradient-border"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="gradient" size="sm" pulse>
                <CheckCircle2 className="w-3 h-3" /> Generated Successfully
              </Badge>
              <span className="text-[10px] text-stone-500 font-mono">Synthesized in {currentProject.estimatedGenTime}</span>
            </div>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">
              {currentProject.name}
            </h2>
            <p className="text-xs text-stone-600 max-w-md">{currentProject.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Button
              variant="primary"
              size="sm"
              loading={downloading}
              onClick={handleDownloadZip}
              icon={Download}
            >
              Download ZIP
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyPrompt}
              icon={copied ? Check : Copy}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={resetGenerator}
              icon={RefreshCw}
            >
              Again
            </Button>

            <Button
              variant="glass"
              size="sm"
              onClick={() => setIsDeployModalOpen(true)}
              icon={Rocket}
            >
              Deploy
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Architecture Summary */}
      <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-0.5 shadow-xs">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Project Architecture & Custom Setup</h4>
        <p className="text-[11px] text-stone-600 leading-normal">{currentProject.architectureSummary}</p>
      </div>
    </div>
  );
}
