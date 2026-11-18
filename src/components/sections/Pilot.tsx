import { Scale, CalendarRange, Package, Sun, AlertTriangle } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import { StackedBar } from '../charts/Charts';
import {
  biomasses,
  biomassPerMonth,
  biomassPerYear,
  biomassValuePerMonth,
  initialBatch,
  dryerDesignCapacity,
} from '../../data/pilot';
import { seriesColors } from '../../data/charts';
import { formatCOP, formatNumber } from '../../lib/format';

const kg = (n: number) => `${formatNumber(n)} kg`;

export default function Pilot() {
  const chartData = biomasses.map((b, i) => ({ label: b.name, value: b.kgPerMonth, color: seriesColors[i] }));

  return (
    <section id="piloto" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="piloto-title">
      <div className="bg-grid-dark absolute inset-x-0 top-0 h-96 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          id="piloto-title"
          eyebrow="Escala del proyecto y piloto productivo"
          title="Un modelo productivo basado en biomasa regional."
          description="Capacidad proyectada del piloto según el inventario de recursos del proyecto. Son metas de planeación: se confirmarán con acuerdos de suministro y registros reales."
        />
        <Reveal className="mt-6 flex justify-center">
          <StageBadge stage="meta" label="Capacidad proyectada · no demostrada" />
        </Reveal>

        {/* Cifras principales */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl bg-forest-900 p-8 text-white">
              <Scale className="size-8 text-emerald-300" aria-hidden />
              <p className="mt-4 font-display text-6xl font-bold tabular-nums sm:text-7xl">{formatNumber(biomassPerMonth)}</p>
              <p className="mt-1 text-lg text-forest-100/85">kg de biomasa al mes</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-forest-500 p-8 text-forest-950">
              <CalendarRange className="size-8" aria-hidden />
              <p className="mt-4 font-display text-6xl font-bold tabular-nums sm:text-7xl">{formatNumber(biomassPerYear)}</p>
              <p className="mt-1 text-lg font-medium">kg de biomasa al año (12 meses)</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Distribución */}
          <Reveal>
            <div className="card h-full p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-forest-900">Distribución mensual de materias primas</h3>
              <p className="mt-1 text-sm text-ink-500">Kilogramos por mes y participación en el total.</p>
              <div className="mt-6">
                <StackedBar data={chartData} format={kg} ariaLabel="Distribución mensual de biomasa por materia prima" height="h-14" legendClass="sm:grid-cols-2" />
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[300px] text-left text-sm">
                  <caption className="sr-only">Materia prima y cantidad mensual proyectada</caption>
                  <thead>
                    <tr className="border-b border-forest-800/15 text-xs text-ink-500">
                      <th scope="col" className="w-[65%] py-2.5 font-semibold">Materia prima</th>
                      <th scope="col" className="py-2.5 text-right font-semibold">Cantidad mensual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {biomasses.map((b, i) => (
                      <tr key={b.id} className="border-b border-forest-800/5">
                        <td className="py-2.5 text-ink-700">
                          <span className="mr-2 inline-block size-2.5 rounded-sm align-middle" style={{ backgroundColor: seriesColors[i] }} aria-hidden />
                          {b.name}
                        </td>
                        <td className="py-2.5 text-right text-forest-900 tabular-nums">{kg(b.kgPerMonth)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-forest-900">
                      <td className="pt-3">Total de biomasa</td>
                      <td className="pt-3 text-right tabular-nums">{kg(biomassPerMonth)}/mes</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {/* Lote inicial */}
            <Reveal delay={0.1}>
              <div className="card p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-sand-100 text-earth-700">
                    <Package className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold text-forest-900">Lote piloto inicial</h3>
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-3">
                  {initialBatch.map((b) => (
                    <li key={b.name} className="rounded-2xl bg-sand-50 p-4">
                      <p className="font-display text-3xl font-bold text-forest-900">{b.units}</p>
                      <p className="mt-1 text-xs leading-snug text-ink-500">{b.name}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  Producción piloto proyectada en el presupuesto para fabricar y validar los prototipos. No es una
                  capacidad mensual demostrada.
                </p>
              </div>
            </Reveal>

            {/* Datos complementarios */}
            <Reveal delay={0.15}>
              <div className="card p-6 sm:p-7">
                <dl className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <Sun className="mt-0.5 size-5 shrink-0 text-earth-500" aria-hidden />
                    <div>
                      <dt className="font-semibold text-forest-900">Secado: 2 sistemas solares híbridos</dt>
                      <dd className="text-ink-500">Capacidad de diseño: {dryerDesignCapacity}, por validar.</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Scale className="mt-0.5 size-5 shrink-0 text-earth-500" aria-hidden />
                    <div>
                      <dt className="font-semibold text-forest-900">Pago de referencia a productores</dt>
                      <dd className="text-ink-500">
                        {formatCOP(biomassValuePerMonth)}/mes ({formatCOP(biomassValuePerMonth * 12)}/año) a precios
                        internos de $100–$150/kg, sujetos a acuerdo con las familias.
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
