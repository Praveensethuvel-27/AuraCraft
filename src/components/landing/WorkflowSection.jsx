import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Cpu, Layers, FolderTree, Code2, Download } from 'lucide-react';

export function WorkflowSection() {
  const steps = [
    {
      num: '01',
      title: 'User Prompt Input',
      description: 'Describe your vision, requirements, role access, and preferred tech stack in natural language.',
      icon: MessageSquare,
      color: 'border-orange-300 text-orange-600'
    },
    {
      num: '02',
      title: 'AI Intent Analysis',
      description: 'Deep neural parser extracts entities, API boundaries, database relationships, and component trees.',
      icon: Cpu,
      color: 'border-rose-300 text-rose-600'
    },
    {
      num: '03',
      title: 'Architecture Planning',
      description: 'Generates system schema, routing rules, middleware pipeline, and data access objects.',
      icon: Layers,
      color: 'border-pink-300 text-pink-600'
    },
    {
      num: '04',
      title: 'Setup Synthesis',
      description: 'Creates modular project configurations separating components, services, routes, and configs.',
      icon: FolderTree,
      color: 'border-amber-300 text-amber-600'
    },
    {
      num: '05',
      title: 'Source Code Synthesis',
      description: 'Synthesizes functional React UI code, Express REST endpoints, and database models.',
      icon: Code2,
      color: 'border-emerald-300 text-emerald-600'
    },
    {
      num: '06',
      title: 'ZIP Export & Deploy',
      description: 'Download your ready-to-run `.zip` project or deploy straight to edge servers with 1 click.',
      icon: Download,
      color: 'border-rose-300 text-rose-600'
    }
  ];

  return (
    <section className="py-24 relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-600">Autonomous Workflow</h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            From Prompt to <span className="gradient-text">Full Application</span>
          </p>
          <p className="text-stone-600 text-base sm:text-lg">
            See how AuraCraft AI processes your input through our synthesis pipeline.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-3xl bg-white border border-rose-200/80 p-6 shadow-lg shadow-rose-500/5 hover:border-rose-300 transition group"
              >
                {/* Step Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${step.color} bg-rose-50/50`}>
                    STEP {step.num}
                  </span>
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 group-hover:scale-110 transition duration-300">
                    <Icon className="w-5 h-5 text-rose-600" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-rose-600 transition">
                  {step.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
