export const PRESET_PROMPTS = [
  {
    id: 'hospital-mgmt',
    title: 'Hospital Management System',
    category: 'Healthcare & Enterprise',
    description: 'Complete hospital ERP with Admin, Doctor, and Patient dashboards, appointment scheduling, and EHR records.',
    promptText: 'Build a Hospital Management System using React, Node.js, Express, MongoDB and Tailwind CSS with Admin, Doctor and Patient Login, appointment scheduling, medical record management, and billing system.',
    frontend: 'react',
    language: 'javascript',
    styling: 'tailwind',
    backend: 'express',
    database: 'mongodb',
    features: { authentication: true, restApi: true, docker: true, darkMode: true, responsiveDesign: true }
  },
  {
    id: 'saas-analytics',
    title: 'SaaS AI Analytics Platform',
    category: 'SaaS & AI',
    description: 'Modern AI-driven analytics dashboard with real-time charts, user management, API keys, and subscription billing.',
    promptText: 'Create a Next.js and PostgreSQL SaaS Analytics Dashboard with dark mode, OpenAI API integration, Chart.js metrics, user auth, team workspaces, and Stripe subscription billing.',
    frontend: 'nextjs',
    language: 'javascript',
    styling: 'tailwind',
    backend: 'nodejs',
    database: 'postgresql',
    features: { authentication: true, restApi: true, docker: true, darkMode: true, responsiveDesign: true }
  },
  {
    id: 'ecommerce-marketplace',
    title: 'Multi-Vendor E-Commerce Store',
    category: 'E-Commerce',
    description: 'High-performance online store with product catalog, shopping cart, vendor portal, and payment checkout.',
    promptText: 'Build a full-stack E-Commerce Store using React, Express, Supabase, and Tailwind CSS featuring product filtering, cart management, vendor admin dashboard, and Stripe checkout.',
    frontend: 'react',
    language: 'javascript',
    styling: 'tailwind',
    backend: 'express',
    database: 'supabase',
    features: { authentication: true, restApi: true, docker: false, darkMode: true, responsiveDesign: true }
  },
  {
    id: 'ai-chat-assistant',
    title: 'AI Coding Assistant App',
    category: 'AI Tools',
    description: 'ChatGPT/Claude style web application with conversation history, code highlighting, and streaming responses.',
    promptText: 'Develop an AI Chat & Code Assistant platform using Vue 3, Express, MongoDB, and Tailwind CSS with streamed markdown code blocks, multi-agent workspaces, and token consumption analytics.',
    frontend: 'vue',
    language: 'javascript',
    styling: 'tailwind',
    backend: 'express',
    database: 'mongodb',
    features: { authentication: true, restApi: true, docker: true, darkMode: true, responsiveDesign: true }
  }
];

export const FRONTEND_OPTIONS = [
  { id: 'react', name: 'React (Vite)', icon: 'Atom', badge: 'Popular' },
  { id: 'nextjs', name: 'Next.js', icon: 'Zap', badge: 'SSR' },
  { id: 'vue', name: 'Vue 3', icon: 'Box', badge: 'Fast' },
  { id: 'angular', name: 'Angular', icon: 'Shield', badge: 'Enterprise' }
];

export const LANGUAGE_OPTIONS = [
  { id: 'javascript', name: 'JavaScript (ES6+)', icon: 'FileCode', badge: 'Default' },
  { id: 'typescript', name: 'TypeScript', icon: 'Code2', badge: 'Strict' }
];

export const STYLING_OPTIONS = [
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'Palette', badge: 'Recommended' },
  { id: 'bootstrap', name: 'Bootstrap 5', icon: 'Grid', badge: 'Classic' },
  { id: 'mui', name: 'Material UI', icon: 'Layers', badge: 'Components' }
];

export const BACKEND_OPTIONS = [
  { id: 'express', name: 'Express / Node.js', icon: 'Server', badge: 'Full-Stack' },
  { id: 'nodejs', name: 'Node.js (Raw)', icon: 'Cpu', badge: 'Lean' },
  { id: 'nestjs', name: 'NestJS', icon: 'Cpu', badge: 'Enterprise' },
  { id: 'django', name: 'Python Django', icon: 'Terminal', badge: 'Python' },
  { id: 'laravel', name: 'PHP Laravel', icon: 'Globe', badge: 'MVC' },
  { id: 'none', name: 'None (Frontend Only)', icon: 'MinusCircle', badge: 'Client' }
];

export const DATABASE_OPTIONS = [
  { id: 'mongodb', name: 'MongoDB', icon: 'Database', badge: 'NoSQL' },
  { id: 'postgresql', name: 'PostgreSQL', icon: 'Database', badge: 'SQL' },
  { id: 'supabase', name: 'Supabase', icon: 'Cloud', badge: 'BaaS' },
  { id: 'mysql', name: 'MySQL', icon: 'Database', badge: 'SQL' },
  { id: 'firebase', name: 'Firebase', icon: 'Flame', badge: 'Realtime' },
  { id: 'none', name: 'None (In-Memory)', icon: 'MinusCircle', badge: 'Static' }
];
