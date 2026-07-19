import axiosClient from '../api/axiosClient';
import { generateProjectFromPrompt } from './mockGenerator';

export async function dispatchGenerationRequest(config, onStepUpdate) {
  const steps = [
    { id: '1', title: 'Analyzing Prompt & Intent...', status: 'in-progress', detail: 'Parsing domain requirements and user constraints' },
    { id: '2', title: 'Understanding System Requirements...', status: 'pending', detail: 'Mapping frontend framework and backend API controllers' },
    { id: '3', title: 'Planning System Architecture...', status: 'pending', detail: 'Designing database models and service schemas' },
    { id: '4', title: 'Generating Directory & Folder Structure...', status: 'pending', detail: 'Creating modular source directories and config files' },
    { id: '5', title: 'Synthesizing UI Components...', status: 'pending', detail: 'Writing styled React components with Lucide icons' },
    { id: '6', title: 'Generating Backend Controllers & APIs...', status: 'pending', detail: 'Writing Express REST endpoints and CORS headers' },
    { id: '7', title: 'Configuring Database Schemas...', status: 'pending', detail: 'Creating connection scripts and query abstractions' },
    { id: '8', title: 'Generating Environment & Config Files...', status: 'pending', detail: 'Writing Dockerfile, package.json, and Vite settings' },
    { id: '9', title: 'Creating Documentation README...', status: 'pending', detail: 'Generating quick-start instructions and tech stack breakdown' },
    { id: '10', title: 'Preparing ZIP Package & Project Tree...', status: 'pending', detail: 'Finalizing downloadable archive package' }
  ];

  // Helper to step through progression with callback
  const runProgressSimulation = async () => {
    for (let i = 0; i < steps.length; i++) {
      steps[i].status = 'in-progress';
      if (onStepUpdate) onStepUpdate([...steps]);
      await new Promise((resolve) => setTimeout(resolve, 350));
      steps[i].status = 'completed';
      if (onStepUpdate) onStepUpdate([...steps]);
    }
  };

  if (config.useN8nWebhook && config.n8nWebhookUrl) {
    try {
      const progressPromise = runProgressSimulation();
      const apiPromise = axiosClient.post(config.n8nWebhookUrl, {
        prompt: config.prompt,
        frontend: config.frontend,
        language: config.language,
        styling: config.styling,
        backend: config.backend,
        database: config.database,
        features: config.features,
        requestedAt: new Date().toISOString()
      });

      const [_, response] = await Promise.all([progressPromise, apiPromise]);
      
      // If n8n returns a project payload, return it, else fall back to synthesized project
      if (response.data && response.data.folderStructure) {
        return response.data;
      }
    } catch (err) {
      console.warn('n8n Webhook connection failed or returned fallback, utilizing local synthesis engine:', err);
    }
  }

  // Fallback to dynamic synthesis engine
  await runProgressSimulation();
  return generateProjectFromPrompt(config);
}
