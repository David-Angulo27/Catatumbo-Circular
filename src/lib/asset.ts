/**
 * Ruta pública de un archivo de `public/`, relativa a la base del sitio.
 * En Vite, `import.meta.env.BASE_URL` es './' (ver vite.config.ts). En Node (script `npm run verify`)
 * `import.meta.env` no existe, así que se usa '/' como respaldo.
 */
const base: string = import.meta.env?.BASE_URL ?? '/';

export const asset = (path: string) => `${base}${path.replace(/^\//, '')}`;
