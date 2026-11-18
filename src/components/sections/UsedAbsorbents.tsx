import { Ban, PackageX, Microscope, Truck, ShieldAlert } from 'lucide-react';
import Reveal from '../ui/Reveal';

const steps = [
  { Icon: PackageX, title: 'Separar', text: 'Retirar el absorbente usado y mantenerlo aparte de la biomasa limpia.' },
  { Icon: ShieldAlert, title: 'Almacenar con seguridad', text: 'Recipientes cerrados, identificados con su código de lote y bajo techo.' },
  { Icon: Microscope, title: 'Caracterizar', text: 'Determinar qué hidrocarburo contiene y en qué cantidad antes de decidir su destino.' },
  { Icon: Truck, title: 'Gestionar adecuadamente', text: 'Entrega a un gestor autorizado cuando corresponda, según la normativa ambiental aplicable.' },
];

/** Gestión responsable de absorbentes que estuvieron en contacto con hidrocarburos. */
export default function UsedAbsorbents() {
  return (
    <Reveal className="mt-14">
      <div className="overflow-hidden rounded-3xl border-2 border-earth-500/30 bg-white">
        <div className="grid gap-0 lg:grid-cols-[1fr_1.6fr]">
          <div className="bg-earth-700 p-7 text-white sm:p-9">
            <Ban className="size-9 text-sand-200" aria-hidden />
            <h3 className="mt-4 text-2xl font-semibold">Un absorbente usado no es compost</h3>
            <p className="mt-3 text-sm leading-relaxed text-sand-100/90">
              Los absorbentes que hayan entrado en contacto con hidrocarburos se convierten en residuos que deben separarse
              de la biomasa limpia. <strong className="text-white">No se incorporan directamente al compost.</strong>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-sand-100/90">
              Tampoco se afirma que el compost elimine hidrocarburos o restaure suelos: su eficacia debe validarse con
              ensayos técnicos y ambientales.
            </p>
          </div>
          <ol className="grid gap-4 p-7 sm:grid-cols-2 sm:p-9">
            {steps.map(({ Icon, title, text }, i) => (
              <li key={title} className="flex gap-3">
                <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-sand-100 text-earth-700">
                  <Icon className="size-5" aria-hidden />
                  <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-earth-500 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <p className="font-semibold text-forest-900">{title}</p>
                  <p className="mt-0.5 text-sm text-ink-500">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}
