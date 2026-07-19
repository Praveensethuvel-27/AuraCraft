import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-center text-white bg-grid-pattern relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="space-y-6 max-w-md relative z-10">
        <span className="text-8xl font-black gradient-text font-mono tracking-tight block">404</span>
        <h1 className="text-2xl font-bold">Route Not Found in AI Matrix</h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The requested page or synthesis node does not exist or has been relocated.
        </p>
        <div className="pt-4 flex justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" icon={ArrowLeft}>
              Return to Platform Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
