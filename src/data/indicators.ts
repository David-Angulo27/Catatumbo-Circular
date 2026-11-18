/**
 * Indicadores de impacto y evaluación técnica.
 * Tipo de dato:
 *  - documentado: cifra tomada de un documento o fuente citada.
 *  - meta: valor proyectado o meta de diseño del proyecto (no medido).
 *  - pendiente: requiere ensayos o registros que aún no existen.
 */
export type DataKind = 'documentado' | 'meta' | 'pendiente';

export interface Indicator {
  n: number;
  name: string;
  unit: string;
  kind: DataKind;
  /** Valor de referencia disponible hoy, si existe. */
  current?: string;
  note: string;
}

export const mainIndicator = {
  name: 'Kilogramos de hidrocarburo absorbido por kilogramo de bioabsorbente utilizado',
  formula: {
    left: 'Capacidad de absorción',
    numerator: 'Masa de hidrocarburo absorbido',
    denominator: 'Masa de bioabsorbente seco utilizado',
  },
  designTarget: '4 a 7 litros de petróleo por kilogramo de fibra seca',
  designTargetNote:
    'Objetivo preliminar de diseño del proyecto. No es un resultado demostrado: se verificará con ensayos de laboratorio propios.',
};

export const indicators: Indicator[] = [
  { n: 1, name: 'Biomasa agrícola recibida al mes', unit: 'kg/mes', kind: 'meta', current: '1.500 kg/mes proyectados', note: 'Meta del piloto según el inventario de recursos.' },
  { n: 2, name: 'Humedad de la biomasa antes y después del secado', unit: '%', kind: 'meta', current: 'Meta de diseño: < 10 % después del secado', note: 'Se medirá con medidores y kits Arduino/Python.' },
  { n: 3, name: 'Capacidad de absorción de cada materia prima', unit: 'kg/kg', kind: 'pendiente', note: 'Requiere ensayos con cada residuo de Tibú.' },
  { n: 4, name: 'Prototipos fabricados', unit: 'unidades', kind: 'meta', current: 'Lote inicial: 100 cordones y 100 almohadillas', note: 'Producción piloto presupuestada, no capacidad mensual.' },
  { n: 5, name: 'Costo de producción por kilogramo de bioabsorbente', unit: 'COP/kg', kind: 'pendiente', note: 'Se calculará con registros reales de producción.' },
  { n: 6, name: 'Productores rurales vinculados', unit: 'productores', kind: 'pendiente', note: 'Depende de acuerdos y validación comunitaria.' },
  { n: 7, name: 'Jóvenes y familias capacitadas', unit: 'personas', kind: 'pendiente', note: 'Se registrará al iniciar la formación.' },
  { n: 8, name: 'Residuos aprovechados', unit: 'kg/año', kind: 'meta', current: '18.000 kg/año proyectados', note: 'Equivale a 12 meses a la escala del piloto.' },
  { n: 9, name: 'Consumo energético por kilogramo de biomasa procesada', unit: 'kWh/kg', kind: 'pendiente', note: 'Se medirá tras instalar el sistema solar.' },
  { n: 10, name: 'Trazabilidad de materiales y absorbentes después de su uso', unit: '% de lotes trazados', kind: 'pendiente', note: 'Incluye el destino de los absorbentes contaminados.' },
];
