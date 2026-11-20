// Turns an uploaded training schedule (PDF or Word .docx) into an editable template.
// WSIScheduleImport.fromFile(file) -> Promise<{ name, blocks }>
(function () {
  if (window.WSIScheduleImport) return;
  const W2N = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
  const wkOf = (t) => { const m = String(t).match(/week\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/i); return m ? (+m[1] || W2N[m[1].toLowerCase()]) : null; };
  const lc = (t) => /^[a-z(]/.test(String(t).replace(/^\[/, ''));
  const plain = (s) => String(s).replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  const TIME = /^(\d{1,2}(?::\d{2})?\s?[AP]M(?:\s*-\s*(?:\d{1,2}(?::\d{2})?\s?[AP]M)?)?)\s*(.*)$/i;
  const VERB = /^(.+?)\s+((?:Understand|Use|Complete|Confirm|Follow|Determine|Document|Purpose|Search|Log|Review:|Request|Submit|Create|Send|Identify|Add|Find|Update|View|Know|Ensure|Run|Answer|Explain|Schedule|Contact|Communicate|Discuss|Verify|Process|Enter|Check|Call|Email|Set|Attend|Meet|Practice)\b.*)$/;
  const DAYRE = /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday|week\s+\d+\s*:)/i;

  function weeks(blocks) {
    let hw = 1, maxW = 1;
    blocks.forEach(b => { if (b.type === 'heading') { const w = wkOf(b.text); hw = w || maxW + 1; maxW = Math.max(maxW, hw); b.week = hw; } else if (b.type === 'todo' || (b.type === 'goals' && b.title)) b.week = hw; });
    let nw = null;
    for (let i = blocks.length - 1; i >= 0; i--) { const b = blocks[i]; if (b.type === 'heading') nw = b.week; if (b.week == null) b.week = nw || hw; }
    blocks.forEach((b, i) => { if (b.type === 'goals' && !b.title && blocks[i - 1] && blocks[i - 1].type === 'goals') b.week = blocks[i - 1].week; });
    return blocks;
  }
  function tidy(blocks) {
    blocks.forEach(b => {
      if (b.type === 'day') {
        const rows = (b.rows || []).map(r => { const m = String(r.time).match(TIME); return { time: m ? m[1].trim() : r.time, lines: [m && m[2] ? m[2] : null, ...(r.lines || [])].filter(x => x != null && x !== '') }; });
        const merged = [];
        rows.forEach(r => { const pr = merged[merged.length - 1]; if (pr && /-\s*$/.test(pr.time) && !/-/.test(r.time)) { pr.time += ' ' + r.time; pr.lines.push(...r.lines); } else merged.push(r); });
        b.rows = merged.map(r => { const ls = []; r.lines.filter(l => l !== '- th').map(l => l.trim() === '-' ? '- [fill in]' : l).forEach(l => { const pv = ls[ls.length - 1]; if (pv != null && !/^- /.test(l) && (lc(l) || (plain(pv).length > 62 && !/[.!?:)]$/.test(pv)))) ls[ls.length - 1] = pv + ' ' + l; else ls.push(l); }); return { time: r.time, text: ls.join('\n') }; });
      }
      if (b.type === 'goals') b.rows = (b.rows || []).map(r => {
        let topic = r.topic, items = r.items;
        const m = topic.match(VERB); if (m && !/^Review New/.test(topic)) { topic = m[1]; items = [m[2], ...items]; }
        const out = []; items.forEach(x => { const p = out[out.length - 1]; if (p && /Review:$/.test(p)) out[out.length - 1] = p + ' ' + x; else if (plain(x).length < 14 && !/^Review/.test(x) && out.length === 0) topic += ' ' + x; else out.push(x); });
        return { topic, items: out };
      });
    });
    return blocks.filter(b => b.type !== 'title');
  }

  // ---------- PDF ----------
  async function pdfLines(file) {
    const pdfjs = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';
    const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const L = [];
    let body = 11;
    for (let pn = 1; pn <= doc.numPages; pn++) {
      const pg = await doc.getPage(pn), tc = await pg.getTextContent(), ann = (await pg.getAnnotations()).filter(a => a.url);
      const items = [];
      tc.items.filter(i => i.str.length).forEach(i => {
        if (i.str.includes('\t')) { const [a, b] = i.str.split('\t'); items.push({ ...i, str: a, width: a.length * 5 }); if (b && b.trim()) { const t = i.transform.slice(); t[4] = 196; items.push({ ...i, str: b, transform: t, width: b.length * 5 }); } }
        else items.push(i);
      });
      const rows = {};
      items.forEach(i => { const y = Math.round(i.transform[5]); const k = Object.keys(rows).find(k => Math.abs(k - y) <= 2) ?? y; (rows[k] = rows[k] || []).push(i); });
      Object.keys(rows).sort((a, b) => b - a).forEach(y => {
        const its = rows[y].sort((a, b) => a.transform[4] - b.transform[4]);
        const segs = []; let cur = null;
        its.forEach(i => {
          const x = i.transform[4], end = x + i.width;
          const link = ann.find(a => x >= a.rect[0] - 2 && x <= a.rect[2] + 2 && +y >= a.rect[1] - 3 && +y <= a.rect[3] + 3);
          const bold = /bold|black|heavy/i.test((tc.styles[i.fontName] || {}).fontFamily || '') || /f2$|bold/i.test(i.fontName);
          if (!cur || x - cur.end > 25) { cur = { x, end, parts: [], size: Math.round(Math.abs(i.transform[0])), bold, y: +y, page: pn }; segs.push(cur); }
          else if (x - cur.end > 1.5 && !/^\s/.test(i.str)) cur.parts.push({ s: ' ' });
          cur.parts.push({ s: i.str, url: link && link.url }); cur.end = Math.max(cur.end, end);
        });
        segs.forEach(sg => {
          let t = '', lastUrl = null, buf = '';
          const flush = () => { if (buf) t += lastUrl && buf.trim() ? '[' + buf.trim() + '](' + lastUrl + ')' + (/\s$/.test(buf) ? ' ' : '') : buf; buf = ''; };
          sg.parts.forEach(p => { const u = p.url || null; if (u !== lastUrl && p.s.trim()) { flush(); lastUrl = u; } buf += p.s; });
          flush();
          sg.text = t.replace(/\s+/g, ' ').trim();
          for (let k = 0; k < 3; k++) sg.text = sg.text.replace(/\[([^\]]*)\]\(([^)]+)\)\s?\[([^\]]*)\]\(\2\)/g, (m, a, u, b) => '[' + a + (/^[a-z]/.test(b) && /[a-z]$/.test(a) && !m.includes(') [') ? '' : ' ') + b + '](' + u + ')');
          delete sg.parts;
          if (sg.text) L.push(sg);
        });
      });
    }
    // estimate body size and columns from the document itself
    const sizes = {}; L.forEach(l => { sizes[l.size] = (sizes[l.size] || 0) + 1; });
    body = +Object.keys(sizes).sort((a, b) => sizes[b] - sizes[a])[0] || 11;
    L.forEach(l => { l.rel = l.size / body; });
    return L;
  }
  function buildPdf(L) {
    const blocks = []; let cur = null, mode = null, lastLeft = null;
    const xs = L.filter(l => l.rel < 1.15).map(l => l.x).sort((a, b) => a - b);
    const leftEdge = xs[0] || 72, colX = 178 * (leftEdge / 72 > 1.2 ? leftEdge / 72 : 1), topicX = 150;
    const push = (b) => { blocks.push(b); cur = b; lastLeft = null; return b; };
    for (const l of L) {
      const t = l.text;
      if (l.rel >= 1.7) { if (!blocks.length) push({ type: 'title', text: t }); continue; }
      if (l.rel >= 1.55) { push({ type: 'heading', text: t }); mode = null; continue; }
      if (l.rel >= 1.35 && (l.bold || DAYRE.test(t))) { push({ type: 'day', title: t, rows: [] }); mode = 'day'; continue; }
      if (l.rel >= 1.2) {
        if (/^to-?do list/i.test(t)) { push({ type: 'todo', title: 'To-Do List', items: [] }); mode = 'todo'; }
        else if (/^proficiency goals|goals:$/i.test(t)) { push({ type: 'goals', title: t.replace(/:$/, ''), rows: [] }); mode = 'goals'; }
        else if (/^scheduled training/i.test(t)) { push({ type: 'list', title: 'Scheduled Training', items: [] }); mode = 'list'; }
        else if (DAYRE.test(t)) { push({ type: 'day', title: t, rows: [] }); mode = 'day'; }
        else { push({ type: 'note', text: t.replace(/^\*|\*$/g, '') }); mode = null; }
        continue;
      }
      if (mode === 'todo') { if (cur.items.length && lc(t)) cur.items[cur.items.length - 1] += ' ' + t; else cur.items.push(t.replace(/^[☐□▢●•]\s*/, '')); continue; }
      if (mode === 'list') {
        if (/^[○◦]/.test(t) && cur.items.length) { cur.items[cur.items.length - 1] += ' — ' + t.replace(/^[○◦]\s*/, ''); continue; }
        if (/^[●•]/.test(t) || l.x >= 100) { cur.items.push(t.replace(/^[●•]\s*/, '')); continue; }
        mode = null;
      }
      if (mode === 'day') {
        if (l.x < colX && TIME.test(t)) { cur.rows.push({ time: t, lines: [] }); continue; }
        if (l.x < colX && cur.rows.length && /-\s*$/.test(cur.rows[cur.rows.length - 1].time)) { cur.rows.push({ time: t, lines: [] }); continue; }
        let r = cur.rows[cur.rows.length - 1]; if (!r) { r = { time: '', lines: [] }; cur.rows.push(r); }
        const isSub = /^-/.test(t) || l.x > colX + 14;
        r.lines.push(isSub ? '- ' + t.replace(/^-\s*/, '') : t);
        continue;
      }
      if (l.x < topicX) {
        if (!(cur && cur.type === 'goals')) push({ type: 'goals', title: '', rows: [] });
        mode = 'goals';
        const last = cur.rows[cur.rows.length - 1];
        if (last && lastLeft && lastLeft.page === l.page && lastLeft.y - l.y < 20) { last.topic += ' ' + t; last._ys.push(l.y); }
        else cur.rows.push({ topic: t, items: [], _ys: [l.y], _tp: l.page });
        lastLeft = l; continue;
      }
      if (cur && cur.type === 'goals') {
        mode = 'goals';
        const cands = cur.rows.filter(r => r._tp === l.page);
        let pick = cur.rows[cur.rows.length - 1];
        if (cands.length) pick = cands.reduce((b, r) => { const c = r._ys.reduce((a, x) => a + x, 0) / r._ys.length, d = Math.abs(c - l.y); return !b || d < b.d ? { r, d } : b; }, null).r;
        if (!pick) { pick = { topic: '', items: [], _ys: [l.y], _tp: l.page }; cur.rows.push(pick); }
        if (cur._lastPick === pick && pick.items.length && lc(t)) pick.items[pick.items.length - 1] += ' ' + t; else pick.items.push(t);
        cur._lastPick = pick; continue;
      }
      push({ type: 'text', text: t }); mode = null;
    }
    blocks.forEach(b => { delete b._lastPick; if (b.rows && b.type === 'goals') b.rows = b.rows.map(r => ({ topic: r.topic, items: r.items })); });
    return blocks;
  }

  // ---------- DOCX ----------
  async function unzip(buf) {
    const dv = new DataView(buf.buffer), out = {};
    let e = buf.length - 22; while (e > 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    let p = dv.getUint32(e + 16, true); const n = dv.getUint16(e + 10, true);
    for (let i = 0; i < n; i++) {
      const comp = dv.getUint16(p + 10, true), cs = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), el = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
      const name = new TextDecoder().decode(buf.slice(p + 46, p + 46 + nl));
      if (/word\/(document\.xml|_rels\/document\.xml\.rels)$/.test(name)) {
        const ln = dv.getUint16(lo + 26, true), le = dv.getUint16(lo + 28, true), d = buf.slice(lo + 30 + ln + le, lo + 30 + ln + le + cs);
        out[name] = comp === 0 ? new TextDecoder().decode(d) : await new Response(new Blob([d]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
      }
      p += 46 + nl + el + cl;
    }
    return out;
  }
  async function buildDocx(file) {
    const f = await unzip(new Uint8Array(await file.arrayBuffer()));
    const xml = new DOMParser().parseFromString(f['word/document.xml'] || '', 'application/xml');
    const rels = {}; new DOMParser().parseFromString(f['word/_rels/document.xml.rels'] || '<r/>', 'application/xml').querySelectorAll('Relationship').forEach(r => { rels[r.getAttribute('Id')] = r.getAttribute('Target'); });
    const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
    const kids = (el, tag) => Array.from(el.childNodes).filter(n => n.localName === tag);
    const para = (p) => {
      let t = '', bold = false, size = 0;
      Array.from(p.childNodes).forEach(n => {
        const runs = n.localName === 'hyperlink' ? kids(n, 'r') : n.localName === 'r' ? [n] : [];
        const url = n.localName === 'hyperlink' ? rels[n.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id')] : null;
        let s = ''; runs.forEach(r => { const rp = kids(r, 'rPr')[0]; if (rp && rp.getElementsByTagNameNS(W, 'b').length) bold = true; const sz = rp && rp.getElementsByTagNameNS(W, 'sz')[0]; if (sz) size = Math.max(size, +sz.getAttributeNS(W, 'val') / 2); Array.from(r.childNodes).forEach(c => { if (c.localName === 't') s += c.textContent; if (c.localName === 'tab') s += ' '; }); });
        t += url && s.trim() ? '[' + s.trim() + '](' + url + ') ' : s;
      });
      const st = (p.getElementsByTagNameNS(W, 'pStyle')[0] || {}).getAttribute ? p.getElementsByTagNameNS(W, 'pStyle')[0].getAttributeNS(W, 'val') : '';
      const list = p.getElementsByTagNameNS(W, 'numPr').length > 0;
      return { text: t.replace(/\s+/g, ' ').trim(), bold, size, style: st || '', list };
    };
    const blocks = []; let cur = null;
    const body = xml.getElementsByTagNameNS(W, 'body')[0];
    Array.from(body.childNodes).forEach(n => {
      if (n.localName === 'p') {
        const p = para(n); if (!p.text) return;
        const big = /Heading1|Title/i.test(p.style) || p.size >= 18, mid = /Heading2/i.test(p.style) || p.size >= 15, sm = /Heading[3-6]/i.test(p.style) || (p.bold && p.size >= 13);
        if (!blocks.length && big) { blocks.push({ type: 'title', text: p.text }); return; }
        if (big || (/goals$/i.test(p.text) && (mid || p.bold))) { blocks.push(cur = { type: 'heading', text: p.text }); return; }
        if ((mid || p.bold) && DAYRE.test(p.text)) { blocks.push(cur = { type: 'day', title: p.text, rows: [] }); return; }
        if (sm || (p.bold && /:$/.test(p.text))) {
          if (/^to-?do/i.test(p.text)) blocks.push(cur = { type: 'todo', title: 'To-Do List', items: [] });
          else if (/goals/i.test(p.text)) blocks.push(cur = { type: 'goals', title: p.text.replace(/:$/, ''), rows: [] });
          else if (/scheduled training/i.test(p.text)) blocks.push(cur = { type: 'list', title: 'Scheduled Training', items: [] });
          else blocks.push(cur = { type: 'note', text: p.text.replace(/^\*|\*$/g, '') });
          return;
        }
        if (cur && (cur.type === 'todo' || cur.type === 'list')) { cur.items.push(p.text); return; }
        blocks.push(cur = { type: 'text', text: p.text });
      }
      if (n.localName === 'tbl') {
        const rows = kids(n, 'tr').map(tr => kids(tr, 'tc').map(tc => kids(tc, 'p').map(para).filter(p => p.text)));
        const timeTable = rows.filter(r => r[0] && r[0][0] && TIME.test(r[0][0].text)).length >= Math.max(1, rows.length / 2);
        if (timeTable) {
          const d = cur && cur.type === 'day' && !cur.rows.length ? cur : (blocks.push(cur = { type: 'day', title: 'Day', rows: [] }), cur);
          rows.forEach(r => { const time = (r[0] || []).map(p => p.text).join(' '); const lines = (r.slice(1).flat()).map(p => (p.list && blocks.length ? '- ' : '') + p.text); d.rows.push({ time, lines }); });
          d.rows.forEach(r => { if (r.lines.length && /^- /.test(r.lines[0])) r.lines[0] = r.lines[0].slice(2); });
        } else {
          const g = cur && cur.type === 'goals' && !cur.rows.length ? cur : (blocks.push(cur = { type: 'goals', title: '', rows: [] }), cur);
          rows.forEach(r => { if (r.length === 1) { const items = r[0].map(p => p.text); if (cur.type === 'goals') g.rows.push({ topic: '', items }); return; } g.rows.push({ topic: (r[0] || []).map(p => p.text).join(' '), items: r.slice(1).flat().map(p => p.text) }); });
        }
      }
    });
    return blocks;
  }

  window.WSIScheduleImport = {
    async fromFile(file) {
      const name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').replace(/\s*template\s*/i, ' ').replace(/\s+/g, ' ').trim();
      let raw;
      if (/\.pdf$/i.test(file.name)) raw = buildPdf(await pdfLines(file));
      else if (/\.docx$/i.test(file.name)) raw = await buildDocx(file);
      else throw new Error('Upload a PDF or Word (.docx) file. For a Google Doc, use File → Download → PDF or Word.');
      const blocks = tidy(weeks(raw));
      if (!blocks.length) throw new Error("couldn't find any schedule content in that file");
      const id = 'imp' + Date.now();
      return { name, blocks: blocks.map((b, i) => ({ id: id + '-' + i, ...b })) };
    },
  };
})();
