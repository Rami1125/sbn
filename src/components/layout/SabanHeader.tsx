import React, { useState } from 'react';
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
  RotateCcw,
  X,
  Building2,
  User,
  Truck,
  Award
} from 'lucide-react';
import { SabanLogo } from './SabanLogo';
import { useCart } from '../../context/CartContext';
import { SABAN_BRANCHES } from '../../data/initialProducts';
import { HeaderSearchBar } from './HeaderSearchBar';
import { PwaInstallButton } from '../common/PwaInstallButton';

interface SabanHeaderProps {
  currentView: 'catalog' | 'product' | 'feed-studio' | 'returns' | 'branches' | 'account' | 'track' | 'counter' | 'club';
  onChangeView: (view: 'catalog' | 'product' | 'feed-studio' | 'returns' | 'branches' | 'account' | 'track' | 'counter' | 'club') => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onSelectProduct?: (sku: string) => void;
}

export const SabanHeader: React.FC<SabanHeaderProps> = ({
  currentView,
  onChangeView,
  searchQuery = '',
  onSearchChange,
  onSelectProduct
}) => {
  const { totalItemCount, finalTotal, setIsCartOpen } = useCart();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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
              onClick={() => onChangeView('track')}
              className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer px-2.5 py-0.5 rounded-lg ${
                currentView === 'track'
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'text-amber-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>מעקב הזמנה חי</span>
            </button>

            <button
              onClick={() => onChangeView('returns')}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>מדיניות החזרות (14 יום)</span>
            </button>

            <button
              onClick={() => onChangeView('club')}
              className={`flex items-center gap-1 font-bold transition-colors cursor-pointer px-2 py-0.5 rounded-lg ${
                currentView === 'club'
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'text-amber-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>מועדון סבן VIP</span>
            </button>

            <button
              onClick={() => onChangeView('counter')}
              className={`hidden sm:flex items-center gap-1 font-bold transition-colors cursor-pointer px-2 py-0.5 rounded-lg ${
                currentView === 'counter'
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
              title="כניסת צוות ומנהלי עבודה לדלפק סבן CRM (דרוש קוד PIN)"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>דלפק CRM</span>
            </button>

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => onChangeView('catalog')}
            className="cursor-pointer transition-transform hover:scale-102 shrink-0"
          >
            <SabanLogo size="md" />
          </div>

          {/* Desktop/Tablet Auto-Complete Search Bar */}
          {onSearchChange && (
            <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm xl:max-w-md mx-2">
              <HeaderSearchBar
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onSelectProduct={onSelectProduct}
                onChangeView={onChangeView}
                className="w-full"
              />
            </div>
          )}

          {/* View Mode Tabs (Storefront / Branches / Account / Returns) */}
          <nav className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200 text-xs font-bold shrink-0">
            <button
              onClick={() => onChangeView('catalog')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                currentView === 'catalog'
                  ? 'bg-[#0F3E7A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              חנות וקטלוג
            </button>

            <button
              onClick={() => onChangeView('branches')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'branches'
                  ? 'bg-[#0F3E7A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              <span>סניפים ואודות</span>
            </button>

            <button
              onClick={() => onChangeView('account')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'account'
                  ? 'bg-[#0F3E7A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>אזור אישי וקבלנים</span>
            </button>

            <button
              onClick={() => onChangeView('returns')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'returns'
                  ? 'bg-[#0F3E7A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>החזרות</span>
            </button>

            <button
              onClick={() => onChangeView('club')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'club'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                  : 'text-amber-700 hover:text-amber-900 bg-amber-50/70 border border-amber-200/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>מועדון לקוחות</span>
            </button>
          </nav>

          {/* Right Header Actions: PWA Install + Mobile Search + Cart */}
          <div className="flex items-center gap-2 shrink-0">
            {/* PWA Install Button */}
            <PwaInstallButton variant="header" />

            {/* Mobile Search Button Toggle */}
            {onSearchChange && (
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="md:hidden w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
                aria-label="פתח חיפוש"
              >
                {isMobileSearchOpen ? (
                  <X className="w-4 h-4 text-slate-700" />
                ) : (
                  <Search className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}

            {/* Cart Drawer Trigger Button */}
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

        {/* Mobile Search Bar Expansion Row */}
        {onSearchChange && isMobileSearchOpen && (
          <div className="md:hidden pt-2.5 pb-1 animate-in fade-in slide-in-from-top-2 duration-150">
            <HeaderSearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              onSelectProduct={onSelectProduct}
              onChangeView={onChangeView}
              isMobileOpen={isMobileSearchOpen}
              onCloseMobile={() => setIsMobileSearchOpen(false)}
              className="w-full"
            />
          </div>
        )}

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-between border-t border-slate-100 pt-2 mt-2 text-xs font-bold overflow-x-auto gap-1.5 scrollbar-none">
          <button
            onClick={() => onChangeView('catalog')}
            className={`py-1.5 px-2.5 rounded-xl whitespace-nowrap transition-colors ${
              currentView === 'catalog' ? 'bg-[#0F3E7A] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            קטלוג
          </button>
          <button
            onClick={() => onChangeView('branches')}
            className={`py-1.5 px-2.5 rounded-xl whitespace-nowrap flex items-center gap-1 transition-colors ${
              currentView === 'branches' ? 'bg-[#0F3E7A] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3 h-3 text-amber-500" />
            <span>סניפים</span>
          </button>
          <button
            onClick={() => onChangeView('account')}
            className={`py-1.5 px-2.5 rounded-xl whitespace-nowrap flex items-center gap-1 transition-colors ${
              currentView === 'account' ? 'bg-[#0F3E7A] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-3 h-3 text-blue-500" />
            <span>אזור אישי</span>
          </button>
          <button
            onClick={() => onChangeView('returns')}
            className={`py-1.5 px-2.5 rounded-xl whitespace-nowrap flex items-center gap-1 transition-colors ${
              currentView === 'returns' ? 'bg-[#0F3E7A] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3 h-3 text-emerald-500" />
            <span>החזרות</span>
          </button>
        </div>
      </div>
    </header>
  );
};
