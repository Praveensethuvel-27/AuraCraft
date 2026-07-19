import axios from 'axios';
import { generateProjectFromPrompt } from './mockGenerator';

const WEBHOOK_URL = 'https://praveen-10.app.n8n.cloud/webhook/ai-project-generator';

export async function dispatchGenerationRequest(config, onStepUpdate) {
  const steps = [
    { id: '1', title: 'Connecting to AI Agent 1 (Planner)...', status: 'in-progress', detail: 'Parsing requirements and system specifications' },
    { id: '2', title: 'Running AI Agent 2 (System Architect)...', status: 'pending', detail: 'Designing database models & API controllers' },
    { id: '3', title: 'Running AI Agent 3 (Code Generator)...', status: 'pending', detail: 'Synthesizing React components & Express server' },
    { id: '4', title: 'Bundling Full-Stack Project into ZIP...', status: 'pending', detail: 'Packaging source files, configs, and package.json' },
    { id: '5', title: 'Transmitting Binary ZIP Archive...', status: 'pending', detail: 'Finalizing automatic browser download' }
  ];

  let currentStepIdx = 0;
  if (onStepUpdate) onStepUpdate([...steps]);

  // Interval timer to update step UI while waiting 30-60s for 3 AI agents to complete
  const stepTimer = setInterval(() => {
    if (currentStepIdx < steps.length - 1) {
      steps[currentStepIdx].status = 'completed';
      currentStepIdx++;
      steps[currentStepIdx].status = 'in-progress';
      if (onStepUpdate) onStepUpdate([...steps]);
    }
  }, 8000);

  try {
    // Send POST request with JSON payload to n8n cloud webhook
    const response = await axios.post(
      WEBHOOK_URL,
      { prompt: config.prompt },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'blob',
        timeout: 300000 // 5 minutes timeout for multi-agent synthesis
      }
    );

    clearInterval(stepTimer);
    steps.forEach((s) => (s.status = 'completed'));
    if (onStepUpdate) onStepUpdate([...steps]);

    // 1. Convert response to a Blob
    const blob = new Blob([response.data], { type: 'application/zip' });

    // 2. Create downloadable link & automatically trigger download as "generated-project.zip"
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'generated-project.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000);

    // Return synthesized project object for completion UI
    return generateProjectFromPrompt(config);
  } catch (err) {
    clearInterval(stepTimer);
    steps[currentStepIdx].status = 'pending';
    if (onStepUpdate) onStepUpdate([...steps]);

    console.error('Failed to generate project via n8n webhook:', err);
    throw new Error(
      err.response?.data?.message ||
      err.message ||
      'Failed to connect to n8n AI webhook. Please check your network connection and try again.'
    );
  }
}
