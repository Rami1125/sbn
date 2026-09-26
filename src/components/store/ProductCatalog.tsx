import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ShoppingBag,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Package,
  Layers,
  MapPin,
  Tag,
  Star,
  ArrowRight,
  Filter
} from 'lucide-react';
import { GoogleMerchantProduct } from '../../types/product';
import { SABAN_BRANCHES } from '../../data/initialProducts';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { NoaAiConsultantModal } from './NoaAiConsultantModal';

interface ProductCatalogProps {
  onSelectProduct: (sku: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  searchQuery,
  setSearchQuery
}) => {
  const { addToCart } = useCart();
  const { products, syncStatus, lastSyncTime } = useProducts();
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [consultingProduct, setConsultingProduct] = useState<GoogleMerchantProduct | null>(null);

  // Filter products from live synced state
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
    const matchesCategory =
      selectedCategory === 'all' || p.google_product_category.includes(selectedCategory);

    return matchesSearch && matchesBrand && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-24 text-slate-800">
      
      {/* Hero Presentation Banner */}
      <div className="relative overflow-hidden bg-gradient-to-l from-[#0F3E7A] via-[#15529C] to-[#0A2E5C] text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-xl border border-blue-900/50 mt-4">
        {/* Subtle architectural concrete texture and grid overlay */}
        <div
          className="absolute inset-0 opacity-10 bg-repeat pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-right">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/30 text-amber-300 px-3 py-1 rounded-full text-xs font-black tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Saban Pro Storefront • Google Merchant Center 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              חומרי בניין, איטום וצבע <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-white">
                במחירי סיטונאי לאיסוף מהיר
              </span>
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              מלאי רשמי של סיקה, טמבור ומלט נשר במרכז הלוגיסטי סבן (החרש 10) ובסניף התלמיד 6.
              הזמינו אונליין, קבלו קוד איסוף ומשכו את ההזמנה מרציף האיסוף ללא המתנה בתור.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <div className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>מחירי מועדון קבלנים ישירים</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>תווי תקן רשמיים מכון התקנים</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span>2 סניפי ענק באזור התעשייה</span>
              </div>
            </div>
          </div>

          {/* Quick Pickup Feature Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center max-w-xs w-full shadow-2xl space-y-3">
            <div className="w-12 h-12 bg-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center mx-auto text-xl shadow-lg">
              SBN
            </div>
            <div className="text-xs uppercase tracking-wider text-amber-300 font-extrabold">
              רציף איסוף מהיר לקבלנים
            </div>
            <div className="text-sm font-bold text-white">
              הזמן עכשיו • אסוף תוך 60 דקות ברציף מס׳ 3
            </div>
            <div className="text-[11px] text-blue-200">
              כולל תיאום מלגזה והעמסה ישירה לרכב המסחרי
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Categories Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          
          {/* Brand filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              מותג:
            </span>
            {['all', 'Sika', 'טמבור', 'נשר'].map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedBrand === brand
                    ? 'bg-[#0F3E7A] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {brand === 'all' ? 'כל המותגים' : brand}
              </button>
            ))}
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 ml-1">קטגוריה:</span>
            {[
              { id: 'all', label: 'הכל' },
              { id: 'Adhesives', label: 'איטום ודבקים' },
              { id: 'Roofing', label: 'ציפויי גגות' },
              { id: 'Cement', label: 'צמנט ומלט' },
              { id: 'Painting', label: 'צבעי פנים' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {filteredProducts.length} מוצרים מוצגים
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const numPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
            const numSalePrice = product.sale_price
              ? parseFloat(product.sale_price.replace(/[^\d.]/g, ''))
              : undefined;
            const effectivePrice = numSalePrice || numPrice;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#0F3E7A]"
              >
                {/* Product Card Top / Image Area */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-slate-100/60 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  {/* Badges */}
                  <div className="absolute top-3.5 right-3.5 flex flex-col gap-1 items-end z-10">
                    <span className="bg-[#0F3E7A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      {product.brand}
                    </span>
                    {numSalePrice && (
                      <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                        מבצע
                      </span>
                    )}
                  </div>

                  <span className="absolute top-3.5 left-3.5 text-[11px] font-mono text-slate-400 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                    מק״ט {product.id}
                  </span>

                  {/* Main Product Image */}
                  <img
                    src={product.image_link}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Rating & Stock branch */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                      </div>

                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        זמין בסניף {product.store_code === 'SABAN_HARASH' ? 'החרש 10' : 'התלמיד 6'}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      onClick={() => onSelectProduct(product.id)}
                      className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-[#0F3E7A] cursor-pointer transition-colors"
                      title={product.title}
                    >
                      {product.title}
                    </h2>

                    {/* Highlight snippet */}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.product_highlight || product.description}
                    </p>
                  </div>

                  {/* Packaging & Pricing */}
                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400">מחיר לצרכן/קבלן (כולל מע״מ):</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-[#0F3E7A]">
                            ₪{effectivePrice.toFixed(2)}
                          </span>
                          {numSalePrice && (
                            <span className="text-xs text-slate-400 line-through">
                              ₪{numPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-left text-xs font-mono text-slate-500">
                        {product.size}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {/* Noa AI Consultant button */}
                      <button
                        type="button"
                        onClick={() => setConsultingProduct(product)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>ייעוץ נועה AI</span>
                      </button>

                      {/* Quick Add To Cart */}
                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                        <span>הוסף לסל</span>
                      </button>
                    </div>

                    {/* View Full Landing Page with Schema */}
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product.id)}
                      className="w-full text-center text-xs text-slate-600 hover:text-[#0F3E7A] font-semibold py-1 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>צפה בדף מוצר מלא מותאם לגוגל (Schema.org)</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Noa AI Modal for catalog products */}
      {consultingProduct && (
        <NoaAiConsultantModal
          product={consultingProduct}
          isOpen={!!consultingProduct}
          onClose={() => setConsultingProduct(null)}
        />
      )}

      {/* Contractor Club Info Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-right">
            <span className="text-xs font-bold text-amber-400 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
              מועדון קבלנים ומשפצים
            </span>
            <h3 className="text-2xl font-black">
              מבצעים פרויקט בנייה, איטום או גמר?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              קבלנים רשומים נהנים מהנחה של עד 12% במעמד האיסוף, קו אשראי נוח, תעודות משלוח ישירות ל-WhatsApp ועדיפות בהעמסה במחסן 4 (החרש 10).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:03-9518888"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-black text-xs shadow-lg transition-all"
            >
              הצטרף למועדון סבן PRO
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
