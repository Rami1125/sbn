import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Paintbrush,
  Package,
  Building2,
  User,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  Volume2,
  Check
} from 'lucide-react';
import { playOrderReadyChime } from '../../lib/oneSignal';
import { getLoggedInMember } from '../../types/auth';

export type NoaLogisticsStatus =
  | 'waiting_desk'
  | 'received_starting'
  | 'in_progress'
  | 'shade_qty_approved'
  | 'payment_required'
  | 'tinting_active'
  | 'ready_for_pickup';

export interface NoaTimelineStep {
  key: NoaLogisticsStatus;
  stepNumber: number;
  label: string;
  description: string;
  badge: string;
}

export const NOA_TIMELINE_STEPS: NoaTimelineStep[] = [
  {
    key: 'waiting_desk',
    stepNumber: 1,
    label: 'ממתין לקבלת דלפק הסניף',
    description: 'ההזמנה שודרה למחשב הדלפק המרכזי וממתינה לשיוך לנציג שירות.',
    badge: 'שידור נקלט'
  },
  {
    key: 'received_starting',
    stepNumber: 2,
    label: 'הזמנה התקבלה בסניף – מתחילים טיפול',
    description: 'נציג הדלפק בסניף אישר את הקליטה ופתח כרטיס עבודה לוגיסטי.',
    badge: 'נפתח כרטיס'
  },
  {
    key: 'in_progress',
    stepNumber: 3,
    label: 'סטטוס בטיפול',
    description: 'בדיקת מלאי בסיס וצבענים. אפשרות צ׳אט ישיר מול איש הדלפק בסניף.',
    badge: 'בטיפול שירותי'
  },
  {
    key: 'shade_qty_approved',
    stepNumber: 4,
    label: 'אושר הגוון וכמות נדרשת מצד הסניף',
    description: 'ספק הצבע (טמבור/נירלט) והנוסחה הממוחשבת אומתו ואושרו ליישום.',
    badge: 'גוון מאושר'
  },
  {
    key: 'payment_required',
    stepNumber: 5,
    label: 'נדרש חיוב לפני גיוון',
    description: 'אישור חיוב מהיר בכרטיס אשראי או טלפונית לפני הזרקת הצבענים.',
    badge: 'אישור חיוב'
  },
  {
    key: 'tinting_active',
    stepNumber: 6,
    label: 'גיוון פעיל',
    description: 'הפח הוזן למכונת הגיוון האוטומטית והשקשוקה הממוחשבת בעיצומה.',
    badge: 'מכונה בפעולה'
  },
  {
    key: 'ready_for_pickup',
    stepNumber: 7,
    label: 'מוכן לאיסוף מהסניף',
    description: 'המוצר מוכן ברציף איסוף מהיר (BOPIS). המתן לקבלת החבילה ללא תור.',
    badge: 'מוכן ברציף'
  }
];

interface NoaOrderStatusTimelineProps {
  currentStatus: NoaLogisticsStatus;
  onChangeStatus?: (newStatus: NoaLogisticsStatus) => void;
  orderId?: string;
  shadeDetails?: {
    name: string;
    code: string;
    hex: string;
    brand: string;
  };
  branchName?: string;
  pickupCode?: string;
  onOpenDeskChat?: () => void;
}

export const NoaOrderStatusTimeline: React.FC<NoaOrderStatusTimelineProps> = ({
  currentStatus = 'waiting_desk',
  onChangeStatus,
  orderId = 'SAB-889413',
  shadeDetails,
  branchName = 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)',
  pickupCode = '8894',
  onOpenDeskChat
}) => {
  const member = getLoggedInMember();
  const [billingPhoneChoice, setBillingPhoneChoice] = useState<'system' | 'custom' | 'call_me'>('system');
  const [customPhone, setCustomPhone] = useState<string>('');
  const [isBillingConfirmed, setIsBillingConfirmed] = useState<boolean>(false);
  const [hasPlayedChime, setHasPlayedChime] = useState<boolean>(false);

  const currentStepIndex = NOA_TIMELINE_STEPS.findIndex((s) => s.key === currentStatus);
  const systemPhoneNumber = member?.phone || '050-8860896';

  const handleStepClick = (statusKey: NoaLogisticsStatus) => {
    if (onChangeStatus) {
      onChangeStatus(statusKey);
      if (statusKey === 'ready_for_pickup') {
        playOrderReadyChime();
      }
    }
  };

  const handleConfirmBilling = () => {
    setIsBillingConfirmed(true);
    if (onChangeStatus) {
      setTimeout(() => {
        onChangeStatus('tinting_active');
      }, 700);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-slate-800">
      
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0F3E7A] to-[#0A2E5C] text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">
                  מעקב הזמנה וגיוון צבע – נועה Ai
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  לוגיסטיקה חיה
                </span>
              </div>
              <div className="text-xs text-blue-200 flex items-center gap-2 font-mono">
                <span>מספר הזמנה: <strong>#{orderId}</strong></span>
                <span>•</span>
                <span>קוד איסוף: <strong>{pickupCode}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Shade and Branch Badge */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs">
          {shadeDetails && (
            <div className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-lg border border-white/30 shadow-inner"
                style={{ backgroundColor: shadeDetails.hex }}
              />
              <div className="text-right">
                <div className="font-extrabold text-white text-[11px] truncate max-w-[120px]">
                  {shadeDetails.name}
                </div>
                <div className="text-[10px] text-amber-300 font-mono">
                  {shadeDetails.brand} {shadeDetails.code}
                </div>
              </div>
            </div>
          )}
          <div className="border-r border-white/20 pr-3 mr-1 text-right">
            <div className="text-[10px] text-blue-200">סניף איסוף:</div>
            <div className="font-bold text-white text-[11px] truncate max-w-[160px]">
              {branchName}
            </div>
          </div>
        </div>
      </div>

      {/* Main Timeline Section */}
      <div className="p-5 sm:p-7 space-y-6">
        
        {/* Desk Simulation Controls for Testing */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>סימולטור איש דלפק סבן – עדכן סטטוס בזמן אמת:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {NOA_TIMELINE_STEPS.map((step) => {
              const isActive = currentStatus === step.key;
              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => handleStepClick(step.key)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0F3E7A] text-white shadow-sm ring-2 ring-blue-300'
                      : 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <span className="font-mono">{step.stepNumber}.</span> {step.badge}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Progress Stepper Bar (Horizontal on desktop, Vertical on mobile) */}
        <div className="space-y-4">
          
          {/* Desktop Stepper Bar */}
          <div className="hidden lg:grid grid-cols-7 gap-2 relative">
            {NOA_TIMELINE_STEPS.map((step, idx) => {
              const isPassed = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={step.key} className="flex flex-col items-center text-center relative group">
                  {/* Connecting Line */}
                  {idx > 0 && (
                    <div
                      className={`absolute top-4 right-[-50%] w-full h-1 -z-0 transition-colors duration-500 ${
                        idx <= currentStepIndex ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}

                  {/* Step Bubble Indicator */}
                  <button
                    type="button"
                    onClick={() => handleStepClick(step.key)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all relative z-10 cursor-pointer shadow-sm ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-100 scale-110 shadow-md font-black animate-pulse'
                        : isPassed
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 border-2 border-slate-300 text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {isPassed ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <span>{step.stepNumber}</span>
                    )}
                  </button>

                  {/* Title and Badge */}
                  <div className="mt-2.5 space-y-1">
                    <div
                      className={`text-[11px] font-black leading-snug transition-colors ${
                        isCurrent
                          ? 'text-[#0F3E7A]'
                          : isPassed
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Status Highlight Card */}
          {NOA_TIMELINE_STEPS[currentStepIndex] && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-slate-50 to-amber-50/50 border-2 border-[#0F3E7A]/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0F3E7A] text-white flex items-center justify-center font-black shrink-0 shadow-md">
                  <span className="text-lg font-mono">{currentStepIndex + 1}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-blue-100 text-[#0F3E7A] font-extrabold">
                      שלב {currentStepIndex + 1} מתוך 7
                    </span>
                    <h4 className="text-base font-black text-slate-900">
                      {NOA_TIMELINE_STEPS[currentStepIndex].label}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {NOA_TIMELINE_STEPS[currentStepIndex].description}
                  </p>
                </div>
              </div>

              {/* Status Specific Actions */}
              <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                {currentStatus === 'in_progress' && (
                  <button
                    type="button"
                    onClick={onOpenDeskChat}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-300" />
                    <span>פתח צ׳אט עם איש דלפק</span>
                  </button>
                )}

                {currentStatus === 'ready_for_pickup' && (
                  <button
                    type="button"
                    onClick={() => playOrderReadyChime()}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>השמע צליל איסוף מוכן 🔔</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Interactive Step 5: Billing Selection Box (Requirement 5) */}
          {currentStatus === 'payment_required' && (
            <div className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-md space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-sm">
                <PhoneCall className="w-5 h-5 text-amber-600 animate-bounce" />
                <span>נועה Ai: נדרש אישור חיוב לפני התחלת הגיוון הממוחשב</span>
              </div>
              <p className="text-xs text-slate-700">
                צבעים שגוילו במיוחד עבורך אינם ניתנים להחזרה, ולכן נדרש אישור חיוב טלפוני או מהיר לפני הפעלת מכונת הגיוון.
              </p>

              {/* Radio options for phone number */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* 1. System phone */}
                <button
                  type="button"
                  onClick={() => setBillingPhoneChoice('system')}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                    billingPhoneChoice === 'system'
                      ? 'border-[#0F3E7A] bg-white ring-2 ring-[#0F3E7A]/20 shadow-sm'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="font-extrabold text-slate-900">מספר רשום במערכת</div>
                  <div className="text-slate-500 font-mono mt-1">{systemPhoneNumber}</div>
                  <div className="text-[10px] text-emerald-700 font-bold mt-2">לקוח מאומת בסבן</div>
                </button>

                {/* 2. Custom phone */}
                <button
                  type="button"
                  onClick={() => setBillingPhoneChoice('custom')}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                    billingPhoneChoice === 'custom'
                      ? 'border-[#0F3E7A] bg-white ring-2 ring-[#0F3E7A]/20 shadow-sm'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="font-extrabold text-slate-900">מספר נייד אחר לחיוב</div>
                  <input
                    type="tel"
                    placeholder="הזן מספר נייד (למשל: 050-1234567)"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBillingPhoneChoice('custom');
                    }}
                    className="w-full mt-1 p-1.5 text-xs border rounded-lg bg-slate-50"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">חיוב במספר ייעודי</div>
                </button>

                {/* 3. Representative call me */}
                <button
                  type="button"
                  onClick={() => setBillingPhoneChoice('call_me')}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                    billingPhoneChoice === 'call_me'
                      ? 'border-[#0F3E7A] bg-white ring-2 ring-[#0F3E7A]/20 shadow-sm'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="font-extrabold text-slate-900">שנציג דלפק יתקשר אליי</div>
                  <div className="text-slate-500 text-[11px] mt-1">התקשרות תוך 3 דקות</div>
                  <div className="text-[10px] text-amber-700 font-bold mt-2">שיחה מנציג אישי</div>
                </button>
              </div>

              {/* Confirm billing button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>סכום החיוב מועבר מיידית לדלפק הסניף המכין את ההזמנה.</span>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmBilling}
                  className="px-6 py-2.5 rounded-xl bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>אישור חיוב והתחלת גיוון מיידי ⚡</span>
                </button>
              </div>
            </div>
          )}

          {/* Mobile Vertical Stepper View */}
          <div className="lg:hidden space-y-2.5 pt-2">
            {NOA_TIMELINE_STEPS.map((step, idx) => {
              const isPassed = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={step.key}
                  onClick={() => handleStepClick(step.key)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isCurrent
                      ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-200'
                      : isPassed
                      ? 'bg-slate-50 border-slate-200 opacity-80'
                      : 'bg-white border-slate-200 opacity-50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCurrent
                        ? 'bg-amber-400 text-slate-950 font-black animate-pulse'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : step.stepNumber}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs text-slate-900">{step.label}</div>
                    <div className="text-[10px] text-slate-500 truncate">{step.description}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
