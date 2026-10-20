import { AnalysisReport, HistoryItem } from '../types/analyzer';

const STORAGE_KEY = 'offershield_scan_history_v1';

export function getScanHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    console.error('Failed to load scan history from localStorage:', e);
    return [];
  }
}

export function saveScanToHistory(report: AnalysisReport): HistoryItem[] {
  try {
    const existing = getScanHistory();
    // Excerpt from input text
    const cleanExcerpt = report.inputText
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 110) + (report.inputText.length > 110 ? '...' : '');

    const newItem: HistoryItem = {
      id: report.id,
      timestamp: report.timestamp,
      title: report.title || 'Evaluated Opportunity',
      category: report.category,
      riskLevel: report.riskLevel,
      score: report.score,
      excerpt: cleanExcerpt,
      report
    };

    // Filter out duplicate if re-scanning same id
    const filtered = existing.filter(item => item.id !== newItem.id);
    // Keep up to 20 most recent
    const updated = [newItem, ...filtered].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save scan to localStorage:', e);
    return getScanHistory();
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  try {
    const existing = getScanHistory();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove scan from localStorage:', e);
    return getScanHistory();
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear scan history:', e);
  }
}
