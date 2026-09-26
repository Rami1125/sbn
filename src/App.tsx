import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { SabanHeader } from './components/layout/SabanHeader';
import { ProductLandingPage } from './routes/store/product.$sku';
import { SabanStoreCartDrawer } from './components/store/SabanStoreCartDrawer';
import { MerchantFeedStudio } from './components/admin/MerchantFeedStudio';
import { ProductCatalog } from './components/store/ProductCatalog';
import { ReturnsPolicyPage } from './routes/store/ReturnsPolicyPage';
import { SabanLogo } from './components/layout/SabanLogo';
import { MapPin, Phone, Clock, FileSpreadsheet, ShieldCheck, RotateCcw } from 'lucide-react';
import { SABAN_BRANCHES } from './data/initialProducts';

export default function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'product' | 'feed-studio' | 'returns'>('catalog');
  const [currentSku, setCurrentSku] = useState<string>('10701');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Check URL on load and on popstate for path or query parameters (e.g. /product/10701, /store/10701, ?sku=10701, /returns)
  useEffect(() => {
    const parseCurrentLocation = () => {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const skuParam = params.get('sku');
      const viewParam = params.get('view');

      // Check returns page
      if (pathname === '/returns' || pathname.startsWith('/returns') || viewParam === 'returns') {
        setCurrentView('returns');
        return;
      }

      // Check path patterns like /product/10701 or /store/10701 or /store/product/10701
      const pathMatch = pathname.match(/\/(?:product|store)(?:\/product)?\/([a-zA-Z0-9_-]+)/);
      if (pathMatch && pathMatch[1]) {
        setCurrentSku(pathMatch[1]);
        setCurrentView('product');
        return;
      }

      if (skuParam) {
        setCurrentSku(skuParam);
        setCurrentView('product');
      } else if (viewParam === 'feed' || viewParam === 'admin' || pathname.startsWith('/admin') || pathname.startsWith('/feed')) {
        setCurrentView('feed-studio');
      } else {
        setCurrentView('catalog');
      }
    };

    parseCurrentLocation();
    window.addEventListener('popstate', parseCurrentLocation);
    return () => window.removeEventListener('popstate', parseCurrentLocation);
  }, []);

  // Update URL history state when selecting product or view
  const handleSelectProduct = (sku: string) => {
    setCurrentSku(sku);
    setCurrentView('product');
    const targetUrl = `/product/${sku}`;
    window.history.pushState({ sku }, '', targetUrl);
  };

  const handleChangeView = (view: 'catalog' | 'product' | 'feed-studio' | 'returns') => {
    setCurrentView(view);
    if (view === 'product') {
      window.history.pushState({ sku: currentSku }, '', `/product/${currentSku}`);
    } else if (view === 'feed-studio') {
      window.history.pushState({ view: 'admin' }, '', '/admin');
    } else if (view === 'returns') {
      window.history.pushState({ view: 'returns' }, '', '/returns');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  // Google tag (gtag.js) SPA dynamic page_view tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const pagePath =
        currentView === 'product'
          ? `/product/${currentSku}`
          : currentView === 'returns'
          ? '/returns'
          : currentView === 'feed-studio'
          ? '/admin'
          : '/';

      window.gtag('config', 'GT-NFR3NJHD', {
        page_path: pagePath,
        page_title: document.title,
      });
    }
  }, [currentView, currentSku]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-['Heebo','Assistant',sans-serif]">
        
        {/* Main Header */}
        <SabanHeader
          currentView={currentView}
          onChangeView={handleChangeView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dynamic View Route */}
        <main className="flex-1">
          {currentView === 'catalog' && (
            <ProductCatalog
              onSelectProduct={handleSelectProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {currentView === 'product' && (
            <ProductLandingPage
              sku={currentSku}
              onNavigateHome={() => handleChangeView('catalog')}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentView === 'feed-studio' && (
            <MerchantFeedStudio
              onViewProductLanding={handleSelectProduct}
            />
          )}

          {currentView === 'returns' && (
            <ReturnsPolicyPage
              onNavigateHome={() => handleChangeView('catalog')}
            />
          )}
        </main>

        {/* Global Cart Slide-Over Drawer */}
        <SabanStoreCartDrawer />

        {/* Corporate Footer */}
        <footer className="bg-[#0A2E5C] text-white border-t border-blue-950 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Brand & Identity */}
              <div className="space-y-4 md:col-span-1">
                <SabanLogo size="md" light />
                <p className="text-xs text-blue-200 leading-relaxed">
                  ח. סבן חומרי בניין (1994) בע״מ – מפיצים רשמיים של סיקה, טמבור, מלט נשר, מוצרי גבס ואיטום מתקדמים.
                </p>
                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Google Merchant Certified Store</span>
                </div>
              </div>

              {/* Branch 1 */}
              <div className="space-y-2.5 text-xs text-blue-100">
                <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>סניף החרש 10 הוד השרון</span>
                </div>
                <p>מחסן 4 - חומרי שלד, מלט, איטום צמנטי וגגות</p>
                <p className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>א׳-ה׳ 06:30-17:00 | ו׳ 06:30-13:00</span>
                </p>
                <p className="flex items-center gap-1.5 font-mono text-white">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <a href="tel:09-7602010" className="hover:underline font-bold">09-7602010</a>
                  <span className="text-slate-400">/ 03-9518888</span>
                </p>
              </div>

              {/* Branch 2 */}
              <div className="space-y-2.5 text-xs text-blue-100">
                <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>סניף התלמיד 6 הוד השרון</span>
                </div>
                <p>מחסן 1 - גבס, פרופילים, צבעי טמבור ופרזול</p>
                <p className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>א׳-ה׳ 07:00-17:00 | ו׳ 07:00-13:00</span>
                </p>
                <p className="flex items-center gap-1.5 font-mono text-white">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <a href="tel:09-7602010" className="hover:underline font-bold">09-7602010</a>
                  <span className="text-slate-400">/ 03-9518889</span>
                </p>
              </div>

              {/* GMC, Policy & Quick Links */}
              <div className="space-y-3 text-xs text-blue-200">
                <div className="font-extrabold text-sm text-white">שירות לקוחות ומדיניות</div>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleChangeView('returns')}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-bold text-amber-200"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>מדיניות החזרות וביטולים (14 יום)</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('catalog')}
                      className="hover:text-white transition-colors"
                    >
                      קטלוג מוצרים אונליין
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('product')}
                      className="hover:text-white transition-colors"
                    >
                      דפי מוצר מותאמי גוגל (Schema.org)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('feed-studio')}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                      <span>סטודיו ניהול Google Merchant Feed</span>
                    </button>
                  </li>
                </ul>
              </div>

            </div>

            {/* Copyright */}
            <div className="border-t border-blue-900/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300 gap-3">
              <div>
                © {new Date().getFullYear()} ח. סבן חומרי בניין (1994) בע״מ. כל הזכויות שמורות.
              </div>
              <div className="text-[11px] text-blue-300/80">
                סנכרון פיד ל-Google Sheets ID: 1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y
              </div>
            </div>
          </div>
        </footer>

      </div>
    </CartProvider>
  );
}
