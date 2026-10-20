import React from 'react';
import { Shield, ExternalLink, Lock } from 'lucide-react';

interface FooterProps {
  onOpenHowItWorks: () => void;
  onOpenScamGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHowItWorks, onOpenScamGuide }) => {
  return (
    <footer className="mt-20 border-t border-[#1a2130] bg-[#090c12] text-[#64748b] text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-[#161c28]">
          {/* Brand & mission */}
          <div className="max-w-md space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#141b27] border border-[#222c3e] flex items-center justify-center text-[#bbf438]">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="font-heading font-bold text-white text-sm">
                OfferShield
              </span>
              <span className="text-[10px] font-mono text-[#bbf438] bg-[#162013] px-1.5 py-0.5 rounded border border-[#233519]">
                VERIFY BEFORE YOU TRUST
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Empowering undergraduate and graduate students to detect predatory employment scams, fraudulent scholarship awards, and deceptive recruiter communications.
            </p>
          </div>

          {/* Quick links & references */}
          <div className="flex flex-wrap gap-8 text-xs">
            <div className="space-y-2">
              <div className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                Platform
              </div>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={onOpenHowItWorks} className="hover:text-white transition-colors">
                    How Analysis Works
                  </button>
                </li>
                <li>
                  <button onClick={onOpenScamGuide} className="hover:text-white transition-colors">
                    Common Scam Playbooks
                  </button>
                </li>
                <li>
                  <span className="text-[#475569]">Gemini Integration Ready</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                Official Reporting
              </div>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="https://reportfraud.ftc.gov"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#bbf438] transition-colors inline-flex items-center gap-1"
                  >
                    <span>FTC Fraud Report</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ic3.gov"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#bbf438] transition-colors inline-flex items-center gap-1"
                  >
                    <span>FBI IC3 Center</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://studentaid.gov/resources/scams"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#bbf438] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Federal Student Aid Scams</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom advisory */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#4b5563]">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Client-side demonstration engine. All evaluations remain local on this device.</span>
          </div>

          <div className="text-right">
            © {new Date().getFullYear()} OfferShield. Educational advisory tool.
          </div>
        </div>
      </div>
    </footer>
  );
};
