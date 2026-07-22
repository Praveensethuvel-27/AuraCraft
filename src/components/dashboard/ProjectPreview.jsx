import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, Copy, RefreshCw, Rocket, Check, CheckCircle2, Code, FileText, Cpu, 
  Folder, FolderOpen, FileCode, ChevronRight, ChevronDown 
} from 'lucide-react';
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

function FileTreeNode({ node, selectedPath, onSelect, expandedFolders, toggleFolder }) {
  const isFolder = node.type === 'folder';
  const isExpanded = expandedFolders[node.path];
  const isSelected = selectedPath === node.path;

  if (isFolder) {
    return (
      <div className="space-y-0.5">
        <button
          onClick={() => toggleFolder(node.path)}
          className="w-full flex items-center gap-1.5 px-2 py-1 text-left rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition cursor-pointer"
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          )}
          {isExpanded ? (
            <FolderOpen className="w-4 h-4 text-rose-500 shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-rose-500 shrink-0" />
          )}
          <span className="truncate">{node.name}</span>
        </button>

        {isExpanded && node.children && (
          <div className="pl-3 ml-3 border-l border-rose-100 space-y-0.5">
            {node.children.map((child) => (
              <FileTreeNode
                key={child.path}
                node={child}
                selectedPath={selectedPath}
                onSelect={onSelect}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <button
        onClick={() => onSelect(node.path)}
        className={`w-full flex items-center gap-1.5 px-2 py-1 text-left rounded-lg text-xs font-medium transition cursor-pointer ${
          isSelected
            ? 'bg-rose-500 text-white font-bold'
            : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
        }`}
      >
        <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-stone-400'}`} />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }
}

export function ProjectPreview() {
  const { currentProject, resetGenerator, setIsDeployModalOpen } = useGenerator();
  const { addToast } = useToast();
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});

  useEffect(() => {
    if (currentProject && currentProject.folderStructure) {
      const folders = {};
      function scan(items) {
        if (!items) return;
        for (const item of items) {
          if (item.type === 'folder') {
            folders[item.path] = true;
            scan(item.children);
          }
        }
      }
      scan(currentProject.folderStructure);
      setExpandedFolders(folders);
    }
  }, [currentProject]);

  if (!currentProject) return null;

  const allFiles = extractAllFiles(currentProject);
  const [selectedFilePath, setSelectedFilePath] = useState(allFiles[0]?.path || '');

  const selectedFile = allFiles.find(f => f.path === selectedFilePath) || allFiles[0];

  const toggleFolder = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

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
        <div className="rounded-2xl bg-white border border-rose-200 p-5 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Sidebar - Desktop only */}
            <div className="hidden md:block md:col-span-1 border-r border-rose-100 pr-4 space-y-3 max-h-[600px] overflow-y-auto animate-fadeIn">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">Workspace Files</span>
                <Badge variant="secondary" size="xs">{allFiles.length} files</Badge>
              </div>
              <div className="space-y-1">
                {currentProject.folderStructure?.map((node) => (
                  <FileTreeNode
                    key={node.path}
                    node={node}
                    selectedPath={selectedFilePath}
                    onSelect={setSelectedFilePath}
                    expandedFolders={expandedFolders}
                    toggleFolder={toggleFolder}
                  />
                ))}
              </div>
            </div>

            {/* Right Code Area - Mobile and Desktop */}
            <div className="col-span-1 md:col-span-3 space-y-4">
              {/* Header row with selectors (shown only on mobile) and actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-rose-100">
                {/* Mobile file selector */}
                <div className="md:hidden flex items-center space-x-2 w-full sm:w-auto">
                  <Code className="w-4 h-4 text-rose-500 shrink-0" />
                  <select
                    value={selectedFilePath}
                    onChange={(e) => setSelectedFilePath(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-50 border border-stone-200 text-stone-700 focus:outline-none w-full max-w-[280px]"
                  >
                    {allFiles.map((f) => (
                      <option key={f.path} value={f.path}>
                        {f.path}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Desktop header label */}
                <div className="hidden md:flex items-center space-x-2">
                  <Code className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-extrabold text-stone-900 tracking-tight">
                    Source Code Editor
                  </span>
                </div>

                {/* Per-file download */}
                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <button
                    onClick={handleDownloadFile}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer shrink-0"
                    title="Download this single file"
                  >
                    <FileText className="w-3.5 h-3.5 text-rose-500" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              {/* Active File Info Bar */}
              {selectedFile && (
                <div className="flex items-center justify-between px-3 py-1.5 bg-rose-50/50 rounded-xl border border-rose-200/60 text-xs animate-fadeIn">
                  <span className="font-mono text-stone-700 font-bold truncate max-w-[65%]">{selectedFile.path}</span>
                  {selectedFile.modelUsed && (
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-stone-500 font-mono shrink-0">
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
          </div>
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
