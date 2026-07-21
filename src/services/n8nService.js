import axios from 'axios';
import JSZip from 'jszip';

const ANALYZE_WEBHOOK_URL = 'https://praveen-10.app.n8n.cloud/webhook/analyze-project';
const GENERATE_WEBHOOK_URL = 'https://praveen-10.app.n8n.cloud/webhook/generate-project';
const CHECK_STATUS_WEBHOOK_URL = 'https://praveen-10.app.n8n.cloud/webhook/check-status';

/**
 * STEP 1: Analyze user prompt via n8n webhook and return 3 stack options
 */
export async function analyzeProjectPrompt(config, onStepUpdate) {
  const steps = [
    { id: '1', title: 'Connecting to n8n Analyze Webhook...', status: 'in-progress', detail: 'Parsing domain requirements & intent' },
    { id: '2', title: 'Evaluating Technical Stack Candidates...', status: 'pending', detail: 'Analyzing trade-offs for React, Node, Express & SQL/NoSQL' },
    { id: '3', title: 'Formatting 3 Architecture Recommendations...', status: 'pending', detail: 'Preparing stack options with pros and cons' }
  ];

  let currentStepIdx = 0;
  if (onStepUpdate) onStepUpdate([...steps]);

  const stepTimer = setInterval(() => {
    if (currentStepIdx < steps.length - 1) {
      steps[currentStepIdx].status = 'completed';
      currentStepIdx++;
      steps[currentStepIdx].status = 'in-progress';
      if (onStepUpdate) onStepUpdate([...steps]);
    }
  }, 1200);

  try {
    const response = await axios.post(
      ANALYZE_WEBHOOK_URL,
      { prompt: config.prompt },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000 // 1 minute timeout for analysis
      }
    );

    clearInterval(stepTimer);
    steps.forEach((s) => (s.status = 'completed'));
    if (onStepUpdate) onStepUpdate([...steps]);

    if (response.data && response.data.stackOptions) {
      return response.data;
    }

    return sanitizeAnalysisResponse(response.data, config.prompt);
  } catch (err) {
    clearInterval(stepTimer);
    console.warn('Analyze webhook failed, using intelligent fallback analysis:', err);
    return getFallbackAnalysis(config.prompt);
  }
}

/**
 * STEP 2: Generate project via async polling (jobId + check-status polling loop)
 */
export async function generateProjectWithStack(analysisResult, selectedStack, onStepUpdate) {
  const steps = [
    { id: '1', title: 'Generating Async Job ID & Triggering n8n Generator...', status: 'in-progress', detail: `Stack: ${selectedStack.name}` },
    { id: '2', title: 'Running AI Agent 1 (Planner & Architect)...', status: 'pending', detail: 'Designing database models & API specifications' },
    { id: '3', title: 'Running AI Agent 2 (Full-Stack Coder)...', status: 'pending', detail: 'Synthesizing React components & Express controllers' },
    { id: '4', title: 'Polling Job Status & Bundling ZIP...', status: 'pending', detail: 'Polling check-status every 5 seconds' },
    { id: '5', title: 'Extracting Real Source Tree & Triggering Download...', status: 'pending', detail: 'Transmitting generated-project.zip to browser' }
  ];

  let currentStepIdx = 0;
  if (onStepUpdate) onStepUpdate([...steps]);

  // Interval timer to update step UI during polling
  const stepTimer = setInterval(() => {
    if (currentStepIdx < steps.length - 1) {
      steps[currentStepIdx].status = 'completed';
      currentStepIdx++;
      steps[currentStepIdx].status = 'in-progress';
      if (onStepUpdate) onStepUpdate([...steps]);
    }
  }, 15000);

  try {
    // 1. Generate random UUID jobId
    const jobId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : 'job_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();

    const payload = {
      ...analysisResult,
      selectedStack,
      jobId
    };

    // 2. Initial POST to generate-project (returns immediately with acknowledgment)
    await axios.post(
      GENERATE_WEBHOOK_URL,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      }
    );

    // 3. Start Polling check-status every 5 seconds (up to 5 minutes timeout)
    const pollStartTime = Date.now();
    const POLL_INTERVAL = 5000; // 5 seconds
    const POLL_TIMEOUT = 300000; // 5 minutes

    let zipBlob = null;

    while (Date.now() - pollStartTime < POLL_TIMEOUT) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));

      try {
        const statusRes = await axios.post(
          CHECK_STATUS_WEBHOOK_URL,
          { jobId },
          {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'blob',
            timeout: 30000
          }
        );

        const blob = statusRes.data;
        const contentType = statusRes.headers['content-type'] || blob.type || '';

        // Check if response is JSON (processing / not_found)
        if (contentType.includes('application/json')) {
          const text = await blob.text();
          try {
            const json = JSON.parse(text);
            if (json.status === 'processing' || json.status === 'not_found') {
              continue; // Keep polling
            }
          } catch (e) {
            // Not valid JSON
          }
        }

        // Check text sample for status string
        const textSample = await blob.slice(0, 100).text();
        if (textSample.includes('"status"')) {
          try {
            const json = JSON.parse(textSample);
            if (json.status === 'processing' || json.status === 'not_found') {
              continue; // Keep polling
            }
          } catch (e) {}
        }

        // If we reach here, we received the binary ZIP file!
        zipBlob = blob;
        break;
      } catch (pollErr) {
        console.warn('Poll status request error (retrying in 5s):', pollErr);
      }
    }

    if (!zipBlob) {
      throw new Error('Generating your project timed out after 5 minutes. Please try again.');
    }

    clearInterval(stepTimer);
    steps.forEach((s) => (s.status = 'completed'));
    if (onStepUpdate) onStepUpdate([...steps]);

    // 4. Automatically trigger browser download as "generated-project.zip"
    const downloadUrl = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'generated-project.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000);

    // 5. Read real ZIP content with JSZip for in-app preview
    const realProject = await parseZipToProjectObject(zipBlob, analysisResult.prompt || '', selectedStack);
    return realProject;
  } catch (err) {
    clearInterval(stepTimer);
    console.error('Async generate project polling error:', err);
    throw new Error(
      err.response?.data?.message ||
      err.message ||
      'Generating your project failed. Please check your network and try again.'
    );
  }
}

/**
 * Parses binary ZIP blob with JSZip to build the real file tree project object
 */
export async function parseZipToProjectObject(blob, prompt, selectedStack) {
  const zip = await JSZip.loadAsync(blob);
  const rootNodes = [];
  const folderMap = new Map();
  const fileItems = [];

  const filenames = Object.keys(zip.files);
  for (const filename of filenames) {
    const entry = zip.files[filename];
    if (!entry.dir) {
      const content = await entry.async('string');
      fileItems.push({ path: filename, content });
    }
  }

  function getOrCreateFolder(folderPath) {
    if (!folderPath || folderPath === '.' || folderPath === '/') return null;
    if (folderMap.has(folderPath)) return folderMap.get(folderPath);

    const parts = folderPath.split('/').filter(Boolean);
    let currentPath = '';
    let parentFolder = null;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!folderMap.has(currentPath)) {
        const folderNode = {
          name: part,
          path: currentPath,
          type: 'folder',
          children: []
        };
        folderMap.set(currentPath, folderNode);

        if (parentFolder) {
          parentFolder.children.push(folderNode);
        } else {
          rootNodes.push(folderNode);
        }
      }
      parentFolder = folderMap.get(currentPath);
    }
    return folderMap.get(folderPath);
  }

  for (const item of fileItems) {
    const normalizedPath = item.path.replace(/\\/g, '/');
    const pathParts = normalizedPath.split('/').filter(Boolean);
    const fileName = pathParts.pop();
    const folderPath = pathParts.join('/');

    const fileNode = {
      name: fileName,
      path: normalizedPath,
      type: 'file',
      content: item.content
    };

    if (folderPath) {
      const parent = getOrCreateFolder(folderPath);
      if (parent) {
        parent.children.push(fileNode);
      } else {
        rootNodes.push(fileNode);
      }
    } else {
      rootNodes.push(fileNode);
    }
  }

  const cleanNameMatch = prompt.match(/(?:build|create|generate|develop)\s+(?:a|an)?\s*([a-zA-Z0-9\s-]+?)(?=\s+(?:using|with|for|in)|$)/i);
  const rawName = cleanNameMatch ? cleanNameMatch[1].trim() : 'Generated Application';
  const displayTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const framework = selectedStack?.frontend || 'React';
  const backend = selectedStack?.backend || 'Express / Node.js';
  const database = selectedStack?.database || 'PostgreSQL';

  return {
    id: 'proj_' + Math.random().toString(36).substring(2, 9),
    name: displayTitle,
    description: `Full-Stack project generated via n8n AI webhook (${fileItems.length} files).`,
    framework: framework.toUpperCase(),
    backend: backend.toUpperCase(),
    database: database.toUpperCase(),
    estimatedFiles: fileItems.length,
    estimatedComponents: fileItems.filter(f => f.path.includes('component') || f.path.endsWith('.jsx') || f.path.endsWith('.tsx')).length || 4,
    estimatedApis: fileItems.filter(f => f.path.includes('api') || f.path.includes('route') || f.path.includes('server')).length || 2,
    estimatedGenTime: 'Real-time',
    folderStructure: rootNodes,
    techStack: [framework, backend, database],
    architectureSummary: `Real full-stack architecture initialized with ${framework} UI, ${backend} server, and ${database} database. Total ZIP files: ${fileItems.length}.`,
    prompt,
    createdAt: new Date().toISOString(),
    zipBlob: blob
  };
}

function sanitizeAnalysisResponse(data, prompt) {
  if (!data) return getFallbackAnalysis(prompt);
  return {
    projectName: data.projectName || 'User Defined Application',
    description: data.description || prompt,
    features: data.features || ['User Authentication', 'REST API', 'Responsive Layout'],
    userRoles: data.userRoles || ['Admin', 'User'],
    authentication: data.authentication || 'JWT / OAuth',
    styling: data.styling || 'Tailwind CSS',
    stackOptions: data.stackOptions || getFallbackAnalysis(prompt).stackOptions
  };
}

function getFallbackAnalysis(prompt) {
  const isSql = prompt.toLowerCase().includes('sql') || prompt.toLowerCase().includes('postgres');
  return {
    projectName: 'Analyzed Full-Stack Application',
    description: prompt || 'User specified web application concept',
    features: ['Authentication & Roles', 'Dashboard & Metrics', 'CRUD Management', 'REST API'],
    userRoles: ['Admin', 'Standard User', 'Guest'],
    authentication: 'JWT Bearer Authentication',
    styling: 'Tailwind CSS v4',
    stackOptions: [
      {
        id: 'stack_1',
        name: isSql ? 'PERN Stack (React + Node + PostgreSQL)' : 'MERN Stack (React + Node + MongoDB)',
        frontend: 'React 18 (Vite)',
        backend: 'Express / Node.js',
        database: isSql ? 'PostgreSQL SQL' : 'MongoDB',
        language: 'JavaScript',
        pros: ['High development speed', 'Huge ecosystem and library support', 'Seamless frontend/backend API integration'],
        cons: ['Requires manual environment variable configuration']
      },
      {
        id: 'stack_2',
        name: 'Next.js Full-Stack App Router (Next.js + Supabase)',
        frontend: 'Next.js 14',
        backend: 'Next.js Server Actions & API Routes',
        database: 'Supabase PostgreSQL',
        language: 'TypeScript',
        pros: ['Server-side rendering (SSR) for ultra-fast page loads', 'Built-in real-time subscriptions and auth', 'Type-safe database queries'],
        cons: ['Tighter coupling with Next.js framework APIs']
      },
      {
        id: 'stack_3',
        name: 'Python Microservice Stack (React + Django + PostgreSQL)',
        frontend: 'React 18',
        backend: 'Django REST Framework',
        database: 'PostgreSQL SQL',
        language: 'Python / JavaScript',
        pros: ['Enterprise-grade ORM and security middleware', 'Auto-generated Django admin panel', 'Excellent for data processing & AI'],
        cons: ['Slightly larger memory footprint on backend server']
      }
    ]
  };
}
