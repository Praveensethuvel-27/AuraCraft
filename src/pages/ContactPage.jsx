import React, { useState } from 'react';
import { Mail, MessageSquare, User, Send, CheckCircle2, Building } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../contexts/ToastContext';

export function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '', subject: 'General Query' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all required fields.', 'warning');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      addToast('Thank you! Your message has been sent to our team.', 'success');
      setFormData({ name: '', email: '', message: '', subject: 'General Query' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <Badge variant="gradient" size="lg">Get in Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact <span className="gradient-text">AuraCraft Support</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Have questions about n8n webhooks, custom enterprise deployment, or feature requests? Send us a message.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/[0.08] shadow-2xl backdrop-blur-xl max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Your Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Mercer"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-white/[0.1] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Work Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-white/[0.1] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-white/[0.1] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="General Query">General Inquiry</option>
                <option value="n8n Integration">n8n Webhook Integration</option>
                <option value="Enterprise Tier">Enterprise Licensing</option>
                <option value="Feature Request">Feature Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1">Your Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help your team..."
                className="w-full px-4 py-2.5 bg-zinc-950 border border-white/[0.1] rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <Button variant="primary" size="lg" loading={sending} className="w-full" icon={Send}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
