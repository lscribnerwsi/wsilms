// WSI Learning: shared storage layer.
// On the Netlify site (functions deployed) everything syncs to Netlify Blobs.
// Anywhere else (preview, downloaded demo file) it falls back to this browser only.
(function () {
  if (window.WSIStore) return;
  // Set to false before real use to start with no sample people or assignments.
  var SAMPLE_DATA = true;

  var SYNC = { 'wsi-admin-v5': 'admin-v5', 'wsi-schedule': 'schedule', 'wsi-custom-modules': 'custom-modules', 'wsi-module-overrides': 'module-overrides', 'wsi-hidden-modules': 'hidden-modules' };
  var LOCAL_ONLY_ADMIN = ['role', 'tab', 'filter', 'asgFilter'];
  var LEARNER = 'wsi-training-v2';
  var ls = window.localStorage;
  var origSet = Storage.prototype.setItem;
  var timers = {};
  var slug = function (n) { return 'progress-' + String(n || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80); };
  var rawSet = function (k, v) { try { origSet.call(ls, k, v); } catch (e) {} };
  var parse = function (s, d) { try { return JSON.parse(s); } catch (e) { return d; } };

  var S = window.WSIStore = {
    server: false, sampleData: SAMPLE_DATA, allProgress: [], status: 'local', problem: '',
    api: function (path, opts) { return fetch(path, opts).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); },
    put: function (doc, value) { return S.api('/api/data/' + doc, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: typeof value === 'string' ? value : JSON.stringify(value) }); },
    putFile: function (key, blob) {
      if (blob.size > 5.5e6) return Promise.reject(new Error('File is larger than 5.5 MB'));
      return fetch('/api/files/' + encodeURIComponent(key), { method: 'PUT', headers: { 'Content-Type': blob.type || 'application/octet-stream', 'X-Filename': encodeURIComponent(blob.name || key) }, body: blob })
        .then(function (r) { if (!r.ok) throw new Error('Upload failed (' + r.status + ')'); return r.json(); });
    },
    delFile: function (key) { return fetch('/api/files/' + encodeURIComponent(key), { method: 'DELETE' }).catch(function () {}); },
    fileUrl: function (key) { return '/api/files/' + encodeURIComponent(key); },
    loadProgress: function (name) { return S.server ? S.api('/api/data/' + slug(name)).catch(function () { return null; }) : Promise.resolve(null); },
    _push: function (k, v) {
      if (!S.server) return;
      var doc, body;
      if (SYNC[k]) {
        doc = SYNC[k];
        if (k === 'wsi-admin-v5') { var o = parse(v, {}); LOCAL_ONLY_ADMIN.forEach(function (x) { delete o[x]; }); body = JSON.stringify(o); } else body = v;
      } else if (k === LEARNER) {
        var t = parse(v, {});
        if (!t.name) return;
        doc = slug(t.name);
        var rec = { name: t.name, prog: t.prog || {}, updatedAt: Date.now() };
        body = JSON.stringify(rec);
        var i = S.allProgress.findIndex(function (p) { return p.name.toLowerCase() === t.name.toLowerCase(); });
        if (i >= 0) S.allProgress[i] = rec; else S.allProgress.push(rec);
      } else return;
      clearTimeout(timers[doc]);
      S.status = 'saving';
      timers[doc] = setTimeout(function () {
        S.put(doc, body).then(function () { S.status = 'saved'; }).catch(function () { S.status = 'error'; console.warn('WSI: could not save ' + doc); });
      }, 600);
    }
  };

  Storage.prototype.setItem = function (k, v) {
    origSet.call(this, k, v);
    if (this === ls) S._push(k, v);
  };

  var withTimeout = function (p, ms) { return Promise.race([p, new Promise(function (res) { setTimeout(function () { res('__timeout'); }, ms); })]); };
  var isFile = location.protocol === 'file:';
  var health = isFile ? Promise.resolve(null) : withTimeout(fetch('/api/data/__health', { cache: 'no-store' })
    .then(function (r) {
      if (r.ok) return r.json().catch(function () { S.problem = 'The storage function answered, but not with data. Check Site → Logs → Functions in Netlify.'; return null; });
      S.problem = r.status === 404 ? 'The storage functions are not deployed (404 at /api/data/__health). Deploy from GitHub, not drag-and-drop.' : 'The storage function returned an error (' + r.status + '). Check Site → Logs → Functions in Netlify.';
      return null;
    })
    .catch(function () { return null; }), 4000).then(function (h) { if (h === '__timeout') { S.problem = 'The storage function took too long to answer.'; return null; } return h; });
  S.ready = withTimeout(health.then(function (h) {
      if (h) console.info('WSI storage: connected'); else if (S.problem) console.warn('WSI storage: ' + S.problem);
      if (!h || !h.ok) return;
      S.server = true; S.status = 'saved';
      var docs = Object.keys(SYNC);
      return Promise.all([
        Promise.all(docs.map(function (k) {
          return S.api('/api/data/' + SYNC[k]).then(function (v) {
            if (v == null) { var loc = ls.getItem(k); if (loc) S._push(k, loc); return; }
            if (k === 'wsi-admin-v5') { var cur = parse(ls.getItem(k), {}); LOCAL_ONLY_ADMIN.forEach(function (x) { if (cur[x] != null) v[x] = cur[x]; }); }
            rawSet(k, JSON.stringify(v));
          }).catch(function () {});
        })),
        S.api('/api/data?prefix=progress-').then(function (list) { S.allProgress = (list || []).map(function (x) { return x.value; }).filter(Boolean); }).catch(function () {}),
        (function () {
          var t = parse(ls.getItem(LEARNER), {});
          if (!t.name) return null;
          return S.loadProgress(t.name).then(function (doc) { if (doc && doc.prog) { t.prog = doc.prog; rawSet(LEARNER, JSON.stringify(t)); } });
        })()
      ]);
    }), 7000).then(function () { return S; });
})();
