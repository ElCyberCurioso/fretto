/* Fretto · widgets de lección
   Cada widget se declara en el HTML de una lección como
   <div data-w="nombre" data-cfg="…json…"> mediante los atajos M.W.nombre({...}). */
(function () {
  'use strict';
  const M = window.M;
  const A = M.audio;
  const reg = (M.widgets = M.widgets || {});

  /* ---------- Utilidades ---------- */
  const enc = (o) => encodeURIComponent(JSON.stringify(o || {}));
  M.W = new Proxy({}, { get: (_, name) => (cfg) => `<div class="w" data-w="${name}" data-cfg="${enc(cfg)}"></div>` });

  /** Sustituye {C#}, {Am7}, {E4} por nombres según el cifrado elegido. */
  M.markup = function (html) {
    if (!html) return '';
    return String(html).replace(/\{([A-G](?:##|bb|#|b)?[^{}\s<]*)\}/g, (m, sym) => {
      // {E_4}: nota con número de octava. {E7}: acorde (aquí los números son del acorde).
      const n = /^([A-G](?:##|bb|#|b)?)(?:_(-?\d))?$/.exec(sym);
      if (n) {
        const nm = M.rich(M.name(n[1]));
        return `<span class="nn">${nm}${n[2] !== undefined ? `<sub>${n[2]}</sub>` : ''}</span>`;
      }
      return `<span class="nn">${M.rich(M.displayChord(sym))}</span>`;
    });
  };

  /** Igual que markup pero devuelve texto plano (para SVG). */
  M.plainTok = function (str) {
    return String(str).replace(/\{([A-G](?:##|bb|#|b)?[^{}\s<]*)\}/g, (m, sym) => {
      const n = /^([A-G](?:##|bb|#|b)?)$/.exec(sym);
      return n ? M.name(n[1]) : M.displayChord(sym);
    });
  };

  const h = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  M.h = h;
  const ROOTS12 = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  M.ROOTS12 = ROOTS12;
  const plain = (s) => s; // texto para <option>

  function select(options, value, onChange, label) {
    const wrap = h('label');
    if (label) wrap.appendChild(h('span', null, label));
    const sel = h('select');
    options.forEach((o) => {
      const op = h('option');
      op.value = o.v; op.textContent = o.t;
      if (o.v === value) op.selected = true;
      sel.appendChild(op);
    });
    sel.addEventListener('change', () => onChange(sel.value));
    wrap.appendChild(sel);
    wrap.sel = sel;
    return wrap;
  }
  M.select = select;
  const rootOptions = (list) => (list || ROOTS12).map((r) => ({ v: r, t: plain(M.name(r)) }));
  M.rootOptions = rootOptions;

  function chips(items, value, onChange, multi) {
    const box = h('div', 'chips');
    items.forEach((it) => {
      const b = h('button', 'chip');
      b.type = 'button';
      b.innerHTML = it.html || M.rich(it.label);
      b.dataset.v = it.v;
      b.setAttribute('aria-pressed', String(it.v === value));
      b.addEventListener('click', () => {
        if (!multi) box.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', multi ? String(b.getAttribute('aria-pressed') !== 'true') : 'true');
        onChange(it.v, b);
      });
      box.appendChild(b);
    });
    return box;
  }
  M.chips = chips;

  function playButton(onPlay, onStop, label) {
    const b = h('button', 'btn small', '<span class="ico ico-play" aria-hidden="true"></span><span>' + (label || 'Escuchar') + '</span>');
    b.type = 'button';
    let on = false;
    b.set = (v) => {
      on = v;
      b.classList.toggle('is-playing', v);
      b.querySelector('.ico').className = 'ico ' + (v ? 'ico-stop' : 'ico-play');
      b.querySelector('span:last-child').textContent = v ? 'Detener' : label || 'Escuchar';
    };
    b.addEventListener('click', () => {
      if (on) { b.set(false); onStop && onStop(); }
      else { b.set(true); onPlay(); }
    });
    return b;
  }
  M.playButton = playButton;

  const ROLE_NAMES = { r: 'Fundamental', t: 'Tercera', f: 'Quinta', s: 'Séptima', x: 'Otras', n: 'Nota' };
  function legend(dots, extra) {
    const roles = [...new Set((dots || []).map((d) => d.role || 'n'))];
    const order = ['r', 't', 'f', 's', 'x', 'n'];
    const box = h('div', 'legend');
    order.filter((r) => roles.includes(r)).forEach((r) => box.appendChild(h('span', null, `<i class="${r}"></i>${(extra && extra[r]) || ROLE_NAMES[r]}`)));
    return box;
  }
  M.legend = legend;

  /** Forma de acorde a partir de cadenas compactas ("x32010", "x,10,12,12,12,10"). */
  function parseShape(sym, f, d, b) {
    const split = (s) => (s.includes(',') ? s.split(',') : s.split(''));
    const frets = split(f).map((x) => (x === 'x' || x === 'X' ? -1 : parseInt(x, 10)));
    const p = M.parseChord(sym);
    const t = M.tuningMidi('standard');
    let fingers = d ? split(d).map((x) => parseInt(x, 10) || 0) : null;
    let barre = null;
    if (!fingers) { const fg = M.fingerFor(frets); fingers = fg.fingers; barre = fg.barre; }
    if (b) barre = { fret: b, from: frets.findIndex((x) => x === b), to: Math.max(...frets.map((x, i) => (x >= 0 ? i : -1))) };
    return {
      frets, fingers, barre,
      labels: frets.map((x, i) => (x < 0 || !p ? null : M.ivFromRoot(p.root, t[i] + x, p.type))),
    };
  }
  M.parseShape = parseShape;
  function shapeOf(it) {
    if (typeof it === 'string') return { sym: it, shape: M.chordShape(it) };
    return { sym: it.sym, shape: it.f ? parseShape(it.sym, it.f, it.d, it.b) : M.chordShape(it.sym), caption: it.caption, title: it.title, label: it.label };
  }
  M.shapeOf = shapeOf;
  M.playChord = function (shape, when, opts) {
    if (!shape) return;
    A.strum(M.shapeMidis(shape.frets), when || 0, Object.assign({ spread: 0.025 }, opts || {}));
  };

  /* ---------- Bucle rítmico genérico ---------- */
  M.Loop = function (o) {
    let timer = 0, raf = 0, next = 0, i = 0, running = false;
    const queue = [];
    function sched() {
      const c = A.ctx();
      while (next < c.currentTime + 0.12) {
        const step = i % o.steps();
        o.audio && o.audio(step, next, i);
        queue.push({ t: next, step, i });
        next += o.dur(step);
        i++;
        if (o.maxSteps && i >= o.maxSteps) { stopSoon(); break; }
      }
    }
    let ending = false;
    function stopSoon() { ending = true; clearInterval(timer); }
    function draw() {
      const c = A.ctx();
      while (queue.length && queue[0].t <= c.currentTime) {
        const q = queue.shift();
        o.visual && o.visual(q.step, q.i);
      }
      if (ending && !queue.length) { api.stop(true); return; }
      if (running) raf = requestAnimationFrame(draw);
    }
    const api = {
      start() {
        if (running) return;
        running = true; ending = false; i = 0; queue.length = 0;
        A.active.add(api);
        next = A.ctx().currentTime + 0.08;
        sched();
        timer = setInterval(sched, 25);
        raf = requestAnimationFrame(draw);
      },
      stop(natural) {
        if (!running) return;
        running = false;
        A.active.delete(api);
        clearInterval(timer);
        cancelAnimationFrame(raf);
        queue.length = 0;
        if (!natural) A.stopAll();
        o.onStop && o.onStop(natural);
      },
      get running() { return running; },
    };
    return api;
  };

  /* =========================================================
     Widgets
     ========================================================= */

  /* Diapasón (con selectores opcionales) */
  reg.fretboard = function (el, c) {
    const panel = h('div', c.panel === false ? '' : 'w-panel');
    el.appendChild(panel);
    let fb;
    const cfg = Object.assign({}, c);
    if (c.pick) {
      const tools = h('div', 'w-tools');
      panel.appendChild(tools);
      const show = cfg.show;
      tools.appendChild(select(rootOptions(), show.root, (v) => { show.root = v; fb.setShow(show); upd(); }, 'Tónica'));
      if (c.pick.scales) {
        tools.appendChild(select(c.pick.scales.map((id) => ({ v: id, t: (M.SCALES[id] || M.CHORDS[id]).name })), show.scale, (v) => { show.scale = v; fb.setShow(show); upd(); }, 'Escala'));
      }
      if (c.pick.chords) {
        tools.appendChild(select(c.pick.chords.map((id) => ({ v: id, t: M.CHORDS[id].name })), show.chord, (v) => { show.chord = v; fb.setShow(show); upd(); }, 'Acorde'));
      }
      tools.appendChild(select([{ v: 'interval', t: 'Intervalos' }, { v: 'note', t: 'Notas' }], cfg.label || 'note', (v) => { fb.cfg.label = v; fb.drawDots(); }, 'Mostrar'));
    }
    const host = h('div');
    panel.appendChild(host);
    fb = new M.Fretboard(host, cfg);
    const lg = h('div');
    panel.appendChild(lg);
    function upd() { if (c.legend !== false) { lg.innerHTML = ''; lg.appendChild(legend(fb.dots, c.legendNames)); } }
    upd();
  };

  /* Fila de diagramas de acordes */
  reg.chords = function (el, c) {
    const row = h('div', 'chord-row');
    (c.items || c.list || []).forEach((raw) => {
      const it = shapeOf(raw);
      row.appendChild(M.chordCard(it.sym, { shape: it.shape, label: it.label || c.label, caption: it.caption ? M.markup(it.caption) : null, title: it.title }));
    });
    el.appendChild(row);
  };

  /* Partitura / tablatura */
  reg.score = function (el, c) { new M.Score(el, c); };

  /* Botones de escucha comparada */
  reg.listen = function (el, c) {
    const row = h('div', 'chips');
    c.items.forEach((it) => {
      const b = h('button', 'chip', '<span class="ico ico-play" aria-hidden="true" style="width:9px;height:9px;margin-right:6px;display:inline-block"></span>' + M.markup(it.label));
      b.type = 'button';
      b.addEventListener('click', () => {
        A.stopAll();
        const gap = it.gap || c.gap || 0.55;
        if (it.chord) M.playChord(it.f ? parseShape(it.chord, it.f) : M.chordShape(it.chord), 0, { dur: 2.2 });
        else if (it.chords) it.chords.forEach((s, i) => M.playChord(M.chordShape(s), A.now() + i * (it.gap || 1.1), { dur: (it.gap || 1.1) * 0.95 }));
        else if (it.together) A.strum(it.notes, 0, { spread: it.spread || 0.004, dur: 2 });
        else it.notes.forEach((m, i) => A.pluck(m, A.now() + 0.03 + i * gap, { dur: gap * (it.legato ? 1.6 : 0.95) }));
      });
      row.appendChild(b);
    });
    el.appendChild(row);
  };

  /* Rasgueo: patrón en cuadrícula */
  function arrowSVG(kind, dirDown) {
    const down = kind === 'D' || kind === 'X' || (kind === '.' && dirDown);
    const y1 = down ? 4 : 30, y2 = down ? 29 : 5;
    const hd = down ? `M6 21 L13 30 L20 21` : `M6 13 L13 4 L20 13`;
    const xmark = kind === 'X' ? `<path class="arr" d="M7 12 L19 22 M19 12 L7 22"/>` : '';
    return `<svg viewBox="0 0 26 34" aria-hidden="true"><path class="arr" d="M13 ${y1} L13 ${y2}"/><path class="arr" d="${hd}"/>${xmark}</svg>`;
  }
  reg.strum = function (el, c) {
    const panel = h('div', 'w-panel strum');
    el.appendChild(panel);
    const pat = c.pattern.replace(/\s/g, '');
    const sub = c.sub || 2;
    const n = pat.length;
    let bpm = c.bpm || 80;
    const chords = c.chords || ['G'];
    const shapes = chords.map((s) => M.chordShape(s));
    const head = h('div', 'w-tools');
    panel.appendChild(head);
    const chordLbl = h('div', 'chord-lbl', '');
    chordLbl.style.cssText = 'font:720 1.15rem/1 var(--ui);min-width:4ch';
    head.appendChild(chordLbl);
    const setChord = (k) => (chordLbl.innerHTML = chords.length > 1 ? chords.map((s, i) => `<span style="opacity:${i === k ? 1 : 0.35}">${M.rich(M.displayChord(s))}</span>`).join(' &nbsp; ') : M.rich(M.displayChord(chords[0])));
    setChord(0);
    const grid = h('div', 'strum-grid');
    grid.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`;
    const counts = sub === 4 ? ['', 'e', 'y', 'a'] : sub === 3 ? ['', 'tri', 'ple'] : ['', 'y'];
    const cells = [];
    for (let i = 0; i < n; i++) {
      const k = pat[i];
      const isBeat = i % sub === 0;
      const ghost = k === '.' || k === '-';
      const dirDown = (i % sub) % 2 === 0 || sub === 3;
      const cell = h('div', `strum-cell${isBeat ? ' beat' : ''}${ghost ? ' ghost' : ''}${k === 'X' ? ' mute' : ''}`);
      cell.innerHTML = (k === '-' ? '<svg viewBox="0 0 26 34"></svg>' : arrowSVG(k, dirDown)) + `<span class="cnt${isBeat ? ' on-beat' : ''}">${isBeat ? Math.floor(i / sub) % (c.beats || 4) + 1 : counts[i % sub]}</span>`;
      grid.appendChild(cell);
      cells.push(cell);
    }
    panel.appendChild(grid);
    const bar = h('div', 'player');
    panel.appendChild(bar);
    const out = h('output', null, String(bpm));
    const loop = M.Loop({
      steps: () => n * chords.length,
      dur: (step) => (c.swing && sub === 2 ? (step % 2 === 0 ? 2 / 3 : 1 / 3) : 1 / sub) * 60 / bpm,
      audio: (step, when) => {
        const k = pat[step % n];
        const ci = Math.floor(step / n);
        const sh = shapes[ci];
        const nextHit = () => { let d = 1; while (d < n && '.-'.includes(pat[(step + d) % n])) d++; return d; };
        if (c.metro !== false && step % sub === 0) A.click(when, step % (sub * (c.beats || 4)) === 0 ? 2 : 1);
        if (k === 'D' || k === 'U') M.playChord(sh, when, { dir: k === 'U' ? 'up' : 'down', vel: k === 'U' ? 0.55 : 0.78, dur: nextHit() * 60 / bpm / sub, spread: k === 'U' ? 0.011 : 0.015 });
        if (k === 'X') A.chuck(when, 0.9);
      },
      visual: (step) => {
        cells.forEach((x) => x.classList.remove('on'));
        cells[step % n].classList.add('on');
        if (step % n === 0) setChord(Math.floor(step / n));
      },
      onStop: () => { cells.forEach((x) => x.classList.remove('on')); btn.set(false); setChord(0); },
    });
    const btn = playButton(() => loop.start(), () => loop.stop());
    btn.classList.remove('small');
    bar.appendChild(btn);
    const tempo = h('label', 'tempo', '<span>Tempo</span>');
    const minus = h('button', 'step', '−'); minus.type = 'button'; minus.setAttribute('aria-label', 'Más lento');
    const plus = h('button', 'step', '+'); plus.type = 'button'; plus.setAttribute('aria-label', 'Más rápido');
    minus.onclick = () => { bpm = Math.max(40, bpm - 5); out.textContent = bpm; };
    plus.onclick = () => { bpm = Math.min(200, bpm + 5); out.textContent = bpm; };
    tempo.append(minus, out, plus, h('span', 'unit', 'ppm'));
    bar.appendChild(tempo);
    if (c.legendText !== false) bar.appendChild(h('span', null, '<span style="color:var(--ink-3)">Flecha punteada: la mano baja o sube sin tocar las cuerdas.</span>'));
  };

  /* Círculo de quintas */
  const COF_MAJ = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
  const COF_MIN = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
  const COF_FIFTHS = [0, 1, 2, 3, 4, 5, 6, -5, -4, -3, -2, -1];
  reg.cof = function (el, c) {
    const wrap = h('div', 'cof w-panel');
    el.appendChild(wrap);
    const S = 400, cx = 200, cy = 200;
    const root = M.svg('svg', { viewBox: `0 0 ${S} ${S}`, role: 'group', 'aria-label': 'Círculo de quintas' });
    wrap.appendChild(root);
    const info = h('div', 'cof-info');
    wrap.appendChild(info);
    const seg = (r1, r2, a0, a1) => {
      const p = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      const [x1, y1] = p(r2, a0), [x2, y2] = p(r2, a1), [x3, y3] = p(r1, a1), [x4, y4] = p(r1, a0);
      return `M${x1} ${y1} A${r2} ${r2} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${r1} ${r1} 0 0 0 ${x4} ${y4} Z`;
    };
    const segs = [];
    let ring = null;
    let sel = c.start || 0;
    for (let i = 0; i < 12; i++) {
      const a0 = (-90 - 15 + i * 30) * Math.PI / 180, a1 = (-90 + 15 + i * 30) * Math.PI / 180;
      const am = (a0 + a1) / 2;
      const gM = M.svg('g', { class: 'cof-seg maj', tabindex: 0, role: 'button', 'aria-label': `${M.name(COF_MAJ[i])} mayor` }, root);
      M.svg('path', { d: seg(128, 192, a0, a1) }, gM);
      const lblM = i === 6 ? M.name('F#') + '/' + M.name('Gb') : M.name(COF_MAJ[i]);
      M.svgText(gM, cx + 160 * Math.cos(am), cy + 160 * Math.sin(am) + 6, lblM, { 'font-size': i === 6 ? 13 : 17 });
      const gm = M.svg('g', { class: 'cof-seg min', tabindex: 0, role: 'button', 'aria-label': `${M.name(COF_MIN[i])} menor` }, root);
      M.svg('path', { d: seg(84, 128, a0, a1) }, gm);
      M.svgText(gm, cx + 106 * Math.cos(am), cy + 106 * Math.sin(am) + 5, M.name(COF_MIN[i]) + 'm', { 'font-size': 12.5 });
      const pick = (minor) => { sel = i; draw(minor); M.playChord(M.chordShape(minor ? COF_MIN[i] + 'm' : COF_MAJ[i]), 0, { dur: 1.8 }); };
      gM.addEventListener('click', () => pick(false));
      gm.addEventListener('click', () => pick(true));
      [gM, gm].forEach((g, k) => {
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(k === 1); } });
        // Con ratón o dedo no se enfoca la casilla: así el navegador no dibuja su recuadro de foco
        g.addEventListener('mousedown', (e) => e.preventDefault());
        // Con teclado, contorno propio con la forma de la casilla, pintado encima de las vecinas
        g.addEventListener('focus', () => {
          if (!ring) return;
          ring.setAttribute('d', g.querySelector('path').getAttribute('d'));
          ring.style.display = '';
        });
        g.addEventListener('blur', () => { if (ring) ring.style.display = 'none'; });
      });
      segs.push({ gM, gm });
    }
    const center = M.svg('g', { class: 'cof-center' }, root);
    ring = M.svg('path', { class: 'cof-ring', 'aria-hidden': 'true' }, root);
    ring.style.display = 'none';
    function drawCenter(f) {
      while (center.firstChild) center.removeChild(center.firstChild);
      const s = 7, x0 = 150, top = 178;
      for (let k = 0; k < 5; k++) M.svg('line', { x1: x0, x2: x0 + 100, y1: top + k * s, y2: top + k * s, class: 'sc-line', stroke: 'var(--ink)', 'stroke-width': 1, opacity: 0.55 }, center);
      M.svgText(center, x0 + 3, top + 3 * s + 1, '𝄞', { class: 'sc-clef', 'font-size': s * 4.1, fill: 'var(--ink)' });
      const P = f > 0 ? [8, 5, 9, 6, 3, 7, 4] : [4, 7, 3, 6, 2, 5, 1];
      const yP = (p) => top + 4 * s - (p * s) / 2;
      const g2 = M.svg('g', { class: 'sc' }, center);
      for (let k = 0; k < Math.abs(f); k++) M.drawAcc(g2, x0 + 30 + k * s * 1.05, yP(P[k]), f > 0 ? 1 : -1, s);
      M.svgText(center, cx, top + 4 * s + 26, f === 0 ? 'Sin alteraciones' : `${Math.abs(f)} ${f > 0 ? (Math.abs(f) === 1 ? 'sostenido' : 'sostenidos') : Math.abs(f) === 1 ? 'bemol' : 'bemoles'}`, { 'text-anchor': 'middle', 'font-size': 12, fill: 'var(--ink-2)', 'font-weight': 600 });
    }
    function draw(minorClick) {
      segs.forEach((s, i) => {
        const d = (i - sel + 12) % 12;
        const fam = d === 1 || d === 11;
        s.gM.classList.toggle('sel', i === sel && !minorClick);
        s.gm.classList.toggle('sel', i === sel && !!minorClick);
        s.gM.classList.toggle('fam', fam || (i === sel && minorClick));
        s.gm.classList.toggle('fam', fam || (i === sel && !minorClick));
      });
      const f = COF_FIFTHS[sel];
      drawCenter(f);
      const maj = COF_MAJ[sel], min = COF_MIN[sel];
      const ks = M.keySignature(f).map((n) => M.name(n));
      const chordsMaj = M.diatonicChords(maj, 'major');
      info.innerHTML = '';
      info.appendChild(h('h4', null, minorClick ? `${M.rich(M.name(min))} menor` : `${M.rich(M.name(maj))} mayor`));
      info.appendChild(h('p', 'sub', `${minorClick ? 'Relativa mayor: ' + M.rich(M.name(maj)) + ' mayor' : 'Relativa menor: ' + M.rich(M.name(min)) + ' menor'}. ${ks.length ? 'Armadura: ' + ks.map(M.rich).join(', ') + '.' : 'Armadura vacía.'}`));
      const deg = h('div', 'degrees');
      const list = minorClick ? M.diatonicChords(min, 'minor') : chordsMaj;
      list.forEach((ch, i) => {
        const fn = minorClick ? ['T', 'S', 'T', 'S', 'D', 'S', 'D'][i] : ['T', 'S', 'T', 'S', 'D', 'T', 'D'][i];
        const b = h('button', `deg fn-${fn}`, `<span class="rn">${ch.roman}</span><span class="cn">${M.rich(M.chordName(ch.root, ch.type))}</span>`);
        b.type = 'button';
        b.addEventListener('click', () => M.playChord(M.chordShape(M.noteKey(ch.root) + ch.type), 0, { dur: 1.6 }));
        deg.appendChild(b);
      });
      info.appendChild(deg);
      info.appendChild(h('div', 'legend', '<span><i style="background:var(--f)"></i>Función de tónica</span><span><i style="background:var(--t)"></i>Subdominante</span><span><i style="background:var(--r)"></i>Dominante</span>'));
      info.appendChild(h('p', 'w-cap', 'Las casillas vecinas resaltadas forman la “familia” de la tonalidad: sus acordes son los que más se usan juntos.'));
    }
    draw(false);
  };

  /* Grados de una tonalidad */
  reg.degrees = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    let key = c.key || 'C', minor = !!c.minor, sev = !!c.sevenths, scale = c.scale || null;
    tools.appendChild(select(rootOptions(), key, (v) => { key = v; draw(); }, 'Tonalidad'));
    if (c.modes !== false) tools.appendChild(select([{ v: 'major', t: 'Mayor' }, { v: 'minor', t: 'Menor natural' }, { v: 'harmonicMinor', t: 'Menor armónica' }, { v: 'melodicMinor', t: 'Menor melódica' }], scale || (minor ? 'minor' : 'major'), (v) => { scale = v; draw(); }, 'Modo'));
    const chk = h('label', 'chk', `<input type="checkbox" ${sev ? 'checked' : ''}> Cuatriadas (con séptima)`);
    chk.querySelector('input').addEventListener('change', (e) => { sev = e.target.checked; draw(); });
    tools.appendChild(chk);
    const deg = h('div', 'degrees');
    panel.appendChild(deg);
    const cards = h('div', 'chord-row');
    cards.style.marginTop = '14px';
    panel.appendChild(cards);
    panel.appendChild(h('div', 'legend', '<span><i style="background:var(--f)"></i>Tónica</span><span><i style="background:var(--t)"></i>Subdominante</span><span><i style="background:var(--r)"></i>Dominante</span>'));
    function draw() {
      const sc = scale || (minor ? 'minor' : 'major');
      const list = M.diatonicChords(key, sc, sev);
      const fns = sc === 'major' ? ['T', 'S', 'T', 'S', 'D', 'T', 'D'] : ['T', 'S', 'T', 'S', 'D', 'S', 'D'];
      deg.innerHTML = ''; cards.innerHTML = '';
      list.forEach((ch, i) => {
        const sym = M.noteKey(ch.root) + ch.type;
        const b = h('button', `deg fn-${fns[i]}`, `<span class="rn">${ch.roman}</span><span class="cn">${M.rich(M.chordName(ch.root, ch.type))}</span>`);
        b.type = 'button';
        const shape = M.chordShape(sym.replace('maj7#5', 'aug').replace('7#5', 'aug'));
        b.addEventListener('click', () => { M.playChord(shape, 0, { dur: 1.6 }); });
        deg.appendChild(b);
        if (c.diagrams !== false && shape) cards.appendChild(M.chordCard(sym, { shape, caption: ch.roman, title: M.chordName(ch.root, ch.type) }));
      });
    }
    draw();
  };

  /* Progresión con diagramas, rasgueo y cambio de tonalidad */
  reg.progression = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    let key = c.key || 'C';
    let bpm = c.bpm || 90;
    const minorKey = !!c.minor;
    const pattern = (c.pattern || 'D.DU.UDU').replace(/\s/g, '');
    const sub = c.sub || 2;
    const beatsPer = c.beats || 4;
    let items = [];
    const row = h('div', 'chord-row');
    function build() {
      items = (c.prog || []).map((x) => {
        if (typeof x === 'object') { const it = shapeOf(x); it.roman = x.roman || ''; return it; }
        if (/^[A-G]/.test(x)) return { sym: x, shape: M.chordShape(x), roman: '' };
        const ch = M.chordFromRoman(x, key, minorKey);
        return { sym: ch.symbol, shape: M.chordShape(ch.symbol), roman: x };
      });
      row.innerHTML = '';
      items.forEach((it) => {
        const card = M.chordCard(it.sym, { shape: it.shape, caption: it.roman || it.caption, label: c.label });
        it.card = card;
        row.appendChild(card);
      });
    }
    if (c.transpose !== false && !(c.prog || []).some((x) => typeof x === 'object' || /^[A-G]/.test(x))) {
      tools.appendChild(select(rootOptions(c.keys), key, (v) => { key = v; loop.stop(); build(); }, minorKey ? 'Tonalidad (menor)' : 'Tonalidad'));
    }
    build();
    panel.appendChild(row);
    const bar = h('div', 'player');
    panel.appendChild(bar);
    const stepsPerBar = beatsPer * sub;
    const patLen = pattern.length;
    const loop = M.Loop({
      steps: () => items.length * stepsPerBar * (c.bars || 1),
      dur: (step) => (c.swing && sub === 2 ? (step % 2 === 0 ? 2 / 3 : 1 / 3) : 1 / sub) * 60 / bpm,
      audio: (step, when) => {
        const ci = Math.floor(step / (stepsPerBar * (c.bars || 1)));
        const k = pattern[step % patLen];
        const sh = items[ci].shape;
        if (step % sub === 0 && c.metro) A.click(when, step % stepsPerBar === 0 ? 2 : 1);
        let d = 1; while (d < patLen && '.-'.includes(pattern[(step + d) % patLen])) d++;
        if (k === 'D' || k === 'U') M.playChord(sh, when, { dir: k === 'U' ? 'up' : 'down', vel: k === 'U' ? 0.5 : 0.75, dur: d * 60 / bpm / sub, spread: 0.014 });
        if (k === 'X') A.chuck(when);
        if (k === 'A') { // arpegio: bajo y subida-bajada por las cuerdas
          const ms = M.shapeMidis(sh.frets);
          const order = [0, 2, 3, 4, 5, 4, 3, 2];
          const kk = order[(step % stepsPerBar) % order.length];
          A.pluck(ms[Math.min(kk, ms.length - 1)], when, { vel: kk === 0 ? 0.75 : 0.55, dur: 60 / bpm * 2 });
        }
        if (k === 'B') A.pluck(M.shapeMidis(sh.frets)[0], when, { vel: 0.8, dur: d * 60 / bpm / sub });
      },
      visual: (step) => {
        const ci = Math.floor(step / (stepsPerBar * (c.bars || 1)));
        items.forEach((it, i) => it.card.classList.toggle('active', i === ci));
      },
      onStop: () => { items.forEach((it) => it.card.classList.remove('active')); btn.set(false); },
    });
    const btn = playButton(() => loop.start(), () => loop.stop(), 'Tocar progresión');
    btn.classList.remove('small');
    bar.appendChild(btn);
    const out = h('output', null, String(bpm));
    const tempo = h('label', 'tempo', '<span>Tempo</span>');
    const minus = h('button', 'step', '−'); minus.type = 'button';
    const plus = h('button', 'step', '+'); plus.type = 'button';
    minus.onclick = () => { bpm = Math.max(40, bpm - 5); out.textContent = bpm; };
    plus.onclick = () => { bpm = Math.min(200, bpm + 5); out.textContent = bpm; };
    tempo.append(minus, out, plus, h('span', 'unit', 'ppm'));
    bar.appendChild(tempo);
  };

  /* Explorador de intervalos */
  const IV_LIST = ['b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7', '8'];
  reg.intervals = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    let iv = c.start || '3';
    let rootStr = c.string || 6;
    const rootFret = c.fret || 5;
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    const list = c.list || IV_LIST;
    tools.appendChild(chips(list.map((x) => ({ v: x, label: M.INTERVALS[x].short })), iv, (v) => { iv = v; draw(); play(false); }));
    const tools2 = h('div', 'w-tools');
    panel.appendChild(tools2);
    tools2.appendChild(select([{ v: '6', t: 'Fundamental en la 6ª cuerda' }, { v: '5', t: 'Fundamental en la 5ª cuerda' }, { v: '4', t: 'Fundamental en la 4ª cuerda' }], String(rootStr), (v) => { rootStr = +v; draw(); }, ''));
    const b1 = h('button', 'btn small ghost', 'Melódico'); b1.type = 'button'; b1.onclick = () => play(false);
    const b2 = h('button', 'btn small ghost', 'Armónico'); b2.type = 'button'; b2.onclick = () => play(true);
    tools2.append(b1, b2);
    const infoEl = h('p', 'w-cap');
    infoEl.style.marginTop = '0';
    panel.appendChild(infoEl);
    const host = h('div');
    panel.appendChild(host);
    const fb = new M.Fretboard(host, { frets: [0, 12], label: 'interval', dots: [] });
    const SOUND = {
      b2: 'Muy tenso y cercano: el típico sonido de suspense.', '2': 'Un paso: el movimiento básico de cualquier melodía.',
      b3: 'Color menor, melancólico.', '3': 'Color mayor, luminoso.', '4': 'Abierta y algo “en espera”; pide resolver.',
      b5: 'El tritono: inestable, divide la octava en dos mitades iguales.', '5': 'Estable y hueca: la base del power chord.',
      b6: 'Oscura y expresiva.', '6': 'Cálida y abierta.', b7: 'Tensión suave de blues y dominante.',
      '7': 'Brillante y tensa, a un semitono de la octava.', '8': 'La misma nota, una octava más aguda.',
    };
    function draw() {
      const I = M.INTERVALS[iv];
      const rootMidi = M.fretMidi(rootStr, rootFret);
      const dots = [{ s: rootStr, f: rootFret, iv: '1', role: 'r', label: 'R' }];
      const target = rootMidi + I.semi;
      for (let s = rootStr; s >= Math.max(1, rootStr - 3); s--) {
        const f = target - M.fretMidi(s, 0);
        if (f >= 0 && f <= 12 && Math.abs(f - rootFret) <= (s === rootStr ? 12 : 4)) dots.push({ s, f, iv: iv === '8' ? '8' : iv, role: M.role(iv === '8' ? '8' : iv), label: M.ivLabel(iv) === '8' ? '8' : M.ivLabel(iv) });
      }
      fb.setDots(dots);
      infoEl.innerHTML = `<b>${I.name}</b>: ${I.semi} semitonos (${I.semi} trastes). ${SOUND[iv] || ''}`;
    }
    function play(harm) {
      const r = M.fretMidi(rootStr, rootFret);
      const t = r + M.INTERVALS[iv].semi;
      if (harm) A.strum([r, t], 0, { spread: 0.01, dur: 1.6 });
      else { A.pluck(r, 0, { dur: 0.7 }); A.pluck(t, A.now() + 0.6, { dur: 0.9 }); }
    }
    draw();
  };

  /* Constructor de escalas */
  reg.scale = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    let root = c.root || 'C', sc = c.scale || 'major';
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    if (c.pick !== false) {
      tools.appendChild(select(rootOptions(c.roots), root, (v) => { root = v; draw(); }, 'Tónica'));
      if (c.scales && c.scales.length > 1) tools.appendChild(select(c.scales.map((id) => ({ v: id, t: M.SCALES[id].name })), sc, (v) => { sc = v; draw(); }, 'Escala'));
    }
    const pb = playButton(() => play(), () => { stopPlay(); });
    tools.appendChild(pb);
    const row = h('div', 'notes-row');
    panel.appendChild(row);
    const host = h('div');
    host.style.marginTop = '16px';
    panel.appendChild(host);
    const fb = new M.Fretboard(host, { frets: c.frets || [0, 12], label: c.label || 'note', show: { root, scale: sc }, region: c.region });
    const lg = h('div');
    panel.appendChild(lg);
    let handle = null;
    function draw() {
      const notes = M.scaleNotes(root, sc);
      const ivs = M.SCALES[sc].ivs;
      const steps = M.stepFormula(sc);
      row.innerHTML = '';
      notes.concat([M.parseNote(root)]).forEach((n, i) => {
        const iv = i < ivs.length ? ivs[i] : '8';
        const chip = h('button', 'nchip' + (iv === '1' || iv === '8' ? ' r' : ''), `<b>${M.rich(M.name(n))}</b><small>${M.ivLabel(iv === '8' ? '1' : iv)}</small>`);
        chip.type = 'button';
        chip.addEventListener('click', () => A.pluck(scaleMidi(i), 0, { dur: 1 }));
        row.appendChild(chip);
        if (i < steps.length && c.steps !== false) row.appendChild(h('span', 'step-gap ' + (steps[i] === 'S' ? 'S' : ''), steps[i]));
      });
      fb.setShow({ root, scale: sc });
      lg.innerHTML = ''; lg.appendChild(legend(fb.dots));
    }
    function scaleMidi(i) {
      const base = 48 + M.mod(M.pcOf(M.parseNote(root)) - 0, 12);
      const ivs = M.SCALES[sc].ivs;
      if (i >= ivs.length) return base + 12;
      return base + M.INTERVALS[ivs[i]].semi;
    }
    function play() {
      const ivs = M.SCALES[sc].ivs;
      const seq = [];
      for (let i = 0; i <= ivs.length; i++) seq.push(i);
      for (let i = ivs.length - 1; i >= 0; i--) seq.push(i);
      const chipsEl = row.querySelectorAll('.nchip');
      const spb = 60 / (c.bpm || 132);
      handle = A.play(seq.map((i, k) => ({
        t: k * spb,
        audio: (w) => A.pluck(scaleMidi(i), w, { dur: spb * 1.05 }),
        visual: () => { chipsEl.forEach((x) => (x.style.outline = '')); chipsEl[i].style.outline = '2.5px solid var(--ink)'; },
      })), { length: seq.length * spb + 0.4, onEnd: () => { chipsEl.forEach((x) => (x.style.outline = '')); pb.set(false); } });
    }
    function stopPlay() { if (handle) handle.stop(); }
    draw();
  };

  /* Constructor de acordes (apilar terceras) */
  reg.chordbuilder = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    let root = c.root || 'C', type = c.type || '';
    const types = c.types || ['', 'm', 'dim', 'aug', 'sus2', 'sus4'];
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    tools.appendChild(select(rootOptions(), root, (v) => { root = v; draw(); }, 'Fundamental'));
    panel.appendChild(chips(types.map((t) => ({ v: t, label: M.CHORDS[t].name })), type, (v) => { type = v; draw(); }));
    const stack = h('div', 'notes-row');
    stack.style.marginTop = '16px';
    panel.appendChild(stack);
    const formula = h('p', 'w-cap');
    panel.appendChild(formula);
    const host = h('div');
    host.style.marginTop = '8px';
    panel.appendChild(host);
    const fb = new M.Fretboard(host, { frets: [0, 12], label: 'interval', show: { root, chord: type } });
    const lg = h('div');
    panel.appendChild(lg);
    const cards = h('div', 'chord-row');
    cards.style.marginTop = '14px';
    panel.appendChild(cards);
    function draw() {
      const ch = M.CHORDS[type];
      const notes = M.chordNotes(root, type);
      stack.innerHTML = '';
      notes.forEach((n, i) => {
        const iv = ch.ivs[i];
        const chip = h('button', 'nchip' + (iv === '1' ? ' r' : ''), `<b>${M.rich(M.name(n))}</b><small>${M.ivLabel(iv)}</small>`);
        chip.type = 'button';
        chip.addEventListener('click', () => A.pluck(48 + M.mod(M.pcOf(M.parseNote(root)), 12) + M.INTERVALS[iv].semi, 0, { dur: 1.2 }));
        stack.appendChild(chip);
        if (i < notes.length - 1) {
          const d = M.INTERVALS[ch.ivs[i + 1]].semi - M.INTERVALS[iv].semi;
          stack.appendChild(h('span', 'step-gap', d === 3 ? '3m' : d === 4 ? '3M' : d === 2 ? '2M' : d === 5 ? '4J' : d + 'st'));
        }
      });
      formula.innerHTML = `<b>${M.rich(M.chordName(root, type))}</b>, fórmula ${ch.ivs.map(M.ivLabel).join(' – ')}. ${M.CHORDS[type].name}.`;
      fb.setShow({ root, chord: type });
      lg.innerHTML = ''; lg.appendChild(legend(fb.dots));
      cards.innerHTML = '';
      const sym = root + type;
      const main = M.chordShape(sym);
      const vs = M.voicings(root, type, { max: 4 });
      const seen = new Set();
      [main].concat(vs).filter(Boolean).forEach((v) => {
        const k = v.frets.join(',');
        if (seen.has(k) || seen.size >= 4) return;
        seen.add(k);
        cards.appendChild(M.chordCard(sym, { shape: v, label: 'interval' }));
      });
    }
    draw();
  };

  /* Diapasón → pentagrama: toca y mira dónde se escribe */
  reg.staffnotes = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    const top = h('div');
    top.style.cssText = 'display:grid;grid-template-columns:minmax(0,220px) 1fr;gap:18px;align-items:center';
    panel.appendChild(top);
    const scoreBox = h('div');
    top.appendChild(scoreBox);
    const read = h('div', 'readout', '<span class="hint">Toca una nota en el diapasón</span>');
    top.appendChild(read);
    const host = h('div');
    host.style.marginTop = '10px';
    panel.appendChild(host);
    const sc = new M.Score(scoreBox, { notes: 'w:r', mode: c.tab ? 'full' : 'staff', controls: false, noTime: true, size: 8 });
    const key = c.key || 0;
    new M.Fretboard(host, {
      frets: c.frets || [0, 12], label: 'note', dots: c.dots || [], hover: true,
      onPlay: ({ string, fret, midi }) => {
        const w = M.spellMidi(midi + 12, key);
        const tok = `w:${string}/${fret}`;
        sc.measures = M.parseScore(tok, { key });
        sc.render();
        read.innerHTML = `<span class="big">${M.rich(M.name(w))}<sub style="font-size:.4em;font-weight:600">${w.oct - 1}</sub></span><span class="meta">Cuerda ${string}, traste ${fret}<br>Se escribe como ${M.rich(M.name(w))}${w.oct} y suena una octava más grave</span>`;
      },
    });
    if (window.matchMedia('(max-width:560px)').matches) top.style.gridTemplateColumns = '1fr';
  };

  /* Modos griegos */
  const MODES = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];
  const CHAR = { ionian: '4', dorian: '6', phrygian: 'b2', lydian: '#4', mixolydian: 'b7', aeolian: 'b6', locrian: 'b5' };
  const MODE_CHORD = { ionian: 'maj7', dorian: 'm7', phrygian: 'm7', lydian: 'maj7', mixolydian: '7', aeolian: 'm7', locrian: 'm7b5' };
  reg.modes = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    let root = c.root || 'D', mode = c.mode || 'dorian';
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    tools.appendChild(select(rootOptions(), root, (v) => { root = v; draw(); }, 'Tónica'));
    const pb = playButton(() => play(), () => stop(), 'Escuchar sobre bordón');
    tools.appendChild(pb);
    panel.appendChild(chips(MODES.map((m) => ({ v: m, label: M.SCALES[m].name })), mode, (v) => { mode = v; draw(); }));
    const info = h('p', 'w-cap');
    panel.appendChild(info);
    const row = h('div', 'notes-row');
    panel.appendChild(row);
    const host = h('div');
    host.style.marginTop = '14px';
    panel.appendChild(host);
    const fb = new M.Fretboard(host, { frets: [0, 12], label: 'interval', show: { root, scale: mode } });
    const lg = h('div');
    panel.appendChild(lg);
    let loop = null;
    function parentOf() {
      const idx = MODES.indexOf(mode);
      const majIvs = M.SCALES.major.ivs;
      const semi = M.INTERVALS[majIvs[idx]].semi;
      const I = M.INTERVALS[majIvs[idx]];
      return M.transpose(root, { deg: (8 - I.deg) % 7 + 1, semi: (12 - semi) % 12 });
    }
    function draw() {
      const notes = M.scaleNotes(root, mode);
      const ivs = M.SCALES[mode].ivs;
      const ch = CHAR[mode];
      row.innerHTML = '';
      notes.forEach((n, i) => {
        const chip = h('span', 'nchip' + (ivs[i] === '1' ? ' r' : ''), `<b>${M.rich(M.name(n))}</b><small>${M.ivLabel(ivs[i])}</small>`);
        if (ivs[i] === ch) chip.style.boxShadow = 'inset 0 0 0 2.5px var(--accent)';
        row.appendChild(chip);
      });
      const par = parentOf();
      info.innerHTML = `<b>${M.rich(M.name(root))} ${M.SCALES[mode].name.toLowerCase()}</b> usa las mismas notas que ${M.rich(M.name(par))} mayor, empezando desde ${M.rich(M.name(root))}. Nota característica: <b>${M.ivLabel(ch)}</b> (recuadrada). Acorde típico: ${M.rich(M.chordName(root, MODE_CHORD[mode]))}.`;
      fb.cfg.dots = null;
      fb.cfg.show = { root, scale: mode };
      const dots = fb.computeDots().map((d) => (d.iv === ch ? Object.assign(d, { cls: 'pulse' }) : d));
      fb.setDots(dots);
      lg.innerHTML = ''; lg.appendChild(legend(dots));
    }
    function play() {
      const base = 40 + M.mod(M.pcOf(M.parseNote(root)) - 4, 12);
      const ivs = M.SCALES[mode].ivs;
      const seq = ivs.map((iv) => M.INTERVALS[iv].semi).concat([12]);
      const melody = seq.concat(seq.slice(0, -1).reverse());
      const spb = 60 / 120;
      let k = 0;
      loop = M.Loop({
        steps: () => melody.length + 2,
        dur: () => spb,
        maxSteps: melody.length + 2,
        audio: (step, when) => {
          if (step % 4 === 0) { A.pluck(base, when, { vel: 0.6, dur: spb * 4 }); A.pluck(base + 7, when, { vel: 0.4, dur: spb * 4 }); }
          if (step < melody.length) A.pluck(base + 12 + melody[step], when, { vel: 0.8, dur: spb });
        },
        onStop: () => pb.set(false),
      });
      loop.start();
    }
    function stop() { if (loop) loop.stop(); }
    draw();
  };

  /* Sistema CAGED */
  const CAGED = {
    C: { t: 'C', f: [-1, 3, 2, 0, 1, 0] },
    A: { t: 'A', f: [-1, 0, 2, 2, 2, 0] },
    G: { t: 'G', f: [3, 2, 0, 0, 0, 3] },
    E: { t: 'E', f: [0, 2, 2, 1, 0, 0] },
    D: { t: 'D', f: [-1, -1, 0, 2, 3, 2] },
  };
  M.cagedShape = function (root, form) {
    const T = CAGED[form];
    let shift = M.mod(M.pcOf(M.parseNote(root)) - M.pcOf(M.parseNote(T.t)), 12);
    let frets = T.f.map((f) => (f < 0 ? -1 : f + shift));
    if (Math.min(...frets.filter((f) => f >= 0)) >= 12) frets = frets.map((f) => (f < 0 ? -1 : f - 12));
    return parseShape(root, frets.join(','));
  };
  reg.caged = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    let root = c.root || 'C', form = 'all';
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    tools.appendChild(select(rootOptions(), root, (v) => { root = v; draw(); }, 'Acorde'));
    const ch = chips([{ v: 'all', label: 'Las cinco' }].concat(['C', 'A', 'G', 'E', 'D'].map((f) => ({ v: f, label: 'Forma de ' + M.name(f) }))), form, (v) => { form = v; draw(); });
    panel.appendChild(ch);
    const host = h('div');
    host.style.marginTop = '14px';
    panel.appendChild(host);
    const fb = new M.Fretboard(host, { frets: [0, 15], label: 'interval', dots: [] });
    const cards = h('div', 'chord-row');
    cards.style.marginTop = '12px';
    panel.appendChild(cards);
    function draw() {
      const order = ['C', 'A', 'G', 'E', 'D'];
      const shapes = order.map((f) => ({ f, sh: M.cagedShape(root, f) }));
      shapes.sort((a, b) => Math.min(...a.sh.frets.filter((x) => x >= 0)) - Math.min(...b.sh.frets.filter((x) => x >= 0)));
      const dots = [];
      const sel = form === 'all' ? null : shapes.find((s) => s.f === form);
      const t = M.tuningMidi('standard');
      const p = M.parseNote(root);
      shapes.forEach(({ f, sh }) => {
        sh.frets.forEach((fr, i) => {
          if (fr < 0) return;
          const s = 6 - i;
          if (dots.some((d) => d.s === s && d.f === fr)) return;
          const iv = M.ivFromRoot(p, t[i] + fr, '');
          dots.push({ s, f: fr, iv, role: M.role(iv), dim: sel && sel.f !== f && !sel.sh.frets.some((x, j) => j === i && x === fr) });
        });
      });
      fb.cfg.region = null;
      if (sel) {
        const fs = sel.sh.frets.filter((x) => x >= 0);
        fb.cfg.region = [Math.min(...fs), Math.max(...fs)];
        dots.forEach((d) => { d.dim = !sel.sh.frets.some((x, j) => 6 - j === d.s && x === d.f); });
      }
      fb.cfg.dots = dots;
      fb.render();
      cards.innerHTML = '';
      shapes.forEach(({ f, sh }) => {
        const card = M.chordCard(root, { shape: sh, label: 'interval', caption: 'Forma de ' + M.rich(M.name(f)) });
        if (sel && sel.f === f) card.classList.add('active');
        cards.appendChild(card);
      });
    }
    draw();
  };

  /* Tríadas en grupos de cuerdas (inversiones) */
  reg.triads = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    let root = c.root || 'C', type = c.type || '', set = c.set || '321';
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    tools.appendChild(select(rootOptions(), root, (v) => { root = v; draw(); }, 'Acorde'));
    tools.appendChild(select([{ v: '', t: 'Mayor' }, { v: 'm', t: 'Menor' }, { v: 'dim', t: 'Disminuido' }, { v: 'aug', t: 'Aumentado' }], type, (v) => { type = v; draw(); }, 'Tipo'));
    tools.appendChild(select([{ v: '321', t: 'Cuerdas 3-2-1' }, { v: '432', t: 'Cuerdas 4-3-2' }, { v: '543', t: 'Cuerdas 5-4-3' }, { v: '654', t: 'Cuerdas 6-5-4' }], set, (v) => { set = v; draw(); }, 'Grupo'));
    const host = h('div');
    panel.appendChild(host);
    const fb = new M.Fretboard(host, { frets: [0, 15], label: 'interval', dots: [] });
    const cards = h('div', 'chord-row');
    cards.style.marginTop = '12px';
    panel.appendChild(cards);
    function draw() {
      const strings = set.split('').map(Number);
      const p = M.parseNote(root);
      const ch = M.CHORDS[type];
      const pcs = ch.ivs.map((iv) => M.mod(M.pcOf(p) + M.INTERVALS[iv].semi, 12));
      const t = M.tuningMidi('standard');
      const res = [];
      for (let f0 = 0; f0 <= 15; f0++) {
        const opts = strings.map((s) => { const o = []; for (let f = Math.max(0, f0); f <= f0 + 3 && f <= 15; f++) if (pcs.includes(M.mod(t[6 - s] + f, 12))) o.push(f); return o; });
        opts[0].forEach((a) => opts[1].forEach((b) => opts[2].forEach((cc) => {
          const fr = [a, b, cc];
          if (Math.max(...fr) - Math.min(...fr) > 3) return;
          const got = strings.map((s, i) => M.mod(t[6 - s] + fr[i], 12));
          if (new Set(got).size !== 3) return;
          const k = fr.join(',');
          if (res.some((r) => r.k === k)) return;
          res.push({ k, fr, bass: got[0] });
        })));
      }
      res.sort((x, y) => Math.min(...x.fr) - Math.min(...y.fr));
      const dots = [];
      res.forEach((r) => r.fr.forEach((f, i) => {
        const s = strings[i];
        if (dots.some((d) => d.s === s && d.f === f)) return;
        const iv = M.ivFromRoot(p, t[6 - s] + f, type);
        dots.push({ s, f, iv, role: M.role(iv) });
      }));
      fb.setDots(dots);
      cards.innerHTML = '';
      res.slice(0, 6).forEach((r) => {
        const frets = [-1, -1, -1, -1, -1, -1];
        strings.forEach((s, i) => (frets[6 - s] = r.fr[i]));
        const bassIv = M.ivFromRoot(p, t[6 - strings[2]] + r.fr[2], type);
        const inv = bassIv === '1' ? 'Fundamental' : M.role(bassIv) === 't' ? '1.ª inversión' : '2.ª inversión';
        cards.appendChild(M.chordCard(root + type, { shape: parseShape(root + type, frets.map((x) => (x < 0 ? 'x' : x)).join(',')), label: 'interval', caption: inv }));
      });
    }
    draw();
  };

  /* Notas del acorde a lo largo de una progresión */
  reg.chordtones = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    const prog = c.prog;
    let bpm = c.bpm || 70;
    const names = h('div', 'chips');
    panel.appendChild(names);
    const btns = prog.map((s, i) => {
      const b = h('button', 'chip', M.rich(M.displayChord(s)));
      b.type = 'button';
      b.setAttribute('aria-pressed', String(i === 0));
      b.onclick = () => show(i, true);
      names.appendChild(b);
      return b;
    });
    const host = h('div');
    host.style.marginTop = '14px';
    panel.appendChild(host);
    const fb = new M.Fretboard(host, { frets: c.frets || [0, 12], label: 'interval', dots: [], region: c.region });
    const lg = h('div');
    panel.appendChild(lg);
    function show(i, sound) {
      const p = M.parseChord(prog[i]);
      btns.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
      fb.setShow({ root: p.root, chord: p.type });
      lg.innerHTML = ''; lg.appendChild(legend(fb.dots));
      if (sound) M.playChord(M.chordShape(prog[i]), 0, { dur: 1.5 });
    }
    show(0);
    const bar = h('div', 'player');
    panel.appendChild(bar);
    const loop = M.Loop({
      steps: () => prog.length * 4,
      dur: () => 60 / bpm,
      audio: (step, when) => {
        const ci = Math.floor(step / 4);
        if (step % 4 === 0) M.playChord(M.chordShape(prog[ci]), when, { dur: 60 / bpm * 3.9, vel: 0.6 });
        else if (step % 4 === 2) M.playChord(M.chordShape(prog[ci]), when, { dur: 60 / bpm * 1.9, vel: 0.4 });
        A.click(when, step % 4 === 0 ? 2 : 1);
      },
      visual: (step) => { if (step % 4 === 0) show(Math.floor(step / 4)); },
      onStop: () => pb.set(false),
    });
    const pb = playButton(() => loop.start(), () => loop.stop(), 'Tocar la base');
    pb.classList.remove('small');
    bar.appendChild(pb);
    bar.appendChild(h('span', null, 'Improvisa encima apuntando a las notas que se iluminan en cada cambio.'));
  };

  /* Figuras rítmicas */
  reg.figures = function (el, c) {
    const wrap = h('div', 'tbl-wrap');
    el.appendChild(wrap);
    const rows = [
      ['w', 'Redonda', '4', 'Dura un compás entero de 4/4'],
      ['h', 'Blanca', '2', 'La mitad de una redonda'],
      ['q', 'Negra', '1', 'El pulso en 4/4'],
      ['e', 'Corchea', '½', 'Dos por pulso'],
      ['s', 'Semicorchea', '¼', 'Cuatro por pulso'],
    ];
    const tbl = h('table');
    tbl.innerHTML = '<thead><tr><th>Figura</th><th>Silencio</th><th>Nombre</th><th class="c">Pulsos (negras)</th><th></th></tr></thead>';
    const tb = h('tbody');
    rows.forEach(([d, nm, beats, desc]) => {
      const tr = h('tr');
      const f1 = h('td'); const f2 = h('td');
      f1.style.width = '84px'; f2.style.width = '84px';
      tr.append(f1, f2, h('td', null, `<b>${nm}</b><br><span style="color:var(--ink-3)">${desc}</span>`), h('td', 'c', `<b style="font-size:1.1rem">${beats}</b>`));
      const td = h('td');
      const b = h('button', 'btn small ghost', '<span class="ico ico-play"></span>');
      b.type = 'button';
      b.setAttribute('aria-label', 'Escuchar un compás de ' + nm.toLowerCase() + 's');
      b.onclick = () => {
        A.stopAll();
        const spb = 60 / 76;
        const len = { w: 4, h: 2, q: 1, e: 0.5, s: 0.25 }[d];
        for (let k = 0; k < 4; k++) A.click(A.now() + 0.05 + k * spb, k === 0 ? 2 : 1);
        for (let k = 0; k < 4 / len; k++) A.pluck(52, A.now() + 0.05 + k * len * spb, { dur: len * spb * 0.9, vel: 0.7 });
      };
      td.appendChild(b);
      tr.appendChild(td);
      tb.appendChild(tr);
      f1.appendChild(M.figureSVG(d, false, 7));
      f2.appendChild(M.figureSVG(d, true, 7));
    });
    tbl.appendChild(tb);
    wrap.appendChild(tbl);
  };

  /* Partes de la guitarra */
  reg.anatomy = function (el) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    panel.innerHTML = `
<svg viewBox="0 0 900 330" class="anat" role="img" aria-label="Partes de la guitarra" style="width:100%;height:auto;font-family:var(--ui)">
  <defs>
    <linearGradient id="anTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9c98f"/><stop offset="1" stop-color="#c99a58"/></linearGradient>
    <linearGradient id="anNeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c1b16"/><stop offset=".5" stop-color="#4a2f27"/><stop offset="1" stop-color="#2c1b16"/></linearGradient>
  </defs>
  <path d="M520 165 C520 90 590 62 650 74 C688 82 700 104 728 104 C756 104 772 70 818 74 C870 79 892 120 892 165 C892 210 870 251 818 256 C772 260 756 226 728 226 C700 226 688 248 650 256 C590 268 520 240 520 165 Z" fill="url(#anTop)" stroke="#7a5230" stroke-width="3"/>
  <circle cx="660" cy="165" r="42" fill="#2a1a12"/>
  <circle cx="660" cy="165" r="50" fill="none" stroke="#7a5230" stroke-width="4" stroke-dasharray="2 3"/>
  <rect x="790" y="140" width="34" height="50" rx="6" fill="#3a2418"/>
  <rect x="798" y="143" width="5" height="44" fill="#efe8da"/>
  <rect x="40" y="120" width="104" height="90" rx="12" fill="#3a2418"/>
  <rect x="144" y="145" width="9" height="40" fill="#efe8da"/>
  <rect x="153" y="146" width="470" height="38" fill="url(#anNeck)"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((k) => { const x = 153 + 470 * (1 - Math.pow(2, -(k + 1) / 12)) / (1 - Math.pow(2, -15 / 12)); return `<line x1="${x}" y1="146" x2="${x}" y2="184" stroke="#cfd3d8" stroke-width="2"/>`; }).join('')}
  ${[3, 5, 7, 9].map((f) => { const x0 = 153 + 470 * (1 - Math.pow(2, -(f) / 12)) / (1 - Math.pow(2, -15 / 12)); const x1 = 153 + 470 * (1 - Math.pow(2, -(f + 1) / 12)) / (1 - Math.pow(2, -15 / 12)); return `<circle cx="${(x0 + x1) / 2}" cy="165" r="4" fill="#efe8da"/>`; }).join('')}
  ${[0, 1, 2].map((k) => `<circle cx="${62 + k * 30}" cy="113" r="9" fill="#cfd3d8" stroke="#8a8f96"/><circle cx="${62 + k * 30}" cy="217" r="9" fill="#cfd3d8" stroke="#8a8f96"/>`).join('')}
  ${[0, 1, 2, 3, 4, 5].map((k) => `<line x1="${62 + (k % 3) * 30}" y1="165" x2="820" y2="${150 + k * 6}" stroke="#e7e2d6" stroke-width="${0.8 + (5 - k) * 0.25}" opacity=".9"/>`).join('')}
  <g font-size="14" font-weight="600" fill="var(--ink)">
    <line x1="92" y1="104" x2="92" y2="44" stroke="var(--ink-3)"/><text x="92" y="36" text-anchor="middle">Pala (clavijero)</text>
    <line x1="122" y1="226" x2="122" y2="290" stroke="var(--ink-3)"/><text x="122" y="306" text-anchor="middle">Clavijas</text>
    <line x1="149" y1="140" x2="230" y2="60" stroke="var(--ink-3)"/><text x="232" y="56">Cejuela</text>
    <line x1="300" y1="186" x2="300" y2="290" stroke="var(--ink-3)"/><text x="300" y="306" text-anchor="middle">Mástil y diapasón</text>
    <line x1="333" y1="146" x2="380" y2="60" stroke="var(--ink-3)"/><text x="382" y="56">Trastes</text>
    <line x1="460" y1="168" x2="470" y2="290" stroke="var(--ink-3)"/><text x="470" y="306" text-anchor="middle">Marcadores</text>
    <line x1="660" y1="122" x2="600" y2="40" stroke="var(--ink-3)"/><text x="600" y="32" text-anchor="middle">Boca</text>
    <line x1="560" y1="200" x2="600" y2="290" stroke="var(--ink-3)"/><text x="600" y="306" text-anchor="middle">Tapa</text>
    <line x1="807" y1="138" x2="790" y2="40" stroke="var(--ink-3)"/><text x="790" y="32" text-anchor="middle">Puente y cejilla del puente</text>
    <line x1="728" y1="226" x2="740" y2="290" stroke="var(--ink-3)"/><text x="740" y="306" text-anchor="middle">Cuerpo (caja)</text>
  </g>
</svg>`;
  };

  /* Numeración de dedos */
  reg.hands = function (el) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    const hand = (mirror, labels, title, sub) => {
      const fx = [0, 1, 2, 3];
      const tips = [[-60, 40], [-22, 18], [16, 22], [52, 48]];
      const g = fx.map((i) => {
        const [x, y] = tips[i];
        const hgt = [118, 140, 134, 104][i];
        return `<rect x="${x - 15}" y="${y}" width="30" height="${hgt}" rx="15" fill="var(--surface-2)" stroke="var(--rule-2)"/><circle cx="${x}" cy="${y + 18}" r="13" fill="${i === 0 && labels[0] === 'i' ? 'var(--f)' : 'var(--ink)'}"/><text x="${x}" y="${y + 23}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--paper)">${labels[i + 1]}</text>`;
      }).join('');
      const thumb = `<rect x="-118" y="118" width="30" height="96" rx="15" transform="rotate(-38 -103 166)" fill="var(--surface-2)" stroke="var(--rule-2)"/><circle cx="-128" cy="128" r="13" fill="var(--accent)"/><text x="-128" y="133" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">${labels[0]}</text>`;
      return `<figure style="margin:0;text-align:center"><svg viewBox="-160 0 260 300" style="width:100%;max-width:240px;height:auto;margin:0 auto;font-family:var(--ui)"><g transform="${mirror ? 'scale(-1,1) translate(60,0)' : ''}">${thumb}${g}<rect x="-80" y="140" width="150" height="150" rx="40" fill="var(--surface-2)" stroke="var(--rule-2)"/></g>${''}</svg><figcaption style="font:650 1rem var(--ui)">${title}<br><span style="font-weight:450;color:var(--ink-2);font-size:.9rem">${sub}</span></figcaption></figure>`;
    };
    panel.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px">${hand(true, ['P', '1', '2', '3', '4'], 'Mano del diapasón', '1 índice, 2 medio, 3 anular, 4 meñique. El pulgar (P) va detrás del mástil.')}${hand(false, ['p', 'i', 'm', 'a', 'c'], 'Mano que pulsa', 'p pulgar, i índice, m medio, a anular (c meñique, poco usado).')}</div>`;
    // Los textos del SVG espejado se corrigen dibujándolos sin espejo
    panel.querySelectorAll('svg g[transform*="scale"] text').forEach((t) => { t.setAttribute('transform', `scale(-1,1) translate(${-2 * +t.getAttribute('x')},0)`); });
  };

  /* Posiciones de una escala (cajas) */
  reg.positions = function (el, c) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    let root = c.root || 'A';
    const scale = c.scale || 'pentMinor';
    const tools = h('div', 'w-tools');
    panel.appendChild(tools);
    const offset = () => M.mod(M.pcOf(M.parseNote(root)) - M.pcOf(M.parseNote(c.root || 'A')), 12);
    let cur = 0;
    if (c.pick !== false) tools.appendChild(M.select(rootOptions(), root, (v) => { root = v; draw(); }, 'Tónica'));
    const chipsEl = chips(c.positions.map((p, i) => ({ v: i, label: p.label || 'Posición ' + (i + 1) })), 0, (v) => { cur = v; draw(); });
    panel.appendChild(chipsEl);
    const host = h('div');
    host.style.marginTop = '12px';
    panel.appendChild(host);
    const fb = new M.Fretboard(host, { frets: c.frets || [0, 17], label: c.label || 'interval', show: { root, scale } });
    const lg = h('div');
    panel.appendChild(lg);
    function draw() {
      let [a, b] = c.positions[cur].frets;
      let off = offset();
      if (b + off > (c.frets || [0, 17])[1]) off -= 12;
      fb.cfg.show = { root, scale };
      fb.cfg.dots = null;
      fb.update({ region: [Math.max(0, a + off), b + off] });
      lg.innerHTML = '';
      lg.appendChild(legend(fb.dots));
    }
    draw();
  };

  /* Afinación de referencia */
  reg.tuning = function (el) {
    const panel = h('div', 'w-panel');
    el.appendChild(panel);
    const row = h('div', 'string-btns');
    panel.appendChild(row);
    const t = M.tuningMidi('standard');
    [6, 5, 4, 3, 2, 1].forEach((s) => {
      const midi = t[6 - s];
      const n = M.spellMidi(midi, 0);
      const b = h('button', null, `${M.rich(M.name(n))}<small>${s}.ª cuerda</small>`);
      b.type = 'button';
      b.setAttribute('aria-label', `Cuerda ${s}, ${M.name(n)}`);
      b.onclick = () => { A.stopAll(); A.pluck(midi, 0, { vel: 0.85 }); };
      row.appendChild(b);
    });
  };

  /* Entrenadores incrustados (reutilizan herramientas) */
  reg.trainer = function (el, c) {
    const tool = M.tools && M.tools[c.tool];
    if (tool) tool.render(el, Object.assign({ embedded: true }, c));
  };

  /* Montaje: busca todos los widgets dentro de un contenedor */
  M.mountWidgets = function (root) {
    root.querySelectorAll('[data-w]').forEach((el) => {
      if (el.dataset.mounted) return;
      el.dataset.mounted = '1';
      let cfg = {};
      try { cfg = JSON.parse(decodeURIComponent(el.dataset.cfg || '%7B%7D')); } catch (e) { console.error(e); }
      const fn = reg[el.dataset.w];
      if (!fn) { el.textContent = 'Widget desconocido: ' + el.dataset.w; return; }
      try { fn(el, cfg); } catch (e) { console.error('Widget', el.dataset.w, e); el.innerHTML = '<p class="empty">No se pudo cargar este ejercicio.</p>'; }
      if (cfg.caption) {
        const cap = h('p', 'w-cap', M.markup(cfg.caption));
        el.appendChild(cap);
      }
    });
  };
})();
