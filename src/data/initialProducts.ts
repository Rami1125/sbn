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

export const GMC_FEED_SHEET_ID = '1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y';

export const CANONICAL_ANCHOR_CSV = `id,title,description,availability,condition,price,sale_price,link,image_link,brand,identifier_exists,mpn,color,size,material,product_highlight,google_product_category,store_code,video_link
10701,סיקה טופ 107 (SikaTop Seal-107) ערכה 25 ק״ג איטום צמנטי,חומר איטום צמנטי דו-רכיבי אלסטי של סיקה לאיטום מרתפים; בריכות שחיה; מאגרים וחדרים רטובים. כושר כיסוי כ-12.5 מ״ר בשתי שכבות.,in_stock,new,154.6625 ILS,,https://sbn-xi.vercel.app/product/10701,https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg,Sika,no,10701,אפור,25 ק״ג,צמנט פולימרי,עמיד בלחץ מים חיובי ושלילי | ת״י 1536 לאיטום צמנטי | מתאים למרפסות וחדרים רטובים,Hardware > Building Consumables > Hardware Glue & Adhesives,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
20110,טמבור סופרפלקס לבן פח 18 ק״ג ציפוי איטום אקרילי אלסטומרי לגגות,חומר איטום אקרילי גמיש ועמיד בקרינת UV לאיטום והלבנת גגות; מתאים על יריעות ביטומניות ובטון. כושר כיסוי כ-15 מ״ר לפח בשתי שכבות.,in_stock,new,300.00 ILS,219.00 ILS,https://sbn-xi.vercel.app/product/20110,https://i.ibb.co/fzQWznmk/20110.jpg,טמבור,no,20110,לבן,18 ק״ג,אקרילי אלסטומרי,גמישות מרבית בטמפרטורות קיצון | כושר הלבנה והחזרת חום | עמידות מלאה לקרני שמש UV,Hardware > Building Consumables > Roofing,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
10002,מלט פורטלנד אפור 25 ק״ג נשר CEM II 42.5,צמנט איכותי תקני לבנייה; טיח; יציקות בטון וריצוף מתוצרת מפעלי מלט נשר. עומד בתקן ישראלי ת״י 1.,in_stock,new,24.50 ILS,20.32 ILS,https://sbn-xi.vercel.app/product/10002,https://i.ibb.co/0yVzZHt0/10002.jpg,נשר,no,10002,אפור,25 ק״ג,צמנט פורטלנד,תקן ת״י 1 רשמי | חוזק הדבקה והתקשות מרביים | מתאים לכל עבודות השלד והטיח,Hardware > Building Consumables > Cement & Mortar,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
10009,מלט לבן 25 ק״ג נשר לבטון אדריכלי ושחזור,מלט פורטלנד לבן מובחר לעבודות בנייה אסתטיות; רובה; שחזור מבנים ובטון דקורטיבי חשוף.,in_stock,new,45.00 ILS,42.00 ILS,https://sbn-xi.vercel.app/product/10009,https://i.ibb.co/0yVzZHt0/10002.jpg,נשר,no,10009,לבן,25 ק״ג,צמנט פורטלנד לבן,לובן בוהק ועמיד | חוזק מבני תקני | אידיאלי לבטון אדריכלי,Hardware > Building Consumables > Cement & Mortar,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
10011,בטון מוכן יבש 25 ק״ג (רק להוסיף מים),תערובת בטון יבשה מוכנה לשימוש ליציקות חגורות; עמודים; תיקוני מדרכות ועיגון עמודים.,in_stock,new,25.00 ILS,22.00 ILS,https://sbn-xi.vercel.app/product/10011,https://i.ibb.co/0yVzZHt0/10002.jpg,תרמוקיר / סבן,no,10011,אפור,25 ק״ג,בטון צמנטי,מוכן לשימוש מיידי | מתאים לתיקונים ויציקות | אחידות תערובת מבוקרת,Hardware > Building Consumables > Cement & Mortar,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
19255,דבק ריצוף סרם 255 סטארפלקס 25 ק״ג C2TE-S1 מיסטר פיקס,דבק צמנטי איכותי בעל גמישות מוגברת לריצוף וחיפוי גרניט פורצלן; אבן טבעית וקרמיקה בפנים ובחוץ.,in_stock,new,52.00 ILS,46.00 ILS,https://sbn-xi.vercel.app/product/19255,https://i.ibb.co/VYwc3mvx/30501.jpg,מיסטר פיקס,no,19255,אפור,25 ק״ג,דבק צמנטי פולימרי,סיווג אירופי C2TE-S1 | גמישות מרבית | מתאים לריצוף חוץ ופנים,Hardware > Building Consumables > Hardware Glue & Adhesives,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
10702,מוסף הדבקה ואיטום סיקה לטקס SBR גלון 5 ק״ג Sika,אמולסיית לטקס להוספה לתערובות מליטה וטיח. משפרת הידבקות; מונעת חדירת מים ומעניקה גמישות גבוהה.,in_stock,new,85.00 ILS,78.00 ILS,https://sbn-xi.vercel.app/product/10702,https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg,Sika,no,10702,נוזל לבן,5 ק״ג,לטקס SBR,שיפור הידבקות בטון ישן לחדש | חיזוק איטום רולקות | תערובת פולימרית עמידה,Hardware > Building Consumables > Hardware Glue & Adhesives,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
111260,לוח גבס לבן סטנדרטי 260 ס״מ (1.20X2.60 עובי 12.5 מ״מ),לוח גבס סטנדרטי לבניית מחיצות פנים; תקרות והנמכות. מיוצר לפי ת״י 1490. שטח לוח 3.12 מ״ר.,in_stock,new,42.00 ILS,38.00 ILS,https://sbn-xi.vercel.app/product/111260,https://i.ibb.co/SDY6vrCY/112260.jpg,אורבונד / גבס כנף,no,111260,לבן,2.60 מטר,גבס,ת״י 1490 רשמי | בידוד אקוסטי | הרכבה מהירה וקלה,Hardware > Building Consumables > Drywall & Wallboard,SABAN_TALMID,https://youtu.be/6B0Ih74mpkk?si=F4pGVqn44e1GvPA6
112260,לוח גבס ירוק עמיד לחות 2.60 מטר טמבור (1.20X2.60 עובי 12.5 מ״מ),לוח גבס ירוק עמיד רטיבות מתוצרת טמבור לחדרי רחצה; מטבחים וחללים לחים. עומד בת״י 1490. שטח לוח 3.12 מ״ר.,in_stock,new,78.09 ILS,70.28 ILS,https://sbn-xi.vercel.app/product/112260,https://i.ibb.co/SDY6vrCY/112260.jpg,טמבור,no,112260,ירוק,2.60 מטר,גבס,עמיד לחות ורטיבות | ת״י 1490 ללוחות גבס | בידוד אקוסטי ותרמי מעולה,Hardware > Building Consumables > Drywall & Wallboard,SABAN_TALMID,https://youtu.be/6B0Ih74mpkk?si=F4pGVqn44e1GvPA6
15680,סיקפלקס 11FC תרמיל 300 מ״ל Sika Sikaflex-11 FC Purform אפור,מסטיק פוליאוריטני רב-תכליתי לאיטום תפרים והדבקה גמישה וחזקה של בטון; מתכת; עץ; אבן וקרמיקה. תקן ISO 11600.,in_stock,new,42.00 ILS,34.00 ILS,https://sbn-xi.vercel.app/product/15680,https://i.ibb.co/HfddnMMq/15680.jpg,Sika,no,15680,אפור,300 מ״ל,פוליאוריטן,עמידות לתנודות ומזג אוויר | כושר הדבקה חזק במיוחד | איטום תפרים גמיש,Hardware > Building Consumables > Hardware Glue & Adhesives,SABAN_TALMID,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
15681,סיקפלקס 11FC תרמיל 300 מ״ל Sika לבן (Sikaflex-11 FC),דבק ומסטיק איטום פוליאוריטן לבן של סיקה. איטום פנלים; חיבורי אמבטיה; כיורים ואלמנטים לבנים.,in_stock,new,42.00 ILS,34.00 ILS,https://sbn-xi.vercel.app/product/15681,https://i.ibb.co/HfddnMMq/15680.jpg,Sika,no,15681,לבן,300 מ״ל,פוליאוריטן,גוון לבן בוהק | הדבקה מבנית חזקה | עמיד בפני עובש ורטיבות,Hardware > Building Consumables > Hardware Glue & Adhesives,SABAN_TALMID,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
15682,סיקפלקס 11FC תרמיל 300 מ״ל Sika שחור (Sikaflex-11 FC),דבק מסטיק פוליאוריטן שחור לעיגון ספי חלונות; פרופילי אלומיניום שחור; גגות ואיטום הדבקה כבדה.,in_stock,new,42.00 ILS,34.00 ILS,https://sbn-xi.vercel.app/product/15682,https://i.ibb.co/HfddnMMq/15680.jpg,Sika,no,15682,שחור,300 מ״ל,פוליאוריטן,גוון שחור עמיד UV | הדבקת אלמנטים ואלומיניום | עמידות במים מתמידים,Hardware > Building Consumables > Hardware Glue & Adhesives,SABAN_TALMID,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
9889488,סופרקריל מט טמבור 10 ליטר (חצי פח) גוון 0524T אפור בטון עדין,צבע אקרילי רחיץ מובחר לקירות פנים מבית טמבור. גימור מט מהודר; כושר כיסוי כ-45 עד 50 מ״ר בשתי שכבות.,in_stock,new,295.00 ILS,265.00 ILS,https://sbn-xi.vercel.app/product/9889488,https://tambour.co.il/images/supercryl-mat-10l.jpg,טמבור,no,9889488,אפור בטון,10 ליטר,אקרילי על בסיס מים,רחיץ ועמיד בקרצוף | כושר כיסוי גבוה במיוחד | גוון מודרני מבוקש,Hardware > Building Consumables > Painting Consumables,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-noa-ai.mp4
9889421,אקווניר ADVANCE מט לבן 15 ליטר פח נירלט,צבע אקרילי פרימיום לקירות פנים בטכנולוגיה מתקדמת. עמיד ברחיצה; אנטי-בקטריאלי עם כושר הסתרה גבוה.,in_stock,new,320.00 ILS,285.00 ILS,https://sbn-xi.vercel.app/product/9889421,https://tambour.co.il/images/supercryl-mat-10l.jpg,נירלט,no,9889421,לבן,15 ליטר,אקרילי מים מתקדם,כושר כיסוי עד 140 מ״ר לפח | רחיצות מעולה | מראה חלק ואחיד,Hardware > Building Consumables > Painting Consumables,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-noa-ai.mp4
11501,חול ים שטוף שק גדול (בלה כ-800 ק״ג) לבנייה וטיח,חול ים שטוף ונקי ממלחים וחומרים אורגניים; מתאים לתערובות טיח; ריצוף ובטון תקני.,in_stock,new,135.00 ILS,120.00 ILS,https://sbn-xi.vercel.app/product/11501,https://i.ibb.co/0yVzZHt0/10002.jpg,ח. סבן מחצבות,no,11501,צהבהב,בלה,חול ים שטוף,חול שטוף נקי ממלחים | אחידות גרגיר מושלמת | שק בלה עמיד להנפה במנוף,Hardware > Building Consumables > Sand,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
11511,סומסום שק גדול (בלה כ-850 ק״ג) מצע תשתית לריצוף,אגרגט סומסום נקי ומנופה 4-9 מ״מ למצע תחת ריצוף גרניט פורצלן וקרמיקה. מונע שקיעות ומבטיח פילוס.,in_stock,new,150.00 ILS,135.00 ILS,https://sbn-xi.vercel.app/product/11511,https://i.ibb.co/0yVzZHt0/10002.jpg,ח. סבן מחצבות,no,11511,אפור בהיר,בלה,אבן גיר מנופה,אגרגט נקי ללא אבק | תקן מצע ריצוף | ניקוז מים אופטימלי תחת אריחים,Hardware > Building Consumables > Gravel,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
11551,טיט מוכן שק גדול (בלה כ-850 ק״ג) לבנייה ובלוקים,תערובת טיט מוכנה לבניית בלוקים; מחיצות וטיח. מיוצרת מאגרגטים מובחרים ומוספים פלסטיים.,in_stock,new,155.00 ILS,140.00 ILS,https://sbn-xi.vercel.app/product/11551,https://i.ibb.co/0yVzZHt0/10002.jpg,ח. סבן מחצבות,no,11551,בז׳,בלה,טיט מועשר,נוחות עבודה מרבית | כושר הדבקה לבלוקים | עמידות לאורך זמן,Hardware > Building Consumables > Cement & Mortar,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
35010,מרק שפכטל אמריקאי מוכן להחלקה 28 ק״ג פח טמבור,שפכטל מוכן להחלקה מושלמת של קירות גבס וטיח לפני צבע. קל לשיוף; נוח ליישום ומעניק משטח חלק כראי.,in_stock,new,75.00 ILS,65.00 ILS,https://sbn-xi.vercel.app/product/35010,https://i.ibb.co/SDY6vrCY/112260.jpg,טמבור,no,35010,לבן,28 ק״ג,מרק שפכטל מוכן,החלקה מושלמת של לוחות גבס | שיוף קל במיוחד | כושר כיסוי גבוה ללא סדקים,Hardware > Building Consumables > Spackling & Patching Compounds,SABAN_HARASH,https://youtu.be/6B0Ih74mpkk?si=F4pGVqn44e1GvPA6
30501,קצף פוליאוריטן סיקה בום (Sika Boom-157) מכל 750 מ״ל,קצף פוליאוריטן חד-רכיבי בעל התפשטות מבוקרת לבידוד תרמי; אקוסטי; מילוי מרווחים וקיבוע משקופים וצנרת.,in_stock,new,40.00 ILS,35.00 ILS,https://sbn-xi.vercel.app/product/30501,https://i.ibb.co/VYwc3mvx/30501.jpg,Sika,no,30501,צהבהב,750 מ״ל,פוליאוריטן מוקצף,תפוקת נפח חופשי כ-35-40 ליטר | בידוד אקוסטי ותרמי | הידבקות מעולה לבטון ועץ,Hardware > Building Consumables > Insulation,SABAN_HARASH,https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4
76206,ברגי גבס 25 מ״מ שחורים מושחזים (קופסה 1;000 יח׳),ברגי גבס איכותיים מושחזים עם ראש חצוצרה והברגה מהירה לחיבור לוחות גבס לפרופילי מתכת עד 0.8 מ״מ.,in_stock,new,36.00 ILS,32.00 ILS,https://sbn-xi.vercel.app/product/76206,https://i.ibb.co/SDY6vrCY/112260.jpg,סבן פרזול,no,76206,שחור,1000 יח׳,פלדה מחוסמת פוספט,ראש חצוצרה שוקע | חדירה חלקה ללא קריעת נייר | ציפוי פוספט שחור למניעת חלודה,Hardware > Hardware Fasteners > Screws,SABAN_TALMID,https://youtu.be/6B0Ih74mpkk?si=F4pGVqn44e1GvPA6`;

/**
 * 20 מוצרי העוגן המאומתים של ח. סבן חומרי בניין (1994) בע״מ
 * תואמים במדויק לשורות 2 עד 21 בפיד Google Merchant Center
 * מזהה גיליון: 1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y
 */
export const INITIAL_PRODUCTS: GoogleMerchantProduct[] = [
  // 1. שורה 2: מק״ט 10701 - סיקה טופ 107
  {
    id: '10701',
    title: 'סיקה טופ 107 (SikaTop Seal-107) ערכה 25 ק״ג איטום צמנטי',
    description: 'חומר איטום צמנטי דו-רכיבי אלסטי של סיקה לאיטום מרתפים; בריכות שחיה; מאגרים וחדרים רטובים. כושר כיסוי כ-12.5 מ״ר בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '154.6625 ILS',
    sale_price: undefined,
    link: 'https://sbn-xi.vercel.app/product/10701',
    image_link: 'https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '10701',
    color: 'אפור',
    size: '25 ק״ג',
    material: 'צמנט פולימרי',
    product_highlight: 'עמיד בלחץ מים חיובי ושלילי | ת״י 1536 לאיטום צמנטי | מתאים למרפסות וחדרים רטובים',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_HARASH',
    packagingOptions: [
      { id: 'kit-25kg', label: 'ערכה מלאה 25 ק״ג (אבקה 20 ק״ג + נוזל 5 ק״ג)', size: '25 ק״ג', price: 154.66, coverageM2: 'כ-12.5 מ״ר (2 שכבות)', isDefault: true },
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

  // 2. שורה 3: מק״ט 20110 - טמבור סופרפלקס לבן
  {
    id: '20110',
    title: 'טמבור סופרפלקס לבן פח 18 ק״ג ציפוי איטום אקרילי אלסטומרי לגגות',
    description: 'חומר איטום אקרילי גמיש ועמיד בקרינת UV לאיטום והלבנת גגות; מתאים על יריעות ביטומניות ובטון. כושר כיסוי כ-15 מ״ר לפח בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '300.00 ILS',
    sale_price: '219.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/20110',
    image_link: 'https://i.ibb.co/fzQWznmk/20110.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'טמבור',
    identifier_exists: 'no',
    mpn: '20110',
    color: 'לבן',
    size: '18 ק״ג',
    material: 'אקרילי אלסטומרי',
    product_highlight: 'גמישות מרבית בטמפרטורות קיצון | כושר הלבנה והחזרת חום | עמידות מלאה לקרני שמש UV',
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

  // 3. שורה 4: מק״ט 10002 - מלט פורטלנד אפור 25 ק״ג נשר
  {
    id: '10002',
    title: 'מלט פורטלנד אפור 25 ק״ג נשר CEM II 42.5',
    description: 'צמנט איכותי תקני לבנייה; טיח; יציקות בטון וריצוף מתוצרת מפעלי מלט נשר. עומד בתקן ישראלי ת״י 1.',
    availability: 'in_stock',
    condition: 'new',
    price: '24.50 ILS',
    sale_price: '20.32 ILS',
    link: 'https://sbn-xi.vercel.app/product/10002',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'נשר',
    identifier_exists: 'no',
    mpn: '10002',
    color: 'אפור',
    size: '25 ק״ג',
    material: 'צמנט פורטלנד',
    product_highlight: 'תקן ת״י 1 רשמי | חוזק הדבקה והתקשות מרביים | מתאים לכל עבודות השלד והטיח',
    google_product_category: 'Hardware > Building Consumables > Cement & Mortar',
    store_code: 'SABAN_HARASH',
    packagingOptions: [
      { id: 'bag-25kg', label: 'שק 25 ק״ג בודד', size: '25 ק״ג', price: 24.5, salePrice: 20.32, coverageM2: 'כ-2.5 מ״ר טיח / יציקה', isDefault: true },
      { id: 'pallet-64', label: 'משטח שלם (64 שקים - 1.6 טון) מחיר סיטונאי', size: '1,600 ק״ג', price: 1240, salePrice: 1180, coverageM2: 'כ-160 מ״ר' }
    ],
    rating: 5.0,
    reviewsCount: 89,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'חצר מלט ושלד - סככה מרכזית', stockQty: 850 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'רציף איסוף מהיר', stockQty: 80 }
    ]
  },

  // 4. שורה 5: מק״ט 10009 - מלט לבן 25 ק״ג נשר
  {
    id: '10009',
    title: 'מלט לבן 25 ק״ג נשר לבטון אדריכלי ושחזור',
    description: 'מלט פורטלנד לבן מובחר לעבודות בנייה אסתטיות; רובה; שחזור מבנים ובטון דקורטיבי חשוף.',
    availability: 'in_stock',
    condition: 'new',
    price: '45.00 ILS',
    sale_price: '42.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/10009',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'נשר',
    identifier_exists: 'no',
    mpn: '10009',
    color: 'לבן',
    size: '25 ק״ג',
    material: 'צמנט פורטלנד לבן',
    product_highlight: 'לובן בוהק ועמיד | חוזק מבני תקני | אידיאלי לבטון אדריכלי',
    google_product_category: 'Hardware > Building Consumables > Cement & Mortar',
    store_code: 'SABAN_HARASH',
    rating: 4.9,
    reviewsCount: 34,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'חצר מלט ושלד', stockQty: 220 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף חומרי מליטה', stockQty: 30 }
    ]
  },

  // 5. שורה 6: מק״ט 10011 - בטון מוכן יבש 25 ק״ג
  {
    id: '10011',
    title: 'בטון מוכן יבש 25 ק״ג (רק להוסיף מים)',
    description: 'תערובת בטון יבשה מוכנה לשימוש ליציקות חגורות; עמודים; תיקוני מדרכות ועיגון עמודים.',
    availability: 'in_stock',
    condition: 'new',
    price: '25.00 ILS',
    sale_price: '22.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/10011',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'תרמוקיר / סבן',
    identifier_exists: 'no',
    mpn: '10011',
    color: 'אפור',
    size: '25 ק״ג',
    material: 'בטון צמנטי',
    product_highlight: 'מוכן לשימוש מיידי | מתאים לתיקונים ויציקות | אחידות תערובת מבוקרת',
    google_product_category: 'Hardware > Building Consumables > Cement & Mortar',
    store_code: 'SABAN_HARASH',
    rating: 4.8,
    reviewsCount: 42,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'סככת יציקות מחסן 4', stockQty: 310 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'דלפק אקספרס', stockQty: 50 }
    ]
  },

  // 6. שורה 7: מק״ט 19255 - דבק ריצוף סרם 255 סטארפלקס
  {
    id: '19255',
    title: 'דבק ריצוף סרם 255 סטארפלקס 25 ק״ג C2TE-S1 מיסטר פיקס',
    description: 'דבק צמנטי איכותי בעל גמישות מוגברת לריצוף וחיפוי גרניט פורצלן; אבן טבעית וקרמיקה בפנים ובחוץ.',
    availability: 'in_stock',
    condition: 'new',
    price: '52.00 ILS',
    sale_price: '46.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/19255',
    image_link: 'https://i.ibb.co/VYwc3mvx/30501.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'מיסטר פיקס',
    identifier_exists: 'no',
    mpn: '19255',
    color: 'אפור',
    size: '25 ק״ג',
    material: 'דבק צמנטי פולימרי',
    product_highlight: 'סיווג אירופי C2TE-S1 | גמישות מרבית | מתאים לריצוף חוץ ופנים',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_HARASH',
    rating: 4.9,
    reviewsCount: 56,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'חצר דבקים וטיח', stockQty: 180 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף דבקים', stockQty: 60 }
    ]
  },

  // 7. שורה 8: מק״ט 10702 - מוסף הדבקה ואיטום סיקה לטקס SBR
  {
    id: '10702',
    title: 'מוסף הדבקה ואיטום סיקה לטקס SBR גלון 5 ק״ג Sika',
    description: 'אמולסיית לטקס להוספה לתערובות מליטה וטיח. משפרת הידבקות; מונעת חדירת מים ומעניקה גמישות גבוהה.',
    availability: 'in_stock',
    condition: 'new',
    price: '85.00 ILS',
    sale_price: '78.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/10702',
    image_link: 'https://i.ibb.co/KcSyD8nS/watermarked-img-11994617598432690143.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '10702',
    color: 'נוזל לבן',
    size: '5 ק״ג',
    material: 'לטקס SBR',
    product_highlight: 'שיפור הידבקות בטון ישן לחדש | חיזוק איטום רולקות | תערובת פולימרית עמידה',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_HARASH',
    rating: 4.9,
    reviewsCount: 39,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מדף מוספים וכימיקלים', stockQty: 140 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף איטום B-02', stockQty: 35 }
    ]
  },

  // 8. שורה 9: מק״ט 111260 - לוח גבס לבן סטנדרטי 260 ס״מ
  {
    id: '111260',
    title: 'לוח גבס לבן סטנדרטי 260 ס״מ (1.20X2.60 עובי 12.5 מ״מ)',
    description: 'לוח גבס סטנדרטי לבניית מחיצות פנים; תקרות והנמכות. מיוצר לפי ת״י 1490. שטח לוח 3.12 מ״ר.',
    availability: 'in_stock',
    condition: 'new',
    price: '42.00 ILS',
    sale_price: '38.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/111260',
    image_link: 'https://i.ibb.co/SDY6vrCY/112260.jpg',
    video_link: 'https://youtu.be/6B0Ih74mpkk?si=F4pGVqn44e1GvPA6',
    brand: 'אורבונד / גבס כנף',
    identifier_exists: 'no',
    mpn: '111260',
    color: 'לבן',
    size: '2.60 מטר',
    material: 'גבס',
    product_highlight: 'ת״י 1490 רשמי | בידוד אקוסטי | הרכבה מהירה וקלה',
    google_product_category: 'Hardware > Building Consumables > Drywall & Wallboard',
    store_code: 'SABAN_TALMID',
    rating: 4.9,
    reviewsCount: 72,
    inStockBranches: [
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מחסן לוחות גבס ראשי', stockQty: 420 },
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'סככת גבס', stockQty: 150 }
    ]
  },

  // 9. שורה 10: מק״ט 112260 - לוח גבס ירוק עמיד לחות 2.60 מטר
  {
    id: '112260',
    title: 'לוח גבס ירוק עמיד לחות 2.60 מטר טמבור (1.20X2.60 עובי 12.5 מ״מ)',
    description: 'לוח גבס ירוק עמיד רטיבות מתוצרת טמבור לחדרי רחצה; מטבחים וחללים לחים. עומד בת״י 1490. שטח לוח 3.12 מ״ר.',
    availability: 'in_stock',
    condition: 'new',
    price: '78.09 ILS',
    sale_price: '70.28 ILS',
    link: 'https://sbn-xi.vercel.app/product/112260',
    image_link: 'https://i.ibb.co/SDY6vrCY/112260.jpg',
    video_link: 'https://youtu.be/6B0Ih74mpkk?si=F4pGVqn44e1GvPA6',
    brand: 'טמבור',
    identifier_exists: 'no',
    mpn: '112260',
    color: 'ירוק',
    size: '2.60 מטר',
    material: 'גבס',
    product_highlight: 'עמיד לחות ורטיבות | ת״י 1490 ללוחות גבס | בידוד אקוסטי ותרמי מעולה',
    google_product_category: 'Hardware > Building Consumables > Drywall & Wallboard',
    store_code: 'SABAN_TALMID',
    rating: 4.9,
    reviewsCount: 65,
    inStockBranches: [
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מחסן לוחות גבס עמידי מים', stockQty: 380 },
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'סככת גבס', stockQty: 110 }
    ]
  },

  // 10. שורה 11: מק״ט 15680 - סיקפלקס 11FC תרמיל אפור
  {
    id: '15680',
    title: 'סיקפלקס 11FC תרמיל 300 מ״ל Sika Sikaflex-11 FC Purform אפור',
    description: 'מסטיק פוליאוריטני רב-תכליתי לאיטום תפרים והדבקה גמישה וחזקה של בטון; מתכת; עץ; אבן וקרמיקה. תקן ISO 11600.',
    availability: 'in_stock',
    condition: 'new',
    price: '42.00 ILS',
    sale_price: '34.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/15680',
    image_link: 'https://i.ibb.co/HfddnMMq/15680.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '15680',
    color: 'אפור',
    size: '300 מ״ל',
    material: 'פוליאוריטן',
    product_highlight: 'עמידות לתנודות ומזג אוויר | כושר הדבקה חזק במיוחד | איטום תפרים גמיש',
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

  // 11. שורה 12: מק״ט 15681 - סיקפלקס 11FC תרמיל לבן
  {
    id: '15681',
    title: 'סיקפלקס 11FC תרמיל 300 מ״ל Sika לבן (Sikaflex-11 FC)',
    description: 'דבק ומסטיק איטום פוליאוריטן לבן של סיקה. איטום פנלים; חיבורי אמבטיה; כיורים ואלמנטים לבנים.',
    availability: 'in_stock',
    condition: 'new',
    price: '42.00 ILS',
    sale_price: '34.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/15681',
    image_link: 'https://i.ibb.co/HfddnMMq/15680.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '15681',
    color: 'לבן',
    size: '300 מ״ל',
    material: 'פוליאוריטן',
    product_highlight: 'גוון לבן בוהק | הדבקה מבנית חזקה | עמיד בפני עובש ורטיבות',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_TALMID',
    rating: 4.9,
    reviewsCount: 41,
    inStockBranches: [
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'דלפק איטום ודבקים', stockQty: 110 },
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מדף איטום', stockQty: 85 }
    ]
  },

  // 12. שורה 13: מק״ט 15682 - סיקפלקס 11FC תרמיל שחור
  {
    id: '15682',
    title: 'סיקפלקס 11FC תרמיל 300 מ״ל Sika שחור (Sikaflex-11 FC)',
    description: 'דבק מסטיק פוליאוריטן שחור לעיגון ספי חלונות; פרופילי אלומיניום שחור; גגות ואיטום הדבקה כבדה.',
    availability: 'in_stock',
    condition: 'new',
    price: '42.00 ILS',
    sale_price: '34.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/15682',
    image_link: 'https://i.ibb.co/HfddnMMq/15680.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '15682',
    color: 'שחור',
    size: '300 מ״ל',
    material: 'פוליאוריטן',
    product_highlight: 'גוון שחור עמיד UV | הדבקת אלמנטים ואלומיניום | עמידות במים מתמידים',
    google_product_category: 'Hardware > Building Consumables > Hardware Glue & Adhesives',
    store_code: 'SABAN_TALMID',
    rating: 4.8,
    reviewsCount: 36,
    inStockBranches: [
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'דלפק איטום', stockQty: 95 },
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מדף דבקים', stockQty: 70 }
    ]
  },

  // 13. שורה 14: מק״ט 9889488 - סופרקריל מט טמבור 10 ליטר (חצי פח)
  {
    id: '9889488',
    title: 'סופרקריל מט טמבור 10 ליטר (חצי פח) גוון 0524T אפור בטון עדין',
    description: 'צבע אקרילי רחיץ מובחר לקירות פנים מבית טמבור. גימור מט מהודר; כושר כיסוי כ-45 עד 50 מ״ר בשתי שכבות.',
    availability: 'in_stock',
    condition: 'new',
    price: '295.00 ILS',
    sale_price: '265.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/9889488',
    image_link: 'https://tambour.co.il/images/supercryl-mat-10l.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-noa-ai.mp4',
    brand: 'טמבור',
    identifier_exists: 'no',
    mpn: '9889488',
    color: 'אפור בטון',
    size: '10 ליטר',
    material: 'אקרילי על בסיס מים',
    product_highlight: 'רחיץ ועמיד בקרצוף | כושר כיסוי גבוה במיוחד | גוון מודרני מבוקש',
    google_product_category: 'Hardware > Building Consumables > Painting Consumables',
    store_code: 'SABAN_HARASH',
    packagingOptions: [
      { id: 'pail-10l', label: 'פח 10 ליטר (חצי פח - מבוקש)', size: '10 ליטר', price: 295, salePrice: 265, coverageM2: 'כ-50 מ״ר (2 שכבות)', isDefault: true },
      { id: 'pail-18l', label: 'פח 18 ליטר (פח גדול לקבלנים)', size: '18 ליטר', price: 440, salePrice: 389, coverageM2: 'כ-90 מ״ר (2 שכבות)' }
    ],
    rating: 4.9,
    reviewsCount: 67,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מדף צבעים ראשי F-01', stockQty: 55 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מחלקת גוונים ומכונת גיוון טמבור', stockQty: 42 }
    ]
  },

  // 14. שורה 15: מק״ט 9889421 - אקווניר ADVANCE מט לבן 15 ליטר פח נירלט
  {
    id: '9889421',
    title: 'אקווניר ADVANCE מט לבן 15 ליטר פח נירלט',
    description: 'צבע אקרילי פרימיום לקירות פנים בטכנולוגיה מתקדמת. עמיד ברחיצה; אנטי-בקטריאלי עם כושר הסתרה גבוה.',
    availability: 'in_stock',
    condition: 'new',
    price: '320.00 ILS',
    sale_price: '285.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/9889421',
    image_link: 'https://tambour.co.il/images/supercryl-mat-10l.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-noa-ai.mp4',
    brand: 'נירלט',
    identifier_exists: 'no',
    mpn: '9889421',
    color: 'לבן',
    size: '15 ליטר',
    material: 'אקרילי מים מתקדם',
    product_highlight: 'כושר כיסוי עד 140 מ״ר לפח | רחיצות מעולה | מראה חלק ואחיד',
    google_product_category: 'Hardware > Building Consumables > Painting Consumables',
    store_code: 'SABAN_HARASH',
    rating: 4.8,
    reviewsCount: 45,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מחלקת צבעי נירלט', stockQty: 60 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף צבע', stockQty: 30 }
    ]
  },

  // 15. שורה 16: מק״ט 11501 - חול ים שטוף שק גדול
  {
    id: '11501',
    title: 'חול ים שטוף שק גדול (בלה כ-800 ק״ג) לבנייה וטיח',
    description: 'חול ים שטוף ונקי ממלחים וחומרים אורגניים; מתאים לתערובות טיח; ריצוף ובטון תקני.',
    availability: 'in_stock',
    condition: 'new',
    price: '135.00 ILS',
    sale_price: '120.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/11501',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'ח. סבן מחצבות',
    identifier_exists: 'no',
    mpn: '11501',
    color: 'צהבהב',
    size: 'בלה',
    material: 'חול ים שטוף',
    product_highlight: 'חול שטוף נקי ממלחים | אחידות גרגיר מושלמת | שק בלה עמיד להנפה במנוף',
    google_product_category: 'Hardware > Building Consumables > Sand',
    store_code: 'SABAN_HARASH',
    rating: 5.0,
    reviewsCount: 88,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'חצר חומרי מליטה ובלות', stockQty: 450 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'חצר איסוף', stockQty: 40 }
    ]
  },

  // 16. שורה 17: מק״ט 11511 - סומסום שק גדול
  {
    id: '11511',
    title: 'סומסום שק גדול (בלה כ-850 ק״ג) מצע תשתית לריצוף',
    description: 'אגרגט סומסום נקי ומנופה 4-9 מ״מ למצע תחת ריצוף גרניט פורצלן וקרמיקה. מונע שקיעות ומבטיח פילוס.',
    availability: 'in_stock',
    condition: 'new',
    price: '150.00 ILS',
    sale_price: '135.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/11511',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'ח. סבן מחצבות',
    identifier_exists: 'no',
    mpn: '11511',
    color: 'אפור בהיר',
    size: 'בלה',
    material: 'אבן גיר מנופה',
    product_highlight: 'אגרגט נקי ללא אבק | תקן מצע ריצוף | ניקוז מים אופטימלי תחת אריחים',
    google_product_category: 'Hardware > Building Consumables > Gravel',
    store_code: 'SABAN_HARASH',
    rating: 4.9,
    reviewsCount: 64,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'חצר חומרי מליטה ובלות', stockQty: 380 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'חצר איסוף', stockQty: 30 }
    ]
  },

  // 17. שורה 18: מק״ט 11551 - טיט מוכן שק גדול
  {
    id: '11551',
    title: 'טיט מוכן שק גדול (בלה כ-850 ק״ג) לבנייה ובלוקים',
    description: 'תערובת טיט מוכנה לבניית בלוקים; מחיצות וטיח. מיוצרת מאגרגטים מובחרים ומוספים פלסטיים.',
    availability: 'in_stock',
    condition: 'new',
    price: '155.00 ILS',
    sale_price: '140.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/11551',
    image_link: 'https://i.ibb.co/0yVzZHt0/10002.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'ח. סבן מחצבות',
    identifier_exists: 'no',
    mpn: '11551',
    color: 'בז׳',
    size: 'בלה',
    material: 'טיט מועשר',
    product_highlight: 'נוחות עבודה מרבית | כושר הדבקה לבלוקים | עמידות לאורך זמן',
    google_product_category: 'Hardware > Building Consumables > Cement & Mortar',
    store_code: 'SABAN_HARASH',
    rating: 4.8,
    reviewsCount: 51,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'חצר חומרי מליטה ובלות', stockQty: 320 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'חצר איסוף', stockQty: 25 }
    ]
  },

  // 18. שורה 19: מק״ט 35010 - מרק שפכטל אמריקאי מוכן להחלקה 28 ק״ג
  {
    id: '35010',
    title: 'מרק שפכטל אמריקאי מוכן להחלקה 28 ק״ג פח טמבור',
    description: 'שפכטל מוכן להחלקה מושלמת של קירות גבס וטיח לפני צבע. קל לשיוף; נוח ליישום ומעניק משטח חלק כראי.',
    availability: 'in_stock',
    condition: 'new',
    price: '75.00 ILS',
    sale_price: '65.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/35010',
    image_link: 'https://i.ibb.co/SDY6vrCY/112260.jpg',
    video_link: 'https://youtu.be/6B0Ih74mpkk?si=F4pGVqn44e1GvPA6',
    brand: 'טמבור',
    identifier_exists: 'no',
    mpn: '35010',
    color: 'לבן',
    size: '28 ק״ג',
    material: 'מרק שפכטל מוכן',
    product_highlight: 'החלקה מושלמת של לוחות גבס | שיוף קל במיוחד | כושר כיסוי גבוה ללא סדקים',
    google_product_category: 'Hardware > Building Consumables > Spackling & Patching Compounds',
    store_code: 'SABAN_HARASH',
    rating: 4.9,
    reviewsCount: 59,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מדף שפכטלים ראשי', stockQty: 80 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'דלפק גבס ושפכטל', stockQty: 90 }
    ]
  },

  // 19. שורה 20: מק״ט 30501 - קצף פוליאוריטן סיקה בום
  {
    id: '30501',
    title: 'קצף פוליאוריטן סיקה בום (Sika Boom-157) מכל 750 מ״ל',
    description: 'קצף פוליאוריטן חד-רכיבי בעל התפשטות מבוקרת לבידוד תרמי; אקוסטי; מילוי מרווחים וקיבוע משקופים וצנרת.',
    availability: 'in_stock',
    condition: 'new',
    price: '40.00 ILS',
    sale_price: '35.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/30501',
    image_link: 'https://i.ibb.co/VYwc3mvx/30501.jpg',
    video_link: 'https://tv-tawny-kappa.vercel.app/videos/saban-builders.mp4',
    brand: 'Sika',
    identifier_exists: 'no',
    mpn: '30501',
    color: 'צהבהב',
    size: '750 מ״ל',
    material: 'פוליאוריטן מוקצף',
    product_highlight: 'תפוקת נפח חופשי כ-35-40 ליטר | בידוד אקוסטי ותרמי | הידבקות מעולה לבטון ועץ',
    google_product_category: 'Hardware > Building Consumables > Insulation',
    store_code: 'SABAN_HARASH',
    rating: 4.8,
    reviewsCount: 47,
    inStockBranches: [
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מדף בידוד וקצפים', stockQty: 110 },
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף פרזול B-12', stockQty: 85 }
    ]
  },

  // 20. שורה 21: מק״ט 76206 - ברגי גבס 25 מ״מ שחורים מושחזים
  {
    id: '76206',
    title: 'ברגי גבס 25 מ״מ שחורים מושחזים (קופסה 1;000 יח׳)',
    description: 'ברגי גבס איכותיים מושחזים עם ראש חצוצרה והברגה מהירה לחיבור לוחות גבס לפרופילי מתכת עד 0.8 מ״מ.',
    availability: 'in_stock',
    condition: 'new',
    price: '36.00 ILS',
    sale_price: '32.00 ILS',
    link: 'https://sbn-xi.vercel.app/product/76206',
    image_link: 'https://i.ibb.co/SDY6vrCY/112260.jpg',
    video_link: 'https://youtu.be/6B0Ih74mpkk?si=F4pGVqn44e1GvPA6',
    brand: 'סבן פרזול',
    identifier_exists: 'no',
    mpn: '76206',
    color: 'שחור',
    size: '1000 יח׳',
    material: 'פלדה מחוסמת פוספט',
    product_highlight: 'ראש חצוצרה שוקע | חדירה חלקה ללא קריעת נייר | ציפוי פוספט שחור למניעת חלודה',
    google_product_category: 'Hardware > Hardware Fasteners > Screws',
    store_code: 'SABAN_TALMID',
    rating: 4.9,
    reviewsCount: 78,
    inStockBranches: [
      { branchCode: 'SABAN_TALMID', branchName: 'סניף התלמיד 6', warehouseLocation: 'מדף פרזול גבס ראשי', stockQty: 250 },
      { branchCode: 'SABAN_HARASH', branchName: 'סניף החרש 4 / 10', warehouseLocation: 'מחסן אספקה טכנית', stockQty: 120 }
    ]
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
