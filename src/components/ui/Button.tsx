import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-emerald-500 text-forest-950 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.7)] hover:-translate-y-0.5 hover:bg-emerald-400',
  secondary: 'bg-forest-800 text-white hover:-translate-y-0.5 hover:bg-forest-700',
  ghost: 'border border-white/25 bg-white/5 text-white backdrop-blur hover:border-white/50 hover:bg-white/10',
  light: 'border border-forest-800/15 bg-white text-forest-800 hover:-translate-y-0.5 hover:border-emerald-500',
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
