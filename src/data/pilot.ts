/**
 * Escala proyectada del piloto productivo.
 * Fuente: inventario de recursos y presupuesto verde corregido de Catatumbo Circular (2026).
 * Son cantidades PROYECTADAS, no capacidades demostradas.
 */
export type BiomassId = 'cacao' | 'platano-fibra' | 'platano-vastago' | 'yuca';

export interface Biomass {
  id: BiomassId;
  name: string;
  short: string;
  kgPerMonth: number;
  /** Precio interno de referencia por kg (presupuesto preliminar). */
  refPricePerKg: number;
  use: string;
}

export const biomasses: Biomass[] = [
  {
    id: 'cacao',
    name: 'Cáscara de cacao',
    short: 'Cacao',
    kgPerMonth: 450,
    refPricePerKg: 150,
    use: 'Residuo de la cosecha del grano. Se evaluará triturada y seca como relleno de almohadillas y material granulado.',
  },
  {
    id: 'platano-fibra',
    name: 'Fibra y residuos de plátano',
    short: 'Fibra de plátano',
    kgPerMonth: 450,
    refPricePerKg: 150,
    use: 'Hojas y fibras que quedan tras la cosecha. Su estructura fibrosa se estudiará para cordones y almohadillas.',
  },
  {
    id: 'platano-vastago',
    name: 'Vástago o pseudotallo de plátano',
    short: 'Vástago de plátano',
    kgPerMonth: 300,
    refPricePerKg: 100,
    use: 'Tallo que se corta después de cada racimo. Requiere secado intenso por su alto contenido de agua.',
  },
  {
    id: 'yuca',
    name: 'Bagazo de yuca',
    short: 'Bagazo de yuca',
    kgPerMonth: 300,
    refPricePerKg: 100,
    use: 'Subproducto del procesamiento de la raíz. Se explorará como material granulado y como insumo de compost.',
  },
];

export const biomassPerMonth = biomasses.reduce((s, b) => s + b.kgPerMonth, 0); // 1.500
export const biomassPerYear = biomassPerMonth * 12; // 18.000
export const biomassValuePerMonth = biomasses.reduce((s, b) => s + b.kgPerMonth * b.refPricePerKg, 0); // 195.000

/** Lote inicial presupuestado (producción piloto proyectada, no capacidad mensual). */
export const initialBatch = [
  { name: 'Cordones absorbentes (BioBooms)', units: 100 },
  { name: 'Almohadillas absorbentes (BioPads)', units: 100 },
];

/** Capacidad de diseño indicada en el inventario para cada secador (por validar). */
export const dryerDesignCapacity = '60–70 kg de biomasa seca/día por sistema';
