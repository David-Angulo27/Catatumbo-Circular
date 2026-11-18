/** Paisaje vectorial del Catatumbo: serranía, río y cultivos al amanecer. */
export default function HeroLandscape() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#041a14" />
          <stop offset="55%" stopColor="#0b3d2e" />
          <stop offset="100%" stopColor="#1f5a3f" />
        </linearGradient>
        <radialGradient id="sun" cx="0.72" cy="0.42" r="0.45">
          <stop offset="0%" stopColor="#e8dcc2" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#34d399" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stopColor="#041a14" stopOpacity="0" />
          <stop offset="100%" stopColor="#041a14" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#sky)" />
      <rect width="1440" height="900" fill="url(#sun)" />

      {/* Serranía lejana */}
      <path d="M0 520 L120 450 L240 490 L380 400 L520 470 L660 380 L820 460 L960 390 L1120 470 L1260 410 L1440 470 L1440 900 L0 900Z" fill="#134e38" opacity="0.55" />
      <path d="M0 590 L160 520 L300 560 L460 500 L620 570 L780 510 L940 580 L1100 520 L1280 580 L1440 540 L1440 900 L0 900Z" fill="#0f4a34" opacity="0.8" />

      {/* Río */}
      <path d="M-20 720 C 300 660, 520 760, 820 700 S 1300 640, 1460 690" fill="none" stroke="url(#river)" strokeWidth="18" strokeLinecap="round" />

      {/* Colinas de cultivo con surcos */}
      <path d="M0 680 C 240 620, 480 650, 720 690 S 1200 640, 1440 660 L1440 900 L0 900Z" fill="#0b3d2e" />
      <g stroke="#2f7a57" strokeWidth="2" opacity="0.5" fill="none">
        <path d="M0 740 C 300 700, 600 730, 900 760 S 1300 720, 1440 730" />
        <path d="M0 780 C 300 740, 600 770, 900 800 S 1300 760, 1440 770" />
        <path d="M0 820 C 300 780, 600 810, 900 840 S 1300 800, 1440 810" />
      </g>

      {/* Plantas de plátano y cacao estilizadas */}
      {[80, 210, 1180, 1320].map((x, i) => (
        <g key={x} transform={`translate(${x} ${700 + (i % 2) * 20})`} opacity="0.85">
          <rect x="-3" y="-90" width="6" height="90" rx="3" fill="#a47148" />
          <path d="M0 -88 C -50 -120, -80 -100, -95 -70 C -60 -85, -30 -88, 0 -80Z" fill="#2f7a57" />
          <path d="M0 -88 C 50 -125, 85 -105, 100 -72 C 60 -88, 30 -90, 0 -80Z" fill="#134e38" />
          <path d="M0 -90 C -10 -140, 10 -160, 20 -165 C 15 -130, 10 -110, 0 -88Z" fill="#2f7a57" />
        </g>
      ))}

      <rect width="1440" height="900" fill="url(#fade)" />
    </svg>
  );
}
