// Renders a training schedule (template or assigned document) to printable HTML. Used by the admin and learner views.
(function () {
  if (window.WSISchedule) return;
  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const fill = (s, v) => String(s || '').replace(/\{(\w+)\}/g, (m, k) => v && v[k] ? v[k] : m);
  const inline = (s, v) => esc(fill(s, v)).replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  const d0 = (iso) => { const d = new Date(iso + 'T12:00:00'); return isNaN(d) ? null : d; };
  const add = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const fmt = (d, o) => d ? d.toLocaleDateString('en-US', o || { weekday: 'long', month: 'long', day: 'numeric' }) : '';
  const monday = (iso) => { const d = d0(iso); if (!d) return null; return add(d, -((d.getDay() + 6) % 7)); };
  function dayDates(title, week, start) {
    const m0 = monday(start); if (!m0) return '';
    const t = String(title).toLowerCase(), hits = DAYS.map((d, i) => [d, i, t.indexOf(d)]).filter(x => x[2] >= 0).sort((a, b) => a[2] - b[2]);
    if (!hits.length) return '';
    const base = add(m0, 7 * ((week || 1) - 1)), a = add(base, hits[0][1]);
    if (hits.length > 1 && /-|–|through|to/.test(t.slice(hits[0][2], hits[hits.length - 1][2]))) { const b = add(base, hits[hits.length - 1][1]); return fmt(a, { month: 'short', day: 'numeric' }) + ' – ' + fmt(b, { month: 'short', day: 'numeric' }); }
    return fmt(a, { weekday: 'short', month: 'short', day: 'numeric' });
  }
  function weekRange(week, start) { const m0 = monday(start); if (!m0) return ''; const a = add(m0, 7 * (week - 1)), b = add(a, 4); return fmt(a, { month: 'short', day: 'numeric' }) + ' – ' + fmt(b, { month: 'short', day: 'numeric', year: 'numeric' }); }
  const lines = (txt, v) => {
    const ls = String(txt || '').split('\n').filter(l => l.trim()); let h = '', sub = [];
    const flushSub = () => { if (sub.length) { h += '<ul class="sub">' + sub.map(x => '<li>' + inline(x, v) + '</li>').join('') + '</ul>'; sub = []; } };
    ls.forEach(l => { if (/^\s*-\s/.test(l)) sub.push(l.replace(/^\s*-\s*/, '')); else { flushSub(); h += '<div class="act">' + inline(l, v) + '</div>'; } });
    flushSub(); return h;
  };
  function body(doc, v) {
    const blocks = doc.blocks || [], start = v.startIso, weeks = [];
    blocks.forEach(b => { const w = b.week || 1; let g = weeks.find(x => x.w === w); if (!g) { g = { w, items: [] }; weeks.push(g); } g.items.push(b); });
    weeks.sort((a, b) => a.w - b.w);
    return weeks.map(g => {
      const head = '<div class="week"><span class="wk">Week ' + g.w + '</span>' + (start ? '<span class="wr">' + weekRange(g.w, start) + '</span>' : '') + '</div>';
      const inner = g.items.map(b => {
        if (b.type === 'heading') return '<h3>' + inline(b.text, v) + '</h3>';
        if (b.type === 'note') return '<div class="note">' + inline(b.text, v) + '</div>';
        if (b.type === 'text') return '<p class="text">' + inline(b.text, v) + '</p>';
        if (b.type === 'day') {
          const dt = start ? dayDates(b.title, b.week, start) : '';
          return '<div class="day"><div class="dayh"><span>' + inline(b.title, v) + '</span>' + (dt ? '<span class="date">' + esc(dt) + '</span>' : '') + '</div><table>' + (b.rows || []).map(r => '<tr><td class="time">' + esc(r.time) + '</td><td>' + lines(r.text, v) + '</td></tr>').join('') + '</table></div>';
        }
        if (b.type === 'todo') return '<div class="box"><h4>' + inline(b.title || 'To-Do List', v) + '</h4><ul class="todo">' + (b.items || []).filter(x => String(x).trim()).map(x => '<li><span class="cb"></span><span>' + inline(x, v) + '</span></li>').join('') + '</ul></div>';
        if (b.type === 'list') return '<div class="box"><h4>' + inline(b.title || 'Scheduled Training', v) + '</h4><ul class="bul">' + (b.items || []).filter(x => String(x).trim()).map(x => '<li>' + inline(x, v) + '</li>').join('') + '</ul></div>';
        if (b.type === 'goals') return '<div class="box">' + (b.title ? '<h4>' + inline(b.title, v) + '</h4>' : '') + '<table class="goals">' + (b.rows || []).map(r => '<tr><td class="topic">' + inline(r.topic, v) + '</td><td><ul class="bul">' + (r.items || []).filter(x => String(x).trim()).map(x => '<li>' + inline(x, v) + '</li>').join('') + '</ul></td></tr>').join('') + '</table></div>';
        return '';
      }).join('');
      return '<section>' + head + inner + '</section>';
    }).join('');
  }
  const CSS = `*{box-sizing:border-box}body{margin:0;background:#F5F5F4;color:#262626;font-family:'Open Sans',Arial,sans-serif;font-size:14px;line-height:1.5}
.page{max-width:860px;margin:0 auto;padding:36px 40px 60px;background:#FFFFFF}
header{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;padding-bottom:22px;border-bottom:4px solid #EE3826;margin-bottom:8px}
header img{height:44px}.kicker{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#C62B1C}
h1{margin:4px 0 2px;font-size:30px;line-height:1.15;letter-spacing:-.01em}.meta{color:#3F4040;font-size:14px}.meta b{color:#262626}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px 24px;margin:18px 0 6px}.facts div{display:flex;flex-direction:column}.facts span:first-child{font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#5C5D5D}.facts span:last-child{font-weight:700}
section{margin-top:28px}.week{display:flex;align-items:baseline;gap:12px;padding:10px 16px;border-radius:10px;background:#262626;color:#FFFFFF;margin-bottom:14px}.wk{font-weight:800;font-size:18px}.wr{font-size:13px;opacity:.85}
h3{font-size:19px;margin:22px 0 10px;color:#262626}h4{margin:0 0 8px;font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#C62B1C}
.note{display:inline-block;padding:6px 14px;border-radius:999px;background:#FDECE9;color:#7E1B11;font-weight:700;font-size:13px;margin:4px 0 10px}
.text{margin:8px 0}
.day{border:1px solid #E3E3E1;border-radius:12px;margin:0 0 12px;overflow:hidden;break-inside:avoid}.dayh{display:flex;justify-content:space-between;gap:12px;padding:10px 16px;background:#F5F5F4;font-weight:800;font-size:15px}.date{font-weight:700;color:#C62B1C;font-size:13px;white-space:nowrap}
table{width:100%;border-collapse:collapse}.day td{padding:9px 16px;border-top:1px solid #EBEBEA;vertical-align:top}.time{width:150px;font-weight:700;white-space:nowrap;color:#3F4040}
.act{font-weight:600}ul{margin:0;padding:0;list-style:none}.sub li{position:relative;padding-left:16px;color:#3F4040;font-size:13px}.sub li:before{content:'';position:absolute;left:4px;top:9px;width:5px;height:5px;border-radius:9px;background:#C9CAC8}
.box{border:1px solid #E3E3E1;border-radius:12px;padding:16px 18px;margin:0 0 12px;break-inside:auto}
.todo li{display:flex;gap:10px;padding:5px 0;border-top:1px solid #F0F0EF}.todo li:first-child{border-top:0}.cb{flex:none;width:15px;height:15px;margin-top:3px;border:1.5px solid #262626;border-radius:4px}
.bul li{position:relative;padding:2px 0 2px 14px}.bul li:before{content:'';position:absolute;left:2px;top:10px;width:5px;height:5px;border-radius:9px;background:#EE3826}
.goals td{padding:10px 0;border-top:1px solid #EBEBEA;vertical-align:top}.goals tr:first-child td{border-top:0}.topic{width:190px;padding-right:16px!important;font-weight:800}
a{color:#C62B1C;font-weight:600}a:hover{color:#9E2216}
.toolbar{position:sticky;top:0;display:flex;justify-content:flex-end;gap:8px;padding:10px 0;background:#FFFFFF}.toolbar button{padding:8px 16px;border-radius:8px;border:0;background:#D42E1D;color:#FFFFFF;font:inherit;font-weight:700;cursor:pointer}
@media print{body{background:#FFFFFF}.page{padding:0;max-width:none}.toolbar{display:none}.week{-webkit-print-color-adjust:exact;print-color-adjust:exact}section{break-before:auto}.day,.goals tr{break-inside:avoid}}
@page{margin:0.6in}`;
  function vars(doc, ctx) {
    ctx = ctx || {};
    const startIso = doc.start || ctx.start || '';
    const st = startIso ? new Date(startIso + 'T12:00:00') : null;
    return { startIso, name: ctx.name || doc.personName || '', first: (ctx.name || doc.personName || '').split(' ')[0], role: ctx.role || doc.role || '', branch: ctx.branch || doc.branch || '', manager: ctx.manager || doc.manager || '', start: st ? fmt(st, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : '' };
  }
  window.WSISchedule = {
    dayDates, weekRange,
    html(doc, ctx, opts) {
      opts = opts || {}; const v = vars(doc, ctx), isPromo = doc.kind === 'Promotion';
      const facts = [[isPromo ? 'Promotion effective' : 'Start date', v.start], ['Role', v.role], ['Branch', v.branch], ['Manager', v.manager]].filter(f => f[1]);
      return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc((v.name ? v.name + ' – ' : '') + (doc.title || 'Training Schedule')) + '</title><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"><style>' + CSS + '</style></head><body><div class="page">' +
        (opts.toolbar ? '<div class="toolbar"><button onclick="window.print()">Print or save as PDF</button></div>' : '') +
        '<header><div><div class="kicker">' + esc(isPromo ? 'Promotion training schedule' : 'Training schedule') + '</div><h1>' + esc(v.name || doc.title || 'Training Schedule') + '</h1><div class="meta">' + esc(v.name ? (doc.title || '') : (doc.role || '')) + '</div></div>' + (opts.logo ? '<img src="' + esc(opts.logo) + '" alt="WSI">' : '') + '</header>' +
        (facts.length ? '<div class="facts">' + facts.map(f => '<div><span>' + esc(f[0]) + '</span><span>' + esc(f[1]) + '</span></div>').join('') + '</div>' : '') +
        body(doc, v) + '</div></body></html>';
    },
    open(doc, ctx, opts) {
      const w = window.open('', '_blank');
      if (!w) { alert('Allow pop-ups to open the schedule.'); return; }
      w.document.open(); w.document.write(this.html(doc, ctx, { ...(opts || {}), toolbar: true })); w.document.close();
    },
  };
})();
