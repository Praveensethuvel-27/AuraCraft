import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeatureSection } from '../components/landing/FeatureSection';
import { WorkflowSection } from '../components/landing/WorkflowSection';
import { PricingSection } from '../components/landing/PricingSection';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <HeroSection />
      <FeatureSection />
      <WorkflowSection />
      <PricingSection />
    </div>
  );
}
