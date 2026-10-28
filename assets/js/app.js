/* Fretto · aplicación: navegación, rutas, ajustes, progreso y páginas */
(function () {
  'use strict';
  const M = window.M;
  const A = M.audio;
  const h = M.h;

  /* ---------- Almacenamiento ---------- */
  const LS = {
    get(k, d) { try { const v = localStorage.getItem('fretto.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('fretto.' + k, JSON.stringify(v)); } catch (e) {} },
  };
  M.LS = LS;
  Object.assign(M.settings, LS.get('settings', {}));
  const saveSettings = () => LS.set('settings', M.settings);
  let progress = LS.get('progress', {});
  M.isDone = (id) => !!(progress[id] && progress[id].done);
  M.setDone = (id, v, quiz) => {
    progress[id] = Object.assign(progress[id] || {}, { done: !!v, at: Date.now() });
    if (quiz != null) progress[id].quiz = Math.max(progress[id].quiz || 0, quiz);
    LS.set('progress', progress);
    renderNav();
  };

  /* ---------- Tema ---------- */
  function applyTheme() {
    const t = M.settings.theme;
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    const dark = t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#14100e' : '#f2f3ef');
  }
  applyTheme();

  /* ---------- Temario ---------- */
  M.course = M.course || [];
  M.addLevel = (lvl) => M.course.push(lvl);
  let LESSONS = [];
  function indexCourse() {
    M.course.sort((a, b) => a.n - b.n);
    LESSONS = [];
    M.course.forEach((lvl) => lvl.lessons.forEach((ls, i) => {
      ls.level = lvl; ls.idx = i;
      LESSONS.push(ls);
    }));
    LESSONS.forEach((ls, i) => { ls.prev = LESSONS[i - 1] || null; ls.next = LESSONS[i + 1] || null; });
  }
  const lessonById = (id) => LESSONS.find((l) => l.id === id);

  /* ---------- Iconos ---------- */
  const I = (p, vb) => `<svg viewBox="${vb || '0 0 24 24'}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  M.ICONS = {
    menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: I('<path d="M6 6l12 12M18 6 6 18"/>'),
    gear: I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>'),
    sun: I('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: I('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
    auto: I('<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor"/>'),
    diapason: I('<rect x="2" y="6" width="20" height="12" rx="1.5"/><path d="M7 6v12M12 6v12M17 6v12M2 9.5h20M2 14.5h20"/><circle cx="9.5" cy="12" r="1.2" fill="currentColor"/>'),
    acordes: I('<path d="M6 3h12M6 3v18M10 3v18M14 3v18M18 3v18M6 8h12M6 13h12M6 18h12"/><circle cx="10" cy="10.5" r="1.6" fill="currentColor"/><circle cx="14" cy="15.5" r="1.6" fill="currentColor"/>'),
    metronomo: I('<path d="M8 3h8l4 18H4L8 3Z"/><path d="M12 16 17 6"/><path d="M6.5 16h11"/>'),
    afinador: I('<path d="M3 16a9 9 0 0 1 18 0"/><path d="M12 16l4-6"/><path d="M5.5 11.5l1.2.8M18.5 11.5l-1.2.8M12 7v1.5"/><path d="M3 20h18"/>'),
    circulo: I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>'),
    oido: I('<path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.5"/><path d="M10 9a2 2 0 0 1 4 0c0 1.5-1.5 2-1.5 3.5"/>'),
    notas: I('<rect x="2" y="6" width="20" height="12" rx="1.5"/><path d="M8 6v12M14 6v12M20 6v12"/><text x="11" y="13.8" font-size="7" font-weight="800" stroke="none" fill="currentColor" text-anchor="middle" font-family="sans-serif">?</text>'),
    lectura: I('<path d="M2 6h20M2 9.5h20M2 13h20M2 16.5h20M2 20h20" stroke-width="1"/><ellipse cx="11" cy="16.5" rx="2.6" ry="1.8" fill="currentColor" transform="rotate(-20 11 16.5)"/><path d="M13.4 16V5"/>'),
    ritmo: I('<ellipse cx="6" cy="18" rx="2.6" ry="1.8" fill="currentColor" transform="rotate(-20 6 18)"/><ellipse cx="16" cy="16" rx="2.6" ry="1.8" fill="currentColor" transform="rotate(-20 16 16)"/><path d="M8.4 17.5V6l10-2v11.5"/><path d="M8.4 9l10-2" stroke-width="2.4"/>'),
    glosario: I('<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v16H5.5A1.5 1.5 0 0 0 4 20.5Z"/><path d="M4 20.5A1.5 1.5 0 0 0 5.5 22H20M8 7h8M8 11h6"/>'),
    chev: I('<path d="m9 6 6 6-6 6"/>'),
  };

  /* ---------- Navegación (el mástil) ---------- */
  const neck = document.getElementById('neck');
  const app = document.getElementById('app');
  const openLevels = new Set(LS.get('openLevels', ['n1']));
  function renderNav() {
    const route = currentRoute();
    const curLesson = route.page === 'leccion' ? lessonById(route.id) : null;
    if (curLesson) openLevels.add(curLesson.level.id);
    let html = `<div class="neck-head"><a class="brand" href="#/" aria-label="Fretto, inicio">${BRAND}<span><span class="brand-name">Fretto</span><span class="brand-sub">Teoría musical para guitarra</span></span></a></div><nav aria-label="Temario y herramientas">`;
    html += `<div class="neck-sec">Temario</div>`;
    M.course.forEach((lvl, li) => {
      const done = lvl.lessons.filter((l) => M.isDone(l.id)).length;
      const open = openLevels.has(lvl.id);
      html += `<div class="neck-level${open ? ' open' : ''}" data-level="${lvl.id}">
        <button type="button" aria-expanded="${open}"><span class="inlay${li === M.course.length - 1 ? ' double' : ''}"></span><span>${lvl.title}<br><span class="lvl-meta">Nivel ${lvl.n}, ${done}/${lvl.lessons.length} completadas</span></span><span class="chev">${M.ICONS.chev.replace('<svg', '<svg width="16" height="16"')}</span></button>
        <ul class="neck-list">${lvl.lessons.map((l, i) => `<li><a href="#/leccion/${l.id}"${curLesson === l ? ' aria-current="page"' : ''}><span class="num">${i + 1}</span><span>${l.title}</span>${M.isDone(l.id) ? '<span class="done-dot" title="Completada"></span>' : '<span></span>'}</a></li>`).join('')}</ul></div>`;
    });
    html += `<div class="neck-sec">Herramientas</div><ul class="neck-tools">`;
    TOOL_ORDER.forEach((id) => {
      const t = M.tools[id];
      if (!t) return;
      const cur = route.page === 'herramienta' && route.id === id;
      html += `<li><a href="#/herramienta/${id}"${cur ? ' aria-current="page"' : ''}>${M.ICONS[id] || ''}<span>${t.title}</span></a></li>`;
    });
    const gcur = route.page === 'glosario';
    html += `<li><a href="#/glosario"${gcur ? ' aria-current="page"' : ''}>${M.ICONS.glosario}<span>Glosario</span></a></li></ul></nav>`;
    const total = LESSONS.length, done = LESSONS.filter((l) => M.isDone(l.id)).length;
    html += `<div class="neck-foot">${done} de ${total} lecciones completadas</div>`;
    const st = neck.scrollTop;
    neck.innerHTML = html;
    neck.scrollTop = st;
    neck.querySelectorAll('.neck-level > button').forEach((b) => {
      b.addEventListener('click', () => {
        const box = b.parentElement;
        const id = box.dataset.level;
        const open = !box.classList.contains('open');
        box.classList.toggle('open', open);
        b.setAttribute('aria-expanded', String(open));
        if (open) openLevels.add(id); else openLevels.delete(id);
        LS.set('openLevels', [...openLevels]);
      });
    });
  }
  const BRAND = `<svg class="brand-mark" viewBox="0 0 30 38" aria-hidden="true"><path d="M6 2h18l2 22-5 6v6H9v-6l-5-6Z" fill="#efe8da"/><path d="M8.5 4.5h13l1.6 18.5-4.1 5H11l-4.1-5Z" fill="#33201b"/>${[0, 1, 2].map((k) => `<circle cx="10.5" cy="${9 + k * 5.5}" r="1.7" fill="#cfd3d8"/><circle cx="19.5" cy="${9 + k * 5.5}" r="1.7" fill="#cfd3d8"/>`).join('')}<rect x="9" y="30" width="12" height="2.2" fill="#efe8da"/><path d="M11.5 32v6M13.5 32v6M15 32v6M16.5 32v6M18.5 32v6" stroke="#cfd3d8" stroke-width=".7"/></svg>`;

  /* Menú móvil */
  const scrim = document.getElementById('scrim');
  const setNav = (v) => {
    app.classList.toggle('nav-open', v);
    document.getElementById('menuBtn').setAttribute('aria-expanded', String(v));
    if (v) { const a = neck.querySelector('[aria-current]') || neck.querySelector('a'); if (a) a.focus({ preventScroll: true }); }
  };
  document.getElementById('menuBtn').addEventListener('click', () => setNav(!app.classList.contains('nav-open')));
  scrim.addEventListener('click', () => setNav(false));

  /* ---------- Barra superior ---------- */
  const TOOL_ORDER = ['diapason', 'acordes', 'metronomo', 'afinador', 'circulo', 'notas', 'lectura', 'ritmo', 'oido'];
  M.TOOL_ORDER = TOOL_ORDER;
  const namingSeg = document.getElementById('namingSeg');
  function syncTopbar() {
    namingSeg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === M.settings.naming)));
    const tb = document.getElementById('themeBtn');
    const t = M.settings.theme || 'auto';
    tb.innerHTML = t === 'dark' ? M.ICONS.moon : t === 'light' ? M.ICONS.sun : M.ICONS.auto;
    tb.setAttribute('aria-label', 'Tema: ' + (t === 'dark' ? 'oscuro' : t === 'light' ? 'claro' : 'automático') + '. Pulsa para cambiar');
    tb.title = tb.getAttribute('aria-label');
  }
  namingSeg.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.dataset.v === M.settings.naming) return;
    M.settings.naming = b.dataset.v;
    saveSettings(); syncTopbar(); rerender();
  });
  document.getElementById('themeBtn').addEventListener('click', () => {
    const order = ['auto', 'light', 'dark'];
    const t = M.settings.theme || 'auto';
    M.settings.theme = order[(order.indexOf(t) + 1) % 3];
    saveSettings(); applyTheme(); syncTopbar();
  });
  const pop = document.getElementById('settingsPop');
  const setBtn = document.getElementById('settingsBtn');
  setBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = pop.hidden;
    pop.hidden = !open;
    setBtn.setAttribute('aria-expanded', String(open));
    if (open) buildSettings();
  });
  document.addEventListener('click', (e) => { if (!pop.hidden && !pop.contains(e.target)) { pop.hidden = true; setBtn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!pop.hidden) { pop.hidden = true; setBtn.setAttribute('aria-expanded', 'false'); setBtn.focus(); }
      if (app.classList.contains('nav-open')) setNav(false);
    }
  });
  function buildSettings() {
    const s = M.settings;
    pop.innerHTML = `<h3>Ajustes</h3>
      <div class="set-row"><span>Nombres de las notas</span><span class="seg"><button type="button" data-k="naming" data-v="latin" aria-pressed="${s.naming === 'latin'}">Do Re Mi</button><button type="button" data-k="naming" data-v="english" aria-pressed="${s.naming === 'english'}">C D E</button></span></div>
      <div class="set-row"><label for="lefty">Guitarra para zurdos</label><input id="lefty" type="checkbox" class="chk-in" ${s.lefty ? 'checked' : ''} style="accent-color:var(--accent);width:18px;height:18px"></div>
      <div class="set-row"><span>Tema</span><span class="seg"><button type="button" data-k="theme" data-v="auto" aria-pressed="${(s.theme || 'auto') === 'auto'}">Auto</button><button type="button" data-k="theme" data-v="light" aria-pressed="${s.theme === 'light'}">Claro</button><button type="button" data-k="theme" data-v="dark" aria-pressed="${s.theme === 'dark'}">Oscuro</button></span></div>
      <div class="set-row"><label for="vol">Volumen</label><input id="vol" type="range" min="0" max="1" step="0.05" value="${s.volume}"></div>
      <div class="set-row"><span>Progreso guardado en este navegador</span><button type="button" class="btn small ghost" id="resetProg">Borrar</button></div>`;
    pop.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => {
      s[b.dataset.k] = b.dataset.v;
      saveSettings(); applyTheme(); syncTopbar(); buildSettings();
      if (b.dataset.k === 'naming') rerender();
    }));
    pop.querySelector('#lefty').addEventListener('change', (e) => { s.lefty = e.target.checked; saveSettings(); rerender(); });
    pop.querySelector('#vol').addEventListener('input', (e) => { A.setVolume(+e.target.value); saveSettings(); });
    pop.querySelector('#resetProg').addEventListener('click', (e) => {
      const b = e.currentTarget;
      if (b.dataset.confirm) { progress = {}; LS.set('progress', progress); renderNav(); rerender(); b.textContent = 'Borrado'; b.disabled = true; return; }
      b.dataset.confirm = '1'; b.textContent = '¿Seguro? Pulsa otra vez';
    });
  }

  /* ---------- Rutas ---------- */
  function currentRoute() {
    const hsh = (location.hash || '#/').replace(/^#\/?/, '');
    const [page, id] = hsh.split('/');
    return { page: page || 'inicio', id: id ? decodeURIComponent(id) : null };
  }
  const main = document.getElementById('main');
  const crumbs = document.getElementById('crumbs');
  let leaveFns = [];
  M.onLeave = (fn) => leaveFns.push(fn);
  let tocObs = null;

  function route(keepScroll) {
    A.stopEverything();
    leaveFns.forEach((f) => { try { f(); } catch (e) {} });
    leaveFns = [];
    if (tocObs) { tocObs.disconnect(); tocObs = null; }
    const r = currentRoute();
    const y = window.scrollY;
    main.innerHTML = '';
    let title = 'Fretto';
    let crumb = '';
    if (r.page === 'inicio') { pageHome(); title = 'Fretto: teoría musical para guitarra'; }
    else if (r.page === 'nivel') {
      const lvl = M.course.find((l) => l.id === r.id);
      if (lvl) { pageLevel(lvl); title = lvl.title + ' · Fretto'; crumb = `<a href="#/">Inicio</a><span class="sep">/</span>${lvl.title}`; } else pageNotFound();
    } else if (r.page === 'leccion') {
      const ls = lessonById(r.id);
      if (ls) { pageLesson(ls); title = ls.title + ' · Fretto'; crumb = `<a href="#/">Inicio</a><span class="sep">/</span><a href="#/nivel/${ls.level.id}">${ls.level.title}</a><span class="sep">/</span>${ls.title}`; } else pageNotFound();
    } else if (r.page === 'herramienta') {
      const t = M.tools[r.id];
      if (t) { pageTool(r.id, t); title = t.title + ' · Fretto'; crumb = `<a href="#/">Inicio</a><span class="sep">/</span>Herramientas<span class="sep">/</span>${t.title}`; } else pageNotFound();
    } else if (r.page === 'glosario') { pageGlossary(); title = 'Glosario · Fretto'; crumb = `<a href="#/">Inicio</a><span class="sep">/</span>Glosario`; }
    else pageNotFound();
    document.title = title;
    crumbs.innerHTML = crumb;
    renderNav();
    M.mountWidgets(main);
    if (keepScroll) window.scrollTo(0, y);
    else {
      window.scrollTo(0, 0);
      if (!first) main.focus({ preventScroll: true });
    }
    first = false;
    setNav(false);
  }
  let first = true;
  function rerender() { route(true); }
  window.addEventListener('hashchange', () => route(false));

  /* ---------- Páginas ---------- */
  function nextLesson() {
    return LESSONS.find((l) => !M.isDone(l.id)) || LESSONS[0];
  }

  function pageHome() {
    const nl = nextLesson();
    const started = LESSONS.some((l) => M.isDone(l.id));
    const wrap = h('div', 'wrap');
    main.appendChild(wrap);
    wrap.innerHTML = `
      <section class="hero">
        <h1>Entiende lo que tocas.</h1>
        <p class="lead">Un curso completo de teoría musical pensado desde el mástil: de la primera nota a la armonía de jazz, con diapasones, acordes, tablaturas y partituras que suenan cuando las tocas.</p>
        <div class="hero-actions">
          <a class="btn" href="#/leccion/${nl.id}">${started ? 'Continuar: ' + nl.title : 'Empezar por la primera lección'}</a>
          <a class="btn ghost" href="#/herramienta/diapason">Explorar el diapasón</a>
        </div>
        <div class="hero-fb">
          <div class="hero-bar">
            <div class="readout" id="heroRead" aria-live="polite"><span class="hint">Pulsa cualquier traste para oír su nota</span></div>
            <div id="heroChips"></div>
          </div>
          <div id="heroFb"></div>
          <div id="heroLegend"></div>
        </div>
      </section>
      <div class="sec-head"><h2>El temario</h2><p>${LESSONS.length} lecciones en ${M.course.length} niveles</p></div>
      <div class="levels" id="levels"></div>
      <div class="sec-head"><h2>Herramientas de práctica</h2><p>Para usar con la guitarra en las manos</p></div>
      <div class="tool-list" id="toolList"></div>`;
    // Diapasón protagonista
    const read = wrap.querySelector('#heroRead');
    const lg = wrap.querySelector('#heroLegend');
    const fb = new M.Fretboard(wrap.querySelector('#heroFb'), {
      frets: [0, 15], dots: [], label: 'note', aria: 'Diapasón interactivo: pulsa un traste para oír su nota',
      onPlay: ({ string, fret, midi }) => {
        const n = M.spellMidi(midi, 0);
        const alt = n.acc ? M.spellMidi(midi, -3) : null;
        read.innerHTML = `<span class="big">${M.rich(M.name(n))}${alt && alt.letter !== n.letter ? `<span style="color:var(--ink-3);font-weight:600"> / ${M.rich(M.name(alt))}</span>` : ''}</span><span class="meta">Cuerda ${string}, traste ${fret}<br>${Math.round(M.freq(midi))} Hz</span>`;
      },
    });
    const views = [
      { v: 'none', label: 'Vacío' },
      { v: 'nat', label: 'Notas naturales' },
      { v: 'cmaj', label: M.name('C') + ' mayor' },
      { v: 'pent', label: 'Pentatónica de ' + M.name('A') + ' menor' },
      { v: 'chord', label: 'Acorde de ' + M.name('G') },
    ];
    const chipsEl = M.chips(views, 'none', (v) => {
      fb.cfg.label = 'note';
      if (v === 'none') fb.setDots([]);
      if (v === 'nat') fb.setShow({ root: 'C', ivs: ['1', '2', '3', '4', '5', '6', '7'] }), fb.cfg.color = 'mono', fb.drawDots();
      if (v === 'cmaj') { fb.cfg.color = 'role'; fb.setShow({ root: 'C', scale: 'major' }); }
      if (v === 'pent') { fb.cfg.color = 'role'; fb.cfg.label = 'interval'; fb.setShow({ root: 'A', scale: 'pentMinor' }); }
      if (v === 'chord') { fb.cfg.color = 'role'; fb.cfg.label = 'interval'; fb.setShow({ root: 'G', chord: '' }); M.playChord(M.chordShape('G'), 0, { dur: 2 }); }
      lg.innerHTML = '';
      if (v === 'cmaj' || v === 'pent' || v === 'chord') lg.appendChild(M.legend(fb.dots));
    });
    wrap.querySelector('#heroChips').appendChild(chipsEl);
    // Niveles
    const lv = wrap.querySelector('#levels');
    M.course.forEach((lvl, li) => {
      const done = lvl.lessons.filter((l) => M.isDone(l.id)).length;
      const pct = Math.round((done / lvl.lessons.length) * 100);
      const row = h('section', 'level');
      row.innerHTML = `<div class="level-id"><div class="level-num"><span class="inlay${li === M.course.length - 1 ? ' double' : ''}" style="background:radial-gradient(circle at 35% 35%,#fbf8f1,#e6ddcd 55%,#c9d3d6);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)"></span>Nivel ${lvl.n}</div>
        <h3><a href="#/nivel/${lvl.id}" style="text-decoration:none">${lvl.title}</a></h3><p>${lvl.desc}</p>
        <div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Progreso del nivel ${lvl.n}"><i style="width:${pct}%"></i></div><div class="meter-l">${done} de ${lvl.lessons.length} completadas</div></div>
        <ol class="lesson-list">${lvl.lessons.map((l, i) => `<li><a href="#/leccion/${l.id}"><span class="n">${lvl.n}.${i + 1}</span><span><span class="t">${M.markup(l.title)}</span><span class="d">${M.markup(l.desc)}</span></span><span class="ck${M.isDone(l.id) ? ' on' : ''}" aria-label="${M.isDone(l.id) ? 'Completada' : ''}"></span></a></li>`).join('')}</ol>`;
      lv.appendChild(row);
    });
    const tl = wrap.querySelector('#toolList');
    TOOL_ORDER.forEach((id) => {
      const t = M.tools[id];
      if (!t) return;
      tl.insertAdjacentHTML('beforeend', `<a href="#/herramienta/${id}">${M.ICONS[id]}<div><b>${t.title}</b><span>${t.desc}</span></div></a>`);
    });
  }

  function pageLevel(lvl) {
    const done = lvl.lessons.filter((l) => M.isDone(l.id)).length;
    const wrap = h('div', 'wrap');
    main.appendChild(wrap);
    wrap.innerHTML = `<div class="lesson-head"><div class="kick">Nivel ${lvl.n} de ${M.course.length}</div><h1>${lvl.title}</h1><p class="lead">${lvl.long || lvl.desc}</p>
      <div class="meter" style="max-width:320px;margin-top:22px"><i style="width:${(done / lvl.lessons.length) * 100}%"></i></div><div class="meter-l">${done} de ${lvl.lessons.length} completadas</div></div>
      <ol class="lesson-list" style="columns:1;max-width:760px">${lvl.lessons.map((l, i) => `<li><a href="#/leccion/${l.id}"><span class="n">${lvl.n}.${i + 1}</span><span><span class="t">${M.markup(l.title)}</span><span class="d">${M.markup(l.desc)}</span></span><span class="ck${M.isDone(l.id) ? ' on' : ''}"></span></a></li>`).join('')}</ol>`;
  }

  const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function pageLesson(ls) {
    const lvl = ls.level;
    const grid = h('div', 'lesson-grid');
    main.appendChild(grid);
    const col = h('article');
    grid.appendChild(col);
    const body = typeof ls.body === 'function' ? ls.body() : ls.body;
    col.innerHTML = `
      <header class="lesson-head">
        <div class="kick"><a href="#/nivel/${lvl.id}">${lvl.title}</a><span>Lección ${ls.idx + 1} de ${lvl.lessons.length}</span>${ls.time ? `<span>${ls.time}</span>` : ''}</div>
        <h1>${M.markup(ls.title)}</h1>
        <p class="lead">${M.markup(ls.lead || ls.desc)}</p>
        ${ls.goals ? `<div class="objectives"><b>Al terminar sabrás</b><ul>${ls.goals.map((g) => `<li>${M.markup(g)}</li>`).join('')}</ul></div>` : ''}
      </header>
      <div class="prose">${M.markup(body)}
        ${ls.practice ? `<h2>Práctica con la guitarra</h2><ol class="practice">${ls.practice.map((p) => `<li><span>${M.markup(p)}</span></li>`).join('')}</ol>` : ''}
        ${ls.quiz ? `<h2>Comprueba lo aprendido</h2><div id="quiz"></div>` : ''}
      </div>
      <div class="complete-bar"><p id="doneTxt"></p><button type="button" class="btn" id="doneBtn"></button></div>
      <nav class="lesson-nav" aria-label="Lecciones">
        ${ls.prev ? `<a class="prev" href="#/leccion/${ls.prev.id}"><small>Anterior</small><b>${M.markup(ls.prev.title)}</b></a>` : '<span></span>'}
        ${ls.next ? `<a class="next" href="#/leccion/${ls.next.id}"><small>Siguiente</small><b>${M.markup(ls.next.title)}</b></a>` : ''}
      </nav>`;
    // Tablas desbordables
    col.querySelectorAll('.prose > table').forEach((t) => { const w = h('div', 'tbl-wrap'); t.replaceWith(w); w.appendChild(t); });
    // Índice lateral
    const hs = [...col.querySelectorAll('.prose h2')];
    hs.forEach((x) => (x.id = slug(x.textContent)));
    const toc = h('aside', 'toc');
    toc.innerHTML = `<b>En esta lección</b><ol>${hs.map((x) => `<li><a href="#/leccion/${ls.id}" data-to="${x.id}">${x.textContent}</a></li>`).join('')}</ol>`;
    grid.appendChild(toc);
    toc.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-to]');
      if (!a) return;
      e.preventDefault();
      const t = document.getElementById(a.dataset.to);
      if (t) t.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
    if ('IntersectionObserver' in window) {
      tocObs = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) toc.querySelectorAll('a').forEach((a) => a.classList.toggle('cur', a.dataset.to === en.target.id));
        });
      }, { rootMargin: '-80px 0px -70% 0px' });
      hs.forEach((x) => tocObs.observe(x));
    }
    // Completar
    const btn = col.querySelector('#doneBtn');
    const txt = col.querySelector('#doneTxt');
    const sync = () => {
      const d = M.isDone(ls.id);
      btn.textContent = d ? 'Marcar como pendiente' : 'Marcar como completada';
      btn.className = d ? 'btn ghost' : 'btn';
      txt.textContent = d ? 'Lección completada. Puedes volver cuando quieras para repasar.' : 'Cuando hayas hecho la práctica con la guitarra, márcala como completada. Aprobar el test también la marca.';
    };
    btn.addEventListener('click', () => { M.setDone(ls.id, !M.isDone(ls.id)); sync(); });
    sync();
    if (ls.quiz) Quiz(col.querySelector('#quiz'), ls, () => sync());
  }

  /* ---------- Test ---------- */
  function Quiz(el, ls, onPass) {
    const qs = ls.quiz;
    let i = 0, score = 0;
    const box = h('div', 'quiz');
    el.appendChild(box);
    function show() {
      const q = qs[i];
      box.innerHTML = `<div class="quiz-prog"><span>Pregunta ${i + 1} de ${qs.length}</span><span>${score} correctas</span></div><p class="quiz-q">${M.markup(q.q)}</p><div class="quiz-opts" role="group"></div><div class="quiz-why" aria-live="polite"></div><div class="quiz-foot"></div>`;
      if (q.audio) {
        const pb = h('button', 'btn small ghost', '<span class="ico ico-play"></span> Escuchar');
        pb.type = 'button';
        pb.style.marginBottom = '12px';
        pb.onclick = () => playQ(q.audio);
        box.querySelector('.quiz-q').after(pb);
      }
      const opts = box.querySelector('.quiz-opts');
      q.o.forEach((o, k) => {
        const b = h('button', 'quiz-opt', `<span class="k">${'ABCDEF'[k]}</span><span>${M.markup(o)}</span>`);
        b.type = 'button';
        b.addEventListener('click', () => answer(k));
        opts.appendChild(b);
      });
    }
    function playQ(a) {
      A.stopAll();
      if (a.chord) M.playChord(M.chordShape(a.chord), 0, { dur: 2 });
      if (a.notes) a.notes.forEach((m, k) => A.pluck(m, A.now() + 0.05 + k * (a.gap || 0.55), { dur: 0.9 }));
      if (a.together) A.strum(a.together, 0, { spread: 0.01, dur: 2 });
    }
    function answer(k) {
      const q = qs[i];
      const btns = box.querySelectorAll('.quiz-opt');
      btns.forEach((b, j) => {
        b.disabled = true;
        if (j === q.a) b.classList.add('ok');
        else if (j === k) b.classList.add('bad');
      });
      const ok = k === q.a;
      if (ok) score++;
      box.querySelector('.quiz-prog span:last-child').textContent = `${score} correctas`;
      box.querySelector('.quiz-why').innerHTML = `<b style="font-family:var(--ui);color:${ok ? 'var(--s)' : 'var(--r)'}">${ok ? 'Correcto.' : 'No exactamente.'}</b> ${M.markup(q.why || '')}`;
      const nx = h('button', 'btn', i < qs.length - 1 ? 'Siguiente pregunta' : 'Ver resultado');
      nx.type = 'button';
      nx.addEventListener('click', () => { i++; if (i < qs.length) show(); else done(); box.querySelector('button')?.focus(); });
      box.querySelector('.quiz-foot').appendChild(nx);
      nx.focus();
    }
    function done() {
      const pct = score / qs.length;
      const pass = pct >= 0.7;
      if (pass) { M.setDone(ls.id, true, pct); onPass(); }
      box.innerHTML = `<div class="quiz-done"><div class="quiz-score">${score} / ${qs.length}</div><p>${pass ? 'Aprobado. La lección queda marcada como completada.' : 'Repasa las secciones de la lección y vuelve a intentarlo: necesitas un 70 % para aprobar.'}</p></div>`;
      const again = h('button', 'btn ghost', 'Repetir el test');
      again.type = 'button';
      again.onclick = () => { i = 0; score = 0; show(); };
      box.querySelector('.quiz-done').appendChild(again);
      if (pass && ls.next) {
        const nx = h('a', 'btn', 'Siguiente lección');
        nx.href = '#/leccion/' + ls.next.id;
        nx.style.marginLeft = '10px';
        box.querySelector('.quiz-done').appendChild(nx);
      }
    }
    show();
  }

  function pageTool(id, t) {
    const wrap = h('div', 'wrap');
    main.appendChild(wrap);
    wrap.innerHTML = `<header class="tool-head"><h1>${t.title}</h1><p>${t.lead || t.desc}</p></header><div id="toolBody"></div>`;
    t.render(wrap.querySelector('#toolBody'), {});
  }

  function pageGlossary() {
    const wrap = h('div', 'wrap');
    main.appendChild(wrap);
    const items = (M.glossary || []).slice().sort((a, b) => a.t.localeCompare(b.t, 'es'));
    const letters = [...new Set(items.map((x) => x.t[0].toUpperCase().normalize('NFD')[0]))];
    wrap.innerHTML = `<header class="tool-head"><h1>Glosario</h1><p>Los términos que aparecen en el curso, explicados en una o dos frases.</p></header>
      <div class="field" style="margin-bottom:16px;max-width:420px"><input class="input" id="gq" type="search" placeholder="Buscar un término" aria-label="Buscar en el glosario" style="width:100%"></div>
      <nav class="gloss-letters" aria-label="Letras">${letters.map((l) => `<a href="#/glosario" data-l="${l}">${l}</a>`).join('')}</nav>
      <dl class="gloss prose" id="gl"></dl>`;
    const dl = wrap.querySelector('#gl');
    const draw = (q) => {
      q = (q || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      const list = items.filter((x) => !q || (x.t + ' ' + x.d).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q));
      dl.innerHTML = list.length ? list.map((x) => `<dt id="g-${slug(x.t)}" data-l="${x.t[0].toUpperCase().normalize('NFD')[0]}">${x.t}</dt><dd>${M.markup(x.d)}${x.see ? ` <a href="#/leccion/${x.see}">Ver lección</a>` : ''}</dd>`).join('') : '<p class="empty">Ningún término coincide con la búsqueda.</p>';
    };
    draw();
    wrap.querySelector('#gq').addEventListener('input', (e) => draw(e.target.value));
    wrap.querySelector('.gloss-letters').addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      const dt = dl.querySelector(`dt[data-l="${a.dataset.l}"]`);
      if (dt) dt.scrollIntoView();
    });
  }

  function pageNotFound() {
    main.innerHTML = `<div class="wrap tool-head"><h1>Esta página no existe</h1><p>Puede que el enlace esté mal escrito. <a href="#/">Vuelve al inicio</a> para ver el temario completo.</p></div>`;
  }

  /* ---------- Arranque ---------- */
  function boot() {
    indexCourse();
    syncTopbar();
    route(false);
    // desbloquea el audio en el primer gesto (iOS)
    const unlock = () => { A.ctx(); window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
