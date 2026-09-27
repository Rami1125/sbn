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
  ChevronLeft
} from 'lucide-react';
import { setCustomerExternalPhone, playOrderReadyChime, triggerOrderReadySimulation } from '../../lib/oneSignal';
import { SABAN_WHATSAPP_PHONE } from '../../lib/whatsappDeepLink';

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

export const CustomerPortalPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('050-8860896');
  const [customerName, setCustomerName] = useState<string>('יוסי לוי (קבלן גמר ובנייה)');
  const [clientType, setClientType] = useState<'contractor' | 'private'>('contractor');
  const [activeProjectAddress, setActiveProjectAddress] = useState<string>('רחוב דרך רמתיים 42, הוד השרון');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [simulationState, setSimulationState] = useState<string | null>(null);

  useEffect(() => {
    // Load saved phone if exists
    const savedPhone = localStorage.getItem('saban_customer_phone');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    }
  }, []);

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerExternalPhone(phoneNumber);
    alert('מספר הטלפון עודכן ושויך בהצלחה לקבלת התראות OneSignal!');
  };

  const handleSimulateChime = async () => {
    setSimulationState('מפעיל התראה וצליל צ׳יימס...');
    await triggerOrderReadySimulation('SAB-889413', 'סניף החרש 10');
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
      branch: 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)',
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

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 pt-4 font-['Heebo','Assistant',sans-serif] text-right">
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
            <span className="text-slate-900 font-extrabold">פורטל לקוחות וקבלנים</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-emerald-50 text-emerald-800 font-black px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              מחובר: חשבון קבלן מאומת
            </span>
          </div>
        </div>

        {/* Hero Customer Card */}
        <div className="bg-gradient-to-r from-[#072244] via-[#0F3E7A] to-[#16529e] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 font-black text-2xl shadow-inner">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    קבלן רשום סבן PRO
                  </span>
                  <span className="text-xs text-blue-200">הנחת מחירון 12% מוגדרת</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black mt-1">
                  {customerName}
                </h1>
                <p className="text-xs text-blue-100 flex items-center gap-2 mt-1">
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>נייד רשום: <strong>{phoneNumber}</strong></span>
                  <span>•</span>
                  <span>סניף שיוך ראשי: <strong>סניף החרש 10</strong></span>
                </p>
              </div>
            </div>

            {/* Quick Chime & Push Test Button */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col gap-2 shrink-0">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-bold flex items-center gap-1 text-amber-200">
                  <Volume2 className="w-4 h-4" />
                  התראות דלפק וצליל Chime:
                </span>
                <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  פעיל
                </span>
              </div>
              <button
                type="button"
                onClick={handleSimulateChime}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BellRing className="w-4 h-4 text-[#0F3E7A]" />
                <span>בדוק צליל "הזמנה מוכנה לאיסוף"</span>
              </button>
              {simulationState && (
                <span className="text-[11px] text-amber-300 font-bold animate-in fade-in">
                  {simulationState}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3 Main Columns / Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Active Orders & BOPIS Pickups */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Orders Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#0F3E7A]" />
                  <h2 className="text-lg font-black text-slate-900">
                    הזמנות אחרונות לאיסוף מהיר מהסניף (BOPIS)
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  {mockOrders.length} הזמנות רשומות
                </span>
              </div>

              <div className="space-y-3.5">
                {mockOrders.map((order) => {
                  const isReady = order.status === 'מוכן לאיסוף';
                  return (
                    <div
                      key={order.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isReady
                          ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/10'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-[#0F3E7A]">
                            #{order.orderNumber}
                          </span>
                          <span className="text-xs text-slate-500">({order.date})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                              isReady
                                ? 'bg-emerald-500 text-white shadow-xs'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {order.status}
                          </span>

                          <span className="font-mono font-black text-xs bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded-lg">
                            קוד איסוף: {order.pickupCode}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-700 font-medium mb-2">
                        <MapPin className="w-3.5 h-3.5 inline text-[#0F3E7A] ml-1" />
                        <strong>סניף לאיסוף:</strong> {order.branch}
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs space-y-1">
                        <div className="font-bold text-slate-600 mb-1">פירוט פריטים:</div>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-slate-800 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F3E7A]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60">
                        <div className="text-xs font-bold text-slate-900">
                          סה״כ לתשלום: <span className="text-sm font-black text-[#0F3E7A]">₪{order.total.toFixed(2)} ILS</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isReady && (
                            <a
                              href="https://waze.com/ul?q=רחוב החרש 10 הוד השרון"
                              target="_blank"
                              rel="noreferrer"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                            >
                              <span>נווט לרציף האיסוף (Waze)</span>
                            </a>
                          )}
                          <a
                            href={`https://wa.me/${SABAN_WHATSAPP_PHONE}?text=${encodeURIComponent(
                              `שלום, ברצוני לברר לגבי הזמנה מס׳ ${order.orderNumber} על שם ${customerName}`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors"
                          >
                            <span>פנה לדלפק סבן בוואטסאפ</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Saved Color Shades & Tints Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Paintbrush className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-black text-slate-900">
                    גוונים שמורים והיסטוריית גיוון (מכונות טמבור ונירלט)
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  שמירה אוטומטית לפי פרויקט
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {savedShades.map((shade) => (
                  <div
                    key={shade.code}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2 hover:border-[#0F3E7A] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl border border-slate-300 shadow-xs shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <div>
                        <div className="font-mono font-black text-xs text-slate-900">
                          {shade.code}
                        </div>
                        <div className="text-[11px] text-slate-600 font-medium">
                          {shade.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                      <span>יצרן: <strong>{shade.brand}</strong> | {shade.productType}</span>
                      <div className="text-slate-400 mt-0.5">נרכש: {shade.lastPurchased}</div>
                    </div>

                    <a
                      href={`https://wa.me/${SABAN_WHATSAPP_PHONE}?text=${encodeURIComponent(
                        `שלום למחלקת צבע סבן, אבקש להכין מראש פח בגוון השמור שלי: ${shade.code} (${shade.name}) עבור ${customerName}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-white hover:bg-slate-100 text-[#0F3E7A] border border-blue-200 text-[11px] font-bold py-1.5 rounded-xl text-center block transition-colors"
                    >
                      הזמן גוון זה שוב
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2: Contractor Project Site & Notification Preferences */}
          <div className="space-y-6">
            
            {/* Active Project Site Address */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Truck className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-sm text-slate-900">
                  אתר בנייה פעיל (משלוחי מנוף)
                </h3>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] text-slate-500 block">כתובת אספקה פעילה:</span>
                <input
                  type="text"
                  value={activeProjectAddress}
                  onChange={(e) => setActiveProjectAddress(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold outline-none focus:border-[#0F3E7A]"
                />
                
                <a
                  href={`https://waze.com/ul?q=${encodeURIComponent(activeProjectAddress)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>נווט לאתר הפרויקט ב-Waze</span>
                </a>
              </div>
            </div>

            {/* Notification & Phone Sync Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
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
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  עדכן שיוך OneSignal במכשיר
                </button>
              </form>

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
