import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Disc as Discord, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-rose-200/60 bg-white pt-16 pb-12 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-rose-200/60">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-400 to-rose-600 flex items-center justify-center shadow-md shadow-rose-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900 tracking-tight">AuraCraft AI</span>
          </Link>
          <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
            Production-quality AI project synthesis engine built for modern full-stack engineers, startups, and enterprise teams.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a href="#github" className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-stone-600 hover:text-stone-900 transition border border-rose-200/60">
              <Github className="w-4 h-4" />
            </a>
            <a href="#twitter" className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-stone-600 hover:text-stone-900 transition border border-rose-200/60">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#discord" className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-stone-600 hover:text-stone-900 transition border border-rose-200/60">
              <Discord className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Platform */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dashboard" className="hover:text-rose-600 transition">AI Generator</Link></li>
            <li><Link to="/features" className="hover:text-rose-600 transition">Features Engine</Link></li>
            <li><Link to="/pricing" className="hover:text-rose-600 transition">Pricing Plans</Link></li>
            <li><Link to="/docs" className="hover:text-rose-600 transition">Documentation</Link></li>
          </ul>
        </div>

        {/* Column 3: Integrations */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Integrations</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/docs" className="hover:text-rose-600 transition">n8n Webhook Setup</Link></li>
            <li><Link to="/docs" className="hover:text-rose-600 transition">REST API Webhooks</Link></li>
            <li><Link to="/docs" className="hover:text-rose-600 transition">Docker Exports</Link></li>
            <li><Link to="/docs" className="hover:text-rose-600 transition">ZIP Importer</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal & Company */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-rose-600 transition">About AuraCraft</Link></li>
            <li><Link to="/contact" className="hover:text-rose-600 transition">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-rose-600 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-rose-600 transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 space-y-4 md:space-y-0">
        <div>© 2026 AuraCraft AI Inc. All rights reserved.</div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-stone-600">All AI Synthesis Nodes Operational</span>
        </div>
      </div>
    </footer>
  );
}
