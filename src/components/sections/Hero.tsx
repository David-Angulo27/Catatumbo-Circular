import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, MapPin, Users } from 'lucide-react';
import { narrative } from '../../data/narrative';
import HeroLandscape from '../illustrations/HeroLandscape';
import CircularGraphic from '../illustrations/CircularGraphic';
import { LinkButton } from '../ui/Button';
import { photos } from '../../data/photos';

const feedstocks = ['Cáscara de cacao', 'Fibra y residuos de plátano', 'Pseudotallo de plátano', 'Bagazo de yuca'];

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-forest-950 text-white" aria-labelledby="hero-title">
      <HeroLandscape />
      {/* Fotografía real de Tibú sobre el paisaje vectorial, oscurecida para mantener la legibilidad */}
      <img
        src={photos.tibuPaisaje.src}
        alt=""
        width={photos.tibuPaisaje.width}
        height={photos.tibuPaisaje.height}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/55 to-forest-950/20" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-950 to-transparent" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden />

      <div className="container-page relative grid min-h-[100svh] items-center gap-12 pt-28 pb-20 lg:grid-cols-[1.15fr_1fr] lg:pt-32">
        <div>
          <motion.span
            className="eyebrow border-emerald-300/30 bg-emerald-300/10 text-emerald-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MapPin className="size-3.5" aria-hidden /> Tibú · Norte de Santander · Colombia
          </motion.span>

          <motion.p
            className="mt-6 font-display text-lg font-bold tracking-[0.18em] text-sand-100 uppercase sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Catatumbo Circular
          </motion.p>

          <motion.h1
            id="hero-title"
            className="mt-3 text-[2rem] leading-[1.05] font-semibold break-words sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Transformamos residuos agrícolas en{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-sand-200 bg-clip-text text-transparent">
              oportunidades territoriales.
            </span>
          </motion.h1>

          <motion.div
            className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-forest-950/50 p-4 backdrop-blur-sm sm:p-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <p className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">Propuesta de valor</p>
            <p className="mt-1.5 text-sm leading-relaxed text-forest-100/90 sm:text-base">{narrative.propuestaValor}</p>
            <p className="mt-3 flex items-start gap-2 border-t border-white/10 pt-3 text-sm text-forest-100/80">
              <Users className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden />
              <span>
                <strong className="text-white">Comunidad:</strong> familias campesinas y jóvenes rurales de Tibú, Norte de
                Santander.
              </span>
            </p>
          </motion.div>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <LinkButton href="#problema">
              Conocer el proyecto <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </LinkButton>
            <LinkButton href="#propuesta" variant="ghost">
              Explorar nuestras soluciones
            </LinkButton>
            <LinkButton href="#sostenibilidad" variant="ghost">
              Conocer nuestro impacto
            </LinkButton>
          </motion.div>

          <motion.ul
            className="mt-12 flex flex-wrap gap-2"
            aria-label="Residuos agrícolas que buscamos aprovechar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {feedstocks.map((f) => (
              <li key={f} className="rounded-full border border-sand-200/20 bg-sand-200/5 px-3 py-1.5 text-xs font-medium text-sand-100/90">
                {f}
              </li>
            ))}
          </motion.ul>

          <motion.p
            className="mt-6 text-xs text-forest-100/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Iniciativa STEM del programa de Ingeniería de Sistemas · Proyecto en etapa de investigación y validación.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden sm:block"
        >
          <CircularGraphic />
        </motion.div>
      </div>

      <a
        href="#problema"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-white/50 transition hover:text-white md:flex"
        aria-label="Desplazarse a la siguiente sección"
      >
        Desliza
        <ChevronDown className="size-5 animate-bounce" aria-hidden />
      </a>
      <p className="absolute right-4 bottom-4 hidden text-[11px] text-white/40 sm:block">
        Foto: {photos.tibuPaisaje.caption}
      </p>
    </section>
  );
}
