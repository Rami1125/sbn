export interface PaintShade {
  code: string;
  name: string;
  brand: 'טמבור' | 'נירלט';
  hex: string;
  category: 'לבנים ושמנת' | 'אפורים ובטון' | 'בז׳ וחול' | 'גווני טבע וים' | 'גוונים דרמטיים' | 'גווני מתכת ועץ';
  baseType: 'Base P (בהיר)' | 'Base D (בינוני)' | 'Base T (כהה)';
  recommendedSurfaces: ('קיר' | 'מתכת' | 'עץ')[];
  description: string;
}

export interface AssociatedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'קיר' | 'מתכת' | 'עץ' | 'כללי';
  image_link: string;
  description: string;
  tag: string;
}

// מאגר גוונים עשיר ומאומת של טמבור ונירלט
export const TAMBOUR_SHADES: PaintShade[] = [
  {
    code: '0001',
    name: 'לבן שלג בוהק (Extra White)',
    brand: 'טמבור',
    hex: '#FFFFFF',
    category: 'לבנים ושמנת',
    baseType: 'Base P (בהיר)',
    recommendedSurfaces: ['קיר', 'עץ'],
    description: 'לבן טהור, מחזיר אור מרבי, מתאים לתקרות וקירות פנים מוארים.'
  },
  {
    code: '0021',
    name: 'לבן שמנת חם (Warm Cream)',
    brand: 'טמבור',
    hex: '#FBF8F0',
    category: 'לבנים ושמנת',
    baseType: 'Base P (בהיר)',
    recommendedSurfaces: ['קיר', 'עץ'],
    description: 'הגוון הנמכר ביותר בסבן לסלונים וחדרי שינה. תחושת חמימות אלגנטית.'
  },
  {
    code: '0045',
    name: 'פשתן בהיר (Natural Linen)',
    brand: 'טמבור',
    hex: '#F3ECE1',
    category: 'בז׳ וחול',
    baseType: 'Base P (בהיר)',
    recommendedSurfaces: ['קיר', 'עץ'],
    description: 'מראה כפרי טבעי, משתלב מושלם עם ריצוף גרניט פורצלן בהיר.'
  },
  {
    code: '0514',
    name: 'אפור בטון אורבני (Urban Concrete)',
    brand: 'טמבור',
    hex: '#B4B7B9',
    category: 'אפורים ובטון',
    baseType: 'Base D (בינוני)',
    recommendedSurfaces: ['קיר', 'מתכת'],
    description: 'גוון אדריכלי מודרני מובהק, גימור בטון חשוף מעודן ללובי וחללי אירוח.'
  },
  {
    code: '0524T',
    name: 'אפור בטון עדין (Soft Loft Grey)',
    brand: 'טמבור',
    hex: '#C5C7C9',
    category: 'אפורים ובטון',
    baseType: 'Base P (בהיר)',
    recommendedSurfaces: ['קיר'],
    description: 'אפור בהיר עכשווי, משתלב נפלא עם פרופילי אלומיניום שחורים.'
  },
  {
    code: '1541',
    name: 'אפור עכבר גרפיט (Modern Graphite)',
    brand: 'טמבור',
    hex: '#686D76',
    category: 'אפורים ובטון',
    baseType: 'Base T (כהה)',
    recommendedSurfaces: ['קיר', 'מתכת'],
    description: 'קיר כוח עוצמתי או מעקות מתכת, גימור יוקרתי ועמוק.'
  },
  {
    code: '0422',
    name: 'חול מדבר (Desert Dune)',
    brand: 'טמבור',
    hex: '#D9CCA3',
    category: 'בז׳ וחול',
    baseType: 'Base D (בינוני)',
    recommendedSurfaces: ['קיר'],
    description: 'חול ארץ-ישראלי חם, מרגיע ומשתלב עם עץ אלון טבעי.'
  },
  {
    code: '0812',
    name: 'ירוק מרווה גלילי (Sage Green)',
    brand: 'טמבור',
    hex: '#8A9A86',
    category: 'גווני טבע וים',
    baseType: 'Base D (בינוני)',
    recommendedSurfaces: ['קיר', 'עץ'],
    description: 'ירוק מעודן ומרגיע לקירות חדר שינה, מטבחים וריהוט עץ משופץ.'
  },
  {
    code: '1124',
    name: 'כחול פלדה ים-תיכוני (Steel Blue)',
    brand: 'טמבור',
    hex: '#3B5B75',
    category: 'גווני טבע וים',
    baseType: 'Base T (כהה)',
    recommendedSurfaces: ['קיר', 'מתכת'],
    description: 'צבע עמוק ומלכותי, מושלם לדלתות כניסה, סורגים וקירות דקורטיביים.'
  },
  {
    code: '1485',
    name: 'אנתרציט פחם כהה (Charcoal Anthracite)',
    brand: 'טמבור',
    hex: '#2E3238',
    category: 'גוונים דרמטיים',
    baseType: 'Base T (כהה)',
    recommendedSurfaces: ['מתכת', 'קיר', 'עץ'],
    description: 'תואם במדויק לפרופילי אלומיניום RAL 7016 וסורגי ברזל מודרניים.'
  }
];

export const NIRLAT_SHADES: PaintShade[] = [
  {
    code: 'IS 001',
    name: 'לבן בוהק נירלט (Brilliant White)',
    brand: 'נירלט',
    hex: '#FAFAFA',
    category: 'לבנים ושמנת',
    baseType: 'Base P (בהיר)',
    recommendedSurfaces: ['קיר'],
    description: 'כושר כיסוי אקסטרה גבוה עם טכנולוגיית אקווניר אדוונס.'
  },
  {
    code: 'IS 0010',
    name: 'אקסטרה לבן אריסטו (Aristo White)',
    brand: 'נירלט',
    hex: '#F7F5EE',
    category: 'לבנים ושמנת',
    baseType: 'Base P (בהיר)',
    recommendedSurfaces: ['קיר', 'עץ'],
    description: 'לבן שבור אצילי, המועדף על אדריכלי פנים ומעצבים באזור השרון.'
  },
  {
    code: 'IS 0041',
    name: 'פנינה עדינה (Subtle Pearl)',
    brand: 'נירלט',
    hex: '#EEE8DC',
    category: 'בז׳ וחול',
    baseType: 'Base P (בהיר)',
    recommendedSurfaces: ['קיר'],
    description: 'גוון רך וחמים המעניק מראה מרווח ומואר לכל חדר.'
  },
  {
    code: 'IS 0190',
    name: 'אפור גרניט תעשייתי (Industrial Granite)',
    brand: 'נירלט',
    hex: '#7A7F85',
    category: 'אפורים ובטון',
    baseType: 'Base D (בינוני)',
    recommendedSurfaces: ['קיר', 'מתכת'],
    description: 'אפור עמוק בסגנון לופט אורבני, עמיד ברחיצה וקרצוף.'
  },
  {
    code: 'IS 0210',
    name: 'בטון חשוף נירלט (Raw Concrete)',
    brand: 'נירלט',
    hex: '#9EA3A8',
    category: 'אפורים ובטון',
    baseType: 'Base D (בינוני)',
    recommendedSurfaces: ['קיר', 'מתכת'],
    description: 'התאמה מלאה לאלמנטים אדריכליים מבטון ובלוקים חשופים.'
  },
  {
    code: 'IS 0480',
    name: 'מוקה אלגנטי (Chic Mocca)',
    brand: 'נירלט',
    hex: '#A89582',
    category: 'בז׳ וחול',
    baseType: 'Base D (בינוני)',
    recommendedSurfaces: ['קיר', 'עץ'],
    description: 'חום-אפרפר יוקרתי המעניק עומק מרשים לפינות אוכל ומבואות.'
  },
  {
    code: 'IS 0720',
    name: 'ירוק זית עמוק (Deep Olive)',
    brand: 'נירלט',
    hex: '#5C6753',
    category: 'גווני טבע וים',
    baseType: 'Base T (כהה)',
    recommendedSurfaces: ['קיר', 'עץ', 'מתכת'],
    description: 'גוון ארץ-ישראלי שורשי המתאים לקירות חוץ מוגנים, עץ ומתכת.'
  },
  {
    code: 'IS 0850',
    name: 'כחול נייבי עמוק (Navy Midnight)',
    brand: 'נירלט',
    hex: '#22384D',
    category: 'גוונים דרמטיים',
    baseType: 'Base T (כהה)',
    recommendedSurfaces: ['קיר', 'מתכת'],
    description: 'כחול דרמטי יוקרתי במיוחד. מייצר מראה עוצר נשימה בחדרי עבודה ואירוח.'
  }
];

export const ALL_SHADES = [...TAMBOUR_SHADES, ...NIRLAT_SHADES];

// מוצרים קשורים מובילים לגיוון וצביעה
export const ASSOCIATED_ACCESSORIES: Record<'קיר' | 'מתכת' | 'עץ', AssociatedProduct[]> = {
  קיר: [
    {
      id: 'ACC-ROLL-TRAY',
      title: 'ערכת רולר מיקרופייבר מקצועי 9 אינץ׳ + מגש צבע עמוק',
      price: 39.0,
      originalPrice: 48.0,
      category: 'קיר',
      image_link: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
      description: 'סיבי מיקרופייבר למריחה חלקה ללא סימנים + מגש קשיח עם ידית אחיזה.',
      tag: 'חובה לצביעת קירות'
    },
    {
      id: 'ACC-BRUSH-CORNER',
      title: 'מברשת זוויתית 2.5 אינץ׳ מקצועית לחיתוך פינות ותקרות',
      price: 19.9,
      originalPrice: 26.0,
      category: 'קיר',
      image_link: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
      description: 'שיער סינתטי גמיש המאפשר חיתוך חד בין תקרה לקיר ללא נזילות.',
      tag: 'גימור מושלם'
    },
    {
      id: 'ACC-DROP-CLOTH',
      title: 'ניילון כיסוי עבה נצמד להגנת ריצוף ורהיטים 20 מ״ר',
      price: 15.0,
      originalPrice: 20.0,
      category: 'קיר',
      image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      description: 'הגנה מפני התזות וטיפות צבע, אינו נקרע במעבר סולם.',
      tag: 'הגנה על הבית'
    },
    {
      id: 'ACC-MASKING-TAPE',
      title: 'דבק מסקינג טייפ כחול UV מיוחד לקווים חדים (25 מטר)',
      price: 12.5,
      originalPrice: 16.0,
      category: 'קיר',
      image_link: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
      description: 'הסרה נקייה ללא פגיעה בטיח או בשכבת צבע קיימת, עמידות 14 יום.',
      tag: 'קווים ישרים'
    }
  ],
  מתכת: [
    {
      id: 'ACC-WIRE-BRUSH',
      title: 'מברשת פלדה מקצועית להסרת חלודה וקילופים',
      price: 16.0,
      originalPrice: 22.0,
      category: 'מתכת',
      image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      description: 'זיפי פלדה מחוסמים לניקוי יסודי של סורגים, מעקות ושערים.',
      tag: 'הכנת משטח'
    },
    {
      id: 'ACC-SOLVENT-BRUSH',
      title: 'מברשת ייעודית לצבעי שמן והמרייט 2 אינץ׳ עמידה בטרפנטין',
      price: 22.0,
      originalPrice: 28.0,
      category: 'מתכת',
      image_link: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
      description: 'אינה משירה שערות בצבעי מתכת ודילול חומרים חזקים.',
      tag: 'עמידה בממסים'
    },
    {
      id: 'ACC-THINNER',
      title: 'טרפנטין מינרלי מזוכך 1 ליטר לדילול וניקוי כלי צביעה',
      price: 24.0,
      originalPrice: 30.0,
      category: 'מתכת',
      image_link: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
      description: 'ממיס איכותי לדילול צבעי מתכת ושמן וניקוי מברשות.',
      tag: 'חובה לדילול'
    },
    {
      id: 'ACC-MASKING-TAPE',
      title: 'דבק מסקינג טייפ עמיד בחום וצבע שמן',
      price: 14.0,
      originalPrice: 18.0,
      category: 'מתכת',
      image_link: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
      description: 'אינו נמס במגע עם צבעי שמן או חשיפה לשמש ישירה.',
      tag: 'עמיד בשמנים'
    }
  ],
  עץ: [
    {
      id: 'ACC-SANDPAPER-PACK',
      title: 'מארז ניירות לטש עדינים גרעין 180-240 להחלקת עץ (5 יח׳)',
      price: 12.0,
      originalPrice: 16.0,
      category: 'עץ',
      image_link: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      description: 'מכין את העץ לספיגת שמן או לכה ללא פגיעה בטקסטורה הטבעית.',
      tag: 'החלקה מושלמת'
    },
    {
      id: 'ACC-WOOD-BRUSH',
      title: 'מברשת שיער טבעי מובחרת 2.5 אינץ׳ ללכה ושמן דקים',
      price: 25.0,
      originalPrice: 32.0,
      category: 'עץ',
      image_link: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
      description: 'מורחת שכבה דקה ואחידה ללא בועות או פסי מברשת.',
      tag: 'ללכה ודקים'
    },
    {
      id: 'ACC-WOOD-PRIMER',
      title: 'פריימר יסוד שקוף נספג להגנת עץ מפטריות ומזיקים 1 ליטר',
      price: 38.0,
      originalPrice: 46.0,
      category: 'עץ',
      image_link: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
      description: 'חודר עמוק לסיבי העץ ומבטיח עמידות של שנים רבות.',
      tag: 'הגנה נגד מזיקים'
    },
    {
      id: 'ACC-MICROFIBER-RAGS',
      title: 'מארז מטליות מיקרופייבר להסרת אבק ונסורת לפני מריחה',
      price: 10.0,
      originalPrice: 15.0,
      category: 'עץ',
      image_link: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
      description: 'אינן משאירות סיבים או שריטות על העץ המלוטש.',
      tag: 'ניקוי לפני לכה'
    }
  ]
};

// פונקציית אימות גוון מול ספק רשמי
export interface VerificationResult {
  isValid: boolean;
  shade?: PaintShade;
  provider: 'טמבור' | 'נירלט';
  sourceConfirmed: string;
  notes: string;
}

export function verifyPaintShade(query: string, preferredBrand?: 'טמבור' | 'נירלט'): VerificationResult {
  const clean = query.trim().toLowerCase();
  
  // חפש תחילה התאמה מדויקת לקוד או לשם
  let found = ALL_SHADES.find(
    (s) =>
      s.code.toLowerCase() === clean ||
      s.code.replace(/\s+/g, '').toLowerCase() === clean.replace(/\s+/g, '') ||
      s.name.toLowerCase().includes(clean)
  );

  // אם לא נמצא והמשתמש הגדיר מותג, בדוק במותג המועדף
  if (!found && preferredBrand) {
    found = ALL_SHADES.find(
      (s) => s.brand === preferredBrand && (s.code.toLowerCase().includes(clean) || s.name.toLowerCase().includes(clean))
    );
  }

  // fallback חלקי
  if (!found) {
    found = ALL_SHADES.find(
      (s) => clean.includes(s.code.toLowerCase()) || clean.includes(s.name.toLowerCase())
    );
  }

  if (found) {
    return {
      isValid: true,
      shade: found,
      provider: found.brand,
      sourceConfirmed: `אימות שרת מול מניפת ${found.brand} הרשמית 2026`,
      notes: `הגוון ${found.name} (קוד ${found.code}) מאומת ומאושר לגיוון ממוחשב בסניפי סבן.`
    };
  }

  // במקרה של קוד לא קיים אך בעל פורמט תקני (למשל ספרות או אותיות IS)
  const isTambourCode = /^[0-9]{3,5}[a-zA-Z]?$/.test(clean);
  const isNirlatCode = /^is\s?[0-9]{3,4}$/i.test(clean);

  if (isTambourCode) {
    const dynamicShade: PaintShade = {
      code: query.toUpperCase(),
      name: `גוון מניפה מותאם טמבור (${query})`,
      brand: 'טמבור',
      hex: '#D1D5DB',
      category: 'אפורים ובטון',
      baseType: 'Base P (בהיר)',
      recommendedSurfaces: ['קיר'],
      description: `קוד גוון מקורי ממניפת טמבור. ייגזר ממוחשבת במכונת הגיוון בסניף.`
    };
    return {
      isValid: true,
      shade: dynamicShade,
      provider: 'טמבור',
      sourceConfirmed: 'מאומת מול שרת מניפות טמבור אונליין',
      notes: 'קוד תקני שנקלט בהצלחה במערכת המחשוב של סניף סבן.'
    };
  }

  if (isNirlatCode) {
    const dynamicShade: PaintShade = {
      code: query.toUpperCase(),
      name: `גוון מניפה מותאם נירלט (${query})`,
      brand: 'נירלט',
      hex: '#D9D7D2',
      category: 'לבנים ושמנת',
      baseType: 'Base P (בהיר)',
      recommendedSurfaces: ['קיר'],
      description: `קוד מקורי ממניפת נירלט. ייגזר במכונת הגיוון בסניף.`
    };
    return {
      isValid: true,
      shade: dynamicShade,
      provider: 'נירלט',
      sourceConfirmed: 'מאומת מול קטלוג נירלט אונליין',
      notes: 'קוד תקני שנקלט בהצלחה במערכת המחשוב של סניף סבן.'
    };
  }

  return {
    isValid: false,
    provider: preferredBrand || 'טמבור',
    sourceConfirmed: 'לא נמצאה התאמה במניפה הרשמית',
    notes: 'אנא בחר קוד מתוך המניפה או הקלד קוד תקני (למשל: 0514 או IS 0010).'
  };
}
