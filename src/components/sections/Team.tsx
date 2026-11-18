import { GraduationCap } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { team } from '../../data/team';

const avatarTones = ['from-forest-700 to-emerald-500', 'from-earth-700 to-earth-400', 'from-ink-900 to-forest-500'];

export default function Team() {
  return (
    <section id="equipo" className="relative overflow-hidden bg-sand-50 py-24 sm:py-32" aria-labelledby="equipo-title">
      <div className="container-page">
        <SectionHeader
          id="equipo-title"
          eyebrow="Equipo de trabajo"
          title="Un equipo de ingeniería para el territorio."
          description="Catatumbo Circular es desarrollado por tres estudiantes del programa de Ingeniería de Sistemas como proyecto académico STEM."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.1} className="card group relative overflow-hidden p-7 text-center">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forest-50 to-transparent" aria-hidden />
              <div className="relative">
                {m.photo ? (
                  <img src={m.photo} alt={`Fotografía de ${m.name}`} className="mx-auto size-24 rounded-full object-cover" />
                ) : (
                  <span
                    className={`mx-auto grid size-24 place-items-center rounded-full bg-gradient-to-br font-display text-3xl font-bold text-white shadow-lg ring-4 ring-white transition duration-500 group-hover:scale-105 ${avatarTones[i % avatarTones.length]}`}
                    aria-hidden
                  >
                    {m.initials}
                  </span>
                )}
                <h3 className="mt-5 text-xl font-semibold text-forest-900">{m.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-500">
                  <GraduationCap className="size-4" aria-hidden /> {m.program}
                </p>
                <div className="mt-5 rounded-2xl bg-sand-50 p-4 text-left">
                  <p className="text-[11px] font-medium text-ink-500">Aporte desde su perfil profesional</p>
                  <p className="mt-0.5 text-xs font-semibold tracking-wider text-emerald-600 uppercase">{m.area}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{m.contribution}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-center text-xs text-ink-500">
          Las áreas describen el aporte académico de cada integrante al proyecto.
        </p>
      </div>
    </section>
  );
}
