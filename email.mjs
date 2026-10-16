// Sends emails from Katelyn's Google Workspace account, with Katelyn cc'd.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD set in Netlify (see README).
import nodemailer from 'nodemailer';

const OK_DOMAIN = /@(wsitalent\.com|cjsearchgroup\.com)$/i;

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const user = process.env.GMAIL_USER, pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return Response.json({ error: 'email is not set up yet. Add GMAIL_USER and GMAIL_APP_PASSWORD in Netlify.' }, { status: 501 });
  const { messages = [] } = await req.json().catch(() => ({}));
  if (!messages.length || messages.length > 300) return Response.json({ error: 'no messages to send' }, { status: 400 });
  const t = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  const from = `${process.env.EMAIL_FROM_NAME || 'Katelyn Drummond'} <${user}>`;
  let sent = 0, skipped = 0;
  for (const m of messages) {
    const to = String(m.to || '').split(/[,;]\s*/).map(x => x.trim()).filter(x => OK_DOMAIN.test(x)); // internal addresses only
    if (!to.length) { skipped++; continue; }
    const cc = to.some(x => x.toLowerCase() === user.toLowerCase()) ? undefined : user;
    await t.sendMail({ from, to: to.join(', '), cc, subject: String(m.subject || '').slice(0, 200), text: String(m.text || '').slice(0, 20000) });
    sent++;
  }
  return Response.json({ ok: true, sent, skipped });
};

export const config = { path: '/api/email' };
