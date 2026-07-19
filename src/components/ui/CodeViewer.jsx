import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

export function CodeViewer({ filename = 'code.jsx', code = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-2xl bg-zinc-950 border border-white/[0.08] overflow-hidden font-mono text-sm shadow-2xl flex flex-col h-full">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2">
          <FileCode className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-zinc-300">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto overflow-y-auto flex-1 max-h-[500px]">
        <table className="w-full text-left border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-zinc-900/40 transition">
                <td className="w-10 select-none text-right pr-4 text-zinc-600 text-xs py-0.5">{idx + 1}</td>
                <td className="py-0.5 whitespace-pre text-zinc-200 text-xs">
                  {highlightSyntax(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Subtle syntax highlighter for keywords, strings, imports, and tags
function highlightSyntax(line) {
  if (line.trim().startsWith('import') || line.trim().startsWith('export') || line.trim().startsWith('from')) {
    return <span className="text-purple-400 font-medium">{line}</span>;
  }
  if (line.includes('function') || line.includes('const') || line.includes('let') || line.includes('return')) {
    return <span className="text-blue-400">{line}</span>;
  }
  if (line.includes('<') && line.includes('>')) {
    return <span className="text-cyan-300">{line}</span>;
  }
  if (line.includes('//') || line.includes('/*')) {
    return <span className="text-zinc-500 italic">{line}</span>;
  }
  return line;
}
