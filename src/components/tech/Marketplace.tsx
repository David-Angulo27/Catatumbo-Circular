import { useMemo, useState } from 'react';
import { Store, Filter, Eye, Plus, Trash2, FileText, Leaf, Target, FlaskConical, Minus } from 'lucide-react';
import ProductArt from '../illustrations/ProductArt';
import StageBadge from '../ui/StageBadge';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';
import { products, productUses, type Product, type ProductLine } from '../../data/products';
import { useContact } from '../../context/ContactContext';

interface QuoteItem {
  key: string;
  product: Product;
  presentation: string;
  qty: number;
}

const lineLabels: Record<ProductLine | 'todas', string> = {
  todas: 'Todas las líneas',
  bioabsorbente: 'Bioabsorbentes',
  compost: 'Compost',
};

/** Marketplace B2B demostrativo: catálogo, filtros, fichas y preparación de solicitudes de cotización. */
export default function Marketplace() {
  const { openContact } = useContact();
  const [line, setLine] = useState<ProductLine | 'todas'>('todas');
  const [use, setUse] = useState<string>('todas');
  const [sheet, setSheet] = useState<Product | null>(null);
  const [quote, setQuote] = useState<QuoteItem[]>([]);

  const visible = useMemo(
    () => products.filter((p) => (line === 'todas' || p.line === line) && (use === 'todas' || p.uses.includes(use))),
    [line, use],
  );

  const add = (p: Product, presentation = p.presentations[0]) => {
    const key = `${p.id}-${presentation}`;
    setQuote((q) => (q.some((i) => i.key === key) ? q.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i)) : [...q, { key, product: p, presentation, qty: 1 }]));
  };
  const setQty = (key: string, qty: number) => setQuote((q) => q.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(9999, qty)) } : i)));
  const remove = (key: string) => setQuote((q) => q.filter((i) => i.key !== key));
  /** Cambia la presentación; si ya existe esa combinación, suma las cantidades. */
  const changePresentation = (item: QuoteItem, presentation: string) =>
    setQuote((q) => {
      const key = `${item.product.id}-${presentation}`;
      const rest = q.filter((x) => x.key !== item.key);
      const existing = rest.find((x) => x.key === key);
      return existing
        ? rest.map((x) => (x.key === key ? { ...x, qty: x.qty + item.qty } : x))
        : q.map((x) => (x.key === item.key ? { ...x, presentation, key } : x));
    });

  const submitQuote = () => {
    const lines = quote.map((i) => `- ${i.product.name} · ${i.presentation} · cantidad: ${i.qty}`).join('\n');
    openContact({
      interest: 'Información comercial',
      message: `Solicitud de cotización preliminar (marketplace demostrativo):\n${lines}\n\nEntiendo que los productos están en desarrollo y que las condiciones dependerán de su validación técnica.`,
    });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white text-ink-800 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-800/10 bg-sand-50 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-forest-800 text-emerald-300">
            <Store className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">Módulo B</p>
            <h3 className="text-lg font-semibold text-forest-900">Marketplace B2B</h3>
          </div>
        </div>
        <StageBadge stage="concepto" label="Modelo comercial en desarrollo · sin ventas reales" />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3 border-b border-forest-800/10 px-5 py-4 sm:px-8" role="group" aria-label="Filtros del catálogo">
        <Filter className="size-4 text-ink-500" aria-hidden />
        <select className="field w-auto py-2" value={line} onChange={(e) => setLine(e.target.value as ProductLine | 'todas')} aria-label="Filtrar por línea de producto">
          {Object.entries(lineLabels).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <select className="field w-auto py-2" value={use} onChange={(e) => setUse(e.target.value)} aria-label="Filtrar por aplicación">
          <option value="todas">Todas las aplicaciones</option>
          {productUses.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
        <span className="text-xs text-ink-500" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_minmax(0,320px)]">
        {/* Catálogo */}
        <ul className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
          {visible.map((p) => (
            <li key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-forest-800/10">
              <div className="relative aspect-[16/9] bg-gradient-to-br from-sand-100 via-white to-forest-50">
                <ProductArt id={p.id} className="h-full w-full" />
                <div className="absolute top-2 left-2">
                  <StageBadge stage="validacion" label={p.stage} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="font-semibold text-forest-900">
                  {p.name} <span className="text-xs font-normal text-ink-500">· {p.short}</span>
                </p>
                <p className="mt-1 text-xs text-ink-500">{p.uses.join(' · ')}</p>
                <p className="mt-2 text-xs font-medium text-ink-700">Precio: a cotizar tras la validación</p>
                <div className="mt-auto flex gap-2 pt-4">
                  <button type="button" onClick={() => setSheet(p)} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-forest-800/15 px-3 py-2 text-xs font-semibold text-forest-800 transition hover:border-emerald-500">
                    <Eye className="size-3.5" aria-hidden /> Ver ficha
                  </button>
                  <button type="button" onClick={() => add(p)} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-3 py-2 text-xs font-semibold text-forest-950 transition hover:bg-emerald-400">
                    <Plus className="size-3.5" aria-hidden /> Agregar
                  </button>
                </div>
              </div>
            </li>
          ))}
          {visible.length === 0 && <li className="col-span-full py-10 text-center text-sm text-ink-500">No hay productos con estos filtros.</li>}
        </ul>

        {/* Solicitud de cotización */}
        <aside className="border-t border-forest-800/10 bg-sand-50 p-5 sm:p-7 lg:border-t-0 lg:border-l" aria-labelledby="cotizacion-title">
          <h4 id="cotizacion-title" className="flex items-center gap-2 font-semibold text-forest-900">
            <FileText className="size-5 text-emerald-600" aria-hidden /> Solicitud de cotización
          </h4>
          {quote.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed border-forest-800/20 p-5 text-center text-sm text-ink-500">
              Agrega productos del catálogo para preparar una solicitud.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {quote.map((i) => (
                <li key={i.key} className="rounded-2xl bg-white p-3 ring-1 ring-forest-800/10">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-forest-900">{i.product.name}</p>
                      <select
                        className="mt-1 rounded-lg border border-forest-800/15 bg-white px-2 py-1 text-xs"
                        value={i.presentation}
                        aria-label={`Presentación de ${i.product.name}`}
                        onChange={(e) => changePresentation(i, e.target.value)}
                      >
                        {i.product.presentations.map((pr) => (
                          <option key={pr}>{pr}</option>
                        ))}
                      </select>
                    </div>
                    <button type="button" onClick={() => remove(i.key)} className="rounded-full p-1.5 text-ink-500 transition hover:bg-rose-50 hover:text-rose-700" aria-label={`Quitar ${i.product.name}`}>
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button type="button" onClick={() => setQty(i.key, i.qty - 1)} className="grid size-7 place-items-center rounded-full ring-1 ring-forest-800/15" aria-label="Disminuir cantidad">
                      <Minus className="size-3.5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={9999}
                      value={i.qty}
                      onChange={(e) => setQty(i.key, Number(e.target.value) || 1)}
                      className="w-16 rounded-lg border border-forest-800/15 px-2 py-1 text-center text-sm tabular-nums"
                      aria-label={`Cantidad de ${i.product.name}`}
                    />
                    <button type="button" onClick={() => setQty(i.key, i.qty + 1)} className="grid size-7 place-items-center rounded-full ring-1 ring-forest-800/15" aria-label="Aumentar cantidad">
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Button className="mt-5 w-full" disabled={quote.length === 0} onClick={submitQuote}>
            Preparar solicitud
          </Button>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-500">
            La solicitud se traslada al formulario de contacto para que la revises antes de enviarla. No genera pedidos,
            precios ni compromisos de entrega.
          </p>
        </aside>
      </div>

      <Modal open={sheet !== null} onClose={() => setSheet(null)} title={sheet ? `Ficha de ${sheet.name}` : 'Ficha de producto'}>
        {sheet && (
          <div>
            <div className="aspect-[16/7] bg-gradient-to-br from-sand-100 via-white to-forest-50">
              <ProductArt id={sheet.id} className="h-full w-full" />
            </div>
            <div className="p-6 sm:p-8">
              <StageBadge stage="validacion" label={sheet.stage} />
              <h3 className="mt-3 text-2xl font-semibold text-forest-900">Ficha técnica preliminar · {sheet.name}</h3>
              <p className="mt-2 text-ink-500">{sheet.description}</p>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-2xl bg-sand-50 p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold text-forest-700"><Leaf className="size-3.5" aria-hidden /> Materias primas</dt>
                  <dd className="mt-1 text-ink-700">{sheet.feedstock.join(' · ')}</dd>
                </div>
                <div className="rounded-2xl bg-sand-50 p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold text-forest-700"><Target className="size-3.5" aria-hidden /> Aplicación potencial</dt>
                  <dd className="mt-1 text-ink-700">{sheet.application}</dd>
                </div>
                <div className="rounded-2xl bg-sand-50 p-4">
                  <dt className="text-xs font-semibold text-forest-700">Presentaciones propuestas</dt>
                  <dd className="mt-1 text-ink-700">{sheet.presentations.join(' · ')} (dimensiones por definir)</dd>
                </div>
                <div className="rounded-2xl bg-sand-50 p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold text-forest-700"><FlaskConical className="size-3.5" aria-hidden /> Desempeño</dt>
                  <dd className="mt-1 text-ink-700">Capacidad de absorción, retención y flotabilidad: pendientes de ensayo.</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => {
                    add(sheet);
                    setSheet(null);
                  }}
                >
                  <Plus className="size-4" aria-hidden /> Agregar a la solicitud
                </Button>
                <Button variant="light" onClick={() => setSheet(null)}>
                  Volver al catálogo
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
