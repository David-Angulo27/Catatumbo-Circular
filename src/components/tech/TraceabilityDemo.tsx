import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ClipboardPlus, Scale, Boxes, Droplet, HandCoins, ArrowRightCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { BarList } from '../charts/Charts';
import StageBadge from '../ui/StageBadge';
import { biomasses, type BiomassId } from '../../data/pilot';
import { seriesColors } from '../../data/charts';
import { formatCOP, formatNumber } from '../../lib/format';
import {
  centers,
  estimatePayment,
  getTraceabilityRepository,
  processingStatuses,
  type BiomassLot,
  type NewLotInput,
} from '../../services/traceability';

const repo = getTraceabilityRepository();
const biomassName = (id: BiomassId) => biomasses.find((b) => b.id === id)?.short ?? id;
const today = () => new Date().toISOString().slice(0, 10);

type FormState = { producerCode: string; biomass: BiomassId; weightKg: string; moisturePct: string; receivedAt: string; center: string };
const emptyForm = (): FormState => ({ producerCode: '', biomass: 'cacao', weightKg: '', moisturePct: '', receivedAt: today(), center: centers[0] });

function validate(f: FormState): string | null {
  if (!/^[A-Za-z0-9-]{3,20}$/.test(f.producerCode.trim())) return 'El código de productor debe tener de 3 a 20 letras, números o guiones (no use nombres).';
  const w = Number(f.weightKg);
  if (!(w > 0 && w <= 5000)) return 'El peso debe estar entre 1 y 5.000 kg.';
  const m = Number(f.moisturePct);
  if (f.moisturePct === '' || !(m >= 0 && m <= 100)) return 'La humedad debe estar entre 0 y 100 %.';
  if (!f.receivedAt) return 'Indique la fecha de recepción.';
  return null;
}

const statusTone: Record<string, string> = {
  Recibido: 'bg-sand-100 text-earth-700',
  'En secado': 'bg-amber-50 text-amber-800',
  Triturado: 'bg-sky-50 text-sky-800',
  'En fabricación': 'bg-violet-50 text-violet-800',
  'Lote final': 'bg-emerald-50 text-emerald-800',
};

export default function TraceabilityDemo() {
  const [lots, setLots] = useState<BiomassLot[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [filter, setFilter] = useState<BiomassId | 'todas'>('todas');

  const refresh = () => repo.list().then(setLots);
  useEffect(() => {
    refresh();
  }, []);

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const preview = Number(form.weightKg) > 0 ? estimatePayment(form.biomass, Number(form.weightKg)) : 0;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validate(form);
    setError(err);
    setSaved(null);
    if (err) return;
    const input: NewLotInput = {
      producerCode: form.producerCode.trim().toUpperCase(),
      biomass: form.biomass,
      weightKg: Number(form.weightKg),
      moisturePct: Number(form.moisturePct),
      receivedAt: form.receivedAt,
      center: form.center,
    };
    const lot = await repo.create(input);
    setSaved(lot.id);
    setForm(emptyForm());
    refresh();
  };

  const act = async (fn: () => Promise<unknown>) => {
    await fn();
    refresh();
  };

  const stats = useMemo(() => {
    const received = lots.reduce((s, l) => s + l.weightKg, 0);
    const available = lots.reduce((s, l) => s + l.availableKg, 0);
    const moisture = lots.length ? lots.reduce((s, l) => s + l.moisturePct, 0) / lots.length : 0;
    const pending = lots.filter((l) => l.paymentStatus === 'Pendiente').reduce((s, l) => s + l.estimatedPayment, 0);
    const byType = biomasses.map((b, i) => ({
      label: b.short,
      value: lots.filter((l) => l.biomass === b.id).reduce((s, l) => s + l.weightKg, 0),
      color: seriesColors[i],
    }));
    return { received, available, moisture, pending, byType };
  }, [lots]);

  const visible = filter === 'todas' ? lots : lots.filter((l) => l.biomass === filter);

  return (
    <div className="overflow-hidden rounded-3xl border border-forest-800/10 bg-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-800/10 bg-forest-950 px-5 py-4 text-white sm:px-8">
        <div>
          <p className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">Módulo A</p>
          <h3 className="text-lg font-semibold">Sistema de trazabilidad de biomasa</h3>
        </div>
        <span className="rounded-full bg-white p-0.5">
          <StageBadge stage="demo" />
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* Registro de entrega */}
        <form noValidate onSubmit={onSubmit} className="border-b border-forest-800/10 bg-sand-50 p-5 sm:p-7 lg:border-r lg:border-b-0" aria-labelledby="registro-title">
          <h4 id="registro-title" className="flex items-center gap-2 font-semibold text-forest-900">
            <ClipboardPlus className="size-5 text-emerald-600" aria-hidden /> Registrar entrega de biomasa
          </h4>
          <div className="mt-5 grid gap-4">
            <label className="text-xs font-medium text-forest-900">
              Código del productor
              <input className="field mt-1" value={form.producerCode} onChange={(e) => set('producerCode', e.target.value)} placeholder="PR-DEMO-05" maxLength={20} />
              <span className="mt-1 block text-[11px] font-normal text-ink-500">Solo códigos: el sistema no almacena nombres.</span>
            </label>
            <label className="text-xs font-medium text-forest-900">
              Tipo de biomasa
              <select className="field mt-1" value={form.biomass} onChange={(e) => set('biomass', e.target.value)}>
                {biomasses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs font-medium text-forest-900">
                Peso recibido (kg)
                <input className="field mt-1" type="number" min={1} max={5000} inputMode="decimal" value={form.weightKg} onChange={(e) => set('weightKg', e.target.value)} />
              </label>
              <label className="text-xs font-medium text-forest-900">
                Humedad (%)
                <input className="field mt-1" type="number" min={0} max={100} inputMode="decimal" value={form.moisturePct} onChange={(e) => set('moisturePct', e.target.value)} />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs font-medium text-forest-900">
                Fecha de recepción
                <input className="field mt-1" type="date" value={form.receivedAt} onChange={(e) => set('receivedAt', e.target.value)} />
              </label>
              <label className="text-xs font-medium text-forest-900">
                Centro
                <select className="field mt-1" value={form.center} onChange={(e) => set('center', e.target.value)}>
                  {centers.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-white p-3 text-sm text-ink-700">
            Valor estimado a pagar: <strong className="text-forest-900 tabular-nums">{formatCOP(preview)}</strong>
            <span className="block text-[11px] text-ink-500">Peso × precio interno de referencia (por acordar).</span>
          </p>
          <button type="submit" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-700">
            <ClipboardPlus className="size-4" aria-hidden /> Registrar lote de prueba
          </button>
          <div aria-live="polite">
            {error && (
              <p className="mt-3 flex gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-800">
                <AlertCircle className="size-4 shrink-0" aria-hidden /> {error}
              </p>
            )}
            {saved && (
              <p className="mt-3 flex gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800">
                <CheckCircle2 className="size-4 shrink-0" aria-hidden /> Lote {saved} registrado en la demostración (no se guarda en ningún servidor).
              </p>
            )}
          </div>
        </form>

        {/* Vista administrativa */}
        <div className="min-w-0 p-5 sm:p-7">
          <h4 className="font-semibold text-forest-900">Vista administrativa</h4>
          <ul className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[
              { Icon: Scale, label: 'Biomasa recibida', value: `${formatNumber(stats.received)} kg` },
              { Icon: Boxes, label: 'Inventario disponible', value: `${formatNumber(stats.available)} kg` },
              { Icon: Droplet, label: 'Humedad promedio', value: `${stats.moisture.toFixed(1).replace('.', ',')} %` },
              { Icon: HandCoins, label: 'Pagos pendientes', value: formatCOP(stats.pending) },
            ].map(({ Icon, label, value }) => (
              <li key={label} className="rounded-2xl border border-forest-800/10 p-3.5">
                <Icon className="size-4 text-emerald-600" aria-hidden />
                <p className="mt-2 font-display text-lg font-bold text-forest-900 tabular-nums">{value}</p>
                <p className="text-[11px] text-ink-500">{label}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-forest-800/10 p-4">
            <p className="text-sm font-semibold text-forest-900">Kilogramos recibidos por tipo de biomasa</p>
            <div className="mt-4">
              <BarList data={stats.byType} format={(n) => `${formatNumber(n)} kg`} ariaLabel="Kilogramos recibidos por tipo de biomasa (demostración)" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-forest-900">Lotes registrados</p>
            <label className="flex items-center gap-2 text-xs text-ink-500">
              Filtrar
              <select className="field w-auto py-1.5" value={filter} onChange={(e) => setFilter(e.target.value as BiomassId | 'todas')}>
                <option value="todas">Todas las biomasas</option>
                {biomasses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.short}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-forest-800/10">
            <table className="w-full min-w-[960px] text-left text-xs">
              <caption className="sr-only">Lotes de biomasa registrados en la demostración</caption>
              <thead className="bg-sand-50 text-ink-500">
                <tr>
                  {['Lote', 'Productor', 'Biomasa', 'Peso', 'Humedad', 'Recepción', 'Centro', 'Estado', 'Inventario', 'Valor estimado', 'Pago', 'Lote final', 'Acciones'].map((h) => (
                    <th key={h} scope="col" className="px-3 py-2.5 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((l) => {
                  const last = l.status === processingStatuses[processingStatuses.length - 1];
                  return (
                    <tr key={l.id} className="border-t border-forest-800/5 text-ink-700">
                      <td className="px-3 py-2.5 font-mono whitespace-nowrap text-forest-900">{l.id}</td>
                      <td className="px-3 py-2.5 font-mono whitespace-nowrap">{l.producerCode}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap">{biomassName(l.biomass)}</td>
                      <td className="px-3 py-2.5 tabular-nums">{formatNumber(l.weightKg)} kg</td>
                      <td className="px-3 py-2.5 tabular-nums">{l.moisturePct} %</td>
                      <td className="px-3 py-2.5 whitespace-nowrap tabular-nums">{l.receivedAt}</td>
                      <td className="px-3 py-2.5 whitespace-nowrap">{l.center}</td>
                      <td className="px-3 py-2.5">
                        <span className={`rounded-full px-2 py-0.5 font-semibold whitespace-nowrap ${statusTone[l.status]}`}>{l.status}</span>
                      </td>
                      <td className="px-3 py-2.5 tabular-nums">{formatNumber(l.availableKg)} kg</td>
                      <td className="px-3 py-2.5 tabular-nums">{formatCOP(l.estimatedPayment)}</td>
                      <td className="px-3 py-2.5">
                        <span className={`font-semibold ${l.paymentStatus === 'Pagado' ? 'text-emerald-700' : 'text-amber-700'}`}>{l.paymentStatus}</span>
                      </td>
                      <td className="px-3 py-2.5 font-mono whitespace-nowrap">{l.finalLotId ?? '—'}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            disabled={last}
                            onClick={() => act(() => repo.advanceStatus(l.id))}
                            className="inline-flex items-center gap-1 rounded-full border border-forest-800/15 px-2.5 py-1 font-semibold whitespace-nowrap text-forest-800 transition hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Avanzar estado del lote ${l.id}`}
                          >
                            <ArrowRightCircle className="size-3.5" aria-hidden /> Avanzar
                          </button>
                          <button
                            type="button"
                            disabled={l.paymentStatus === 'Pagado'}
                            onClick={() => act(() => repo.markPaid(l.id))}
                            className="inline-flex items-center gap-1 rounded-full border border-forest-800/15 px-2.5 py-1 font-semibold whitespace-nowrap text-forest-800 transition hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Marcar como pagado el lote ${l.id}`}
                          >
                            <HandCoins className="size-3.5" aria-hidden /> Pagado
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={13} className="px-3 py-6 text-center text-ink-500">
                      No hay lotes para este filtro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-ink-500">
            Datos ficticios de demostración. Los cambios se pierden al recargar la página y no se envían a ningún servidor.
          </p>
        </div>
      </div>
    </div>
  );
}
