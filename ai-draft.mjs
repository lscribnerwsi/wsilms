// Drafts module lessons from an SOP (pasted text and/or a PDF) using Claude.
// Needs ANTHROPIC_API_KEY set in Netlify (see README).
const SPEC = 'You write short workplace training modules for WSI, a staffing company. Return ONLY a JSON object {"lessons": [...]} and nothing else. Lesson shapes: ' +
  '{"type":"text","title":"","mins":3,"paras":["paragraph"],"bullets":[["heading","detail"]]} | ' +
  '{"type":"steps","title":"","mins":3,"intro":"","steps":[{"title":"","text":""}]} | ' +
  '{"type":"flashcards","title":"","mins":2,"intro":"Tap each card to flip it.","cards":[["label","front","back"]]} | ' +
  '{"type":"scenario","title":"","mins":3,"outro":"","steps":[{"prompt":"","choices":[["choice", true, "feedback"],["choice", false, "feedback"]]}]} | ' +
  '{"type":"quiz","title":"Knowledge check","mins":3,"questions":[{"q":"","o":["","","",""],"a":0,"e":"explanation"}]}. ' +
  'Build 4 to 6 lessons: readings or step-by-step lessons from the source, one scenario, and end with a 4 to 6 question quiz ("a" is the index of the right option). Use only facts in the source. Where something important is missing, write [CONFIRM: what to check] instead of guessing. Plain, friendly language.';

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ error: 'AI is not set up yet. Add ANTHROPIC_API_KEY in Netlify.' }, { status: 501 });
  const { source = '', pdf } = await req.json().catch(() => ({}));
  const content = [];
  if (pdf) content.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdf } });
  content.push({ type: 'text', text: String(source).slice(0, 60000) });
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5', max_tokens: 6000, system: SPEC, messages: [{ role: 'user', content }] }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return Response.json({ error: (j.error && j.error.message) || 'AI request failed' }, { status: 502 });
  const txt = (j.content || []).map(c => c.text || '').join('');
  try {
    const out = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
    return Response.json({ lessons: out.lessons || [] });
  } catch {
    return Response.json({ error: 'the AI reply was not in the expected format. Try again.' }, { status: 502 });
  }
};

export const config = { path: '/api/ai-draft' };
