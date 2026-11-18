import { Fuel, Factory, Wrench, Recycle, Truck, ShieldAlert, PackageCheck, Cog, Info } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Marketplace from '../tech/Marketplace';

const segments = [
  { Icon: Fuel, label: 'Empresas petroleras' },
  { Icon: Factory, label: 'Empresas industriales' },
  { Icon: Wrench, label: 'Empresas de mantenimiento' },
  { Icon: Recycle, label: 'Empresas de gestión ambiental' },
  { Icon: Truck, label: 'Distribuidores de insumos industriales' },
];

const applications = [
  { Icon: Wrench, title: 'Mantenimiento preventivo', text: 'Control de goteos y fugas en talleres, plantas y bodegas.' },
  { Icon: ShieldAlert, title: 'Control y contención de hidrocarburos', text: 'Material disponible para escenarios compatibles.' },
  { Icon: PackageCheck, title: 'Kits de respuesta', text: 'Combinaciones de almohadillas y cordones para atender incidentes.' },
  { Icon: Cog, title: 'Aplicaciones industriales compatibles', text: 'Usos que se definan tras la validación técnica.' },
];

export default function BusinessModel() {
  return (
    <section id="modelo" className="relative overflow-hidden bg-forest-950 py-24 text-white sm:py-32" aria-labelledby="modelo-title">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute top-0 -left-40 size-[500px] rounded-full bg-emerald-500/15 blur-3xl" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          id="modelo-title"
          tone="dark"
          eyebrow="Modelo de negocio y Marketplace B2B"
          title="Economía circular conectada con la industria."
          description="El modelo comercial propone conectar los bioproductos con empresas que requieren absorción y control de hidrocarburos. La demanda y los precios todavía deben validarse."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="text-sm font-semibold tracking-wider text-emerald-300 uppercase">Clientes potenciales</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {segments.map(({ Icon, label }) => (
                  <li key={label} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-forest-900/60 p-4 text-sm transition hover:border-emerald-300/40">
                    <Icon className="mt-0.5 size-5 shrink-0 text-emerald-300" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-gradient-to-br from-emerald-500 to-forest-500 p-[1px]">
              <div className="h-full rounded-[calc(1.5rem-1px)] bg-forest-900 p-8">
                <h3 className="text-sm font-semibold tracking-wider text-emerald-300 uppercase">Aplicaciones comerciales potenciales</h3>
                <p className="mt-3 text-sm text-forest-100/80">
                  El modelo propone diversificar los usos para que la demanda no dependa solo de la ocurrencia de derrames.
                </p>
                <ul className="mt-6 space-y-3">
                  {applications.map(({ Icon, title, text }) => (
                    <li key={title} className="flex gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-300">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <p className="font-semibold">{title}</p>
                        <p className="text-sm text-forest-100/70">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <Marketplace />
        </Reveal>

        <Reveal className="mt-6">
          <p className="mx-auto flex max-w-4xl items-start gap-3 text-sm text-forest-100/70">
            <Info className="mt-0.5 size-5 shrink-0 text-emerald-300" aria-hidden />
            No existen clientes, ventas ni alianzas confirmadas. El marketplace es una demostración del canal comercial
            que se implementaría después de validar los productos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
