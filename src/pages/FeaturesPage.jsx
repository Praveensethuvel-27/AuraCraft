import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 text-stone-900 space-y-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <Badge variant="gradient" size="lg">AuraCraft Autonomous AI Engine</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900">
          Deep Dive into <span className="gradient-text">AI Synthesis</span>
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Learn how our language parser generates clean, production-ready React components, Node.js controllers, and schema files from simple prompt descriptions.
        </p>
      </div>

      {/* Feature Deep Dives */}
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Feature 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <Badge variant="peach">User Defined Architecture</Badge>
            <h2 className="text-3xl font-bold text-stone-900">Modular Clean Architecture</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Unlike generic code models that output single raw files, AuraCraft AI constructs real project setups separating UI components, API hooks, routes, database models, and environment configs according to your selected technology stack.
            </p>
            <ul className="space-y-2 text-xs text-stone-700 font-mono">
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-rose-500" /> Modular React / Next.js component separation</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-rose-500" /> Express REST routing & controller models</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-rose-500" /> Ready-to-build Dockerfile & package.json</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200 font-mono text-xs text-rose-900 space-y-2 shadow-xl">
            <div className="text-stone-400">// User-Defined Project Blueprint</div>
            <div>src/</div>
            <div className="pl-4">├── components/ (Navbar, AuthModal, DashboardCard)</div>
            <div className="pl-4">├── pages/ (Home, Settings, Dashboard)</div>
            <div className="pl-4">├── services/ (apiClient, authService)</div>
            <div className="pl-4">└── App.jsx</div>
            <div>server.js (Express Controllers & Database Schemas)</div>
            <div>Dockerfile & package.json</div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 p-6 rounded-3xl bg-white border border-rose-200 space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-stone-500 border-b border-rose-100 pb-3">
              <span>n8n Webhook Protocol</span>
              <span className="text-emerald-600 font-bold">Status 200 OK</span>
            </div>
            <pre className="text-xs text-stone-800 font-mono overflow-x-auto leading-relaxed">
{`POST /webhook/ai-generate-project
Headers: { Authorization: "Bearer n8n_sec_key" }
Payload: {
  prompt: "Hospital ERP with Doctor & Patient portals",
  frontend: "react",
  backend: "express",
  database: "mongodb"
}`}
            </pre>
          </div>
          <div className="space-y-4 order-1 lg:order-2">
            <Badge variant="emerald">Enterprise Integration</Badge>
            <h2 className="text-3xl font-bold text-stone-900">Configurable n8n & API Webhook Layer</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Connect AuraCraft AI to your own self-hosted or cloud n8n automation workflows. Pass custom prompts, trigger background LLM agents, and return rich project structures seamlessly.
            </p>
            <Link to="/docs">
              <Button variant="outline" size="sm" icon={ArrowRight}>
                Read n8n Webhook Docs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-orange-100 via-rose-100 to-pink-100 border border-rose-300 text-center space-y-6 shadow-xl">
        <h3 className="text-3xl font-extrabold text-stone-900">Ready to Generate Your Project?</h3>
        <p className="text-stone-700 text-sm max-w-xl mx-auto">
          Start building production-quality full-stack software in seconds with our AI engine.
        </p>
        <Link to="/dashboard">
          <Button variant="primary" size="xl" icon={Sparkles}>
            Launch Generator Studio
          </Button>
        </Link>
      </div>
    </div>
  );
}
