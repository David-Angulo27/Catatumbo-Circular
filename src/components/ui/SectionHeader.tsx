import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  id,
}: SectionHeaderProps) {
  const dark = tone === 'dark';
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <span className={dark ? 'eyebrow border-emerald-300/30 bg-emerald-300/10 text-emerald-300' : 'eyebrow'}>
        {eyebrow}
      </span>
      <h2
        id={id}
        className={`mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-forest-900'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-forest-100/80' : 'text-ink-500'}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
