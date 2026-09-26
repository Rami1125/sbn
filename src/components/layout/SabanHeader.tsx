import React from 'react';
import {
  ShoppingBag,
  MapPin,
  Clock,
  Phone,
  FileSpreadsheet,
  Search,
  Sparkles,
  Layers,
  ExternalLink,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { SabanLogo } from './SabanLogo';
import { useCart } from '../../context/CartContext';
import { SABAN_BRANCHES } from '../../data/initialProducts';

interface SabanHeaderProps {
  currentView: 'catalog' | 'product' | 'feed-studio' | 'returns';
  onChangeView: (view: 'catalog' | 'product' | 'feed-studio' | 'returns') => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const SabanHeader: React.FC<SabanHeaderProps> = ({
  currentView,
  onChangeView,
  searchQuery = '',
  onSearchChange
}) => {
  const { totalItemCount, finalTotal, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* Top Announcement & Branches Bar */}
      <div className="bg-[#0A2E5C] text-slate-200 text-[11px] py-1.5 px-4 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Branch status lights */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">החרש 10 הוד השרון:</span>
              <span className="text-blue-200 hidden sm:inline">פתוח עד 17:00 (חומרי שלד, מלט, איטום)</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-white">התלמיד 6 הוד השרון:</span>
              <span className="text-blue-200">פתוח עד 17:00 (גבס, צבע ופרזול)</span>
            </div>
          </div>

          {/* Quick links & Google Merchant Indicator */}
          <div className="flex items-center gap-4 mr-auto">
            <button
              onClick={() => onChangeView('returns')}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>מדיניות החזרות (14 יום)</span>
            </button>

            <span className="hidden lg:flex items-center gap-1 text-amber-300 font-bold">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>GMC פיד פעיל (18 עמודות)</span>
            </span>

            <a
              href="tel:09-7602010"
              className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-mono font-bold">09-7602010</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => onChangeView('catalog')}
            className="cursor-pointer transition-transform hover:scale-102"
          >
            <SabanLogo size="md" />
          </div>

          {/* View Mode Tabs (Storefront / Product Landing / GMC Studio / Returns) */}
          <nav className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => onChangeView('catalog')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                currentView === 'catalog'
                  ? 'bg-[#0F3E7A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              חנות וקטלוג סבן
            </button>

            <button
              onClick={() => onChangeView('product')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'product'
                  ? 'bg-[#0F3E7A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>דף מוצר גוגל</span>
              <span className="text-[10px] bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded font-extrabold">
                Schema
              </span>
            </button>

            <button
              onClick={() => onChangeView('feed-studio')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'feed-studio'
                  ? 'bg-[#0F3E7A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-500" />
              <span>סטודיו Google Feed</span>
            </button>

            <button
              onClick={() => onChangeView('returns')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'returns'
                  ? 'bg-[#0F3E7A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>החזרות וביטולים</span>
            </button>
          </nav>

          {/* Search Input (Catalog View) */}
          {onSearchChange && (
            <div className="hidden xl:flex items-center relative w-64">
              <input
                type="text"
                placeholder="חיפוש סיקה, טמבור, מלט..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pl-8 text-xs focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          )}

          {/* Cart Drawer Trigger Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white p-2.5 sm:px-4 sm:py-2.5 rounded-2xl font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer relative"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-right leading-none">
                <span className="text-[11px] text-blue-200">סל איסוף מהיר</span>
                <span className="font-extrabold text-white text-xs mt-0.5">
                  ₪{finalTotal.toFixed(2)}
                </span>
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-between border-t border-slate-100 pt-2.5 mt-2.5 text-xs font-bold overflow-x-auto gap-2">
          <button
            onClick={() => onChangeView('catalog')}
            className={`py-1.5 px-3 rounded-xl whitespace-nowrap ${
              currentView === 'catalog' ? 'bg-[#0F3E7A] text-white' : 'text-slate-600'
            }`}
          >
            חנות וקטלוג
          </button>
          <button
            onClick={() => onChangeView('product')}
            className={`py-1.5 px-3 rounded-xl whitespace-nowrap ${
              currentView === 'product' ? 'bg-[#0F3E7A] text-white' : 'text-slate-600'
            }`}
          >
            דף מוצר גוגל
          </button>
          <button
            onClick={() => onChangeView('feed-studio')}
            className={`py-1.5 px-3 rounded-xl whitespace-nowrap flex items-center gap-1 ${
              currentView === 'feed-studio' ? 'bg-[#0F3E7A] text-white' : 'text-slate-600'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-500" />
            <span>סטודיו פיד GMC</span>
          </button>
          <button
            onClick={() => onChangeView('returns')}
            className={`py-1.5 px-3 rounded-xl whitespace-nowrap flex items-center gap-1 ${
              currentView === 'returns' ? 'bg-[#0F3E7A] text-white' : 'text-slate-600'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-500" />
            <span>החזרות וביטולים</span>
          </button>
        </div>
      </div>
    </header>
  );
};
