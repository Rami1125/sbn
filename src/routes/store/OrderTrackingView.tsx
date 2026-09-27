import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Navigation,
  QrCode,
  Printer,
  ChevronLeft,
  Volume2,
  Sparkles,
  ShieldCheck,
  Building2,
  User,
  ArrowRight,
  ExternalLink,
  Search,
  Check,
  Info,
  Layers,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { playOrderReadyChime } from '../../lib/oneSignal';
import { SABAN_WHATSAPP_PHONE } from '../../lib/whatsappDeepLink';
import { WhatsAppIcon } from '../../components/common/WhatsAppOrderButton';

export type FulfillmentType = 'bopis' | 'jobsite_delivery';
export type BopisStep = 'received' | 'picking' | 'ready';
export type DeliveryStep = 'received' | 'payment_confirmed' | 'loading' | 'on_the_way' | 'delivered';

export interface TrackingItem {
  sku: string;
  title: string;
  packaging: string;
  quantity: number;
  unitPrice: number;
  colorShade?: {
    code: string;
    name: string;
    hex: string;
  };
  image_link: string;
}

export interface TrackingOrder {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  clientType: 'contractor' | 'private';
  companyName?: string;
  fulfillmentType: FulfillmentType;
  
  bopisDetails?: {
    branchCode: 'SABAN_HARASH' | 'SABAN_TALMID';
    branchName: string;
    branchAddress: string;
    branchHours: string;
    branchPhone: string;
    dispatchBay: string;
    pickupCode: string;
    currentStep: BopisStep;
    wazeUrl: string;
    counterStaffName?: string;
  };

  deliveryDetails?: {
    jobsiteAddress: string;
    city: string;
    siteContactName: string;
    siteContactPhone: string;
    siteNotes?: string;
    truckType: 'משאית מרצדס מנוף כבד (28 מטר)' | 'משאית איסוזו חלוקה' | 'משאית מנוף (סדרה 18000, 28 מטר)' | 'משאית פלטה (סדרה 818000)' | string;
    truckNumber: string;
    driverName: 'חכמת' | 'עלי' | string;
    driverPhone: string;
    currentStep: DeliveryStep;
    estimatedArrivalWindow: string;
    destinationWazeUrl: string;
  };

  items: TrackingItem[];
  subtotal: number;
  vat: number;
  total: number;
  paymentStatus: 'paid' | 'phone_confirmed' | 'pending';
}

const SAMPLE_ORDERS: Record<string, TrackingOrder> = {
  'SAB-889413': {
    orderId: 'SAB-889413',
    createdAt: '26/09/2026 14:15',
    customerName: 'יוסי לוי (קבלן גמר ואיטום)',
    customerPhone: '050-8860896',
    clientType: 'contractor',
    companyName: 'לוי בנייה והשבחת מבנים בע״מ',
    fulfillmentType: 'bopis',
    bopisDetails: {
      branchCode: 'SABAN_HARASH',
      branchName: 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי ראשי)',
      branchAddress: 'רחוב החרש 10, אזור התעשייה נווה נאמן, הוד השרון',
      branchHours: 'א׳–ה׳ 06:30–16:30 | ו׳ 06:30–12:30',
      branchPhone: '03-9518888',
      dispatchBay: 'רציף איסוף מהיר מס׳ 3 (כניסה למסחריות ומלגזות)',
      pickupCode: '8894',
      currentStep: 'ready',
      wazeUrl: 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון',
      counterStaffName: 'אבי מסבן (אחראי רציף 3)'
    },
    items: [
      {
        sku: '10701',
        title: 'סיקה טופ 107 ערכה 25 ק״ג (SikaTop Seal-107) איטום צמנטי',
        packaging: 'ערכה מלאה 25 ק״ג (אבקה 20 ק״ג + נוזל 5 ק״ג)',
        quantity: 2,
        unitPrice: 155,
        colorShade: {
          code: 'GREY',
          name: 'אפור בטון',
          hex: '#8E9192'
        },
        image_link: 'https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg'
      },
      {
        sku: '11FC01',
        title: 'סיקפלקס 11FC פוליאוריטן אלסטי 600 מ״ל',
        packaging: 'שרוול נקניק 600 מ״ל לקבלנים',
        quantity: 12,
        unitPrice: 38,
        colorShade: {
          code: 'RAL 7004',
          name: 'אפור בהיר תקני',
          hex: '#9EA0A1'
        },
        image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 766,
    vat: 137.88,
    total: 903.88,
    paymentStatus: 'paid'
  },
  'SAB-552190': {
    orderId: 'SAB-552190',
    createdAt: '26/09/2026 11:30',
    customerName: 'אלכס קוזלוב (מנהל פרויקט)',
    customerPhone: '052-4419820',
    clientType: 'contractor',
    companyName: 'אופק השרון ייזום ובנייה',
    fulfillmentType: 'jobsite_delivery',
    deliveryDetails: {
      jobsiteAddress: 'רחוב דרך רמתיים 42, קומה 4',
      city: 'הוד השרון',
      siteContactName: 'אלכס (מנהל עבודה)',
      siteContactPhone: '052-4419820',
      siteNotes: 'הנפה עם מנוף ישירות למרפסת קומה 4. חניה פונתה מראש למשאית.',
      truckType: 'משאית מרצדס מנוף כבד (28 מטר)',
      truckNumber: '615-41-002',
      driverName: 'חכמת',
      driverPhone: '050-8860892',
      currentStep: 'on_the_way',
      estimatedArrivalWindow: '11:45 – 12:30 (המשאית כעת בנסיעה)',
      destinationWazeUrl: 'https://waze.com/ul?q=דרך רמתיים 42 הוד השרון'
    },
    items: [
      {
        sku: 'NESHER-50',
        title: 'מלט פורטלנד כחול CEM II/B-LL 42.5N נשר',
        packaging: 'משטח עץ מלא - 40 שקים (50 ק״ג)',
        quantity: 1,
        unitPrice: 1240,
        image_link: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80'
      },
      {
        sku: 'SAND-BAG-1',
        title: 'חול ים שטוף ומנופה בלה גדולה',
        packaging: 'שק בלה ענק כ-1 טון',
        quantity: 3,
        unitPrice: 220,
        image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 1900,
    vat: 342,
    total: 2242,
    paymentStatus: 'phone_confirmed'
  },
  'SAB-741290': {
    orderId: 'SAB-741290',
    createdAt: '25/09/2026 08:00',
    customerName: 'דניאל שפירא (לקוח פרטי)',
    customerPhone: '054-9128833',
    clientType: 'private',
    fulfillmentType: 'jobsite_delivery',
    deliveryDetails: {
      jobsiteAddress: 'רחוב הבנים 14',
      city: 'הוד השרון',
      siteContactName: 'דניאל',
      siteContactPhone: '054-9128833',
      siteNotes: 'פריקה בחניית הבית הפרטי.',
      truckType: 'משאית איסוזו חלוקה',
      truckNumber: '651-51-701',
      driverName: 'עלי',
      driverPhone: '050-8860894',
      currentStep: 'delivered',
      estimatedArrivalWindow: 'נפרק בהצלחה אתמול ב-10:15',
      destinationWazeUrl: 'https://waze.com/ul?q=הבנים 14 הוד השרון'
    },
    items: [
      {
        sku: 'TAMBUR-2000',
        title: 'סופרקריל 2000 צבע אקרילי עליון לקירות פנים',
        packaging: 'פח 18 ליטר',
        quantity: 1,
        unitPrice: 329,
        colorShade: {
          code: 'IS 0015',
          name: 'לבן משי יוקרתי',
          hex: '#F4F4F0'
        },
        image_link: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 329,
    vat: 59.22,
    total: 388.22,
    paymentStatus: 'paid'
  },
  'SAB-320911': {
    orderId: 'SAB-320911',
    createdAt: '26/09/2026 15:00',
    customerName: 'רונן ברק (קבלן גבס וצבע)',
    customerPhone: '050-7119022',
    clientType: 'contractor',
    fulfillmentType: 'bopis',
    bopisDetails: {
      branchCode: 'SABAN_TALMID',
      branchName: 'סניף התלמיד 6 (מחסן 1 - גבס, צבע ופרזול)',
      branchAddress: 'רחוב התלמיד 6, אזור התעשייה, הוד השרון',
      branchHours: 'א׳–ה׳ 06:30–16:30 | ו׳ 06:30–12:30',
      branchPhone: '03-9518889',
      dispatchBay: 'דלפק אקספרס ואיסוף קבלנים',
      pickupCode: '3209',
      currentStep: 'picking',
      wazeUrl: 'https://waze.com/ul?q=רחוב התלמיד 6 הוד השרון',
      counterStaffName: 'שאול (מחלקת גיוון טמבור)'
    },
    items: [
      {
        sku: 'NIRLAT-EXTRA',
        title: 'נירוקריל אקסטרה בגימור מט משי מהודר',
        packaging: 'פח 18 ליטר (מכונת גיוון)',
        quantity: 2,
        unitPrice: 345,
        colorShade: {
          code: 'NWC 020',
          name: 'אפור אבן קטיפתי',
          hex: '#D7D6D2'
        },
        image_link: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 690,
    vat: 124.2,
    total: 814.2,
    paymentStatus: 'phone_confirmed'
  }
};

interface OrderTrackingViewProps {
  orderId?: string;
  onNavigateHome: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orderId = 'SAB-889413',
  onNavigateHome
}) => {
  const [activeOrderId, setActiveOrderId] = useState<string>(orderId);
  const [searchInput, setSearchInput] = useState<string>(orderId);
  const [isChimePlayed, setIsChimePlayed] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Synchronize state when orderId prop updates
  useEffect(() => {
    if (orderId && orderId !== activeOrderId) {
      setActiveOrderId(orderId);
      setSearchInput(orderId);
    }
  }, [orderId]);

  // Determine order object or generate fallback
  const order: TrackingOrder = SAMPLE_ORDERS[activeOrderId] || {
    orderId: activeOrderId,
    createdAt: '26/09/2026',
    customerName: 'לקוח סבן חומרי בניין',
    customerPhone: '050-8860896',
    clientType: 'contractor',
    fulfillmentType: 'bopis',
    bopisDetails: {
      branchCode: 'SABAN_HARASH',
      branchName: 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)',
      branchAddress: 'רחוב החרש 10, אזור התעשייה, הוד השרון',
      branchHours: 'א׳–ה׳ 06:30–16:30 | ו׳ 06:30–12:30',
      branchPhone: '03-9518888',
      dispatchBay: 'רציף איסוף מהיר מס׳ 3',
      pickupCode: activeOrderId.replace(/\D/g, '').slice(-4) || '9518',
      currentStep: 'ready',
      wazeUrl: 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון'
    },
    items: [
      {
        sku: '10701',
        title: 'סיקה טופ 107 ערכה 25 ק״ג - איטום צמנטי',
        packaging: 'ערכה מלאה 25 ק״ג',
        quantity: 1,
        unitPrice: 155,
        image_link: 'https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg'
      }
    ],
    subtotal: 155,
    vat: 27.9,
    total: 182.9,
    paymentStatus: 'paid'
  };

  const isBopis = order.fulfillmentType === 'bopis';
  const isDelivery = order.fulfillmentType === 'jobsite_delivery';

  // Play pleasant chime on first load if order is ready or truck is on the way
  useEffect(() => {
    if (!isChimePlayed) {
      const isReadyOrOnTheWay =
        (isBopis && order.bopisDetails?.currentStep === 'ready') ||
        (isDelivery && order.deliveryDetails?.currentStep === 'on_the_way');

      if (isReadyOrOnTheWay) {
        playOrderReadyChime();
        setIsChimePlayed(true);
      }
    }
  }, [activeOrderId, isBopis, isDelivery, isChimePlayed, order]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (clean) {
      setActiveOrderId(clean);
      window.history.pushState({ orderId: clean }, '', `/track/${clean}`);
    }
  };

  const handleManualChime = () => {
    playOrderReadyChime();
  };

  const handlePrintSlip = () => {
    window.print();
  };

  // WhatsApp Inquiry URL pre-filled with order details
  const whatsappInquiryUrl = `https://wa.me/${SABAN_WHATSAPP_PHONE}?text=${encodeURIComponent(
    `שלום לדלפק סבן, ברצוני לברר לגבי הזמנה מס׳ ${order.orderId} על שם ${order.customerName}.\nסוג אספקה: ${
      isBopis ? `איסוף עצמי (${order.bopisDetails?.branchName})` : `הובלה לאתר (${order.deliveryDetails?.jobsiteAddress})`
    }\nסטטוס נוכחי: ${
      isBopis
        ? order.bopisDetails?.currentStep === 'ready'
          ? 'מוכן בדלפק לאיסוף'
          : order.bopisDetails?.currentStep === 'picking'
          ? 'בגיוון וליקוט'
          : 'הזמנה נקלטה'
        : order.deliveryDetails?.currentStep === 'on_the_way'
        ? 'המשאית בדרך לאתר'
        : order.deliveryDetails?.currentStep === 'delivered'
        ? 'נפרק בהצלחה'
        : 'בטיפול לוגיסטי'
    }`
  )}`;

  // Stepper Configurations
  const bopisSteps: Array<{ key: BopisStep; label: string; desc: string }> = [
    { key: 'received', label: '1. הזמנה נקלטה', desc: 'אישור תשלום במערכת קומקס' },
    { key: 'picking', label: '2. בגיוון / ליקוט במחסן', desc: 'אריזה ברציף והכנת משטח' },
    { key: 'ready', label: '3. מוכן בדלפק לאיסוף! ✓', desc: 'ממתין להעמסה ללא תור' }
  ];

  const deliverySteps: Array<{ key: DeliveryStep; label: string; desc: string }> = [
    { key: 'received', label: '1. הזמנה נקלטה', desc: 'פרטי הפרויקט נרשמו' },
    { key: 'payment_confirmed', label: '2. חיוב טלפוני אושר', desc: 'אישור חשבונית מס' },
    { key: 'loading', label: '3. העמסה בחצר מחסן 4', desc: 'קשירת בלות ומשטחים' },
    { key: 'on_the_way', label: '4. המשאית בדרך לאתר 🚚', desc: 'בנסיעה לאתר הבנייה' },
    { key: 'delivered', label: '5. נפרק בהצלחה ✓', desc: 'חתימה על תעודת משלוח' }
  ];

  const getBopisStepIndex = (step: BopisStep): number => {
    switch (step) {
      case 'received': return 0;
      case 'picking': return 1;
      case 'ready': return 2;
      default: return 0;
    }
  };

  const getDeliveryStepIndex = (step: DeliveryStep): number => {
    switch (step) {
      case 'received': return 0;
      case 'payment_confirmed': return 1;
      case 'loading': return 2;
      case 'on_the_way': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentBopisIdx = order.bopisDetails ? getBopisStepIndex(order.bopisDetails.currentStep) : 0;
  const currentDeliveryIdx = order.deliveryDetails ? getDeliveryStepIndex(order.deliveryDetails.currentStep) : 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 pt-4 font-['Heebo','Assistant',sans-serif] text-right text-slate-800">
      
      {/* Top App Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb & Quick Actions Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#0F3E7A] font-bold cursor-pointer flex items-center gap-1"
            >
              <span>חנות סבן</span>
            </button>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-extrabold">מעקב הזמנות חי (Live Tracking)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintSlip}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              title="הדפס או שמור פתקית איסוף"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>הדפס פתקית</span>
            </button>

            <button
              type="button"
              onClick={handleManualChime}
              className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-[#0F3E7A] border border-blue-200 font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="בדיקת צליל פעמון התראה"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-700" />
              <span className="hidden sm:inline">צליל Chime</span>
            </button>
          </div>
        </div>

        {/* Order Selector & Search Strip */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Search className="w-4 h-4 text-[#0F3E7A]" />
            <span>הזמנות לדוגמה לבדיקה:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveOrderId('SAB-889413');
                setSearchInput('SAB-889413');
              }}
              className={`px-3 py-1 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                activeOrderId === 'SAB-889413'
                  ? 'bg-[#0F3E7A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              איסוף עצמי (מוכן לאיסוף)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveOrderId('SAB-552190');
                setSearchInput('SAB-552190');
              }}
              className={`px-3 py-1 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                activeOrderId === 'SAB-552190'
                  ? 'bg-[#0F3E7A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              הובלת מנוף לאתר (בדרך 🚚)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveOrderId('SAB-320911');
                setSearchInput('SAB-320911');
              }}
              className={`px-3 py-1 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                activeOrderId === 'SAB-320911'
                  ? 'bg-[#0F3E7A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              איסוף התלמיד (בליקוט)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveOrderId('SAB-741290');
                setSearchInput('SAB-741290');
              }}
              className={`px-3 py-1 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                activeOrderId === 'SAB-741290'
                  ? 'bg-[#0F3E7A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              הובלת פלטה (נפרק)
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 w-full sm:w-auto mt-2 sm:mt-0">
            <input
              type="text"
              dir="ltr"
              placeholder="מס׳ הזמנה: SAB-..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1 text-xs font-mono font-bold uppercase outline-none focus:border-[#0F3E7A] w-36"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1 rounded-xl text-xs cursor-pointer"
            >
              אתר
            </button>
          </form>
        </div>

        {/* Hero Order Status Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono font-black text-xl sm:text-2xl text-[#0F3E7A] tracking-wider">
                  #{order.orderId}
                </span>

                {isBopis ? (
                  <span className="bg-blue-50 text-[#0F3E7A] border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>איסוף עצמי מהדלפק (BOPIS)</span>
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    <span>הובלה ופריקה ישירה לאתר (Jobsite Delivery)</span>
                  </span>
                )}

                <span className="text-xs text-slate-400 font-medium">
                  נקלטה: {order.createdAt}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {isBopis && order.bopisDetails?.currentStep === 'ready' && (
                  <span className="text-emerald-700 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-ping" />
                    ההזמנה מוכנה וממתינה לך ברציף!
                  </span>
                )}
                {isBopis && order.bopisDetails?.currentStep === 'picking' && (
                  <span className="text-amber-700">
                    ההזמנה כעת בליקוט והכנה במחסן
                  </span>
                )}
                {isBopis && order.bopisDetails?.currentStep === 'received' && (
                  <span className="text-slate-800">
                    ההזמנה נקלטה במערכת סבן
                  </span>
                )}

                {isDelivery && order.deliveryDetails?.currentStep === 'on_the_way' && (
                  <span className="text-[#0F3E7A] flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block animate-bounce" />
                    המשאית בדרך לאתר הבנייה! 🚚
                  </span>
                )}
                {isDelivery && order.deliveryDetails?.currentStep === 'delivered' && (
                  <span className="text-emerald-700">
                    החומרים נפרקו בהצלחה באתר ✓
                  </span>
                )}
                {isDelivery && order.deliveryDetails?.currentStep === 'loading' && (
                  <span className="text-amber-800">
                    החומרים מועמסים כעת בחצר מחסן 4
                  </span>
                )}
                {isDelivery && (order.deliveryDetails?.currentStep === 'received' || order.deliveryDetails?.currentStep === 'payment_confirmed') && (
                  <span className="text-slate-800">
                    הזמנת ההובלה אושרה ונמצאת בשיבוץ
                  </span>
                )}
              </h1>

              <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                <span>לקוח: <strong>{order.customerName}</strong></span>
                {order.companyName && (
                  <>
                    <span>•</span>
                    <span className="text-slate-500">{order.companyName}</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick Action in Banner */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
              {isBopis && (
                <a
                  href={order.bopisDetails?.wazeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white font-black text-xs px-4 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>נווט לסניף ב-Waze</span>
                </a>
              )}

              {isDelivery && (
                <a
                  href={`tel:${order.deliveryDetails?.driverPhone}`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>חייג לנהג ({order.deliveryDetails?.driverName})</span>
                </a>
              )}

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs px-4 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>שאלת בירור מול הדלפק</span>
              </a>
            </div>
          </div>

          {/* Stepper Visualization */}
          <div className="pt-8 pb-4">
            
            {/* BOPIS 3-Step Stepper */}
            {isBopis && (
              <div className="relative">
                <div className="hidden sm:block absolute top-5 right-6 left-6 h-1 bg-slate-100 z-0">
                  <div
                    className="h-full bg-[#0F3E7A] transition-all duration-500"
                    style={{
                      width: currentBopisIdx === 0 ? '0%' : currentBopisIdx === 1 ? '50%' : '100%'
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                  {bopisSteps.map((step, idx) => {
                    const isDone = idx <= currentBopisIdx;
                    const isCurrent = idx === currentBopisIdx;

                    return (
                      <div key={step.key} className="flex sm:flex-col items-center sm:items-center text-right sm:text-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all shrink-0 ${
                            isDone
                              ? 'bg-[#0F3E7A] text-white shadow-md ring-4 ring-blue-100'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isDone ? <Check className="w-5 h-5 text-amber-300 stroke-[3]" /> : idx + 1}
                        </div>

                        <div>
                          <div
                            className={`font-black text-xs sm:text-sm ${
                              isCurrent ? 'text-[#0F3E7A]' : isDone ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Jobsite Delivery 5-Step Stepper */}
            {isDelivery && (
              <div className="relative">
                <div className="hidden md:block absolute top-5 right-6 left-6 h-1 bg-slate-100 z-0">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{
                      width: `${(currentDeliveryIdx / (deliverySteps.length - 1)) * 100}%`
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                  {deliverySteps.map((step, idx) => {
                    const isDone = idx <= currentDeliveryIdx;
                    const isCurrent = idx === currentDeliveryIdx;

                    return (
                      <div key={step.key} className="flex md:flex-col items-center md:items-center text-right md:text-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all shrink-0 ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950 shadow-md ring-4 ring-amber-100 animate-pulse'
                              : isDone
                              ? 'bg-[#0F3E7A] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4 text-white stroke-[3]" /> : idx + 1}
                        </div>

                        <div>
                          <div
                            className={`font-black text-xs ${
                              isCurrent ? 'text-amber-800' : isDone ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 2-Column Grid: Left Logistics Spec & Right Items Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (Fulfillment Info & Barcode) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* BOPIS Branch Card */}
            {isBopis && order.bopisDetails && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#0F3E7A]" />
                    <h2 className="text-base font-black text-slate-900">
                      פרטי סניף האיסוף ורציף ההעמסה
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg font-bold">
                    {order.bopisDetails.branchCode}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-extrabold text-sm text-[#0F3E7A] block">
                      {order.bopisDetails.branchName}
                    </span>
                    <span className="text-slate-600 mt-0.5 block flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{order.bopisDetails.branchAddress}</span>
                    </span>
                  </div>

                  <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200/80 space-y-1.5">
                    <div className="font-black text-xs text-blue-900 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-[#0F3E7A]" />
                      <span>מיקום העמסה ייעודי:</span>
                    </div>
                    <div className="text-slate-800 font-bold">
                      {order.bopisDetails.dispatchBay}
                    </div>
                    {order.bopisDetails.counterStaffName && (
                      <div className="text-[11px] text-slate-500">
                        אחראי משמרת ודלפק: <strong>{order.bopisDetails.counterStaffName}</strong>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 pt-1">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">שעות פעילות:</span>
                      <strong className="text-slate-900">{order.bopisDetails.branchHours}</strong>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block">טלפון ישיר לדלפק:</span>
                      <a href={`tel:${order.bopisDetails.branchPhone}`} className="text-[#0F3E7A] font-bold font-mono hover:underline">
                        {order.bopisDetails.branchPhone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={order.bopisDetails.wazeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-300" />
                    <span>Waze לסניף</span>
                  </a>

                  <a
                    href={`tel:${order.bopisDetails.branchPhone}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-300 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>חיוג מהיר לדלפק</span>
                  </a>
                </div>
              </div>
            )}

            {/* Jobsite Delivery Spec Card */}
            {isDelivery && order.deliveryDetails && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-amber-600" />
                    <h2 className="text-base font-black text-slate-900">
                      פרטי משאית, נהג ויעד הפריקה
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg font-bold">
                    משאית {order.deliveryDetails.truckNumber}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Arrival Window Spotlight */}
                  <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-2xl space-y-1">
                    <div className="text-[11px] font-bold text-amber-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>חלון הגעה משוער לאתר:</span>
                    </div>
                    <div className="text-base font-black text-slate-950 font-mono">
                      {order.deliveryDetails.estimatedArrivalWindow}
                    </div>
                  </div>

                  {/* Destination Address */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 block">כתובת אתר הבנייה:</span>
                    <strong className="text-slate-900 text-sm block">
                      {order.deliveryDetails.jobsiteAddress}, {order.deliveryDetails.city}
                    </strong>
                    {order.deliveryDetails.siteNotes && (
                      <div className="text-[11px] text-blue-900 bg-blue-50 p-2 rounded-xl border border-blue-200 mt-2">
                        <strong>הערות פריקה:</strong> {order.deliveryDetails.siteNotes}
                      </div>
                    )}
                  </div>

                  {/* Truck & Driver Specifications */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-slate-500 block">כלי רכב משובץ:</span>
                      <strong className="text-slate-900 block">{order.deliveryDetails.truckType}</strong>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-slate-500 block">נהג המשאית:</span>
                      <strong className="text-slate-900 block text-xs">{order.deliveryDetails.driverName}</strong>
                      <span className="text-slate-500 font-mono">{order.deliveryDetails.driverPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={`tel:${order.deliveryDetails.driverPhone}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    <span>חייג לנהג ({order.deliveryDetails.driverName})</span>
                  </a>

                  <a
                    href={order.deliveryDetails.destinationWazeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-300 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-slate-600" />
                    <span>Waze לכתובת האתר</span>
                  </a>
                </div>
              </div>
            )}

            {/* High-Contrast Pickup Barcode & QR Code Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                <span className="font-black text-slate-900 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#0F3E7A]" />
                  <span>קוד וברקוד איסוף להצגה ברציף</span>
                </span>
                <span className="text-slate-400">לסריקה מהירה</span>
              </div>

              {/* Huge 4-digit code */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-inner">
                <span className="text-[11px] text-slate-400 block mb-1">
                  קוד איסוף מהיר (מסור למלגזן / דלפק):
                </span>
                <div className="text-4xl sm:text-5xl font-mono font-black text-amber-300 tracking-widest">
                  {isBopis && order.bopisDetails?.pickupCode ? order.bopisDetails.pickupCode : order.orderId.replace(/\D/g, '').slice(-4) || '8894'}
                </div>
              </div>

              {/* Styled Vector Barcode Representation */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
                <div className="flex items-end justify-center h-14 gap-[3px] w-full max-w-xs px-2">
                  {[2, 4, 1, 3, 2, 4, 1, 2, 4, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 4, 1].map((w, i) => (
                    <div
                      key={i}
                      className="bg-slate-950 rounded-xs"
                      style={{
                        width: `${w * 2.2}px`,
                        height: i % 5 === 0 ? '100%' : i % 3 === 0 ? '85%' : '75%'
                      }}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-slate-600 mt-1 tracking-widest">
                  *{order.orderId}*
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowQrModal(true)}
                  className="text-xs text-[#0F3E7A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>הגדל קוד QR לסריקה</span>
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>הדפסת שובר</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Ordered Items, Quantities, Tints & Totals */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#0F3E7A]" />
                  <h2 className="text-base font-black text-slate-900">
                    פירוט מוצרים ומארזים בהזמנה
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {order.items.length} פריטים
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={item.image_link}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-contain bg-white border border-slate-200 p-1 shrink-0"
                      />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold bg-slate-200 text-slate-700 px-2 py-0.2 rounded">
                            מק״ט: {item.sku}
                          </span>
                        </div>

                        <h3 className="font-black text-sm text-slate-900 leading-snug">
                          {item.title}
                        </h3>

                        <div className="text-xs text-slate-500 font-medium">
                          מארז: <strong className="text-slate-700">{item.packaging}</strong>
                        </div>

                        {/* Tint Shade Badge if exists */}
                        {item.colorShade && (
                          <div className="inline-flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-slate-200 text-xs">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs shrink-0"
                              style={{ backgroundColor: item.colorShade.hex }}
                            />
                            <span className="font-mono font-bold text-slate-900">{item.colorShade.code}</span>
                            <span className="text-slate-500 font-medium">({item.colorShade.name})</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 shrink-0">
                      <div className="text-xs text-slate-500">
                        כמות: <strong className="text-slate-900 text-sm">{item.quantity}</strong> יח׳
                      </div>
                      <div className="font-mono font-black text-base text-[#0F3E7A]">
                        ₪{(item.unitPrice * item.quantity).toFixed(2)} ILS
                      </div>
                      <div className="text-[10px] text-slate-400">
                        (₪{item.unitPrice.toFixed(2)} ליח׳)
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>סכום ביניים (לפני מע״מ):</span>
                  <span className="font-mono font-bold">₪{order.subtotal.toFixed(2)} ILS</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>מע״מ כחוק (18%):</span>
                  <span className="font-mono font-bold">₪{order.vat.toFixed(2)} ILS</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>דמי איסוף / העמסה ברציף:</span>
                  <span className="font-bold text-emerald-600">חינם (איסוף סבן)</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between text-sm sm:text-base">
                  <span className="font-black text-slate-900">סה״כ כולל מע״מ לתשלום:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#0F3E7A] font-mono">
                      ₪{order.total.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-slate-500">ILS</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>סטטוס חיוב:</span>
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    {order.paymentStatus === 'paid' ? 'שולם במלואו' : 'אושר טלפונית בהסדר קבלן'}
                  </span>
                </div>
              </div>

              {/* Official Saban Guarantee & Return Policy Note */}
              <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-200/80 flex items-start gap-3 text-xs text-slate-700">
                <ShieldCheck className="w-5 h-5 text-[#0F3E7A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold text-[#0F3E7A]">
                    תעודת איכות ואספקה מקורית - ח. סבן חומרי בניין (1994) בע״מ:
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    כל החומרים נשמרים במחסנים מקורים ומבוקרי טמפרטורה. בדיקת תקינות מארזים מתבצעת ברציף האיסוף לפני שחרור הסחורה. מדיניות ביטול והחזרה בהתאם לתקנון החברה (14 יום באריזה מקורית סגורה).
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* QR Code Magnified Modal */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-sm text-[#0F3E7A]">קוד QR להעמסה מהירה</h3>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              {/* High-Res QR SVG Representation */}
              <div className="bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-md">
                <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="#FFFFFF"/>
                  {/* Position detection markers */}
                  <rect x="5" y="5" width="28" height="28" stroke="#0F3E7A" strokeWidth="6" fill="#FFFFFF"/>
                  <rect x="13" y="13" width="12" height="12" fill="#0F3E7A"/>
                  <rect x="67" y="5" width="28" height="28" stroke="#0F3E7A" strokeWidth="6" fill="#FFFFFF"/>
                  <rect x="75" y="13" width="12" height="12" fill="#0F3E7A"/>
                  <rect x="5" y="67" width="28" height="28" stroke="#0F3E7A" strokeWidth="6" fill="#FFFFFF"/>
                  <rect x="13" y="75" width="12" height="12" fill="#0F3E7A"/>
                  {/* Simulated QR data matrix */}
                  <rect x="42" y="10" width="8" height="8" fill="#0F3E7A"/>
                  <rect x="52" y="18" width="6" height="6" fill="#0F3E7A"/>
                  <rect x="40" y="32" width="12" height="6" fill="#0F3E7A"/>
                  <rect x="60" y="40" width="10" height="8" fill="#0F3E7A"/>
                  <rect x="15" y="45" width="8" height="8" fill="#0F3E7A"/>
                  <rect x="28" y="52" width="14" height="6" fill="#0F3E7A"/>
                  <rect x="45" y="60" width="8" height="12" fill="#0F3E7A"/>
                  <rect x="65" y="65" width="10" height="6" fill="#0F3E7A"/>
                  <rect x="80" y="75" width="12" height="8" fill="#0F3E7A"/>
                  <rect x="40" y="80" width="14" height="6" fill="#0F3E7A"/>
                </svg>
              </div>

              <div className="font-mono font-black text-lg text-slate-900">
                #{order.orderId}
              </div>
              <div className="text-xs text-slate-500 text-center">
                הצג למלגזן ברציף האיסוף או לסורק הברקודים בדלפק סבן
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full bg-[#0F3E7A] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              סגור חלון
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
