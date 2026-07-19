import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, FolderTree, Layout, Server, Database, ShieldCheck, Zap, Download, Sliders, Layers } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Card';

export function FeatureSection() {
  const features = [
    {
      icon: Cpu,
      title: 'AI Architecture Planning',
      description: 'Intelligent prompt parser analyzes entity relations, routing models, and API constraints before writing code.',
      color: 'from-orange-400 to-rose-500'
    },
    {
      icon: FolderTree,
      title: 'User-Defined Project Generator',
      description: 'Produces enterprise-ready project setups adhering to standard clean architecture patterns across frontend and backend layers.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Layout,
      title: 'Frontend Generator',
      description: 'Synthesizes clean React, Vue, or Next.js UI components styled with Tailwind CSS, micro-animations, and responsive layouts.',
      color: 'from-amber-400 to-orange-500'
    },
    {
      icon: Server,
      title: 'Backend Generator',
      description: 'Generates robust Express, Node.js, NestJS, or Django REST APIs with CORS, error middleware, and modular controllers.',
      color: 'from-rose-600 to-red-500'
    },
    {
      icon: Database,
      title: 'Database Schema Generator',
      description: 'Outputs MongoDB Mongoose schemas, PostgreSQL SQL tables, or Supabase client abstractions dynamically.',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      icon: ShieldCheck,
      title: 'Authentication Generator',
      description: 'Pre-configures JWT, OAuth, or session-based login modals, protected routes, and user role validation out of the box.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: Zap,
      title: 'API Endpoint Synthesizer',
      description: 'Automatic endpoint mapping for CRUD actions, dashboard statistics feeds, and mock JSON response generators.',
      color: 'from-rose-400 to-orange-400'
    },
    {
      icon: Download,
      title: 'Instant `.ZIP` Export',
      description: 'Package your generated application into a ready-to-run `.zip` file with one click directly in your browser.',
      color: 'from-emerald-400 to-green-600'
    },
    {
      icon: Sliders,
      title: 'n8n Automation Ready',
      description: 'Easily hook up the frontend API client to custom n8n webhook workflows for advanced AI agent execution.',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Layers,
      title: 'Modern UI Primitives',
      description: 'Equipped with reusable components, peach theme tokens, modals, code viewers, and toast notifications.',
      color: 'from-rose-500 to-orange-500'
    }
  ];

  return (
    <section className="py-24 relative bg-rose-50/40 border-y border-rose-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-600">Production Capabilities</h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Engineered for <span className="gradient-text">Full-Stack Excellence</span>
          </p>
          <p className="text-stone-600 text-base sm:text-lg">
            Everything you need to transform plain text ideas into complete, deployable software applications in seconds.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="rounded-3xl bg-white border border-rose-200/80 p-6 shadow-lg shadow-rose-500/5 hover:border-rose-300 hover:-translate-y-1 transition duration-300 h-full group">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 shadow-md mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-rose-500" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-rose-600 transition">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
