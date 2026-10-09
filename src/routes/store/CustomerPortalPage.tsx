import React, { useState, useEffect } from 'react';
import {
  User,
  Phone,
  ShieldCheck,
  Building2,
  Package,
  Clock,
  CheckCircle2,
  Bell,
  BellRing,
  Volume2,
  MapPin,
  ExternalLink,
  Paintbrush,
  Sparkles,
  ArrowRight,
  Truck,
  RotateCcw,
  Smartphone,
  ChevronLeft,
  LogOut,
  BadgeCheck,
  CreditCard,
  Award,
  Calendar,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { setCustomerExternalPhone, triggerOrderReadySimulation } from '../../lib/oneSignal';
import {
  SabanClubMember,
  getLoggedInMember,
  setLoggedInMember
} from '../../types/auth';
import { SabanLogo } from '../../components/layout/SabanLogo';

interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  branch: string;
  items: string[];
  total: number;
  status: 'מוכן לאיסוף' | 'בטיפול בדלפק' | 'נמסר ללקוח';
  pickupCode: string;
}

interface SavedShade {
  code: string;
  name: string;
  brand: string;
  hex: string;
  lastPurchased: string;
  productType: string;
}

interface CustomerPortalPageProps {
  onNavigateHome: () => void;
  onNavigateTrack?: (orderId: string) => void;
  onRequireLogin?: () => void;
  onLogout?: () => void;
}

export const CustomerPortalPage: React.FC<CustomerPortalPageProps> = ({
  onNavigateHome,
  onNavigateTrack,
  onRequireLogin,
  onLogout
}) => {
  const [member, setMember] = useState<SabanClubMember | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [activeProjectAddress, setActiveProjectAddress] = useState<string>('');
  const [simulationState, setSimulationState] = useState<string | null>(null);
  const [copiedCardId, setCopiedCardId] = useState(false);

  useEffect(() => {
    const currentMember = getLoggedInMember();
    if (!currentMember) {
      if (onRequireLogin) {
        onRequireLogin();
      }
      return;
    }

    setMember(currentMember);
    setPhoneNumber(currentMember.phone || '');
    setActiveProjectAddress(currentMember.projectAddress || 'רחוב דרך רמתיים 42, הוד השרון');
  }, [onRequireLogin]);

  const handleCopyCard = () => {
    if (!member) return;
    navigator.clipboard.writeText(member.cardId);
    setCopiedCardId(true);
    setTimeout(() => setCopiedCardId(false), 2000);
  };

  const handlePerformLogout = () => {
    setLoggedInMember(null);
    setMember(null);
    if (onLogout) {
      onLogout();
    } else {
      onNavigateHome();
    }
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerExternalPhone(phoneNumber);
    if (member) {
      const updated = { ...member, phone: phoneNumber };
      setLoggedInMember(updated);
      setMember(updated);
    }
    alert('מספר הטלפון עודכן ושויך בהצלחה לקבלת התראות OneSignal!');
  };

  const handleSimulateChime = async () => {
    setSimulationState('מפעיל התראה וצליל צ׳יימס...');
    await triggerOrderReadySimulation('SAB-889413', member?.preferredBranch || 'סניף החרש 10');
    setTimeout(() => {
      setSimulationState('✓ התראה וצליל Chime הושמעו בהצלחה!');
      setTimeout(() => setSimulationState(null), 3000);
    }, 400);
  };

  // Mock Contractor Order History
  const mockOrders: CustomerOrder[] = [
    {
      id: 'ord-1',
      orderNumber: 'SAB-889413',
      date: '26/09/2026',
      branch: member?.preferredBranch || 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)',
      items: ['סיקה טופ 107 ערכה 25 ק״ג (2 יח׳)', 'סיקפלקס 11FC אפור (12 יח׳)'],
      total: 674,
      status: 'מוכן לאיסוף',
      pickupCode: '8894'
    },
    {
      id: 'ord-2',
      orderNumber: 'SAB-741290',
      date: '18/09/2026',
      branch: 'סניף התלמיד 6 (מחסן 1 - גבס וצבע)',
      items: ['סופרקריל 2000 לבן משי 18 ליטר', 'שפכטל אמריקאי מוכן 28 ק״ג (3 פחים)'],
      total: 820,
      status: 'נמסר ללקוח',
      pickupCode: '7412'
    }
  ];

  // Saved Color Shades
  const savedShades: SavedShade[] = [
    {
      code: 'IS 0015',
      name: 'לבן משי יוקרתי',
      brand: 'טמבור',
      hex: '#F4F4F0',
      lastPurchased: '18/09/2026',
      productType: 'סופרקריל 2000'
    },
    {
      code: 'NWC 020',
      name: 'אפור אבן קטיפתי',
      brand: 'נירלט',
      hex: '#D7D6D2',
      lastPurchased: '05/08/2026',
      productType: 'נירוקריל אקסטרה'
    },
    {
      code: 'SIKA-GREY',
      name: 'אפור בטון אטימה',
      brand: 'Sika',
      hex: '#8E9192',
      lastPurchased: '26/09/2026',
      productType: 'סיקה טופ 107'
    }
  ];

  if (!member) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 text-center" dir="rtl">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-200 space-y-4">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto text-amber-600">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">דרושה התחברות לאזור האישי</h2>
          <p className="text-xs text-slate-600">
            האזור האישי שמור לחברי מועדון סבן הרשומים. יש להתחבר או להירשם לצפייה בפרטים האישיים וההזמנות.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={onRequireLogin}
              className="w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-3 rounded-xl font-black text-sm shadow cursor-pointer"
            >
              התחבר / הרשם למועדון עכשיו
            </button>
            <button
              onClick={onNavigateHome}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
            >
              חזרה לקטלוג המוצרים
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 pt-4 font-['Heebo','Assistant',sans-serif] text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between py-2 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#0F3E7A] font-bold cursor-pointer"
            >
              ראשי
            </button>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-extrabold">האזור האישי שלי • מועדון ח. סבן</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] bg-emerald-50 text-emerald-800 font-black px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              מחובר: {member.fullName}
            </span>

            <button
              type="button"
              onClick={handlePerformLogout}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-xl transition-colors font-bold flex items-center gap-1 cursor-pointer border border-red-200"
              title="התנתק מהחשבון והסתר את האזור האישי"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>התנתק</span>
            </button>
          </div>
        </div>

        {/* HERO: Digital Member Card Display with saved details */}
        <div className="bg-gradient-to-r from-[#072244] via-[#0F3E7A] to-[#16529e] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 font-black text-2xl shadow-inner shrink-0">
                <Award className="w-9 h-9 sm:w-10 sm:h-10 text-amber-400" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>חבר מועדון סבן VIP • הנחה פעילה</span>
                  </span>
                  <span className="text-xs text-blue-200 font-semibold">
                    הנחת מחירון {member.discountPercent || 12}% מוגדרת
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black mt-1 text-white">
                  שלום, {member.fullName}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-100">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-300" />
                    <strong>{member.businessName || 'קבלן עצמאי'}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span dir="ltr"><strong>{member.phone}</strong></span>
                  </span>
                  {member.email && (
                    <>
                      <span>•</span>
                      <span dir="ltr">{member.email}</span>
                    </>
                  )}
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px] text-blue-200">
                  <span>סניף ראשי: <strong>{member.preferredBranch || 'סניף החרש 10'}</strong></span>
                  <span>•</span>
                  <span>תחום פעילות: <strong>{member.contractorType || 'קבלן בנייה וגמר'}</strong></span>
                  {member.joinedDate && (
                    <>
                      <span>•</span>
                      <span>תאריך הצטרפות: <strong>{member.joinedDate}</strong></span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Digital Card Number Badge with Copy */}
            <div className="bg-black/30 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col gap-2 shrink-0 lg:min-w-[260px]">
              <div className="text-[10px] text-slate-300 uppercase font-mono tracking-wider flex items-center justify-between">
                <span>MEMBERSHIP CARD</span>
                <span className="text-emerald-300 font-bold bg-emerald-950/50 px-2 py-0.5 rounded">
                  פעיל ומאושר
                </span>
              </div>
              
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-lg sm:text-xl font-black text-amber-300 tracking-wider">
                  {member.cardId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCard}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="העתק מספר כרטיס חבר"
                >
                  {copiedCardId ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="text-[10px] text-blue-200 border-t border-white/10 pt-1.5 flex items-center justify-between">
                <span>סנכרון דלפק קומקס:</span>
                <span className="text-amber-300 font-bold">מחובר ישירות</span>
              </div>
            </div>

          </div>
        </div>

        {/* Saved Registration Details Review Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0F3E7A]" />
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                פרטי ההתחברות והרישום שנשמרו במערכת
              </h2>
            </div>
            <span className="text-xs bg-amber-50 text-amber-900 font-bold px-3 py-1 rounded-full border border-amber-200">
              פרטי כרטיס חבר סבן
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-slate-500 font-semibold mb-1">שם מלא רשום:</div>
              <div className="font-extrabold text-slate-900 text-sm">{member.fullName}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-slate-500 font-semibold mb-1">טלפון נייד:</div>
              <div className="font-extrabold text-slate-900 text-sm font-mono" dir="ltr">
                {member.phone}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-slate-500 font-semibold mb-1">שם עסק / קבלן:</div>
              <div className="font-extrabold text-slate-900 text-sm">{member.businessName || 'קבלן עצמאי'}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-slate-500 font-semibold mb-1">מספר חבר מועדון:</div>
              <div className="font-extrabold text-[#0F3E7A] text-sm font-mono tracking-wider">
                {member.cardId}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-slate-500 font-semibold mb-1">סניף מועדף לאיסוף:</div>
              <div className="font-extrabold text-slate-900 text-sm">{member.preferredBranch || 'סניף החרש 10'}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-slate-500 font-semibold mb-1">תחום התמחות:</div>
              <div className="font-extrabold text-slate-900 text-sm">{member.contractorType || 'קבלן שלד וגמר'}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-slate-500 font-semibold mb-1">תאריך הרשמה:</div>
              <div className="font-extrabold text-slate-900 text-sm">{member.joinedDate || '2026'}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-slate-500 font-semibold mb-1">הטבת חבר פעילה:</div>
              <div className="font-extrabold text-emerald-700 text-sm">הנחת 12% + רציף אקספרס</div>
            </div>
          </div>

          {member.projectNotes && (
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-950">
              <strong>הערות פרויקט שנרשמו:</strong> {member.projectNotes}
            </div>
          )}
        </div>

        {/* 2-Columns Grid: Active Orders & Projects vs Logistics/OneSignal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Column: Active BOPIS Orders & Paint Shades */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Orders Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#0F3E7A]" />
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    הזמנות פעילות ואיסוף עצמי (BOPIS)
                  </h2>
                </div>
                <span className="text-xs bg-blue-50 text-[#0F3E7A] font-bold px-3 py-1 rounded-full border border-blue-100">
                  {mockOrders.length} הזמנות רשומות
                </span>
              </div>

              <div className="space-y-3">
                {mockOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl p-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-slate-900 text-sm">
                            {ord.orderNumber}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              ord.status === 'מוכן לאיסוף'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : ord.status === 'בטיפול בדלפק'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 flex items-center gap-2">
                          <span>סניף: <strong>{ord.branch}</strong></span>
                          <span>•</span>
                          <span>תאריך: {ord.date}</span>
                        </div>

                        <div className="text-xs text-slate-700 font-medium pt-1">
                          פריטים: {ord.items.join(', ')}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400">קוד איסוף מהיר:</div>
                          <div className="text-lg font-mono font-black text-[#0F3E7A]">
                            {ord.pickupCode}
                          </div>
                        </div>

                        {onNavigateTrack && (
                          <button
                            type="button"
                            onClick={() => onNavigateTrack(ord.orderNumber)}
                            className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>מעקב הזמנה</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Color Shades Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Paintbrush className="w-5 h-5 text-amber-500" />
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    גווני צבע ומפרטים שנשמרו לפרויקט
                  </h2>
                </div>
                <span className="text-xs text-slate-500">התאמת גוונים במכונת גיוון ממוחשבת</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {savedShades.map((shade) => (
                  <div
                    key={shade.code}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg border border-slate-300 shadow-xs shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">{shade.name}</div>
                        <div className="text-[10px] text-slate-500">{shade.brand} • {shade.code}</div>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      מוצר: <strong>{shade.productType}</strong>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      נרכש לאחרונה: {shade.lastPurchased}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Side Column: Waze Navigation & OneSignal Push */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Project Navigation with Waze */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-rose-600" />
                <h3 className="font-black text-sm text-slate-900">
                  אתר הפרויקט הפעיל
                </h3>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  כתובת אספקה ושילוח נוכחית:
                </label>
                <input
                  type="text"
                  value={activeProjectAddress}
                  onChange={(e) => setActiveProjectAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold outline-none focus:border-[#0F3E7A]"
                />
                
                <a
                  href={`https://waze.com/ul?q=${encodeURIComponent(activeProjectAddress)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>נווט לאתר הפרויקט ב-Waze</span>
                </a>
              </div>
            </div>

            {/* Notification & Phone Sync Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Bell className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-sm text-slate-900">
                  סנכרון התראות OneSignal למובייל
                </h3>
              </div>

              <form onSubmit={handleSavePhone} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    טלפון נייד לקבלת התראות סטטוס:
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold outline-none focus:border-[#0F3E7A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  עדכן שיוך OneSignal במכשיר
                </button>
              </form>

              {/* Chime Simulator */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSimulateChime}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 py-2.5 px-3 rounded-xl text-xs font-black shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BellRing className="w-4 h-4 text-[#0F3E7A]" />
                  <span>בדוק צליל התראה (Chime)</span>
                </button>
                {simulationState && (
                  <p className="text-[11px] text-emerald-600 font-bold text-center mt-1.5">
                    {simulationState}
                  </p>
                )}
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed bg-blue-50/60 p-3 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900">שירות בלעדי לקבלני סבן:</span> בעת סיום אריזת ההזמנה ברציף, נשלחת הודעת Push ישירה עם צליל התראה וקוד איסוף המאפשר העמסה מידית עם מלגזה ללא המתנה בדלפק.
              </div>
            </div>

            {/* Quick Contractor Hotline */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-5 space-y-2">
              <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>מוקד קבלנים ישיר סבן:</span>
              </div>
              <div className="text-xs text-amber-900 font-medium">
                דלפק אקספרס ואיסוף מהיר: <strong>03-9518888</strong> | וואטסאפ: <strong>050-8860896</strong>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
