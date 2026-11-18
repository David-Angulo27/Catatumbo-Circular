import { Mail, MapPin, Phone, Instagram, Linkedin, Facebook, Youtube, type LucideIcon } from 'lucide-react';
import Logo from './Logo';
import { navLinks, extraLinks, siteConfig } from '../../config/site';

const socialIcons: Record<string, LucideIcon> = {
  Instagram,
  LinkedIn: Linkedin,
  Facebook,
  YouTube: Youtube,
};

export default function Footer() {
  const { contact, social, location } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-forest-100/70">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            Catatumbo Circular es una iniciativa STEM del programa de Ingeniería de Sistemas que integra bioeconomía,
            economía circular, ingeniería y tecnología para aprovechar residuos agrícolas de Tibú y desarrollar materiales
            absorbentes de hidrocarburos, actualmente en fase de investigación y validación.
          </p>
          <p className="mt-6 font-display text-lg text-white">“{siteConfig.tagline}”</p>
        </div>

        <nav aria-label="Secciones">
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Navegación</h3>
          <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
            {[...navLinks, ...extraLinks].map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="transition hover:text-emerald-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
              {location}
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="hover:text-emerald-300">
                  {contact.email}
                </a>
              ) : (
                <a href="#participa" className="hover:text-emerald-300">
                  Escríbenos mediante el formulario
                </a>
              )}
            </li>
            {contact.phone && (
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-emerald-300">
                  {contact.phone}
                </a>
              </li>
            )}
          </ul>
          <ul className="mt-6 flex gap-2" aria-label="Redes sociales">
            {social.map((s) => {
              const Icon = socialIcons[s.label] ?? Mail;
              const configured = Boolean(s.href);
              return (
                <li key={s.label}>
                  {configured ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-emerald-400 hover:text-emerald-300"
                    >
                      <Icon className="size-4" />
                    </a>
                  ) : (
                    <span
                      title={`${s.label}: enlace por configurar`}
                      aria-label={`${s.label}: enlace por configurar`}
                      className="grid size-10 place-items-center rounded-full border border-dashed border-white/15 text-white/35"
                    >
                      <Icon className="size-4" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Catatumbo Circular. Todos los derechos reservados.</p>
          <p className="text-white/40">
            Productos y plataforma en etapa de desarrollo. Los datos de las demostraciones son ficticios. Íconos de los
            ODS: Naciones Unidas (uso informativo, sin aval).
          </p>
        </div>
      </div>
    </footer>
  );
}
