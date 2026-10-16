// Stores training data (modules, roles, people, assignments, learner progress) as JSON in Netlify Blobs.
import { getStore } from '@netlify/blobs';

const KEY_OK = /^[a-z0-9_-]{1,120}$/i;
const MAX = 4 * 1024 * 1024;

export default async (req) => {
  const store = getStore({ name: 'wsi-data', consistency: 'strong' });
  const url = new URL(req.url);
  const key = decodeURIComponent(url.pathname.replace(/^\/api\/data\/?/, ''));

  if (key === '__health') return Response.json({ ok: true });

  if (!key && req.method === 'GET') {
    const prefix = url.searchParams.get('prefix') || '';
    const { blobs } = await store.list({ prefix });
    const out = await Promise.all(blobs.map(async (b) => ({ key: b.key, value: await store.get(b.key, { type: 'json' }) })));
    return Response.json(out);
  }

  if (!KEY_OK.test(key)) return new Response('Bad key', { status: 400 });

  if (req.method === 'GET') {
    const value = await store.get(key, { type: 'json' });
    return value == null ? Response.json(null, { status: 404 }) : Response.json(value);
  }
  if (req.method === 'PUT') {
    const body = await req.text();
    if (body.length > MAX) return new Response('Too large', { status: 413 });
    try { JSON.parse(body); } catch { return new Response('Invalid JSON', { status: 400 }); }
    await store.set(key, body);
    return Response.json({ ok: true });
  }
  if (req.method === 'DELETE') {
    await store.delete(key);
    return Response.json({ ok: true });
  }
  return new Response('Method not allowed', { status: 405 });
};

export const config = { path: ['/api/data', '/api/data/*'] };
