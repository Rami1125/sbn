import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Check,
  ShieldCheck,
  Clock,
  Layers,
  ArrowRight,
  Share2,
  Package,
  MapPin,
  CheckCircle2,
  Tag,
  FileText,
  Star,
  ChevronLeft,
  Building2,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import { GoogleMerchantProduct } from '../../types/product';
import { SABAN_BRANCHES } from '../../data/initialProducts';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { NoaAiConsultantModal } from '../../components/store/NoaAiConsultantModal';
import { QuickPickupModal } from '../../components/store/QuickPickupModal';
import { WhatsAppOrderButton } from '../../components/common/WhatsAppOrderButton';
import { WhatsAppOrderParams } from '../../lib/whatsappDeepLink';
import { ProductPriceTrendChart } from '../../components/store/ProductPriceTrendChart';

interface ProductLandingPageProps {
  sku?: string;
  onNavigateHome?: () => void;
  onSelectProduct?: (sku: string) => void;
}

export const ProductLandingPage: React.FC<ProductLandingPageProps> = ({
  sku = '10701',
  onNavigateHome,
  onSelectProduct
}) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { products } = useProducts();

  // Find product from live synced state or default to first
  const product: GoogleMerchantProduct =
    products.find((p) => p.id === sku) || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image_link);
  const [selectedPackagingId, setSelectedPackagingId] = useState<string>(
    product.packagingOptions?.[0]?.id || ''
  );
  const [selectedShade, setSelectedShade] = useState<{
    name: string;
    code: string;
    hex: string;
  } | undefined>(product.availableShades?.[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isNoaModalOpen, setIsNoaModalOpen] = useState<boolean>(false);
  const [isQuickPickupOpen, setIsQuickPickupOpen] = useState<boolean>(false);
  const [showFloatingBar, setShowFloatingBar] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'specs' | 'stock' | 'trend'>('instructions');

  // Update image and options when SKU changes
  useEffect(() => {
    setActiveImage(product.image_link);
    setSelectedPackagingId(product.packagingOptions?.[0]?.id || '');
    setSelectedShade(product.availableShades?.[0]);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id, product.image_link]);

  // Track scroll for floating bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Selected packaging details
  const selectedPackage = product.packagingOptions?.find((p) => p.id === selectedPackagingId);
  const currentPrice = selectedPackage
    ? selectedPackage.salePrice || selectedPackage.price
    : parseFloat((product.sale_price || product.price).replace(/[^\d.]/g, ''));
  const originalPrice = selectedPackage
    ? selectedPackage.salePrice
      ? selectedPackage.price
      : undefined
    : product.sale_price
    ? parseFloat(product.price.replace(/[^\d.]/g, ''))
    : undefined;

  // Canonical base URL for production on Vercel
  const canonicalUrl = `https://sbn-xi.vercel.app/product/${product.id}`;

  // WhatsApp Deep Link Order Parameters
  const whatsAppOrderParams: WhatsAppOrderParams = {
    sku: product.id,
    productName: product.title,
    quantity,
    unitLabel: selectedPackage ? selectedPackage.label : (product.size || 'יח׳'),
    colorDetails: selectedShade ? {
      code: selectedShade.code,
      name: selectedShade.name,
      hex: selectedShade.hex
    } : undefined,
    branch: 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)',
    isContractor: true,
  };

  // Schema.org Structured Data Generation (Product JSON-LD compliant with Google Shopping)
  const schemaProductJson = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: [product.image_link, ...(product.additionalImages || [])],
    description: product.description,
    sku: product.id,
    mpn: product.mpn,
    category: product.google_product_category,
    color: product.color,
    material: product.material,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    offers: {
      '@type': 'Offer',
      url: typeof window !== 'undefined' && window.location.origin.includes('sbn-xi.vercel.app') 
        ? canonicalUrl 
        : typeof window !== 'undefined' ? window.location.href : canonicalUrl,
      priceCurrency: 'ILS',
      price: currentPrice.toFixed(2),
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability:
        product.availability === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'ח. סבן חומרי בניין (1994) בע״מ'
      },
      availableAtOrFrom: [
        {
          '@type': 'Place',
          name: 'סבן מרכז לוגיסטי - סניף החרש 10',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'החרש 10',
            addressLocality: 'אזור התעשייה',
            addressCountry: 'IL'
          }
        },
        {
          '@type': 'Place',
          name: 'סבן סניף התלמיד 6 - גבס וצבע',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'התלמיד 6',
            addressLocality: 'אזור התעשייה',
            addressCountry: 'IL'
          }
        }
      ],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IL',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnInStore',
        returnFees: 'https://schema.org/FreeReturn',
        merchantReturnLink: 'https://sbn-xi.vercel.app/returns',
        refundType: 'https://schema.org/FullRefund'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'ILS'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IL'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY'
          }
        }
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewsCount || 35
    }
  };

  // Inject or update Schema.org JSON-LD & meta tags in document head
  useEffect(() => {
    const existingScript = document.getElementById('saban-product-schema-ld');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(schemaProductJson);
    } else {
      const script = document.createElement('script');
      script.id = 'saban-product-schema-ld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaProductJson);
      document.head.appendChild(script);
    }

    // Dynamic document title for SEO
    const prevTitle = document.title;
    document.title = `${product.title} | מחיר סיטונאי סבן חומרי בניין (1994)`;

    // Update OpenGraph / meta description dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${product.title} - ${product.description.slice(0, 150)}... זמין לאיסוף מהיר בסניפי סבן.`);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [product, currentPrice]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedPackagingId, selectedShade);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `בדוק את ${product.title} במחיר מיוחד בסבן חומרי בניין`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-28 pt-4">
      {/* Schema.org Structured Data in DOM for Googlebot / Merchant Center */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProductJson) }}
      />

      {/* Breadcrumb Navigation & SKU Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-slate-200/80 text-xs">
          <nav className="flex items-center gap-2 text-slate-500">
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="hover:text-[#0F3E7A] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>דף הבית וקטלוג</span>
              </button>
            )}
            <span>/</span>
            <span className="font-semibold text-slate-700">{product.brand}</span>
            <span>/</span>
            <span className="text-slate-400 font-mono">מק״ט {product.id}</span>
          </nav>

          {/* Quick SKU switcher for demonstration */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">מעבר מהיר לפריטי הפיד:</span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct && onSelectProduct(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    p.id === product.id
                      ? 'bg-[#0F3E7A] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {p.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column: Crisp Gallery & Google Merchant Badges (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group">
              {/* Google Verified Feed Badge */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 items-end">
                <span className="bg-[#0F3E7A] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Google Merchant Certified</span>
                </span>
                {originalPrice && (
                  <span className="bg-red-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                    מבצע קבלנים
                  </span>
                )}
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm transition-all"
                title="שתף דף מוצר"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Main Image */}
              <div className="w-full aspect-square rounded-2xl bg-[#F4F6F8] flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {[product.image_link, ...(product.additionalImages || [])]
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-slate-50 shrink-0 transition-all cursor-pointer ${
                        activeImage === img
                          ? 'border-[#0F3E7A] ring-2 ring-blue-100 shadow-sm'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="תמונה מוקטנת" className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
              </div>
            </div>

            {/* Branch Stock Realtime Availability Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0F3E7A]" />
                  זמינות מלאי עדכנית בסניפי סבן:
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  מעודכן בזמן אמת
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {product.inStockBranches?.map((branch) => (
                  <div
                    key={branch.branchCode}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <div>
                      <div className="font-extrabold text-slate-800">{branch.branchName}</div>
                      <div className="text-slate-500">{branch.warehouseLocation}</div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>זמין במלאי ({branch.stockQty} יח׳)</span>
                      </div>
                      <div className="text-[11px] text-slate-400">איסוף מיידי ברציף</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Left Column: Light Luxury Details, Specs & Buying Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title, Brand & Google Rating */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-50 text-[#0F3E7A] text-xs font-bold px-3 py-1 rounded-lg border border-blue-200">
                  מותג רשמי: {product.brand}
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  MPN / מק״ט: {product.mpn}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mr-auto">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewsCount} ביקורות קבלנים)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.title}
              </h1>

              <p className="text-slate-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box with Luxury Finish */}
            <div className="bg-gradient-to-r from-slate-900 via-[#0F3E7A] to-[#124b94] text-white rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs text-blue-200 font-medium">מחיר מחירון רשמי סבן (כולל מע״מ):</div>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    ₪{currentPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-black text-amber-300 font-mono tracking-wider">
                    ILS
                  </span>
                  {originalPrice && (
                    <span className="text-lg text-slate-300 line-through mr-1">
                      ₪{originalPrice.toFixed(2)} ILS
                    </span>
                  )}
                  <span className="text-xs text-amber-300 font-semibold bg-white/10 px-2 py-0.5 rounded">
                    הנחת סיטונאי בקופה
                  </span>
                </div>
                <div className="text-[11px] text-blue-200 mt-1 flex flex-wrap items-center gap-2">
                  <span>קוד סניף מוביל: <strong className="text-white">{product.store_code}</strong> | איסוף חינם</span>
                  <span className="text-emerald-300 font-bold">• מחיר תואם 100% לפיד Google Merchant</span>
                </div>

                {/* Best Buy Trend Anchor Button */}
                <div className="mt-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('price-trend-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-xs font-bold py-1 px-3 rounded-xl transition-all cursor-pointer group"
                  >
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>🔥 הזדמנות קנייה מעולה (Best Buy) - צפה בגרף מגמת מחירים ↓</span>
                  </button>
                </div>
              </div>

              {/* Noa AI CTA in Price Box */}
              <button
                type="button"
                onClick={() => setIsNoaModalOpen(true)}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-3 rounded-xl font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Sparkles className="w-4 h-4 text-[#0F3E7A]" />
                <span>התייעץ עם נועה AI לגבי גוון וכמויות</span>
              </button>
            </div>

            {/* Packaging Options Selector (פח 18 ליטר / גלון 5 ליטר / שק / תרמיל) */}
            {product.packagingOptions && product.packagingOptions.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#0F3E7A]" />
                    בחר מארז ואריזה:
                  </label>
                  <span className="text-xs text-slate-500">
                    מחיר מתעדכן אוטומטית לפי בחירה
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.packagingOptions.map((pack) => {
                    const isSelected = selectedPackagingId === pack.id;
                    const packPrice = pack.salePrice || pack.price;
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => setSelectedPackagingId(pack.id)}
                        className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#0F3E7A] bg-blue-50/70 ring-2 ring-[#0F3E7A]/20 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm text-slate-900">
                            {pack.label}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#0F3E7A]" />}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">
                            {pack.coverageM2 ? `כיסוי: ${pack.coverageM2}` : pack.size}
                          </span>
                          <span className="font-black text-slate-900 text-sm">
                            ₪{packPrice.toFixed(2)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Shade Selection (if available) */}
            {product.availableShades && product.availableShades.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-500" />
                    בחירת גוון ממניפת סבן / טמבור:
                  </label>
                  {selectedShade && (
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {selectedShade.code} - {selectedShade.name}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.availableShades.map((shade) => {
                    const isSelected = selectedShade?.code === shade.code;
                    return (
                      <button
                        key={shade.code}
                        type="button"
                        onClick={() => setSelectedShade(shade)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-right transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#0F3E7A] bg-blue-50/80 ring-2 ring-[#0F3E7A]/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-md border border-slate-300 shrink-0 shadow-inner"
                          style={{ backgroundColor: shade.hex }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-800 truncate">
                            {shade.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {shade.code}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-slate-700 font-bold hover:bg-slate-200 transition-colors cursor-pointer text-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center font-black text-slate-900 bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-slate-700 font-bold hover:bg-slate-200 transition-colors cursor-pointer text-lg"
                >
                  +
                </button>
              </div>

              {/* Primary Explicit BOPIS Action Button */}
              <button
                type="button"
                onClick={() => setIsQuickPickupOpen(true)}
                className="flex-1 w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-4 px-6 rounded-2xl font-black text-base shadow-xl shadow-blue-950/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Building2 className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>הזמנה לאיסוף עצמי מהסניף • ₪{(currentPrice * quantity).toFixed(2)} ILS</span>
              </button>

              {/* Add to Cart secondary button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-white hover:bg-slate-50 text-[#0F3E7A] border-2 border-[#0F3E7A]/20 hover:border-[#0F3E7A] py-3.5 px-5 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                title="הוסף לסל להזמנה מרוכזת"
              >
                <ShoppingBag className="w-4 h-4 text-[#0F3E7A]" />
                <span>הוסף לסל</span>
              </button>
            </div>

            {/* Smart WhatsApp Deep-Link BOPIS Direct Option */}
            <div className="pt-1">
              <WhatsAppOrderButton
                params={whatsAppOrderParams}
                variant="full"
                showPhoneBadge={true}
              />
            </div>

            {/* Engineering Specs & Standards Highlights Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`flex-1 py-3 px-4 text-center transition-colors cursor-pointer ${
                    activeTab === 'instructions'
                      ? 'text-[#0F3E7A] border-b-2 border-[#0F3E7A] bg-blue-50/50'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  הוראות יישום מפורטות
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-3 px-4 text-center transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'text-[#0F3E7A] border-b-2 border-[#0F3E7A] bg-blue-50/50'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  תווי תקן וזמני ייבוש
                </button>
                <button
                  onClick={() => setActiveTab('stock')}
                  className={`flex-1 py-3 px-4 text-center transition-colors cursor-pointer ${
                    activeTab === 'stock'
                      ? 'text-[#0F3E7A] border-b-2 border-[#0F3E7A] bg-blue-50/50'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  פרטי מוצר לגוגל (GMC)
                </button>
                <button
                  onClick={() => setActiveTab('trend')}
                  className={`flex-1 py-3 px-4 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'trend'
                      ? 'text-[#0F3E7A] border-b-2 border-[#0F3E7A] bg-blue-50/50'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>מגמת מחירים (Best Buy)</span>
                </button>
              </div>

              <div className="p-5 text-sm">
                {activeTab === 'instructions' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Layers className="w-4 h-4 text-[#0F3E7A]" />
                      שלבי יישום לפי מפרט היצרן:
                    </div>
                    <ol className="space-y-3 pr-2">
                      {product.applicationInstructions?.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-700">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0F3E7A] font-extrabold flex items-center justify-center shrink-0 text-xs">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-4">
                    {/* Drying Times */}
                    {product.dryingTime && (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                          <Clock className="w-4 h-4 text-amber-600" />
                          זמני ייבוש רשמיים (ב-20°C):
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-500 block">ייבוש למגע:</span>
                            <span className="font-bold text-slate-800">{product.dryingTime.touch}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-500 block">בין שכבות:</span>
                            <span className="font-bold text-slate-800">{product.dryingTime.recoat}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                            <span className="text-slate-500 block">ייבוש סופי מלא:</span>
                            <span className="font-bold text-slate-800">{product.dryingTime.fullCure}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Standards */}
                    {product.standards && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          עמידה בתווי תקן ובקרת איכות:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {product.standards.map((st, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'stock' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-slate-700">
                        <div>
                          <span className="text-slate-400 block font-sans">Google Product Category:</span>
                          <span className="font-bold">{product.google_product_category}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans">Identifier Exists:</span>
                          <span className="font-bold">{product.identifier_exists}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans">חומר (Material):</span>
                          <span className="font-bold">{product.material}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-sans">הדגשת מוצר (Highlight):</span>
                          <span className="font-sans font-bold">{product.product_highlight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'trend' && (
                  <div className="space-y-4">
                    <ProductPriceTrendChart
                      product={product}
                      currentPrice={currentPrice}
                      originalPrice={originalPrice}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Dedicated Price Trend & Best Buy Analyzer Section */}
        <div id="price-trend-section" className="mt-12 pt-8 border-t border-slate-200/80">
          <ProductPriceTrendChart
            product={product}
            currentPrice={currentPrice}
            originalPrice={originalPrice}
          />
        </div>

      </div>

      {/* Floating Quick Add to Cart Bar on Scroll */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl transition-transform duration-300 py-3.5 px-4 ${
          showFloatingBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={product.image_link}
              alt={product.title}
              className="w-12 h-12 rounded-xl object-contain bg-slate-50 border border-slate-200 p-1"
            />
            <div>
              <div className="text-xs font-bold text-slate-900 line-clamp-1 max-w-sm sm:max-w-md">
                {product.title}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-black text-[#0F3E7A]">₪{currentPrice.toFixed(2)}</span>
                {selectedPackage && (
                  <span className="text-slate-500">({selectedPackage.label})</span>
                )}
                {selectedShade && (
                  <span className="flex items-center gap-1 text-slate-600">
                    <span
                      className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                      style={{ backgroundColor: selectedShade.hex }}
                    />
                    <span>{selectedShade.name}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 mr-auto">
            <button
              type="button"
              onClick={() => setIsQuickPickupOpen(true)}
              className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-4 py-2.5 rounded-xl font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>הזמנה לאיסוף עצמי</span>
            </button>

            <WhatsAppOrderButton
              params={whatsAppOrderParams}
              variant="compact"
              label="הזמן ב-WhatsApp"
              showCopyButton={false}
            />

            <button
              type="button"
              onClick={() => setIsNoaModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3.5 py-2.5 rounded-xl cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>ייעוץ נועה AI</span>
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer border border-slate-200"
            >
              <ShoppingBag className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">הוסף לסל</span>
            </button>
          </div>
        </div>
      </div>

      {/* Noa AI Consultation Modal */}
      <NoaAiConsultantModal
        product={product}
        isOpen={isNoaModalOpen}
        onClose={() => setIsNoaModalOpen(false)}
        onSelectShade={(s) => setSelectedShade(s)}
        onSelectPackaging={(pkgId) => setSelectedPackagingId(pkgId)}
      />

      {/* Quick Pickup BOPIS Modal */}
      <QuickPickupModal
        isOpen={isQuickPickupOpen}
        onClose={() => setIsQuickPickupOpen(false)}
        product={product}
        currentPrice={currentPrice}
        quantity={quantity}
        selectedPackagingLabel={selectedPackage?.label}
        selectedShade={selectedShade ? {
          code: selectedShade.code,
          name: selectedShade.name,
          hex: selectedShade.hex
        } : undefined}
      />
    </div>
  );
};
