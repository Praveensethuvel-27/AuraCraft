import React from 'react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
        <p className="text-sm text-zinc-400">Effective Date: July 19, 2026</p>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>
              AuraCraft AI collects information provided directly by users when generating code projects, including prompt descriptions, framework preferences, and n8n webhook URL configurations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Use of Generated Source Code</h2>
            <p>
              All source code, project file structures, and database schemas synthesized by AuraCraft AI belong exclusively to the user. We do not claim ownership or rights over your generated projects.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Third-Party Integrations & n8n Webhooks</h2>
            <p>
              When you enable custom n8n Webhook mode, prompt payloads are transmitted directly to the external URL provided in your settings. Ensure your endpoint complies with your organization's privacy requirements.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
