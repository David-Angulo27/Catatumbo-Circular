import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { singleSeries } from '../../data/charts';

export interface Datum {
  label: string;
  value: number;
  color?: string;
  /** Texto del valor mostrado (si no, se usa `format`). */
  display?: string;
}

/**
 * Barras horizontales con etiqueta directa del valor y realce al pasar el cursor.
 * Una sola serie usa un único color; el título de la tarjeta nombra la serie.
 */
export function BarList({
  data,
  format,
  max,
  ariaLabel,
}: {
  data: Datum[];
  format: (n: number) => string;
  max?: number;
  ariaLabel: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const top = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="space-y-3" aria-label={ariaLabel}>
      {data.map((d, i) => {
        const pct = (d.value / top) * 100;
        const dim = hover !== null && hover !== i;
        return (
          <li
            key={d.label}
            className="group"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            title={`${d.label}: ${d.display ?? format(d.value)}`}
          >
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-ink-700">{d.label}</span>
              <span className="font-semibold text-forest-900 tabular-nums">{d.display ?? format(d.value)}</span>
            </div>
            <div className="mt-1.5 h-2.5 rounded-full bg-sand-100">
              <motion.div
                className="h-full rounded-full transition-opacity"
                style={{ backgroundColor: d.color ?? singleSeries, opacity: dim ? 0.35 : 1 }}
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.max(pct, 0.8)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Barra apilada (parte de un todo) con separación de 2 px entre segmentos,
 * leyenda y etiquetas directas.
 */
export function StackedBar({
  data,
  format,
  ariaLabel,
  height = 'h-12',
  legendClass = 'sm:grid-cols-2 lg:grid-cols-3',
}: {
  data: Datum[];
  format: (n: number) => string;
  ariaLabel: string;
  height?: string;
  /** Columnas de la leyenda (p. ej. 'sm:grid-cols-2' para 4 elementos). */
  legendClass?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <figure aria-label={ariaLabel}>
      <div className={`relative flex w-full gap-[2px] overflow-hidden rounded-xl ${height}`}>
        {data.map((d, i) => {
          const pct = (d.value / total) * 100;
          return (
            <motion.div
              key={d.label}
              className="relative h-full first:rounded-l-xl last:rounded-r-xl"
              style={{ backgroundColor: d.color, opacity: hover !== null && hover !== i ? 0.4 : 1 }}
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              title={`${d.label}: ${d.display ?? format(d.value)} (${((d.value / total) * 100).toFixed(1).replace('.', ',')} %)`}
            />
          );
        })}
      </div>
      <figcaption className={`mt-4 grid gap-2 ${legendClass}`}>
        {data.map((d, i) => (
          <div
            key={d.label}
            className={`flex items-start gap-2.5 rounded-xl p-2 transition ${hover === i ? 'bg-sand-100' : ''}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="mt-1 size-3 shrink-0 rounded-sm" style={{ backgroundColor: d.color }} aria-hidden />
            <span className="text-sm leading-tight">
              <span className="block text-ink-700">{d.label}</span>
              <span className="font-semibold text-forest-900 tabular-nums">{d.display ?? format(d.value)}</span>
              <span className="ml-1.5 text-xs text-ink-500 tabular-nums">
                {((d.value / total) * 100).toFixed(1).replace('.', ',')} %
              </span>
            </span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}

/** Medidor simple de un porcentaje (p. ej., imprevistos sobre el subtotal). */
export function Meter({ value, label, caption }: { value: number; label: string; caption?: ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-ink-700">{label}</span>
        <span className="font-semibold text-forest-900 tabular-nums">{(value * 100).toFixed(0)} %</span>
      </div>
      <div
        className="mt-2 h-3 rounded-full bg-sand-100"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-label={label}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: singleSeries }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
      </div>
      {caption && <p className="mt-2 text-xs text-ink-500">{caption}</p>}
    </div>
  );
}

/** Vista de tabla desplegable para cualquier gráfico (accesibilidad). */
export function DataTable({
  caption,
  headers,
  rows,
  footer,
}: {
  caption: string;
  headers: [string, string];
  rows: [string, string][];
  footer?: [string, string];
}) {
  return (
    <details className="group mt-5 rounded-2xl border border-forest-800/10 bg-sand-50/60 text-sm">
      <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-forest-800 select-none marker:hidden">
        <span className="group-open:hidden">Ver tabla de datos</span>
        <span className="hidden group-open:inline">Ocultar tabla de datos</span>
      </summary>
      <div className="overflow-x-auto px-4 pb-4">
        <table className="w-full min-w-[280px] text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-forest-800/10 text-xs text-ink-500">
              <th scope="col" className="py-2 font-semibold">{headers[0]}</th>
              <th scope="col" className="py-2 text-right font-semibold">{headers[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b]) => (
              <tr key={a} className="border-b border-forest-800/5">
                <td className="py-2 text-ink-700">{a}</td>
                <td className="py-2 text-right text-forest-900 tabular-nums">{b}</td>
              </tr>
            ))}
          </tbody>
          {footer && (
            <tfoot>
              <tr className="font-semibold text-forest-900">
                <td className="pt-2">{footer[0]}</td>
                <td className="pt-2 text-right tabular-nums">{footer[1]}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </details>
  );
}
