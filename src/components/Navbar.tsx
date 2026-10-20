import React from 'react';
import { Shield, History, HelpCircle, AlertOctagon, RotateCcw } from 'lucide-react';

interface NavbarProps {
  historyCount: number;
  onOpenHistory: () => void;
  onOpenHowItWorks: () => void;
  onOpenScamGuide: () => void;
  isViewingReport: boolean;
  onNewScan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  historyCount,
  onOpenHistory,
  onOpenHowItWorks,
  onOpenScamGuide,
  isViewingReport,
  onNewScan
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1c2433] bg-[#0b0e14]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Tagline */}
        <div 
          onClick={onNewScan}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNewScan()}
          aria-label="OfferShield Home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#131926] border border-[#222c3e] group-hover:border-[#bbf438]/50 transition-colors">
            <Shield className="w-5 h-5 text-[#bbf438]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#bbf438] animate-pulse" />
          </div>
          <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-lg tracking-tight text-white group-hover:text-[#bbf438] transition-colors">
                  OfferShield
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-[#132214] text-[#bbf438] border border-[#274426]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bbf438] animate-pulse" />
                  GEMINI 3.8 FLASH
                </span>
              </div>
              <p className="text-[11px] text-[#718096] hidden md:block">
                Verify before you trust • AI Fraud Defense
              </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isViewingReport && (
            <button
              onClick={onNewScan}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#f4f4f6] bg-[#161d2a] border border-[#232d3f] hover:border-[#bbf438]/40 hover:text-white transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#bbf438]" />
              <span className="hidden sm:inline">New Scan</span>
            </button>
          )}

          <button
            onClick={onOpenHowItWorks}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#a0aec0] hover:text-[#f4f4f6] hover:bg-[#131926] border border-transparent hover:border-[#20293a] transition-all"
          >
            <HelpCircle className="w-4 h-4 text-[#718096]" />
            <span className="hidden sm:inline">How it works</span>
          </button>

          <button
            onClick={onOpenScamGuide}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#a0aec0] hover:text-[#f4f4f6] hover:bg-[#131926] border border-transparent hover:border-[#20293a] transition-all"
          >
            <AlertOctagon className="w-4 h-4 text-[#fbbf24]" />
            <span>Scam patterns</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#f4f4f6] bg-[#131926] border border-[#20293a] hover:border-[#bbf438]/40 transition-all"
            aria-label={`Scan history, ${historyCount} items`}
          >
            <History className="w-4 h-4 text-[#bbf438]" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-mono font-semibold rounded-full bg-[#bbf438] text-black">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
