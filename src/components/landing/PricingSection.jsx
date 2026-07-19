import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter Developer',
      tagline: 'Ideal for indie hackers & side projects',
      price: '$0',
      period: 'Forever Free',
      popular: false,
      features: [
        '5 AI Full-Stack Project Generations / mo',
        'React & Vue Frontend Generators',
        'Express Node.js Backend Engine',
        'MongoDB & PostgreSQL Support',
        'Standard `.ZIP` Project Export',
        'Community Discord Support'
      ],
      cta: 'Start Free',
      variant: 'secondary'
    },
    {
      name: 'Pro Creator',
      tagline: 'For professional software engineers & agencies',
      price: annual ? '$29' : '$39',
      period: annual ? '/ month (billed yearly)' : '/ month',
      popular: true,
      features: [
        'Unlimited AI Project Generations',
        'React, Next.js, Vue & Angular Frontend',
        'Express, NestJS, Django & Laravel Backends',
        'Live n8n Webhook Workflow Integration',
        'JWT Auth & Docker Container Files',
        'Interactive Code Preview Canvas',
        '1-Click Vercel Edge Deployment',
        'Priority Synthesis GPU Nodes'
      ],
      cta: 'Get Pro Access',
      variant: 'primary'
    },
    {
      name: 'Enterprise Agency',
      tagline: 'For high-scale teams & enterprise engineering',
      price: annual ? '$99' : '$119',
      period: annual ? '/ month (billed yearly)' : '/ month',
      popular: false,
      features: [
        'Everything in Pro Creator',
        'Custom Private LLM & n8n Endpoint Clusters',
        'Dedicated Monorepo Generator',
        'Custom SSO & OAuth Auth Providers',
        'Dedicated Solutions Engineer & SLA',
        'Custom Design Tokens & UI Library Export'
      ],
      cta: 'Contact Sales',
      variant: 'outline'
    }
  ];

  return (
    <section className="py-24 relative bg-white border-t border-rose-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-600">Simple Transparent Pricing</h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Build Faster with <span className="gradient-text">Pro Tier Power</span>
          </p>
          <p className="text-stone-600 text-base sm:text-lg">
            Choose the plan that fits your development scale. Upgrade or cancel anytime.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-rose-50 border border-rose-200 mt-6">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                !annual ? 'bg-white text-stone-900 shadow-md' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                annual ? 'bg-rose-500 text-white shadow-md' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 text-[10px] font-bold">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-white via-rose-50/50 to-orange-50/50 border-2 border-rose-400 shadow-2xl shadow-rose-500/15 lg:-translate-y-2'
                  : 'bg-white border border-rose-200 hover:border-rose-300 shadow-lg shadow-rose-500/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="gradient" size="md" pulse>
                    <Sparkles className="w-3 h-3 text-rose-500" /> MOST POPULAR FOR DEVELOPERS
                  </Badge>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-stone-500 mb-6">{plan.tagline}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-stone-900">{plan.price}</span>
                  <span className="text-xs text-stone-500 ml-2 font-medium">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-rose-100 mb-8">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/dashboard" className="block w-full">
                <Button variant={plan.variant} size="lg" className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
