import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, RefreshCw, Rocket, Check, CheckCircle2, Code, FileText, Cpu } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CodeViewer } from '../ui/CodeViewer';
import { useGenerator } from '../../contexts/GeneratorContext';
import { useToast } from '../../contexts/ToastContext';
import { downloadSingleFile, downloadAllFilesAsZip } from '../../services/n8nService';

function extractAllFiles(project) {
  if (project.files && project.files.length > 0) {
    return project.files;
  }
  const fileList = [];
  function scan(items) {
    if (!items) return;
    for (const item of items) {
      if (item.type === 'file') {
        fileList.push(item);
      } else if (item.children) {
        scan(item.children);
      }
    }
  }
  if (project.folderStructure) scan(project.folderStructure);
  return fileList;
}

export function ProjectPreview() {
  const { currentProject, resetGenerator, setIsDeployModalOpen } = useGenerator();
  const { addToast } = useToast();
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!currentProject) return null;

  const allFiles = extractAllFiles(currentProject);
  const [selectedFilePath, setSelectedFilePath] = useState(allFiles[0]?.path || '');

  const selectedFile = allFiles.find(f => f.path === selectedFilePath) || allFiles[0];

  const handleDownloadAllZip = async () => {
    setDownloadingZip(true);
    try {
      await downloadAllFilesAsZip(allFiles, currentProject.name.toLowerCase().replace(/[^a-z0-9]/g, '-'));
      addToast(`Downloaded all files as ${currentProject.name} ZIP archive!`, 'success');
    } catch (err) {
      addToast('Failed to prepare ZIP download.', 'error');
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleDownloadFile = () => {
    if (!selectedFile) return;
    downloadSingleFile(selectedFile);
    addToast(`Downloaded ${selectedFile.name || selectedFile.path}`, 'success');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentProject.prompt);
    setCopied(true);
    addToast('Copied original prompt to clipboard.', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Generated Project Header Card */}
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
              <span className="text-[10px] text-stone-500 font-mono">{allFiles.length} Total Code Files</span>
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
              loading={downloadingZip}
              onClick={handleDownloadAllZip}
              icon={Download}
            >
              Download All (ZIP)
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyPrompt}
              icon={copied ? Check : Copy}
            >
              {copied ? 'Copied' : 'Copy Prompt'}
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

      {/* Real Code File Tree & Individual File Preview */}
      {allFiles.length > 0 && (
        <div className="rounded-2xl bg-white border border-rose-200 p-4 space-y-3 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-rose-100">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold text-stone-900 tracking-tight">
                Generated Source Files ({allFiles.length} files)
              </span>
            </div>

            {/* Individual File Download & File Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <button
                onClick={handleDownloadFile}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer shrink-0"
                title="Download this single file"
              >
                <FileText className="w-3.5 h-3.5 text-rose-500" />
                <span>Download File</span>
              </button>

              <div className="flex items-center space-x-1 overflow-x-auto">
                {allFiles.slice(0, 4).map((f) => (
                  <button
                    key={f.path}
                    onClick={() => setSelectedFilePath(f.path)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                      selectedFile?.path === f.path
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {f.name || f.path.split('/').pop()}
                  </button>
                ))}

                {allFiles.length > 4 && (
                  <select
                    value={selectedFilePath}
                    onChange={(e) => setSelectedFilePath(e.target.value)}
                    className="px-2 py-1 rounded-lg text-xs bg-stone-100 border border-stone-200 text-stone-700 focus:outline-none"
                  >
                    {allFiles.map((f) => (
                      <option key={f.path} value={f.path}>
                        {f.path}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Active File Info Bar */}
          {selectedFile && (
            <div className="flex items-center justify-between px-3 py-1.5 bg-rose-50/50 rounded-xl border border-rose-200/60 text-xs">
              <span className="font-mono text-stone-700 font-semibold">{selectedFile.path}</span>
              {selectedFile.modelUsed && (
                <span className="flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                  <Cpu className="w-3 h-3 text-rose-500" /> Model: {selectedFile.modelUsed}
                </span>
              )}
            </div>
          )}

          {/* Code Viewer Component */}
          {selectedFile && (
            <CodeViewer filename={selectedFile.path} code={selectedFile.content || ''} />
          )}
        </div>
      )}

      {/* Architecture Summary */}
      <div className="p-3.5 rounded-xl bg-white border border-rose-200 space-y-0.5 shadow-xs">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Project Architecture & Custom Setup</h4>
        <p className="text-[11px] text-stone-600 leading-normal">{currentProject.architectureSummary}</p>
      </div>
    </div>
  );
}
