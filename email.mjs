// Sends overdue-training emails from Katelyn's Google Workspace account, with Katelyn cc'd.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD set in Netlify (see README).
import nodemailer from 'nodemailer';

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const user = process.env.GMAIL_USER, pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return Response.json({ error: 'email is not set up yet. Add GMAIL_USER and GMAIL_APP_PASSWORD in Netlify.' }, { status: 501 });
  const { messages = [] } = await req.json().catch(() => ({}));
  if (!messages.length || messages.length > 100) return Response.json({ error: 'no messages to send' }, { status: 400 });
  const t = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  const from = `${process.env.EMAIL_FROM_NAME || 'Katelyn Drummond'} <${user}>`;
  let sent = 0;
  for (const m of messages) {
    if (!/@wsitalent\.com$/i.test(m.to || '')) continue; // internal addresses only
    await t.sendMail({ from, to: m.to, cc: user, subject: String(m.subject || '').slice(0, 200), text: String(m.text || '').slice(0, 10000) });
    sent++;
  }
  return Response.json({ ok: true, sent });
};

export const config = { path: '/api/email' };
