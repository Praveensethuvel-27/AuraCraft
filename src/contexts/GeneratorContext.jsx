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

  // 2-Step Generation State: 'idle' | 'analyzing' | 'selecting_stack' | 'generating' | 'completed' | 'error'
  const [generationState, setGenerationState] = useState('idle');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedStack, setSelectedStack] = useState(null);
  const [generationSteps, setGenerationSteps] = useState([]);
  const [generationProgress, setGenerationProgress] = useState(null);
  const [generationError, setGenerationError] = useState(null);
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
    setGenerationProgress(null);
    setGenerationError(null);

    try {
      const result = await analyzeProjectPrompt(config, (steps) => {
        setGenerationSteps(steps);
      });

      setAnalysisResult(result);

      if (result.stackAutoSelected && result.stackOptions && result.stackOptions.length > 0) {
        const autoStack = result.stackOptions[0];
        setSelectedStack(autoStack);
        addToast('Stack auto-selected! Proceeding to project generation...', 'info');
        await confirmAndGenerate(autoStack, result);
      } else {
        setGenerationState('selecting_stack');
        addToast('Analysis complete! Select an architecture stack below.', 'success');
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      setGenerationState('idle');
      addToast(err.message || 'Failed to analyze project. Please try again.', 'error');
    }
  };

  /**
   * STEP 2: Confirm chosen stack & generate code ZIP
   */
  const confirmAndGenerate = async (stackOption, overrideAnalysisResult = null) => {
    const currentAnalysis = overrideAnalysisResult || analysisResult;
    if (!currentAnalysis) return;

    setSelectedStack(stackOption);
    setGenerationState('generating');
    setGenerationProgress(null);
    setGenerationError(null);

    try {
      const project = await generateProjectWithStack(currentAnalysis, stackOption, (progressInfo) => {
        setGenerationProgress(progressInfo);
      });

      setCurrentProject(project);
      setGenerationState('completed');
      addToast('Full-stack project generated successfully!', 'success');
    } catch (err) {
      console.error('Generation failed:', err);
      setGenerationState('error');
      setGenerationError(err.message || 'Failed to generate project. Please try again.');
      addToast(err.message || 'Failed to generate project. Please try again.', 'error');
    }
  };

  const retryGeneration = () => {
    if (selectedStack) {
      confirmAndGenerate(selectedStack);
    }
  };

  const resetGenerator = () => {
    setGenerationState('idle');
    setAnalysisResult(null);
    setSelectedStack(null);
    setCurrentProject(null);
    setGenerationSteps([]);
    setGenerationProgress(null);
    setGenerationError(null);
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
        generationProgress,
        generationError,
        currentProject,
        startAnalysis,
        confirmAndGenerate,
        retryGeneration,
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
