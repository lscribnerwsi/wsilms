// Checks a learner's uploaded screenshot against the example screenshot set in the module.
// Needs ANTHROPIC_API_KEY (same key as AI drafting).
import { getStore } from '@netlify/blobs';

const KEY_OK = /^[a-z0-9._-]{1,120}$/i;
const toPart = async (store, key) => {
  const hit = await store.getWithMetadata(key, { type: 'arrayBuffer' });
  if (!hit) return null;
  const type = (hit.metadata && hit.metadata.type) || 'image/png';
  const data = Buffer.from(hit.data).toString('base64');
  if (type === 'application/pdf') return { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data } };
  if (!/^image\/(png|jpeg|gif|webp)$/.test(type)) return null;
  return { type: 'image', source: { type: 'base64', media_type: type, data } };
};

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ error: 'AI is not set up' }, { status: 501 });
  const { upload, example, expect = '', question = '' } = await req.json().catch(() => ({}));
  if (!KEY_OK.test(upload || '') || !KEY_OK.test(example || '')) return Response.json({ error: 'bad keys' }, { status: 400 });
  const store = getStore('wsi-files');
  const [ex, up] = await Promise.all([toPart(store, example), toPart(store, upload)]);
  if (!ex || !up) return Response.json({ verdict: 'review', reason: 'The file type could not be checked automatically.' });
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5', max_tokens: 300,
      system: 'You check employee training uploads. Compare the SUBMISSION to the EXAMPLE. Decide whether the submission shows the same kind of completed screen or document (same website or form, same step, completed). Names, dates and numbers will differ; that is fine. Return ONLY JSON: {"verdict":"match"|"review","reason":"one short sentence"}. Use "review" if unsure.',
      messages: [{ role: 'user', content: [
        { type: 'text', text: 'Question: ' + question + '\nWhat it should show: ' + (expect || '(see example)') + '\n\nEXAMPLE:' }, ex,
        { type: 'text', text: 'SUBMISSION:' }, up,
      ] }],
    }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return Response.json({ verdict: 'review', reason: 'Automatic check failed.' });
  const txt = (j.content || []).map(c => c.text || '').join('');
  try { const o = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1)); return Response.json({ verdict: o.verdict === 'match' ? 'match' : 'review', reason: String(o.reason || '').slice(0, 300) }); }
  catch { return Response.json({ verdict: 'review', reason: 'Automatic check was inconclusive.' }); }
};

export const config = { path: '/api/check-upload' };
