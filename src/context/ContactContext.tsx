import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export const interestOptions = [
  'Empresa / cliente industrial',
  'Productor agrícola',
  'Universidad / investigación',
  'Inversionista',
  'Institución pública',
  'Aliado tecnológico',
  'Información comercial',
  'Otro',
] as const;

export type Interest = (typeof interestOptions)[number];

interface Prefill {
  interest?: Interest;
  message?: string;
  /** Cambia en cada solicitud para que el formulario aplique el prellenado. */
  nonce: number;
}

interface ContactContextValue {
  prefill: Prefill;
  openContact: (opts?: { interest?: Interest; message?: string }) => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });

  const openContact = useCallback((opts?: { interest?: Interest; message?: string }) => {
    setPrefill((p) => ({ ...opts, nonce: p.nonce + 1 }));
    requestAnimationFrame(() =>
      document.getElementById('participa')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    );
  }, []);

  return <ContactContext.Provider value={{ prefill, openContact }}>{children}</ContactContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContact debe usarse dentro de ContactProvider');
  return ctx;
}
