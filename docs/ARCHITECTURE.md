# Arquitectura

## Estructura

```
apps/
  web/src/
    index.html            Documento raíz (orden de secciones y scripts)
    document.html         Envoltorio HTML completo para Netlify
    partials/             Marcado por zonas: layout/, sections/, forms/, dialogs/
    styles/               main.css (índice) → base, layout/, components/, sections/, demos/, responsive
    scripts/              main.js (índice) → ui/, demos/ · hero-3d.js (three.js, módulo)
    features/
      contact/            Formulario de contacto, envío a Netlify Forms y calendario propio (Cal.com)
      work/               Proyectos: tarjetas, diálogo, mini webs de demo, datos (carta)
    assets/               Audio y datos de la demo de llamada
  web/public/             Archivos estáticos (favicon)
  hq/src/
    index.html
    partials/             layout/, views/, dialogs/
    styles/               base, layout/, components/, views/, responsive
    scripts/              core/ (config, router, avisos) · analytics/ · data/ · views/
    features/
      calculator/         Calculadora de precios de partida → crea presupuestos
      quotes/             Modelo, lista, editor, empresa, PDF (pdf-lib)
      harvey/             Prompt, herramientas y chat del asistente
packages/brand/           Logo, marca, iconos e ilustraciones como SVG
scripts/                  build.mjs · serve.mjs · lib/compose.mjs
tests/e2e/                Flujo solicitud → reserva → cambio de hora → corrección
```

## Convenciones

- Una feature agrupa su HTML, CSS y JS. Lo transversal vive en `styles/` y `scripts/`.
- Los scripts de cada app comparten un único ámbito (IIFE en `scripts/main.js`); el orden de `@include` es el orden de ejecución.
- Los archivos `main.css` y `main.js` son índices: solo contienen `@include`.
- `dist/` no se versiona.

## Datos (HQ)

Colecciones del artifact: `leads`, `tareas`, `presupuestos`, `objetivos/{AAAA-MM}`, `ajustes/empresa`.
