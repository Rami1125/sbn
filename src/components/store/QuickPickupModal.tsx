import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  User,
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GoogleMerchantProduct } from '../../types/product';
import { SABAN_WHATSAPP_PHONE, SABAN_DISPLAY_PHONE } from '../../lib/whatsappDeepLink';
import { WhatsAppIcon } from '../common/WhatsAppOrderButton';

interface QuickPickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: GoogleMerchantProduct;
  currentPrice: number;
  quantity: number;
  selectedPackagingLabel?: string;
  selectedShade?: { code: string; name: string; hex?: string };
}

export const QuickPickupModal: React.FC<QuickPickupModalProps> = ({
  isOpen,
  onClose,
  product,
  currentPrice,
  quantity,
  selectedPackagingLabel,
  selectedShade
}) => {
  const [branch, setBranch] = useState<'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)' | 'סניף התלמיד 6 (מחסן 1 - גבס וצבע)'>(
    'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)'
  );
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>(
    'תשלום טלפוני לפני איסוף / תשלום בדלפק בעת המסירה'
  );

  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  if (!isOpen) return null;

  const totalPrice = currentPrice * quantity;
  const unitName = selectedPackagingLabel || product.size || 'יח׳';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    if (!customerName.trim()) {
      newErrors.name = 'אנא הזן שם מלא או שם חברה';
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 9) {
      newErrors.phone = 'אנא הזן מספר טלפון תקין (לפחות 9 ספרות)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Generate order ID formatted e.g. SAB-889413
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const generatedOrderNo = `SAB-${randomDigits}`;
    setOrderNumber(generatedOrderNo);
  };

  const getWhatsAppMessage = (orderId: string) => {
    const lines = [
      '🏗️ *הזמנה חדשה לאיסוף עצמי מהסניף (BOPIS) - ח. סבן חומרי בניין*',
      `מספר הזמנה: *#${orderId}*`,
      '',
      '📦 *פרטי הפריט:*',
      `• *מק״ט קומקס:* ${product.id}`,
      `• *מוצר:* ${product.title}`,
      `• *כמות:* ${quantity} ${unitName}`,
      `• *מחיר יחידה:* ₪${currentPrice.toFixed(2)} ILS`,
      `• *סה״כ לתשלום:* ₪${totalPrice.toFixed(2)} ILS`,
    ];

    if (selectedShade) {
      lines.push(`• *גוון מבוקש:* ${selectedShade.name} (${selectedShade.code})`);
    }

    lines.push('');
    lines.push('📍 *פרטי איסוף:*');
    lines.push(`• *סניף נבחר:* ${branch}`);
    lines.push(`• *שם המזמין:* ${customerName.trim()}`);
    lines.push(`• *טלפון:* ${customerPhone.trim()}`);
    lines.push(`• *אמצעי תשלום:* ${paymentMethod}`);

    if (notes.trim()) {
      lines.push(`• *הערות נוספות:* ${notes.trim()}`);
    }

    lines.push('');
    lines.push('💳 *שלב הבא:* שלום לנציג הדלפק, אשמח לתיאום וחיוב טלפוני קצר כדי שההזמנה תמתין לי מוכנה ברציף האיסוף ללא תור. תודה!');

    return lines.join('\n');
  };

  const orderMessageText = orderNumber ? getWhatsAppMessage(orderNumber) : '';
  const whatsappUrl = orderNumber
    ? `https://wa.me/${SABAN_WHATSAPP_PHONE}?text=${encodeURIComponent(orderMessageText)}`
    : '';

  const handleCopyText = async () => {
    if (!orderMessageText) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(orderMessageText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = orderMessageText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleResetModal = () => {
    setOrderNumber(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pickup-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-right font-['Heebo','Assistant',sans-serif] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0A2E5C] via-[#0F3E7A] to-[#16529e] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Building2 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                  BOPIS • איסוף עצמי מהיר
                </span>
                <span className="text-xs text-blue-200">חיסכון בזמן וללא תור</span>
              </div>
              <h2 id="pickup-modal-title" className="text-lg sm:text-xl font-black mt-1">
                טופס הזמנה לאיסוף עצמי מהסניף
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetModal}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="סגור טופס"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-5">
          
          {/* Product Summary Mini Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={product.image_link}
                alt={product.title}
                className="w-16 h-16 rounded-xl object-contain bg-white border border-slate-200 p-1 shrink-0"
              />
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                  מק״ט: {product.id}
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base line-clamp-1 mt-1">
                  {product.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-0.5">
                  <span>כמות: <strong>{quantity} {unitName}</strong></span>
                  {selectedShade && (
                    <span className="flex items-center gap-1">
                      <span>• גוון:</span>
                      <span
                        className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                        style={{ backgroundColor: selectedShade.hex || '#e2e8f0' }}
                      />
                      <strong>{selectedShade.name}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-left shrink-0">
              <div className="text-xs text-slate-500 font-medium">סה״כ לתשלום:</div>
              <div className="text-xl sm:text-2xl font-black text-[#0F3E7A]">
                ₪{totalPrice.toFixed(2)}
                <span className="text-xs font-bold text-slate-500 mr-1">ILS</span>
              </div>
              <div className="text-[10px] text-emerald-600 font-bold">כולל מע״מ</div>
            </div>
          </div>

          {/* If Order is already completed, display success and WhatsApp launch */}
          {orderNumber ? (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Order Confirmation Card */}
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 text-emerald-950 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-black">ההזמנה נקלטה בהצלחה במערכת סבן!</h3>
                  </div>
                  <span className="bg-emerald-200 text-emerald-900 text-xs font-mono font-black px-3 py-1 rounded-xl">
                    {orderNumber}
                  </span>
                </div>

                <p className="text-xs text-emerald-800 leading-relaxed">
                  הפרטים נשמרו. כדי להבטיח שההזמנה תמתין לך ארוזה ומוכנה לאיסוף מהיר ברציף ללא המתנה, לחץ על הכפתור למטה לפתיחת שיחת WhatsApp ישירה עם דלפק ההזמנות לתיאום וחיוב טלפוני מאובטח.
                </p>

                <div className="bg-white/80 rounded-xl p-3 border border-emerald-200 text-xs space-y-1.5 font-medium text-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500">מספר הזמנה:</span>
                    <span className="font-mono font-bold text-[#0F3E7A]">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">סניף איסוף:</span>
                    <span className="font-bold">{branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">מזמין:</span>
                    <span>{customerName} ({customerPhone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">אופן תשלום:</span>
                    <span className="text-emerald-700 font-bold">{paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Smart WhatsApp CTA Button */}
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 rounded-2xl font-black text-base shadow-xl shadow-emerald-900/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <WhatsAppIcon className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                  <span>📲 פתח שיחת WhatsApp עם נציג הדלפק לתיאום וחיוב טלפוני</span>
                </a>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-slate-200 cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">נוסח ההודעה הועתק ללוח!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>העתק נוסח הודעה מלא</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetModal}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    סגור חלון
                  </button>
                </div>
              </div>

              {/* Branch Logistics & Timing reminder */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0F3E7A] shrink-0" />
                <span>
                  שעות פתיחת רציפי האיסוף: <strong>ימים א׳-ה׳ 06:30-17:00, ו׳ 06:30-13:00</strong>. מוקד סבן: {SABAN_DISPLAY_PHONE}.
                </span>
              </div>

            </div>
          ) : (
            /* Order Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Branch Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0F3E7A]" />
                  בחר סניף לאיסוף עצמי (BOPIS):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      id: 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)',
                      name: 'סניף החרש 10 (מחסן 4)',
                      subtitle: 'מרכז לוגיסטי ראשי, איטום, צמנטים וברזל',
                      hours: '06:30-17:00'
                    },
                    {
                      id: 'סניף התלמיד 6 (מחסן 1 - גבס וצבע)',
                      name: 'סניף התלמיד 6 (מחסן 1)',
                      subtitle: 'מתחם צבע, גבס, לוחות ופרזול',
                      hours: '06:30-17:00'
                    }
                  ].map((b) => {
                    const isSelected = branch === b.id;
                    return (
                      <label
                        key={b.id}
                        className={`p-3.5 rounded-2xl border text-right cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#0F3E7A] bg-blue-50/70 ring-2 ring-[#0F3E7A]/20 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-extrabold text-sm text-slate-900">{b.name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{b.subtitle}</div>
                          </div>
                          <input
                            type="radio"
                            name="saban_pickup_branch"
                            checked={isSelected}
                            onChange={() => setBranch(b.id as any)}
                            className="mt-1 text-[#0F3E7A] focus:ring-0 cursor-pointer"
                          />
                        </div>
                        <div className="mt-2 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>מלאי זמין לאיסוף מיידי • {b.hours}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Customer Full Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    שם מלא / שם חברה: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="לדוגמה: יוסי כהן או כהן עבודות גמר"
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all ${
                      errors.name
                        ? 'border-rose-400 bg-rose-50/40 ring-2 ring-rose-200'
                        : 'border-slate-300 focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/10'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-rose-500 mt-1 block font-bold">{errors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    מספר טלפון לתיאום: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="050-1234567"
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-all text-right ${
                      errors.phone
                        ? 'border-rose-400 bg-rose-50/40 ring-2 ring-rose-200'
                        : 'border-slate-300 focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/10'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-rose-500 mt-1 block font-bold">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Payment Method - Checked by Default */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  אמצעי תשלום נבחר:
                </label>
                
                <label className="flex items-start gap-2.5 cursor-pointer bg-white p-3 rounded-xl border border-emerald-300 ring-2 ring-emerald-500/10">
                  <input
                    type="radio"
                    name="pickup_payment_method"
                    checked={paymentMethod === 'תשלום טלפוני לפני איסוף / תשלום בדלפק בעת המסירה'}
                    onChange={() => setPaymentMethod('תשלום טלפוני לפני איסוף / תשלום בדלפק בעת המסירה')}
                    className="mt-0.5 text-emerald-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-black text-slate-900">
                      תשלום טלפוני לפני איסוף / תשלום בדלפק בעת המסירה
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      חיוב אשראי טלפוני מאובטח מול נציג שירות סבן או תשלום בעת קבלת הסחורה בסניף (אשראי / מזומן / צ׳ק קבלנים).
                    </div>
                  </div>
                </label>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  הערות או בקשה לשעת איסוף (אופציונלי):
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="לדוגמה: אגיע בסביבות השעה 11:00, נא להכין ברציף 4"
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#0F3E7A]"
                />
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  בשלב הבא: קבלת מספר הזמנה וחיבור מיידי לוואטסאפ של הסניף
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    ביטול
                  </button>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-none bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>המשך להפקת מספר הזמנה</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
