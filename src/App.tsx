import React, { useState, useEffect } from 'react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { SabanHeader } from './components/layout/SabanHeader';
import { ProductLandingPage } from './routes/store/product.$sku';
import { SabanStoreCartDrawer } from './components/store/SabanStoreCartDrawer';
import { MerchantFeedStudio } from './components/admin/MerchantFeedStudio';
import { ProductCatalog } from './components/store/ProductCatalog';
import { ReturnsPolicyPage } from './routes/store/ReturnsPolicyPage';
import { CustomerPortalPage } from './routes/store/CustomerPortalPage';
import { AboutBranchesPage } from './routes/store/AboutBranchesPage';
import { OrderTrackingView } from './routes/store/OrderTrackingView';
import { BranchCounterCrm } from './routes/counter.$branchId';
import { SabanClubLandingPage } from './routes/store/SabanClubLandingPage';
import { BusinessCustomerRegistrationPage } from './routes/store/BusinessCustomerRegistrationPage';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { PwaInstallBanner } from './components/common/PwaInstallBanner';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { SabanLogo } from './components/layout/SabanLogo';
import { MapPin, Phone, Clock, FileSpreadsheet, ShieldCheck, RotateCcw, User, Building2, Truck, Award, CreditCard } from 'lucide-react';
import { SABAN_BRANCHES } from './data/initialProducts';
import { initOneSignal } from './lib/oneSignal';

export default function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'product' | 'feed-studio' | 'returns' | 'branches' | 'account' | 'track' | 'counter' | 'club' | 'business'>('catalog');
  const [currentSku, setCurrentSku] = useState<string>('10701');
  const [currentOrderId, setCurrentOrderId] = useState<string>('SAB-889413');
  const [currentCounterBranch, setCurrentCounterBranch] = useState<'harash' | 'talmid'>('harash');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initialize OneSignal Push on startup
  useEffect(() => {
    initOneSignal();
  }, []);

  // Check URL on load and on popstate for path or query parameters (e.g. /product/10701, /store/10701, ?sku=10701, /returns, /branches, /account, /track, /counter/harash)
  useEffect(() => {
    const parseCurrentLocation = () => {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const skuParam = params.get('sku');
      const viewParam = params.get('view');
      const orderIdParam = params.get('orderId');
      const branchParam = params.get('branch');

      // Check counter CRM page /counter or /counter/:branchId
      const counterMatch = pathname.match(/^\/counter(?:\/([a-zA-Z0-9_-]+))?/);
      if (counterMatch || viewParam === 'counter') {
        const branchFromUrl = counterMatch?.[1] || branchParam || 'harash';
        const validBranch = branchFromUrl === 'talmid' ? 'talmid' : 'harash';
        setCurrentCounterBranch(validBranch);
        setCurrentView('counter');
        return;
      }

      // Check track page /track or /track/:orderId
      const trackMatch = pathname.match(/^\/track(?:\/([a-zA-Z0-9_-]+))?/);
      if (trackMatch || viewParam === 'track') {
        const extractedId = trackMatch?.[1] || orderIdParam || 'SAB-889413';
        setCurrentOrderId(extractedId);
        setCurrentView('track');
        return;
      }

      // Check returns page
      if (pathname === '/returns' || pathname.startsWith('/returns') || viewParam === 'returns') {
        setCurrentView('returns');
        return;
      }

      // Check branches page
      if (pathname === '/branches' || pathname.startsWith('/branches') || viewParam === 'branches') {
        setCurrentView('branches');
        return;
      }

      // Check account / portal page
      if (pathname === '/account' || pathname === '/portal' || pathname.startsWith('/account') || viewParam === 'account') {
        setCurrentView('account');
        return;
      }

      // Check customer club landing page
      if (pathname === '/club' || pathname === '/vip' || pathname === '/join' || pathname.startsWith('/club') || viewParam === 'club' || viewParam === 'vip') {
        setCurrentView('club');
        return;
      }

      // Check business customer registration (Comax)
      if (pathname === '/business' || pathname === '/comax' || pathname.startsWith('/business') || viewParam === 'business' || viewParam === 'comax') {
        setCurrentView('business');
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

  const handleNavigateTrack = (orderId: string) => {
    setCurrentOrderId(orderId);
    setCurrentView('track');
    window.history.pushState({ view: 'track', orderId }, '', `/track/${orderId}`);
  };

  const handleChangeView = (view: 'catalog' | 'product' | 'feed-studio' | 'returns' | 'branches' | 'account' | 'track' | 'counter' | 'club' | 'business') => {
    setCurrentView(view);
    if (view === 'product') {
      window.history.pushState({ sku: currentSku }, '', `/product/${currentSku}`);
    } else if (view === 'feed-studio') {
      window.history.pushState({ view: 'admin' }, '', '/admin');
    } else if (view === 'returns') {
      window.history.pushState({ view: 'returns' }, '', '/returns');
    } else if (view === 'branches') {
      window.history.pushState({ view: 'branches' }, '', '/branches');
    } else if (view === 'account') {
      window.history.pushState({ view: 'account' }, '', '/account');
    } else if (view === 'track') {
      window.history.pushState({ view: 'track', orderId: currentOrderId }, '', `/track/${currentOrderId}`);
    } else if (view === 'counter') {
      window.history.pushState({ view: 'counter', branch: currentCounterBranch }, '', `/counter/${currentCounterBranch}`);
    } else if (view === 'club') {
      window.history.pushState({ view: 'club' }, '', '/club');
    } else if (view === 'business') {
      window.history.pushState({ view: 'business' }, '', '/business');
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
          : currentView === 'branches'
          ? '/branches'
          : currentView === 'account'
          ? '/account'
          : currentView === 'track'
          ? `/track/${currentOrderId}`
          : currentView === 'counter'
          ? `/counter/${currentCounterBranch}`
          : currentView === 'club'
          ? '/club'
          : currentView === 'feed-studio'
          ? '/admin'
          : '/';

      window.gtag('config', 'GT-NFR3NJHD', {
        page_path: pagePath,
        page_title: document.title,
      });
    }
  }, [currentView, currentSku, currentOrderId, currentCounterBranch]);

  return (
    <ProductProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-['Heebo','Assistant',sans-serif]">
        
        {/* PWA Mobile Install Banner */}
        <PwaInstallBanner />

        {/* Main Header */}
        <SabanHeader
          currentView={currentView}
          onChangeView={handleChangeView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectProduct={handleSelectProduct}
        />

        {/* Dynamic View Route */}
        <main className="flex-1">
          {currentView === 'catalog' && (
            <ProductCatalog
              onSelectProduct={handleSelectProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onNavigateClub={() => handleChangeView('club')}
            />
          )}

          {currentView === 'club' && (
            <SabanClubLandingPage
              onNavigateHome={() => handleChangeView('catalog')}
              onNavigateCatalog={() => handleChangeView('catalog')}
            />
          )}

          {currentView === 'product' && (
            <ProductLandingPage
              sku={currentSku}
              onNavigateHome={() => handleChangeView('catalog')}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentView === 'branches' && (
            <AboutBranchesPage
              onNavigateHome={() => handleChangeView('catalog')}
            />
          )}

          {currentView === 'account' && (
            <CustomerPortalPage
              onNavigateHome={() => handleChangeView('catalog')}
              onNavigateTrack={handleNavigateTrack}
            />
          )}

          {currentView === 'track' && (
            <OrderTrackingView
              orderId={currentOrderId}
              onNavigateHome={() => handleChangeView('catalog')}
            />
          )}

          {currentView === 'counter' && (
            <BranchCounterCrm
              initialBranchId={currentCounterBranch}
              onNavigateHome={() => handleChangeView('catalog')}
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

          {currentView === 'business' && (
            <BusinessCustomerRegistrationPage
              onNavigateHome={() => handleChangeView('catalog')}
            />
          )}
        </main>

        {/* Global Cart Slide-Over Drawer */}
        <SabanStoreCartDrawer />

        {/* Offline Connectivity Notification Banner */}
        <OfflineIndicator />

        {/* WhatsApp Direct Branch Chat Floating Action Button */}
        <WhatsAppFloatingButton
          phoneNumber="972508860896"
          defaultMessage="שלום לח. סבן חומרי בניין (סניף הוד השרון), ברצוני לברר לגבי מוצרים / הזמנה לאיסוף מהסניף."
          branchName="דלפק הוד השרון (050-8860896)"
        />

        {/* Corporate Footer */}
        <footer className="bg-[#0A2E5C] text-white border-t border-blue-950 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Brand & Identity */}
              <div className="space-y-4 md:col-span-1">
                <SabanLogo size="md" light />
                <p className="text-xs text-blue-200 leading-relaxed">
                  ח. סבן חומרי בניין (1994) בע״מ – מפיצים רשמיים של סיקה, טמבור, מלט נשר, מוצרי גבס ואיטום מתקדמים. אספקה מהירה ברציפי איסוף (BOPIS) וצי משאיות מנוף.
                </p>
                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Google Merchant & PWA Verified Store</span>
                </div>
              </div>

              {/* Branch 1 */}
              <div className="space-y-2.5 text-xs text-blue-100">
                <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>סניף החרש 10 הוד השרון</span>
                </div>
                <p>מחסן 4 - חצר בלות, מלט, איטום, ברזל שלד</p>
                <p className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>א׳-ה׳ 06:30-16:30 | ו׳ 06:30-12:30</span>
                </p>
                <p className="flex items-center gap-1.5 font-mono text-white">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <a href="tel:09-740575" className="hover:underline font-bold">09-740575</a>
                </p>
              </div>

              {/* Branch 2 */}
              <div className="space-y-2.5 text-xs text-blue-100">
                <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>סניף התלמיד 6 הוד השרון</span>
                </div>
                <p>מחסן 1 - אולם תצוגה, מרכז גבס, צבע ופרזול</p>
                <p className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>א׳-ה׳ 06:00-18:00 | ו׳ 06:00-14:00</span>
                </p>
                <p className="flex items-center gap-1.5 font-mono text-white">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <a href="tel:09-7602010" className="hover:underline font-bold">09-7602010</a>
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-3 text-xs text-blue-200">
                <div className="font-extrabold text-sm text-white">ניווט מהיר ושירות</div>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleChangeView('catalog')}
                      className="hover:text-white transition-colors"
                    >
                      קטלוג מוצרים והזמנה
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('club')}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-300 font-bold"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>הצטרפות למועדון סבן.ח </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('business')}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-300 font-bold"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                      <span>פתיחת כרטיס לקוח עסקי (Comax)</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('branches')}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1"
                    >
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>סניפי הוד השרון וניווט Waze</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('account')}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1"
                    >
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>פורטל לקוחות וקבלנים</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('track')}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-200 font-bold"
                    >
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      <span>מעקב הזמנות חי (Live Tracking)</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('counter')}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1 text-slate-300 text-[11px]"
                    >
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>מערכת דלפק סבן CRM (מורשי סניף)</span>
                    </button>
                  </li>
                  <li>
                    <a
                      href="/returns"
                      className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-bold text-amber-200"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>מדיניות החזרות וביטולים</span>
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => handleChangeView('feed-studio')}
                      className="text-slate-400 hover:text-slate-300 transition-colors text-[11px]"
                    >
                      ניהול פיד Google Merchant (אדמין)
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
                אפליקציית PWA מותאמת מובייל • איסוף מהיר מהסניפים (BOPIS)
              </div>
            </div>
          </div>
        </footer>

      </div>
    </CartProvider>
  </ProductProvider>
  );
}
