import React from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Truck,
  ShieldCheck,
  Award,
  ChevronLeft,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { SABAN_WHATSAPP_PHONE } from '../../lib/whatsappDeepLink';
import { WhatsAppIcon } from '../../components/common/WhatsAppOrderButton';

interface BranchInfo {
  id: string;
  name: string;
  code: string;
  categoryTitle: string;
  address: string;
  city: string;
  phone: string;
  hoursSundayThursday: string;
  hoursFriday: string;
  features: string[];
  wazeUrl: string;
  googleMapsUrl: string;
  dispatchBay: string;
  image: string;
}

export const AboutBranchesPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const branches: BranchInfo[] = [
    {
      id: 'harash',
      name: 'סניף החרש 10 (מחסן 4)',
      code: 'SABAN_HARASH',
      categoryTitle: 'מרכז לוגיסטי ראשי, חצר בלות, ברזל, מלט ואיטום',
      address: 'רחוב החרש 10, אזור התעשייה נווה נאמן',
      city: 'הוד השרון',
      phone: '03-9518888',
      hoursSundayThursday: '06:30 – 16:30',
      hoursFriday: '06:30 – 12:30',
      dispatchBay: 'רציף איסוף מהיר מס׳ 3 (משאיות, מלגזות ומסחריות)',
      features: [
        'חצר בלות ענקית (חול, שומשום, טיט, טוף וחלוקי נחל)',
        'מרכז איטום מקצועי מורשה Sika, מיפרם וביטום',
        'מחסן מלט וצמנט פורטלנד נשר במשטחים שלמים',
        'חצר ברזל בניין, רשתות פלדה ואביזרי קשירה',
        'משקל גשר ממוחשב וצי מלגזות 5 טון להעמסה מיידית'
      ],
      wazeUrl: 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון',
      googleMapsUrl: 'https://maps.google.com/?q=החרש+10+הוד+השרון',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'talmid',
      name: 'סניף התלמיד 6 (מחסן 1)',
      code: 'SABAN_TALMID',
      categoryTitle: 'אולם תצוגה ממוזג, מרכז גבס, צבע ופרזול מתקדם',
      address: 'רחוב התלמיד 6, אזור התעשייה',
      city: 'הוד השרון',
      phone: '03-9518889',
      hoursSundayThursday: '06:30 – 16:30',
      hoursFriday: '06:30 – 12:30',
      dispatchBay: 'דלפק אקספרס ואיסוף קבלנים מהיר',
      features: [
        'אולם תצוגה ממוזג לחומרי גמר, כלי עבודה חשמליים וציוד מגן',
        'מכונות גיוון ממוחשבות רשמיות של טמבור ונירלט (אספקה במקום)',
        'מרכז לוחות גבס אורבונד, קונסטרוקציה, ניצבים ומסלולים',
        'מחלקת אינסטלציה, מחברי SP, גבריט וניקוז',
        'מוסך פרזול, ברגים, דיבלים ועוגנים בסטנדרט אירופאי'
      ],
      wazeUrl: 'https://waze.com/ul?q=רחוב התלמיד 6 הוד השרון',
      googleMapsUrl: 'https://maps.google.com/?q=התלמיד+6+הוד+השרון',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 pt-4 font-['Heebo','Assistant',sans-serif] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
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
            <span className="text-slate-900 font-extrabold">אודות החברה וסניפי הוד השרון</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <span>מוקד טלפוני מרכזי:</span>
            <strong className="text-[#0F3E7A] font-bold">03-9518888</strong>
          </div>
        </div>

        {/* Hero About Section */}
        <div className="bg-gradient-to-r from-[#072244] via-[#0F3E7A] to-[#16529e] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                נוסדה בשנת 1994 • מעל 30 שנות מצוינות
              </span>
              <span className="text-blue-200 text-xs font-bold">ספק מורשה לתעשייה ולקבלנים</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black leading-tight">
              ח. סבן חומרי בניין (1994) בע״מ
            </h1>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
              במשך למעלה משלושה עשורים מהווה חברת ח. סבן את עמוד השדרה הלוגיסטי של מאות קבלני שלד וגמר, חברות בנייה ויזמים מובילים בשרון ובמרכז הארץ. אנו מחברים בין מותגי הבנייה הבינלאומיים והישראליים הטובים ביותר (Sika, טמבור, נשר, נירלט, אורבונד) לבין עוצמה לוגיסטית חסרת פשרות, רציפי איסוף עצמי מהירים (BOPIS) וצי משאיות מנוף מתקדם.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-bold">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                <div className="text-amber-300 text-xl font-black">30+</div>
                <div className="text-blue-200 text-[11px] mt-0.5">שנות מוניטין ואמינות</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                <div className="text-amber-300 text-xl font-black">8</div>
                <div className="text-blue-200 text-[11px] mt-0.5">משאיות מנוף (עד קומה 8)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                <div className="text-amber-300 text-xl font-black">2</div>
                <div className="text-blue-200 text-[11px] mt-0.5">סניפי ענק בהוד השרון</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
                <div className="text-amber-300 text-xl font-black">15 דק׳</div>
                <div className="text-blue-200 text-[11px] mt-0.5">איסוף מהיר ברציף (BOPIS)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Branches Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                מרכזי ההפצה והסניפים של סבן בהוד השרון
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                סניפים נגישים, חניות צמודות, רציפי העמסת משאיות ודלפקי אקספרס לקבלנים ולרוכשים פרטיים
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Branch Top Image / Banner */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={branch.image}
                      alt={branch.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute bottom-4 right-4 left-4 text-white">
                      <span className="text-[11px] font-black bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                        קוד סניף: {branch.code}
                      </span>
                      <h3 className="text-xl font-black leading-snug">
                        {branch.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {branch.categoryTitle}
                      </p>
                    </div>
                  </div>

                  {/* Branch Details Body */}
                  <div className="p-6 space-y-4 text-xs">
                    
                    {/* Location and Phone */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                      <div className="flex items-start gap-2.5 text-slate-800">
                        <MapPin className="w-4 h-4 text-[#0F3E7A] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">{branch.address}, {branch.city}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {branch.dispatchBay}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-slate-800 pt-1 border-t border-slate-200/80">
                        <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>טלפון ישיר: <strong className="font-mono text-sm">{branch.phone}</strong></span>
                      </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>שעות פעילות רשמיות ורציפי העמסה:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-slate-500 block">ימים א׳–ה׳:</span>
                          <strong className="text-slate-900 text-xs font-mono">{branch.hoursSundayThursday}</strong>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl">
                          <span className="text-slate-500 block">יום ו׳ וערבי חג:</span>
                          <strong className="text-slate-900 text-xs font-mono">{branch.hoursFriday}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div>
                      <div className="font-bold text-slate-900 mb-2">מאפייני ומחלקות הסניף:</div>
                      <ul className="space-y-1.5 text-slate-700 text-[11px]">
                        {branch.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Actions: Direct Waze & Google Maps Navigation */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={branch.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                    >
                      <Navigation className="w-4 h-4 text-amber-300" />
                      <span>נווט לסניף ב-Waze</span>
                    </a>

                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-300 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                  </div>

                  <a
                    href={`https://wa.me/${SABAN_WHATSAPP_PHONE}?text=${encodeURIComponent(
                      `שלום לנציג סבן ${branch.name}, ברצוני לתאם הגעה / איסוף עצמי מהסניף.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>שיחה ישירה בוואטסאפ עם דלפק הסניף</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Crane Truck Fleet Logistics Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                צי הרכב וההובלות הרשמי של סבן (ח.פ 512001678)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                שיבוץ לוגיסטי מדויק לפי נהגי ורכבי החברה לאתרי הבנייה בהוד השרון והמרכז
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 pt-2">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#0F3E7A]">נהג: חכמת (Hikmat)</span>
                <span className="font-mono text-xs bg-slate-900 text-amber-300 font-black px-2 py-0.5 rounded-lg">
                  615-41-002
                </span>
              </div>
              <div className="font-bold text-slate-800">
                משאית מרצדס מנוף כבד (זרוע 28 מטר)
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                משובץ להנפת בלות לגובה, משטחי מלט ובלוקים, פריקות מנוף לקומות גבוהות וגגות, חומרי שלד כבדים.
              </p>
              <div className="pt-1">
                <a href="tel:050-8860892" className="text-[#0F3E7A] font-mono font-bold hover:underline">
                  טלפון ישיר: 050-8860892
                </a>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#0F3E7A]">נהג: עלי (Ali)</span>
                <span className="font-mono text-xs bg-slate-900 text-amber-300 font-black px-2 py-0.5 rounded-lg">
                  651-51-701
                </span>
              </div>
              <div className="font-bold text-slate-800">
                משאית איסוזו חלוקה
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                משובץ להובלות לוחות גבס, פרופילים, צבעים, ציוד קל, פריקה ידנית והובלות מהירות ללא פריקה ישירות לאתר.
              </p>
              <div className="pt-1">
                <a href="tel:050-8860894" className="text-[#0F3E7A] font-mono font-bold hover:underline">
                  טלפון ישיר: 050-8860894
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
