import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Truck,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Clock,
  Building2,
  ChevronDown,
  ArrowRight,
  UserCheck,
  CreditCard,
  Percent,
  FileText,
  BadgeCheck,
  Send,
  Download,
  Share2
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/common/WhatsAppOrderButton';
import { SabanLogo } from '../../components/layout/SabanLogo';

interface ClubLeadData {
  fullName: string;
  phone: string;
  email: string;
  contractorType: string;
  businessName: string;
  preferredBranch: string;
  projectNotes: string;
}

export const SabanClubLandingPage: React.FC<{
  onNavigateHome: () => void;
  onNavigateCatalog?: () => void;
}> = ({ onNavigateHome, onNavigateCatalog }) => {
  const [formData, setFormData] = useState<ClubLeadData>({
    fullName: '',
    phone: '',
    email: '',
    contractorType: 'קבלן שלד ושלד-בטון',
    businessName: '',
    preferredBranch: 'החרש 10 (מרכז לוגיסטי)',
    projectNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCard, setSubmittedCard] = useState<{
    cardId: string;
    fullName: string;
    businessName: string;
    phone: string;
    contractorType: string;
    joinedDate: string;
  } | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      return;
    }

    setIsSubmitting(true);

    const generatedId = `SBN-CLUB-${Math.floor(100000 + Math.random() * 900000)}`;
    const newCard = {
      cardId: generatedId,
      fullName: formData.fullName.trim(),
      businessName: formData.businessName.trim() || 'קבלן רשום',
      phone: formData.phone.trim(),
      contractorType: formData.contractorType,
      joinedDate: new Date().toLocaleDateString('he-IL')
    };

    // Save lead to localStorage
    try {
      const existingLeads = JSON.parse(localStorage.getItem('saban_club_leads_v1') || '[]');
      existingLeads.unshift({
        ...newCard,
        email: formData.email,
        preferredBranch: formData.preferredBranch,
        projectNotes: formData.projectNotes,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('saban_club_leads_v1', JSON.stringify(existingLeads));
    } catch {
      // ignore localStorage quota errors
    }

    // Google Apps Script Web App sync (Active Live Google Sheet)
    const appsScriptUrl =
      import.meta.env.VITE_GOOGLE_APPS_SCRIPT_LEADS_URL ||
      'https://script.google.com/macros/s/AKfycbwDtPX29zb2CCuCS_79FjzndoHSuBqmvE4QDjUy7cBCDC6ljquhZzcMnC-p4bPVlrcZ/exec';

    if (appsScriptUrl) {
      try {
        fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            name: formData.fullName.trim(),
            phone: formData.phone.trim(),
            city: formData.preferredBranch,
            type: formData.contractorType,
            source: 'דף נחיתה מועדון סבן (Vercel)',
            createdAt: new Date().toISOString()
          })
        }).catch(() => {});
      } catch {
        // network fallback handled gracefully
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedCard(newCard);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const contractorTypes = [
    'קבלן שלד ושלד-בטון',
    'קבלן שיפוצים וגמר',
    'קבלן איטום מורשה',
    'אינסטלטור / מערכות מים וניקוז',
    'קבלן גבס, צבע ופרזול',
    'קבלן פיתוח, גינון ותשתיות',
    'חשמלאי מוסמך',
    'בונה בית פרטי / משפץ עצמאי'
  ];

  const benefitsList = [
    {
      icon: <Percent className="w-6 h-6 text-amber-400" />,
      title: 'מחירון קבלנים סיטונאי ייעודי',
      description: 'הנחות עומק קבועות של עד 12% מהשקל הראשון על מלט נשר, סיקה, טמבור, נירלט ואורבונד, ישירות מחצר היבואן.'
    },
    {
      icon: <Truck className="w-6 h-6 text-amber-400" />,
      title: 'עדיפות ראשונה בשיבוץ משאיות מנוף וחלוקה',
      description: 'שריון ימי פריקה וקדימות בשיבוץ משאית מרצדס מנוף 28 מ׳ (חכמת) ואיסוזו חלוקה (עלי) לאתרי הבנייה בהוד השרון והשרון.'
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: 'רציף איסוף אקספרס ללא המתנה',
      description: 'מזמינים מראש באתר או בוואטסאפ, מגיעים לרציף 3 בסניף החרש 10 או לתלמיד 6 – והמלגזה מעמיסה מיד ללא תור בדלפק.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-amber-400" />,
      title: 'מסלול אשראי נוח ותעודות דיגיטליות',
      description: 'אפשרות להסדר שוטף + 30 / 60 לקבלנים מאושרים, תעודות משלוח חתומות ישירות לנייד ודוחות חודשיים מרוכזים לרואה חשבון.'
    },
    {
      icon: <FileText className="w-6 h-6 text-amber-400" />,
      title: 'פטור וזיכוי מלא על פקדונות בלות ומשטחים',
      description: 'זיכוי מיידי של 100% על החזרת שקי בלות (מק״ט 60002) ומשטחי עץ ללא קנסות וללא עיכובים מיותרים.'
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: 'ליווי הנדסי וייעוץ מומחי מפעלים צמוד',
      description: 'גישה ישירה ליועצי חברות Sika, נשר, תרמוקיר וטמבור, מפרטי איטום ובינוי לפי התקן הישראלי (ת״י 1536 ות״י 1).'
    }
  ];

  const faqs = [
    {
      q: 'מי רשאי להצטרף למועדון הלקוחות והקבלנים של סבן?',
      a: 'ההצטרפות פתוחה לכל קבלני השלד, הגמר, השיפוצים, האינסטלציה, החשמל, וכן ללקוחות פרטיים המבצעים בנייה עצמית או שיפוץ מקיף של בית או דירה.'
    },
    {
      q: 'כמה עולה ההצטרפות למועדון?',
      a: 'ההצטרפות למועדון הינה ללא תשלום. תקופת ההשקה מעניקה חברות מלאה ללא דמי מנוי, כולל כרטיס חבר דיגיטלי אישי.'
    },
    {
      q: 'איך מתממשת ההנחה במעמד הרכישה?',
      a: 'מיד עם ההצטרפות תקבלו מספר כרטיס חבר מועדון (למשל SBN-CLUB-123456). מספר זה מסונכרן אוטומטית במערכת ה-CRM של דלפקי סניף החרש 10 וסניף התלמיד 6, וכן בקטלוג האונליין.'
    },
    {
      q: 'האם מקבלים עדיפות בשיבוץ משאיות מנוף?',
      a: 'כן. חברי מועדון נהנים משריון מוקדם של ימי הובלה מבוקשים למשאית מרצדס מנוף כבד (זרוע 28 מ׳) ומשאית איסוזו חלוקה, כולל חלון אספקה מדויק לאתר.'
    },
    {
      q: 'היכן אוספים את ההזמנות?',
      a: 'לרשותכם 2 סניפים בהוד השרון: סניף החרש 10 (מרכז לוגיסטי, חצר בלות, ברזל, מלט ואיטום כבד) וסניף התלמיד 6 (אולם תצוגה, מרכז גבס, צבע ואספקה טכנית).'
    }
  ];

  const sendWhatsAppWelcome = () => {
    if (!submittedCard) return;
    const msg = encodeURIComponent(
      `שלום הנהלת סבן (מועדון לקוחות),\nנרשמתי למועדון לקוחות סבן!\nשם: ${submittedCard.fullName}\nעסק: ${submittedCard.businessName}\nטלפון: ${submittedCard.phone}\nמספר כרטיס חבר: ${submittedCard.cardId}\nאשמח לתיאום פתיחת מחירון קבלנים!`
    );
    window.open(`https://wa.me/972508860896?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-['Heebo','Assistant',sans-serif]" dir="rtl">
      
      {/* Top Breadcrumb & Return to Store */}
      <div className="bg-slate-900 text-slate-300 py-2.5 px-4 sm:px-8 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>ראשי</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-amber-300 font-bold">מועדון לקוחות וקבלנים ח. סבן</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline text-slate-400">ח. סבן חומרי בניין (1994) בע״מ</span>
            <a href="tel:050-8860896" className="text-amber-300 hover:text-white font-mono font-bold flex items-center gap-1">
              <PhoneCall className="w-3 h-3" />
              <span>050-8860896</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B2545] via-[#0F3E7A] to-[#08182B] text-white pt-12 pb-20 sm:pt-16 sm:pb-24 px-4 sm:px-8 overflow-hidden shadow-xl">
        {/* Subtle background luxury grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />

        {/* Ambient Amber Glow in corner */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column: Hero Pitch & Brand Identity */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>מועדון הלקוחות והקבלנים הרשמי • ח. סבן חומרי בניין</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
                בונים ומשפצים בשרון? <br />
                <span className="bg-gradient-to-l from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                  הצטרפו למועדון סבן
                </span>
              </h1>

              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal max-w-2xl">
                מהיום יש לכם גב לוגיסטי מלא: מחירוני עוגן סיטונאיים ישירות מהיבואן, קדימות עליונה בשיבוץ משאיות מנוף (חכמת) וחלוקה אקספרס (עלי), איסוף מהיר ברציף החרש 10 והתלמיד 6 — ללא המתנה בתור.
              </p>

              {/* Quick Feature Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3.5">
                  <div className="text-amber-300 text-2xl font-black">עד 12%</div>
                  <div className="text-blue-100 text-[11px] mt-0.5">הנחה קבועה לקבלנים</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3.5">
                  <div className="text-amber-300 text-2xl font-black">15 דק׳</div>
                  <div className="text-blue-100 text-[11px] mt-0.5">איסוף מהיר ברציף</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3.5">
                  <div className="text-amber-300 text-2xl font-black">28 מטר</div>
                  <div className="text-blue-100 text-[11px] mt-0.5">זרוע מנוף לקומה 7</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3.5">
                  <div className="text-amber-300 text-2xl font-black">30 שנה</div>
                  <div className="text-blue-100 text-[11px] mt-0.5">ניסיון ומקצועיות (1994)</div>
                </div>
              </div>

              {/* Brands Partnership Strip */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-blue-200/80 mb-2 font-medium">
                  שותפים רשמיים ומפיצי עוגן מובילים:
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-white/90">
                  <span className="bg-white/10 px-3 py-1 rounded-xl">Sika (סיקה)</span>
                  <span className="bg-white/10 px-3 py-1 rounded-xl">מלט נשר</span>
                  <span className="bg-white/10 px-3 py-1 rounded-xl">טמבור</span>
                  <span className="bg-white/10 px-3 py-1 rounded-xl">נירלט</span>
                  <span className="bg-white/10 px-3 py-1 rounded-xl">אורבונד גבס</span>
                  <span className="bg-white/10 px-3 py-1 rounded-xl">תרמוקיר</span>
                </div>
              </div>

            </div>

            {/* Left Column: Lead Capture Form OR Digital Card */}
            <div className="lg:col-span-5">
              
              {!submittedCard ? (
                /* Registration Form Card */
                <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 relative">
                  
                  {/* Card Header */}
                  <div className="space-y-1 text-right border-b border-slate-100 pb-4 mb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#0F3E7A] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                        הרשמה מהירה • חינם
                      </span>
                      <span className="text-xs text-slate-400 font-mono">הצטרפות למועדון 2026</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      טופס הצטרפות למועדון סבן
                    </h2>
                    <p className="text-xs text-slate-500">
                      מלאו את הפרטים לקבלת כרטיס חבר דיגיטלי ומחירון קבלנים מיידי:
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5 text-right text-xs">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        שם מלא <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="ישראל ישראלי"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all outline-none"
                      />
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          טלפון נייד <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="050-1234567"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all outline-none font-mono text-right"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          דוא״ל (לחשבוניות)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="builder@gmail.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all outline-none text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {/* Contractor Type */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        סוג פעילות / תחום עיסוק
                      </label>
                      <select
                        value={formData.contractorType}
                        onChange={(e) => setFormData({ ...formData, contractorType: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all outline-none"
                      >
                        {contractorTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Company Name / H.P. */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        שם חברה / עוסק מורשה (אופציונלי)
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="חברת בנייה ופיתוח בע״מ"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all outline-none"
                      />
                    </div>

                    {/* Preferred Branch */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        סניף איסוף מועדף
                      </label>
                      <select
                        value={formData.preferredBranch}
                        onChange={(e) => setFormData({ ...formData, preferredBranch: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all outline-none"
                      >
                        <option value="החרש 10 (מרכז לוגיסטי)">סניף החרש 10 (חצר בלות, מלט ואיטום כבד)</option>
                        <option value="התלמיד 6 (גבס וצבע)">סניף התלמיד 6 (אולם תצוגה, גבס ופרזול)</option>
                        <option value="שני הסניפים לפי צורך">שני הסניפים לפי צורך</option>
                      </select>
                    </div>

                    {/* Project Notes */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        פרויקט נוכחי / הערות
                      </label>
                      <textarea
                        rows={2}
                        value={formData.projectNotes}
                        onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                        placeholder="לדוגמה: בניית וילה בהוד השרון, דרושות בלות שומשום ומלט לחודש הקרוב..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all outline-none resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-3.5 px-4 rounded-2xl font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>מנפיק כרטיס חבר...</span>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4 text-amber-400" />
                          <span>הצטרף עכשיו והנפק כרטיס חבר מועדון</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-400 text-center pt-1">
                      🔒 הפרטים מאובטחים ומועברים ישירות לצוות מועדון סבן. ללא ספאם.
                    </p>

                  </form>

                </div>
              ) : (
                /* Success & Digital Membership Card */
                <div className="space-y-4">
                  
                  {/* Luxury Digital Card */}
                  <div className="bg-gradient-to-br from-slate-900 via-[#0F3E7A] to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/40 relative overflow-hidden space-y-6">
                    
                    {/* Golden Background Accents */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Card Top Row */}
                    <div className="flex items-center justify-between border-b border-white/15 pb-4">
                      <div className="flex items-center gap-2">
                        <SabanLogo size="sm" />
                      </div>
                      <div className="text-left">
                        <span className="bg-amber-400/20 text-amber-300 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-amber-300/30 inline-flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3 text-amber-400" />
                          <span>חבר מועדון סבן VIP</span>
                        </span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="space-y-3 text-right">
                      <div>
                        <div className="text-xs text-blue-200">שם החבר / קבלן:</div>
                        <div className="text-2xl font-black text-white">{submittedCard.fullName}</div>
                        <div className="text-xs text-amber-300 font-bold">{submittedCard.businessName}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                        <div>
                          <div className="text-[10px] text-blue-300">תחום:</div>
                          <div className="font-bold text-white">{submittedCard.contractorType}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-blue-300">תאריך הנפקה:</div>
                          <div className="font-bold text-white">{submittedCard.joinedDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Card Number & Barcode */}
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-mono">MEMBERSHIP ID</div>
                        <div className="font-mono text-lg font-black text-amber-300 tracking-wider">
                          {submittedCard.cardId}
                        </div>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                          סטטוס: פעיל
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Actions for the newly registered member */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2.5 shadow-md">
                    <div className="text-xs font-black text-slate-800 text-center">
                      🎉 ברוך הבא למועדון סבן! הכרטיס הונפק ונשמר במערכת הסניפים
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={sendWhatsAppWelcome}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white" />
                        <span>פתיחת וואטסאפ עם המוקד</span>
                      </button>

                      {onNavigateCatalog && (
                        <button
                          onClick={onNavigateCatalog}
                          className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>המשך לקטלוג המוצרים</span>
                          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Benefits Grid Section */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#0F3E7A] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F3E7A]" />
            <span>למה שווה להצטרף למועדון סבן?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            כל מה שקבלן ואיש מקצוע צריך במקום אחד
          </h2>
          <p className="text-sm text-slate-600">
            אנחנו מבינים שזמן שווה כסף באתרי הבנייה. המועדון שלנו נבנה במיוחד כדי לחסוך לכם שעות המתנה ואלפי שקלים בכל פרויקט.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsList.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0F3E7A]/40 transition-all duration-300 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0F3E7A] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0F3E7A] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Official Logistics Fleet Showcase (Hakmat & Ali) */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-300/20">
              צי ההובלות הרשמי של סבן
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              המשאיות שלנו באתרי הבנייה שלכם בזמן
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              לחברי המועדון מובטחת עדיפות מלאה בשיבוץ לוגיסטי מדויק עם נהגי החברה המנוסים
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Hakmat */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative shrink-0 w-24 h-24 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 to-[#0F3E7A] shadow-xl">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900">
                  <img
                    src="/drivers/hakmat.svg"
                    alt="חכמת"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/drivers/hakmat.jpg';
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2 text-center sm:text-right flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-extrabold text-base text-amber-300">נהג: חכמת (משאית מנוף)</span>
                  <span className="font-mono text-xs bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">
                    615-41-002
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  משאית מרצדס מנוף כבד (מנוף 10 מטר) לפריקות מנוף לגגות וקומות גבוהות, בלות ומשטחי מלט.
                </div>
                <div className="text-xs font-mono text-amber-200 pt-1">
                  טלפון לתיאום: 09-7602010
                </div>
              </div>
            </div>

            {/* Ali */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="relative shrink-0 w-24 h-24 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 to-[#0F3E7A] shadow-xl">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900">
                  <img
                    src="https://i.postimg.cc/tCNbgXK3/Screenshot-20250623-200744-Tik-Tok.jpg"
                    alt="עלי"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/drivers/ali.jpg';
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2 text-center sm:text-right flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-extrabold text-base text-amber-300">נהג: עלי (משאית חלוקה)</span>
                  <span className="font-mono text-xs bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">
                    651-51-701
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  משאית איסוזו חלוקה מהירה ללוחות גבס, פרופילים, צבעים וציוד גמר ישירות לאתר.
                </div>
                <div className="text-xs font-mono text-amber-200 pt-1">
                  טלפון לתיאום: 09-7602010
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#0F3E7A] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            מה אומרים הקבלנים בשטח?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            הקבלנים המובילים בשרון בוחרים בסבן
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ״בזכות מועדון סבן המשאיות שלי מעמיסות בלות מלט וחול תוך 10 דקות בבוקר בלי לעמוד בתור. הידיעה שהמנוף של חכמת מגיע בול בזמן חוסכת לי עיכובים יקרים באתר.״
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-black text-slate-900">ירון מ.</span>
              <span className="text-slate-400">קבלן שלד, נווה נאמן</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ״המחירים לחברי מועדון על סיקה, טמבור ואורבונד הכי תחרותיים בשרון. הזמנתי בוואטסאפ ותוך שעה עלי הוריד לי את הגבס והשפכטל ישירות לקומה.״
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-black text-slate-900">אלירן ק.</span>
              <span className="text-slate-400">קבלן גמר ושיפוצים</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex text-amber-400 text-sm">★★★★★</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ״בניתי בית פרטי במתחם 1200. ההצטרפות למועדון חסכה לי אלפי שקלים על חומרי מליטה ואיטום. הצוות נתן לי ייעוץ מקצועי ברמה שלא הכרתי.״
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-black text-slate-900">דוד כ.</span>
              <span className="text-slate-400">בונה בית פרטי, הוד השרון</span>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              שאלות נפוצות על מועדון סבן
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              כל מה שחשוב לדעת על ההצטרפות, תנאי המחירון וזמני האיסוף והאספקה
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-right font-black text-sm text-slate-900 hover:text-[#0F3E7A] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#0F3E7A]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Action CTA Banner */}
      <section className="bg-gradient-to-r from-[#0F3E7A] via-[#0A2E5C] to-[#08182B] text-white py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black">
              רוצים להצטרף טלפונית או לתאם פגישה בסניף?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200">
              מוקד הלקוחות והקבלנים של סבן זמין עבורכם בימים א׳-ה׳ 06:30-16:00 וביום ו׳ 06:30-13:00
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:050-8860896"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>חיוג למוקד: 050-8860896</span>
            </a>

            <a
              href="https://wa.me/972508860896?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%9E%D7%95%D7%A7%D7%93%20%D7%A1%D7%91%D7%9F%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%9E%D7%95%D7%A2%D7%93%D7%95%D7%9F%20%D7%A7%D7%91%D7%9C%D7%A0%D7%99%D7%9D%20%D7%95%D7%9C%D7%A7%D7%95%D7%97%D7%95%D7%AA"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>וואטסאפ ישיר למוקד</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
