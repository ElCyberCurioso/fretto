/* Fretto · Nivel 2: Elemental */
(function () {
  'use strict';
  const M = window.M, W = M.W;
  M.course = M.course || [];

  M.course.push({
    id: 'n2', n: 2, title: 'Teoría práctica',
    desc: 'Leer partitura, intervalos, la escala mayor, cómo se forman los acordes, tonalidades, cejilla y tu primera escala para improvisar.',
    long: 'El nivel en el que la guitarra empieza a tener lógica: por qué los acordes tienen esas notas, por qué ciertos acordes suenan bien juntos, cómo mover cualquier forma por el mástil y cómo empezar a improvisar.',
    lessons: [

      /* ---------------------------------------------------------- 2.1 */
      {
        id: 'pentagrama', title: 'Leer partitura: el pentagrama', time: '20 min',
        desc: 'Líneas, espacios, clave de sol y las notas de la primera posición.',
        lead: 'La partitura dice exactamente qué nota suena y cuánto dura. Para la guitarra se escribe en un solo pentagrama con clave de sol, y en esta lección aprenderás a leer todas las notas de la primera posición.',
        goals: ['Leer las notas en líneas y espacios con clave de sol', 'Entender por qué la guitarra suena una octava más grave de lo escrito', 'Tocar desde la partitura las notas de los trastes 0 a 3'],
        body: () => `
<h2>Cinco líneas y cuatro espacios</h2>
<p>El <strong>pentagrama</strong> son cinco líneas horizontales. Las notas se colocan en las líneas o en los espacios entre ellas, y cuanto más arriba, más aguda es la nota. Las líneas y los espacios se cuentan <strong>de abajo arriba</strong>: la primera línea es la de abajo.</p>
<p>Al principio de cada pentagrama aparece una <strong>clave</strong>, que fija qué nota corresponde a una línea. La guitarra usa la <strong>clave de sol</strong>: su espiral rodea la segunda línea, y la nota de esa línea es {G}. A partir de ahí, cada línea o espacio hacia arriba es la nota siguiente.</p>
${W.score({ notes: 'h:E4 h:G4 h:B4 h:D5 h:F5', mode: 'staff', noTime: true, metro: false, bpm: 100, caption: 'Las notas de las cinco líneas, de abajo arriba: {E}, {G}, {B}, {D}, {F}.' })}
${W.score({ notes: 'h:F4 h:A4 h:C5 h:E5', mode: 'staff', noTime: true, metro: false, bpm: 100, caption: 'Las notas de los cuatro espacios: {F}, {A}, {C}, {E}.' })}
<div class="callout tip"><span class="co-t">Para memorizarlo</span>Las líneas son notas alternas desde {E}: {E} {G} {B} {D} {F}. Los espacios rellenan los huecos: {F} {A} {C} {E}. Si te sabes una nota, la siguiente siempre está en el hueco o la línea inmediata.</div>

<h2>Líneas adicionales</h2>
<p>Cuando una nota es más grave o más aguda de lo que cabe en el pentagrama, se escribe sobre pequeñas <strong>líneas adicionales</strong>. La guitarra baja bastante por debajo del pentagrama, así que las verás a menudo:</p>
${W.score({ notes: 'h:D4 h:C4 h:B3 h:A3 | h:G3 h:F3 w:E3', mode: 'full', noTime: true, metro: false, bpm: 100, caption: 'Por debajo de la primera línea: {D} (espacio de debajo), {C} (primera línea adicional), {B}, {A} (segunda línea), {G}, {F} (tercera línea) y {E}, la cuerda 6 al aire.' })}

<h2>La guitarra suena una octava más grave</h2>
<p>Fíjate en el pequeño 8 bajo la clave de sol. Indica que la guitarra <strong>suena una octava por debajo</strong> de lo que se escribe. Se hace así para que las notas graves no necesiten un montón de líneas adicionales. Es una convención: tú lees y tocas sin pensar en ello, pero explica por qué el {E} de la cuerda 6 aparece escrito como {E_3} cuando suena {E_2}. Muchas partituras omiten el 8 y se sobreentiende.</p>

<h2>Del diapasón al pentagrama</h2>
<p>Pulsa cualquier traste: verás dónde se escribe esa nota y su tablatura. Empieza por los trastes 0 a 3 de cada cuerda, que forman la <strong>primera posición</strong>.</p>
${W.staffnotes({ frets: [0, 12], tab: true })}
<table><thead><tr><th>Cuerda</th><th>Al aire</th><th>Traste 1</th><th>Traste 2</th><th>Traste 3</th></tr></thead><tbody>
<tr><td>1</td><td>{E} (4.º espacio)</td><td>{F} (5.ª línea)</td><td></td><td>{G} (encima)</td></tr>
<tr><td>2</td><td>{B} (3.ª línea)</td><td>{C} (3.er espacio)</td><td></td><td>{D} (4.ª línea)</td></tr>
<tr><td>3</td><td>{G} (2.ª línea)</td><td></td><td>{A} (2.º espacio)</td><td></td></tr>
<tr><td>4</td><td>{D} (debajo)</td><td></td><td>{E} (1.ª línea)</td><td>{F} (1.er espacio)</td></tr>
<tr><td>5</td><td>{A} (2 líneas adic.)</td><td></td><td>{B} (bajo la 1.ª adic.)</td><td>{C} (1.ª línea adic.)</td></tr>
<tr><td>6</td><td>{E} (bajo la 3.ª adic.)</td><td>{F} (3.ª línea adic.)</td><td></td><td>{G} (bajo la 2.ª adic.)</td></tr>
</tbody></table>
<p>En primera posición, el dedo que pisa coincide con el traste: dedo 1 en el traste 1, dedo 2 en el 2, dedo 3 en el 3.</p>

<h2>Lee y toca</h2>
<p>Dos ejercicios: una melodía en las cuerdas agudas y una línea de bajo en las graves. Intenta leer el pentagrama sin mirar la tablatura (tápala con la mano si hace falta).</p>
${W.score({ notes: 'q:C5 q:D5 q:E5 q:C5 | q:C5 q:D5 q:E5 q:C5 | q:E5 q:F5 h:G5 | q:E5 q:F5 h:G5 | e:G5 e:A5 e:G5 e:F5 q:E5 q:C5 | e:G5 e:A5 e:G5 e:F5 q:E5 q:C5 | q:C5 q:G4 h:C5 | q:C5 q:G4 h:C5', mode: 'full', bpm: 92, caption: 'Martinillo (canción tradicional). Todo en las cuerdas 1, 2 y 3.' })}
${W.score({ notes: 'q:E3 q:F3 q:G3 q:A3 | q:B3 q:C4 q:D4 q:E4 | q:F4 q:E4 q:D4 q:C4 | q:B3 q:A3 q:G3 q:F3 | w:E3', mode: 'full', bpm: 80, caption: 'Las notas naturales de las cuerdas 6, 5 y 4, subiendo y bajando.' })}
<h2>Entrena la lectura</h2>
${W.trainer({ tool: 'lectura', state: { level: 'top', mode: 'name' } })}`,
        practice: [
          'Usa el entrenador de lectura en el nivel “Cuerdas 1, 2 y 3” hasta acertar diez seguidas. Después pasa a “Cuerdas 4, 5 y 6”.',
          'Toca Martinillo leyendo solo el pentagrama. Cuando te salga, tócalo con metrónomo a 80 ppm.',
          'Coge cualquier partitura de guitarra sencilla (un método o una pieza de iniciación) y escribe a lápiz el nombre de las notas de los dos primeros compases.',
        ],
        quiz: [
          { q: 'En clave de sol, ¿qué nota está en la segunda línea?', o: ['{E}', '{G}', '{B}', '{F}'], a: 1, why: 'La espiral de la clave de sol rodea la segunda línea y la convierte en {G}.' },
          { q: '¿Qué notas están en los espacios del pentagrama, de abajo arriba?', o: ['{E} {G} {B} {D}', '{F} {A} {C} {E}', '{C} {E} {G} {B}', '{D} {F} {A} {C}'], a: 1, why: 'Los cuatro espacios forman {F} {A} {C} {E}.' },
          { q: 'El 8 bajo la clave de sol indica que la guitarra…', o: ['Tiene 8 notas', 'Suena una octava más grave de lo escrito', 'Se toca en el traste 8', 'Va en compás de 8'], a: 1, why: 'Es una clave octavada: lo escrito suena una octava más abajo.' },
          { q: 'La nota en la 5.ª línea es {F}. ¿En qué cuerda y traste se toca en primera posición?', o: ['Cuerda 1, traste 1', 'Cuerda 2, traste 1', 'Cuerda 4, traste 3', 'Cuerda 6, traste 1'], a: 0, why: '{F} de la 5.ª línea es la cuerda 1 en el traste 1. Los otros {F} se escriben más abajo.' },
          { q: 'La cuerda 6 al aire se escribe…', o: ['En la primera línea', 'Debajo de tres líneas adicionales', 'En el primer espacio', 'Sobre la quinta línea'], a: 1, why: 'Es {E_3} escrito, bajo la tercera línea adicional inferior.' },
        ],
      },

      /* ---------------------------------------------------------- 2.2 */
      {
        id: 'partitura-detalles', title: 'Leer partitura: alteraciones, armadura y duración', time: '18 min',
        desc: 'Sostenidos y bemoles en el pentagrama, armadura, puntillo, ligaduras y repeticiones.',
        lead: 'Con las notas naturales ya puedes leer melodías sencillas. Aquí completas el vocabulario: cómo se escriben las alteraciones, qué es la armadura y los signos que modifican la duración.',
        goals: ['Leer alteraciones y saber hasta dónde afectan', 'Interpretar la armadura de clave', 'Usar el puntillo y la ligadura de prolongación', 'Seguir las repeticiones de una partitura'],
        body: () => `
<h2>Alteraciones en la partitura</h2>
<p>Un sostenido, bemol o becuadro se escribe <strong>a la izquierda</strong> de la nota, en su misma línea o espacio. Y hay una regla que conviene grabar: la alteración afecta a esa nota <strong>hasta el final del compás</strong>. En el siguiente compás vuelve a ser natural, salvo que se repita la alteración.</p>
${W.score({ notes: 'q:F4 q:F#4 q:G4 q:F#4 | q:F4 q:E4 q:F#4 q:F4 | h:G4 h:G4', mode: 'full', bpm: 76, caption: 'En el primer compás el segundo {F#} ya no necesita el sostenido. En el segundo compás, el {F} vuelve a ser natural; cuando aparece otra vez sostenido y luego natural, el becuadro (♮) lo deja claro.' })}

<h2>La armadura</h2>
<p>Si una pieza usa siempre ciertas alteraciones, en lugar de escribirlas cada vez se ponen una sola vez al principio de cada pentagrama, junto a la clave: es la <strong>armadura</strong>. Afecta a <strong>todas las notas de ese nombre</strong>, en cualquier octava, durante toda la pieza.</p>
${W.score({ notes: 'q:G4 q:A4 q:B4 q:C5 | q:D5 q:E5 q:F#5 q:G5 | q:F#5 q:E5 q:D5 q:F4 | w:G4', mode: 'full', key: 1, bpm: 84, caption: 'Con un sostenido en la armadura (en la línea de {F}), todos los {F} son {F#}. Si el compositor quiere un {F} natural, tiene que escribir un becuadro, como en el tercer compás.' })}
<p>La armadura te dice además en qué <strong>tonalidad</strong> está la pieza, algo que verás en las próximas lecciones. Por ahora basta con que mires siempre la armadura antes de empezar a tocar.</p>

<h2>Puntillo y ligadura</h2>
<p>El <strong>puntillo</strong> es un punto a la derecha de la nota que <strong>añade la mitad de su valor</strong>. Una blanca con puntillo dura 2 + 1 = 3 tiempos; una negra con puntillo, 1 + ½ = 1½.</p>
<p>La <strong>ligadura de prolongación</strong> es un arco que une dos notas <strong>de la misma altura</strong>: la segunda no se toca, solo se suma su duración a la primera. Sirve para que una nota atraviese la barra de compás o para duraciones que no tienen una figura propia.</p>
${W.score({ notes: 'h.:A4 q:G4 | q.:E4 e:G4 h:A4 | h:A4~ q:A4 q:C5 | w:D5', mode: 'full', bpm: 80, counts: true, caption: 'Blanca con puntillo (3 tiempos), negra con puntillo y corchea, y una ligadura que alarga la blanca un tiempo más.' })}
<div class="callout"><span class="co-t">No confundas las ligaduras</span>Un arco entre dos notas <em>iguales</em> es de prolongación: suena una sola vez. Un arco entre notas <em>distintas</em> es de expresión: se tocan ligadas, sin cortar el sonido; en guitarra eso suele significar un ligado ascendente o descendente.</div>

<h2>Repeticiones y saltos</h2>
<p>Para no escribir dos veces lo mismo, la partitura usa signos de navegación:</p>
<table><thead><tr><th>Signo</th><th>Significado</th></tr></thead><tbody>
<tr><td>Barras de repetición (‖: … :‖)</td><td>Toca dos veces lo que hay entre ellas. Si solo está la de cierre, se repite desde el principio.</td></tr>
<tr><td>Casillas 1 y 2</td><td>La primera vez tocas la casilla 1; al repetir, la saltas y tocas la 2.</td></tr>
<tr><td>D.C. (<em>da capo</em>)</td><td>Vuelve al principio.</td></tr>
<tr><td>D.S. (<em>dal segno</em>)</td><td>Vuelve al signo 𝄋.</td></tr>
<tr><td>Coda (𝄌)</td><td>Salta a la sección final marcada con ese signo. “D.C. al Coda” significa: vuelve al principio y, al llegar al primer 𝄌, salta a la coda.</td></tr>
<tr><td>Fine</td><td>Final de la pieza tras un D.C. o D.S.</td></tr></tbody></table>

<h2>Volumen y carácter</h2>
<p>Las partituras indican también la <strong>dinámica</strong> (el volumen) con abreviaturas italianas: <em>pp</em> (muy suave), <em>p</em> (suave), <em>mp</em>, <em>mf</em> (medio), <em>f</em> (fuerte), <em>ff</em> (muy fuerte). Un regulador abierto (&lt;) indica <em>crescendo</em>, ir subiendo de volumen; uno cerrado (&gt;), <em>diminuendo</em>. Y el tempo se indica con números (♩ = 90) o con palabras como <em>Andante</em> (al paso), <em>Moderato</em> o <em>Allegro</em> (rápido): las tienes en el <a href="#/herramienta/metronomo">metrónomo</a>.</p>`,
        practice: [
          'En el entrenador de lectura, nivel “Primera posición con alteraciones”, aprende a distinguir {F#}, {C#} y {Bb} en primera posición.',
          'Toca el ejemplo de la armadura recordando que todos los {F} son sostenidos excepto el del becuadro.',
          'Busca en una partitura un puntillo, una ligadura de prolongación y una barra de repetición, y explica en voz alta cómo se tocan.',
        ],
        quiz: [
          { q: '¿Hasta dónde afecta un sostenido escrito delante de una nota?', o: ['Solo a esa nota', 'Hasta el final del compás', 'Hasta el final de la pieza', 'A todas las notas del pentagrama'], a: 1, why: 'Las alteraciones accidentales duran hasta la barra de compás.' },
          { q: 'Una armadura con un sostenido en la línea de {F}…', o: ['Afecta solo al primer {F}', 'Convierte todos los {F} en {F#}', 'Indica que la pieza está en {F}', 'Sube toda la pieza un semitono'], a: 1, why: 'La armadura afecta a todas las notas de ese nombre en toda la pieza.' },
          { q: '¿Cuánto dura una blanca con puntillo en 4/4?', o: ['2 tiempos', '2½ tiempos', '3 tiempos', '4 tiempos'], a: 2, why: 'El puntillo suma la mitad: 2 + 1 = 3.' },
          { q: 'Un arco que une dos notas iguales indica…', o: ['Tocarlas más fuerte', 'Que la segunda no se toca y se suma su duración', 'Ligado ascendente', 'Repetir el compás'], a: 1, why: 'Es una ligadura de prolongación.' },
          { q: '¿Qué significa D.C.?', o: ['Desde la coda', 'Volver al principio', 'Doble compás', 'Diminuendo'], a: 1, why: '<em>Da capo</em>: desde la cabeza, es decir, desde el principio.' },
        ],
      },

      /* ---------------------------------------------------------- 2.3 */
      {
        id: 'intervalos', title: 'Intervalos', time: '25 min',
        desc: 'La distancia entre dos notas: nombres, sonidos y formas en el mástil.',
        lead: 'Un intervalo es la distancia entre dos notas. Es el concepto que más rentabilidad te va a dar: las escalas, los acordes y la armonía son combinaciones de intervalos, y en la guitarra cada intervalo tiene un dibujo fijo.',
        goals: ['Nombrar intervalos por número y calidad', 'Relacionar cada intervalo con sus semitonos y su forma en el mástil', 'Reconocer de oído los intervalos más comunes'],
        body: () => `
<h2>Número y calidad</h2>
<p>El nombre de un intervalo tiene dos partes:</p>
<ul>
<li>El <strong>número</strong> sale de contar los nombres de nota, incluyendo la primera y la última. De {C} a {E}: {C}, {D}, {E}, tres nombres, una <strong>tercera</strong>. De {C} a {G}: cinco nombres, una <strong>quinta</strong>.</li>
<li>La <strong>calidad</strong> afina la distancia exacta en semitonos: <em>mayor</em>, <em>menor</em>, <em>justa</em>, <em>aumentada</em> o <em>disminuida</em>.</li>
</ul>
<p>Hace falta la calidad porque el número solo no basta: de {C} a {E} y de {D} a {F} son terceras, pero la primera tiene 4 semitonos y la segunda 3. La primera es <strong>mayor</strong> y la segunda <strong>menor</strong>.</p>
<table><thead><tr><th>Intervalo</th><th class="c">Semitonos</th><th>Desde {C}</th><th>Cómo suena</th></tr></thead><tbody>
<tr><td>Unísono</td><td class="c">0</td><td>{C}</td><td>La misma nota</td></tr>
<tr><td>Segunda menor (2m)</td><td class="c">1</td><td>{Db}</td><td>Tensión máxima, muy cercana</td></tr>
<tr><td>Segunda mayor (2M)</td><td class="c">2</td><td>{D}</td><td>Un paso de escala</td></tr>
<tr><td>Tercera menor (3m)</td><td class="c">3</td><td>{Eb}</td><td>Color menor</td></tr>
<tr><td>Tercera mayor (3M)</td><td class="c">4</td><td>{E}</td><td>Color mayor</td></tr>
<tr><td>Cuarta justa (4J)</td><td class="c">5</td><td>{F}</td><td>Abierta, en suspenso</td></tr>
<tr><td>Cuarta aumentada / quinta disminuida</td><td class="c">6</td><td>{F#} / {Gb}</td><td>El tritono: inestable</td></tr>
<tr><td>Quinta justa (5J)</td><td class="c">7</td><td>{G}</td><td>Estable, hueca</td></tr>
<tr><td>Sexta menor (6m)</td><td class="c">8</td><td>{Ab}</td><td>Oscura</td></tr>
<tr><td>Sexta mayor (6M)</td><td class="c">9</td><td>{A}</td><td>Cálida</td></tr>
<tr><td>Séptima menor (7m)</td><td class="c">10</td><td>{Bb}</td><td>Tensión suave, bluesera</td></tr>
<tr><td>Séptima mayor (7M)</td><td class="c">11</td><td>{B}</td><td>Tensa, brillante</td></tr>
<tr><td>Octava justa (8J)</td><td class="c">12</td><td>{C}</td><td>La misma nota, más aguda</td></tr>
</tbody></table>
<p>En la guitarra, los semitonos son trastes: una tercera mayor son 4 trastes en la misma cuerda. Por eso es tan cómodo pensar en intervalos con este instrumento.</p>

<h2>Explora los intervalos</h2>
<p>Elige un intervalo para verlo y oírlo. Aparece en la misma cuerda y en las cuerdas vecinas, que es como se toca casi siempre.</p>
${W.intervals({ start: '3' })}

<h2>Las formas se repiten en todo el mástil</h2>
<p>Cada intervalo tiene un dibujo fijo, y ese dibujo funciona desde cualquier nota. Este mapa muestra todos los intervalos alrededor de un {C} en la cuerda 5, traste 3. Memoriza dónde quedan la tercera (amarilla), la quinta (azul) y la séptima (verde) respecto a la fundamental (roja): es exactamente lo que necesitarás para entender los acordes.</p>
${W.fretboard({ frets: [0, 8], show: { root: 'C', scale: 'chromatic' }, label: 'interval', region: [1, 5], caption: 'Intervalos alrededor del {C} de la cuerda 5. Observa cómo cambia la forma al cruzar de la cuerda 3 a la 2: todo se desplaza un traste.' })}
<div class="callout key"><span class="co-t">Dos atajos</span>La <strong>quinta justa</strong> está siempre en la cuerda siguiente (hacia las agudas), dos trastes más allá: es el power chord. La <strong>octava</strong>, dos cuerdas más abajo y dos trastes más allá (tres si cruzas la cuerda 2).</div>

<h2>Inversión de intervalos</h2>
<p>Si das la vuelta a un intervalo (la nota de abajo pasa arriba), obtienes su <strong>inversión</strong>. Hay dos reglas sencillas:</p>
<ul>
<li>Los números suman 9: una tercera se convierte en sexta, una segunda en séptima, una cuarta en quinta.</li>
<li>La calidad se invierte: mayor ↔ menor, aumentado ↔ disminuido, justo sigue siendo justo.</li>
</ul>
<p>Por ejemplo, {C} → {E} es una 3M; {E} → {C} (el {C} de arriba) es una 6m. Los semitonos de un intervalo y su inversión siempre suman 12.</p>

<h2>Consonancia y disonancia</h2>
<p>Los intervalos que suenan estables y en reposo se llaman <strong>consonantes</strong> (unísono, octava, quinta, cuarta, terceras y sextas). Los que suenan tensos y piden moverse son <strong>disonantes</strong> (segundas, séptimas y el tritono). La disonancia no es “mala”: es el motor de la música, la tensión que luego se resuelve.</p>
${W.listen({ items: [{ label: '5J (consonante)', notes: [48, 55], together: true }, { label: '3M (consonante)', notes: [48, 52], together: true }, { label: '7M (disonante)', notes: [48, 59], together: true }, { label: 'Tritono (disonante)', notes: [48, 54], together: true }, { label: '2m (muy disonante)', notes: [60, 61], together: true }] })}

<h2>Entrena el oído</h2>
${W.trainer({ tool: 'oido', state: { mode: 'iv', ivSet: 'basic', dir: 'up' } })}`,
        practice: [
          'Elige la cuerda 5 y toca desde {A} al aire cada intervalo de la tabla contando trastes, diciendo su nombre en voz alta.',
          'Busca la forma de la 3M y la 3m en las cuerdas 5-4 y 4-3 partiendo de varias fundamentales. Después en las cuerdas 3-2: ¿cuánto se desplaza?',
          'Haz cinco minutos de entrenamiento auditivo con el conjunto básico. Cuando aciertes más del 80 %, pasa al conjunto con segundas.',
        ],
        quiz: [
          { q: '¿Qué intervalo hay de {D} a {A}?', o: ['Cuarta justa', 'Quinta justa', 'Sexta mayor', 'Tercera mayor'], a: 1, why: '{D} {E} {F} {G} {A}: cinco nombres, 7 semitonos: quinta justa.' },
          { q: '¿Cuántos semitonos tiene una tercera menor?', o: ['2', '3', '4', '5'], a: 1, why: '3m = 3 semitonos = 3 trastes.' },
          { q: 'La inversión de una sexta mayor es…', o: ['Tercera mayor', 'Tercera menor', 'Cuarta justa', 'Sexta menor'], a: 1, why: 'Los números suman 9 (6 → 3) y la calidad se invierte (mayor → menor).' },
          { q: '¿Qué intervalo divide la octava exactamente por la mitad?', o: ['La quinta justa', 'La cuarta justa', 'El tritono', 'La sexta menor'], a: 2, why: '6 semitonos: cuarta aumentada o quinta disminuida.' },
          { q: 'En la guitarra, si la fundamental está en la cuerda 6, ¿dónde está la quinta justa más cercana hacia las agudas?', o: ['Cuerda 5, mismo traste', 'Cuerda 5, dos trastes más allá', 'Cuerda 4, dos trastes más allá', 'Cuerda 6, tres trastes más allá'], a: 1, why: 'La forma del power chord: cuerda siguiente, dos trastes más allá.' },
        ],
      },

      /* ---------------------------------------------------------- 2.4 */
      {
        id: 'escala-mayor', title: 'La escala mayor', time: '25 min',
        desc: 'La fórmula T T S T T T S, los grados y cómo tocarla en el mástil.',
        lead: 'La escala mayor es la regla de medir de la música occidental: los intervalos, los acordes y los modos se definen respecto a ella. Se construye con una fórmula de tonos y semitonos que funciona desde cualquier nota.',
        goals: ['Construir la escala mayor desde cualquier nota con la fórmula', 'Nombrar los grados de la escala', 'Tocar la escala mayor en una cuerda y en una posición'],
        body: () => `
<h2>Una fórmula de siete pasos</h2>
<p>Toca las notas naturales desde {C} hasta el siguiente {C}. Lo que suena es la <strong>escala de {C} mayor</strong>. Si miras las distancias entre notas, recordando que {E}-{F} y {B}-{C} son semitonos, sale este patrón:</p>
<p style="font:700 1.4rem/1.3 var(--ui);letter-spacing:.08em">T – T – S – T – T – T – S</p>
<p>Tono, tono, semitono, tono, tono, tono, semitono. Esa es la <strong>fórmula de la escala mayor</strong>, y lo importante es que funciona desde cualquier nota. Si empiezas en {G} y aplicas la fórmula, para que el sexto paso sea un tono necesitas {F#}, no {F}. Así nace la armadura de {G} mayor: un sostenido.</p>
${W.scale({ root: 'G', scale: 'major', frets: [0, 15], caption: 'Cambia la tónica y mira cómo aparecen sostenidos o bemoles para que la fórmula se mantenga. Pulsa cada nota para escucharla.' })}

<h2>En una sola cuerda</h2>
<p>La guitarra hace la fórmula visible. En una cuerda, un tono son dos trastes y un semitono uno. Esta es la escala de {G} mayor en la cuerda 6, desde el traste 3:</p>
${W.fretboard({ frets: [0, 15], show: { root: 'G', scale: 'major', strings: [6] }, label: 'note', legend: false, dots: null, caption: 'Trastes 3, 5, 7, 8, 10, 12, 14, 15: saltos de 2, 2, 1, 2, 2, 2, 1.' })}
<p>Tocar escalas en una cuerda es útil para entender la fórmula, pero es incómodo para tocar de verdad. Para eso se usan posiciones.</p>

<h2>En una posición</h2>
<p>Una <strong>posición</strong> es una zona de cuatro o cinco trastes en la que tocas todas las notas sin mover la mano, con un dedo por traste. Esta es la escala de {G} mayor en la posición del traste 2 (dedo 1 en el traste 2), una de las más usadas:</p>
${W.fretboard({ frets: [0, 8], show: { root: 'G', scale: 'major' }, label: 'interval', region: [2, 5], caption: 'La zona marcada es la posición. La fundamental (R) aparece en las cuerdas 6, 4 y 1: busca siempre las fundamentales para orientarte.' })}
${W.score({ notes: 'e:G3 e:A3 e:B3 e:C4 e:D4 e:E4 e:F#4 e:G4 | e:A4 e:B4 e:C5 e:D5 e:E5 e:F#5 q:G5 | e:F#5 e:E5 e:D5 e:C5 e:B4 e:A4 e:G4 e:F#4 | e:E4 e:D4 e:C4 e:B3 e:A3 e:B3 q:G3', mode: 'full', key: 1, position: 3.5, bpm: 88, caption: 'Escala de {G} mayor en dos octavas, subiendo y bajando. Mira la armadura: todos los {F} son sostenidos.' })}
<div class="callout tip"><span class="co-t">Un dedo por traste</span>En la posición del traste 2, el dedo 1 toca el traste 2, el 2 el 3, el 3 el 4 y el 4 el 5. No muevas la mano: estira los dedos. Si te cuesta llegar con el meñique, practica más despacio; esa extensión es la que te dará independencia.</div>

<h2>Los grados de la escala</h2>
<p>Cada nota de la escala tiene un número, su <strong>grado</strong>, y un nombre tradicional. Son importantes porque describen la función de cada nota sin depender de la tonalidad.</p>
<table><thead><tr><th class="c">Grado</th><th>Nombre</th><th>En {C}</th><th>En {G}</th><th>Papel</th></tr></thead><tbody>
<tr><td class="c">1</td><td>Tónica</td><td>{C}</td><td>{G}</td><td>El centro: donde la música reposa</td></tr>
<tr><td class="c">2</td><td>Supertónica</td><td>{D}</td><td>{A}</td><td>Paso hacia la dominante</td></tr>
<tr><td class="c">3</td><td>Mediante</td><td>{E}</td><td>{B}</td><td>Define el carácter mayor</td></tr>
<tr><td class="c">4</td><td>Subdominante</td><td>{F}</td><td>{C}</td><td>Aleja de la tónica</td></tr>
<tr><td class="c">5</td><td>Dominante</td><td>{G}</td><td>{D}</td><td>Tensión que pide volver a la tónica</td></tr>
<tr><td class="c">6</td><td>Superdominante</td><td>{A}</td><td>{E}</td><td>Tónica de la relativa menor</td></tr>
<tr><td class="c">7</td><td>Sensible</td><td>{B}</td><td>{F#}</td><td>A un semitono de la tónica: tira hacia ella</td></tr>
</tbody></table>
<p>Escucha la fuerza de la sensible: toca la escala de {G} y párate en el {F#}. Tu oído pedirá el {G}.</p>
${W.listen({ gap: 0.4, items: [{ label: 'Escala que termina en la sensible', notes: [43, 45, 47, 48, 50, 52, 54] }, { label: 'Y su resolución', notes: [50, 52, 54, 55] }] })}

<h2>Todas las escalas mayores</h2>
<p>Como la fórmula es siempre la misma, todas las escalas mayores suenan igual, solo que más agudas o más graves. Y la forma en el mástil también es la misma: si mueves la posición de {G} dos trastes hacia el cuerpo, tienes la escala de {A} mayor. Esta idea, <strong>formas móviles</strong>, es una de las grandes ventajas de la guitarra.</p>`,
        practice: [
          'Escribe la escala mayor de {D}, {A} y {F} aplicando la fórmula. Comprueba el resultado con el selector de la escala interactiva.',
          'Toca la escala de {G} mayor en posición del traste 2 con metrónomo a 60 ppm, en corcheas, subiendo y bajando dos octavas.',
          'Mueve la misma forma al traste 4 (escala de {A}) y al traste 7 (escala de {D}) diciendo el nombre de la tónica cada vez que la pisas.',
        ],
        quiz: [
          { q: '¿Cuál es la fórmula de la escala mayor?', o: ['T S T T S T T', 'T T S T T T S', 'T T T S T T S', 'S T T T S T T'], a: 1, why: 'Tono, tono, semitono, tono, tono, tono, semitono.' },
          { q: '¿Qué alteración tiene la escala de {D} mayor?', o: ['Ninguna', '{F#} y {C#}', '{Bb}', '{F#}'], a: 1, why: '{D} {E} {F#} {G} {A} {B} {C#}: dos sostenidos.' },
          { q: '¿Cómo se llama el quinto grado?', o: ['Tónica', 'Subdominante', 'Dominante', 'Sensible'], a: 2, why: 'El V es la dominante: la nota de mayor tensión hacia la tónica.' },
          { q: 'En la escala de {F} mayor, ¿qué nota es el cuarto grado?', o: ['{B}', '{Bb}', '{A#}', '{C}'], a: 1, why: '{F} {G} {A} y un semitono: {Bb}. Se escribe con bemol, no {A#}, porque cada letra debe aparecer una vez.' },
          { q: 'Si mueves la forma de la escala de {G} mayor tres trastes hacia el cuerpo, obtienes…', o: ['{A} mayor', '{Bb} mayor', '{B} mayor', '{C} mayor'], a: 1, why: '{G} + 3 semitonos = {Bb}.' },
        ],
      },

      /* ---------------------------------------------------------- 2.5 */
      {
        id: 'triadas', title: 'Cómo se forman los acordes', time: '25 min',
        desc: 'Tríadas mayores, menores, disminuidas y aumentadas, suspendidas y power chords.',
        lead: 'Un acorde no es una forma de dedos: son unas notas concretas apiladas por terceras. Cuando entiendes eso, sabes por qué {E} y {Em} se diferencian en un solo dedo y puedes construir cualquier acorde.',
        goals: ['Construir tríadas apilando terceras', 'Distinguir mayor, menor, disminuida y aumentada por sus intervalos', 'Ver la fundamental, la tercera y la quinta dentro de los acordes abiertos', 'Usar acordes suspendidos y power chords'],
        body: () => `
<h2>Apilar terceras</h2>
<p>La <strong>tríada</strong> es el acorde básico: tres notas separadas por terceras. Se nombran respecto a la nota de abajo, la <strong>fundamental</strong>:</p>
<ul>
<li>La <strong>fundamental</strong> (R o 1): da nombre al acorde.</li>
<li>La <strong>tercera</strong> (3): decide si es mayor o menor.</li>
<li>La <strong>quinta</strong> (5): refuerza y da cuerpo.</li>
</ul>
<p>Combinando terceras mayores (4 semitonos) y menores (3 semitonos) salen las cuatro tríadas:</p>
<table><thead><tr><th>Tríada</th><th>Terceras</th><th>Intervalos</th><th>Ejemplo</th><th>Símbolo</th></tr></thead><tbody>
<tr><td>Mayor</td><td>3M + 3m</td><td>1 – 3 – 5</td><td>{C} {E} {G}</td><td>{C}</td></tr>
<tr><td>Menor</td><td>3m + 3M</td><td>1 – ♭3 – 5</td><td>{C} {Eb} {G}</td><td>{Cm}</td></tr>
<tr><td>Disminuida</td><td>3m + 3m</td><td>1 – ♭3 – ♭5</td><td>{C} {Eb} {Gb}</td><td>{Cdim}, C°</td></tr>
<tr><td>Aumentada</td><td>3M + 3M</td><td>1 – 3 – ♯5</td><td>{C} {E} {G#}</td><td>{Caug}, C+</td></tr></tbody></table>
${W.chordbuilder({ root: 'C', type: '', caption: 'Elige fundamental y tipo: verás las notas, la distancia entre ellas, dónde están en el mástil y varias formas de tocarlas. Los colores marcan la función: <b>rojo</b> fundamental, <b>amarillo</b> tercera, <b>azul</b> quinta.' })}

<h2>Los acordes abiertos por dentro</h2>
<p>Un acorde de guitarra suele tener cinco o seis cuerdas sonando, pero solo tres notas distintas: las demás son repeticiones en otras octavas. Mira qué es cada nota en los acordes que ya conoces:</p>
${W.chords({ label: 'interval', items: ['C', 'A', 'G', 'E', 'D', 'Am', 'Em', 'Dm'] })}
<p>Ahora queda claro por qué {E} y {Em} solo se diferencian en un dedo: en la cuerda 3, {E} tiene la tercera mayor ({G#}, traste 1) y {Em} la tercera menor ({G}, al aire). Lo mismo pasa entre {A} y {Am} en la cuerda 2, y entre {D} y {Dm} en la cuerda 1.</p>
${W.listen({ items: [{ label: '{C} mayor', notes: [48, 52, 55], together: true }, { label: '{Cm} menor', notes: [48, 51, 55], together: true }, { label: '{Cdim} disminuido', notes: [48, 51, 54], together: true }, { label: '{Caug} aumentado', notes: [48, 52, 56], together: true }] })}

<h2>Acordes suspendidos</h2>
<p>Si en lugar de la tercera pones la cuarta o la segunda, el acorde deja de ser mayor o menor: queda “suspendido”, abierto, a la espera.</p>
<ul><li><strong>sus4</strong>: 1 – 4 – 5. Pide resolver a la tercera: {Dsus4} → {D}.</li><li><strong>sus2</strong>: 1 – 2 – 5. Más ambiguo y luminoso, muy usado en pop y folk.</li></ul>
${W.chords({ label: 'interval', items: ['Dsus4', 'D', 'Dsus2', 'Asus4', 'A', 'Asus2', 'Esus4'] })}
${W.progression({ prog: ['D', 'Dsus4', 'D', 'Dsus2'], bpm: 84, pattern: 'D.DU.UDU', caption: 'El adorno sus4-sus2 sobre {D} es un recurso clásico del rock y el folk: solo mueves el meñique y el índice.' })}

<h2>El power chord</h2>
<p>El <strong>acorde de quinta</strong> o <em>power chord</em> tiene solo fundamental y quinta (a veces con la octava). Al no tener tercera, no es ni mayor ni menor, y por eso suena limpio y contundente con distorsión, donde las terceras se emborronan. Es la base del rock y el metal. Se escribe con un 5: {E5}, {A5}.</p>
${W.chords({ label: 'interval', items: [{ sym: 'E5', f: '022xxx', d: '012000' }, { sym: 'A5', f: 'x022xx', d: '001200' }, { sym: 'G5', f: '355xxx', d: '134000', caption: 'Móvil, raíz en la 6' }, { sym: 'C5', f: 'x355xx', d: '013400', caption: 'Móvil, raíz en la 5' }] })}
<p>La forma es la misma en todo el mástil: fundamental en la cuerda 6 o 5, quinta en la cuerda siguiente dos trastes más allá, octava en la otra cuerda en el mismo traste que la quinta. Para tocar un power chord de cualquier nota, solo tienes que saber dónde está su fundamental en las cuerdas 6 y 5.</p>
${W.score({ notes: 'e:6/0+5/2 e:6/0+5/2 e:6/0+5/2 e:6/0+5/2 q:6/3+5/5+4/5 q:6/5+5/7+4/7 | e:6/0+5/2 e:6/0+5/2 e:6/0+5/2 e:6/0+5/2 q:6/7+5/9+4/9 q:6/5+5/7+4/7', mode: 'full', bpm: 100, caption: 'Un riff con power chords: {E5}, {G5}, {A5} y {B5}. Apaga las cuerdas agudas apoyando suavemente los dedos sobre ellas.' })}`,
        practice: [
          'Con el constructor de acordes, forma las tríadas mayor y menor de {G}, {D} y {A} y comprueba qué nota cambia.',
          'En cada acorde abierto que conoces, toca solo las cuerdas que tienen la tercera. Después solo la fundamental. Escucha qué aporta cada una.',
          'Toca el riff de power chords con púa, solo hacia abajo, a 90 ppm. Después crea uno propio con cuatro power chords de las cuerdas 6 y 5.',
        ],
        quiz: [
          { q: '¿Qué intervalos tiene una tríada menor?', o: ['1 – 3 – 5', '1 – ♭3 – 5', '1 – ♭3 – ♭5', '1 – 3 – ♯5'], a: 1, why: 'Fundamental, tercera menor y quinta justa.' },
          { q: '¿Qué notas forman {G} mayor?', o: ['{G} {B} {D}', '{G} {Bb} {D}', '{G} {C} {D}', '{G} {B} {D#}'], a: 0, why: '{G} + 3M ({B}) + 5J ({D}).' },
          { q: 'Un acorde sin tercera, con fundamental y quinta, es…', o: ['Disminuido', 'Suspendido', 'Un power chord (acorde de quinta)', 'Aumentado'], a: 2, why: 'Al no tener tercera no es mayor ni menor: es un acorde de quinta.' },
          { q: 'En {Dsus4}, la tercera se sustituye por…', o: ['La segunda', 'La cuarta', 'La sexta', 'La séptima'], a: 1, why: 'sus4: 1 – 4 – 5.' },
          { q: '¿Qué tríada está formada por dos terceras menores?', o: ['Mayor', 'Menor', 'Disminuida', 'Aumentada'], a: 2, why: '3m + 3m = 1 – ♭3 – ♭5: disminuida.' },
        ],
      },

      /* ---------------------------------------------------------- 2.6 */
      {
        id: 'tonalidad', title: 'Tonalidad y acordes diatónicos', time: '25 min',
        desc: 'Los siete acordes de una tonalidad, los números romanos y por qué suenan bien juntos.',
        lead: 'Si construyes una tríada sobre cada nota de la escala mayor usando solo notas de esa escala, obtienes los siete acordes de la tonalidad. Esa familia es la base de la gran mayoría de las canciones.',
        goals: ['Armonizar la escala mayor y obtener sus siete acordes', 'Leer y escribir progresiones con números romanos', 'Saber qué acordes pertenecen a las tonalidades más usadas en guitarra'],
        body: () => `
<h2>Qué es una tonalidad</h2>
<p>Una <strong>tonalidad</strong> es un conjunto de notas (las de una escala) organizado alrededor de una nota central, la <strong>tónica</strong>, que actúa como casa: la música se aleja de ella y vuelve. Decir que una canción “está en {G}” significa que gira en torno a {G} y usa sobre todo las notas de la escala de {G} mayor.</p>

<h2>Armonizar la escala</h2>
<p>Coge la escala de {C} mayor y, sobre cada nota, apila dos terceras usando solo notas de la escala (una sí, una no):</p>
<table><thead><tr><th>Grado</th><th>Notas</th><th>Terceras</th><th>Acorde</th></tr></thead><tbody>
<tr><td>I</td><td>{C} {E} {G}</td><td>3M + 3m</td><td>{C}</td></tr>
<tr><td>ii</td><td>{D} {F} {A}</td><td>3m + 3M</td><td>{Dm}</td></tr>
<tr><td>iii</td><td>{E} {G} {B}</td><td>3m + 3M</td><td>{Em}</td></tr>
<tr><td>IV</td><td>{F} {A} {C}</td><td>3M + 3m</td><td>{F}</td></tr>
<tr><td>V</td><td>{G} {B} {D}</td><td>3M + 3m</td><td>{G}</td></tr>
<tr><td>vi</td><td>{A} {C} {E}</td><td>3m + 3M</td><td>{Am}</td></tr>
<tr><td>vii°</td><td>{B} {D} {F}</td><td>3m + 3m</td><td>{Bdim}</td></tr></tbody></table>
<p>Estos son los <strong>acordes diatónicos</strong> de {C} mayor. Como la fórmula de la escala mayor es siempre la misma, el patrón de tipos también lo es en cualquier tonalidad mayor:</p>
<p style="font:700 1.15rem/1.4 var(--ui)">Mayor – menor – menor – Mayor – Mayor – menor – disminuido</p>

<h2>Números romanos</h2>
<p>Para hablar de acordes sin depender de la tonalidad se usan <strong>números romanos</strong>: el grado de la escala sobre el que se construye el acorde. En mayúscula si es mayor (I, IV, V), en minúscula si es menor (ii, iii, vi) y con ° si es disminuido (vii°).</p>
<p>Así, “I – V – vi – IV” describe una progresión concreta sin importar la tonalidad: en {C} es {C} {G} {Am} {F}; en {G} es {G} {D} {Em} {C}. Los músicos se entienden así, y tú también deberías: cambia la tonalidad aquí y mira cómo los números se mantienen.</p>
${W.degrees({ key: 'G', modes: false, caption: 'Los siete acordes de la tonalidad. El color de abajo indica su función (lo verás en el nivel 3). Pulsa cualquiera para escucharlo.' })}

<h2>Las tonalidades de la guitarra</h2>
<p>Algunas tonalidades son mucho más cómodas que otras porque sus acordes se tocan abiertos. Estas son las cinco que más vas a usar:</p>
<table><thead><tr><th>Tono</th><th>I</th><th>ii</th><th>iii</th><th>IV</th><th>V</th><th>vi</th><th>vii°</th></tr></thead><tbody>
<tr><td><b>{C}</b></td><td>{C}</td><td>{Dm}</td><td>{Em}</td><td>{F}</td><td>{G}</td><td>{Am}</td><td>{Bdim}</td></tr>
<tr><td><b>{G}</b></td><td>{G}</td><td>{Am}</td><td>{Bm}</td><td>{C}</td><td>{D}</td><td>{Em}</td><td>{F#dim}</td></tr>
<tr><td><b>{D}</b></td><td>{D}</td><td>{Em}</td><td>{F#m}</td><td>{G}</td><td>{A}</td><td>{Bm}</td><td>{C#dim}</td></tr>
<tr><td><b>{A}</b></td><td>{A}</td><td>{Bm}</td><td>{C#m}</td><td>{D}</td><td>{E}</td><td>{F#m}</td><td>{G#dim}</td></tr>
<tr><td><b>{E}</b></td><td>{E}</td><td>{F#m}</td><td>{G#m}</td><td>{A}</td><td>{B}</td><td>{C#m}</td><td>{D#dim}</td></tr></tbody></table>
<div class="callout tip"><span class="co-t">Por qué {G} y {D} son tan populares</span>En {G} mayor los acordes principales ({G}, {C}, {D}, {Em}, {Am}) son todos abiertos. En {D}, igual con {D}, {G}, {A}, {Em}, {Bm}. Por eso tanta música de guitarra acústica está en esas tonalidades.</div>

<h2>Por qué suenan bien juntos</h2>
<p>Los acordes diatónicos comparten notas entre sí: todos salen de las mismas siete. {C} y {Am} tienen dos notas en común ({C} y {E}); {C} y {Em}, otras dos ({E} y {G}). Por eso pasar de uno a otro suena natural. Y la melodía, si usa la misma escala, encaja con cualquiera de ellos. Esto es lo que hace que puedas acompañar una canción con solo tres o cuatro acordes.</p>`,
        practice: [
          'Escribe los siete acordes diatónicos de {F} mayor siguiendo el patrón Mayor-menor-menor-Mayor-Mayor-menor-disminuido. Compruébalo con el selector.',
          'Toca en orden los acordes I, IV, V y vi de {G}, {D} y {C}. Di en voz alta el número romano de cada uno mientras lo tocas.',
          'Coge una canción que conozcas y averigua su tonalidad: escribe los acordes y busca la fila de la tabla donde encajan todos.',
        ],
        quiz: [
          { q: 'En cualquier tonalidad mayor, ¿de qué tipo es el acorde ii?', o: ['Mayor', 'Menor', 'Disminuido', 'Aumentado'], a: 1, why: 'Patrón: I mayor, ii menor, iii menor, IV mayor, V mayor, vi menor, vii° disminuido.' },
          { q: '¿Cuál es el acorde V en {D} mayor?', o: ['{G}', '{A}', '{Bm}', '{E}'], a: 1, why: 'El quinto grado de {D} es {A}, y el V es mayor.' },
          { q: 'La progresión I – V – vi – IV en {G} es…', o: ['{G} {D} {Em} {C}', '{G} {C} {Am} {D}', '{G} {D} {Am} {C}', '{G} {B} {E} {C}'], a: 0, why: 'I = {G}, V = {D}, vi = {Em}, IV = {C}.' },
          { q: '¿Qué indica un número romano en minúscula?', o: ['Acorde menor', 'Acorde mayor', 'Acorde de séptima', 'Acorde suspendido'], a: 0, why: 'Mayúscula mayor, minúscula menor; con ° disminuido.' },
          { q: '¿Qué acorde no pertenece a {C} mayor?', o: ['{Dm}', '{F}', '{E}', '{Am}'], a: 2, why: '{E} mayor lleva {G#}, que no está en la escala de {C}. El iii de {C} es {Em}.' },
        ],
      },

      /* ---------------------------------------------------------- 2.7 */
      {
        id: 'progresiones', title: 'Progresiones, transposición y capo', time: '22 min',
        desc: 'Las progresiones más usadas, cómo cambiarlas de tonalidad y cómo funciona la cejilla móvil.',
        lead: 'Un puñado de progresiones sostiene buena parte de la música popular. Conocerlas por sus números romanos te permite sacar canciones de oído, tocarlas en cualquier tonalidad y elegir la más cómoda con el capo.',
        goals: ['Reconocer las progresiones más comunes', 'Transponer una progresión a otra tonalidad', 'Usar el capo para cambiar de tonalidad manteniendo las formas'],
        body: () => `
<h2>Las progresiones que hay que conocer</h2>
<h3>I – IV – V</h3>
<p>La más antigua y la más directa: tónica, subdominante, dominante. Rock and roll, blues, country, folk, música tradicional de medio mundo.</p>
${W.progression({ prog: ['I', 'IV', 'V', 'IV'], key: 'A', bpm: 100, pattern: 'D.DUD.DU', caption: 'Cambia la tonalidad con el selector: los números no cambian, los acordes sí.' })}
<h3>I – V – vi – IV</h3>
<p>La progresión del pop por excelencia. Si se empieza por el vi (vi – IV – I – V) suena más melancólica, con la misma familia de acordes.</p>
${W.progression({ prog: ['I', 'V', 'vi', 'IV'], key: 'C', bpm: 84, pattern: 'D.DU.UDU' })}
<h3>I – vi – IV – V</h3>
<p>La de las baladas de los años 50 y el doo-wop, y de muchas canciones infantiles y de cantautor.</p>
${W.progression({ prog: ['I', 'vi', 'IV', 'V'], key: 'G', bpm: 80, pattern: 'D.D.DUDU' })}
<h3>ii – V – I</h3>
<p>La base del jazz y de la música brasileña, y también muy presente en el pop. El ii prepara el V, que resuelve en el I. La estudiarás a fondo en el nivel 4.</p>
${W.progression({ prog: ['ii', 'V', 'I', 'I'], key: 'C', bpm: 80, pattern: 'D.D.D.D.' })}
<h3>i – ♭VII – ♭VI – V (andaluza)</h3>
<p>En tonalidad menor, la cadencia andaluza baja por escalones y termina en un V mayor. Es la columna vertebral del flamenco y aparece en el rock y el pop una y otra vez.</p>
${W.progression({ prog: ['i', 'bVII', 'bVI', 'V'], key: 'A', minor: true, bpm: 92, pattern: 'D.DUD.DU', caption: 'En {A} menor: {Am} {G} {F} {E}. Fíjate en que el V es mayor ({E}, no {Em}); lo entenderás con la escala menor armónica.' })}

<h2>Transponer</h2>
<p><strong>Transponer</strong> es cambiar una canción de tonalidad. Con números romanos es inmediato: averiguas el grado de cada acorde en la tonalidad original y buscas el mismo grado en la nueva. Por ejemplo, {G} – {Em} – {C} – {D} es I – vi – IV – V en {G}; en {A} sería {A} – {F#m} – {D} – {E}.</p>
<p>Sin romanos, también puedes contar semitonos: si subes la tónica dos semitonos, sube cada acorde dos semitonos, manteniendo su tipo. {G} → {A}, {Em} → {F#m}, {C} → {D}, {D} → {E}.</p>
<p>Se transpone sobre todo para adaptar una canción a la voz: si una melodía queda demasiado aguda, bájala uno o dos tonos.</p>

<h2>El capo</h2>
<p>El <strong>capo</strong> o cejilla móvil es una pinza que pisa todas las cuerdas en un traste, como una cejuela nueva. Con él colocado, las formas de acorde de siempre suenan más agudas: cada traste sube un semitono.</p>
<table><thead><tr><th>Capo en</th><th>Forma de {G}</th><th>Forma de {C}</th><th>Forma de {D}</th><th>Forma de {E}</th><th>Forma de {A}</th></tr></thead><tbody>
<tr><td>Traste 1</td><td>{Ab}</td><td>{Db}</td><td>{Eb}</td><td>{F}</td><td>{Bb}</td></tr>
<tr><td>Traste 2</td><td>{A}</td><td>{D}</td><td>{E}</td><td>{F#}</td><td>{B}</td></tr>
<tr><td>Traste 3</td><td>{Bb}</td><td>{Eb}</td><td>{F}</td><td>{G}</td><td>{C}</td></tr>
<tr><td>Traste 4</td><td>{B}</td><td>{E}</td><td>{F#}</td><td>{G#}</td><td>{C#}</td></tr>
<tr><td>Traste 5</td><td>{C}</td><td>{F}</td><td>{G}</td><td>{A}</td><td>{D}</td></tr></tbody></table>
<p>Si una canción está en {Bb} (incómoda en guitarra, con muchas cejillas), pon el capo en el traste 3 y tócala con formas de {G}: {G} {C} {D} {Em} sonarán como {Bb} {Eb} {F} {Gm}. Los cancioneros suelen indicarlo así: “Capo 3”, seguido de los acordes tal como se digitan.</p>
<div class="callout"><span class="co-t">Pensar con capo</span>Con el capo puesto, el traste del capo pasa a ser tu “traste 0”. Las tablaturas escritas para capo cuentan los trastes desde él: un 2 con capo en el 3 se toca en el traste 5 real.</div>

<h2>Cómo encontrar la tonalidad de una canción</h2>
<ol>
<li>Mira el <strong>primer y el último acorde</strong>: muy a menudo son la tónica.</li>
<li>Escribe todos los acordes y busca la tonalidad en la que encajan (la tabla de la lección anterior o el <a href="#/herramienta/circulo">círculo de quintas</a>).</li>
<li>Canta la nota que te parece “de reposo” al final de una frase. Esa suele ser la tónica.</li>
</ol>`,
        practice: [
          'Toca cada progresión de la lección en dos tonalidades distintas usando el selector como referencia y después sin mirarlo.',
          'Transpón {C} – {Am} – {F} – {G} a {D} y a {A}. Comprueba que los números romanos coinciden.',
          'Pon el capo en el traste 2 y toca {G} – {D} – {Em} – {C}. ¿En qué tonalidad está sonando? (Respuesta: {A}.)',
        ],
        quiz: [
          { q: '¿Qué números romanos tiene la progresión {D} – {A} – {Bm} – {G} en {D}?', o: ['I – IV – V – vi', 'I – V – vi – IV', 'I – vi – IV – V', 'IV – I – V – vi'], a: 1, why: '{D} = I, {A} = V, {Bm} = vi, {G} = IV.' },
          { q: 'Si transpones {G} – {C} – {D} un tono arriba, obtienes…', o: ['{A} – {D} – {E}', '{Ab} – {Db} – {Eb}', '{A} – {C} – {D}', '{B} – {E} – {F#}'], a: 0, why: 'Cada acorde sube dos semitonos: {G}→{A}, {C}→{D}, {D}→{E}.' },
          { q: 'Con el capo en el traste 2, la forma de {C} suena como…', o: ['{C#}', '{D}', '{E}', '{Bb}'], a: 1, why: 'Dos semitonos por encima de {C}: {D}.' },
          { q: 'Una canción está en {Eb}. ¿Qué capo y formas te permiten tocarla con acordes abiertos?', o: ['Capo 1 con formas de {D}', 'Capo 3 con formas de {E}', 'Capo 5 con formas de {G}', 'Capo 2 con formas de {C}'], a: 0, why: '{D} + 1 semitono = {Eb}. También valdría capo 3 con formas de {C}.' },
        ],
      },

      /* ---------------------------------------------------------- 2.8 */
      {
        id: 'cejilla', title: 'Acordes con cejilla', time: '25 min',
        desc: 'Las formas móviles de {E} y {A}: cualquier acorde en cualquier traste.',
        lead: 'La cejilla es la gran barrera técnica del guitarrista principiante, y también la gran liberación: con dos formas puedes tocar cualquier acorde mayor, menor o de séptima en cualquier parte del mástil.',
        goals: ['Tocar las formas de cejilla con la fundamental en la cuerda 6 y en la 5', 'Nombrar cualquier acorde con cejilla según su traste', 'Mejorar la técnica para que la cejilla suene limpia'],
        body: () => `
<h2>La idea: mover un acorde abierto</h2>
<p>Toca {E} mayor con los dedos 2, 3 y 4 (dejando libre el índice). Ahora desliza esa forma un traste hacia el cuerpo y usa el índice para pisar todas las cuerdas en el traste 1, haciendo de cejuela. Lo que suena es {F} mayor: el mismo acorde, un semitono más agudo. Eso es una <strong>cejilla</strong>.</p>
${W.chords({ items: ['E', 'F', { sym: 'G', f: '355433', d: '134211', b: 3, caption: 'Traste 3' }, { sym: 'A', f: '577655', d: '134211', b: 5, caption: 'Traste 5' }], caption: 'La forma de {E} desplazada: la fundamental está siempre en la cuerda 6, en el traste de la cejilla.' })}
<p>La regla para nombrar el acorde: <strong>mira qué nota hay en la cuerda 6 en el traste de la cejilla</strong>. Por eso en el nivel 1 memorizaste las cuerdas 6 y 5.</p>

<h2>Forma de {E}: fundamental en la cuerda 6</h2>
${W.chords({ items: [{ sym: 'F', f: '133211', d: '134211', b: 1, caption: 'Mayor' }, { sym: 'Fm', f: '133111', d: '134111', b: 1, caption: 'Menor' }, { sym: 'F7', f: '131211', d: '131211', b: 1, caption: 'Séptima' }, { sym: 'Fm7', f: '131111', d: '131111', b: 1, caption: 'Menor séptima' }], label: 'finger' })}
<p>De mayor a menor solo cambia un dedo, igual que de {E} a {Em}: la tercera de la cuerda 3. En los acordes de séptima desaparece el dedo de la cuerda 4 y se oye la cejilla en su lugar (ahí está la séptima, que verás en el nivel 3).</p>

<h2>Forma de {A}: fundamental en la cuerda 5</h2>
${W.chords({ items: [{ sym: 'Bb', f: 'x13331', d: '013331', b: 1, caption: 'Mayor' }, { sym: 'Bbm', f: 'x13321', d: '013421', b: 1, caption: 'Menor' }, { sym: 'Bb7', f: 'x13131', d: '013141', b: 1, caption: 'Séptima' }, { sym: 'Bbm7', f: 'x13121', d: '013121', b: 1, caption: 'Menor séptima' }], label: 'finger' })}
<p>La forma mayor se puede pisar con tres dedos o con una mini-cejilla del anular en las cuerdas 4, 3 y 2. La cuerda 1 suele quedar apagada por el propio anular, y no pasa nada: la nota ya está en el acorde.</p>

<h2>Cualquier acorde, en dos sitios</h2>
<p>Con las dos formas, cada acorde tiene al menos dos posiciones. Esta tabla te dice dónde poner la cejilla:</p>
<table><thead><tr><th>Acorde</th><th>Forma de {E} (cuerda 6)</th><th>Forma de {A} (cuerda 5)</th></tr></thead><tbody>
<tr><td>{F}</td><td>Traste 1</td><td>Traste 8</td></tr>
<tr><td>{G}</td><td>Traste 3</td><td>Traste 10</td></tr>
<tr><td>{A}</td><td>Traste 5</td><td>Traste 0 (abierto)</td></tr>
<tr><td>{Bb}</td><td>Traste 6</td><td>Traste 1</td></tr>
<tr><td>{B}</td><td>Traste 7</td><td>Traste 2</td></tr>
<tr><td>{C}</td><td>Traste 8</td><td>Traste 3</td></tr>
<tr><td>{D}</td><td>Traste 10</td><td>Traste 5</td></tr>
<tr><td>{E}</td><td>Traste 0 (abierto) o 12</td><td>Traste 7</td></tr></tbody></table>
<p>Elige la posición que deje el cambio más corto. Por ejemplo, en {F} – {Bb} – {C}, usa {F} en el traste 1 (forma de {E}), {Bb} en el 1 (forma de {A}) y {C} en el 3 (forma de {A}): la mano apenas se mueve.</p>
${W.progression({ prog: [{ sym: 'F', f: '133211', d: '134211', b: 1 }, { sym: 'Dm', f: 'x57765', d: '013421', b: 5 }, { sym: 'Bb', f: 'x13331', d: '013331', b: 1 }, { sym: 'C', f: 'x35553', d: '013331', b: 3 }], bpm: 80, pattern: 'D.DU.UDU', caption: 'I – vi – IV – V en {F}, todo con cejilla y sin grandes saltos.' })}

<h2>Que suene limpia</h2>
<ul>
<li><strong>Usa el lateral del índice</strong>, el que mira hacia la pala, no la yema plana: es más duro y pisa mejor. Gira un poco el dedo.</li>
<li><strong>Pegado al traste</strong>, como siempre. Una cejilla a mitad del espacio necesita el doble de fuerza.</li>
<li><strong>Tira con el brazo, no aprietes con el pulgar.</strong> El peso del brazo, tirando ligeramente hacia ti, hace la mayor parte del trabajo.</li>
<li><strong>Solo importan las cuerdas que no pisan otros dedos.</strong> En la forma de {E} mayor, la cejilla solo tiene que hacer sonar las cuerdas 6, 2 y 1.</li>
<li><strong>Empieza en el traste 5</strong>, donde la tensión es menor y los trastes más estrechos, y ve bajando hacia el 1 con los días.</li>
</ul>
<div class="callout warn"><span class="co-t">Sin dolor</span>Es normal que la mano se canse, pero no debe doler. Toca cejillas en ratos cortos (cinco minutos) varias veces al día en lugar de una sesión larga. Si notas dolor en la muñeca o el antebrazo, para.</div>`,
        practice: [
          'Coloca la forma de {E} mayor en el traste 5 ({A}) y toca cuerda a cuerda. Corrige hasta que suenen todas. Repite en los trastes 3 y 1.',
          'Toca un acorde mayor con cejilla y, sin levantar la cejilla, cambia a menor y a séptima. Haz lo mismo con la forma de {A}.',
          'Toca la progresión {F} – {Dm} – {Bb} – {C} con metrónomo a 60 ppm, cuatro negras por acorde.',
        ],
        quiz: [
          { q: 'Una cejilla con forma de {E} en el traste 7 es…', o: ['{A}', '{B}', '{C}', '{D}'], a: 1, why: 'La cuerda 6 en el traste 7 es {B}.' },
          { q: 'Una cejilla con forma de {A} menor en el traste 5 es…', o: ['{Am}', '{Dm}', '{Em}', '{Cm}'], a: 1, why: 'La cuerda 5 en el traste 5 es {D}: {Dm}.' },
          { q: 'Para tocar {C} con la fundamental en la cuerda 6, pones la cejilla en el traste…', o: ['3', '5', '8', '10'], a: 2, why: '{E} (0)… {C} está en el traste 8 de la cuerda 6.' },
          { q: 'En la forma de {E}, ¿qué cambia entre el acorde mayor y el menor?', o: ['La cejilla', 'El dedo de la cuerda 3 (la tercera)', 'El dedo de la cuerda 5', 'Todo el acorde'], a: 1, why: 'Como en {E} → {Em}: la tercera mayor de la cuerda 3 desaparece y suena la menor de la cejilla.' },
        ],
      },

      /* ---------------------------------------------------------- 2.9 */
      {
        id: 'pentatonica', title: 'La pentatónica menor', time: '25 min',
        desc: 'La escala más usada para improvisar en rock, blues y pop, y tus primeros licks.',
        lead: 'Cinco notas, una forma en el mástil y cientos de solos famosos. La pentatónica menor es la puerta de entrada a la improvisación porque casi no tiene notas que choquen.',
        goals: ['Construir la pentatónica menor y saber de dónde sale', 'Tocar su primera posición en cualquier tonalidad', 'Improvisar frases cortas con bends y vibrato'],
        body: () => `
<h2>Cinco notas</h2>
<p><em>Penta</em> significa cinco. La <strong>pentatónica menor</strong> toma la escala menor y quita las dos notas que más tensión crean, la segunda y la sexta. Quedan:</p>
<p style="font:700 1.3rem/1.3 var(--ui)">1 – ♭3 – 4 – 5 – ♭7</p>
${W.scale({ root: 'A', scale: 'pentMinor', frets: [0, 15], steps: false, caption: 'La pentatónica de {A} menor: {A} {C} {D} {E} {G}. Cambia la tónica para ver las demás.' })}
<p>Al no tener semitonos, todas sus notas suenan bien juntas y casi cualquier combinación funciona. Por eso es tan agradecida para empezar a improvisar.</p>

<h2>La primera posición</h2>
<p>Esta es <strong>la</strong> forma, la que habrás visto en mil vídeos: dos notas por cuerda, con la fundamental bajo el índice en la cuerda 6. En {A} menor, la posición empieza en el traste 5:</p>
${W.fretboard({ frets: [0, 12], show: { root: 'A', scale: 'pentMinor' }, label: 'interval', region: [5, 8], caption: 'Dedos: el índice en el traste 5 y el meñique (o el anular) en el 8. Las fundamentales, en rojo, están en las cuerdas 6, 4 y 1.' })}
${W.score({ notes: 'e:6/5 e:6/8 e:5/5 e:5/7 e:4/5 e:4/7 e:3/5 e:3/7 | e:2/5 e:2/8 e:1/5 e:1/8 e:1/5 e:2/8 e:2/5 e:3/7 | e:3/5 e:4/7 e:4/5 e:5/7 e:5/5 e:6/8 q:6/5', mode: 'full', bpm: 92, caption: 'La posición subiendo y bajando. Hazla con púa alternada: abajo, arriba, abajo, arriba.' })}
<p>Como es una forma móvil, sirve para cualquier tonalidad: pon el índice sobre la fundamental en la cuerda 6. En {E} menor empieza en el traste 12 (o en el 0); en {G} menor, en el 3; en {C} menor, en el 8.</p>

<h2>Los recursos que la hacen hablar</h2>
<p>La escala sola no es un solo. Lo que convierte cinco notas en música es <strong>cómo</strong> se tocan:</p>
<ul>
<li><strong>Bend</strong>: empuja la cuerda hacia arriba para subir la nota. El más usado en esta posición es el de la cuerda 3, traste 7 ({D}): súbelo un tono hasta que suene como {E}, la nota siguiente de la escala. Usa el anular apoyado por el medio y el índice.</li>
<li><strong>Vibrato</strong>: oscila la nota con pequeños bends repetidos. Dale vibrato a las notas largas, sobre todo a la fundamental.</li>
<li><strong>Ligados y arrastres</strong> para unir notas sin pulsarlas todas.</li>
<li><strong>Silencio</strong>: deja huecos. Las frases cortas con espacio entre ellas suenan más musicales que un chorro de notas.</li>
</ul>
${W.score({ notes: 'q:3/7b e:2/5 e:2/8 q:2/5 q:3/7 | h:3/5 h:4/7v | e:1/5 e:1/8 e:1/5 e:2/8 e:2/5 e:2/8 q:3/7b | e:2/5 e:3/7 e:3/5 e:4/7 h:4/7v', mode: 'full', bpm: 76, caption: 'Dos frases típicas de pentatónica. Escucha cómo el bend lleva el {D} hasta el {E} y cómo el vibrato hace cantar la nota final.' })}

<h2>Improvisa</h2>
<p>Toca la base y prueba a improvisar con la posición del traste 5. Tres reglas para empezar: frases cortas, termina en la fundamental ({A}) o en la quinta ({E}), y repite una idea que te guste antes de pasar a otra.</p>
${W.progression({ prog: ['Am', 'G', 'F', 'G'], bpm: 80, pattern: 'D.DU.UDU', caption: 'Base en {A} menor para improvisar con la pentatónica de {A} menor.' })}
<div class="callout"><span class="co-t">Un adelanto</span>Esta misma forma, sin mover un dedo, es también la <strong>pentatónica de {C} mayor</strong>: mismas notas, otra tónica. {C} mayor y {A} menor son tonalidades relativas, y las verás en el nivel 3 junto a las otras cuatro posiciones.</div>`,
        practice: [
          'Toca la posición con metrónomo a 70 ppm en corcheas, subiendo y bajando, sin mirar el diapasón.',
          'Practica el bend de la cuerda 3 traste 7: toca primero el traste 9 ({E}) para tener la referencia y luego sube el 7 hasta que suene igual.',
          'Improvisa sobre la base durante dos minutos usando solo tres notas. Luego cuatro, luego toda la escala.',
        ],
        quiz: [
          { q: '¿Qué intervalos forman la pentatónica menor?', o: ['1 2 3 5 6', '1 ♭3 4 5 ♭7', '1 2 ♭3 5 ♭6', '1 ♭3 ♭5 5 ♭7'], a: 1, why: 'Escala menor sin la segunda ni la sexta.' },
          { q: '¿Qué notas tiene la pentatónica de {E} menor?', o: ['{E} {G} {A} {B} {D}', '{E} {F#} {G#} {B} {C#}', '{E} {G} {B} {C} {D}', '{E} {F#} {A} {B} {D}'], a: 0, why: '{E} + ♭3 ({G}) + 4 ({A}) + 5 ({B}) + ♭7 ({D}).' },
          { q: '¿En qué traste empieza la primera posición de la pentatónica de {G} menor?', o: ['1', '3', '5', '7'], a: 1, why: 'La fundamental en la cuerda 6: {G} está en el traste 3.' },
          { q: 'El bend más típico de la primera posición sube la cuerda 3 en el traste 7…', o: ['Medio tono', 'Un tono, hasta la nota siguiente de la escala', 'Una octava', 'Una quinta'], a: 1, why: 'De {D} a {E} en la pentatónica de {A} menor: un tono.' },
        ],
      },

      /* ---------------------------------------------------------- 2.10 */
      {
        id: 'sincopa', title: 'Ritmo: síncopa y semicorcheas', time: '22 min',
        desc: 'Puntillos, contratiempos, síncopas y rasgueos de semicorcheas.',
        lead: 'Lo que hace que un ritmo “se mueva” es casi siempre algo que no cae en el pulso: un acento desplazado, una nota que se anticipa. Aquí aprenderás a leerlo, contarlo y rasguearlo.',
        goals: ['Leer y contar corcheas con puntillo y semicorcheas', 'Entender qué es una síncopa y tocarla', 'Rasguear patrones de semicorcheas con el movimiento continuo'],
        body: () => `
<h2>Contratiempo y síncopa</h2>
<p>Una nota en <strong>contratiempo</strong> es la que empieza en una parte débil, como la “y” de un pulso. Una <strong>síncopa</strong> va un paso más allá: una nota empieza en una parte débil y <strong>se prolonga</strong> por encima del siguiente pulso, de modo que ese pulso no se toca. El oído espera un golpe que no llega, y eso genera movimiento.</p>
${W.score({ notes: 'q:D q:D q:D q:D | e:D q:U e:U q:D q:D | e:D q:U e:U e:r e:U q:D', mode: 'rhythm', counts: true, chord: 'C', bpm: 84, caption: 'Primero negras; después, la síncopa clásica: la negra que empieza en la “y” del 1 se come el pulso 2. En el tercer compás, además, el silencio del pulso 3 deja la nota siguiente a contratiempo.' })}
<p>En el rasgueo, la síncopa aparece sola si mantienes el péndulo: la mano baja en el pulso 2 <em>sin tocar</em> porque la nota anterior sigue sonando. Es exactamente lo que ya hacías en el patrón folk del nivel 1.</p>

<h2>Corchea con puntillo y semicorchea</h2>
<p>Una corchea con puntillo dura tres semicorcheas, y la semicorchea que la sigue cae en la “a”, justo antes del pulso siguiente. Es un ritmo saltarín, muy de country, rock and roll y marchas.</p>
${W.score({ notes: 'e.:D s:U e.:D s:U e.:D s:U e.:D s:U | e.:D s:U e:D e:U q:D q:D', mode: 'rhythm', counts: true, chord: 'G', bpm: 72, caption: 'Cuenta “1 (e y) a 2 (e y) a”: el golpe de arriba cae en la “a”.' })}

<h2>Rasgueos de semicorcheas</h2>
<p>Con semicorcheas el péndulo va al doble de velocidad: abajo en el pulso y en la “y”, arriba en la “e” y en la “a”. Vuelve a ser cuestión de mantener la mano en movimiento y elegir cuándo tocar.</p>
${W.strum({ pattern: 'DUDUDUDUDUDUDUDU', sub: 4, chords: ['Em'], bpm: 60, caption: 'Primero todas las semicorcheas, suave y regular. Ponlo lento: la velocidad saldrá sola.' })}
${W.strum({ pattern: 'D.DU.UD.D.DU.UDU', sub: 4, chords: ['Em', 'A'], bpm: 66, caption: 'Un patrón de pop-funk de semicorcheas. Los huecos marcan las síncopas.' })}
${W.strum({ pattern: 'D..UD.DUD..UD.DU', sub: 4, chords: ['Am7', 'D'], bpm: 70, caption: 'Abajo, (e y) arriba, abajo, (e) y-a… Una figura muy usada en reggae-pop y funk suave.' })}
<div class="callout tip"><span class="co-t">Acentos</span>Prueba a tocar más fuerte los golpes que caen en el 2 y el 4 y más suave el resto. Ese pequeño cambio de dinámica hace que un patrón mecánico empiece a tener groove.</div>

<h2>Entrena la lectura rítmica</h2>
<p>La herramienta genera ritmos al azar del nivel que elijas y mide si los tocas a tiempo. Practica con “Puntillos y síncopas” y con “Semicorcheas”.</p>
${W.trainer({ tool: 'ritmo', state: { level: 3, bpm: 70 } })}`,
        practice: [
          'Lee cada ejemplo contando en voz alta antes de escucharlo. Después rasguéalo con el acorde indicado.',
          'Toca las semicorcheas seguidas con metrónomo a 60 ppm durante dos minutos sin que la mano se pare ni se acelere.',
          'Consigue más del 80 % en cinco ritmos del nivel “Puntillos y síncopas” de la lectura rítmica.',
        ],
        quiz: [
          { q: '¿Qué es una síncopa?', o: ['Una nota muy corta', 'Una nota que empieza en parte débil y se prolonga sobre el pulso siguiente', 'Un silencio de negra', 'Un cambio de compás'], a: 1, why: 'El pulso fuerte queda “tapado” por una nota que empezó antes.' },
          { q: 'Una corchea con puntillo dura…', o: ['2 semicorcheas', '3 semicorcheas', '4 semicorcheas', '1 negra'], a: 1, why: 'Corchea = 2 semicorcheas; el puntillo suma la mitad: 3.' },
          { q: 'Al rasguear semicorcheas, la “e” y la “a” se tocan…', o: ['Hacia abajo', 'Hacia arriba', 'Con golpe apagado', 'No se tocan nunca'], a: 1, why: 'Abajo en el pulso y la “y”; arriba en la “e” y la “a”.' },
          { q: 'En la secuencia corchea – negra – corchea que empieza en el pulso 1, ¿qué pulso no se toca?', o: ['El 1', 'El 2', 'El 3', 'Ninguno'], a: 1, why: 'La negra empieza en la “y” del 1 y dura hasta la “y” del 2: el pulso 2 queda sincopado.' },
        ],
      },
    ],
  });
})();
