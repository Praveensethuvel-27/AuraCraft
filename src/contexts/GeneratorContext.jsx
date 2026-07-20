import React, { createContext, useContext, useState } from 'react';
import { PRESET_PROMPTS } from '../constants/presets';
import { analyzeProjectPrompt, generateProjectWithStack } from '../services/n8nService';
import { useToast } from './ToastContext';

const GeneratorContext = createContext(null);

export function GeneratorProvider({ children }) {
  const { addToast } = useToast();

  const [config, setConfig] = useState({
    prompt: PRESET_PROMPTS[0].promptText,
    frontend: 'react',
    language: 'javascript',
    styling: 'tailwind',
    backend: 'express',
    database: 'mongodb',
    features: {
      authentication: true,
      restApi: true,
      docker: true,
      darkMode: true,
      responsiveDesign: true,
    },
  });

  // 2-Step Generation State: 'idle' | 'analyzing' | 'selecting_stack' | 'generating' | 'completed'
  const [generationState, setGenerationState] = useState('idle');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedStack, setSelectedStack] = useState(null);
  const [generationSteps, setGenerationSteps] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const applyPreset = (preset) => {
    setConfig((prev) => ({
      ...prev,
      prompt: preset.promptText,
      frontend: preset.frontend,
      backend: preset.backend,
      database: preset.database,
      styling: preset.styling,
      features: preset.features || prev.features,
    }));
    addToast(`Preset applied: ${preset.title}`, 'info');
  };

  const updateConfig = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * STEP 1: Analyze prompt & fetch 3 stack options
   */
  const startAnalysis = async () => {
    if (!config.prompt.trim()) {
      addToast('Please enter a prompt describing your project concept.', 'warning');
      return;
    }

    setGenerationState('analyzing');
    setAnalysisResult(null);
    setSelectedStack(null);
    setCurrentProject(null);
    setGenerationSteps([]);

    try {
      const result = await analyzeProjectPrompt(config, (steps) => {
        setGenerationSteps(steps);
      });

      setAnalysisResult(result);
      setGenerationState('selecting_stack');
      addToast('Analysis complete! Select an architecture stack below.', 'success');
    } catch (err) {
      console.error('Analysis failed:', err);
      setGenerationState('idle');
      addToast(err.message || 'Failed to analyze project. Please try again.', 'error');
    }
  };

  /**
   * STEP 2: Confirm chosen stack & generate code ZIP
   */
  const confirmAndGenerate = async (stackOption) => {
    if (!analysisResult) return;

    setSelectedStack(stackOption);
    setGenerationState('generating');
    setGenerationSteps([]);

    try {
      const project = await generateProjectWithStack(analysisResult, stackOption, (steps) => {
        setGenerationSteps(steps);
      });

      setCurrentProject(project);
      setGenerationState('completed');
      addToast('Full-stack project generated & downloaded successfully!', 'success');
    } catch (err) {
      console.error('Generation failed:', err);
      setGenerationState('selecting_stack');
      addToast(err.message || 'Failed to generate project. Please try again.', 'error');
    }
  };

  const resetGenerator = () => {
    setGenerationState('idle');
    setAnalysisResult(null);
    setSelectedStack(null);
    setCurrentProject(null);
    setGenerationSteps([]);
  };

  const isGenerating = generationState === 'analyzing' || generationState === 'generating';

  return (
    <GeneratorContext.Provider
      value={{
        config,
        updateConfig,
        applyPreset,
        generationState,
        setGenerationState,
        analysisResult,
        selectedStack,
        isGenerating,
        generationSteps,
        currentProject,
        startAnalysis,
        confirmAndGenerate,
        resetGenerator,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isWebhookModalOpen,
        setIsWebhookModalOpen,
        isDeployModalOpen,
        setIsDeployModalOpen,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
}

export function useGenerator() {
  const context = useContext(GeneratorContext);
  if (!context) throw new Error('useGenerator must be used within GeneratorProvider');
  return context;
}
