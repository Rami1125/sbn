import React, { useEffect } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  MessageCircle,
  Package,
  FileText,
  HelpCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { SabanLogo } from '../../components/layout/SabanLogo';

interface ReturnsPolicyPageProps {
  onNavigateHome?: () => void;
}

export const ReturnsPolicyPage: React.FC<ReturnsPolicyPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const prevTitle = document.title;
    document.title = 'מדיניות החזרות וביטולים | ח. סבן חומרי בניין (1994) בע״מ';

    // Inject Schema.org for MerchantReturnPolicy
    const returnPolicySchema = {
      '@context': 'https://schema.org',
      '@type': 'MerchantReturnPolicy',
      name: 'מדיניות החזרות וביטולים - ח. סבן חומרי בניין (1994) בע״מ',
      merchantReturnDays: 14,
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      returnMethod: 'https://schema.org/ReturnInStore',
      returnFees: 'https://schema.org/FreeReturn',
      applicableCountry: 'IL',
      itemCondition: 'https://schema.org/NewCondition',
      refundType: 'https://schema.org/FullRefund',
      restockingFee: {
        '@type': 'MonetaryAmount',
        value: 0,
        currency: 'ILS'
      },
      merchantReturnLink: 'https://sbn-xi.vercel.app/returns',
      customerRemorseReturnFees: 'https://schema.org/FreeReturn',
      itemDefectReturnFees: 'https://schema.org/FreeReturn',
      seller: {
        '@type': 'Organization',
        name: 'ח. סבן חומרי בניין (1994) בע״מ',
        telephone: '09-7602010',
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: 'רחוב החרש 10',
            addressLocality: 'הוד השרון',
            addressCountry: 'IL'
          },
          {
            '@type': 'PostalAddress',
            streetAddress: 'רחוב התלמיד 6',
            addressLocality: 'הוד השרון',
            addressCountry: 'IL'
          }
        ]
      }
    };

    const existingScript = document.getElementById('saban-return-policy-schema');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(returnPolicySchema);
    } else {
      const script = document.createElement('script');
      script.id = 'saban-return-policy-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(returnPolicySchema);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 text-slate-800">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-200/80 pb-3">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="hover:text-[#0F3E7A] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>דף הבית וקטלוג</span>
            </button>
          )}
          <span>/</span>
          <span className="font-semibold text-slate-800">מדיניות החזרות וביטול עסקה</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="relative overflow-hidden bg-gradient-to-l from-[#0F3E7A] via-[#15529C] to-[#0A2E5C] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-900/50">
          <div className="relative z-10 space-y-3 max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/30 text-amber-300 px-3 py-1 rounded-full text-xs font-black tracking-wide">
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>תקנון רשמי • בהתאם לחוק הגנת הצרכן</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              מדיניות החזרות, ביטולים וזיכויים
            </h1>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
              בחברת <strong className="text-white font-extrabold">ח. סבן חומרי בניין (1994) בע״מ</strong> אנו מחויבים לשקיפות מלאה, שירות ללא פשרות, וגמישות מרבית עבור לקוחותינו הפרטיים וקהילת הקבלנים.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-blue-100">
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>החזרה עד 14 יום</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>החזרה חינם בסניפים</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-300" />
                <span>זיכוי תוך 7 ימי עסקים</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block absolute -left-6 -bottom-8 opacity-10 pointer-events-none">
            <RotateCcw className="w-64 h-64 text-white" />
          </div>
        </div>
      </div>

      {/* Main Policy Cards Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Grid of Core Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Section 1: 14 Days Return Window */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0F3E7A] flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-[#0F3E7A] tracking-wider uppercase bg-blue-50 px-2 py-0.5 rounded">
                  סעיף 1 • זמני החזרה
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  ביטול עסקה והחזרת מוצרים
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              הלקוח רשאי לבטל עסקה ולהחזיר מוצרים תוך <strong>עד 14 יום</strong> ממועד קבלת הפריט או איסופו מן הסניף, בהתאם להוראות <strong>חוק הגנת הצרכן הישראלי, התשמ״א-1981</strong> ותקנות ביטול עסקה.
            </p>
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>עבור אזרחים ותיקים, עולים חדשים ובעלי מוגבלויות – עד 4 חודשים כקבוע בחוק.</span>
            </div>
          </div>

          {/* Section 2: Product Condition */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  סעיף 2 • מצב הפריט
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  תנאי ההחזרה ומצב הציוד
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              המוצר יוחזר <strong>חדש, באריזתו המקורית הסגורה והתקינה</strong>, ללא כל סימני שימוש, ללא פגם, וללא פתיחה של אריזות הרמטיות (כגון שקי צמנט, ערכות סיקה, פחי צבע או תרמילי איטום).
            </p>
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>יש להציג חשבונית מס / קוד הזמנה מקורי בעת ההגעה לסניף.</span>
            </div>
          </div>

          {/* Section 3: In-Store Free Returns */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-amber-700 tracking-wider uppercase bg-amber-50 px-2 py-0.5 rounded">
                  סעיף 3 • נקודות שירות
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  החזרה בסניפים ללא עלות
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              החזרת המוצרים מתבצעת <strong>ללא כל עלות טיפול או דמי ביטול</strong> ישירות בדלפקי האיסוף והמחסנים בסניפי סבן:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F3E7A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">סניף החרש 10, הוד השרון</strong>
                  <span className="text-slate-500">מחסן 4 - מרכז לוגיסטי וחומרי שלד/איטום (גישה נוחה לרכבים כבדים)</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F3E7A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">סניף התלמיד 6, הוד השרון</strong>
                  <span className="text-slate-500">מחסן 1 - גבס, צבע ופרזול (דלפק מהיר)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Special Exclusions */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-sm space-y-3 bg-gradient-to-br from-amber-50/40 via-white to-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-amber-800 tracking-wider uppercase bg-amber-200/70 px-2 py-0.5 rounded">
                  סעיף 4 • החרגות חשובות
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  החרגות מיוחדות – צבעים שגונו במיוחד
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              בהתאם לסעיף 14ג(ד) לחוק הגנת הצרכן: <strong>טובין שיוצרו או הותאמו במיוחד עבור הצרכן אינם ניתנים להחזרה או לביטול</strong>.
            </p>
            <div className="bg-white rounded-xl p-3 text-xs text-amber-900 border border-amber-200 shadow-inner space-y-1">
              <strong>הבהרה לגבי צבעים:</strong> צבעי טמבור או כל מוצר אשר עבר גיוון במכונת גיוון ייעודית לפי קוד גוון שהוזמן (כגון מניפת 0524T וכו׳) מוגדרים כמוצר מותאם אישית ולא ניתן לבטלם או להחליפם לאחר ביצוע הגיוון.
            </div>
          </div>

        </div>

        {/* Section 5: Refund Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0F3E7A] flex items-center justify-center font-bold">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-[#0F3E7A] tracking-wider uppercase bg-blue-50 px-2 py-0.5 rounded">
                סעיף 5 • החזר כספי
              </span>
              <h2 className="text-xl font-black text-slate-900">
                זיכוי כספי ואמצעי תשלום
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            זיכוי כספי יבוצע ישירות <strong>לאמצעי התשלום המקורי</strong> שממנו בוצעה העסקה (כרטיס אשראי, העברה בנקאית או צ׳ק מסחרי לקבלנים) בתוך <strong>עד 7 ימי עסקים</strong> ממועד קבלת המוצר ובדיקתו על ידי מנהל המחסן בסניף.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block font-medium">זמן ביצוע הזיכוי:</span>
              <strong className="text-slate-900 text-sm">תוך 7 ימי עסקים</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block font-medium">ערוץ הזיכוי:</span>
              <strong className="text-slate-900 text-sm">אמצעי התשלום המקורי</strong>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500 block font-medium">אישור זיכוי:</span>
              <strong className="text-slate-900 text-sm">חשבונית זיכוי נשלחת ב-WhatsApp / מייל</strong>
            </div>
          </div>
        </div>

        {/* Section 6: Customer Service & Contact Desk */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0F3E7A] to-[#0A2E5C] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                סעיף 6 • שירות לקוחות סבן
              </span>
              <h2 className="text-2xl font-black">
                שירות לקוחות ופניות בנושא החזרות
              </h2>
              <p className="text-xs sm:text-sm text-blue-200">
                צוות דלפק השירות והלוגיסטיקה שלנו עומד לרשותכם בכל שאלה, תיאום החזרה או בירור מלאי.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-300">דלפקי השירות פעילים כעת</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-900">
            
            {/* Phone */}
            <a
              href="tel:09-7602010"
              className="bg-white hover:bg-slate-100 p-4 rounded-2xl border border-white/20 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">מענה טלפוני רציף</span>
                <Phone className="w-5 h-5 text-[#0F3E7A] group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2">
                <span className="text-lg font-black font-mono text-[#0F3E7A] block">
                  09-7602010
                </span>
                <span className="text-[11px] text-slate-500">לחץ לחיוג ישיר לדלפק</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/97297602010?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%A8%D7%A6%D7%99%D7%AA%D7%99%20%D7%9C%D7%91%D7%A8%D7%A8%20%D7%9C%D7%92%D7%91%D7%99%20%D7%94%D7%97%D7%96%D7%A8%D7%AA%20%D7%9E%D7%95%D7%A6%D7%A8%20%D7%91%D7%A1%D7%A0%D7%99%D7%A3%20%D7%A1%D7%91%D7%9F"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-50 hover:bg-emerald-100 p-4 rounded-2xl border border-emerald-200 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-800 font-bold">פנייה ישירה ב-WhatsApp</span>
                <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-2">
                <span className="text-lg font-black text-emerald-800 block">
                  וואטסאפ שירות מהיר
                </span>
                <span className="text-[11px] text-emerald-700">מענה מהיר לשליחת תמונות מוצר</span>
              </div>
            </a>

            {/* In-Store Counter */}
            <div className="bg-white p-4 rounded-2xl border border-white/20 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">פנייה פרונטלית בדלפק</span>
                <MapPin className="w-5 h-5 text-amber-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm font-black text-slate-900 block">
                  הוד השרון (החרש 10 / התלמיד 6)
                </span>
                <span className="text-[11px] text-slate-500">א׳-ה׳ 06:30-17:00 | ו׳ 06:30-13:00</span>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Quick Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#0F3E7A]" />
            <span>שאלות נפוצות לגבי החזרות מוצרים</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900">האם יש דמי ביטול בהחזרה לסניף?</div>
              <p className="text-slate-600">
                לא. החזרה שמתבצעת ישירות בסניפי סבן (החרש 10 או התלמיד 6) מתבצעת ללא כל דמי ביטול ומזכה את הלקוח בהחזר מלא על פי החוק.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900">מה הדין לגבי שקי מלט או חומרי איטום שנפתחו?</div>
              <p className="text-slate-600">
                חומרי מליטה, מלט ואיטום (כדוגמת סיקה 107) שנפתחו או נחשפו ללחות אינם ניתנים להחזרה מטעמי בקרת איכות ותקני בנייה מחמירים.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="font-bold text-slate-900">כיצד מקבלים את הזיכוי בהזמנה טלפונית / אונליין?</div>
              <p className="text-slate-600">
                לאחר אישור מצב הפריט על ידי עובד המחסן, מופקת תעודת החזרה וסכום העסקה מוחזר לכרטיס האשראי שממנו שולם תוך 7 ימי עסקים.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
