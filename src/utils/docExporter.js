export function downloadPlatformDocumentation() {
  const docContent = `# AuraCraft AI — Official Platform Documentation

## Overview
AuraCraft AI is an autonomous full-stack software synthesis platform comparable to Lovable.dev, Bolt.new, Cursor, Vercel, and v0.dev.

## Key Features
1. **User-Defined Technology Stack Generator**: Support for React, Next.js, Vue, Angular, Express, Node.js, NestJS, Django, Laravel, MongoDB, PostgreSQL, Supabase, MySQL, Firebase.
2. **ChatGPT / v0 Style Prompt Input**: Sticky bottom chat prompt bar with AI Prompt Enhancer and custom stack tags.
3. **Instant .ZIP Project Export**: Generates ready-to-run full-stack starter packages containing package.json, server routes, database schemas, and README files.
4. **n8n Webhook Ready**: Configurable n8n Webhook endpoint dispatcher for background AI workflow automation.

## Quick Start Guide
\`\`\`bash
# Install project dependencies
npm install

# Launch development server
npm run dev
\`\`\`

## n8n Webhook Request Schema
\`\`\`json
{
  "prompt": "Build a Hospital Management System",
  "frontend": "react",
  "language": "javascript",
  "styling": "tailwind",
  "backend": "express",
  "database": "mongodb"
}
\`\`\`

© 2026 AuraCraft AI Inc. All rights reserved.
`;

  const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'AuraCraft_AI_Platform_Documentation.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
