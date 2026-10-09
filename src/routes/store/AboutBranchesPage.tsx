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

export const GoogleMapsPinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 92 130"
    className={`${className} shrink-0`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M46 0C20.596 0 0 20.596 0 46c0 10.667 3.667 20.485 9.808 28.326L46 130l36.192-55.674C88.333 66.485 92 56.667 92 46 92 20.596 71.404 0 46 0Z"
      fill="#FFFFFF"
    />
    <path
      d="M46 0C20.596 0 0 20.596 0 46c0 10.22 3.328 19.67 8.986 27.327L46 46V0Z"
      fill="#EA4335"
    />
    <path
      d="M46 0v46l37.014 27.327C88.672 65.67 92 56.22 92 46 92 20.596 71.404 0 46 0Z"
      fill="#FBBC04"
    />
    <path
      d="M46 46v84l37.014-56.673L46 46Z"
      fill="#34A853"
    />
    <path
      d="M46 46 8.986 73.327 46 130V46Z"
      fill="#4285F4"
    />
    <circle cx="46" cy="46" r="18" fill="#1A73E8" />
    <circle cx="46" cy="46" r="11" fill="#FFFFFF" />
  </svg>
);

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
      name: 'סניף החרש 10 ',
      code: 'SABAN_HARASH',
      categoryTitle: 'ציוד טכני,מרכז לוגיסטי ראשי, חצר בלות, ברזל, מלט ואיטום',
      address: 'רחוב החרש 10, אזור התעשייה נווה נאמן',
      city: 'הוד השרון',
      phone: '09-740575',
      hoursSundayThursday: '06:30 – 16:00',
      hoursFriday: '06:30 – 13:00',
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
      image: 'https://sbn-xi.vercel.app/harash.jpg'
    },
    {
      id: 'talmid',
      name: 'סניף התלמיד 6',
      code: 'SABAN_TALMID',
      categoryTitle: 'חנות עם מגוון ענק  חומרי בנין, מרכז גבס, צבע ואניסטלציה ועוד..',
      address: 'רחוב התלמיד 6, אזור התעשייה',
      city: 'הוד השרון',
      phone: '09-7602010',
      hoursSundayThursday: '06:00 – 18:00',
      hoursFriday: '06:00 – 14:00',
      dispatchBay: 'דלפק אקספרס ואיסוף קבלנים מהיר',
      features: [
        '  לחומרי גמר, כלי עבודה חשמליים וציוד מגן',
        'חנות עם מגוון ענק  חומרי בנין,  צבע ואניסטלציה ועוד. מכונות גיוון ממוחשבות רשמיות של טמבור ונירלט (אספקה במקום)',
        'מרכז לוחות גבס אורבונד, קונסטרוקציה, ניצבים ומסלולים',
        'מחלקת אינסטלציה, מחברי SP, גבריט וניקוז',
        'מוסך פרזול, ברגים, דיבלים ועוגנים בסטנדרט אירופאי'
      ],
      wazeUrl: 'https://waze.com/ul?q=רחוב התלמיד 6 הוד השרון',
      googleMapsUrl: 'https://maps.google.com/?q=התלמיד+6+הוד+השרון',
      image: 'https://sbn-xi.vercel.app/talmid.jpg'
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
            <strong className="text-[#0F3E7A] font-bold">09-7602010</strong>
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
              במשך למעלה משלושה עשורים מהווה חברת ח. סבן את עמוד השדרה הלוגיסטי של מאות קבלני שלד וגמר, חברות בנייה ויזמים מובילים בשרון ובמרכז הארץ. אנו מחברים בין מותגי הבנייה הבינלאומיים והישראליים הטובים ביותר (סיקה, טמבור, נשר, נירלט, אורבונד) לבין עוצמה לוגיסטית חסרת פשרות, רציפי איסוף עצמי מהירים  וצי משאיות מנוף מתקדם.
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
                <div className="text-blue-200 text-[11px] mt-0.5">איסוף מהיר ברציף</div>
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
  href={branch.googleMapsUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 py-2.5 px-4 rounded-xl font-bold text-xs transition-all border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm cursor-pointer group select-none"
  title="פתח מיקום מדויק ב-Google Maps"
>
  {/* אייקון Google Maps Pin מקורי מרובה-צבעים */}
  <svg
    viewBox="0 0 92 132"
    className="w-4 h-5 group-hover:scale-110 transition-transform duration-200 shrink-0"
    aria-hidden="true"
  >
    <path
      d="M46 0C20.6 0 0 20.6 0 46c0 10.6 3.6 20.4 9.7 28.2L46 132l36.3-57.8C88.4 66.4 92 56.6 92 46 92 20.6 71.4 0 46 0z"
      fill="#EA4335"
    />
    <path
      d="M46 0C20.6 0 0 20.6 0 46c0 10.6 3.6 20.4 9.7 28.2l36.3 57.8 1-1.6L12.5 73.1C6.9 65.5 3.5 56.1 3.5 46 3.5 22.5 22.5 3.5 46 3.5V0z"
      fill="#D93025"
    />
    <path
      d="M46 132l36.3-57.8C88.4 66.4 92 56.6 92 46c0-9.2-2.7-17.7-7.4-24.9L46 132z"
      fill="#4285F4"
    />
    <path
      d="M84.6 21.1C76 8.3 62 0 46 0v132l38.6-110.9z"
      fill="#1A73E8"
    />
    <path
      d="M46 92.5l22-35.1C73.4 48.6 76 39.5 76 29.8 76 13.3 62.7 0 46 0v92.5z"
      fill="#34A853"
    />
    <circle cx="46" cy="46" r="17.5" fill="#FFFFFF" />
    <path
      d="M46 32a14 14 0 1014 14 14 14 0 00-14-14zm0 21a7 7 0 117-7 7 7 0 01-7 7z"
      fill="#FBBC04"
    />
  </svg>

  {/* טקסט: גוגל - מפות בצבעי המותג הרשמיים */}
  <span className="font-black flex items-center gap-1.5 tracking-tight text-xs">
    {/* גוגל */}
    <span className="flex items-center gap-[1px]">
      <span className="text-[#4285F4]">ג</span>
      <span className="text-[#EA4335]">ו</span>
      <span className="text-[#FBBC05]">ג</span>
      <span className="text-[#34A853]">ל</span>
    </span>

    {/* מקף מפריד */}
    <span className="text-slate-400 font-normal px-0.5">-</span>

    {/* מפות */}
    <span className="flex items-center gap-[1px]">
      <span className="text-[#4285F4]">מ</span>
      <span className="text-[#EA4335]">פ</span>
      <span className="text-[#FBBC05]">ו</span>
      <span className="text-[#34A853]">ת</span>
    </span>
  </span>
</a>
                  </div>

                  <a
                    style={{ width: '340px' }}
                    href={`https://wa.me/${SABAN_WHATSAPP_PHONE}?text=${encodeURIComponent(
                      `שלום לנציג סבן ${branch.name}, ברצוני לתאם הגעה / איסוף עצמי מהסניף.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer mx-auto"
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
        <div className="bg-gradient-to-b from-white to-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_16px_40px_-15px_rgba(15,62,122,0.12)] space-y-6 relative overflow-hidden">
          {/* Top Decorative Brand Gradient Stripe */}
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#0F3E7A] to-amber-500" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/30 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    צי הרכב וההובלות הרשמי של סבן (ח.פ 512001678)
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 bg-blue-50 text-[#0F3E7A] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-blue-200/60">
                    <ShieldCheck className="w-3 h-3 text-[#0F3E7A]" />
                    <span>צי רשמי מבוטח</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  שיבוץ לוגיסטי מדויק לפי נהגי ורכבי החברה לאתרי הבנייה בהוד השרון, השרון והמרכז
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>מערך שינוע פעיל בזמן אמת • פריקות מנוף וחלוקה</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs text-slate-700 pt-1">
            
            {/* Driver Card 1: Hakmat (Hikmat) */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 hover:border-[#0F3E7A]/40 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(15,62,122,0.18)] flex flex-col sm:flex-row items-center sm:items-start gap-5 relative group">
              
              {/* Stylized Driver Portrait Frame with Prominent Design Shadow */}
              <div className="relative shrink-0">
                {/* Ambient Glow / Outer Design Shadow */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-[#0F3E7A] rounded-[28px] opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-500 group-hover:scale-105" />

                {/* Framed Container */}
                <div
                  style={{ width: '150px' }}
                  className="relative rounded-[24px] p-1.5 bg-gradient-to-b from-amber-300 via-white to-slate-200 shadow-[0_16px_36px_-6px_rgba(15,62,122,0.45),0_6px_14px_-2px_rgba(0,0,0,0.15)] ring-4 ring-white"
                >
                  <div className="w-full h-full rounded-[18px] overflow-hidden bg-slate-900 border-2 border-white/80 relative shadow-inner">
                    <img
                      style={{ width: '150px' }}
                      src="/drivers/hakmat.svg"
                      alt="נהג חכמת - משאית מנוף"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/drivers/hakmat.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Online Status / Duty Pulse Badge */}
                <div className="absolute -bottom-1 -left-1 sm:-left-1 bg-emerald-500 text-white p-1 sm:p-1.5 rounded-full ring-4 ring-white shadow-lg flex items-center justify-center" title="במשמרת פעילה">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Driver Details & Logistics */}
              <div className="flex-1 space-y-2.5 text-center sm:text-right w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <span className="font-extrabold text-base text-[#0F3E7A]">נהג: חכמת </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  <div className="flex items-center justify-center sm:justify-end gap-1.5">
                    <span className="text-[10px] text-slate-500 font-bold">לוחית רישוי:</span>
                    <span className="font-mono text-xs bg-amber-300 text-slate-950 font-black px-2.5 py-0.5 rounded-md border-2 border-slate-900 shadow-sm tracking-wider">
                      615-41-002
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-black text-sm text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                    <span>משאית מרצדס מנוף כבד</span>
                    <span className="text-xs text-amber-600 font-bold">(זרוע 28 מטר)</span>
                  </div>
                  
                  {/* Capabilities Tags */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                    <span className="bg-amber-100/80 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded-md">
                      זרוע 28 מ׳
                    </span>
                    <span className="bg-blue-100/80 text-blue-900 font-bold text-[10px] px-2 py-0.5 rounded-md">
                      פריקה לקומה 7
                    </span>
                    <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded-md">
                      עומס 26 טון
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-[11px] leading-relaxed">
                  משובץ להנפת בלות לגובה, משטחי מלט ובלוקים, פריקות מנוף מדויקות לקומות גבוהות וגגות, חומרי שלד כבדים.
                </p>

                {/* Direct Contact Actions */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 border-t border-slate-100">
                  <a
                    href="tel:508860896"
                    className="inline-flex items-center gap-1.5 bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                    <span className="font-mono font-bold">09-7602010</span>
                  </a>

                  <a
                    href="https://wa.me/972508860896?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%97%D7%9B%D7%9E%D7%AA%20(%D7%A0%D7%94%D7%92%20%D7%A1%D7%91%D7%9F)%2C%20%D7%9E%D7%91%D7%A7%D7%A9%20%D7%AA%D7%99%D7%90%D7%95%D7%9D%20%D7%A4%D7%A8%D7%99%D7%A7%D7%AA%20%D7%9E%D7%A0%D7%95%D7%A3%20%D7%9C%D7%90%D7%AA%D7%A8"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-2 rounded-xl font-bold text-xs transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>וואטסאפ לנהג</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Driver Card 2: Ali */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 hover:border-[#0F3E7A]/40 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(15,62,122,0.18)] flex flex-col sm:flex-row items-center sm:items-start gap-5 relative group">
              
              {/* Stylized Driver Portrait Frame with Prominent Design Shadow */}
              <div className="relative shrink-0">
                {/* Ambient Glow / Outer Design Shadow */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-[#0F3E7A] rounded-[28px] opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-500 group-hover:scale-105" />

                {/* Framed Container */}
                <div
                  style={{ width: '150px' }}
                  className="relative rounded-[24px] p-1.5 bg-gradient-to-b from-amber-300 via-white to-slate-200 shadow-[0_16px_36px_-6px_rgba(15,62,122,0.45),0_6px_14px_-2px_rgba(0,0,0,0.15)] ring-4 ring-white"
                >
                  <div
                    style={{ paddingTop: '-2px', width: '150px' }}
                    className="w-full h-full rounded-[18px] overflow-hidden bg-slate-900 border-2 border-white/80 relative shadow-inner"
                  >
                    <img
                      style={{ width: '150px', height: '131px' }}
                      src="https://i.postimg.cc/tCNbgXK3/Screenshot-20250623-200744-Tik-Tok.jpg"
                      alt="נהג עלי - משאית איסוזו חלוקה"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/drivers/ali.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Online Status / Duty Pulse Badge */}
                <div className="absolute -bottom-1 -left-1 sm:-left-1 bg-emerald-500 text-white p-1 sm:p-1.5 rounded-full ring-4 ring-white shadow-lg flex items-center justify-center" title="במשמרת פעילה">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Driver Details & Logistics */}
              <div className="flex-1 space-y-2.5 text-center sm:text-right w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <span className="font-extrabold text-base text-[#0F3E7A]">נהג: עלי </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                  <div className="flex items-center justify-center sm:justify-end gap-1.5">
                    <span className="text-[10px] text-slate-500 font-bold">לוחית רישוי:</span>
                    <span className="font-mono text-xs bg-amber-300 text-slate-950 font-black px-2.5 py-0.5 rounded-md border-2 border-slate-900 shadow-sm tracking-wider">
                      651-51-701
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-black text-sm text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                    <span>משאית איסוזו חלוקה</span>
                    <span className="text-xs text-blue-600 font-bold">(חלוקה מהירה)</span>
                  </div>

                  {/* Capabilities Tags */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                    <span className="bg-emerald-100/80 text-emerald-900 font-bold text-[10px] px-2 py-0.5 rounded-md">
                      רמפה הידראולית
                    </span>
                    <span className="bg-purple-100/80 text-purple-900 font-bold text-[10px] px-2 py-0.5 rounded-md">
                      הובלת גבס וצבע
                    </span>
                    <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded-md">
                      אספקה תוך שעתיים
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-[11px] leading-relaxed">
                  משובץ להובלות לוחות גבס, פרופילים, צבעים, ציוד קל, פריקה ידנית והובלות מהירות ללא פריקה ישירות לאתר.
                </p>

                {/* Direct Contact Actions */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 border-t border-slate-100">
                  <a
                    href="tel:0508860896"
                    className="inline-flex items-center gap-1.5 bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                    <span className="font-mono font-bold">09-7602010</span>
                  </a>

                  <a
                    href="https://wa.me/972508860896?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A2%D7%9C%D7%99%20(%D7%A0%D7%94%D7%92%20%D7%A1%D7%91%D7%9F)%2C%20%D7%9E%D7%91%D7%A7%D7%A9%20%D7%AA%D7%99%D7%90%D7%95%D7%9D%20%D7%94%D7%95%D7%91%D7%9C%D7%AA%20%D7%97%D7%9C%D7%95%D7%A7%D7%94%20%D7%9C%D7%90%D7%AA%D7%A8"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-2 rounded-xl font-bold text-xs transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>וואטסאפ לנהג</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
