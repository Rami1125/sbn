import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Clock,
  Phone,
  User,
  ArrowRight,
  ShieldCheck,
  Percent,
  CheckCircle2,
  MessageCircle,
  FileSpreadsheet,
  QrCode,
  Sparkles,
  ExternalLink,
  Printer
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SABAN_BRANCHES } from '../../data/initialProducts';
import { BranchCode } from '../../types/product';

export const SabanStoreCartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    contractorTier,
    setContractorTier,
    selectedBranch,
    setSelectedBranch,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    pickupTime,
    setPickupTime,
    orderNotes,
    setOrderNotes,
    subtotal,
    discountRate,
    discountAmount,
    taxAmount,
    finalTotal,
    totalItemCount,
    isSubmittingOrder,
    lastCompletedOrder,
    submitOrder,
    dismissOrderSuccess
  } = useCart();

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});

  if (!isCartOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string } = {};

    if (!customerName.trim()) {
      errors.name = 'אנא הזן שם מלא / שם החברה';
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 9) {
      errors.phone = 'אנא הזן מספר טלפון תקין לקבלת עדכוני WhatsApp';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    await submitOrder();
  };

  const getBranchDetails = (code: BranchCode) => {
    return SABAN_BRANCHES.find((b) => b.code === code) || SABAN_BRANCHES[0];
  };

  const activeBranch = getBranchDetails(selectedBranch);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-start">
      {/* Slide-over Panel (RTL left-to-right drawer) */}
      <div className="w-full max-w-xl bg-white shadow-2xl flex flex-col h-full overflow-hidden transform transition-transform duration-300">
        
        {/* Header */}
        <div className="bg-[#0F3E7A] text-white p-5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">סל קניות ואיסוף מהסניף</h2>
                <span className="text-xs bg-amber-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-full">
                  {totalItemCount} פריטים
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                ח. סבן חומרי בניין (1994) בע״מ • איסוף עצמי מהיר
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              dismissOrderSuccess();
              setIsCartOpen(false);
            }}
            className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="סגור סל"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        {lastCompletedOrder ? (
          /* Order Confirmation View */
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ההזמנה נקלטה במחסן בהצלחה!
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  קוד איסוף מהיר לרציף:
                </h3>
                <div className="text-3xl font-mono font-black text-[#0F3E7A] tracking-wider bg-blue-50 py-2.5 px-6 rounded-2xl border-2 border-[#0F3E7A]/20 inline-block mt-1 shadow-sm">
                  {lastCompletedOrder.pickupCode}
                </div>
              </div>

              {/* Barcode & Instructions simulation */}
              <div className="border-t border-b border-dashed border-slate-200 py-3 space-y-1">
                <div className="text-xs text-slate-500 font-mono">
                  BARCODE: ||| | ||||| || |||| ||||| ||| ||
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  הצג קוד זה למלגזן או לדלפק האיסוף בסניף לקבלת ההזמנה ללא תור.
                </div>
              </div>

              {/* Branch and Pickup Details */}
              <div className="text-right bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">סניף מיועד לאיסוף:</span>
                  <span className="font-extrabold text-[#0F3E7A]">
                    {getBranchDetails(lastCompletedOrder.pickupBranch).name} ({getBranchDetails(lastCompletedOrder.pickupBranch).subName})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">שעת איסוף משוערת:</span>
                  <span className="font-bold text-slate-800">{lastCompletedOrder.pickupTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">שם המזמין:</span>
                  <span className="font-bold text-slate-800">{lastCompletedOrder.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">טלפון לקבלת עדכוני WhatsApp:</span>
                  <span className="font-bold text-slate-800">{lastCompletedOrder.customerPhone}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-700 font-bold">סה״כ לתשלום באיסוף:</span>
                  <span className="font-black text-[#0F3E7A] text-sm">₪{lastCompletedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Google Sheets Sync Confirmation Badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">סונכרן אוטומטית ל-Google Sheets:</span>
                </div>
                <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-emerald-300">
                  {lastCompletedOrder.sheetRowId}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <a
                  href={`https://wa.me/972${lastCompletedOrder.customerPhone.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent(
                    `שלום מסבן חומרי בניין! הזמנתך מספר ${lastCompletedOrder.pickupCode} עבור ${lastCompletedOrder.customerName} נקלטה בסניף ${getBranchDetails(lastCompletedOrder.pickupBranch).name}. סה״כ לתשלום: ₪${lastCompletedOrder.total.toFixed(2)}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>שלח שובר ב-WhatsApp</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="bg-slate-800 hover:bg-slate-900 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>הדפס שובר איסוף</span>
                </button>
              </div>

              <button
                onClick={() => {
                  dismissOrderSuccess();
                  setIsCartOpen(false);
                }}
                className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 pt-1"
              >
                חזור לחנות וסגור חלון
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-4">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">סל הקניות של סבן ריק</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                בחר מוצרים מובחרים מחומרי הבניין, האיטום, הגבס או הצבע והוסף אותם להזמנת איסוף מהיר מהסניף.
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="bg-[#0F3E7A] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#0A2E5C] transition-colors cursor-pointer"
            >
              המשך בקניות
            </button>
          </div>
        ) : (
          /* Main Cart Content with Items, Contractor Tier & Form */
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-slate-800">
            
            {/* Contractor Savings Calculator Bar */}
            <div className="bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200/80 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-amber-600" />
                  מחשבון מועדון קבלנים וחיסכון:
                </span>
                {discountAmount > 0 && (
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    חיסכון: ₪{discountAmount.toFixed(2)}!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setContractorTier('private')}
                  className={`py-2 px-2 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                    contractorTier === 'private'
                      ? 'bg-white border-[#0F3E7A] text-[#0F3E7A] shadow-sm ring-1 ring-[#0F3E7A]'
                      : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div>לקוח פרטי</div>
                  <div className="text-[10px] text-slate-400">מחירון רשמי</div>
                </button>

                <button
                  type="button"
                  onClick={() => setContractorTier('contractor_silver')}
                  className={`py-2 px-2 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                    contractorTier === 'contractor_silver'
                      ? 'bg-white border-[#0F3E7A] text-[#0F3E7A] shadow-sm ring-1 ring-[#0F3E7A]'
                      : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div>קבלן כסף</div>
                  <div className="text-[10px] text-emerald-600 font-extrabold">7% הנחה</div>
                </button>

                <button
                  type="button"
                  onClick={() => setContractorTier('contractor_gold')}
                  className={`py-2 px-2 rounded-xl text-center border text-xs font-bold transition-all cursor-pointer ${
                    contractorTier === 'contractor_gold'
                      ? 'bg-amber-100/80 border-amber-500 text-amber-950 shadow-sm ring-1 ring-amber-500'
                      : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>סבן PRO זהב</span>
                    <Sparkles className="w-3 h-3 text-amber-600" />
                  </div>
                  <div className="text-[10px] text-amber-800 font-extrabold">12% הנחה</div>
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>פריטים בהזמנה ({totalItemCount}):</span>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-xs font-normal hover:underline"
                >
                  רוקן סל
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-center gap-3.5"
                >
                  <img
                    src={item.image_link}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-contain bg-slate-50 border border-slate-100 p-1 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="font-mono text-slate-400">מק״ט {item.sku}</span>
                      {item.selectedPackaging && (
                        <span>• {item.selectedPackaging}</span>
                      )}
                    </div>

                    {/* Selected Shade Swatch */}
                    {item.selectedShade && (
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-slate-700">
                        <span
                          className="w-3 h-3 rounded-full border border-slate-300 shadow-inner"
                          style={{ backgroundColor: item.selectedShade.hex }}
                        />
                        <span>
                          {item.selectedShade.name} ({item.selectedShade.code})
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <span className="font-black text-[#0F3E7A] text-sm">
                          ₪{(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ₪{(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="הסר פריט מהסל"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Branch Pickup Selector */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0F3E7A]" />
                בחר סניף ייעודי לאיסוף ההזמנה:
              </label>

              <div className="space-y-2">
                {SABAN_BRANCHES.map((b) => {
                  const isSelected = selectedBranch === b.code;
                  return (
                    <button
                      key={b.code}
                      type="button"
                      onClick={() => setSelectedBranch(b.code)}
                      className={`w-full text-right p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0F3E7A] bg-blue-50/70 ring-2 ring-[#0F3E7A]/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-slate-900">
                          {b.name} - {b.subName}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0F3E7A]" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        {b.address} • שעות פעילות: {b.hours}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                        {b.dispatchBay}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer Details Form */}
            <form id="saban-cart-checkout-form" onSubmit={handleCheckout} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3.5">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-[#0F3E7A]" />
                פרטי לקוח ואישור איסוף מיידי:
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  שם מלא / חברה / קבלן: <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="לדוגמה: ישראל ישראלי - שיפוצים ובינוי"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0F3E7A] ${
                      formErrors.name ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-[11px] text-red-600 font-semibold">{formErrors.name}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  טלפון נייד (לעדכון קוד ב-WhatsApp): <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="050-1234567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0F3E7A] ${
                      formErrors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                    }`}
                  />
                  <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-red-600 font-semibold">{formErrors.phone}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  שעת איסוף משוערת:
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
                >
                  <option value="תוך 60 דקות (VIP אקספרס)">תוך 60 דקות (VIP אקספרס ברציף)</option>
                  <option value="היום ב-12:00">היום ב-12:00</option>
                  <option value="היום ב-15:00">היום ב-15:00</option>
                  <option value="היום לפני סגירה (עד 17:00)">היום לפני סגירה (עד 17:00)</option>
                  <option value="מחר בבוקר 07:00 (לפני פיזור עובדים)">מחר בבוקר 07:00 (פתיחת שערים)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  הערות לצוות המחסן / בקשת מלגזה (אופציונלי):
                </label>
                <input
                  type="text"
                  placeholder="למשל: נדרש משטח עטוף שרינק / הגעה במשאית עם מנוף"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
                />
              </div>
            </form>
          </div>
        )}

        {/* Footer with Totals and Submit Action */}
        {!lastCompletedOrder && cart.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 p-5 shrink-0 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>סכום ביניים:</span>
                <span className="font-mono">₪{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-bold">
                  <span>הנחת קבלן ({Math.round(discountRate * 100)}%):</span>
                  <span className="font-mono">-₪{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>מע״מ 18% (מגולם במחיר):</span>
                <span className="font-mono">₪{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-200">
                <span>סה״כ לתשלום באיסוף:</span>
                <span className="text-[#0F3E7A] text-xl font-mono">₪{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="saban-cart-checkout-form"
              disabled={isSubmittingOrder}
              className="w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] disabled:bg-slate-400 text-white py-3.5 px-6 rounded-xl font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmittingOrder ? (
                <span>משגר הזמנה ומסנכרן ל-Google Sheets...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-amber-300" />
                  <span>שגר הזמנה וקבל קוד איסוף מיידי לסניף</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                איסוף ללא תור ברציף הקבלנים
              </span>
              <span className="flex items-center gap-1">
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                סנכרון ישיר ל-GMC Sheets
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
