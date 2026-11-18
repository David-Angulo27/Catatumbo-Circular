import { Truck, Scale, Cog, Factory, PackageCheck, type LucideIcon } from 'lucide-react';

export interface ProcessStep {
  title: string;
  short: string;
  icon: LucideIcon;
  summary: string;
  details: string[];
  equipment: string[];
  output: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Recolección de residuos agrícolas',
    short: 'Recolección',
    icon: Truck,
    summary: 'Las familias productoras separan y entregan los residuos de sus cultivos.',
    details: [
      'Cáscara de cacao, fibra y residuos de plátano, vástago de plátano y bagazo de yuca.',
      'Rutas de acopio cercanas a las veredas productoras.',
      'Orientación a productores sobre separación y manejo del residuo.',
    ],
    equipment: ['Bandejas y recipientes'],
    output: 'Biomasa agrícola en el punto de acopio',
  },
  {
    title: 'Recepción, clasificación y pesaje',
    short: 'Recepción',
    icon: Scale,
    summary: 'Cada entrega se pesa, se mide su humedad y se registra en la plataforma.',
    details: [
      'Pesaje en balanza y medición de humedad.',
      'Registro digital: productor, tipo de biomasa, peso y fecha.',
      'Cálculo del valor estimado a pagar al productor.',
    ],
    equipment: ['Balanzas', 'Medidores de humedad'],
    output: 'Lote registrado y trazable',
  },
  {
    title: 'Trituración y secado de la biomasa',
    short: 'Trituración y secado',
    icon: Cog,
    summary: 'La biomasa se reduce de tamaño y se seca con energía solar.',
    details: [
      'Trituración hasta el tamaño de fibra o partícula requerido.',
      'Secado solar híbrido con meta de diseño de humedad inferior al 10 %.',
      'Monitoreo de humedad con kits Arduino/Python (en desarrollo).',
    ],
    equipment: ['Trituradora', 'Dos sistemas de secado solar híbrido', 'Paneles fotovoltaicos', 'Baterías e inversores'],
    output: 'Materia prima seca y acondicionada',
  },
  {
    title: 'Fabricación de prototipos absorbentes y elaboración de compost',
    short: 'Fabricación',
    icon: Factory,
    summary: 'Se conforman almohadillas y cordones; la biomasa limpia sobrante va a compost.',
    details: [
      'Prensado y costura de BioPads y BioBooms.',
      'Exploración del BioGranulado por granulometría.',
      'Compost con microorganismos nativos usando solo biomasa limpia.',
    ],
    equipment: ['Prensa', 'Máquinas de coser'],
    output: 'Prototipos y lotes para validación',
  },
  {
    title: 'Control de calidad, almacenamiento y distribución',
    short: 'Calidad y distribución',
    icon: PackageCheck,
    summary: 'Los lotes se verifican, se etiquetan y se almacenan para su validación o entrega.',
    details: [
      'Control de humedad, peso y registro del código de lote.',
      'Almacenamiento separado de producto terminado y materia prima.',
      'Distribución futura a clientes B2B, sujeta a la validación técnica.',
    ],
    equipment: ['Bandejas y recipientes', 'Balanzas'],
    output: 'Lote identificado y trazable (distribución en fase futura)',
  },
];
