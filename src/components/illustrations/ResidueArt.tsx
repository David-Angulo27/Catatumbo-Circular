import type { BiomassId } from '../../data/pilot';

/**
 * Ilustraciones vectoriales de cada residuo agrícola.
 * Pueden reemplazarse por fotografías propias (con autorización) sin cambiar el resto de la sección.
 */
export default function ResidueArt({ id, className = '' }: { id: BiomassId; className?: string }) {
  return (
    <svg viewBox="0 0 240 160" className={className} aria-hidden>
      <rect width="240" height="160" fill="#f4ede0" />
      <ellipse cx="120" cy="140" rx="96" ry="10" fill="#072a20" opacity="0.1" />
      {id === 'cacao' && <Cacao />}
      {id === 'platano-fibra' && <Fibra />}
      {id === 'platano-vastago' && <Vastago />}
      {id === 'yuca' && <Yuca />}
    </svg>
  );
}

function Cacao() {
  return (
    <g>
      {/* Mazorca abierta: dos mitades de cáscara */}
      <g transform="translate(70 92) rotate(-18)">
        <path d="M-46 0 C -40 -34, 40 -34, 46 0 C 40 30, -40 30, -46 0Z" fill="#a8582a" />
        <path d="M-38 0 C -32 -24, 32 -24, 38 0 C 32 20, -32 20, -38 0Z" fill="#e8c48d" />
        {[-24, -8, 8, 24].map((x) => (
          <path key={x} d={`M${x} -20 Q ${x + 3} 0 ${x} 20`} stroke="#c98f55" strokeWidth="2" fill="none" />
        ))}
      </g>
      <g transform="translate(165 98) rotate(14)">
        <path d="M-46 0 C -40 -34, 40 -34, 46 0 C 40 30, -40 30, -46 0Z" fill="#8f4a22" />
        <path d="M-38 0 C -32 -24, 32 -24, 38 0 C 32 20, -32 20, -38 0Z" fill="#dcb47a" />
      </g>
      {/* Fragmentos triturados */}
      {[[40, 132], [58, 136], [190, 134], [205, 130], [120, 138], [134, 134]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="9" height="5" rx="2" fill={i % 2 ? '#8f4a22' : '#a8582a'} transform={`rotate(${i * 25} ${x} ${y})`} />
      ))}
    </g>
  );
}

function Fibra() {
  return (
    <g>
      {/* Hoja de plátano */}
      <path d="M30 120 C 70 40, 160 20, 214 34 C 170 60, 110 104, 30 120Z" fill="#2f7a57" />
      <path d="M30 120 C 90 80, 150 50, 214 34" stroke="#134e38" strokeWidth="3" fill="none" />
      {[60, 90, 120, 150, 180].map((x, i) => (
        <path key={x} d={`M${x} ${104 - i * 14} l ${10 + i} ${-22 + i * 2}`} stroke="#134e38" strokeWidth="1.5" opacity="0.6" />
      ))}
      {/* Fibras secas */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${48 + i * 6} 140 C ${90 + i * 4} ${118 - i * 3}, ${150 + i * 2} ${132 + i}, ${206 - i * 3} ${120 + i * 2}`}
          stroke={i % 2 ? '#d8c59f' : '#b98a5e'}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

function Vastago() {
  return (
    <g>
      {/* Tronco cortado del pseudotallo */}
      <rect x="40" y="58" width="120" height="62" rx="10" fill="#7fb69a" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M40 ${68 + i * 14} H160`} stroke="#5d9a7a" strokeWidth="2" />
      ))}
      {/* Sección transversal con vainas concéntricas */}
      <g transform="translate(168 89)">
        {[34, 27, 20, 13, 6].map((r, i) => (
          <ellipse key={r} rx={r * 0.62} ry={r} fill={i % 2 ? '#e8f0d8' : '#cfe0b8'} stroke="#7fb69a" strokeWidth="1.5" />
        ))}
      </g>
      {/* Gotas: alto contenido de humedad */}
      {[[70, 40], [100, 32], [130, 42]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} c 5 7 8 11 8 15 a8 8 0 0 1 -16 0 c0 -4 3 -8 8 -15z`} fill="#3f7fc9" opacity="0.55" />
      ))}
    </g>
  );
}

function Yuca() {
  return (
    <g>
      {/* Raíces de yuca */}
      <path d="M32 70 C 60 54, 110 58, 130 70 C 110 82, 60 86, 32 70Z" fill="#8f5a35" />
      <path d="M40 70 C 64 62, 104 64, 122 70" stroke="#f4e7cf" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      {/* Montón de bagazo */}
      <path d="M90 136 Q 160 52 226 136 Z" fill="#e9dcc0" />
      {Array.from({ length: 40 }, (_, i) => {
        const a = (i * 137.5 * Math.PI) / 180;
        const r = Math.sqrt(i) * 7;
        return (
          <circle
            key={i}
            cx={158 + Math.cos(a) * r * 1.4}
            cy={124 - Math.abs(Math.sin(a) * r * 0.9)}
            r={2 + (i % 3)}
            fill={i % 3 === 0 ? '#d8c59f' : i % 3 === 1 ? '#c9b48a' : '#f4ede0'}
          />
        );
      })}
    </g>
  );
}
