import React, { useState } from 'react';
import { 
  Sparkles, 
  Trash2, 
  ClipboardPaste, 
  AlertTriangle, 
  ShieldAlert, 
  GraduationCap, 
  Briefcase, 
  MessageSquare,
  ArrowRight,
  Info
} from 'lucide-react';
import { SAMPLE_SCENARIOS, BENCHMARK_LOW_RISK_SAMPLE, AMBIGUOUS_SAMPLE } from '../data/samples';

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
  validationError: string | null;
  setValidationError: (err: string | null) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  inputText,
  setInputText,
  onAnalyze,
  isAnalyzing,
  validationError,
  setValidationError
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const characterCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const handleClear = () => {
    setInputText('');
    setSelectedSampleId(null);
    setValidationError(null);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        setSelectedSampleId(null);
        setValidationError(null);
      }
    } catch {
      // Clipboard access might be blocked in some iframe contexts
      const promptText = prompt('Paste your offer text here:');
      if (promptText) {
        setInputText(promptText);
        setSelectedSampleId(null);
        setValidationError(null);
      }
    }
  };

  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_SCENARIOS.find(s => s.id === sampleId);
    if (sample) {
      setInputText(sample.text);
      setSelectedSampleId(sample.id);
      setValidationError(null);
    }
  };

  const handleSelectAmbiguous = () => {
    setInputText(AMBIGUOUS_SAMPLE.text);
    setSelectedSampleId('sample-ambiguous');
    setValidationError(null);
  };

  const handleSelectBenchmark = () => {
    setInputText(BENCHMARK_LOW_RISK_SAMPLE.text);
    setSelectedSampleId('benchmark-low');
    setValidationError(null);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) {
      setValidationError('Please paste or type the offer text, email, or recruitment message you want to evaluate.');
      return;
    }
    if (inputText.trim().length < 20) {
      setValidationError('Please provide a bit more context (at least 20 characters) so OfferShield can analyze the opportunity.');
      return;
    }
    setValidationError(null);
    onAnalyze(inputText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Sample Selectors Row */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <label className="text-xs font-mono font-medium text-[#94a3b8] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#bbf438]" />
            Try a realistic sample scenario
          </label>
          <span className="text-xs text-[#64748b] hidden sm:inline">
            Click to auto-populate
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Sample 1: Scholarship */}
          <button
            type="button"
            onClick={() => handleSelectSample('sample-scholarship')}
            className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
              selectedSampleId === 'sample-scholarship'
                ? 'bg-[#151f15] border-[#bbf438]/60 text-white shadow-lg shadow-[#bbf438]/5'
                : 'bg-[#121620] border-[#1f2737] hover:border-[#2e3b52] text-[#cbd5e1]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#241a1a] text-[#f87171] border border-[#452222]">
                <GraduationCap className="w-3 h-3" />
                Scholarship Scam
              </span>
              <span className="text-[10px] font-mono text-[#bbf438]">94/100 Risk</span>
            </div>
            <div className="font-heading text-sm font-semibold text-white">
              Global Merit Grant
            </div>
            <p className="text-xs text-[#94a3b8] mt-0.5 line-clamp-1">
              $12,500 grant with an urgent $85 processing fee
            </p>
          </button>

          {/* Sample 2: Internship */}
          <button
            type="button"
            onClick={() => handleSelectSample('sample-internship')}
            className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
              selectedSampleId === 'sample-internship'
                ? 'bg-[#151f15] border-[#bbf438]/60 text-white shadow-lg shadow-[#bbf438]/5'
                : 'bg-[#121620] border-[#1f2737] hover:border-[#2e3b52] text-[#cbd5e1]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#291b16] text-[#fb923c] border border-[#4a2e20]">
                <Briefcase className="w-3 h-3" />
                Internship Check Scam
              </span>
              <span className="text-[10px] font-mono text-[#bbf438]">96/100 Risk</span>
            </div>
            <div className="font-heading text-sm font-semibold text-white">
              Remote AI Intern ($48/hr)
            </div>
            <p className="text-xs text-[#94a3b8] mt-0.5 line-clamp-1">
              Counterfeit check for MacBook & IT equipment
            </p>
          </button>

          {/* Sample 3: Job Recruitment */}
          <button
            type="button"
            onClick={() => handleSelectSample('sample-recruitment')}
            className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
              selectedSampleId === 'sample-recruitment'
                ? 'bg-[#151f15] border-[#bbf438]/60 text-white shadow-lg shadow-[#bbf438]/5'
                : 'bg-[#121620] border-[#1f2737] hover:border-[#2e3b52] text-[#cbd5e1]'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1.5">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#241a1a] text-[#f87171] border border-[#452222]">
                <MessageSquare className="w-3 h-3" />
                Telegram Recruiter
              </span>
              <span className="text-[10px] font-mono text-[#bbf438]">89/100 Risk</span>
            </div>
            <div className="font-heading text-sm font-semibold text-white">
              Healthcare DM Phishing
            </div>
            <p className="text-xs text-[#94a3b8] mt-0.5 line-clamp-1">
              Same-day text interview harvesting SSN & ID photos
            </p>
          </button>
        </div>

        {/* Quick Test Benchmarks Row */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[#64748b]">
            Need more test cases?
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSelectAmbiguous}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                selectedSampleId === 'sample-ambiguous'
                  ? 'bg-[#2b2012] border-[#f59e0b]/60 text-[#fcd34d]'
                  : 'bg-[#141924] border-[#222d3e] text-[#cbd5e1] hover:border-[#f59e0b]/40'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
              <span>Ambiguous Offer (Needs Verification)</span>
            </button>

            <button
              type="button"
              onClick={handleSelectBenchmark}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                selectedSampleId === 'benchmark-low'
                  ? 'bg-[#0f231c] border-[#10b981]/60 text-[#a7f3d0]'
                  : 'bg-[#141924] border-[#222d3e] text-[#cbd5e1] hover:border-[#10b981]/40'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>Reassuring On-Campus Job (.edu)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Card Panel */}
      <div className="bg-[#10141d] border border-[#1e2636] rounded-2xl shadow-xl overflow-hidden focus-within:border-[#bbf438]/50 focus-within:ring-1 focus-within:ring-[#bbf438]/30 transition-all">
        {/* Panel Toolbar */}
        <div className="px-4 py-2.5 bg-[#141924] border-b border-[#1e2636] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
            <span className="font-medium text-white">Offer Text Inspector</span>
            <span className="text-[#4b5563]">•</span>
            <span>Paste email headers, message transcripts, or job listing</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#cbd5e1] hover:text-white bg-[#1a2130] hover:bg-[#232c3f] rounded-md transition-colors"
              title="Paste from clipboard"
            >
              <ClipboardPaste className="w-3.5 h-3.5 text-[#bbf438]" />
              <span className="hidden sm:inline">Paste</span>
            </button>

            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#94a3b8] hover:text-[#f87171] bg-[#1a2130] hover:bg-[#2b181b] rounded-md transition-colors"
                title="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="p-4 sm:p-5">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (validationError) setValidationError(null);
            }}
            onKeyDown={handleKeyDown}
            rows={8}
            placeholder="Paste the full offer email, job announcement, WhatsApp/Telegram chat, or scholarship notice here...&#10;&#10;e.g. 'Congratulations! You have been selected for our remote assistant cohort paying $50/hr. Deposit this $3,500 cashier's check to purchase your home equipment from our certified vendor...'"
            className="w-full bg-transparent text-[#f4f4f6] placeholder-[#475569] text-sm sm:text-base leading-relaxed resize-y min-h-[180px] focus:outline-none font-sans"
            aria-label="Opportunity text to analyze"
          />

          {/* Validation Error Message */}
          {validationError && (
            <div className="mt-3 p-3 rounded-lg bg-[#2b1418] border border-[#ef4444]/40 flex items-start gap-2.5 text-xs text-[#fca5a5]">
              <AlertTriangle className="w-4 h-4 text-[#f87171] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Input required: </span>
                {validationError}
              </div>
            </div>
          )}

          {/* Character and Word Counter + Action Bar */}
          <div className="mt-4 pt-3 border-t border-[#1a2130] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs font-mono text-[#64748b]">
              <span>{characterCount.toLocaleString()} chars</span>
              <span>•</span>
              <span>{wordCount.toLocaleString()} words</span>
              {characterCount > 0 && (
                <span className="text-[11px] text-[#475569] hidden md:inline">
                  (Press <kbd className="px-1 py-0.5 rounded bg-[#1c2433] text-[#94a3b8]">Cmd</kbd>+<kbd className="px-1 py-0.5 rounded bg-[#1c2433] text-[#94a3b8]">Enter</kbd> to analyze)
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isAnalyzing}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm tracking-wide transition-all ${
                isAnalyzing
                  ? 'bg-[#1e2637] text-[#64748b] cursor-not-allowed'
                  : 'bg-[#bbf438] hover:bg-[#a3e635] text-black shadow-lg shadow-[#bbf438]/15 active:scale-[0.98]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{isAnalyzing ? 'Analyzing signals...' : 'Analyze offer'}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mt-3.5 px-3 py-2 rounded-xl bg-[#0e121a] border border-[#1b2230] flex items-center justify-between gap-3 text-xs text-[#718096]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#fbbf24] shrink-0" />
          <span>
            <strong className="text-[#a0aec0]">Analyze carefully:</strong> Never submit passwords, bank details, or sensitive personal information.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#4b5563]">
          <Info className="w-3.5 h-3.5" />
          <span>Local client evaluation</span>
        </div>
      </div>
    </div>
  );
};
