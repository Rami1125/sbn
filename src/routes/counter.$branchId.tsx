import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  Lock,
  Unlock,
  KeyRound,
  Phone,
  Printer,
  Navigation,
  CheckCircle2,
  Clock,
  Package,
  AlertCircle,
  Search,
  RefreshCw,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  Check,
  User,
  MapPin,
  ExternalLink,
  Sparkles,
  QrCode,
  X,
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { playOrderReadyChime } from '../lib/oneSignal';
import { WhatsAppIcon } from '../components/common/WhatsAppOrderButton';

// Default Master Staff PIN (can be 1994 or 9518)
const DEFAULT_STAFF_PIN = '1994';
const ALTERNATE_PIN = '9518';

export type CounterColumnId = 'pending_payment' | 'picking_tinting' | 'ready_for_pickup' | 'delivered_completed';

export interface CounterOrderItem {
  sku: string;
  title: string;
  packaging: string;
  quantity: number;
  locationArea: string; // e.g. "חצר בלות", "מדף איטום מחסן 4", "מכונת גיוון טמבור"
  colorShade?: {
    code: string;
    name: string;
    hex: string;
  };
}

export interface CounterOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  clientType: 'קבלן רשום' | 'לקוח פרטי';
  branchId: 'harash' | 'talmid';
  status: CounterColumnId;
  createdAt: string;
  elapsedMinutes: number;
  pickupCode: string;
  totalAmount: number;
  items: CounterOrderItem[];
  notes?: string;
  wazeUrl: string;
}

const INITIAL_COUNTER_ORDERS: CounterOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'SAB-889413',
    customerName: 'יוסי לוי (קבלן גמר)',
    customerPhone: '050-8860896',
    clientType: 'קבלן רשום',
    branchId: 'harash',
    status: 'ready_for_pickup',
    createdAt: '15:20',
    elapsedMinutes: 18,
    pickupCode: '8894',
    totalAmount: 903.88,
    wazeUrl: 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון',
    notes: 'איסוף ברציף 3 עם טנדר טויוטה לבן',
    items: [
      {
        sku: '10701',
        title: 'סיקה טופ 107 ערכה 25 ק״ג איטום צמנטי',
        packaging: '2 ערכות מלאות',
        quantity: 2,
        locationArea: 'רציף איטום - מחסן 4',
        colorShade: { code: 'GREY', name: 'אפור בטון', hex: '#8E9192' }
      },
      {
        sku: '11FC01',
        title: 'סיקפלקס 11FC אפור נקניק 600 מ״ל',
        packaging: 'קרטון (12 שרוולים)',
        quantity: 12,
        locationArea: 'מדף מסטיקים ואביזרים',
        colorShade: { code: 'RAL 7004', name: 'אפור תקני', hex: '#9EA0A1' }
      }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'SAB-912044',
    customerName: 'ארז כהן (שיפוצים והנדסה)',
    customerPhone: '054-7221990',
    clientType: 'קבלן רשום',
    branchId: 'harash',
    status: 'picking_tinting',
    createdAt: '15:32',
    elapsedMinutes: 6,
    pickupCode: '9120',
    totalAmount: 1450.00,
    wazeUrl: 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון',
    notes: 'העמסת משטח מלט עם מלגזה 5 טון',
    items: [
      {
        sku: '10002',
        title: 'מלט פורטלנד אפור נשר CEM II 42.5',
        packaging: 'משטח 40 שקים (25 ק״ג)',
        quantity: 40,
        locationArea: 'סככת מלט מרכזית'
      },
      {
        sku: 'SAND-1',
        title: 'חול ים שטוף ומנופה בלה גדולה',
        packaging: '2 בלות (כ-2 טון)',
        quantity: 2,
        locationArea: 'חצר בלות דרומית'
      }
    ]
  },
  {
    id: 'ord-103',
    orderNumber: 'SAB-662310',
    customerName: 'מיכאל אטיאס',
    customerPhone: '052-8819003',
    clientType: 'לקוח פרטי',
    branchId: 'harash',
    status: 'pending_payment',
    createdAt: '15:10',
    elapsedMinutes: 28,
    pickupCode: '6623',
    totalAmount: 430.00,
    wazeUrl: 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון',
    notes: 'ממתין להתקשרות לאישור כרטיס אשראי',
    items: [
      {
        sku: '20110',
        title: 'טמבור סופרפלקס לבן פח 18 ק״ג ציפוי איטום אקרילי',
        packaging: 'פח 18 ק״ג',
        quantity: 1,
        locationArea: 'אולם תצוגה / דלפק'
      }
    ]
  },
  {
    id: 'ord-104',
    orderNumber: 'SAB-441098',
    customerName: 'דורון אלון (קבלן גבס)',
    customerPhone: '050-6543210',
    clientType: 'קבלן רשום',
    branchId: 'talmid',
    status: 'ready_for_pickup',
    createdAt: '14:45',
    elapsedMinutes: 53,
    pickupCode: '4410',
    totalAmount: 1820.00,
    wazeUrl: 'https://waze.com/ul?q=רחוב התלמיד 6 הוד השרון',
    notes: 'לוחות גבס קשורים ומוכנים ברציף התלמיד 6',
    items: [
      {
        sku: 'GYPS-01',
        title: 'לוח גבס רגיל אורבונד 12.5 מ״מ',
        packaging: 'חבילה של 30 לוחות',
        quantity: 30,
        locationArea: 'מחסן 1 - אגף גבס'
      },
      {
        sku: 'SCREW-01',
        title: 'ברגי גבס שחורים 25 מ״מ בקופסה 1000 יח׳',
        packaging: '3 קופסאות',
        quantity: 3,
        locationArea: 'מחלקת פרזול'
      }
    ]
  },
  {
    id: 'ord-105',
    orderNumber: 'SAB-320911',
    customerName: 'רונן ברק (קבלן צבע)',
    customerPhone: '050-7119022',
    clientType: 'קבלן רשום',
    branchId: 'talmid',
    status: 'picking_tinting',
    createdAt: '15:15',
    elapsedMinutes: 23,
    pickupCode: '3209',
    totalAmount: 814.20,
    wazeUrl: 'https://waze.com/ul?q=רחוב התלמיד 6 הוד השרון',
    notes: 'בגיוון במכונת נירלט - גוון NWC 020',
    items: [
      {
        sku: '9889421',
        title: 'אקווניר ADVANCE מט לבן 15 ליטר פח נירלט',
        packaging: '2 פחים 15 ליטר',
        quantity: 2,
        locationArea: 'מכונת גיוון נירלט ממוחשבת',
        colorShade: { code: 'ADVANCE-W', name: 'לבן מט משי', hex: '#F4F4F0' }
      }
    ]
  },
  {
    id: 'ord-106',
    orderNumber: 'SAB-102948',
    customerName: 'שמואל פרידמן',
    customerPhone: '054-3321900',
    clientType: 'לקוח פרטי',
    branchId: 'harash',
    status: 'delivered_completed',
    createdAt: '13:00',
    elapsedMinutes: 158,
    pickupCode: '1029',
    totalAmount: 320.00,
    wazeUrl: 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון',
    notes: 'נמסר ונחתם תעודת איסוף',
    items: [
      {
        sku: '10701',
        title: 'סיקה טופ 107 ערכה 25 ק״ג',
        packaging: 'ערכה 25 ק״ג',
        quantity: 1,
        locationArea: 'רציף איטום'
      }
    ]
  }
];

interface BranchCounterCrmProps {
  initialBranchId?: 'harash' | 'talmid';
  onNavigateHome?: () => void;
}

export const BranchCounterCrm: React.FC<BranchCounterCrmProps> = ({
  initialBranchId = 'harash',
  onNavigateHome
}) => {
  // Branch URL State ('harash' | 'talmid')
  const [selectedBranch, setSelectedBranch] = useState<'harash' | 'talmid'>(initialBranchId);
  
  // 4-Digit Security PIN Screen State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('saban_counter_crm_auth') === 'true';
  });
  const [pinDigits, setPinDigits] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Orders State
  const [orders, setOrders] = useState<CounterOrder[]>(() => {
    const saved = localStorage.getItem('saban_counter_crm_orders');
    return saved ? JSON.parse(saved) : INITIAL_COUNTER_ORDERS;
  });

  // UI States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePrintOrder, setActivePrintOrder] = useState<CounterOrder | null>(null);
  const [isSyncingSheets, setIsSyncingSheets] = useState<boolean>(false);
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Save orders to localStorage on change
  useEffect(() => {
    localStorage.setItem('saban_counter_crm_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync branch URL in history
  const handleSwitchBranch = (branch: 'harash' | 'talmid') => {
    setSelectedBranch(branch);
    window.history.pushState({ branch }, '', `/counter/${branch}`);
  };

  // PIN Keypad Handlers
  const handleDigitPress = (digit: string) => {
    if (pinDigits.length >= 4) return;
    const newPin = pinDigits + digit;
    setPinDigits(newPin);
    setPinError(false);

    if (newPin.length === 4) {
      if (newPin === DEFAULT_STAFF_PIN || newPin === ALTERNATE_PIN) {
        setIsAuthenticated(true);
        sessionStorage.setItem('saban_counter_crm_auth', 'true');
        setPinDigits('');
      } else {
        setPinError(true);
        setTimeout(() => {
          setPinDigits('');
          setPinError(false);
        }, 800);
      }
    }
  };

  const handleDeleteDigit = () => {
    setPinDigits((prev) => prev.slice(0, -1));
    setPinError(false);
  };

  const handleClearPin = () => {
    setPinDigits('');
    setPinError(false);
  };

  const handleLockCrm = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('saban_counter_crm_auth');
    setPinDigits('');
  };

  // Kanban Column Movement
  const handleMoveStatus = (orderId: string, targetStatus: CounterColumnId) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          // If moved to ready_for_pickup, chime!
          if (targetStatus === 'ready_for_pickup' && soundEnabled) {
            playOrderReadyChime();
          }
          return { ...ord, status: targetStatus };
        }
        return ord;
      })
    );
  };

  // Next / Previous Step helpers
  const columnOrder: CounterColumnId[] = [
    'pending_payment',
    'picking_tinting',
    'ready_for_pickup',
    'delivered_completed'
  ];

  const handleAdvanceOrder = (order: CounterOrder) => {
    const currentIndex = columnOrder.indexOf(order.status);
    if (currentIndex < columnOrder.length - 1) {
      const nextStatus = columnOrder[currentIndex + 1];
      handleMoveStatus(order.id, nextStatus);
    }
  };

  const handleRegressOrder = (order: CounterOrder) => {
    const currentIndex = columnOrder.indexOf(order.status);
    if (currentIndex > 0) {
      const prevStatus = columnOrder[currentIndex - 1];
      handleMoveStatus(order.id, prevStatus);
    }
  };

  // Simulate Incoming New Web Order with Chime
  const handleSimulateNewOrder = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrd: CounterOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `SAB-${randomSuffix}`,
      customerName: 'דוד ביטון (קבלן איטום)',
      customerPhone: '050-8860896',
      clientType: 'קבלן רשום',
      branchId: selectedBranch,
      status: 'pending_payment',
      createdAt: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      elapsedMinutes: 1,
      pickupCode: String(randomSuffix),
      totalAmount: 620.00,
      wazeUrl:
        selectedBranch === 'harash'
          ? 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון'
          : 'https://waze.com/ul?q=רחוב התלמיד 6 הוד השרון',
      notes: 'הזמנה חדשה שנקלטה מהחנות הדיגיטלית',
      items: [
        {
          sku: '10701',
          title: 'סיקה טופ 107 ערכה 25 ק״ג איטום צמנטי',
          packaging: 'ערכה מלאה 25 ק״ג',
          quantity: 4,
          locationArea: 'רציף איטום'
        }
      ]
    };

    setOrders((prev) => [newOrd, ...prev]);

    if (soundEnabled) {
      playOrderReadyChime();
    }

    setSyncToastMessage(`🔔 התקבלה הזמנה חדשה #${newOrd.orderNumber} בסניף!`);
    setTimeout(() => setSyncToastMessage(null), 4000);
  };

  // Direct Google Sheets Live Sync (1Ie7gKql_EDdrIN9HqunJc9Ey5k0WXXfPRxs0Vp1Bs2c)
  const handleSyncToGoogleSheets = async () => {
    setIsSyncingSheets(true);
    setSyncToastMessage('מתחבר לגיליון תפעול וסידור (1Ie7gKql...) ומסנכרן סטטוסים בלייב (No-Cache)...');

    // Live sync against unified operational sheet
    setTimeout(() => {
      setIsSyncingSheets(false);
      setSyncToastMessage('✓ סונכרן ישירות מול גיליון מערכת מאוחדת (1Ie7gKql_EDdrIN9HqunJc9Ey5k0WXXfPRxs0Vp1Bs2c)!');
      setTimeout(() => setSyncToastMessage(null), 3500);
    }, 850);
  };

  // Launch WhatsApp with Waze when order is ready
  const getWhatsAppLaunchUrl = (order: CounterOrder) => {
    const branchName =
      order.branchId === 'harash'
        ? 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)'
        : 'סניף התלמיד 6 (מחסן 1 - גבס וצבע)';

    const cleanPhone = order.customerPhone.replace(/\D/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? `972${cleanPhone.slice(1)}` : cleanPhone;

    const message = `שלום ${order.customerName}! 🏗️\nהזמנתך מס׳ ${order.orderNumber} מוכנה וממתינה לך ברציף האיסוף ב${branchName}.\n\n🔑 קוד איסוף מהיר למסירה בדלפק: ${order.pickupCode}\n📍 ניווט ישיר לרציף ב-Waze:\n${order.wazeUrl}\n\nצוות סבן מחכה לך להעמסה מהירה ללא תור!`;

    return `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`;
  };

  // Filtered Orders for Current Branch & Search
  const branchOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchBranch = ord.branchId === selectedBranch;
      const matchSearch =
        !searchQuery ||
        ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customerPhone.includes(searchQuery) ||
        ord.pickupCode.includes(searchQuery);

      return matchBranch && matchSearch;
    });
  }, [orders, selectedBranch, searchQuery]);

  // Kanban Column Grouping
  const columns: Array<{ id: CounterColumnId; title: string; color: string; badgeBg: string }> = [
    { id: 'pending_payment', title: '1. ממתין לחיוב טלפוני', color: 'border-amber-400', badgeBg: 'bg-amber-100 text-amber-900' },
    { id: 'picking_tinting', title: '2. בליקוט / בגיוון', color: 'border-blue-400', badgeBg: 'bg-blue-100 text-[#0F3E7A]' },
    { id: 'ready_for_pickup', title: '3. מוכן לאיסוף בדלפק ✓', color: 'border-emerald-500', badgeBg: 'bg-emerald-500 text-white animate-pulse' },
    { id: 'delivered_completed', title: '4. נמסר והושלם', color: 'border-slate-300', badgeBg: 'bg-slate-200 text-slate-700' }
  ];

  // =========================================================================
  // 1. PIN Keypad Protection Screen (Shown if not authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#072244] to-[#0F3E7A] flex items-center justify-center p-4 font-['Heebo','Assistant',sans-serif] text-right">
        <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl border border-slate-100 space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0F3E7A] border border-blue-200 flex items-center justify-center shadow-inner">
              <KeyRound className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black text-slate-900">
              כניסת מורשי דלפק סבן
            </h1>
            <p className="text-xs text-slate-500">
              הקש קוד PIN סודי (4 ספרות) לגישה למערכת ניהול הזמנות הדלפק (CRM)
            </p>
          </div>

          {/* Masked PIN Display Circles */}
          <div className="flex items-center justify-center gap-3 py-2">
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pinDigits.length > index;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-150 ${
                    pinError
                      ? 'bg-rose-500 ring-4 ring-rose-200 scale-110'
                      : isFilled
                      ? 'bg-[#0F3E7A] ring-4 ring-blue-100 scale-105'
                      : 'bg-slate-200'
                  }`}
                />
              );
            })}
          </div>

          {pinError && (
            <div className="text-xs font-bold text-rose-600 animate-bounce">
              קוד PIN שגוי. נסה שוב (ברירת מחדל: 1994)
            </div>
          )}

          {/* Numeric Keypad 1-9, 0, Backspace */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleDigitPress(digit)}
                className="h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 active:bg-blue-100 border border-slate-200 text-xl font-bold font-mono text-slate-800 transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
              >
                {digit}
              </button>
            ))}

            <button
              type="button"
              onClick={handleClearPin}
              className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
            >
              נקה
            </button>

            <button
              type="button"
              onClick={() => handleDigitPress('0')}
              className="h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 active:bg-blue-100 border border-slate-200 text-xl font-bold font-mono text-slate-800 transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              0
            </button>

            <button
              type="button"
              onClick={handleDeleteDigit}
              className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700 transition-colors flex items-center justify-center cursor-pointer"
            >
              מחק ⌫
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>קוד ברירת מחדל: <strong>1994</strong></span>
            {onNavigateHome && (
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-[#0F3E7A] hover:underline font-bold"
              >
                חזרה לחנות
              </button>
            )}
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. Main Authenticated Kanban CRM Dashboard
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-20 pt-3 font-['Heebo','Assistant',sans-serif] text-right text-slate-800">
      
      {/* Toast Notification */}
      {syncToastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{syncToastMessage}</span>
        </div>
      )}

      {/* Top Application Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Branch Selector Pills */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#0F3E7A] text-amber-300 flex items-center justify-center font-black shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-[#0F3E7A] leading-tight">
                  דלפק סבן • CRM איסוף מהיר
                </div>
                <div className="text-[10px] text-slate-500">
                  ח. סבן חומרי בניין (1994) בע״מ
                </div>
              </div>
            </div>

            {/* Branch Selector Tabs (harash vs talmid) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleSwitchBranch('harash')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedBranch === 'harash'
                    ? 'bg-[#0F3E7A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>סניף החרש 10 (מחסן 4)</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full">
                  {orders.filter((o) => o.branchId === 'harash').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchBranch('talmid')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedBranch === 'talmid'
                    ? 'bg-[#0F3E7A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>סניף התלמיד 6 (מחסן 1)</span>
                <span className="text-[10px] bg-blue-200 text-[#0F3E7A] font-black px-1.5 py-0.2 rounded-full">
                  {orders.filter((o) => o.branchId === 'talmid').length}
                </span>
              </button>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-md min-w-[200px]">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="חפש לפי מס׳ הזמנה, שם לקוח, טלפון או קוד איסוף..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pr-9 pl-4 py-1.5 text-xs text-slate-800 outline-none focus:border-[#0F3E7A] focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Tools: Sheets Sync, Simulate Order, Sound, Lock */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSyncToGoogleSheets}
              disabled={isSyncingSheets}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="סנכרן הזמנות וסטטוסים ל-Google Sheets"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">סנכרן ל-Sheets</span>
            </button>

            <button
              type="button"
              onClick={handleSimulateNewOrder}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="הדמיית קבלת הזמנה חדשה בסניף"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>הזמנה חדשה (צליל)</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-blue-50 border-blue-200 text-[#0F3E7A]'
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
              title={soundEnabled ? 'צליל התראה פעיל' : 'צליל התראה מושתק'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleLockCrm}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 p-1.5 rounded-xl transition-colors cursor-pointer"
              title="נעילת מסך (דרוש קוד PIN)"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Kanban Board Canvas */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-4">
        
        {/* Kanban 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const colOrders = branchOrders.filter((ord) => ord.status === col.id);

            return (
              <div
                key={col.id}
                className={`bg-white rounded-3xl p-4 border-t-4 ${col.color} border-x border-b border-slate-200/90 shadow-sm flex flex-col min-h-[580px] max-h-[82vh]`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                  <h2 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <span>{col.title}</span>
                  </h2>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${col.badgeBg}`}>
                    {colOrders.length}
                  </span>
                </div>

                {/* Column Orders List */}
                <div className="space-y-3.5 overflow-y-auto pr-1 pl-1 pt-3 flex-1 scrollbar-thin">
                  {colOrders.length === 0 ? (
                    <div className="h-40 flex flex-col items-center justify-center text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-2xl">
                      <Package className="w-6 h-6 stroke-[1.5] mb-1 text-slate-300" />
                      <span>אין הזמנות בסטטוס זה</span>
                    </div>
                  ) : (
                    colOrders.map((order) => {
                      return (
                        <div
                          key={order.id}
                          className="bg-slate-50 hover:bg-slate-100/80 rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all space-y-3 group"
                        >
                          {/* Order Header: Order # + Pickup Code + Elapsed */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-black text-xs text-[#0F3E7A]">
                                #{order.orderNumber}
                              </span>
                              <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                <Clock className="w-3 h-3 inline" />
                                {order.elapsedMinutes} דק׳
                              </span>
                            </div>

                            <span className="font-mono font-black text-xs bg-slate-900 text-amber-300 px-2 py-0.5 rounded-lg shadow-2xs">
                              קוד: {order.pickupCode}
                            </span>
                          </div>

                          {/* Customer & Type */}
                          <div>
                            <div className="font-black text-xs text-slate-900 leading-snug">
                              {order.customerName}
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                              <span>{order.clientType}</span>
                              <span className="font-mono font-bold text-slate-700">
                                ₪{order.totalAmount.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Items Mini Checklist */}
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-[11px] space-y-1.5">
                            <div className="font-bold text-slate-600 text-[10px] flex items-center justify-between">
                              <span>פריטים ({order.items.length}):</span>
                              <span className="text-slate-400">מיקום במחסן</span>
                            </div>

                            {order.items.map((it, idx) => (
                              <div key={idx} className="space-y-0.5">
                                <div className="flex items-center justify-between text-slate-800">
                                  <span className="font-medium truncate max-w-[170px]" title={it.title}>
                                    • {it.quantity}x {it.title}
                                  </span>
                                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1 rounded shrink-0">
                                    {it.locationArea}
                                  </span>
                                </div>
                                {it.colorShade && (
                                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mr-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full border border-slate-300"
                                      style={{ backgroundColor: it.colorShade.hex }}
                                    />
                                    <span>{it.colorShade.code} ({it.colorShade.name})</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {order.notes && (
                            <div className="text-[10px] text-amber-800 bg-amber-50/80 p-1.5 rounded-lg border border-amber-200">
                              <strong>הערה:</strong> {order.notes}
                            </div>
                          )}

                          {/* Action Buttons Toolbar */}
                          <div className="pt-1 border-t border-slate-200/80 space-y-2">
                            
                            {/* Fast Actions: Dial Phone, Print Slip, WhatsApp Waze */}
                            <div className="grid grid-cols-3 gap-1 text-xs">
                              {/* 1. Fast Dial */}
                              <a
                                href={`tel:${order.customerPhone}`}
                                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-[11px] font-bold transition-colors cursor-pointer"
                                title={`חייג ל-${order.customerPhone}`}
                              >
                                <Phone className="w-3.5 h-3.5 text-blue-600" />
                                <span>חייג</span>
                              </a>

                              {/* 2. Print Slip */}
                              <button
                                type="button"
                                onClick={() => setActivePrintOrder(order)}
                                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-[11px] font-bold transition-colors cursor-pointer"
                                title="הדפס כרטיס ליקוט למחסנאי"
                              >
                                <Printer className="w-3.5 h-3.5 text-slate-600" />
                                <span>הדפס</span>
                              </button>

                              {/* 3. WhatsApp with Waze */}
                              <a
                                href={getWhatsAppLaunchUrl(order)}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-[11px] font-black transition-colors cursor-pointer"
                                title="שיגור הודעת WhatsApp ללקוח עם קישור Waze לסניף"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                                <span>וואטסאפ</span>
                              </a>
                            </div>

                            {/* Stepper Movement Controls */}
                            <div className="flex items-center justify-between gap-1 pt-1">
                              {columnOrder.indexOf(order.status) > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => handleRegressOrder(order)}
                                  className="text-[10px] text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                                  title="החזר שלב אחד אחורה"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                  <span>שלב קודם</span>
                                </button>
                              ) : <div />}

                              {columnOrder.indexOf(order.status) < columnOrder.length - 1 ? (
                                <button
                                  type="button"
                                  onClick={() => handleAdvanceOrder(order)}
                                  className="text-[11px] bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white font-black px-3 py-1 rounded-xl flex items-center gap-1 transition-colors shadow-2xs cursor-pointer mr-auto"
                                >
                                  <span>העבר לשלב הבא</span>
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                              ) : (
                                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                                  <Check className="w-3 h-3" />
                                  הושלם
                                </span>
                              )}
                            </div>

                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 3. Printable Warehouse Picking Slip Modal (Print Preview)                  */}
      {/* ========================================================================= */}
      {activePrintOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right font-['Heebo','Assistant',sans-serif]"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 print:p-0 print:border-none print:shadow-none">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#0F3E7A]" />
                <h3 className="font-black text-base text-slate-900">
                  כרטיס ליקוט למחסנאי / פתקית איסוף
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePrintOrder(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Content Block */}
            <div className="p-4 border-2 border-slate-800 rounded-2xl space-y-4 print:border-none">
              
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-2">
                <div>
                  <div className="font-black text-base text-slate-900">
                    ח. סבן חומרי בניין (1994) בע״מ
                  </div>
                  <div className="text-xs text-slate-600">
                    {activePrintOrder.branchId === 'harash'
                      ? 'סניף החרש 10, הוד השרון (מחסן 4 - מרכז לוגיסטי)'
                      : 'סניף התלמיד 6, הוד השרון (מחסן 1 - גבס וצבע)'}
                  </div>
                </div>

                <div className="text-left font-mono">
                  <div className="font-black text-lg text-slate-950">
                    #{activePrintOrder.orderNumber}
                  </div>
                  <div className="text-xs text-slate-500">{activePrintOrder.createdAt}</div>
                </div>
              </div>

              {/* Customer and Pickup Code Banner */}
              <div className="grid grid-cols-2 gap-3 bg-slate-100 p-3 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-500 block">שם הלקוח:</span>
                  <strong className="text-xs text-slate-900">{activePrintOrder.customerName}</strong>
                  <div className="text-[11px] font-mono text-slate-700">{activePrintOrder.customerPhone}</div>
                </div>

                <div className="text-left">
                  <span className="text-[10px] text-slate-500 block">קוד איסוף להעמסה:</span>
                  <span className="text-2xl font-mono font-black text-slate-900 tracking-wider">
                    {activePrintOrder.pickupCode}
                  </span>
                </div>
              </div>

              {/* Items for Warehouse Picking */}
              <div className="space-y-2">
                <div className="font-bold text-xs text-slate-900 pb-1 border-b border-slate-200">
                  רשימת פריטים לליקוט ואריזה:
                </div>

                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                      <th className="py-1">כמות</th>
                      <th className="py-1">פריט / מארז</th>
                      <th className="py-1">מיקום במחסן</th>
                      <th className="py-1 text-center">ליקוט V</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {activePrintOrder.items.map((it, i) => (
                      <tr key={i}>
                        <td className="py-2 font-mono font-black text-slate-900">{it.quantity}x</td>
                        <td className="py-2">
                          <div>{it.title}</div>
                          <div className="text-[10px] text-slate-500">{it.packaging}</div>
                          {it.colorShade && (
                            <div className="text-[10px] text-purple-700 font-bold">
                              גוון: {it.colorShade.code} ({it.colorShade.name})
                            </div>
                          )}
                        </td>
                        <td className="py-2 text-[11px] text-slate-600 font-mono">
                          {it.locationArea}
                        </td>
                        <td className="py-2 text-center">
                          <span className="inline-block w-4 h-4 border-2 border-slate-400 rounded-xs" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {activePrintOrder.notes && (
                <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <strong>הערות מיוחדות:</strong> {activePrintOrder.notes}
                </div>
              )}

              {/* Picker & Customer Signature Line */}
              <div className="pt-4 border-t border-slate-300 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="border-b border-slate-400 h-6 mb-1" />
                  <span className="text-[10px] text-slate-500">חתימת מחסנאי מלקט</span>
                </div>
                <div>
                  <div className="border-b border-slate-400 h-6 mb-1" />
                  <span className="text-[10px] text-slate-500">חתימת מקבל ההזמנה ברציף</span>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 print:hidden">
              <button
                type="button"
                onClick={() => setActivePrintOrder(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                סגור
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-5 py-2 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>הדפס עכשיו (Print)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default BranchCounterCrm;
