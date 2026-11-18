import type { ProductId } from '../../data/products';

/** Representaciones vectoriales conceptuales de cada producto (no fotografías de producto final). */
export default function ProductArt({ id, className = '' }: { id: ProductId; className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} role="img" aria-label={`Representación conceptual de ${labels[id]}`}>
      <defs>
        <pattern id={`fiber-${id}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#a47148" strokeWidth="2" opacity="0.35" />
        </pattern>
        <radialGradient id={`glow-${id}`} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="220" fill={`url(#glow-${id})`} />
      {id === 'biopads' && <Pads id={id} />}
      {id === 'biobooms' && <Booms id={id} />}
      {id === 'biogranulado' && <Granules />}
      {id === 'biocompost' && <Compost />}
    </svg>
  );
}

const labels: Record<ProductId, string> = {
  biopads: 'BioPads',
  biobooms: 'BioBooms',
  biogranulado: 'BioGranulado',
  biocompost: 'BioCompost',
};

function Pads({ id }: { id: string }) {
  return (
    <g>
      <ellipse cx="160" cy="190" rx="110" ry="12" fill="#072a20" opacity="0.12" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${70 + i * 8} ${120 - i * 26}) skewX(-18)`}>
          <rect width="170" height="56" rx="10" fill={i === 2 ? '#e8dcc2' : i === 1 ? '#d8c59f' : '#b98a5e'} />
          <rect width="170" height="56" rx="10" fill={`url(#fiber-${id})`} />
          <rect x="6" y="6" width="158" height="44" rx="7" fill="none" stroke="#6f4a2d" strokeDasharray="4 4" opacity="0.5" />
        </g>
      ))}
      <circle cx="248" cy="58" r="14" fill="#1d2529" opacity="0.85" />
      <path d="M248 40 c 6 8 10 13 10 18 a10 10 0 0 1 -20 0 c0 -5 4 -10 10 -18z" fill="#2c363c" />
    </g>
  );
}

function Booms({ id }: { id: string }) {
  return (
    <g>
      <path d="M20 160 C 80 140, 120 175, 180 160 S 270 140, 300 150" stroke="#6ee7b7" strokeWidth="26" opacity="0.18" fill="none" strokeLinecap="round" />
      <path d="M30 120 C 90 70, 150 150, 210 100 S 290 70, 300 90" stroke="#b98a5e" strokeWidth="34" fill="none" strokeLinecap="round" />
      <path d="M30 120 C 90 70, 150 150, 210 100 S 290 70, 300 90" stroke={`url(#fiber-${id})`} strokeWidth="34" fill="none" strokeLinecap="round" />
      {[60, 120, 180, 240].map((x) => (
        <circle key={x} cx={x} cy={x === 60 ? 100 : x === 120 ? 115 : x === 180 ? 117 : 86} r="5" fill="#0b3d2e" />
      ))}
      <path d="M30 120 C 90 70, 150 150, 210 100 S 290 70, 300 90" stroke="#0b3d2e" strokeWidth="2" strokeDasharray="2 14" fill="none" />
    </g>
  );
}

function Granules() {
  const dots = Array.from({ length: 70 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const r = Math.sqrt(i) * 11;
    return { x: 160 + Math.cos(a) * r * 1.5, y: 150 - Math.abs(Math.sin(a) * r * 0.75), s: 4 + ((i * 7) % 5) };
  });
  const tones = ['#a47148', '#b98a5e', '#d8c59f', '#6f4a2d'];
  return (
    <g>
      <ellipse cx="160" cy="165" rx="125" ry="22" fill="#072a20" opacity="0.12" />
      <path d="M45 160 Q 160 40 275 160 Z" fill="#d8c59f" opacity="0.5" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s} fill={tones[i % 4]} />
      ))}
    </g>
  );
}

function Compost() {
  return (
    <g>
      <ellipse cx="160" cy="185" rx="120" ry="14" fill="#072a20" opacity="0.12" />
      <path d="M40 180 Q 160 70 280 180 Z" fill="#6f4a2d" />
      <path d="M70 180 Q 160 100 250 180 Z" fill="#5a3a22" />
      {[[110, 150], [150, 132], [195, 148], [130, 168], [175, 166], [215, 168]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#e8dcc2" opacity="0.8" />
      ))}
      {/* Brote */}
      <path d="M160 118 L160 70" stroke="#2f7a57" strokeWidth="5" strokeLinecap="round" />
      <path d="M160 88 C 130 80, 120 60, 125 48 C 145 52, 160 66, 160 88Z" fill="#10b981" />
      <path d="M160 78 C 185 70, 198 52, 195 40 C 175 42, 162 58, 160 78Z" fill="#34d399" />
      {/* Microorganismos */}
      {[[85, 70], [240, 80], [215, 40]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.7">
          <circle r="9" fill="none" stroke="#059669" strokeWidth="2" />
          <circle r="3" fill="#059669" />
        </g>
      ))}
    </g>
  );
}
