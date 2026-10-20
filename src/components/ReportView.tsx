import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Copy, 
  Check, 
  Info, 
  Quote, 
  FileCheck2, 
  HelpCircle,
  Eye,
  ShieldCheck,
  Share2,
  Sparkles,
  AlertOctagon
} from 'lucide-react';
import { AnalysisReport, RiskLevel } from '../types/analyzer';

interface ReportViewProps {
  report: AnalysisReport;
  onNewScan: () => void;
  onOpenHowItWorks: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  onNewScan,
  onOpenHowItWorks
}) => {
  const [copied, setCopied] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const isGeminiEngine = report.engine === 'gemini' || !report.isDemonstration;

  const handleCopySummary = async () => {
    const textToCopy = `[OfferShield Forensic Report]
Engine: ${isGeminiEngine ? 'Gemini 3.8 Flash AI' : 'Demonstration Analyzer'}
Assessment: ${report.riskLabel} (Estimated Risk Indicator: ${report.score}/100)
Category: ${report.category.toUpperCase()}
Verdict: ${report.verdict}

Executive Summary:
${report.summary}

Key Signals Identified:
${report.evidence.map(e => `- [${e.severity.toUpperCase()}] ${e.signal}`).join('\n')}

Recommended Next Steps:
${report.nextSteps.map(s => `• ${s}`).join('\n')}

Limitations:
${(report.limitations || []).map(l => `• ${l}`).join('\n')}

Evaluated with OfferShield: Verify before you trust.`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Color scheme based on risk level
  const getRiskStyles = (level: RiskLevel) => {
    switch (level) {
      case 'high':
        return {
          border: 'border-[#ef4444]/40',
          bgHeader: 'bg-[#1e1316]',
          badgeBg: 'bg-[#3b1219]',
          badgeText: 'text-[#fca5a5]',
          badgeBorder: 'border-[#ef4444]/40',
          scoreColor: 'text-[#f87171]',
          barColor: 'bg-[#ef4444]',
          icon: <ShieldAlert className="w-6 h-6 text-[#ef4444]" />,
          disclaimer: 'High risk detected. Immediate protective steps recommended before engaging.'
        };
      case 'medium':
        return {
          border: 'border-[#f59e0b]/40',
          bgHeader: 'bg-[#1c1810]',
          badgeBg: 'bg-[#3d2c10]',
          badgeText: 'text-[#fcd34d]',
          badgeBorder: 'border-[#f59e0b]/40',
          scoreColor: 'text-[#fbbf24]',
          barColor: 'bg-[#f59e0b]',
          icon: <AlertTriangle className="w-6 h-6 text-[#fbbf24]" />,
          disclaimer: 'Ambiguities and missing verification signals detected. Do not share confidential data.'
        };
      case 'low':
      default:
        return {
          border: 'border-[#10b981]/40',
          bgHeader: 'bg-[#0f1b17]',
          badgeBg: 'bg-[#0d2e23]',
          badgeText: 'text-[#6ee7b7]',
          badgeBorder: 'border-[#10b981]/40',
          scoreColor: 'text-[#34d399]',
          barColor: 'bg-[#10b981]',
          icon: <CheckCircle2 className="w-6 h-6 text-[#34d399]" />,
          disclaimer: 'Do not call an offer safe or genuine merely because warning signs are absent. Always verify independently.'
        };
    }
  };

  const styles = getRiskStyles(report.riskLevel);
  const supportingEvidence = report.evidence.filter(e => e.sentiment === 'supports_suspicion');
  const weakeningEvidence = report.evidence.filter(e => e.sentiment === 'weakens_suspicion');

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Action Nav Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onNewScan}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#141a26] border border-[#232c3f] hover:border-[#bbf438]/50 hover:bg-[#1a2233] transition-all shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#bbf438]" />
          <span>New scan / Reset</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#cbd5e1] bg-[#141a26] border border-[#232c3f] hover:text-white hover:border-[#bbf438]/40 transition-all"
            title="Copy report summary"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#bbf438]" />
                <span className="text-[#bbf438]">Copied summary</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#94a3b8]" />
                <span>Copy summary</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenHowItWorks}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#94a3b8] hover:text-white bg-[#141a26] border border-[#232c3f] transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to verify</span>
          </button>
        </div>
      </div>

      {/* Main Forensic Score Card */}
      <div className={`rounded-2xl border ${styles.border} bg-[#10141d] overflow-hidden shadow-2xl`}>
        {/* Banner with Engine & Mode Label */}
        <div className="px-4 py-2 bg-[#141924] border-b border-[#1f2838] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-[#1d2638] text-[#93c5fd]">
              {report.category}
            </span>
            <span className="text-[#64748b]">•</span>
            <span className="text-[#94a3b8] font-mono text-[11px]">
              ID: {report.id.substring(0, 16)}
            </span>
          </div>

          {isGeminiEngine ? (
            <div className="flex items-center gap-1.5 text-[11px] text-[#bbf438] bg-[#142315] px-2.5 py-0.5 rounded-md border border-[#274424]">
              <Sparkles className="w-3.5 h-3.5 text-[#bbf438]" />
              <span className="font-medium">Live Gemini 3.8 Flash Analysis</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-[#fbbf24] bg-[#292212] px-2.5 py-0.5 rounded-md border border-[#4d3b19]">
              <Info className="w-3.5 h-3.5" />
              <span>Illustrative Demonstration Mode</span>
            </div>
          )}
        </div>

        {/* Hero Section of the Report */}
        <div className={`p-5 sm:p-7 ${styles.bgHeader} border-b border-[#1f2838]`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Risk Indicator & Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${styles.badgeBg} ${styles.badgeText} border ${styles.badgeBorder}`}>
                  {styles.icon}
                  {report.riskLabel}
                </span>
                <span className="text-xs font-mono text-[#64748b]">
                  {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {report.title}
              </h2>

              <p className="text-xs text-[#94a3b8] max-w-xl">
                {styles.disclaimer}
              </p>
            </div>

            {/* Score Gauge Block */}
            <div className="shrink-0 bg-[#0b0e14] border border-[#1f2838] p-4 rounded-xl min-w-[210px] text-center">
              <div className="text-[11px] font-mono uppercase text-[#64748b] tracking-wider mb-1">
                Estimated Risk Indicator
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`font-heading text-4xl sm:text-5xl font-extrabold ${styles.scoreColor}`}>
                  {report.score}
                </span>
                <span className="text-base text-[#64748b] font-mono">/100</span>
              </div>

              {/* Multi-segment progress bar */}
              <div className="mt-3 w-full bg-[#1b2333] h-2 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full ${styles.barColor} transition-all duration-700`}
                  style={{ width: `${report.score}%` }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[10px] font-mono text-[#4b5563]">
                <span>0 (Lower)</span>
                <span>50</span>
                <span>100 (Critical)</span>
              </div>

              <div className="mt-2 text-[10px] text-[#64748b] leading-tight">
                Forensic indicator estimate, not a statistical probability.
              </div>
            </div>
          </div>
        </div>

        {/* Verdict Callout */}
        <div className="p-5 sm:p-6 bg-[#121620] border-b border-[#1e2636]">
          <div className="text-xs font-mono text-[#bbf438] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Executive Verdict
          </div>
          <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
            {report.verdict}
          </p>
          <p className="text-xs sm:text-sm text-[#94a3b8] mt-2 leading-relaxed">
            {report.summary}
          </p>
        </div>

        {/* Mandatory False-Sense-of-Security Notice */}
        <div className="px-5 py-3 bg-[#0d1118] border-b border-[#1a2333] flex items-center gap-2.5 text-xs text-[#94a3b8]">
          <Info className="w-4 h-4 text-[#38bdf8] shrink-0" />
          <span>
            <strong className="text-white">Security Discipline:</strong> Do not call an offer safe or genuine merely because warning signs are absent. Scammers continually refine social engineering scripts.
          </span>
        </div>

        {/* Section: Specific Evidence & Extracted Phrases */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <Quote className="w-4 h-4 text-[#bbf438]" />
              Identified Signals & Evidence in Text
            </h3>
            <span className="text-xs font-mono text-[#64748b]">
              {report.evidence.length} signals extracted
            </span>
          </div>

          <div className="space-y-3">
            {report.evidence.map((item) => {
              const isSupport = item.sentiment === 'supports_suspicion';
              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSupport 
                      ? 'bg-[#131722] border-[#222c3f]' 
                      : 'bg-[#101b18] border-[#1b332b]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        item.severity === 'critical' ? 'bg-[#ef4444]' :
                        item.severity === 'warning' ? 'bg-[#fbbf24]' : 'bg-[#10b981]'
                      }`} />
                      {item.signal}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.quote_verified && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#162319] text-[#bbf438] border border-[#27442a]">
                          Verbatim in Text
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        isSupport
                          ? 'bg-[#29171a] text-[#fca5a5] border border-[#482025]'
                          : 'bg-[#0f2820] text-[#6ee7b7] border border-[#1d4c3d]'
                      }`}>
                        {isSupport ? 'Supports Suspicion' : 'Weakens Suspicion'}
                      </span>
                    </div>
                  </div>

                  {/* Quoted phrase */}
                  <div className="p-2.5 rounded-lg bg-[#0a0d13] border border-[#1b2230] text-xs font-mono text-[#cbd5e1] mb-2.5 italic">
                    "{item.exact_quote || item.phrase}"
                  </div>

                  {/* Why it matters / Explanation */}
                  <div className="text-xs text-[#94a3b8] leading-relaxed">
                    <strong className="text-[#e2e8f0]">Why this matters: </strong>
                    {item.whyItMatters || item.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Forensic Balance (Supports vs. Weakens) */}
        <div className="p-5 sm:p-6 bg-[#0e121a] border-t border-[#1e2636]">
          <h3 className="font-heading text-base font-bold text-white mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#bbf438]" />
            Forensic Balance Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Factors Supporting Suspicion */}
            <div className="p-4 rounded-xl bg-[#14161f] border border-[#ef4444]/20">
              <div className="text-xs font-mono font-bold text-[#f87171] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444]" />
                Signals Increasing Suspicion ({supportingEvidence.length})
              </div>
              <ul className="space-y-1.5 text-xs text-[#cbd5e1]">
                {supportingEvidence.length > 0 ? (
                  supportingEvidence.map(e => (
                    <li key={e.id} className="flex items-start gap-1.5">
                      <span className="text-[#ef4444] font-bold">•</span>
                      <span>{e.signal}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-[#64748b] italic">No aggressive fraud patterns detected.</li>
                )}
              </ul>
            </div>

            {/* Factors Weakening Suspicion */}
            <div className="p-4 rounded-xl bg-[#111718] border border-[#10b981]/20">
              <div className="text-xs font-mono font-bold text-[#34d399] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                Signals Weakening Suspicion ({weakeningEvidence.length})
              </div>
              <ul className="space-y-1.5 text-xs text-[#cbd5e1]">
                {weakeningEvidence.length > 0 ? (
                  weakeningEvidence.map(e => (
                    <li key={e.id} className="flex items-start gap-1.5">
                      <span className="text-[#34d399] font-bold">•</span>
                      <span>{e.signal}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-[#64748b] italic">No reassuring institutional signals verified in text.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Observed Text vs Unverified Claims */}
        <div className="p-5 sm:p-6 border-t border-[#1e2636]">
          <h3 className="font-heading text-base font-bold text-white mb-1.5 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#bbf438]" />
            Evidence Boundary: Observed Text vs. Unverified Claims
          </h3>
          <p className="text-xs text-[#94a3b8] mb-4">
            Scams succeed when victims treat raw text assertions as verified truth. OfferShield rigorously separates what is present in the text from what remains completely unproven.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Observed Facts */}
            <div className="p-4 rounded-xl bg-[#121622] border border-[#20293b]">
              <div className="text-xs font-mono font-bold text-[#93c5fd] uppercase tracking-wider mb-2">
                [1] Factual Observations in Text
              </div>
              <ul className="space-y-2 text-xs text-[#cbd5e1]">
                {report.observedFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#3b82f6] font-mono mt-0.5">▸</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unverified Claims */}
            <div className="p-4 rounded-xl bg-[#16141a] border border-[#3b2b2b]">
              <div className="text-xs font-mono font-bold text-[#fca5a5] uppercase tracking-wider mb-2">
                [2] Unverified Claims by Sender
              </div>
              <ul className="space-y-2 text-xs text-[#cbd5e1]">
                {report.unverifiedClaims.map((claim, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#ef4444] font-mono mt-0.5">✕</span>
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Recommended Next Verification Steps */}
        <div className="p-5 sm:p-6 bg-[#0f131c] border-t border-[#1e2636]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#bbf438]" />
              Recommended Next Verification Steps
            </h3>
            <span className="text-xs text-[#64748b]">
              Interactive Safety Checklist
            </span>
          </div>
          <p className="text-xs text-[#94a3b8] mb-4">
            Follow these verified steps before sending any reply, payment, or identity document:
          </p>

          <div className="space-y-2.5">
            {report.nextSteps.map((step, idx) => {
              const isChecked = !!checkedSteps[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                    isChecked
                      ? 'bg-[#142018] border-[#22c55e]/40 text-[#86efac]'
                      : 'bg-[#121622] border-[#20293b] text-[#cbd5e1] hover:border-[#bbf438]/30'
                  }`}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === ' ' && toggleStep(idx)}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? 'bg-[#22c55e] border-[#22c55e] text-black'
                      : 'border-[#475569] bg-[#0d1017]'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-[#86efac]/80' : ''}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Analysis Scope & Limitations */}
        {report.limitations && report.limitations.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#0c1017] border-t border-[#1e2636]">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-2 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-[#fbbf24]" />
              Analysis Scope & Forensic Limitations
            </h3>
            <p className="text-xs text-[#64748b] mb-3">
              What text-based AI analysis cannot establish from pasted text alone:
            </p>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              {report.limitations.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#fbbf24] font-mono mt-0.5">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Actions in Card */}
        <div className="p-4 sm:p-5 bg-[#141924] border-t border-[#1f2838] flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-[#64748b] font-mono">
            {report.demoNotes}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black bg-[#bbf438] hover:bg-[#a3e635] transition-all shadow-md shadow-[#bbf438]/10"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share / Copy summary</span>
            </button>

            <button
              onClick={onNewScan}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#1e2637] hover:bg-[#2b354c] border border-[#2c374d] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#bbf438]" />
              <span>Scan another offer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
