# Fretto: teoría musical para guitarra

Curso interactivo de teoría musical aplicada a la guitarra, desde cero hasta armonía avanzada. Es una web estática (HTML, CSS y JavaScript sin dependencias ni paso de compilación) lista para publicar en GitHub Pages.

## Qué incluye

**Temario: 40 lecciones en 4 niveles**, cada una con explicación, ejemplos que suenan, práctica con la guitarra y un test que marca la lección como completada.

| Nivel | Contenido |
| --- | --- |
| 1. Fundamentos | Partes de la guitarra, afinar, notas y cifrados, semitonos y alteraciones, notas en el mástil, pulso y compás, figuras rítmicas, tablatura, primeros acordes, rasgueo |
| 2. Teoría práctica | Pentagrama y clave de sol, alteraciones y armadura, intervalos, escala mayor, tríadas, tonalidad y acordes diatónicos, progresiones y capo, cejilla, pentatónica menor, síncopa y semicorcheas |
| 3. Armonía y mástil | Escalas menores, círculo de quintas, acordes de séptima, funciones y cadencias, CAGED, inversiones, blues, compases compuestos, cinco posiciones de la pentatónica, arpegios y fingerpicking |
| 4. Armonía avanzada | Modos griegos y su uso, extensiones y voicings, dominantes secundarios, intercambio modal, sustitución tritonal y dominantes alterados, ii–V–I, improvisación sobre cambios, modulación y rearmonización, ritmo avanzado |

**Herramientas de práctica:** explorador del diapasón (escalas, acordes, notas, 6 afinaciones), diccionario de acordes (30 tipos × 12 tonalidades con digitaciones generadas), metrónomo (compases simples, compuestos e irregulares, subdivisiones, tap tempo y subida automática), afinador por micrófono, círculo de quintas, entrenador de notas en el mástil, lectura de partitura, lectura rítmica con medición de precisión y entrenamiento auditivo (intervalos y acordes).

**Componentes propios, dibujados en SVG:** diapasón interactivo con sonido, diagramas de acordes, partitura con tablatura sincronizada y reproducción, patrones de rasgueo y progresiones con acompañamiento.

**Además:** cifrado latino (Do Re Mi) o americano (C D E) en toda la web con un clic, modo para zurdos, tema claro y oscuro, diseño adaptado a móvil, navegación con teclado y progreso guardado en el navegador. El sonido se sintetiza en el propio navegador (cuerda pulsada Karplus-Strong), sin archivos de audio.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `fretto`) y sube el contenido de esta carpeta a la raíz:

   ```bash
   cd fretto
   git init
   git add .
   git commit -m "Fretto: teoría musical para guitarra"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/fretto.git
   git push -u origin main
   ```

2. En el repositorio, ve a **Settings → Pages**.
3. En **Build and deployment**, elige **Source: Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guarda.
4. En uno o dos minutos la web estará en `https://TU_USUARIO.github.io/fretto/`.

No hace falta configurar nada más: las rutas son relativas y la navegación usa `#/`, así que funciona en cualquier subcarpeta y al recargar cualquier página. El archivo `.nojekyll` evita que GitHub procese la web con Jekyll.

## Probar en local

Puedes abrir `index.html` directamente, pero es mejor usar un servidor local, que es como funcionará en GitHub Pages:

```bash
cd fretto
python3 -m http.server 8000
# abre http://localhost:8000
```

El afinador necesita `https` o `localhost` para pedir permiso al micrófono; en GitHub Pages funciona directamente.

## Estructura

```
index.html                 Estructura de la página y carga de scripts
manifest.webmanifest       Datos para instalar la web en el móvil
404.html                   Redirección a la portada
assets/
  css/main.css             Todo el diseño (tokens de color, claro/oscuro, responsive)
  fonts/                   Bricolage Grotesque, Source Serif 4 y Noto Music (licencia OFL)
  img/                     Iconos
  js/
    theory.js              Motor de teoría: notas, intervalos, escalas, acordes, tonalidades, digitaciones
    audio.js               Síntesis de guitarra, metrónomo y planificador de reproducción
    fretboard.js           Diapasón y diagramas de acordes
    notation.js            Partitura y tablatura
    widgets.js             Widgets que usan las lecciones
    tools.js               Herramientas de práctica
    glossary.js            Glosario
    app.js                 Navegación, rutas, ajustes, progreso y páginas
    lessons/n1.js … n4.js  El temario, un archivo por nivel
```

## Editar o añadir lecciones

Cada lección es un objeto dentro de `assets/js/lessons/nX.js`:

```js
{
  id: 'mi-leccion', title: 'Título', time: '15 min',
  desc: 'Una línea para el índice.',
  lead: 'Entradilla.',
  goals: ['Objetivo 1', 'Objetivo 2'],
  body: () => `<h2>Sección</h2><p>Texto con notas: {C}, {F#}, acordes: {Am7}, {G/B}.</p>
    ${W.fretboard({ frets: [0, 12], show: { root: 'A', scale: 'pentMinor' }, label: 'interval' })}
    ${W.score({ notes: 'q:6/0 q:6/3 h:5/2 | w:C4', mode: 'full', bpm: 80 })}`,
  practice: ['Ejercicio 1', 'Ejercicio 2'],
  quiz: [{ q: 'Pregunta', o: ['A', 'B', 'C'], a: 1, why: 'Explicación' }],
}
```

- Entre llaves, una nota (`{C}`, `{Bb}`) o un acorde (`{Am7}`, `{C7}`, `{D/F#}`) se muestra en el cifrado que elija el lector. Para una nota con número de octava usa guion bajo: `{A_4}`.
- **Partituras** (`W.score`): tokens separados por espacios y `|` como barra de compás. Duración `w h q e s` (redonda a semicorchea), `.` puntillo, `t` tresillo. Notas por cuerda y traste (`6/3`) o por nombre escrito (`E4`); acordes con `+` (`6/0+5/2`); técnicas `h p s b v`; ligadura `~`; cifrado encima con `@Am`. En modo ritmo: `D` abajo, `U` arriba, `x` golpe apagado.
- **Otros widgets:** `chords`, `progression`, `strum`, `scale`, `chordbuilder`, `intervals`, `degrees`, `cof`, `caged`, `triads`, `modes`, `positions`, `chordtones`, `listen`, `staffnotes`, `trainer` (incrusta una herramienta). Las lecciones existentes tienen ejemplos de todos.

## Créditos

Tipografías Bricolage Grotesque, Source Serif 4 y Noto Music, con licencia SIL Open Font License (ver `assets/fonts/`).
