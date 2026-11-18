import { Inbox, ClipboardList, Cog, Factory, GraduationCap, HandCoins, Users, Info, UserRound } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import CenterScene from '../illustrations/CenterScenes';
import PhotoFigure from '../ui/PhotoFigure';
import { photos } from '../../data/photos';
import { BarList, DataTable } from '../charts/Charts';
import { formatNumber } from '../../lib/format';
import { sources } from '../../data/sources';

const functions = [
  { Icon: Inbox, title: 'Recibir biomasa', text: 'Punto de acopio para los residuos que entregan los productores.' },
  { Icon: ClipboardList, title: 'Registrar entregas', text: 'Peso, humedad y código de productor en la plataforma de trazabilidad.' },
  { Icon: Cog, title: 'Procesar residuos', text: 'Trituración y secado solar híbrido de la biomasa.' },
  { Icon: Factory, title: 'Fabricar prototipos', text: 'Conformado de almohadillas y cordones para validación.' },
  { Icon: GraduationCap, title: 'Capacitar', text: 'Formación de jóvenes y familias en operación, calidad y seguridad.' },
  { Icon: HandCoins, title: 'Promover ingresos locales', text: 'Oportunidad de pago por la biomasa entregada, sujeta a acuerdos.' },
];

/** Estructura operativa proyectada en el presupuesto (11 cargos). */
const roles = [
  { label: 'Técnicos de operación y mantenimiento', value: 2 },
  { label: 'Personal de ventas B2B', value: 2 },
  { label: 'Personal de logística', value: 2 },
  { label: 'Capacitadores', value: 2 },
  { label: 'Profesional ambiental', value: 1 },
  { label: 'Ingeniero(a) de sistemas / desarrollador(a)', value: 1 },
  { label: 'Personal administrativo', value: 1 },
];
const rolesTotal = roles.reduce((s, r) => s + r.value, 0);
const daneUrl = sources.find((s) => s.id === 'dane')!.url;

export default function Communities() {
  return (
    <section id="comunidades" className="relative overflow-hidden bg-sand-100 py-24 sm:py-32" aria-labelledby="comunidades-title">
      <div className="container-page">
        <SectionHeader
          id="comunidades-title"
          eyebrow="Centros comunitarios y beneficio social"
          title="El desarrollo productivo comienza en las comunidades."
          description="Los centros comunitarios de procesamiento serían espacios donde familias campesinas y jóvenes de Tibú participen en la recolección, la transformación de la biomasa, la operación de maquinaria, el control de calidad y la gestión productiva."
        />
        <Reveal className="mt-6 flex justify-center">
          <StageBadge stage="meta" label="Modelo de centro proyectado" />
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <PhotoFigure photo={photos.tibuVia} frameClassName="aspect-[3/2] md:aspect-auto md:h-80" />
            <PhotoFigure photo={photos.alcaldia} frameClassName="aspect-[16/9] md:aspect-auto md:h-80" />
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {functions.map(({ Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.05} className="card flex gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest-800 text-emerald-300">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-forest-900">{title}</p>
                <p className="mt-0.5 text-sm text-ink-500">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div className="card h-full p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-forest-900">Estructura operativa proyectada</h3>
                  <p className="mt-1 text-sm text-ink-500">
                    Funciones técnicas, ambientales, administrativas, comerciales, logísticas y de capacitación.
                  </p>
                </div>
                <p className="font-display text-4xl font-bold text-forest-900">
                  {rolesTotal}
                  <span className="ml-1 text-base font-semibold text-ink-500">cargos</span>
                </p>
              </div>
              <div className="mt-6">
                <BarList data={roles} format={(n) => `${n}`} max={2} ariaLabel="Cargos proyectados por función" />
              </div>
              <DataTable
                caption="Cargos proyectados por función"
                headers={['Función', 'Personas']}
                rows={roles.map((r) => [r.label, `${r.value}`])}
                footer={['Total', `${rolesTotal}`]}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-6">
              <div className="overflow-hidden rounded-3xl bg-forest-900 text-white">
                <div className="aspect-[2/1] overflow-hidden">
                  <CenterScene id="operarios" />
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                    <UserRound className="size-4" aria-hidden /> No confundir
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-forest-100/85">
                    Los <strong className="text-white">11 cargos</strong> son una estructura proyectada para operar el
                    piloto y aún no están contratados. El proyecto lo desarrollan hoy{' '}
                    <a href="#equipo" className="font-semibold text-emerald-300 underline-offset-2 hover:underline">
                      tres integrantes del equipo académico
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="card p-6">
                <p className="flex items-center gap-2 font-semibold text-forest-900">
                  <Users className="size-5 text-emerald-600" aria-hidden /> Población objetivo potencial
                </p>
                <p className="mt-2 text-sm text-ink-700">
                  Familias campesinas y jóvenes de Tibú. La cantidad de beneficiarios directos se definirá cuando existan
                  acuerdos, registros y validación comunitaria.
                </p>
                <p className="mt-3 rounded-2xl bg-sand-50 p-3 text-xs leading-relaxed text-ink-500">
                  Contexto: el DANE estima para Tibú una población municipal de{' '}
                  <strong className="text-ink-700">{formatNumber(68802)} habitantes en 2025</strong>. Es una cifra de
                  población total, no de personas vinculadas o atendidas por el proyecto.{' '}
                  <a href={daneUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-forest-800 hover:underline">
                    Ver proyecciones del DANE
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <p className="mx-auto flex max-w-4xl items-start gap-3 rounded-2xl border border-forest-800/15 bg-white/70 p-5 text-sm leading-relaxed text-ink-700">
            <Info className="mt-0.5 size-5 shrink-0 text-forest-700" aria-hidden />
            <span>
              <strong className="text-forest-900">Nota de transparencia.</strong> El diagnóstico inicial se elaboró a
              partir de fuentes secundarias y documentación consultada. La validación directa con productores y
              comunidades rurales está contemplada como una siguiente etapa.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
