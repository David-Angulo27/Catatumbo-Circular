/**
 * Fotografías de referencia del proyecto (carpeta `public/img/`).
 * Originales en "imagenes proyecto", convertidas a WebP y redimensionadas para la web.
 * Son imágenes ilustrativas del territorio y del contexto; los derechos pertenecen a sus autores.
 */
export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}.webp`;

export const photos = {
  tibuPaisaje: {
    src: img('tibu-paisaje'),
    alt: 'Vista aérea del casco urbano de Tibú rodeado de vegetación',
    width: 1920,
    height: 1080,
    caption: 'Tibú, Norte de Santander',
  },
  tibuVia: {
    src: img('tibu-paisaje-2'),
    alt: 'Camiones cargados de fruto agrícola transitando por una vía rural arbolada del Catatumbo',
    width: 980,
    height: 653,
    caption: 'Vías rurales del Catatumbo: por aquí se movería la biomasa hacia los centros de acopio.',
  },
  alcaldia: {
    src: img('alcaldia-tibu'),
    alt: 'Edificio de la Alcaldía Municipal de Tibú',
    width: 980,
    height: 551,
    caption: 'Alcaldía de Tibú. Referencia del territorio; no implica aval institucional al proyecto.',
  },
  derrameValvula: {
    src: img('derrame-crudo-1'),
    alt: 'Tubería con válvula y crudo derramado sobre el suelo y la vegetación',
    width: 992,
    height: 660,
    caption: 'Crudo derramado desde una tubería sobre suelo y vegetación.',
  },
  derrameTrabajador: {
    src: img('derrame-crudo-2'),
    alt: 'Persona con traje de protección caminando sobre un terreno cubierto de crudo',
    width: 992,
    height: 661,
    caption: 'Labores de limpieza en terreno cubierto de hidrocarburo.',
  },
  derrameRio: {
    src: img('derrame-crudo-3'),
    alt: 'Vista aérea de una mancha de crudo en un río entre zonas verdes y viviendas rurales',
    width: 500,
    height: 300,
    caption: 'Mancha de crudo en un río cercano a viviendas rurales.',
  },
  derrameBarreras: {
    src: img('derrame-crudo-4'),
    alt: 'Operarios junto a barreras de contención flotantes instaladas sobre un río con crudo',
    width: 768,
    height: 432,
    caption: 'Barreras de contención en un río: el tipo de aplicación que exploran los BioBooms.',
  },
  cacao: {
    src: img('cascara-cacao'),
    alt: 'Cáscara de cacao triturada en un recipiente de madera',
    width: 900,
    height: 900,
  },
  fibraPlatano: {
    src: img('fibra-platano'),
    alt: 'Manojo de fibra seca de plátano',
    width: 894,
    height: 446,
  },
  bagazoYuca: {
    src: img('bagazo-yuca'),
    alt: 'Bagazo de yuca húmedo y desmenuzado',
    width: 670,
    height: 446,
  },
  granuladoTurba: {
    src: img('granulado-1'),
    alt: 'Saco de absorbente comercial de turba para hidrocarburos',
    width: 424,
    height: 500,
    caption: 'Absorbente orgánico comercial a base de turba.',
  },
  granuladoFibra: {
    src: img('granulado-2'),
    alt: 'Saco de absorbente comercial granulado de fibra vegetal con muestra del material',
    width: 900,
    height: 900,
    caption: 'Absorbente granulado comercial de fibra vegetal.',
  },
} satisfies Record<string, Photo>;
