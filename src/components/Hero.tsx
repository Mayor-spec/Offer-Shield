import React from 'react';
import { ShieldCheck, FileSearch, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-6 pb-8 sm:pt-10 sm:pb-10 text-center">
      {/* Background glow subtle */}
      <div className="absolute inset-0 max-w-2xl mx-auto -z-10 pointer-events-none">
        <div className="w-72 h-44 mx-auto bg-[#bbf438]/5 blur-3xl rounded-full" />
      </div>

      {/* Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141b27] border border-[#232e42] text-xs text-[#a0aec0] mb-5 shadow-sm">
        <ShieldCheck className="w-3.5 h-3.5 text-[#bbf438]" />
        <span className="font-medium text-white">OfferShield</span>
        <span className="w-1 h-1 rounded-full bg-[#4a5568]" />
        <span className="text-[#a3e635]">Verify before you trust</span>
      </div>

      {/* Main Headline */}
      <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#f4f4f6] max-w-3xl mx-auto leading-[1.15]">
        That opportunity looks promising.{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f4f4f6] to-[#bbf438]">
          But is it real?
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed px-4">
        College students lose millions each year to deceptive scholarship awards, fake check internship scams, and Telegram recruiters. Paste any offer or message to inspect hidden risk indicators before you take action.
      </p>

      {/* Feature highlights chips */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-[#64748b]">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#101520] border border-[#1a2333]">
          <FileSearch className="w-3.5 h-3.5 text-[#bbf438]" />
          Deconstructs advance fee schemes
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#101520] border border-[#1a2333]">
          <Sparkles className="w-3.5 h-3.5 text-[#bbf438]" />
          Analyzes domain & payment red flags
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#101520] border border-[#1a2333]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          Zero credential collection
        </span>
      </div>
    </div>
  );
};
