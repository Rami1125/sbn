import { GoogleMerchantProduct } from '../types/product';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

/**
 * Standard RFC-4180 CSV / TSV Parser
 * Correctly parses multi-line fields and double-quoted commas.
 */
export function parseCSV(text: string, delimiter: string = ','): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  // Auto-detect tab delimiter if TSV
  if (delimiter === ',' && text.includes('\t') && !text.includes(',')) {
    delimiter = '\t';
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // ignore carriage return
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        if (currentRow.some((f) => f.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  // Push last field & row if pending
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Maps CSV 2D array to GoogleMerchantProduct array
 */
export function mapCsvRowsToProducts(rows: string[][]): GoogleMerchantProduct[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().trim().replace(/['"]/g, ''));
  const headerIndexMap: { [key: string]: number } = {};

  headers.forEach((header, index) => {
    headerIndexMap[header] = index;
  });

  const getCol = (row: string[], colName: string): string => {
    const index = headerIndexMap[colName.toLowerCase()];
    if (index !== undefined && row[index] !== undefined) {
      return row[index];
    }
    return '';
  };

  const parsedProducts: GoogleMerchantProduct[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const id = getCol(row, 'id') || getCol(row, 'sku') || getCol(row, 'mpn');
    if (!id) continue;

    // Check if we have base rich UI data from initial products to preserve packaging/specs
    const existing = INITIAL_PRODUCTS.find((p) => p.id === id);

    const price = getCol(row, 'price');
    const formattedPrice = price ? (price.includes('ILS') ? price : `${price} ILS`) : (existing?.price || '0.00 ILS');
    const salePrice = getCol(row, 'sale_price');
    const formattedSalePrice = salePrice
      ? salePrice.includes('ILS')
        ? salePrice
        : `${salePrice} ILS`
      : undefined;

    const availability = (getCol(row, 'availability') || 'in_stock') as 'in_stock' | 'out_of_stock' | 'preorder';
    const condition = (getCol(row, 'condition') || 'new') as 'new' | 'refurbished' | 'used';
    const identifierExists = (getCol(row, 'identifier_exists') || 'no') as 'yes' | 'no';
    const storeCode = getCol(row, 'store_code') || existing?.store_code || 'SABAN_HARASH';

    // Ensure links point to valid product links if empty or old
    const link = getCol(row, 'link') || existing?.link || `https://sbn-xi.vercel.app/product/${id}`;
    const imageLink = getCol(row, 'image_link') || existing?.image_link || '';

    const videoLink = getCol(row, 'video_link') || existing?.video_link || '';

    const product: GoogleMerchantProduct = {
      id,
      title: getCol(row, 'title') || existing?.title || `מוצר ${id}`,
      description: getCol(row, 'description') || existing?.description || '',
      availability,
      condition,
      price: formattedPrice,
      sale_price: formattedSalePrice,
      link,
      image_link: imageLink,
      video_link: videoLink,
      brand: getCol(row, 'brand') || existing?.brand || 'סבן',
      identifier_exists: identifierExists,
      mpn: getCol(row, 'mpn') || id,
      color: getCol(row, 'color') || existing?.color || '',
      size: getCol(row, 'size') || existing?.size || '',
      material: getCol(row, 'material') || existing?.material || '',
      product_highlight: getCol(row, 'product_highlight') || existing?.product_highlight || '',
      google_product_category: getCol(row, 'google_product_category') || existing?.google_product_category || 'Hardware > Building Consumables',
      store_code: storeCode,

      // Preserve existing rich UI metadata if available
      packagingOptions: existing?.packagingOptions,
      additionalImages: existing?.additionalImages,
      dryingTime: existing?.dryingTime,
      standards: existing?.standards,
      applicationInstructions: existing?.applicationInstructions,
      coverageInfo: existing?.coverageInfo,
      availableShades: existing?.availableShades,
      rating: existing?.rating || 4.9,
      reviewsCount: existing?.reviewsCount || 42,
      inStockBranches: existing?.inStockBranches
    };

    parsedProducts.push(product);
  }

  return parsedProducts;
}

/**
 * Converts products back to standard Google Merchant Center CSV/TSV
 */
export function exportProductsToCSV(products: GoogleMerchantProduct[], delimiter: string = ','): string {
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
    'store_code',
    'video_link'
  ];

  const escapeField = (val: string | undefined): string => {
    if (!val) return '';
    if (val.includes(delimiter) || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const rows = [headers.join(delimiter)];

  for (const p of products) {
    const row = [
      escapeField(p.id),
      escapeField(p.title),
      escapeField(p.description),
      escapeField(p.availability),
      escapeField(p.condition),
      escapeField(p.price),
      escapeField(p.sale_price || ''),
      escapeField(p.link),
      escapeField(p.image_link),
      escapeField(p.brand),
      escapeField(p.identifier_exists),
      escapeField(p.mpn),
      escapeField(p.color),
      escapeField(p.size),
      escapeField(p.material),
      escapeField(p.product_highlight),
      escapeField(p.google_product_category),
      escapeField(p.store_code),
      escapeField(p.video_link || '')
    ];
    rows.push(row.join(delimiter));
  }

  return rows.join('\n');
}
