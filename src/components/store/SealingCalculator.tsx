import React, { useState, useId } from 'react';
import { Calculator, Check, Info, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { GoogleMerchantProduct } from '../../types/product';

interface SealingCalculatorProps {
  product: GoogleMerchantProduct;
  onApplyQuantity?: (quantity: number) => void;
}

type CalculationMode = 'area' | 'linear';

interface SealingPreset {
  id: string;
  name: string;
  type: 'cementitious' | 'acrylic' | 'polyurethane' | 'latex' | 'general';
  defaultConsumptionKgPerM2PerMm: number; // e.g. 2.0 kg/m² for 1mm thickness (Sika 107)
  defaultCoats: number;
  defaultThicknessMm: number;
  packageWeightKgOrLiter: number; // e.g. 25kg kit or 18kg pail or 0.3L (300ml)
  unitLabel: string; // 'ערכות 25 ק״ג' | 'פחים 18 ק״ג' | 'תרמילים 300 מ״ל' | 'גלונים'
  linearCoveragePerUnitMeters?: number; // meters per unit (e.g. 3m per 300ml cartridge for 10x10mm joint, or 25m roll)
  jointWidthMm?: number;
  jointDepthMm?: number;
  description: string;
  tip: string;
}

export const SealingCalculator: React.FC<SealingCalculatorProps> = ({
  product,
  onApplyQuantity,
}) => {
  const calcId = useId();

  // Detect product characteristics
  const isSikaflexCartridge = product.id === '15680' || product.id === '15681' || product.id === '15682' || product.title.includes('תרמיל') || product.title.includes('300 מ״ל');
  const isSikaTop107 = product.id === '10701' || product.title.includes('סיקה טופ 107');
  const isSuperflexRoof = product.id === '20110' || product.title.includes('סופרפלקס');
  const isSikaLatex = product.id === '10702' || product.title.includes('לטקס');

  // Default mode: linear for cartridges/sealants, area (m²) for membranes/cementitious/roofing
  const defaultMode: CalculationMode = isSikaflexCartridge ? 'linear' : 'area';
  const [mode, setMode] = useState<CalculationMode>(defaultMode);

  // Area inputs
  const [areaM2, setAreaM2] = useState<number>(15);
  const [customLength, setCustomLength] = useState<number>(5);
  const [customWidth, setCustomWidth] = useState<number>(3);
  const [useDimensions, setUseDimensions] = useState<boolean>(false);

  // Linear inputs (for joint sealing / roller fillets / edges)
  const [linearMeters, setLinearMeters] = useState<number>(12);
  const [jointWidthMm, setJointWidthMm] = useState<number>(10);
  const [jointDepthMm, setJointDepthMm] = useState<number>(10);

  // Application parameters
  const [safetyMarginPercent, setSafetyMarginPercent] = useState<number>(10); // 10% standard construction waste
  const [coats, setCoats] = useState<number>(isSuperflexRoof || isSikaTop107 ? 2 : 1);
  const [appliedNotification, setAppliedNotification] = useState<boolean>(false);

  // Package capacity determination
  let unitSizeKg = 25;
  let unitName = 'ערכות 25 ק״ג';
  let coverageM2PerUnit = 12.5; // default Sika 107 in 2 coats
  let kgNeededPerM2 = 2.0; // 2kg/m² per coat or total

  if (isSikaflexCartridge) {
    unitSizeKg = 0.3; // 300ml
    unitName = 'תרמילי 300 מ״ל';
  } else if (isSuperflexRoof) {
    unitSizeKg = 18;
    unitName = 'פחי 18 ק״ג';
    coverageM2PerUnit = 15; // 15 m² per 18kg pail in 2 coats (approx 1.2 kg/m²)
  } else if (isSikaLatex) {
    unitSizeKg = 5;
    unitName = 'גלונים 5 ק״ג';
    coverageM2PerUnit = 25; // 0.2 kg/m² as additive
  } else if (product.packagingOptions && product.packagingOptions[0]) {
    const rawSize = parseFloat(product.packagingOptions[0].size.replace(/[^\d.]/g, '')) || 25;
    unitSizeKg = rawSize;
    unitName = `יחידות (${product.packagingOptions[0].size})`;
  }

  // Calculate actual area
  const effectiveArea = useDimensions ? (customLength * customWidth) : areaM2;

  // Calculation results
  let totalMaterialNeeded = 0; // kg or ml
  let unitsRequired = 0;
  let calculationNote = '';

  if (mode === 'area') {
    if (isSikaflexCartridge) {
      // Cartridge applied as surface adhesive (ribs/dots: approx 1 cartridge per 1.5 - 2 m²)
      const cartridgesPerM2 = 0.6; // approx 1 cartridge per 1.6 m²
      const baseUnits = effectiveArea * cartridgesPerM2;
      const withMargin = baseUnits * (1 + safetyMarginPercent / 100);
      unitsRequired = Math.max(1, Math.ceil(withMargin));
      calculationNote = `לפי מריחת פסים/נקודות הצמדה (כ-1.6 מ״ר לתרמיל) + מקדם פחת ${safetyMarginPercent}%`;
    } else if (isSuperflexRoof) {
      // 1.2 - 1.5 kg per m² total in 2 coats
      const totalKg = effectiveArea * 1.3 * (coats / 2);
      const withMargin = totalKg * (1 + safetyMarginPercent / 100);
      totalMaterialNeeded = Math.round(withMargin * 10) / 10;
      unitsRequired = Math.max(1, Math.ceil(withMargin / 18));
      calculationNote = `לפי צריכה ממוצעת של 1.3 ק״ג/מ״ר ב-${coats} שכבות + מקדם פחת ${safetyMarginPercent}%`;
    } else if (isSikaLatex) {
      // Sika Latex additive (approx 0.2 - 0.3 kg/m² for slurry bond coat)
      const totalKg = effectiveArea * 0.25 * coats;
      const withMargin = totalKg * (1 + safetyMarginPercent / 100);
      totalMaterialNeeded = Math.round(withMargin * 10) / 10;
      unitsRequired = Math.max(1, Math.ceil(withMargin / 5));
      calculationNote = `כשכבת קישור/שפריץ צמנטי משופר (כ-0.25 ק״ג/מ״ר) + מקדם פחת ${safetyMarginPercent}%`;
    } else {
      // SikaTop 107 & cementitious sealants: 2.0 kg / m² per 1mm thickness. Standard 2 coats = 2mm = 4.0 kg/m² or 2kg/m² (12.5m² per kit)
      // Standard recommended Sika spec: 2 coats = 2-2.5 kg/m² total (1 kit covers ~10-12.5 m²)
      const kgPerM2 = coats === 1 ? 1.5 : 2.0;
      const totalKg = effectiveArea * kgPerM2;
      const withMargin = totalKg * (1 + safetyMarginPercent / 100);
      totalMaterialNeeded = Math.round(withMargin * 10) / 10;
      unitsRequired = Math.max(1, Math.ceil(withMargin / unitSizeKg));
      calculationNote = `לפי מפרט סיקה רשמי: ${kgPerM2} ק״ג למ״ר ב-${coats} שכבות + מקדם פחת ${safetyMarginPercent}%`;
    }
  } else {
    // Mode is linear (מטר רץ)
    if (isSikaflexCartridge) {
      // Cartridge volume = 300 ml (300,000 mm³)
      // Joint volume per meter = width(mm) * depth(mm) * 1000mm
      const jointVolPerMeter = jointWidthMm * jointDepthMm * 1000; // in mm³
      const metersPerCartridge = 300000 / jointVolPerMeter; // e.g. for 10x10mm -> 300000 / 100000 = 3.0 meters
      const cartridgesNeeded = linearMeters / metersPerCartridge;
      const withMargin = cartridgesNeeded * (1 + safetyMarginPercent / 100);
      unitsRequired = Math.max(1, Math.ceil(withMargin));
      calculationNote = `לתפר ברוחב ${jointWidthMm} מ״מ ועומק ${jointDepthMm} מ״מ (~${metersPerCartridge.toFixed(1)} מ״ר לתרמיל) + פחת ${safetyMarginPercent}%`;
    } else if (isSikaLatex) {
      // Sika Latex for roller fillets (רולקות איטום בחיבור רצפה-קיר)
      // 1 gallon (5kg) makes enough mortar for ~35-40 linear meters of fillet
      const metersPerGallon = 35;
      const baseUnits = linearMeters / metersPerGallon;
      const withMargin = baseUnits * (1 + safetyMarginPercent / 100);
      unitsRequired = Math.max(1, Math.ceil(withMargin));
      calculationNote = `ליציקת והעשרת רולקות בחיבור רצפה-קיר (כ-35 מטר רץ לגלון 5 ק״ג)`;
    } else {
      // General waterproofing fillet / perimeter band: 1 kit covers approx 25-30 linear meters of 5x5cm fillet or band
      const metersPerUnit = 25;
      const baseUnits = linearMeters / metersPerUnit;
      const withMargin = baseUnits * (1 + safetyMarginPercent / 100);
      unitsRequired = Math.max(1, Math.ceil(withMargin));
      calculationNote = `לאיטום רצועות היקפיות / רולקות צמנטיות (כ-${metersPerUnit} מ״א לערכה)`;
    }
  }

  const handleApply = () => {
    if (onApplyQuantity) {
      onApplyQuantity(unitsRequired);
      setAppliedNotification(true);
      setTimeout(() => setAppliedNotification(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-blue-900/50 my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                מחשבון כמויות לקבלנים ואנשי מקצוע
              </h3>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                כלי מקצועי
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              חישוב מדויק לפי תקן יצרן ({product.brand}) • מונע מחסור באתרי בנייה
            </p>
          </div>
        </div>

        {/* Quick Mode Toggle */}
        <div className="inline-flex bg-slate-950/60 p-1 rounded-xl border border-white/10 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('area')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'area'
                ? 'bg-[#0F3E7A] text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            שטח (מ״ר)
          </button>
          <button
            type="button"
            onClick={() => setMode('linear')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'linear'
                ? 'bg-[#0F3E7A] text-white shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            מטר רץ (מ״א)
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Middle: Calculation Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {mode === 'area' ? (
            <div className="space-y-4">
              {/* Dimensions toggle */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold text-white">הגדרת שטח האיטום:</span>
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={useDimensions}
                    onChange={(e) => setUseDimensions(e.target.checked)}
                    className="rounded border-slate-600 text-amber-400 focus:ring-amber-400/50 bg-slate-900"
                  />
                  <span>חישוב לפי אורך × רוחב</span>
                </label>
              </div>

              {!useDimensions ? (
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">שטח כולל במ״ר:</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">{areaM2} מ״ר</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={200}
                      step={1}
                      value={areaM2}
                      onChange={(e) => setAreaM2(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                    />
                    <div className="relative shrink-0 w-24">
                      <input
                        type="number"
                        min={0.5}
                        max={1000}
                        value={areaM2}
                        onChange={(e) => setAreaM2(Math.max(0.1, Number(e.target.value) || 0))}
                        className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-2.5 py-1.5 text-center text-sm font-bold text-white focus:outline-none focus:border-amber-400"
                      />
                      <span className="absolute left-2 top-2 text-[10px] text-slate-400 pointer-events-none">מ״ר</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">אורך (מטרים):</label>
                    <input
                      type="number"
                      step={0.5}
                      min={0.5}
                      value={customLength}
                      onChange={(e) => setCustomLength(Math.max(0.1, Number(e.target.value) || 0))}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">רוחב (מטרים):</label>
                    <input
                      type="number"
                      step={0.5}
                      min={0.5}
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Math.max(0.1, Number(e.target.value) || 0))}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="col-span-2 text-xs text-slate-400 bg-slate-950/40 p-2 rounded-xl flex justify-between">
                    <span>סה״כ שטח מחושב:</span>
                    <strong className="text-amber-300 font-mono">{(customLength * customWidth).toFixed(1)} מ״ר</strong>
                  </div>
                </div>
              )}

              {/* Number of coats (for paint / cementitious) */}
              {!isSikaflexCartridge && (
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">מספר שכבות איטום נדרשות:</span>
                    <span className="text-xs font-bold text-amber-300">{coats} שכבות (מומלץ)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCoats(c)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          coats === c
                            ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                            : 'bg-slate-950/60 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {c === 1 ? 'שכבה 1 (פריימר/דקה)' : c === 2 ? '2 שכבות (תקני)' : '3 שכבות (עומס מים)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Linear meters controls */
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">אורך תפר / רולקה במטר רץ:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{linearMeters} מ״א</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={linearMeters}
                    onChange={(e) => setLinearMeters(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                  />
                  <div className="relative shrink-0 w-24">
                    <input
                      type="number"
                      min={0.5}
                      max={500}
                      value={linearMeters}
                      onChange={(e) => setLinearMeters(Math.max(0.1, Number(e.target.value) || 0))}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-2.5 py-1.5 text-center text-sm font-bold text-white focus:outline-none focus:border-amber-400"
                    />
                    <span className="absolute left-2 top-2 text-[10px] text-slate-400 pointer-events-none">מ״א</span>
                  </div>
                </div>
              </div>

              {/* Joint geometry for Sikaflex */}
              {isSikaflexCartridge && (
                <div className="grid grid-cols-2 gap-3 bg-slate-950/50 p-3 rounded-2xl border border-white/5">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">רוחב התפר (מ״מ):</label>
                    <select
                      value={jointWidthMm}
                      onChange={(e) => setJointWidthMm(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={5}>5 מ״מ (חיבור דק / ספ סף)</option>
                      <option value={10}>10 מ״מ (תקן נפוץ)</option>
                      <option value={15}>15 מ״מ (תפר התפשטות)</option>
                      <option value={20}>20 מ״מ (תפר רחב)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">עומק התפר (מ״מ):</label>
                    <select
                      value={jointDepthMm}
                      onChange={(e) => setJointDepthMm(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={5}>5 מ״מ</option>
                      <option value={10}>10 מ״מ (מומלץ עם פרופיל גיבוי)</option>
                      <option value={15}>15 מ״מ</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Safety margin slider */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-300" />
                <span>מקדם רזרבה ופחת אתר:</span>
              </span>
              <span className="font-bold text-amber-300 font-mono">+{safetyMarginPercent}%</span>
            </div>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((margin) => (
                <button
                  key={margin}
                  type="button"
                  onClick={() => setSafetyMarginPercent(margin)}
                  className={`flex-1 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                    safetyMarginPercent === margin
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                      : 'bg-transparent text-slate-400 border-white/5 hover:border-white/10'
                  }`}
                >
                  +{margin}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results Card with CTA (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl p-5 border border-amber-400/30 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                תוצאת חישוב מומלצת
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                <Sparkles className="w-3 h-3" />
                מפרט יצרן
              </span>
            </div>

            {/* Big Quantity Number */}
            <div className="bg-gradient-to-br from-white/10 to-transparent p-4 rounded-2xl border border-white/10 text-center">
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight">
                {unitsRequired}
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {unitName}
              </div>
              {totalMaterialNeeded > 0 && (
                <div className="text-xs text-slate-400 font-mono mt-1">
                  (משקל כולל משוער: כ-{totalMaterialNeeded} ק״ג חומר)
                </div>
              )}
            </div>

            {/* Note & explanation */}
            <div className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="font-semibold text-slate-200 mb-0.5 flex items-center gap-1">
                <span>בסיס החישוב:</span>
              </div>
              <p className="text-slate-400">{calculationNote}</p>
            </div>
          </div>

          {/* Action button: Apply to Quantity & Cart */}
          <div className="pt-4 relative z-10 space-y-2">
            <button
              type="button"
              onClick={handleApply}
              className={`w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                appliedNotification
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:shadow-amber-400/20'
              }`}
            >
              {appliedNotification ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>עודכן בהזמנה בהצלחה!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>עדכן כמות מוצר ({unitsRequired} יח׳) והמשך</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400">
              רוצה לוודא מפרט מורכב? צוות סבן זמין עבורך לייעוץ הנדסי בוואטסאפ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
