# Vispo & Co.

Monorepo con la web pública y el dashboard interno.

| App | Qué es | Salida |
|---|---|---|
| `apps/web` | Web pública: servicios, proyectos, calculadora de presupuesto y reservas (Cal.com) | `dist/web/site/` (Netlify) · `dist/web/artifact.html` (Claude) |
| `apps/hq` | Vispo HQ: CRM, agenda, objetivos, presupuestos en PDF y asistente Harvey | `dist/hq/index.html` (Claude) |

## Uso

```bash
npm run build        # web + hq
npm run build:web
npm run build:hq
npm test             # build + test E2E del flujo de presupuesto y reserva
```

Requisitos: Node 20+, `zip`. Sin dependencias en producción.

## Licencia

© 2026 Carlos Adolfo Vispo González — Vispo & Co. Todos los derechos reservados. Ver [LICENSE](LICENSE).

## Cómo se compone

Cada app se publica como un único HTML autocontenido. El código fuente está dividido por responsabilidad y `scripts/build.mjs` lo une:

- `<!-- @include ruta -->`, `/* @include ruta */`, `// @include ruta` → inserta el archivo (rutas relativas a `src/`).
- `{{TOKEN}}` → valores generados (logo, iconos, ilustraciones, audio, datos). Un token sin resolver rompe el build.

Más detalle en [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Despliegue

- **Web:** `netlify.toml` construye y publica `dist/web/site`. Sin Git: arrastrar `dist/web/vispoandco-netlify.zip` a *Deploys*.
- **HQ y vista previa de la web:** se publican como artifacts de Claude desde `dist/`.

## Servicios externos

- **Netlify Forms** — formulario `presupuesto` (email por solicitud, con referencia y versión).
- **Cal.com API v2** — evento `vispoandco-lszwyh/meetings`: horas libres, reserva y cambio de hora desde la web.
