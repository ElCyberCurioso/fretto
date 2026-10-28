/* Fretto · herramientas de práctica */
(function () {
  'use strict';
  const M = window.M;
  const A = M.audio;
  const h = M.h;
  const T = (M.tools = M.tools || {});
  const rnd = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[rnd(arr.length)];
  const PC_NAMES = (pc) => {
    const s = M.pcNote(pc, false), f = M.pcNote(pc, true);
    return s.acc ? M.name(s) + '/' + M.name(f) : M.name(s);
  };

  function panel(parent, cls) { const p = h('div', 'w-panel' + (cls ? ' ' + cls : '')); parent.appendChild(p); return p; }
  function row(parent, cls) { const r = h('div', cls || 'w-tools'); parent.appendChild(r); return r; }
  function tempoCtl(get, set, min, max) {
    const tempo = h('label', 'tempo', '<span>Tempo</span>');
    const out = h('output', null, String(get()));
    const minus = h('button', 'step', '−'); minus.type = 'button'; minus.setAttribute('aria-label', 'Más lento');
    const plus = h('button', 'step', '+'); plus.type = 'button'; plus.setAttribute('aria-label', 'Más rápido');
    minus.onclick = () => { set(Math.max(min || 30, get() - 5)); out.textContent = get(); };
    plus.onclick = () => { set(Math.min(max || 240, get() + 5)); out.textContent = get(); };
    tempo.append(minus, out, plus, h('span', 'unit', 'ppm'));
    tempo.refresh = () => (out.textContent = get());
    return tempo;
  }
  M.tempoCtl = tempoCtl;

  /* =========================================================
     Explorador del diapasón
     ========================================================= */
  const SCALE_GROUPS = [
    ['Básicas', ['major', 'minor', 'pentMajor', 'pentMinor', 'blues', 'majorBlues']],
    ['Menores', ['harmonicMinor', 'melodicMinor']],
    ['Modos', ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']],
    ['Avanzadas', ['phrygianDominant', 'lydianDominant', 'altered', 'wholeTone', 'dimHW', 'dimWH', 'chromatic']],
  ];
  const CHORD_GROUPS = [
    ['Tríadas', ['', 'm', 'dim', 'aug', 'sus2', 'sus4', '5']],
    ['Cuatriadas', ['maj7', '7', 'm7', 'm7b5', 'dim7', 'mMaj7', '6', 'm6', '7sus4']],
    ['Extendidas', ['add9', 'madd9', '6/9', 'maj9', '9', 'm9', 'm11', '13', 'maj7s11']],
    ['Alteradas', ['7b9', '7#9', '7#11', '7b13', '7alt']],
  ];
  function groupedSelect(groups, dict, value, onChange, label) {
    const wrap = h('label');
    if (label) wrap.appendChild(h('span', null, label));
    const sel = h('select');
    groups.forEach(([g, ids]) => {
      const og = document.createElement('optgroup');
      og.label = g;
      ids.forEach((id) => {
        const o = h('option');
        o.value = id; o.textContent = dict[id].name + (dict === M.CHORDS ? ` (${M.chordSym(id) || 'M'})` : '');
        if (id === value) o.selected = true;
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
    sel.addEventListener('change', () => onChange(sel.value));
    wrap.appendChild(sel);
    return wrap;
  }

  T.diapason = {
    title: 'Explorador del diapasón',
    desc: 'Cualquier escala, acorde o nota sobre el mástil, con notas o intervalos y varias afinaciones.',
    lead: 'Elige qué quieres ver y pulsa los trastes para escucharlos. Cambia las etiquetas a intervalos para entender las formas, o quítalas para practicar de memoria.',
    render(el, c) {
      const st = Object.assign({ root: 'A', kind: 'scale', scale: 'pentMinor', chord: 'm7', label: 'note', color: 'role', tuning: 'standard', frets: '0-15' }, c.state || {});
      const p = panel(el);
      const r1 = row(p);
      r1.appendChild(M.select(M.rootOptions(), st.root, (v) => { st.root = v; draw(); }, 'Tónica'));
      r1.appendChild(M.select([{ v: 'scale', t: 'Escala' }, { v: 'chord', t: 'Acorde (arpegio)' }, { v: 'one', t: 'Una sola nota' }, { v: 'nat', t: 'Notas naturales' }, { v: 'all', t: 'Todas las notas' }], st.kind, (v) => { st.kind = v; draw(true); }, 'Mostrar'));
      const slot = h('span');
      slot.style.display = 'contents';
      r1.appendChild(slot);
      const r2 = row(p);
      r2.appendChild(M.select([{ v: 'note', t: 'Nombres de nota' }, { v: 'interval', t: 'Intervalos' }, { v: 'none', t: 'Sin etiquetas' }], st.label, (v) => { st.label = v; fb.cfg.label = v; fb.drawDots(); }, 'Etiquetas'));
      r2.appendChild(M.select([{ v: 'role', t: 'Por función' }, { v: 'root', t: 'Solo la tónica' }, { v: 'mono', t: 'Uniformes' }], st.color, (v) => { st.color = v; fb.cfg.color = v; fb.drawDots(); upd(); }, 'Colores'));
      r2.appendChild(M.select(Object.keys(M.TUNINGS).map((k) => ({ v: k, t: M.TUNINGS[k].name })), st.tuning, (v) => { st.tuning = v; fb.update({ tuning: v }); upd(); }, 'Afinación'));
      r2.appendChild(M.select([{ v: '0-12', t: '0 a 12' }, { v: '0-15', t: '0 a 15' }, { v: '0-22', t: '0 a 22' }], st.frets, (v) => { st.frets = v; fb.update({ frets: v.split('-').map(Number) }); upd(); }, 'Trastes'));
      const notes = h('div', 'notes-row');
      notes.style.margin = '4px 0 14px';
      p.appendChild(notes);
      const host = h('div');
      p.appendChild(host);
      const lg = h('div');
      p.appendChild(lg);
      const fb = new M.Fretboard(host, { frets: st.frets.split('-').map(Number), label: st.label, color: st.color, tuning: st.tuning, show: { root: st.root, scale: st.scale } });
      function show() {
        if (st.kind === 'scale') return { root: st.root, scale: st.scale };
        if (st.kind === 'chord') return { root: st.root, chord: st.chord };
        if (st.kind === 'one') return { root: st.root, ivs: ['1'] };
        if (st.kind === 'nat') return { root: 'C', ivs: ['1', '2', '3', '4', '5', '6', '7'] };
        return { root: 'C', scale: 'chromatic' };
      }
      function draw(rebuildSlot) {
        if (rebuildSlot !== false) {
          slot.innerHTML = '';
          if (st.kind === 'scale') slot.appendChild(groupedSelect(SCALE_GROUPS, M.SCALES, st.scale, (v) => { st.scale = v; draw(false); }, 'Escala'));
          if (st.kind === 'chord') slot.appendChild(groupedSelect(CHORD_GROUPS, M.CHORDS, st.chord, (v) => { st.chord = v; draw(false); }, 'Acorde'));
        }
        const s = show();
        fb.cfg.color = st.kind === 'nat' || st.kind === 'all' ? (st.color === 'role' ? 'mono' : st.color) : st.color;
        fb.cfg.label = st.kind === 'nat' || st.kind === 'all' ? (st.label === 'interval' ? 'note' : st.label) : st.label;
        fb.setShow(s);
        upd();
      }
      function upd() {
        const s = show();
        notes.innerHTML = '';
        if (st.kind === 'scale' || st.kind === 'chord') {
          const ivs = s.scale ? M.SCALES[s.scale].ivs : M.CHORDS[s.chord].ivs;
          ivs.forEach((iv) => {
            const n = M.transpose(s.root, iv);
            const ch = h('button', 'nchip' + (iv === '1' ? ' r' : ''), `<b>${M.rich(M.name(n))}</b><small>${M.ivLabel(iv)}</small>`);
            ch.type = 'button';
            ch.onclick = () => A.pluck(48 + M.mod(M.pcOf(M.parseNote(s.root)), 12) + M.INTERVALS[iv].semi, 0, { dur: 1 });
            notes.appendChild(ch);
          });
          const play = h('button', 'btn small ghost', '<span class="ico ico-play"></span> Escuchar');
          play.type = 'button';
          play.style.marginLeft = '8px';
          play.onclick = () => {
            A.stopAll();
            const base = 48 + M.mod(M.pcOf(M.parseNote(s.root)), 12);
            const semis = ivs.map((iv) => M.INTERVALS[iv].semi).concat([12]);
            semis.forEach((x, i) => A.pluck(base + x, A.now() + 0.05 + i * (s.chord ? 0.28 : 0.36), { dur: s.chord ? 2 : 0.4 }));
          };
          notes.appendChild(play);
        }
        lg.innerHTML = '';
        if (fb.cfg.color === 'role' && (st.kind === 'scale' || st.kind === 'chord')) lg.appendChild(M.legend(fb.dots));
      }
      draw(true);
    },
  };

  /* =========================================================
     Diccionario de acordes
     ========================================================= */
  T.acordes = {
    title: 'Diccionario de acordes',
    desc: 'Más de 30 tipos de acorde en las 12 tonalidades, con varias digitaciones que puedes escuchar.',
    lead: 'Elige la fundamental y el tipo. Verás la fórmula, las notas, varias digitaciones por todo el mástil y dónde están sus notas en el diapasón.',
    render(el, c) {
      const st = Object.assign({ root: 'C', type: 'maj7', label: 'finger' }, c.state || {});
      const p = panel(el);
      const r0 = row(p, 'chips');
      r0.style.marginBottom = '12px';
      M.ROOTS12.forEach((r) => {
        const b = h('button', 'chip', M.rich(M.name(r)));
        b.type = 'button';
        b.setAttribute('aria-pressed', String(r === st.root));
        b.onclick = () => { r0.querySelectorAll('.chip').forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); st.root = r; draw(); };
        r0.appendChild(b);
      });
      const r1 = row(p);
      r1.appendChild(groupedSelect(CHORD_GROUPS, M.CHORDS, st.type, (v) => { st.type = v; draw(); }, 'Tipo'));
      r1.appendChild(M.select([{ v: 'finger', t: 'Dedos' }, { v: 'interval', t: 'Intervalos' }, { v: 'note', t: 'Notas' }], st.label, (v) => { st.label = v; draw(); }, 'En los diagramas'));
      const head = h('div');
      p.appendChild(head);
      const cards = h('div', 'chord-row');
      cards.style.margin = '10px 0 18px';
      p.appendChild(cards);
      const host = h('div');
      p.appendChild(host);
      const lg = h('div');
      p.appendChild(lg);
      const fb = new M.Fretboard(host, { frets: [0, 15], label: 'interval', show: { root: st.root, chord: st.type } });
      function draw() {
        const ch = M.CHORDS[st.type];
        const notes = M.chordNotes(st.root, st.type);
        head.innerHTML = `<div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 18px;font-family:var(--ui)"><span style="font:780 2.2rem/1.1 var(--ui);font-stretch:85%">${M.rich(M.chordName(st.root, st.type))}</span><span style="color:var(--ink-2)">${ch.name}. Fórmula ${ch.ivs.map(M.ivLabel).join(' ')}</span></div>`;
        const nr = h('div', 'notes-row');
        nr.style.marginTop = '10px';
        notes.forEach((n, i) => {
          const iv = ch.ivs[i];
          nr.appendChild(h('span', 'nchip' + (iv === '1' ? ' r' : ''), `<b>${M.rich(M.name(n))}</b><small>${M.ivLabel(iv)}</small>`));
        });
        const arp = h('button', 'btn small ghost', '<span class="ico ico-play"></span> Arpegio');
        arp.type = 'button';
        arp.style.marginLeft = '8px';
        arp.onclick = () => {
          A.stopAll();
          const base = 48 + M.mod(M.pcOf(M.parseNote(st.root)), 12);
          ch.ivs.forEach((iv, i) => A.pluck(base + M.INTERVALS[iv].semi, A.now() + 0.05 + i * 0.3, { dur: 2.4 }));
        };
        nr.appendChild(arp);
        head.appendChild(nr);
        cards.innerHTML = '';
        const sym = st.root + st.type;
        const list = [];
        const known = M.SHAPES[sym] || M.SHAPES[M.noteKey(M.parseNote(st.root)) + st.type] ? M.chordShape(sym) : null;
        if (known) list.push(known);
        M.voicings(st.root, st.type, { max: 12, perZone: 2 }).forEach((v) => { if (!list.some((x) => x.frets.join() === v.frets.join())) list.push(v); });
        if (!list.length) cards.innerHTML = '<p class="empty">No hay digitaciones cómodas de este acorde con la fundamental en el bajo.</p>';
        list.slice(0, 10).forEach((v) => cards.appendChild(M.chordCard(sym, { shape: v, label: st.label })));
        fb.setShow({ root: st.root, chord: st.type });
        lg.innerHTML = ''; lg.appendChild(M.legend(fb.dots));
      }
      draw();
    },
  };

  /* =========================================================
     Metrónomo
     ========================================================= */
  const METERS = {
    '2/4': { beats: 2, lv: (b) => (b === 0 ? 2 : 1) },
    '3/4': { beats: 3, lv: (b) => (b === 0 ? 2 : 1) },
    '4/4': { beats: 4, lv: (b) => (b === 0 ? 2 : 1) },
    '5/4': { beats: 5, lv: (b) => (b === 0 ? 2 : b === 3 ? 1.5 : 1) },
    '6/8': { beats: 6, lv: (b) => (b === 0 ? 2 : b === 3 ? 1.5 : 0) },
    '7/8': { beats: 7, lv: (b) => (b === 0 ? 2 : b === 2 || b === 4 ? 1.5 : 0) },
    '12/8': { beats: 12, lv: (b) => (b === 0 ? 2 : b % 3 === 0 ? 1.5 : 0) },
  };
  const TEMPO_NAMES = [[40, 'Grave'], [55, 'Largo'], [66, 'Adagio'], [76, 'Andante'], [108, 'Moderato'], [120, 'Allegretto'], [156, 'Allegro'], [176, 'Vivace'], [200, 'Presto'], [999, 'Prestissimo']];
  T.metronomo = {
    title: 'Metrónomo',
    desc: 'Compases simples y compuestos, subdivisiones, acentos, tempo por pulsación y subida automática de velocidad.',
    lead: 'Practica siempre con pulso. Empieza lento, donde todo salga limpio, y sube de 5 en 5. La barra espaciadora inicia y detiene el metrónomo.',
    render(el, c) {
      const st = Object.assign({ bpm: 80, meter: '4/4', sub: 1, accent: true, trainer: false, every: 4, inc: 5, max: 160 }, c.state || {});
      const p = panel(el);
      const box = h('div', 'metro');
      p.appendChild(box);
      const bpmEl = h('div', 'metro-bpm', '');
      const nameEl = h('div', null, '');
      nameEl.style.cssText = 'color:var(--ink-2);font-weight:550;margin-top:-10px';
      const dots = h('div', 'metro-dots');
      const slider = h('input');
      slider.type = 'range'; slider.min = 30; slider.max = 250; slider.value = st.bpm;
      slider.setAttribute('aria-label', 'Tempo en pulsos por minuto');
      const r1 = h('div', 'metro-row');
      const mk = (txt, fn, cls) => { const b = h('button', cls || 'btn ghost small', txt); b.type = 'button'; b.onclick = fn; return b; };
      r1.append(mk('−10', () => setBpm(st.bpm - 10)), mk('−1', () => setBpm(st.bpm - 1)));
      const startBtn = mk('<span class="ico ico-play"></span><span>Empezar</span>', () => toggle(), 'btn');
      startBtn.style.minWidth = '140px';
      startBtn.style.justifyContent = 'center';
      r1.append(startBtn, mk('+1', () => setBpm(st.bpm + 1)), mk('+10', () => setBpm(st.bpm + 10)));
      const tap = mk('Marcar tempo (tap)', () => doTap(), 'btn ghost');
      box.append(bpmEl, nameEl, dots, slider, r1, tap);
      const r2 = row(p);
      r2.style.justifyContent = 'center';
      r2.style.marginTop = '18px';
      r2.appendChild(M.select(Object.keys(METERS).map((k) => ({ v: k, t: k })), st.meter, (v) => { st.meter = v; rebuild(); }, 'Compás'));
      r2.appendChild(M.select([{ v: '1', t: 'Sin subdivisión' }, { v: '2', t: 'Corcheas' }, { v: '3', t: 'Tresillos' }, { v: '4', t: 'Semicorcheas' }], String(st.sub), (v) => { st.sub = +v; rebuild(); }, 'Subdivisión'));
      const acc = h('label', 'chk', `<input type="checkbox" ${st.accent ? 'checked' : ''}> Acentuar el 1`);
      acc.querySelector('input').onchange = (e) => { st.accent = e.target.checked; };
      r2.appendChild(acc);
      const r3 = row(p);
      r3.style.justifyContent = 'center';
      const tr = h('label', 'chk', `<input type="checkbox" ${st.trainer ? 'checked' : ''}> Subir el tempo automáticamente`);
      tr.querySelector('input').onchange = (e) => { st.trainer = e.target.checked; bars = 0; };
      r3.appendChild(tr);
      r3.appendChild(M.select([2, 4, 8].map((x) => ({ v: String(x), t: `cada ${x} compases` })), String(st.every), (v) => { st.every = +v; }, ''));
      r3.appendChild(M.select([1, 2, 5, 10].map((x) => ({ v: String(x), t: `+${x} ppm` })), String(st.inc), (v) => { st.inc = +v; }, ''));
      r3.appendChild(M.select([100, 120, 140, 160, 180, 200, 220].map((x) => ({ v: String(x), t: `hasta ${x}` })), String(st.max), (v) => { st.max = +v; }, ''));
      let bars = 0;
      const met = new A.Metronome({ bpm: st.bpm, beats: 4, sub: 1 });
      function rebuild() {
        const m = METERS[st.meter];
        const eighth = st.meter.endsWith('/8');
        met.beats = m.beats;
        met.sub = eighth ? 1 : st.sub;
        met.bpm = eighth ? st.bpm * (st.meter === '7/8' ? 2 : 3) : st.bpm;
        met.levelFn = (b, s) => {
          if (s !== 0) return 0;
          let l = m.lv(b);
          if (!st.accent && l === 2) l = 1;
          return l === 1.5 ? 1 : l;
        };
        dots.innerHTML = '';
        for (let i = 0; i < m.beats; i++) {
          const d = h('i');
          if (m.lv(i) >= 1.5) d.className = 'acc';
          if (eighth && m.lv(i) === 0) { d.style.width = '14px'; d.style.height = '14px'; d.style.alignSelf = 'center'; }
          dots.appendChild(d);
        }
        if (met.running) { met.stop(); met.start(); setBtn(true); }
      }
      met.onBeat = (b, s) => {
        if (s !== 0) return;
        const ds = dots.querySelectorAll('i');
        ds.forEach((d, i) => d.classList.toggle('on', i === b));
        if (b === 0) {
          bars++;
          if (st.trainer && bars > 1 && (bars - 1) % st.every === 0 && st.bpm < st.max) setBpm(Math.min(st.max, st.bpm + st.inc));
        }
      };
      met.onStop = () => { dots.querySelectorAll('i').forEach((d) => d.classList.remove('on')); setBtn(false); };
      function setBtn(on) {
        startBtn.innerHTML = on ? '<span class="ico ico-stop"></span><span>Detener</span>' : '<span class="ico ico-play"></span><span>Empezar</span>';
        startBtn.classList.toggle('is-playing', on);
      }
      function setBpm(v) {
        st.bpm = Math.max(30, Math.min(250, Math.round(v)));
        bpmEl.innerHTML = `${st.bpm}<small>ppm</small>`;
        slider.value = st.bpm;
        nameEl.textContent = TEMPO_NAMES.find((x) => st.bpm < x[0])[1];
        const m = st.meter;
        met.bpm = m.endsWith('/8') ? st.bpm * (m === '7/8' ? 2 : 3) : st.bpm;
      }
      function toggle() {
        if (met.running) met.stop();
        else { bars = 0; met.start(); setBtn(true); }
      }
      slider.addEventListener('input', () => setBpm(+slider.value));
      let taps = [];
      function doTap() {
        const t = performance.now();
        taps = taps.filter((x) => t - x < 2500);
        taps.push(t);
        A.click(0, 1);
        if (taps.length >= 2) {
          const iv = [];
          for (let i = 1; i < taps.length; i++) iv.push(taps[i] - taps[i - 1]);
          setBpm(60000 / (iv.reduce((a, b) => a + b, 0) / iv.length));
        }
      }
      const key = (e) => {
        if (e.code !== 'Space' || /INPUT|SELECT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)) return;
        e.preventDefault();
        toggle();
      };
      document.addEventListener('keydown', key);
      M.onLeave && M.onLeave(() => document.removeEventListener('keydown', key));
      setBpm(st.bpm);
      rebuild();
      if (!c.embedded) {
        const tips = h('div', 'prose');
        tips.style.marginTop = '28px';
        tips.innerHTML = `<h2>Cómo practicar con metrónomo</h2><ul>
          <li><strong>Encuentra tu tempo limpio:</strong> la velocidad a la que tocas el pasaje sin un solo error tres veces seguidas. Ese es tu punto de partida.</li>
          <li><strong>Usa la subdivisión</strong> cuando toques corcheas o semicorcheas: oír cada nota interna evita que corras.</li>
          <li><strong>Silencia el 1</strong> (desmarca el acento) cuando ya lo domines: tendrás que sentir tú el inicio del compás.</li>
          <li><strong>Pon el clic en 2 y 4</strong> para practicar swing y blues: marca la mitad del tempo y siente los clics como contratiempos.</li>
          <li><strong>Subida automática:</strong> elige un tope realista. Si en algún momento fallas, baja 10 ppm y vuelve a subir.</li></ul>`;
        el.appendChild(tips);
      }
    },
  };

  /* =========================================================
     Afinador
     ========================================================= */
  function detectPitch(buf, sr) {
    const SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.008) return -1;
    let r1 = 0, r2 = SIZE - 1;
    const th = 0.2;
    for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < th) { r1 = i; break; }
    for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < th) { r2 = SIZE - i; break; }
    const b = buf.slice(r1, r2);
    const n = b.length;
    const c = new Float32Array(n);
    const maxLag = Math.min(n, Math.floor(sr / 60));
    for (let i = 0; i < maxLag; i++) { let s = 0; for (let j = 0; j < n - i; j++) s += b[j] * b[j + i]; c[i] = s; }
    let d = 0;
    while (d < maxLag - 1 && c[d] > c[d + 1]) d++;
    let maxv = -1, maxp = -1;
    for (let i = d; i < maxLag; i++) if (c[i] > maxv) { maxv = c[i]; maxp = i; }
    if (maxp <= 0 || maxv < c[0] * 0.3) return -1;
    let T0 = maxp;
    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1] || x2;
    const a = (x1 + x3 - 2 * x2) / 2, bb = (x3 - x1) / 2;
    if (a) T0 = T0 - bb / (2 * a);
    const f = sr / T0;
    return f > 55 && f < 1400 ? f : -1;
  }
  T.afinador = {
    title: 'Afinador',
    desc: 'Afinador cromático por micrófono y notas de referencia para cada cuerda, en seis afinaciones.',
    lead: 'Activa el micrófono y toca una cuerda al aire: la aguja indica si está alta o baja. Si prefieres afinar de oído, usa las notas de referencia.',
    render(el, c) {
      let tuning = 'standard', ref = 440;
      const p = panel(el);
      const r1 = row(p);
      r1.style.justifyContent = 'center';
      r1.appendChild(M.select(Object.keys(M.TUNINGS).map((k) => ({ v: k, t: M.TUNINGS[k].name })), tuning, (v) => { tuning = v; drawStrings(); }, 'Afinación'));
      r1.appendChild(M.select([432, 435, 438, 440, 442, 444].map((x) => ({ v: String(x), t: `La = ${x} Hz` })), '440', (v) => { ref = +v; }, 'Referencia'));
      const gauge = M.svg('svg', { viewBox: '0 0 520 280', class: 'tuner-gauge', role: 'img', 'aria-label': 'Indicador de afinación' });
      p.appendChild(gauge);
      const cx = 260, cy = 250, R = 210;
      const arc = (a0, a1, r) => {
        const p0 = [cx + r * Math.sin(a0), cy - r * Math.cos(a0)], p1 = [cx + r * Math.sin(a1), cy - r * Math.cos(a1)];
        return `M${p0[0]} ${p0[1]} A${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`;
      };
      const ang = (cents) => (cents / 50) * (Math.PI * 0.42);
      {
        const r1 = R - 52, r2 = R - 12, a0 = ang(-5), a1 = ang(5);
        const P = (r, a) => `${cx + r * Math.sin(a)} ${cy - r * Math.cos(a)}`;
        M.svg('path', { d: `M${P(r2, a0)} A${r2} ${r2} 0 0 1 ${P(r2, a1)} L${P(r1, a1)} A${r1} ${r1} 0 0 0 ${P(r1, a0)} Z`, class: 'zone' }, gauge);
      }
      for (let k = -50; k <= 50; k += 5) {
        const a = ang(k);
        const major = k % 25 === 0;
        const r0 = major ? R - 28 : R - 16;
        M.svg('line', { x1: cx + r0 * Math.sin(a), y1: cy - r0 * Math.cos(a), x2: cx + R * Math.sin(a), y2: cy - R * Math.cos(a), class: 'tick' + (major ? ' major' : '') }, gauge);
        if (major) M.svgText(gauge, cx + (R + 18) * Math.sin(a), cy - (R + 18) * Math.cos(a) + 5, (k > 0 ? '+' : '') + k, { 'text-anchor': 'middle', 'font-size': 13, fill: 'var(--ink-3)' });
      }
      M.svgText(gauge, cx - 150, cy + 22, 'Baja', { 'text-anchor': 'middle', 'font-size': 14, fill: 'var(--ink-3)', 'font-weight': 600 });
      M.svgText(gauge, cx + 150, cy + 22, 'Alta', { 'text-anchor': 'middle', 'font-size': 14, fill: 'var(--ink-3)', 'font-weight': 600 });
      const needle = M.svg('line', { x1: cx, y1: cy, x2: cx, y2: cy - R + 6, class: 'needle' }, gauge);
      M.svg('circle', { cx, cy, r: 8, fill: 'var(--ink)' }, gauge);
      const readout = h('div');
      readout.style.cssText = 'text-align:center;font-family:var(--ui);margin-top:-6px';
      const noteEl = h('div', 'big-note', '<span style="color:var(--rule-2)">–</span>');
      const infoEl = h('div', null, 'Activa el micrófono para empezar');
      infoEl.style.cssText = 'color:var(--ink-2);font-size:.95rem;min-height:1.5em;margin-top:4px';
      readout.append(noteEl, infoEl);
      p.appendChild(readout);
      const r2 = row(p);
      r2.style.justifyContent = 'center';
      const micBtn = h('button', 'btn', 'Activar micrófono');
      micBtn.type = 'button';
      r2.appendChild(micBtn);
      const msg = h('p', 'w-cap');
      msg.style.textAlign = 'center';
      msg.style.margin = '0 auto';
      p.appendChild(msg);
      p.appendChild(h('h3', null, 'Notas de referencia')).style.cssText = 'font:650 1rem var(--ui);margin:22px 0 10px;text-align:center';
      const strings = h('div', 'string-btns');
      p.appendChild(strings);
      const cont = h('label', 'chk', '<input type="checkbox"> Sonido continuo (tono puro, más fácil de comparar)');
      cont.style.cssText = 'display:flex;justify-content:center;margin-top:12px;font-family:var(--ui);font-size:.9rem;color:var(--ink-2)';
      p.appendChild(cont);
      function drawStrings() {
        strings.innerHTML = '';
        const t = M.tuningMidi(tuning);
        [6, 5, 4, 3, 2, 1].forEach((s) => {
          const midi = t[6 - s];
          const n = M.spellMidi(midi, tuning === 'openD' || tuning === 'dropD' || tuning === 'dadgad' || tuning === 'openG' ? 2 : 0);
          const b = h('button', null, `${M.rich(M.name(n))}<small>${s}.ª · ${n.oct}</small>`);
          b.type = 'button';
          b.setAttribute('aria-label', `Cuerda ${s}: ${M.name(n)}`);
          b.onclick = () => {
            A.stopAll();
            strings.querySelectorAll('button').forEach((x) => x.classList.remove('on'));
            b.classList.add('on');
            const f = ref * Math.pow(2, (midi - 69) / 12);
            if (cont.querySelector('input').checked) A.tone(f, 4);
            else A.pluck(midi, 0, { vel: 0.9 });
          };
          strings.appendChild(b);
        });
      }
      drawStrings();
      let stream = null, raf = 0, analyser = null, src = null;
      const hist = [];
      function stop() {
        cancelAnimationFrame(raf);
        if (stream) stream.getTracks().forEach((t) => t.stop());
        if (src) try { src.disconnect(); } catch (e) {}
        stream = null;
        micBtn.textContent = 'Activar micrófono';
        noteEl.innerHTML = '<span style="color:var(--rule-2)">–</span>';
        infoEl.textContent = 'Activa el micrófono para empezar';
        needle.style.transform = 'rotate(0deg)';
      }
      micBtn.onclick = async () => {
        if (stream) { stop(); return; }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { msg.textContent = 'Este navegador no permite usar el micrófono. Usa las notas de referencia.'; return; }
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
        } catch (e) {
          msg.textContent = 'No hay permiso para usar el micrófono. Actívalo en los ajustes del navegador para esta página y vuelve a intentarlo.';
          return;
        }
        const ctx = A.ctx();
        src = ctx.createMediaStreamSource(stream);
        analyser = ctx.createAnalyser();
        analyser.fftSize = 4096;
        src.connect(analyser);
        const buf = new Float32Array(analyser.fftSize);
        micBtn.textContent = 'Desactivar micrófono';
        msg.textContent = '';
        infoEl.textContent = 'Toca una cuerda';
        let lastSeen = 0;
        const loop = () => {
          analyser.getFloatTimeDomainData(buf);
          const f = detectPitch(buf, ctx.sampleRate);
          const now = performance.now();
          if (f > 0) {
            hist.push(f);
            if (hist.length > 5) hist.shift();
            const sorted = hist.slice().sort((a, b) => a - b);
            const fm = sorted[Math.floor(sorted.length / 2)];
            const midiF = 69 + 12 * Math.log2(fm / ref);
            const midi = Math.round(midiF);
            const cents = Math.round((midiF - midi) * 100);
            const n = M.spellMidi(midi, 0);
            noteEl.innerHTML = M.rich(M.name(n)) + `<sub style="font-size:.32em;font-weight:600;color:var(--ink-3)">${n.oct}</sub>`;
            const t = M.tuningMidi(tuning);
            let best = null;
            t.forEach((m, i) => { if (!best || Math.abs(m - midiF) < Math.abs(best.m - midiF)) best = { m, s: 6 - i }; });
            const near = Math.abs(best.m - midiF) < 0.6 ? ` (cuerda ${best.s})` : '';
            infoEl.textContent = `${fm.toFixed(1)} Hz, ${cents > 0 ? '+' : ''}${cents} cents${near}${Math.abs(cents) <= 4 ? ', afinada' : ''}`;
            needle.style.transform = `rotate(${Math.max(-50, Math.min(50, cents)) / 50 * 75.6}deg)`;
            needle.style.stroke = Math.abs(cents) <= 4 ? 'var(--s)' : 'var(--accent)';
            lastSeen = now;
          } else if (now - lastSeen > 1200) {
            hist.length = 0;
            needle.style.transform = 'rotate(0deg)';
          }
          raf = requestAnimationFrame(loop);
        };
        loop();
      };
      M.onLeave && M.onLeave(stop);
    },
  };

  /* =========================================================
     Círculo de quintas
     ========================================================= */
  T.circulo = {
    title: 'Círculo de quintas',
    desc: 'Tonalidades, armaduras, relativas y acordes de cada tono en un solo mapa interactivo.',
    lead: 'Pulsa una tonalidad (anillo exterior: mayores; interior: menores) para ver su armadura y sus siete acordes. Pulsa un acorde para escucharlo.',
    render(el) {
      M.widgets.cof(el, {});
      const tips = h('div', 'prose');
      tips.style.marginTop = '28px';
      tips.innerHTML = M.markup(`<h2>Cómo leerlo</h2><ul>
        <li><strong>En el sentido de las agujas del reloj</strong> cada tonalidad está una quinta justa por encima de la anterior y añade un sostenido: {C}, {G}, {D}, {A}…</li>
        <li><strong>En sentido contrario</strong> se sube por cuartas y se añade un bemol: {C}, {F}, {Bb}, {Eb}…</li>
        <li><strong>Cada mayor comparte armadura con su relativa menor</strong>, la que está justo debajo: {C} y {Am}, {G} y {Em}.</li>
        <li><strong>Los vecinos son familia:</strong> en {C} mayor, los acordes más usados son {C}, {F} y {G}, que están uno junto a otro.</li>
        <li><strong>Para la guitarra</strong>, las tonalidades con sostenidos ({E}, {A}, {D}, {G}) suelen ser las más cómodas porque aprovechan las cuerdas al aire. Con bemoles, piensa en la cejilla o en el capo.</li></ul>`);
      el.appendChild(tips);
    },
  };

  /* =========================================================
     Notas en el mástil (entrenador)
     ========================================================= */
  T.notas = {
    title: 'Notas en el mástil',
    desc: 'Entrenador para memorizar el diapasón: nombra la nota marcada o encuentra todas sus posiciones.',
    lead: 'Dos ejercicios para dejar de contar trastes. Empieza por las cuerdas 6 y 5 con notas naturales y ve ampliando.',
    render(el, c) {
      const st = Object.assign({ mode: 'name', strings: [6, 5], range: [0, 12], natural: true }, c.state || {});
      const p = panel(el);
      const r0 = row(p);
      r0.appendChild(M.chips([{ v: 'name', label: '¿Qué nota es?' }, { v: 'find', label: 'Encuentra la nota' }], st.mode, (v) => { st.mode = v; next(); }));
      const r1 = row(p);
      r1.appendChild(h('span', null, 'Cuerdas')).style.color = 'var(--ink-2)';
      const sc = M.chips([6, 5, 4, 3, 2, 1].map((s) => ({ v: s, label: String(s) })), null, (v, b) => {
        const on = b.getAttribute('aria-pressed') === 'true';
        if (on) st.strings.push(v); else st.strings = st.strings.filter((x) => x !== v);
        if (!st.strings.length) { st.strings = [v]; b.setAttribute('aria-pressed', 'true'); }
        next();
      }, true);
      sc.querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', String(st.strings.includes(+b.dataset.v))));
      r1.appendChild(sc);
      r1.appendChild(M.select([{ v: '0-5', t: 'Trastes 0 a 5' }, { v: '0-12', t: 'Trastes 0 a 12' }, { v: '5-12', t: 'Trastes 5 a 12' }], st.range.join('-'), (v) => { st.range = v.split('-').map(Number); next(); }, ''));
      const nat = h('label', 'chk', `<input type="checkbox" ${st.natural ? 'checked' : ''}> Solo notas naturales`);
      nat.querySelector('input').onchange = (e) => { st.natural = e.target.checked; buildAnswers(); next(); };
      r1.appendChild(nat);
      const prompt = h('div', 'readout');
      prompt.style.margin = '6px 0 10px';
      p.appendChild(prompt);
      const host = h('div');
      p.appendChild(host);
      const fb = new M.Fretboard(host, { frets: [0, 12], label: 'note', dots: [], hover: false, onPlay: onFret });
      const answers = h('div', 'answer-grid');
      answers.style.marginTop = '16px';
      p.appendChild(answers);
      const fbk = h('p', 'feedback');
      p.appendChild(fbk);
      const stats = h('div', 'stats-row');
      stats.style.marginTop = '10px';
      p.appendChild(stats);
      let q = null, ok = 0, tries = 0, streak = 0, t0 = 0, times = [];
      function drawStats() {
        const avg = times.length ? (times.reduce((a, b) => a + b, 0) / times.length / 1000).toFixed(1) + ' s' : '–';
        stats.innerHTML = `<div class="stat"><b>${ok}/${tries}</b><span>aciertos</span></div><div class="stat"><b>${streak}</b><span>racha</span></div><div class="stat"><b>${avg}</b><span>tiempo medio por acierto</span></div>`;
      }
      function pcsAllowed() { return st.natural ? [0, 2, 4, 5, 7, 9, 11] : [...Array(12).keys()]; }
      function buildAnswers() {
        answers.innerHTML = '';
        if (st.mode !== 'name') { answers.style.display = 'none'; return; }
        answers.style.display = '';
        pcsAllowed().forEach((pc) => {
          const b = h('button', null, M.rich(PC_NAMES(pc)));
          b.type = 'button';
          b.dataset.pc = pc;
          b.onclick = () => answerName(pc, b);
          answers.appendChild(b);
        });
      }
      function next() {
        fbk.textContent = ''; fbk.className = 'feedback';
        const t = M.tuningMidi('standard');
        if (st.mode === 'name') {
          buildAnswers();
          let s, f, pc, guard = 0;
          do {
            s = pick(st.strings); f = st.range[0] + rnd(st.range[1] - st.range[0] + 1);
            pc = M.mod(t[6 - s] + f, 12);
            guard++;
          } while ((!pcsAllowed().includes(pc) || (q && q.s === s && q.f === f)) && guard < 200);
          q = { s, f, pc };
          fb.setDots([{ s, f, label: '?', role: 'n', cls: 'pulse' }]);
          prompt.innerHTML = `<span class="meta">¿Qué nota hay en la <b>cuerda ${s}</b>, traste <b>${f}</b>?</span>`;
        } else {
          answers.style.display = 'none';
          const pc = pick(pcsAllowed());
          const targets = [];
          st.strings.forEach((s) => { for (let f = st.range[0]; f <= st.range[1]; f++) if (M.mod(t[6 - s] + f, 12) === pc) targets.push({ s, f }); });
          if (!targets.length) return next();
          q = { pc, targets, found: [] };
          fb.setDots([]);
          prompt.innerHTML = `<span class="meta">Encuentra todos los <b style="font-size:1.4em">${M.rich(PC_NAMES(pc))}</b> en ${st.strings.length === 1 ? 'la cuerda ' + st.strings[0] : 'las cuerdas ' + st.strings.slice().sort().reverse().join(', ')} (trastes ${st.range[0]} a ${st.range[1]}). Quedan ${targets.length}.</span>`;
        }
        t0 = performance.now();
        drawStats();
      }
      function answerName(pc, b) {
        if (!q || q.done) return;
        tries++;
        const t = M.tuningMidi('standard');
        A.pluck(t[6 - q.s] + q.f, 0, { dur: 1 });
        if (pc === q.pc) {
          ok++; streak++; times.push(performance.now() - t0);
          b.classList.add('ok');
          fbk.textContent = 'Correcto.'; fbk.className = 'feedback ok';
          q.done = true;
          fb.setDots([{ s: q.s, f: q.f, role: 'r' }]);
          setTimeout(next, 900);
        } else {
          streak = 0;
          b.classList.add('bad');
          fbk.textContent = 'Prueba otra vez. Cuenta desde la nota al aire o desde un marcador.'; fbk.className = 'feedback bad';
        }
        drawStats();
      }
      function onFret({ string, fret }) {
        if (st.mode !== 'find' || !q || !q.targets) return;
        const hit = q.targets.find((x) => x.s === string && x.f === fret);
        const already = q.found.some((x) => x.s === string && x.f === fret);
        if (already) return;
        tries++;
        if (hit) {
          ok++;
          q.found.push(hit);
          fbk.textContent = ''; fbk.className = 'feedback';
        } else {
          streak = 0;
          fbk.textContent = 'Ahí no está. Fíjate en el número de traste y en la cuerda.'; fbk.className = 'feedback bad';
        }
        const dots = q.found.map((x) => ({ s: x.s, f: x.f, cls: 'ok' }));
        if (!hit) dots.push({ s: string, f: fret, cls: 'bad' });
        fb.setDots(dots);
        const left = q.targets.length - q.found.length;
        if (left === 0) {
          streak++; times.push(performance.now() - t0);
          fbk.textContent = 'Completo. Todas las posiciones encontradas.'; fbk.className = 'feedback ok';
          setTimeout(next, 1100);
        } else prompt.querySelector('.meta').innerHTML = prompt.querySelector('.meta').innerHTML.replace(/Quedan \d+\./, `Quedan ${left}.`);
        drawStats();
      }
      next();
    },
  };

  /* =========================================================
     Lectura de partitura
     ========================================================= */
  const READ_LEVELS = {
    top: { name: 'Cuerdas 1, 2 y 3 (primera posición)', lo: 55, hi: 67, acc: false },
    low: { name: 'Cuerdas 4, 5 y 6 (primera posición)', lo: 40, hi: 54, acc: false },
    first: { name: 'Primera posición completa', lo: 40, hi: 68, acc: false },
    acc: { name: 'Primera posición con alteraciones', lo: 40, hi: 68, acc: true },
    high: { name: 'Hasta el traste 12', lo: 40, hi: 76, acc: true },
  };
  T.lectura = {
    title: 'Lectura de partitura',
    desc: 'Lee notas en el pentagrama y nómbralas o encuéntralas en el diapasón, por niveles.',
    lead: 'Aparece una nota en el pentagrama. Puedes nombrarla o tocarla directamente en el diapasón. Recuerda: la guitarra suena una octava más grave de lo que se escribe.',
    render(el, c) {
      const st = Object.assign({ level: 'top', mode: 'name' }, c.state || {});
      const p = panel(el);
      const r0 = row(p);
      r0.appendChild(M.select(Object.keys(READ_LEVELS).map((k) => ({ v: k, t: READ_LEVELS[k].name })), st.level, (v) => { st.level = v; next(); }, 'Nivel'));
      r0.appendChild(M.chips([{ v: 'name', label: 'Nombrar' }, { v: 'play', label: 'Tocar en el diapasón' }], st.mode, (v) => { st.mode = v; next(); }));
      const top = h('div');
      top.style.cssText = 'display:grid;grid-template-columns:minmax(0,260px) 1fr;gap:20px;align-items:center';
      p.appendChild(top);
      const sbox = h('div');
      top.appendChild(sbox);
      const side = h('div');
      top.appendChild(side);
      const accRow = h('div', 'seg');
      accRow.style.marginBottom = '10px';
      let accSel = 0;
      [['♭', -1], ['♮', 0], ['♯', 1]].forEach(([s, v]) => {
        const b = h('button', null, `<span style="font-family:var(--music)">${s}</span>`);
        b.type = 'button';
        b.setAttribute('aria-pressed', String(v === 0));
        b.setAttribute('aria-label', v === -1 ? 'bemol' : v === 1 ? 'sostenido' : 'natural');
        b.onclick = () => { accSel = v; accRow.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true'); };
        accRow.appendChild(b);
      });
      side.appendChild(accRow);
      const ans = h('div', 'answer-grid');
      side.appendChild(ans);
      const fbk = h('p', 'feedback');
      side.appendChild(fbk);
      const host = h('div');
      host.style.marginTop = '14px';
      p.appendChild(host);
      const fb = new M.Fretboard(host, { frets: [0, 12], label: 'note', dots: [], hover: false, onPlay: onFret });
      const stats = h('div', 'stats-row');
      stats.style.marginTop = '10px';
      p.appendChild(stats);
      if (window.matchMedia('(max-width:620px)').matches) top.style.gridTemplateColumns = '1fr';
      let q = null, ok = 0, tries = 0, streak = 0;
      const score = new M.Score(sbox, { notes: 'w:r', mode: 'staff', controls: false, noTime: true, size: 9 });
      const LET = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
      LET.forEach((l) => {
        const b = h('button', null, M.name(l));
        b.type = 'button';
        b.dataset.l = l;
        b.onclick = () => answer(l, b);
        ans.appendChild(b);
      });
      function drawStats() { stats.innerHTML = `<div class="stat"><b>${ok}/${tries}</b><span>aciertos</span></div><div class="stat"><b>${streak}</b><span>racha</span></div>`; }
      function next() {
        const L = READ_LEVELS[st.level];
        fbk.textContent = ''; fbk.className = 'feedback';
        ans.querySelectorAll('button').forEach((b) => (b.className = ''));
        accRow.style.display = L.acc && st.mode === 'name' ? '' : 'none';
        ans.style.display = st.mode === 'name' ? '' : 'none';
        let midi, guard = 0;
        do { midi = L.lo + rnd(L.hi - L.lo + 1); guard++; }
        while (((!L.acc && ![0, 2, 4, 5, 7, 9, 11].includes(M.mod(midi, 12))) || (q && q.midi === midi)) && guard < 100);
        let w = M.spellMidi(midi + 12, Math.random() < 0.5 ? 2 : -2);
        if (!L.acc) w = M.spellMidi(midi + 12, 0);
        q = { midi, w, done: false };
        const tok = `w:${w.letter}${w.acc === 1 ? '#' : w.acc === -1 ? 'b' : ''}${w.oct}`;
        score.cfg.mode = 'staff';
        score.measures = M.parseScore(tok, {});
        score.render();
        fb.setDots([]);
        if (st.mode === 'play') fbk.innerHTML = '<span style="color:var(--ink-2)">Pulsa en el diapasón el traste donde suena esta nota.</span>';
        drawStats();
      }
      function reveal() {
        const pos = M.bestPosition(q.midi, 'standard', 1.5);
        score.cfg.mode = 'full';
        score.measures = M.parseScore(`w:${pos.string}/${pos.fret}`, {});
        score.measures[0][0].notes[0].w = q.w;
        score.render();
        const all = M.positionsOf(q.midi, 12).map((x) => ({ s: x.string, f: x.fret, cls: 'ok' }));
        fb.setDots(all);
        A.pluck(q.midi, 0, { dur: 1.2 });
      }
      function answer(l, b) {
        if (q.done) return;
        tries++;
        const L = READ_LEVELS[st.level];
        const okL = l === q.w.letter && (!L.acc || accSel === q.w.acc);
        if (okL) {
          ok++; streak++; q.done = true;
          b.className = 'ok';
          fbk.innerHTML = `Correcto: ${M.rich(M.name(q.w))}.`; fbk.className = 'feedback ok';
          reveal();
          setTimeout(next, 1500);
        } else {
          streak = 0;
          b.className = 'bad';
          fbk.textContent = l === q.w.letter ? 'La letra es correcta, revisa la alteración.' : 'No es esa. Cuenta líneas y espacios desde una nota que conozcas.';
          fbk.className = 'feedback bad';
        }
        drawStats();
      }
      function onFret({ midi }) {
        if (st.mode !== 'play' || !q || q.done) return;
        tries++;
        if (midi === q.midi) {
          ok++; streak++; q.done = true;
          fbk.innerHTML = `Correcto: ${M.rich(M.name(q.w))}.`; fbk.className = 'feedback ok';
          reveal();
          setTimeout(next, 1500);
        } else {
          streak = 0;
          const diff = midi - q.midi;
          fbk.textContent = Math.abs(diff) % 12 === 0 ? 'Es la misma nota, pero en otra octava. Busca la altura exacta.' : `No es esa: suena ${Math.abs(diff)} semitono${Math.abs(diff) === 1 ? '' : 's'} más ${diff > 0 ? 'aguda' : 'grave'}.`;
          fbk.className = 'feedback bad';
        }
        drawStats();
      }
      next();
    },
  };

  /* =========================================================
     Ritmo: toca al compás
     ========================================================= */
  const CELLS = {
    1: [['q:o'], ['q:o'], ['h:o'], ['q:r']],
    2: [['q:o'], ['e:o', 'e:o'], ['e:o', 'e:o'], ['h:o'], ['q:r'], ['e:r', 'e:o']],
    3: [['q:o'], ['e:o', 'e:o'], ['q.:o', 'e:o'], ['e:o', 'q:o', 'e:o'], ['e:r', 'e:o'], ['h:o']],
    4: [['s:o', 's:o', 's:o', 's:o'], ['e:o', 's:o', 's:o'], ['s:o', 's:o', 'e:o'], ['e.:o', 's:o'], ['q:o'], ['e:o', 'e:o']],
    5: [['et:o', 'et:o', 'et:o'], ['q:o'], ['e:o', 'e:o'], ['et:o', 'et:r', 'et:o'], ['h:o']],
  };
  const LEVEL_NAMES = { 1: 'Negras, blancas y silencios', 2: 'Corcheas', 3: 'Puntillos y síncopas', 4: 'Semicorcheas', 5: 'Tresillos' };
  function cellBeats(cell) { return cell.reduce((a, tok) => { const m = /^([whqes])(\.?)(t?)/.exec(tok); return a + { w: 4, h: 2, q: 1, e: 0.5, s: 0.25 }[m[1]] * (m[2] ? 1.5 : 1) * (m[3] ? 2 / 3 : 1); }, 0); }
  function genRhythm(level, bars) {
    const out = [];
    for (let b = 0; b < bars; b++) {
      let left = 4, toks = [], guard = 0;
      while (left > 0.001 && guard++ < 50) {
        const fits = CELLS[level].filter((c) => cellBeats(c) <= left + 1e-6);
        const c = pick(fits.length ? fits : [['q:o']]);
        if (toks.length === 0 && c[0].endsWith(':r') && Math.random() < 0.7) continue;
        toks = toks.concat(c);
        left -= cellBeats(c);
      }
      out.push(toks.join(' '));
    }
    return out.join(' | ');
  }
  T.ritmo = {
    title: 'Lectura rítmica',
    desc: 'Lee un ritmo y tócalo al compás pulsando la barra espaciadora o la pantalla: mide tu precisión.',
    lead: 'Escucha el ritmo, luego pulsa «Tocar»: tras un compás de cuenta, marca cada nota con la barra espaciadora o tocando el recuadro. Verás qué notas entraron a tiempo.',
    render(el, c) {
      const st = Object.assign({ level: 2, bpm: 70, counts: true }, c.state || {});
      const p = panel(el);
      const r0 = row(p);
      r0.appendChild(M.select(Object.keys(LEVEL_NAMES).map((k) => ({ v: k, t: LEVEL_NAMES[k] })), String(st.level), (v) => { st.level = +v; fresh(); }, 'Nivel'));
      r0.appendChild(tempoCtl(() => st.bpm, (v) => (st.bpm = v), 40, 160));
      const cnt = h('label', 'chk', `<input type="checkbox" ${st.counts ? 'checked' : ''}> Mostrar la cuenta`);
      cnt.querySelector('input').onchange = (e) => { st.counts = e.target.checked; sc.cfg.counts = st.counts; sc.render(); };
      r0.appendChild(cnt);
      const sbox = h('div');
      p.appendChild(sbox);
      const sc = new M.Score(sbox, { notes: genRhythm(st.level, 2), mode: 'rhythm', counts: st.counts, controls: false, size: 9 });
      const r1 = row(p);
      r1.style.marginTop = '12px';
      const listen = h('button', 'btn ghost', '<span class="ico ico-play"></span> Escuchar');
      listen.type = 'button';
      const playB = h('button', 'btn', 'Tocar');
      playB.type = 'button';
      const newB = h('button', 'btn ghost', 'Nuevo ritmo');
      newB.type = 'button';
      r1.append(listen, playB, newB);
      const pad = h('button', null, 'Pulsa aquí o la barra espaciadora en cada nota');
      pad.type = 'button';
      pad.style.cssText = 'all:unset;box-sizing:border-box;display:grid;place-items:center;width:100%;min-height:110px;margin-top:14px;border-radius:14px;border:2px dashed var(--rule-2);font:600 1rem var(--ui);color:var(--ink-2);cursor:pointer;user-select:none;touch-action:manipulation;text-align:center;padding:12px';
      p.appendChild(pad);
      const res = h('p', 'feedback');
      p.appendChild(res);
      let state = null;
      function fresh() { sc.measures = M.parseScore(genRhythm(st.level, 2), {}); sc.render(); res.textContent = ''; }
      function onsets() {
        let beat = 0;
        const list = [];
        sc.flat.forEach((ev) => { if (!ev.rest) list.push({ beat, ev }); beat += ev.beats; });
        return { list, total: beat };
      }
      listen.onclick = () => { A.stopEverything(); sc.cfg.bpm = st.bpm; sc.cfg.countIn = true; sc.cfg.metro = true; sc.play(); };
      newB.onclick = () => { A.stopEverything(); fresh(); };
      playB.onclick = () => {
        A.stopEverything();
        sc.evGroups.forEach((g) => g.classList.remove('good', 'near', 'miss', 'on'));
        const spb = 60 / st.bpm;
        const { list, total } = onsets();
        const events = [];
        for (let i = 0; i < 4; i++) events.push({ t: i * spb, audio: (w) => A.click(w, i === 0 ? 2 : 1), visual: () => { pad.textContent = 'Cuenta: ' + (i + 1); } });
        for (let b = 0; b < total; b++) events.push({ t: (4 + b) * spb, audio: (w) => A.click(w, b % 4 === 0 ? 2 : 1), visual: b === 0 ? () => { pad.textContent = '¡Ahora!'; } : null });
        const handle = A.play(events, {
          length: (4 + total) * spb + 0.4,
          onEnd: () => { pad.textContent = 'Pulsa aquí o la barra espaciadora en cada nota'; grade(); },
        });
        state = { start: handle.start + 4 * spb, spb, list, taps: [] };
        pad.focus({ preventScroll: true });
      };
      function tap(e) {
        if (e) e.preventDefault();
        if (!state) return;
        const t = A.ctx().currentTime - state.start;
        state.taps.push(t);
        A.pluck(57, 0, { dur: 0.15, vel: 0.5 });
        pad.style.borderColor = 'var(--accent)';
        setTimeout(() => (pad.style.borderColor = ''), 90);
      }
      function grade() {
        if (!state) return;
        const { list, taps, spb } = state;
        const used = new Set();
        let good = 0, near = 0, devs = [];
        list.forEach(({ beat, ev }) => {
          const exp = beat * spb;
          let best = -1, bd = 1e9;
          taps.forEach((t, i) => { if (!used.has(i) && Math.abs(t - exp) < bd) { bd = Math.abs(t - exp); best = i; } });
          let cls = 'miss';
          if (best >= 0 && bd <= 0.09) { cls = 'good'; good++; used.add(best); devs.push(taps[best] - exp); }
          else if (best >= 0 && bd <= 0.17) { cls = 'near'; near++; used.add(best); devs.push(taps[best] - exp); }
          if (ev.g) ev.g.classList.add(cls);
        });
        const extra = taps.length - used.size;
        const pct = Math.round(((good + near * 0.5) / list.length) * 100);
        const avg = devs.length ? Math.round((devs.reduce((a, b) => a + b, 0) / devs.length) * 1000) : 0;
        res.innerHTML = `${pct}% de precisión: ${good} a tiempo, ${near} cerca, ${list.length - good - near} fallidas${extra > 0 ? `, ${extra} pulsación${extra > 1 ? 'es' : ''} de más` : ''}. ${devs.length ? (Math.abs(avg) < 20 ? 'Vas bien centrado en el pulso.' : avg > 0 ? `Tiendes a llegar tarde (${avg} ms de media).` : `Tiendes a adelantarte (${-avg} ms de media).`) : ''}`;
        res.className = 'feedback ' + (pct >= 80 ? 'ok' : 'bad');
        state = null;
      }
      pad.addEventListener('pointerdown', tap);
      const key = (e) => { if (e.code === 'Space' && state) tap(e); };
      document.addEventListener('keydown', key);
      M.onLeave && M.onLeave(() => document.removeEventListener('keydown', key));
      const lg = h('div', 'legend', '<span><i style="background:var(--s)"></i>A tiempo</span><span><i style="background:var(--t)"></i>Cerca</span><span><i style="background:var(--r)"></i>Fallida</span>');
      p.appendChild(lg);
    },
  };

  /* =========================================================
     Entrenamiento auditivo
     ========================================================= */
  const EAR_IV_SETS = {
    basic: ['3m', '3M', '4J', '5J', '8J'],
    steps: ['2m', '2M', '3m', '3M', '4J', '5J', '8J'],
    all: ['2m', '2M', '3m', '3M', '4J', '4A', '5J', '6m', '6M', '7m', '7M', '8J'],
  };
  const SHORT_TO_IV = { '2m': 'b2', '2M': '2', '3m': 'b3', '3M': '3', '4J': '4', '4A': '#4', '5J': '5', '6m': 'b6', '6M': '6', '7m': 'b7', '7M': '7', '8J': '8' };
  const EAR_CH_SETS = {
    tri2: ['', 'm'],
    tri4: ['', 'm', 'dim', 'aug'],
    sev: ['maj7', '7', 'm7', 'm7b5', 'dim7'],
  };
  const SONG_HINTS = {
    '2m': 'Tiburón (el tema de la película)', '2M': 'Cumpleaños feliz (1.ª y 2.ª sílaba de «cum-ple»)', '3m': 'Greensleeves (comienzo)',
    '3M': 'Oh, when the saints (primeras notas)', '4J': 'La marcha nupcial', '4A': 'María (West Side Story)', '5J': 'La guerra de las galaxias',
    '6m': 'The Entertainer (salto inicial ascendente)', '6M': 'My Bonnie lies over the ocean', '7m': 'Star Trek (serie original)', '7M': 'Take on me (estribillo)', '8J': 'Somewhere over the rainbow',
  };
  T.oido = {
    title: 'Entrenamiento auditivo',
    desc: 'Reconoce intervalos y tipos de acorde de oído, con sonido de guitarra.',
    lead: 'Escucha y elige la respuesta. Entrenar el oído es lo que convierte la teoría en música: acabarás reconociendo lo que oyes en las canciones.',
    render(el, c) {
      const st = Object.assign({ mode: 'iv', ivSet: 'basic', dir: 'up', chSet: 'tri2' }, c.state || {});
      const p = panel(el);
      const r0 = row(p);
      r0.appendChild(M.chips([{ v: 'iv', label: 'Intervalos' }, { v: 'ch', label: 'Acordes' }], st.mode, (v) => { st.mode = v; opts(); next(); }));
      const r1 = row(p);
      const bigRow = h('div', 'metro-row');
      bigRow.style.margin = '18px 0';
      const play = h('button', 'btn', '<span class="ico ico-play"></span> Escuchar');
      play.type = 'button';
      const nextB = h('button', 'btn ghost', 'Siguiente');
      nextB.type = 'button';
      bigRow.append(play, nextB);
      p.appendChild(bigRow);
      const ans = h('div', 'answer-grid');
      p.appendChild(ans);
      const fbk = h('p', 'feedback');
      fbk.style.textAlign = 'center';
      p.appendChild(fbk);
      const stats = h('div', 'stats-row');
      p.appendChild(stats);
      let q = null, ok = 0, tries = 0, streak = 0, answered = false;
      function opts() {
        r1.innerHTML = '';
        if (st.mode === 'iv') {
          r1.appendChild(M.select([{ v: 'basic', t: 'Básicos (3as, 4ª, 5ª, 8ª)' }, { v: 'steps', t: 'Con segundas' }, { v: 'all', t: 'Todos los intervalos' }], st.ivSet, (v) => { st.ivSet = v; next(); }, 'Conjunto'));
          r1.appendChild(M.select([{ v: 'up', t: 'Ascendente' }, { v: 'down', t: 'Descendente' }, { v: 'harm', t: 'Armónico (a la vez)' }, { v: 'mix', t: 'Mezclado' }], st.dir, (v) => { st.dir = v; next(); }, 'Dirección'));
        } else {
          r1.appendChild(M.select([{ v: 'tri2', t: 'Mayor o menor' }, { v: 'tri4', t: 'Las cuatro tríadas' }, { v: 'sev', t: 'Acordes de séptima' }], st.chSet, (v) => { st.chSet = v; next(); }, 'Conjunto'));
        }
      }
      function drawStats() { stats.innerHTML = `<div class="stat"><b>${ok}/${tries}</b><span>aciertos</span></div><div class="stat"><b>${streak}</b><span>racha</span></div>`; }
      function next() {
        answered = false;
        fbk.textContent = ''; fbk.className = 'feedback';
        ans.innerHTML = '';
        if (st.mode === 'iv') {
          const set = EAR_IV_SETS[st.ivSet];
          const short = pick(set);
          const dir = st.dir === 'mix' ? pick(['up', 'down', 'harm']) : st.dir;
          const root = 45 + rnd(12);
          q = { kind: 'iv', short, dir, root, semi: M.INTERVALS[SHORT_TO_IV[short]].semi };
          set.forEach((s) => {
            const b = h('button', null, `${s}<br><small style="font-weight:450;font-size:.72rem;color:inherit;opacity:.75">${M.INTERVALS[SHORT_TO_IV[s]].name.replace(' justa', '').replace(' mayor', ' M').replace(' menor', ' m')}</small>`);
            b.type = 'button';
            b.onclick = () => answer(s, b);
            ans.appendChild(b);
          });
        } else {
          const set = EAR_CH_SETS[st.chSet];
          const type = pick(set);
          q = { kind: 'ch', type, root: 45 + rnd(10) };
          set.forEach((t) => {
            const b = h('button', null, M.CHORDS[t].name);
            b.type = 'button';
            b.style.fontSize = '.9rem';
            b.onclick = () => answer(t, b);
            ans.appendChild(b);
          });
        }
        drawStats();
        setTimeout(sound, 150);
      }
      function sound() {
        if (!q) return;
        A.stopAll();
        if (q.kind === 'iv') {
          const a = q.root, b = q.root + q.semi;
          if (q.dir === 'harm') A.strum([a, b], 0, { spread: 0.012, dur: 1.8 });
          else if (q.dir === 'down') { A.pluck(b, 0, { dur: 0.8 }); A.pluck(a, A.now() + 0.75, { dur: 1.1 }); }
          else { A.pluck(a, 0, { dur: 0.8 }); A.pluck(b, A.now() + 0.75, { dur: 1.1 }); }
        } else {
          const ms = M.CHORDS[q.type].ivs.map((iv) => q.root + M.INTERVALS[iv].semi);
          A.strum(ms, 0, { spread: 0.03, dur: 2.2 });
          ms.forEach((m, i) => A.pluck(m, A.now() + 1.6 + i * 0.28, { dur: 1.2, vel: 0.6 }));
        }
      }
      function answer(v, b) {
        if (answered) return;
        tries++;
        const right = q.kind === 'iv' ? q.short : q.type;
        if (v === right) {
          ok++; streak++; answered = true;
          b.className = 'ok';
          fbk.innerHTML = 'Correcto.' + (q.kind === 'iv' && SONG_HINTS[right] && q.dir === 'up' ? ` <span style="color:var(--ink-2);font-weight:450">Para recordarlo: ${SONG_HINTS[right]}.</span>` : '');
          fbk.className = 'feedback ok';
        } else {
          streak = 0;
          b.className = 'bad';
          fbk.textContent = 'No es ese. Vuelve a escucharlo y compara.';
          fbk.className = 'feedback bad';
        }
        drawStats();
      }
      nextB.onclick = next;
      opts();
      drawStats();
      q = null;
      // la primera pregunta se crea cuando el usuario pulsa «Escuchar»
      ans.innerHTML = '<p class="empty" style="grid-column:1/-1;text-align:center">Pulsa «Escuchar» para empezar.</p>';
      play.onclick = () => { if (!q) next(); else sound(); };
    },
  };
})();
