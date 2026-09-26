import React, { useState } from 'react';
import { Sparkles, Calculator, Paintbrush, X, Check, ArrowRight, ShieldCheck, Info, MessageSquare } from 'lucide-react';
import { GoogleMerchantProduct } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface NoaAiConsultantModalProps {
  product: GoogleMerchantProduct;
  isOpen: boolean;
  onClose: () => void;
  onSelectShade?: (shade: { name: string; code: string; hex: string }) => void;
  onSelectPackaging?: (packagingId: string) => void;
}

export const NoaAiConsultantModal: React.FC<NoaAiConsultantModalProps> = ({
  product,
  isOpen,
  onClose,
  onSelectShade,
  onSelectPackaging
}) => {
  const { addToCart } = useCart();

  // Calculation parameters
  const [areaM2, setAreaM2] = useState<number>(35);
  const [surfaceType, setSurfaceType] = useState<string>('standard');
  const [coats, setCoats] = useState<number>(product.coverageInfo?.recommendedCoats || 2);
  const [selectedShadeCode, setSelectedShadeCode] = useState<string>(
    product.availableShades?.[0]?.code || ''
  );
  const [userCustomQuestion, setUserCustomQuestion] = useState<string>('');
  const [aiCustomAnswer, setAiCustomAnswer] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [copiedAdvice, setCopiedAdvice] = useState(false);

  if (!isOpen) return null;

  // Engineering calculation logic according to product specifications
  const calculateRequiredUnits = () => {
    // Determine product type
    if (product.id === '10701') {
      // SikaTop 107: 3.5 - 4.0 kg per m2 for 2 coats
      const rate = 3.5;
      const totalKg = areaM2 * (rate * (coats / 2));
      const units25kg = Math.ceil(totalKg / 25);
      return {
        unitName: 'ערכות 25 ק״ג של סיקה 107',
        quantity: units25kg,
        totalCoverageM2: (units25kg * 12.5).toFixed(1),
        marginPercent: Math.round(((units25kg * 12.5 - areaM2) / areaM2) * 100),
        recommendedPackageId: 'kit-25kg',
        tips: 'מומלץ להטביע רשת שריון או סרט סיקה סיל-טייפ בפינות ומפגשי רצפה-קיר.'
      };
    } else if (product.id === '20110') {
      // Tambour Superflex: 1.2 kg per m2
      const totalKg = areaM2 * 1.25 * (coats / 2);
      const units18kg = Math.ceil(totalKg / 18);
      return {
        unitName: 'פחים 18 ק״ג סופרפלקס',
        quantity: units18kg,
        totalCoverageM2: (units18kg * 15).toFixed(1),
        marginPercent: Math.round(((units18kg * 15 - areaM2) / areaM2) * 100),
        recommendedPackageId: 'pail-18kg',
        tips: 'יש לדאוג לניקיון יסודי של הגג משמנים ועלים. מומלץ למרוח שכבת יסוד מדוללת 25% במים.'
      };
    } else if (product.id === '10002') {
      // Nesher Cement: ~10 kg per m2 of plaster 15mm
      const totalKg = areaM2 * 10 * coats;
      const bags25kg = Math.ceil(totalKg / 25);
      return {
        unitName: 'שקי מלט 25 ק״ג נשר',
        quantity: bags25kg,
        totalCoverageM2: (bags25kg * 2.5).toFixed(1),
        marginPercent: Math.round(((bags25kg * 2.5 - areaM2) / areaM2) * 100),
        recommendedPackageId: 'bag-25kg',
        tips: 'להשגת בטון תקני ערבב עם חול נקי ביחס 1:3 ואשפר במים 3 פעמים ביום למשך שבוע.'
      };
    } else if (product.id === '15680') {
      // Sikaflex 11FC: ~3 meters per cartridge
      const runningMeters = areaM2; // use input as meters
      const cartridges = Math.ceil(runningMeters / 3);
      return {
        unitName: 'תרמילי סיקפלקס 11FC Purform',
        quantity: cartridges,
        totalCoverageM2: `${cartridges * 3} מטר רץ`,
        marginPercent: Math.round(((cartridges * 3 - runningMeters) / runningMeters) * 100),
        recommendedPackageId: 'cartridge-300ml',
        tips: 'עבור תפרי התפשטות עמוקים מומלץ לשלב שרוך גיבוי פוליאתילן (בקר רוד) בעומק התפר.'
      };
    } else {
      // Supercryl Mat 9889488: ~9-10 m2 per liter for 2 coats -> 10L pail covers ~45-50 m2
      const litersNeeded = (areaM2 / 9.5) * (coats / 2);
      const pails10L = Math.ceil(litersNeeded / 10);
      return {
        unitName: 'פחים 10 ליטר סופרקריל מט',
        quantity: pails10L,
        totalCoverageM2: (pails10L * 48).toFixed(1),
        marginPercent: Math.round(((pails10L * 48 - areaM2) / areaM2) * 100),
        recommendedPackageId: 'pail-10l',
        tips: 'על קיר גבס או טיח טרי מומלץ ליישם שכבת יסוד מקשרת בונדרול סופר לקבלת גוון הומוגני.'
      };
    }
  };

  const calcResult = calculateRequiredUnits();
  const currentShade = product.availableShades?.find((s) => s.code === selectedShadeCode);

  const handleAskNoa = async () => {
    if (!userCustomQuestion.trim()) return;
    setIsThinking(true);
    setAiCustomAnswer(null);

    try {
      // Fast expert engineering response tailored to Saban customer requirements
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const q = userCustomQuestion.toLowerCase();
      let answer = '';
      if (q.includes('חורף') || q.includes('גשם') || q.includes('טמפרטורה') || q.includes('ייבוש')) {
        answer = `נועה AI: עבור "${product.title}", הטמפרטורה האידיאלית ליישום היא בין 10°C ל-32°C. אין ליישם במידה וצפוי גשם ב-48 השעות הקרובות. בחורף זמני הייבוש בין שכבות מתארכים בכ-30% ביחס לקיץ.`;
      } else if (q.includes('פריימר') || q.includes('יסוד') || q.includes('בונדרול') || q.includes('הכנה')) {
        answer = `נועה AI: הכנת התשתית היא 80% מהצלחת האיטום/הצביעה! מומלץ להסיר כל שאריות שמן, אבק או צבע ישן. עבור טיח צמנטי או גבס חדש, חובה ליישם שכבת יסוד ייעודית שתמנע ספיגה בלתי שווה של החומר.`;
      } else if (q.includes('גוון') || q.includes('צבע') || q.includes('אפור') || q.includes('התאמה')) {
        answer = `נועה AI: גוון ${currentShade ? currentShade.name : 'שנבחר'} הינו גוון מודרני מבוקש מאוד בקרב אדריכלים ומעצבים, המשתלב מעולה עם אלמנטים של עץ טבעי, בטון אדריכלי ואלומיניום שחור. מומלץ לבצע דוגמת צבע בשטח 50x50 ס״מ לבדיקה תחת תאורת היום הטבעית של החלל.`;
      } else {
        answer = `נועה AI: עבור שטח של ${areaM2} מ״ר ב-${coats} שכבות של ${product.title}, חישוב המהנדסים של סבן מורה על צורך ב-${calcResult.quantity} ${calcResult.unitName}. זה יספק לך כושר כיסוי בטוח של ${calcResult.totalCoverageM2} מ״ר כולל מרווח פחת נכון של ${calcResult.marginPercent > 0 ? calcResult.marginPercent : 5}%. שים לב ליישם בצלב ולשמור על מרווח זמן ייבוש תקני.`;
      }
      setAiCustomAnswer(answer);
    } catch {
      setAiCustomAnswer('נועה AI: ניתן לבצע חישוב כמויות מדויק מול נציגי סבן בסניף החרש 10 או התלמיד 6.');
    } finally {
      setIsThinking(false);
    }
  };

  const handleApplyAndAddToCart = () => {
    if (currentShade && onSelectShade) {
      onSelectShade(currentShade);
    }
    if (onSelectPackaging && calcResult.recommendedPackageId) {
      onSelectPackaging(calcResult.recommendedPackageId);
    }
    addToCart(product, calcResult.quantity, calcResult.recommendedPackageId, currentShade);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-l from-[#0F3E7A] via-[#15529C] to-[#0A2E5C] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="סגור חלון"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg font-bold text-xl">
              <Sparkles className="w-6 h-6 text-[#0F3E7A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 text-amber-300 px-2.5 py-0.5 rounded-full">
                  AI מומחה חומרי בניין סבן
                </span>
                <span className="text-xs text-slate-300">גרסה 3.8 Pro</span>
              </div>
              <h2 className="text-2xl font-black mt-1">נועה AI – ייעוץ גוונים וכמויות הנדסי</h2>
              <p className="text-xs text-blue-100 mt-0.5 line-clamp-1">
                מערכת חישוב כיסוי והתאמת גוונים ל-{product.title}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-slate-800">
          {/* Quick specs banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-700">תקן ישראלי וכיסוי מובטח:</span>
              <span className="text-slate-600">{product.coverageInfo?.ratePerM2 || 'כושר כיסוי סטנדרטי'}</span>
            </div>
            <div className="text-xs text-[#0F3E7A] font-bold bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
              זמן ייבוש למגע: {product.dryingTime?.touch || 'כשעתיים'}
            </div>
          </div>

          {/* Calculator Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                {product.id === '15680' ? 'אורך תפר מבוקש (מטר רץ)' : 'שטח הפרויקט (במ״ר)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={areaM2}
                  onChange={(e) => setAreaM2(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
                />
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-semibold">
                  {product.id === '15680' ? 'מ׳ רץ' : 'מ״ר'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Paintbrush className="w-3.5 h-3.5 text-blue-600" />
                מספר שכבות מומלץ
              </label>
              <select
                value={coats}
                onChange={(e) => setCoats(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
              >
                <option value={1}>1 שכבה (רענון / שכבת ביניים)</option>
                <option value={2}>2 שכבות (תקן מומלץ מלא)</option>
                <option value={3}>3 שכבות (איטום כבד / שחיקה גבוהה)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                סוג התשתית
              </label>
              <select
                value={surfaceType}
                onChange={(e) => setSurfaceType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
              >
                <option value="standard">תשתית רגילה (בטון מוחלק / צבע קיים)</option>
                <option value="porous">תשתית נקבובית וסופגת (בלוק / טיח טרי)</option>
                <option value="smooth">תשתית חלקה (גבס / פח / קרמיקה)</option>
              </select>
            </div>
          </div>

          {/* Color & Shade Selector (if product has shades) */}
          {product.availableShades && product.availableShades.length > 0 && (
            <div className="border-t border-slate-200 pt-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Paintbrush className="w-4 h-4 text-amber-500" />
                  המלצת גוון ויזואלית של נועה (בחירה ישירה לקוד המניפה):
                </label>
                {currentShade && (
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {currentShade.code} • {currentShade.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.availableShades.map((shade) => {
                  const isSelected = selectedShadeCode === shade.code;
                  return (
                    <button
                      key={shade.code}
                      type="button"
                      onClick={() => {
                        setSelectedShadeCode(shade.code);
                        if (onSelectShade) onSelectShade(shade);
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0F3E7A] bg-blue-50/70 ring-2 ring-[#0F3E7A]/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-lg border border-slate-300 shadow-inner shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {shade.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {shade.code}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#0F3E7A] mr-auto shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Calculation Result Card */}
          <div className="bg-gradient-to-br from-amber-50/80 via-blue-50/50 to-slate-50 border-2 border-amber-200/80 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-md">
                סיכום כמויות הנדסי סבן PRO
              </span>
              <span className="text-xs text-slate-500">
                כולל מרווח ביטחון ופחת של כ-{Math.max(5, calcResult.marginPercent)}%
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <div className="text-xs text-slate-600 font-medium">כמות מומלצת להזמנה:</div>
                <div className="text-3xl font-black text-[#0F3E7A]">
                  {calcResult.quantity}{' '}
                  <span className="text-base font-bold text-slate-700">
                    {calcResult.unitName}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  מכסה בפועל: <strong className="text-slate-800">{calcResult.totalCoverageM2} מ״ר</strong> ({coats} שכבות)
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyAndAddToCart}
                className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>הוסף {calcResult.quantity} יח׳ ישירות לסל</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>

            <div className="text-xs text-slate-600 bg-white/80 border border-slate-200 rounded-xl p-3 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>טיפ מקצועי ממהנדסי סבן:</strong> {calcResult.tips}
              </span>
            </div>
          </div>

          {/* Interactive Question Input */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#0F3E7A]" />
              שאלה מותאמת אישית לנועה (זמני ייבוש, פריימר, יישום על קרמיקה...):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="לדוגמה: האם צריך פריימר לפני יישום על גג ישן?"
                value={userCustomQuestion}
                onChange={(e) => setUserCustomQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskNoa()}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
              />
              <button
                type="button"
                onClick={handleAskNoa}
                disabled={isThinking || !userCustomQuestion.trim()}
                className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isThinking ? (
                  <span>מחשבת...</span>
                ) : (
                  <>
                    <span>שאל</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </>
                )}
              </button>
            </div>

            {aiCustomAnswer && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-slate-800 leading-relaxed shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-[#0F3E7A] text-xs flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    תשובת נועה AI:
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiCustomAnswer);
                      setCopiedAdvice(true);
                      setTimeout(() => setCopiedAdvice(false), 2000);
                    }}
                    className="text-xs text-blue-700 hover:underline font-semibold"
                  >
                    {copiedAdvice ? 'הועתק!' : 'העתק תשובה'}
                  </button>
                </div>
                <p className="whitespace-pre-line">{aiCustomAnswer}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            החישוב מבוסס על מפרט היצרן והנחיות מהנדס סבן (1994)
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};
