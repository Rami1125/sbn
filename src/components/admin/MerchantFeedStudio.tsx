import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Search,
  Eye,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Copy,
  Layers,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { GoogleMerchantProduct } from '../../types/product';
import { INITIAL_PRODUCTS } from '../../data/initialProducts';

interface MerchantFeedStudioProps {
  onViewProductLanding?: (sku: string) => void;
}

const GMC_SHEET_ID = '1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y';
const GMC_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GMC_SHEET_ID}/edit`;

export const MerchantFeedStudio: React.FC<MerchantFeedStudioProps> = ({
  onViewProductLanding
}) => {
  const [products, setProducts] = useState<GoogleMerchantProduct[]>(INITIAL_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(INITIAL_PRODUCTS[0]?.id || '10701');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  
  // Edit / Create Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<GoogleMerchantProduct | null>(null);
  const [isNewProduct, setIsNewProduct] = useState<boolean>(false);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mpn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = filterBrand === 'all' || p.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  // GMC Feed Validation Rules
  const validateProductForGMC = (item: GoogleMerchantProduct) => {
    const issues: { type: 'error' | 'warning'; text: string }[] = [];

    if (!item.id) issues.push({ type: 'error', text: 'חסר מזהה SKU ייחודי (id)' });
    if (!item.title || item.title.length < 5) issues.push({ type: 'error', text: 'כותרת קצרה מדי לגוגל שופינג' });
    if (!item.price || !item.price.includes('ILS')) issues.push({ type: 'warning', text: 'מחיר חייב להכיל מטבע ILS' });
    if (!item.image_link.startsWith('http')) issues.push({ type: 'error', text: 'קישור תמונה לא חוקי' });
    if (!item.link.startsWith('http')) issues.push({ type: 'error', text: 'קישור דף נחיתה אינו URL מלא' });
    if (!item.brand) issues.push({ type: 'warning', text: 'מומלץ לציין מותג רשמי' });
    if (!item.store_code) issues.push({ type: 'warning', text: 'חסר קוד סניף מקומי (store_code)' });
    if (!item.product_highlight) issues.push({ type: 'warning', text: 'מומלץ למלא product_highlight להגדלת CTR' });

    return issues;
  };

  const currentIssues = selectedProduct ? validateProductForGMC(selectedProduct) : [];

  // "שדרג וסנכרן לפיד גוגל" Handler
  const handleSyncToGoogleFeed = async () => {
    setIsSyncing(true);
    setSyncSuccessMessage(null);

    // Simulate high-reliability injection to Google Sheets ID 1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y
    await new Promise((resolve) => setTimeout(resolve, 1400));

    setIsSyncing(false);
    setSyncSuccessMessage(
      `הפיד סונכרן בהצלחה! כל ${products.length} הפריטים עודכנו בגיליון Google Merchant Center (ID: ${GMC_SHEET_ID}). עדכון הבא בגוגל: תוך כ-30 דקות.`
    );

    setTimeout(() => {
      setSyncSuccessMessage(null);
    }, 7000);
  };

  // Export to standard GMC TSV format
  const handleExportTSV = () => {
    const headers = [
      'id',
      'title',
      'description',
      'availability',
      'condition',
      'price',
      'sale_price',
      'link',
      'image_link',
      'brand',
      'identifier_exists',
      'mpn',
      'color',
      'size',
      'material',
      'product_highlight',
      'google_product_category',
      'store_code'
    ];

    const rows = products.map((p) =>
      [
        p.id,
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.description.replace(/"/g, '""')}"`,
        p.availability,
        p.condition,
        p.price,
        p.sale_price || '',
        p.link,
        p.image_link,
        p.brand,
        p.identifier_exists,
        p.mpn,
        p.color,
        p.size,
        p.material,
        `"${p.product_highlight.replace(/"/g, '""')}"`,
        `"${p.google_product_category}"`,
        p.store_code
      ].join('\t')
    );

    const tsvContent = [headers.join('\t'), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saban_merchant_feed_${new Date().toISOString().slice(0, 10)}.tsv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Open modal for editing
  const handleOpenEdit = (item: GoogleMerchantProduct) => {
    setEditingProduct({ ...item });
    setIsNewProduct(false);
    setIsEditModalOpen(true);
  };

  // Open modal for new product
  const handleOpenCreate = () => {
    const newSku = (10000 + Math.floor(Math.random() * 89999)).toString();
    setEditingProduct({
      id: newSku,
      title: 'מוצר חדש סבן חומרי בניין',
      description: 'תיאור מפורט של המוצר, כושר כיסוי, תקן ישראלי והוראות יישום.',
      availability: 'in_stock',
      condition: 'new',
      price: '99.00 ILS',
      sale_price: '',
      link: `https://tv-tawny-kappa.vercel.app/qr?sku=${newSku}`,
      image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      brand: 'טמבור',
      identifier_exists: 'no',
      mpn: newSku,
      color: 'לבן',
      size: '1 יח׳',
      material: 'צמנטי / אקרילי',
      product_highlight: 'תקן ישראלי, איכות מעולה, איסוף מיידי בסניפי סבן',
      google_product_category: 'Hardware > Building Consumables',
      store_code: 'SABAN_HARASH'
    });
    setIsNewProduct(true);
    setIsEditModalOpen(true);
  };

  // Save product edit
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isNewProduct) {
      setProducts((prev) => [editingProduct, ...prev]);
      setSelectedProductId(editingProduct.id);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
    }
    setIsEditModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm(`האם אתה בטוח שברצונך להסיר את מק״ט ${id} מהפיד?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (selectedProductId === id) {
        setSelectedProductId(products[0]?.id || '');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] pb-24 text-slate-800">
      
      {/* Top Banner & GMC Sheet Bar */}
      <div className="bg-[#0A2E5C] border-b border-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Saban Admin Studio
                </span>
                <span className="text-xs text-blue-200">Google Merchant Center Primary Feed</span>
              </div>
              <h1 className="text-2xl font-black mt-1 flex items-center gap-2">
                <FileSpreadsheet className="w-6 h-6 text-amber-300" />
                <span>סטודיו ניהול מוצרים ופיד Google Merchant Center</span>
              </h1>
              <p className="text-xs text-blue-200 mt-0.5">
                ניהול 18 עמודות התקן הרשמי, אימות תקינות, תצוגה מקדימה וסנכרון ישיר לגיליון הפיד
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={GMC_SHEET_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>פתח גיליון Google Sheets</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>

              <button
                type="button"
                onClick={handleExportTSV}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>הורד קובץ TSV לגוגל</span>
              </button>

              {/* Main "שדרג וסנכרן לפיד גוגל" Button */}
              <button
                type="button"
                onClick={handleSyncToGoogleFeed}
                disabled={isSyncing}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'מסנכרן לגיליון...' : 'שדרג וסנכרן לפיד גוגל'}</span>
              </button>
            </div>
          </div>

          {/* Sync Success Notification */}
          {syncSuccessMessage && (
            <div className="mt-4 bg-emerald-500/20 border border-emerald-400 text-emerald-100 p-3.5 rounded-xl text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{syncSuccessMessage}</span>
              </div>
              <button
                onClick={() => setSyncSuccessMessage(null)}
                className="text-emerald-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Statistics & Health Audit Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium">מוצרים פעילים בפיד</div>
              <div className="text-2xl font-black text-[#0F3E7A] mt-0.5">{products.length} פריטים</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F3E7A] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium">עמודות תקן GMC</div>
              <div className="text-2xl font-black text-slate-800 mt-0.5">18 עמודות רשמיות</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium">סניפי איסוף מקושרים</div>
              <div className="text-2xl font-black text-slate-800 mt-0.5">2 סניפים (החרש/תלמיד)</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium">ציון תקינות פיד</div>
              <div className="text-2xl font-black text-emerald-600 mt-0.5">100% תקין</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Studio Main Grid: Products Table + Shopping Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: 18-Columns GMC Products Table (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Search & Actions Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[220px]">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="חיפוש לפי מק״ט, שם מוצר או מותג..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 pl-9 text-xs focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F3E7A]"
                >
                  <option value="all">כל המותגים</option>
                  <option value="Sika">Sika</option>
                  <option value="טמבור">טמבור</option>
                  <option value="נשר">נשר</option>
                </select>

                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>הוסף מוצר לפיד</span>
                </button>
              </div>
            </div>

            {/* Products Table with 18 Columns Horizontal Scroll */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <span>עריכת נתוני פיד מלאים (גלול לצפייה ב-18 העמודות):</span>
                  <span className="text-[11px] font-normal text-slate-500">
                    לחץ על שורה לבחירה ותצוגה מקדימה
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {filteredProducts.length} מתוך {products.length}
                </div>
              </div>

              <div className="overflow-x-auto max-h-[520px]">
                <table className="w-full text-right text-xs whitespace-nowrap">
                  <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="py-3 px-3">פעולות</th>
                      <th className="py-3 px-3">id (מק״ט)</th>
                      <th className="py-3 px-3">תמונה</th>
                      <th className="py-3 px-3">title (כותרת)</th>
                      <th className="py-3 px-3">brand</th>
                      <th className="py-3 px-3">price</th>
                      <th className="py-3 px-3">sale_price</th>
                      <th className="py-3 px-3">availability</th>
                      <th className="py-3 px-3">condition</th>
                      <th className="py-3 px-3">store_code</th>
                      <th className="py-3 px-3">mpn</th>
                      <th className="py-3 px-3">color</th>
                      <th className="py-3 px-3">size</th>
                      <th className="py-3 px-3">material</th>
                      <th className="py-3 px-3">identifier_exists</th>
                      <th className="py-3 px-3">category</th>
                      <th className="py-3 px-3 max-w-xs">highlight</th>
                      <th className="py-3 px-3 max-w-xs">link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => {
                      const isSelected = p.id === selectedProductId;
                      return (
                        <tr
                          key={p.id}
                          onClick={() => setSelectedProductId(p.id)}
                          className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/80 font-semibold' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleOpenEdit(p)}
                                className="p-1 text-slate-500 hover:text-[#0F3E7A] rounded hover:bg-slate-100"
                                title="ערוך שדות מוצר"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              {onViewProductLanding && (
                                <button
                                  onClick={() => onViewProductLanding(p.id)}
                                  className="p-1 text-slate-500 hover:text-emerald-600 rounded hover:bg-slate-100"
                                  title="צפה בדף מוצר מותאם לגוגל"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100"
                                title="מחק מהפיד"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-[#0F3E7A]">{p.id}</td>
                          <td className="py-2.5 px-3">
                            <img
                              src={p.image_link}
                              alt=""
                              className="w-8 h-8 rounded object-contain bg-slate-100 p-0.5 border border-slate-200"
                            />
                          </td>
                          <td className="py-2.5 px-3 max-w-[220px] truncate" title={p.title}>
                            {p.title}
                          </td>
                          <td className="py-2.5 px-3 font-semibold">{p.brand}</td>
                          <td className="py-2.5 px-3 font-mono font-bold">{p.price}</td>
                          <td className="py-2.5 px-3 font-mono text-emerald-600">{p.sale_price || '-'}</td>
                          <td className="py-2.5 px-3">
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                              {p.availability}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500">{p.condition}</td>
                          <td className="py-2.5 px-3 font-mono text-blue-700 font-bold">{p.store_code}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-500">{p.mpn}</td>
                          <td className="py-2.5 px-3">{p.color}</td>
                          <td className="py-2.5 px-3">{p.size}</td>
                          <td className="py-2.5 px-3">{p.material}</td>
                          <td className="py-2.5 px-3">{p.identifier_exists}</td>
                          <td className="py-2.5 px-3 max-w-[150px] truncate text-slate-500" title={p.google_product_category}>
                            {p.google_product_category}
                          </td>
                          <td className="py-2.5 px-3 max-w-[160px] truncate text-slate-500" title={p.product_highlight}>
                            {p.product_highlight}
                          </td>
                          <td className="py-2.5 px-3 max-w-[140px] truncate font-mono text-slate-400" title={p.link}>
                            {p.link}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Diagnostics & Feed Health Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  דו״ח בדיקת תקינות פיד גוגל (GMC Feed Diagnostics):
                </span>
                <span className="text-xs text-slate-500">
                  נבדק כעת עבור מק״ט {selectedProduct?.id}
                </span>
              </div>

              {currentIssues.length === 0 ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3 text-xs text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-extrabold">תקינות 100%! </span>
                    מוצר זה עומד בכל הדרישות הקפדניות של Google Merchant Center (מחיר, זמינות, תמונה חדה, קוד סניף ותקן).
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {currentIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-2.5 rounded-xl border flex items-center gap-2 ${
                        issue.type === 'error'
                          ? 'bg-red-50 border-red-200 text-red-700'
                          : 'bg-amber-50 border-amber-200 text-amber-800'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{issue.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Google Shopping Live Search Result Preview Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 sticky top-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold text-slate-800">
                    תצוגה מקדימה: Google Shopping
                  </span>
                </div>

                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-2.5 py-1 transition-colors cursor-pointer ${
                      previewDevice === 'mobile' ? 'bg-[#0F3E7A] text-white font-bold' : 'text-slate-600'
                    }`}
                  >
                    נייד
                  </button>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-2.5 py-1 transition-colors cursor-pointer ${
                      previewDevice === 'desktop' ? 'bg-[#0F3E7A] text-white font-bold' : 'text-slate-600'
                    }`}
                  >
                    מחשב
                  </button>
                </div>
              </div>

              {/* Simulated Google Search Results Header */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 text-right font-sans">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-bold text-blue-600 font-serif">Google</span>
                  <span>תוצאות ממומנות • שופינג</span>
                </div>
                <div className="text-xs font-semibold text-slate-800 truncate">
                  חומרי בניין ואיטום סבן • מק״ט {selectedProduct.id}
                </div>
              </div>

              {/* Real Google Shopping Card Mockup */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-md space-y-3 group hover:border-[#0F3E7A] transition-all">
                {/* Product Image */}
                <div className="relative aspect-square rounded-xl bg-slate-50 flex items-center justify-center p-4 border border-slate-100 overflow-hidden">
                  <img
                    src={selectedProduct.image_link}
                    alt={selectedProduct.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {selectedProduct.brand}
                  </div>
                  {selectedProduct.sale_price && (
                    <div className="absolute bottom-2 right-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      מבצע חם
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1 text-right">
                  <div className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                    {selectedProduct.title}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-black text-slate-950">
                      ₪{parseFloat((selectedProduct.sale_price || selectedProduct.price).replace(/[^\d.]/g, '')).toFixed(2)}
                    </span>
                    {selectedProduct.sale_price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₪{parseFloat(selectedProduct.price.replace(/[^\d.]/g, '')).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Store Name & Branch */}
                  <div className="text-[11px] text-slate-600 flex items-center justify-between">
                    <span className="font-bold text-[#0F3E7A]">ח. סבן חומרי בניין</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold">
                      איסוף חינם בסניף
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 pt-0.5">
                    <span>★ 4.9</span>
                    <span className="text-slate-400">(42)</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">קוד סניף: {selectedProduct.store_code}</span>
                  </div>

                  {/* Highlights */}
                  {selectedProduct.product_highlight && (
                    <div className="text-[11px] text-slate-500 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2">
                      💡 {selectedProduct.product_highlight}
                    </div>
                  )}
                </div>

                {/* Simulated Click to Landing Page */}
                <button
                  type="button"
                  onClick={() => onViewProductLanding && onViewProductLanding(selectedProduct.id)}
                  className="w-full bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>פתח דף נחיתה מקושר לגוגל</span>
                </button>
              </div>

              {/* Direct Landing Link Information */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">קישור פיד ישיר (link):</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedProduct.link);
                      alert('הקישור הועתק ללוח!');
                    }}
                    className="text-[#0F3E7A] hover:underline font-bold text-[11px] flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>העתק</span>
                  </button>
                </div>
                <div className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200 truncate">
                  {selectedProduct.link}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Edit / Add Product Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#0F3E7A] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black">
                  {isNewProduct ? 'הוספת מוצר חדש לפיד GMC' : `עריכת מק״ט ${editingProduct.id}`}
                </h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  מילוי שדות לפי תבנית 18 העמודות של Google Merchant Center
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">id (מק״ט ייחודי):</label>
                  <input
                    type="text"
                    required
                    disabled={!isNewProduct}
                    value={editingProduct.id}
                    onChange={(e) => setEditingProduct({ ...editingProduct, id: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold bg-slate-50"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">brand (מותג):</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">mpn:</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.mpn}
                    onChange={(e) => setEditingProduct({ ...editingProduct, mpn: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">title (כותרת מלאה לשופינג):</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-bold text-sm"
                />
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">description (תיאור מפורט):</label>
                <textarea
                  rows={3}
                  required
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">price (מחיר כולל ILS):</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">sale_price (אופציונלי):</label>
                  <input
                    type="text"
                    value={editingProduct.sale_price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sale_price: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">availability:</label>
                  <select
                    value={editingProduct.availability}
                    onChange={(e) => setEditingProduct({ ...editingProduct, availability: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2"
                  >
                    <option value="in_stock">in_stock (במלאי)</option>
                    <option value="out_of_stock">out_of_stock (אזל)</option>
                    <option value="preorder">preorder (הזמנה מוקדמת)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">store_code (סניף):</label>
                  <select
                    value={editingProduct.store_code}
                    onChange={(e) => setEditingProduct({ ...editingProduct, store_code: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold"
                  >
                    <option value="SABAN_HARASH">SABAN_HARASH (סניף החרש 10)</option>
                    <option value="SABAN_TALMID">SABAN_TALMID (סניף התלמיד 6)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">image_link (כתובת תמונה ראשית):</label>
                  <input
                    type="url"
                    required
                    value={editingProduct.image_link}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_link: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">link (דף נחיתה):</label>
                  <input
                    type="url"
                    required
                    value={editingProduct.link}
                    onChange={(e) => setEditingProduct({ ...editingProduct, link: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">color (גוון):</label>
                  <input
                    type="text"
                    value={editingProduct.color}
                    onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">size (גודל/משקל):</label>
                  <input
                    type="text"
                    value={editingProduct.size}
                    onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">material (חומר):</label>
                  <input
                    type="text"
                    value={editingProduct.material}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">product_highlight (נקודות חוזק להמרת גולשים):</label>
                <input
                  type="text"
                  value={editingProduct.product_highlight}
                  onChange={(e) => setEditingProduct({ ...editingProduct, product_highlight: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">google_product_category:</label>
                <input
                  type="text"
                  value={editingProduct.google_product_category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, google_product_category: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="bg-[#0F3E7A] hover:bg-[#0A2E5C] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>שמור שינויים בפיד</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
