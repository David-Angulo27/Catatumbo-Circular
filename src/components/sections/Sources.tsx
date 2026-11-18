import { ExternalLink, Library, Image as ImageIcon, Bot } from 'lucide-react';
import { photoCredits, otherCredits, aiDeclaration } from '../../data/credits';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { sources, sourceCategories, type SourceCategory } from '../../data/sources';

function Apa({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>))}
    </>
  );
}

const order: SourceCategory[] = ['territorio', 'ciencia', 'institucional', 'precios'];

export default function Sources() {
  let n = 0;
  return (
    <section id="fuentes" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="fuentes-title">
      <div className="container-page">
        <SectionHeader
          id="fuentes-title"
          eyebrow="Fuentes y referencias"
          title="Fuentes que respaldan nuestro proyecto."
          description="Referencias en formato APA 7 con enlace a cada fuente original, créditos de las imágenes y declaración de uso de inteligencia artificial."
        />

        <div className="mx-auto mt-14 max-w-4xl space-y-10">
          {order.map((cat) => {
            const items = sources.filter((s) => s.category === cat);
            return (
              <Reveal key={cat}>
                <h3 id={cat === 'precios' ? 'fuentes-precios' : undefined} className="flex items-center gap-2 text-lg font-semibold text-forest-900">
                  <Library className="size-5 text-emerald-600" aria-hidden /> {sourceCategories[cat]}
                </h3>
                {cat === 'precios' && (
                  <p className="mt-1 text-sm text-ink-500">
                    Referencias de proveedores consultadas el 22 de octubre de 2026. No son cotizaciones definitivas.
                  </p>
                )}
                <ol className="mt-4 space-y-3">
                  {items.map((s) => {
                    n += 1;
                    return (
                      <li key={s.id} className="flex gap-4 rounded-2xl border border-forest-800/10 p-4 transition hover:border-emerald-500/40 sm:p-5">
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sand-100 text-sm font-bold text-forest-800">{n}</span>
                        <div className="min-w-0">
                          <p className="pl-6 -indent-6 text-sm leading-relaxed text-ink-800">
                            <Apa text={s.apa} />{' '}
                            {s.accessed && <span className="text-ink-500">Recuperado el {s.accessed}, de </span>}
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-all text-forest-800 underline decoration-forest-800/30 underline-offset-2 hover:text-emerald-600">
                              {s.url.length > 90 ? `${s.url.slice(0, 87)}…` : s.url}
                            </a>
                          </p>
                          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                            <span>Uso en el sitio: {s.usedFor}</span>
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-forest-800 hover:text-emerald-600">
                              Abrir fuente <ExternalLink className="size-3" aria-hidden />
                            </a>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </Reveal>
            );
          })}

          {/* Créditos de las imágenes */}
          <Reveal>
            <h3 id="creditos-imagenes" className="flex items-center gap-2 text-lg font-semibold text-forest-900">
              <ImageIcon className="size-5 text-emerald-600" aria-hidden /> Créditos de las imágenes
            </h3>
            <p className="mt-1 text-sm text-ink-500">
              Las fotografías se usan como imágenes de referencia con fines académicos. Los derechos pertenecen a sus autores.
            </p>
            <ul className="mt-4 divide-y divide-forest-800/10 rounded-2xl border border-forest-800/10">
              {[...photoCredits, ...otherCredits].map((c) => (
                <li key={c.title} className="flex flex-col gap-1 p-4 text-sm sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <p className="text-ink-800">{c.title}</p>
                    <p className="text-xs text-ink-500">Sección: {c.where}</p>
                  </div>
                  <p className="shrink-0 text-xs sm:max-w-[45%] sm:text-right">
                    {c.source ? (
                      c.url ? (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest-800 hover:text-emerald-600 hover:underline">
                          {c.source}
                        </a>
                      ) : (
                        <span className="text-ink-700">{c.source}</span>
                      )
                    ) : (
                      <span className="italic text-ink-500">Fuente por confirmar</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Declaración de uso de IA */}
          <Reveal>
            <div id="declaracion-ia" className="rounded-3xl border-2 border-forest-800/15 bg-sand-50 p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-forest-900">
                <Bot className="size-5 text-emerald-600" aria-hidden /> Declaración de uso de inteligencia artificial
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                En la elaboración de este sitio se utilizó la herramienta de IA generativa{' '}
                <strong className="text-forest-900">{aiDeclaration.tool}</strong> para:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-ink-700">
                {aiDeclaration.uses.map((u) => (
                  <li key={u} className="flex gap-2">
                    <span className="text-emerald-600" aria-hidden>•</span> {u}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-forest-900">No se utilizó para:</p>
              <ul className="mt-1 space-y-1 text-sm text-ink-700">
                {aiDeclaration.notUsed.map((u) => (
                  <li key={u} className="flex gap-2">
                    <span className="text-earth-500" aria-hidden>•</span> {u}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-2xl bg-white p-4 text-sm leading-relaxed text-ink-700">{aiDeclaration.responsibility}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
