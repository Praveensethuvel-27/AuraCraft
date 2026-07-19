import React from 'react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold">Terms of Service</h1>
        <p className="text-sm text-zinc-400">Effective Date: July 19, 2026</p>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AuraCraft AI, you agree to be bound by these Terms of Service and all applicable software licensing terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Permitted Use</h2>
            <p>
              You are granted a non-exclusive, worldwide license to generate, export, download, modify, and commercially deploy applications synthesized using our platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Limitation of Liability</h2>
            <p>
              AuraCraft AI is provided "as is" without warranty of any kind. You are responsible for reviewing and testing all generated source code prior to production deployment.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
