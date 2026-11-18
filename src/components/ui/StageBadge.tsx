import { FlaskConical, Target, Sparkles, MonitorPlay, FileCheck2, Hourglass } from 'lucide-react';

export type Stage = 'validacion' | 'meta' | 'concepto' | 'demo' | 'documentado' | 'pendiente';

const styles: Record<Stage, { label: string; cls: string; Icon: typeof FlaskConical }> = {
  documentado: { label: 'Dato documentado', cls: 'bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/25', Icon: FileCheck2 },
  meta: { label: 'Meta proyectada', cls: 'bg-sky-50 text-sky-800 ring-1 ring-inset ring-sky-600/25', Icon: Target },
  pendiente: {
    label: 'Resultado experimental pendiente',
    cls: 'border border-dashed border-amber-600/70 bg-amber-50 text-amber-900',
    Icon: Hourglass,
  },
  validacion: { label: 'En validación', cls: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-600/20', Icon: FlaskConical },
  concepto: { label: 'Concepto', cls: 'bg-violet-100 text-violet-800 ring-1 ring-inset ring-violet-600/20', Icon: Sparkles },
  demo: { label: 'Demostración · datos ficticios', cls: 'bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-600/20', Icon: MonitorPlay },
};

/** Etiqueta que diferencia datos documentados, metas, pendientes, desarrollos y demostraciones. */
export default function StageBadge({ stage, label }: { stage: Stage; label?: string }) {
  const s = styles[stage];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.cls}`}
    >
      <s.Icon className="size-3.5 shrink-0" aria-hidden />
      {label ?? s.label}
    </span>
  );
}

/** Leyenda de los tres tipos de dato. */
export function DataLegend({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Tipos de dato">
      <StageBadge stage="documentado" />
      <StageBadge stage="meta" />
      <StageBadge stage="pendiente" />
    </div>
  );
}
