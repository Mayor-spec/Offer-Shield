import { AnalysisReport, EvidenceItem, GeminiAnalysisPayload, RiskLevel } from '../types/analyzer';
import { SAMPLE_SCENARIOS, BENCHMARK_LOW_RISK_SAMPLE } from '../data/samples';

export interface ApiStatus {
  configured: boolean;
  model: string;
  mode: string;
}

export async function checkApiStatus(): Promise<ApiStatus> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) {
      return { configured: false, model: 'gemini-3.8-flash', mode: 'offline' };
    }
    const data = await res.json();
    return {
      configured: Boolean(data.configured),
      model: data.model || 'gemini-3.8-flash',
      mode: data.mode || 'unknown'
    };
  } catch {
    return { configured: false, model: 'gemini-3.8-flash', mode: 'offline' };
  }
}

/**
 * Primary analysis function: calls the server-side Gemini 3.8 Flash analysis endpoint.
 * Validates inputs, handles server-side errors, and maps structured JSON.
 * Throws clean, user-friendly errors if the API call fails (never silently falling back to mock).
 */
export async function analyzeOfferText(text: string): Promise<AnalysisReport> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('Please paste or type the offer text you want to evaluate.');
  }
  if (trimmed.length < 15) {
    throw new Error('The submitted text is too short. Please provide at least 15 characters of the offer or communication.');
  }
  if (trimmed.length > 25000) {
    throw new Error('The submitted text exceeds the 25,000 character limit. Please shorten or provide only the relevant sections.');
  }

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: trimmed }),
  });

  const resJson = await response.json().catch(() => null);

  if (!response.ok || !resJson || resJson.status !== 'success') {
    const errorMsg = resJson?.message || 'Failed to complete AI analysis. Please verify your connection and try again.';
    const error = new Error(errorMsg);
    (error as any).code = resJson?.error || 'SERVER_ERROR';
    (error as any).status = response.status;
    throw error;
  }

  const payload: GeminiAnalysisPayload = resJson.data;
  return mapGeminiPayloadToReport(payload, trimmed);
}

/**
 * Converts structured Gemini API payload to the application's AnalysisReport format.
 */
function mapGeminiPayloadToReport(payload: GeminiAnalysisPayload, originalText: string): AnalysisReport {
  // Map risk level
  let riskLevel: RiskLevel = 'low';
  let riskLabel = 'Lower apparent risk';

  if (payload.risk_level === 'HIGH_RISK') {
    riskLevel = 'high';
    riskLabel = 'High risk';
  } else if (payload.risk_level === 'NEEDS_VERIFICATION') {
    riskLevel = 'medium';
    riskLabel = 'Needs verification';
  } else {
    riskLevel = 'low';
    riskLabel = 'Lower apparent risk';
  }

  // Map red flag evidence
  const evidenceItems: EvidenceItem[] = (payload.evidence || []).map((item, idx) => ({
    id: `ev-ai-${idx + 1}`,
    phrase: item.exact_quote || '',
    exact_quote: item.exact_quote,
    signal: item.signal,
    whyItMatters: item.explanation,
    explanation: item.explanation,
    sentiment: 'supports_suspicion',
    severity: item.severity || 'warning',
    quote_verified: item.quote_verified ?? true,
  }));

  // Reassuring signals added as weakening evidence items
  const reassuringItems: EvidenceItem[] = (payload.reassuring_signals || []).map((sig, idx) => ({
    id: `ev-reassure-${idx + 1}`,
    phrase: sig,
    signal: sig,
    whyItMatters: 'Observed factor that aligns with standard, legitimate hiring or institutional practices.',
    explanation: 'Observed factor that aligns with standard, legitimate hiring or institutional practices.',
    sentiment: 'weakens_suspicion',
    severity: 'info',
  }));

  const allEvidence = [...evidenceItems, ...reassuringItems];

  // Observed facts
  const observedFacts = [
    ...(payload.reassuring_signals && payload.reassuring_signals.length > 0 
        ? payload.reassuring_signals 
        : ['Text was parsed for structural fraud, advance-fee, and urgency indicators.']),
    `Verified verbatim signal extracts: ${evidenceItems.length} red flag indicators identified.`
  ];

  return {
    id: `ai-scan-${Date.now()}`,
    timestamp: Date.now(),
    inputText: originalText,
    title: payload.title || 'Evaluated Opportunity Analysis',
    category: payload.category || 'general',
    riskLevel,
    riskLabel,
    score: Math.max(0, Math.min(100, Math.round(payload.risk_score))),
    verdict: payload.verdict,
    summary: payload.summary,
    evidence: allEvidence,
    observedFacts,
    unverifiedClaims: payload.missing_information || [
      'Authentic domain ownership and email transmission headers cannot be verified from raw pasted text.',
      'Any corporate registration numbers, tax IDs, or staff profiles require direct external validation.'
    ],
    nextSteps: payload.recommended_actions || [
      'Do not remit any payments, wire transfers, or gift card codes.',
      'Verify the recruiter identity directly via official corporate channels.'
    ],
    reassuring_signals: payload.reassuring_signals || [],
    missing_information: payload.missing_information || [],
    recommended_actions: payload.recommended_actions || [],
    limitations: payload.limitations || [
      'Text-based forensic analysis cannot inspect private email headers, DKIM records, or live domain registrant databases.',
      'Absence of detected red flags does not confirm an offer is safe; sophisticated fraud can mimic standard correspondence.'
    ],
    isDemonstration: false,
    demoNotes: 'Live AI analysis powered by Gemini 3.8 Flash. Risk score represents an estimated risk indicator, not a statistical probability.',
    engine: 'gemini',
    modelName: 'gemini-3.8-flash',
  };
}

/**
 * Optional labeled Demonstration Evaluator:
 * Retained exclusively for labeled demo comparisons and testing when explicitly triggered.
 */
export async function analyzeOfferTextDemo(text: string): Promise<AnalysisReport> {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // Match sample 1: Scholarship
  if (lower.includes('global merit') || lower.includes('global academic excellence') || (lower.includes('scholarship') && lower.includes('$85'))) {
    const s = SAMPLE_SCENARIOS.find(x => x.id === 'sample-scholarship');
    if (s) {
      return {
        ...s.report,
        id: `demo-report-${Date.now()}`,
        timestamp: Date.now(),
        inputText: text,
        isDemonstration: true,
        engine: 'demo',
        demoNotes: 'Demonstration analysis report calibrated to standard FTC, FBI IC3, and university student employment fraud advisory databases.',
      };
    }
  }

  // Match sample 2: Internship / Check scam
  if (lower.includes('apex global') || (lower.includes('cashier') && lower.includes('equipment') && lower.includes('macbook'))) {
    const s = SAMPLE_SCENARIOS.find(x => x.id === 'sample-internship');
    if (s) {
      return {
        ...s.report,
        id: `demo-report-${Date.now()}`,
        timestamp: Date.now(),
        inputText: text,
        isDemonstration: true,
        engine: 'demo',
        demoNotes: 'Demonstration analysis report calibrated to FBI IC3 Fake Check Scams and NACE recruiting ethics guidelines.',
      };
    }
  }

  // Match sample 3: Telegram recruiter / SSN
  if (lower.includes('biosphere') || (lower.includes('telegram') && lower.includes('ssn') && lower.includes('sarah jenkins'))) {
    const s = SAMPLE_SCENARIOS.find(x => x.id === 'sample-recruitment');
    if (s) {
      return {
        ...s.report,
        id: `demo-report-${Date.now()}`,
        timestamp: Date.now(),
        inputText: text,
        isDemonstration: true,
        engine: 'demo',
        demoNotes: 'Demonstration analysis report calibrated to National Cyber Security Alliance (NCSA) and FTC Job Phishing guidance.',
      };
    }
  }

  // Match benchmark low risk
  if (lower.includes('library student assistant') || lower.includes('circulation team') || (lower.includes('jobs.university.edu') && lower.includes('16.50'))) {
    return {
      ...BENCHMARK_LOW_RISK_SAMPLE.report,
      id: `demo-report-${Date.now()}`,
      timestamp: Date.now(),
      inputText: text,
      isDemonstration: true,
      engine: 'demo',
      demoNotes: 'Demonstration analysis report calibrated against standard collegiate on-campus student employment postings.',
    };
  }

  // Fallback demo for custom text if requested
  return {
    id: `demo-scan-${Date.now()}`,
    timestamp: Date.now(),
    inputText: text,
    title: 'Demonstration Opportunity Evaluation',
    category: 'general',
    riskLevel: 'medium',
    riskLabel: 'Needs verification',
    score: 55,
    verdict: 'Demonstration evaluation generated in offline mode. Live Gemini analysis was not invoked for this report.',
    summary: 'This is an illustrative offline report. To receive real-time neural fraud analysis, ensure the Gemini 3.8 Flash backend is active.',
    evidence: [
      {
        id: 'ev-demo-1',
        phrase: text.substring(0, Math.min(text.length, 60)),
        signal: 'Unverified opportunity text',
        whyItMatters: 'Demonstration mode does not execute full deep reasoning. Independent verification recommended.',
        sentiment: 'supports_suspicion',
        severity: 'warning'
      }
    ],
    observedFacts: ['Demonstration sample analyzed offline.'],
    unverifiedClaims: ['Opportunity authenticity requires live verification.'],
    nextSteps: ['Verify opportunity directly with official employer careers portal.'],
    isDemonstration: true,
    demoNotes: 'Clearly labelled offline demonstration report.',
    engine: 'demo',
  };
}
