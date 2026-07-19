import React, { useState } from 'react';
import { BookOpen, FileCode, Sliders, Terminal, Download } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { downloadPlatformDocumentation } from '../utils/docExporter';
import { useToast } from '../contexts/ToastContext';

export function DocsPage() {
  const [activeTab, setActiveTab] = useState('getting-started');
  const { addToast } = useToast();

  const handleDownload = () => {
    downloadPlatformDocumentation();
    addToast('Downloaded official platform documentation (.md)', 'success');
  };

  const tabs = [
    { id: 'getting-started', label: 'Getting Started Guide', icon: BookOpen },
    { id: 'n8n-webhook', label: 'n8n Webhook Setup', icon: Sliders },
    { id: 'api-schema', label: 'API & JSON Schemas', icon: FileCode },
    { id: 'export-zip', label: 'ZIP Exporter & Local Run', icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 text-stone-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-rose-200/80">
          <div className="space-y-2">
            <Badge variant="gradient" size="md">Developer Documentation Hub</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900">
              AuraCraft AI <span className="gradient-text">Developer Docs</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-2xl">
              Learn how to use the AI Generator Studio, configure n8n Webhook workflows, and customize exported starter projects.
            </p>
          </div>

          {/* Download Documentation Button */}
          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDownload}
              icon={Download}
            >
              Download Documentation
            </Button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-1.5 bg-rose-50/50 p-4 rounded-2xl border border-rose-200/80">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block px-3 py-1">
              Table of Contents
            </span>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-rose-700 shadow-md border border-rose-200 font-bold'
                      : 'text-stone-600 hover:bg-white/60 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 p-6 sm:p-8 rounded-3xl bg-white border border-rose-200/80 shadow-lg space-y-6">
            {activeTab === 'getting-started' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-stone-900">Getting Started with AuraCraft AI</h2>
                <p className="text-stone-600 text-sm leading-relaxed">
                  AuraCraft AI is an autonomous full-stack software synthesis platform designed to take natural language prompt descriptions and generate production-ready application starter kits.
                </p>
                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-semibold text-rose-600">1. Enter Your Project Concept</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Navigate to the Generator Dashboard (`/dashboard`), type your application concept into the bottom prompt bar.
                  </p>
                  <h3 className="text-base font-semibold text-rose-600">2. Select Your Stack Parameters</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Specify your preferred Frontend Framework (React, Vue, Next.js), Programming Language (JavaScript / TypeScript), Styling Engine (Tailwind CSS), Backend (Express, Node, Django), and Database (MongoDB, PostgreSQL, Supabase).
                  </p>
                  <h3 className="text-base font-semibold text-rose-600">3. Synthesize & Download `.ZIP`</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Click "Generate Project". Watch the live 10-step synthesis progress, then download the ready-to-run `.zip` package directly to your local computer.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'n8n-webhook' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-stone-900">n8n Webhook Integration Guide</h2>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Connect AuraCraft AI directly to your n8n automation workflow to perform complex background tasks, custom LLM routing, or database logging.
                </p>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                  <span className="text-xs font-bold text-rose-600">Step 1: Create an n8n Webhook Node</span>
                  <p className="text-xs text-stone-600">
                    In your n8n canvas, add a <strong>Webhook</strong> trigger node. Set the HTTP Method to <code>POST</code> and copy the generated Webhook URL.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                  <span className="text-xs font-bold text-rose-600">Step 2: Configure Endpoint in AuraCraft AI</span>
                  <p className="text-xs text-stone-600">
                    Open the Webhook Settings modal (via navbar or command palette Ctrl+K), paste your n8n Webhook URL, and toggle <strong>Live n8n Webhook Mode</strong> to ON.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'api-schema' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-stone-900">HTTP POST Webhook Request Schema</h2>
                <p className="text-stone-600 text-sm">
                  When n8n Webhook mode is enabled, AuraCraft dispatches the following JSON payload over HTTP POST:
                </p>
                <pre className="p-4 rounded-2xl bg-stone-900 text-rose-300 border border-stone-800 text-xs font-mono overflow-x-auto leading-relaxed shadow-inner">
{`{
  "prompt": "Build a Hospital Management System with Admin, Doctor, and Patient Login",
  "frontend": "react",
  "language": "javascript",
  "styling": "tailwind",
  "backend": "express",
  "database": "mongodb",
  "features": {
    "authentication": true,
    "restApi": true,
    "docker": true,
    "darkMode": true,
    "responsiveDesign": true
  },
  "requestedAt": "2026-07-19T22:00:00.000Z"
}`}
                </pre>
              </div>
            )}

            {activeTab === 'export-zip' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-stone-900">Running Exported ZIP Projects Locally</h2>
                <p className="text-stone-600 text-sm">
                  Once you download your generated `.zip` package, follow these quick steps to run it locally:
                </p>
                <pre className="p-4 rounded-2xl bg-stone-900 text-emerald-400 border border-stone-800 text-xs font-mono overflow-x-auto leading-relaxed shadow-inner">
{`# 1. Unzip the project folder
unzip hospital-management-system-starter.zip
cd hospital-management-system-starter

# 2. Install dependencies
npm install

# 3. Launch Vite development server
npm run dev`}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
