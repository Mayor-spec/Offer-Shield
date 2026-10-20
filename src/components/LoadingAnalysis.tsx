import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle2, Loader2 } from 'lucide-react';

interface LoadingAnalysisProps {
  onComplete?: () => void;
}

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Parsing message structure and sender claims...',
    'Deconstructing advance-fee, overpayment, and equipment purchase vectors...',
    'Evaluating domain credibility and off-platform communication channels...',
    'Synthesizing risk signals, forensic evidence, and action recommendations...'
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 350);
    const timer2 = setTimeout(() => setCurrentStep(2), 700);
    const timer3 = setTimeout(() => setCurrentStep(3), 1050);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-6 bg-[#10141d] border border-[#1e2636] rounded-2xl shadow-2xl text-center">
      {/* Radar scanning animation */}
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-[#bbf438]/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-[#bbf438]/40" />
        <div className="w-14 h-14 rounded-2xl bg-[#141b27] border border-[#bbf438]/60 flex items-center justify-center shadow-lg shadow-[#bbf438]/20">
          <Shield className="w-7 h-7 text-[#bbf438] animate-pulse" />
        </div>
      </div>

      <h3 className="font-heading text-xl font-bold text-white mb-1">
        Inspecting Opportunity Signals
      </h3>
      <p className="text-xs text-[#94a3b8] mb-6">
        Cross-referencing pattern heuristics against known student employment & award fraud vectors
      </p>

      {/* Checklist of steps */}
      <div className="space-y-2.5 text-left max-w-md mx-auto">
        {steps.map((text, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs transition-all ${
                isDone
                  ? 'bg-[#121924] border-[#1e2d42] text-[#e2e8f0]'
                  : isCurrent
                  ? 'bg-[#152015] border-[#bbf438]/40 text-[#bbf438]'
                  : 'bg-[#0c0f17] border-[#151a24] text-[#475569]'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-[#bbf438] animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-[#334155] shrink-0" />
              )}
              <span className="font-mono">{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
