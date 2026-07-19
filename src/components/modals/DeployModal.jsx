import React, { useState } from 'react';
import { Rocket, Check, ExternalLink, Globe, Shield } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useGenerator } from '../../contexts/GeneratorContext';
import { useToast } from '../../contexts/ToastContext';

export function DeployModal() {
  const { currentProject, isDeployModalOpen, setIsDeployModalOpen } = useGenerator();
  const { addToast } = useToast();
  const [deploying, setDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState(null);

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      const fakeUrl = `https://${currentProject?.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'app'}.auracraft.app`;
      setDeployedUrl(fakeUrl);
      addToast('Application deployed to global edge network!', 'success');
    }, 2500);
  };

  return (
    <Modal
      isOpen={isDeployModalOpen}
      onClose={() => setIsDeployModalOpen(false)}
      title="Instant Vercel / Cloudflare Edge Deployment"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <p className="text-sm text-zinc-400">
          Deploy <strong className="text-white">{currentProject?.name || 'Generated Project'}</strong> to global CDN edge servers in under 5 seconds.
        </p>

        {deployedUrl ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 text-emerald-400 font-semibold text-sm">
              <Check className="w-5 h-5" />
              <span>Deployment Live!</span>
            </div>
            <a
              href={deployedUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-white underline font-mono"
            >
              {deployedUrl} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Target Provider:</span>
              <span className="font-semibold text-white">Vercel Edge Platform</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Region:</span>
              <span className="font-semibold text-white">Global (Anycast)</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>SSL / TLS Certificate:</span>
              <span className="font-semibold text-emerald-400">Auto Provisioned</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button variant="secondary" size="sm" onClick={() => setIsDeployModalOpen(false)}>
            Close
          </Button>
          {!deployedUrl && (
            <Button
              variant="primary"
              size="sm"
              loading={deploying}
              onClick={handleDeploy}
              icon={Rocket}
            >
              Deploy Now
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
