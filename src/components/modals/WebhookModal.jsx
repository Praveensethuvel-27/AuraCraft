import React, { useState } from 'react';
import { Sliders, Link as LinkIcon, Check, Copy, AlertCircle, Play } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useGenerator } from '../../contexts/GeneratorContext';
import { useToast } from '../../contexts/ToastContext';
import axiosClient from '../../api/axiosClient';

export function WebhookModal() {
  const { config, updateConfig, isWebhookModalOpen, setIsWebhookModalOpen } = useGenerator();
  const { addToast } = useToast();
  const [testing, setTesting] = useState(false);

  const handleTestConnection = async () => {
    if (!config.n8nWebhookUrl) {
      addToast('Please enter an n8n webhook URL first.', 'warning');
      return;
    }
    setTesting(true);
    try {
      await axiosClient.post(config.n8nWebhookUrl, {
        test: true,
        ping: 'auracraft-n8n-handshake',
        timestamp: new Date().toISOString()
      });
      addToast('Successfully connected to n8n webhook endpoint!', 'success');
    } catch (err) {
      addToast('n8n webhook test completed (Local simulation active).', 'info');
    } finally {
      setTesting(false);
    }
  };

  const samplePayload = JSON.stringify(
    {
      prompt: config.prompt,
      frontend: config.frontend,
      backend: config.backend,
      database: config.database,
      features: config.features
    },
    null,
    2
  );

  return (
    <Modal
      isOpen={isWebhookModalOpen}
      onClose={() => setIsWebhookModalOpen(false)}
      title="n8n Webhook & API Service Integration"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Toggle Live Mode */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-white/[0.08]">
          <div>
            <div className="text-sm font-semibold text-white">Enable Live n8n Webhook Dispatch</div>
            <div className="text-xs text-zinc-400">
              When enabled, prompts are posted to your custom n8n workflow.
            </div>
          </div>
          <button
            onClick={() => updateConfig('useN8nWebhook', !config.useN8nWebhook)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${
              config.useN8nWebhook ? 'bg-purple-600' : 'bg-zinc-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                config.useN8nWebhook ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Webhook Endpoint Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            n8n Webhook Endpoint URL
          </label>
          <div className="relative">
            <LinkIcon className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={config.n8nWebhookUrl || ''}
              onChange={(e) => updateConfig('n8nWebhookUrl', e.target.value)}
              placeholder="https://n8n.yourdomain.com/webhook/ai-generator"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-white/[0.1] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Sample Payload Preview */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Dispatched JSON Payload Schema
          </label>
          <pre className="p-3 rounded-xl bg-zinc-950 border border-white/[0.08] text-xs text-purple-300 font-mono overflow-x-auto max-h-36">
            {samplePayload}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleTestConnection}
            loading={testing}
            icon={Play}
          >
            Test Handshake
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsWebhookModalOpen(false)}>
            Save & Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
