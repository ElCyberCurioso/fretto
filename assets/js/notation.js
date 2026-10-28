/* Fretto · partitura y tablatura en SVG, con reproducción
   Formato de entrada (tokens separados por espacios, "|" = barra de compás):
     q:6/3        negra en cuerda 6, traste 3          (w h q e s; "." puntillo; "t" tresillo)
     e.:3/2       corchea con puntillo
     h:6/3+5/2    acorde (varias notas a la vez)
     q:E4         altura escrita (la tablatura se calcula sola)
     q:r          silencio
     q:3/5h       técnicas: h ligado asc., p ligado desc., s arrastre, b bend, v vibrato
     h:3/2~       ligadura de prolongación con la siguiente
     q:6/0@Em     cifrado encima
     q:D / e:U    (modo ritmo) rasgueo abajo / arriba; x = golpe apagado; o = nota sin flecha */
(function () {
  'use strict';
  const M = window.M;
  const svg = M.svg, text = M.svgText;
  const DUR = { w: 4, h: 2, q: 1, e: 0.5, s: 0.25 };
  const SHARP_P = [8, 5, 9, 6, 3, 7, 4];
  const FLAT_P = [4, 7, 3, 6, 2, 5, 1];

  /* ---------- Análisis ---------- */
  function parse(str, cfg) {
    const key = cfg.key || 0;
    const tun = M.tuningMidi(cfg.tuning);
    const measures = [];
    let cur = [];
    str.trim().split(/\s+/).forEach((tok) => {
      if (tok === '|') { if (cur.length) measures.push(cur); cur = []; return; }
      const m = /^([whqes])(\.?)(t?)(?::(.*))?$/.exec(tok);
      if (!m) { console.warn('Token no reconocido:', tok); return; }
      const ev = {
        dur: m[1], dot: !!m[2], trip: !!m[3],
        beats: DUR[m[1]] * (m[2] ? 1.5 : 1) * (m[3] ? 2 / 3 : 1),
        notes: [], rest: false,
      };
      let body = m[4] || 'r';
      const at = body.indexOf('@');
      if (at >= 0) { ev.chord = body.slice(at + 1); body = body.slice(0, at); }
      if (body.endsWith('~')) { ev.tie = true; body = body.slice(0, -1); }
      if (body === 'r' || body === '') ev.rest = true;
      else if (/^[DUxo]$/.test(body)) ev.hit = body;
      else body.split('+').forEach((part) => {
        let mm = /^([1-6])\/(\d+|x)([hpsbv]*)$/.exec(part);
        if (mm) {
          const s = +mm[1], dead = mm[2] === 'x', f = dead ? 0 : +mm[2];
          const midi = tun[6 - s] + f;
          ev.notes.push({ s, f, dead, midi, tech: mm[3] || '', w: M.spellMidi(midi + 12, key) });
          return;
        }
        mm = /^([A-G])(##|bb|#|b|n)?(-?\d)(?:\/([1-6]))?$/.exec(part);
        if (mm) {
          const acc = { '': 0, n: 0, '#': 1, '##': 2, b: -1, bb: -2 }[mm[2] || ''];
          const w = { letter: mm[1], acc, oct: +mm[3] };
          const midi = M.midiOf(w) - 12;
          let pos = null;
          if (mm[4]) pos = { string: +mm[4], fret: midi - tun[6 - +mm[4]] };
          else pos = M.bestPosition(midi, cfg.tuning, cfg.position == null ? 1.5 : cfg.position);
          ev.notes.push({ s: pos ? pos.string : 0, f: pos ? pos.fret : 0, midi, tech: '', w, forceNat: mm[2] === 'n' });
        }
      });
      cur.push(ev);
    });
    if (cur.length) measures.push(cur);
    return measures;
  }

  /* ---------- Componente ---------- */
  function Score(container, cfg) {
    this.c = container;
    this.cfg = Object.assign({ key: 0, time: [4, 4], bpm: 72, mode: 'full', counts: false, size: 8.5, controls: true, countIn: true, metro: true, loop: false }, cfg || {});
    this.measures = parse(this.cfg.notes || '', this.cfg);
    this.c.classList.add('score');
    this.box = document.createElement('div');
    this.box.className = 'score-svg';
    this.c.appendChild(this.box);
    if (this.cfg.controls) this.buildControls();
    this.lastW = 0;
    this.render();
    const ro = new ResizeObserver(() => {
      const w = this.box.clientWidth;
      if (Math.abs(w - this.lastW) > 16) this.render();
    });
    ro.observe(this.box);
  }
  M.Score = Score;
  M.parseScore = parse;

  Score.prototype.render = function () {
    const cfg = this.cfg;
    const s = cfg.size;
    const width = Math.max(260, this.box.clientWidth || 640);
    this.lastW = width;
    const mode = cfg.mode;
    const showStaff = mode === 'full' || mode === 'staff';
    const showTab = mode === 'full' || mode === 'tab';
    const rhythm = mode === 'rhythm';
    const ts = s * 1.42;
    const key = cfg.key || 0;
    const [tn, td] = cfg.time;
    const measureBeats = tn * (4 / td);

    // --- Accidentales por compás ---
    const ksLetters = {};
    M.keySignature(key).forEach((k) => (ksLetters[k.letter] = k.acc));
    this.measures.forEach((meas) => {
      const state = {};
      let prevTie = null;
      meas.forEach((ev) => {
        ev.notes.forEach((n) => {
          const k = n.w.letter + n.w.oct;
          const eff = k in state ? state[k] : ksLetters[n.w.letter] || 0;
          n.acc = null;
          const tiedFrom = prevTie && prevTie.notes.some((pn) => pn.midi === n.midi);
          if ((n.w.acc !== eff || n.forceNat) && !tiedFrom) { n.acc = n.w.acc; state[k] = n.w.acc; }
          n.p = M.diatonicIndex(n.w) - 30;
        });
        prevTie = ev.tie ? ev : null;
      });
    });

    // --- Anchos naturales ---
    const evW = (ev) => {
      let w = s * (2.3 + 3.7 * Math.pow(ev.beats, 0.6));
      if (ev.notes.some((n) => n.acc !== null)) w += s * 1.2;
      if (ev.dot) w += s * 0.5;
      if (showTab && ev.notes.some((n) => n.f >= 10)) w += s * 0.4;
      if (ev.chord) w = Math.max(w, s * (1.4 + ev.chord.length * 1.05));
      return w;
    };
    const ksW = Math.abs(key) * s * 1.05 + (key ? s * 0.6 : 0);
    const headerW = (first) => (rhythm ? (cfg.noClef ? s * 0.2 : s * 1.2) : s * 3.6 + (showStaff ? ksW : 0)) + (first && !cfg.noTime && (showStaff || rhythm) ? s * 2.6 : 0) + s * 0.6;
    const mW = this.measures.map((meas) => s * 2.2 + meas.reduce((a, ev) => a + evW(ev), 0));

    // --- Sistemas (líneas) ---
    const systems = [];
    let line = [], used = headerW(true);
    this.measures.forEach((meas, i) => {
      if (line.length && used + mW[i] > width - 4) {
        systems.push(line);
        line = []; used = headerW(false);
      }
      line.push(i); used += mW[i];
    });
    if (line.length) systems.push(line);

    // --- Métricas verticales ---
    const chordRow = this.measures.some((m) => m.some((e) => e.chord)) ? s * 2.4 : 0;
    const strumRow = rhythm && this.measures.some((m) => m.some((e) => e.hit === 'D' || e.hit === 'U')) ? s * 3.8 : 0;
    const topPad = rhythm ? s * 4.4 + strumRow + chordRow : s * 4.6 + chordRow;
    this.strumRow = strumRow;
    const staffH = rhythm ? 0 : s * 4;
    let lowest = -2, highest = 10;
    this.measures.forEach((m) => m.forEach((e) => e.notes.forEach((n) => { lowest = Math.min(lowest, n.p); highest = Math.max(highest, n.p); })));
    const belowStaff = rhythm ? s * 1.5 : Math.max(s * 3.4, (-lowest) * s / 2 + s * 2.2);
    const tabGap = showTab && showStaff ? s * 1.4 : 0;
    const tabH = showTab ? ts * 5 : 0;
    const countRow = cfg.counts ? s * 3.0 : s * 1.2;
    const sysH = topPad + (showStaff ? staffH + belowStaff : rhythm ? belowStaff : 0) + tabGap + tabH + countRow + s * 1.4;
    const extraTop = Math.max(0, (highest - 12) * s / 2);
    const H = systems.length * (sysH + extraTop);

    this.box.innerHTML = '';
    const root = svg('svg', { width, height: Math.ceil(H), viewBox: `0 0 ${width} ${Math.ceil(H)}`, class: 'sc' + (rhythm ? ' sc-rhythm' : ''), role: 'img', 'aria-label': cfg.aria || 'Partitura' });
    this.box.appendChild(root);
    this.svgEl = root;
    this.evGroups = [];
    this.flat = [];

    let gi = 0;
    systems.forEach((sys, si) => {
      const oy = si * (sysH + extraTop) + extraTop;
      const staffTop = oy + topPad;
      const staffBot = staffTop + staffH;
      const lineY = staffTop; // ritmo: una sola línea
      const tabTop = showStaff ? staffBot + belowStaff + tabGap : staffTop;
      const yP = (p) => staffBot - (p * s) / 2;
      const tabY = (str) => tabTop + (str - 1) * ts;
      const hw = headerW(si === 0);
      const natural = sys.reduce((a, i) => a + mW[i], 0);
      const isLast = si === systems.length - 1;
      const stretch = isLast && natural + hw < width * 0.72 ? 1 : (width - 2 - hw) / natural;
      const x0 = 1;
      const xEnd = isLast && stretch === 1 ? x0 + hw + natural : width - 1;

      // Pentagrama / línea
      if (showStaff) for (let k = 0; k < 5; k++) svg('line', { x1: x0, x2: xEnd, y1: staffTop + k * s, y2: staffTop + k * s, class: 'sc-line' }, root);
      if (rhythm) svg('line', { x1: x0, x2: xEnd, y1: lineY, y2: lineY, class: 'sc-line' }, root);
      if (showTab) for (let k = 0; k < 6; k++) svg('line', { x1: x0, x2: xEnd, y1: tabTop + k * ts, y2: tabTop + k * ts, class: 'sc-line' }, root);
      if (showStaff && showTab) svg('line', { x1: x0, x2: x0, y1: staffTop, y2: tabTop + 5 * ts, class: 'sc-bar' }, root);

      // Cabecera
      let hx = x0 + s * 0.7;
      if (showStaff) {
        text(root, hx - s * 0.1, yP(2) + s * 0.02, '𝄞', { class: 'sc-clef', 'font-size': s * 4.1 });
        text(root, hx + s * 1.25, yP(-4.6), '8', { class: 'sc-clef8', 'font-size': s * 1.05 });
        hx += s * 3.4;
        const pos = key > 0 ? SHARP_P : FLAT_P;
        for (let k = 0; k < Math.abs(key); k++) drawAcc(root, hx + k * s * 1.05 + s * 0.4, yP(pos[k]), key > 0 ? 1 : -1, s);
        hx += ksW;
      } else if (showTab) {
        ['T', 'A', 'B'].forEach((ch, k) => text(root, hx + s * 0.6, tabTop + ts * (1.35 + k * 1.3), ch, { class: 'sc-tabclef', 'font-size': ts * 1.25 }));
        hx += s * 3.6;
      } else if (rhythm && !cfg.noClef) {
        svg('rect', { x: hx, y: lineY - s * 1, width: s * 0.35, height: s * 2, class: 'sc-perc' }, root);
        svg('rect', { x: hx + s * 0.6, y: lineY - s * 1, width: s * 0.35, height: s * 2, class: 'sc-perc' }, root);
        hx += s * 1.2;
      }
      if (si === 0 && !cfg.noTime && (showStaff || rhythm)) {
        const cy = showStaff ? yP(4) : lineY;
        text(root, hx + s * 1.0, cy - s * 0.08, String(tn), { class: 'sc-time', 'font-size': s * 2.55 });
        text(root, hx + s * 1.0, cy + s * 1.98, String(td), { class: 'sc-time', 'font-size': s * 2.55 });
        hx += s * 2.6;
      }
      if (showTab && showStaff) {
        ['T', 'A', 'B'].forEach((ch, k) => text(root, x0 + s * 1.6, tabTop + ts * (1.35 + k * 1.3), ch, { class: 'sc-tabclef', 'font-size': ts * 1.25 }));
      }

      // Compases
      let mx = x0 + hw;
      sys.forEach((mi, k) => {
        const meas = this.measures[mi];
        const w = mW[mi] * stretch;
        const inner = (w - s * 2.2) / (mW[mi] - s * 2.2);
        let ex = mx + s * 1.3;
        let beatPos = 0;
        meas.forEach((ev) => {
          const ew = evW(ev) * inner;
          ev.x = ex + (ev.notes.some((n) => n.acc !== null) ? s * 1.25 : 0) + s * 0.75;
          ev.beat = beatPos;
          beatPos += ev.beats;
          ex += ew;
        });
        // barra final
        const bx = mx + w;
        const last = isLast && k === sys.length - 1;
        const drawBar = (y1, y2) => {
          if (cfg.noBars) return;
          if (last) {
            svg('line', { x1: bx - s * 0.75, x2: bx - s * 0.75, y1, y2, class: 'sc-bar' }, root);
            svg('rect', { x: bx - s * 0.42, y: y1, width: s * 0.42, height: y2 - y1, class: 'sc-barfill' }, root);
          } else svg('line', { x1: bx, x2: bx, y1, y2, class: 'sc-bar' }, root);
        };
        if (showStaff) drawBar(staffTop, staffBot);
        if (rhythm) drawBar(lineY - s * 1.2, lineY + s * 1.2);
        if (showTab) drawBar(tabTop, tabTop + 5 * ts);
        if (showStaff && showTab && !last) svg('line', { x1: bx, x2: bx, y1: staffBot, y2: tabTop, class: 'sc-bar faint' }, root);

        // Agrupación para barras de corchea
        const unit = td === 8 && tn % 3 === 0 ? 1.5 : 1;
        const groups = [];
        let g = null;
        meas.forEach((ev, idx) => {
          const beamable = (ev.dur === 'e' || ev.dur === 's') && !ev.rest;
          const slot = Math.floor((ev.beat + 1e-6) / unit);
          if (beamable && g && g.slot === slot) g.evs.push(ev);
          else {
            if (g) groups.push(g);
            g = beamable ? { slot, evs: [ev] } : null;
            if (!beamable) groups.push({ single: ev });
          }
        });
        if (g) groups.push(g);

        groups.forEach((grp) => {
          const evs = grp.single ? [grp.single] : grp.evs;
          // dirección de plica
          let up = true;
          if (!rhythm) {
            let far = 0;
            evs.forEach((ev) => ev.notes.forEach((n) => { if (Math.abs(n.p - 4) > Math.abs(far)) far = n.p - 4; }));
            up = far < 0 || (far === 0 && true);
            if (evs.every((ev) => ev.notes.every((n) => n.p >= 4))) up = false;
          }
          evs.forEach((ev) => (ev.up = up));
          evs.forEach((ev) => {
            const gEl = svg('g', { class: 'ev', 'data-i': gi }, root);
            ev.g = gEl; ev.gi = gi++;
            this.evGroups.push(gEl);
            this.flat.push(ev);
            if (showStaff) drawStaffEvent(root, gEl, ev, yP, s, evs.length > 1);
            if (rhythm) drawRhythmEvent(root, gEl, ev, lineY, s, evs.length > 1, cfg);
            if (showTab) drawTabEvent(gEl, ev, tabY, s, ts, showStaff);
            if (ev.chord) text(gEl, ev.x, staffTop - (rhythm ? s * 4.4 + strumRow + s * 0.5 : s * 3.2) - (!rhythm && highest > 10 ? (highest - 10) * s / 2 : 0), M.displayChord(ev.chord), { class: 'sc-chord', 'font-size': s * 1.55 });
            if (cfg.counts) {
              const cy = showTab ? tabTop + 5 * ts + s * 2.2 : rhythm ? lineY + s * 3.2 : staffBot + belowStaff - s * 0.6;
              const lbl = countLabel(ev, cfg.time);
              if (lbl) text(gEl, ev.x, cy, lbl, { class: 'sc-count' + (/^\d/.test(lbl) ? ' beat' : ''), 'font-size': s * 1.35 });
            }
          });
          if (!grp.single && (showStaff || rhythm)) drawBeams(root, evs, rhythm ? () => lineY : yP, s, rhythm);
          else if (grp.single && (showStaff || rhythm) && !grp.single.rest && (grp.single.dur === 'e' || grp.single.dur === 's')) drawFlag(root, grp.single, s);
        });
        // tresillos
        if (showStaff || rhythm) drawTuplets(root, meas, s, rhythm ? lineY : yP);
        mx += w;
      });
      // ligaduras y técnicas (dentro del sistema)
      const sysEvs = [];
      sys.forEach((mi) => sysEvs.push(...this.measures[mi]));
      sysEvs.forEach((ev, i) => {
        const nx = sysEvs[i + 1];
        if (!nx) return;
        if (ev.tie && showStaff) ev.notes.forEach((n) => {
          const y = yP(n.p) + (ev.up ? s * 0.75 : -s * 0.75);
          const x1 = ev.x + s * 0.6, x2 = nx.x - s * 0.6;
          const c = ev.up ? s * 0.9 : -s * 0.9;
          svg('path', { d: `M${x1} ${y} Q ${(x1 + x2) / 2} ${y + c} ${x2} ${y}`, class: 'sc-tie' }, root);
        });
        ev.notes.forEach((n) => {
          const t = n.tech;
          const n2 = nx.notes.find((q) => q.s === n.s);
          if (!n2) return;
          if (/[hp]/.test(t)) {
            if (showTab) {
              const y = tabY(n.s) - ts * 0.55;
              const x1 = ev.x + s * 0.2, x2 = nx.x - s * 0.2;
              svg('path', { d: `M${x1} ${y} Q ${(x1 + x2) / 2} ${y - ts * 1.1} ${x2} ${y}`, class: 'sc-tie' }, root);
              text(root, (x1 + x2) / 2, y - ts * 0.75, t.includes('h') ? 'H' : 'P', { class: 'sc-tech', 'font-size': s * 1.05 });
            }
            if (showStaff) {
              const top = Math.max(n.p, n2.p);
              const y = yP(top) - s * 1.0;
              svg('path', { d: `M${ev.x} ${y} Q ${(ev.x + nx.x) / 2} ${y - s * 1.3} ${nx.x} ${y}`, class: 'sc-tie' }, root);
            }
          }
          if (t.includes('s')) {
            const dirUp = n2.midi > n.midi ? -1 : 1;
            if (showTab) {
              const y = tabY(n.s);
              svg('line', { x1: ev.x + s * 0.9, y1: y - dirUp * ts * 0.35, x2: nx.x - s * 0.9, y2: y + dirUp * ts * 0.35, class: 'sc-slide' }, root);
            }
            if (showStaff) svg('line', { x1: ev.x + s * 0.9, y1: yP(n.p), x2: nx.x - s * 0.9, y2: yP(n2.p), class: 'sc-slide' }, root);
          }
        });
      });
    });
    this.H = H;
  };

  function countLabel(ev, time) {
    const [tn, td] = time;
    if (td === 8) {
      const e8 = ev.beat * 2;
      if (Math.abs(e8 - Math.round(e8)) < 0.01) return String(Math.round(e8) + 1);
      return '';
    }
    const unit = 4 / td;
    const b = ev.beat / unit;
    const ib = Math.floor(b + 1e-6);
    const fr = b - ib;
    if (ev.trip) {
      if (fr < 0.05) return String(ib + 1);
      if (Math.abs(fr - 1 / 3) < 0.05) return 'tri';
      if (Math.abs(fr - 2 / 3) < 0.05) return 'ple';
    }
    if (fr < 0.01) return String(ib + 1);
    if (Math.abs(fr - 0.5) < 0.01) return 'y';
    if (Math.abs(fr - 0.25) < 0.01) return 'e';
    if (Math.abs(fr - 0.75) < 0.01) return 'a';
    return '';
  }

  /* ---------- Dibujo: elementos ---------- */
  function drawAcc(parent, x, y, acc, s, cls) {
    const g = svg('g', { class: 'sc-acc' + (cls ? ' ' + cls : '') }, parent);
    if (acc === 1 || acc === 2) {
      if (acc === 2) {
        const d = s * 0.42;
        svg('path', { d: `M${x - d} ${y - d} L${x + d} ${y + d} M${x + d} ${y - d} L${x - d} ${y + d}`, class: 'sc-acc-x', 'stroke-width': s * 0.16 }, g);
        return g;
      }
      svg('line', { x1: x - s * 0.22, y1: y - s * 1.25, x2: x - s * 0.22, y2: y + s * 1.1, 'stroke-width': s * 0.11 }, g);
      svg('line', { x1: x + s * 0.22, y1: y - s * 1.1, x2: x + s * 0.22, y2: y + s * 1.25, 'stroke-width': s * 0.11 }, g);
      [-0.42, 0.42].forEach((o) => {
        const yc = y + o * s;
        svg('path', { d: `M${x - s * 0.52} ${yc + s * 0.12} L${x + s * 0.52} ${yc - s * 0.14} L${x + s * 0.52} ${yc - s * 0.42} L${x - s * 0.52} ${yc - s * 0.16} Z`, class: 'fill' }, g);
      });
    } else if (acc === -1 || acc === -2) {
      const one = (xx) => {
        svg('line', { x1: xx - s * 0.32, y1: y - s * 1.95, x2: xx - s * 0.32, y2: y + s * 0.5, 'stroke-width': s * 0.12 }, g);
        svg('path', {
          d: `M${xx - s * 0.32} ${y + s * 0.5} C ${xx + s * 0.25} ${y + s * 0.15}, ${xx + s * 0.75} ${y - s * 0.35}, ${xx + s * 0.35} ${y - s * 0.62} C ${xx + s * 0.05} ${y - s * 0.8}, ${xx - s * 0.2} ${y - s * 0.5}, ${xx - s * 0.32} ${y - s * 0.3} L ${xx - s * 0.32} ${y - s * 0.08} C ${xx - s * 0.15} ${y - s * 0.38}, ${xx + s * 0.1} ${y - s * 0.52}, ${xx + s * 0.27} ${y - s * 0.4} C ${xx + s * 0.48} ${y - s * 0.22}, ${xx + s * 0.2} ${y + s * 0.12}, ${xx - s * 0.32} ${y + s * 0.5} Z`,
          class: 'fill',
        }, g);
      };
      one(x);
      if (acc === -2) one(x - s * 0.75);
    } else {
      svg('line', { x1: x - s * 0.3, y1: y - s * 1.2, x2: x - s * 0.3, y2: y + s * 0.55, 'stroke-width': s * 0.11 }, g);
      svg('line', { x1: x + s * 0.3, y1: y - s * 0.55, x2: x + s * 0.3, y2: y + s * 1.2, 'stroke-width': s * 0.11 }, g);
      [-0.3, 0.3].forEach((o) => {
        const yc = y + o * s;
        svg('path', { d: `M${x - s * 0.3} ${yc + s * 0.14} L${x + s * 0.3} ${yc - s * 0.05} L${x + s * 0.3} ${yc - s * 0.3} L${x - s * 0.3} ${yc - s * 0.11} Z`, class: 'fill' }, g);
      });
    }
    return g;
  }
  M.drawAcc = drawAcc;

  function notehead(parent, x, y, s, hollow, whole, cross) {
    if (cross) {
      const d = s * 0.42;
      svg('path', { d: `M${x - d} ${y - d} L${x + d} ${y + d} M${x + d} ${y - d} L${x - d} ${y + d}`, class: 'sc-x', 'stroke-width': s * 0.17 }, parent);
      return;
    }
    const rx = whole ? s * 0.78 : s * 0.64, ry = s * 0.47;
    const rot = whole ? 0 : -22;
    svg('ellipse', { cx: x, cy: y, rx, ry, transform: `rotate(${rot} ${x} ${y})`, class: 'sc-head' }, parent);
    if (hollow) {
      if (whole) svg('ellipse', { cx: x, cy: y, rx: s * 0.36, ry: s * 0.26, transform: `rotate(-40 ${x} ${y})`, class: 'sc-hole' }, parent);
      else svg('ellipse', { cx: x, cy: y, rx: s * 0.46, ry: s * 0.2, transform: `rotate(-30 ${x} ${y})`, class: 'sc-hole' }, parent);
    }
  }
  M.notehead = notehead;

  function drawRest(parent, ev, x, yMid, s, yP) {
    const g = parent;
    const d = ev.dur;
    if (d === 'w') svg('rect', { x: x - s * 0.6, y: yP ? yP(6) : yMid - s, width: s * 1.2, height: s * 0.5, class: 'fill' }, g);
    else if (d === 'h') svg('rect', { x: x - s * 0.6, y: (yP ? yP(4) : yMid) - s * 0.5, width: s * 1.2, height: s * 0.5, class: 'fill' }, g);
    else if (d === 'q') {
      const y = yMid;
      svg('path', {
        d: `M${x - s * 0.25} ${y - s * 1.55} L${x + s * 0.42} ${y - s * 0.7} C ${x - s * 0.05} ${y - s * 0.35}, ${x - s * 0.1} ${y + s * 0.05}, ${x + s * 0.42} ${y + s * 0.62} C ${x - s * 0.25} ${y + s * 0.35}, ${x - s * 0.5} ${y + s * 0.8}, ${x + s * 0.05} ${y + s * 1.45} C ${x - s * 0.75} ${y + s * 1.0}, ${x - s * 0.55} ${y + s * 0.3}, ${x + s * 0.05} ${y + s * 0.5} L${x - s * 0.42} ${y - s * 0.05} C ${x + s * 0.05} ${y - s * 0.45}, ${x + s * 0.05} ${y - s * 0.8}, ${x - s * 0.25} ${y - s * 1.55} Z`,
        class: 'fill',
      }, g);
    } else {
      const n = d === 's' ? 2 : 1;
      const top = yMid - s * 0.5;
      svg('line', { x1: x + s * 0.45, y1: top - s * 0.15, x2: x - s * 0.1, y2: top + s * (1.8 + (n - 1) * 0.9), 'stroke-width': s * 0.14, class: 'stroke' }, g);
      for (let k = 0; k < n; k++) {
        const yy = top + k * s * 0.95;
        const xx = x + s * 0.45 - k * s * 0.3;
        svg('circle', { cx: xx - s * 0.55, cy: yy + s * 0.08, r: s * 0.27, class: 'fill' }, g);
        svg('path', { d: `M${xx - s * 0.6} ${yy + s * 0.3} Q ${xx - s * 0.1} ${yy + s * 0.42} ${xx} ${yy - s * 0.1}`, class: 'stroke', 'stroke-width': s * 0.12, fill: 'none' }, g);
      }
    }
    if (ev.dot) svg('circle', { cx: x + s * 1.0, cy: yMid - s * 0.5, r: s * 0.18, class: 'fill' }, g);
  }

  function drawStaffEvent(root, g, ev, yP, s, beamed) {
    const x = ev.x;
    if (ev.rest) { drawRest(g, ev, x, yP(4), s, yP); return; }
    if (!ev.notes.length) return;
    const hollow = ev.dur === 'h' || ev.dur === 'w';
    const ps = ev.notes.map((n) => n.p).sort((a, b) => a - b);
    // líneas adicionales
    const lo = ps[0], hi = ps[ps.length - 1];
    for (let q = -2; q >= lo; q -= 2) svg('line', { x1: x - s * 1.05, x2: x + s * 1.05, y1: yP(q), y2: yP(q), class: 'sc-ledger' }, g);
    for (let q = 10; q <= hi; q += 2) svg('line', { x1: x - s * 1.05, x2: x + s * 1.05, y1: yP(q), y2: yP(q), class: 'sc-ledger' }, g);
    // segundas: desplazar cabezas
    const sorted = ev.notes.slice().sort((a, b) => a.p - b.p);
    let prev = null;
    sorted.forEach((n) => {
      n.dx = 0;
      if (prev && n.p - prev.p === 1 && prev.dx === 0) n.dx = ev.up ? s * 1.22 : -s * 1.22;
      prev = n;
    });
    // accidentales (columnas alternas si chocan)
    let col = 0, lastAccP = -99;
    sorted.slice().reverse().forEach((n) => {
      if (n.acc === null) return;
      if (lastAccP - n.p < 6 && lastAccP !== -99) col++; else col = 0;
      drawAcc(g, x - s * 1.7 - col * s * 1.0 + Math.min(0, n.dx), yP(n.p), n.acc, s);
      lastAccP = n.p;
    });
    sorted.forEach((n) => notehead(g, x + n.dx, yP(n.p), s, hollow, ev.dur === 'w', n.dead));
    // puntillo
    if (ev.dot) sorted.forEach((n) => {
      const yy = n.p % 2 === 0 ? yP(n.p + 1) : yP(n.p);
      svg('circle', { cx: x + s * 1.15 + Math.max(0, n.dx), cy: yy, r: s * 0.19, class: 'fill' }, g);
    });
    // plica (si no es redonda)
    if (ev.dur !== 'w') {
      const up = ev.up;
      const yTop = yP(hi), yBot = yP(lo);
      const sx = up ? x + s * 0.6 : x - s * 0.6;
      let end = up ? Math.min(yTop - s * 3.4, yP(4)) : Math.max(yBot + s * 3.4, yP(4));
      if (ev.dur === 's' && !beamed) end += up ? -s * 0.5 : s * 0.5;
      ev.stem = { x: sx, y1: up ? yBot : yTop, y2: end };
      ev.stemEl = svg('line', { x1: sx, x2: sx, y1: ev.stem.y1, y2: end, class: 'sc-stem', 'stroke-width': s * 0.12 }, g);
    }
    // vibrato encima
    if (ev.notes.some((n) => n.tech.includes('v'))) {
      const y = Math.min(yP(10), yP(hi)) - s * 2.0;
      svg('path', { d: wavy(x - s * 0.4, y, s * 3, s), class: 'sc-vib' }, g);
    }
  }

  function wavy(x, y, len, s) {
    let d = `M${x} ${y}`;
    const n = Math.max(2, Math.round(len / (s * 0.9)));
    const w = len / n;
    for (let i = 0; i < n; i++) d += ` q ${w / 2} ${i % 2 ? s * 0.45 : -s * 0.45} ${w} 0`;
    return d;
  }

  function drawRhythmEvent(root, g, ev, y, s, beamed, cfg) {
    const x = ev.x;
    ev.up = true;
    if (ev.rest) { drawRest(g, ev, x, y, s, null); return; }
    const hollow = ev.dur === 'h' || ev.dur === 'w';
    notehead(g, x, y, s, hollow, ev.dur === 'w', ev.hit === 'x');
    if (ev.dot) svg('circle', { cx: x + s * 1.15, cy: y - s * 0.5, r: s * 0.19, class: 'fill' }, g);
    if (ev.dur !== 'w') {
      const sx = x + s * 0.6;
      ev.stem = { x: sx, y1: y, y2: y - s * 3.4 };
      ev.stemEl = svg('line', { x1: sx, x2: sx, y1: y, y2: y - s * 3.4, class: 'sc-stem', 'stroke-width': s * 0.12 }, g);
    }
    if (ev.hit === 'D' || ev.hit === 'U') {
      const ay = y - s * 4.4 - s * 1.7;
      const len = s * 1.9;
      const down = ev.hit === 'D';
      const a = down ? ay - len / 2 : ay + len / 2, b = down ? ay + len / 2 : ay - len / 2;
      svg('line', { x1: x, y1: a, x2: x, y2: b, class: 'sc-arrow', 'stroke-width': s * 0.2 }, g);
      const h = s * 0.55 * (down ? 1 : -1);
      svg('path', { d: `M${x - s * 0.55} ${b - h} L${x} ${b + h * 0.35} L${x + s * 0.55} ${b - h}`, class: 'sc-arrow', 'stroke-width': s * 0.2, fill: 'none' }, g);
    }
  }

  function drawTabEvent(g, ev, tabY, s, ts, withStaff) {
    if (ev.rest) {
      if (!withStaff) return;
      return;
    }
    ev.notes.forEach((n) => {
      if (!n.s) return;
      const y = tabY(n.s);
      const lbl = n.dead ? 'x' : String(n.f);
      const w = s * (0.75 + lbl.length * 0.62);
      svg('rect', { x: ev.x - w / 2, y: y - ts * 0.48, width: w, height: ts * 0.96, class: 'sc-tabbg' }, g);
      text(g, ev.x, y + s * 0.5, lbl, { class: 'sc-tabnum', 'font-size': s * 1.4 });
      if (n.tech.includes('b')) {
        const bx = ev.x + w / 2 + s * 0.1;
        const topY = tabY(1) - ts * 1.9;
        svg('path', { d: `M${bx} ${y} Q ${bx + s * 1.6} ${y} ${bx + s * 1.6} ${topY + s * 0.6}`, class: 'sc-bend' }, g);
        svg('path', { d: `M${bx + s * 1.2} ${topY + s * 1.0} L${bx + s * 1.6} ${topY + s * 0.2} L${bx + s * 2.0} ${topY + s * 1.0} Z`, class: 'fill' }, g);
        text(g, bx + s * 1.6, topY - s * 0.3, 'full', { class: 'sc-tech', 'font-size': s * 1.0 });
      }
      if (n.tech.includes('v') && !withStaff) {
        svg('path', { d: wavy(ev.x - s * 0.4, tabY(1) - ts * 1.1, s * 3, s), class: 'sc-vib' }, g);
      }
    });
  }

  function drawFlag(root, ev, s) {
    if (!ev.stem) return;
    const { x, y2 } = ev.stem;
    const n = ev.dur === 's' ? 2 : 1;
    for (let k = 0; k < n; k++) {
      const sign = ev.up ? 1 : -1;
      const yy = y2 + sign * k * s * 0.85;
      const d = `M${x} ${yy} C ${x + s * 0.15} ${yy + sign * s * 1.0}, ${x + s * 1.35} ${yy + sign * s * 1.25}, ${x + s * 0.85} ${yy + sign * s * 2.9} C ${x + s * 1.0} ${yy + sign * s * 1.7}, ${x + s * 0.3} ${yy + sign * s * 1.45}, ${x} ${yy + sign * s * 1.25} Z`;
      svg('path', { d, class: 'fill sc-flag' }, ev.g);
    }
  }

  function drawBeams(root, evs, yP, s, rhythm) {
    const withStem = evs.filter((e) => e.stem);
    if (withStem.length < 2) { withStem.forEach((e) => drawFlag(root, e, s)); return; }
    const up = withStem[0].up;
    const xs = withStem.map((e) => e.stem.x);
    const ends = withStem.map((e) => e.stem.y2);
    const firstY = withStem[0].stem.y1, lastY = withStem[withStem.length - 1].stem.y1;
    const dx = xs[xs.length - 1] - xs[0];
    let slope = rhythm ? 0 : Math.max(-0.16, Math.min(0.16, (0.5 * (lastY - firstY)) / dx));
    let c = up ? Infinity : -Infinity;
    withStem.forEach((e, i) => {
      const v = ends[i] - slope * (xs[i] - xs[0]);
      c = up ? Math.min(c, v) : Math.max(c, v);
    });
    const by = (x) => c + slope * (x - xs[0]);
    const th = s * 0.5;
    withStem.forEach((e) => { e.stemEl.setAttribute('y2', by(e.stem.x)); e.stem.y2 = by(e.stem.x); });
    const beam = (xa, xb, off) => {
      const o = up ? off : -off;
      const ya = by(xa) + o, yb = by(xb) + o;
      const t = up ? th : -th;
      svg('path', { d: `M${xa} ${ya} L${xb} ${yb} L${xb} ${yb + t} L${xa} ${ya + t} Z`, class: 'fill sc-beam' }, root);
    };
    beam(xs[0] - s * 0.06, xs[xs.length - 1] + s * 0.06, 0);
    const is16 = (e) => e.beats <= 0.25 + 1e-6 || e.dur === 's';
    for (let i = 0; i < withStem.length; i++) {
      if (!is16(withStem[i])) continue;
      const nextIs = i + 1 < withStem.length && is16(withStem[i + 1]);
      const prevIs = i > 0 && is16(withStem[i - 1]);
      if (nextIs) beam(xs[i], xs[i + 1], s * 0.82);
      else if (!prevIs) {
        const left = i === withStem.length - 1;
        beam(left ? xs[i] - s * 1.1 : xs[i], left ? xs[i] : xs[i] + s * 1.1, s * 0.82);
      }
    }
    evs.forEach((e) => (e.beamY = by));
  }

  function drawTuplets(root, meas, s, yOrFn) {
    let i = 0;
    while (i < meas.length) {
      if (!meas[i].trip) { i++; continue; }
      let j = i, sum = 0;
      while (j < meas.length && meas[j].trip) { sum += meas[j].beats; j++; if (Math.abs(sum - Math.round(sum)) < 0.01 && sum >= meas[i].beats * 3 - 1e-6) break; }
      const grp = meas.slice(i, j);
      const xa = grp[0].x, xb = grp[grp.length - 1].x;
      let y;
      const up = grp[0].up;
      if (typeof yOrFn === 'function') {
        const stems = grp.filter((e) => e.stem).map((e) => e.stem.y2);
        const ps = [];
        grp.forEach((e) => e.notes.forEach((n) => ps.push(yOrFn(n.p))));
        if (up) y = Math.min(...stems, ...(ps.length ? ps : [yOrFn(8)])) - s * 1.0;
        else y = Math.max(...stems, ...(ps.length ? ps : [yOrFn(0)])) + s * 2.0;
        y = up ? Math.min(y, yOrFn(10)) : y;
      } else y = yOrFn - s * 4.4;
      text(root, (xa + xb) / 2 + s * 0.3, y, '3', { class: 'sc-tuplet', 'font-size': s * 1.35 });
      i = j;
    }
  }

  /** Dibujo aislado de una figura o un silencio (para tablas). */
  M.figureSVG = function (d, rest, s) {
    s = s || 8;
    const W = s * 7, H = s * 7.5;
    const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, class: 'sc', role: 'img', 'aria-hidden': 'true' });
    const y = H * 0.66, x = W / 2 - s * 0.3;
    svg('line', { x1: 2, x2: W - 2, y1: y, y2: y, class: 'sc-line' }, root);
    const g = svg('g', {}, root);
    if (rest) {
      if (d === 'w') svg('rect', { x: x - s * 0.6, y: y, width: s * 1.2, height: s * 0.5, class: 'fill' }, g);
      else if (d === 'h') svg('rect', { x: x - s * 0.6, y: y - s * 0.5, width: s * 1.2, height: s * 0.5, class: 'fill' }, g);
      else drawRest(g, { dur: d, dot: false }, x, y - s * 0.4, s, null);
      return root;
    }
    notehead(g, x, y, s, d === 'w' || d === 'h', d === 'w');
    if (d !== 'w') {
      const sx = x + s * 0.6, top = y - s * 3.6;
      svg('line', { x1: sx, x2: sx, y1: y, y2: top, class: 'sc-stem', 'stroke-width': s * 0.12 }, g);
      const n = d === 's' ? 2 : d === 'e' ? 1 : 0;
      for (let k = 0; k < n; k++) {
        const yy = top + k * s * 0.85;
        svg('path', { d: `M${sx} ${yy} C ${sx + s * 0.15} ${yy + s * 1.0}, ${sx + s * 1.35} ${yy + s * 1.25}, ${sx + s * 0.85} ${yy + s * 2.9} C ${sx + s * 1.0} ${yy + s * 1.7}, ${sx + s * 0.3} ${yy + s * 1.45}, ${sx} ${yy + s * 1.25} Z`, class: 'fill' }, g);
      }
    }
    return root;
  };

  /* ---------- Controles y reproducción ---------- */
  Score.prototype.buildControls = function () {
    const cfg = this.cfg;
    const bar = document.createElement('div');
    bar.className = 'player';
    bar.innerHTML = `
      <button type="button" class="btn btn-play" data-act="play"><span class="ico ico-play" aria-hidden="true"></span><span>Escuchar</span></button>
      <label class="tempo"><span>Tempo</span>
        <button type="button" class="step" data-act="slower" aria-label="Más lento">−</button>
        <output>${cfg.bpm}</output>
        <button type="button" class="step" data-act="faster" aria-label="Más rápido">+</button>
        <span class="unit">ppm</span></label>
      <label class="chk"><input type="checkbox" data-opt="metro" ${cfg.metro ? 'checked' : ''}> Metrónomo</label>
      <label class="chk"><input type="checkbox" data-opt="loop" ${cfg.loop ? 'checked' : ''}> Repetir</label>`;
    this.c.appendChild(bar);
    this.bar = bar;
    const out = bar.querySelector('output');
    bar.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const act = b.dataset.act;
      if (act === 'play') this.toggle();
      if (act === 'slower' || act === 'faster') {
        cfg.bpm = Math.max(30, Math.min(220, cfg.bpm + (act === 'faster' ? 5 : -5)));
        out.textContent = cfg.bpm;
        if (this.handle && this.handle.playing) { this.stop(); this.play(); }
      }
    });
    bar.addEventListener('change', (e) => {
      const o = e.target.dataset.opt;
      if (o) cfg[o] = e.target.checked;
    });
  };

  Score.prototype.toggle = function () {
    if (this.handle && this.handle.playing) this.stop(); else this.play();
  };
  Score.prototype.setBtn = function (playing) {
    if (!this.bar) return;
    const b = this.bar.querySelector('.btn-play');
    b.classList.toggle('is-playing', playing);
    b.querySelector('span:last-child').textContent = playing ? 'Detener' : 'Escuchar';
    b.querySelector('.ico').className = 'ico ' + (playing ? 'ico-stop' : 'ico-play');
  };
  Score.prototype.stop = function () {
    if (this.handle) this.handle.stop();
  };
  Score.prototype.play = function () {
    const cfg = this.cfg;
    const A = M.audio;
    A.ctx();
    const spb = 60 / cfg.bpm;
    const [tn, td] = cfg.time;
    const beatLen = 4 / td; // en negras
    const barBeats = tn * beatLen;
    const events = [];
    let t = 0;
    const clickUnit = td === 8 && tn % 3 === 0 ? 1.5 : beatLen;
    if (cfg.countIn) {
      const n = Math.round(barBeats / clickUnit);
      for (let i = 0; i < n; i++) events.push({ t: t + i * clickUnit * spb, audio: (w) => A.click(w, i === 0 ? 2 : 1) });
      t += barBeats * spb;
    }
    const startT = t;
    const flat = this.flat;
    const totalBeats = flat.reduce((a, e) => a + e.beats, 0);
    // tiempo de inicio de cada evento
    let acc = 0;
    flat.forEach((ev) => {
      const fr = acc - Math.floor(acc + 1e-6);
      const sw = cfg.swing && Math.abs(fr - 0.5) < 1e-6 ? 1 / 6 : 0;
      ev.t = startT + (acc + sw) * spb;
      acc += ev.beats;
    });
    const shape = cfg.chord ? M.chordShape(cfg.chord) : null;
    const chordMidis = shape ? M.shapeMidis(shape.frets) : null;
    const nextOnString = (i, s) => {
      for (let k = i + 1; k < flat.length; k++) if (flat[k].notes.some((n) => n.s === s) || (flat[k].hit && flat[k].hit !== 'o' && chordMidis)) return flat[k].t;
      return startT + totalBeats * spb + 0.6;
    };
    let prevHold = {};
    flat.forEach((ev, i) => {
      const prev = flat[i - 1];
      const vis = () => {
        this.evGroups.forEach((g) => g.classList.remove('on'));
        if (ev.g) ev.g.classList.add('on');
      };
      if (ev.rest) { events.push({ t: ev.t, visual: vis }); return; }
      if (ev.hit) {
        events.push({
          t: ev.t, visual: vis,
          audio: (w) => {
            const len = Math.max(0.1, ev.beats * spb * 0.9);
            if (ev.hit === 'x') A.chuck(w, 0.9);
            else if (chordMidis && (ev.hit === 'D' || ev.hit === 'U')) A.strum(chordMidis, w, { dir: ev.hit === 'U' ? 'up' : 'down', vel: ev.hit === 'U' ? 0.55 : 0.75, dur: Math.min(nextOnString(i, 0) - ev.t, 3), spread: ev.hit === 'U' ? 0.012 : 0.016 });
            else if (chordMidis) A.strum(chordMidis.slice(0, 3), w, { vel: 0.7, dur: len });
            else A.pluck(cfg.pitch || 57, w, { vel: ev.hit === 'U' ? 0.55 : 0.8, dur: len });
          },
        });
        return;
      }
      events.push({
        t: ev.t, visual: vis,
        audio: (w) => {
          ev.notes.forEach((n) => {
            if (prev && prev.tie && prev.notes.some((pn) => pn.midi === n.midi)) return;
            const legato = prev && prev.notes.some((pn) => pn.s === n.s && /[hps]/.test(pn.tech));
            const slidFrom = prev && prev.notes.find((pn) => pn.s === n.s && pn.tech.includes('s'));
            if (slidFrom) return; // ya suena por el arrastre
            let end = nextOnString(i, n.s);
            if (ev.tie) { const nx = flat[i + 1]; if (nx) end = nextOnString(i + 1, n.s); }
            if (n.tech.includes('s')) { const nx = flat[i + 1]; if (nx) end = nextOnString(i + 1, n.s); }
            const dur = Math.max(0.08, Math.min(end - ev.t, 4));
            if (n.dead) { A.chuck(w, 0.7); return; }
            const v = A.pluck(n.midi, w, { vel: legato ? 0.5 : 0.78, dur, release: 0.08, bright: legato ? 0.3 : 0.55 });
            const rate = v.src.playbackRate;
            if (n.tech.includes('b')) {
              rate.setValueAtTime(1, w + 0.06);
              rate.linearRampToValueAtTime(Math.pow(2, 2 / 12), w + Math.min(0.28, ev.beats * spb * 0.5));
            }
            if (n.tech.includes('s')) {
              const nx = flat[i + 1];
              const n2 = nx && nx.notes.find((q) => q.s === n.s);
              if (n2) {
                rate.setValueAtTime(1, w + (nx.t - ev.t) - 0.07);
                rate.linearRampToValueAtTime(Math.pow(2, (n2.midi - n.midi) / 12), w + (nx.t - ev.t));
              }
            }
            if (n.tech.includes('v')) {
              const steps = 64, len = Math.max(0.3, dur - 0.1);
              const curve = new Float32Array(steps);
              const base = n.tech.includes('b') ? Math.pow(2, 2 / 12) : 1;
              for (let k = 0; k < steps; k++) curve[k] = base * Math.pow(2, (0.35 * Math.sin((k / steps) * len * 2 * Math.PI * 5.5) * Math.min(1, k / 12)) / 12);
              try { rate.setValueCurveAtTime(curve, w + (n.tech.includes('b') ? 0.3 : 0.08), len - 0.05); } catch (e) {}
            }
          });
        },
      });
    });
    if (cfg.metro) {
      const nClicks = Math.round(totalBeats / clickUnit);
      for (let k = 0; k < nClicks; k++) {
        const bt = k * clickUnit;
        const first = Math.abs(bt % barBeats) < 1e-6;
        events.push({ t: startT + bt * spb, audio: (w) => A.click(w, first ? 2 : 1) });
      }
    }
    const length = startT + totalBeats * spb + 0.15;
    this.setBtn(true);
    this.handle = A.play(events, {
      length,
      onEnd: (natural) => {
        this.evGroups.forEach((g) => g.classList.remove('on'));
        this.setBtn(false);
        if (natural && cfg.loop) { this.cfg.countIn = false; this.play(); this.cfg.countIn = true; }
      },
    });
  };
})();
