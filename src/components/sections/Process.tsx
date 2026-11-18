import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, CornerDownRight, Wrench } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import CenterScene, { type SceneId } from '../illustrations/CenterScenes';
import { processSteps } from '../../data/process';

/** Equipos contemplados para un centro comunitario de procesamiento (inventario de recursos). */
const equipment: { scene: SceneId; title: string; items: string[] }[] = [
  { scene: 'recepcion', title: 'Recepción y control', items: ['2 balanzas', '2 medidores de humedad'] },
  { scene: 'trituradora', title: 'Trituración', items: ['1 trituradora'] },
  { scene: 'secador', title: 'Secado solar híbrido', items: ['2 sistemas de secado solar híbrido'] },
  { scene: 'solar', title: 'Energía solar', items: ['Paneles fotovoltaicos', 'Baterías e inversores'] },
  { scene: 'prensa', title: 'Conformado', items: ['1 prensa', '2 máquinas de coser'] },
  { scene: 'almacen', title: 'Almacenamiento', items: ['10 bandejas y recipientes'] },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const step = processSteps[active];
  const total = processSteps.length;

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setActive((a) => (a + 1) % total), 6000);
    return () => clearInterval(t);
  }, [autoplay, total]);

  const go = (i: number) => {
    setAutoplay(false);
    setActive((i + total) % total);
  };

  return (
    <section id="proceso" className="relative overflow-hidden bg-forest-950 py-24 text-white sm:py-32" aria-labelledby="proceso-title">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute bottom-0 left-1/2 size-[700px] -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-500/15 blur-3xl" aria-hidden />

      <div className="container-page relative">
        <SectionHeader
          id="proceso-title"
          tone="dark"
          eyebrow="Proceso productivo"
          title="Cada residuo tiene una nueva oportunidad."
          description="Cinco etapas proyectadas para transformar la biomasa en prototipos trazables. Selecciona cada etapa para ver sus actividades y los equipos que intervienen."
        />

        <Reveal className="mt-16">
          {/* Línea de etapas */}
          <div className="relative">
            <div className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-white/10 md:block" aria-hidden>
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-sand-200"
                animate={{ width: `${(active / (total - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div role="tablist" aria-label="Etapas del proceso" className="relative grid grid-cols-5 gap-2">
              {processSteps.map((s, i) => {
                const isActive = i === active;
                const done = i < active;
                return (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    id={`etapa-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="etapa-panel"
                    aria-label={`Etapa ${i + 1}: ${s.title}`}
                    onClick={() => go(i)}
                    className="group flex flex-col items-center gap-3 text-center"
                  >
                    <span
                      className={`relative grid size-12 place-items-center rounded-2xl border transition-all duration-300 sm:size-14 ${
                        isActive
                          ? 'scale-110 border-emerald-300 bg-emerald-400 text-forest-950 shadow-[0_0_40px_-5px_rgba(52,211,153,0.8)]'
                          : done
                            ? 'border-emerald-400/50 bg-forest-800 text-emerald-300'
                            : 'border-white/15 bg-forest-900 text-white/60 group-hover:border-white/40 group-hover:text-white'
                      }`}
                    >
                      <s.icon className="size-5 sm:size-6" aria-hidden />
                      <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-sand-100 text-[10px] font-bold text-forest-900">
                        {i + 1}
                      </span>
                    </span>
                    <span
                      className={`hidden text-xs font-semibold tracking-wide uppercase sm:block ${isActive ? 'text-emerald-300' : 'text-white/60'}`}
                    >
                      {s.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel de detalle */}
          <div
            id="etapa-panel"
            role="tabpanel"
            aria-labelledby={`etapa-tab-${active}`}
            className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="grid gap-8 p-6 sm:p-10 md:grid-cols-[auto_1fr]"
              >
                <div className="relative grid size-28 place-items-center rounded-3xl bg-gradient-to-br from-emerald-400 to-forest-500 text-forest-950 sm:size-36">
                  <motion.div initial={{ rotate: -20, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                    <step.icon className="size-12 sm:size-16" aria-hidden />
                  </motion.div>
                  <span className="absolute inset-0 animate-ping rounded-3xl border-2 border-emerald-300/40 [animation-duration:2.5s]" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-300">
                    Etapa {active + 1} de {total}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">{step.title}</h3>
                  <p className="mt-2 text-forest-100/80">{step.summary}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                    {step.details.map((d, i) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="rounded-2xl border border-white/10 bg-forest-900/60 p-4 text-sm text-forest-100/90"
                      >
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                    <Wrench className="size-4 text-emerald-300" aria-hidden />
                    <span className="text-forest-100/70">Equipos:</span>
                    {step.equipment.map((e) => (
                      <span key={e} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-white/90">
                        {e}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-sm text-sand-200">
                    <CornerDownRight className="size-4" aria-hidden /> Resultado: <strong className="font-semibold">{step.output}</strong>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 sm:px-10">
              <button
                type="button"
                onClick={() => setAutoplay((a) => !a)}
                className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
                aria-label={autoplay ? 'Pausar recorrido automático' : 'Reproducir recorrido automático'}
              >
                {autoplay ? <Pause className="size-4" /> : <Play className="size-4" />}
                <span className="hidden sm:inline">{autoplay ? 'Pausar recorrido' : 'Recorrido automático'}</span>
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(active - 1)} aria-label="Etapa anterior" className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-emerald-300 hover:text-emerald-300">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => go(active + 1)} aria-label="Etapa siguiente" className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-emerald-300 hover:text-emerald-300">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Centro comunitario de procesamiento */}
        <Reveal className="mt-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-2xl font-semibold sm:text-3xl">Centro comunitario de procesamiento</h3>
              <p className="mt-2 max-w-2xl text-forest-100/75">
                Equipos contemplados en el inventario de recursos y en el presupuesto preliminar del piloto.
              </p>
            </div>
            <span className="rounded-full bg-white p-0.5">
              <StageBadge stage="meta" label="Equipamiento proyectado, por adquirir" />
            </span>
          </div>
        </Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {equipment.map((e, i) => (
            <Reveal as="li" key={e.scene} delay={i * 0.05} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
              <div className="aspect-[4/3] overflow-hidden">
                <div className="h-full w-full transition duration-700 group-hover:scale-105">
                  <CenterScene id={e.scene} />
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <p className="font-semibold">{e.title}</p>
                <ul className="mt-1 space-y-0.5 text-xs text-forest-100/75 sm:text-sm">
                  {e.items.map((it) => (
                    <li key={it}>• {it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
