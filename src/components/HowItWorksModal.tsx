import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrySample: (sampleId: string) => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onTrySample
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0e121a] border border-[#20293b] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#1b2333] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#182133] border border-[#27344c] flex items-center justify-center text-[#bbf438]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-lg">
                How OfferShield Evaluates Offers
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Student Fraud Defense Framework
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#182030] text-[#94a3b8] hover:text-white flex items-center justify-center border border-[#263249] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-white text-base">
              The 3-Tier Risk Standard
            </h4>
            <p className="text-xs text-[#94a3b8]">
              OfferShield classifies communications into three distinct categories rather than binary safe/unsafe labels:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#241417] border border-[#ef4444]/30">
                <span className="font-mono text-[11px] font-bold text-[#f87171] uppercase block mb-1">
                  High Risk (70-100)
                </span>
                <p className="text-[11px] text-[#fca5a5]">
                  Overpayment check demands, upfront fees, Telegram/WhatsApp interviews, or immediate SSN harvesting.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#2b2012] border border-[#f59e0b]/30">
                <span className="font-mono text-[11px] font-bold text-[#fbbf24] uppercase block mb-1">
                  Needs Verification (38-69)
                </span>
                <p className="text-[11px] text-[#fcd34d]">
                  Unverified domains, vague duties, high pay for general tasks, or missing formal corporate details.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0f231c] border border-[#10b981]/30">
                <span className="font-mono text-[11px] font-bold text-[#34d399] uppercase block mb-1">
                  Lower Apparent Risk (&lt;38)
                </span>
                <p className="text-[11px] text-[#a7f3d0]">
                  Standard campus procedures and verifiable institutional portals (.edu). Never assume 100% immune.
                </p>
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <div className="p-4 rounded-xl bg-[#131722] border border-[#1e2637] space-y-2.5">
            <div className="font-heading font-semibold text-white text-xs uppercase tracking-wider text-[#bbf438]">
              Key Cardinal Rules for Students
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                <span><strong>No legitimate employer or scholarship asks you to pay them:</strong> Never pay application fees, equipment delivery fees, or transfer fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                <span><strong>Cashier’s checks are not instant cash:</strong> Banks clear funds before checks verify. If an employer mails you a check and asks for any amount back, it is 100% fraud.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                <span><strong>Interviews never happen via text chat apps:</strong> Authentic companies conduct video or in-person interviews and send formal written offers through company email domains.</span>
              </li>
            </ul>
          </div>

          {/* Try a demo */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1a2333]">
            <span className="text-xs text-[#94a3b8]">Ready to see a forensic scan in action?</span>
            <button
              onClick={() => {
                onTrySample('sample-scholarship');
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-[#bbf438] hover:bg-[#a3e635] transition-all"
            >
              <span>Load $12.5k Scholarship Sample</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
