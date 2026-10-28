/* Fretto · Nivel 4: Avanzado */
(function () {
  'use strict';
  const M = window.M, W = M.W;
  M.course = M.course || [];

  M.course.push({
    id: 'n4', n: 4, title: 'Armonía avanzada',
    desc: 'Modos, extensiones, dominantes secundarios, préstamos modales, sustituciones, jazz, improvisación sobre cambios, modulación y ritmo avanzado.',
    long: 'El vocabulario del jazz, el fusión, el pop sofisticado y las bandas sonoras: cómo colorear un acorde, cómo dar tensión y sorpresa a una progresión y cómo improvisar siguiendo la armonía nota a nota.',
    lessons: [

      /* ---------------------------------------------------------- 4.1 */
      {
        id: 'modos', title: 'Los modos griegos', time: '28 min',
        desc: 'Siete escalas a partir de una: de dónde salen, cómo suenan y su nota característica.',
        lead: 'Si tocas la escala mayor empezando en cada uno de sus grados obtienes siete escalas distintas: los modos. Cada uno tiene su propio color, y saber oírlo es tener siete paletas en lugar de dos.',
        goals: ['Derivar los siete modos de la escala mayor', 'Compararlos con la escala mayor o menor de su misma tónica', 'Reconocer la nota característica de cada modo'],
        body: () => `
<h2>Siete puntos de partida</h2>
<p>Las notas de {C} mayor son {C} {D} {E} {F} {G} {A} {B}. Si las tocas desde {C}, oyes {C} jónico (la escala mayor de siempre). Si las tocas desde {D} y haces que {D} suene como centro, oyes {D} <strong>dórico</strong>: mismas notas, otro color. Así salen los siete modos:</p>
<table><thead><tr><th>Grado</th><th>Modo</th><th>En {C}</th><th>Fórmula</th><th>Es como…</th></tr></thead><tbody>
<tr><td>I</td><td>Jónico</td><td>{C}–{C}</td><td>1 2 3 4 5 6 7</td><td>La escala mayor</td></tr>
<tr><td>ii</td><td>Dórico</td><td>{D}–{D}</td><td>1 2 ♭3 4 5 6 ♭7</td><td>Menor con 6 mayor</td></tr>
<tr><td>iii</td><td>Frigio</td><td>{E}–{E}</td><td>1 ♭2 ♭3 4 5 ♭6 ♭7</td><td>Menor con ♭2</td></tr>
<tr><td>IV</td><td>Lidio</td><td>{F}–{F}</td><td>1 2 3 ♯4 5 6 7</td><td>Mayor con ♯4</td></tr>
<tr><td>V</td><td>Mixolidio</td><td>{G}–{G}</td><td>1 2 3 4 5 6 ♭7</td><td>Mayor con ♭7</td></tr>
<tr><td>vi</td><td>Eólico</td><td>{A}–{A}</td><td>1 2 ♭3 4 5 ♭6 ♭7</td><td>La menor natural</td></tr>
<tr><td>vii</td><td>Locrio</td><td>{B}–{B}</td><td>1 ♭2 ♭3 4 ♭5 ♭6 ♭7</td><td>Menor con ♭2 y ♭5</td></tr></tbody></table>

<h2>Piensa en paralelo</h2>
<p>Hay dos maneras de pensar los modos. La <strong>derivada</strong> (“dórico son las notas de {C} desde {D}”) sirve para encontrarlos. La <strong>paralela</strong> sirve para tocarlos y oírlos: comparas cada modo con la escala mayor o menor <strong>de su misma tónica</strong> y te fijas en lo que cambia. {D} dórico es {D} menor natural con la sexta subida; {G} mixolidio es {G} mayor con la séptima bajada.</p>
<p>Esa nota diferente es la <strong>nota característica</strong>: la que hace que el modo suene a sí mismo y no a mayor o menor. Si no la tocas, nadie distinguirá el modo.</p>
${W.modes({ root: 'D', mode: 'dorian', caption: 'Elige tónica y modo. La nota característica está recuadrada y parpadea en el diapasón. Pulsa escuchar para oír el modo sobre un bordón de su tónica: es la mejor forma de captar su color.' })}

<h2>Del más luminoso al más oscuro</h2>
<p>Si ordenas los modos de una misma tónica de más brillante a más oscuro, cada uno se diferencia del siguiente en una sola nota que baja un semitono:</p>
<table><thead><tr><th>Modo</th><th>Respecto al anterior</th><th>Carácter</th></tr></thead><tbody>
<tr><td>Lidio</td><td>—</td><td>Flotante, soñador; muy de bandas sonoras</td></tr>
<tr><td>Jónico</td><td>♯4 → 4</td><td>Mayor “clásico”, resuelto</td></tr>
<tr><td>Mixolidio</td><td>7 → ♭7</td><td>Mayor con tierra: rock, blues, folk celta</td></tr>
<tr><td>Dórico</td><td>3 → ♭3</td><td>Menor con luz: funk, jazz modal, rock latino</td></tr>
<tr><td>Eólico</td><td>6 → ♭6</td><td>Menor melancólico: baladas, rock, pop</td></tr>
<tr><td>Frigio</td><td>2 → ♭2</td><td>Oscuro y tenso: flamenco, metal</td></tr>
<tr><td>Locrio</td><td>5 → ♭5</td><td>Inestable: su acorde de tónica es disminuido</td></tr></tbody></table>
${W.listen({ gap: 0.28, items: [{ label: '{C} lidio', notes: [48, 50, 52, 54, 55, 57, 59, 60] }, { label: '{C} jónico', notes: [48, 50, 52, 53, 55, 57, 59, 60] }, { label: '{C} mixolidio', notes: [48, 50, 52, 53, 55, 57, 58, 60] }, { label: '{C} dórico', notes: [48, 50, 51, 53, 55, 57, 58, 60] }, { label: '{C} eólico', notes: [48, 50, 51, 53, 55, 56, 58, 60] }, { label: '{C} frigio', notes: [48, 49, 51, 53, 55, 56, 58, 60] }] })}
<div class="callout"><span class="co-t">¿Y el locrio?</span>Su acorde de tónica es disminuido, con una quinta inestable, así que es muy difícil sentirlo como “casa”. Se usa sobre todo como escala sobre el acorde m7♭5, no como modo de una canción entera.</div>`,
        practice: [
          'Toca {D} dórico, {E} frigio, {F} lidio y {G} mixolidio con las notas de {C} mayor, en una sola cuerda, con un bordón de la tónica sonando.',
          'Toca los siete modos desde {A} en la misma posición del mástil (paralelos) y canta la nota característica de cada uno.',
          'Graba un acorde de {Am7} sostenido y toca encima {A} eólico y {A} dórico. Escucha qué cambia con el {F#}.',
        ],
        quiz: [
          { q: '¿Qué modo se obtiene tocando las notas de {C} mayor desde {G}?', o: ['Dórico', 'Lidio', 'Mixolidio', 'Eólico'], a: 2, why: 'El quinto grado da el modo mixolidio.' },
          { q: '¿En qué se diferencia el dórico de la menor natural?', o: ['Tiene ♭2', 'Tiene la 6 mayor', 'Tiene la 7 mayor', 'Tiene ♯4'], a: 1, why: '1 2 ♭3 4 5 6 ♭7: la sexta es mayor.' },
          { q: 'La nota característica del lidio es…', o: ['♭7', '♯4', '♭2', '6'], a: 1, why: 'Lidio = mayor con la cuarta aumentada.' },
          { q: '{E} frigio tiene las mismas notas que…', o: ['{E} mayor', '{C} mayor', '{G} mayor', '{A} mayor'], a: 1, why: 'Frigio es el tercer grado: {E} es el iii de {C}.' },
          { q: '¿Qué modo mayor es el más luminoso?', o: ['Jónico', 'Mixolidio', 'Lidio', 'Dórico'], a: 2, why: 'El lidio tiene la cuarta subida, la nota más alta posible en un modo mayor.' },
        ],
      },

      /* ---------------------------------------------------------- 4.2 */
      {
        id: 'modos-practica', title: 'Los modos en la práctica', time: '25 min',
        desc: 'Progresiones modales, cómo establecer un modo y qué escala usar sobre cada acorde.',
        lead: 'Tocar un modo no consiste en elegir una escala bonita: la armonía tiene que sostenerlo. Aquí verás las progresiones que hacen sonar cada modo y cómo elegir escala acorde por acorde.',
        goals: ['Reconocer y tocar las progresiones típicas de cada modo', 'Elegir el modo adecuado sobre un acorde según su contexto', 'Improvisar con dórico y mixolidio'],
        body: () => `
<h2>La armonía manda</h2>
<p>Si tocas {D} dórico sobre una progresión en {C} mayor, sigues estando en {C} mayor: el oído siente {C} como centro y tus notas son, simplemente, las de {C}. Para que suene <em>a dórico</em>, la base tiene que hacer de {D} el centro y destacar la nota característica. Por eso la música modal suele usar <strong>bases de uno o dos acordes</strong> (vamps) que se repiten, y evita las cadencias V → I que arrastrarían al oído a la tonalidad mayor.</p>

<h2>Una base para cada modo</h2>
<h3>Dórico: i – IV</h3>
<p>El acorde IV mayor contiene la sexta mayor del modo. Es el sonido de mucho funk, del jazz modal y de muchos solos de rock latino.</p>
${W.progression({ prog: ['i', 'IV'], key: 'A', minor: true, bpm: 96, bars: 2, pattern: 'D.DUD.DU', caption: '{Am} – {D}: el {F#} de {D} es la 6 mayor de {A} dórico. Improvisa con {A} dórico (las notas de {G} mayor).' })}
<h3>Mixolidio: I – ♭VII – IV</h3>
<p>El ♭VII mayor lleva la séptima menor del modo. Es una progresión omnipresente en el rock clásico y el folk.</p>
${W.progression({ prog: ['I', 'bVII', 'IV', 'I'], key: 'D', bpm: 104, pattern: 'D.DUD.DU', caption: '{D} – {C} – {G} – {D}. Improvisa con {D} mixolidio (las notas de {G} mayor) o con la pentatónica mayor de {D} añadiendo el {C}.' })}
<h3>Lidio: I – II</h3>
<p>Un acorde mayor un tono por encima de la tónica contiene el ♯4. Suena suspendido, como si flotara.</p>
${W.progression({ prog: ['I', 'II'], key: 'C', bpm: 76, bars: 2, pattern: 'AAAAAAAA', caption: '{C} – {D}: el {F#} de {D} es el ♯4 de {C} lidio.' })}
<h3>Frigio: i – ♭II</h3>
<p>Un semitono de distancia entre la tónica menor y un acorde mayor: el sonido del flamenco y de mucho metal.</p>
${W.progression({ prog: ['i', 'bII', 'i', 'bII'], key: 'E', minor: true, bpm: 100, pattern: 'D.DUD.DU', caption: '{Em} – {F}. En el flamenco, la tónica suele ser {E} mayor: es el “modo de {E}” o frigio dominante (frigio con la tercera mayor).' })}
<h3>Eólico: i – ♭VI – ♭VII</h3>
<p>La menor natural “pura”, sin la sensible de la armónica. La progresión épica del rock y de muchas bandas sonoras.</p>
${W.progression({ prog: ['i', 'bVI', 'bVII', 'i'], key: 'A', minor: true, bpm: 88, pattern: 'D.DUD.DU', caption: '{Am} – {F} – {G} – {Am}.' })}

<h2>Qué escala sobre qué acorde</h2>
<p>En la música tonal (con muchos acordes que cambian), los modos sirven de otra manera: <strong>cada acorde de la tonalidad tiene su modo</strong>, el que empieza en su fundamental con las notas de la tonalidad. En {C} mayor, sobre {Dm7} suenan las notas de {D} dórico; sobre {G7}, las de {G} mixolidio. Las notas son las mismas, pero pensar así te ayuda a saber qué notas del acorde tienes bajo los dedos.</p>
<table><thead><tr><th>Acorde</th><th>Primera opción</th><th>Otras opciones según el contexto</th></tr></thead><tbody>
<tr><td>maj7</td><td>Jónico</td><td>Lidio (si es IV o en contexto modal)</td></tr>
<tr><td>m7</td><td>Dórico</td><td>Eólico (si es vi), frigio (si es iii)</td></tr>
<tr><td>7</td><td>Mixolidio</td><td>Lidio dominante, alterada, disminuida (nivel 4.6)</td></tr>
<tr><td>m7♭5</td><td>Locrio</td><td>Locrio ♮2 (de la menor melódica)</td></tr></tbody></table>

<h2>En el mástil</h2>
<p>Una forma práctica de tocar los modos con lo que ya sabes: parte de la pentatónica y añade la nota característica.</p>
<ul>
<li><strong>Dórico</strong> = pentatónica menor + 2 + <strong>6</strong>.</li>
<li><strong>Eólico</strong> = pentatónica menor + 2 + <strong>♭6</strong>.</li>
<li><strong>Frigio</strong> = pentatónica menor + <strong>♭2</strong> + ♭6.</li>
<li><strong>Mixolidio</strong> = pentatónica mayor + 4 + <strong>♭7</strong>.</li>
<li><strong>Lidio</strong> = pentatónica mayor + <strong>♯4</strong> + 7.</li>
</ul>
${W.fretboard({ frets: [0, 12], show: { root: 'A', scale: 'dorian' }, label: 'interval', region: [4, 8], pick: { scales: ['dorian', 'aeolian', 'phrygian', 'mixolydian', 'lydian', 'ionian'] }, caption: 'Los modos sobre la caja de la pentatónica del traste 5. Compara dórico y eólico: solo cambia la sexta.' })}`,
        practice: [
          'Improvisa sobre la base dórica con la pentatónica de {A} menor. Después añade el {F#} y escucha cómo cambia el color.',
          'Sobre la base mixolidia, empieza y termina tus frases en {D} y usa el {C} en notas largas.',
          'Toca cada base modal y canta encima la nota característica. Cuando la canción “se oscurezca” o “se ilumine”, habrás oído el modo.',
        ],
        quiz: [
          { q: '¿Qué progresión sugiere el modo mixolidio?', o: ['i – IV', 'I – ♭VII – IV', 'I – II', 'i – ♭II'], a: 1, why: 'El ♭VII mayor aporta la séptima menor.' },
          { q: 'Sobre {Am} – {D} repetidos, ¿qué modo de {A} encaja?', o: ['Eólico', 'Dórico', 'Frigio', 'Locrio'], a: 1, why: 'El {F#} de {D} es la sexta mayor de {A}: dórico.' },
          { q: '¿Por qué la música modal evita la cadencia V → I?', o: ['Porque suena mal', 'Porque arrastra el oído hacia la tonalidad mayor y diluye el modo', 'Porque no existe en modos', 'Por tradición'], a: 1, why: 'La dominante con sensible impone la tonalidad mayor o menor.' },
          { q: 'En {C} mayor, ¿qué modo corresponde al acorde {G7}?', o: ['{G} jónico', '{G} mixolidio', '{G} dórico', '{G} lidio'], a: 1, why: 'Las notas de {C} desde {G}: mixolidio.' },
        ],
      },

      /* ---------------------------------------------------------- 4.3 */
      {
        id: 'extensiones', title: 'Extensiones, tensiones y voicings', time: '28 min',
        desc: 'Novenas, oncenas y trecenas, qué notas omitir y cómo tocar acordes ricos en la guitarra.',
        lead: 'Seguir apilando terceras más allá de la séptima añade color sin cambiar la función del acorde. El reto en la guitarra es que solo tienes seis cuerdas y cuatro dedos: hay que elegir qué notas tocar.',
        goals: ['Construir acordes de novena, oncena y trecena', 'Distinguir {Cadd9} de {C9}', 'Saber qué notas se pueden omitir', 'Tocar shell voicings y voicings de cuatro notas'],
        body: () => `
<h2>Más allá de la octava</h2>
<p>Después de la séptima, la siguiente tercera cae en la <strong>novena</strong>, que es la segunda una octava más alta. Después vienen la <strong>oncena</strong> (cuarta) y la <strong>trecena</strong> (sexta). Se llaman así, y no 2, 4 y 6, porque se entienden como notas añadidas <em>por encima</em> de un acorde de séptima.</p>
<table><thead><tr><th>Acorde</th><th>Fórmula</th><th>Desde {C}</th></tr></thead><tbody>
<tr><td>{Cmaj9}</td><td>1 3 5 7 9</td><td>{C} {E} {G} {B} {D}</td></tr>
<tr><td>{C9}</td><td>1 3 5 ♭7 9</td><td>{C} {E} {G} {Bb} {D}</td></tr>
<tr><td>{Cm9}</td><td>1 ♭3 5 ♭7 9</td><td>{C} {Eb} {G} {Bb} {D}</td></tr>
<tr><td>{Cm11}</td><td>1 ♭3 5 ♭7 9 11</td><td>{C} {Eb} {G} {Bb} {D} {F}</td></tr>
<tr><td>{C13}</td><td>1 3 5 ♭7 9 13</td><td>{C} {E} {G} {Bb} {D} {A}</td></tr>
<tr><td>{Cadd9}</td><td>1 3 5 9</td><td>{C} {E} {G} {D} (sin séptima)</td></tr>
<tr><td>{C6}</td><td>1 3 5 6</td><td>{C} {E} {G} {A}</td></tr>
<tr><td>{C6/9}</td><td>1 3 5 6 9</td><td>{C} {E} {G} {A} {D}</td></tr></tbody></table>
<div class="callout key"><span class="co-t">add9 no es 9</span>Un número solo (9, 11, 13) implica que el acorde tiene séptima: {C9} lleva {Bb}. Si quieres la novena sin séptima, se escribe <em>add9</em>. Y el 13 incluye normalmente la novena, pero en la guitarra casi nunca se tocan todas.</div>
${W.listen({ items: [{ label: '{C}', notes: [48, 52, 55, 60, 64], together: true }, { label: '{Cadd9}', notes: [48, 52, 55, 62, 64], together: true }, { label: '{Cmaj9}', notes: [48, 52, 59, 62], together: true }, { label: '{C9}', notes: [48, 52, 58, 62], together: true }, { label: '{C13}', notes: [48, 58, 64, 69], together: true }] })}

<h2>Qué notas omitir</h2>
<p>Un acorde de trecena tiene seis notas distintas; en la guitarra es imposible o sonaría embarrado. Se eligen según su importancia:</p>
<ol>
<li><strong>La tercera y la séptima</strong> son imprescindibles: definen si es mayor, menor o dominante.</li>
<li><strong>La extensión</strong> que da nombre al acorde (la 9, la 13…) también se toca: es su color.</li>
<li><strong>La quinta</strong> es la primera en desaparecer, salvo que esté alterada (♭5, ♯5).</li>
<li><strong>La fundamental</strong> también se puede omitir si hay un bajista: él ya la toca.</li>
<li>En acordes mayores y de dominante, la <strong>11 natural</strong> choca con la tercera (están a un semitono); se evita o se sube a ♯11.</li>
</ol>

<h2>Shell voicings</h2>
<p>La versión mínima de un acorde de séptima es su “esqueleto”: <strong>fundamental, tercera y séptima</strong>. Tres notas en tres cuerdas, con la fundamental en la 6 o en la 5. Suenan definidas, se mueven rápido y dejan sitio para añadir extensiones encima.</p>
${W.chords({ label: 'interval', items: [{ sym: 'Gmaj7', f: '3x44xx' }, { sym: 'G7', f: '3x34xx' }, { sym: 'Gm7', f: '3x33xx' }, { sym: 'Cmaj7', f: 'x324xx' }, { sym: 'C7', f: 'x323xx' }, { sym: 'Cm7', f: 'x313xx' }] })}

<h2>Voicings con extensiones</h2>
<p>A partir de los shells, añade la extensión en una cuerda aguda. Estas formas son de las más usadas en jazz, soul y neo-soul:</p>
${W.chords({ label: 'interval', items: [{ sym: 'Cmaj9', f: 'x3243x' }, { sym: 'C9', f: 'x3233x' }, { sym: 'Cm9', f: 'x3133x' }, { sym: 'C6/9', f: 'x3223x' }, { sym: 'G13', f: '3x345x' }, { sym: 'A13', f: '5x567x' }, { sym: 'Am11', f: '5x553x' }, { sym: 'E7#9', f: 'x7678x' }] })}
<p>Comparte dedos entre ellas: de {C9} a {C13} solo sube una nota, de {Cm9} a {Cm11} cambia otra. Pensar los voicings como pequeñas modificaciones de un esqueleto es mucho más eficaz que memorizar decenas de formas.</p>
${W.progression({ prog: [{ sym: 'Dm9', f: 'x5355x' }, { sym: 'G13', f: '3x345x' }, { sym: 'Cmaj9', f: 'x3243x' }, { sym: 'A13', f: '5x567x' }], bpm: 76, pattern: 'D..D....', swing: true, caption: 'ii – V – I – VI con extensiones. El ritmo, negra con puntillo y corchea, es el clásico “charleston” del acompañamiento de jazz.' })}
<p>Para explorar más voicings de cualquier acorde, usa el <a href="#/herramienta/acordes">diccionario de acordes</a>: muestra todas las formas cómodas por el mástil.</p>`,
        practice: [
          'Toca los seis shell voicings y pasa de maj7 a 7 y a m7 moviendo solo un dedo.',
          'Toca {Cmaj7} → {Cmaj9}, {C7} → {C9} → {C13} y escucha qué aporta cada extensión.',
          'Toca la progresión con extensiones a 70 ppm con el ritmo charleston.',
        ],
        quiz: [
          { q: 'La novena es la misma nota que…', o: ['La segunda, una octava más alta', 'La séptima', 'La cuarta', 'La sexta'], a: 0, why: '9 = 2 + 7: segunda una octava por encima.' },
          { q: '¿Qué diferencia hay entre {Cadd9} y {C9}?', o: ['Ninguna', '{C9} tiene séptima menor; {Cadd9}, no', '{Cadd9} tiene séptima', '{C9} no tiene tercera'], a: 1, why: 'El 9 implica la séptima; add9 la excluye.' },
          { q: '¿Qué nota es la primera candidata a omitir en un acorde extendido?', o: ['La tercera', 'La séptima', 'La quinta justa', 'La extensión'], a: 2, why: 'La quinta justa apenas aporta color; tercera y séptima definen el acorde.' },
          { q: '¿Qué notas forman un shell voicing de {G7}?', o: ['{G} {B} {D}', '{G} {B} {F}', '{G} {D} {F}', '{B} {D} {F}'], a: 1, why: 'Fundamental, tercera y séptima.' },
          { q: '¿Por qué se evita la 11 natural en un acorde mayor?', o: ['Porque no existe', 'Porque choca a un semitono con la tercera', 'Porque es la quinta', 'Porque es muy grave'], a: 1, why: '{F} contra {E} en {C}: semitono. Se usa ♯11.' },
        ],
      },

      /* ---------------------------------------------------------- 4.4 */
      {
        id: 'dominantes-secundarios', title: 'Dominantes secundarios', time: '25 min',
        desc: 'El V7 de otros acordes: cómo dar impulso a cualquier destino de la progresión.',
        lead: 'El V7 resuelve en el I. Pero cualquier acorde diatónico puede tener su propio V7 que lo prepare. Esa idea, el dominante secundario, explica casi todos los acordes “de fuera” que encontrarás en el pop, el jazz o la canción de autor.',
        goals: ['Construir el dominante secundario de cualquier acorde', 'Reconocerlos en una progresión', 'Encadenar dominantes por quintas'],
        body: () => `
<h2>El V de otro acorde</h2>
<p>En {C} mayor, {G7} es el V7 y resuelve en {C}. Si quieres dar ese mismo impulso a {Dm}, puedes tocar antes <em>su</em> dominante: el acorde de séptima que está una quinta por encima de {D}, que es {A7}. A {A7} se le llama <strong>V7 de ii</strong> (V7/ii).</p>
<table><thead><tr><th>Destino</th><th>En {C}</th><th>Su dominante</th><th>Nombre</th><th>Nota “de fuera”</th></tr></thead><tbody>
<tr><td>ii</td><td>{Dm}</td><td>{A7}</td><td>V7/ii</td><td>{C#}</td></tr>
<tr><td>iii</td><td>{Em}</td><td>{B7}</td><td>V7/iii</td><td>{D#}, {F#}</td></tr>
<tr><td>IV</td><td>{F}</td><td>{C7}</td><td>V7/IV</td><td>{Bb}</td></tr>
<tr><td>V</td><td>{G}</td><td>{D7}</td><td>V7/V</td><td>{F#}</td></tr>
<tr><td>vi</td><td>{Am}</td><td>{E7}</td><td>V7/vi</td><td>{G#}</td></tr></tbody></table>
<p>El vii° no tiene dominante secundario porque un acorde disminuido no funciona como tónica, ni siquiera de paso. Fíjate en la última columna: cada dominante secundario introduce una nota ajena a la tonalidad, casi siempre la <strong>sensible</strong> del acorde al que va. Esa nota es la que crea la atracción.</p>
${W.listen({ gap: 1.1, items: [{ label: '{C} {Dm} {G7} {C}', chords: ['C', 'Dm', 'G7', 'C'] }, { label: '{C} {A7} {Dm} {G7} {C}', chords: ['C', 'A7', 'Dm', 'G7', 'C'] }, { label: '{C} {E7} {Am} {F} {G}', chords: ['C', 'E7', 'Am', 'F', 'G'] }, { label: '{C} {C7} {F} {G7} {C}', chords: ['C', 'C7', 'F', 'G7', 'C'] }] })}

<h2>Cómo reconocerlos</h2>
<p>Cuando en una canción aparece un acorde mayor o de séptima que no pertenece a la tonalidad, pregúntate: <strong>¿el siguiente acorde está una quinta por debajo?</strong> Si es así, casi seguro es un dominante secundario. {E7} → {Am}, {D7} → {G}, {A7} → {Dm}. A veces el acorde aparece sin séptima ({E} en lugar de {E7}), pero la función es la misma.</p>
<p>En cifrado romano también se escriben por su grado: VI7 (= V7/ii), III7 (= V7/vi), II7 (= V7/V), I7 (= V7/IV).</p>

<h2>Progresiones típicas</h2>
${W.progression({ prog: ['I', 'VI7', 'ii', 'V7'], key: 'C', bpm: 92, pattern: 'D.DU.UDU', caption: 'I – VI7 – ii – V7: el {A7} prepara el {Dm}. Es la base de muchísimas canciones de los años 30 a 60.' })}
${W.progression({ prog: ['I', 'III7', 'vi', 'IV'], key: 'G', bpm: 84, pattern: 'D.DU.UDU', caption: 'I – III7 – vi – IV: el {B7} da un giro dramático antes del {Em}. Muy usado en pop y canción melódica.' })}
${W.progression({ prog: ['I', 'II7', 'IV', 'I'], key: 'D', bpm: 96, pattern: 'D.DUD.DU', caption: 'I – II7 – IV – I: el II7 suele aparecer así, sin resolver en el V. Es un color característico del pop y el folk.' })}

<h2>Cadenas de dominantes</h2>
<p>Un dominante secundario puede tener a su vez su propio dominante, y así sucesivamente, siguiendo el círculo de quintas. Cada acorde es la dominante del siguiente:</p>
${W.progression({ prog: ['III7', 'VI7', 'II7', 'V7', 'I', 'I'], key: 'C', bpm: 100, pattern: 'D.D.D.D.', caption: '{E7} – {A7} – {D7} – {G7} – {C}: la llamada progresión de ragtime. Cuatro dominantes seguidos, cada uno resolviendo en el siguiente.' })}
<div class="callout tip"><span class="co-t">Al improvisar</span>Sobre un dominante secundario, la nota clave es su tercera (la sensible del destino): {C#} sobre {A7}, {G#} sobre {E7}. Si la tocas justo en el cambio, la melodía “dibuja” la armonía. Sobre los dominantes que van a un acorde menor ({A7} → {Dm}, {E7} → {Am}) suena muy bien la escala menor armónica del destino, que verás en la lección 4.6.</div>`,
        practice: [
          'Escribe el dominante secundario de cada acorde diatónico de {G} mayor y tócalos resolviendo en su destino.',
          'Toca I – VI7 – ii – V7 en {C}, {G} y {F} usando el selector de tonalidad.',
          'Busca en un cancionero un acorde que no pertenezca a la tonalidad y comprueba si es un dominante secundario.',
        ],
        quiz: [
          { q: '¿Cuál es el V7/V en {C} mayor?', o: ['{G7}', '{D7}', '{A7}', '{C7}'], a: 1, why: 'El V de {C} es {G}; su dominante es {D7}.' },
          { q: '{E7} en la tonalidad de {C} suele resolver en…', o: ['{C}', '{F}', '{Am}', '{G}'], a: 2, why: '{E7} es V7/vi: resuelve en {Am}.' },
          { q: '¿Qué nota de fuera de la tonalidad introduce {A7} en {C}?', o: ['{Bb}', '{C#}', '{F#}', '{G#}'], a: 1, why: '{A7} = {A} {C#} {E} {G}. {C#} es la sensible de {D}.' },
          { q: '¿Por qué el vii° no tiene dominante secundario?', o: ['Porque es menor', 'Porque un acorde disminuido no funciona como tónica', 'Porque no tiene quinta', 'Sí lo tiene'], a: 1, why: 'Solo se tonicizan acordes que puedan sonar como centro (mayores o menores).' },
          { q: 'En la secuencia {E7} – {A7} – {D7} – {G7} – {C}, cada acorde es…', o: ['El IV del siguiente', 'El V del siguiente', 'El vi del siguiente', 'Un préstamo modal'], a: 1, why: 'Una cadena de dominantes por quintas descendentes.' },
        ],
      },

      /* ---------------------------------------------------------- 4.5 */
      {
        id: 'intercambio-modal', title: 'Intercambio modal', time: '22 min',
        desc: 'Tomar acordes prestados de la tonalidad homónima para cambiar el color.',
        lead: 'Una canción en {C} mayor puede usar de repente un {Fm}, un {Ab} o un {Bb}. No son errores ni modulaciones: son acordes prestados de {C} menor, uno de los recursos expresivos más potentes del pop, el rock y el cine.',
        goals: ['Entender qué es un acorde prestado', 'Usar iv, ♭VI, ♭VII y ♭III en una tonalidad mayor', 'Reconocer el efecto emocional de cada préstamo'],
        body: () => `
<h2>Dos tonalidades, una tónica</h2>
<p>{C} mayor y {C} menor comparten tónica. El <strong>intercambio modal</strong> consiste en tomar prestados acordes de la tonalidad homónima (o de otros modos de la misma tónica) sin abandonar la tonalidad principal. Así, en {C} mayor, puedes usar los acordes de {C} menor:</p>
${W.degrees({ key: 'C', scale: 'minor', caption: 'Los acordes de {C} menor. Los más prestados en {C} mayor son el iv ({Fm}), el ♭VI ({Ab}), el ♭VII ({Bb}) y el ♭III ({Eb}).' })}
<table><thead><tr><th>Préstamo</th><th>En {C}</th><th>Efecto típico</th></tr></thead><tbody>
<tr><td>iv</td><td>{Fm}</td><td>Nostalgia, melancolía; especialmente IV → iv → I</td></tr>
<tr><td>♭VI</td><td>{Ab}</td><td>Grandioso, cinematográfico</td></tr>
<tr><td>♭VII</td><td>{Bb}</td><td>Rockero, abierto (es el ♭VII del mixolidio)</td></tr>
<tr><td>♭III</td><td>{Eb}</td><td>Sorpresa luminosa y extraña</td></tr>
<tr><td>iiø7</td><td>{Dm7b5}</td><td>Subdominante oscurecida, muy de jazz y bolero</td></tr></tbody></table>

<h2>Escúchalos</h2>
${W.progression({ prog: ['I', 'IV', 'iv', 'I'], key: 'C', bpm: 72, pattern: 'D.DU.UDU', caption: 'IV → iv → I: el {F} se oscurece en {Fm} y el {Ab} baja a {G}, la quinta de {C}. Uno de los giros más emotivos que existen.' })}
${W.progression({ prog: ['I', 'bVI', 'bVII', 'I'], key: 'C', bpm: 92, pattern: 'D.DUD.DU', caption: '♭VI – ♭VII – I: un final heroico, muy de rock de estadio y de bandas sonoras de aventuras.' })}
${W.progression({ prog: ['I', 'bVII', 'IV', 'I'], key: 'A', bpm: 104, pattern: 'D.DUD.DU', caption: 'I – ♭VII – IV – I: el préstamo del mixolidio, columna vertebral del rock clásico.' })}
${W.progression({ prog: ['I', 'bIII', 'IV', 'I'], key: 'G', bpm: 88, pattern: 'D.DU.UDU', caption: 'I – ♭III – IV – I: el ♭III aparece como un rayo de luz inesperado.' })}

<h2>La tercera de picardía</h2>
<p>El préstamo también funciona al revés: una pieza en tonalidad menor que termina en el acorde mayor de su tónica. Es la <strong>tercera de picardía</strong>, muy usada en el Barroco y todavía hoy como final luminoso.</p>
${W.listen({ gap: 1.2, items: [{ label: '{Am} {Dm} {E7} {Am}', chords: ['Am', 'Dm', 'E7', 'Am'] }, { label: '{Am} {Dm} {E7} {A}', chords: ['Am', 'Dm', 'E7', 'A'] }] })}

<h2>Y la melodía</h2>
<p>Cuando toques sobre un acorde prestado, la melodía debe adaptarse: sobre {Fm} en {C} mayor, el {A} de la escala choca con el {Ab} del acorde. Usa {Ab}. En la práctica, sobre los préstamos de {C} menor puedes pensar en la escala de {C} menor (o en el modo del que venga el acorde), y volver a {C} mayor en cuanto vuelvan los acordes diatónicos.</p>`,
        practice: [
          'Toca IV – iv – I en {G} ({C} – {Cm} – {G}) y en {D} ({G} – {Gm} – {D}). Escucha la nota que baja en cada caso.',
          'Coge una progresión que conozcas en mayor y sustituye un IV por un iv o un V por un ♭VII. Anota qué sensación produce.',
          'Improvisa sobre I – ♭VI – ♭VII – I en {C}: usa {C} mayor sobre {C} y {C} menor sobre {Ab} y {Bb}.',
        ],
        quiz: [
          { q: 'En {G} mayor, el iv prestado es…', o: ['{C}', '{Cm}', '{Am}', '{Dm}'], a: 1, why: 'El IV de {G} es {C}; el iv prestado de {G} menor es {Cm}.' },
          { q: 'El intercambio modal toma acordes de…', o: ['La tonalidad relativa', 'La tonalidad homónima (misma tónica)', 'La dominante', 'Cualquier tonalidad'], a: 1, why: 'Tonalidades o modos con la misma tónica.' },
          { q: 'En {C} mayor, ¿qué acorde es el ♭VII prestado?', o: ['{B}', '{Bdim}', '{Bb}', '{Bbm}'], a: 2, why: 'Un tono por debajo de {C}: {Bb} mayor.' },
          { q: 'Terminar una pieza menor en el acorde mayor de la tónica se llama…', o: ['Cadencia rota', 'Tercera de picardía', 'Semicadencia', 'Modulación'], a: 1, why: 'Picardy third, tercera de picardía.' },
        ],
      },

      /* ---------------------------------------------------------- 4.6 */
      {
        id: 'tension-dominante', title: 'Sustitución tritonal y dominantes alterados', time: '30 min',
        desc: 'El ♭II7, las tensiones alteradas, los acordes disminuidos y las escalas simétricas.',
        lead: 'El acorde de dominante es el más flexible de la armonía: admite sustitutos, notas alteradas y escalas muy distintas, siempre que conserve su tritono. Aquí está el arsenal de tensión del jazz.',
        goals: ['Aplicar la sustitución tritonal', 'Construir y usar dominantes con ♭9, ♯9, ♯11 y ♭13', 'Usar la escala alterada, la disminuida y la de tonos enteros', 'Aprovechar la simetría del acorde dim7'],
        body: () => `
<h2>La sustitución tritonal</h2>
<p>{G7} tiene un tritono entre {B} y {F}. {Db7} tiene un tritono entre {F} y {Cb} ({Cb} = {B}). <strong>Es el mismo tritono</strong>. Como esas dos notas son las que crean la tensión, {Db7} puede sustituir a {G7} y resolver igual en {C}. Los dos acordes están a un tritono de distancia; de ahí el nombre.</p>
${W.listen({ gap: 1.2, items: [{ label: '{Dm7} {G7} {Cmaj7}', chords: ['Dm7', 'G7', 'Cmaj7'] }, { label: '{Dm7} {Db7} {Cmaj7}', chords: ['Dm7', 'Db7', 'Cmaj7'] }] })}
<p>Con el sustituto, el bajo baja por semitonos ({D} – {Db} – {C}), un movimiento suave y muy elegante. Cualquier dominante, incluidos los secundarios, se puede sustituir así: {A7} → {Eb7}, {D7} → {Ab7}.</p>

<h2>Tensiones alteradas</h2>
<p>Sobre un dominante, las extensiones se pueden alterar para aumentar la tensión antes de resolver:</p>
<table><thead><tr><th>Tensión</th><th>Sobre {G7}</th><th>Uso</th></tr></thead><tbody>
<tr><td>♭9</td><td>{Ab}</td><td>Dominante que va a un acorde menor (V7♭9 → i)</td></tr>
<tr><td>♯9</td><td>{A#}</td><td>Funk, blues-rock; choca con la tercera mayor</td></tr>
<tr><td>♯11 (♭5)</td><td>{C#}</td><td>Color lidio dominante; también sustitución tritonal</td></tr>
<tr><td>♭13 (♯5)</td><td>{Eb}</td><td>Oscuro, tira hacia la tercera del acorde de llegada</td></tr></tbody></table>
<p>Un “7alt” significa: dominante con tensiones alteradas, a elección del músico (♭9, ♯9, ♭5, ♯5). Nunca lleva 9, 11 ni 13 naturales.</p>
${W.chords({ label: 'interval', items: [{ sym: 'G7b9', f: '3x3434' }, { sym: 'G7#9', f: '3x3436' }, { sym: 'E7#9', f: 'x7678x' }, { sym: 'G7b13', f: '3x344x' }, { sym: 'C7#11', f: 'x3435x' }] })}

<h2>Las escalas de la tensión</h2>
<p>Cada tipo de dominante alterado tiene una escala que contiene sus tensiones:</p>
${W.scale({ root: 'G', scale: 'altered', scales: ['mixolydian', 'phrygianDominant', 'lydianDominant', 'altered', 'dimHW', 'wholeTone'], frets: [0, 15], steps: true, caption: 'Compara las escalas para un mismo dominante ({G7}): mixolidia (sin alterar), frigio dominante (♭9 ♭13), lidio dominante (♯11), alterada (todas), disminuida semitono-tono (♭9 ♯9 ♯11 13) y tonos enteros (9 ♯11 ♭13).' })}
<ul>
<li><strong>Frigio dominante</strong> (5.º modo de la menor armónica): el sonido de V7♭9 → i. En {A} menor, sobre {E7}.</li>
<li><strong>Lidio dominante</strong> (4.º modo de la menor melódica): 7 con ♯11, sin tensión fuerte. También sobre el sustituto tritonal.</li>
<li><strong>Alterada</strong> (7.º modo de la menor melódica): ♭9, ♯9, ♭5, ♭13. Máxima tensión. Truco: la alterada de {G} son las notas de {Ab} menor melódica.</li>
<li><strong>Disminuida semitono-tono</strong>: simétrica, alterna semitono y tono. Encaja con 7♭9 y 13♭9.</li>
<li><strong>Tonos enteros</strong>: seis notas a un tono cada una. Suena a sueño o a misterio; va con 7♯5.</li>
</ul>

<h2>El acorde disminuido, un acorde simétrico</h2>
<p>El dim7 divide la octava en cuatro terceras menores iguales. Por eso <strong>sus cuatro inversiones son el mismo acorde</strong> y la misma forma se repite cada tres trastes: {Cdim7}, {Ebdim7}, {F#dim7} y {Adim7} tienen las mismas cuatro notas.</p>
${W.chords({ label: 'interval', items: [{ sym: 'Cdim7', f: 'x,x,1,2,1,2', caption: 'Trastes 1-2' }, { sym: 'Cdim7', f: 'x,x,4,5,4,5', caption: 'Trastes 4-5' }, { sym: 'Cdim7', f: 'x,x,7,8,7,8', caption: 'Trastes 7-8' }, { sym: 'Cdim7', f: 'x,x,10,11,10,11', caption: 'Trastes 10-11' }] })}
<p>Además, un dim7 es un dominante 7♭9 sin fundamental: {Bdim7} ({B} {D} {F} {Ab}) son las notas de {G7b9} sin el {G}. Y el dim7 de paso es un recurso clásico para unir dos acordes por semitonos:</p>
${W.progression({ prog: ['Cmaj7', { sym: 'C#dim7', f: 'x4535x' }, 'Dm7', { sym: 'D#dim7', f: 'x,x,1,2,1,2' }, 'Em7', 'A7', 'Dm7', 'G7'], bpm: 96, pattern: 'D.D.D.D.', caption: '{C} – {C#dim7} – {Dm7} – {D#dim7} – {Em7}: los disminuidos de paso hacen subir el bajo por semitonos.' })}`,
        practice: [
          'Toca ii – V – I en {C} con {G7} y luego con {Db7}. Haz lo mismo en {F} ({Gm7} – {C7}/{Gb7} – {Fmaj7}).',
          'Toca la forma de dim7 en los cuatro sitios del mástil y comprueba que suena igual.',
          'Sobre un {E7} que resuelve en {Am}, improvisa con la escala frigia dominante de {E} (notas de {A} menor armónica).',
        ],
        quiz: [
          { q: '¿Cuál es el sustituto tritonal de {G7}?', o: ['{C7}', '{Db7}', '{D7}', '{F#7}'], a: 1, why: 'A un tritono de {G}: {Db}. Comparten el tritono {B}/{F}.' },
          { q: '¿Qué tienen en común {G7} y su sustituto tritonal?', o: ['La fundamental', 'La tercera y la séptima (el tritono)', 'La quinta', 'Nada'], a: 1, why: 'La tercera de uno es la séptima del otro.' },
          { q: '¿Cuántos acordes dim7 distintos existen?', o: ['12', '6', '4', '3'], a: 3, why: 'Por simetría, solo tres conjuntos de notas distintos: cada uno tiene cuatro nombres.' },
          { q: 'La escala alterada contiene, respecto a la fundamental…', o: ['9, 11, 13 naturales', '♭9, ♯9, ♭5 (♯11) y ♭13', 'Solo la ♭7', 'Una 7 mayor'], a: 1, why: 'Todas las tensiones alteradas posibles.' },
          { q: 'Un dim7 sin más contexto es equivalente a…', o: ['Un maj7', 'Un dominante 7♭9 sin fundamental', 'Un m7', 'Un sus4'], a: 1, why: '{Bdim7} = {G7b9} sin {G}.' },
        ],
      },

      /* ---------------------------------------------------------- 4.7 */
      {
        id: 'ii-v-i', title: 'El ii–V–I y el lenguaje del jazz', time: '28 min',
        desc: 'La progresión más importante del jazz, en mayor y en menor, con notas guía y voicings.',
        lead: 'La mayoría de los estándares de jazz son cadenas de ii–V–I por distintas tonalidades. Dominarla en mayor y menor, con voicings fluidos y oído para las notas guía, es la llave de todo ese repertorio.',
        goals: ['Tocar ii–V–I mayor y menor en cualquier tonalidad', 'Seguir las notas guía (terceras y séptimas)', 'Acompañar con voicings y ritmo de jazz'],
        body: () => `
<h2>En mayor y en menor</h2>
<table><thead><tr><th></th><th>ii</th><th>V</th><th>I</th></tr></thead><tbody>
<tr><td>Mayor ({C})</td><td>{Dm7}</td><td>{G7}</td><td>{Cmaj7}</td></tr>
<tr><td>Menor ({C} menor)</td><td>{Dm7b5}</td><td>{G7b9}</td><td>{Cm7} o {Cm6}</td></tr></tbody></table>
<p>En mayor, todo es diatónico. En menor, el ii es semidisminuido (de la escala menor) y el V lleva la ♭9 de la menor armónica. El acorde de llegada puede ser m7, m6 o m(maj7) según la melodía.</p>
${W.listen({ gap: 1.3, items: [{ label: 'ii–V–I mayor', chords: ['Dm7', 'G7', 'Cmaj7'] }, { label: 'ii–V–i menor', chords: ['Bm7b5', 'E7', 'Am7'] }] })}

<h2>Notas guía</h2>
<p>Las <strong>notas guía</strong> son la tercera y la séptima de cada acorde: las que definen su calidad. En un ii–V–I se mueven de forma muy suave: la séptima de cada acorde baja un semitono hasta la tercera del siguiente, y la tercera se queda como séptima.</p>
${W.score({ notes: 'h:F4+C5@Dm7 h:F4+B4@G7 | w:E4+B4@Cmaj7 | h:F4+C5@Dm7 h:F4+B4@G7 | w:E4+B4@Cmaj7', mode: 'full', position: 3, bpm: 72, caption: '{Dm7} ({F}, {C}) → {G7} ({F}, {B}) → {Cmaj7} ({E}, {B}). La voz de arriba baja {C}→{B}; la de abajo se queda en {F} y baja a {E}. Dos notas bastan para que se oiga la progresión entera.' })}
<p>Esto tiene dos aplicaciones inmediatas: los <strong>voicings</strong> (si las terceras y séptimas se mueven poco, los acordes se enlazan sin saltos) y la <strong>improvisación</strong> (tocar esas notas en los cambios hace que la melodía “cante” la armonía).</p>

<h2>Voicings para el ii–V–I</h2>
<p>Alternando fundamental en la cuerda 5 y en la 6 los acordes quedan en la misma zona del mástil. Primero con shells y después con voicings de cuatro notas:</p>
${W.progression({ prog: [{ sym: 'Dm7', f: 'x5x56x' }, { sym: 'G7', f: '3x34xx' }, { sym: 'Cmaj7', f: 'x3x45x' }, { sym: 'Cmaj7', f: 'x3x45x' }], bpm: 100, pattern: 'D.D.D.D.', swing: true, caption: 'Shells: fundamental + séptima + tercera. Toca una negra por pulso, cortas, como un guitarrista de big band.' })}
${W.progression({ prog: [{ sym: 'Dm9', f: 'x5355x' }, { sym: 'G13', f: '3x345x' }, { sym: 'Cmaj9', f: 'x3243x' }, { sym: 'Cmaj9', f: 'x3243x' }], bpm: 100, pattern: 'D..D....', swing: true, caption: 'Con extensiones y el ritmo charleston (pulso 1 y la “y” del 2).' })}
<h3>En menor</h3>
${W.progression({ prog: [{ sym: 'Bm7b5', f: 'x2323x' }, { sym: 'E7b9', f: '0,x,0,1,0,1' }, { sym: 'Am7', f: '5x555x' }, { sym: 'Am6', f: '5x455x' }], bpm: 92, pattern: 'D..D....', swing: true, caption: '{Bm7b5} – {E7b9} – {Am7} – {Am6}.' })}

<h2>Practicarlo en todas las tonalidades</h2>
<p>Los estándares encadenan ii–V–I que bajan por tonos o siguen el círculo de quintas. Dos ejercicios clásicos:</p>
<ul>
<li><strong>Bajando por tonos</strong>: {Dm7} {G7} {Cmaj7} → {Cm7} {F7} {Bbmaj7} → {Bbm7} {Eb7} {Abmaj7}… Las formas son las mismas, dos trastes más abajo cada vez.</li>
<li><strong>Por el círculo</strong>: el I de cada ii–V–I se convierte en el ii del siguiente cambiando su calidad ({Cmaj7} → {Cm7} – {F7} – {Bbmaj7}).</li>
</ul>
${W.progression({ prog: [{ sym: 'Dm7', f: 'x5x56x' }, { sym: 'G7', f: '3x34xx' }, { sym: 'Cmaj7', f: 'x3x45x' }, { sym: 'Cm7', f: 'x3x34x' }, { sym: 'F7', f: '1x12xx' }, { sym: 'Bbmaj7', f: 'x1x23x' }, { sym: 'Bbm7', f: 'x1x12x' }, { sym: 'Eb7', f: 'x6x68x' }], bpm: 112, pattern: 'D.D.D.D.', swing: true, caption: 'ii–V–I que bajan un tono. Fíjate en que cada forma se repite dos trastes más abajo.' })}

<h2>El turnaround</h2>
<p>El final de muchos estándares (y de muchas canciones pop) es un <strong>turnaround</strong>: I – VI7 – ii – V7, que devuelve al principio. Con lo que sabes, el VI7 es el V7/ii. También se toca I – ♭III7 – ♭VI7 – ♭II7, sustituyendo cada dominante por su tritonal.</p>
${W.progression({ prog: ['Imaj7', 'VI7', 'ii7', 'V7'], key: 'F', bpm: 108, pattern: 'D.D.D.D.', swing: true })}`,
        practice: [
          'Toca ii–V–I en {C}, {F}, {Bb} y {Eb} con shells. Después con voicings de cuatro notas.',
          'Toca solo las notas guía (tercera y séptima) de un ii–V–I en las cuerdas 3 y 2. Canta la línea de arriba.',
          'Toca el ejercicio de ii–V–I que bajan por tonos con metrónomo en 2 y 4 a 100 ppm.',
        ],
        quiz: [
          { q: '¿Cuál es el ii–V–I de {F} mayor?', o: ['{Gm7} {C7} {Fmaj7}', '{Gm7} {C7} {F7}', '{G7} {C7} {Fmaj7}', '{Dm7} {G7} {Cmaj7}'], a: 0, why: 'ii de {F} = {Gm7}, V = {C7}, I = {Fmaj7}.' },
          { q: 'En un ii–V–i menor, el ii es…', o: ['m7', 'maj7', 'm7♭5', 'dim7'], a: 2, why: 'El segundo grado de la menor es semidisminuido.' },
          { q: '¿Qué son las notas guía?', o: ['La fundamental y la quinta', 'La tercera y la séptima', 'Las notas de la melodía', 'Las extensiones'], a: 1, why: 'Definen la calidad del acorde y se enlazan por semitonos o notas comunes.' },
          { q: 'En {Dm7} → {G7}, la séptima de {Dm7} ({C}) se mueve a…', o: ['{D}', '{B}, la tercera de {G7}', '{G}', '{F}'], a: 1, why: 'Baja un semitono: {C} → {B}.' },
        ],
      },

      /* ---------------------------------------------------------- 4.8 */
      {
        id: 'improvisar-cambios', title: 'Improvisar sobre los cambios', time: '30 min',
        desc: 'Notas del acorde, notas objetivo, aproximaciones cromáticas y desarrollo de motivos.',
        lead: 'Con una escala para toda la canción puedes sonar correcto. Siguiendo los acordes nota a nota suenas a alguien que entiende la armonía. Esta lección te da las herramientas para hacerlo.',
        goals: ['Apuntar a notas del acorde en los tiempos fuertes', 'Usar aproximaciones cromáticas y encierros', 'Construir frases desarrollando un motivo'],
        body: () => `
<h2>De la escala al acorde</h2>
<p>Sobre una progresión, no todas las notas de la escala pesan lo mismo. Las <strong>notas del acorde</strong> (1, 3, 5, 7) suenan estables; las demás, de paso. La regla de oro del improvisador:</p>
<div class="callout key"><span class="co-t">Notas del acorde en los tiempos fuertes</span>Coloca notas del acorde en los pulsos (sobre todo en el 1 y en el 3) y usa las demás notas para moverte entre ellas en los contratiempos. Si además aterrizas en la tercera o la séptima justo en el cambio de acorde, la armonía se oirá aunque toques solo.</div>
${W.chordtones({ prog: ['Dm7', 'G7', 'Cmaj7', 'A7'], bpm: 72, frets: [0, 12], region: [4, 8], caption: 'Las notas de cada acorde en la zona del traste 5. Toca la base y busca un camino que pase por las notas iluminadas en cada cambio.' })}

<h2>Notas objetivo y aproximaciones</h2>
<p>Elige una nota del acorde siguiente como <strong>objetivo</strong> y llega a ella en el pulso del cambio. Para llegar con estilo:</p>
<ul>
<li><strong>Aproximación cromática</strong>: la nota un semitono por debajo, en el contratiempo anterior. Es el sonido del bebop.</li>
<li><strong>Aproximación diatónica</strong>: la nota de la escala por encima.</li>
<li><strong>Encierro</strong>: una nota por encima y otra por debajo, y después el objetivo.</li>
</ul>
${W.score({ notes: 'e:F4@Dm7 e:A4 e:C5 e:E5 q:D5 e:C5 e:A4 | e:B4@G7 e:D5 e:F5 e:A5 q:G5 e:F5 e:D#5 | h.:E5@Cmaj7 e:D5 e:C5 | w:B4', mode: 'full', position: 7, bpm: 84, swing: true, caption: 'Arpegio de {Dm7} subiendo, arpegio de {G7}, y un encierro ({F} por arriba, {D#} por abajo) que aterriza en {E}, la tercera de {Cmaj7}.' })}

<h2>Líneas de notas guía</h2>
<p>Un ejercicio que transforma tu forma de tocar: improvisa usando <strong>solo las terceras y séptimas</strong> de cada acorde, moviéndote siempre a la más cercana. Después, rellena con notas de paso. La línea guía sigue debajo de tu frase como un esqueleto, y la armonía se oye siempre.</p>

<h2>Piensa en motivos, no en escalas</h2>
<p>Las improvisaciones memorables no son ristras de notas, sino ideas cortas que se desarrollan. Toma un <strong>motivo</strong> de tres o cuatro notas y trabájalo:</p>
<ul>
<li><strong>Repetición</strong>: tócalo dos veces. El oyente lo reconoce y lo espera.</li>
<li><strong>Secuencia</strong>: repítelo empezando en otra nota de la escala o del acorde siguiente.</li>
<li><strong>Variación rítmica</strong>: mismas notas, otro ritmo, o desplazado medio pulso.</li>
<li><strong>Pregunta y respuesta</strong>: una frase que sube y queda abierta, otra que baja y cierra en una nota del acorde.</li>
</ul>
${W.score({ notes: 'e:E5@Am7 e:D5 q:C5 q:A4 q:r | e:F5@Dm7 e:E5 q:D5 q:A4 q:r | e:D5@G7 e:C5 q:B4 q:G4 q:r | e:E5@Cmaj7 e:D5 h.:E5', mode: 'full', position: 7, bpm: 84, swing: true, caption: 'Un mismo motivo (dos corcheas que bajan y dos negras) en secuencia sobre {Am7} – {Dm7} – {G7} – {Cmaj7}, adaptado a las notas de cada acorde.' })}

<h2>Un método de estudio</h2>
<ol>
<li>Toca los arpegios de cada acorde de la progresión en una sola posición.</li>
<li>Improvisa usando solo notas del acorde, en negras.</li>
<li>Añade aproximaciones cromáticas antes de cada nota del acorde.</li>
<li>Pasa a corcheas, con notas del acorde en los pulsos.</li>
<li>Olvida todo lo anterior y toca melodías. Lo aprendido aparecerá solo.</li>
</ol>`,
        practice: [
          'Sobre la base de arriba, toca solo notas del acorde en negras durante cuatro vueltas.',
          'Toca cada objetivo (la tercera del acorde siguiente) precedido de una aproximación cromática desde abajo.',
          'Inventa un motivo de tres notas y llévalo en secuencia por los cuatro acordes.',
        ],
        quiz: [
          { q: '¿Dónde conviene colocar las notas del acorde al improvisar?', o: ['En los contratiempos', 'En los tiempos fuertes', 'Solo al final', 'En ningún sitio concreto'], a: 1, why: 'Los tiempos fuertes son donde el oído comprueba la armonía.' },
          { q: 'Una aproximación cromática a {E} desde abajo es…', o: ['{F}', '{D#}', '{D}', '{G}'], a: 1, why: 'Un semitono por debajo del objetivo.' },
          { q: '¿Qué es un encierro?', o: ['Repetir una nota', 'Rodear el objetivo con una nota por encima y otra por debajo', 'Tocar en una sola cuerda', 'Un tipo de bend'], a: 1, why: 'Arriba, abajo y aterrizaje en el objetivo.' },
          { q: 'Repetir un motivo empezando en otra nota se llama…', o: ['Secuencia', 'Inversión', 'Cadencia', 'Modulación'], a: 0, why: 'La secuencia mantiene la forma del motivo a otra altura.' },
        ],
      },

      /* ---------------------------------------------------------- 4.9 */
      {
        id: 'modulacion', title: 'Modulación y rearmonización', time: '25 min',
        desc: 'Cambiar de tonalidad con naturalidad y dar nuevos acordes a una melodía.',
        lead: 'Modular es cambiar de centro tonal dentro de una pieza; rearmonizar es cambiar los acordes que acompañan a una melodía. Las dos técnicas usan todo lo que has aprendido y son las que más transforman una canción.',
        goals: ['Modular con acorde pivote, por dominante y de forma directa', 'Sustituir acordes manteniendo la función', 'Rearmonizar una progresión sencilla con recursos de este nivel'],
        body: () => `
<h2>Modular</h2>
<p>Una <strong>modulación</strong> es un cambio de tónica que se mantiene durante un tiempo. Si solo dura un acorde o dos, es una tonicización (lo que hace un dominante secundario). Las formas más comunes de modular:</p>
<h3>Con acorde pivote</h3>
<p>Un acorde que pertenece a las dos tonalidades sirve de puente. {Am} es vi en {C} y ii en {G}: si después de {Am} vas a {D7} y a {G}, el oído reinterpreta {Am} y acepta {G} como nueva casa.</p>
${W.progression({ prog: ['C', 'F', 'Am', 'D7', 'G', 'C', 'D7', 'G'], bpm: 96, pattern: 'D.DU.UDU', caption: '{C} – {F} – {Am} (pivote: vi de {C} = ii de {G}) – {D7} – {G}. A partir de ahí, {C} ya suena como IV de {G}.' })}
<h3>Por dominante</h3>
<p>Basta con tocar el V7 (o el ii–V) de la nueva tonalidad. Es lo más directo y funciona hacia cualquier tono.</p>
<h3>Directa</h3>
<p>Se salta a la nueva tonalidad sin preparación. La más famosa es la del último estribillo que sube un semitono o un tono para dar un empujón de energía.</p>
${W.listen({ gap: 0.9, items: [{ label: 'Estribillo en {C} y salto a {D}', chords: ['C', 'G', 'Am', 'F', 'D', 'A', 'Bm', 'G'] }, { label: 'Preparado con dominante ({A7})', chords: ['C', 'G', 'F', 'A7', 'D', 'A', 'Bm', 'G'] }] })}
<h3>A tonalidades cercanas</h3>
<p>Las modulaciones más suaves van a las vecinas del círculo de quintas (dominante, subdominante) y a la relativa: comparten casi todas las notas. Las más llamativas van a tonalidades lejanas o a la homónima (de {C} mayor a {C} menor).</p>

<h2>Rearmonizar</h2>
<p>Rearmonizar es cambiar los acordes de una melodía sin cambiar la melodía. Se basa en que cada nota de la melodía puede pertenecer a varios acordes. Las herramientas, de más suave a más atrevida:</p>
<ol>
<li><strong>Sustitución diatónica</strong>: cambiar un acorde por otro de su misma función. I ↔ vi ↔ iii; IV ↔ ii.</li>
<li><strong>Añadir séptimas y extensiones</strong> que respeten la melodía.</li>
<li><strong>Preparar con dominantes secundarios</strong> o con ii–V cada acorde importante.</li>
<li><strong>Sustitución tritonal</strong> de esos dominantes.</li>
<li><strong>Disminuidos de paso</strong> entre acordes a un tono de distancia.</li>
<li><strong>Préstamos modales</strong> (iv, ♭VI, ♭VII) para cambiar el color emocional.</li>
<li><strong>ii–V “de la puerta de atrás”</strong>: iv7 – ♭VII7 – I ({Fm7} – {Bb7} – {C}), un final suave muy de soul y de baladas.</li>
</ol>
${W.listen({ gap: 1.1, items: [{ label: 'Original: {C} {C} {F} {G} {C}', chords: ['C', 'C', 'F', 'G', 'C'] }, { label: 'Rearmonizada', chords: ['Cmaj7', 'A7', 'Dm7', 'Db7', 'Cmaj7'] }, { label: 'Con préstamo y puerta de atrás', chords: ['Cmaj7', 'Em7', 'Fmaj7', 'Fm7', 'Bb7', 'Cmaj7'] }] })}
<div class="callout warn"><span class="co-t">Con mesura</span>Rearmonizar todo, todo el rato, satura. Las rearmonizaciones que funcionan suelen afectar a momentos concretos: el final de una frase, la repetición de una estrofa, la vuelta al estribillo. Pruébalas siempre cantando o tocando la melodía encima: si una nota choca con el nuevo acorde, cambia el acorde.</div>`,
        practice: [
          'Toca la modulación de {C} a {G} con pivote. Después escribe una propia de {G} a {D} (pivote: {Em}, ii de {D}).',
          'Toca una canción sencilla que conozcas y haz que el último estribillo suba un tono. Prueba a prepararlo con el V7 de la nueva tonalidad.',
          'Rearmoniza {C} – {Am} – {F} – {G} con séptimas, un dominante secundario y una sustitución tritonal.',
        ],
        quiz: [
          { q: '¿Qué acorde puede servir de pivote entre {C} y {G}?', o: ['{F}', '{Am}', '{Bb}', '{Db}'], a: 1, why: '{Am} pertenece a las dos (vi de {C}, ii de {G}). {F} no está en {G}.' },
          { q: 'Una tonicización se diferencia de una modulación en que…', o: ['Es más larga', 'Es momentánea, uno o dos acordes', 'Cambia el compás', 'Solo ocurre en menor'], a: 1, why: 'El nuevo centro no se establece de forma duradera.' },
          { q: 'Sustituir un I por un vi es una sustitución…', o: ['Tritonal', 'Diatónica (misma función)', 'Modal', 'Cromática'], a: 1, why: 'Ambos son acordes de tónica y comparten dos notas.' },
          { q: 'El ii–V “de la puerta de atrás” en {C} es…', o: ['{Dm7} – {G7}', '{Fm7} – {Bb7}', '{Em7} – {A7}', '{Db7} – {C}'], a: 1, why: 'iv7 – ♭VII7 – I.' },
        ],
      },

      /* ---------------------------------------------------------- 4.10 */
      {
        id: 'ritmo-avanzado', title: 'Ritmo avanzado', time: '25 min',
        desc: 'Compases de amalgama, hemiolas, notas fantasma y desplazamiento rítmico.',
        lead: 'El último nivel del ritmo: compases irregulares, polirritmos que juegan con el dos contra tres, el groove de las semicorcheas apagadas y la capacidad de colocar una frase en cualquier parte del compás.',
        goals: ['Contar y tocar en 5/4 y 7/8', 'Sentir la hemiola (tres contra dos)', 'Usar notas fantasma en rasgueos de semicorcheas', 'Desplazar un motivo dentro del compás'],
        body: () => `
<h2>Compases irregulares</h2>
<p>Un compás como 5/4 o 7/8 no se divide en partes iguales: se siente como una suma de grupos de dos y de tres. Por eso también se llaman compases de <strong>amalgama</strong>.</p>
<ul>
<li><strong>5/4</strong>: normalmente 3 + 2 (UNO dos tres CUATRO cinco) o 2 + 3.</li>
<li><strong>7/8</strong>: 2 + 2 + 3, 3 + 2 + 2 o 2 + 3 + 2. Es frecuente en la música de los Balcanes, en el rock progresivo y en el flamenco contemporáneo.</li>
</ul>
<p>El truco para tocarlos es contar los grupos, no las corcheas sueltas: “1-2, 1-2, 1-2-3”.</p>
${W.score({ notes: 'q:D q:D q:D q:D q:D | q.:D e:U q:D h:D', time: [5, 4], mode: 'rhythm', chord: 'Am', counts: true, bpm: 96, caption: '5/4 agrupado 3 + 2: acentúa el 1 y el 4.' })}
${W.trainer({ tool: 'metronomo', state: { bpm: 90, meter: '7/8' } })}

<h2>La hemiola: tres contra dos</h2>
<p>Seis corcheas se pueden agrupar de dos formas: dos grupos de tres (6/8) o tres grupos de dos (3/4). Alternar o superponer las dos agrupaciones crea la <strong>hemiola</strong>, un balanceo típico de la música latinoamericana, el flamenco y el Barroco.</p>
${W.score({ notes: 'q.:D q.:D | q:D q:D q:D | q.:D q.:D | q:D q:D q:D', time: [6, 8], mode: 'rhythm', chord: 'E', counts: true, bpm: 66, caption: 'Un compás de 6/8 “normal” (2 × 3) y otro con hemiola (3 × 2), alternándose. Las corcheas no cambian de velocidad: cambia dónde caen los acentos.' })}
<p>Si tocas a la vez tres notas regulares con una mano y dos con la otra, obtienes un <strong>polirritmo 3:2</strong>. Prueba a marcar negras con puntillo con el pie mientras rasgueas negras: es la base de muchos ritmos africanos y afrocubanos.</p>

<h2>Notas fantasma y groove</h2>
<p>En el funk y el pop moderno la mano de rasgueo hace semicorcheas constantes y la mano que pisa decide qué suena: aflojando la presión, los rasgueos se convierten en golpes apagados, <strong>notas fantasma</strong> que rellenan el ritmo sin notas. Los golpes que suenan, con el acorde pisado, son los acentos.</p>
${W.strum({ pattern: 'DXXUXUDXXUDUXUDU', sub: 4, chords: ['E7#9'], bpm: 84, caption: 'Las × son rasgueos con la mano izquierda apoyada sin pisar. La mano derecha nunca para: abajo en cada pulso y en cada “y”, arriba en cada “e” y cada “a”.' })}
<div class="callout tip"><span class="co-t">Groove</span>El groove no está solo en las notas, sino en su colocación fina. Tocar ligeramente por detrás del pulso da una sensación relajada (<em>laid back</em>); ligeramente por delante, urgencia. Graba lo que tocas con metrónomo y escucha dónde caes respecto al clic.</div>

<h2>Desplazamiento rítmico</h2>
<p>Coge un motivo y empiézalo medio pulso más tarde, o un pulso. Las notas son las mismas, pero el acento cambia por completo. Es un recurso clave para que la improvisación no suene previsible.</p>
${W.score({ notes: 'e:A4 e:C5 q:D5 e:C5 e:A4 q:r | e:r e:A4 e:C5 q:D5 e:C5 e:A4 e:r | q:r e:A4 e:C5 q:D5 e:C5 e:A4', mode: 'full', position: 5, bpm: 80, counts: true, caption: 'El mismo motivo empezando en el 1, en la “y” del 1 y en el 2.' })}

<h2>Entrena</h2>
<p>Lleva la lectura rítmica al nivel de tresillos y semicorcheas. El objetivo final: que cualquier ritmo que leas o escuches puedas tocarlo sin pensar en cómo se cuenta.</p>
${W.trainer({ tool: 'ritmo', state: { level: 4, bpm: 72 } })}`,
        practice: [
          'Pon el metrónomo en 7/8 y rasguea un acorde acentuando los grupos 2 + 2 + 3. Cambia después a 3 + 2 + 2.',
          'Alterna compases de 6/8 y de 3/4 (hemiola) diciendo en voz alta “1 2 3 4 5 6” y “1 y 2 y 3 y”.',
          'Toca el rasgueo de notas fantasma a 70 ppm. Cuando salga, sube de 5 en 5 hasta 100.',
        ],
        quiz: [
          { q: '¿Cómo se suele agrupar un compás de 7/8?', o: ['7 corcheas iguales', 'En grupos de 2 y 3 (por ejemplo, 2 + 2 + 3)', '4 + 4', '3 + 3 + 3'], a: 1, why: 'Los compases de amalgama combinan grupos binarios y ternarios.' },
          { q: '¿Qué es una hemiola?', o: ['Un tipo de bend', 'Agrupar en tres partes lo que normalmente va en dos (o al revés)', 'Una escala', 'Un compás de 5/4'], a: 1, why: 'Tres contra dos: 3 × 2 corcheas en lugar de 2 × 3.' },
          { q: 'Una nota fantasma en el rasgueo es…', o: ['Una nota muy aguda', 'Un rasgueo con las cuerdas apagadas por la mano que pisa', 'Un silencio', 'Un armónico'], a: 1, why: 'Suena percusiva, sin altura, y rellena el groove.' },
          { q: 'Desplazar un motivo medio pulso…', o: ['Cambia sus notas', 'Cambia dónde caen sus acentos', 'Lo hace más rápido', 'Lo transpone'], a: 1, why: 'Las notas son las mismas; la relación con el pulso cambia.' },
        ],
      },
    ],
  });
})();
