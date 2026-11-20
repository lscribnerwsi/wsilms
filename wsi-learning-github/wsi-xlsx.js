// Reads .xlsx and .csv files in the browser. WSIXlsx.read(file) -> { sheetName: [[cell, ...], ...] }
(function () {
  if (window.WSIXlsx) return;
  async function unzip(buf) {
    const dv = new DataView(buf.buffer), out = {};
    let e = buf.length - 22; while (e > 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    let p = dv.getUint32(e + 16, true); const n = dv.getUint16(e + 10, true);
    for (let i = 0; i < n; i++) {
      const comp = dv.getUint16(p + 10, true), cs = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), el = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
      const name = new TextDecoder().decode(buf.slice(p + 46, p + 46 + nl));
      if (/\.xml(\.rels)?$|\.rels$/.test(name)) {
        const ln = dv.getUint16(lo + 26, true), le = dv.getUint16(lo + 28, true), d = buf.slice(lo + 30 + ln + le, lo + 30 + ln + le + cs);
        out[name] = comp === 0 ? new TextDecoder().decode(d) : await new Response(new Blob([d]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
      }
      p += 46 + nl + el + cl;
    }
    return out;
  }
  const dec = (s) => String(s).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
  const colIdx = (ref) => { let n = 0; for (const ch of ref) n = n * 26 + ch.charCodeAt(0) - 64; return n - 1; };
  async function readXlsx(file) {
    const f = await unzip(new Uint8Array(await file.arrayBuffer()));
    const ss = (f['xl/sharedStrings.xml'] || '').split('<si>').slice(1).map(x => dec((x.match(/<t[^>]*>([^<]*)<\/t>/g) || []).map(t => t.replace(/<[^>]+>/g, '')).join('')));
    const rels = {}; ((f['xl/_rels/workbook.xml.rels'] || '').match(/<Relationship [^>]+>/g) || []).forEach(r => { const id = (r.match(/Id="([^"]+)"/) || [])[1], t = (r.match(/Target="([^"]+)"/) || [])[1]; if (id && t) rels[id] = 'xl/' + t.replace(/^\/?xl\//, ''); });
    const sheets = {};
    ((f['xl/workbook.xml'] || '').match(/<sheet [^>]+>/g) || []).forEach(sh => {
      const name = dec((sh.match(/name="([^"]+)"/) || [])[1] || ''), rid = (sh.match(/r:id="([^"]+)"/) || [])[1], xml = f[rels[rid]] || '';
      sheets[name] = xml.split('<row').slice(1).map(r => {
        const row = [];
        (r.match(/<c [^>]*?(\/>|>[\s\S]*?<\/c>)/g) || []).forEach(c => {
          const t = (c.match(/ t="(\w+)"/) || [])[1], v = (c.match(/<v>([^<]*)<\/v>/) || [])[1], is = (c.match(/<t[^>]*>([^<]*)<\/t>/) || [])[1], ref = (c.match(/r="([A-Z]+)/) || [])[1];
          row[ref ? colIdx(ref) : row.length] = t === 's' ? ss[+v] : t === 'inlineStr' ? dec(is || '') : t === 'str' ? dec(v || '') : v != null ? (isNaN(+v) ? dec(v) : +v) : '';
        });
        return Array.from(row, x => x == null ? '' : x);
      });
    });
    return sheets;
  }
  function readCsv(text) {
    const rows = [[]]; let cur = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) { if (ch === '"' && text[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch; }
      else if (ch === '"') q = true; else if (ch === ',') { rows[rows.length - 1].push(cur); cur = ''; }
      else if (ch === '\n') { rows[rows.length - 1].push(cur.replace(/\r$/, '')); rows.push([]); cur = ''; } else cur += ch;
    }
    rows[rows.length - 1].push(cur);
    return { Sheet1: rows.filter(r => r.some(c => String(c).trim())) };
  }
  window.WSIXlsx = {
    read: async (file) => /\.csv$/i.test(file.name) ? readCsv(await file.text()) : readXlsx(file),
    // Excel serial date or text -> 'YYYY-MM-DD', or null if it isn't a date
    toDate: (v) => {
      if (typeof v === 'number' && v > 20000 && v < 80000) return new Date(Math.round((v - 25569) * 864e5)).toISOString().slice(0, 10);
      const s = String(v || '').trim(); if (!s || !/\d/.test(s)) return null;
      const d = new Date(s.replace(/^(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3'));
      return isNaN(d) ? null : d.toISOString().slice(0, 10);
    },
  };
})();
