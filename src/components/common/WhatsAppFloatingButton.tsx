import React, { useState } from 'react';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  branchName?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = '97297602010',
  defaultMessage = 'שלום לח. סבן חומרי בניין, ברצוני לברר לגבי מוצרים / הזמנה לאיסוף מהסניף.',
  branchName = 'סניף הוד השרון (09-7602010)'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="יצירת קשר בוואטסאפ"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 pointer-events-auto"
    >
      {/* Tooltip on Desktop / Expanded Pill on Hover */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-slate-900/95 text-white text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-slate-700/60 backdrop-blur-md transition-all duration-300 transform origin-right ${
          isHovered
            ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-x-2 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <div className="flex flex-col text-right leading-tight">
          <span className="font-extrabold text-white">פנייה מהירה בוואטסאפ</span>
          <span className="text-[11px] text-emerald-300 font-mono font-medium">{branchName}</span>
        </div>
      </div>

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl shadow-emerald-900/30 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300/50"
        title="פתח צ'אט WhatsApp עם סניף סבן (09-7602010)"
        aria-label="פתח צ'אט WhatsApp עם סניף סבן (09-7602010)"
      >
        {/* Soft pulse wave behind button */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        {/* Official WhatsApp SVG Vector Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-current relative z-10 filter drop-shadow-sm group-hover:rotate-6 transition-transform duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A13.9 13.9 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.2-4.3 1.1 1.1-4.2-.3-.5A11.5 11.5 0 1 1 16 27.5zm6.3-8.6c-.3-.2-2-.1-2.3.1s-.6.3-.9.6-.5.4-.7.4-.5-.1-1.3-.8a10 10 0 0 1-2.4-2.4c-.4-.7 0-.9.2-1.1.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.2 0-.4 0-.6s-.9-2.2-1.2-3c-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5s-1.5 1.5-1.5 3.6 1.5 4.2 1.7 4.5c.2.3 3 4.6 7.3 6.4 1 .4 1.8.7 2.4.9 1 .3 2 .3 2.8.2.8-.1 2.5-1 2.8-2 .4-.9.4-1.8.3-2 0-.2-.2-.3-.5-.5z" />
        </svg>

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full z-20 shadow-sm" />
      </a>
    </aside>
  );
};
