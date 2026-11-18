import { BookOpen, ExternalLink, AlertCircle } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import { sources } from '../../data/sources';

const study = sources.find((s) => s.id === 'vera-2025')!;

const findings = [
  { value: '2,17 – 8,22', unit: 'g/g', text: 'Capacidad de absorción de aceite de motor en pruebas estáticas de corto plazo.' },
  { value: '6,61 y 6,26', unit: 'g/g', text: 'Capacidad para diésel y gasolina, respectivamente, en residuos de raquis de banano tratados.' },
  { value: '> 90', unit: '%', text: 'Flotabilidad en determinadas pruebas dinámicas con residuos de hojas de banano tratados.' },
];

/** Renderiza *cursiva* de la referencia APA. */
function Apa({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : <span key={i}>{part}</span>))}
    </>
  );
}

export default function Science() {
  return (
    <section id="ciencia" className="relative overflow-hidden bg-white py-24 sm:py-28" aria-labelledby="ciencia-title">
      <div className="container-page">
        <SectionHeader
          id="ciencia-title"
          eyebrow="Respaldo científico"
          title="Investigación que inspira nuestra innovación"
          description="Un estudio revisado por pares evaluó materiales absorbentes elaborados con residuos agroindustriales de banano, arroz y cacao."
        />

        <Reveal className="mt-12">
          <article className="card overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-forest-800/10 bg-sand-50 p-6 sm:flex-row sm:items-start sm:p-8">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-800 text-emerald-300">
                <BookOpen className="size-6" aria-hidden />
              </span>
              <div>
                <p className="text-sm leading-relaxed text-ink-700">
                  <Apa text={study.apa} />
                </p>
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 hover:text-emerald-600"
                >
                  DOI: 10.15446/acag.v72n2.111928 <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <StageBadge stage="documentado" label="Resultados del estudio citado (no de Catatumbo Circular)" />
              </div>
              <ul className="mt-6 grid gap-4 md:grid-cols-3">
                {findings.map((f) => (
                  <li key={f.text} className="rounded-2xl border border-forest-800/10 p-5">
                    <p className="font-display text-3xl font-bold text-forest-900">
                      {f.value} <span className="text-lg text-ink-500">{f.unit}</span>
                    </p>
                    <p className="mt-2 text-sm text-ink-500">{f.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-start gap-2 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                Estos valores pertenecen al estudio citado. Sus materiales recibieron tratamientos y condiciones
                experimentales específicas, por lo que no demuestran la eficacia de los prototipos de Catatumbo Circular.
              </p>
              <p className="mt-4 font-display text-lg font-medium text-forest-900">
                “Catatumbo Circular toma estos antecedentes como referencia para orientar su investigación y desarrollar
                ensayos propios con las materias primas disponibles en Tibú.”
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
