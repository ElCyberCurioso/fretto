/* Fretto · motor de teoría musical
   Notas deletreadas (letra + alteración), intervalos, escalas, acordes,
   armonía diatónica y generador de digitaciones para guitarra. */
(function () {
  'use strict';
  const M = (window.M = window.M || {});

  const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const LATIN = { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' };
  const mod = (a, b) => ((a % b) + b) % b;

  M.settings = M.settings || { naming: 'latin', lefty: false, theme: 'auto', volume: 0.8 };

  /* ---------- Notas ---------- */
  function parseNote(str) {
    if (typeof str !== 'string') return str;
    const m = /^\s*([A-Ga-g])(##|bb|#|b|x|♯|♭)?(-?\d)?\s*$/.exec(str);
    if (!m) throw new Error('Nota no válida: ' + str);
    const letter = m[1].toUpperCase();
    const a = m[2] || '';
    const acc = { '': 0, '#': 1, '♯': 1, '##': 2, x: 2, b: -1, '♭': -1, bb: -2 }[a];
    const n = { letter, acc };
    if (m[3] !== undefined) n.oct = parseInt(m[3], 10);
    return n;
  }
  const pcOf = (n) => mod(LETTER_PC[n.letter] + n.acc, 12);
  const accStr = (acc) => ({ '-2': 'bb', '-1': 'b', 0: '', 1: '#', 2: '##' }[acc] || '');
  const accGlyph = (acc) => ({ '-2': '𝄫', '-1': '♭', 0: '', 1: '♯', 2: '𝄪' }[acc] || '');
  const noteKey = (n) => n.letter + accStr(n.acc); // 'C#', 'Bb'

  /** Nombre visible de una nota según el cifrado elegido. */
  function name(n, naming) {
    n = parseNote(n);
    naming = naming || M.settings.naming;
    const base = naming === 'latin' ? LATIN[n.letter] : n.letter;
    return base + accGlyph(n.acc);
  }
  const midiOf = (n) => (n.oct + 1) * 12 + LETTER_PC[n.letter] + n.acc;
  const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  /** Nota "por defecto" para una clase de altura (sostenidos o bemoles). */
  function pcNote(pc, preferFlat) {
    return parseNote((preferFlat ? FLAT_NAMES : SHARP_NAMES)[mod(pc, 12)]);
  }

  /* ---------- Intervalos ---------- */
  const INTERVALS = {
    '1': { deg: 1, semi: 0, name: 'Unísono', short: '1J' },
    'b2': { deg: 2, semi: 1, name: 'Segunda menor', short: '2m' },
    '2': { deg: 2, semi: 2, name: 'Segunda mayor', short: '2M' },
    '#2': { deg: 2, semi: 3, name: 'Segunda aumentada', short: '2A' },
    'b3': { deg: 3, semi: 3, name: 'Tercera menor', short: '3m' },
    '3': { deg: 3, semi: 4, name: 'Tercera mayor', short: '3M' },
    '4': { deg: 4, semi: 5, name: 'Cuarta justa', short: '4J' },
    '#4': { deg: 4, semi: 6, name: 'Cuarta aumentada', short: '4A' },
    'b5': { deg: 5, semi: 6, name: 'Quinta disminuida', short: '5d' },
    '5': { deg: 5, semi: 7, name: 'Quinta justa', short: '5J' },
    '#5': { deg: 5, semi: 8, name: 'Quinta aumentada', short: '5A' },
    'b6': { deg: 6, semi: 8, name: 'Sexta menor', short: '6m' },
    '6': { deg: 6, semi: 9, name: 'Sexta mayor', short: '6M' },
    'bb7': { deg: 7, semi: 9, name: 'Séptima disminuida', short: '7d' },
    'b7': { deg: 7, semi: 10, name: 'Séptima menor', short: '7m' },
    '7': { deg: 7, semi: 11, name: 'Séptima mayor', short: '7M' },
    '8': { deg: 8, semi: 12, name: 'Octava justa', short: '8J' },
    'b9': { deg: 9, semi: 13, name: 'Novena menor', short: '9m' },
    '9': { deg: 9, semi: 14, name: 'Novena mayor', short: '9M' },
    '#9': { deg: 9, semi: 15, name: 'Novena aumentada', short: '9A' },
    '11': { deg: 11, semi: 17, name: 'Oncena justa', short: '11J' },
    '#11': { deg: 11, semi: 18, name: 'Oncena aumentada', short: '11A' },
    'b13': { deg: 13, semi: 20, name: 'Trecena menor', short: '13m' },
    '13': { deg: 13, semi: 21, name: 'Trecena mayor', short: '13M' },
  };
  /** Intervalo simple por número de semitonos (0..11), forma más habitual. */
  const SIMPLE_BY_SEMI = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];

  function transpose(n, iv) {
    n = parseNote(n);
    const I = typeof iv === 'string' ? INTERVALS[iv] : iv;
    const li = (LETTERS.indexOf(n.letter) + (I.deg - 1)) % 7;
    const letter = LETTERS[li];
    const target = mod(pcOf(n) + I.semi, 12);
    let acc = mod(target - LETTER_PC[letter], 12);
    if (acc > 6) acc -= 12;
    const out = { letter, acc };
    if (n.oct !== undefined) {
      const steps = LETTERS.indexOf(n.letter) + (I.deg - 1);
      out.oct = n.oct + Math.floor(steps / 7);
    }
    return out;
  }

  /** Rol armónico de un intervalo para colorear: r, t (3ª), f (5ª), s (7ª), x (resto). */
  function role(iv) {
    if (iv === '1' || iv === '8') return 'r';
    const d = INTERVALS[iv] ? INTERVALS[iv].deg : 0;
    if (d === 3) return 't';
    if (d === 5) return 'f';
    if (d === 7) return 's';
    return 'x';
  }
  /** Etiqueta corta de intervalo para mostrar en un diagrama. */
  function ivLabel(iv) {
    if (iv === '1') return 'R';
    return iv.replace('bb', '𝄫').replace('b', '♭').replace('#', '♯');
  }

  /* ---------- Escalas ---------- */
  const SCALES = {
    major: { name: 'Mayor (jónica)', ivs: ['1', '2', '3', '4', '5', '6', '7'] },
    minor: { name: 'Menor natural (eólica)', ivs: ['1', '2', 'b3', '4', '5', 'b6', 'b7'] },
    harmonicMinor: { name: 'Menor armónica', ivs: ['1', '2', 'b3', '4', '5', 'b6', '7'] },
    melodicMinor: { name: 'Menor melódica', ivs: ['1', '2', 'b3', '4', '5', '6', '7'] },
    pentMajor: { name: 'Pentatónica mayor', ivs: ['1', '2', '3', '5', '6'] },
    pentMinor: { name: 'Pentatónica menor', ivs: ['1', 'b3', '4', '5', 'b7'] },
    blues: { name: 'Blues', ivs: ['1', 'b3', '4', 'b5', '5', 'b7'] },
    majorBlues: { name: 'Blues mayor', ivs: ['1', '2', 'b3', '3', '5', '6'] },
    ionian: { name: 'Jónico', ivs: ['1', '2', '3', '4', '5', '6', '7'], mode: true },
    dorian: { name: 'Dórico', ivs: ['1', '2', 'b3', '4', '5', '6', 'b7'], mode: true },
    phrygian: { name: 'Frigio', ivs: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'], mode: true },
    lydian: { name: 'Lidio', ivs: ['1', '2', '3', '#4', '5', '6', '7'], mode: true },
    mixolydian: { name: 'Mixolidio', ivs: ['1', '2', '3', '4', '5', '6', 'b7'], mode: true },
    aeolian: { name: 'Eólico', ivs: ['1', '2', 'b3', '4', '5', 'b6', 'b7'], mode: true },
    locrian: { name: 'Locrio', ivs: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'], mode: true },
    phrygianDominant: { name: 'Frigio dominante', ivs: ['1', 'b2', '3', '4', '5', 'b6', 'b7'] },
    lydianDominant: { name: 'Lidio dominante', ivs: ['1', '2', '3', '#4', '5', '6', 'b7'] },
    altered: { name: 'Alterada (superlocria)', ivs: ['1', 'b2', '#2', '3', 'b5', 'b6', 'b7'] },
    wholeTone: { name: 'Tonos enteros', ivs: ['1', '2', '3', '#4', '#5', 'b7'] },
    dimHW: { name: 'Disminuida semitono-tono', ivs: ['1', 'b2', 'b3', '3', '#4', '5', '6', 'b7'] },
    dimWH: { name: 'Disminuida tono-semitono', ivs: ['1', '2', 'b3', '4', 'b5', 'b6', '6', '7'] },
    chromatic: { name: 'Cromática', ivs: ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'] },
  };
  function scaleNotes(root, id) {
    return SCALES[id].ivs.map((iv) => transpose(root, iv));
  }
  /** Fórmula en tonos (T) y semitonos (S) entre grados consecutivos. */
  function stepFormula(id) {
    const ivs = SCALES[id].ivs.map((iv) => INTERVALS[iv].semi).concat([12]);
    const out = [];
    for (let i = 1; i < ivs.length; i++) {
      const d = ivs[i] - ivs[i - 1];
      out.push(d === 1 ? 'S' : d === 2 ? 'T' : d === 3 ? 'T½' : d + 'st');
    }
    return out;
  }

  /* ---------- Acordes ---------- */
  const CHORDS = {
    '': { name: 'Mayor', ivs: ['1', '3', '5'] },
    m: { name: 'Menor', ivs: ['1', 'b3', '5'] },
    dim: { name: 'Disminuido', ivs: ['1', 'b3', 'b5'], sym: 'dim' },
    aug: { name: 'Aumentado', ivs: ['1', '3', '#5'], sym: 'aug' },
    sus2: { name: 'Suspendido 2', ivs: ['1', '2', '5'] },
    sus4: { name: 'Suspendido 4', ivs: ['1', '4', '5'] },
    '5': { name: 'Quinta (power chord)', ivs: ['1', '5'] },
    '6': { name: 'Sexta', ivs: ['1', '3', '5', '6'], opt: ['5'] },
    m6: { name: 'Menor sexta', ivs: ['1', 'b3', '5', '6'], opt: ['5'] },
    maj7: { name: 'Séptima mayor', ivs: ['1', '3', '5', '7'], opt: ['5'] },
    '7': { name: 'Séptima (dominante)', ivs: ['1', '3', '5', 'b7'], opt: ['5'] },
    m7: { name: 'Menor séptima', ivs: ['1', 'b3', '5', 'b7'], opt: ['5'] },
    m7b5: { name: 'Semidisminuido', ivs: ['1', 'b3', 'b5', 'b7'], sym: 'm7♭5' },
    dim7: { name: 'Disminuido séptima', ivs: ['1', 'b3', 'b5', 'bb7'], sym: 'dim7' },
    mMaj7: { name: 'Menor con séptima mayor', ivs: ['1', 'b3', '5', '7'], opt: ['5'], sym: 'm(maj7)' },
    '7sus4': { name: 'Séptima suspendida 4', ivs: ['1', '4', '5', 'b7'], opt: ['5'] },
    add9: { name: 'Novena añadida', ivs: ['1', '3', '5', '9'], opt: ['5'] },
    madd9: { name: 'Menor novena añadida', ivs: ['1', 'b3', '5', '9'], opt: ['5'] },
    '6/9': { name: 'Sexta novena', ivs: ['1', '3', '5', '6', '9'], opt: ['5'] },
    maj9: { name: 'Novena mayor', ivs: ['1', '3', '5', '7', '9'], opt: ['5'] },
    '9': { name: 'Novena (dominante)', ivs: ['1', '3', '5', 'b7', '9'], opt: ['5'] },
    m9: { name: 'Menor novena', ivs: ['1', 'b3', '5', 'b7', '9'], opt: ['5'] },
    '7b9': { name: 'Séptima con novena menor', ivs: ['1', '3', '5', 'b7', 'b9'], opt: ['5'], sym: '7♭9' },
    '7#9': { name: 'Séptima con novena aumentada', ivs: ['1', '3', '5', 'b7', '#9'], opt: ['5'], sym: '7♯9' },
    m11: { name: 'Menor oncena', ivs: ['1', 'b3', '5', 'b7', '9', '11'], opt: ['5', '9'] },
    '13': { name: 'Trecena (dominante)', ivs: ['1', '3', '5', 'b7', '9', '13'], opt: ['5', '9'] },
    maj7s11: { name: 'Séptima mayor con oncena aumentada', ivs: ['1', '3', '5', '7', '#11'], opt: ['5'], sym: 'maj7♯11' },
    '7#11': { name: 'Séptima con oncena aumentada', ivs: ['1', '3', '5', 'b7', '#11'], opt: ['5'], sym: '7♯11' },
    '7b13': { name: 'Séptima con trecena menor', ivs: ['1', '3', 'b7', 'b13'], sym: '7♭13' },
    '7alt': { name: 'Séptima alterada', ivs: ['1', '3', 'b7', '#9', 'b13'], sym: '7alt' },
  };
  const chordSym = (type) => (CHORDS[type] && CHORDS[type].sym) || type;
  function chordNotes(root, type) {
    return CHORDS[type].ivs.map((iv) => transpose(root, iv));
  }
  function chordName(root, type, naming) {
    return name(root, naming) + chordSym(type);
  }

  /** Analiza un cifrado tipo "F#m7b5", "Bbmaj7", "C/E" → {root, type, bass}. */
  const CHORD_SUFFIX_ALIASES = {
    '': '', M: '', maj: '', m: 'm', min: 'm', '-': 'm', dim: 'dim', '°': 'dim', o: 'dim',
    aug: 'aug', '+': 'aug', sus2: 'sus2', sus4: 'sus4', sus: 'sus4', '5': '5', '6': '6', m6: 'm6',
    maj7: 'maj7', M7: 'maj7', 'Δ': 'maj7', 'Δ7': 'maj7', '7': '7', m7: 'm7', '-7': 'm7',
    m7b5: 'm7b5', 'ø': 'm7b5', 'ø7': 'm7b5', dim7: 'dim7', '°7': 'dim7', o7: 'dim7',
    mMaj7: 'mMaj7', 'm(maj7)': 'mMaj7', '7sus4': '7sus4', add9: 'add9', madd9: 'madd9',
    '6/9': '6/9', maj9: 'maj9', '9': '9', m9: 'm9', '7b9': '7b9', '7#9': '7#9', m11: 'm11',
    '13': '13', 'maj7#11': 'maj7s11', '7#11': '7#11', '7b13': '7b13', '7alt': '7alt', alt: '7alt',
  };
  function parseChord(sym) {
    const m = /^([A-G](?:##|bb|#|b)?)(.*?)(?:\/([A-G](?:#|b)?))?$/.exec(sym.trim());
    if (!m) return null;
    const type = CHORD_SUFFIX_ALIASES[m[2]];
    return { root: parseNote(m[1]), type: type === undefined ? m[2] : type, suffix: m[2], bass: m[3] ? parseNote(m[3]) : null };
  }
  /** Nombre visible de un cifrado escrito en notación americana. */
  function displayChord(sym, naming) {
    const p = parseChord(sym);
    if (!p) return sym;
    let s = name(p.root, naming) + (CHORDS[p.type] ? chordSym(p.type) : p.suffix.replace('b', '♭').replace('#', '♯'));
    if (p.bass) s += '/' + name(p.bass, naming);
    return s;
  }

  /* ---------- Tonalidades ---------- */
  const MAJOR_BY_FIFTHS = { '-7': 'Cb', '-6': 'Gb', '-5': 'Db', '-4': 'Ab', '-3': 'Eb', '-2': 'Bb', '-1': 'F', 0: 'C', 1: 'G', 2: 'D', 3: 'A', 4: 'E', 5: 'B', 6: 'F#', 7: 'C#' };
  const SHARP_ORDER = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
  const FLAT_ORDER = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
  function keySignature(fifths) {
    if (fifths > 0) return SHARP_ORDER.slice(0, fifths).map((l) => ({ letter: l, acc: 1 }));
    if (fifths < 0) return FLAT_ORDER.slice(0, -fifths).map((l) => ({ letter: l, acc: -1 }));
    return [];
  }
  function fifthsOfMajor(tonic) {
    const k = noteKey(parseNote(tonic));
    for (const f in MAJOR_BY_FIFTHS) if (MAJOR_BY_FIFTHS[f] === k) return parseInt(f, 10);
    return null;
  }
  function fifthsOfMinor(tonic) {
    return fifthsOfMajor(noteKey(transpose(tonic, 'b3')));
  }
  /** Mapa clase-de-altura → nota deletreada para una armadura. */
  const keyMapCache = {};
  function keyMap(fifths) {
    if (keyMapCache[fifths]) return keyMapCache[fifths];
    const tonic = parseNote(MAJOR_BY_FIFTHS[fifths]);
    const map = {};
    scaleNotes(tonic, 'major').forEach((n) => (map[pcOf(n)] = n));
    return (keyMapCache[fifths] = map);
  }
  /** Deletrea una altura MIDI según la tonalidad (armadura en quintas). */
  function spellMidi(midi, fifths) {
    fifths = fifths || 0;
    const pc = mod(midi, 12);
    let n = keyMap(fifths)[pc];
    if (!n) n = pcNote(pc, fifths < 0);
    n = { letter: n.letter, acc: n.acc };
    n.oct = Math.floor((midi - (LETTER_PC[n.letter] + n.acc)) / 12) - 1;
    return n;
  }
  /** Índice diatónico absoluto (para posicionar en el pentagrama). */
  const diatonicIndex = (n) => n.oct * 7 + LETTERS.indexOf(n.letter);

  /* ---------- Armonía diatónica ---------- */
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
  function qualityFromSemis(t, f, s) {
    const tri = t === 4 && f === 7 ? '' : t === 3 && f === 7 ? 'm' : t === 3 && f === 6 ? 'dim' : t === 4 && f === 8 ? 'aug' : '?';
    if (s === undefined) return tri;
    const map = { '': { 11: 'maj7', 10: '7' }, m: { 10: 'm7', 11: 'mMaj7' }, dim: { 10: 'm7b5', 9: 'dim7' }, aug: { 11: 'maj7#5', 10: '7#5' } };
    return (map[tri] && map[tri][s]) || tri + '?';
  }
  function romanFor(degreeIdx, ivFromTonic, type) {
    const majorSemis = [0, 2, 4, 5, 7, 9, 11][degreeIdx];
    const diff = ivFromTonic - majorSemis;
    const pre = diff < 0 ? '♭' : diff > 0 ? '♯' : '';
    let r = ROMAN[degreeIdx];
    const minorish = /^(m(?!aj)|dim)/.test(type);
    if (minorish) r = r.toLowerCase();
    let suf = '';
    if (type === 'dim') suf = '°';
    else if (type === 'aug') suf = '+';
    else if (type === 'm7b5') suf = 'ø7';
    else if (type === 'dim7') suf = '°7';
    else if (type === 'maj7') suf = 'maj7';
    else if (type === '7') suf = '7';
    else if (type === 'm7') suf = '7';
    else if (type === 'mMaj7') suf = '(maj7)';
    else if (type === 'maj7#5') suf = '+maj7';
    return pre + r + suf;
  }
  /** Acordes diatónicos (tríadas o cuatriadas) de una escala heptatónica. */
  function diatonicChords(tonic, scaleId, sevenths) {
    tonic = parseNote(tonic);
    scaleId = scaleId || 'major';
    const notes = scaleNotes(tonic, scaleId);
    const semis = SCALES[scaleId].ivs.map((iv) => INTERVALS[iv].semi);
    return notes.map((root, i) => {
      const st = (k) => mod(semis[(i + k) % 7] - semis[i], 12);
      const type = sevenths ? qualityFromSemis(st(2), st(4), st(6)) : qualityFromSemis(st(2), st(4));
      return { degree: i + 1, root, type, roman: romanFor(i, semis[i], type), notes: [0, 2, 4, 6].slice(0, sevenths ? 4 : 3).map((k) => notes[(i + k) % 7]) };
    });
  }
  const FUNCTIONS = ['Tónica', 'Subdominante', 'Tónica (relativa)', 'Subdominante', 'Dominante', 'Tónica (relativa)', 'Dominante'];

  /** Acorde a partir de un número romano en una tonalidad mayor o menor. */
  function chordFromRoman(rn, tonic, minorKey) {
    const m = /^(♭|b|♯|#)?(VII|VI|V|IV|III|II|I|vii|vi|v|iv|iii|ii|i)(.*)$/.exec(rn);
    if (!m) return null;
    const idx = ROMAN.indexOf(m[2].toUpperCase());
    // Las alteraciones de los números romanos se miden siempre respecto a la escala mayor
    // (en menor: i, ii°, ♭III, iv, v, ♭VI, ♭VII).
    const base = SCALES.major.ivs;
    let iv = base[idx];
    const sh = m[1] === '♭' || m[1] === 'b' ? -1 : m[1] === '♯' || m[1] === '#' ? 1 : 0;
    const I = INTERVALS[iv];
    const root = transpose(tonic, { deg: I.deg, semi: I.semi + sh });
    const lower = m[2] === m[2].toLowerCase();
    let suf = m[3] || '';
    let type;
    if (suf === '°' || suf === 'o') type = 'dim';
    else if (suf === 'ø7' || suf === 'ø') type = 'm7b5';
    else if (suf === '°7' || suf === 'o7') type = 'dim7';
    else if (suf === '+') type = 'aug';
    else if (suf === 'maj7') type = lower ? 'mMaj7' : 'maj7';
    else if (suf === '7') type = lower ? 'm7' : '7';
    else if (suf === '6') type = lower ? 'm6' : '6';
    else if (suf === '9') type = lower ? 'm9' : '9';
    else if (suf === 'sus4' || suf === 'sus2') type = suf;
    else type = lower ? 'm' : '';
    return { root, type, symbol: noteKey(root) + type };
  }

  /* ---------- Guitarra ---------- */
  const TUNINGS = {
    standard: { name: 'Estándar (Mi La Re Sol Si Mi)', midi: [40, 45, 50, 55, 59, 64] },
    dropD: { name: 'Drop D (Re La Re Sol Si Mi)', midi: [38, 45, 50, 55, 59, 64] },
    halfDown: { name: 'Medio tono abajo', midi: [39, 44, 49, 54, 58, 63] },
    dadgad: { name: 'DADGAD', midi: [38, 45, 50, 55, 57, 62] },
    openG: { name: 'Sol abierto (DGDGBD)', midi: [38, 43, 50, 55, 59, 62] },
    openD: { name: 'Re abierto (DADF♯AD)', midi: [38, 45, 50, 54, 57, 62] },
  };
  const tuningMidi = (t) => (Array.isArray(t) ? t : (TUNINGS[t] || TUNINGS.standard).midi);
  /** cuerda (1 = Mi aguda … 6 = Mi grave) + traste → MIDI. */
  const fretMidi = (string, fret, tuning) => tuningMidi(tuning)[6 - string] + fret;

  /** Posiciones de una altura MIDI en el mástil. */
  function positionsOf(midi, maxFret, tuning) {
    const t = tuningMidi(tuning);
    const out = [];
    for (let i = 0; i < 6; i++) {
      const f = midi - t[i];
      if (f >= 0 && f <= (maxFret || 15)) out.push({ string: 6 - i, fret: f });
    }
    return out;
  }
  /** Posición cómoda (primera posición si es posible) para una altura. */
  function bestPosition(midi, tuning, near) {
    const ps = positionsOf(midi, 15, tuning);
    if (!ps.length) return null;
    near = near === undefined ? 1.5 : near;
    ps.sort((a, b) => Math.abs(a.fret - near) - Math.abs(b.fret - near) || a.string - b.string);
    return ps[0];
  }

  /* ---------- Digitaciones de acordes ---------- */
  // Formas abiertas y de cejilla habituales, cuerda 6 → 1 (−1 = no se toca)
  const SHAPES = {
    C: { f: [-1, 3, 2, 0, 1, 0], d: [0, 3, 2, 0, 1, 0] },
    A: { f: [-1, 0, 2, 2, 2, 0], d: [0, 0, 1, 2, 3, 0] },
    G: { f: [3, 2, 0, 0, 0, 3], d: [2, 1, 0, 0, 0, 3] },
    E: { f: [0, 2, 2, 1, 0, 0], d: [0, 2, 3, 1, 0, 0] },
    D: { f: [-1, -1, 0, 2, 3, 2], d: [0, 0, 0, 1, 3, 2] },
    F: { f: [1, 3, 3, 2, 1, 1], d: [1, 3, 4, 2, 1, 1], barre: 1 },
    B: { f: [-1, 2, 4, 4, 4, 2], d: [0, 1, 2, 3, 4, 1], barre: 2 },
    Am: { f: [-1, 0, 2, 2, 1, 0], d: [0, 0, 2, 3, 1, 0] },
    Em: { f: [0, 2, 2, 0, 0, 0], d: [0, 2, 3, 0, 0, 0] },
    Dm: { f: [-1, -1, 0, 2, 3, 1], d: [0, 0, 0, 2, 3, 1] },
    Bm: { f: [-1, 2, 4, 4, 3, 2], d: [0, 1, 3, 4, 2, 1], barre: 2 },
    'F#m': { f: [2, 4, 4, 2, 2, 2], d: [1, 3, 4, 1, 1, 1], barre: 2 },
    Fm: { f: [1, 3, 3, 1, 1, 1], d: [1, 3, 4, 1, 1, 1], barre: 1 },
    Gm: { f: [3, 5, 5, 3, 3, 3], d: [1, 3, 4, 1, 1, 1], barre: 3 },
    Cm: { f: [-1, 3, 5, 5, 4, 3], d: [0, 1, 3, 4, 2, 1], barre: 3 },
    'C#m': { f: [-1, 4, 6, 6, 5, 4], d: [0, 1, 3, 4, 2, 1], barre: 4 },
    Bb: { f: [-1, 1, 3, 3, 3, 1], d: [0, 1, 2, 3, 4, 1], barre: 1 },
    'F#': { f: [2, 4, 4, 3, 2, 2], d: [1, 3, 4, 2, 1, 1], barre: 2 },
    Eb: { f: [-1, 6, 8, 8, 8, 6], d: [0, 1, 2, 3, 4, 1], barre: 6 },
    Ab: { f: [4, 6, 6, 5, 4, 4], d: [1, 3, 4, 2, 1, 1], barre: 4 },
    E7: { f: [0, 2, 0, 1, 0, 0], d: [0, 2, 0, 1, 0, 0] },
    A7: { f: [-1, 0, 2, 0, 2, 0], d: [0, 0, 2, 0, 3, 0] },
    D7: { f: [-1, -1, 0, 2, 1, 2], d: [0, 0, 0, 2, 1, 3] },
    G7: { f: [3, 2, 0, 0, 0, 1], d: [3, 2, 0, 0, 0, 1] },
    C7: { f: [-1, 3, 2, 3, 1, 0], d: [0, 3, 2, 4, 1, 0] },
    B7: { f: [-1, 2, 1, 2, 0, 2], d: [0, 2, 1, 3, 0, 4] },
    F7: { f: [1, 3, 1, 2, 1, 1], d: [1, 3, 1, 2, 1, 1], barre: 1 },
    Am7: { f: [-1, 0, 2, 0, 1, 0], d: [0, 0, 2, 0, 1, 0] },
    Em7: { f: [0, 2, 0, 0, 0, 0], d: [0, 2, 0, 0, 0, 0] },
    Dm7: { f: [-1, -1, 0, 2, 1, 1], d: [0, 0, 0, 2, 1, 1] },
    Bm7: { f: [-1, 2, 0, 2, 0, 2], d: [0, 1, 0, 2, 0, 3] },
    'F#m7': { f: [2, 4, 2, 2, 2, 2], d: [1, 3, 1, 1, 1, 1], barre: 2 },
    Cmaj7: { f: [-1, 3, 2, 0, 0, 0], d: [0, 3, 2, 0, 0, 0] },
    Fmaj7: { f: [-1, -1, 3, 2, 1, 0], d: [0, 0, 3, 2, 1, 0] },
    Amaj7: { f: [-1, 0, 2, 1, 2, 0], d: [0, 0, 2, 1, 3, 0] },
    Dmaj7: { f: [-1, -1, 0, 2, 2, 2], d: [0, 0, 0, 1, 1, 1] },
    Gmaj7: { f: [3, 2, 0, 0, 0, 2], d: [3, 2, 0, 0, 0, 1] },
    Emaj7: { f: [0, 2, 1, 1, 0, 0], d: [0, 3, 1, 2, 0, 0] },
    Bm7b5: { f: [-1, 2, 3, 2, 3, -1], d: [0, 1, 3, 2, 4, 0] },
    Asus2: { f: [-1, 0, 2, 2, 0, 0], d: [0, 0, 1, 2, 0, 0] },
    Asus4: { f: [-1, 0, 2, 2, 3, 0], d: [0, 0, 1, 2, 3, 0] },
    Dsus2: { f: [-1, -1, 0, 2, 3, 0], d: [0, 0, 0, 1, 3, 0] },
    Dsus4: { f: [-1, -1, 0, 2, 3, 3], d: [0, 0, 0, 1, 2, 3] },
    Esus4: { f: [0, 2, 2, 2, 0, 0], d: [0, 2, 3, 4, 0, 0] },
    Cadd9: { f: [-1, 3, 2, 0, 3, 0], d: [0, 2, 1, 0, 3, 0] },
    E5: { f: [0, 2, 2, -1, -1, -1], d: [0, 1, 2, 0, 0, 0] },
    A5: { f: [-1, 0, 2, 2, -1, -1], d: [0, 0, 1, 2, 0, 0] },
    G5: { f: [3, 5, 5, -1, -1, -1], d: [1, 3, 4, 0, 0, 0] },
    D5: { f: [-1, 5, 7, 7, -1, -1], d: [0, 1, 3, 4, 0, 0] },
    C5: { f: [-1, 3, 5, 5, -1, -1], d: [0, 1, 3, 4, 0, 0] },
    F5: { f: [1, 3, 3, -1, -1, -1], d: [1, 3, 4, 0, 0, 0] },
    Edim7: { f: [-1, -1, 2, 3, 2, 3], d: [0, 0, 1, 3, 2, 4] },
    Bdim: { f: [-1, 2, 3, 4, 3, -1], d: [0, 1, 2, 4, 3, 0] },
    Caug: { f: [-1, 3, 2, 1, 1, 0], d: [0, 4, 3, 1, 2, 0] },
  };

  function fingerFor(frets) {
    const fretted = [];
    frets.forEach((f, i) => { if (f > 0) fretted.push({ i, f }); });
    if (!fretted.length) return { fingers: frets.map(() => 0), barre: null, ok: true };
    const minF = Math.min(...fretted.map((x) => x.f));
    const fingers = frets.map(() => 0);
    const assign = (list, start) => {
      list.sort((a, b) => a.f - b.f || a.i - b.i);
      let prev = start;
      for (const x of list) {
        const fg = Math.max(prev + 1, x.f - minF + 1);
        if (fg > 4) return false;
        fingers[x.i] = fg;
        prev = fg;
      }
      return true;
    };
    if (fretted.length <= 4 && assign(fretted.slice(), 0)) return { fingers, barre: null, ok: true };
    // Cejilla con el índice en el traste más bajo
    const atMin = fretted.filter((x) => x.f === minF).map((x) => x.i);
    const from = Math.min(...atMin);
    const to = Math.max(...frets.map((f, i) => (f >= 0 ? i : -1)));
    for (let i = from; i <= to; i++) if (frets[i] < minF) return { ok: false };
    if (atMin.length < 2) return { ok: false };
    for (let i = 0; i < 6; i++) fingers[i] = 0;
    fretted.forEach((x) => { if (x.f === minF && x.i >= from) fingers[x.i] = 1; });
    let rest = fretted.filter((x) => !(x.f === minF && x.i >= from));
    if (assign(rest.slice(), 1)) return { fingers, barre: { fret: minF, from, to }, ok: true };
    // Mini-cejilla: notas del mismo traste en cuerdas contiguas con un dedo
    rest.sort((a, b) => a.f - b.f || a.i - b.i);
    let prev = 1, k = 0;
    while (k < rest.length) {
      let j = k;
      while (j + 1 < rest.length && rest[j + 1].f === rest[k].f && rest[j + 1].i === rest[j].i + 1) j++;
      const fg = Math.max(prev + 1, rest[k].f - minF + 1);
      if (fg > 4) return { ok: false };
      for (let q = k; q <= j; q++) fingers[rest[q].i] = fg;
      prev = fg;
      k = j + 1;
    }
    return { fingers, barre: { fret: minF, from, to }, ok: true };
  }

  /** Genera digitaciones tocables para un acorde. */
  function voicings(root, type, opts) {
    opts = opts || {};
    root = parseNote(root);
    const t = tuningMidi(opts.tuning);
    const ch = CHORDS[type];
    if (!ch) return [];
    const rootPc = pcOf(root);
    const tones = ch.ivs.map((iv) => ({ iv, pc: mod(rootPc + INTERVALS[iv].semi, 12) }));
    const pcSet = new Set(tones.map((x) => x.pc));
    const optional = new Set(ch.opt || []);
    const required = [...new Set(tones.filter((x) => !optional.has(x.iv)).map((x) => x.pc))];
    const span = opts.span || 3;
    const maxFret = opts.maxFret || 14;
    const found = new Map();

    for (let pos = 0; pos <= maxFret; pos++) {
      const lo = Math.max(1, pos), hi = pos + span;
      const options = t.map((open) => {
        const o = [-1];
        if (pos <= 4 && pcSet.has(mod(open, 12))) o.push(0);
        for (let f = lo; f <= hi; f++) if (pcSet.has(mod(open + f, 12))) o.push(f);
        return o;
      });
      const cur = [];
      const needRoot = opts.bassRoot !== false;
      const rec = (i, anyPlayed) => {
        if (i === 6) return consider(cur.slice());
        for (const f of options[i]) {
          // la primera cuerda que suena debe ser la fundamental
          if (needRoot && !anyPlayed && f >= 0 && mod(t[i] + f, 12) !== rootPc) continue;
          cur[i] = f;
          rec(i + 1, anyPlayed || f >= 0);
        }
      };
      rec(0, false);
    }
    function consider(fr) {
      const played = fr.map((f, i) => (f >= 0 ? i : -1)).filter((i) => i >= 0);
      if (played.length < Math.max(3, Math.min(required.length, 4))) return;
      const first = played[0], last = played[played.length - 1];
      let inner = 0;
      for (let i = first; i <= last; i++) if (fr[i] < 0) inner++;
      if (inner > 1) return;
      const pcs = played.map((i) => mod(t[i] + fr[i], 12));
      if (opts.bassRoot !== false && pcs[0] !== rootPc) return;
      for (const r of required) if (!pcs.includes(r)) return;
      const fretted = fr.filter((f) => f > 0);
      if (fretted.length) {
        const sp = Math.max(...fretted) - Math.min(...fretted);
        if (sp > span) return;
      }
      if (fretted.length && Math.max(...fretted) > 4 && fr.some((f) => f === 0)) return;
      const fing = fingerFor(fr);
      if (!fing.ok) return;
      const key = fr.join(',');
      if (found.has(key)) return;
      const minF = fretted.length ? Math.min(...fretted) : 0;
      const maxF = fretted.length ? Math.max(...fretted) : 0;
      const opens = fr.filter((f) => f === 0).length;
      let score = played.length * 3 - inner * 5 - minF * 0.15 - (maxF - minF) * 1.2;
      if (played.length >= 4) score += 1;
      const allTones = tones.every((x) => pcs.includes(x.pc));
      if (allTones) score += 2;
      if (maxF <= 3) score += opens * 0.8;
      else if (opens) score -= 3;
      if (fing.barre) score -= 1.5;
      score -= fing.fingers.filter((x) => x > 0).length * 0.3;
      if (fr[5] < 0 && played.length < 5) score -= 0.5;
      found.set(key, { frets: fr, fingers: fing.fingers, barre: fing.barre, minF, score, pcs });
    }
    let list = [...found.values()];
    // Mantener las mejores por zona del mástil
    const byZone = new Map();
    list.forEach((v) => {
      const z = v.minF <= 2 ? 0 : Math.floor((v.minF - 1) / 2);
      if (!byZone.has(z)) byZone.set(z, []);
      byZone.get(z).push(v);
    });
    list = [];
    byZone.forEach((arr) => {
      arr.sort((a, b) => b.score - a.score);
      const best = arr[0].score;
      list.push(...arr.slice(0, opts.perZone || 2).filter((v, i) => i === 0 || v.score >= best - 3));
    });
    list.sort((a, b) => a.minF - b.minF || b.score - a.score);
    return list.slice(0, opts.max || 10).map((v) => ({
      frets: v.frets, fingers: v.fingers, barre: v.barre,
      labels: v.frets.map((f, i) => (f < 0 ? null : ivFromRoot(root, t[i] + f, type))),
    }));
  }
  /** Intervalo (etiqueta) de una altura respecto a la fundamental de un acorde. */
  function ivFromRoot(root, midi, type) {
    const semi = mod(midi - pcOf(root), 12);
    const ch = CHORDS[type];
    if (ch) for (const iv of ch.ivs) if (INTERVALS[iv].semi % 12 === semi) return iv;
    return SIMPLE_BY_SEMI[semi];
  }

  /** Digitación preferida: forma conocida o la mejor generada. */
  function chordShape(sym) {
    const p = parseChord(sym);
    if (!p) return null;
    const keyName = noteKey(p.root) + (p.type === 'm7b5' ? 'm7b5' : p.suffix);
    const enh = { 'A#': 'Bb', Db: 'C#', 'D#': 'Eb', Gb: 'F#', 'G#': 'Ab' };
    const alt = (enh[noteKey(p.root)] || noteKey(p.root)) + p.suffix;
    const s = SHAPES[keyName] || SHAPES[alt];
    const t = TUNINGS.standard.midi;
    if (s) {
      return {
        frets: s.f, fingers: s.d,
        barre: s.barre ? { fret: s.barre, from: s.f.findIndex((f) => f === s.barre), to: 5 } : null,
        labels: s.f.map((f, i) => (f < 0 ? null : ivFromRoot(p.root, t[i] + f, p.type))),
      };
    }
    const v = voicings(p.root, p.type, { max: 1 });
    return v[0] || null;
  }
  /** Alturas MIDI que suenan en una digitación (de grave a agudo). */
  function shapeMidis(frets, tuning) {
    const t = tuningMidi(tuning);
    return frets.map((f, i) => (f >= 0 ? t[i] + f : null)).filter((x) => x !== null);
  }

  /* ---------- Exportar ---------- */
  Object.assign(M, {
    LETTERS, LETTER_PC, LATIN, mod, parseNote, pcOf, noteKey, name, midiOf, freq, pcNote,
    accGlyph, INTERVALS, SIMPLE_BY_SEMI, transpose, role, ivLabel, SCALES, scaleNotes, stepFormula,
    CHORDS, chordSym, chordNotes, chordName, parseChord, displayChord, keySignature, fifthsOfMajor,
    fifthsOfMinor, MAJOR_BY_FIFTHS, spellMidi, diatonicIndex, diatonicChords, chordFromRoman, FUNCTIONS,
    TUNINGS, tuningMidi, fretMidi, positionsOf, bestPosition, SHAPES, fingerFor, voicings, chordShape,
    shapeMidis, ivFromRoot,
  });
})();
