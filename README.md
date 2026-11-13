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
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Licencia](https://img.shields.io/badge/licencia-todos%20los%20derechos%20reservados-ff3d6e?style=for-the-badge)

</div>

---

## Sobre el proyecto

Repositorio de Vispo & Co. con dos aplicaciones:

- **Web pública:** presenta los servicios, enseña proyectos con demos que se pueden usar y recoge solicitudes de contacto con reserva de reunión sin salir de la página.
- **Vispo HQ:** panel interno con CRM, agenda, objetivos, calculadora de precios, presupuestos en PDF y Harvey, un asistente con IA que trabaja sobre los datos del panel.

Está hecho a mano, sin frameworks: HTML, CSS y JavaScript modernos. Cada aplicación se publica como un único archivo HTML autocontenido. Node solo se usa para generarlo.

## Características

| | |
|---|---|
| **Contacto sin precios** | La web no publica tarifas: el cliente cuenta lo que necesita y reserva una reunión. Cada solicitud lleva una referencia y las correcciones se envían como nuevas versiones. |
| **Reservas integradas** | Calendario propio sobre la API de Cal.com: horas libres, reserva y cambio de hora sin salir de la web. Si la API no responde, carga el calendario oficial de Cal.com. |
| **Proyectos con demo** | Cada proyecto abre una versión que se puede usar: web de hotel con shader WebGL, tienda con carrito, app de reservas y recepcionista con IA. |
| **Panel completo** | KPIs con comparativas, filtros, embudo, objetivos mensuales, recordatorios con repetición, exportación CSV y presupuestos formales en PDF. |
| **Calculadora interna** | Precios de partida por servicio, cuota mensual, descuento por pack y plazo; crea el presupuesto con todas las líneas en un clic. |
| **Un panel, dos accesos** | El mismo panel en `/admin` (con login) y en Claude (con Harvey), sobre una única base de datos en Supabase: lo que cambias en uno aparece en el otro. |
| **CRM automático** | Cada solicitud de la web y cada reunión reservada entran solas en Clientes y Agenda. |
| **Asistente con IA** | Harvey consulta y modifica los datos del panel: clientes, tareas, objetivos y presupuestos. |
| **Adaptable** | Diseñado desde 320 px hasta pantallas grandes; las demos usan container queries. |
| **Accesible** | Navegación por teclado, foco visible y respeto de `prefers-reduced-motion`. |
| **Build estricto** | Un token sin resolver o un include que falte rompe el build. Test E2E del flujo de presupuesto y reserva. |

## Tecnologías

- **Frontend:** HTML5, CSS moderno (variables, container queries, `cqw`) y JavaScript sin dependencias.
- **Gráficos:** Three.js para la escena 3D de la portada y WebGL para el shader de la ría.
- **Servicios:** Netlify Forms (solicitudes por correo) y API v2 de Cal.com (disponibilidad y reservas).
- **Datos:** Supabase (Postgres con RLS, autenticación y tiempo real). En Claude, el panel accede con el conector de Supabase.
- **Panel:** asistente de los artifacts de Claude; pdf-lib para los PDF.
- **Herramientas:** Node 20+ para el build, el servidor local y los tests con Playwright.

## Empezar

```bash
git clone https://github.com/itscarlosvg/vispoandco.git
cd vispoandco
npm run dev        # http://localhost:4173 · panel en /hq/
```

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera `dist/` con la web, `/admin` y el panel para Claude. |
| `npm run build:web` | Genera solo la web: sitio, zip para Netlify y versión de un solo archivo. |
| `npm run build:hq` | Genera solo el panel. |
| `npm run dev` | Genera `dist/` y lo sirve en http://localhost:4173 |
| `npm test` | Genera la web y prueba el flujo solicitud → reserva → cambio de hora → corrección. |

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
│       │   ├── contact/       Formulario de contacto, envío a Netlify y calendario de reservas
│       │   └── work/          Proyectos: tarjetas, diálogo y demos de cada caso
│       └── assets/            Audio y transcripción de la llamada de ejemplo
└── hq/
    └── src/
        ├── index.html
        ├── partials/          layout/, views/, dialogs/
        ├── styles/            base, layout/, components/, views/
        ├── scripts/
        │   ├── core/          Configuración, datos (store: Supabase), navegación y avisos
        │   ├── analytics/     Periodos, métricas y objetivos
        │   ├── data/          Escrituras, tareas y exportación CSV
        │   └── views/         Resumen, clientes, agenda, objetivos e importación
        └── features/
            ├── calculator/    Calculadora de precios que genera presupuestos
            ├── quotes/        Catálogo, editor, datos de empresa y PDF
            └── harvey/        Instrucciones, herramientas y chat del asistente
packages/
└── brand/                     Logo, iconos e ilustraciones como SVG
config/                        Proyecto y claves públicas de Supabase
scripts/                       Build, servidor local y composición
tests/e2e/                     Flujo de contacto y reserva
docs/                          Arquitectura y marca
```

### Includes y tokens

En cualquier archivo de `src/`:

- `<!-- @include ruta -->`, `/* @include ruta */` o `// @include ruta` inserta otro archivo (pueden anidarse).
- `{{TOKEN}}` se sustituye en el build por contenido generado: logo, iconos, ilustraciones, audio o datos.

Más detalle en [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Contacto y reserva

1. El cliente elige qué necesita, su tipo de negocio y sus datos; la solicitud llega por **Netlify Forms** con referencia (`P-XXXXXX`) y versión.
2. En el dominio propio aparece el calendario: pide a la **API de Cal.com** las horas libres del evento `vispoandco-lszwyh/meetings`.
3. La reserva se crea con la solicitud en las notas, y Cal.com la añade al calendario y envía la confirmación.
4. Desde la misma pantalla se puede cambiar la hora (reprogramación de la misma reserva) o corregir los datos sin duplicar la reunión.
5. El precio se prepara en la reunión con la calculadora del panel, que genera el presupuesto en PDF.

## Datos y acceso al panel

- Todo el panel vive en la tabla `docs` de Supabase (colección, id y datos JSON), protegida con RLS: solo los usuarios de `admins` pueden leer o escribir.
- La web solo puede llamar a `web_lead`, que crea o actualiza el cliente de una solicitud por su referencia.
- `/admin` usa la sesión de Supabase y recibe los cambios en tiempo real; el panel de Claude lee y escribe con el conector de Supabase.

## Publicar en Netlify

**Con Git (activo):** cada push a `main` publica la web y `/admin`. `netlify.toml` define el build (`npm run build:web`) y la carpeta publicada (`dist/web/site`).

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
