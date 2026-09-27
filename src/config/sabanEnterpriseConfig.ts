/**
 * ח. סבן חומרי בניין (1994) בע״מ (ח.פ 512001678)
 * Enterprise Operational, Logistical & Information Architecture Constitution
 * 
 * כל פעולה, ניתוח נתונים, סידור צי רכב ואינטגרציות כפופים לחוקי הברזל המוגדרים בקובץ זה.
 */

export interface SabanBranchConfig {
  code: 'SABAN_HARASH' | 'SABAN_TALMID';
  name: string;
  subName: string;
  address: string;
  streetNumber: string;
  city: string;
  wazeUrl: string;
  googleMapsUrl: string;
  phone: string;
  directDispatchPhone: string;
  hours: string;
  warehouseCode: string;
  specialty: string;
  dispatchBay: string;
}

export interface FleetDriverConfig {
  driverName: string;
  driverNameEn: string;
  truckModel: string;
  licensePlate: string;
  phone: string;
  specialty: string;
  maxReachMeters?: number;
}

export interface MandatoryDepositRule {
  sku: string;
  title: string;
  price: number;
  description: string;
}

export const SABAN_ENTERPRISE = {
  // 1. זהות ארגונית
  company: {
    legalName: 'ח. סבן חומרי בניין (1994) בע״מ',
    shortName: 'סבן',
    companyNumber: '512001678', // ח.פ
    establishedYear: 1994,
    phone: '03-9518888',
    whatsappCounter: '972508860896',
    websiteUrl: 'https://sbn-xi.vercel.app'
  },

  // מוקדי הפצה ומחסנים
  branches: {
    harash: {
      code: 'SABAN_HARASH',
      name: 'סניף החרש 4 / 10',
      subName: 'מחסן 4 - מרכז לוגיסטי והפצה ראשי',
      address: 'רחוב החרש 4 / 10, אזור התעשייה נווה נאמן',
      streetNumber: '4 / 10',
      city: 'הוד השרון',
      wazeUrl: 'https://waze.com/ul?q=רחוב החרש 10 הוד השרון',
      googleMapsUrl: 'https://maps.google.com/?q=רחוב+החרש+10+הוד+השרון',
      phone: '03-9518888',
      directDispatchPhone: '050-8860896',
      hours: 'א׳-ה׳ 06:30-16:30 | ו׳ 06:30-12:30',
      warehouseCode: 'מחסן 4 (ראשי)',
      specialty: 'מרכז הפצה ראשי לחומרי מליטה, אגרגטים, מלט, בלוקים, ברזל, איטום, צבע ופריקות מנוף',
      dispatchBay: 'רציף איסוף מהיר מס׳ 3 (כניסה למשאיות ומלגזות)'
    } as SabanBranchConfig,

    talmid: {
      code: 'SABAN_TALMID',
      name: 'סניף התלמיד 6',
      subName: 'מחסן 1 - גבס, צבע ומוסך פרזול',
      address: 'רחוב התלמיד 6, אזור התעשייה',
      streetNumber: '6',
      city: 'הוד השרון',
      wazeUrl: 'https://waze.com/ul?q=רחוב התלמיד 6 הוד השרון',
      googleMapsUrl: 'https://maps.google.com/?q=רחוב+התלמיד+6+הוד+השרון',
      phone: '03-9518889',
      directDispatchPhone: '050-8860896',
      hours: 'א׳-ה׳ 06:30-16:30 | ו׳ 06:30-12:30',
      warehouseCode: 'מחסן 1',
      specialty: 'מחסן חומרים קלים, לוחות גבס, פרופילים, צבעים, פרזול וכלי עבודה',
      dispatchBay: 'דלפק אקספרס ואיסוף קבלנים'
    } as SabanBranchConfig
  },

  // 2. מזהי גיליונות קשיחים וחיבור ישיר בלייב (No-Cache Live Sync)
  sheets: {
    // פיד מוצרים ראשי לגוגל (שורות 2 עד 21)
    gmcProductsFeed: {
      id: '1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y',
      name: 'Google Merchant Center Feed - Saban Products',
      description: 'פיד מוצרים ראשי לגוגל. 20 המוצרים המאומתים בשורות 2 עד 21 עם קישורי תמונה וסרטוני הדרכה.',
      exportCsvUrl: 'https://docs.google.com/spreadsheets/d/1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y/export?format=csv',
      gvizCsvUrl: 'https://docs.google.com/spreadsheets/d/1m6rVxo_0hthMf55_pgg0RGegBDby9KKB6_VpCJ86_4Y/gviz/tq?tqx=out:csv'
    },
    // קטלוג שילוט ומדיה
    signageCatalog: {
      id: '1UUnQxlLuPAc5fVfTI277w9ByxFSwrD2giYkoXIPC7sI',
      name: 'שילוט',
      mainTab: '📦 קטלוג_מוצרים',
      description: 'קטלוג שילוט ומדיה. טאב ראשי: 📦 קטלוג_מוצרים (שליפת מוצרים שבהם העמודה active = TRUE).'
    },
    // מערכת תפעול וסידור
    operationsDispatch: {
      id: '1Ie7gKql_EDdrIN9HqunJc9Ey5k0WXXfPRxs0Vp1Bs2c',
      name: 'מערכת מאוחדת - הזמנות, תעודות משלוח והצלבה',
      description: 'קליטת הזמנות חדשות, שיבוץ נהגים ואיסוף עצמי.'
    },
    // נועה AI תפעולית
    noaAiOperations: {
      id: '1VA9J6n9IYcooO_s2xOpnkvyDQWWQD3pfhh0cnenCkoA',
      name: 'נועה Ai',
      description: 'גיליון סידור וסנכרון תפעולי מבוסס AI.'
    }
  },

  // 3. חוקי שיבוץ ציים ולוגיסטיקה
  fleet: {
    hikmat: {
      driverName: 'חכמת',
      driverNameEn: 'Hikmat',
      truckModel: 'משאית מרצדס מנוף כבד',
      licensePlate: '615-41-002',
      phone: '050-8860892',
      specialty: 'הנפת בלות לגובה, משטחי מלט ובלוקים, ופריקות מנוף',
      maxReachMeters: 28
    } as FleetDriverConfig,

    ali: {
      driverName: 'עלי',
      driverNameEn: 'Ali',
      truckModel: 'משאית איסוזו חלוקה',
      licensePlate: '651-51-701',
      phone: '050-8860894',
      specialty: 'הובלות לוחות גבס, פרופילים, צבעים, ציוד קל, פריקה ידנית והובלות ללא פריקה'
    } as FleetDriverConfig
  },

  // 4. פקדונות חובה
  mandatoryDeposits: {
    bigBag: {
      sku: '60002',
      title: 'פקדון שק גדול / בלה (מוחזר במלואו)',
      price: 35.0,
      description: 'פקדון שק גדול / בלה (מק״ט 60002): יחס 1:1 על כל בלת חול, סומסום, טיט, מצע או חמרה.'
    } as MandatoryDepositRule,

    sabanPallet: {
      sku: '60060',
      title: 'פקדון משטח סבן (מוחזר במלואו)',
      price: 45.0,
      description: 'פקדון משטח סבן (מק״ט 60060): אוטומטית לפי סף (משטח לכל 40 שקי מלט/דבק או 20 שקי טיח).'
    } as MandatoryDepositRule
  }
};

/**
 * פונקציה לחישוב פקדונות חובה אוטומטיים לפי חוקי הברזל
 */
export function calculateMandatoryDeposits(cartItems: Array<{ sku: string; title: string; quantity: number }>): {
  bagDepositCount: number;
  palletDepositCount: number;
  bagDepositTotal: number;
  palletDepositTotal: number;
  totalDepositAmount: number;
} {
  let bagDepositCount = 0;
  let cementOrAdhesiveBags = 0;
  let plasterBags = 0;

  for (const item of cartItems) {
    const t = item.title.toLowerCase();
    const s = item.sku.toLowerCase();

    // 1. בדיקת בלות (יחס 1:1 על כל בלת חול, סומסום, טיט, מצע או חמרה)
    if (
      t.includes('בלה') ||
      t.includes('בלת') ||
      s.includes('bag-1') ||
      s.includes('sand-bag') ||
      s.includes('sumsum') ||
      s.includes('tit-bag') ||
      s.includes('matze') ||
      s.includes('hamra')
    ) {
      bagDepositCount += item.quantity;
    }

    // 2. בדיקת שקי מלט או דבק (40 שקים = משטח 1)
    if (
      t.includes('מלט') ||
      t.includes('דבק') ||
      s.includes('10002') ||
      s.includes('nesher') ||
      s.includes('cement')
    ) {
      cementOrAdhesiveBags += item.quantity;
    }

    // 3. בדיקת שקי טיח (20 שקים = משטח 1)
    if (t.includes('טיח')) {
      plasterBags += item.quantity;
    }
  }

  // חישוב משטחים לפי סף
  const palletFromCement = Math.ceil(cementOrAdhesiveBags / 40);
  const palletFromPlaster = Math.ceil(plasterBags / 20);
  const palletDepositCount = (cementOrAdhesiveBags > 0 ? palletFromCement : 0) + (plasterBags > 0 ? palletFromPlaster : 0);

  const bagDepositTotal = bagDepositCount * SABAN_ENTERPRISE.mandatoryDeposits.bigBag.price;
  const palletDepositTotal = palletDepositCount * SABAN_ENTERPRISE.mandatoryDeposits.sabanPallet.price;
  const totalDepositAmount = bagDepositTotal + palletDepositTotal;

  return {
    bagDepositCount,
    palletDepositCount,
    bagDepositTotal,
    palletDepositTotal,
    totalDepositAmount
  };
}

/**
 * פונקציה לשיבוץ משאית ונהג אוטומטית לפי מאפייני ההזמנה
 */
export function assignLogisticsFleet(orderItems: Array<{ title: string; sku: string; quantity: number }>): FleetDriverConfig {
  const requiresCrane = orderItems.some((it) => {
    const t = it.title.toLowerCase();
    const s = it.sku.toLowerCase();
    return (
      t.includes('בלה') ||
      t.includes('חול') ||
      t.includes('סומסום') ||
      t.includes('טיט') ||
      t.includes('מלט') ||
      t.includes('בלוק') ||
      t.includes('ברזל') ||
      s.includes('nesher') ||
      s.includes('sand')
    );
  });

  if (requiresCrane) {
    return SABAN_ENTERPRISE.fleet.hikmat;
  }

  return SABAN_ENTERPRISE.fleet.ali;
}
