// WSI Learning: pulls searchable text out of an uploaded SOP (PDF, Word .docx, or plain text).
// WSIKbText.fromFile(file) -> Promise<string>
(function () {
  if (window.WSIKbText) return;
  var MAX = 60000;
  var tidy = function (s) { return String(s || '').replace(/​/g, '').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n\n').trim().slice(0, MAX); };

  async function pdfText(file) {
    const pdfjs = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';
    const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    let out = '';
    for (let pn = 1; pn <= Math.min(doc.numPages, 80) && out.length < MAX; pn++) {
      const tc = await (await doc.getPage(pn)).getTextContent();
      let lastY = null;
      tc.items.forEach(function (i) {
        const y = Math.round(i.transform[5]);
        if (lastY !== null && Math.abs(y - lastY) > 2) out += '\n'; else if (out && !/\s$/.test(out)) out += ' ';
        out += i.str; lastY = y;
      });
      out += '\n\n';
    }
    return out;
  }

  async function docxText(file) {
    const buf = new Uint8Array(await file.arrayBuffer()), dv = new DataView(buf.buffer);
    let e = buf.length - 22; while (e > 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    let p = dv.getUint32(e + 16, true); const n = dv.getUint16(e + 10, true);
    let xml = '';
    for (let i = 0; i < n; i++) {
      const comp = dv.getUint16(p + 10, true), cs = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), el = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
      const name = new TextDecoder().decode(buf.slice(p + 46, p + 46 + nl));
      if (name === 'word/document.xml') {
        const ln = dv.getUint16(lo + 26, true), le = dv.getUint16(lo + 28, true), d = buf.slice(lo + 30 + ln + le, lo + 30 + ln + le + cs);
        xml = comp === 0 ? new TextDecoder().decode(d) : await new Response(new Blob([d]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
      }
      p += 46 + nl + el + cl;
    }
    if (!xml) return '';
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
    return Array.from(doc.getElementsByTagNameNS(W, 'p')).map(function (para) {
      return Array.from(para.getElementsByTagNameNS(W, 't')).map(function (t) { return t.textContent; }).join('');
    }).filter(Boolean).join('\n');
  }

  window.WSIKbText = {
    async fromFile(file) {
      const nm = file.name || '';
      if (/\.pdf$/i.test(nm) || file.type === 'application/pdf') return tidy(await pdfText(file));
      if (/\.docx$/i.test(nm)) return tidy(await docxText(file));
      if (/\.(txt|md|csv|html?)$/i.test(nm) || /^text\//.test(file.type)) return tidy((await file.text()).replace(/<[^>]+>/g, ' '));
      return '';
    },
  };
})();
