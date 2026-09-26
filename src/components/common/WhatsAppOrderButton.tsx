import React, { useState, useCallback } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import {
  WhatsAppOrderParams,
  generateWhatsAppOrderLink,
  formatWhatsAppOrderText,
  SABAN_WHATSAPP_PHONE,
  SABAN_DISPLAY_PHONE,
} from '../../lib/whatsappDeepLink';

export interface WhatsAppOrderButtonProps {
  params: WhatsAppOrderParams;
  variant?: 'full' | 'compact' | 'card' | 'icon';
  phone?: string;
  className?: string;
  label?: string;
  showCopyButton?: boolean;
  showPhoneBadge?: boolean;
  onBeforeClick?: () => void;
}

/**
 * Official WhatsApp SVG Vector Icon
 */
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 32 32"
    className={`${className} fill-current flex-shrink-0`}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A13.9 13.9 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.2-4.3 1.1 1.1-4.2-.3-.5A11.5 11.5 0 1 1 16 27.5zm6.3-8.6c-.3-.2-2-.1-2.3.1s-.6.3-.9.6-.5.4-.7.4-.5-.1-1.3-.8a10 10 0 0 1-2.4-2.4c-.4-.7 0-.9.2-1.1.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.2 0-.4 0-.6s-.9-2.2-1.2-3c-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5s-1.5 1.5-1.5 3.6 1.5 4.2 1.7 4.5c.2.3 3 4.6 7.3 6.4 1 .4 1.8.7 2.4.9 1 .3 2 .3 2.8.2.8-.1 2.5-1 2.8-2 .4-.9.4-1.8.3-2 0-.2-.2-.3-.5-.5z" />
  </svg>
);

/**
 * Smart WhatsApp Deep-Link Button Component for H. Saban Building Materials
 */
export const WhatsAppOrderButton: React.FC<WhatsAppOrderButtonProps> = ({
  params,
  variant = 'full',
  phone = SABAN_WHATSAPP_PHONE,
  className = '',
  label,
  showCopyButton = true,
  showPhoneBadge = false,
  onBeforeClick,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const whatsappLink = generateWhatsAppOrderLink(params, phone);
  const plainText = formatWhatsAppOrderText(params);

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(plainText);
        } else {
          // Fallback for non-secure contexts
          const textarea = document.createElement('textarea');
          textarea.value = plainText;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy order details:', err);
      }
    },
    [plainText]
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onBeforeClick) {
      onBeforeClick();
    }
  };

  // 1. Icon Only Variant
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center gap-1 ${className}`}>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          aria-label={`הזמן בוואטסאפ: ${params.productName}`}
        >
          <WhatsAppIcon className="w-5 h-5" />
        </a>

        {showCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'הועתק ללוח!' : 'העתק נוסח הודעה'}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors border border-slate-200"
            aria-label="העתק נוסח הזמנה"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 animate-in fade-in" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}

        {showTooltip && (
          <div className="absolute bottom-full mb-2 right-0 z-30 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-lg pointer-events-none">
            הזמנה ישירה בוואטסאפ ({SABAN_DISPLAY_PHONE})
          </div>
        )}
      </div>
    );
  }

  // 2. Compact Pill Variant (ideal for small product cards & chat bubbles)
  if (variant === 'compact') {
    const buttonLabel = label || 'הזמן ב-WhatsApp';

    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>{buttonLabel}</span>
        </a>

        {showCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs transition-colors flex items-center justify-center"
            title={copied ? 'הועתק ללוח!' : 'העתק פרטי הזמנה'}
            aria-label="העתק פרטי הזמנה ללוח"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    );
  }

  // 3. Card Variant (ideal for store catalog item cards)
  if (variant === 'card') {
    const buttonLabel = label || 'הזמנה מהירה בוואטסאפ';

    return (
      <div className={`flex flex-col gap-1 w-full ${className}`}>
        <div className="flex items-center gap-1.5 w-full">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>{buttonLabel}</span>
          </a>

          {showCopyButton && (
            <button
              type="button"
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors flex items-center justify-center flex-shrink-0"
              title={copied ? 'הנוסח הועתק!' : 'העתק נוסח הזמנה ללוח'}
              aria-label="העתק נוסח הזמנה"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {copied && (
          <span className="text-[11px] text-emerald-600 font-bold text-center animate-in fade-in">
            ✓ נוסח ההזמנה הועתק ללוח בהצלחה!
          </span>
        )}
      </div>
    );
  }

  // 4. Default: Full Width Hero/Product Landing Page Button
  const buttonLabel = label || 'הזמנה מהירה בוואטסאפ לאיסוף מהסניף (BOPIS)';

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
        {/* Main WhatsApp Deep Link Action Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group relative flex-1 flex items-center justify-between gap-3 bg-gradient-to-r from-[#25D366] to-[#20ba5a] hover:from-[#20ba5a] hover:to-[#1ca24e] text-white font-black text-sm sm:text-base py-3.5 px-5 rounded-2xl shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/30 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-emerald-300"
        >
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </span>
            <div className="flex flex-col text-right">
              <span className="leading-snug">{buttonLabel}</span>
              <span className="text-[11px] font-medium text-emerald-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-200" />
                תשלום טלפוני מאובטח ואיסוף ללא תור מהדלפק
              </span>
            </div>
          </div>

          {showPhoneBadge && (
            <span className="hidden md:inline-flex text-xs font-mono font-bold bg-white/20 px-2.5 py-1 rounded-lg">
              {SABAN_DISPLAY_PHONE}
            </span>
          )}
        </a>

        {/* Copy to Clipboard Backup Button */}
        {showCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border font-bold text-xs sm:text-sm transition-all duration-200 flex-shrink-0 ${
              copied
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
            title="העתק נוסח פנייה מלא ללוח למקרה שוואטסאפ אינו זמין"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 animate-in fade-in" />
                <span>הועתק ללוח!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>העתק נוסח</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Confirmation feedback when copied */}
      {copied && (
        <div className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>נוסח ההזמנה הועתק במלואו! ניתן להדביק ישירות בכל שיחה או שליחת SMS למוקד <strong>{SABAN_DISPLAY_PHONE}</strong>.</span>
        </div>
      )}
    </div>
  );
};
