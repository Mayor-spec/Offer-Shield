import React from 'react';
import { 
  X, 
  History, 
  Trash2, 
  ArrowRight, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  HardDrive
} from 'lucide-react';
import { HistoryItem, RiskLevel } from '../types/analyzer';

interface ScanHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectScan: (item: HistoryItem) => void;
  onDeleteScan: (id: string) => void;
  onClearAll: () => void;
}

export const ScanHistoryDrawer: React.FC<ScanHistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectScan,
  onDeleteScan,
  onClearAll
}) => {
  if (!isOpen) return null;

  const getBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'high':
        return {
          bg: 'bg-[#3b1219] text-[#fca5a5] border-[#ef4444]/30',
          icon: <ShieldAlert className="w-3.5 h-3.5 text-[#ef4444]" />,
          label: 'High risk'
        };
      case 'medium':
        return {
          bg: 'bg-[#3d2c10] text-[#fcd34d] border-[#f59e0b]/30',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-[#fbbf24]" />,
          label: 'Needs verification'
        };
      case 'low':
      default:
        return {
          bg: 'bg-[#0d2e23] text-[#6ee7b7] border-[#10b981]/30',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" />,
          label: 'Lower apparent risk'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#0d1118] border-l border-[#1e2637] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1c2435] flex items-center justify-between bg-[#121622]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#182133] border border-[#27344c] flex items-center justify-center">
              <History className="w-4 h-4 text-[#bbf438]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base">
                Scan History
              </h3>
              <p className="text-[11px] text-[#718096]">
                {history.length} {history.length === 1 ? 'record' : 'records'} cached
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#182030] text-[#94a3b8] hover:text-white flex items-center justify-center border border-[#263249] transition-colors"
            aria-label="Close scan history"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Local Storage Privacy Banner */}
        <div className="p-3 bg-[#111722] border-b border-[#1a2333] flex items-start gap-2.5 text-xs text-[#94a3b8]">
          <HardDrive className="w-4 h-4 text-[#bbf438] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Strict Device Privacy:</strong> Local scan history stays on your current browser. No text or scan reports are ever transmitted to remote databases.
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="py-16 text-center text-[#64748b] space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#141926] border border-[#222c3f] flex items-center justify-center text-[#4b5563]">
                <History className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-white">No scans in local history yet</p>
              <p className="text-xs text-[#94a3b8] max-w-xs mx-auto">
                Any offer you evaluate will be saved here so you can review previous risk assessments at any time.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const badge = getBadge(item.riskLevel);
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#121622] border border-[#1f283a] hover:border-[#bbf438]/40 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border ${badge.bg}`}>
                      {badge.icon}
                      {badge.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      {item.score}/100
                    </span>
                  </div>

                  <h4 
                    onClick={() => {
                      onSelectScan(item);
                      onClose();
                    }}
                    className="font-heading text-sm font-semibold text-white group-hover:text-[#bbf438] cursor-pointer transition-colors line-clamp-1 mb-1"
                  >
                    {item.title}
                  </h4>

                  <p className="text-xs text-[#94a3b8] line-clamp-2 mb-3 font-sans">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1a2335] text-[11px] text-[#64748b]">
                    <span>{new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDeleteScan(item.id)}
                        className="p-1 hover:text-[#f87171] transition-colors"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          onSelectScan(item);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 font-semibold text-[#bbf438] hover:underline"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Clear All */}
        {history.length > 0 && (
          <div className="p-4 border-t border-[#1c2435] bg-[#121622] flex items-center justify-between">
            <button
              onClick={() => {
                if (confirm('Clear all local scan history on this device?')) {
                  onClearAll();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#94a3b8] hover:text-[#f87171] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear local history</span>
            </button>

            <span className="text-[11px] text-[#64748b] font-mono">
              OfferShield Client
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
