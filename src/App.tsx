import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InputPanel } from './components/InputPanel';
import { LoadingAnalysis } from './components/LoadingAnalysis';
import { ReportView } from './components/ReportView';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ScanHistoryDrawer } from './components/ScanHistoryDrawer';
import { HowItWorksModal } from './components/HowItWorksModal';
import { ScamGuideModal } from './components/ScamGuideModal';
import { Footer } from './components/Footer';
import { AnalysisReport, HistoryItem } from './types/analyzer';
import { analyzeOfferText, analyzeOfferTextDemo } from './services/analyzer';
import { 
  getScanHistory, 
  saveScanToHistory, 
  deleteHistoryItem, 
  clearAllHistory 
} from './services/storage';
import { SAMPLE_SCENARIOS, AMBIGUOUS_SAMPLE, BENCHMARK_LOW_RISK_SAMPLE } from './data/samples';
import { AlertTriangle, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [currentReport, setCurrentReport] = useState<AnalysisReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<{ message: string; code?: string } | null>(null);

  // History & Modals
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [isScamGuideOpen, setIsScamGuideOpen] = useState<boolean>(false);

  // Load history on mount
  useEffect(() => {
    const loaded = getScanHistory();
    setHistory(loaded);
  }, []);

  // Keyboard shortcut listener for Esc to close drawers/modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsHistoryOpen(false);
        setIsHowItWorksOpen(false);
        setIsScamGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAnalyze = async (textToScan: string) => {
    if (!textToScan.trim()) {
      setValidationError('Please paste or type the offer text you want to evaluate.');
      return;
    }

    setValidationError(null);
    setApiError(null);
    setIsAnalyzing(true);
    setCurrentReport(null);

    // Scroll smoothly to top for focus
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const [report] = await Promise.all([
        analyzeOfferText(textToScan),
        new Promise(resolve => setTimeout(resolve, 1200)) // smooth scanning perception
      ]);

      setCurrentReport(report);
      // Persist to local history
      const updatedHistory = saveScanToHistory(report);
      setHistory(updatedHistory);
    } catch (err: any) {
      console.error('Analysis error:', err);
      const userMessage = err?.message || 'Unable to complete AI analysis at this time.';
      setApiError({
        message: userMessage,
        code: err?.code || 'ANALYSIS_ERROR'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunDemoAnalysis = async (textToScan: string) => {
    if (!textToScan.trim()) return;
    setValidationError(null);
    setApiError(null);
    setIsAnalyzing(true);
    setCurrentReport(null);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const [report] = await Promise.all([
        analyzeOfferTextDemo(textToScan),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);

      setCurrentReport(report);
      const updatedHistory = saveScanToHistory(report);
      setHistory(updatedHistory);
    } catch (err: any) {
      console.error('Demo analysis error:', err);
      setValidationError('Failed to generate demonstration report.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewScan = () => {
    setCurrentReport(null);
    setIsAnalyzing(false);
    setValidationError(null);
    setApiError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSampleFromId = (sampleId: string) => {
    setApiError(null);
    if (sampleId === 'sample-ambiguous') {
      setInputText(AMBIGUOUS_SAMPLE.text);
    } else if (sampleId === 'benchmark-low') {
      setInputText(BENCHMARK_LOW_RISK_SAMPLE.text);
    } else {
      const found = SAMPLE_SCENARIOS.find(s => s.id === sampleId);
      if (found) {
        setInputText(found.text);
      }
    }
    handleNewScan();
  };

  const handleOpenHistoricalReport = (item: HistoryItem) => {
    setCurrentReport(item.report);
    setInputText(item.report.inputText);
    setApiError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const handleClearHistory = () => {
    clearAllHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#f4f4f6] flex flex-col selection:bg-[#bbf438] selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenScamGuide={() => setIsScamGuideOpen(true)}
        isViewingReport={!!currentReport}
        onNewScan={handleNewScan}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Loading Scanning State */}
        {isAnalyzing ? (
          <div className="py-12 sm:py-20">
            <LoadingAnalysis />
          </div>
        ) : currentReport ? (
          /* Report View */
          <div className="animate-in fade-in duration-300">
            <ReportView
              report={currentReport}
              onNewScan={handleNewScan}
              onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
            />
          </div>
        ) : (
          /* Input / Exploration View */
          <div className="space-y-8 animate-in fade-in duration-300">
            <Hero />

            {/* API Error Banner if request failed */}
            {apiError && (
              <div className="w-full max-w-4xl mx-auto p-4 rounded-xl bg-[#241316] border border-[#ef4444]/40 text-xs text-[#fca5a5] space-y-2.5 shadow-lg">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <AlertTriangle className="w-4 h-4 text-[#ef4444] shrink-0" />
                  <span>AI Analysis Request: {apiError.message}</span>
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  OfferShield did not fall back to silent mock results to maintain analysis transparency. You can retry the live Gemini call or inspect the opportunity with our clearly labelled offline demonstration analyzer.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => handleAnalyze(inputText)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ef4444] text-white font-medium hover:bg-[#dc2626] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Gemini Analysis</span>
                  </button>
                  <button
                    onClick={() => handleRunDemoAnalysis(inputText)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#172030] text-[#bbf438] border border-[#2b3a52] hover:bg-[#1f2b40] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run Labeled Demonstration Analyzer</span>
                  </button>
                </div>
              </div>
            )}
            
            <InputPanel
              inputText={inputText}
              setInputText={setInputText}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              validationError={validationError}
              setValidationError={setValidationError}
            />

            <HowItWorksSection onSelectSample={handleSelectSampleFromId} />
          </div>
        )}
      </main>

      {/* History Drawer */}
      <ScanHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectScan={handleOpenHistoricalReport}
        onDeleteScan={handleDeleteHistoryItem}
        onClearAll={handleClearHistory}
      />

      {/* How It Works Guidance Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onTrySample={handleSelectSampleFromId}
      />

      {/* Common Scam Patterns Playbook Modal */}
      <ScamGuideModal
        isOpen={isScamGuideOpen}
        onClose={() => setIsScamGuideOpen(false)}
        onTrySample={handleSelectSampleFromId}
      />

      {/* Footer */}
      <Footer
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenScamGuide={() => setIsScamGuideOpen(true)}
      />
    </div>
  );
}
