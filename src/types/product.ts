export interface GoogleMerchantProduct {
  id: string; // SKU
  title: string;
  description: string;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  condition: 'new' | 'refurbished' | 'used';
  price: string; // e.g. "155.00 ILS"
  sale_price?: string; // e.g. "129.00 ILS"
  link: string;
  image_link: string;
  brand: string;
  identifier_exists: 'yes' | 'no';
  mpn: string;
  color: string;
  size: string;
  material: string;
  product_highlight: string;
  google_product_category: string;
  store_code: 'SABAN_HARASH' | 'SABAN_TALMID' | string;
  video_link?: string;
  
  // Extended rich fields for Light Luxury UI & calculations
  packagingOptions?: {
    id: string;
    label: string;
    size: string;
    price: number;
    salePrice?: number;
    coverageM2?: string;
    isDefault?: boolean;
  }[];
  additionalImages?: string[];
  dryingTime?: {
    touch: string;
    recoat: string;
    fullCure: string;
  };
  standards?: string[];
  applicationInstructions?: string[];
  coverageInfo?: {
    ratePerM2: string;
    recommendedCoats: number;
    suitableSurfaces: string[];
    prepNotes: string;
  };
  availableShades?: {
    name: string;
    code: string;
    hex: string;
    popular?: boolean;
  }[];
  rating?: number;
  reviewsCount?: number;
  inStockBranches?: {
    branchCode: 'SABAN_HARASH' | 'SABAN_TALMID' | string;
    branchName: string;
    warehouseLocation: string;
    stockQty: number;
  }[];
}

export interface CartItem {
  id: string;
  sku: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image_link: string;
  selectedPackaging?: string;
  selectedShade?: {
    name: string;
    code: string;
    hex: string;
  };
  store_code: string;
}

export type BranchCode = 'SABAN_HARASH' | 'SABAN_TALMID' | string;

export interface PickupBranch {
  id?: string;
  code: BranchCode;
  name: string;
  subName: string;
  address: string;
  hours: string;
  phone: string;
  dispatchBay: string;
}

export interface CustomerOrder {
  orderId: string;
  pickupCode: string;
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  pickupBranch: BranchCode;
  contractorType: 'private' | 'contractor_silver' | 'contractor_gold';
  items: CartItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  notes?: string;
  createdAt: string;
  syncedToGoogleSheets: boolean;
  sheetRowId?: string;
  deposits?: {
    bagDepositCount: number;
    palletDepositCount: number;
    bagDepositTotal: number;
    palletDepositTotal: number;
    totalDepositAmount: number;
  };
  assignedDriver?: {
    name: string;
    truck: string;
    licensePlate: string;
    phone: string;
  };
}
