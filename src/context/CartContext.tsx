import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CartItem, BranchCode, CustomerOrder, GoogleMerchantProduct } from '../types/product';
import { SABAN_BRANCHES } from '../data/initialProducts';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: GoogleMerchantProduct,
    quantity?: number,
    packagingId?: string,
    shade?: { name: string; code: string; hex: string }
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  
  // Checkout & Pickup info
  contractorTier: 'private' | 'contractor_silver' | 'contractor_gold';
  setContractorTier: (tier: 'private' | 'contractor_silver' | 'contractor_gold') => void;
  selectedBranch: BranchCode;
  setSelectedBranch: (branch: BranchCode) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  pickupTime: string;
  setPickupTime: (time: string) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  
  // Calculations
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  taxAmount: number;
  finalTotal: number;
  totalItemCount: number;
  
  // Order submission
  isSubmittingOrder: boolean;
  lastCompletedOrder: CustomerOrder | null;
  submitOrder: () => Promise<CustomerOrder>;
  dismissOrderSuccess: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'saban_pro_cart_items_v1';
const ORDERS_STORAGE_KEY = 'saban_pro_orders_history_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [contractorTier, setContractorTier] = useState<'private' | 'contractor_silver' | 'contractor_gold'>('contractor_silver');
  const [selectedBranch, setSelectedBranch] = useState<BranchCode>('SABAN_HARASH');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('תוך 90 דקות (אקספרס)');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<CustomerOrder | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (
    product: GoogleMerchantProduct,
    quantity = 1,
    packagingId?: string,
    shade?: { name: string; code: string; hex: string }
  ) => {
    // Determine price based on packaging option
    let chosenPrice = parseFloat(product.price.replace(/[^\d.]/g, '')) || 0;
    let chosenOriginalPrice: number | undefined = undefined;
    let packagingLabel = product.size;

    if (packagingId && product.packagingOptions) {
      const pack = product.packagingOptions.find((p) => p.id === packagingId);
      if (pack) {
        packagingLabel = pack.label;
        if (pack.salePrice) {
          chosenPrice = pack.salePrice;
          chosenOriginalPrice = pack.price;
        } else {
          chosenPrice = pack.price;
        }
      }
    } else if (product.sale_price) {
      const saleP = parseFloat(product.sale_price.replace(/[^\d.]/g, ''));
      if (!isNaN(saleP) && saleP > 0) {
        chosenOriginalPrice = chosenPrice;
        chosenPrice = saleP;
      }
    }

    const itemUniqueId = `${product.id}-${packagingId || 'default'}-${shade?.code || 'default'}`;

    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === itemUniqueId);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [
          ...prev,
          {
            id: itemUniqueId,
            sku: product.id,
            title: product.title,
            brand: product.brand,
            price: chosenPrice,
            originalPrice: chosenOriginalPrice,
            quantity,
            image_link: product.image_link,
            selectedPackaging: packagingLabel,
            selectedShade: shade,
            store_code: product.store_code
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Discount calculation
  const discountRate =
    contractorTier === 'contractor_gold'
      ? 0.12
      : contractorTier === 'contractor_silver'
      ? 0.07
      : 0;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const priceAfterDiscount = subtotal - discountAmount;
  // Prices in building materials in Israel include 18% VAT or standard calculation
  const vat = priceAfterDiscount * 0.18;
  const finalTotal = priceAfterDiscount; // prices are gross consumer/contractor pricing
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const submitOrder = async (): Promise<CustomerOrder> => {
    setIsSubmittingOrder(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const pickupCode = `SBN-${new Date().getFullYear().toString().slice(-2)}${randomSuffix}`;
    const orderId = `ORD-${Date.now()}`;

    const newOrder: CustomerOrder = {
      orderId,
      pickupCode,
      customerName: customerName.trim() || 'קבלן VIP סבן',
      customerPhone: customerPhone.trim() || '050-0000000',
      pickupTime,
      pickupBranch: selectedBranch,
      contractorType: contractorTier,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      vat,
      total: finalTotal,
      notes: orderNotes.trim(),
      createdAt: new Date().toISOString(),
      syncedToGoogleSheets: true,
      sheetRowId: `GMC_ROW_${Math.floor(Math.random() * 8999 + 1000)}`
    };

    // Simulate network sync to Google Sheets (ID: 1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Save in history
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([newOrder, ...existing]));
    } catch {
      // ignore
    }

    setLastCompletedOrder(newOrder);
    setCart([]);
    setIsSubmittingOrder(false);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    return newOrder;
  };

  const dismissOrderSuccess = () => {
    setLastCompletedOrder(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        contractorTier,
        setContractorTier,
        selectedBranch,
        setSelectedBranch,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        pickupTime,
        setPickupTime,
        orderNotes,
        setOrderNotes,
        subtotal,
        discountRate,
        discountAmount,
        taxAmount: vat,
        finalTotal,
        totalItemCount,
        isSubmittingOrder,
        lastCompletedOrder,
        submitOrder,
        dismissOrderSuccess
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
