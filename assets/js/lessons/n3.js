/* Fretto · Nivel 3: Intermedio */
(function () {
  'use strict';
  const M = window.M, W = M.W;
  M.course = M.course || [];

  M.course.push({
    id: 'n3', n: 3, title: 'Armonía y mástil',
    desc: 'Escalas menores, círculo de quintas, acordes de séptima, funciones, CAGED, inversiones, blues, compases compuestos y arpegios.',
    long: 'Aquí la teoría y el mástil se funden: entenderás por qué unos acordes llaman a otros, recorrerás todo el diapasón con el sistema CAGED y las cinco posiciones de la pentatónica, y tocarás blues, 6/8 y fingerpicking.',
    lessons: [

      /* ---------------------------------------------------------- 3.1 */
      {
        id: 'escalas-menores', title: 'Las escalas menores', time: '25 min',
        desc: 'Menor natural, armónica y melódica; tonalidades relativas y homónimas.',
        lead: 'La tonalidad menor no es una sola escala, sino una familia de tres. Cada una resuelve un problema distinto, y juntas explican por qué en {A} menor el acorde de {E} es mayor.',
        goals: ['Construir la escala menor natural y encontrar la relativa de cualquier tonalidad mayor', 'Distinguir tonalidad relativa y homónima', 'Saber para qué sirven la menor armónica y la melódica'],
        body: () => `
<h2>La menor natural</h2>
<p>Si tocas las notas naturales empezando en {A} en lugar de en {C}, obtienes la <strong>escala de {A} menor natural</strong>. Su fórmula es:</p>
<p style="font:700 1.4rem/1.3 var(--ui);letter-spacing:.08em">T – S – T – T – S – T – T</p>
<p>Respecto a la escala mayor de su misma tónica, tiene tres notas rebajadas: <strong>♭3, ♭6 y ♭7</strong>. La ♭3 es la que le da el color menor; la ♭6 y la ♭7, su carácter más oscuro.</p>
${W.scale({ root: 'A', scale: 'minor', scales: ['minor', 'harmonicMinor', 'melodicMinor'], frets: [0, 15], caption: 'Cambia entre las tres escalas menores y fíjate en qué notas se mueven: solo la 6.ª y la 7.ª.' })}

<h2>Relativa y homónima</h2>
<p>{C} mayor y {A} menor usan <strong>exactamente las mismas notas</strong>; solo cambia la nota que hace de centro. Se llaman <strong>tonalidades relativas</strong> y comparten armadura. La relativa menor de cualquier tonalidad mayor está en su <strong>sexto grado</strong>, tres semitonos por debajo de la tónica:</p>
<table><thead><tr><th>Mayor</th><td class="c">{C}</td><td class="c">{G}</td><td class="c">{D}</td><td class="c">{A}</td><td class="c">{E}</td><td class="c">{F}</td><td class="c">{Bb}</td></tr></thead>
<tbody><tr><th>Relativa menor</th><td class="c">{Am}</td><td class="c">{Em}</td><td class="c">{Bm}</td><td class="c">{F#m}</td><td class="c">{C#m}</td><td class="c">{Dm}</td><td class="c">{Gm}</td></tr></tbody></table>
<p>En cambio, {C} mayor y {C} menor tienen la misma tónica pero distintas notas: son <strong>tonalidades homónimas</strong> (o paralelas). Pasar de una a otra cambia el color de golpe, y es un recurso que usarás en el nivel 4.</p>
${W.listen({ gap: 0.32, items: [{ label: '{C} mayor', notes: [48, 50, 52, 53, 55, 57, 59, 60] }, { label: '{A} menor (relativa)', notes: [45, 47, 48, 50, 52, 53, 55, 57] }, { label: '{C} menor (homónima)', notes: [48, 50, 51, 53, 55, 56, 58, 60] }] })}

<h2>Los acordes de la tonalidad menor</h2>
<p>Armonizando la menor natural salen los mismos acordes que en su relativa mayor, en otro orden:</p>
${W.degrees({ key: 'A', scale: 'minor', caption: 'Selecciona “Menor armónica” en el modo para ver cómo cambian el v y el VII.' })}
<p>Con la menor natural, el acorde v es menor ({Em} en {A} menor) y no tiene sensible: entre {G} y {A} hay un tono, y la vuelta a la tónica suena débil. Esto lleva a la segunda escala.</p>

<h2>La menor armónica</h2>
<p>Subiendo un semitono el séptimo grado ({G} → {G#}) aparece una sensible a un semitono de la tónica, y el acorde V pasa a ser <strong>mayor</strong> ({E}) o de séptima ({E7}), con mucha más fuerza para resolver. Es lo que se hace casi siempre en la armonía menor, y por eso la cadencia andaluza termina en {E} y no en {Em}.</p>
${W.progression({ prog: ['i', 'iv', 'V', 'i'], key: 'A', minor: true, bpm: 84, pattern: 'D.DU.UDU', caption: 'i – iv – V – i en {A} menor: {Am} {Dm} {E} {Am}. Compara cómo resuelve con {Em} en lugar de {E}.' })}
<p>El precio es un salto de segunda aumentada entre la ♭6 y la 7 ({F}-{G#}, tres semitonos), que da a la escala un sabor “oriental” muy usado en el flamenco, el metal neoclásico y la música de Oriente Próximo.</p>

<h2>La menor melódica</h2>
<p>Para cantar o tocar melodías sin ese salto, la <strong>menor melódica</strong> sube también el sexto grado: 1 2 ♭3 4 5 6 7. En la tradición clásica se usa al subir, y al bajar se vuelve a la menor natural. En el jazz se usa igual en las dos direcciones, y de ella salen sonidos que verás en el nivel 4 (lidio dominante, alterada).</p>

<h2>En el mástil</h2>
<p>La menor natural de {A} en la posición del traste 5 contiene la pentatónica menor que ya conoces, más dos notas: la 2 ({B}) y la ♭6 ({F}).</p>
${W.fretboard({ frets: [0, 12], show: { root: 'A', scale: 'minor' }, label: 'interval', region: [4, 8], caption: 'Compara con la pentatónica: las notas moradas (2 y ♭6) son las que se añaden.' })}`,
        practice: [
          'Di la relativa menor de {G}, {D}, {F} y {Eb}. Comprueba tus respuestas en el círculo de quintas.',
          'Toca la escala de {A} menor natural en la posición del traste 5 y después la armónica (cambiando {G} por {G#}). Escucha la diferencia al llegar a la tónica.',
          'Toca {Am} – {Dm} – {Em} – {Am} y luego {Am} – {Dm} – {E} – {Am}. ¿Cuál resuelve con más fuerza?',
        ],
        quiz: [
          { q: '¿Cuál es la relativa menor de {D} mayor?', o: ['{Dm}', '{Bm}', '{F#m}', '{Em}'], a: 1, why: 'Sexto grado de {D}: {B}. Tres semitonos por debajo de {D}.' },
          { q: 'Respecto a la escala mayor de su misma tónica, la menor natural tiene rebajados…', o: ['El 2, el 3 y el 7', 'El 3, el 6 y el 7', 'Solo el 3', 'El 4 y el 7'], a: 1, why: '♭3, ♭6 y ♭7.' },
          { q: '¿Qué grado sube la escala menor armónica?', o: ['El 3', 'El 6', 'El 7', 'El 4'], a: 2, why: 'Sube el séptimo para tener sensible y un V mayor.' },
          { q: '{C} mayor y {C} menor son tonalidades…', o: ['Relativas', 'Homónimas (paralelas)', 'Enarmónicas', 'Vecinas'], a: 1, why: 'Misma tónica, distintas notas.' },
          { q: 'En {E} menor con la escala armónica, el acorde V es…', o: ['{Bm}', '{B}', '{D}', '{A}'], a: 1, why: 'La armónica sube el {D} a {D#}, y el V pasa a ser {B} mayor ({B} {D#} {F#}).' },
        ],
      },

      /* ---------------------------------------------------------- 3.2 */
      {
        id: 'circulo-quintas', title: 'El círculo de quintas', time: '20 min',
        desc: 'El mapa de las tonalidades: armaduras, relativas y vecindad.',
        lead: 'Si ordenas las doce tonalidades por quintas obtienes un círculo que resume media teoría musical: cuántas alteraciones tiene cada tono, cuál es su relativa y qué tonalidades son vecinas.',
        goals: ['Recordar el orden de sostenidos y bemoles', 'Identificar la tonalidad de una armadura', 'Usar el círculo para encontrar acordes relacionados'],
        body: () => `
<h2>Subir por quintas</h2>
<p>Empieza en {C} mayor, sin alteraciones. Sube una quinta justa: {G} mayor, con un sostenido ({F#}). Otra quinta: {D} mayor, dos sostenidos ({F#}, {C#}). Cada vez que subes una quinta, la escala nueva añade un sostenido. Si bajas por quintas (o subes por cuartas) desde {C}, cada tonalidad añade un bemol: {F} (uno), {Bb} (dos), {Eb} (tres)…</p>
<p>Las dos direcciones se encuentran al otro lado, en {F#} / {Gb}. Ese círculo es el <strong>círculo de quintas</strong>:</p>
${W.cof({})}

<h2>El orden de las alteraciones</h2>
<p>Los sostenidos y bemoles de la armadura siempre aparecen en el mismo orden, que es a su vez una cadena de quintas:</p>
<table><tbody>
<tr><th>Sostenidos</th><td>{F#} {C#} {G#} {D#} {A#} {E#} {B#}</td></tr>
<tr><th>Bemoles</th><td>{Bb} {Eb} {Ab} {Db} {Gb} {Cb} {Fb}</td></tr></tbody></table>
<p>El orden de los bemoles es el de los sostenidos al revés. Basta con memorizar uno.</p>
<h3>Leer una armadura</h3>
<ul>
<li><strong>Con sostenidos</strong>: la tónica mayor está un semitono por encima del último sostenido. Último sostenido {C#} → tonalidad de {D} mayor.</li>
<li><strong>Con bemoles</strong>: la tónica mayor es el penúltimo bemol. Bemoles {Bb} {Eb} {Ab} → tonalidad de {Eb} mayor. La única que hay que memorizar aparte es {F} mayor, con un solo bemol.</li>
<li>La <strong>relativa menor</strong> tiene la misma armadura: tres semitonos por debajo de la mayor. Para saber si una pieza está en la mayor o en su relativa menor, mira el primer y el último acorde, y si aparece la sensible de la menor (por ejemplo, {G#} en {A} menor).</li>
</ul>
${W.score({ notes: 'q:D4 q:E4 q:F#4 q:G4 | q:A4 q:B4 q:C#5 q:D5 | w:D5', key: 2, mode: 'staff', bpm: 100, caption: 'Dos sostenidos: {F#} y {C#}. Último sostenido {C#} + un semitono = {D} mayor.' })}
${W.score({ notes: 'q:Eb4 q:F4 q:G4 q:Ab4 | q:Bb4 q:C5 q:D5 q:Eb5 | w:Eb5', key: -3, mode: 'staff', bpm: 100, caption: 'Tres bemoles: {Bb}, {Eb}, {Ab}. Penúltimo bemol: {Eb} mayor.' })}

<h2>Para qué sirve en la práctica</h2>
<ul>
<li><strong>Acordes de una tonalidad</strong>: los tres acordes mayores (IV, I, V) son vecinos en el anillo exterior, y los tres menores (ii, vi, iii), sus vecinos del anillo interior. Toda la tonalidad cabe en un trozo del círculo.</li>
<li><strong>Movimiento por quintas</strong>: girar en sentido antihorario es ir de dominante a tónica (V → I). Las progresiones que encadenan quintas descendentes, como {Em} → {Am} → {Dm} → {G} → {C} (iii – vi – ii – V – I), suenan inevitables. Muchos estándares de jazz y canciones pop se construyen así.</li>
<li><strong>Tonalidades cercanas</strong>: las vecinas en el círculo comparten seis de siete notas. Por eso modular de {C} a {G} o a {F} es suave, y de {C} a {F#}, brusco.</li>
<li><strong>Enarmonías</strong>: abajo del todo, {F#} mayor (6♯) y {Gb} mayor (6♭) suenan igual. Igual {B} y {Cb}, o {C#} y {Db}.</li>
</ul>
${W.progression({ prog: ['iii', 'vi', 'ii', 'V', 'I'], key: 'C', bpm: 88, pattern: 'D.DU.UDU', caption: 'Una cadena de quintas descendentes: cada acorde es la dominante del siguiente, siguiendo el círculo en sentido antihorario.' })}`,
        practice: [
          'Recita el orden de los sostenidos y de los bemoles hasta decirlo sin pensar.',
          'Con el círculo tapado, di cuántas alteraciones tienen {A}, {Eb}, {B} y {Ab} mayor. Comprueba en el círculo.',
          'Toca la cadena iii – vi – ii – V – I en {G} y en {D}. Usa el círculo para encontrar los acordes.',
        ],
        quiz: [
          { q: '¿Cuál es el orden de los sostenidos?', o: ['{F} {C} {G} {D} {A} {E} {B}', '{B} {E} {A} {D} {G} {C} {F}', '{C} {G} {D} {A} {E} {B} {F}', '{F} {G} {A} {B} {C} {D} {E}'], a: 0, why: '{F#} {C#} {G#} {D#} {A#} {E#} {B#}.' },
          { q: 'Una armadura con cuatro sostenidos corresponde a…', o: ['{A} mayor', '{E} mayor', '{B} mayor', '{D} mayor'], a: 1, why: 'Último sostenido {D#} + un semitono = {E}.' },
          { q: 'Una armadura con dos bemoles corresponde a…', o: ['{F} mayor', '{Bb} mayor', '{Eb} mayor', '{Ab} mayor'], a: 1, why: '{Bb} {Eb}: el penúltimo es {Bb}.' },
          { q: '¿Cuál es la relativa menor de {Eb} mayor?', o: ['{Ebm}', '{Cm}', '{Gm}', '{Fm}'], a: 1, why: 'Tres semitonos por debajo de {Eb}: {C}.' },
          { q: 'En el círculo, girar en sentido antihorario equivale a moverse…', o: ['De tónica a dominante', 'De dominante a tónica (quintas descendentes)', 'Por semitonos', 'A la relativa menor'], a: 1, why: '{G} → {C} → {F}: cada paso es V → I.' },
        ],
      },

      /* ---------------------------------------------------------- 3.3 */
      {
        id: 'septimas', title: 'Acordes de séptima', time: '28 min',
        desc: 'maj7, 7, m7, m7♭5 y dim7: construcción, sonido y formas en el mástil.',
        lead: 'Añadir una tercera más encima de la tríada da los acordes de cuatro notas, o cuatriadas. Son el vocabulario básico del jazz, el soul, la bossa nova y el blues, y también aparecen en todo el pop.',
        goals: ['Construir los cinco acordes de séptima principales', 'Reconocer su sonido y su función', 'Tocarlos en formas abiertas y móviles con fundamental en las cuerdas 6 y 5'],
        body: () => `
<h2>Una tercera más</h2>
<p>Sobre una tríada se apila otra tercera y aparece la <strong>séptima</strong>. Dependiendo de la tríada y del tipo de séptima, salen cinco acordes:</p>
<table><thead><tr><th>Acorde</th><th>Fórmula</th><th>Tríada + 7.ª</th><th>Desde {C}</th><th>Carácter</th></tr></thead><tbody>
<tr><td>Séptima mayor (maj7, Δ)</td><td>1 3 5 7</td><td>Mayor + 7M</td><td>{Cmaj7}: {C} {E} {G} {B}</td><td>Suave, soñador</td></tr>
<tr><td>Séptima de dominante (7)</td><td>1 3 5 ♭7</td><td>Mayor + 7m</td><td>{C7}: {C} {E} {G} {Bb}</td><td>Tenso, pide resolver; blues</td></tr>
<tr><td>Menor séptima (m7, −7)</td><td>1 ♭3 5 ♭7</td><td>Menor + 7m</td><td>{Cm7}: {C} {Eb} {G} {Bb}</td><td>Menor relajado, cálido</td></tr>
<tr><td>Semidisminuido (m7♭5, ø)</td><td>1 ♭3 ♭5 ♭7</td><td>Disminuida + 7m</td><td>{Cm7b5}: {C} {Eb} {Gb} {Bb}</td><td>Oscuro, inestable</td></tr>
<tr><td>Disminuido séptima (dim7, °7)</td><td>1 ♭3 ♭5 𝄫7</td><td>Disminuida + 7d</td><td>{Cdim7}: {C} {Eb} {Gb} {Bbb}</td><td>Tensión máxima, simétrico</td></tr></tbody></table>
<div class="callout key"><span class="co-t">Ojo con los nombres</span>“C7” a secas no es “Do con séptima mayor”: es el acorde de <strong>séptima de dominante</strong>, con la séptima <em>menor</em>. La séptima mayor siempre se indica con <em>maj7</em>, <em>M7</em> o Δ.</div>
${W.listen({ items: [{ label: '{Cmaj7}', notes: [48, 52, 55, 59], together: true }, { label: '{C7}', notes: [48, 52, 55, 58], together: true }, { label: '{Cm7}', notes: [48, 51, 55, 58], together: true }, { label: '{Cm7b5}', notes: [48, 51, 54, 58], together: true }, { label: '{Cdim7}', notes: [48, 51, 54, 57], together: true }] })}

<h2>Formas abiertas</h2>
${W.chords({ items: ['Cmaj7', 'Fmaj7', 'Amaj7', 'Dmaj7', 'Gmaj7', 'E7', 'A7', 'D7', 'G7', 'C7', 'B7', 'Am7', 'Em7', 'Dm7'], label: 'interval', caption: 'Los acordes de séptima abiertos más usados, con sus intervalos. La séptima aparece en verde.' })}

<h2>Formas móviles</h2>
<p>Estas formas de cuatro notas dejan sin tocar alguna cuerda (o la apagan con un dedo) y son las que se usan en jazz y en acompañamiento con banda, porque suenan definidas y se mueven fácilmente. Hay que apagar las cuerdas marcadas con ×, normalmente con el lateral de los dedos que pisan.</p>
<h3>Fundamental en la cuerda 6</h3>
${W.chords({ label: 'interval', items: [{ sym: 'Amaj7', f: '5x665x' }, { sym: 'A7', f: '5x565x' }, { sym: 'Am7', f: '5x555x' }, { sym: 'Am7b5', f: '5x554x' }, { sym: 'Adim7', f: '5x454x' }] })}
<h3>Fundamental en la cuerda 5</h3>
${W.chords({ label: 'interval', items: [{ sym: 'Cmaj7', f: 'x3545x' }, { sym: 'C7', f: 'x3535x' }, { sym: 'Cm7', f: 'x3534x' }, { sym: 'Cm7b5', f: 'x3434x' }, { sym: 'Cdim7', f: 'x3424x' }] })}
<p>Fíjate en que cada forma se convierte en la siguiente moviendo uno o dos dedos un traste: de maj7 a 7 se baja la séptima, de 7 a m7 se baja la tercera, de m7 a m7♭5 se baja la quinta. Es la mejor forma de memorizarlas: como variaciones de una misma forma.</p>

<h2>Las séptimas de la tonalidad</h2>
<p>Armonizando la escala mayor con cuatro notas, cada grado tiene su acorde de séptima. El patrón es siempre:</p>
<p style="font:700 1.1rem/1.4 var(--ui)">Imaj7 – ii7 – iii7 – IVmaj7 – V7 – vi7 – viiø7</p>
${W.degrees({ key: 'C', sevenths: true, modes: false, caption: 'Activa o desactiva las cuatriadas para comparar. Solo hay un acorde de dominante (7) en la tonalidad: el V7.' })}
<p>Que el único dominante sea el V7 es muy importante: cuando oyes un acorde de séptima de dominante, tu oído espera que vaya a la tónica que está una quinta por debajo. Lo aprovecharemos en las lecciones de funciones y de dominantes secundarios.</p>
${W.progression({ prog: ['Imaj7', 'vi7', 'ii7', 'V7'], key: 'C', bpm: 80, pattern: 'D.D.D.D.', caption: 'I – vi – ii – V con séptimas: la misma progresión de los años 50, ahora con color de jazz.' })}`,
        practice: [
          'Toca las cinco formas móviles con fundamental en la cuerda 5 en el traste 3 ({C}), pasando de una a otra moviendo solo los dedos necesarios.',
          'Toca Imaj7 – ii7 – iii7 – IVmaj7 – V7 – vi7 en {C} usando formas abiertas y móviles. Escucha el carácter de cada uno.',
          'Busca una canción de bossa nova o de soul y fíjate en qué acordes de séptima usa.',
        ],
        quiz: [
          { q: '¿Qué fórmula tiene un acorde de séptima de dominante (7)?', o: ['1 3 5 7', '1 3 5 ♭7', '1 ♭3 5 ♭7', '1 ♭3 ♭5 ♭7'], a: 1, why: 'Tríada mayor con séptima menor.' },
          { q: '¿Qué notas tiene {G7}?', o: ['{G} {B} {D} {F#}', '{G} {B} {D} {F}', '{G} {Bb} {D} {F}', '{G} {B} {D#} {F}'], a: 1, why: '{G} + 3M {B} + 5J {D} + 7m {F}.' },
          { q: 'En una tonalidad mayor, ¿qué grado tiene el acorde m7♭5?', o: ['ii', 'iii', 'vi', 'vii'], a: 3, why: 'viiø7: en {C}, {Bm7b5}.' },
          { q: 'De {Cmaj7} a {C7}, ¿qué nota cambia?', o: ['La tercera', 'La quinta', 'La séptima baja un semitono', 'La fundamental'], a: 2, why: '{B} → {Bb}: séptima mayor → séptima menor.' },
          { q: '¿Qué acorde de séptima aparece solo una vez en la tonalidad mayor y señala la dominante?', o: ['maj7', 'm7', '7', 'm7♭5'], a: 2, why: 'El V7 es el único acorde de séptima de dominante diatónico.' },
        ],
      },

      /* ---------------------------------------------------------- 3.4 */
      {
        id: 'funciones', title: 'Funciones armónicas y cadencias', time: '22 min',
        desc: 'Tónica, subdominante y dominante; el tritono y las cuatro cadencias.',
        lead: 'Los acordes de una tonalidad no valen todos lo mismo. Unos dan reposo, otros alejan y otros crean tensión. Entender estas tres funciones explica por qué una progresión “funciona”.',
        goals: ['Clasificar los acordes diatónicos en tónica, subdominante y dominante', 'Entender por qué el V7 resuelve en el I', 'Reconocer las cadencias auténtica, plagal, semicadencia y rota'],
        body: () => `
<h2>Tres funciones</h2>
<p>La armonía tonal se puede entender como un ciclo de <strong>reposo → movimiento → tensión → reposo</strong>. Cada acorde de la tonalidad cumple uno de estos papeles:</p>
<table><thead><tr><th>Función</th><th>Grados</th><th>En {C}</th><th>Sensación</th></tr></thead><tbody>
<tr><td><b>Tónica (T)</b></td><td>I, (vi, iii)</td><td>{C}, ({Am}, {Em})</td><td>Casa, estabilidad</td></tr>
<tr><td><b>Subdominante (S)</b></td><td>IV, ii</td><td>{F}, {Dm}</td><td>Alejarse, preparar</td></tr>
<tr><td><b>Dominante (D)</b></td><td>V, vii°</td><td>{G}, {Bdim}</td><td>Tensión que pide volver</td></tr></tbody></table>
<p>Los acordes de una misma función comparten notas y pueden <strong>sustituirse</strong> entre sí: {Am} comparte dos notas con {C} y puede ocupar su lugar; {Dm} comparte dos con {F}. El orden típico es T → S → D → T, y es lo que hay debajo de I – IV – V – I, I – ii – V – I o I – vi – IV – V.</p>
${W.degrees({ key: 'C', modes: false })}

<h2>Por qué la dominante tira hacia la tónica</h2>
<p>El acorde {G7} contiene {B} y {F}. Entre ellas hay un <strong>tritono</strong>, el intervalo más inestable. Además, {B} es la sensible (a un semitono de {C}) y {F} está a un semitono de {E}. Al pasar a {C}, las dos notas se mueven un semitono hacia dentro y la tensión se disuelve:</p>
${W.score({ notes: 'h:6/3+4/3+3/4@G7 h:5/3+4/2+3/5@C | h:6/3+4/3+3/4@G7 h:5/3+4/2+3/5@C', mode: 'full', bpm: 66, caption: 'El tritono {F}-{B} de {G7} (cuerdas 4 y 3) resuelve en {E}-{C}. Escucha cómo cada voz se mueve lo mínimo.' })}
<p>Esa atracción del tritono es lo que hace al V7 tan poderoso, y lo que aprovecharás en el nivel 4 con los dominantes secundarios y la sustitución tritonal.</p>

<h2>Las cadencias</h2>
<p>Una <strong>cadencia</strong> es la forma de cerrar una frase. Son como los signos de puntuación de la música:</p>
<ul>
<li><strong>Auténtica (V → I)</strong>: el punto final. La más conclusiva.</li>
<li><strong>Plagal (IV → I)</strong>: un final más suave, el “amén” de los himnos. Muy usada en el rock y el gospel.</li>
<li><strong>Semicadencia (… → V)</strong>: la frase se queda en la dominante, como una coma o una pregunta. Pide continuar.</li>
<li><strong>Rota o engañosa (V → vi)</strong>: el oído espera el I y llega el vi. Sorpresa, y la frase sigue.</li>
</ul>
${W.listen({ gap: 1.2, items: [{ label: 'Auténtica: {C} {F} {G7} {C}', chords: ['C', 'F', 'G7', 'C'] }, { label: 'Plagal: {C} {G} {F} {C}', chords: ['C', 'G', 'F', 'C'] }, { label: 'Semicadencia: {C} {Am} {F} {G}', chords: ['C', 'Am', 'F', 'G'] }, { label: 'Rota: {C} {F} {G7} {Am}', chords: ['C', 'F', 'G7', 'Am'] }] })}

<h2>En tonalidad menor</h2>
<p>Las funciones son las mismas (i tónica; iv y ii° subdominante; V dominante), pero para que la dominante tenga sensible hay que usar el V mayor de la menor armónica. Por eso en {A} menor verás {E} o {E7}, no {Em}, justo antes de volver a {Am}.</p>
${W.listen({ gap: 1.2, items: [{ label: '{Am} {Dm} {Em} {Am}', chords: ['Am', 'Dm', 'Em', 'Am'] }, { label: '{Am} {Dm} {E7} {Am}', chords: ['Am', 'Dm', 'E7', 'Am'] }] })}

<h2>Analizar una canción</h2>
<p>Cuando aprendas una canción nueva, escribe los números romanos encima de los acordes y marca su función. En poco tiempo verás que casi todo son variaciones de T – S – D – T, y te costará mucho menos memorizar y sacar canciones de oído.</p>`,
        practice: [
          'Toca las cuatro cadencias en {G} ({G} {C} {D7} {G}, {G} {D} {C} {G}…) y escucha qué sensación deja cada una.',
          'Toca el tritono {F}-{B} (cuerda 4 traste 3 y cuerda 3 traste 4) y resuélvelo a {E}-{C}. Haz lo mismo en otras tonalidades moviendo la forma.',
          'Analiza con números romanos y funciones una canción que conozcas.',
        ],
        quiz: [
          { q: '¿Qué función tiene el acorde IV?', o: ['Tónica', 'Subdominante', 'Dominante', 'Ninguna'], a: 1, why: 'IV y ii son subdominantes.' },
          { q: '¿Qué intervalo del V7 crea la tensión que resuelve en el I?', o: ['La quinta justa', 'El tritono entre la tercera y la séptima', 'La octava', 'La sexta mayor'], a: 1, why: 'En {G7}, {B}-{F}: tritono que resuelve por semitono a {C}-{E}.' },
          { q: 'Una frase que termina en V → vi es una cadencia…', o: ['Auténtica', 'Plagal', 'Rota o engañosa', 'Semicadencia'], a: 2, why: 'El oído espera el I y llega el vi.' },
          { q: '¿Qué acorde puede sustituir al I porque comparte dos notas con él?', o: ['El IV', 'El V', 'El vi', 'El vii°'], a: 2, why: '{C} y {Am} comparten {C} y {E}.' },
          { q: 'IV → I es una cadencia…', o: ['Plagal', 'Auténtica', 'Rota', 'Frigia'], a: 0, why: 'La cadencia del “amén”.' },
        ],
      },

      /* ---------------------------------------------------------- 3.5 */
      {
        id: 'caged', title: 'El sistema CAGED', time: '25 min',
        desc: 'Cinco formas que conectan todo el mástil a partir de los acordes abiertos.',
        lead: 'Con las cinco formas abiertas {C}, {A}, {G}, {E} y {D} puedes tocar cualquier acorde mayor en cinco sitios distintos del mástil, y esas cinco formas encajan unas con otras como piezas de un puzle.',
        goals: ['Mover las formas {C}, {A}, {G}, {E} y {D} a cualquier tonalidad', 'Ver cómo se encadenan a lo largo del mástil', 'Usar CAGED para encontrar acordes, arpegios y escalas'],
        body: () => `
<h2>Cinco formas, un acorde</h2>
<p>Ya sabes que la forma de {E} y la de {A} se pueden mover con cejilla. Lo mismo vale para las otras tres formas abiertas: {C}, {G} y {D}. Cualquier acorde mayor se puede tocar con cualquiera de las cinco formas, cada una en una zona distinta del mástil.</p>
<p>Además, las formas aparecen <strong>siempre en el mismo orden</strong> al subir por el mástil: C → A → G → E → D → C… De ahí el nombre CAGED. El final de una forma comparte notas con el principio de la siguiente.</p>
${W.caged({ root: 'C', caption: 'Las cinco formas de {C} mayor. Elige una para verla destacada, o cambia de acorde: el orden se mantiene, solo se desplaza.' })}

<h2>Cómo usar cada forma</h2>
<p>Las formas de {E} y {A} son las cejillas de siempre. Las otras tres son menos cómodas como acordes completos, y casi nunca se tocan con todas las cuerdas. Lo habitual es usar <strong>fragmentos</strong>: las cuatro cuerdas agudas de la forma de {D}, las tres agudas de la forma de {C} o de {G}… Pero como mapa son fundamentales, porque te dicen dónde están las fundamentales, las terceras y las quintas en cada zona.</p>
${W.chords({ label: 'interval', items: [{ sym: 'D', f: 'x54232', caption: 'Forma de {C}' }, { sym: 'D', f: 'x57775', caption: 'Forma de {A}' }, { sym: 'D', f: 'x,x,7,7,7,10', caption: 'Forma de {G} (agudas)' }, { sym: 'D', f: 'x,x,x,11,10,10', caption: 'Forma de {E} (agudas)' }, { sym: 'D', f: 'x,x,12,14,15,14', caption: 'Forma de {D}' }] })}

<h2>Para qué sirve</h2>
<ul>
<li><strong>Encontrar cualquier acorde en cualquier zona</strong>. Si estás tocando en el traste 7 y necesitas un {C}, no hace falta volver a la cejuela: la forma de {G} de {C} está justo ahí.</li>
<li><strong>Acompañar con variedad</strong>. Dos guitarras que tocan el mismo acorde con formas distintas suenan mucho más ricas que dos guitarras con el mismo voicing.</li>
<li><strong>Conectar acordes y escalas</strong>. Cada forma CAGED tiene “alrededor” una posición de la escala mayor y de la pentatónica. Si tocas un solo en una zona, la forma del acorde te dice qué notas son seguras (las del acorde).</li>
<li><strong>Formas menores</strong>. Las mismas cinco formas existen en menor ({Cm}, {Am}, {Gm}, {Em}, {Dm}), cambiando la tercera mayor por la menor.</li>
</ul>
<div class="callout tip"><span class="co-t">El método</span>No intentes aprender las cinco formas de golpe. Empieza por {E} y {A}, que ya conoces, y añade la de {D} (la que queda entre ellas cuando la fundamental está en la cuerda 4). Después {C} y {G}. Una forma por semana es un buen ritmo.</div>`,
        practice: [
          'Toca {G} mayor en sus cinco formas, de la cejuela hacia el cuerpo, diciendo el nombre de cada forma.',
          'Elige una progresión ({G} – {C} – {D}) y tócala entera sin salir de la zona del traste 7 usando las formas que te queden más cerca.',
          'Toca solo las cuerdas 1, 2 y 3 de cada forma: son las tríadas que verás en la lección siguiente.',
        ],
        quiz: [
          { q: '¿En qué orden aparecen las formas al subir por el mástil?', o: ['C A G E D', 'E D C A G', 'A B C D E', 'G E D C A'], a: 0, why: 'C → A → G → E → D y vuelta a empezar (el orden es cíclico).' },
          { q: 'Si tocas {A} con la forma de {E}, ¿en qué traste está la cejilla?', o: ['2', '5', '7', '9'], a: 1, why: 'La fundamental en la cuerda 6: {A} en el traste 5.' },
          { q: 'Después de la forma de {E} de un acorde, la siguiente forma hacia el cuerpo es la de…', o: ['{C}', '{A}', '{D}', '{G}'], a: 2, why: 'E → D → C…' },
          { q: '¿Para qué NO sirve el sistema CAGED?', o: ['Encontrar un acorde en otra zona', 'Conectar acordes con escalas', 'Saber la letra de una canción', 'Variar los voicings'], a: 2, why: 'Es un mapa del mástil, no tiene nada que ver con las letras.' },
        ],
      },

      /* ---------------------------------------------------------- 3.6 */
      {
        id: 'inversiones', title: 'Tríadas e inversiones', time: '25 min',
        desc: 'Acordes de tres notas en grupos de cuerdas, inversiones y bajos en movimiento.',
        lead: 'Las tríadas en tres cuerdas son los acordes más pequeños y versátiles de la guitarra. Con sus inversiones puedes tocar cualquier acorde en cualquier zona y hacer que las voces se muevan con suavidad.',
        goals: ['Distinguir posición fundamental, primera y segunda inversión', 'Leer y tocar acordes con bajo (C/E, D/F#)', 'Tocar tríadas en los grupos de cuerdas agudas'],
        body: () => `
<h2>¿Qué nota está abajo?</h2>
<p>Una tríada tiene tres notas, pero no siempre está la fundamental en el bajo. Según cuál sea la nota más grave:</p>
<ul>
<li><strong>Posición fundamental</strong>: la fundamental abajo. {C} {E} {G}.</li>
<li><strong>Primera inversión</strong>: la tercera abajo. {E} {G} {C}.</li>
<li><strong>Segunda inversión</strong>: la quinta abajo. {G} {C} {E}.</li>
</ul>
<p>El acorde sigue siendo {C} mayor, pero el sonido cambia: la posición fundamental es la más estable; la primera inversión, más ligera; la segunda, más inestable, y se usa sobre todo de paso.</p>
${W.listen({ items: [{ label: 'Fundamental', notes: [48, 52, 55], together: true, spread: 0.03 }, { label: '1.ª inversión', notes: [52, 55, 60], together: true }, { label: '2.ª inversión', notes: [55, 60, 64], together: true }] })}

<h2>Acordes con barra</h2>
<p>Cuando importa qué nota va en el bajo, se escribe con una barra: <strong>acorde / nota del bajo</strong>. {C/E} es {C} mayor con {E} en el bajo (primera inversión); {C/G}, con {G} (segunda). La nota tras la barra puede no pertenecer al acorde, como en {Am/G}: entonces es un bajo de paso.</p>
${W.chords({ label: 'interval', items: [{ sym: 'C/E', f: '032010' }, { sym: 'C/G', f: '332010' }, { sym: 'G/B', f: 'x20033' }, { sym: 'D/F#', f: '2x0232' }, { sym: 'Am/G', f: '3x2210' }, { sym: 'C/B', f: 'x22010' }] })}
<p>Su uso más común es hacer que el bajo camine por grados conjuntos. Escucha cómo baja la línea grave en este clásico descenso:</p>
${W.progression({ prog: [{ sym: 'C', f: 'x32010' }, { sym: 'C/B', f: 'x22010' }, { sym: 'Am', f: 'x02210' }, { sym: 'Am/G', f: '3x2210' }, { sym: 'F', f: '133211', b: 1 }, { sym: 'G', f: '320003' }], bpm: 76, pattern: 'B.DUD.DU', caption: 'El bajo baja por escala: {C} {B} {A} {G} {F}. Un recurso de mil baladas.' })}

<h2>Tríadas en tres cuerdas</h2>
<p>En los grupos de cuerdas contiguas, cada tríada tiene tres formas, una por inversión, que se suceden por el mástil. En las cuerdas agudas (3-2-1) son las más útiles para tocar con banda, porque no chocan con el bajo ni con otros instrumentos y cortan bien en la mezcla.</p>
${W.triads({ root: 'C', type: '', set: '321', caption: 'Cambia de grupo de cuerdas y de tipo de acorde. Las tres formas de cada grupo se repiten cada 12 trastes.' })}
<div class="callout"><span class="co-t">El truco para memorizarlas</span>Fíjate en dónde queda la fundamental en cada forma: arriba (en la cuerda 1), en medio o abajo. Si sabes dónde está la nota {C} en la cuerda 1, la 2 y la 3, sabes dónde están las tres tríadas de {C}.</div>

<h2>Conducción de voces</h2>
<p>Con tríadas puedes encadenar acordes moviendo los dedos lo mínimo: buscas la inversión del siguiente acorde que queda más cerca. Así, I – IV – V en {G} se puede tocar sin salir de los trastes 7 a 10, con cada nota moviéndose uno o dos trastes. Esa idea, mover las voces lo menos posible, se llama <strong>conducción de voces</strong> y es la base de los arreglos.</p>
${W.progression({ prog: [{ sym: 'G', f: 'x,x,x,7,8,7' }, { sym: 'C', f: 'x,x,x,9,8,8' }, { sym: 'D', f: 'x,x,x,7,7,5' }, { sym: 'G', f: 'x,x,x,7,8,7' }], bpm: 84, pattern: 'D.DU.UDU', caption: '{G} – {C} – {D} – {G} en las cuerdas agudas, sin salir de los trastes 5 a 9.' })}`,
        practice: [
          'Toca las tres inversiones de {C} mayor en las cuerdas 3-2-1, subiendo y bajando por el mástil. Luego las de {Cm}.',
          'Toca la progresión del bajo descendente con un rasgueo suave y después solo con la nota grave y un arpegio.',
          'Toca I – IV – V – I en {D} usando solo tríadas en las cuerdas 3-2-1, sin moverte más de tres trastes.',
        ],
        quiz: [
          { q: 'Una tríada con la tercera en el bajo está en…', o: ['Posición fundamental', 'Primera inversión', 'Segunda inversión', 'Tercera inversión'], a: 1, why: 'Primera inversión = tercera en el bajo.' },
          { q: '¿Qué significa {G/B}?', o: ['{G} o {B}', '{G} mayor con {B} en el bajo', '{G} con séptima', 'Dos acordes a la vez'], a: 1, why: 'La nota tras la barra es la del bajo.' },
          { q: '{D/F#} es una…', o: ['Posición fundamental', 'Primera inversión de {D}', 'Segunda inversión de {D}', '{F#m}'], a: 1, why: '{F#} es la tercera de {D}.' },
          { q: '¿Qué es la conducción de voces?', o: ['Cantar mientras tocas', 'Encadenar acordes moviendo las notas lo mínimo', 'Tocar siempre en posición fundamental', 'Usar solo power chords'], a: 1, why: 'Cada voz se mueve a la nota más cercana del acorde siguiente.' },
        ],
      },

      /* ---------------------------------------------------------- 3.7 */
      {
        id: 'blues', title: 'El blues', time: '28 min',
        desc: 'La forma de 12 compases, el shuffle, la escala de blues y cómo mezclar pentatónicas.',
        lead: 'El blues es la base del rock, el jazz y el soul, y un laboratorio perfecto para todo lo que llevas aprendido: dominantes, pentatónica, swing y forma.',
        goals: ['Tocar la forma de blues de 12 compases en cualquier tonalidad', 'Tocar un acompañamiento shuffle', 'Improvisar con la escala de blues y mezclar pentatónica menor y mayor'],
        body: () => `
<h2>La forma de 12 compases</h2>
<p>El blues clásico es una estructura de <strong>12 compases</strong> con solo tres acordes, los grados I, IV y V. Lo especial es que <strong>los tres son acordes de séptima de dominante</strong>: no resuelven, se quedan con su tensión. Ese sonido es el blues.</p>
<table><thead><tr><th></th><th class="c">1</th><th class="c">2</th><th class="c">3</th><th class="c">4</th></tr></thead><tbody>
<tr><td>Frase 1</td><td class="c">I7</td><td class="c">I7 (o IV7)</td><td class="c">I7</td><td class="c">I7</td></tr>
<tr><td>Frase 2</td><td class="c">IV7</td><td class="c">IV7</td><td class="c">I7</td><td class="c">I7</td></tr>
<tr><td>Frase 3</td><td class="c">V7</td><td class="c">IV7</td><td class="c">I7</td><td class="c">V7</td></tr></tbody></table>
<p>Tres frases de cuatro compases. Las letras de blues suelen seguir ese esquema: una frase, la misma frase repetida y una respuesta. El último compás (V7) es el <strong>turnaround</strong>: devuelve al principio. Si en el compás 2 tocas IV7 en lugar de I7, es el <em>quick change</em>, una variante muy común.</p>
${W.progression({ prog: ['I7', 'I7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'], key: 'A', bpm: 96, pattern: 'DUDUDUDU', swing: true, caption: 'Blues en {A}: {A7}, {D7} y {E7}. Cambia la tonalidad para tocarlo en {E}, {G} o {C}.' })}

<h2>El shuffle</h2>
<p>En el blues las corcheas no se tocan iguales: la primera de cada pareja es más larga que la segunda, como un tresillo con las dos primeras notas unidas. Esa sensación se llama <strong>swing</strong> o <strong>shuffle</strong>. Normalmente se escriben corcheas normales con la indicación “swing” al principio, y se tocan “largo-corto”.</p>
${W.score({ notes: 'qt:5/0 et:5/0 qt:5/0 et:5/0 qt:5/0 et:5/0 qt:5/0 et:5/0 | e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 e:5/0', mode: 'full', bpm: 92, caption: 'Arriba, el shuffle escrito con tresillos (negra + corchea). Abajo, corcheas normales. Escúchalas: suenan igual porque el segundo compás se reproduce con swing.', swing: true, counts: true })}
<p>El acompañamiento de shuffle más famoso alterna la quinta y la sexta sobre la fundamental, en las dos cuerdas graves:</p>
${W.score({ notes: 'e:5/0+4/2 e:5/0+4/2 e:5/0+4/4 e:5/0+4/4 e:5/0+4/2 e:5/0+4/2 e:5/0+4/4 e:5/0+4/4 | e:4/0+3/2 e:4/0+3/2 e:4/0+3/4 e:4/0+3/4 e:4/0+3/2 e:4/0+3/2 e:4/0+3/4 e:4/0+3/4 | e:6/0+5/2 e:6/0+5/2 e:6/0+5/4 e:6/0+5/4 e:6/0+5/2 e:6/0+5/2 e:6/0+5/4 e:6/0+5/4', mode: 'full', swing: true, bpm: 96, caption: 'El riff de shuffle para {A7}, {D7} y {E7}: fundamental y quinta, fundamental y sexta. Con el meñique llegarás al traste 4.' })}

<h2>La escala de blues</h2>
<p>La <strong>escala de blues</strong> es la pentatónica menor con una nota más: la <strong>♭5</strong>, la <em>blue note</em>. Se usa casi siempre de paso, entre la 4 y la 5, y le da ese sabor quejumbroso.</p>
${W.scale({ root: 'A', scale: 'blues', frets: [0, 12], steps: false, caption: 'Escala de blues de {A}: {A} {C} {D} {Eb} {E} {G}.' })}
${W.score({ notes: 'e:3/7 e:3/8 e:3/7 e:3/5 q:4/7 e:4/5 e:5/7 | q:5/6 e:5/5 e:6/8 h:5/7v | e:1/5 e:1/8 e:2/5 e:2/8b q:2/8 e:2/5 e:3/7 | e:3/5 e:4/7 e:4/5 e:5/6 h:5/7v', mode: 'full', swing: true, bpm: 88, caption: 'Frases típicas con la blue note ({Eb}, cuerda 3 traste 8 y cuerda 5 traste 6) usada de paso.' })}

<h2>Mayor y menor a la vez</h2>
<p>El blues tiene una ambigüedad deliberada: los acordes son mayores (con tercera mayor) pero la melodía usa la tercera menor de la pentatónica menor. Esa fricción es parte del lenguaje. Los guitarristas mezclan:</p>
<ul>
<li><strong>Pentatónica menor</strong> para el sonido más crudo y rockero.</li>
<li><strong>Pentatónica mayor</strong> (1 2 3 5 6) para un sonido más dulce, country o de blues de Chicago.</li>
<li>Un truco clásico: tocar la ♭3 y hacer un pequeño bend hacia la 3 mayor, a mitad de camino entre las dos.</li>
<li>Apuntar a la nota del acorde en cada cambio: sobre {D7}, la nota {C} (su ♭7) o {F#} (su tercera) suena muy bien.</li>
</ul>
${W.chordtones({ prog: ['A7', 'D7', 'A7', 'E7'], bpm: 84, frets: [0, 12], region: [4, 8], caption: 'Las notas de cada acorde del blues en la zona de la primera posición de la pentatónica. Improvisa apuntando a ellas en cada cambio.' })}`,
        practice: [
          'Toca la forma de 12 compases en {A} con el riff de shuffle, contando los compases en voz alta.',
          'Improvisa sobre el blues usando solo la pentatónica menor. Después añade la blue note de paso.',
          'Toca el blues en {E} (con {E7}, {A7} y {B7}) y en {G}. Usa el selector de tonalidad como guía.',
        ],
        quiz: [
          { q: '¿Cuántos compases tiene la forma clásica de blues?', o: ['8', '12', '16', '32'], a: 1, why: 'Tres frases de cuatro compases.' },
          { q: 'En un blues en {E}, ¿qué acorde es el IV7?', o: ['{A7}', '{B7}', '{D7}', '{C#7}'], a: 0, why: 'El cuarto grado de {E} es {A}.' },
          { q: '¿Qué nota añade la escala de blues a la pentatónica menor?', o: ['La 2', 'La ♭5', 'La 6', 'La 7 mayor'], a: 1, why: 'La blue note, ♭5.' },
          { q: '¿Qué es el shuffle?', o: ['Tocar más rápido', 'Corcheas desiguales, largo-corto, con sensación de tresillo', 'Cambiar de tonalidad', 'Un tipo de bend'], a: 1, why: 'La primera corchea dura dos tercios del pulso y la segunda uno.' },
          { q: '¿Qué tienen de especial los acordes del blues?', o: ['Son todos menores', 'Son todos de séptima de dominante', 'No tienen tercera', 'Son disminuidos'], a: 1, why: 'I7, IV7 y V7: dominantes que no resuelven.' },
        ],
      },

      /* ---------------------------------------------------------- 3.8 */
      {
        id: 'compuestos', title: 'Compases compuestos y tresillos', time: '22 min',
        desc: '6/8, 9/8 y 12/8, tresillos en 4/4 y la diferencia entre dividir en dos y en tres.',
        lead: 'Hasta ahora el pulso se dividía en dos. En los compases compuestos se divide en tres, y eso cambia por completo la sensación: el balanceo de una balada en 6/8, el 12/8 del blues lento, el aire de una jota.',
        goals: ['Distinguir compases simples y compuestos', 'Contar y tocar en 6/8 y 12/8', 'Usar tresillos dentro de un compás de 4/4'],
        body: () => `
<h2>Dividir en dos o en tres</h2>
<p>En 2/4, 3/4 y 4/4 cada pulso se divide en dos corcheas: son <strong>compases simples</strong>. En los <strong>compases compuestos</strong>, cada pulso se divide en <strong>tres</strong> corcheas, y el pulso es una negra con puntillo.</p>
<table><thead><tr><th>Compás</th><th>Pulsos</th><th>Cada pulso</th><th>Se cuenta</th></tr></thead><tbody>
<tr><td>6/8</td><td>2</td><td>3 corcheas</td><td><b>1</b> 2 3 <b>4</b> 5 6</td></tr>
<tr><td>9/8</td><td>3</td><td>3 corcheas</td><td><b>1</b> 2 3 <b>4</b> 5 6 <b>7</b> 8 9</td></tr>
<tr><td>12/8</td><td>4</td><td>3 corcheas</td><td><b>1</b> 2 3 <b>4</b> 5 6 <b>7</b> 8 9 <b>10</b> 11 12</td></tr></tbody></table>
<p>Fíjate en que 6/8 y 3/4 tienen las mismas seis corcheas, pero se agrupan de forma distinta: 3/4 son tres grupos de dos (UNO y DOS y TRES y), 6/8 son dos grupos de tres (UNO dos tres CUATRO cinco seis). Por eso las corcheas de 6/8 se unen de tres en tres.</p>
${W.score({ notes: 'e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 | q.:5/0 q.:5/0 | q:5/0 e:5/0 q:5/0 e:5/0 | q.:5/0 q.:5/0', time: [6, 8], mode: 'rhythm', counts: true, bpm: 70, caption: 'En 6/8: seis corcheas, dos negras con puntillo (los pulsos) y el ritmo “largo-corto” negra-corchea, típico de las baladas y las canciones de cuna.' })}

<h2>Arpegiar en 6/8</h2>
<p>El 6/8 es ideal para arpegiar con los dedos: una nota grave en el pulso y el resto del acorde en las corcheas. Este patrón (p i m a m i) sirve para cientos de baladas:</p>
${W.score({ notes: 'e:5/0@Am e:3/2 e:2/1 e:1/0 e:2/1 e:3/2 | e:6/0@Em e:3/0 e:2/0 e:1/0 e:2/0 e:3/0 | e:5/3@C e:3/0 e:2/1 e:1/0 e:2/1 e:3/0 | e:6/3@G e:3/0 e:2/0 e:1/3 e:2/0 e:3/0', time: [6, 8], mode: 'full', bpm: 66, caption: 'Pulgar (p) en el bajo, después índice (i) en la cuerda 3, medio (m) en la 2, anular (a) en la 1, y vuelta. Deja sonar todas las notas.' })}

<h2>12/8 y el blues lento</h2>
<p>Un 12/8 son cuatro pulsos divididos en tres: es la sensación de las baladas de blues y soul, el doo-wop y muchas canciones lentas de rock. Si pones el metrónomo en 12/8 y tocas el blues de la lección anterior muy lento, ya lo tienes.</p>
${W.trainer({ tool: 'metronomo', state: { bpm: 54, meter: '12/8' } })}

<h2>Tresillos en un compás simple</h2>
<p>También se puede dividir un pulso en tres dentro de un 4/4: es un <strong>tresillo</strong>, tres notas en el tiempo de dos, marcado con un 3. Se cuenta “1-tri-ple, 2-tri-ple”.</p>
${W.score({ notes: 'e:5/0 e:5/0 e:5/0 e:5/0 et:5/0 et:5/0 et:5/0 et:5/0 et:5/0 et:5/0 | et:4/2 et:4/0 et:5/3 q:5/0 et:4/2 et:4/0 et:5/3 q:5/0', mode: 'full', counts: true, bpm: 72, caption: 'Corcheas normales y tresillos de corchea al mismo pulso. En el segundo compás, tresillos en una melodía.' })}
<div class="callout tip"><span class="co-t">Para sentir la diferencia</span>Con el metrónomo en negras, alterna un compás de corcheas (dos por clic) con uno de tresillos (tres por clic). Di en voz alta “1 y 2 y” y luego “1 tri ple 2 tri ple”. Cuando puedas cambiar sin dudar, sabrás distinguir cualquier ritmo binario de uno ternario.</div>`,
        practice: [
          'Pon el metrónomo en 6/8 a 60 ppm de negra con puntillo y toca el arpegio de {Am} {Em} {C} {G} hasta que salga fluido.',
          'Alterna con metrónomo compases de corcheas y de tresillos sin perder el pulso.',
          'Busca una canción en 6/8 o 12/8 (muchas baladas lo están) y marca el pulso contando en grupos de tres.',
        ],
        quiz: [
          { q: '¿Cuántos pulsos tiene un compás de 6/8?', o: ['6', '3', '2', '4'], a: 2, why: 'Dos pulsos de negra con puntillo, cada uno dividido en tres corcheas.' },
          { q: '¿Qué diferencia hay entre 3/4 y 6/8?', o: ['Ninguna', '3/4 son tres pulsos divididos en dos; 6/8, dos pulsos divididos en tres', '6/8 es más rápido', '3/4 tiene más corcheas'], a: 1, why: 'Mismas corcheas, distinta agrupación.' },
          { q: 'Un tresillo de corcheas ocupa…', o: ['Un pulso de negra', 'Dos pulsos', 'Medio pulso', 'Tres pulsos'], a: 0, why: 'Tres corcheas en el tiempo de dos: una negra.' },
          { q: '¿Qué compás se asocia al blues lento?', o: ['2/4', '3/4', '12/8', '5/4'], a: 2, why: 'Cuatro pulsos ternarios.' },
        ],
      },

      /* ---------------------------------------------------------- 3.9 */
      {
        id: 'pentatonica-completa', title: 'Las cinco posiciones de la pentatónica', time: '30 min',
        desc: 'Todo el mástil con la pentatónica menor y mayor, y cómo se conectan.',
        lead: 'La caja del traste 5 es solo una de las cinco formas de la pentatónica. Juntas cubren todo el mástil y te permiten improvisar en cualquier zona sin perderte.',
        goals: ['Tocar las cinco posiciones de la pentatónica menor', 'Usar las mismas formas como pentatónica mayor', 'Conectar posiciones para recorrer el mástil'],
        body: () => `
<h2>Cinco cajas que encajan</h2>
<p>Las notas de la pentatónica se repiten por todo el diapasón. Si las agrupas en zonas de cuatro o cinco trastes, salen cinco formas o <strong>posiciones</strong>. Cada una empieza donde termina la anterior, y después de la quinta vuelve la primera doce trastes más arriba.</p>
${W.positions({ root: 'A', scale: 'pentMinor', frets: [0, 17], positions: [{ frets: [5, 8] }, { frets: [7, 10] }, { frets: [9, 13] }, { frets: [12, 15] }, { frets: [14, 17] }], caption: 'Las cinco posiciones de la pentatónica de {A} menor. La quinta (trastes 14-17) es la misma que la que hay entre los trastes 2 y 5. Cambia la tónica para moverlas.' })}
<p>No hace falta aprenderlas como cinco dibujos sueltos. Fíjate en las fundamentales (rojas): cada posición tiene dos o tres, y siempre en las mismas cuerdas. Si sabes dónde está la fundamental, sabes qué posición tienes debajo.</p>
<div class="callout tip"><span class="co-t">Orden de estudio</span>La posición 1 ya la conoces. Aprende después la 2 (justo a su derecha) y practica pasar de una a otra. Luego la 5 (a la izquierda de la 1). Con esas tres cubres casi todo lo que tocan los guitarristas de blues y rock. La 3 y la 4 llegan después.</div>

<h2>Las mismas formas son la pentatónica mayor</h2>
<p>La pentatónica mayor (1 2 3 5 6) tiene las mismas notas que la pentatónica menor de su relativa. {C} mayor pentatónica = {A} menor pentatónica: {C} {D} {E} {G} {A}. Solo cambia la nota que haces de centro.</p>
${W.positions({ root: 'C', scale: 'pentMajor', frets: [0, 17], positions: [{ frets: [2, 5], label: 'Forma 1' }, { frets: [5, 8], label: 'Forma 2' }, { frets: [7, 10], label: 'Forma 3' }, { frets: [9, 13], label: 'Forma 4' }, { frets: [12, 15], label: 'Forma 5' }], caption: 'Pentatónica de {C} mayor: las mismas cajas, con las fundamentales en otro sitio.' })}
<p>El atajo práctico: la pentatónica <strong>mayor</strong> de una nota es la <strong>menor</strong> tres trastes más abajo. Para tocar en {G} mayor, usa las formas de {E} menor. Para tocar en {A} mayor, las de {F#} menor (la caja 1 en el traste 2).</p>
${W.listen({ gap: 0.25, items: [{ label: 'Pentatónica de {A} menor', notes: [45, 48, 50, 52, 55, 57, 60, 62, 64, 67, 69] }, { label: 'Pentatónica de {A} mayor', notes: [45, 47, 49, 52, 54, 57, 59, 61, 64, 66, 69] }] })}

<h2>Recorrer el mástil</h2>
<p>Para que el mástil deje de ser una colección de cajas:</p>
<ul>
<li><strong>Toca una frase en una posición y repítela en la siguiente.</strong> Las mismas notas, en otro sitio y con otro timbre.</li>
<li><strong>Usa los arrastres para cambiar de posición</strong>: un slide en la cuerda 3 o en la 1 te lleva de una caja a la siguiente sin cortar la frase.</li>
<li><strong>Toca en diagonal</strong>: dos cuerdas en la posición 1, dos en la 2, dos en la 3. Es como se mueven los solistas por el diapasón.</li>
<li><strong>Relaciónalas con CAGED</strong>: cada posición de la pentatónica rodea una forma de acorde. La posición 1 de la menor rodea la forma de {E} menor; la 2, la de {D} menor, y así sucesivamente.</li>
</ul>
${W.score({ notes: 'q:3/5 e:3/7 e:3/9s q:3/12 e:2/10 e:2/13 | q:1/12 e:1/15 e:1/12 q:2/13 q:2/10v | e:3/12 e:3/9 e:4/12 e:4/10 e:5/12 e:5/10 q:6/12 | w:5/12v', mode: 'full', bpm: 76, caption: 'Una frase que sube en diagonal desde la posición 1 a la 4 de {A} menor usando un arrastre en la cuerda 3.' })}`,
        practice: [
          'Toca las posiciones 1 y 2 de la pentatónica de {A} menor una detrás de otra, con metrónomo a 70 ppm en corcheas.',
          'Improvisa sobre el blues en {A} quedándote solo en la posición 2. Después solo en la 5.',
          'Usa las formas de {E} menor para improvisar sobre una progresión en {G} mayor ({G} {C} {D}). Escucha cómo cambia el carácter.',
        ],
        quiz: [
          { q: '¿Cuántas posiciones tiene la pentatónica?', o: ['3', '5', '7', '12'], a: 1, why: 'Cinco formas que cubren todo el mástil y se repiten cada 12 trastes.' },
          { q: 'La pentatónica de {D} mayor tiene las mismas notas que la de…', o: ['{D} menor', '{B} menor', '{F#} menor', '{A} menor'], a: 1, why: 'La relativa menor de {D} es {B}.' },
          { q: 'Para tocar la pentatónica de {A} mayor con las formas de la menor, usas la de…', o: ['{C} menor', '{F#} menor', '{E} menor', '{D} menor'], a: 1, why: 'Tres semitonos por debajo de {A}: {F#}.' },
          { q: '¿Qué fórmula tiene la pentatónica mayor?', o: ['1 2 3 5 6', '1 ♭3 4 5 ♭7', '1 2 4 5 6', '1 3 4 5 7'], a: 0, why: 'Escala mayor sin la 4 ni la 7.' },
        ],
      },

      /* ---------------------------------------------------------- 3.10 */
      {
        id: 'arpegios', title: 'Arpegios y fingerpicking', time: '25 min',
        desc: 'Tocar los acordes nota a nota, con púa y con dedos, y el patrón Travis.',
        lead: 'Un arpegio es un acorde tocado nota a nota. Con la mano que pulsa puedes convertir cualquier progresión en un acompañamiento delicado, y en la mano que pisa los arpegios son el puente entre acordes y solos.',
        goals: ['Arpegiar acordes con patrones de dedos p-i-m-a', 'Tocar el patrón de bajo alterno (Travis picking)', 'Tocar arpegios de tríadas y cuatriadas por el mástil'],
        body: () => `
<h2>La mano que pulsa</h2>
<p>En el fingerpicking cada dedo se encarga de unas cuerdas:</p>
<ul>
<li><strong>p (pulgar)</strong>: las cuerdas graves, 6, 5 y 4. Lleva el bajo.</li>
<li><strong>i (índice)</strong>: la cuerda 3.</li>
<li><strong>m (medio)</strong>: la cuerda 2.</li>
<li><strong>a (anular)</strong>: la cuerda 1.</li>
</ul>
<p>Con ese reparto, el arpegio más sencillo es p – i – m – a: el bajo y las tres cuerdas agudas en orden. Apoya el meñique en la tapa si te da estabilidad, pero sin tensión.</p>
${W.progression({ prog: ['C', 'Am', 'F', 'G'], bpm: 72, pattern: 'AAAAAAAA', caption: 'Una progresión arpegiada: bajo y notas del acorde subiendo y bajando, una por corchea.' })}

<h2>Patrones básicos</h2>
${W.score({ notes: 'e:5/3@C e:3/0 e:2/1 e:1/0 e:5/3 e:3/0 e:2/1 e:1/0 | e:5/0@Am e:3/2 e:2/1 e:1/0 e:5/0 e:3/2 e:2/1 e:1/0 | e:4/3@F e:3/2 e:2/1 e:1/1 e:4/3 e:3/2 e:2/1 e:1/1 | e:6/3@G e:3/0 e:2/0 e:1/3 e:6/3 e:3/0 e:2/0 e:1/3', mode: 'full', bpm: 80, caption: 'Patrón p-i-m-a dos veces por compás. En {F} se usa la versión pequeña (cuerdas 4 a 1) para no hacer cejilla.' })}
${W.score({ notes: 'e:5/3@C e:3/0 e:2/1 e:3/0 e:1/0 e:3/0 e:2/1 e:3/0 | e:5/0@Am e:3/2 e:2/1 e:3/2 e:1/0 e:3/2 e:2/1 e:3/2', mode: 'full', bpm: 80, caption: 'Patrón p-i-m-i-a-i-m-i: el índice vuelve entre cada nota aguda y crea un movimiento continuo.' })}

<h2>El bajo alterno (Travis picking)</h2>
<p>El estilo que popularizó Merle Travis y que domina el folk y el country: el pulgar alterna entre dos cuerdas graves en cada pulso, como un bajo que camina, mientras los dedos tocan las agudas a contratiempo. Al principio parece imposible coordinarlo; empieza solo con el pulgar hasta que sea automático.</p>
${W.score({ notes: 'q:5/3@C q:4/2 q:5/3 q:4/2 | e:5/3 e:2/1 e:4/2 e:3/0 e:5/3 e:2/1 e:4/2 e:3/0 | e:6/3@G e:2/0 e:4/0 e:3/0 e:6/3 e:2/0 e:4/0 e:3/0 | e:5/3@C e:2/1+1/0 e:4/2 e:3/0 h:5/3+3/0+2/1+1/0', mode: 'full', bpm: 76, caption: 'Primer compás: solo el pulgar alternando. Después, los dedos en las “y”. El pulgar toca en todos los pulsos sin excepción.' })}
<div class="callout tip"><span class="co-t">La clave del Travis</span>El pulgar es el metrónomo. Si se para o duda cuando entran los dedos, vuelve a tocar solo el bajo. Practica muy lento (50-60 ppm) y apaga ligeramente las cuerdas graves con el canto de la mano para que el bajo suene más percusivo.</div>

<h2>Arpegios con la mano que pisa</h2>
<p>En los solos, un arpegio es tocar las notas de un acorde una tras otra, a menudo por varias octavas. Son la forma más directa de que una melodía “suene al acorde”. Como siempre, cada tipo de acorde tiene una forma móvil:</p>
${W.fretboard({ frets: [0, 15], show: { root: 'C', chord: 'maj7' }, label: 'interval', region: [7, 10], pick: { chords: ['', 'm', 'maj7', '7', 'm7', 'm7b5', 'dim7'] }, caption: 'Las notas de cualquier acorde en todo el mástil. La zona marcada es una forma de arpegio de dos octavas con la fundamental en la cuerda 6. Cambia el tipo para comparar.' })}
<p>Un ejercicio muy útil: elige una progresión y toca el arpegio de cada acorde en la misma zona del mástil, pasando al más cercano en cada cambio. Es lo que harás al improvisar sobre cambios en el nivel 4.</p>`,
        practice: [
          'Toca el patrón p-i-m-a sobre {C} {Am} {F} {G} hasta que salga sin mirar la mano derecha.',
          'Practica el bajo alterno solo con el pulgar en {C} (cuerdas 5 y 4) y {G} (cuerdas 6 y 4) durante dos minutos. Después añade los dedos.',
          'Toca los arpegios de {Cmaj7}, {Dm7}, {Em7}, {Fmaj7} y {G7} en la zona del traste 7.',
        ],
        quiz: [
          { q: 'En fingerpicking, ¿qué dedo toca normalmente la cuerda 2?', o: ['p', 'i', 'm', 'a'], a: 2, why: 'i cuerda 3, m cuerda 2, a cuerda 1; el pulgar las graves.' },
          { q: '¿Qué caracteriza el Travis picking?', o: ['Rasgueo con púa', 'El pulgar alterna dos bajos en cada pulso mientras los dedos tocan a contratiempo', 'Solo se tocan las cuerdas agudas', 'Tocar con ligados'], a: 1, why: 'El bajo alterno constante es su seña de identidad.' },
          { q: 'Un arpegio de {Dm7} contiene…', o: ['{D} {F} {A} {C}', '{D} {F#} {A} {C}', '{D} {F} {Ab} {C}', '{D} {F} {A} {C#}'], a: 0, why: '1 ♭3 5 ♭7 desde {D}.' },
        ],
      },
    ],
  });
})();
