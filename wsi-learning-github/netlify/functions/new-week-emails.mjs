// Runs every weekday at 9am Eastern. When a new week of someone's learning path opens,
// emails them that week's trainings with a link to log in (Katelyn cc'd).
// Uses the "New week unlocked" template from the Emails tab and follows the automatic-email switch.
import { getStore } from '@netlify/blobs';
import nodemailer from 'nodemailer';

const OK_DOMAIN = /@(wsitalent\.com|cjsearchgroup\.com)$/i;
const day = (s) => new Date(s + 'T12:00:00');
const fmt = (s) => day(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default async () => {
  const user = process.env.GMAIL_USER, pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return console.log('Email not configured; skipping.');
  const store = getStore({ name: 'wsi-data', consistency: 'strong' });
  const sched = await store.get('schedule', { type: 'json' });
  if (!sched || !sched.email || !sched.email.auto) return console.log('Automatic emails are off.');
  const tpl = sched.newWeek || { subject: 'Week {week} of your training is open', body: 'Hi {first},\n\nWeek {week} of your training is now available:\n\n{list}\n\nLog in to start:\n{link}\n\nThanks,\nKatelyn' };
  const log = (await store.get('newweek-log', { type: 'json' })) || {};
  const now = new Date(), todayS = now.toISOString().slice(0, 10);
  const site = process.env.URL || '';
  const t = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
  const from = `${process.env.EMAIL_FROM_NAME || 'Katelyn Drummond'} <${user}>`;
  let sent = 0;
  for (const p of sched.people || []) {
    if (!OK_DOMAIN.test(p.email || '')) continue;
    // Weeks 2 and later that opened today, or over the weekend (up to 3 days ago), not yet emailed.
    const byOpen = {};
    (p.items || []).forEach(i => {
      if (!i.opens || !i.week || i.week < 2 || i.progress >= 100) return;
      const age = (day(todayS) - day(i.opens)) / 864e5;
      if (age < 0 || age > 3) return;
      (byOpen[i.opens] = byOpen[i.opens] || []).push(i);
    });
    for (const opens of Object.keys(byOpen)) {
      const key = p.email.toLowerCase() + '|' + opens;
      if (log[key]) continue;
      const items = byOpen[opens], week = Math.min(...items.map(i => i.week));
      const fill = (s) => String(s || '')
        .replace(/\{first\}/g, p.name.split(' ')[0])
        .replace(/\{week\}/g, String(week))
        .replace(/\{trainings\}/g, items.map(i => i.title).join(', '))
        .replace(/\{list\}/g, items.map(i => `• ${i.title} (due ${fmt(i.due)})`).join('\n'))
        .replace(/\{link\}/g, `${site}/WSI%20Training.dc.html`);
      const cc = p.email.toLowerCase() === user.toLowerCase() ? undefined : user;
      await t.sendMail({ from, to: p.email, cc, subject: fill(tpl.subject).slice(0, 200), text: fill(tpl.body).slice(0, 20000) });
      log[key] = todayS; sent++;
    }
  }
  // Keep the log small: drop entries older than 60 days.
  Object.keys(log).forEach(k => { if ((day(todayS) - day(log[k])) / 864e5 > 60) delete log[k]; });
  await store.setJSON('newweek-log', log);
  console.log(`New-week emails sent: ${sent}`);
};

export const config = { schedule: '0 13 * * 1-5' };
