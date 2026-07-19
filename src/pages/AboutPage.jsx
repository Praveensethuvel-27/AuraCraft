import React from 'react';
import { Sparkles, Cpu, Layers, Rocket, CheckCircle2, Shield, Heart } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 text-white space-y-16">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <Badge variant="gradient" size="lg">About AuraCraft AI</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Building the Future of <span className="gradient-text">AI Coding</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          AuraCraft AI was built to bridge the gap between human intent and full-stack software execution. Comparable to Lovable.dev, Bolt.new, Cursor, Vercel, Linear, and v0.dev.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/[0.08] space-y-3">
          <Cpu className="w-8 h-8 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Full-Stack Synthesis</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We don't just output raw code snippets. We generate entire application ecosystems complete with frontend components, backend REST controllers, database schemas, and `.zip` archives.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/[0.08] space-y-3">
          <Layers className="w-8 h-8 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Production Quality</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every file synthesized by AuraCraft adheres to enterprise clean architecture rules, modular imports, dark mode color tokens, and responsive UI layouts out of the box.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/[0.08] space-y-3">
          <Rocket className="w-8 h-8 text-pink-400" />
          <h3 className="text-lg font-bold text-white">Open Integrations</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Configurable n8n webhooks and custom API clients empower developers to connect their own self-hosted automation infrastructure without vendor lock-in.
          </p>
        </div>
      </div>
    </div>
  );
}
