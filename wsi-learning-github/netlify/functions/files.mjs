// Stores uploaded screenshots, images, PDFs and small videos in Netlify Blobs.
import { getStore } from '@netlify/blobs';

const KEY_OK = /^[a-z0-9._-]{1,120}$/i;
const MAX = 5.5 * 1024 * 1024; // Netlify function requests are capped at about 6 MB

export default async (req) => {
  const store = getStore('wsi-files');
  const key = decodeURIComponent(new URL(req.url).pathname.replace(/^\/api\/files\/?/, ''));
  if (!KEY_OK.test(key)) return new Response('Bad key', { status: 400 });

  if (req.method === 'GET') {
    const hit = await store.getWithMetadata(key, { type: 'arrayBuffer' });
    if (!hit) return new Response('Not found', { status: 404 });
    return new Response(hit.data, {
      headers: {
        'Content-Type': hit.metadata?.type || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  if (req.method === 'PUT') {
    const buf = await req.arrayBuffer();
    if (buf.byteLength > MAX) return new Response('File too large (5.5 MB max)', { status: 413 });
    await store.set(key, buf, {
      metadata: { type: req.headers.get('content-type') || 'application/octet-stream', name: decodeURIComponent(req.headers.get('x-filename') || key), size: buf.byteLength, uploadedAt: Date.now() },
    });
    return Response.json({ ok: true, url: '/api/files/' + key });
  }
  if (req.method === 'DELETE') {
    await store.delete(key);
    return Response.json({ ok: true });
  }
  return new Response('Method not allowed', { status: 405 });
};

export const config = { path: '/api/files/*' };
