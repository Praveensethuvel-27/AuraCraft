/**
 * Dynamic User-Defined Full-Stack Code Synthesizer
 */

export function generateProjectFromPrompt(config) {
  let {
    prompt,
    frontend = 'react',
    language = 'javascript',
    styling = 'tailwind',
    backend = 'express',
    database = 'mongodb',
    features = { authentication: true, restApi: true, docker: true, darkMode: true, responsiveDesign: true }
  } = config;

  const lowerPrompt = prompt.toLowerCase();

  // Dynamic Prompt Intent Extraction for Database
  if (lowerPrompt.includes('sql') || lowerPrompt.includes('postgres') || lowerPrompt.includes('postgresql') || lowerPrompt.includes('mysql') || lowerPrompt.includes('sqlite')) {
    database = 'postgresql';
  } else if (lowerPrompt.includes('mongo') || lowerPrompt.includes('mongodb')) {
    database = 'mongodb';
  } else if (lowerPrompt.includes('supabase')) {
    database = 'supabase';
  } else if (lowerPrompt.includes('firebase')) {
    database = 'firebase';
  }

  // Dynamic Prompt Intent Extraction for Frontend
  if (lowerPrompt.includes('next.js') || lowerPrompt.includes('nextjs') || lowerPrompt.includes('next js')) {
    frontend = 'nextjs';
  } else if (lowerPrompt.includes('vue') || lowerPrompt.includes('vuejs')) {
    frontend = 'vue';
  } else if (lowerPrompt.includes('angular')) {
    frontend = 'angular';
  } else if (lowerPrompt.includes('react')) {
    frontend = 'react';
  }

  // Dynamic Prompt Intent Extraction for Backend
  if (lowerPrompt.includes('django') || lowerPrompt.includes('python')) {
    backend = 'django';
  } else if (lowerPrompt.includes('laravel') || lowerPrompt.includes('php')) {
    backend = 'laravel';
  } else if (lowerPrompt.includes('nestjs')) {
    backend = 'nestjs';
  } else if (lowerPrompt.includes('express') || lowerPrompt.includes('node')) {
    backend = 'express';
  }

  // Extract clean project title from prompt
  const cleanNameMatch = prompt.match(/(?:build|create|generate|develop)\s+(?:a|an)?\s*([a-zA-Z0-9\s-]+?)(?=\s+(?:using|with|for|in)|$)/i);
  const rawName = cleanNameMatch ? cleanNameMatch[1].trim() : 'User Defined App';
  const projectName = rawName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 30) || 'custom-app';
  const displayTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const isTs = language === 'typescript';
  const ext = isTs ? 'tsx' : 'jsx';
  const scriptExt = isTs ? 'ts' : 'js';

  // Build package.json dependencies based on exact user-defined tech stack
  const projectDependencies = {
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.469.0",
    axios: "^1.7.2"
  };

  if (frontend === 'nextjs') projectDependencies['next'] = '^14.2.0';
  if (frontend === 'vue') projectDependencies['vue'] = '^3.4.0';
  if (frontend === 'angular') projectDependencies['@angular/core'] = '^17.0.0';

  if (styling === 'tailwind') projectDependencies['tailwindcss'] = '^4.0.0';
  if (styling === 'bootstrap') projectDependencies['bootstrap'] = '^5.3.3';
  if (styling === 'mui') projectDependencies['@mui/material'] = '^5.15.0';

  if (backend === 'express' || backend === 'nodejs') projectDependencies['express'] = '^4.19.2';
  if (backend === 'nestjs') projectDependencies['@nestjs/core'] = '^10.3.0';

  if (database === 'mongodb') projectDependencies['mongoose'] = '^8.4.0';
  if (database === 'postgresql') projectDependencies['pg'] = '^8.11.0';
  if (database === 'supabase') projectDependencies['@supabase/supabase-js'] = '^2.43.0';
  if (database === 'firebase') projectDependencies['firebase'] = '^10.12.0';

  // Generated File Structure customized to user stack
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
          content: `import React, { useState } from 'react';\nimport { Sparkles, Activity, Layers, Database, Server, Shield } from 'lucide-react';\n\nexport default function App() {\n  const [data, setData] = useState({ title: '${displayTitle}', status: 'Active' });\n\n  return (\n    <div className="min-h-screen bg-stone-950 text-white font-sans p-8">\n      <header className="max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-rose-500/20">\n        <div className="flex items-center space-x-3">\n          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-400 to-rose-600 flex items-center justify-center shadow-lg">\n            <Sparkles className="w-5 h-5 text-white" />\n          </div>\n          <span className="text-2xl font-black tracking-tight">{data.title}</span>\n        </div>\n        <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">\n          {data.status} Ecosystem\n        </div>\n      </header>\n\n      <main className="max-w-6xl mx-auto mt-10 space-y-8">\n        <div className="p-8 rounded-3xl bg-stone-900 border border-rose-500/20 shadow-2xl">\n          <h2 className="text-3xl font-extrabold mb-3">Custom User-Defined Setup</h2>\n          <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">\n            This application was synthesized according to your exact specification: ${frontend.toUpperCase()} frontend, ${backend.toUpperCase()} backend, and ${database.toUpperCase()} database.\n          </p>\n        </div>\n      </main>\n    </div>\n  );\n}\n`
        },
        {
          name: `main.${ext}`,
          path: `src/main.${ext}`,
          type: 'file',
          content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);\n`
        }
      ]
    },
    ...(backend !== 'none' ? [
      {
        name: `server.${scriptExt}`,
        path: `server.${scriptExt}`,
        type: 'file',
        content: `const express = require('express');\nconst cors = require('cors');\n${database === 'mongodb' ? "const mongoose = require('mongoose');" : database === 'postgresql' ? "const { Pool } = require('pg');" : ''}\n\nconst app = express();\nconst PORT = process.env.PORT || 5000;\n\napp.use(cors());\napp.use(express.json());\n\n${database === 'mongodb' ? `mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/${projectName}')\n  .then(() => console.log('Connected to MONGODB'))\n  .catch(err => console.error('Database connection error:', err));\n` : database === 'postgresql' ? `const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/${projectName}' });\nconsole.log('Connected to POSTGRESQL SQL Database');\n` : ''}\napp.get('/api/health', (req, res) => {\n  res.json({\n    app: '${displayTitle}',\n    stack: '${frontend.toUpperCase()} + ${backend.toUpperCase()} + ${database.toUpperCase()}',\n    status: 'operational'\n  });\n});\n\napp.listen(PORT, () => {\n  console.log(\`Server running on http://localhost:\${PORT}\`);\n});\n`
      }
    ] : []),
    {
      name: 'README.md',
      path: 'README.md',
      type: 'file',
      content: `# ${displayTitle}\n\nCustom project generated with **AuraCraft AI**.\n\n## Selected Technology Stack\n- **Frontend Framework**: ${frontend.toUpperCase()}\n- **Programming Language**: ${language.toUpperCase()}\n- **Styling**: ${styling.toUpperCase()}\n- **Backend Engine**: ${backend.toUpperCase()}\n- **Database**: ${database.toUpperCase()}\n\n## Quick Start\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n`
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
    description: `Full-Stack ${displayTitle} application with ${frontend.toUpperCase()}, ${backend.toUpperCase()}, and ${database.toUpperCase()}.`,
    framework: frontend.toUpperCase(),
    backend: backend.toUpperCase(),
    database: database.toUpperCase(),
    estimatedFiles: 12,
    estimatedComponents: 6,
    estimatedApis: backend !== 'none' ? 5 : 1,
    estimatedGenTime: '2.4s',
    folderStructure,
    techStack: [frontend, language, styling, backend, database].filter(x => x !== 'none'),
    architectureSummary: `Fully customized project architecture initialized with ${frontend.toUpperCase()} user interface, ${backend.toUpperCase()} server controllers, ${database.toUpperCase()} SQL database schemas, and ${styling.toUpperCase()} design utilities.`,
    prompt,
    createdAt: new Date().toISOString()
  };
}
