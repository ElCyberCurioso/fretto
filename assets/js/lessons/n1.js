/* Fretto · Nivel 1: Fundamentos */
(function () {
  'use strict';
  const M = window.M, W = M.W;
  M.course = M.course || [];

  M.course.push({
    id: 'n1', n: 1, title: 'Fundamentos',
    desc: 'Las partes de la guitarra, afinar, las notas, el pulso, la tablatura y tus primeros acordes y rasgueos.',
    long: 'Todo lo que necesitas para empezar con buen pie: cómo se nombran las notas y dónde están en el mástil, cómo se mide el tiempo en la música, cómo leer tablatura y tus primeros acordes con rasgueo.',
    lessons: [

      /* ---------------------------------------------------------- 1.1 */
      {
        id: 'guitarra', title: 'Tu guitarra y tus manos', time: '10 min',
        desc: 'Partes del instrumento, numeración de cuerdas, trastes y dedos.',
        lead: 'Antes de hablar de notas conviene que tú y este curso llaméis igual a cada cosa: las partes de la guitarra, las cuerdas, los trastes y los dedos.',
        goals: ['Nombrar las partes principales de la guitarra', 'Saber qué cuerda es la 1 y cuál la 6', 'Numerar los dedos de cada mano como lo hacen los diagramas y las partituras'],
        body: () => `
<h2>Las partes de la guitarra</h2>
<p>Da igual si tu guitarra es española, acústica de cuerdas de acero o eléctrica: todas comparten la misma estructura. La que importa para la teoría es el <strong>mástil</strong>, la pieza larga de madera sobre la que pisas las cuerdas. Su cara superior se llama <strong>diapasón</strong> y está dividida por barras metálicas, los <strong>trastes</strong>.</p>
${W.anatomy({ caption: 'Las partes que más se mencionan en este curso. En una guitarra eléctrica las pastillas sustituyen a la boca, pero el resto es igual.' })}
<p>La <strong>cejuela</strong> es la pieza (normalmente blanca) donde terminan las cuerdas antes de llegar a la pala. Cuando tocas una cuerda sin pisarla, vibra entre la cejuela y el puente: eso es una <strong>cuerda al aire</strong>.</p>

<h2>Cuerdas y trastes tienen número</h2>
<p>Las cuerdas se numeran <strong>de la más fina a la más gruesa</strong>: la cuerda 1 es la más fina y aguda, la cuerda 6 la más gruesa y grave. Al tocar, la cuerda 6 queda arriba, cerca de tu cara, y la 1 abajo, cerca del suelo.</p>
<p>Los trastes se numeran desde la cejuela hacia el cuerpo. “Traste 3” significa el espacio entre la segunda y la tercera barra metálica: ahí es donde se pone el dedo, no encima de la barra. El “traste 0” es la cuerda al aire.</p>
${W.fretboard({ frets: [0, 12], dots: [{ s: 1, f: 0, label: '1', role: 'r' }, { s: 6, f: 0, label: '6', role: 'f' }, { s: 3, f: 3, label: '3', role: 'n' }, { s: 5, f: 7, label: '7', role: 'n' }], label: 'none', legend: false, caption: 'Así se dibuja el diapasón en todo el curso: como si pusieras la guitarra tumbada delante de ti con las cuerdas hacia arriba. La <b>cuerda 1</b> queda arriba y la <b>cuerda 6</b> abajo, igual que en la tablatura. Pulsa cualquier traste para escucharlo.' })}
<div class="callout"><span class="co-t">Un detalle que confunde al principio</span>Cuando miras la guitarra mientras tocas, ves la cuerda 6 arriba. Los diagramas la ponen abajo porque así se lee la tablatura, que es el sistema más usado en guitarra. Acostúmbrate pronto: arriba en el dibujo es agudo.</div>

<h2>Los dedos también tienen número</h2>
<p>Para que un diagrama te diga con qué dedo pisar cada nota, los dedos de la <strong>mano que pisa</strong> se numeran del 1 (índice) al 4 (meñique). El pulgar no suele pisar: va detrás del mástil, como apoyo. En la <strong>mano que pulsa</strong> se usan letras que vienen de la guitarra clásica: p, i, m, a.</p>
${W.hands({})}
<p>Si eres zurdo y tocas con la guitarra invertida, activa la opción <em>Guitarra para zurdos</em> en los ajustes (el icono de deslizadores, arriba a la derecha): todos los diapasones y diagramas se dibujarán en espejo.</p>

<h2>Cómo pisar una nota limpia</h2>
<ul>
<li><strong>Cerca del traste:</strong> coloca la yema justo detrás de la barra metálica, no en mitad del espacio. Necesitarás mucha menos fuerza y la nota no trasteará.</li>
<li><strong>Con la punta del dedo:</strong> el dedo arqueado, como si sujetaras una pelota. Así no rozas las cuerdas vecinas.</li>
<li><strong>Pulgar detrás del mástil</strong>, más o menos a la altura del dedo medio. Es un apoyo, no una pinza: si aprietas mucho, te cansarás enseguida.</li>
<li><strong>Uñas cortas</strong> en la mano que pisa. Si tocan el diapasón antes que la yema, la nota sonará apagada.</li>
</ul>
<p>Prueba ahora mismo: pisa la cuerda 1 en el traste 3 con el dedo 3 y tócala. Luego compara cómo suena si pisas en mitad del traste o pegado a la barra. Esa diferencia es la que vas a buscar siempre.</p>`,
        practice: [
          'Toca las seis cuerdas al aire, de la 6 a la 1, diciendo en voz alta su número.',
          'En la cuerda 1, pisa el traste 1 con el dedo 1, el 2 con el 2, el 3 con el 3 y el 4 con el 4. Repite en cada cuerda. Es el ejercicio “1-2-3-4” y vas a usarlo durante años para calentar.',
          'Haz el mismo ejercicio a la vuelta (4-3-2-1) dejando los dedos apoyados cuando puedas.',
        ],
        quiz: [
          { q: '¿Cuál es la cuerda 1?', o: ['La más gruesa y grave', 'La más fina y aguda', 'La que está en el centro', 'Depende de la guitarra'], a: 1, why: 'Las cuerdas se numeran de la más fina (1) a la más gruesa (6).' },
          { q: '¿Dónde conviene apoyar el dedo para pisar un traste?', o: ['Encima de la barra metálica', 'En mitad del espacio entre barras', 'Justo detrás de la barra metálica', 'Da igual'], a: 2, why: 'Pegado a la barra (por el lado de la cejuela) la nota suena limpia con menos esfuerzo.' },
          { q: 'En un diagrama, ¿qué dedo es el 3?', o: ['Índice', 'Medio', 'Anular', 'Meñique'], a: 2, why: '1 índice, 2 medio, 3 anular, 4 meñique.' },
          { q: 'En los diapasones de este curso, la línea de arriba es…', o: ['La cuerda 6', 'La cuerda 1', 'El traste 0', 'El puente'], a: 1, why: 'Arriba va la cuerda 1, como en la tablatura.' },
        ],
      },

      /* ---------------------------------------------------------- 1.2 */
      {
        id: 'afinar', title: 'Afinar la guitarra', time: '12 min',
        desc: 'La afinación estándar, cómo afinar de oído y con afinador.',
        lead: 'Una guitarra desafinada hace que todo suene mal, aunque lo toques perfecto. Afinar es lo primero que harás cada vez que cojas el instrumento.',
        goals: ['Conocer las notas de la afinación estándar', 'Afinar con un afinador y de oído', 'Entender qué son las “pulsaciones” entre dos notas casi iguales'],
        body: () => `
<h2>La afinación estándar</h2>
<p>Salvo que una canción diga lo contrario, la guitarra se afina así, de la cuerda 6 a la 1:</p>
<table><thead><tr><th>Cuerda</th><th class="c">6</th><th class="c">5</th><th class="c">4</th><th class="c">3</th><th class="c">2</th><th class="c">1</th></tr></thead>
<tbody><tr><td>Nota</td><td class="c">{E}</td><td class="c">{A}</td><td class="c">{D}</td><td class="c">{G}</td><td class="c">{B}</td><td class="c">{E}</td></tr></tbody></table>
<p>Las dos cuerdas de los extremos son la misma nota, {E}, separadas por dos octavas (en la lección siguiente verás qué es una octava). Pulsa cada cuerda para oír cómo debe sonar:</p>
${W.tuning({})}

<h2>Con afinador</h2>
<p>Es la forma más rápida y precisa. Puedes usar uno de pinza, una aplicación o el <a href="#/herramienta/afinador">afinador de esta web</a>, que usa el micrófono de tu dispositivo.</p>
<ol>
<li>Toca una cuerda al aire y déjala sonar.</li>
<li>El afinador muestra la nota más cercana. Si la aguja está a la izquierda, la cuerda está <strong>baja</strong> (grave): tensa girando la clavija. Si está a la derecha, está <strong>alta</strong>: destensa.</li>
<li>Afina siempre <strong>subiendo</strong> hacia la nota: si te pasas, baja un poco por debajo y vuelve a subir. Así el engranaje de la clavija queda firme y la cuerda se mantiene afinada más tiempo.</li>
</ol>

<h2>De oído: afinación relativa</h2>
<p>Si no tienes afinador, puedes afinar la guitarra respecto a sí misma. Se basa en una idea que usarás toda la vida: <strong>la misma nota está en varios sitios del mástil</strong>. Por ejemplo, la cuerda 6 pisada en el traste 5 da la misma nota que la cuerda 5 al aire.</p>
${W.fretboard({ frets: [0, 7], dots: [{ s: 6, f: 5, label: '{A}', role: 'r' }, { s: 5, f: 0, label: '{A}', role: 'r' }, { s: 5, f: 5, label: '{D}', role: 'f' }, { s: 4, f: 0, label: '{D}', role: 'f' }, { s: 4, f: 5, label: '{G}', role: 't' }, { s: 3, f: 0, label: '{G}', role: 't' }, { s: 3, f: 4, label: '{B}', role: 's' }, { s: 2, f: 0, label: '{B}', role: 's' }, { s: 2, f: 5, label: '{E}', role: 'x' }, { s: 1, f: 0, label: '{E}', role: 'x' }], legend: false, caption: 'Cada pareja del mismo color es la misma nota. Fíjate en la excepción: entre la cuerda 3 y la 2 se usa el <b>traste 4</b>, no el 5.' })}
<ol>
<li>Da por buena la cuerda 6 (o afínala con una referencia).</li>
<li>Pisa la cuerda 6 en el traste 5 y toca a la vez la cuerda 5 al aire. Ajusta la 5 hasta que suenen iguales.</li>
<li>Repite: cuerda 5 traste 5 → cuerda 4 al aire; cuerda 4 traste 5 → cuerda 3 al aire.</li>
<li><strong>Cuerda 3 traste 4</strong> → cuerda 2 al aire.</li>
<li>Cuerda 2 traste 5 → cuerda 1 al aire.</li>
</ol>
<p>La excepción del traste 4 no es un capricho: la distancia entre {G} y {B} es más corta que entre las demás cuerdas. Lo entenderás bien cuando estudies los intervalos; por ahora, apréndelo de memoria.</p>

<h2>Cómo saber si dos notas suenan iguales</h2>
<p>Cuando dos notas son <em>casi</em> iguales, se oye un “wa-wa-wa”, un vaivén de volumen llamado <strong>pulsación</strong> o batimiento. Cuanto más cerca estén, más lento es el vaivén. Cuando desaparece, están afinadas. Escúchalo:</p>
${W.listen({ items: [{ label: 'Muy desafinadas', notes: [45, 45.5], together: true }, { label: 'Casi afinadas', notes: [45, 45.07], together: true }, { label: 'Afinadas', notes: [45, 45], together: true }] })}
<div class="callout tip"><span class="co-t">Consejo</span>Las cuerdas nuevas se estiran durante los primeros días y se desafinan a menudo. Es normal. También lo es tener que retocar la afinación después de tocar un rato o si cambia la temperatura.</div>`,
        practice: [
          'Afina con el afinador de la web. Después desafina a propósito la cuerda 5 y recupérala de oído comparándola con la cuerda 6 en el traste 5.',
          'Escucha las pulsaciones: toca la cuerda 6 en el traste 5 y la cuerda 5 al aire mientras giras muy despacio la clavija de la 5. Fíjate cómo el vaivén se hace más lento hasta desaparecer.',
          'Memoriza la afinación: di en voz alta {E} {A} {D} {G} {B} {E} mientras tocas cada cuerda al aire.',
        ],
        quiz: [
          { q: '¿Cuál es la afinación estándar de la cuerda 6 a la 1?', o: ['{E} {A} {D} {G} {B} {E}', '{E} {B} {G} {D} {A} {E}', '{D} {A} {D} {G} {B} {E}', '{E} {A} {D} {G} {C} {E}'], a: 0, why: 'De grave a agudo: {E} {A} {D} {G} {B} {E}.' },
          { q: 'Para afinar la cuerda 2 respecto a la 3, ¿qué traste pisas en la 3?', o: ['El 3', 'El 4', 'El 5', 'El 7'], a: 1, why: 'Es la única excepción: la cuerda 3 en el traste 4 da la nota de la cuerda 2 al aire.' },
          { q: 'Si el afinador marca la aguja a la izquierda, la cuerda está…', o: ['Alta: hay que destensar', 'Baja: hay que tensar', 'Afinada', 'Rota'], a: 1, why: 'A la izquierda significa que la nota es más grave de lo debido.' },
          { q: 'Cuando dos notas casi iguales producen un “wa-wa” lento, significa que…', o: ['Están muy desafinadas', 'Están muy cerca de estar afinadas', 'Una está una octava más alta', 'La cuerda está rota'], a: 1, why: 'Cuanto más lenta es la pulsación, más cerca están. Cuando desaparece, están afinadas.' },
        ],
      },

      /* ---------------------------------------------------------- 1.3 */
      {
        id: 'notas', title: 'Las notas musicales', time: '12 min',
        desc: 'Altura, las siete notas naturales, los dos cifrados y la octava.',
        lead: 'Toda la teoría musical se construye sobre siete nombres. Aquí verás cuáles son, por qué se repiten y cómo se llaman en los dos sistemas que vas a encontrar.',
        goals: ['Decir las siete notas naturales en orden', 'Pasar del cifrado latino (Do, Re, Mi) al americano (C, D, E) y al revés', 'Entender qué es una octava y encontrarla en la guitarra'],
        body: () => `
<h2>Qué es una nota</h2>
<p>Cuando una cuerda vibra, mueve el aire un número determinado de veces por segundo. Esa cifra es la <strong>frecuencia</strong> y se mide en hercios (Hz). Si vibra deprisa, oímos un sonido <strong>agudo</strong>; si vibra despacio, uno <strong>grave</strong>. A esa cualidad se le llama <strong>altura</strong>, y una <strong>nota</strong> es simplemente un sonido con una altura concreta y con nombre.</p>
<p>En la guitarra hay tres formas de cambiar la altura de una cuerda: su <strong>grosor</strong> (las gruesas son graves), su <strong>tensión</strong> (al afinar la cambias) y su <strong>longitud</strong> (al pisar un traste la acortas y suena más aguda). Esa última es la que usas al tocar.</p>

<h2>Las siete notas naturales</h2>
<p>La música occidental usa siete nombres de nota que se repiten en ciclo:</p>
<table><thead><tr><th>Cifrado latino</th><td class="c">Do</td><td class="c">Re</td><td class="c">Mi</td><td class="c">Fa</td><td class="c">Sol</td><td class="c">La</td><td class="c">Si</td></tr></thead>
<tbody><tr><th>Cifrado americano</th><td class="c">C</td><td class="c">D</td><td class="c">E</td><td class="c">F</td><td class="c">G</td><td class="c">A</td><td class="c">B</td></tr></tbody></table>
<p>El <strong>cifrado americano</strong> usa letras y empieza por la A, que es La. Por eso la correspondencia no es “A = Do”, sino <strong>A = La</strong>. Merece la pena aprenderse los dos: en España y Latinoamérica se habla de Do y Sol, pero los cancioneros, las tablaturas de internet y casi todo el software usan letras.</p>
<div class="callout key"><span class="co-t">Prueba el cambio</span>Arriba a la derecha tienes un selector <em>Do Re Mi / C D E</em>. Cambia de uno a otro cuando quieras: todo el curso, diagramas incluidos, se reescribe en el cifrado que elijas.</div>
<p>Escucha las siete notas seguidas desde {C}. Al llegar a {B}, el ciclo vuelve a empezar en un {C} más agudo:</p>
${W.score({ notes: 'q:C4 q:D4 q:E4 q:F4 | q:G4 q:A4 q:B4 q:C5 | w:C5', bpm: 84, mode: 'full', caption: 'Las siete notas naturales y la vuelta a {C}. Arriba en partitura, abajo en tablatura: aprenderás a leer las dos en este nivel y el siguiente.' })}

<h2>La octava</h2>
<p>Después de {B} vuelve {C}, pero más agudo. Ese “mismo nombre, más agudo” es una <strong>octava</strong>: una nota que vibra exactamente al <strong>doble de frecuencia</strong> que otra. Suenan tan parecidas que el oído las percibe como la misma nota en distinto registro, y por eso tienen el mismo nombre.</p>
${W.listen({ items: [{ label: '{A} de la cuerda 5 al aire (110 Hz)', notes: [45] }, { label: '{A} una octava más aguda (220 Hz)', notes: [57] }, { label: 'Las dos seguidas', notes: [45, 57, 69] }, { label: 'Las dos a la vez', notes: [45, 57], together: true }] })}
<p>En la guitarra hay una octava muy fácil de encontrar: el <strong>traste 12</strong> de cualquier cuerda es la misma nota que la cuerda al aire, una octava más aguda. Por eso el traste 12 lleva un marcador doble. La cuerda mide exactamente el doble que la distancia del traste 12 al puente.</p>
${W.fretboard({ frets: [0, 12], show: { root: 'E', ivs: ['1'] }, dots: [{ s: 1, f: 0 }, { s: 2, f: 0 }, { s: 3, f: 0 }, { s: 4, f: 0 }, { s: 5, f: 0 }, { s: 6, f: 0 }, { s: 1, f: 12 }, { s: 2, f: 12 }, { s: 3, f: 12 }, { s: 4, f: 12 }, { s: 5, f: 12 }, { s: 6, f: 12 }], legend: false, caption: 'Las cuerdas al aire y el traste 12 tienen los mismos nombres. Toca una cuerda al aire y luego el traste 12 de esa cuerda.' })}

<h2>Notas con número de octava</h2>
<p>Para distinguir los distintos {A} se les añade un número: {A_4} es el La de 440 Hz que usan los afinadores, {A_3} el de una octava por debajo, etc. El número cambia siempre en {C}: después de {B_3} viene {C_4}. En la guitarra, la cuerda 6 al aire es {E_2} y la cuerda 1 al aire {E_4}. No necesitas memorizarlo ahora, pero lo verás en partituras y en el afinador.</p>`,
        practice: [
          'Recita las notas naturales hacia delante y hacia atrás en los dos cifrados hasta que te salga sin pensar: Do Re Mi Fa Sol La Si / C D E F G A B.',
          'Practica el salto: “¿qué letra es Sol?” (G), “¿qué nota es la F?” (Fa). Que un amigo te pregunte o usa el test de abajo.',
          'Toca cada cuerda al aire y luego en el traste 12. Escucha que es la misma nota más aguda.',
        ],
        quiz: [
          { q: 'En cifrado americano, ¿qué letra corresponde a La?', o: ['C', 'A', 'L', 'E'], a: 1, why: 'El cifrado americano empieza por La: A = La, B = Si, C = Do…' },
          { q: '¿Qué nota viene después de Si?', o: ['La', 'Re', 'Do', 'Sol'], a: 2, why: 'El ciclo se repite: después de Si vuelve Do, una octava más aguda.' },
          { q: 'Una nota una octava más aguda que otra vibra…', o: ['Al doble de frecuencia', 'Al triple', 'A la mitad', '12 Hz más rápido'], a: 0, why: 'Octava = frecuencia doble. Por eso el La de 220 Hz y el de 440 Hz se llaman igual.' },
          { q: 'En la guitarra, ¿dónde está la misma nota que la cuerda al aire, una octava más aguda?', o: ['Traste 5', 'Traste 7', 'Traste 12', 'Traste 24'], a: 2, why: 'El traste 12 divide la cuerda por la mitad: suena una octava por encima.' },
          { q: 'G en cifrado latino es…', o: ['Sol', 'Fa', 'La', 'Re'], a: 0, why: 'C Do, D Re, E Mi, F Fa, G Sol, A La, B Si.' },
        ],
      },

      /* ---------------------------------------------------------- 1.4 */
      {
        id: 'semitonos', title: 'Tonos, semitonos y alteraciones', time: '15 min',
        desc: 'La distancia de un traste, sostenidos, bemoles y las 12 notas.',
        lead: 'Entre las siete notas naturales hay huecos, y en esos huecos están las notas con sostenido y bemol. Con la guitarra se entiende mejor que con ningún otro instrumento: un traste, un semitono.',
        goals: ['Saber qué es un semitono y un tono en el mástil', 'Recordar dónde no hay nota intermedia ({E}-{F} y {B}-{C})', 'Usar sostenidos y bemoles y entender las notas enarmónicas'],
        body: () => `
<h2>Un traste, un semitono</h2>
<p>El <strong>semitono</strong> es la distancia más pequeña que se usa en la música occidental, y en la guitarra equivale a <strong>un traste</strong>. Dos semitonos forman un <strong>tono</strong>: dos trastes.</p>
<p>Las notas naturales no están todas a la misma distancia. Mira la cuerda 5 desde {A} al aire hasta el traste 12:</p>
${W.fretboard({ frets: [0, 12], show: { root: 'C', ivs: ['1', '2', '3', '4', '5', '6', '7'], strings: [5] }, color: 'mono', label: 'note', legend: false, caption: 'Las notas naturales en la cuerda 5. Entre la mayoría hay un traste vacío (un tono), pero <b>{B}-{C}</b> y <b>{E}-{F}</b> están pegadas: solo un semitono.' })}
<p>De {A} a {B} hay dos trastes, de {B} a {C} solo uno, de {C} a {D} dos, de {D} a {E} dos, de {E} a {F} uno, de {F} a {G} dos y de {G} a {A} dos. Es la pieza más importante de este nivel:</p>
<div class="callout key"><span class="co-t">Para no olvidar</span>Entre <strong>{E} y {F}</strong> y entre <strong>{B} y {C}</strong> hay un semitono. Entre las demás notas naturales vecinas, un tono.</div>

<h2>Sostenidos y bemoles</h2>
<p>¿Y el traste vacío entre {A} y {B}? Tiene nombre, y de hecho tiene dos. Para nombrar esas notas se usan las <strong>alteraciones</strong>:</p>
<ul>
<li>El <strong>sostenido</strong> (♯) sube una nota un semitono: {A#} es un traste por encima de {A}.</li>
<li>El <strong>bemol</strong> (♭) baja una nota un semitono: {Bb} es un traste por debajo de {B}.</li>
<li>El <strong>becuadro</strong> (♮) anula una alteración anterior y devuelve la nota a su estado natural. Lo verás en partitura.</li>
</ul>
<p>Así que el traste 1 de la cuerda 5 es a la vez {A#} y {Bb}. Dos nombres para el mismo sonido se llaman <strong>notas enarmónicas</strong>. Qué nombre se usa depende del contexto (lo entenderás con las escalas); por ahora basta con saber que son el mismo traste.</p>
${W.listen({ gap: 0.45, items: [{ label: '{A} → {A#} (sube un traste)', notes: [45, 46] }, { label: '{B} → {Bb} (baja un traste)', notes: [47, 46] }, { label: '{E} → {F} (semitono natural)', notes: [52, 53] }, { label: '{F} → {G} (un tono)', notes: [53, 55] }] })}

<h2>Las doce notas</h2>
<p>Si sumas las siete naturales y las cinco alteradas, tienes las <strong>doce notas</strong> que existen en la música occidental. Después de la duodécima vuelve a empezar el ciclo, una octava más arriba. Por eso el traste 12 repite la cuerda al aire: has recorrido las doce notas.</p>
${W.fretboard({ frets: [0, 12], show: { root: 'C', scale: 'chromatic', strings: [6] }, color: 'mono', label: 'note', legend: false, caption: 'Las doce notas en la cuerda 6, de {E} a {E}. Cada traste es un semitono. Esta secuencia completa se llama <b>escala cromática</b>.' })}
<table><thead><tr><th>Natural</th><th>Sube un semitono</th><th>Baja un semitono</th></tr></thead><tbody>
<tr><td>{C}</td><td>{C#} = {Db}</td><td>{B}</td></tr>
<tr><td>{D}</td><td>{D#} = {Eb}</td><td>{C#} = {Db}</td></tr>
<tr><td>{E}</td><td>{F}</td><td>{D#} = {Eb}</td></tr>
<tr><td>{F}</td><td>{F#} = {Gb}</td><td>{E}</td></tr>
<tr><td>{G}</td><td>{G#} = {Ab}</td><td>{F#} = {Gb}</td></tr>
<tr><td>{A}</td><td>{A#} = {Bb}</td><td>{G#} = {Ab}</td></tr>
<tr><td>{B}</td><td>{C}</td><td>{A#} = {Bb}</td></tr></tbody></table>
<p>Fíjate en que {E} sube a {F} y {B} sube a {C}, sin pasar por ninguna alteración. Técnicamente {E#} existe (y suena igual que {F}), pero solo aparece en contextos teóricos concretos que verás más adelante.</p>

<h2>Calcular cualquier nota contando trastes</h2>
<p>Con esto ya puedes saber qué nota hay en cualquier traste: parte de la cuerda al aire y avanza nota a nota, recordando que {E}-{F} y {B}-{C} están pegadas. Ejemplo en la cuerda 6: al aire {E}, traste 1 {F}, traste 2 {F#}, traste 3 {G}, traste 4 {G#}, traste 5 {A}. Contar funciona, pero es lento: en la próxima lección verás cómo memorizar el mástil para no tener que hacerlo.</p>`,
        practice: [
          'En la cuerda 5, toca solo las notas naturales del traste 0 al 12 diciendo su nombre. Repite en la cuerda 6.',
          'Toca la escala cromática completa en la cuerda 1 (trastes 0 a 12), nombrando cada nota con sostenidos al subir y con bemoles al bajar.',
          'Sin mirar la tabla: ¿qué nota hay un semitono por encima de {E}? ¿Y un tono por encima de {B}? Compruébalo en el diapasón.',
        ],
        quiz: [
          { q: 'En la guitarra, un semitono equivale a…', o: ['Un traste', 'Dos trastes', 'Media cuerda', 'Una cuerda'], a: 0, why: 'Cada traste es un semitono; un tono son dos trastes.' },
          { q: '¿Entre qué notas naturales hay solo un semitono?', o: ['{C}-{D} y {F}-{G}', '{E}-{F} y {B}-{C}', '{A}-{B} y {D}-{E}', 'Entre ninguna'], a: 1, why: '{E}-{F} y {B}-{C} son los dos semitonos naturales.' },
          { q: '{C#} y {Db} son…', o: ['Notas distintas', 'La misma nota con dos nombres (enarmónicas)', 'Dos octavas diferentes', 'Notas que no existen'], a: 1, why: 'Están en el mismo traste: son enarmónicas.' },
          { q: '¿Qué nota hay en el traste 3 de la cuerda 5 ({A})?', o: ['{B}', '{C}', '{C#}', '{D}'], a: 1, why: '{A} (0), {A#} (1), {B} (2), {C} (3).' },
          { q: '¿Cuántas notas distintas hay antes de que se repita el ciclo?', o: ['7', '8', '12', '24'], a: 2, why: 'Siete naturales y cinco alteradas: doce. La decimotercera es la octava.' },
        ],
      },

      /* ---------------------------------------------------------- 1.5 */
      {
        id: 'mastil', title: 'Las notas en el mástil', time: '20 min',
        desc: 'Memoriza las cuerdas 6 y 5, usa los marcadores y las formas de octava.',
        lead: 'Saber qué nota estás tocando sin contar es lo que separa a quien repite formas de quien entiende la guitarra. El truco es no aprenderlo todo a la vez.',
        goals: ['Localizar las notas naturales en las cuerdas 6 y 5', 'Usar los marcadores del mástil como referencia', 'Encontrar cualquier nota en otras cuerdas con las formas de octava'],
        body: () => `
<h2>Empieza por las cuerdas 6 y 5</h2>
<p>No hace falta memorizar las 78 posiciones del mástil hasta el traste 12. Casi todo se apoya en las dos cuerdas graves, porque ahí van las fundamentales de los acordes con cejilla y de muchas escalas. Apréndete las notas naturales de estas dos cuerdas y lo demás saldrá por octavas.</p>
${W.fretboard({ frets: [0, 12], show: { root: 'C', ivs: ['1', '2', '3', '4', '5', '6', '7'], strings: [6, 5] }, color: 'mono', label: 'note', legend: false, caption: 'Notas naturales en las cuerdas 6 y 5. Fíjate en las que coinciden con los marcadores: en la cuerda 6, {G} (3), {A} (5), {B} (7); en la 5, {C} (3), {D} (5), {E} (7).' })}
<h3>Los marcadores son tus anclas</h3>
<p>Los puntos de los trastes 3, 5, 7, 9 y 12 están para eso. Memoriza qué nota cae en cada uno y calcula el resto a un traste de distancia:</p>
<table><thead><tr><th>Traste</th><th class="c">3</th><th class="c">5</th><th class="c">7</th><th class="c">9</th><th class="c">12</th></tr></thead>
<tbody><tr><td>Cuerda 6</td><td class="c">{G}</td><td class="c">{A}</td><td class="c">{B}</td><td class="c">{C#}</td><td class="c">{E}</td></tr>
<tr><td>Cuerda 5</td><td class="c">{C}</td><td class="c">{D}</td><td class="c">{E}</td><td class="c">{F#}</td><td class="c">{A}</td></tr></tbody></table>
<p>Un truco: la cuerda 5 en cada marcador es la nota de la cuerda 6 en el mismo marcador más una cuarta (lo verás en intervalos). En la práctica, basta con recordar las dos filas de la tabla.</p>

<h2>Formas de octava</h2>
<p>Una vez sabes una nota, puedes encontrarla una octava más aguda en otra cuerda con un dibujo fijo. Son estas, y funcionan en cualquier traste:</p>
${W.fretboard({ frets: [0, 12], dots: [{ s: 6, f: 3, role: 'r' }, { s: 4, f: 5, role: 'r' }, { s: 5, f: 3, role: 'f' }, { s: 3, f: 5, role: 'f' }, { s: 4, f: 7, role: 't' }, { s: 2, f: 10, role: 't' }, { s: 6, f: 8, role: 's' }, { s: 1, f: 8, role: 's' }], label: 'note', legend: false, caption: 'Cuatro parejas de octavas. <b>Cuerda 6 → 4</b> y <b>5 → 3</b>: dos cuerdas más abajo y dos trastes a la derecha. <b>Cuerda 4 → 2</b>: dos cuerdas y <b>tres</b> trastes, por culpa de la cuerda 2. <b>Cuerda 6 → 1</b>: mismo traste, dos octavas.' })}
<p>Así, si sabes que el traste 3 de la cuerda 6 es {G}, sabes que el traste 5 de la cuerda 4 también es {G}, y que el traste 3 de la cuerda 1 es otro {G}. Con las cuerdas 6 y 5 memorizadas y estas formas, puedes encontrar cualquier nota en cualquier cuerda en pocos segundos.</p>
<div class="callout"><span class="co-t">¿Por qué la cuerda 2 rompe el patrón?</span>Es la misma excepción que al afinar: entre la cuerda 3 ({G}) y la 2 ({B}) hay un semitono menos que entre las demás. Toda forma que cruce de la cuerda 3 a la 2 se desplaza un traste hacia la derecha.</div>

<h2>Una nota, muchos sitios</h2>
<p>La misma altura exacta aparece en varias cuerdas. Por ejemplo, el {E} de la cuerda 1 al aire también está en la cuerda 2 traste 5, en la 3 traste 9 y en la 4 traste 14. Pulsa los puntos para comprobar que suenan igual:</p>
${W.fretboard({ frets: [0, 15], dots: [{ s: 1, f: 0, role: 'r' }, { s: 2, f: 5, role: 'r' }, { s: 3, f: 9, role: 'r' }, { s: 4, f: 14, role: 'r' }], label: 'note', legend: false, caption: 'Cuatro sitios para el mismo {E_4}. Elegir uno u otro cambia el timbre y, sobre todo, la comodidad para tocar lo que viene después.' })}

<h2>Entrena el diapasón</h2>
<p>Este entrenador marca un traste y te pide la nota, o te da una nota y te pide todas sus posiciones. Empieza solo con las cuerdas 6 y 5 y notas naturales, y amplía cuando aciertes rápido. Cinco minutos al día durante dos semanas bastan para que deje de hacerte falta contar.</p>
${W.trainer({ tool: 'notas', state: { mode: 'name', strings: [6, 5], range: [0, 12], natural: true } })}`,
        practice: [
          'Di en voz alta las notas naturales de la cuerda 6 mientras las tocas, del traste 0 al 12 y de vuelta. Luego la cuerda 5.',
          'Escoge una nota (por ejemplo {D}) y encuéntrala en todas las cuerdas entre los trastes 0 y 12 usando las formas de octava.',
          'Usa el entrenador de arriba cinco minutos al día. Cuando aciertes en menos de dos segundos, añade la cuerda 4.',
        ],
        quiz: [
          { q: '¿Qué nota hay en el traste 5 de la cuerda 6?', o: ['{G}', '{A}', '{B}', '{D}'], a: 1, why: '{E} (0), {F} (1), {F#} (2), {G} (3), {G#} (4), {A} (5).' },
          { q: '¿Qué nota hay en el traste 3 de la cuerda 5?', o: ['{C}', '{D}', '{B}', '{G}'], a: 0, why: '{A} (0), {A#} (1), {B} (2), {C} (3).' },
          { q: 'Si una nota está en la cuerda 6 traste 7, ¿dónde está su octava superior más cercana?', o: ['Cuerda 5 traste 7', 'Cuerda 4 traste 9', 'Cuerda 3 traste 9', 'Cuerda 4 traste 7'], a: 1, why: 'De la 6 a la 4: dos cuerdas más abajo y dos trastes a la derecha.' },
          { q: 'La forma de octava de la cuerda 4 a la 2 avanza…', o: ['Dos trastes', 'Tres trastes', 'Un traste', 'Cero trastes'], a: 1, why: 'Al cruzar de la cuerda 3 a la 2 todo se desplaza un traste más: tres en lugar de dos.' },
        ],
      },

      /* ---------------------------------------------------------- 1.6 */
      {
        id: 'pulso', title: 'Pulso, tempo y compás', time: '12 min',
        desc: 'El latido de la música, cómo se mide la velocidad y cómo se agrupan los tiempos.',
        lead: 'Puedes tocar las notas correctas y que no suene a música. Lo que falta casi siempre es el tiempo: el pulso, la velocidad y la forma en que se agrupan los golpes.',
        goals: ['Sentir y marcar el pulso de una canción', 'Entender el tempo y usar el metrónomo', 'Reconocer los compases de 2, 3 y 4 tiempos'],
        body: () => `
<h2>El pulso</h2>
<p>El <strong>pulso</strong> es el latido regular que hay debajo de casi toda la música: lo que marcas sin darte cuenta con el pie. Los pulsos son todos iguales y están igual de separados. Sobre ellos se colocan las notas, que pueden durar uno, varios o fracciones de pulso.</p>
<p>Aprender a sentir el pulso es la base de todo lo rítmico. El ejercicio más simple sigue siendo el mejor: pon una canción que te guste y marca con el pie cada pulso, sin acelerar ni frenar.</p>

<h2>El tempo</h2>
<p>El <strong>tempo</strong> es la velocidad del pulso y se mide en <strong>pulsos por minuto</strong> (ppm, en inglés <em>bpm</em>). A 60 ppm hay un pulso por segundo; a 120, dos. Una balada lenta ronda los 60-75 ppm; el pop, 100-130; el punk, 160 o más.</p>
<p>El <strong>metrónomo</strong> marca el pulso con un clic al tempo que elijas. Es la herramienta de estudio más útil que existe: te obliga a mantener la velocidad y te muestra dónde te aceleras o te paras. Pruébalo:</p>
${W.trainer({ tool: 'metronomo', state: { bpm: 72, meter: '4/4', sub: 1 } })}

<h2>El compás</h2>
<p>Los pulsos no se sienten todos igual: unos parecen más fuertes que otros, y se agrupan de forma regular. Cada grupo es un <strong>compás</strong>. En partitura los compases se separan con <strong>barras de compás</strong> (líneas verticales) y al principio aparece la <strong>indicación de compás</strong>, dos números uno encima del otro:</p>
<ul>
<li>El número de <strong>arriba</strong> dice cuántos pulsos tiene cada compás.</li>
<li>El de <strong>abajo</strong> dice qué figura vale un pulso. Un 4 significa la negra, que verás en la próxima lección.</li>
</ul>
<p>El primer pulso de cada compás es el más fuerte. Lo notarás porque es donde suelen cambiar los acordes.</p>
<h3>4/4: el más común</h3>
<p>Cuatro pulsos por compás: <strong>UNO</strong> dos tres cuatro, <strong>UNO</strong> dos tres cuatro. Es el compás de casi todo el pop, el rock y el blues. Tanto que se le llama “compás común” y a veces se escribe con una C.</p>
${W.score({ notes: 'q:6/0 q:6/0 q:6/0 q:6/0 | q:6/0 q:6/0 q:6/0 q:6/0', mode: 'rhythm', time: [4, 4], counts: true, bpm: 90, caption: 'Dos compases de 4/4 con un golpe en cada pulso. El clic del metrónomo acentúa el 1.' })}
<h3>3/4: el vals</h3>
<p>Tres pulsos: <strong>UNO</strong> dos tres. Es el compás del vals, de muchas rancheras y de canciones como <em>Cumpleaños feliz</em>.</p>
${W.score({ notes: 'q:6/0 q:6/0 q:6/0 | q:6/0 q:6/0 q:6/0', mode: 'rhythm', time: [3, 4], counts: true, bpm: 100 })}
<h3>2/4: la marcha</h3>
<p>Dos pulsos: <strong>UNO</strong> dos. Típico de marchas, pasodobles, polcas y mucha música tradicional.</p>
${W.score({ notes: 'q:6/0 q:6/0 | q:6/0 q:6/0 | q:6/0 q:6/0', mode: 'rhythm', time: [2, 4], counts: true, bpm: 100 })}
<div class="callout tip"><span class="co-t">Cómo descubrir el compás de una canción</span>Marca el pulso con el pie y cuenta “uno, dos, tres…”, volviendo a uno cuando sientas el golpe fuerte o el cambio de acorde. Si siempre vuelves a uno después del cuatro, es 4/4; si después del tres, 3/4.</div>`,
        practice: [
          'Pon el metrónomo a 70 ppm y da una palmada en cada clic durante un minuto. Después cuenta en voz alta “uno, dos, tres, cuatro” a la vez.',
          'Toca la cuerda 6 al aire una vez por pulso con el metrónomo a 60, 80 y 100 ppm. Escucha si tu golpe tapa el clic: eso significa que vas justo a tiempo.',
          'Escoge tres canciones que conozcas y averigua si están en 4/4 o en 3/4 contando como se explica arriba.',
        ],
        quiz: [
          { q: '¿Qué mide el tempo?', o: ['La altura de las notas', 'La velocidad del pulso', 'El volumen', 'El número de compases'], a: 1, why: 'El tempo es la velocidad del pulso, en pulsos por minuto.' },
          { q: 'A 120 ppm, ¿cuántos pulsos hay por segundo?', o: ['1', '2', '3', '12'], a: 1, why: '120 pulsos en 60 segundos: dos por segundo.' },
          { q: 'En un compás de 3/4, ¿cuántos pulsos hay?', o: ['3', '4', '7', '12'], a: 0, why: 'El número de arriba indica los pulsos por compás.' },
          { q: '¿Qué pulso del compás suele ser el más fuerte?', o: ['El último', 'El primero', 'El segundo', 'Todos igual'], a: 1, why: 'El primer pulso de cada compás es el acento principal.' },
        ],
      },

      /* ---------------------------------------------------------- 1.7 */
      {
        id: 'figuras', title: 'Figuras rítmicas y silencios', time: '18 min',
        desc: 'Redonda, blanca, negra, corchea y semicorchea, y cómo contarlas.',
        lead: 'Las figuras dicen cuánto dura cada nota respecto al pulso. Son pocas, cada una dura la mitad que la anterior, y con ellas se escribe cualquier ritmo.',
        goals: ['Reconocer las cinco figuras básicas y sus silencios', 'Contar en voz alta negras, corcheas y semicorcheas', 'Leer y tocar ritmos sencillos de un compás'],
        body: () => `
<h2>Cada figura dura la mitad que la anterior</h2>
<p>En los compases que acabas de ver (los que llevan un 4 abajo), la <strong>negra</strong> vale un pulso. A partir de ahí, todo se divide o se multiplica por dos:</p>
${W.figures({})}
<p>Cada figura tiene un <strong>silencio</strong> equivalente, que dura lo mismo pero sin sonar. Los silencios son igual de importantes que las notas: es donde la música respira. Pulsa el botón de cada fila para escuchar un compás de esa figura con el metrónomo.</p>

<h2>Contar en voz alta</h2>
<p>La forma más fiable de leer ritmos es contarlos. Cada pulso se nombra con su número, y las divisiones con sílabas:</p>
<ul>
<li><strong>Negras</strong>: “1, 2, 3, 4”.</li>
<li><strong>Corcheas</strong> (dos por pulso): “1 y 2 y 3 y 4 y”. La “y” cae justo a mitad de pulso.</li>
<li><strong>Semicorcheas</strong> (cuatro por pulso): “1 e y a, 2 e y a…”.</li>
</ul>
${W.score({ notes: 'q:5/0 q:5/0 q:5/0 q:5/0 | e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 e:5/0 | s:5/0 s:5/0 s:5/0 s:5/0 s:5/0 s:5/0 s:5/0 s:5/0 h:5/0', mode: 'rhythm', counts: true, bpm: 70, caption: 'Negras, corcheas y semicorcheas al mismo tempo. El pulso no cambia: lo que cambia es cuántas notas caben en él.' })}
<p>Cuando hay varias corcheas o semicorcheas seguidas, sus banderas se unen con una <strong>barra</strong> (o <em>viga</em>) para que se lean por grupos de un pulso. Una corchea sola lleva su bandera suelta.</p>

<h2>Lee y toca</h2>
<p>Estos ejemplos combinan figuras y silencios. Antes de darle a escuchar, intenta contarlos en voz alta tú solo. Luego tócalos con la cuerda 6 al aire o apagando las cuerdas con la mano izquierda.</p>
${W.score({ notes: 'h:6/0 q:6/0 q:6/0 | q:6/0 q:r h:6/0 | q:6/0 q:6/0 q:6/0 q:r | w:6/0', mode: 'rhythm', counts: true, bpm: 80, caption: 'Blancas, negras, silencios de negra y una redonda final.' })}
${W.score({ notes: 'q:6/0 e:6/0 e:6/0 q:6/0 e:6/0 e:6/0 | e:6/0 e:6/0 q:6/0 h:6/0 | e:r e:6/0 e:r e:6/0 q:6/0 q:r | e:6/0 e:6/0 e:6/0 e:6/0 h:6/0', mode: 'rhythm', counts: true, bpm: 76, caption: 'Negras y corcheas. En el tercer compás, el silencio de corchea hace que la nota entre en la “y”: es tu primer contratiempo.' })}

<h2>Todo tiene que sumar</h2>
<p>En cada compás de 4/4, la duración total de notas y silencios suma exactamente cuatro negras. Si un compás no suma, o falta algo o sobra. Es una buena forma de comprobar que estás leyendo bien: por ejemplo, blanca (2) + negra (1) + dos corcheas (½ + ½) = 4.</p>
<div class="callout tip"><span class="co-t">Practica con la herramienta de ritmo</span>En <a href="#/herramienta/ritmo">Lectura rítmica</a> se generan ritmos nuevos cada vez y te dice si tocas a tiempo. Empieza por el nivel de negras y blancas y pasa al de corcheas cuando aciertes más del 80 %.</div>`,
        practice: [
          'Lee en voz alta cada ejemplo antes de escucharlo. Después, tócalo con una sola cuerda junto al botón de escuchar.',
          'Con el metrónomo a 60 ppm, toca cuatro negras, cuatro grupos de corcheas y cuatro de semicorcheas sin parar ni cambiar el tempo.',
          'Haz cinco ejercicios del nivel 1 y cinco del nivel 2 en la herramienta de lectura rítmica.',
        ],
        quiz: [
          { q: 'En 4/4, ¿cuántas negras dura una blanca?', o: ['1', '2', '3', '4'], a: 1, why: 'La blanca dura dos negras.' },
          { q: '¿Cuántas corcheas caben en un pulso de negra?', o: ['1', '2', '4', '8'], a: 1, why: 'Una corchea es media negra: dos por pulso.' },
          { q: '¿Cómo se cuentan cuatro semicorcheas en el pulso 2?', o: ['2 y', '2 e y a', '2 3 4 5', '2 tri ple'], a: 1, why: 'Las semicorcheas se cuentan “número, e, y, a”.' },
          { q: 'Un compás de 4/4 tiene una blanca y una negra. ¿Qué falta para completarlo?', o: ['Otra blanca', 'Una negra o dos corcheas', 'Una redonda', 'Nada'], a: 1, why: '2 + 1 = 3. Falta el valor de una negra: una negra, dos corcheas o un silencio de negra.' },
        ],
      },

      /* ---------------------------------------------------------- 1.8 */
      {
        id: 'tablatura', title: 'Leer tablatura', time: '15 min',
        desc: 'El sistema de notación propio de la guitarra y sus símbolos.',
        lead: 'La tablatura no dice qué nota suena, sino dónde poner el dedo. Por eso se aprende en minutos, y por eso conviene conocer también sus límites.',
        goals: ['Leer cuerda y traste en una tablatura', 'Tocar acordes y melodías escritas en tablatura', 'Reconocer los símbolos de ligado, arrastre, bend y vibrato'],
        body: () => `
<h2>Seis líneas, seis cuerdas</h2>
<p>Una tablatura (o <em>tab</em>) tiene seis líneas horizontales, una por cuerda. Como en los diapasones del curso, <strong>la línea de arriba es la cuerda 1</strong> (la fina) y la de abajo la cuerda 6. Sobre las líneas aparecen números: el <strong>traste</strong> que hay que pisar en esa cuerda. Un 0 es la cuerda al aire.</p>
<p>Se lee de izquierda a derecha. Los números que están uno encima de otro se tocan <strong>a la vez</strong>.</p>
${W.score({ notes: 'q:6/0 q:5/2 q:4/2 q:3/0 | q:2/0 q:1/0 h:6/0+5/2+4/2+3/0+2/0+1/0', mode: 'tab', bpm: 80, caption: 'Las notas del acorde de {Em} de una en una y después todas juntas. Fíjate en cómo cambia la tablatura cuando las notas suenan a la vez.' })}

<h2>Tu primera melodía en tablatura</h2>
<p>Esta es la melodía principal del <em>Himno a la alegría</em> de Beethoven. Está escrita en las cuerdas 1 y 2, cerca de la cejuela. Debajo de la tablatura no hay ritmo explícito, así que escúchala primero:</p>
${W.score({ notes: 'q:1/0 q:1/0 q:1/1 q:1/3 | q:1/3 q:1/1 q:1/0 q:2/3 | q:2/1 q:2/1 q:2/3 q:1/0 | q.:1/0 e:2/3 h:2/3 | q:1/0 q:1/0 q:1/1 q:1/3 | q:1/3 q:1/1 q:1/0 q:2/3 | q:2/1 q:2/1 q:2/3 q:1/0 | q.:2/3 e:2/1 h:2/1', mode: 'tab', bpm: 96, caption: 'Himno a la alegría (L. van Beethoven). Usa el dedo 1 para el traste 1 y el dedo 3 para el traste 3.' })}

<h2>La tablatura no dice el ritmo</h2>
<p>Ese es su gran límite. La tablatura sola indica qué tocar, pero no cuánto dura cada nota. Por eso muchas tabs de internet solo se entienden si ya conoces la canción. Hay dos soluciones habituales:</p>
<ul>
<li><strong>Tablatura con ritmo</strong>: se añaden plicas y barras (las mismas de las figuras) bajo los números.</li>
<li><strong>Partitura y tablatura juntas</strong>: arriba el pentagrama con el ritmo y las notas exactas, abajo la tablatura con la posición. Es lo que verás en casi todo este curso, y lo que encontrarás en los libros de método serios.</li>
</ul>
${W.score({ notes: 'q:1/0 q:1/0 q:1/1 q:1/3 | q:1/3 q:1/1 q:1/0 q:2/3 | q:2/1 q:2/1 q:2/3 q:1/0 | q.:1/0 e:2/3 h:2/3', mode: 'full', bpm: 96, caption: 'Los mismos cuatro compases en partitura y tablatura. El pentagrama aporta lo que le faltaba a la tab: la duración de cada nota.' })}

<h2>Los símbolos de técnica</h2>
<p>La tablatura también indica cómo tocar algunas notas. Estos son los símbolos más frecuentes:</p>
<table><thead><tr><th>Símbolo</th><th>Nombre</th><th>Qué hacer</th></tr></thead><tbody>
<tr><td><b>h</b> o arco con H</td><td>Ligado ascendente (<em>hammer-on</em>)</td><td>Toca la primera nota y “martilla” la segunda con otro dedo, sin volver a pulsar.</td></tr>
<tr><td><b>p</b> o arco con P</td><td>Ligado descendente (<em>pull-off</em>)</td><td>Con dos dedos pisando, retira el de arriba tirando un poco de la cuerda para que suene la de abajo.</td></tr>
<tr><td><b>/</b> o <b>\\</b></td><td>Arrastre (<em>slide</em>)</td><td>Desliza el dedo pisando la cuerda hasta el traste siguiente.</td></tr>
<tr><td><b>b</b> o flecha curva</td><td>Bend (estiramiento)</td><td>Empuja la cuerda hacia arriba o abajo para subir la nota. “full” = un tono.</td></tr>
<tr><td><b>~</b></td><td>Vibrato</td><td>Oscila ligeramente la cuerda para que la nota “respire”.</td></tr>
<tr><td><b>x</b></td><td>Nota muerta</td><td>Apaga la cuerda con la mano que pisa y pulsa: suena un golpe percusivo.</td></tr>
</tbody></table>
${W.score({ notes: 'q:3/5h q:3/7 q:2/5p q:2/3 | q:3/5s q:3/7 h:2/8bv | q:1/5 q:1/x q:1/x q:2/5v | w:2/5', mode: 'tab', bpm: 70, caption: 'Un ejemplo con todas las técnicas: ligados, arrastre, bend con vibrato, notas muertas y vibrato. Escúchalo para relacionar cada símbolo con su sonido.' })}`,
        practice: [
          'Toca el Himno a la alegría completo leyendo la tablatura. Cuando te salga, tócalo con el metrónomo a 80 ppm.',
          'Busca la tablatura de una canción que te guste y comprueba si indica el ritmo. Si no lo hace, escucha la grabación mientras la lees.',
          'Practica un ligado ascendente: toca la cuerda 3 en el traste 5 y, sin volver a pulsar, golpea con el dedo 3 el traste 7. Las dos notas deben sonar con volumen parecido.',
        ],
        quiz: [
          { q: 'En una tablatura, la línea de arriba representa…', o: ['La cuerda 6', 'La cuerda 1', 'El traste 1', 'El ritmo'], a: 1, why: 'Arriba la cuerda más aguda (1), abajo la más grave (6).' },
          { q: 'Un 0 en la tercera línea significa…', o: ['No tocar la cuerda 3', 'Cuerda 3 al aire', 'Cuerda 3 traste 3', 'Silencio'], a: 1, why: 'El número es el traste; 0 es la cuerda al aire. La tercera línea empezando por arriba es la cuerda 3.' },
          { q: '¿Qué información NO da la tablatura sin plicas?', o: ['La cuerda', 'El traste', 'La duración de las notas', 'El orden de las notas'], a: 2, why: 'La tablatura básica no indica el ritmo.' },
          { q: 'Una “h” entre dos números indica…', o: ['Golpe con la mano', 'Ligado ascendente (hammer-on)', 'Armónico', 'Pulsar más fuerte'], a: 1, why: 'h de hammer-on: la segunda nota se toca martillando con un dedo, sin pulsar.' },
        ],
      },

      /* ---------------------------------------------------------- 1.9 */
      {
        id: 'primeros-acordes', title: 'Tus primeros acordes', time: '25 min',
        desc: 'Leer diagramas, los ocho acordes abiertos esenciales y cómo cambiar entre ellos.',
        lead: 'Un acorde son varias notas sonando a la vez. Con ocho acordes abiertos puedes acompañar cientos de canciones, y aprender a cambiar entre ellos con fluidez es la mitad del trabajo.',
        goals: ['Leer un diagrama de acorde', 'Tocar {Em}, {Am}, {E}, {A}, {D}, {Dm}, {G} y {C}', 'Cambiar entre acordes usando dedos guía'],
        body: () => `
<h2>Cómo leer un diagrama de acorde</h2>
<p>Los diagramas de acordes dibujan el mástil <strong>en vertical</strong>, como si colgaras la guitarra de la pala y la miraras de frente:</p>
<ul>
<li>Las líneas verticales son las cuerdas: <strong>la 6 a la izquierda</strong>, la 1 a la derecha.</li>
<li>Las horizontales son los trastes. La línea gruesa de arriba es la cejuela.</li>
<li>Los círculos negros con número indican dónde pisar y con qué dedo. Uno rojo marca la <strong>fundamental</strong>, la nota que da nombre al acorde.</li>
<li><strong>○</strong> encima de una cuerda: se toca al aire. <strong>×</strong>: no se toca.</li>
</ul>
${W.chords({ items: ['Em'], caption: '{Em} (Mi menor): dedo 2 en la cuerda 5, traste 2, y dedo 3 en la cuerda 4, traste 2. Todas las cuerdas suenan. Pulsa el diagrama para escucharlo.' })}

<h2>Los ocho acordes esenciales</h2>
<p>Estos acordes se llaman <strong>abiertos</strong> porque combinan notas pisadas con cuerdas al aire. Están ordenados de más fácil a más difícil. Pulsa cada uno para oír cómo debe sonar:</p>
${W.chords({ items: ['Em', 'Am', 'E', 'A', 'Dm', 'D', 'G', 'C'] })}
<p>Unas pautas para que suenen limpios:</p>
<ul>
<li><strong>Toca cuerda a cuerda</strong> después de colocar los dedos. Si alguna no suena, o la pisas mal, o otro dedo la está tocando.</li>
<li><strong>Respeta las ×</strong>. En {D} y {Dm} empieza el rasgueo en la cuerda 4; en {C} y {A}, en la 5.</li>
<li>En {A}, los tres dedos caben en el traste 2 si los pones en diagonal. Si no te caben, prueba con 2-1-3 o con un solo dedo haciendo una mini-cejilla.</li>
<li>En {G} hay dos digitaciones habituales. La del diagrama (2-1-3) es la más común; muchos guitarristas usan 3-2-4 para cambiar después a {C} más fácilmente.</li>
</ul>
<div class="callout"><span class="co-t">Mayor y menor</span>{E} y {Em} solo se diferencian en un dedo, igual que {A} y {Am} o {D} y {Dm}. Esa nota que cambia es la tercera del acorde y es la que decide si suena “alegre” (mayor) o “triste” (menor). Lo entenderás a fondo en el nivel 2.</div>
${W.listen({ items: [{ label: '{E} mayor', chord: 'E' }, { label: '{Em} menor', chord: 'Em' }, { label: '{A} mayor', chord: 'A' }, { label: '{Am} menor', chord: 'Am' }] })}

<h2>Cambiar de acorde sin parar</h2>
<p>Lo difícil no es tocar un acorde, sino cambiar al siguiente a tiempo. Tres trucos:</p>
<ul>
<li><strong>Dedos guía</strong>: si un dedo está en el mismo sitio en los dos acordes, no lo levantes. De {Am} a {C}, los dedos 1 y 2 se quedan quietos y solo se mueve el 3.</li>
<li><strong>Mueve todos los dedos a la vez</strong>, como un bloque, en lugar de colocarlos uno a uno.</li>
<li><strong>Anticípate</strong>: empieza a cambiar en el último pulso del compás. Es mejor que suene una cuerda al aire de transición que llegar tarde al siguiente acorde.</li>
</ul>
${W.progression({ prog: ['Am', 'C', 'G', 'Em'], bpm: 70, pattern: 'D.D.D.D.', caption: 'Una progresión para practicar cambios: un compás de cuatro rasgueos por acorde. Baja el tempo si no llegas.' })}
<div class="callout tip"><span class="co-t">El ejercicio del minuto</span>Elige dos acordes y cambia entre ellos tantas veces como puedas en un minuto, rasgueando una vez cada vez que llegues. Apunta el número. Repite cada día: en una semana lo habrás doblado.</div>`,
        practice: [
          'Coloca cada acorde, tócalo cuerda a cuerda y corrige hasta que suenen todas las que deben. Después rasguea.',
          'Ejercicio del minuto con estas parejas: {Em}-{Am}, {Am}-{C}, {E}-{A}, {D}-{A}, {G}-{C}. Apunta tus marcas.',
          'Toca la progresión de arriba a 60 ppm durante dos minutos sin parar. Cuando lo consigas, sube a 70 y a 80.',
        ],
        quiz: [
          { q: 'En un diagrama de acorde, ¿qué significa una × encima de una cuerda?', o: ['Tocarla al aire', 'No tocarla', 'Pisarla con el dedo 1', 'Hacer cejilla'], a: 1, why: '× indica que esa cuerda no debe sonar; ○ que se toca al aire.' },
          { q: 'En un diagrama vertical, la cuerda de la izquierda es…', o: ['La cuerda 1', 'La cuerda 6', 'La cejuela', 'Depende del acorde'], a: 1, why: 'De izquierda a derecha: cuerdas 6, 5, 4, 3, 2, 1.' },
          { q: '¿Qué diferencia hay entre {E} y {Em} en la digitación abierta?', o: ['Nada', 'Un dedo: el de la cuerda 3', 'Todo el acorde se mueve un traste', '{Em} no se toca en la cuerda 6'], a: 1, why: '{E} añade el dedo 1 en la cuerda 3, traste 1. Esa nota es la tercera mayor.' },
          { q: 'Al cambiar de {Am} a {C}, ¿qué dedos pueden quedarse quietos?', o: ['Ninguno', 'Los dedos 1 y 2', 'Solo el 3', 'Todos'], a: 1, why: 'En ambos acordes el dedo 1 está en la cuerda 2 traste 1 y el 2 en la cuerda 4 traste 2.' },
          { q: '¿Desde qué cuerda se rasguea {D}?', o: ['6', '5', '4', '3'], a: 2, why: 'Las cuerdas 6 y 5 llevan ×: se empieza en la 4.' },
        ],
      },

      /* ---------------------------------------------------------- 1.10 */
      {
        id: 'rasgueo', title: 'Rasgueo y primeros ritmos', time: '20 min',
        desc: 'El movimiento de péndulo, cómo leer patrones y combinarlos con acordes.',
        lead: 'Un buen rasgueo no es una secuencia de golpes, sino un movimiento continuo de la mano en el que unas veces tocas y otras no. Si entiendes eso, cualquier patrón sale solo.',
        goals: ['Rasguear con el movimiento constante de péndulo', 'Leer patrones de rasgueo con flechas', 'Tocar tres patrones básicos cambiando de acorde'],
        body: () => `
<h2>La mano como un péndulo</h2>
<p>La regla de oro del rasgueo: <strong>la mano nunca se para</strong>. Baja en cada pulso y sube entre pulsos, como un péndulo, aunque no toques las cuerdas. Así:</p>
<ul>
<li>Los rasgueos <strong>hacia abajo</strong> (↓) caen en los pulsos: 1, 2, 3, 4.</li>
<li>Los rasgueos <strong>hacia arriba</strong> (↑) caen en las “y”, entre pulsos.</li>
<li>Para dejar un hueco, la mano hace el movimiento <strong>sin tocar</strong> las cuerdas. Ese “golpe fantasma” mantiene el tiempo.</li>
</ul>
<p>Con púa, sujétala entre el pulgar y el lateral del índice, dejando asomar solo la punta. Sin púa, rasguea hacia abajo con las uñas del índice y medio y hacia arriba con la yema del pulgar o del índice. Y mueve sobre todo la <strong>muñeca</strong>, no el codo.</p>

<h2>Patrón 1: negras</h2>
<p>Un rasgueo hacia abajo en cada pulso. Parece demasiado fácil, pero es el mejor sitio para practicar los cambios de acorde.</p>
${W.strum({ pattern: 'D.D.D.D.', chords: ['G'], bpm: 80, caption: 'Las flechas punteadas son el movimiento de vuelta sin tocar. Pulsa escuchar y rasguea a la vez.' })}

<h2>Patrón 2: corcheas</h2>
<p>Abajo en los pulsos y arriba en las “y”: ocho golpes por compás. Los de arriba suenan más suaves y brillantes porque tocan primero las cuerdas agudas; no hace falta que golpees todas.</p>
${W.strum({ pattern: 'DUDUDUDU', chords: ['G'], bpm: 76 })}

<h2>Patrón 3: el rasgueo “folk”</h2>
<p>El patrón más usado en pop y folk acústico. Se cuenta “1, 2 y, y 4 y” y deja dos huecos que le dan su balanceo: el arriba de la “y” del 1 y el abajo del pulso 3.</p>
${W.strum({ pattern: 'D.DU.UDU', chords: ['G', 'C', 'Em', 'D'], bpm: 80, caption: 'Abajo, abajo-arriba, arriba, abajo-arriba. Si te pierdes, vuelve al patrón de corcheas y deja de tocar en los huecos sin parar la mano.' })}
<p>En partitura rítmica, los rasgueos se escriben con figuras y flechas encima. Este es el mismo patrón:</p>
${W.score({ notes: 'q:D e:D e:U e:r e:U e:D e:U | q:D e:D e:U e:r e:U e:D e:U', mode: 'rhythm', counts: true, chord: 'G', bpm: 80, caption: 'El silencio de corchea del pulso 3 es el golpe que se hace en el aire.' })}

<h2>El golpe apagado</h2>
<p>Muchos ritmos añaden un golpe percusivo en los pulsos 2 y 4: rasgueas hacia abajo mientras apoyas el canto de la mano que pulsa sobre las cuerdas, de forma que suena un “chas” sin notas. Se escribe con una × en lugar de la cabeza de nota.</p>
${W.strum({ pattern: 'D.XUDUXU', chords: ['Am'], bpm: 84, caption: 'Abajo, golpe, arriba, abajo-arriba, golpe-arriba. Típico de la rumba y del pop acústico.' })}

<h2>Todo junto</h2>
<p>Una progresión clásica con el patrón folk. Cambia de acorde en el pulso 1 de cada compás y, si no llegas, suelta los dedos en el último “y” para ganar tiempo:</p>
${W.progression({ prog: ['G', 'D', 'Em', 'C'], bpm: 80, pattern: 'D.DU.UDU', caption: 'Esta progresión aparece en cientos de canciones pop. Cuando te salga, prueba a cambiar el orden de los acordes.' })}`,
        practice: [
          'Con el metrónomo a 60 ppm, haz el movimiento de péndulo con las cuerdas apagadas (la mano izquierda apoyada sin pisar) durante un minuto.',
          'Toca el patrón folk con un solo acorde ({G} o {Em}) hasta que te salga sin pensar. Después añade los cambios.',
          'Elige una canción que conozcas con estos acordes y acompáñala con el patrón folk. Si va muy rápida, empieza con el patrón de negras.',
        ],
        quiz: [
          { q: 'Al rasguear corcheas en 4/4, ¿hacia dónde se rasguea en los pulsos (1, 2, 3, 4)?', o: ['Hacia arriba', 'Hacia abajo', 'Alterna sin regla', 'No se toca'], a: 1, why: 'Abajo en los pulsos, arriba en las “y”.' },
          { q: '¿Qué hace la mano en un hueco del patrón?', o: ['Se para', 'Sigue moviéndose sin tocar las cuerdas', 'Toca más suave', 'Apaga las cuerdas'], a: 1, why: 'El movimiento no se interrumpe: eso mantiene el tiempo.' },
          { q: 'En el patrón folk “1, 2 y, y 4 y”, ¿qué golpe no se toca?', o: ['El 1', 'El abajo del pulso 3', 'El arriba del 4', 'Ninguno'], a: 1, why: 'Se saltan el arriba de la “y” del 1 y el abajo del 3.' },
          { q: 'Un golpe apagado se escribe con…', o: ['Una flecha doble', 'Una × en lugar de la cabeza de nota', 'Un silencio', 'Un número 0'], a: 1, why: 'La × indica sonido percusivo sin altura definida.' },
        ],
      },
    ],
  });
})();
