import { Wallet, Factory, Users, ShieldCheck, Info, ChevronDown } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import { BarList, StackedBar, Meter, DataTable } from '../charts/Charts';
import {
  investmentGroups,
  operationGroups,
  investmentTotal,
  operationTotal,
  subtotal,
  contingency,
  contingencyRate,
  budgetTotal,
  budgetNote,
  groupTotal,
  type BudgetGroup,
} from '../../data/budget';
import { seriesColors } from '../../data/charts';
import { formatCOP, formatMillions, formatPct } from '../../lib/format';

const summaryRows: { label: string; value: number; strong?: boolean }[] = [
  { label: 'Inversión inicial', value: investmentTotal },
  { label: 'Operación durante 12 meses', value: operationTotal },
  { label: 'Subtotal general', value: subtotal, strong: true },
  { label: 'Imprevistos del 5 %', value: contingency },
  { label: 'Presupuesto total', value: budgetTotal, strong: true },
];

function GroupBreakdown({ title, Icon, total, groups, text }: { title: string; Icon: typeof Factory; total: number; groups: BudgetGroup[]; text: string }) {
  return (
    <div className="card h-full p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-forest-800 text-emerald-300">
            <Icon className="size-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-forest-900">{title}</h3>
            <p className="font-display text-xl font-bold text-forest-900 tabular-nums">{formatCOP(total)}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-500">{text}</p>
      <div className="mt-6">
        <BarList
          data={groups.map((g) => ({ label: g.name, value: groupTotal(g) }))}
          format={formatMillions}
          max={total}
          ariaLabel={`Distribución de ${title.toLowerCase()} por categoría`}
        />
      </div>
      <div className="mt-6 space-y-2">
        {groups.map((g) => (
          <details key={g.id} className="group rounded-2xl border border-forest-800/10 bg-sand-50/60 text-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 select-none">
              <span>
                <span className="font-semibold text-forest-900">{g.name}</span>
                <span className="block text-xs text-ink-500">{g.description}</span>
              </span>
              <ChevronDown className="size-4 shrink-0 text-ink-500 transition group-open:rotate-180" aria-hidden />
            </summary>
            <div className="overflow-x-auto px-4 pb-3">
              <table className="w-full min-w-[300px] text-left">
                <caption className="sr-only">Partidas de {g.name}</caption>
                <thead>
                  <tr className="text-xs text-ink-500">
                    <th scope="col" className="py-1.5 font-semibold">Partida</th>
                    <th scope="col" className="py-1.5 font-semibold">Cant.</th>
                    <th scope="col" className="py-1.5 text-right font-semibold">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {g.lines.map((l) => (
                    <tr key={l.item} className="border-t border-forest-800/5">
                      <td className="py-1.5 pr-2 text-ink-700">{l.item}</td>
                      <td className="py-1.5 pr-2 whitespace-nowrap text-ink-500">{l.qty}</td>
                      <td className="py-1.5 text-right whitespace-nowrap text-forest-900 tabular-nums">{formatCOP(l.value)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-forest-800/15 font-semibold text-forest-900">
                    <td className="pt-2" colSpan={2}>Subtotal</td>
                    <td className="pt-2 text-right tabular-nums">{formatCOP(groupTotal(g))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function Budget() {
  const distribution = [
    { label: 'Inversión inicial', value: investmentTotal, color: seriesColors[0], display: formatCOP(investmentTotal) },
    { label: 'Operación (12 meses)', value: operationTotal, color: seriesColors[1], display: formatCOP(operationTotal) },
    { label: 'Imprevistos (5 %)', value: contingency, color: seriesColors[2], display: formatCOP(contingency) },
  ];

  return (
    <section id="presupuesto" className="relative overflow-hidden bg-sand-100 py-24 sm:py-32" aria-labelledby="presupuesto-title">
      <div className="container-page">
        <SectionHeader
          id="presupuesto-title"
          eyebrow="Presupuesto y viabilidad económica"
          title="Una inversión proyectada para transformar el territorio."
          description="Presupuesto preliminar para implementar el piloto durante 12 meses: equipos e infraestructura para transformar la biomasa y la operación del proyecto."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          {/* Tarjeta destacada */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl bg-forest-950 p-8 text-white sm:p-10">
              <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
              <div className="absolute -right-24 -bottom-24 size-72 rounded-full bg-emerald-400/25 blur-3xl" aria-hidden />
              <div className="relative">
                <Wallet className="size-9 text-emerald-300" aria-hidden />
                <p className="mt-5 text-sm font-semibold tracking-wider text-emerald-300 uppercase">Presupuesto total de referencia</p>
                <p className="mt-2 font-display text-4xl leading-tight font-bold tabular-nums sm:text-5xl">{formatCOP(budgetTotal)}</p>
                <p className="mt-1 text-forest-100/80">COP · horizonte de 12 meses</p>
                <div className="mt-6 inline-flex rounded-full bg-white p-0.5">
                  <StageBadge stage="meta" label="Estimación preliminar" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tabla resumen */}
          <Reveal delay={0.1}>
            <div className="card h-full p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-forest-900">Resumen del presupuesto</h3>
              <table className="mt-4 w-full text-left text-sm">
                <caption className="sr-only">Resumen del presupuesto preliminar en pesos colombianos</caption>
                <thead>
                  <tr className="border-b border-forest-800/15 text-xs text-ink-500">
                    <th scope="col" className="py-2.5 font-semibold">Concepto</th>
                    <th scope="col" className="py-2.5 text-right font-semibold">Valor (COP)</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryRows.map((r) => (
                    <tr
                      key={r.label}
                      className={`border-b border-forest-800/5 ${r.strong ? 'font-semibold text-forest-900' : 'text-ink-700'} ${
                        r.label === 'Presupuesto total' ? 'bg-emerald-50 text-base' : ''
                      }`}
                    >
                      <td className="px-2 py-3">{r.label}</td>
                      <td className="px-2 py-3 text-right tabular-nums">{formatCOP(r.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* Distribución y porcentaje de imprevistos */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="card h-full p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-forest-900">Distribución del presupuesto total</h3>
              <p className="mt-1 text-sm text-ink-500">
                La operación concentra la mayor parte: el personal proyectado representa{' '}
                {formatPct(groupTotal(operationGroups[0]) / budgetTotal)} del total.
              </p>
              <div className="mt-6">
                <StackedBar data={distribution} format={formatCOP} ariaLabel="Distribución del presupuesto total" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-emerald-600" aria-hidden />
                <h3 className="text-lg font-semibold text-forest-900">Reserva para imprevistos</h3>
              </div>
              <div className="mt-6">
                <Meter
                  value={contingencyRate}
                  label="Imprevistos sobre el subtotal general"
                  caption={
                    <>
                      {formatCOP(contingency)} sobre un subtotal de {formatCOP(subtotal)}. La guía del curso recomienda
                      reservar entre 5 % y 10 %.
                    </>
                  }
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Desglose */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GroupBreakdown
              title="Inversión inicial"
              Icon={Factory}
              total={investmentTotal}
              groups={investmentGroups}
              text="Equipos e infraestructura para la transformación de biomasa: trituración, secado solar, prensado, control de calidad, tecnología, seguridad y el lote piloto."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <GroupBreakdown
              title="Operación durante 12 meses"
              Icon={Users}
              total={operationTotal}
              groups={operationGroups}
              text="Personal, servicios, logística, capacitación, materiales y funcionamiento del proyecto, incluida la compra de biomasa a productores."
            />
          </Reveal>
        </div>

        <Reveal>
          <DataTable
            caption="Distribución del presupuesto total"
            headers={['Concepto', 'Valor (COP)']}
            rows={[...investmentGroups, ...operationGroups].map((g) => [g.name, formatCOP(groupTotal(g))] as [string, string]).concat([['Imprevistos (5 %)', formatCOP(contingency)]])}
            footer={['Presupuesto total', formatCOP(budgetTotal)]}
          />
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex items-start gap-3 rounded-2xl border-2 border-earth-500/30 bg-white p-5 text-sm leading-relaxed text-ink-700">
            <Info className="mt-0.5 size-5 shrink-0 text-earth-500" aria-hidden />
            <div>
              <p className="font-semibold text-forest-900">{budgetNote}</p>
              <p className="mt-2 text-ink-500">
                Los precios provienen de referencias de proveedores y no son cotizaciones definitivas. El proyecto no
                afirma ser rentable todavía: los precios de venta, la demanda y la viabilidad comercial deben validarse.{' '}
                <a href="#fuentes-precios" className="font-semibold text-forest-800 hover:underline">
                  Ver fuentes de precios
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
