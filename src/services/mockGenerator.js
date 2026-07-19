/**
 * Frontend UI Application Scaffold Synthesizer
 */

export function generateProjectFromPrompt(config) {
  let {
    prompt,
    frontend = 'react',
    language = 'javascript',
    styling = 'tailwind'
  } = config;

  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('next.js') || lowerPrompt.includes('nextjs') || lowerPrompt.includes('next js')) {
    frontend = 'nextjs';
  } else if (lowerPrompt.includes('vue') || lowerPrompt.includes('vuejs')) {
    frontend = 'vue';
  } else if (lowerPrompt.includes('react')) {
    frontend = 'react';
  }

  // Extract clean project title from prompt
  const cleanNameMatch = prompt.match(/(?:build|create|generate|develop)\s+(?:a|an)?\s*([a-zA-Z0-9\s-]+?)(?=\s+(?:using|with|for|in)|$)/i);
  const rawName = cleanNameMatch ? cleanNameMatch[1].trim() : 'User Defined App';
  const projectName = rawName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 30) || 'custom-app';
  const displayTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const isTs = language === 'typescript';
  const ext = isTs ? 'tsx' : 'jsx';

  // Build package.json dependencies for frontend React testing
  const projectDependencies = {
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.469.0",
    axios: "^1.7.2",
    tailwindcss: "^4.0.0"
  };

  const folderStructure = [
    {
      name: 'src',
      path: 'src',
      type: 'folder',
      children: [
        {
          name: `App.${ext}`,
          path: `src/App.${ext}`,
          type: 'file',
          content: `import React, { useState } from 'react';\nimport { Sparkles, Layout, Palette } from 'lucide-react';\n\nexport default function App() {\n  const [data] = useState({ title: '${displayTitle}', status: 'Frontend Prototype' });\n\n  return (\n    <div className="min-h-screen bg-stone-950 text-white font-sans p-8">\n      <header className="max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-rose-500/20">\n        <div className="flex items-center space-x-3">\n          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-400 to-rose-600 flex items-center justify-center shadow-lg">\n            <Sparkles className="w-5 h-5 text-white" />\n          </div>\n          <span className="text-2xl font-black tracking-tight">{data.title}</span>\n        </div>\n        <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">\n          {data.status}\n        </div>\n      </header>\n\n      <main className="max-w-6xl mx-auto mt-10 space-y-8">\n        <div className="p-8 rounded-3xl bg-stone-900 border border-rose-500/20 shadow-2xl">\n          <h2 className="text-3xl font-extrabold mb-3">Frontend React Application Prototype</h2>\n          <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">\n            Frontend component scaffold synthesized for ${displayTitle}. Ready for local testing & styling.\n          </p>\n        </div>\n      </main>\n    </div>\n  );\n}\n`
        },
        {
          name: `main.${ext}`,
          path: `src/main.${ext}`,
          type: 'file',
          content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);\n`
        }
      ]
    },
    {
      name: 'README.md',
      path: 'README.md',
      type: 'file',
      content: `# ${displayTitle}\n\nFrontend prototype scaffold generated with **AuraCraft AI**.\n\n## Quick Start\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n`
    },
    {
      name: 'package.json',
      path: 'package.json',
      type: 'file',
      content: JSON.stringify({
        name: projectName,
        private: true,
        version: "1.0.0",
        type: "module",
        scripts: {
          dev: "vite",
          build: "vite build",
          preview: "vite preview"
        },
        dependencies: projectDependencies,
        devDependencies: {
          "@vitejs/plugin-react": "^4.3.1",
          vite: "^5.3.1"
        }
      }, null, 2)
    }
  ];

  return {
    id: 'proj_' + Math.random().toString(36).substring(2, 9),
    name: displayTitle,
    description: `Frontend UI React Application scaffold for ${displayTitle}.`,
    framework: frontend.toUpperCase(),
    backend: 'FRONTEND ONLY',
    database: 'FRONTEND ONLY',
    estimatedFiles: 6,
    estimatedComponents: 4,
    estimatedApis: 0,
    estimatedGenTime: '1.8s',
    folderStructure,
    techStack: [frontend, language, styling],
    architectureSummary: `Client-side React UI component architecture initialized with Tailwind CSS styling and Vite build setup for preview & testing.`,
    prompt,
    createdAt: new Date().toISOString()
  };
}
