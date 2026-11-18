import { Monitor, Server, Database, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import StageBadge from '../ui/StageBadge';
import TraceabilityDemo from '../tech/TraceabilityDemo';

const architecture = [
  { Icon: Cpu, title: 'Sensores de humedad', text: 'Kits Arduino + Python en el secado (en desarrollo).', status: 'Propuesto' },
  { Icon: Monitor, title: 'Aplicación web', text: 'Registro de entregas, vista administrativa y marketplace (esta demostración).', status: 'Demostración' },
  { Icon: Server, title: 'API de servicios', text: 'Interfaz de trazabilidad lista para conectarse a un backend.', status: 'Preparado' },
  { Icon: Database, title: 'Base de datos en la nube', text: 'Productores, lotes, inventario y clientes (servidor presupuestado).', status: 'Futuro' },
];

export default function Technology() {
  return (
    <section id="tecnologia" className="relative overflow-hidden bg-white py-24 sm:py-32" aria-labelledby="tecnologia-title">
      <div className="bg-grid-dark absolute inset-x-0 top-0 h-96 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          id="tecnologia-title"
          eyebrow="Tecnología · Smart Catatumbo"
          title={
            <>
              La tecnología conecta <span className="text-emerald-600">el campo con la industria</span>
            </>
          }
          description="Una plataforma digital para registrar el origen y el procesamiento de la biomasa, organizar los pagos a productores y gestionar la comercialización B2B. Prueba la demostración: registra un lote y síguelo hasta el lote final."
        />

        <Reveal className="mt-6 flex justify-center">
          <StageBadge stage="concepto" label="Plataforma en diseño · demostración funcional sin backend" />
        </Reveal>

        {/* Arquitectura */}
        <Reveal className="mt-12">
          <ol className="grid gap-3 md:grid-cols-4" aria-label="Arquitectura de la plataforma">
            {architecture.map(({ Icon, title, text, status }, i) => (
              <li key={title} className="relative rounded-2xl border border-forest-800/10 bg-sand-50 p-5">
                <div className="flex items-center justify-between">
                  <Icon className="size-6 text-forest-700" aria-hidden />
                  <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-ink-500 ring-1 ring-forest-800/10">{status}</span>
                </div>
                <p className="mt-3 font-semibold text-forest-900">{title}</p>
                <p className="mt-1 text-sm text-ink-500">{text}</p>
                {i < architecture.length - 1 && (
                  <ArrowRight className="absolute top-1/2 -right-3 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-white text-forest-800/40 md:block" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-10">
          <TraceabilityDemo />
        </Reveal>

        <Reveal className="mt-6">
          <p className="mx-auto flex max-w-4xl items-start gap-3 text-sm text-ink-500">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
            Protección de datos: los productores se identifican con códigos y la plataforma real deberá informar la
            finalidad del tratamiento y obtener las autorizaciones que exige la Ley 1581 de 2012.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
