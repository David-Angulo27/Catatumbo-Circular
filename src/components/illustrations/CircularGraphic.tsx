import { motion } from 'motion/react';
import { Sprout, Cpu, Leaf, Recycle } from 'lucide-react';

const nodes = [
  { label: 'Agricultura', Icon: Sprout, angle: -90 },
  { label: 'Tecnología', Icon: Cpu, angle: 30 },
  { label: 'Sostenibilidad', Icon: Leaf, angle: 150 },
];

/** Diagrama circular: agricultura, tecnología y sostenibilidad conectadas en un ciclo. */
export default function CircularGraphic() {
  const R = 150;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]" role="img" aria-label="Ciclo que conecta agricultura, tecnología y sostenibilidad">
      <div className="absolute inset-[12%] rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />
      <svg viewBox="-200 -200 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#e8dcc2" />
          </linearGradient>
        </defs>
        <circle r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle r={R - 40} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 6" />
        <circle r={R} fill="none" stroke="url(#ring)" strokeWidth="3" strokeLinecap="round" strokeDasharray="120 60">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite" />
        </circle>
        {/* Partículas que recorren el ciclo */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="10s"
              begin={`-${(i * 10) / 3}s`}
              repeatCount="indefinite"
            />
            <circle cx={R} cy="0" r="4" fill="#6ee7b7" />
          </g>
        ))}
      </svg>

      {/* Centro */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid size-28 place-items-center rounded-full border border-white/15 bg-forest-900/80 shadow-[0_0_60px_-10px_rgba(52,211,153,0.6)] backdrop-blur sm:size-32">
          <div className="text-center">
            <Recycle className="mx-auto size-8 text-emerald-300" aria-hidden />
            <span className="mt-1 block font-display text-xs font-semibold tracking-wider text-white uppercase">
              Economía
              <br />
              circular
            </span>
          </div>
        </div>
      </div>

      {/* Nodos */}
      {nodes.map(({ label, Icon, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + (Math.cos(rad) * R * 100) / 400;
        const y = 50 + (Math.sin(rad) * R * 100) / 400;
        return (
          <motion.div
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
          >
            <div className="flex animate-float flex-col items-center gap-1.5" style={{ animationDelay: `${i * 0.8}s` }}>
              <div className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-emerald-300 backdrop-blur-md sm:size-16">
                <Icon className="size-6 sm:size-7" />
              </div>
              <span className="rounded-full bg-forest-950/70 px-2.5 py-0.5 text-[11px] font-semibold text-sand-100">{label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
