import type { ReactNode } from 'react';
import { Layers, Sprout, Cpu, Wheat, ArrowRight, ArrowDown, MapPinned, Check, Quote } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import { narrative } from '../../data/narrative';
import { stemComponents, canvasBlocks } from '../../data/proposal';

/** Posición de cada bloque en el lienzo (5 columnas en escritorio, como el lienzo clásico) y su color. */
const canvasLayout: Record<(typeof canvasBlocks)[number]['key'], string> = {
  socios: 'border-forest-800/15 bg-forest-50 text-forest-900 lg:col-start-1 lg:row-span-2 lg:row-start-1',
  actividades: 'border-forest-800/15 bg-forest-50 text-forest-900 lg:col-start-2 lg:row-start-1',
  recursos: 'border-forest-800/15 bg-forest-50 text-forest-900 lg:col-start-2 lg:row-start-2',
  valor: 'border-emerald-500/40 bg-emerald-50 text-forest-900 lg:col-start-3 lg:row-span-2 lg:row-start-1',
  relaciones: 'border-sky-600/20 bg-sky-50 text-ink-800 lg:col-start-4 lg:row-start-1',
  canales: 'border-sky-600/20 bg-sky-50 text-ink-800 lg:col-start-4 lg:row-start-2',
  segmentos: 'border-sky-600/20 bg-sky-50 text-ink-800 lg:col-start-5 lg:row-span-2 lg:row-start-1',
  costos: 'border-earth-400/30 bg-sand-100 text-ink-800 lg:col-span-2 lg:col-start-1 lg:row-start-3',
  ingresos: 'border-earth-400/30 bg-sand-100 text-ink-800 sm:col-span-2 lg:col-span-3 lg:col-start-3 lg:row-start-3',
};

const lines = [
  {
    n: 'Línea 1',
    Icon: Layers,
    title: 'Bioabsorbentes',
    text: 'Desarrollo de materiales a partir de residuos vegetales para explorar su capacidad de absorción de hidrocarburos.',
    points: ['BioPads, BioBooms y BioGranulado', 'Trituración, secado y prensado', 'Ensayos de absorción por realizar'],
    tone: 'bg-forest-800 text-emerald-300',
  },
  {
    n: 'Línea 2',
    Icon: Sprout,
    title: 'Compost enriquecido',
    text: 'Desarrollo de formulaciones con microorganismos nativos para estudiar su potencial en procesos de recuperación de suelos.',
    points: ['Solo biomasa limpia', 'Microorganismos nativos', 'Validación técnica y ambiental'],
    tone: 'bg-earth-500 text-white',
  },
  {
    n: 'Línea 3',
    Icon: Cpu,
    title: 'Tecnología y trazabilidad',
    text: 'Herramientas digitales para controlar el origen de la biomasa, su recepción, procesamiento, humedad, inventario y comercialización.',
    points: ['Registro de productores y lotes', 'Monitoreo de humedad', 'Marketplace B2B'],
    tone: 'bg-ink-800 text-sky-300',
  },
];

function Node({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border p-4 text-center ${className}`}>{children}</div>;
}

/** Diagrama: la biomasa alimenta las líneas 1 y 2; la línea 3 registra todo el flujo. */
function LinesDiagram() {
  return (
    <figure className="card overflow-hidden p-6 sm:p-8" aria-labelledby="diagrama-lineas">
      <figcaption id="diagrama-lineas" className="text-sm font-semibold text-forest-900">
        Cómo se conectan las tres líneas
      </figcaption>
      <div className="mt-6 grid items-center gap-3 lg:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
        <Node className="border-earth-400/40 bg-sand-50">
          <Wheat className="mx-auto size-6 text-earth-500" aria-hidden />
          <p className="mt-2 font-semibold text-forest-900">Biomasa local</p>
          <p className="text-xs text-ink-500">Cacao, plátano y yuca de fincas de Tibú</p>
        </Node>
        <Arrow />
        <div className="grid gap-3">
          <Node className="border-forest-800/15 bg-forest-50">
            <p className="text-xs font-semibold text-forest-700">Línea 1</p>
            <p className="font-semibold text-forest-900">Bioabsorbentes</p>
          </Node>
          <Node className="border-earth-400/30 bg-sand-100">
            <p className="text-xs font-semibold text-earth-700">Línea 2</p>
            <p className="font-semibold text-forest-900">Compost con biomasa limpia</p>
          </Node>
        </div>
        <Arrow />
        <Node className="border-emerald-500/40 bg-emerald-50">
          <MapPinned className="mx-auto size-6 text-emerald-600" aria-hidden />
          <p className="mt-2 font-semibold text-forest-900">Territorio</p>
          <p className="text-xs text-ink-500">Absorbentes en validación y cadenas productivas locales</p>
        </Node>
      </div>
      <div className="relative mt-3">
        <div className="mx-auto hidden h-6 w-[80%] border-x-2 border-b-2 border-dashed border-sky-500/50 lg:block" aria-hidden />
        <Node className="mt-3 border-sky-600/25 bg-sky-50 lg:mt-0">
          <p className="text-xs font-semibold text-sky-800">Línea 3 · Tecnología y trazabilidad (transversal)</p>
          <p className="mt-1 text-sm text-ink-700">
            Registra cada etapa: origen → recepción → humedad → procesamiento → inventario → comercialización.
          </p>
        </Node>
      </div>
    </figure>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center text-forest-800/40" aria-hidden>
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
    </div>
  );
}

export default function Solution() {
  return (
    <section id="propuesta" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="propuesta-title">
      <div className="absolute -top-40 right-0 size-[520px] rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          id="propuesta-title"
          eyebrow="Nuestra propuesta"
          title={
            <>
              De biomasa local a <span className="text-emerald-600">soluciones en desarrollo.</span>
            </>
          }
          description={narrative.solucion}
        />

        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div className="relative rounded-3xl bg-gradient-to-br from-forest-800 to-forest-900 p-7 text-white sm:p-9">
            <Quote className="absolute top-6 right-6 size-10 text-emerald-300/30" aria-hidden />
            <p className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">Propuesta de valor</p>
            <p className="mt-3 font-display text-xl leading-snug sm:text-2xl">{narrative.propuestaValor}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {lines.map(({ n, Icon, title, text, points, tone }, i) => (
            <Reveal key={n} delay={i * 0.1}>
              <article className="card group relative h-full overflow-hidden p-8 transition duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-sand-300 transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                <div className="flex items-center justify-between">
                  <div className={`grid size-14 place-items-center rounded-2xl shadow-lg ${tone}`}>
                    <Icon className="size-7" aria-hidden />
                  </div>
                  <span className="text-sm font-semibold text-ink-500">{n}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-forest-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{text}</p>
                <ul className="mt-6 space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-ink-700">
                      <Check className="size-4 text-emerald-500" aria-hidden /> {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <LinesDiagram />
        </Reveal>

        {/* Aporte de cada componente STEM */}
        <Reveal className="mt-16">
          <h3 className="text-center text-2xl font-semibold text-forest-900 sm:text-3xl">Qué aporta cada componente STEM</h3>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stemComponents.map((c, i) => (
            <Reveal as="li" key={c.letter} delay={i * 0.06} className="card flex h-full flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-forest-800 font-display text-2xl font-bold text-emerald-300">
                  {c.letter}
                </span>
                <h4 className="text-lg font-semibold text-forest-900">{c.name}</h4>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-700">{c.contribution}</p>
              <p className="mt-auto pt-4 text-xs font-medium text-emerald-700">{c.evidence}</p>
            </Reveal>
          ))}
        </ul>

        {/* Lienzo resumido */}
        <Reveal className="mt-16">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-forest-900 sm:text-3xl">Lienzo del modelo de negocio (resumido)</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-500">
              Modelo propuesto. Socios, clientes e ingresos son potenciales y se validarán en la siguiente etapa.
            </p>
          </div>
          <div id="lienzo" className="mt-8 grid scroll-mt-24 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {canvasBlocks.map((b) => (
              <div key={b.key} className={`rounded-2xl border p-4 ${canvasLayout[b.key]}`}>
                <p className="text-xs font-bold tracking-wider uppercase">{b.title}</p>
                <ul className="mt-2 space-y-1.5 text-sm leading-snug">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-1.5">
                      <span aria-hidden>•</span> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3 text-center text-sm text-ink-500">
          <StageBadge stage="validacion" label="Las tres líneas están en investigación y validación" />
          <span>La capacidad de los materiales y el efecto del compost se determinarán con ensayos técnicos.</span>
        </Reveal>
      </div>
    </section>
  );
}
