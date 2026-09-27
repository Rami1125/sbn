import { GoogleMerchantProduct, PickupBranch } from '../types/product';
import { SABAN_ENTERPRISE } from '../config/sabanEnterpriseConfig';

export const SABAN_BRANCHES: PickupBranch[] = [
  {
    code: 'SABAN_HARASH',
    name: 'סניף החרש 4 / 10',
    subName: 'מחסן 4 - מרכז לוגיסטי והפצה ראשי (שלד, מלט, איטום)',
    address: 'רחוב החרש 4 / 10, אזור התעשייה נווה נאמן, הוד השרון',
    hours: 'א׳-ה׳ 06:30-16:30 | ו׳ 06:30-12:30',
    phone: '03-9518888',
    dispatchBay: 'רציף איסוף מהיר מס׳ 3 (כניסה למשאיות ומלגזות)'
  },
  {
    code: 'SABAN_TALMID',
    name: 'סניף התלמיד 6',
    subName: 'מחסן 1 - גבס, צבע ומוסך פרזול',
    address: 'רחוב התלמיד 6, אזור התעשייה, הוד השרון',
    hours: 'א׳-ה׳ 06:30-16:30 | ו׳ 06:30-12:30',
    phone: '03-9518889',
    dispatchBay: 'דלפק אקספרס ואיסוף קבלנים'
  }
];

/**
 * 20 מוצרי העוגן המאומתים של ח. סבן חומרי בניין (1994) בע״מ
 * תואמים במדויק לשורות 2 עד 21 בפיד Google Merchant Center
 * מזהה גיליון: 1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y
 */
export const INITIAL_PRODUCTS: GoogleMerchantProduct[] = [
  // 1. שורה 2: סיקה טופ 107
  {
    id: '10701',
    title: 'סיקה טופ 107 ערכה 25 ק״ג (SikaTop Seal-107) איטום צמנטי',
    description: 'חומר איטום צמנטי דו-רכיבי אלסטי של סיקה לאיטום מרתפים, בריכות שחיה, מאגרי מים וחדרים רטובים. כושר כיסוי כ-12.5 מ״ר בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '155.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/10701',
    image_link: 'https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg',
    video_link: 'https://www.youtube.com/watch?v=SikaTop107Guide',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '10701',
    color: 'אפור',
    size: '25 ק״ג',
    material: 'צמנט פולימרי',
    product_highlight: 'עמיד בלחץ מים חיובי ושלילי, תקן מי שתייה ואיטום 1536, אידיאלי למרפסות וחדרים רטובים',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_HARASH',
    packagingOptions: [
      { id: 'kit-25kg', label: 'ערכה מלאה 25 ק״ג (אבקה 20 ק״ג + נוזל 5 ק״ג)', size: '25 ק״ג', price: 155, coverageM2: 'כ-12.5 מ״ר (2 שכבות)', isDefault: true },
      { id: 'kit-50kg', label: 'מארז כפול 50 ק״ג (2 ערכות לקבלנים)', size: '50 ק״ג', price: 295, salePrice: 289, coverageM2: 'כ-25 מ״ר (2 שכבות)' }
    ],
    additionalImages: [
      'https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80'
    ],
    dryingTime: {
      touch: '3-4 שעות (20°C)',
      recoat: '4-8 שעות בין שכבה ראשונה לשנייה',
      fullCure: '7 ימים לבדיקת הצפה והדבקת אריחים'
    },
    standards: [
      'ת״י 1536 לאיטום מבנים ומאגרים',
      'אישור רשמי למגע עם מי שתייה (ת״י 5452)',
      'עומד בדרישות תקן אירופאי EN 1504-2'
    ],
    coverageInfo: {
      ratePerM2: 'כ-2.0 ק״ג למ״ר לכל 1 מ״מ עובי',
      recommendedCoats: 2,
      suitableSurfaces: ['בטון יצוק', 'בלוק בטון', 'טיח צמנטי', 'לבנים'],
      prepNotes: 'יש להרטיב את התשתית עד לרוויה לפני היישום (SSD)'
    },
    rating: 4.9,
    reviewsCount: 48,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'רציף איטום מחסן 4', stockQty: 180 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף איטום מרכזי B-04', stockQty: 45 }
    ]
  },

  // 2. שורה 3: טמבור סופרפלקס לבן
  {
    id: '20110',
    title: 'טמבור סופרפלקס לבן פח 18 ק״ג ציפוי איטום אקרילי אלסטומרי לגגות',
    description: 'חומר איטום אקרילי גמיש ועמיד בקרינת UV לאיטום והלבנת גגות, מתאים על יריעות ביטומניות ובטון. כושר כיסוי כ-15 מ״ר לפח בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '300.00 ILS',
    sale_price: '219.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/20110',
    image_link: 'https://i.ibb.co/fzQWznmk/20110.jpg',
    video_link: 'https://www.youtube.com/watch?v=SuperflexTambourGuide',
    brand: 'טמבור',
    identifier_exists: 'no',
    mpn: '20110',
    color: 'לבן',
    size: '18 ק״ג',
    material: 'אקרילי אלסטומרי',
    product_highlight: 'גמישות מרבית בטמפרטורות קיצון, כושר הלבנה והחזרת חום מעולה, עמידות מלאה לקרני שמש UV',
    google_product_category: 'Hardware > Building Consumables > Roofing',
    store_code: 'SABAN_HARASH',
    packagingOptions: [
      { id: 'pail-18kg', label: 'פח 18 ק״ג (פופולרי לקבלנים)', size: '18 ק״ג', price: 300, salePrice: 219, coverageM2: 'כ-15 מ״ר (2 שכבות)', isDefault: true },
      { id: 'pail-5kg', label: 'פח 5 ק״ג (לתיקונים מקומיים)', size: '5 ק״ג', price: 95, coverageM2: 'כ-4 מ״ר (2 שכבות)' }
    ],
    rating: 4.8,
    reviewsCount: 31,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'משטח גגות E-08', stockQty: 92 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף D-11', stockQty: 24 }
    ]
  },

  // 3. שורה 4: מלט פורטלנד אפור 25 ק״ג נשר
  {
    id: '10002',
    title: 'מלט פורטלנד אפור 25 ק״ג נשר CEM II 42.5',
    description: 'צמנט איכותי תקני לבנייה, טיח, יציקות בטון וריצוף מתוצרת מפעלי מלט נשר. עומד בתקן ישראלי ת״י 1.',
    availability: 'in_stock',
    condition: 'new',
    price: '20.32 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/10002',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
    video_link: 'https://www.youtube.com/watch?v=NesherCementUse',
    brand: 'נשר',
    identifier_exists: 'no',
    mpn: '10002',
    color: 'אפור',
    size: '25 ק״ג',
    material: 'צמנט פורטלנד',
    product_highlight: 'תקן ת״י 1 רשמי, חוזק הדבקה והתקשות מרביים, מתאים לכל עבודות השלד והטיח',
    google_product_category: 'Hardware > Building Consumables > Cement & Mortar',
    store_code: 'SABAN_HARASH',
    packagingOptions: [
      { id: 'bag-25kg', label: 'שק 25 ק״ג בודד', size: '25 ק״ג', price: 20.32, coverageM2: 'כ-2.5 מ״ר טיח / יציקה', isDefault: true },
      { id: 'pallet-64', label: 'משטח שלם (64 שקים - 1.6 טון) מחיר סיטונאי', size: '1,600 ק״ג', price: 1240, salePrice: 1180, coverageM2: 'כ-160 מ״ר' }
    ],
    rating: 5.0,
    reviewsCount: 89,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'חצר מלט ושלד - סככה מרכזית', stockQty: 850 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'רציף איסוף מהיר', stockQty: 80 }
    ]
  },

  // 4. שורה 5: סיקפלקס 11FC תרמיל 300 מ״ל
  {
    id: '15680',
    title: 'סיקפלקס 11FC תרמיל 300 מ״ל Sika Sikaflex-11 FC Purform',
    description: 'מסטיק פוליאוריטני רב-תכליתי לאיטום תפרים והדבקה גמישה וחזקה של בטון, מתכת, עץ, אבן וקרמיקה.',
    availability: 'in_stock',
    condition: 'new',
    price: '42.00 ILS',
    sale_price: '34.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/15680',
    image_link: 'https://i.ibb.co/HfddnMMq/15680.jpg',
    video_link: 'https://www.youtube.com/watch?v=Sikaflex11FCTutorial',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '15680',
    color: 'אפור',
    size: '300 מ״ל',
    material: 'פוליאוריטן',
    product_highlight: 'עמידות לתנודות ושינויי מזג אוויר, כושר הדבקה חזק במיוחד ללא פריימר, מתאים לשימוש פנים וחוץ',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_TALMID',
    packagingOptions: [
      { id: 'cartridge-300ml', label: 'תרמיל 300 מ״ל בודד', size: '300 מ״ל', price: 42, salePrice: 34, isDefault: true },
      { id: 'box-12', label: 'קרטון 12 תרמילים (קבלנים)', size: '3.6 ליטר', price: 420, salePrice: 380 }
    ],
    rating: 4.9,
    reviewsCount: 52,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מדף דבקים ראשי', stockQty: 120 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'אולם תצוגה / דלפק איסוף', stockQty: 180 }
    ]
  },

  // 5. שורה 6: סופרקריל מט טמבור 10 ליטר (0524T)
  {
    id: '9889488',
    title: 'סופרקריל מט טמבור 10 ליטר גוון 0524T אפור בטון עדין',
    description: 'צבע אקרילי רחיץ מובחר לקירות פנים מבית טמבור. גימור מט מהודר, כושר כיסוי כ-45 עד 50 מ״ר בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '295.00 ILS',
    sale_price: '265.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/9889488',
    image_link: 'https://tambour.co.il/images/supercryl-mat-10l.jpg',
    video_link: 'https://www.youtube.com/watch?v=TambourSupercrylPaint',
    brand: 'טמבור',
    identifier_exists: 'no',
    mpn: '9889488',
    color: 'אפור בטון',
    size: '10 ליטר',
    material: 'אקרילי על בסיס מים',
    product_highlight: 'עמיד ברחיצה וקל לניקוי, כושר כיסוי והסתרה גבוה במיוחד, גוון אפור בטון מודרני מבוקש',
    google_product_category: 'Hardware > Building Consumables > Painting Consumables',
    store_code: 'SABAN_HARASH',
    packagingOptions: [
      { id: 'pail-10l', label: 'פח 10 ליטר (חצי פח - פופולרי)', size: '10 ליטר', price: 295, salePrice: 265, coverageM2: 'כ-50 מ״ר (2 שכבות)', isDefault: true },
      { id: 'pail-18l', label: 'פח 18 ליטר (פח גדול לקבלנים)', size: '18 ליטר', price: 440, salePrice: 389, coverageM2: 'כ-90 מ״ר (2 שכבות)' }
    ],
    rating: 4.9,
    reviewsCount: 67,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מדף צבעים ראשי F-01', stockQty: 55 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מחלקת גוונים ומכונת גיוון טמבור', stockQty: 42 }
    ]
  },

  // 6. שורה 7: סיקפלקס 11FC נקניק 600 מ״ל אפור
  {
    id: '11FC01',
    title: 'סיקפלקס 11FC שרוול 600 מ״ל אפור Purform Sika Sikaflex',
    description: 'שרוול נקניק 600 מ״ל פוליאוריטן איכותי לקבלנים לאיטום תפרי התפשטות והדבקה אלסטית.',
    availability: 'in_stock',
    condition: 'new',
    price: '38.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/11FC01',
    image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=SikaflexSausageGuide',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '11FC01',
    color: 'אפור',
    size: '600 מ״ל',
    material: 'פוליאוריטן אלסטי',
    product_highlight: 'חיסכון בעלויות לקבלנים, תפוקה כפולה מתרמיל רגיל, עמידות UV מוכחת',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_HARASH',
    rating: 4.9,
    reviewsCount: 41
  },

  // 7. שורה 8: חול ים שטוף ומנופה בלה גדולה
  {
    id: 'SAND-BAG-1',
    title: 'חול ים שטוף ומנופה בלה גדולה (כ-1 טון)',
    description: 'חול ים איכותי מנופה ושטוף ממלחים לעבודות ריצוף, טיח, מליטה ויציקות בטון. אספקה בבלות ענק.',
    availability: 'in_stock',
    condition: 'new',
    price: '220.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/SAND-BAG-1',
    image_link: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=SabanSandCraneDelivery',
    brand: 'סבן',
    identifier_exists: 'no',
    mpn: 'SAND-BAG-1',
    color: 'צהוב חול',
    size: '1 טון (בלה)',
    material: 'חול ים שטוף',
    product_highlight: 'נקי מאבנים וחרסיות, שטוף ממלחים, פריקת מנוף מדויקת לאתר או לגגות',
    google_product_category: 'Hardware > Building Consumables > Aggregates',
    store_code: 'SABAN_HARASH',
    rating: 5.0,
    reviewsCount: 38
  },

  // 8. שורה 9: סומסום שטוף לריצוף בלה 1 טון
  {
    id: 'SUMSUM-BAG-1',
    title: 'סומסום שטוף לריצוף ותשתיות שק בלה גדול (1 טון)',
    description: 'אגרגט חצץ דק (סומסום) שטוף ונקי למילוי תחת ריצוף גרניט פורצלן וקרמיקה. מונע שקיעות ומבטיח תשתית יציבה.',
    availability: 'in_stock',
    condition: 'new',
    price: '235.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/SUMSUM-BAG-1',
    image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=SumsumFlooringPrep',
    brand: 'סבן',
    identifier_exists: 'no',
    mpn: 'SUMSUM-BAG-1',
    color: 'אפור אבן',
    size: '1 טון',
    material: 'אגרגט גרוס שטוף',
    product_highlight: 'גרגרים מדורגים 4-9 מ״מ, ללא אבק, אידיאלי לצנרות מים וחשמל תת-רצפתיות',
    google_product_category: 'Hardware > Building Consumables > Aggregates',
    store_code: 'SABAN_HARASH',
    rating: 4.8,
    reviewsCount: 29
  },

  // 9. שורה 10: טיט מוכן לבנייה בלת ענק
  {
    id: 'TIT-BAG-1',
    title: 'טיט מוכן לבנייה ולטיח שק בלה ענק (1 טון)',
    description: 'תערובת טיט רטובה ומוכנה לעבודה מיידית בבניית בלוקים ועבודות טיח גס. חוסך זמן ערבוב באתר.',
    availability: 'in_stock',
    condition: 'new',
    price: '260.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/TIT-BAG-1',
    image_link: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=TitConstructionGuide',
    brand: 'סבן',
    identifier_exists: 'no',
    mpn: 'TIT-BAG-1',
    color: 'אפור צמנטי',
    size: '1 טון',
    material: 'טיט מעורבל',
    product_highlight: 'עבידות מעולה, זמן פתיחה ארוך, מתאים לקירות בלוק בטון ואיטונג',
    google_product_category: 'Hardware > Building Consumables > Cement & Mortar',
    store_code: 'SABAN_HARASH',
    rating: 4.9,
    reviewsCount: 22
  },

  // 10. שורה 11: מצע סוג א׳ בלה 1 טון
  {
    id: 'MATZE-BAG-1',
    title: 'מצע סוג א׳ מהודק ומודרג שק בלה גדול (1 טון)',
    description: 'חומר מצע מודרג סוג א׳ לתשתיות כבישים, חניות, אקרשטיין ויציקות רצפה. כושר הידוק מקסימלי.',
    availability: 'in_stock',
    condition: 'new',
    price: '190.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/MATZE-BAG-1',
    image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=MatzeCompactionTech',
    brand: 'סבן',
    identifier_exists: 'no',
    mpn: 'MATZE-BAG-1',
    color: 'חום אבן',
    size: '1 טון',
    material: 'אבן גרוסה מודרגת',
    product_highlight: 'תקן מע״צ למצעים, עומד בעומסי תנועה כבדים, עמידות בהידוק',
    google_product_category: 'Hardware > Building Consumables > Aggregates',
    store_code: 'SABAN_HARASH',
    rating: 4.7,
    reviewsCount: 16
  },

  // 11. שורה 12: חמרה אדומה גננית נקייה בלה 1 טון
  {
    id: 'HAMRA-BAG-1',
    title: 'חמרה אדומה גננית מנופה שק בלה ענק (1 טון)',
    description: 'אדמת חמרה מובחרת ומנופה לגינון, פיתוח סביבתי, הדשאות ומילוי גינות פנים וחוץ.',
    availability: 'in_stock',
    condition: 'new',
    price: '210.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/HAMRA-BAG-1',
    image_link: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=HamraGardenSoilPrep',
    brand: 'סבן',
    identifier_exists: 'no',
    mpn: 'HAMRA-BAG-1',
    color: 'אדום חמרה',
    size: '1 טון',
    material: 'אדמת חמרה',
    product_highlight: 'מנופה מגושים ואבנים, אחיזת מים גבוהה, אידיאלי לצמחייה ופיתוח שטח',
    google_product_category: 'Home & Garden > Yard & Garden > Soil & Soil Amendments',
    store_code: 'SABAN_HARASH',
    rating: 4.8,
    reviewsCount: 19
  },

  // 12. שורה 13: מלט פורטלנד כחול נשר 50 ק״ג
  {
    id: 'NESHER-50',
    title: 'מלט פורטלנד כחול נשר 50 ק״ג CEM II/B-LL 42.5N',
    description: 'שק מלט מקצועי כבד 50 ק״ג ליציקות בטון קונסטרוקטיביות, עמודי תמך, חגורות ורצפות בטון מזוין.',
    availability: 'in_stock',
    condition: 'new',
    price: '38.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/NESHER-50',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
    video_link: 'https://www.youtube.com/watch?v=Nesher50kgStructuralMix',
    brand: 'נשר',
    identifier_exists: 'no',
    mpn: 'NESHER-50',
    color: 'אפור',
    size: '50 ק״ג',
    material: 'צמנט פורטלנד',
    product_highlight: 'חוזק מוקדם ומאוחר מעולה (42.5N), תקן ת״י 1 מחמיר, הבחירה של מפעלי הבטון',
    google_product_category: 'Hardware > Building Consumables > Cement & Mortar',
    store_code: 'SABAN_HARASH',
    rating: 5.0,
    reviewsCount: 44
  },

  // 13. שורה 14: סיקה לטקס SikaLatex 5 ק״ג
  {
    id: 'SIKA-LATEX',
    title: 'סיקה לטקס SikaLatex מוסף דבק פולימרי לטיח ומליטה 5 ק״ג',
    description: 'אמולסיה פולימרית עמידה במים המשמשת כתוסף מקשר ומשפר עבידות, חוזק הידבקות ואיטום של תערובות מלט וטיח.',
    availability: 'in_stock',
    condition: 'new',
    price: '115.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/SIKA-LATEX',
    image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=SikaLatexApplicationGuide',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: 'SIKA-LATEX',
    color: 'לבן חלבי',
    size: '5 ק״ג',
    material: 'לטקס סינטטי',
    product_highlight: 'משפר חוזק הידבקות פי 3, מפחית סדיקה והצטמקות, יוצר שכבת קישור מושלמת (שפריץ צמנטי)',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_HARASH',
    rating: 4.9,
    reviewsCount: 37
  },

  // 14. שורה 15: סיקה 4A לעצירת פריצות מים מהירות
  {
    id: 'SIKA-4A',
    title: 'סיקה 4A תוסף צמנטי מהיר קשירה לעצירת פריצות מים מיידיות 5 ק״ג',
    description: 'נוזל זירוז קשירה מהיר במיוחד לתערובות מלט, לעצירת פריצות מים פעילות, נזילות מלחץ חיובי ושלילי במרתפים ומנהרות תוך 15-50 שניות.',
    availability: 'in_stock',
    condition: 'new',
    price: '145.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/SIKA-4A',
    image_link: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=Sika4AWaterStopAction',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: 'SIKA-4A',
    color: 'שקוף',
    size: '5 ק״ג',
    material: 'תוסף צמנטי מאיץ',
    product_highlight: 'עצירת זרימת מים תוך שניות, אידיאלי לפירים, מרתפים מוצפים וסדקים בבטון',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_HARASH',
    rating: 4.8,
    reviewsCount: 23
  },

  // 15. שורה 16: לוח גבס רגיל אורבונד 12.5 מ״מ
  {
    id: 'GYPS-ORBOND',
    title: 'לוח גבס לבן רגיל אורבונד 12.5 מ״מ עובי 120X260 ס״מ',
    description: 'לוח גבס תקני מבית אורבונד לבניית מחיצות פנים, תקרות מונמכות וחיפויי קירות. פאות משופעות (BA) למישוק מושלם.',
    availability: 'in_stock',
    condition: 'new',
    price: '46.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/GYPS-ORBOND',
    image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=OrbondGypsumInstallation',
    brand: 'אורבונד',
    identifier_exists: 'no',
    mpn: 'GYPS-ORBOND',
    color: 'לבן שנהב',
    size: '120X260 ס״מ (3.12 מ״ר)',
    material: 'גבס וקרטון ממוחזר',
    product_highlight: 'תקן ת״י 1490, בידוד תרמי ואקוסטי מעולה, עמידות וחוזק כיפוף גבוה',
    google_product_category: 'Hardware > Building Consumables > Drywall',
    store_code: 'SABAN_TALMID',
    rating: 5.0,
    reviewsCount: 65
  },

  // 16. שורה 17: לוח גבס ירוק אורבונד עמיד לחות
  {
    id: 'GYPS-GREEN',
    title: 'לוח גבס ירוק אורבונד 12.5 מ״מ עמיד לחות לחדרים רטובים 120X260',
    description: 'לוח גבס מיוחד בעל ליבה דוחה מים וקרטון עמיד בלחות, מיועד לחדרי רחצה, מטבחים וחללים בעלי רמת לחות גבוהה.',
    availability: 'in_stock',
    condition: 'new',
    price: '58.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/GYPS-GREEN',
    image_link: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=GreenGypsumBathroomWalls',
    brand: 'אורבונד',
    identifier_exists: 'no',
    mpn: 'GYPS-GREEN',
    color: 'ירוק בהיר',
    size: '120X260 ס״מ (3.12 מ״ר)',
    material: 'גבס מועשר בסיליקון',
    product_highlight: 'ספיגת מים נמוכה מ-5%, מונע עובש ופטריות, תשתית מצוינת להדבקת קרמיקה',
    google_product_category: 'Hardware > Building Consumables > Drywall',
    store_code: 'SABAN_TALMID',
    rating: 4.9,
    reviewsCount: 51
  },

  // 17. שורה 18: סופרקריל 2000 טמבור 18 ליטר
  {
    id: 'TAMBUR-2000',
    title: 'סופרקריל 2000 צבע אקרילי עליון לקירות פנים פח 18 ליטר טמבור',
    description: 'צבע אקרילי פרימיום בעל רחיצות מקסימלית ועמידות לאורך שנים. כושר כיסוי כ-160 מ״ר לפח בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '349.00 ILS',
    sale_price: '329.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/TAMBUR-2000',
    image_link: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=Supercryl2000Demo',
    brand: 'טמבור',
    identifier_exists: 'no',
    mpn: 'TAMBUR-2000',
    color: 'לבן משי IS 0015',
    size: '18 ליטר',
    material: 'אקרילי מובחר',
    product_highlight: 'רחיצות עליונה Class 1, הסתרה מושלמת, ברק משי יוקרתי, גיוון במכונה במקום',
    google_product_category: 'Hardware > Building Consumables > Painting Consumables',
    store_code: 'SABAN_TALMID',
    rating: 4.9,
    reviewsCount: 78
  },

  // 18. שורה 19: נירוקריל אקסטרה נירלט פח 18 ליטר
  {
    id: 'NIRLAT-EXTRA',
    title: 'נירוקריל אקסטרה בגימור מט משי מהודר פח 18 ליטר נירלט',
    description: 'צבע אקרילי עליון לקירות פנים וחוץ בגימור מט יוקרתי ורחיץ. טכנולוגיית פילמור ייחודית לעמידות בפני כתמים.',
    availability: 'in_stock',
    condition: 'new',
    price: '365.00 ILS',
    sale_price: '345.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/NIRLAT-EXTRA',
    image_link: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=NirlatExtraPaintTips',
    brand: 'נירלט',
    identifier_exists: 'no',
    mpn: 'NIRLAT-EXTRA',
    color: 'אפור אבן NWC 020',
    size: '18 ליטר',
    material: 'אקרילי מתקדם',
    product_highlight: 'גימור מט קטיפתי יוקרתי, נשם במיוחד, כושר הסתרה יוצא דופן של פגמי קיר',
    google_product_category: 'Hardware > Building Consumables > Painting Consumables',
    store_code: 'SABAN_TALMID',
    rating: 4.8,
    reviewsCount: 46
  },

  // 19. שורה 20: בונדרול סופר טמבור 5 ליטר
  {
    id: 'BONDEROL-SUPER',
    title: 'בונדרול סופר צבע יסוד מחזק תשתית ומשפר הדבקה 5 ליטר טמבור',
    description: 'צבע יסוד שקוף וקושר על בסיס מים לחיזוק תשתיות מתפוררות, טיח ישן, שפכטל וגבס לפני צביעה בצבעים אקריליים.',
    availability: 'in_stock',
    condition: 'new',
    price: '110.00 ILS',
    sale_price: '95.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/BONDEROL-SUPER',
    image_link: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=BonderolSuperPrimerUse',
    brand: 'טמבור',
    identifier_exists: 'no',
    mpn: 'BONDEROL-SUPER',
    color: 'שקוף',
    size: '5 ליטר',
    material: 'פריימר קושר',
    product_highlight: 'חודר עמוק לתשתית ומייצב אותה, מונע קילופי צבע בעתיד, משווה את ספיגת הקיר',
    google_product_category: 'Hardware > Building Consumables > Painting Consumables',
    store_code: 'SABAN_TALMID',
    rating: 4.9,
    reviewsCount: 39
  },

  // 20. שורה 21: ברגי גבס מושחרים 25 מ״מ קופסה 1000 יח׳
  {
    id: 'SCREW-GYPS-25',
    title: 'ברגי גבס שחורים 25 מ״מ איכותיים בקופסה 1000 יח׳',
    description: 'ברגי גבס מקצועיים בעלי ראש חצוצרה והברגה חדה לחדירה מהירה וחזקה לפרופילי פח ומתכת ללא קריעת הנייר.',
    availability: 'in_stock',
    condition: 'new',
    price: '35.00 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/SCREW-GYPS-25',
    image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    video_link: 'https://www.youtube.com/watch?v=DrywallScrewsProTips',
    brand: 'סבן',
    identifier_exists: 'no',
    mpn: 'SCREW-GYPS-25',
    color: 'שחור פוספט',
    size: '25 מ״מ (1,000 יח׳)',
    material: 'פלדה מחוסמת מושחרת',
    product_highlight: 'ציפוי פוספט עמיד בקורוזיה, חדירה מהירה ונקייה, מתאים לכל מברגת גבס סטנדרטית',
    google_product_category: 'Hardware > Hardware Fasteners > Screws',
    store_code: 'SABAN_TALMID',
    rating: 4.8,
    reviewsCount: 33
  }
];

/**
 * פריטי פקדונות חובה במערכת סבן
 */
export const MANDATORY_DEPOSIT_ITEMS = [
  {
    id: SABAN_ENTERPRISE.mandatoryDeposits.bigBag.sku,
    title: SABAN_ENTERPRISE.mandatoryDeposits.bigBag.title,
    price: `${SABAN_ENTERPRISE.mandatoryDeposits.bigBag.price}.00 ILS`,
    rule: 'יחס 1:1 על כל בלת חול, סומסום, טיט, מצע או חמרה'
  },
  {
    id: SABAN_ENTERPRISE.mandatoryDeposits.sabanPallet.sku,
    title: SABAN_ENTERPRISE.mandatoryDeposits.sabanPallet.title,
    price: `${SABAN_ENTERPRISE.mandatoryDeposits.sabanPallet.price}.00 ILS`,
    rule: 'משטח לכל 40 שקי מלט/דבק או 20 שקי טיח'
  }
];
