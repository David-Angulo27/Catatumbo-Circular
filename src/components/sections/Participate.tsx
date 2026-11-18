import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Building2, Sprout, GraduationCap, TrendingUp, Landmark, Cpu, Send, CheckCircle2, Info, AlertCircle, Loader2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import { interestOptions, useContact, type Interest } from '../../context/ContactContext';
import { submitContact, type ContactPayload } from '../../services/contact';

const audiences: { Icon: typeof Building2; label: string; text: string; interest: Interest }[] = [
  { Icon: Building2, label: 'Empresas', text: 'Pruebas piloto y suministro futuro.', interest: 'Empresa / cliente industrial' },
  { Icon: Sprout, label: 'Productores agrícolas', text: 'Entrega de residuos y capacitación.', interest: 'Productor agrícola' },
  { Icon: GraduationCap, label: 'Universidades', text: 'Investigación y validación técnica.', interest: 'Universidad / investigación' },
  { Icon: TrendingUp, label: 'Inversionistas', text: 'Financiación de la fase piloto.', interest: 'Inversionista' },
  { Icon: Landmark, label: 'Instituciones públicas', text: 'Articulación territorial.', interest: 'Institución pública' },
  { Icon: Cpu, label: 'Aliados tecnológicos', text: 'Desarrollo de la plataforma.', interest: 'Aliado tecnológico' },
];

type Errors = Partial<Record<keyof ContactPayload, string>>;
const empty: ContactPayload = { name: '', email: '', organization: '', interest: '', message: '' };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: ContactPayload): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 3) e.name = 'Escribe tu nombre completo (mínimo 3 caracteres).';
  if (!emailRe.test(v.email.trim())) e.email = 'Ingresa un correo electrónico válido.';
  if (!v.interest) e.interest = 'Selecciona un tipo de interés.';
  if (v.message.trim().length < 20) e.message = 'Cuéntanos un poco más (mínimo 20 caracteres).';
  if (v.message.length > 1500) e.message = 'El mensaje no puede superar 1500 caracteres.';
  return e;
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'not-configured' } | { kind: 'error'; msg: string };

export default function Participate() {
  const { prefill } = useContact();
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactPayload, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  // Aplica el prellenado solicitado desde otras secciones (productos, marketplace, modelo de negocio).
  useEffect(() => {
    if (prefill.nonce === 0) return;
    setValues((v) => ({ ...v, interest: prefill.interest ?? v.interest, message: prefill.message ?? v.message }));
    setStatus({ kind: 'idle' });
  }, [prefill]);

  const set = (k: keyof ContactPayload, val: string) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof ContactPayload) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, interest: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus({ kind: 'sending' });
    const res = await submitContact(values);
    if (!res.ok) return setStatus({ kind: 'error', msg: res.error });
    setStatus({ kind: res.mode === 'sent' ? 'sent' : 'not-configured' });
    if (res.mode === 'sent') {
      setValues(empty);
      setTouched({});
    }
  };

  const fieldErr = (k: keyof ContactPayload) =>
    touched[k] && errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 flex items-center gap-1 text-xs text-rose-700">
        <AlertCircle className="size-3.5" aria-hidden /> {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof ContactPayload) => ({
    id: `f-${k}`,
    'aria-invalid': Boolean(touched[k] && errors[k]),
    'aria-describedby': touched[k] && errors[k] ? `e-${k}` : undefined,
  });

  return (
    <section id="participa" className="relative overflow-hidden bg-sand-50 py-24 sm:py-32" aria-labelledby="participa-title">
      <div className="absolute -bottom-40 -left-40 size-[480px] rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />
      <div className="container-page relative">
        <SectionHeader
          id="participa-title"
          eyebrow="Participa"
          title="Haz parte de Catatumbo Circular"
          description="Buscamos aliados para validar, escalar y llevar esta solución al territorio. Elige tu perfil y escríbenos."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {audiences.map(({ Icon, label, text, interest }) => {
                const active = values.interest === interest;
                return (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => {
                        set('interest', interest);
                        document.getElementById('f-name')?.focus({ preventScroll: true });
                      }}
                      aria-pressed={active}
                      className={`group flex h-full w-full items-start gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                        active ? 'border-emerald-500 bg-emerald-50' : 'border-forest-800/10 bg-white hover:border-forest-800/30'
                      }`}
                    >
                      <span className={`grid size-10 shrink-0 place-items-center rounded-xl transition ${active ? 'bg-emerald-500 text-forest-950' : 'bg-forest-50 text-forest-700 group-hover:bg-forest-800 group-hover:text-white'}`}>
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-semibold text-forest-900">{label}</span>
                        <span className="block text-xs text-ink-500">{text}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form noValidate onSubmit={onSubmit} className="card p-6 sm:p-8" aria-describedby="form-note">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className="mb-1.5 block text-sm font-medium text-forest-900">
                    Nombre <span className="text-rose-600" aria-hidden>*</span>
                  </label>
                  <input {...aria('name')} className="field" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} required />
                  {fieldErr('name')}
                </div>
                <div>
                  <label htmlFor="f-email" className="mb-1.5 block text-sm font-medium text-forest-900">
                    Correo electrónico <span className="text-rose-600" aria-hidden>*</span>
                  </label>
                  <input {...aria('email')} type="email" className="field" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} required />
                  {fieldErr('email')}
                </div>
                <div>
                  <label htmlFor="f-organization" className="mb-1.5 block text-sm font-medium text-forest-900">
                    Organización <span className="text-xs font-normal text-ink-500">(opcional)</span>
                  </label>
                  <input {...aria('organization')} className="field" autoComplete="organization" value={values.organization} onChange={(e) => set('organization', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="f-interest" className="mb-1.5 block text-sm font-medium text-forest-900">
                    Tipo de interés <span className="text-rose-600" aria-hidden>*</span>
                  </label>
                  <select {...aria('interest')} className="field" value={values.interest} onChange={(e) => set('interest', e.target.value)} onBlur={() => blur('interest')} required>
                    <option value="">Selecciona una opción</option>
                    {interestOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  {fieldErr('interest')}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-message" className="mb-1.5 block text-sm font-medium text-forest-900">
                    Mensaje <span className="text-rose-600" aria-hidden>*</span>
                  </label>
                  <textarea {...aria('message')} rows={5} maxLength={1500} className="field resize-y" value={values.message} onChange={(e) => set('message', e.target.value)} onBlur={() => blur('message')} required />
                  <div className="flex justify-between">
                    {fieldErr('message') ?? <span />}
                    <span className="mt-1.5 text-[11px] text-ink-500 tabular-nums">{values.message.length}/1500</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status.kind === 'sending'}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-forest-700 disabled:opacity-60"
              >
                {status.kind === 'sending' ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4 transition group-hover:translate-x-1" aria-hidden />}
                {status.kind === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
              </button>

              <div aria-live="polite">
                <AnimatePresence>
                  {status.kind === 'sent' && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex gap-2 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                      <CheckCircle2 className="size-5 shrink-0" aria-hidden /> ¡Gracias! Recibimos tu mensaje y te contactaremos pronto.
                    </motion.p>
                  )}
                  {status.kind === 'not-configured' && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex gap-2 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
                      <Info className="size-5 shrink-0" aria-hidden />
                      <span>
                        Tus datos son válidos, pero <strong>este formulario aún no está conectado a un servidor</strong>, así que
                        el mensaje no fue enviado. Mientras habilitamos el canal oficial, conserva tu mensaje para enviarlo por
                        otro medio.
                      </span>
                    </motion.p>
                  )}
                  {status.kind === 'error' && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex gap-2 rounded-2xl bg-rose-50 p-4 text-sm text-rose-800">
                      <AlertCircle className="size-5 shrink-0" aria-hidden /> {status.msg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <p id="form-note" className="mt-4 text-[11px] leading-relaxed text-ink-500">
                Los campos con * son obligatorios. Usaremos tus datos únicamente para responder a tu solicitud.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
