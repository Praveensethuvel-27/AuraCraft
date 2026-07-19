export type FrontendOption = 'react' | 'angular' | 'vue' | 'nextjs'
export type LanguageOption = 'javascript' | 'typescript'
export type StylingOption = 'tailwind' | 'bootstrap' | 'mui'
export type BackendOption = 'none' | 'nodejs' | 'express' | 'nestjs' | 'laravel' | 'django'
export type DatabaseOption = 'none' | 'mongodb' | 'postgresql' | 'mysql' | 'firebase' | 'supabase'

export interface GeneratorFeatures {
  authentication: boolean
  restApi: boolean
  docker: boolean
  darkMode: boolean
  responsiveDesign: boolean
}

export interface GeneratorConfig {
  prompt: string
  frontend: FrontendOption
  language: LanguageOption
  styling: StylingOption
  backend: BackendOption
  database: DatabaseOption
  features: GeneratorFeatures
  n8nWebhookUrl?: string
  useN8nWebhook: boolean
}

export interface FileNode {
  name: string
  path: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
}

export interface GeneratedProject {
  id: string
  name: string
  description: string
  framework: string
  backend: string
  database: string
  estimatedFiles: number
  estimatedComponents: number
  estimatedApis: number
  estimatedGenTime: string
  folderStructure: FileNode[]
  techStack: string[]
  architectureSummary: string
  prompt: string
  createdAt: string
}

export interface GenerationStep {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'completed' | 'error'
  detail?: string
}

export interface PresetPrompt {
  id: string
  title: string
  category: string
  description: string
  promptText: string
  frontend: FrontendOption
  backend: BackendOption
  database: DatabaseOption
  styling: StylingOption
}
