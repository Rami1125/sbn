/**
 * ============================================================================
 * ח. סבן חומרי בניין (1994) בע״מ - מערכת קליטת לידים מועדון לקוחות וקבלנים
 * Google Apps Script Web App API (Code.gs)
 * ============================================================================
 * 
 * תיאור:
 * מודול עצמאי ומאובטח לקליטת לידים מדף הנחיתה (Vercel / React / Webhook),
 * הזרקתם ישירות ל-Google Sheets עם נעילת Concurrency, עיצוב אוטומטי (RTL),
 * ושליחת התראות מיידיות בדוא״ל ובוואטסאפ/Webhook.
 */

// ==========================================
// 1. הגדרות וקונפיגורציה מרכזית (CONFIG)
// ==========================================
const CONFIG = {
  // שם הטאב הייעודי בגיליון
  SHEET_NAME: 'לידים מועדון',

  // כתובת מייל לקבלת התראות מיידיות על כל ליד חדש
  NOTIFICATION_EMAIL: 'rami.msarwa1@gmail.com',

  // כתובת Webhook אופציונלית (Make / Zapier / WhatsApp Gateway)
  // השאר ריק אם אינך משתמש ב-Webhook חיצוני כעת
  EXTERNAL_WEBHOOK_URL: '',

  // אזור זמן ישראלי
  TIMEZONE: 'Asia/Jerusalem',

  // פורמט תאריך ושעה
  DATE_FORMAT: 'yyyy-MM-dd HH:mm:ss',

  // סטטוס ברירת מחדל לליד חדש
  DEFAULT_STATUS: 'חדש לטיפול',

  // צבעי מיתוג לעיצוב הכותרות
  HEADER_BG_COLOR: '#1D2124',
  HEADER_FONT_COLOR: '#F5B301',

  // רשימת שורת הכותרות
  HEADERS: [
    'תאריך ושעה',
    'שם מלא',
    'טלפון',
    'עיר',
    'סוג לקוח',
    'מקור',
    'סטטוס טיפול'
  ]
};

// ==========================================
// 2. נקודת קצה לקליטת נתונים (POST Web App API)
// ==========================================
function doPost(e) {
  // הפעלת מנעול סקריפט למניעת דריסת שורות בעומס מקבילי (Concurrency Lock)
  const lock = LockService.getScriptLock();
  
  try {
    // המתנה לקבלת מנעול עד 30 שניות
    const hasLock = lock.tryLock(30000);
    if (!hasLock) {
      return createJsonResponse({
        ok: false,
        error: 'שרת הגיליון עמוס כעת (Lock Timeout). נסה שנית בעוד מספר שניות.'
      }, 503);
    }

    // אימות קיום תוכן בבקשה
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        ok: false,
        error: 'לא התקבל גוף בקשה (Payload empty)'
      }, 400);
    }

    // פענוח ה-JSON
    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        ok: false,
        error: 'מבנה JSON אינו תקין: ' + parseErr.message
      }, 400);
    }

    // פירוק ונרמול השדות מהבקשה
    const name = (payload.name || payload.fullName || '').toString().trim();
    const phone = (payload.phone || payload.phoneNumber || '').toString().trim();
    const city = (payload.city || payload.preferredBranch || 'הוד השרון והסביבה').toString().trim();
    const type = (payload.type || payload.contractorType || 'קבלן / לקוח מועדון').toString().trim();
    const source = (payload.source || 'דף נחיתה מועדון סבן (Vercel)').toString().trim();
    
    // בדיקת שדות חובה בסיסיים
    if (!name || !phone) {
      return createJsonResponse({
        ok: false,
        error: 'שדות חובה חסרים: name ו-phone הינם שדות נדרשים'
      }, 422);
    }

    // המרת תאריך לפורמט ישראלי תקני (Asia/Jerusalem)
    const now = payload.createdAt ? new Date(payload.createdAt) : new Date();
    const formattedDate = Utilities.formatDate(now, CONFIG.TIMEZONE, CONFIG.DATE_FORMAT);

    // השגת גיליון היעד (כולל יצירה ועיצוב אם אינו קיים)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = getOrCreateLeadsSheet(ss);

    // הכנת השורה להזרקה לגיליון
    const rowData = [
      formattedDate,
      name,
      phone,
      city,
      type,
      source,
      CONFIG.DEFAULT_STATUS
    ];

    // הזרקת השורה לגיליון
    sheet.appendRow(rowData);
    const lastRowIndex = sheet.getLastRow();

    // עיצוב שורת הנתונים החדשה: יישור לימין, גובה שורה ופונט
    const dataRange = sheet.getRange(lastRowIndex, 1, 1, CONFIG.HEADERS.length);
    dataRange
      .setHorizontalAlignment('right')
      .setVerticalAlignment('middle')
      .setFontFamily('Arial')
      .setFontSize(10);

    // עיצוב ספציפי לעמודת הטלפון (פורמט טקסט רגיל כדי למנוע השמטת 0 מוביל)
    sheet.getRange(lastRowIndex, 3).setNumberFormat('@');

    // שחרור מנעול הסקריפט מיד לאחר כתיבת השורה
    lock.releaseLock();

    // שליחת התראת מייל מיידית
    sendInstantEmailNotification({
      name: name,
      phone: phone,
      city: city,
      type: type,
      source: source,
      formattedDate: formattedDate,
      rowIndex: lastRowIndex
    });

    // שליחת התראה ל-Webhook חיצוני (אם מוגדר)
    if (CONFIG.EXTERNAL_WEBHOOK_URL && CONFIG.EXTERNAL_WEBHOOK_URL.trim() !== '') {
      sendWebhookNotification({
        name: name,
        phone: phone,
        city: city,
        type: type,
        source: source,
        createdAt: formattedDate,
        rowNumber: lastRowIndex
      });
    }

    // החזרת תשובת הצלחה מלאה
    return createJsonResponse({
      ok: true,
      message: 'הליד נקלט בהצלחה בגיליון מועדון סבן',
      leadId: 'SBN-' + lastRowIndex,
      data: {
        row: lastRowIndex,
        name: name,
        phone: phone,
        city: city,
        type: type,
        createdAt: formattedDate
      }
    }, 200);

  } catch (err) {
    // שחרור מנעול במקרה של שגיאה
    if (lock.hasLock()) {
      lock.releaseLock();
    }
    
    // תיעוד השגיאה בלוג
    Logger.log('Critical Error in doPost: ' + err.toString());

    return createJsonResponse({
      ok: false,
      error: 'שגיאה בעיבוד הבקשה: ' + err.message
    }, 500);
  }
}

// ==========================================
// 3. נקודת קצה לבדיקת תקינות (GET Web App API)
// ==========================================
function doGet(e) {
  return createJsonResponse({
    ok: true,
    status: 'Active',
    service: 'Saban Building Materials - Club Leads Ingestion API',
    company: 'ח. סבן חומרי בניין (1994) בע״מ',
    sheetName: CONFIG.SHEET_NAME,
    timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, CONFIG.DATE_FORMAT),
    instructions: 'שלח בקשת POST מסוג application/json עם השדות: name, phone, city, type, source'
  }, 200);
}

// ==========================================
// 4. יצירה ועיצוב טאב "לידים מועדון" (RTL)
// ==========================================
function getOrCreateLeadsSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    // יצירת הטאב אם אינו קיים
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    
    // הגדרת כיוון מימין לשמאל (RTL)
    sheet.setRightToLeft(true);

    // הזרקת שורת הכותרות
    const headerRange = sheet.getRange(1, 1, 1, CONFIG.HEADERS.length);
    headerRange.setValues([CONFIG.HEADERS]);

    // עיצוב שורת הכותרות לפי הדרישות:
    // רקע כהה (#1D2124), פונט צהוב/זהב (#F5B301), טקסט מודגש וממורכז
    headerRange
      .setBackground(CONFIG.HEADER_BG_COLOR)
      .setFontColor(CONFIG.HEADER_FONT_COLOR)
      .setFontWeight('bold')
      .setFontFamily('Arial')
      .setFontSize(11)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setWrap(false);

    // גובה שורת הכותרת: 36 פיקסלים
    sheet.setRowHeight(1, 36);

    // הקפאת שורת הכותרת (Freeze Row 1)
    sheet.setFrozenRows(1);

    // התאמת רוחב עמודות בסיסי ראשוני לקריאות מרבית
    const initialWidths = [160, 180, 140, 160, 200, 220, 130];
    for (let i = 0; i < initialWidths.length; i++) {
      sheet.setColumnWidth(i + 1, initialWidths[i]);
    }
  }

  return sheet;
}

// ==========================================
// 5. התראת מייל מיידית (MailApp)
// ==========================================
function sendInstantEmailNotification(lead) {
  try {
    if (!CONFIG.NOTIFICATION_EMAIL) return;

    const subject = '⭐ ליד חדש הצטרף למועדון: ' + lead.name;
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');

    // גוף המייל בפורמט HTML יוקרתי ומעוצב
    const htmlBody = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background-color: ${CONFIG.HEADER_BG_COLOR}; padding: 20px 24px; text-align: center; border-bottom: 3px solid ${CONFIG.HEADER_FONT_COLOR};">
          <h2 style="color: ${CONFIG.HEADER_FONT_COLOR}; margin: 0; font-size: 20px; font-weight: 800;">
            ח. סבן חומרי בניין (1994) בע״מ
          </h2>
          <p style="color: #cbd5e1; margin: 4px 0 0 0; font-size: 13px;">
            התקבלה הצטרפות חדשה למועדון הלקוחות והקבלנים
          </p>
        </div>

        <!-- Content Body -->
        <div style="padding: 24px; color: #1e293b;">
          <h3 style="color: #0f3e7a; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
            פרטי הליד שהתקבל:
          </h3>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #64748b; width: 35%;">שם מלא:</td>
              <td style="padding: 10px 8px; font-weight: bold; color: #0f172a; font-size: 16px;">${lead.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #64748b;">טלפון ליצירת קשר:</td>
              <td style="padding: 10px 8px;">
                <a href="tel:${cleanPhone}" style="color: #0f3e7a; font-weight: bold; font-family: monospace; font-size: 16px; text-decoration: none; background: #f8fafc; padding: 4px 8px; border-radius: 6px; border: 1px solid #cbd5e1;">
                  📞 ${lead.phone}
                </a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #64748b;">עיר / סניף מועדף:</td>
              <td style="padding: 10px 8px; color: #334155;">${lead.city}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #64748b;">סוג לקוח / תחום:</td>
              <td style="padding: 10px 8px; color: #334155;">
                <span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 6px; font-weight: bold; font-size: 12px;">
                  ${lead.type}
                </span>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #64748b;">מקור ההרשמה:</td>
              <td style="padding: 10px 8px; color: #64748b;">${lead.source}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #64748b;">תאריך ושעת רישום:</td>
              <td style="padding: 10px 8px; color: #64748b; font-family: monospace;">${lead.formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; font-weight: bold; color: #64748b;">מיקום בגיליון:</td>
              <td style="padding: 10px 8px; color: #64748b;">שורה מס׳ ${lead.rowIndex} בטאב "${CONFIG.SHEET_NAME}"</td>
            </tr>
          </table>

          <!-- Action Buttons in Email -->
          <div style="margin-top: 24px; text-align: center;">
            <a href="tel:${cleanPhone}" style="display: inline-block; background-color: #0f3e7a; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; margin-left: 8px;">
              חיוג ישיר ללקוח
            </a>
            <a href="https://wa.me/972${cleanPhone.replace(/^0/, '')}" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              פתיחת שיחת WhatsApp
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 14px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          מערכת ניהול לידים אוטומטית • סבן חומרי בניין (החרש 10 / התלמיד 6 הוד השרון)
        </div>

      </div>
    `;

    // גרסת טקסט פשוט כגיבוי
    const plainBody = 
      'ליד חדש הצטרף למועדון סבן!\n\n' +
      'שם מלא: ' + lead.name + '\n' +
      'טלפון: ' + lead.phone + '\n' +
      'עיר/סניף: ' + lead.city + '\n' +
      'סוג לקוח: ' + lead.type + '\n' +
      'מקור: ' + lead.source + '\n' +
      'תאריך רישום: ' + lead.formattedDate + '\n' +
      'שורה בגיליון: ' + lead.rowIndex;

    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });

  } catch (mailErr) {
    Logger.log('Warning: Email notification failed: ' + mailErr.toString());
  }
}

// ==========================================
// 6. שליחת התראה ל-Webhook חיצוני (אופציונלי)
// ==========================================
function sendWebhookNotification(data) {
  try {
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(data),
      muteHttpExceptions: true
    };
    UrlFetchApp.fetch(CONFIG.EXTERNAL_WEBHOOK_URL, options);
  } catch (webhookErr) {
    Logger.log('Warning: External Webhook dispatch failed: ' + webhookErr.toString());
  }
}

// ==========================================
// 7. עזר להחזרת תשובת JSON תקנית
// ==========================================
function createJsonResponse(data, statusCode) {
  const jsonString = JSON.stringify(data);
  return ContentService
    .createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON);
}

// ==========================================
// 8. פונקציית בדיקה ידנית (Test Function)
// ==========================================
/**
 * הרץ פונקציה זו ישירות מעורך הסקריפט (Run -> testLeadInsertion)
 * כדי לבדוק יצירת טאב, הזרקת ליד, עיצוב שורות ושליחת מייל.
 */
function testLeadInsertion() {
  Logger.log('--- מתחיל בדיקת הזרקת ליד לדוגמה ---');

  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'ישראל ישראלי (בדיקת מערכת)',
        phone: '050-8860896',
        city: 'הוד השרון',
        type: 'קבלן שלד ואיטום',
        source: 'בדיקת מערכת יזומה - Apps Script Test',
        createdAt: new Date().toISOString()
      })
    }
  };

  const response = doPost(mockEvent);
  const resultText = response.getContent();
  Logger.log('תשובת המערכת: ' + resultText);

  const resultObj = JSON.parse(resultText);
  if (resultObj.ok) {
    Logger.log('✅ הבדיקה עברה בהצלחה! השורה נוספה לגיליון ונשלח מייל התראה.');
  } else {
    Logger.log('❌ הבדיקה נכשלה: ' + resultObj.error);
  }
}
