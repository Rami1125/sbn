import React from 'react';

export const SabanLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg'; light?: boolean }> = ({
  className = '',
  size = 'md',
  light = false
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const textColor = light ? 'text-white' : 'text-[#0F3E7A]';
  const subTextColor = light ? 'text-blue-100' : 'text-[#15529C]';
  const yearColor = light ? 'text-amber-300' : 'text-[#0F3E7A]';
  const iconFill = light ? '#FFFFFF' : '#0F3E7A';
  const iconAccent = light ? '#FDE047' : '#0A58CA';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Saban Architectural Emblem (3 stylized towers on foundation) */}
      <div
        className={`relative flex items-center justify-center shrink-0 ${
          isSm ? 'w-9 h-9' : isLg ? 'w-14 h-14' : 'w-11 h-11'
        }`}
      >
        <svg
          viewBox="0 0 100 90"
          className="w-full h-full filter drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle grid lines background like architectural draft */}
          <line x1="10" y1="20" x2="90" y2="20" stroke={light ? 'rgba(255,255,255,0.2)' : '#CBD5E1'} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="10" y1="45" x2="90" y2="45" stroke={light ? 'rgba(255,255,255,0.2)' : '#CBD5E1'} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="10" y1="70" x2="90" y2="70" stroke={light ? 'rgba(255,255,255,0.2)' : '#CBD5E1'} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="30" y1="5" x2="30" y2="85" stroke={light ? 'rgba(255,255,255,0.2)' : '#CBD5E1'} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="70" y1="5" x2="70" y2="85" stroke={light ? 'rgba(255,255,255,0.2)' : '#CBD5E1'} strokeWidth="1" strokeDasharray="2 2" />

          {/* Foundation beam */}
          <rect x="15" y="70" width="70" height="7" rx="1.5" fill={iconAccent} />

          {/* Left Tower */}
          <path d="M25 45 L38 41 L38 70 L25 70 Z" fill={iconFill} />
          <rect x="29" y="52" width="4" height="4" fill={light ? '#0F3E7A' : '#FFFFFF'} />

          {/* Central Main Tower (Tallest) */}
          <path d="M42 22 L58 19 L58 70 L42 70 Z" fill={iconFill} />
          <rect x="48" y="32" width="5" height="5" fill={light ? '#0F3E7A' : '#FFFFFF'} />
          <rect x="48" y="47" width="5" height="5" fill={light ? '#0F3E7A' : '#FFFFFF'} />

          {/* Right Tower */}
          <path d="M62 48 L75 52 L75 70 L62 70 Z" fill={iconFill} />
          <rect x="67" y="57" width="4" height="4" fill={light ? '#0F3E7A' : '#FFFFFF'} />
        </svg>
      </div>

      {/* Corporate Typography */}
      <div className="flex flex-col leading-none text-right">
        <span
          className={`font-black tracking-tight ${textColor} ${
            isSm ? 'text-lg' : isLg ? 'text-2xl' : 'text-xl'
          }`}
        >
          ח.סבן
        </span>
        <span
          className={`font-extrabold tracking-wide ${subTextColor} ${
            isSm ? 'text-[10px]' : isLg ? 'text-sm' : 'text-xs'
          }`}
        >
          חומרי בניין
        </span>
        <span
          className={`font-bold ${yearColor} ${
            isSm ? 'text-[9px]' : 'text-[10px]'
          }`}
        >
          בע״מ (1994)
        </span>
      </div>
    </div>
  );
};
