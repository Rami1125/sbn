import { GoogleMerchantProduct, PickupBranch } from '../types/product';

export const SABAN_BRANCHES: PickupBranch[] = [
  {
    code: 'SABAN_HARASH',
    name: 'סניף החרש 10',
    subName: 'מחסן 4 - מרכז לוגיסטי וחומרי שלד/איטום',
    address: 'רחוב החרש 10, אזור התעשייה',
    hours: 'א׳-ה׳ 06:30-17:00 | ו׳ 06:30-13:00',
    phone: '03-9518888',
    dispatchBay: 'רציף איסוף מהיר מס׳ 3 (גישה למשאיות ומלגזות)'
  },
  {
    code: 'SABAN_TALMID',
    name: 'סניף התלמיד 6',
    subName: 'מחסן 1 - גבס, צבע ומוסך פרזול',
    address: 'רחוב התלמיד 6, אזור התעשייה',
    hours: 'א׳-ה׳ 07:00-17:00 | ו׳ 07:00-13:00',
    phone: '03-9518889',
    dispatchBay: 'דלפק אקספרס ואיסוף קבלנים'
  }
];

export const INITIAL_PRODUCTS: GoogleMerchantProduct[] = [
  {
    id: '10701',
    title: 'סיקה טופ 107 ערכה 25 ק״ג (SikaTop Seal-107) איטום צמנטי',
    description: 'חומר איטום צמנטי דו-רכיבי אלסטי של סיקה לאיטום מרתפים, בריכות שחיה, מאגרי מים וחדרים רטובים. כושר כיסוי כ-12.5 מ״ר בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '155.00 ILS',
    sale_price: undefined,
    link: 'https://tv-tawny-kappa.vercel.app/qr?sku=10701',
    image_link: 'https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg',
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
      'עמידות בלחץ הידרוסטטי חיובי ושלילי עד 7 בר'
    ],
    applicationInstructions: [
      'הכנת השטח: נקה את התשתית משמנים, אבק וחלקים רופפים. שטוף בלחץ מים והרטב את הבטון למצב לח אך לא נוטף.',
      'ערבוב: שפוך כ-85% מנוזל הקומפוננט לתוך כלי נקי, הוסף בהדרגה את האבקה תוך כדי ערבול במערבל חשמלי איטי (כ-500 סל״ד) במשך 3 דקות.',
      'מריחה: מרח שכבה ראשונה בעזרת מברשת זיפים קשיחה (טפסר) בכיוון אחיד. הנח לייבוש של 4-6 שעות.',
      'שכבה שנייה: מרח שכבה שנייה בצלב (בכיוון 90 מעלות לשכבה הראשונה). במפגשי רצפה-קיר מומלץ להטביע רולקה/סרט איטום.'
    ],
    coverageInfo: {
      ratePerM2: '2.0 ק״ג למ״ר לשכבה בעובי 1 מ״מ (מומלץ 3.5-4 ק״ג למ״ר ב-2 שכבות)',
      recommendedCoats: 2,
      suitableSurfaces: ['בטון יצוק', 'בלוקים מבוטנים', 'טיח צמנטי', 'חדרים רטובים', 'בריכות ומאגרים'],
      prepNotes: 'יש להרטיב את התשתית היטב במים מתוקים לפני היישום (SSD)'
    },
    availableShades: [
      { name: 'אפור בטון קלאסי', code: 'GR-107', hex: '#8E9196', popular: true },
      { name: 'לבן שקוף (בהזמנה)', code: 'WH-107', hex: '#ECEEF0' }
    ],
    rating: 4.9,
    reviewsCount: 42,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 10', warehouseLocation: 'מדף C-14', stockQty: 184 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף A-02', stockQty: 48 }
    ]
  },
  {
    id: '20110',
    title: 'טמבור סופרפלקס לבן פח 18 ק״ג ציפוי איטום אקרילי אלסטומרי לגגות',
    description: 'חומר איטום אקרילי גמיש ועמיד בקרינת UV לאיטום והלבנת גגות, מתאים על יריעות ביטומניות ובטון. כושר כיסוי כ-15 מ״ר לפח בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '300.00 ILS',
    sale_price: '219.00 ILS',
    link: 'https://tv-tawny-kappa.vercel.app/qr?sku=20110',
    image_link: 'https://i.ibb.co/fzQWznmk/20110.jpg',
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
      { id: 'pail-18kg', label: 'פח 18 ק״ג (הנפוץ לגגות)', size: '18 ק״ג', price: 300, salePrice: 219, coverageM2: 'כ-15 מ״ר (2 שכבות)', isDefault: true },
      { id: 'gallon-5kg', label: 'גלון 5 ק״ג (לתיקונים והיקפים)', size: '5 ק״ג', price: 95, salePrice: 79, coverageM2: 'כ-4 מ״ר (2 שכבות)' }
    ],
    additionalImages: [
      'https://i.ibb.co/fzQWznmk/20110.jpg',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80'
    ],
    dryingTime: {
      touch: '2 שעות בקיץ / 4 שעות בחורף',
      recoat: '12-24 שעות בין שכבות',
      fullCure: '72 שעות לעמידות מלאה בגשם'
    },
    standards: [
      'תו תקן ישראלי 4516 לציפויי גגות אלסטומריים',
      'דירוג החזר קרינת שמש (SRI) גבוה מ-100 לחסכון באנרגיה',
      'גמישות מובטחת עד 300% גם בטמפרטורה נמוכה'
    ],
    applicationInstructions: [
      'הכנה: וודא כי הגג משופע היטב ואין שלוליות עומדות. נקה אבק ועלים.',
      'פריימר: על גבי יריעות ביטומניות ישנות או בטון מומלץ למרוח שכבת יסוד סופרפלקס מדוללת 25% במים.',
      'שכבה א׳: יישם במברשת עבה, רולר או איירלס שכבה ראשונה בעובי אחיד של 1 ק״ג/מ״ר.',
      'רשת שריון (אופציונלי): באזורים קריטיים, הטבע רשת פוליאסטר בין השכבות.',
      'שכבה ב׳: יישם שכבה שנייה בניצב לשכבה הראשונה לאחר ייבוש של 24 שעות.'
    ],
    coverageInfo: {
      ratePerM2: 'כ-1.2 עד 1.5 ק״ג למ״ר לשתי שכבות מלאות',
      recommendedCoats: 2,
      suitableSurfaces: ['יריעות ביטומניות ישנות', 'גגות בטון', 'אסבסט מפוקח', 'פח מגולוון'],
      prepNotes: 'אסור ליישם אם צפוי גשם ב-48 השעות שלאחר היישום'
    },
    availableShades: [
      { name: 'לבן שמש מסנוור (החזר חום 94%)', code: 'WH-SUPER', hex: '#FFFFFF', popular: true },
      { name: 'אפור רפלקטיבי בהיר', code: 'GR-REFLECT', hex: '#D7DADC' }
    ],
    rating: 4.8,
    reviewsCount: 31,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 10', warehouseLocation: 'משטח גגות E-08', stockQty: 92 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף D-11', stockQty: 24 }
    ]
  },
  {
    id: '10002',
    title: 'מלט פורטלנד אפור 25 ק״ג נשר CEM II 42.5',
    description: 'צמנט איכותי תקני לבנייה, טיח, יציקות בטון וריצוף מתוצרת מפעלי מלט נשר. עומד בתקן ישראלי ת״י 1.',
    availability: 'in_stock',
    condition: 'new',
    price: '20.32 ILS',
    sale_price: undefined,
    link: 'https://tv-tawny-kappa.vercel.app/qr?sku=10002',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
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
    additionalImages: [
      'https://i.ibb.co/0yVzZHt0/10002.jpg',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80'
    ],
    dryingTime: {
      touch: 'שעתיים לקשירה ראשונית',
      recoat: '24 שעות לשכבה הבאה',
      fullCure: '28 יום לחוזק בטון סופי 42.5 מגפ״ס'
    },
    standards: [
      'ת״י 1 רשמי - צמנט פורטלנד CEM II/A-LL 42.5 N',
      'בקרת איכות מעבדת נשר מאושרת',
      'תו כחול לבן'
    ],
    applicationInstructions: [
      'ערבוב: ערבב עם חול נקי ומים ביחס המתאים ליישום (למשל 1:3 לטיח או 1:2:3 לבטון עם שומשום/חצץ).',
      'אשפרה: חובה להרטיב את היציקה/טיח במים 3 פעמים ביום במשך 7 ימים למניעת סדקים והשגת חוזק מרבי.'
    ],
    coverageInfo: {
      ratePerM2: 'כ-10 ק״ג מלט למ״ר טיח בעובי 15 מ״מ',
      recommendedCoats: 1,
      suitableSurfaces: ['יציקות בטון', 'בלוקים', 'עבודות ריצוף', 'טיח מיישר'],
      prepNotes: 'יש להגן מרטיבות לפני השימוש'
    },
    availableShades: [
      { name: 'אפור צמנט טבעי', code: 'CEM-GR', hex: '#75787B', popular: true }
    ],
    rating: 5.0,
    reviewsCount: 88,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 10', warehouseLocation: 'חצר חומרי שלד - משטח A1', stockQty: 640 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'אזור חומרי מליטה', stockQty: 120 }
    ]
  },
  {
    id: '15680',
    title: 'סיקפלקס 11FC תרמיל 300 מ״ל Sika Sikaflex-11 FC Purform',
    description: 'מסטיק פוליאוריטני רב-תכליתי לאיטום תפרים והדבקה גמישה וחזקה של בטון, מתכת, עץ, אבן וקרמיקה.',
    availability: 'in_stock',
    condition: 'new',
    price: '42.00 ILS',
    sale_price: '34.00 ILS',
    link: 'https://tv-tawny-kappa.vercel.app/qr?sku=15680',
    image_link: 'https://i.ibb.co/HfddnMMq/15680.jpg',
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
      { id: 'cartridge-300ml', label: 'תרמיל בודד 300 מ״ל', size: '300 מ״ל', price: 42, salePrice: 34, coverageM2: 'כ-3 מטר אורך בתפר 10x10 מ״מ', isDefault: true },
      { id: 'box-12', label: 'קרטון 12 תרמילים (הנחת קבלנים)', size: '12 יח׳', price: 480, salePrice: 384, coverageM2: 'כ-36 מטר אורך' }
    ],
    additionalImages: [
      'https://i.ibb.co/HfddnMMq/15680.jpg',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    dryingTime: {
      touch: 'יצירת קרום תוך 65 דקות (23°C)',
      recoat: 'ניתן לצביעה מעל לאחר התקשות',
      fullCure: 'כ-3.5 מ״מ ל-24 שעות'
    },
    standards: [
      'תקן אירופי EN 15651-1 לאיטום חזיתות F-EXT-INT CC 25HM',
      'תקן ISO 11600 Class 25 HM',
      'טכנולוגיית Purform בעלת רמת מונומרים נמוכה במיוחד (<0.1%)'
    ],
    applicationInstructions: [
      'הכנה: על הדפנות להיות יבשות, נקיות משמן, אבק או שומן.',
      'חיתוך: חתוך את פיית התרמיל בזווית ובקוטר הרצוי לרוחב התפר.',
      'הזרקה: הזרק ברציפות בעזרת אקדח סיליקון איכותי למניעת כיסי אוויר.',
      'החלקה: החלק את פני המסטיק תוך 10 דקות בעזרת מרית טבולה במי סבון עדינים.'
    ],
    coverageInfo: {
      ratePerM2: 'תרמיל אחד מספיק לכ-3 מטר רץ בתפר של 10x10 מ״מ או 6 מטר בתפר 5x10 מ״מ',
      recommendedCoats: 1,
      suitableSurfaces: ['בטון', 'אלומניום', 'עץ', 'שיש', 'קרמיקה', 'מתכת מגולוונת'],
      prepNotes: 'אינו דורש פריימר על מרבית התשתיות המקובלות'
    },
    availableShades: [
      { name: 'אפור בטון קונקרט', code: 'FC-GR', hex: '#686B73', popular: true },
      { name: 'לבן צחור', code: 'FC-WH', hex: '#F5F5F5' },
      { name: 'שחור גרפיט', code: 'FC-BL', hex: '#222222' }
    ],
    rating: 4.9,
    reviewsCount: 54,
    inStockBranches: [
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מתקן תרמילים מדף B-03', stockQty: 110 },
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 10', warehouseLocation: 'מדף דבקים D-05', stockQty: 85 }
    ]
  },
  {
    id: '9889488',
    title: 'סופרקריל מט טמבור 10 ליטר (חצי פח) גוון 0524T אפור בטון עדין',
    description: 'צבע אקרילי רחיץ מובחר לקירות פנים מבית טמבור. גימור מט מהודר, כושר כיסוי כ-45 עד 50 מ״ר בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '295.00 ILS',
    sale_price: '265.00 ILS',
    link: 'https://tv-tawny-kappa.vercel.app/qr?sku=9889488',
    image_link: 'https://tambour.co.il/images/supercryl-mat-10l.jpg',
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
      { id: 'pail-18l', label: 'פח 18 ליטר (פח גדול לקבלנים)', size: '18 ליטר', price: 440, salePrice: 389, coverageM2: 'כ-90 מ״ר (2 שכבות)' },
      { id: 'gallon-5l', label: 'גלון 5 ליטר (לחדר בודד/קיר כוח)', size: '5 ליטר', price: 160, salePrice: 145, coverageM2: 'כ-25 מ״ר (2 שכבות)' }
    ],
    additionalImages: [
      'https://tambour.co.il/images/supercryl-mat-10l.jpg',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
    ],
    dryingTime: {
      touch: 'שעה אחת למגע',
      recoat: '3 שעות בין שכבות',
      fullCure: '7 ימים לרחיצה ועמידות בשפשוף'
    },
    standards: [
      'עומד בתקן ישראלי 1945 לצבעי קירות פנים',
      'תו תקן ירוק בעל פליטת VOC אפסית',
      'כושר רחיצות Class 1 לפי תקן EN 13300'
    ],
    applicationInstructions: [
      'הכנת הקיר: הסר צבע רופף או קילופים, סתום חורים במרק שפכטל ושייף לקבלת משטח חלק ואחיד.',
      'דילול: ערבב היטב לפני השימוש. בשכבה ראשונה ניתן לדלל ב-15% מים נקיים, שכבה שנייה 10% מים.',
      'יישום: יישם בעזרת רולר איכותי קצר סיבים (מיקרופייבר) או מברשת סינתטית עדינה.',
      'מספר שכבות: מומלץ ליישם 2 שכבות לכיסוי מושלם ועומק גוון עשיר.'
    ],
    coverageInfo: {
      ratePerM2: 'כ-9 עד 10 מ״ר לליטר בשתי שכבות',
      recommendedCoats: 2,
      suitableSurfaces: ['קירות גבס', 'טיח מוחלק', 'שפכטל אמריקאי', 'בטון פנים'],
      prepNotes: 'על גבס או שפכטל חדש מומלץ למרוח שכבת בונדרול סופר'
    },
    availableShades: [
      { name: '0524T אפור בטון עדין (הגוון המוביל)', code: '0524T', hex: '#C2C4C6', popular: true },
      { name: '0001P לבן שלג נקי', code: '0001P', hex: '#FAFAFA' },
      { name: '0021P פנינה עדינה שמנת', code: '0021P', hex: '#F5F2EB' },
      { name: '0535P גרפיט אורבני עמוק', code: '0535P', hex: '#7D8086' },
      { name: '0342T מוקה מדברי חם', code: '0342T', hex: '#D1C2B0' }
    ],
    rating: 4.9,
    reviewsCount: 67,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 10', warehouseLocation: 'מדף צבעים ראשי F-01', stockQty: 55 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מחלקת גוונים ומכונת גיוון טמבור', stockQty: 42 }
    ]
  }
];
