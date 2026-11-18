/** Ilustraciones vectoriales de las áreas de un Centro Comunitario de Procesamiento. */
export type SceneId = 'recepcion' | 'trituradora' | 'secador' | 'solar' | 'prensa' | 'almacen' | 'operarios';

const ground = <rect x="0" y="150" width="240" height="30" fill="#e8dcc2" />;

function Person({ x, y = 150, color = '#10b981' }: { x: number; y?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="-58" r="8" fill="#a47148" />
      <path d="M-9 -62 a9 9 0 0 1 18 0z" fill="#f4c542" />
      <rect x="-10" y="-48" width="20" height="28" rx="6" fill={color} />
      <rect x="-9" y="-20" width="7" height="20" rx="3" fill="#1d2529" />
      <rect x="2" y="-20" width="7" height="20" rx="3" fill="#1d2529" />
    </g>
  );
}

export default function CenterScene({ id }: { id: SceneId }) {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden>
      <rect width="240" height="180" fill="#f4ede0" />
      {ground}
      {id === 'recepcion' && (
        <g>
          <rect x="120" y="110" width="80" height="40" rx="4" fill="#2c363c" />
          <rect x="130" y="100" width="60" height="10" fill="#5b6770" />
          <rect x="140" y="76" width="40" height="22" rx="3" fill="#12181b" />
          <text x="160" y="92" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">
            245 kg
          </text>
          <path d="M136 100 l8 -26 h30 l8 26z" fill="#a47148" opacity="0.0" />
          <ellipse cx="160" cy="100" rx="26" ry="6" fill="#b98a5e" />
          <Person x={70} />
          <rect x="52" y="104" width="36" height="24" rx="4" fill="#b98a5e" />
        </g>
      )}
      {id === 'trituradora' && (
        <g>
          <path d="M90 40 h60 l-10 40 h-40z" fill="#5b6770" />
          <rect x="85" y="80" width="70" height="55" rx="6" fill="#2c363c" />
          <circle cx="120" cy="107" r="16" fill="none" stroke="#34d399" strokeWidth="4" strokeDasharray="6 5">
            <animateTransform attributeName="transform" type="rotate" from="0 120 107" to="360 120 107" dur="4s" repeatCount="indefinite" />
          </circle>
          <rect x="95" y="135" width="10" height="15" fill="#12181b" />
          <rect x="135" y="135" width="10" height="15" fill="#12181b" />
          <path d="M155 120 l30 20" stroke="#5b6770" strokeWidth="8" />
          <ellipse cx="200" cy="148" rx="26" ry="8" fill="#b98a5e" />
          {[100, 112, 128, 140].map((x) => (
            <circle key={x} cx={x} cy={34} r="4" fill="#a47148" />
          ))}
        </g>
      )}
      {id === 'secador' && (
        <g>
          <rect x="40" y="50" width="160" height="100" rx="6" fill="#2c363c" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="52" y={62 + i * 21} width="136" height="12" rx="2" fill="#5b6770" />
              <rect x="56" y={64 + i * 21} width="128" height="6" rx="2" fill="#d8c59f" />
            </g>
          ))}
          {[80, 120, 160].map((x, i) => (
            <path key={x} d={`M${x} 44 c -6 -8 6 -12 0 -20`} stroke="#b98a5e" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </path>
          ))}
          <text x="120" y="172" textAnchor="middle" fill="#6f4a2d" fontSize="9" fontWeight="600">Control de humedad</text>
        </g>
      )}
      {id === 'solar' && (
        <g>
          {/* Paneles fotovoltaicos */}
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${28 + i * 78} 40) skewX(-14)`}>
              <rect width="70" height="44" rx="3" fill="#1d3557" />
              {[1, 2, 3].map((c) => (
                <line key={c} x1={c * 17.5} y1="0" x2={c * 17.5} y2="44" stroke="#4a7fc8" strokeWidth="1" />
              ))}
              <line x1="0" y1="22" x2="70" y2="22" stroke="#4a7fc8" strokeWidth="1" />
            </g>
          ))}
          <rect x="54" y="84" width="4" height="66" fill="#2c363c" />
          <rect x="132" y="84" width="4" height="66" fill="#2c363c" />
          {/* Baterías */}
          <rect x="176" y="96" width="44" height="54" rx="4" fill="#2c363c" />
          <rect x="186" y="90" width="8" height="6" fill="#5b6770" />
          <rect x="202" y="90" width="8" height="6" fill="#5b6770" />
          <rect x="184" y="108" width="28" height="8" rx="2" fill="#34d399">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </rect>
          {/* Inversor */}
          <rect x="182" y="40" width="34" height="40" rx="4" fill="#5b6770" />
          <circle cx="199" cy="54" r="5" fill="#34d399" />
          <path d="M150 62 H182 M199 80 V96" stroke="#f4c542" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="210" cy="22" r="10" fill="#f4c542" />
        </g>
      )}
      {id === 'prensa' && (
        <g>
          <rect x="60" y="30" width="12" height="120" fill="#2c363c" />
          <rect x="168" y="30" width="12" height="120" fill="#2c363c" />
          <rect x="60" y="26" width="120" height="16" rx="3" fill="#1d2529" />
          <rect x="114" y="42" width="12" height="30" fill="#5b6770">
            <animate attributeName="height" values="30;48;30" dur="2.5s" repeatCount="indefinite" />
          </rect>
          <rect x="80" y="70" width="80" height="12" rx="2" fill="#5b6770">
            <animate attributeName="y" values="70;88;70" dur="2.5s" repeatCount="indefinite" />
          </rect>
          <rect x="84" y="104" width="72" height="22" rx="4" fill="#d8c59f" />
          <rect x="72" y="126" width="96" height="24" fill="#1d2529" />
        </g>
      )}
      {id === 'almacen' && (
        <g>
          <rect x="30" y="40" width="8" height="110" fill="#2c363c" />
          <rect x="202" y="40" width="8" height="110" fill="#2c363c" />
          {[70, 110].map((y) => (
            <rect key={y} x="30" y={y} width="180" height="5" fill="#2c363c" />
          ))}
          {[
            [44, 46], [84, 46], [124, 46], [164, 46],
            [44, 86], [84, 86], [124, 86],
            [44, 126], [84, 126], [124, 126], [164, 126],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="34" height="24" rx="3" fill={i % 3 === 0 ? '#a47148' : i % 3 === 1 ? '#b98a5e' : '#10b981'} />
              <rect x={x + 10} y={y + 8} width="14" height="6" rx="1" fill="#fff" opacity="0.7" />
            </g>
          ))}
        </g>
      )}
      {id === 'operarios' && (
        <g>
          <rect x="40" y="96" width="160" height="10" rx="3" fill="#2c363c" />
          <rect x="50" y="106" width="6" height="44" fill="#2c363c" />
          <rect x="184" y="106" width="6" height="44" fill="#2c363c" />
          <rect x="96" y="80" width="48" height="16" rx="3" fill="#d8c59f" />
          <rect x="150" y="70" width="36" height="26" rx="3" fill="#12181b" />
          <path d="M156 88 l8 -8 l6 5 l10 -10" stroke="#34d399" strokeWidth="2.5" fill="none" />
          <Person x={80} y={150} color="#10b981" />
          <Person x={120} y={150} color="#0b3d2e" />
          <Person x={208} y={150} color="#a47148" />
        </g>
      )}
    </svg>
  );
}
