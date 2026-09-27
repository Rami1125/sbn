import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-3 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-md text-xs font-['Heebo','Assistant',sans-serif] animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
        <WifiOff className="w-4 h-4 animate-pulse" />
      </div>
      <div>
        <div className="font-bold text-white flex items-center gap-1.5">
          <span>מצב לא מקוון (Offline)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-ping" />
        </div>
        <div className="text-[11px] text-slate-300">
          הקטלוג זמין מקומית דרך ה-Service Worker של סבן
        </div>
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mr-2 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
        title="נסה לטעון מחדש"
      >
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
