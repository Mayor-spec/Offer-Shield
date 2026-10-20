export type RiskLevel = 'high' | 'medium' | 'low';
export type GeminiRiskLevel = 'HIGH_RISK' | 'NEEDS_VERIFICATION' | 'LOWER_APPARENT_RISK';

export interface EvidenceItem {
  id: string;
  phrase: string;
  exact_quote?: string;
  signal: string;
  whyItMatters: string;
  explanation?: string;
  sentiment: 'supports_suspicion' | 'weakens_suspicion';
  severity: 'critical' | 'warning' | 'info';
  quote_verified?: boolean;
}

export interface AnalysisReport {
  id: string;
  timestamp: number;
  inputText: string;
  title: string;
  category: 'scholarship' | 'internship' | 'recruitment' | 'job_offer' | 'general';
  riskLevel: RiskLevel;
  riskLabel: string;
  score: number; // 0 - 100
  verdict: string;
  summary: string;
  evidence: EvidenceItem[];
  observedFacts: string[];
  unverifiedClaims: string[];
  nextSteps: string[];
  reassuring_signals?: string[];
  missing_information?: string[];
  recommended_actions?: string[];
  limitations?: string[];
  isDemonstration: boolean;
  demoNotes: string;
  engine?: 'gemini' | 'demo';
  modelName?: string;
}

export interface SampleScenario {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  category: 'scholarship' | 'internship' | 'recruitment';
  text: string;
  report: AnalysisReport;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  title: string;
  category: string;
  riskLevel: RiskLevel;
  score: number;
  excerpt: string;
  report: AnalysisReport;
}

export interface GeminiAnalysisPayload {
  title: string;
  category: 'scholarship' | 'internship' | 'job_offer' | 'recruitment' | 'general';
  risk_level: GeminiRiskLevel;
  risk_score: number;
  verdict: string;
  summary: string;
  evidence: Array<{
    exact_quote: string;
    signal: string;
    explanation: string;
    severity: 'critical' | 'warning' | 'info';
    quote_verified?: boolean;
  }>;
  reassuring_signals: string[];
  missing_information: string[];
  recommended_actions: string[];
  limitations: string[];
}
