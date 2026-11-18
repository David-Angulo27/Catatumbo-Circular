# Catatumbo Circular — Sitio web

Sitio de presentación académica y empresarial del proyecto **Catatumbo Circular** (Tibú, Norte de Santander, Colombia),
iniciativa STEM del programa de Ingeniería de Sistemas.

Stack: React 18 + TypeScript + Vite 6 + Tailwind CSS 4 + Motion (animaciones) + Lucide (iconos). Sin backend.

## Ejecutar localmente

```bash
npm install        # solo la primera vez
npm run dev        # servidor de desarrollo → http://localhost:5173
npm run build      # verifica tipos y genera /dist
npm run preview    # sirve /dist → http://localhost:4173
npm run verify     # comprueba sumas del presupuesto, biomasa, ODS, equipo y fuentes
```

`dist/` puede publicarse en cualquier hosting estático (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Secciones (en orden)

| Ancla | Sección | Componente |
|---|---|---|
| `#inicio` | Inicio | `sections/Hero.tsx` |
| `#problema` | Problema y oportunidad | `sections/Problem.tsx` |
| `#propuesta` | Nuestra propuesta (3 líneas + diagrama) | `sections/Solution.tsx` |
| `#productos` | Productos + gestión de absorbentes usados | `sections/Products.tsx`, `UsedAbsorbents.tsx` |
| `#proceso` | Proceso productivo y equipos del centro | `sections/Process.tsx` |
| `#comunidades` | Centros comunitarios y beneficio social | `sections/Communities.tsx` |
| `#piloto` | Escala del piloto | `sections/Pilot.tsx` |
| `#presupuesto` | Presupuesto y viabilidad | `sections/Budget.tsx` |
| `#sostenibilidad` | ODS | `sections/Sustainability.tsx` |
| `#impacto` | Indicadores y panel | `sections/Impact.tsx` |
| `#ciencia` | Respaldo científico | `sections/Science.tsx` |
| `#tecnologia` | Trazabilidad (demo) | `sections/Technology.tsx`, `tech/TraceabilityDemo.tsx` |
| `#modelo` | Modelo de negocio + Marketplace B2B (demo) | `sections/BusinessModel.tsx`, `tech/Marketplace.tsx` |
| `#equipo` | Equipo | `sections/Team.tsx` |
| `#fuentes` | Fuentes (APA 7) | `sections/Sources.tsx` |
| `#participa` | Contacto | `sections/Participate.tsx` |

## Dónde editar el contenido

Todas las cifras y textos clave están en `src/data/` (una sola fuente de verdad):

- `narrative.ts`: las cinco frases base (problema, dato clave, oportunidad, solución, propuesta de valor).
- `budget.ts`: partidas del presupuesto. Los totales se **calculan**; `npm run verify` falla si no dan $402.207.116.
- `pilot.ts`: biomasa mensual, precios de referencia y lote inicial.
- `products.ts`, `process.ts`, `ods.ts`, `indicators.ts`, `team.ts`, `sources.ts`.
- `src/config/site.ts`: contacto, redes sociales y menú.
- `proposal.ts`: aporte de cada componente STEM, lienzo resumido y acciones en las tres dimensiones de sostenibilidad.
- `credits.ts`: créditos de las imágenes (**complete el campo `source` de cada foto**) y declaración de uso de IA.
- `photos.ts`: fotografías, texto alternativo y pies de foto.

Antes de cambiar el presupuesto, lea **`docs/CONCILIACION_PRESUPUESTO.md`**.

## Demostraciones y conexión futura

- **Trazabilidad**: `src/services/traceability.ts` define la interfaz `TraceabilityRepository`. Hoy usa una
  implementación en memoria con datos ficticios. Para conectar un backend, implemente la misma interfaz con `fetch`
  y devuélvala en `getTraceabilityRepository()`; los componentes no cambian.
- **Marketplace**: prepara una solicitud de cotización y la traslada al formulario de contacto. No genera pedidos.
- **Formulario de contacto**: sin `VITE_CONTACT_ENDPOINT` no envía nada y lo informa al usuario. Para conectarlo,
  copie `.env.example` a `.env` y defina el endpoint (POST JSON con `{ name, email, organization, interest, message }`).

## Criterios de contenido

- Los productos son propuestas o prototipos proyectados: sin certificaciones, ventas, clientes ni resultados de ensayo.
- Se distinguen visualmente **datos documentados**, **metas proyectadas** y **resultados experimentales pendientes**.
- 4–7 L/kg es una meta de diseño; los valores de Vera Infante et al. pertenecen a ese estudio.
- Los absorbentes usados se separan de la biomasa limpia y no van al compost.
- Los 68.802 habitantes son población municipal (contexto), no beneficiarios.
- Íconos de los ODS: versión oficial en español de Naciones Unidas, uso informativo sin aval (`public/ods/`).
- Las ilustraciones son vectoriales. Para usar fotos reales de personas se requiere autorización
  (campo `photo` en `src/data/team.ts`).
- Fotografías de referencia en `public/img/` (WebP optimizado desde la carpeta `imagenes proyecto`), registradas con
  texto alternativo y pie de foto en `src/data/photos.ts`. Se usan en Inicio, Problema, Productos y Comunidades.
  Los absorbentes comerciales que aparecen son de terceros y se muestran solo como referencia de mercado.
