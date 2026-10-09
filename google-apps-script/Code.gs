/**
 * מועדון לקוחות ח. סבן חומרי בניין - קליטת לידים מדף נחיתה
 * Web App: doPost מקבל JSON, כותב ל-Google Sheets, שולח מייל והתראה אופציונלית ל-Webhook.
 */

// ===================== קונפיגורציה =====================
var CONFIG = {
  SPREADSHEET_ID: '',            // ריק = הגיליון שאליו הסקריפט מקושר (Extensions > Apps Script). לסקריפט עצמאי: הדביקו כאן את מזהה הגיליון.
  SHEET_NAME: 'לידים מועדון',
  TIMEZONE: 'Asia/Jerusalem',
  DATE_FORMAT: 'yyyy-MM-dd HH:mm:ss',
  NOTIFY_EMAIL: 'rami.msarwa1@gmail.com', // ריק = המייל של בעל הסקריפט. ניתן לכמה כתובות מופרדות בפסיק.
  EXTERNAL_WEBHOOK_URL: '',      // אופציונלי: כתובת Webhook של Make / WhatsApp API וכו'. ריק = כבוי.
  DEFAULT_STATUS: 'חדש',
  LOCK_WAIT_MS: 30000
};

var COMAX_SHEET_NAME = 'כרטיסי לקוח Comax';
var COMAX_HEADERS = ['תאריך ושעה', 'סוג ישות', 'שם / שם חברה', 'ח.פ / ע.מ / ת.ז', 'טלפון', 'אימייל', 'עיר', 'כתובת', 'סיווג פעילות', 'איש קשר בשטח', 'טלפון איש קשר', 'מקור', 'סטטוס טיפול'];
var COMAX_WIDTHS = [160, 120, 190, 130, 120, 200, 110, 190, 130, 140, 120, 140, 120];
var HEADERS = ['תאריך ושעה', 'שם מלא', 'טלפון', 'עיר', 'סוג לקוח', 'מקור', 'סטטוס טיפול'];
var COLUMN_WIDTHS = [160, 170, 130, 130, 120, 160, 130];

// ===================== נקודות כניסה של ה-Web App =====================

function doPost(e) {
  var raw = null;
  try { raw = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (x) {}
  if (raw && raw.businessId !== undefined) return handleComax_(raw);

  var lock = LockService.getScriptLock();
  var lead;
  var rowNumber;

  try {
    lead = parsePayload_(e);
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err.message || err) });
  }

  try {
    lock.waitLock(CONFIG.LOCK_WAIT_MS);
  } catch (err) {
    return jsonResponse_({ ok: false, error: 'השרת עמוס, נסו שוב בעוד רגע' });
  }

  try {
    var sheet = getOrCreateSheet_();
    rowNumber = sheet.getLastRow() + 1;
    var values = [[
      lead.createdAtText,
      lead.name,
      lead.phone,
      lead.city,
      lead.type,
      lead.source,
      CONFIG.DEFAULT_STATUS
    ]];
    var range = sheet.getRange(rowNumber, 1, 1, HEADERS.length);
    range.setNumberFormat('@');                 // שומר טלפון ותאריך כטקסט (שומר על 0 מוביל)
    range.setValues(values);
    range.setHorizontalAlignment('right');
    range.setVerticalAlignment('middle');
    SpreadsheetApp.flush();
  } catch (err) {
    console.error('Insert failed: ' + err);
    return jsonResponse_({ ok: false, error: 'שגיאה בשמירת הליד: ' + String(err.message || err) });
  } finally {
    lock.releaseLock();
  }

  // התראות מחוץ ל-Lock: כשל בהתראה לא מבטל ליד שכבר נשמר.
  var warnings = [];
  try {
    sendEmailNotification_(lead);
  } catch (err) {
    console.error('Email failed: ' + err);
    warnings.push('email: ' + String(err.message || err));
  }
  try {
    sendExternalWebhook_(lead, rowNumber);
  } catch (err) {
    console.error('Webhook failed: ' + err);
    warnings.push('webhook: ' + String(err.message || err));
  }

  var response = { ok: true, row: rowNumber };
  if (warnings.length) response.warnings = warnings;
  return jsonResponse_(response);
}

/** בדיקת תקינות מהדפדפן: פתחו את כתובת ה-/exec ותראו ok:true */
function doGet() {
  return jsonResponse_({ ok: true, service: 'saban-club-leads', sheet: CONFIG.SHEET_NAME });
}

// ===================== פירוק ואימות Payload =====================

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('לא התקבל מידע (Body ריק)');
  }
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    throw new Error('JSON לא תקין');
  }

  var name = cleanText_(data.name, 80);
  var phone = cleanText_(data.phone, 30);
  var digits = phone.replace(/\D/g, '');

  if (!name) throw new Error('חסר שם מלא');
  if (digits.length < 9) throw new Error('מספר טלפון לא תקין');

  var created = data.createdAt ? new Date(data.createdAt) : new Date();
  if (isNaN(created.getTime())) created = new Date();

  return {
    name: name,
    phone: phone,
    city: cleanText_(data.city, 60),
    type: cleanText_(data.type, 40),
    source: cleanText_(data.source, 60) || 'landing-page',
    createdAtText: Utilities.formatDate(created, CONFIG.TIMEZONE, CONFIG.DATE_FORMAT)
  };
}

/** ניקוי טקסט + הגנה מהזרקת נוסחאות לגיליון (= + - @ בתחילת תא) */
function cleanText_(value, maxLen) {
  var s = (value === undefined || value === null) ? '' : String(value);
  s = s.replace(/[\u0000-\u001F\u007F]/g, ' ').trim();
  if (s.length > maxLen) s = s.substring(0, maxLen);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

// ===================== יצירה ועיצוב הטאב =====================

function getOrCreateSheet_(name, headers, widths) {
  name = name || CONFIG.SHEET_NAME;
  var ss = CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('לא נמצא גיליון. קשרו את הסקריפט לגיליון או הגדירו SPREADSHEET_ID');
  }

  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.setRightToLeft(true);
    formatHeader_(sheet, headers, widths);
  } else if (sheet.getLastRow() === 0) {
    sheet.setRightToLeft(true);
    formatHeader_(sheet, headers, widths);
  }
  return sheet;
}

function formatHeader_(sheet, headers, widths) {
  headers = headers || HEADERS;
  widths = widths || COLUMN_WIDTHS;
  var maxCols = sheet.getMaxColumns();
  if (maxCols < headers.length) {
    sheet.insertColumnsAfter(maxCols, headers.length - maxCols);
  }

  var header = sheet.getRange(1, 1, 1, headers.length);
  header.setValues([headers]);
  header.setBackground('#1D2124');
  header.setFontColor('#F5B301');
  header.setFontWeight('bold');
  header.setFontSize(12);
  header.setHorizontalAlignment('center');
  header.setVerticalAlignment('middle');

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 36);

  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }
}

/** הרצה ידנית אחת מהעורך: יוצרת את הטאב ומאשרת הרשאות */
function setupSheet() {
  var sheet = getOrCreateSheet_();
  Logger.log('הטאב מוכן: ' + sheet.getName());
}

// ===================== התראות =====================

function sendEmailNotification_(lead) {
  var to = CONFIG.NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  if (!to) throw new Error('לא הוגדרה כתובת מייל להתראה');

  var telDigits = lead.phone.replace(/[^\d+]/g, '');
  var subject = 'ליד חדש הצטרף למועדון: ' + lead.name;

  var rows = [
    ['שם מלא', escapeHtml_(lead.name)],
    ['טלפון', '<a href="tel:' + escapeHtml_(telDigits) + '">' + escapeHtml_(lead.phone) + '</a>'],
    ['עיר', escapeHtml_(lead.city) || '-'],
    ['סוג לקוח', escapeHtml_(lead.type) || '-'],
    ['מקור', escapeHtml_(lead.source)],
    ['תאריך רישום', escapeHtml_(lead.createdAtText)]
  ];

  var tableRows = rows.map(function (r) {
    return '<tr>' +
      '<td style="padding:8px 14px;background:#F6F4EF;font-weight:bold;border-bottom:1px solid #D8D5CE;">' + r[0] + '</td>' +
      '<td style="padding:8px 14px;border-bottom:1px solid #D8D5CE;">' + r[1] + '</td>' +
      '</tr>';
  }).join('');

  var htmlBody =
    '<div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1D2124;max-width:520px;">' +
    '<div style="background:#1D2124;color:#F5B301;padding:14px 18px;font-size:18px;font-weight:bold;">ליד חדש במועדון הלקוחות</div>' +
    '<table style="width:100%;border-collapse:collapse;border:1px solid #D8D5CE;">' + tableRows + '</table>' +
    '<p style="color:#5D625F;font-size:13px;">הליד נוסף לטאב "' + escapeHtml_(CONFIG.SHEET_NAME) + '" בסטטוס "' + escapeHtml_(CONFIG.DEFAULT_STATUS) + '".</p>' +
    '</div>';

  var plainBody =
    'ליד חדש הצטרף למועדון\n\n' +
    'שם מלא: ' + lead.name + '\n' +
    'טלפון: ' + lead.phone + '\n' +
    'עיר: ' + (lead.city || '-') + '\n' +
    'סוג לקוח: ' + (lead.type || '-') + '\n' +
    'מקור: ' + lead.source + '\n' +
    'תאריך רישום: ' + lead.createdAtText + '\n';

  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: 'מועדון לקוחות ח. סבן'
  });
}

function sendExternalWebhook_(lead, rowNumber) {
  if (!CONFIG.EXTERNAL_WEBHOOK_URL) return;

  var payload = {
    event: 'new_club_lead',
    name: lead.name,
    phone: lead.phone,
    city: lead.city,
    type: lead.type,
    source: lead.source,
    createdAt: lead.createdAtText,
    sheet: CONFIG.SHEET_NAME,
    row: rowNumber
  };

  var res = UrlFetchApp.fetch(CONFIG.EXTERNAL_WEBHOOK_URL, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  var code = res.getResponseCode();
  if (code < 200 || code >= 300) {
    throw new Error('Webhook החזיר סטטוס ' + code);
  }
}


// ===================== פורטל כרטיס לקוח עסקי (Comax) =====================

function handleComax_(d) {
  var rec;
  try {
    var bid = String(d.businessId || '').replace(/\D/g, '');
    var phone = cleanText_(d.phone, 30);
    var name = cleanText_(d.clientName, 100);
    if (!name) throw new Error('חסר שם לקוח / שם חברה');
    if (bid.length < 8 || bid.length > 9) throw new Error('מספר ח.פ / ע.מ / ת.ז לא תקין');
    if (phone.replace(/\D/g, '').length < 9) throw new Error('מספר טלפון לא תקין');
    var created = d.createdAt ? new Date(d.createdAt) : new Date();
    if (isNaN(created.getTime())) created = new Date();
    rec = {
      createdAtText: Utilities.formatDate(created, CONFIG.TIMEZONE, CONFIG.DATE_FORMAT),
      companyType: cleanText_(d.companyType, 40), clientName: name, businessId: bid, phone: phone,
      email: cleanText_(d.email, 120), city: cleanText_(d.city, 60), address: cleanText_(d.address, 120),
      activityType: cleanText_(d.activityType, 60), fieldContactName: cleanText_(d.fieldContactName, 80),
      fieldContactPhone: cleanText_(d.fieldContactPhone, 30), source: cleanText_(d.source, 60) || 'comax-web-portal'
    };
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err.message || err) });
  }

  var lock = LockService.getScriptLock();
  try { lock.waitLock(CONFIG.LOCK_WAIT_MS); } catch (err) { return jsonResponse_({ ok: false, error: 'השרת עמוס, נסו שוב בעוד רגע' }); }
  var rowNumber;
  try {
    var sheet = getOrCreateSheet_(COMAX_SHEET_NAME, COMAX_HEADERS, COMAX_WIDTHS);
    rowNumber = sheet.getLastRow() + 1;
    var range = sheet.getRange(rowNumber, 1, 1, COMAX_HEADERS.length);
    range.setNumberFormat('@');
    range.setValues([[rec.createdAtText, rec.companyType, rec.clientName, rec.businessId, rec.phone, rec.email, rec.city,
      rec.address, rec.activityType, rec.fieldContactName, rec.fieldContactPhone, rec.source, CONFIG.DEFAULT_STATUS]]);
    range.setHorizontalAlignment('right');
    range.setVerticalAlignment('middle');
    SpreadsheetApp.flush();
  } catch (err) {
    console.error('Comax insert failed: ' + err);
    return jsonResponse_({ ok: false, error: 'שגיאה בשמירת הלקוח: ' + String(err.message || err) });
  } finally {
    lock.releaseLock();
  }

  var warnings = [];
  try { sendComaxEmail_(rec); } catch (err) { console.error(err); warnings.push('email: ' + String(err.message || err)); }
  try {
    sendExternalWebhook_({ name: rec.clientName, phone: rec.phone, city: rec.city, type: rec.companyType, source: rec.source, createdAtText: rec.createdAtText }, rowNumber);
  } catch (err) { console.error(err); warnings.push('webhook: ' + String(err.message || err)); }

  var out = { ok: true, row: rowNumber };
  if (warnings.length) out.warnings = warnings;
  return jsonResponse_(out);
}

function sendComaxEmail_(r) {
  var to = CONFIG.NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  if (!to) throw new Error('לא הוגדרה כתובת מייל להתראה');
  var rows = [
    ['סוג ישות', escapeHtml_(r.companyType)], ['שם / חברה', escapeHtml_(r.clientName)],
    ['ח.פ / ע.מ / ת.ז', escapeHtml_(r.businessId)],
    ['טלפון', '<a href="tel:' + escapeHtml_(r.phone.replace(/[^\d+]/g, '')) + '">' + escapeHtml_(r.phone) + '</a>'],
    ['אימייל', '<a href="mailto:' + escapeHtml_(r.email) + '">' + escapeHtml_(r.email) + '</a>'],
    ['כתובת', escapeHtml_(r.address + ', ' + r.city)], ['סיווג פעילות', escapeHtml_(r.activityType)],
    ['איש קשר בשטח', escapeHtml_((r.fieldContactName + ' ' + r.fieldContactPhone).trim()) || '-'],
    ['תאריך רישום', escapeHtml_(r.createdAtText)]
  ];
  var tr = rows.map(function (x) {
    return '<tr><td style="padding:8px 14px;background:#F6F4EF;font-weight:bold;border-bottom:1px solid #D8D5CE;">' + x[0] +
      '</td><td style="padding:8px 14px;border-bottom:1px solid #D8D5CE;">' + x[1] + '</td></tr>';
  }).join('');
  MailApp.sendEmail({
    to: to,
    subject: 'בקשה חדשה לפתיחת כרטיס לקוח: ' + r.clientName,
    body: rows.map(function (x) { return x[0] + ': ' + x[1].replace(/<[^>]+>/g, ''); }).join('\n'),
    htmlBody: '<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;color:#1D2124;max-width:540px;">' +
      '<div style="background:#1D2124;color:#F5B301;padding:14px 18px;font-size:18px;font-weight:bold;">פתיחת כרטיס לקוח עסקי (Comax)</div>' +
      '<table style="width:100%;border-collapse:collapse;border:1px solid #D8D5CE;">' + tr + '</table></div>',
    name: 'פורטל לקוחות ח. סבן'
  });
}

// ===================== עזרים =====================

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml_(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ===================== בדיקה ידנית =====================

/**
 * הרצה מהעורך (Run > testLeadInsertion). מוסיפה ליד בדיקה לגיליון,
 * שולחת מייל התראה ומדפיסה את התשובה ל-Logs.
 */
function testLeadInsertion() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'ישראל ישראלי (בדיקה)',
        phone: '050-1234567',
        city: 'תל אביב',
        type: 'קבלן',
        source: 'test-from-editor',
        createdAt: new Date().toISOString()
      })
    }
  };
  var output = doPost(fakeEvent);
  Logger.log(output.getContent());
}

/** בדיקה ידנית לפורטל Comax: מוסיפה שורת בדיקה לטאב "כרטיסי לקוח Comax" */
function testComaxInsertion() {
  var out = doPost({ postData: { contents: JSON.stringify({
    companyType: 'חברה בע״מ', clientName: 'בדיקה בע״מ', businessId: '514000000', phone: '0501234567',
    email: 'test@example.com', city: 'הוד השרון', address: 'החרש 10', activityType: 'שלד ובטון',
    fieldContactName: 'דני', fieldContactPhone: '0521234567', source: 'comax-web-portal', createdAt: new Date().toISOString()
  }) } });
  Logger.log(out.getContent());
}
