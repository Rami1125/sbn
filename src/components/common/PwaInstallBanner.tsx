import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Zap } from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall';

export const PwaInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePwaInstall();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [showIosModal, setShowIosModal] = useState<boolean>(false);

  useEffect(() => {
    // Check if user dismissed recently
    const dismissedTime = localStorage.getItem('saban_pwa_banner_dismissed');
    if (dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 1000 * 60 * 60 * 24 * 3) {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('saban_pwa_banner_dismissed', Date.now().toString());
  };

  if (isInstalled || isDismissed) {
    return null;
  }

  // Only show banner on mobile or if installable/iOS
  return (
    <div className="bg-gradient-to-r from-[#072244] via-[#0F3E7A] to-[#16529e] text-white px-4 py-2.5 shadow-md border-b border-blue-900/40 font-['Heebo','Assistant',sans-serif] text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-xs">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="font-black text-amber-300 ml-1.5 inline-flex items-center gap-1">
              <Zap className="w-3 h-3 fill-amber-300" />
              אפליקציית סבן PRO:
            </span>
            <span className="text-blue-100 hidden sm:inline">
              התקן למסך הבית להזמנות איסוף מהירות מהסניפים (BOPIS) ועדכוני מלאי מיידיים.
            </span>
            <span className="text-blue-100 sm:hidden">
              התקן במסך הבית לאיסוף מהיר מהסניפים.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={async () => {
              if (isInstallable) {
                await install();
              } else {
                setShowIosModal(true);
              }
            }}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>התקן עכשיו</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="סגור הודעה"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showIosModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-800 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-sm text-[#0F3E7A]">התקנה מהירה באייפון (iOS Safari)</h3>
              <button
                type="button"
                onClick={() => setShowIosModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 my-3 leading-relaxed">
              לחץ על כפתור <strong>שיתוף</strong> בספארי ולאחר מכן בחר ב-<strong>"הוסף למסך הבית"</strong>.
            </p>
            <button
              type="button"
              onClick={() => setShowIosModal(false)}
              className="w-full bg-[#0F3E7A] text-white py-2 rounded-xl font-bold text-xs"
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
