/**
 * Smart WhatsApp Deep-Link Engine for H. Saban Building Materials (1994) Ltd.
 * Generates structured, URI-encoded WhatsApp links for Buy Online, Pick Up In Store (BOPIS).
 */

export type SabanBranchOption =
  | 'סניף החרש 10 (מחסן 4 - מרכז לוגיסטי)'
  | 'סניף התלמיד 6 (מחסן 1 - גבס וצבע)';

export interface WhatsAppColorDetails {
  code: string;
  name: string;
  hex?: string;
  baseType?: string;
}

export interface WhatsAppOrderParams {
  sku: string; // מק״ט קומקס
  productName: string; // שם המוצר המלא
  quantity: number; // כמות יחידות
  unitLabel: string; // פח / גלון / שק / יח׳ / בלה
  colorDetails?: WhatsAppColorDetails; // אם מדובר בצבע מגוון
  branch: SabanBranchOption;
  customerName?: string;
  arrivalTimeEstimate?: string;
  isContractor?: boolean;
  notes?: string;
}

export const SABAN_WHATSAPP_PHONE = '972508860896';
export const SABAN_DISPLAY_PHONE = '050-8860896';

/**
 * Formats the human-readable plain text message for WhatsApp with bold asterisks and clean layout.
 */
export function formatWhatsAppOrderText(params: WhatsAppOrderParams): string {
  const {
    sku,
    productName,
    quantity,
    unitLabel,
    colorDetails,
    branch,
    customerName,
    arrivalTimeEstimate,
    isContractor,
    notes,
  } = params;

  const lines: string[] = [
    '🏗️ *הזמנה מהירה לאיסוף עצמי (BOPIS) - ח. סבן חומרי בניין*',
    'שלום לדלפק ההזמנות, ברצוני להזמין ולשלם טלפונית עבור הפריט הבא:',
    '',
    '📦 *פרטי המוצר:*',
    `• *מק״ט קומקס:* ${sku}`,
    `• *שם מוצר:* ${productName}`,
    `• *כמות מבוקשת:* ${quantity} ${unitLabel}`,
  ];

  if (colorDetails) {
    let colorLine = `• *גוון מבוקש:* ${colorDetails.name} (קוד: ${colorDetails.code})`;
    if (colorDetails.baseType) {
      colorLine += ` | בסיס: ${colorDetails.baseType}`;
    }
    lines.push(colorLine);
  }

  lines.push('');
  lines.push('📍 *יעד איסוף מהסניף:*');
  lines.push(`• *סניף נבחר:* ${branch}`);

  if (customerName && customerName.trim()) {
    lines.push(`• *שם הלקוח / חברה:* ${customerName.trim()}`);
  }

  if (isContractor) {
    lines.push('• *סיווג לקוח:* קבלן / בעל מקצוע (מחיר קבלן)');
  }

  if (arrivalTimeEstimate && arrivalTimeEstimate.trim()) {
    lines.push(`• *זמן הגעה משוער:* ${arrivalTimeEstimate.trim()}`);
  }

  if (notes && notes.trim()) {
    lines.push(`• *הערות ודגשים:* ${notes.trim()}`);
  }

  lines.push('');
  lines.push('💳 *אופן סגירה:* אשמח לקבל אישור ושיחה/חיוב טלפוני מהיר כדי שההזמנה תמתין לי מוכנה בדלפק.');
  lines.push('תודה רבה!');

  return lines.join('\n');
}

/**
 * Generates an encoded direct WhatsApp deep-link URL (wa.me) for instant desktop or mobile launch.
 *
 * @param params Full order details structured according to WhatsAppOrderParams
 * @param phone Target phone number in international format without plus sign (default: 972508860896)
 * @returns Fully formatted https://wa.me link with encoded text
 */
export function generateWhatsAppOrderLink(
  params: WhatsAppOrderParams,
  phone: string = SABAN_WHATSAPP_PHONE
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = formatWhatsAppOrderText(params);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Generates a ready-for-pickup notification text for branch desk staff to notify the customer.
 *
 * @param customerName Customer's full name or company
 * @param orderId Saban / Comax order number
 * @param branchName Fulfillment branch location
 * @returns Ready-for-pickup message in Hebrew
 */
export function generateReadyForPickupMessage(
  customerName: string,
  orderId: string,
  branchName: string
): string {
  const lines: string[] = [
    `שלום *${customerName}*,`,
    `הזמנתך מס׳ *#${orderId}* בחברת *ח. סבן חומרי בניין (1994) בע״מ* נארזה, נבדקה וממתינה לך בדלפק המהיר! 🏗️📦`,
    '',
    `📍 *סניף לאיסוף:* ${branchName}`,
    '⏱️ *שעות פתיחה לאיסוף:*',
    '• ימים א׳-ה׳: 06:30 עד 17:00 (רצוף)',
    '• יום ו׳ וערבי חג: 06:30 עד 13:00',
    '',
    '🚗 אנא היכנס למתחם, החנה בחניית הלקוחות וגש ישירות לדלפק "איסוף מהיר" עם מספר ההזמנה.',
    'נשמח לראותכם!',
    'צוות ח. סבן חומרי בניין',
  ];

  return lines.join('\n');
}

/**
 * Helper to generate a direct WhatsApp link to send the pickup ready message to the customer.
 */
export function generateReadyForPickupLink(
  customerName: string,
  orderId: string,
  branchName: string,
  customerPhone: string
): string {
  const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
  const normalizedPhone = cleanPhone.startsWith('0')
    ? '972' + cleanPhone.slice(1)
    : cleanPhone;

  const message = generateReadyForPickupMessage(customerName, orderId, branchName);
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
