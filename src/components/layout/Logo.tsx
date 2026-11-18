interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
}

/** Marca: anillo circular (economía circular) que envuelve una hoja (territorio). */
export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="16" fill="#0b3d2e" />
      <path d="M32 12a20 20 0 1 1-17.3 10" fill="none" stroke="#34d399" strokeWidth="6" strokeLinecap="round" />
      <path d="M8 16l7 7 7-8" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 42c-6-4-8-10-4-16 5 2 8 7 4 16zm0 0c4-5 9-6 13-4-3 5-8 6-13 4z" fill="#e8dcc2" />
    </svg>
  );
}

export default function Logo({ tone = 'light', className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="leading-none">
        <span className={`block font-display text-[15px] font-bold tracking-tight ${tone === 'light' ? 'text-white' : 'text-forest-900'}`}>
          Catatumbo
        </span>
        <span className="block font-display text-[11px] font-semibold tracking-[0.28em] text-emerald-500 uppercase">
          Circular
        </span>
      </span>
    </span>
  );
}
