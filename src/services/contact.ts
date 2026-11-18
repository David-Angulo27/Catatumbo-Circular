import { siteConfig } from '../config/site';

export interface ContactPayload {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
}

export type ContactResult =
  | { ok: true; mode: 'sent' }
  | { ok: true; mode: 'not-configured' }
  | { ok: false; error: string };

/**
 * Envía el formulario al endpoint configurado en VITE_CONTACT_ENDPOINT (POST JSON).
 * Si no hay endpoint configurado, NO se envía nada: se devuelve `not-configured`
 * para que la interfaz lo informe con transparencia.
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const endpoint = siteConfig.contactEndpoint.trim();
  if (!endpoint) return { ok: true, mode: 'not-configured' };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, error: `El servidor respondió con el código ${res.status}.` };
    return { ok: true, mode: 'sent' };
  } catch {
    return { ok: false, error: 'No fue posible conectar con el servidor. Intente nuevamente.' };
  }
}
