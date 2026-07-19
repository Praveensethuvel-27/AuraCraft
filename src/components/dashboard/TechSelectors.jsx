import React, { useState } from 'react';
import { Sliders, CheckCircle2, ShieldCheck, Database, Server, Layout, ChevronDown, ChevronUp } from 'lucide-react';
import { useGenerator } from '../../contexts/GeneratorContext';
import { Badge } from '../ui/Badge';
import {
  FRONTEND_OPTIONS,
  LANGUAGE_OPTIONS,
  STYLING_OPTIONS,
  BACKEND_OPTIONS,
  DATABASE_OPTIONS,
} from '../../constants/presets';

export function TechSelectors() {
  const { config, updateConfig, updateFeature } = useGenerator();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Quick Summary Pill Bar & Toggle Button */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-rose-200/80 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-stone-600">User Defined Tech Stack:</span>
          <Badge variant="primary">{config.frontend.toUpperCase()}</Badge>
          <Badge variant="blue">{config.backend.toUpperCase()}</Badge>
          <Badge variant="amber">{config.database.toUpperCase()}</Badge>
          <Badge variant="emerald">{config.styling.toUpperCase()}</Badge>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-stone-700 hover:text-stone-900 border border-rose-200 transition cursor-pointer"
        >
          <span>{expanded ? 'Hide Options' : 'Configure Stack'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Accordion Panel */}
      {expanded && (
        <div className="space-y-5 p-5 rounded-3xl bg-white border border-rose-200 shadow-xl animate-in fade-in duration-200">
          {/* 1. Frontend */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5 text-rose-500" /> Frontend Framework
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FRONTEND_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateConfig('frontend', opt.id)}
                  className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                    config.frontend === opt.id
                      ? 'bg-rose-50 border-rose-300 text-stone-900 font-semibold'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900'
                  }`}
                >
                  <span className="text-xs">{opt.name}</span>
                  {config.frontend === opt.id && <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Backend & Database */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Backend */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-orange-500" /> Backend Engine
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BACKEND_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => updateConfig('backend', opt.id)}
                    className={`p-2 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                      config.backend === opt.id
                        ? 'bg-orange-50 border-orange-300 text-stone-900 font-semibold'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xs truncate">{opt.name}</span>
                    {config.backend === opt.id && <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Database */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-500" /> Database Choice
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DATABASE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => updateConfig('database', opt.id)}
                    className={`p-2 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                      config.database === opt.id
                        ? 'bg-amber-50 border-amber-300 text-stone-900 font-semibold'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xs truncate">{opt.name}</span>
                    {config.database === opt.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Features Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Feature Checkboxes
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { key: 'authentication', label: 'Auth' },
                { key: 'restApi', label: 'REST API' },
                { key: 'docker', label: 'Docker' },
                { key: 'darkMode', label: 'Dark Mode' },
                { key: 'responsiveDesign', label: 'Responsive' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center space-x-2 p-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 cursor-pointer hover:border-stone-300 transition"
                >
                  <input
                    type="checkbox"
                    checked={config.features[item.key]}
                    onChange={(e) => updateFeature(item.key, e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-stone-100 border-stone-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
