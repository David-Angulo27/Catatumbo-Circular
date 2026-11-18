/**
 * Configuración editable del sitio.
 * Reemplace los valores vacíos con la información oficial del proyecto.
 * Los enlaces vacíos se muestran como "por configurar" y no como enlaces activos.
 */
interface SiteConfig {
  name: string;
  tagline: string;
  location: string;
  contact: { email: string; phone: string };
  social: { label: string; href: string }[];
  contactEndpoint: string;
}

export const siteConfig: SiteConfig = {
  name: 'Catatumbo Circular',
  tagline: 'Transformamos residuos agrícolas en oportunidades territoriales.',
  location: 'Tibú, Norte de Santander, Colombia',
  contact: {
    email: '', // ej. 'contacto@catatumbocircular.co'
    phone: '', // ej. '+57 300 000 0000'
  },
  social: [
    { label: 'Instagram', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'Facebook', href: '' },
    { label: 'YouTube', href: '' },
  ],
  /** Endpoint del formulario. Se define en .env como VITE_CONTACT_ENDPOINT. */
  contactEndpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? '',
};

/**
 * Navegación principal. `short` se usa en la barra de escritorio; `label` en el menú móvil y el pie.
 * `also` lista secciones que pertenecen al mismo grupo (para resaltar el enlace activo).
 */
export const navLinks: { id: string; label: string; short: string; also?: string[] }[] = [
  { id: 'inicio', label: 'Inicio', short: 'Inicio' },
  { id: 'problema', label: 'Problema y oportunidad', short: 'Problema' },
  { id: 'propuesta', label: 'Nuestra propuesta', short: 'Propuesta' },
  { id: 'productos', label: 'Productos', short: 'Productos' },
  { id: 'proceso', label: 'Proceso productivo', short: 'Proceso', also: ['comunidades'] },
  { id: 'piloto', label: 'Piloto y presupuesto', short: 'Presupuesto', also: ['presupuesto'] },
  { id: 'sostenibilidad', label: 'Sostenibilidad e impacto', short: 'Impacto', also: ['impacto', 'ciencia'] },
  { id: 'tecnologia', label: 'Tecnología', short: 'Tecnología', also: ['modelo'] },
  { id: 'equipo', label: 'Equipo', short: 'Equipo' },
  { id: 'fuentes', label: 'Fuentes', short: 'Fuentes' },
];

/** Secciones adicionales enlazadas desde el pie de página. */
export const extraLinks = [
  { id: 'comunidades', label: 'Centros comunitarios' },
  { id: 'modelo', label: 'Modelo de negocio y marketplace' },
  { id: 'participa', label: 'Participa' },
];
