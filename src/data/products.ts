export type ProductId = 'biopads' | 'biobooms' | 'biogranulado' | 'biocompost';
export type ProductLine = 'bioabsorbente' | 'compost';

export interface Product {
  id: ProductId;
  name: string;
  short: string;
  line: ProductLine;
  description: string;
  feedstock: string[];
  application: string;
  /** Aplicaciones comerciales potenciales (filtros del marketplace). */
  uses: string[];
  stage: string;
  stageDetail: string;
  /** Presentaciones propuestas para cotizar (formato por definir tras la validación). */
  presentations: string[];
  nextSteps: string[];
}

export const productUses = [
  'Mantenimiento preventivo',
  'Control y contención de hidrocarburos',
  'Kits de respuesta',
  'Aplicaciones industriales compatibles',
  'Recuperación de suelos (investigación)',
] as const;

export const products: Product[] = [
  {
    id: 'biopads',
    name: 'BioPads',
    short: 'Almohadillas absorbentes',
    line: 'bioabsorbente',
    description: 'Almohadillas absorbentes elaboradas a partir de biomasa agrícola triturada y seca.',
    feedstock: ['Fibra y residuos de plátano', 'Vástago de plátano', 'Cáscara de cacao'],
    application: 'Captación de goteos y derrames menores en talleres, bodegas y áreas de mantenimiento, sujeta a validación.',
    uses: ['Mantenimiento preventivo', 'Kits de respuesta', 'Aplicaciones industriales compatibles'],
    stage: 'Prototipo proyectado',
    stageDetail: 'Contemplado en el lote piloto inicial de 100 unidades. Sin ensayos de desempeño todavía.',
    presentations: ['Unidad', 'Paquete', 'Kit de respuesta'],
    nextSteps: [
      'Definir formulación, gramaje y funda de las almohadillas.',
      'Ensayos de laboratorio de capacidad de absorción y retención.',
      'Definir el almacenamiento y la gestión del material después de su uso.',
    ],
  },
  {
    id: 'biobooms',
    name: 'BioBooms',
    short: 'Cordones absorbentes',
    line: 'bioabsorbente',
    description: 'Cordones absorbentes concebidos para aplicaciones de contención de hidrocarburos.',
    feedstock: ['Fibra y residuos de plátano', 'Bagazo de yuca'],
    application: 'Contención perimetral y control de dispersión en escenarios compatibles, sujeta a validación.',
    uses: ['Control y contención de hidrocarburos', 'Kits de respuesta'],
    stage: 'Prototipo proyectado',
    stageDetail: 'Contemplado en el lote piloto inicial de 100 unidades. Flotabilidad y absorción por ensayar.',
    presentations: ['Unidad', 'Paquete', 'Kit de respuesta'],
    nextSteps: [
      'Diseño de la funda, las costuras y el relleno de biomasa.',
      'Pruebas de flotabilidad, hidrofobicidad y absorción.',
      'Validación de desempeño en condiciones controladas.',
    ],
  },
  {
    id: 'biogranulado',
    name: 'BioGranulado',
    short: 'Material granulado',
    line: 'bioabsorbente',
    description: 'Material granulado para explorar aplicaciones de absorción industrial en superficies.',
    feedstock: ['Cáscara de cacao', 'Bagazo de yuca'],
    application: 'Exploración en pisos industriales y bodegas, sujeta a validación técnica.',
    uses: ['Mantenimiento preventivo', 'Aplicaciones industriales compatibles'],
    stage: 'Concepto en investigación',
    stageDetail: 'No incluido en el lote piloto inicial. Requiere definir granulometría y humedad.',
    presentations: ['Saco', 'Por kilogramo'],
    nextSteps: [
      'Estandarizar tamaño de partícula y humedad.',
      'Comparar su desempeño con absorbentes de referencia en ensayos controlados.',
      'Estimar el costo de producción por kilogramo.',
    ],
  },
  {
    id: 'biocompost',
    name: 'BioCompost',
    short: 'Compost enriquecido',
    line: 'compost',
    description:
      'Compost enriquecido con microorganismos nativos para estudiar su aplicación en procesos de recuperación de suelos.',
    feedstock: ['Biomasa limpia de cacao, plátano y yuca', 'Microorganismos nativos'],
    application:
      'Estudio de su potencial como complemento en recuperación de suelos. Su eficacia debe validarse con ensayos técnicos y ambientales.',
    uses: ['Recuperación de suelos (investigación)'],
    stage: 'Formulación por investigar',
    stageDetail: 'Solo usa biomasa limpia: nunca absorbentes que hayan tenido contacto con hidrocarburos.',
    presentations: ['Saco', 'Por kilogramo'],
    nextSteps: [
      'Aislamiento y caracterización de microorganismos nativos.',
      'Pruebas a escala de laboratorio y piloto.',
      'Validación técnica y ambiental con aliados académicos.',
    ],
  },
];
