import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  X,
  Layers,
  Tag,
  Package,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  Building2,
  CheckCircle2,
  CornerDownLeft,
  Paintbrush,
  Shield,
  Hammer
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { GoogleMerchantProduct } from '../../types/product';

export interface HeaderSearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectProduct?: (sku: string) => void;
  onChangeView: (view: 'catalog' | 'product' | 'feed-studio' | 'returns') => void;
  className?: string;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface CategorySuggestion {
  id: string;
  name: string;
  count: number;
  icon: 'adhesives' | 'roofing' | 'cement' | 'paint' | 'brand';
  categoryKey: string;
}

const PREDEFINED_CATEGORIES: { id: string; name: string; matchKey: string; icon: 'adhesives' | 'roofing' | 'cement' | 'paint' }[] = [
  { id: 'Adhesives', name: 'איטום ודבקים', matchKey: 'adhesives', icon: 'adhesives' },
  { id: 'Roofing', name: 'ציפויי גגות ואיטום אקרילי', matchKey: 'roofing', icon: 'roofing' },
  { id: 'Cement', name: 'צמנט, מלט וחומרי מליטה', matchKey: 'cement', icon: 'cement' },
  { id: 'Painting', name: 'צבעי פנים וקירות', matchKey: 'painting', icon: 'paint' }
];

const POPULAR_SEARCH_TERMS = [
  { term: 'סיקה 107', label: 'סיקה טופ 107' },
  { term: 'טמבור', label: 'צבעי טמבור' },
  { term: 'מלט נשר', label: 'מלט פורטלנד נשר' },
  { term: 'סיקפלקס', label: 'סיקפלקס 11FC' },
  { term: 'סופרפלקס', label: 'איטום גגות סופרפלקס' }
];

export const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onChangeView,
  className = '',
  isMobileOpen = false,
  onCloseMobile
}) => {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened in mobile mode
  useEffect(() => {
    if (isMobileOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileOpen]);

  // Handle clicking outside to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Filter matching products
  const matchingProducts = useMemo(() => {
    if (!normalizedQuery) {
      return products.slice(0, 4); // show featured 4 products when search query is empty
    }

    return products.filter((p) => {
      return (
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.id.toLowerCase().includes(normalizedQuery) ||
        p.brand.toLowerCase().includes(normalizedQuery) ||
        p.google_product_category.toLowerCase().includes(normalizedQuery) ||
        p.description.toLowerCase().includes(normalizedQuery) ||
        (p.mpn && p.mpn.toLowerCase().includes(normalizedQuery)) ||
        (p.material && p.material.toLowerCase().includes(normalizedQuery))
      );
    }).slice(0, 6);
  }, [products, normalizedQuery]);

  // Derive matching categories
  const matchingCategories = useMemo(() => {
    const list: CategorySuggestion[] = [];

    // Predefined categories matched against query or product count
    PREDEFINED_CATEGORIES.forEach((cat) => {
      const relatedProducts = products.filter((p) =>
        p.google_product_category.toLowerCase().includes(cat.matchKey) ||
        p.title.toLowerCase().includes(cat.name.split(' ')[0])
      );

      const matchesQuery =
        !normalizedQuery ||
        cat.name.toLowerCase().includes(normalizedQuery) ||
        cat.id.toLowerCase().includes(normalizedQuery) ||
        cat.matchKey.includes(normalizedQuery);

      if (matchesQuery && relatedProducts.length > 0) {
        list.push({
          id: cat.id,
          name: cat.name,
          count: relatedProducts.length,
          icon: cat.icon,
          categoryKey: cat.id
        });
      }
    });

    // Check matching distinct brands as categories if query matches brand
    const distinctBrands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
    distinctBrands.forEach((brand) => {
      if (
        normalizedQuery &&
        brand.toLowerCase().includes(normalizedQuery) &&
        !list.some((item) => item.name === brand)
      ) {
        const count = products.filter((p) => p.brand === brand).length;
        list.push({
          id: `brand-${brand}`,
          name: `מוצרי ${brand}`,
          count,
          icon: 'brand',
          categoryKey: brand
        });
      }
    });

    return list.slice(0, 3);
  }, [products, normalizedQuery]);

  // Combined selectable items list for keyboard navigation
  const selectableItems = useMemo(() => {
    const items: Array<
      | { type: 'category'; data: CategorySuggestion }
      | { type: 'product'; data: GoogleMerchantProduct }
    > = [];

    matchingCategories.forEach((cat) => items.push({ type: 'category', data: cat }));
    matchingProducts.forEach((prod) => items.push({ type: 'product', data: prod }));

    return items;
  }, [matchingCategories, matchingProducts]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < selectableItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : selectableItems.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && selectableItems[highlightedIndex]) {
        const selected = selectableItems[highlightedIndex];
        if (selected.type === 'category') {
          handleCategoryClick(selected.data);
        } else {
          handleProductClick(selected.data);
        }
      } else {
        // Execute general search in catalog
        handleSubmitSearch();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.blur();
      if (onCloseMobile) onCloseMobile();
    }
  };

  const handleProductClick = (product: GoogleMerchantProduct) => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onCloseMobile) onCloseMobile();

    if (onSelectProduct) {
      onSelectProduct(product.id);
    } else {
      onChangeView('product');
    }
  };

  const handleCategoryClick = (category: CategorySuggestion) => {
    onSearchChange(category.name.replace('מוצרי ', ''));
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onCloseMobile) onCloseMobile();
    onChangeView('catalog');
  };

  const handlePopularTermClick = (term: string) => {
    onSearchChange(term);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleSubmitSearch = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onCloseMobile) onCloseMobile();
    onChangeView('catalog');
  };

  const handleClear = () => {
    onSearchChange('');
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Helper to render category icon
  const renderCategoryIcon = (iconType: CategorySuggestion['icon']) => {
    switch (iconType) {
      case 'adhesives':
        return <Layers className="w-3.5 h-3.5 text-blue-600" />;
      case 'roofing':
        return <Shield className="w-3.5 h-3.5 text-amber-600" />;
      case 'cement':
        return <Hammer className="w-3.5 h-3.5 text-slate-700" />;
      case 'paint':
        return <Paintbrush className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Tag className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  // Helper to highlight matching text in search results
  const renderHighlightedText = (text: string, query: string) => {
    if (!query) return <span>{text}</span>;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={index}
              className="bg-amber-100 text-amber-900 font-extrabold px-0.5 rounded"
            >
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Bar Input Container */}
      <div className="relative flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="חיפוש מוצר, מק״ט, מותג או קטגוריה..."
          className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 placeholder-slate-400 text-xs py-2 pr-9 pl-8 rounded-xl border border-slate-200 focus:border-[#0F3E7A] focus:ring-2 focus:ring-[#0F3E7A]/20 transition-all outline-none font-medium shadow-inner"
          aria-label="חיפוש מוצרים בקטלוג סבן"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          role="combobox"
        />

        {/* Right Search Icon (RTL start) */}
        <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />

        {/* Left Action: Clear Button or Search Submission */}
        {searchQuery ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-2.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="נקה חיפוש"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-0.5 absolute left-2.5 text-[10px] text-slate-400 font-mono bg-slate-200/60 px-1.5 py-0.5 rounded border border-slate-300/60">
            ⌘K
          </div>
        )}
      </div>

      {/* Auto-Complete Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full mt-1.5 right-0 left-0 sm:left-auto sm:w-[420px] md:w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-right animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Header Summary / Live Query Context */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {normalizedQuery ? (
                  <>
                    תוצאות עבור <strong className="text-slate-900">"{searchQuery}"</strong>
                  </>
                ) : (
                  <span>מוצרים וקטגוריות מומלצות בסבן</span>
                )}
              </span>
            </div>

            <div className="text-[10px] text-slate-400">
              {matchingProducts.length} מוצרים זמינים
            </div>
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
            {/* Quick Popular Searches (when query is empty) */}
            {!normalizedQuery && (
              <div className="p-3 bg-white">
                <span className="text-[11px] font-bold text-slate-400 block mb-2">
                  חיפושים נפוצים לאיסוף מהיר:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCH_TERMS.map((item) => (
                    <button
                      key={item.term}
                      type="button"
                      onClick={() => handlePopularTermClick(item.term)}
                      className="text-xs bg-slate-100 hover:bg-[#0F3E7A] hover:text-white text-slate-700 px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Search className="w-3 h-3 text-slate-400" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Section */}
            {matchingCategories.length > 0 && (
              <div className="p-2 bg-slate-50/50">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 py-1 block">
                  קטגוריות מתאימות
                </span>
                <div className="space-y-0.5">
                  {matchingCategories.map((cat, catIdx) => {
                    const isSelected = highlightedIndex === catIdx;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryClick(cat)}
                        onMouseEnter={() => setHighlightedIndex(catIdx)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-right transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F3E7A] text-white'
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`p-1.5 rounded-lg ${
                              isSelected ? 'bg-white/20' : 'bg-white border border-slate-200 shadow-2xs'
                            }`}
                          >
                            {renderCategoryIcon(cat.icon)}
                          </span>
                          <span>{renderHighlightedText(cat.name, searchQuery)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-200/70 text-slate-600'
                            }`}
                          >
                            {cat.count} פריטים
                          </span>
                          <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Products Section */}
            {matchingProducts.length > 0 ? (
              <div className="p-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 py-1 block">
                  מוצרים מובילים לאיסוף עצמי
                </span>
                <div className="space-y-1">
                  {matchingProducts.map((product, prodIdx) => {
                    const overallIndex = matchingCategories.length + prodIdx;
                    const isSelected = highlightedIndex === overallIndex;

                    const priceNum = parseFloat(product.price.replace(/[^\d.]/g, '')) || 0;
                    const salePriceNum = product.sale_price
                      ? parseFloat(product.sale_price.replace(/[^\d.]/g, ''))
                      : null;

                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleProductClick(product)}
                        onMouseEnter={() => setHighlightedIndex(overallIndex)}
                        className={`w-full p-2.5 rounded-xl text-right transition-all flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/90 border border-blue-200 shadow-xs'
                            : 'hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        {/* Product Image Thumbnail */}
                        <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                          <img
                            src={product.image_link}
                            alt={product.title}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80';
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                              מק״ט: {product.id}
                            </span>
                            <span className="text-[10px] font-bold text-[#0F3E7A]">
                              {product.brand}
                            </span>
                            {product.availability === 'in_stock' && (
                              <span className="text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded flex items-center gap-0.5 mr-auto">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                במלאי
                              </span>
                            )}
                          </div>

                          <div className="font-bold text-xs text-slate-900 line-clamp-1">
                            {renderHighlightedText(product.title, searchQuery)}
                          </div>

                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xs font-black text-[#0F3E7A]">
                                ₪{(salePriceNum || priceNum).toFixed(2)}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">
                                ILS
                              </span>
                              {salePriceNum && (
                                <span className="text-[10px] text-slate-400 line-through">
                                  ₪{priceNum.toFixed(2)}
                                </span>
                              )}
                            </div>

                            <span className="text-[10px] text-slate-500">
                              {product.size || 'איסוף מיידי'}
                            </span>
                          </div>
                        </div>

                        <ChevronLeft
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? 'text-[#0F3E7A] -translate-x-0.5' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Empty State
              <div className="p-6 text-center space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    לא נמצאו פריטים עבור "{searchQuery}"
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    נסה לחפש לפי מותג (סיקה, טמבור, נשר), מק״ט, או סוג חומר (איטום, מלט, צבע).
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                  {POPULAR_SEARCH_TERMS.slice(0, 3).map((item) => (
                    <button
                      key={item.term}
                      type="button"
                      onClick={() => handlePopularTermClick(item.term)}
                      className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation Bar */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleSubmitSearch}
              className="text-[#0F3E7A] hover:text-[#0A2E5C] font-black flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <span>הצג את כל התוצאות בקטלוג</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>

            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400 font-medium">
              <span>↑↓ לניווט</span>
              <span>↵ לבחירה</span>
              <span>Esc לסגירה</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
