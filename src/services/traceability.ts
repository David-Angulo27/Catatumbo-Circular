import { biomasses, type BiomassId } from '../data/pilot';

/**
 * Servicio de trazabilidad de biomasa.
 *
 * Hoy funciona en MODO DEMOSTRACIÓN: los datos son ficticios, viven solo en la memoria del
 * navegador y se pierden al recargar. La interfaz `TraceabilityRepository` es el punto de
 * conexión para un backend real (API REST + base de datos): basta con implementar la misma
 * interfaz con `fetch` y devolverla en `getTraceabilityRepository()`.
 *
 * Tratamiento de datos: el sistema identifica a los productores con un código, nunca con
 * nombres ni documentos (Ley 1581 de 2012 de protección de datos personales).
 */

export const processingStatuses = ['Recibido', 'En secado', 'Triturado', 'En fabricación', 'Lote final'] as const;
export type ProcessingStatus = (typeof processingStatuses)[number];
export type PaymentStatus = 'Pendiente' | 'Pagado';

export const centers = ['Centro 1 (demo)', 'Centro 2 (demo)'] as const;

export interface BiomassLot {
  id: string;
  producerCode: string;
  biomass: BiomassId;
  weightKg: number;
  moisturePct: number;
  receivedAt: string; // AAAA-MM-DD
  center: string;
  status: ProcessingStatus;
  /** Kilogramos aún disponibles en inventario (0 cuando el lote ya se transformó). */
  availableKg: number;
  estimatedPayment: number;
  paymentStatus: PaymentStatus;
  finalLotId?: string;
}

export type NewLotInput = Pick<BiomassLot, 'producerCode' | 'biomass' | 'weightKg' | 'moisturePct' | 'receivedAt' | 'center'>;

export interface TraceabilityRepository {
  readonly mode: 'demo' | 'api';
  list(): Promise<BiomassLot[]>;
  create(input: NewLotInput): Promise<BiomassLot>;
  advanceStatus(id: string): Promise<BiomassLot>;
  markPaid(id: string): Promise<BiomassLot>;
}

/** Precio interno de referencia × peso. Valor estimado, no una tarifa acordada con productores. */
export function estimatePayment(biomass: BiomassId, weightKg: number) {
  const price = biomasses.find((b) => b.id === biomass)?.refPricePerKg ?? 0;
  return Math.round(price * weightKg);
}

const prefix: Record<BiomassId, string> = { cacao: 'CAC', 'platano-fibra': 'PLF', 'platano-vastago': 'PLV', yuca: 'YUC' };

function buildLot(seq: number, input: NewLotInput, status: ProcessingStatus = 'Recibido', paid = false): BiomassLot {
  const lot: BiomassLot = {
    ...input,
    id: `DEMO-${prefix[input.biomass]}-${String(seq).padStart(3, '0')}`,
    status,
    availableKg: input.weightKg,
    estimatedPayment: estimatePayment(input.biomass, input.weightKg),
    paymentStatus: paid ? 'Pagado' : 'Pendiente',
  };
  return status === 'Lote final' ? finalize(lot) : lot;
}

function finalize(lot: BiomassLot): BiomassLot {
  return { ...lot, availableKg: 0, finalLotId: lot.finalLotId ?? `LF-${lot.id.replace('DEMO-', '')}` };
}

/** Datos ficticios de demostración. No corresponden a productores ni entregas reales. */
const seed: BiomassLot[] = [
  buildLot(1, { producerCode: 'PR-DEMO-01', biomass: 'cacao', weightKg: 120, moisturePct: 58, receivedAt: '2026-01-12', center: centers[0] }, 'Lote final', true),
  buildLot(2, { producerCode: 'PR-DEMO-02', biomass: 'platano-fibra', weightKg: 95, moisturePct: 64, receivedAt: '2026-01-13', center: centers[0] }, 'En fabricación', true),
  buildLot(3, { producerCode: 'PR-DEMO-03', biomass: 'platano-vastago', weightKg: 80, moisturePct: 88, receivedAt: '2026-01-14', center: centers[1] }, 'En secado'),
  buildLot(4, { producerCode: 'PR-DEMO-01', biomass: 'yuca', weightKg: 60, moisturePct: 61, receivedAt: '2026-01-15', center: centers[1] }, 'Triturado'),
  buildLot(5, { producerCode: 'PR-DEMO-04', biomass: 'cacao', weightKg: 110, moisturePct: 55, receivedAt: '2026-01-16', center: centers[0] }, 'Recibido'),
];

function createDemoRepository(): TraceabilityRepository {
  let lots = [...seed];
  let seq = seed.length;
  const find = (id: string) => {
    const lot = lots.find((l) => l.id === id);
    if (!lot) throw new Error(`Lote ${id} no encontrado`);
    return lot;
  };
  const replace = (next: BiomassLot) => {
    lots = lots.map((l) => (l.id === next.id ? next : l));
    return next;
  };
  return {
    mode: 'demo',
    async list() {
      return [...lots];
    },
    async create(input) {
      seq += 1;
      const lot = buildLot(seq, input);
      lots = [lot, ...lots];
      return lot;
    },
    async advanceStatus(id) {
      const lot = find(id);
      const i = processingStatuses.indexOf(lot.status);
      if (i >= processingStatuses.length - 1) return lot;
      const next: BiomassLot = { ...lot, status: processingStatuses[i + 1] };
      return replace(next.status === 'Lote final' ? finalize(next) : next);
    },
    async markPaid(id) {
      return replace({ ...find(id), paymentStatus: 'Pagado' });
    },
  };
}

let repo: TraceabilityRepository | null = null;

/** Punto único de acceso. Sustituir por una implementación `api` cuando exista backend. */
export function getTraceabilityRepository(): TraceabilityRepository {
  repo ??= createDemoRepository();
  return repo;
}
