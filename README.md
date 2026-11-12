<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/brand/logo-night.svg">
  <img src="docs/brand/logo-day.svg" alt="Vispo & Co." width="300">
</picture>

### Web y panel interno de Vispo & Co.

Webs, apps multiplataforma, vídeo y automatización con IA para negocios.

[![Sitio](https://img.shields.io/badge/sitio-vispoandco.netlify.app-E8336F?style=for-the-badge)](https://vispoandco.netlify.app)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-663399?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Licencia](https://img.shields.io/badge/licencia-todos%20los%20derechos%20reservados-ff3d6e?style=for-the-badge)

</div>

---

## Sobre el proyecto

Repositorio de Vispo & Co. con dos aplicaciones:

- **Web pública:** presenta los servicios, enseña proyectos con demos que se pueden usar, calcula un presupuesto orientativo al momento y deja reservar la reunión sin salir de la página.
- **Vispo HQ:** panel interno con CRM, agenda, objetivos, presupuestos en PDF y Harvey, un asistente con IA que trabaja sobre los datos del panel.

Está hecho a mano, sin frameworks: HTML, CSS y JavaScript modernos. Cada aplicación se publica como un único archivo HTML autocontenido. Node solo se usa para generarlo.

## Características

| | |
|---|---|
| **Calculadora de presupuesto** | Siete pasos con precios «desde», cuota mensual y plazo en directo. Cada solicitud lleva una referencia y las correcciones se envían como nuevas versiones. |
| **Reservas integradas** | Calendario propio sobre la API de Cal.com: horas libres, reserva y cambio de hora sin salir de la web. Si la API no responde, carga el calendario oficial de Cal.com. |
| **Proyectos con demo** | Cada proyecto abre una versión que se puede usar: web de hotel con shader WebGL, tienda con carrito, app de reservas y recepcionista con IA. |
| **Panel completo** | KPIs con comparativas, filtros, embudo, objetivos mensuales, recordatorios con repetición, exportación CSV y presupuestos formales en PDF. |
| **Asistente con IA** | Harvey consulta y modifica los datos del panel: clientes, tareas, objetivos y presupuestos. |
| **Adaptable** | Diseñado desde 320 px hasta pantallas grandes; las demos usan container queries. |
| **Accesible** | Navegación por teclado, foco visible y respeto de `prefers-reduced-motion`. |
| **Build estricto** | Un token sin resolver o un include que falte rompe el build. Test E2E del flujo de presupuesto y reserva. |

## Tecnologías

- **Frontend:** HTML5, CSS moderno (variables, container queries, `cqw`) y JavaScript sin dependencias.
- **Gráficos:** Three.js para la escena 3D de la portada y WebGL para el shader de la ría.
- **Servicios:** Netlify Forms (solicitudes por correo) y API v2 de Cal.com (disponibilidad y reservas).
- **Panel:** base de datos y asistente de los artifacts de Claude; pdf-lib para los PDF.
- **Herramientas:** Node 20+ para el build, el servidor local y los tests con Playwright.

## Empezar

```bash
git clone https://github.com/itscarlosvg/vispoandco.git
cd vispoandco
npm run dev        # http://localhost:4173 · panel en /hq/
```

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera `dist/` con la web y el panel. |
| `npm run build:web` | Genera solo la web: sitio, zip para Netlify y versión de un solo archivo. |
| `npm run build:hq` | Genera solo el panel. |
| `npm run dev` | Genera `dist/` y lo sirve en http://localhost:4173 |
| `npm test` | Genera la web y prueba el flujo presupuesto → reserva → cambio de hora → corrección. |

## Estructura

```
apps/
├── web/
│   ├── public/                Se copia tal cual a la raíz del sitio
│   └── src/
│       ├── index.html         Documento raíz: orden de secciones, estilos y scripts
│       ├── document.html      Envoltorio HTML completo para Netlify
│       ├── partials/          Fragmentos HTML: layout/, sections/, forms/, dialogs/
│       ├── styles/
│       │   ├── main.css       Orden de carga; el build lo combina
│       │   ├── base.css       Variables, reinicio y tipografía
│       │   ├── layout/        Navegación y pie
│       │   ├── components/    Cabeceras, formularios, cursor
│       │   ├── sections/      Un archivo por sección de la portada
│       │   └── demos/         Demos de la sección de servicios
│       ├── scripts/
│       │   ├── main.js        Punto de entrada: orden de los módulos
│       │   ├── ui/            Menú, cursor, HUD, inclinación, avisos legales
│       │   ├── demos/         Demos de web, app, vídeo, IA y llamada
│       │   └── hero-3d.js     Escena 3D de la portada
│       ├── features/
│       │   ├── quote/         Calculadora, envío a Netlify y calendario de reservas
│       │   └── work/          Proyectos: tarjetas, diálogo y demos de cada caso
│       └── assets/            Audio y transcripción de la llamada de ejemplo
└── hq/
    └── src/
        ├── index.html
        ├── partials/          layout/, views/, dialogs/
        ├── styles/            base, layout/, components/, views/
        ├── scripts/
        │   ├── core/          Configuración, navegación y avisos
        │   ├── analytics/     Periodos, métricas y objetivos
        │   ├── data/          Escrituras, tareas y exportación CSV
        │   └── views/         Resumen, clientes, agenda, objetivos e importación
        └── features/
            ├── quotes/        Catálogo, editor, datos de empresa y PDF
            └── harvey/        Instrucciones, herramientas y chat del asistente
packages/
└── brand/                     Logo, iconos e ilustraciones como SVG
scripts/                       Build, servidor local y composición
tests/e2e/                     Flujo de presupuesto y reserva
docs/                          Arquitectura y marca
```

### Includes y tokens

En cualquier archivo de `src/`:

- `<!-- @include ruta -->`, `/* @include ruta */` o `// @include ruta` inserta otro archivo (pueden anidarse).
- `{{TOKEN}}` se sustituye en el build por contenido generado: logo, iconos, ilustraciones, audio o datos.

Más detalle en [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Presupuesto y reserva

1. La calculadora guarda las elecciones, calcula el precio y, al enviar, manda la solicitud a **Netlify Forms** con referencia (`P-XXXXXX`) y versión.
2. En el dominio propio aparece el calendario: pide a la **API de Cal.com** las horas libres del evento `vispoandco-lszwyh/meetings`.
3. La reserva se crea con los datos y el resumen del presupuesto en las notas, y Cal.com la añade al calendario y envía la confirmación.
4. Desde la misma pantalla se puede cambiar la hora (reprogramación de la misma reserva) o corregir los datos sin duplicar la reunión.

## Publicar en Netlify

**Con Git (recomendado):** conecta el repositorio en Netlify. `netlify.toml` ya define el build (`npm run build:web`) y la carpeta publicada (`dist/web/site`).

**Sin Git:**

1. `npm run build:web`
2. En Netlify, entra en **Deploys** y arrastra `dist/web/vispoandco-netlify.zip`.
3. En **Forms → Submission notifications**, activa el aviso por correo del formulario `presupuesto`.

El panel y la vista previa de la web se publican como artifacts de Claude desde `dist/`.

## Autor

**Carlos Vispo** · Vispo & Co. · [@itscarlosvg](https://github.com/itscarlosvg)

## Licencia

Copyright © 2026 Carlos Adolfo Vispo González. Todos los derechos reservados. Consulta [LICENSE](LICENSE).

Los proyectos de concepto (Atelier Nube, Pulso Gym, Clínica Sonríe) son ficticios. Hotel O Castro es un proyecto real y su marca pertenece a su titular.
