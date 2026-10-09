import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Phone,
  User,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  UserPlus,
  LogIn,
  KeyRound,
  FileText,
  BadgeCheck,
  ChevronLeft
} from 'lucide-react';
import { SabanLogo } from '../layout/SabanLogo';
import {
  SabanClubMember,
  getLoggedInMember,
  setLoggedInMember,
  findMemberByPhoneOrCard,
  saveMemberToList
} from '../../types/auth';

interface SabanAuthPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (member: SabanClubMember) => void;
  onNavigateClub?: () => void;
  initialMode?: 'login' | 'register';
}

export const SabanAuthPortalModal: React.FC<SabanAuthPortalModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  onNavigateClub,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Register fields
  const [regData, setRegData] = useState({
    fullName: '',
    phone: '',
    email: '',
    businessName: '',
    contractorType: 'קבלן שלד ושלד-בטון',
    preferredBranch: 'החרש 10 (מרכז לוגיסטי)',
    projectAddress: '',
    projectNotes: ''
  });
  const [regError, setRegError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const cleanId = loginIdentifier.trim();
    if (!cleanId) {
      setLoginError('נא להזין מספר טלפון נייד או מספר כרטיס חבר');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const found = findMemberByPhoneOrCard(cleanId);
      if (found) {
        setLoggedInMember(found);
        onSuccessLogin(found);
      } else {
        // If not found, let them register or quick-create
        setLoginError('המספר שהוזן לא נמצא במערכת המועדון. באפשרותך להירשם תוך חצי דקה בלשונית "הרשמה למועדון".');
      }
    }, 450);
  };

  const handleQuickDemoLogin = () => {
    const demoMember: SabanClubMember = {
      cardId: 'SBN-CLUB-889413',
      fullName: 'יוסי לוי (קבלן גמר ובנייה)',
      phone: '050-8860896',
      email: 'yossi.build@gmail.com',
      businessName: 'לוי הנדסה וגמר בע״מ',
      contractorType: 'קבלן שלד ושלד-בטון',
      preferredBranch: 'החרש 10 (מרכז לוגיסטי)',
      projectAddress: 'רחוב דרך רמתיים 42, הוד השרון',
      projectNotes: 'וילה פרטית, שלב יציקות ועבודות איטום',
      joinedDate: '15/01/2026',
      tier: 'vip',
      discountPercent: 12
    };
    setLoggedInMember(demoMember);
    onSuccessLogin(demoMember);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regData.fullName.trim() || !regData.phone.trim()) {
      setRegError('נא למלא שם מלא ומספר טלפון תקין');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const generatedId = `SBN-CLUB-${Math.floor(100000 + Math.random() * 900000)}`;
      const newMember: SabanClubMember = {
        cardId: generatedId,
        fullName: regData.fullName.trim(),
        phone: regData.phone.trim(),
        email: regData.email.trim() || undefined,
        businessName: regData.businessName.trim() || 'קבלן עצמאי',
        contractorType: regData.contractorType,
        preferredBranch: regData.preferredBranch,
        projectAddress: regData.projectAddress.trim() || 'אזור השרון והמרכז',
        projectNotes: regData.projectNotes.trim() || undefined,
        joinedDate: new Date().toLocaleDateString('he-IL'),
        tier: 'vip',
        discountPercent: 12
      };

      saveMemberToList(newMember);
      setLoggedInMember(newMember);
      onSuccessLogin(newMember);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto" dir="rtl">
      
      {/* Background click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 font-['Heebo','Assistant',sans-serif]">
        
        {/* Luxury Header Banner */}
        <div className="bg-gradient-to-r from-[#072244] via-[#0F3E7A] to-[#16529e] text-white p-6 relative overflow-hidden">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <SabanLogo size="sm" light />
            </div>

            <button
              onClick={onClose}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 relative z-10 text-right">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-[11px] font-black border border-amber-300/30 mb-2">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>שער כניסה מאובטח לקבלנים וחברי מועדון</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              התחברות לאזור האישי ח. סבן
            </h2>
            <p className="text-xs text-blue-100 mt-1">
              צפייה בפרטי החברות שנרשמו, מעקב הזמנות פעילות, ומחירון VIP בלעדי
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-black/25 p-1 rounded-2xl mt-5 relative z-10 border border-white/10">
            <button
              type="button"
              onClick={() => { setMode('login'); setLoginError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'login'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>כניסה לבעלי כרטיס קיים</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('register'); setRegError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'register'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-[1.02]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>הרשמה מהירה למועדון (חינם)</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 text-right">
          
          {mode === 'login' ? (
            /* ================= LOGIN MODE ================= */
            <div className="space-y-5">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                    מספר טלפון נייד או מספר כרטיס חבר (SBN-CLUB):
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      dir="ltr"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="050-8860896 או SBN-CLUB-..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono font-bold outline-none focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all text-left"
                      autoFocus
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    הזינו את מספר הנייד איתו נרשמתם למועדון או כרטיס החבר הדיגיטלי
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 leading-relaxed font-medium">
                    ⚠️ {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-3.5 rounded-xl font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isVerifying ? (
                    <span>מאמת נתוני כרטיס...</span>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 text-amber-400" />
                      <span>התחבר לאזור האישי שלי</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick Demo Access & Explanations */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>בדיקה מהירה / כניסה לדוגמה:</span>
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="text-[#0F3E7A] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>התחבר כלקוח קבלן לדוגמה (יוסי לוי)</span>
                    <ArrowRight className="w-3 h-3 rotate-180" />
                  </button>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>עדיין לא הצטרפתם?</strong> חברי המועדון נהנים מהנחה קבועה של 12% על חומרי בנייה ואיטום, עדיפות במנוף מרצדס ואיסוף אקספרס ברציף המחסן.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================= REGISTER MODE ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  שם מלא / שם הקבלן <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={regData.fullName}
                  onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                  placeholder="ישראל ישראלי"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    טלפון נייד <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    placeholder="050-1234567"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all font-mono text-left"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    דוא״ל
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder="builder@gmail.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    שם עסק / חברה (אופציונלי)
                  </label>
                  <input
                    type="text"
                    value={regData.businessName}
                    onChange={(e) => setRegData({ ...regData, businessName: e.target.value })}
                    placeholder="קבלן רשום / שיפוצים"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    תחום עיסוק
                  </label>
                  <select
                    value={regData.contractorType}
                    onChange={(e) => setRegData({ ...regData, contractorType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0F3E7A]"
                  >
                    <option value="קבלן שלד ושלד-בטון">קבלן שלד ושלד-בטון</option>
                    <option value="קבלן איטום מורשה">קבלן איטום מורשה</option>
                    <option value="קבלן גמר ושיפוצים">קבלן גמר ושיפוצים</option>
                    <option value="קבלן גבס וצבע">קבלן גבס וצבע</option>
                    <option value="בנייה עצמית / לקוח פרטי">בנייה עצמית / לקוח פרטי</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  כתובת אתר בנייה או פרויקט ראשי
                </label>
                <input
                  type="text"
                  value={regData.projectAddress}
                  onChange={(e) => setRegData({ ...regData, projectAddress: e.target.value })}
                  placeholder="רחוב והעיר שבה מתבצעת העבודה (למשל: דרך רמתיים, הוד השרון)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0F3E7A]"
                />
              </div>

              {regError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  ⚠️ {regError}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 py-3.5 rounded-xl font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isVerifying ? (
                  <span>יוצר כרטיס חבר ומחבר לאזור האישי...</span>
                ) : (
                  <>
                    <BadgeCheck className="w-4 h-4 text-slate-950" />
                    <span>השלם הרשמה והיכנס מיד לאזור האישי</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-slate-400 pt-1">
                🔒 כרטיס המועדון מאובטח, אינו כרוך בתשלום ומקנה גישה מיידית לכל ההטבות
              </div>
            </form>
          )}

        </div>

        {/* Footer info hotline */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>סבן חומרי בניין (1994) בע״מ</span>
          </div>
          <div className="flex items-center gap-2">
            <span>מוקד קבלנים:</span>
            <a href="tel:050-8860896" className="text-[#0F3E7A] font-bold font-mono">
              050-8860896
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
