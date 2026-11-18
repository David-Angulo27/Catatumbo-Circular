import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** Usar `li` cuando el elemento es hijo directo de una lista. */
  as?: 'div' | 'li';
}

/** Aparición suave al entrar en el viewport. */
export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const Tag = as === 'li' ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
