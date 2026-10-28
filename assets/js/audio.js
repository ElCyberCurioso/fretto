/* Fretto · audio
   Síntesis de cuerda pulsada (Karplus-Strong con retardo fraccional),
   rasgueos, clic de metrónomo y un planificador sincronizado con la vista. */
(function () {
  'use strict';
  const M = (window.M = window.M || {});
  const A = (M.audio = {});
  let ctx = null, master, body, clickBus, comp;
  const cache = new Map();
  const voices = new Set();

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC({ latencyHint: 'interactive' });
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.knee.value = 12; comp.ratio.value = 4;
    comp.attack.value = 0.003; comp.release.value = 0.2;
    master = ctx.createGain();
    master.gain.value = M.settings.volume == null ? 0.8 : M.settings.volume;
    // "Caja" de la guitarra: resonancias suaves y corte de agudos
    const p1 = ctx.createBiquadFilter(); p1.type = 'peaking'; p1.frequency.value = 105; p1.Q.value = 1.4; p1.gain.value = 4;
    const p2 = ctx.createBiquadFilter(); p2.type = 'peaking'; p2.frequency.value = 230; p2.Q.value = 1.2; p2.gain.value = 2.5;
    const p3 = ctx.createBiquadFilter(); p3.type = 'peaking'; p3.frequency.value = 2400; p3.Q.value = 0.9; p3.gain.value = 1.5;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 6500; lp.Q.value = 0.5;
    body = ctx.createGain(); body.gain.value = 1;
    body.connect(p1); p1.connect(p2); p2.connect(p3); p3.connect(lp); lp.connect(master);
    clickBus = ctx.createGain(); clickBus.gain.value = 0.9; clickBus.connect(master);
    master.connect(comp); comp.connect(ctx.destination);
  }
  A.ctx = function () {
    if (!ctx) build();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };
  A.now = () => A.ctx().currentTime;
  A.setVolume = function (v) {
    M.settings.volume = v;
    if (master) master.gain.setTargetAtTime(v, ctx.currentTime, 0.02);
  };
  A.ready = () => !!ctx && ctx.state === 'running';

  /* Registro de todo lo que está en marcha (bucles, metrónomos, reproducciones)
     para poder detenerlo al cambiar de página. */
  A.active = new Set();
  A.stopEverything = function () {
    [...A.active].forEach((x) => { try { x.stop(); } catch (e) {} });
    A.active.clear();
    A.stopAll();
  };

  /* Karplus-Strong con filtro pasa-todo para afinar con precisión */
  function ksBuffer(midi, opts) {
    const key = midi + ':' + (opts.bright || 0.5).toFixed(2);
    if (cache.has(key)) return cache.get(key);
    const sr = ctx.sampleRate;
    const f = M.freq(midi);
    const P = sr / f;
    let Mi = Math.floor(P - 0.5 - 0.15);
    let frac = P - 0.5 - Mi;
    const C = (1 - frac) / (1 + frac);
    const t60 = Math.max(1.4, Math.min(6, 9 - (midi - 40) * 0.11));
    const len = Math.floor(sr * Math.min(4.2, t60 * 0.9));
    const g = Math.pow(0.001, 1 / (t60 * f));
    const y = new Float32Array(len);
    // Excitación: ruido filtrado + posición de púa (filtro peine)
    const bright = opts.bright || 0.5;
    const a = 0.25 + bright * 0.6;
    const exc = new Float32Array(Mi + 2);
    let lpPrev = 0;
    let seed = midi * 9301 + 49297;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 * 2 - 1; };
    for (let i = 0; i < exc.length; i++) { lpPrev = lpPrev + a * (rnd() - lpPrev); exc[i] = lpPrev; }
    const pick = Math.max(1, Math.floor(exc.length * 0.13));
    const ex2 = new Float32Array(exc.length);
    for (let i = 0; i < exc.length; i++) ex2[i] = exc[i] - (i >= pick ? exc[i - pick] : 0);
    let mean = 0; for (let i = 0; i < ex2.length; i++) mean += ex2[i]; mean /= ex2.length;
    let vPrev = 0, apPrev = 0;
    for (let n = 0; n < len; n++) {
      let v = 0;
      if (n > Mi) v = 0.5 * (y[n - Mi] + y[n - Mi - 1]) * g;
      const ap = C * v + vPrev - C * apPrev;
      vPrev = v; apPrev = ap;
      y[n] = ap + (n < ex2.length ? ex2[n] - mean : 0);
    }
    // normaliza y suaviza el final
    let peak = 0; for (let n = 0; n < Math.min(len, sr * 0.2); n++) peak = Math.max(peak, Math.abs(y[n]));
    const norm = peak > 0 ? 0.9 / peak : 1;
    const fade = Math.floor(sr * 0.08);
    for (let n = 0; n < len; n++) {
      y[n] *= norm;
      if (n > len - fade) y[n] *= (len - n) / fade;
    }
    const buf = ctx.createBuffer(1, len, sr);
    buf.copyToChannel(y, 0);
    cache.set(key, buf);
    return buf;
  }

  /** Pulsa una nota (MIDI). Devuelve la voz para poder apagarla. */
  A.pluck = function (midi, when, opts) {
    A.ctx();
    opts = opts || {};
    when = Math.max(when || 0, ctx.currentTime);
    const src = ctx.createBufferSource();
    src.buffer = ksBuffer(midi, opts);
    const gn = ctx.createGain();
    const vel = opts.vel == null ? 0.75 : opts.vel;
    gn.gain.setValueAtTime(0, when);
    gn.gain.linearRampToValueAtTime(0.42 * vel, when + 0.004);
    if (opts.dur) {
      gn.gain.setValueAtTime(0.42 * vel, when + opts.dur);
      gn.gain.exponentialRampToValueAtTime(0.0008, when + opts.dur + (opts.release || 0.12));
    }
    src.connect(gn); gn.connect(body);
    src.start(when);
    const end = opts.dur ? when + opts.dur + (opts.release || 0.12) + 0.05 : when + src.buffer.duration;
    src.stop(end);
    const v = { src, gn };
    voices.add(v);
    src.onended = () => { voices.delete(v); try { gn.disconnect(); } catch (e) {} };
    return v;
  };

  /** Rasgueo: notas de grave a agudo (abajo) o al revés (arriba). */
  A.strum = function (midis, when, opts) {
    A.ctx();
    opts = opts || {};
    when = Math.max(when || 0, ctx.currentTime);
    const list = opts.dir === 'up' ? midis.slice().reverse() : midis.slice();
    const spread = opts.spread == null ? 0.016 : opts.spread;
    list.forEach((m, i) => {
      const vel = (opts.vel == null ? 0.7 : opts.vel) * (opts.dir === 'up' ? (0.75 + 0.25 * (i / list.length)) : 1);
      A.pluck(m, when + i * spread, { vel, dur: opts.dur, release: opts.release || 0.08, bright: opts.dir === 'up' ? 0.65 : 0.5 });
    });
  };

  /** Golpe apagado (chasquido de rasgueo). */
  A.chuck = function (when, vel) {
    A.ctx();
    when = Math.max(when || 0, ctx.currentTime);
    const len = Math.floor(ctx.sampleRate * 0.06);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1800; bp.Q.value = 0.8;
    const gn = ctx.createGain(); gn.gain.value = 0.5 * (vel || 0.8);
    src.connect(bp); bp.connect(gn); gn.connect(body);
    src.start(when);
  };

  /** Clic de metrónomo. level: 2 = acento, 1 = pulso, 0 = subdivisión. */
  A.click = function (when, level) {
    A.ctx();
    when = Math.max(when || 0, ctx.currentTime);
    const o = ctx.createOscillator();
    const gn = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = level === 2 ? 1760 : level === 1 ? 1175 : 880;
    const peak = level === 2 ? 0.5 : level === 1 ? 0.32 : 0.16;
    gn.gain.setValueAtTime(0, when);
    gn.gain.linearRampToValueAtTime(peak, when + 0.002);
    gn.gain.exponentialRampToValueAtTime(0.0005, when + 0.05);
    o.connect(gn); gn.connect(clickBus);
    o.start(when); o.stop(when + 0.06);
  };

  /** Tono de referencia sostenido (afinador). */
  A.tone = function (freqHz, dur) {
    A.ctx();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const gn = ctx.createGain();
    o.type = 'sine'; o.frequency.value = freqHz;
    o2.type = 'sine'; o2.frequency.value = freqHz * 2;
    const g2 = ctx.createGain(); g2.gain.value = 0.25;
    gn.gain.setValueAtTime(0, t);
    gn.gain.linearRampToValueAtTime(0.22, t + 0.03);
    gn.gain.setValueAtTime(0.22, t + dur - 0.2);
    gn.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(gn); o2.connect(g2); g2.connect(gn); gn.connect(master);
    o.start(t); o2.start(t); o.stop(t + dur); o2.stop(t + dur);
    const v = { src: o, gn, extra: o2 };
    voices.add(v);
    o.onended = () => voices.delete(v);
    return v;
  };

  /** Detiene todo lo que esté sonando con un fundido corto. */
  A.stopAll = function () {
    if (!ctx) return;
    const t = ctx.currentTime;
    voices.forEach((v) => {
      try {
        v.gn.gain.cancelScheduledValues(t);
        v.gn.gain.setValueAtTime(v.gn.gain.value, t);
        v.gn.gain.linearRampToValueAtTime(0, t + 0.04);
        v.src.stop(t + 0.05);
        if (v.extra) v.extra.stop(t + 0.05);
      } catch (e) {}
    });
    voices.clear();
  };

  /* ---------- Planificador ----------
     events: [{ t (s desde el inicio), audio(when), visual() }]
     Programa el audio por adelantado y lanza los callbacks visuales en su momento. */
  A.play = function (events, opts) {
    A.ctx();
    opts = opts || {};
    const start = ctx.currentTime + (opts.delay == null ? 0.08 : opts.delay);
    const total = opts.length != null ? opts.length : Math.max(0, ...events.map((e) => e.t)) + 0.5;
    let idx = 0, stopped = false, raf = 0, timer = 0, scheduled = 0;
    const lookahead = 0.25;
    const sorted = events.slice().sort((a, b) => a.t - b.t);
    function schedule() {
      const horizon = ctx.currentTime + lookahead;
      while (scheduled < sorted.length && start + sorted[scheduled].t < horizon) {
        const e = sorted[scheduled];
        if (e.audio) e.audio(start + e.t);
        scheduled++;
      }
    }
    function tick() {
      if (stopped) return;
      schedule();
      const now = ctx.currentTime - start;
      while (idx < sorted.length && sorted[idx].t <= now + 0.01) {
        if (sorted[idx].visual) sorted[idx].visual();
        idx++;
      }
      if (now >= total) { handle.stop(true); return; }
      raf = requestAnimationFrame(tick);
    }
    schedule();
    timer = setInterval(schedule, 60);
    raf = requestAnimationFrame(tick);
    const handle = {
      start,
      stop(natural) {
        if (stopped) return;
        stopped = true;
        A.active.delete(handle);
        cancelAnimationFrame(raf);
        clearInterval(timer);
        if (!natural) A.stopAll();
        if (opts.onEnd) opts.onEnd(!!natural);
      },
      get playing() { return !stopped; },
    };
    A.active.add(handle);
    return handle;
  };

  /* ---------- Metrónomo continuo ---------- */
  A.Metronome = function (opts) {
    const self = this;
    this.bpm = opts.bpm || 80;
    this.beats = opts.beats || 4;
    this.sub = opts.sub || 1;
    this.accent = opts.accent !== false;
    this.onBeat = opts.onBeat || null;
    let next = 0, count = 0, timer = 0, running = false;
    const queue = [];
    let raf = 0;
    function sched() {
      const c = A.ctx();
      while (next < c.currentTime + 0.12) {
        const subIdx = count % self.sub;
        const beatIdx = Math.floor(count / self.sub) % self.beats;
        const level = self.levelFn ? self.levelFn(beatIdx, subIdx) : subIdx !== 0 ? 0 : beatIdx === 0 && self.accent ? 2 : 1;
        if (level >= 0 && !(self.mute && self.mute(beatIdx, subIdx))) A.click(next, level);
        queue.push({ t: next, beat: beatIdx, sub: subIdx, level });
        next += 60 / self.bpm / self.sub;
        count++;
      }
    }
    function draw() {
      const c = A.ctx();
      while (queue.length && queue[0].t <= c.currentTime) {
        const q = queue.shift();
        if (self.onBeat) self.onBeat(q.beat, q.sub, q.t, q.level);
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    this.start = function () {
      if (running) return;
      running = true;
      A.active.add(self);
      next = A.ctx().currentTime + 0.06;
      count = 0;
      sched();
      timer = setInterval(sched, 25);
      raf = requestAnimationFrame(draw);
    };
    this.stop = function () {
      if (!running) return;
      running = false;
      A.active.delete(self);
      clearInterval(timer);
      cancelAnimationFrame(raf);
      queue.length = 0;
      if (self.onStop) self.onStop();
    };
    /** Compases completos sonados desde el inicio (para subir el tempo). */
    this.reset = function () { count = 0; };
    Object.defineProperty(this, 'running', { get: () => running });
  };
})();
