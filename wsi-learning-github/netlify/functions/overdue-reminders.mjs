// Runs every weekday at 9am Eastern. Emails each person with overdue training,
// then waits the "repeat every N days" setting before emailing them again.
import { getStore } from '@netlify/blobs';
import nodemailer from 'nodemailer';

const day = (s) => new Date(s + 'T12:00:00');
const fmt = (s) => day(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const slug = (n) => 'progress-' + String(n || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

export default async () => {
  const user = process.env.GMAIL_USER, pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return console.log('Email not configured; skipping.');
  const store = getStore({ name: 'wsi-data', consistency: 'strong' });
  const sched = await store.get('schedule', { type: 'json' });
  if (!sched || !sched.email || !sched.email.auto) return console.log('Automatic emails are off.');
  const log = (await store.get('email-log', { type: 'json' })) || {};
  const now = new Date(), todayS = now.toISOString().slice(0, 10);
  const repeat = Math.max(1, Number(sched.email.repeatDays) || 3);
  const site = process.env.URL || '';
  const t = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  const from = `${process.env.EMAIL_FROM_NAME || 'Katelyn Drummond'} <${user}>`;
  let sent = 0;
  for (const p of sched.people || []) {
    if (!/@wsitalent\.com$/i.test(p.email || '')) continue;
    const prog = (await store.get(slug(p.name), { type: 'json' })) || {};
    const overdue = (p.items || []).filter(i => i.progress < 100 && !(prog.prog && prog.prog[i.moduleId] && prog.prog[i.moduleId].completedAt) && day(i.due) < now && (!i.opens || day(i.opens) <= now));
    if (!overdue.length) continue;
    if (log[p.email] && (day(todayS) - day(log[p.email])) / 864e5 < repeat) continue;
    const fill = (tpl) => String(tpl || '')
      .replace(/\{first\}/g, p.name.split(' ')[0])
      .replace(/\{trainings\}/g, overdue.map(i => i.title).join(', '))
      .replace(/\{list\}/g, overdue.map(i => `• ${i.title} (due ${fmt(i.due)})`).join('\n'))
      .replace(/\{link\}/g, `${site}/WSI%20Training.dc.html?module=${overdue[0].moduleId}`);
    await t.sendMail({ from, to: p.email, cc: user, subject: fill(sched.email.subject), text: fill(sched.email.body) });
    log[p.email] = todayS; sent++;
  }
  await store.setJSON('email-log', log);
  console.log(`Overdue reminders sent: ${sent}`);
};

export const config = { schedule: '0 13 * * 1-5' };
