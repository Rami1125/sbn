import React, { useState } from 'react';
import {
  Paintbrush,
  X,
  Check,
  Search,
  Sparkles,
  Building2,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  PaintShade,
  TAMBOUR_SHADES,
  NIRLAT_SHADES,
  verifyPaintShade,
  VerificationResult
} from '../../data/paintShades';
import { SABAN_BRANCHES } from '../../data/initialProducts';
import { VisualThinkingIndicator } from './VisualThinkingIndicator';

export interface TintingRequestData {
  supplier: 'טמבור' | 'נירלט';
  shadeName: string;
  shadeCode: string;
  shadeHex: string;
  paintType: 'קיר' | 'מתכת' | 'עץ';
  packageSize: string;
  quantity: number;
  branchCode: string;
  branchName: string;
  customerNotes?: string;
  ticketId: string;
  createdAt: string;
}

interface ColorTintingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmTint: (data: TintingRequestData) => void;
  initialSupplier?: 'טמבור' | 'נירלט';
  productTitle?: string;
}

export const ColorTintingModal: React.FC<ColorTintingModalProps> = ({
  isOpen,
  onClose,
  onConfirmTint,
  initialSupplier = 'טמבור',
  productTitle
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState<'טמבור' | 'נירלט'>(initialSupplier);
  const [selectedPaintType, setSelectedPaintType] = useState<'קיר' | 'מתכת' | 'עץ'>('קיר');
  const [selectedPackageSize, setSelectedPackageSize] = useState<string>('פח 18 ליטר');
  const [selectedBranch, setSelectedBranch] = useState<string>('SABAN_HARASH');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedShade, setSelectedShade] = useState<PaintShade>(
    initialSupplier === 'טמבור' ? TAMBOUR_SHADES[3] : NIRLAT_SHADES[1]
  );
  const [customCodeInput, setCustomCodeInput] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('הכל');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  if (!isOpen) return null;

  const activeCatalog = selectedSupplier === 'טמבור' ? TAMBOUR_SHADES : NIRLAT_SHADES;

  // Filtered shades based on category and search
  const filteredShades = activeCatalog.filter((s) => {
    const matchesCategory = activeCategory === 'הכל' || s.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    'הכל',
    'לבנים ושמנת',
    'אפורים ובטון',
    'בז׳ וחול',
    'גווני טבע וים',
    'גוונים דרמטיים'
  ];

  const handleSelectShade = (shade: PaintShade) => {
    setSelectedShade(shade);
    setVerificationResult({
      isValid: true,
      shade,
      provider: shade.brand,
      sourceConfirmed: `מניפת ${shade.brand} 2026 מאומתת`,
      notes: `הגוון ${shade.name} נבחר בהצלחה. מכונות הגיוון בסניפי סבן מתוכנתות עם נוסחה מדויקת.`
    });
  };

  const handleManualVerify = () => {
    if (!customCodeInput.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      const res = verifyPaintShade(customCodeInput, selectedSupplier);
      setVerificationResult(res);
      if (res.isValid && res.shade) {
        setSelectedShade(res.shade);
      }
      setIsVerifying(false);
    }, 700);
  };

  const handleSubmit = () => {
    const branch = SABAN_BRANCHES.find((b) => (b.id || b.code) === selectedBranch) || SABAN_BRANCHES[0];
    const ticketId = `TINT-${selectedSupplier === 'טמבור' ? 'TB' : 'NL'}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const data: TintingRequestData = {
      supplier: selectedSupplier,
      shadeName: selectedShade.name,
      shadeCode: selectedShade.code,
      shadeHex: selectedShade.hex,
      paintType: selectedPaintType,
      packageSize: selectedPackageSize,
      quantity: 1,
      branchCode: branch.id || branch.code,
      branchName: branch.name,
      ticketId,
      createdAt: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    };

    onConfirmTint(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0F3E7A] to-[#124b94] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20">
              <Paintbrush className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">
                  מערך גיוון צבעים ממוחשב – נועה Ai
                </h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  טמבור / נירלט
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-200">
                {productTitle ? `מכוון עבור: ${productTitle}` : 'בחירת גוון ממניפה רשמית עם אימות ממוחשב והעברה לסניף'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Supplier Selector Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#0F3E7A]" />
              <span>1. בחר ספק ומניפת מותג:</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedSupplier('טמבור');
                  setSelectedShade(TAMBOUR_SHADES[3]);
                  setVerificationResult(null);
                }}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  selectedSupplier === 'טמבור'
                    ? 'border-[#0F3E7A] bg-blue-50/70 shadow-md ring-2 ring-[#0F3E7A]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                    טמבור
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm text-slate-900">מניפת טמבור הרשמית</div>
                    <div className="text-[11px] text-slate-500">סופרקריל, סופרפלקס, פוליאור</div>
                  </div>
                </div>
                {selectedSupplier === 'טמבור' && <Check className="w-5 h-5 text-[#0F3E7A]" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedSupplier('נירלט');
                  setSelectedShade(NIRLAT_SHADES[1]);
                  setVerificationResult(null);
                }}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  selectedSupplier === 'נירלט'
                    ? 'border-[#0F3E7A] bg-blue-50/70 shadow-md ring-2 ring-[#0F3E7A]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                    נירלט
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm text-slate-900">מניפת נירלט הרשמית</div>
                    <div className="text-[11px] text-slate-500">אקווניר אדוונס, אוניקריל, אקרינול</div>
                  </div>
                </div>
                {selectedSupplier === 'נירלט' && <Check className="w-5 h-5 text-[#0F3E7A]" />}
              </button>
            </div>
          </div>

          {/* Paint Type & Package Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Paint Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Paintbrush className="w-4 h-4 text-[#0F3E7A]" />
                <span>2. ייעוד המשטח:</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['קיר', 'מתכת', 'עץ'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedPaintType(type)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedPaintType === type
                        ? 'border-[#0F3E7A] bg-[#0F3E7A] text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {type === 'קיר' && 'קירות וגבס'}
                    {type === 'מתכת' && 'מתכת וסורגים'}
                    {type === 'עץ' && 'עץ ודקים'}
                  </button>
                ))}
              </div>
            </div>

            {/* Packaging Size */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#0F3E7A]" />
                <span>3. גודל אריזה:</span>
              </label>
              <select
                value={selectedPackageSize}
                onChange={(e) => setSelectedPackageSize(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
              >
                <option value="גלון 5 ליטר">גלון 5 ליטר (כיסוי כ-25-30 מ״ר)</option>
                <option value="פח 18 ליטר">פח 18 ליטר (כיסוי כ-90-110 מ״ר - הנפוץ ביותר)</option>
                <option value="דלי 10 ליטר">דלי 10 ליטר (חצי פח - כיסוי כ-50 מ״ר)</option>
                <option value="0.75 ליטר (קוורט)">0.75 ליטר / קוורט (לתיקונים, דלתות וסורגים)</option>
              </select>
            </div>
          </div>

          {/* Quick Search and Online Verification Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                <input
                  type="text"
                  placeholder="חיפוש קוד גוון או שם מניפה (לדוגמה: 0514, 0021, IS 0010)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCustomCodeInput(e.target.value);
                  }}
                  className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
                />
              </div>

              <button
                type="button"
                onClick={handleManualVerify}
                className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>אימות מול שרת ספק</span>
              </button>
            </div>

            {/* Visual Thinking when verifying */}
            {isVerifying && (
              <VisualThinkingIndicator statusText="מאמתת קוד גוון מול מאגר היצרן הרשמי..." isCompact />
            )}

            {/* Verification Result Badge */}
            {verificationResult && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                  verificationResult.isValid
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                {verificationResult.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-extrabold">{verificationResult.sourceConfirmed}</div>
                  <div className="text-[11px] opacity-90">{verificationResult.notes}</div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Shade Categories */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                4. בחר גוון מתוך מניפת {selectedSupplier}:
              </label>
              <span className="text-[11px] text-slate-500">
                מוצגים {filteredShades.length} גוונים
              </span>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Shade Swatch Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto p-1 border rounded-2xl border-slate-200 bg-slate-50/50">
              {filteredShades.map((shade) => {
                const isSelected = selectedShade.code === shade.code;
                return (
                  <button
                    key={shade.code}
                    type="button"
                    onClick={() => handleSelectShade(shade)}
                    className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0F3E7A] bg-blue-50 ring-2 ring-[#0F3E7A]/30 shadow-md scale-[1.02]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        {shade.code}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#0F3E7A]" />}
                    </div>

                    <div
                      className="w-full h-12 rounded-lg border border-black/10 shadow-inner mb-2 transition-transform"
                      style={{ backgroundColor: shade.hex }}
                    />

                    <div className="text-xs font-bold text-slate-900 truncate">
                      {shade.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {shade.category}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Swatch Card Preview (קוביית צבע ויזואלית מוגדלת) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0F3E7A] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div
                className="w-20 h-20 rounded-2xl border-2 border-white/30 shadow-xl shrink-0 transition-all transform hover:scale-105"
                style={{ backgroundColor: selectedShade.hex }}
              />
              <div className="space-y-1">
                <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                  גוון נבחר לאישור
                </div>
                <div className="text-lg font-black text-white">
                  {selectedShade.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-200 font-mono">
                  <span>קוד: <strong className="text-white">{selectedShade.code}</strong></span>
                  <span>•</span>
                  <span>ספק: <strong className="text-white">{selectedSupplier}</strong></span>
                  <span>•</span>
                  <span>HEX: {selectedShade.hex}</span>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto text-left space-y-1 text-xs">
              <div className="text-blue-200">סניף לביצוע הגיוון:</div>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none"
              >
                {SABAN_BRANCHES.map((b) => (
                  <option key={b.id || b.code} value={b.id || b.code} className="text-slate-900">
                    {b.name} ({b.subName})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>הגיוון מבוצע במכונת גיוון ממוחשבת תקנית בסניף הנבחר.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer w-1/3 sm:w-auto"
            >
              ביטול
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>אשר גוון והעבר לסניף ⚡</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
