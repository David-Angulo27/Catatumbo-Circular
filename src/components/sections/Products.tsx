import { useState } from 'react';
import { ArrowUpRight, Leaf, Target, ListChecks, MessageSquare, FlaskConical, Info } from 'lucide-react';
import PhotoFigure from '../ui/PhotoFigure';
import { photos } from '../../data/photos';
import UsedAbsorbents from './UsedAbsorbents';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';
import ProductArt from '../illustrations/ProductArt';
import { products, type Product } from '../../data/products';
import { useContact } from '../../context/ContactContext';

export default function Products() {
  const [selected, setSelected] = useState<Product | null>(null);
  const { openContact } = useContact();

  return (
    <section id="productos" className="relative bg-sand-100 py-24 sm:py-32" aria-labelledby="productos-title">
      <div className="container-page">
        <SectionHeader
          id="productos-title"
          eyebrow="Nuestros productos"
          title="Una línea de bioproductos en desarrollo"
          description="Cuatro productos que buscamos desarrollar a partir de biomasa agrícola del Catatumbo. Son propuestas y prototipos proyectados: ninguno ha sido ensayado, certificado ni comercializado todavía."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article className="card group flex h-full flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-sand-100 via-white to-forest-50">
                  <ProductArt id={p.id} className="h-full w-full transition duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <StageBadge stage="validacion" label={p.stage} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-wider text-earth-500 uppercase">{p.short}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-forest-900">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{p.description}</p>

                  <dl className="mt-5 space-y-3 border-t border-forest-800/10 pt-5 text-sm">
                    <div>
                      <dt className="flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                        <Leaf className="size-3.5" aria-hidden /> Materia prima
                      </dt>
                      <dd className="mt-0.5 text-ink-700">{p.feedstock.join(' · ')}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                        <Target className="size-3.5" aria-hidden /> Aplicación propuesta
                      </dt>
                      <dd className="mt-0.5 text-ink-700">{p.application}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                        <FlaskConical className="size-3.5" aria-hidden /> Estado de desarrollo
                      </dt>
                      <dd className="mt-0.5 text-ink-700">{p.stageDetail}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className="mt-6 inline-flex items-center justify-between rounded-full border border-forest-800/15 px-5 py-2.5 text-sm font-semibold text-forest-800 transition group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-forest-950"
                  >
                    Conocer producto
                    <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-ink-500">
          Las imágenes son representaciones conceptuales. Ningún producto se encuentra certificado ni comercializado, y no
          se afirma su biodegradabilidad ni un menor costo frente a absorbentes sintéticos: ambas condiciones requieren
          ensayos y comparaciones verificables.
        </p>

        {/* Referentes de mercado: absorbentes comerciales de terceros */}
        <Reveal className="mt-14">
          <div className="card grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <span className="eyebrow">Referentes de mercado</span>
              <h3 className="mt-4 text-2xl font-semibold text-forest-900">Con qué se compararía el BioGranulado</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                Ya existen absorbentes orgánicos comerciales para hidrocarburos, elaborados con turba o fibras vegetales.
                Sirven como referencia de presentación y desempeño para los ensayos comparativos que planteamos con
                biomasa del Catatumbo.
              </p>
              <p className="mt-4 flex gap-2 rounded-2xl bg-sand-50 p-3 text-xs leading-relaxed text-ink-500">
                <Info className="mt-0.5 size-4 shrink-0 text-earth-500" aria-hidden />
                Productos de otras marcas, mostrados solo como referencia. No son productos de Catatumbo Circular ni
                implican relación con sus fabricantes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <PhotoFigure photo={photos.granuladoTurba} fit="contain" frameClassName="aspect-square border border-forest-800/10" />
              <PhotoFigure photo={photos.granuladoFibra} fit="contain" frameClassName="aspect-square border border-forest-800/10" />
            </div>
          </div>
        </Reveal>

        <UsedAbsorbents />
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)} title={selected?.name ?? 'Producto'}>
        {selected && (
          <div>
            <div className="aspect-[16/8] bg-gradient-to-br from-sand-100 via-white to-forest-50">
              <ProductArt id={selected.id} className="h-full w-full" />
            </div>
            <div className="p-6 sm:p-8">
              <StageBadge stage="validacion" label={selected.stage} />
              <h3 className="mt-3 text-3xl font-semibold text-forest-900">{selected.name}</h3>
              <p className="mt-2 text-ink-500">{selected.description}</p>
              <p className="mt-2 text-sm text-ink-700">{selected.stageDetail}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-sand-50 p-4">
                  <p className="text-xs font-semibold text-forest-700">Materia prima</p>
                  <ul className="mt-2 space-y-1 text-sm text-ink-700">
                    {selected.feedstock.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-sand-50 p-4">
                  <p className="text-xs font-semibold text-forest-700">Aplicación propuesta</p>
                  <p className="mt-2 text-sm text-ink-700">{selected.application}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-forest-800/10 p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                  <ListChecks className="size-4" aria-hidden /> Próximos pasos de desarrollo
                </p>
                <ol className="mt-2 space-y-1.5 text-sm text-ink-700">
                  {selected.nextSteps.map((s, i) => (
                    <li key={s} className="flex gap-2">
                      <span className="font-semibold text-emerald-600">{i + 1}.</span> {s}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => {
                    const name = selected.name;
                    setSelected(null);
                    openContact({
                      interest: 'Empresa / cliente industrial',
                      message: `Me interesa conocer el avance de desarrollo de ${name} y participar en pruebas piloto.`,
                    });
                  }}
                >
                  <MessageSquare className="size-4" aria-hidden /> Me interesa este producto
                </Button>
                <Button variant="light" onClick={() => setSelected(null)}>
                  Volver al catálogo
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
