import React, { createContext, useContext, useState } from 'react';
import { PRESET_PROMPTS } from '../constants/presets';
import { dispatchGenerationRequest } from '../services/n8nService';
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
    n8nWebhookUrl: 'https://n8n.your-domain.com/webhook/ai-generate-project',
    useN8nWebhook: false,
  });

  const [isGenerating, setIsGenerating] = useState(false);
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

  const updateFeature = (featureKey, value) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [featureKey]: value,
      },
    }));
  };

  const startGeneration = async () => {
    if (!config.prompt.trim()) {
      addToast('Please enter a prompt describing your project concept.', 'warning');
      return;
    }

    setIsGenerating(true);
    setCurrentProject(null);
    setGenerationSteps([]);

    try {
      const generatedProject = await dispatchGenerationRequest(config, (steps) => {
        setGenerationSteps(steps);
      });

      setCurrentProject(generatedProject);
      addToast('Project generated successfully!', 'success');
    } catch (err) {
      console.error('Generation failed:', err);
      addToast('Failed to generate project. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGenerator = () => {
    setCurrentProject(null);
    setGenerationSteps([]);
  };

  return (
    <GeneratorContext.Provider
      value={{
        config,
        updateConfig,
        updateFeature,
        applyPreset,
        isGenerating,
        generationSteps,
        currentProject,
        startGeneration,
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
