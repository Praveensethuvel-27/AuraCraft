import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { GeneratorProvider } from './contexts/GeneratorContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { CommandPalette } from './components/ui/CommandPalette';
import { WebhookModal } from './components/modals/WebhookModal';
import { DeployModal } from './components/modals/DeployModal';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <GeneratorProvider>
          <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
            <Navbar />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
            <CommandPalette />
            <WebhookModal />
            <DeployModal />
          </div>
        </GeneratorProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
