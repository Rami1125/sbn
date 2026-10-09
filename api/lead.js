// api/lead.js
// Vercel Serverless Function - קליטת לידים מדף הנחיתה והעברה ל-Google Sheets / Webhook

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Honeypot check
    if (data.website) {
      return res.status(200).json({ ok: true });
    }

    const APPS_SCRIPT_URL =
      process.env.GOOGLE_APPS_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbwDtPX29zb2CCuCS_79FjzndoHSuBqmvE4QDjUy7cBCDC6ljquhZzcMnC-p4bPVlrcZ/exec';

    if (APPS_SCRIPT_URL) {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          city: data.city,
          type: data.type,
          source: data.source || 'דף נחיתה מועדון סבן (Vercel)',
          createdAt: data.createdAt || new Date().toISOString()
        })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead processing error:', err);
    return res.status(500).json({ ok: false, error: err.message || 'Server error' });
  }
}
