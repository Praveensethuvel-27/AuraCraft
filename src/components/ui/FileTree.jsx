import React, { useState } from 'react';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export function FileTree({ nodes = [], onSelectFile, selectedFilePath }) {
  return (
    <div className="space-y-1 font-mono text-xs select-none">
      {nodes.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          onSelectFile={onSelectFile}
          selectedFilePath={selectedFilePath}
        />
      ))}
    </div>
  );
}

function TreeNode({ node, onSelectFile, selectedFilePath }) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';
  const isSelected = selectedFilePath === node.path;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFolder) {
      setIsOpen(!isOpen);
    } else if (onSelectFile) {
      onSelectFile(node);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={cn(
          'flex items-center space-x-2 py-1 px-2 rounded-lg cursor-pointer transition',
          isSelected
            ? 'bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30'
            : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
        )}
      >
        {isFolder ? (
          <>
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            )}
            {isOpen ? (
              <FolderOpen className="w-4 h-4 text-purple-400 shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-purple-400 shrink-0" />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5 h-3.5 shrink-0" />
            <FileText className="w-4 h-4 text-blue-400 shrink-0" />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </div>

      {isFolder && isOpen && node.children && (
        <div className="pl-4 border-l border-zinc-800 ml-3 space-y-1 mt-1">
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              onSelectFile={onSelectFile}
              selectedFilePath={selectedFilePath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
