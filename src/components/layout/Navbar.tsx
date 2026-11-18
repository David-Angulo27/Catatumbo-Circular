import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '../../config/site';

/** Mapa sección → enlace de navegación al que pertenece. */
const sectionToLink = new Map<string, string>();
navLinks.forEach((l) => {
  sectionToLink.set(l.id, l.id);
  l.also?.forEach((s) => sectionToLink.set(s, l.id));
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Resalta el grupo de la sección visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const link = sectionToLink.get(e.target.id);
          if (link) setActive(link);
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sectionToLink.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-white/10 bg-forest-950/85 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8" aria-label="Principal">
        <a href="#inicio" aria-label="Catatumbo Circular, ir al inicio" onClick={() => setOpen(false)} className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                title={l.label}
                aria-current={active === l.id ? 'true' : undefined}
                className={`rounded-full px-2.5 py-2 text-[13px] font-medium whitespace-nowrap transition 2xl:px-3.5 2xl:text-sm ${
                  active === l.id ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {l.short}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#participa"
            className="hidden rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-emerald-400 sm:inline-flex"
          >
            Participa
          </a>
          <button
            type="button"
            className="rounded-full p-2 text-white transition hover:bg-white/10 xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-forest-950 xl:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="container-page flex flex-col gap-0.5 py-6">
              {[...navLinks, { id: 'participa', label: 'Participa', short: 'Participa' }].map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 rounded-2xl px-4 py-3 font-display text-xl font-medium transition hover:bg-white/5 hover:text-emerald-300 ${
                      active === l.id ? 'text-emerald-300' : 'text-white/90'
                    }`}
                  >
                    <span className="w-6 text-sm text-white/35 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
