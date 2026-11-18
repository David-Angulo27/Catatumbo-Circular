import { useState } from 'react';
import { Calculator, CheckCircle2, Loader, Flag, Gauge, Droplet, Package, Scale, Users } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge, { DataLegend, type Stage } from '../ui/StageBadge';
import { indicators, mainIndicator, type DataKind } from '../../data/indicators';
import { biomasses, biomassPerMonth } from '../../data/pilot';
import { formatNumber } from '../../lib/format';

const kindStage: Record<DataKind, Stage> = { documentado: 'documentado', meta: 'meta', pendiente: 'pendiente' };

const kpis: { Icon: typeof Gauge; label: string; value: string; kind: DataKind }[] = [
  { Icon: Scale, label: 'Biomasa a recibir', value: `${formatNumber(biomassPerMonth)} kg/mes`, kind: 'meta' },
  { Icon: Package, label: 'Prototipos del lote inicial', value: '200 unidades', kind: 'meta' },
  { Icon: Droplet, label: 'Humedad tras el secado', value: '< 10 %', kind: 'meta' },
  { Icon: Gauge, label: 'Capacidad de absorción medida', value: 'Sin datos', kind: 'pendiente' },
  { Icon: Users, label: 'Productores vinculados', value: 'Por registrar', kind: 'pendiente' },
];

const roadmap = [
  {
    Icon: CheckCircle2,
    label: 'Realizado',
    title: 'Planteamiento y diagnóstico',
    items: ['Diagnóstico con fuentes secundarias', 'Selección de residuos agrícolas', 'Presupuesto preliminar y matriz de riesgos', 'Demostración web de la plataforma'],
    tone: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  },
  {
    Icon: Loader,
    label: 'Siguiente etapa',
    title: 'Validación',
    items: ['Consulta con productores y comunidades', 'Ensayos de absorción en laboratorio', 'Cotizaciones definitivas de equipos'],
    tone: 'border-amber-500 bg-amber-50 text-amber-700',
  },
  {
    Icon: Flag,
    label: 'Objetivo futuro',
    title: 'Piloto productivo',
    items: ['Primer centro comunitario', 'Lote inicial de prototipos', 'Marketplace B2B con backend real'],
    tone: 'border-sky-500 bg-sky-50 text-sky-700',
  },
];

function AbsorptionCalculator() {
  const [hc, setHc] = useState('');
  const [abs, setAbs] = useState('');
  const h = parseFloat(hc.replace(',', '.'));
  const a = parseFloat(abs.replace(',', '.'));
  const valid = h >= 0 && a > 0;
  const result = valid ? h / a : null;
  return (
    <div className="rounded-2xl border border-forest-800/10 bg-sand-50 p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-forest-900">
        <Calculator className="size-4 text-emerald-600" aria-hidden /> Calculadora para registrar ensayos
      </p>
      <p className="mt-1 text-xs text-ink-500">
        Herramienta de cálculo: ingrese los datos de un ensayo. No muestra resultados del proyecto.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-medium text-forest-900">
          Masa de hidrocarburo absorbido (kg)
          <input className="field mt-1" inputMode="decimal" value={hc} onChange={(e) => setHc(e.target.value)} placeholder="Ej.: 0,45" />
        </label>
        <label className="text-xs font-medium text-forest-900">
          Masa de bioabsorbente seco (kg)
          <input className="field mt-1" inputMode="decimal" value={abs} onChange={(e) => setAbs(e.target.value)} placeholder="Ej.: 0,10" />
        </label>
      </div>
      <p className="mt-4 text-sm text-ink-700" aria-live="polite">
        Capacidad de absorción:{' '}
        <strong className="font-display text-lg text-forest-900">
          {result === null ? '—' : `${result.toLocaleString('es-CO', { maximumFractionDigits: 2 })} kg/kg`}
        </strong>
      </p>
    </div>
  );
}

export default function Impact() {
  return (
    <section id="impacto" className="relative overflow-hidden bg-sand-50 py-24 sm:py-32" aria-labelledby="impacto-title">
      <div className="container-page">
        <SectionHeader
          id="impacto-title"
          eyebrow="Indicadores de impacto y evaluación técnica"
          title="Así mediremos los resultados."
          description="Un indicador técnico principal y diez indicadores secundarios. Cada valor indica si es un dato documentado, una meta proyectada o un resultado experimental todavía pendiente."
        />
        <Reveal className="mt-8 flex justify-center">
          <DataLegend className="justify-center" />
        </Reveal>

        {/* Indicador principal */}
        <Reveal className="mt-12">
          <div className="card grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow">Indicador principal</span>
              <h3 className="mt-4 text-2xl font-semibold text-forest-900 sm:text-3xl">{mainIndicator.name}</h3>
              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-forest-900 p-6 text-white" role="math" aria-label={`${mainIndicator.formula.left} igual a ${mainIndicator.formula.numerator} dividida entre ${mainIndicator.formula.denominator}`}>
                <span className="font-display text-lg font-semibold text-emerald-300">{mainIndicator.formula.left}</span>
                <span className="text-2xl" aria-hidden>=</span>
                <span className="inline-flex flex-col items-center text-center text-sm sm:text-base" aria-hidden>
                  <span className="px-2 pb-1.5">{mainIndicator.formula.numerator}</span>
                  <span className="h-px w-full bg-white/70" />
                  <span className="px-2 pt-1.5">{mainIndicator.formula.denominator}</span>
                </span>
              </div>
              <div className="mt-5 rounded-2xl border border-sky-600/20 bg-sky-50 p-4">
                <StageBadge stage="meta" label="Objetivo preliminar de diseño" />
                <p className="mt-2 font-display text-xl font-semibold text-forest-900">{mainIndicator.designTarget}</p>
                <p className="mt-1 text-xs text-ink-500">{mainIndicator.designTargetNote}</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <AbsorptionCalculator />
              <div className="rounded-2xl border border-dashed border-amber-600/50 p-5">
                <p className="text-sm font-semibold text-forest-900">Capacidad de absorción por materia prima</p>
                <ul className="mt-3 space-y-3">
                  {biomasses.map((b) => (
                    <li key={b.id}>
                      <div className="flex justify-between text-xs">
                        <span className="text-ink-700">{b.name}</span>
                        <span className="font-semibold text-amber-800">Ensayo pendiente</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full border border-dashed border-amber-600/40 bg-amber-50/60" aria-hidden />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Panel demostrativo */}
        <Reveal className="mt-8">
          <div className="rounded-3xl bg-forest-950 p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">Panel de indicadores · estado actual</h3>
              <span className="rounded-full bg-white p-0.5">
                <StageBadge stage="concepto" label="Panel demostrativo" />
              </span>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {kpis.map(({ Icon, label, value, kind }) => (
                <li
                  key={label}
                  className={`rounded-2xl p-4 ${kind === 'pendiente' ? 'border border-dashed border-amber-300/50 bg-white/[0.03]' : 'border border-white/10 bg-white/[0.06]'}`}
                >
                  <Icon className={`size-5 ${kind === 'pendiente' ? 'text-amber-300' : 'text-sky-300'}`} aria-hidden />
                  <p className="mt-3 font-display text-2xl font-bold">{value}</p>
                  <p className="mt-0.5 text-xs text-forest-100/70">{label}</p>
                  <p className={`mt-2 text-[11px] font-semibold ${kind === 'pendiente' ? 'text-amber-300' : 'text-sky-300'}`}>
                    {kind === 'pendiente' ? 'Pendiente' : 'Meta proyectada'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Indicadores secundarios */}
        <Reveal className="mt-8">
          <div className="card overflow-hidden">
            <div className="border-b border-forest-800/10 p-6 sm:px-8">
              <h3 className="text-lg font-semibold text-forest-900">Indicadores secundarios</h3>
            </div>
            <ol className="divide-y divide-forest-800/5">
              {indicators.map((ind) => (
                <li key={ind.n} className="grid gap-2 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-5 sm:px-8">
                  <span className="grid size-8 place-items-center rounded-lg bg-sand-100 text-sm font-bold text-forest-800">{ind.n}</span>
                  <div>
                    <p className="font-medium text-forest-900">
                      {ind.name} <span className="text-xs font-normal text-ink-500">({ind.unit})</span>
                    </p>
                    <p className="text-sm text-ink-500">
                      {ind.current ? <strong className="font-semibold text-ink-700">{ind.current}. </strong> : null}
                      {ind.note}
                    </p>
                  </div>
                  <StageBadge stage={kindStage[ind.kind]} label={ind.kind === 'meta' ? 'Meta proyectada' : ind.kind === 'pendiente' ? 'Pendiente' : undefined} />
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Hoja de ruta */}
        <Reveal className="mt-20">
          <h3 className="text-center text-2xl font-semibold text-forest-900">¿Dónde estamos hoy?</h3>
          <div className="relative mt-10">
            <div className="absolute top-6 right-[16%] left-[16%] hidden h-0.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-sky-400 md:block" aria-hidden />
            <ol className="relative grid gap-6 md:grid-cols-3">
              {roadmap.map(({ Icon, label, title, items, tone }) => (
                <li key={title} className="relative text-center">
                  <span className={`relative mx-auto grid size-12 place-items-center rounded-full border-2 bg-white ${tone}`}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold ${tone}`}>{label}</span>
                  <p className="mt-2 font-semibold text-forest-900">{title}</p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-500">
                    {items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
