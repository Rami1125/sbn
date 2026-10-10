import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Cpu, CheckCircle2, Loader2 } from 'lucide-react';

interface VisualThinkingIndicatorProps {
  statusText?: string;
  isCompact?: boolean;
}

const DEFAULT_THINKING_STEPS = [
  'מנתחת מפרט טכני, כושר כיסוי ותווי תקן...',
  'מאמתת נתוני מניפה מול שרתי טמבור ונירלט ברשת...',
  'מחשבת יחסי דילול, זמני ייבוש וכמויות מומלצות...',
  'מגבשת מענה הנדסי מדויק והמלצות נלוות...'
];

export const VisualThinkingIndicator: React.FC<VisualThinkingIndicatorProps> = ({
  statusText,
  isCompact = false
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % DEFAULT_THINKING_STEPS.length);
    }, 1100);
    return () => clearInterval(timer);
  }, []);

  if (isCompact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-500/10 border border-amber-400/40 text-xs text-slate-800 shadow-sm animate-pulse">
        <Brain className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
        <span className="font-bold text-[#0F3E7A]">נועה Ai חושבת:</span>
        <span className="text-slate-600 truncate max-w-[220px]">
          {statusText || DEFAULT_THINKING_STEPS[currentStepIndex]}
        </span>
        <span className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F3E7A]" />
        </span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#0B2545] to-[#041427] text-white p-4 sm:p-5 border border-amber-400/30 shadow-xl shadow-blue-950/20">
      {/* Background Neural Glow Gradients */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/30">
            <Brain className="w-4 h-4 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-white tracking-wide">
                חשיבה ויזואלית פעילה
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                Visual Thinking
              </span>
            </div>
            <div className="text-[11px] text-blue-200">
              נועה מעבדת את המפרט הטכני והגוון...
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-amber-300 font-mono">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
          <span>REALTIME AI</span>
        </div>
      </div>

      {/* Progress Bars / Synapse Lines */}
      <div className="space-y-2 relative z-10">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStepIndex + 1) / DEFAULT_THINKING_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Dynamic Thought Milestone */}
        <div className="flex items-center gap-2 py-1 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-blue-100">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-pulse" />
          <span className="font-semibold text-amber-200 shrink-0">שלב עיבוד:</span>
          <span className="truncate text-white">
            {statusText || DEFAULT_THINKING_STEPS[currentStepIndex]}
          </span>
        </div>
      </div>

      {/* Thinking steps tags */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] relative z-10">
        {DEFAULT_THINKING_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div
              key={idx}
              className={`p-1.5 rounded-lg border transition-all text-center truncate ${
                isCurrent
                  ? 'bg-amber-400/20 border-amber-400/60 text-amber-200 font-bold'
                  : isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-white/5 border-white/5 text-slate-400'
              }`}
            >
              <span className="ml-1 font-mono">{idx + 1}.</span>
              {idx === 0 && 'מפרט טכני'}
              {idx === 1 && 'אימות מניפה'}
              {idx === 2 && 'חישוב כיסוי'}
              {idx === 3 && 'מענה והמלצות'}
            </div>
          );
        })}
      </div>
    </div>
  );
};
