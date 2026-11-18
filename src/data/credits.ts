import { photos } from './photos';

/**
 * Créditos de imágenes y declaración de uso de IA (sección Fuentes).
 *
 * IMPORTANTE: complete `source` de cada fotografía con el autor o sitio web de donde se obtuvo.
 * Mientras esté vacío, el sitio muestra "Fuente por confirmar".
 */
export interface ImageCredit {
  title: string;
  where: string;
  source: string;
  url?: string;
}

export const photoCredits: ImageCredit[] = [
  { title: photos.tibuPaisaje.alt, where: 'Inicio', source: '' },
  { title: photos.derrameTrabajador.alt, where: 'Problema', source: '' },
  { title: photos.derrameValvula.alt, where: 'Problema', source: '' },
  { title: photos.derrameBarreras.alt, where: 'Problema', source: '' },
  { title: photos.derrameRio.alt, where: 'Problema', source: '' },
  { title: photos.cacao.alt, where: 'Problema (oportunidad)', source: '' },
  { title: photos.fibraPlatano.alt, where: 'Problema (oportunidad)', source: '' },
  { title: photos.bagazoYuca.alt, where: 'Problema (oportunidad)', source: '' },
  { title: photos.granuladoTurba.alt, where: 'Productos', source: '' },
  { title: photos.granuladoFibra.alt, where: 'Productos', source: '' },
  { title: photos.tibuVia.alt, where: 'Comunidades', source: '' },
  { title: photos.alcaldia.alt, where: 'Comunidades', source: '' },
];

export const otherCredits: ImageCredit[] = [
  {
    title: 'Íconos de los Objetivos de Desarrollo Sostenible (versión en español)',
    where: 'Sostenibilidad',
    source: 'Naciones Unidas. Uso informativo; no implica aval.',
    url: 'https://www.un.org/sustainabledevelopment/es/news/communications-material/',
  },
  {
    title: 'Ilustraciones vectoriales (paisaje, residuos, productos, escenas del centro) y logotipo',
    where: 'Todo el sitio',
    source: 'Elaboración propia del equipo con apoyo de IA (ver declaración).',
  },
];

/** Declaración de uso de inteligencia artificial. Ajústela si el equipo usó otras herramientas. */
export const aiDeclaration = {
  tool: 'Claude (Anthropic), mediante Claude Code',
  uses: [
    'Programación y diseño del sitio web.',
    'Organización y redacción de textos a partir de los documentos elaborados por el equipo.',
    'Elaboración de las ilustraciones vectoriales y optimización de las fotografías para la web.',
  ],
  notUsed: [
    'Generar datos, cifras del presupuesto o resultados de ensayos.',
    'Crear o alterar fotografías.',
  ],
  responsibility:
    'El equipo revisó y validó el contenido. Las cifras provienen de los documentos del proyecto y de las fuentes citadas en esta sección.',
};
