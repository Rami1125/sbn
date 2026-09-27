import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall';

interface PwaInstallButtonProps {
  variant?: 'header' | 'badge' | 'full';
  className?: string;
}

export const PwaInstallButton: React.FC<PwaInstallButtonProps> = ({
  variant = 'header',
  className = ''
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePwaInstall();
  const [showIosGuide, setShowIosGuide] = useState(false);

  // If app is already installed in standalone mode, hide button
  if (isInstalled) {
    return null;
  }

  // Handle Chrome / Edge / Android install prompt
  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIosGuide(true);
    } else {
      // General prompt if browser doesn't expose beforeinstallprompt directly
      setShowIosGuide(true);
    }
  };

  return (
    <>
      {variant === 'header' && (
        <button
          type="button"
          onClick={handleInstallClick}
          className={`flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer ${className}`}
          title="התקנת אפליקציית סבן למובייל (PWA)"
          aria-label="התקנת אפליקציה"
        >
          <Smartphone className="w-3.5 h-3.5 text-slate-950" />
          <span className="hidden sm:inline">התקן אפליקציה</span>
          <span className="sm:hidden">התקנה</span>
        </button>
      )}

      {variant === 'full' && (
        <button
          type="button"
          onClick={handleInstallClick}
          className={`w-full flex items-center justify-center gap-2 bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white font-black text-sm py-3 px-4 rounded-2xl shadow-md transition-all cursor-pointer ${className}`}
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>התקנת אפליקציית סבן במסך הבית</span>
        </button>
      )}

      {/* iOS Safari Guide Modal */}
      {showIosGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 text-right font-['Heebo','Assistant',sans-serif]"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="font-black text-base text-slate-900">
                  התקנת סבן באייפון / אייפד
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-800">
                באפשרותך להתקין את אפליקציית סבן ישירות למסך הבית ללא צורך בהורדה מ-App Store:
              </p>

              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F3E7A] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    1
                  </span>
                  <span>
                    לחץ על כפתור ה-<strong>Share (שתף)</strong> <Share className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> בסרגל התחתון של דפדפן Safari.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F3E7A] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    2
                  </span>
                  <span>
                    גלול מעט מטה ולחץ על <strong>"הוסף למסך הבית" (Add to Home Screen)</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-slate-700" />.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F3E7A] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    3
                  </span>
                  <span>
                    לחץ על <strong>הוסף (Add)</strong> בפינה העליונה — והאפליקציה תופיע במסך הבית שלך עם גישה מיידית לאיסוף מהיר.
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              הבנתי, תודה!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
