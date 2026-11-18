import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import { Droplets, Mountain, Trees, Tractor, Home, Info, ExternalLink, CalendarDays, Lightbulb, Camera } from 'lucide-react';
import { photos, type Photo } from '../../data/photos';
import type { BiomassId } from '../../data/pilot';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import ResidueArt from '../illustrations/ResidueArt';
import { biomasses } from '../../data/pilot';
import { narrative, wradioUrl } from '../../data/narrative';
import { sources } from '../../data/sources';

const thesisUrl = sources.find((s) => s.id === 'rodriguez-2018')!.url;
const complementaryUrl = sources.find((s) => s.id === 'analisis-urbano')!.url;

const effects = [
  { Icon: Droplets, title: 'Fuentes hídricas', text: 'El crudo puede llegar a quebradas y ríos que abastecen a las familias y al ganado.' },
  { Icon: Mountain, title: 'Suelo', text: 'Los hidrocarburos se infiltran y alteran la fertilidad de tierras productivas.' },
  { Icon: Trees, title: 'Vegetación y biodiversidad', text: 'Presión sobre la flora y la fauna de una región de alta riqueza natural.' },
  { Icon: Tractor, title: 'Actividades agrícolas y pecuarias', text: 'Cultivos, pastos y animales expuestos a zonas contaminadas.' },
  { Icon: Home, title: 'Medios de vida rurales', text: 'Afectaciones al sustento y la vida cotidiana de las comunidades campesinas.' },
];

/** Galería de derrames: una foto grande y tres complementarias (mosaico en escritorio). */
const spillGallery: { photo: Photo; span: string }[] = [
  { photo: photos.derrameTrabajador, span: 'lg:col-span-2 lg:row-span-2' },
  { photo: photos.derrameValvula, span: '' },
  { photo: photos.derrameBarreras, span: '' },
  { photo: photos.derrameRio, span: 'sm:col-span-2' },
];

/** Fotografías de los residuos (el vástago conserva solo su ilustración). */
const residuePhotos: Partial<Record<BiomassId, Photo>> = {
  cacao: photos.cacao,
  'platano-fibra': photos.fibraPlatano,
  yuca: photos.bagazoYuca,
};

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{value}</span>;
}

export default function Problem() {
  return (
    <section id="problema" className="relative overflow-hidden bg-sand-50 py-24 sm:py-32" aria-labelledby="problema-title">
      <div className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          id="problema-title"
          eyebrow="Problema y oportunidad"
          title="Un reto ambiental y una oportunidad circular."
          description="El Catatumbo es una región de enorme riqueza natural y agrícola. Dos problemáticas se conectan: la contaminación por hidrocarburos y el desaprovechamiento de los residuos del campo."
        />

        {/* ---------- Parte 1: el problema ---------- */}
        <Reveal className="mt-16">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-earth-500 font-display font-bold text-white">1</span>
            <h3 className="text-2xl font-semibold text-forest-900 sm:text-3xl">El problema ambiental</h3>
          </div>
          <blockquote className="mt-5 max-w-3xl border-l-4 border-earth-400 pl-5 text-lg leading-relaxed text-ink-700 sm:text-xl">
            {narrative.problema}
          </blockquote>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Antecedente histórico: 570 km */}
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-3xl bg-forest-900 p-8 text-white sm:p-10">
              <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden>
                <path d="M-10 300 C 80 240, 120 330, 200 260 S 330 180, 420 230" stroke="#34d399" strokeWidth="2" fill="none" strokeDasharray="6 8" />
                <path d="M-10 200 C 90 150, 160 230, 240 170 S 350 110, 420 140" stroke="#e8dcc2" strokeWidth="2" fill="none" strokeDasharray="6 8" />
                <path d="M-10 110 C 70 80, 150 140, 230 90 S 340 40, 420 60" stroke="#34d399" strokeWidth="2" fill="none" strokeDasharray="6 8" />
              </svg>
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2">
                  <StageBadge stage="documentado" label="Antecedente histórico documentado" />
                </div>
                <p className="mt-6 font-display text-7xl font-bold sm:text-8xl">
                  <CountUp to={570} />
                  <span className="ml-2 text-3xl text-emerald-300 sm:text-4xl">km</span>
                </p>
                <p className="mt-3 max-w-md text-forest-100/85">
                  de líneas del Campo Tibú, en las que la investigación documentó la irrupción de grupos al margen de la
                  ley para extraer crudo de forma ilícita.
                </p>
                <p className="mt-4 text-sm text-forest-100/70">
                  El mismo estudio registró <strong className="text-white">91 incidentes ambientales en 2017</strong> en el
                  campo de explotación.
                </p>
                <div className="mt-6 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-forest-100/75">
                  <Info className="mt-0.5 size-4 shrink-0 text-sand-200" aria-hidden />
                  <p>
                    Dato reportado por Rodríguez Escalante (2018, p. 9). Es una cifra histórica de la investigación, no una
                    medición actual independiente.{' '}
                    <a href={thesisUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-300 underline-offset-2 hover:underline">
                      Consultar estudio
                    </a>{' '}
                    ·{' '}
                    <a href={complementaryUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-300 underline-offset-2 hover:underline">
                      Fuente complementaria
                    </a>
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Dato clave: W Radio 2024 */}
          <Reveal delay={0.1}>
            <article className="card flex h-full flex-col p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow">Dato clave</span>
                <StageBadge stage="documentado" label="Hecho histórico · enero de 2024" />
              </div>
              <p className="mt-6 font-display text-2xl leading-snug font-semibold text-forest-900 sm:text-3xl">
                “{narrative.datoClave}”
              </p>
              <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <div className="flex gap-2.5 rounded-2xl bg-sand-50 p-4">
                  <CalendarDays className="size-5 shrink-0 text-earth-500" aria-hidden />
                  <div>
                    <dt className="text-xs font-semibold text-ink-500">Fecha</dt>
                    <dd className="text-ink-800">22 de enero de 2024</dd>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-2xl bg-sand-50 p-4">
                  <Info className="size-5 shrink-0 text-earth-500" aria-hidden />
                  <div>
                    <dt className="text-xs font-semibold text-ink-500">Lugar y causa reportada</dt>
                    <dd className="text-ink-800">
                      Vereda Guachimán; relacionada aparentemente con válvulas ilícitas en el oleoducto Caño Limón-Coveñas.
                    </dd>
                  </div>
                </div>
              </dl>
              <p className="mt-5 text-xs text-ink-500">
                Se presenta como antecedente: no describe una emergencia en curso.
              </p>
              <a
                href={wradioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-forest-800 hover:text-emerald-600"
              >
                Leer la noticia original en W Radio <ExternalLink className="size-4" aria-hidden />
              </a>
            </article>
          </Reveal>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Efectos de los derrames de hidrocarburos">
          {effects.map(({ Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.05} className="card group h-full p-5 transition duration-300 hover:border-earth-400/40">
              <div className="grid size-10 place-items-center rounded-xl bg-sand-100 text-earth-700 transition group-hover:bg-earth-500 group-hover:text-white">
                <Icon className="size-5" aria-hidden />
              </div>
              <h4 className="mt-3 font-semibold text-forest-900">{title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{text}</p>
            </Reveal>
          ))}
        </ul>

        {/* Galería: el problema en imágenes */}
        <Reveal className="mt-12">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-forest-900">
            <Camera className="size-5 text-earth-500" aria-hidden /> El problema en imágenes
          </h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:auto-rows-[14rem] lg:grid-cols-4">
            {spillGallery.map(({ photo, span }) => (
              <li key={photo.src} className={`group relative overflow-hidden rounded-2xl bg-forest-900 ${span}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-105 lg:aspect-auto"
                />
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 to-transparent p-4 pt-10 text-xs leading-relaxed text-white/90">
                  {photo.caption}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-500">
            Fotografías de referencia sobre derrames de hidrocarburos; ilustran el tipo de afectación y no corresponden
            necesariamente al evento citado arriba.
          </p>
        </Reveal>

        {/* ---------- Parte 2: la oportunidad ---------- */}
        <Reveal className="mt-24">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-emerald-500 font-display font-bold text-forest-950">2</span>
            <h3 className="text-2xl font-semibold text-forest-900 sm:text-3xl">La oportunidad</h3>
          </div>
          <blockquote className="mt-5 max-w-3xl border-l-4 border-emerald-500 pl-5 text-lg leading-relaxed text-ink-700 sm:text-xl">
            {narrative.oportunidad}
          </blockquote>
          <p className="mt-4 max-w-3xl text-ink-500">
            En las fincas de la región quedan residuos de las cosechas que normalmente no vuelven a un ciclo productivo.
            Catatumbo Circular propone convertirlos en materia prima para nuevos productos.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {biomasses.map((b, i) => (
            <Reveal as="li" key={b.id} delay={i * 0.07} className="card group h-full overflow-hidden transition duration-500 hover:shadow-xl">
              <div className="relative aspect-[3/2] overflow-hidden">
                {residuePhotos[b.id] ? (
                  <>
                    <img
                      src={residuePhotos[b.id]!.src}
                      alt={residuePhotos[b.id]!.alt}
                      width={residuePhotos[b.id]!.width}
                      height={residuePhotos[b.id]!.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    {/* La ilustración se conserva como miniatura */}
                    <div className="absolute right-2 bottom-2 w-20 overflow-hidden rounded-lg border-2 border-white shadow-md">
                      <ResidueArt id={b.id} className="block h-auto w-full" />
                    </div>
                  </>
                ) : (
                  <ResidueArt id={b.id} className="h-full w-full transition duration-700 group-hover:scale-105" />
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-wider text-earth-500 uppercase">Residuo {i + 1}</p>
                <h4 className="mt-1 text-lg font-semibold text-forest-900">{b.name}</h4>
                <p className="mt-2 flex gap-2 text-sm leading-relaxed text-ink-500">
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                  {b.use}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-ink-500">
          Fotografías e ilustraciones representativas. Los usos descritos están por ensayar.
        </p>
      </div>
    </section>
  );
}
