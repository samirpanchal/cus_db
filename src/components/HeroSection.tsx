import React from 'react';
import { ArrowRight, Globe, Shield, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreSolutions: () => void;
  onOpenNetwork: () => void;
  onOpenQuote: () => void;
}

import { LiquidButton } from './ui/liquid-glass-button';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSolutions,
  onOpenNetwork,
  onOpenQuote,
}) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 z-10">
      <div className="max-w-4xl hero-content-wrapper">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide mb-6 backdrop-blur-sm shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Next-Generation Sustainable Trade &amp; Freight Corridors</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold leading-[1.08] tracking-tight mb-8 text-emerald-400">
          Navigating <br />
          <span className="text-emerald-600">
            Global Horizons
          </span>
        </h1>



      </div>
    </section>
  );
};
