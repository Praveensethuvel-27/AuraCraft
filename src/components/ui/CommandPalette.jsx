import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Sliders, Zap, FileCode, Code, HelpCircle, X } from 'lucide-react';
import { Modal } from './Modal';
import { useGenerator } from '../../contexts/GeneratorContext';
import { PRESET_PROMPTS } from '../../constants/presets';

export function CommandPalette() {
  const navigate = useNavigate();
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, applyPreset, setIsWebhookModalOpen } = useGenerator();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const actions = [
    {
      id: 'dash',
      title: 'Open AI Generator Dashboard',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        navigate('/dashboard');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'n8n',
      title: 'Configure n8n Webhook Settings',
      category: 'Integration',
      icon: Sliders,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsWebhookModalOpen(true);
      }
    },
    {
      id: 'feat',
      title: 'Explore AI Engine Features',
      category: 'Navigation',
      icon: Zap,
      action: () => {
        navigate('/features');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'docs',
      title: 'Read Documentation & Webhook Specs',
      category: 'Navigation',
      icon: FileCode,
      action: () => {
        navigate('/docs');
        setIsCommandPaletteOpen(false);
      }
    },
    ...PRESET_PROMPTS.map((preset) => ({
      id: preset.id,
      title: `Apply Preset: ${preset.title}`,
      category: 'Presets',
      icon: Code,
      action: () => {
        applyPreset(preset);
        navigate('/dashboard');
        setIsCommandPaletteOpen(false);
      }
    }))
  ];

  const filteredActions = actions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal
      isOpen={isCommandPaletteOpen}
      onClose={() => setIsCommandPaletteOpen(false)}
      title="Command Palette (Ctrl + K)"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, presets, pages, or integrations..."
            className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-white/[0.1] rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500"
            autoFocus
          />
        </div>

        {/* Action List */}
        <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
          {filteredActions.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 text-sm">No matching commands found.</div>
          ) : (
            filteredActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/80 text-left transition group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-zinc-800 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-purple-300 transition">
                        {item.title}
                      </div>
                      <div className="text-xs text-zinc-500">{item.category}</div>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-600 group-hover:text-zinc-400 font-mono">Select ↵</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
}
