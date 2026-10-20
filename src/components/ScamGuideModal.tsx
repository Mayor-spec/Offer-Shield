import React from 'react';
import { X, AlertOctagon, ArrowRight, ShieldCheck } from 'lucide-react';

interface ScamGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrySample: (sampleId: string) => void;
}

export const ScamGuideModal: React.FC<ScamGuideModalProps> = ({
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
      <div className="relative w-full max-w-2xl bg-[#0e121a] border border-[#20293b] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#1b2333] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#271d18] border border-[#482c20] flex items-center justify-center text-[#fbbf24]">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-lg">
                The 3 Most Common Student Scams
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Recognize these playbook tactics before you reply
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

        <div className="space-y-5 text-xs sm:text-sm text-[#cbd5e1]">
          {/* Scam 1 */}
          <div className="p-4 rounded-xl bg-[#141824] border border-[#1f283a] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-white text-sm text-[#f87171]">
                1. The Fake Check Equipment Scam
              </span>
              <button
                onClick={() => {
                  onTrySample('sample-internship');
                  onClose();
                }}
                className="text-[11px] font-mono text-[#bbf438] hover:underline inline-flex items-center gap-1"
              >
                <span>View Sample</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              <strong>The Pitch:</strong> You are offered a high-paying remote job ($40-$60/hr). The "employer" sends a $3,000–$4,000 cashier’s check to buy an Apple laptop from "their certified vendor".
            </p>
            <p className="text-xs text-[#fca5a5] leading-relaxed">
              <strong>The Trap:</strong> You deposit the check. Your bank makes funds available under the Expedited Funds Availability Act. You wire money to the vendor. Two weeks later, the check bounces as counterfeit, and your bank holds you legally responsible for the thousands you wired.
            </p>
          </div>

          {/* Scam 2 */}
          <div className="p-4 rounded-xl bg-[#141824] border border-[#1f283a] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-white text-sm text-[#fb923c]">
                2. Advance-Fee Grant & Scholarship Fraud
              </span>
              <button
                onClick={() => {
                  onTrySample('sample-scholarship');
                  onClose();
                }}
                className="text-[11px] font-mono text-[#bbf438] hover:underline inline-flex items-center gap-1"
              >
                <span>View Sample</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              <strong>The Pitch:</strong> An official-sounding foundation awards you a $10,000+ scholarship you never applied for. You just have to pay a "refundable registration / transfer tax" of $50–$150 via Zelle or gift cards.
            </p>
            <p className="text-xs text-[#fca5a5] leading-relaxed">
              <strong>The Trap:</strong> Once you pay, the grant never arrives. Legitimate scholarship programs deduct administrative expenses internally, never asking students for peer-to-peer cash.
            </p>
          </div>

          {/* Scam 3 */}
          <div className="p-4 rounded-xl bg-[#141824] border border-[#1f283a] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-bold text-white text-sm text-[#f87171]">
                3. The Telegram / WhatsApp Identity Harvesting Ring
              </span>
              <button
                onClick={() => {
                  onTrySample('sample-recruitment');
                  onClose();
                }}
                className="text-[11px] font-mono text-[#bbf438] hover:underline inline-flex items-center gap-1"
              >
                <span>View Sample</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              <strong>The Pitch:</strong> A recruiter on LinkedIn or SMS directs you to Telegram or WhatsApp for a "quick text interview" and instant direct hire.
            </p>
            <p className="text-xs text-[#fca5a5] leading-relaxed">
              <strong>The Trap:</strong> They ask for your SSN, driver's license scans, and voided bank checks under the guise of "payroll clearance." Threat actors use these credentials to open fraudulent loans and take over bank accounts.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#0f141f] border border-[#1d273a] flex items-center justify-between text-xs text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#bbf438]" />
              <span>Campus Career Centers offer free, verified employer vetting for students.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
