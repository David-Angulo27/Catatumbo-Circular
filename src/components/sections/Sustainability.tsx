import { Star, Info, ExternalLink, Check, Leaf, Users, Coins, Wallet } from 'lucide-react';
import { dimensions, type DimensionKey } from '../../data/proposal';
import { budgetTotal, investmentTotal, operationTotal, contingency } from '../../data/budget';
import { formatCOP } from '../../lib/format';

const dimensionStyle: Record<DimensionKey, { Icon: typeof Leaf; tone: string }> = {
  ambiental: { Icon: Leaf, tone: 'bg-emerald-100 text-emerald-700' },
  social: { Icon: Users, tone: 'bg-sky-100 text-sky-700' },
  economica: { Icon: Coins, tone: 'bg-sand-200 text-earth-700' },
};
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { odsItems } from '../../data/ods';
import { sources } from '../../data/sources';

const unUrl = sources.find((s) => s.id === 'onu-2015')!.url;

export default function Sustainability() {
  const [primary, ...others] = odsItems;
  return (
    <section id="sostenibilidad" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="sostenibilidad-title">
      <div className="absolute -top-40 -left-40 size-[480px] rounded-full bg-sky-400/10 blur-3xl" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          id="sostenibilidad-title"
          eyebrow="Sostenibilidad e impacto"
          title="Innovación responsable con impacto medible."
          description="Catatumbo Circular se alinea de forma potencial con cinco Objetivos de Desarrollo Sostenible. La contribución real dependerá de los resultados que se midan durante el piloto."
        />

        {/* Acciones en las tres dimensiones de la sostenibilidad */}
        <Reveal className="mt-14">
          <h3 className="text-center text-xl font-semibold text-forest-900 sm:text-2xl">
            Acciones en las tres dimensiones de la sostenibilidad
          </h3>
        </Reveal>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {dimensions.map((d, i) => {
            const { Icon, tone } = dimensionStyle[d.key];
            return (
              <Reveal as="li" key={d.key} delay={i * 0.08} className="card h-full p-6">
                <div className="flex items-center gap-3">
                  <span className={`grid size-11 place-items-center rounded-xl ${tone}`}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h4 className="text-lg font-semibold text-forest-900">{d.title}</h4>
                </div>
                <ul className="mt-4 space-y-2">
                  {d.actions.map((a) => (
                    <li key={a} className="flex gap-2 text-sm leading-relaxed text-ink-700">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden /> {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>

        {/* ODS principal */}
        <Reveal className="mt-14">
          <article className="grid overflow-hidden rounded-3xl border-2 border-[#26bde2]/40 bg-white shadow-xl md:grid-cols-[minmax(0,260px)_1fr]">
            <div className="bg-[#26bde2] p-6 sm:p-8">
              <img
                src={primary.icon}
                alt={`ODS ${primary.number}: ${primary.name}`}
                width={466}
                height={466}
                loading="lazy"
                className="mx-auto w-40 rounded-xl sm:w-full"
              />
            </div>
            <div className="p-6 sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-3 py-1 text-xs font-semibold text-white">
                <Star className="size-3.5 text-emerald-300" aria-hidden /> ODS principal
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-forest-900 sm:text-3xl">
                ODS {primary.number} – {primary.name}
              </h3>
              <div className="mt-5 rounded-2xl bg-sky-50 p-5">
                <p className="text-sm font-bold text-sky-900">{primary.target}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">{primary.targetText}</p>
              </div>
              <p className="mt-5 leading-relaxed text-ink-700">{primary.relation}</p>
            </div>
          </article>
        </Reveal>

        {/* ODS complementarios */}
        <h3 className="mt-14 text-center text-xl font-semibold text-forest-900">ODS complementarios</h3>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o, i) => (
            <Reveal as="li" key={o.number} delay={i * 0.06} className="card flex h-full flex-col overflow-hidden">
              <img
                src={o.icon}
                alt={`ODS ${o.number}: ${o.name}`}
                width={300}
                height={300}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold tracking-wider text-ink-500 uppercase">
                  ODS {o.number} · {o.target}
                </p>
                <p className="mt-2 text-sm text-ink-500">{o.targetText}</p>
                <p className="mt-3 border-t border-forest-800/10 pt-3 text-sm font-medium text-forest-900">{o.relation}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8">
          <p className="mx-auto flex max-w-4xl items-start gap-3 rounded-2xl bg-sand-50 p-5 text-xs leading-relaxed text-ink-500">
            <Info className="mt-0.5 size-4 shrink-0 text-forest-700" aria-hidden />
            <span>
              Se trata de una alineación potencial con los objetivos de la Agenda 2030. Catatumbo Circular no cuenta con
              certificación ni aval de las Naciones Unidas; los íconos oficiales se usan solo con fines informativos.{' '}
              <a href={unUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-forest-800 hover:underline">
                Objetivos de Desarrollo Sostenible <ExternalLink className="size-3" aria-hidden />
              </a>
            </span>
          </p>
        </Reveal>

        {/* Presupuesto total */}
        <Reveal className="mt-10">
          <div className="grid gap-6 overflow-hidden rounded-3xl bg-forest-900 p-6 text-white sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-300 uppercase">
                <Wallet className="size-4" aria-hidden /> Presupuesto total del piloto
              </p>
              <p className="mt-2 font-display text-4xl font-bold break-words sm:text-5xl">{formatCOP(budgetTotal)}</p>
              <p className="mt-1 text-sm text-forest-100/70">12 meses de operación, con 5 % de imprevistos</p>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-3">
              {[
                { label: 'Inversión inicial', value: investmentTotal },
                { label: 'Operación 12 meses', value: operationTotal },
                { label: 'Imprevistos (5 %)', value: contingency },
              ].map((r) => (
                <div key={r.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-forest-100/70">{r.label}</p>
                  <p className="mt-1 font-semibold">{formatCOP(r.value)}</p>
                </div>
              ))}
              <a href="#presupuesto" className="text-sm font-semibold text-emerald-300 hover:underline sm:col-span-3">
                Ver el presupuesto detallado →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
