/* Fretto · diapasón interactivo y diagramas de acordes (SVG) */
(function () {
  'use strict';
  const M = window.M;
  const NS = 'http://www.w3.org/2000/svg';
  let uid = 0;

  function svg(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  const ACC_SPLIT = /([♯♭𝄪𝄫])/u;
  const ACC_TEST = /^[♯♭𝄪𝄫]$/u;
  /** Pone texto en un <text> SVG con las alteraciones a tamaño tipográfico. */
  function setRich(t, str) {
    t.textContent = '';
    str = String(str);
    if (!ACC_SPLIT.test(str)) { t.textContent = str; return; }
    str.split(ACC_SPLIT).forEach((part) => {
      if (!part) return;
      if (ACC_TEST.test(part)) {
        const ts = svg('tspan', { class: part === '♯' || part === '𝄪' ? 'acc-s' : 'acc-f' }, t);
        ts.textContent = part;
      } else t.appendChild(document.createTextNode(part));
    });
  }
  function text(parent, x, y, str, attrs) {
    const t = svg('text', Object.assign({ x, y }, attrs || {}), parent);
    setRich(t, str);
    return t;
  }
  /** HTML seguro con alteraciones envueltas para su tipografía. */
  M.rich = function (str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/♯|𝄪/gu, (m) => `<span class="acc-s">${m}</span>`)
      .replace(/♭|𝄫/gu, (m) => `<span class="acc-f">${m}</span>`);
  };
  M.svg = svg;
  M.svgText = text;
  M.setRich = setRich;

  const INLAYS = [3, 5, 7, 9, 15, 17, 19, 21];
  const DOUBLE = [12, 24];
  const GAUGE = [0.9, 1.15, 1.45, 1.9, 2.35, 2.85]; // cuerda 1 → 6

  /* =================== DIAPASÓN =================== */
  function Fretboard(container, cfg) {
    this.c = container;
    this.id = 'fb' + ++uid;
    this.cfg = Object.assign({
      frets: [0, 12], tuning: 'standard', label: 'note', color: 'role',
      interactive: true, dots: null, hover: true, names: true, compact: false,
    }, cfg || {});
    this.cursor = { s: 1, f: this.cfg.frets[0] };
    this.render();
  }
  M.Fretboard = Fretboard;

  Fretboard.prototype.geometry = function () {
    const cfg = this.cfg;
    const [start, end] = cfg.frets;
    const GAP = cfg.compact ? 24 : 28;
    const TOP = 22;
    const labelW = cfg.names ? 26 : 8;
    const openW = start === 0 ? 44 : 0;
    const nutW = start === 0 ? 7 : 0;
    const first = Math.max(1, start);
    const raw = [];
    for (let f = first; f <= end; f++) raw.push(Math.pow(2, -(f - 1) / 12));
    const mean = raw.reduce((a, b) => a + b, 0) / raw.length;
    const unit = cfg.unit || 66;
    const widths = raw.map((r) => (0.45 * r + 0.55 * mean) / mean * unit * (0.82 + 0.18 * Math.pow(2, -(first - 1) / 12)));
    const wire = {};
    let x = labelW + openW + nutW;
    wire[first - 1] = x;
    widths.forEach((w, i) => { x += w; wire[first + i] = x; });
    const W = x + 12;
    const bottom = TOP + 5 * GAP;
    const H = bottom + (cfg.numbers === false ? 18 : 40);
    return { start, end, first, GAP, TOP, labelW, openW, nutW, wire, W, H, bottom };
  };

  Fretboard.prototype.X = function (x) { return M.settings.lefty ? this.g.W - x : x; };
  Fretboard.prototype.cellX = function (f) {
    const g = this.g;
    if (f === 0) return g.labelW + g.openW / 2;
    const a = g.wire[f - 1], b = g.wire[f];
    return a + (b - a) * 0.55;
  };
  Fretboard.prototype.stringY = function (s) { return this.g.TOP + (s - 1) * this.g.GAP; };

  Fretboard.prototype.render = function () {
    const cfg = this.cfg;
    const g = (this.g = this.geometry());
    const X = (x) => this.X(x);
    this.c.innerHTML = '';
    this.c.classList.add('fb-wrap');
    const scroller = document.createElement('div');
    scroller.className = 'fb-scroll';
    const root = svg('svg', {
      viewBox: `0 0 ${g.W} ${g.H}`, class: 'fb', role: cfg.interactive ? 'application' : 'img',
      'aria-label': cfg.aria || 'Diapasón de guitarra', tabindex: cfg.interactive ? 0 : undefined,
    });
    const nFrets = g.end - g.first + 1;
    root.style.minWidth = Math.round(nFrets * (cfg.minFretPx || 40) + (g.start === 0 ? 70 : 30)) + 'px';
    scroller.appendChild(root);
    this.c.appendChild(scroller);
    this.svg = root;
    // Difuminado en los bordes cuando hay trastes fuera de la vista
    const edges = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      scroller.classList.toggle('more-right', max - scroller.scrollLeft > 4);
      scroller.classList.toggle('more-left', scroller.scrollLeft > 4);
    };
    scroller.addEventListener('scroll', edges, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(edges).observe(scroller);
    requestAnimationFrame(() => {
      if (M.settings.lefty) scroller.scrollLeft = scroller.scrollWidth;
      edges();
    });

    const defs = svg('defs', null, root);
    const wood = svg('linearGradient', { id: this.id + 'w', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    svg('stop', { offset: '0', 'stop-color': 'var(--wood-1)' }, wood);
    svg('stop', { offset: '.5', 'stop-color': 'var(--wood-2)' }, wood);
    svg('stop', { offset: '1', 'stop-color': 'var(--wood-1)' }, wood);
    const pearl = svg('radialGradient', { id: this.id + 'p', cx: '.35', cy: '.35', r: '.75' }, defs);
    svg('stop', { offset: '0', 'stop-color': '#fbf8f1' }, pearl);
    svg('stop', { offset: '.55', 'stop-color': '#e6ddcd' }, pearl);
    svg('stop', { offset: '1', 'stop-color': '#c9d3d6' }, pearl);

    const boardTop = g.TOP - g.GAP * 0.55;
    const boardBot = g.bottom + g.GAP * 0.55;
    const x0 = g.wire[g.first - 1] - (g.start === 0 ? 0 : 10);
    const x1 = g.wire[g.end] + 6;
    const L = Math.min(X(x0), X(x1)), R = Math.max(X(x0), X(x1));
    svg('rect', { x: L, y: boardTop, width: R - L, height: boardBot - boardTop, fill: `url(#${this.id}w)`, class: 'fb-board', rx: 2 }, root);
    // Veta de la madera (determinista)
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const grain = svg('g', { class: 'fb-grain' }, root);
    for (let i = 0; i < 16; i++) {
      const y = boardTop + 3 + rnd() * (boardBot - boardTop - 6);
      const dy = (rnd() - 0.5) * 6;
      svg('path', { d: `M${L} ${y} Q ${(L + R) / 2} ${y + dy} ${R} ${y + (rnd() - 0.5) * 3}`, 'stroke-width': 0.5 + rnd() * 1.1 }, grain);
    }
    // Filetes
    svg('line', { x1: L, y1: boardTop, x2: R, y2: boardTop, class: 'fb-binding' }, root);
    svg('line', { x1: L, y1: boardBot, x2: R, y2: boardBot, class: 'fb-binding' }, root);

    // Incrustaciones
    const midY = (g.TOP + g.bottom) / 2;
    for (let f = g.first; f <= g.end; f++) {
      const cx = X((g.wire[f - 1] + g.wire[f]) / 2);
      if (INLAYS.includes(f)) svg('circle', { cx, cy: midY, r: 6.2, fill: `url(#${this.id}p)`, class: 'fb-inlay' }, root);
      if (DOUBLE.includes(f)) {
        svg('circle', { cx, cy: g.TOP + g.GAP * 1.5, r: 6.2, fill: `url(#${this.id}p)`, class: 'fb-inlay' }, root);
        svg('circle', { cx, cy: g.TOP + g.GAP * 3.5, r: 6.2, fill: `url(#${this.id}p)`, class: 'fb-inlay' }, root);
      }
    }
    // Trastes
    for (let f = g.first; f <= g.end; f++) {
      const x = X(g.wire[f]);
      svg('rect', { x: x - 1.6, y: boardTop, width: 3.2, height: boardBot - boardTop, class: 'fb-fret', rx: 1 }, root);
      svg('line', { x1: x - 0.4, y1: boardTop, x2: x - 0.4, y2: boardBot, class: 'fb-fret-hi' }, root);
    }
    if (g.start === 0) {
      const nx = g.labelW + g.openW;
      const a = X(nx), b = X(nx + g.nutW);
      svg('rect', { x: Math.min(a, b), y: boardTop - 2, width: g.nutW, height: boardBot - boardTop + 4, class: 'fb-nut', rx: 1.5 }, root);
    } else {
      const x = X(g.wire[g.first - 1]);
      svg('rect', { x: x - 1.6, y: boardTop, width: 3.2, height: boardBot - boardTop, class: 'fb-fret', rx: 1 }, root);
    }
    // Cuerdas
    const tun = M.tuningMidi(cfg.tuning);
    const sx0 = g.start === 0 ? g.labelW + 4 : x0;
    for (let s = 1; s <= 6; s++) {
      const y = this.stringY(s);
      const w = GAUGE[s - 1];
      svg('line', { x1: X(sx0), y1: y + w * 0.6 + 0.6, x2: X(x1), y2: y + w * 0.6 + 0.6, class: 'fb-str-shadow', 'stroke-width': w }, root);
      svg('line', { x1: X(sx0), y1: y, x2: X(x1), y2: y, class: 'fb-str' + (s >= 4 ? ' wound' : ''), 'stroke-width': w, 'data-s': s }, root);
      if (s >= 4) svg('line', { x1: X(sx0), y1: y, x2: X(x1), y2: y, class: 'fb-wind', 'stroke-width': w }, root);
      if (cfg.names) {
        const n = M.pcNote(tun[6 - s] % 12);
        const lx = M.settings.lefty ? g.W - 11 : 11;
        text(root, lx, y + 4, M.name(n).replace('♯', '♯'), { class: 'fb-name' });
      }
    }
    // Números de traste
    if (cfg.numbers !== false) {
      const ny = g.bottom + g.GAP * 0.55 + 20;
      if (g.start === 0) text(root, X(this.cellX(0)), ny, '0', { class: 'fb-num' });
      for (let f = g.first; f <= g.end; f++) {
        text(root, X(this.cellX(f) - 1.5), ny, String(f), { class: 'fb-num' + (INLAYS.includes(f) || DOUBLE.includes(f) ? ' mark' : '') });
      }
    }
    // Capa de región (posición resaltada)
    if (cfg.region) {
      const [ra, rb] = cfg.region;
      const xa = ra === 0 ? g.labelW + 2 : g.wire[ra - 1] + 2;
      const xb = g.wire[rb] - 2;
      const A = X(xa), B = X(xb);
      svg('rect', { x: Math.min(A, B), y: boardTop - 6, width: Math.abs(B - A), height: boardBot - boardTop + 12, class: 'fb-region', rx: 8 }, root);
    }
    this.dotLayer = svg('g', { class: 'fb-dots' }, root);
    this.fxLayer = svg('g', { class: 'fb-fx' }, root);
    this.drawDots();
    if (cfg.interactive) this.bind();
  };

  Fretboard.prototype.computeDots = function () {
    const cfg = this.cfg;
    if (cfg.dots) return cfg.dots;
    const show = cfg.show;
    if (!show) return [];
    const root = M.parseNote(show.root);
    let ivs = show.ivs;
    if (!ivs && show.scale) ivs = M.SCALES[show.scale].ivs;
    if (!ivs && show.chord !== undefined) ivs = M.CHORDS[show.chord].ivs;
    const tun = M.tuningMidi(cfg.tuning);
    const rpc = M.pcOf(root);
    const byPc = new Map();
    ivs.forEach((iv) => {
      const pc = M.mod(rpc + M.INTERVALS[iv].semi, 12);
      if (!byPc.has(pc)) byPc.set(pc, { iv, note: M.transpose(root, iv) });
    });
    const out = [];
    const [a, b] = cfg.frets;
    for (let s = 1; s <= 6; s++) {
      for (let f = a; f <= b; f++) {
        const pc = M.mod(tun[6 - s] + f, 12);
        const hit = byPc.get(pc);
        if (!hit) continue;
        if (show.strings && !show.strings.includes(s)) continue;
        const d = { s, f, iv: hit.iv, note: hit.note, role: M.role(hit.iv) };
        if (cfg.region && (f < cfg.region[0] || f > cfg.region[1])) d.dim = true;
        if (show.only && !show.only.some((p) => p[0] === s && p[1] === f)) continue;
        out.push(d);
      }
    }
    return out;
  };

  Fretboard.prototype.labelFor = function (d) {
    if (d.label !== undefined) return M.plainTok ? M.plainTok(d.label) : d.label;
    const mode = this.cfg.label;
    if (mode === 'none') return '';
    if (mode === 'interval' && d.iv) return M.ivLabel(d.iv);
    if (mode === 'finger') return d.finger ? String(d.finger) : '';
    const tun = M.tuningMidi(this.cfg.tuning);
    const n = d.note || M.pcNote(M.mod(tun[6 - d.s] + d.f, 12), this.cfg.flats);
    return M.name(n);
  };

  Fretboard.prototype.drawDots = function () {
    const layer = this.dotLayer;
    while (layer.firstChild) layer.removeChild(layer.firstChild);
    const dots = (this.dots = this.computeDots());
    const colorMode = this.cfg.color;
    dots.forEach((d) => {
      if (d.f < this.g.start || d.f > this.g.end) return;
      const cx = this.X(this.cellX(d.f));
      const cy = this.stringY(d.s);
      const label = this.labelFor(d);
      let role = d.role || 'n';
      if (colorMode === 'root') role = d.role === 'r' ? 'r' : 'n';
      if (colorMode === 'mono') role = 'n';
      const gEl = svg('g', { class: `fb-dot role-${role}${d.ghost ? ' ghost' : ''}${d.dim ? ' dim' : ''}${d.cls ? ' ' + d.cls : ''}`, 'data-s': d.s, 'data-f': d.f }, layer);
      const len = [...label].length;
      if (len > 2) {
        const w = Math.max(26, len * 7.2 + 10);
        svg('rect', { x: cx - w / 2, y: cy - 11, width: w, height: 22, rx: 11 }, gEl);
      } else {
        svg('circle', { cx, cy, r: 11.5 }, gEl);
      }
      if (label) text(gEl, cx, cy + 4, label, { class: 'fb-dot-t' });
    });
  };

  Fretboard.prototype.setDots = function (dots) { this.cfg.dots = dots; this.cfg.show = null; this.drawDots(); };
  Fretboard.prototype.setShow = function (show, extra) {
    this.cfg.dots = null; this.cfg.show = show;
    if (extra) Object.assign(this.cfg, extra);
    if (extra && ('region' in extra || 'frets' in extra || 'tuning' in extra)) this.render(); else this.drawDots();
  };
  Fretboard.prototype.update = function (cfg) { Object.assign(this.cfg, cfg); this.render(); };

  Fretboard.prototype.midiAt = function (s, f) { return M.fretMidi(s, f, this.cfg.tuning); };

  Fretboard.prototype.flash = function (s, f, cls) {
    const cx = this.X(this.cellX(f)), cy = this.stringY(s);
    const ring = svg('circle', { cx, cy, r: 12, class: 'fb-ripple ' + (cls || '') }, this.fxLayer);
    setTimeout(() => ring.remove(), 700);
    const str = this.svg.querySelector(`.fb-str[data-s="${s}"]`);
    if (str) { str.classList.remove('vib'); void str.getBBox(); str.classList.add('vib'); setTimeout(() => str.classList.remove('vib'), 500); }
  };

  Fretboard.prototype.hitTest = function (evt) {
    const pt = this.svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    const p = pt.matrixTransform(this.svg.getScreenCTM().inverse());
    let x = M.settings.lefty ? this.g.W - p.x : p.x;
    const g = this.g;
    const s = Math.round((p.y - g.TOP) / g.GAP) + 1;
    if (s < 1 || s > 6 || Math.abs(p.y - this.stringY(s)) > g.GAP * 0.62) return null;
    let f = null;
    if (g.start === 0 && x < g.labelW + g.openW + g.nutW && x > g.labelW - 6) f = 0;
    else for (let k = g.first; k <= g.end; k++) if (x >= g.wire[k - 1] && x < g.wire[k]) { f = k; break; }
    if (f === null) return null;
    return { s, f };
  };

  Fretboard.prototype.play = function (s, f) {
    const midi = this.midiAt(s, f);
    M.audio.pluck(midi, 0, { vel: 0.8 });
    this.flash(s, f);
    if (this.cfg.onPlay) this.cfg.onPlay({ string: s, fret: f, midi, fb: this });
  };

  Fretboard.prototype.bind = function () {
    const root = this.svg;
    const hover = svg('g', { class: 'fb-hover', visibility: 'hidden' }, this.fxLayer.parentNode);
    const hc = svg('circle', { r: 11.5 }, hover);
    const ht = text(hover, 0, 0, '', { class: 'fb-dot-t' });
    const focus = svg('rect', { class: 'fb-focus', width: 30, height: 26, rx: 13, visibility: 'hidden' }, this.fxLayer.parentNode);
    const showAt = (s, f) => {
      const cx = this.X(this.cellX(f)), cy = this.stringY(s);
      hc.setAttribute('cx', cx); hc.setAttribute('cy', cy);
      ht.setAttribute('x', cx); ht.setAttribute('y', cy + 4);
      setRich(ht, M.name(M.pcNote(M.mod(this.midiAt(s, f), 12), this.cfg.flats)));
      hover.setAttribute('visibility', 'visible');
    };
    root.addEventListener('pointermove', (e) => {
      if (!this.cfg.hover || e.pointerType === 'touch') return;
      const h = this.hitTest(e);
      if (!h) { hover.setAttribute('visibility', 'hidden'); return; }
      const has = this.dots && this.dots.some((d) => d.s === h.s && d.f === h.f && !d.ghost);
      if (has) { hover.setAttribute('visibility', 'hidden'); return; }
      showAt(h.s, h.f);
    });
    root.addEventListener('pointerleave', () => hover.setAttribute('visibility', 'hidden'));
    root.addEventListener('pointerdown', (e) => {
      const h = this.hitTest(e);
      if (!h) return;
      e.preventDefault();
      this.cursor = h;
      this.play(h.s, h.f);
    });
    const moveFocus = () => {
      const cx = this.X(this.cellX(this.cursor.f)), cy = this.stringY(this.cursor.s);
      focus.setAttribute('x', cx - 15); focus.setAttribute('y', cy - 13);
      focus.setAttribute('visibility', 'visible');
    };
    root.addEventListener('focus', () => { if (root.matches(':focus-visible')) moveFocus(); });
    root.addEventListener('blur', () => focus.setAttribute('visibility', 'hidden'));
    root.addEventListener('keydown', (e) => {
      const c = this.cursor, g = this.g;
      const dir = M.settings.lefty ? -1 : 1;
      if (e.key === 'ArrowRight') c.f = Math.min(g.end, c.f + dir < g.start ? g.start : c.f + dir);
      else if (e.key === 'ArrowLeft') c.f = Math.max(g.start, Math.min(g.end, c.f - dir));
      else if (e.key === 'ArrowUp') c.s = Math.max(1, c.s - 1);
      else if (e.key === 'ArrowDown') c.s = Math.min(6, c.s + 1);
      else if (e.key === 'Enter' || e.key === ' ') { this.play(c.s, c.f); }
      else return;
      c.f = Math.max(g.start, Math.min(g.end, c.f));
      e.preventDefault();
      moveFocus();
    });
  };

  /* =================== DIAGRAMA DE ACORDE =================== */
  /**
   * shape: { frets[6] (cuerda 6→1, −1 = muda), fingers[6], barre {fret, from, to}, labels[6] (intervalos) }
   * opts: { label: 'finger'|'interval'|'note'|'none', root, rows }
   */
  M.chordDiagram = function (shape, opts) {
    opts = opts || {};
    const fr = shape.frets;
    const fretted = fr.filter((f) => f > 0);
    const maxF = fretted.length ? Math.max(...fretted) : 0;
    const minF = fretted.length ? Math.min(...fretted) : 0;
    const rows = Math.max(opts.rows || 4, maxF - minF + 1 + (maxF <= 4 ? 0 : 0));
    const base = maxF <= Math.max(4, rows) ? 1 : minF;
    const SX = 17, SY = 21, L = 24, T = 26;
    const W = L + SX * 5 + 16, H = T + SY * rows + 10;
    const lefty = M.settings.lefty;
    const xs = (i) => (lefty ? L + SX * (5 - i) : L + SX * i); // i = 0 → cuerda 6
    const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'cd', role: 'img' });
    // Cejuela o número de traste
    if (base === 1) svg('rect', { x: L - 1.5, y: T - 4.5, width: SX * 5 + 3, height: 5, class: 'cd-nut', rx: 1 }, root);
    else text(root, lefty ? L + SX * 5 + 9 : L - 11, T + SY * 0.5 + 4, String(base), { class: 'cd-base' });
    for (let r = 0; r <= rows; r++) svg('line', { x1: L, y1: T + r * SY, x2: L + SX * 5, y2: T + r * SY, class: 'cd-fret' }, root);
    for (let i = 0; i < 6; i++) svg('line', { x1: xs(i), y1: T, x2: xs(i), y2: T + rows * SY, class: 'cd-str', 'stroke-width': 0.8 + (5 - i) * 0.18 }, root);
    // Abiertas y muteadas
    fr.forEach((f, i) => {
      const x = xs(i);
      if (f === 0) svg('circle', { cx: x, cy: T - 13, r: 4.4, class: 'cd-open' + (shape.labels && shape.labels[i] === '1' && opts.label === 'interval' ? ' is-root' : '') }, root);
      if (f < 0) {
        const d = 3.8;
        svg('path', { d: `M${x - d} ${T - 13 - d} L${x + d} ${T - 13 + d} M${x + d} ${T - 13 - d} L${x - d} ${T - 13 + d}`, class: 'cd-mute' }, root);
      }
    });
    // Cejilla
    const labelMode = opts.label || 'finger';
    if (shape.barre && labelMode === 'finger') {
      const b = shape.barre;
      const y = T + (b.fret - base + 0.5) * SY;
      const xa = xs(b.from), xb = xs(b.to);
      svg('rect', { x: Math.min(xa, xb) - 7, y: y - 7, width: Math.abs(xb - xa) + 14, height: 14, rx: 7, class: 'cd-barre' }, root);
    }
    const tun = M.tuningMidi('standard');
    fr.forEach((f, i) => {
      if (f <= 0) return;
      const cx = xs(i), cy = T + (f - base + 0.5) * SY;
      const iv = shape.labels ? shape.labels[i] : null;
      let role = 'n', label = '';
      if (labelMode === 'finger') label = shape.fingers && shape.fingers[i] ? String(shape.fingers[i]) : '';
      if (labelMode === 'interval' && iv) { label = M.ivLabel(iv); role = M.role(iv); }
      if (labelMode === 'note') {
        const midi = tun[i] + f;
        label = opts.root && iv ? M.name(M.transpose(opts.root, iv)) : M.name(M.pcNote(midi % 12));
        role = iv ? M.role(iv) : 'n';
      }
      if (labelMode === 'finger' && iv === '1') role = 'r';
      const onBarre = shape.barre && labelMode === 'finger' && f === shape.barre.fret && shape.fingers && shape.fingers[i] === 1;
      const gEl = svg('g', { class: `cd-dot role-${role}${onBarre ? ' on-barre' : ''}` }, root);
      if (!onBarre) svg('circle', { cx, cy, r: 7.4 }, gEl);
      if (label && !(onBarre && i !== shape.barre.from)) text(gEl, cx, cy + 3.6, label, { class: 'cd-dot-t' + ([...label].length > 2 ? ' sm' : '') });
    });
    return root;
  };

  /** Crea una ficha de acorde (nombre + diagrama), clicable para sonar. */
  M.chordCard = function (sym, opts) {
    opts = opts || {};
    const shape = opts.shape || M.chordShape(sym);
    const fig = document.createElement('button');
    fig.type = 'button';
    fig.className = 'chord-card';
    if (!shape) { fig.textContent = sym; return fig; }
    const nm = document.createElement('span');
    nm.className = 'chord-name';
    const title = opts.title || M.displayChord(sym);
    nm.innerHTML = M.rich(title);
    fig.appendChild(nm);
    const p = M.parseChord(sym);
    fig.appendChild(M.chordDiagram(shape, { label: opts.label || 'finger', root: p && p.root }));
    if (opts.caption) {
      const c = document.createElement('span');
      c.className = 'chord-cap';
      c.innerHTML = opts.caption;
      fig.appendChild(c);
    }
    fig.setAttribute('aria-label', `Acorde ${title}. Pulsa para escucharlo`);
    fig.addEventListener('click', () => {
      M.audio.strum(M.shapeMidis(shape.frets), 0, { spread: 0.03 });
      fig.classList.remove('ring'); void fig.offsetWidth; fig.classList.add('ring');
    });
    return fig;
  };
})();
