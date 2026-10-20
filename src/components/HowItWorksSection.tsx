import React from 'react';
import { ClipboardCheck, Binary, ShieldAlert, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onSelectSample?: (id: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onSelectSample }) => {
  return (
    <section id="how-it-works" className="w-full max-w-4xl mx-auto mt-14 pt-10 border-t border-[#1a2130]">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121622] border border-[#20293b] text-xs font-mono text-[#bbf438] mb-3">
          <Binary className="w-3.5 h-3.5" />
          <span>CYBER FORENSIC PROTOCOL</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
          How OfferShield Works
        </h2>
        <p className="text-xs sm:text-sm text-[#94a3b8] max-w-xl mx-auto mt-2">
          Deconstructing predatory recruiting tactics targeting college students into transparent, actionable signals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="p-5 rounded-2xl bg-[#10141d] border border-[#1e2636] hover:border-[#2a354b] transition-all relative overflow-hidden group">
          <div className="text-[10px] font-mono font-bold text-[#bbf438] uppercase tracking-wider mb-2">
            Step 01
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#161d2a] border border-[#243044] flex items-center justify-center text-[#bbf438] mb-4 group-hover:scale-105 transition-transform">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-white mb-1.5">
            1. Paste Opportunity Text
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Copy the full email message, Telegram or WhatsApp chat, SMS dispatch, or internship posting. No login or personal account creation needed.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-2xl bg-[#10141d] border border-[#1e2636] hover:border-[#2a354b] transition-all relative overflow-hidden group">
          <div className="text-[10px] font-mono font-bold text-[#bbf438] uppercase tracking-wider mb-2">
            Step 02
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#161d2a] border border-[#243044] flex items-center justify-center text-[#fbbf24] mb-4 group-hover:scale-105 transition-transform">
            <Binary className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-white mb-1.5">
            2. Deconstruct Risk Patterns
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Evaluates red flags: advance check overpayment schemes, upfront processing fees, inflated wages, off-platform chat redirects, and SSN harvesting.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-2xl bg-[#10141d] border border-[#1e2636] hover:border-[#2a354b] transition-all relative overflow-hidden group">
          <div className="text-[10px] font-mono font-bold text-[#bbf438] uppercase tracking-wider mb-2">
            Step 03
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#161d2a] border border-[#243044] flex items-center justify-center text-[#34d399] mb-4 group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-base font-bold text-white mb-1.5">
            3. Take Verified Safe Action
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Receive an illustrative risk score (0-100), highlighted evidence quotes, observed vs unverified claims, and an interactive verification checklist.
          </p>
        </div>
      </div>

      {/* Quick reassurance strip */}
      <div className="mt-6 p-4 rounded-xl bg-[#111622] border border-[#1d2638] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <span>Need to evaluate a common attack pattern right now?</span>
        </div>
        {onSelectSample && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectSample('sample-internship')}
              className="text-[#bbf438] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Test the $48/hr check scam sample</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
