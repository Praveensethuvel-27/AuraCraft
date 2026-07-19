import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, CheckCircle2, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PRESET_PROMPTS } from '../../constants/presets';
import { useGenerator } from '../../contexts/GeneratorContext';

export function HeroSection() {
  const navigate = useNavigate();
  const { applyPreset } = useGenerator();
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);

  const activePreset = PRESET_PROMPTS[selectedDemoIndex];

  const handleTryPreset = () => {
    applyPreset(activePreset);
    navigate('/dashboard');
  };

  return (
    <section className="relative pt-20 pb-20 overflow-hidden bg-grid-pattern bg-white">
      {/* Background Peach Glow Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-300/30 via-rose-300/30 to-pink-300/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-rose-200/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Feature Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <Badge variant="gradient" size="lg" pulse>
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Next-Gen Full-Stack AI Engine 2.0</span>
          </Badge>
        </motion.div>

        {/* Large Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.1] max-w-5xl mx-auto"
        >
          Generate <span className="gradient-text">Full-Stack Projects</span> with AI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed"
        >
          Describe your idea and let AI generate production-ready applications with complete user-defined tech stacks, clean code, backend APIs, and starter projects in minutes.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/dashboard">
            <Button variant="primary" size="xl" icon={Sparkles} className="w-full sm:w-auto">
              Generate Project
            </Button>
          </Link>
          <a href="#demo">
            <Button variant="secondary" size="xl" icon={Play} className="w-full sm:w-auto">
              View Interactive Demo
            </Button>
          </a>
        </motion.div>

        {/* Feature Checkpoints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-stone-600"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>React, Vue & Next.js Support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Express, Node & Django Backends</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Instant `.ZIP` Project Download</span>
          </div>
        </motion.div>

        {/* Interactive Demo Preview Card */}
        <motion.div
          id="demo"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto rounded-3xl bg-white border border-rose-200 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl text-left gradient-border"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono text-stone-400">auracraft-studio ~ interactive-prompt-demo</span>
            </div>
            <div className="flex items-center space-x-2">
              {PRESET_PROMPTS.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedDemoIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    selectedDemoIndex === idx
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-rose-50 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {preset.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Demo Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Left Prompt Display */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> Live Prompt Preset
              </div>
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 text-sm text-stone-800 font-mono leading-relaxed min-h-[110px]">
                "{activePreset.promptText}"
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="peach">{activePreset.frontend.toUpperCase()}</Badge>
                <Badge variant="emerald">{activePreset.backend.toUpperCase()}</Badge>
                <Badge variant="amber">{activePreset.database.toUpperCase()}</Badge>
                <Badge variant="primary">{activePreset.styling.toUpperCase()}</Badge>
              </div>
            </div>

            {/* Right Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-white to-orange-50 border border-rose-200 text-center space-y-4 shadow-sm">
              <div className="text-sm font-bold text-stone-900">Synthesize in 1-Click</div>
              <p className="text-xs text-stone-500">Generates ready-to-run React UI components, Express controllers, and database schemas.</p>
              <Button variant="primary" size="md" className="w-full" onClick={handleTryPreset} icon={ArrowRight}>
                Test This Preset
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
