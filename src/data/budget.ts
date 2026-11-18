/**
 * Presupuesto preliminar corregido de Catatumbo Circular (horizonte de 12 meses).
 * Fuente: "Presupuesto catatumbo circular – Archivo corregido" (Paso 5, presupuesto verde).
 *
 * Se usan los valores superiores de los rangos del documento (energía $1.500.000/mes,
 * servidor $150.000/mes, cilindro de gas $155.000), que dan exactamente el total de referencia.
 * Las conciliaciones pendientes están registradas en docs/CONCILIACION_PRESUPUESTO.md.
 * NO modificar partidas sin revisar ese documento.
 */

export interface BudgetLine {
  item: string;
  qty: string;
  value: number;
}

export interface BudgetGroup {
  id: string;
  name: string;
  description: string;
  lines: BudgetLine[];
}

/** Inversión inicial: equipos e infraestructura para la transformación de biomasa. */
export const investmentGroups: BudgetGroup[] = [
  {
    id: 'transformacion',
    name: 'Equipos de transformación',
    description: 'Trituración, secado, prensado, pesaje, control de humedad y confección.',
    lines: [
      { item: 'Trituradora', qty: '1', value: 8_000_000 },
      { item: 'Sistemas de secado solar híbrido', qty: '2', value: 24_000_000 },
      { item: 'Prensa', qty: '1', value: 1_151_900 },
      { item: 'Balanzas', qty: '2', value: 600_000 },
      { item: 'Kits de monitoreo de humedad (Arduino/Python)', qty: '2', value: 320_000 },
      { item: 'Recipientes y bandejas', qty: '10', value: 1_000_000 },
      { item: 'Herramientas básicas', qty: '2 kits', value: 687_800 },
      { item: 'Máquinas de coser', qty: '2', value: 2_339_800 },
    ],
  },
  {
    id: 'solar',
    name: 'Energía solar',
    description: 'Paneles, baterías e inversores para el secado. Pendiente confirmar si ya están incluidos en los secadores.',
    lines: [
      { item: 'Paneles solares fotovoltaicos', qty: '10', value: 6_500_000 },
      { item: 'Bancos de baterías solares', qty: '2', value: 10_600_000 },
      { item: 'Inversores/controladores solares', qty: '2', value: 3_600_000 },
    ],
  },
  {
    id: 'tecnologia',
    name: 'Tecnología y trazabilidad',
    description: 'Equipos para la plataforma digital y el registro de entregas en campo.',
    lines: [
      { item: 'Computadores', qty: '3', value: 7_200_000 },
      { item: 'Celulares o tabletas', qty: '5', value: 3_000_000 },
    ],
  },
  {
    id: 'lote',
    name: 'Lote piloto inicial',
    description: 'Fabricación de los primeros prototipos para validación.',
    lines: [
      { item: 'Cordones absorbentes', qty: '100 unidades', value: 3_000_000 },
      { item: 'Almohadillas absorbentes', qty: '100 unidades', value: 500_000 },
    ],
  },
  {
    id: 'seguridad',
    name: 'Seguridad laboral y suministros',
    description: 'Elementos de protección personal y suministro inicial de gas.',
    lines: [
      { item: 'Gafas', qty: '11', value: 93_500 },
      { item: 'Guantes', qty: '22 pares', value: 220_000 },
      { item: 'Botas', qty: '11 pares', value: 1_386_000 },
      { item: 'Overoles', qty: '11', value: 759_000 },
      { item: 'Cilindro de gas (compra inicial)', qty: '1', value: 155_000 },
    ],
  },
];

/** Operación durante 12 meses: personal, servicios, logística, capacitación y materiales. */
export const operationGroups: BudgetGroup[] = [
  {
    id: 'personal',
    name: 'Personal (11 cargos proyectados)',
    description: 'Técnicos, gestión ambiental, desarrollo digital, administración, ventas, logística y capacitación.',
    lines: [
      { item: 'Capacitadores (2)', qty: '12 meses', value: 61_918_896 },
      { item: 'Técnicos de operación y mantenimiento (2)', qty: '12 meses', value: 43_700_472 },
      { item: 'Personal de ventas B2B (2)', qty: '12 meses', value: 42_021_720 },
      { item: 'Personal de logística (2)', qty: '12 meses', value: 42_021_720 },
      { item: 'Ingeniero(a) de sistemas / desarrollador(a) (1)', qty: '12 meses', value: 33_491_628 },
      { item: 'Profesional ambiental (1)', qty: '12 meses', value: 32_157_300 },
      { item: 'Personal administrativo (1)', qty: '12 meses', value: 21_010_860 },
    ],
  },
  {
    id: 'servicios',
    name: 'Servicios y conectividad',
    description: 'Energía eléctrica, agua, internet y servidor en la nube.',
    lines: [
      { item: 'Energía eléctrica', qty: '12 meses', value: 18_000_000 },
      { item: 'Agua', qty: '12 meses', value: 1_800_000 },
      { item: 'Servidor en la nube', qty: '12 meses', value: 1_800_000 },
      { item: 'Internet', qty: '12 meses', value: 1_018_800 },
    ],
  },
  {
    id: 'materiales',
    name: 'Materiales e insumos',
    description: 'Compra de biomasa a productores, microorganismos, empaques, etiquetas y tapabocas.',
    lines: [
      { item: 'Biomasa a productores (18.000 kg/año)', qty: '12 meses', value: 2_340_000 },
      { item: 'Microorganismos para compost', qty: '12 meses', value: 1_800_000 },
      { item: 'Tapabocas', qty: '1.200 unidades', value: 3_840_000 },
      { item: 'Etiquetas y códigos de lote', qty: '1.200 unidades', value: 600_000 },
      { item: 'Bolsas de empaque', qty: '1.200 unidades', value: 420_000 },
    ],
  },
];

const sumLines = (g: BudgetGroup) => g.lines.reduce((s, l) => s + l.value, 0);
export const groupTotal = sumLines;

export const investmentTotal = investmentGroups.reduce((s, g) => s + sumLines(g), 0);
export const operationTotal = operationGroups.reduce((s, g) => s + sumLines(g), 0);
export const subtotal = investmentTotal + operationTotal;
export const contingencyRate = 0.05;
export const contingency = Math.round(subtotal * contingencyRate);
export const budgetTotal = subtotal + contingency;

/** Valores oficiales de referencia (deben coincidir con los calculados; ver scripts/verify-data.ts). */
export const budgetReference = {
  investment: 75_113_000,
  operation: 307_941_396,
  subtotal: 383_054_396,
  contingency: 19_152_720,
  total: 402_207_116,
} as const;

export const budgetNote =
  'Los valores corresponden a una estimación presupuestal preliminar para un horizonte de 12 meses. Están sujetos a la actualización de cotizaciones, validación de proveedores y ajustes técnicos.';
