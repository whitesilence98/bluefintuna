'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import { toast } from '@/lib/toast';

const CONTACT = {
  email: '98tuannguyen@gmail.com',
  phone: '+84 976 649 000',
  location: 'Ho Chi Minh, Vietnam',
  linkedin: 'https://linkedin.com/in/tuan-nguyend',
  github: 'https://github.com/whitesilence98',
};

const SOCIALS = [
  { label: 'Email', href: `mailto:${CONTACT.email}`, Icon: Mail },
  { label: 'GitHub', href: CONTACT.github, Icon: Github },
  { label: 'LinkedIn', href: CONTACT.linkedin, Icon: Linkedin },
];

// Initial empty form state.
const EMPTY = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Required';
  if (!values.email.trim()) {
    errors.email = 'Required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email';
  }
  if (!values.subject.trim()) errors.subject = 'Required';
  if (!values.message.trim()) {
    errors.message = 'Required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'A little more, please';
  }
  return errors;
}

// Floating-label input with success/error states. The label floats when the
// field has focus or content. `id` ties the <label> to the input for a11y.
function Field({ id, label, type = 'text', value, onChange, error, touched, textarea, placeholder }) {
  const Tag = textarea ? 'textarea' : 'input';
  const hasValue = value.length > 0;
  const showError = touched && error;
  const showSuccess = touched && !error && hasValue;

  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        onBlur={() => {}}
        rows={textarea ? 5 : undefined}
        placeholder={placeholder}
        aria-invalid={!!showError}
        aria-describedby={showError ? `${id}-err` : undefined}
        className={`peer w-full rounded-xl border bg-espresso-950/50 px-4 pt-6 pb-2 text-sm text-ink outline-none transition-colors placeholder:text-transparent focus:bg-espresso-950/80 ${
          showError
            ? 'border-red-400/60 focus:border-red-400'
            : showSuccess
              ? 'border-champagne/50'
              : 'border-rule focus:border-champagne/50'
        } ${textarea ? 'min-h-[140px] resize-y' : ''}`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 origin-left transition-all peer-focus:-translate-y-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] ${
          hasValue
            ? '-translate-y-2 text-[10px] uppercase tracking-[0.2em]'
            : 'top-4 text-sm'
        } ${showError ? 'text-red-300/80' : showSuccess ? 'text-champagne/80' : 'text-sand/60 peer-focus:text-champagne/80'}`}
      >
        {label}
      </label>
      {showError && (
        <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1 text-xs text-red-300/90">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function update(field) {
    return (e) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      // Live-validate as the user types, but only surface errors for fields
      // already touched so the form doesn't scream at them on first keystroke.
      const v = validate(next);
      setErrors(v);
      setTouched((t) => ({ ...t, [field]: true }));
    };
  }

  function handleBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(v).length > 0) {
      toast('Please fix the highlighted fields', { tone: 'info' });
      return;
    }

    setSubmitting(true);
    // No backend on a static site — fall back to the user's mail client with
    // the fields prefilled. Honest, zero-infrastructure, works on any host.
    const body = `${values.message}\n\n— ${values.name}\n${values.email}`;
    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `[Portfolio] ${values.subject}`
    )}&body=${encodeURIComponent(body)}`;

    // Tiny delay so the submitting state reads as intentional, not flicker.
    await new Promise((r) => setTimeout(r, 500));
    window.location.href = mailto;

    setSubmitting(false);
    setSent(true);
    toast('Opening your mail client…', { tone: 'success' });
    setValues(EMPTY);
    setTouched({});
    setErrors({});
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl scroll-mt-20 flex-col justify-center px-6 py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Left: intro + quick facts + socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-sand/70">
            <span aria-hidden className="h-3 w-px bg-rule" />
            Get in touch
            <span aria-hidden className="h-3 w-px bg-rule" />
          </span>
          <h2 className="grunge-text mt-5 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Let&apos;s build something
          </h2>
          <p className="mt-4 max-w-md text-sand/70">
            Available for senior engineering roles, architecture consulting, and
            AI-tooling work. Send a note or use the form — I read everything.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-sand">
            <li className="inline-flex items-center gap-2.5">
              <MapPin size={15} strokeWidth={1.5} className="text-champagne/80" /> {CONTACT.location}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} strokeWidth={1.5} className="text-champagne/80" />
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="hover:text-champagne">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} strokeWidth={1.5} className="text-champagne/80" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-champagne">
                {CONTACT.email}
              </a>
            </li>
          </ul>

          <ul className="mt-8 flex items-center gap-5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-sand/70 transition-colors hover:text-champagne"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: validated contact form */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border border-rule bg-espresso-900/50 p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Field
                id="name"
                label="Name"
                value={values.name}
                onChange={update('name')}
                onBlur={() => handleBlur('name')}
                error={errors.name}
                touched={touched.name}
                placeholder="Your name"
              />
            </div>
            <div>
              <Field
                id="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={update('email')}
                onBlur={() => handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="mt-5">
            <Field
              id="subject"
              label="Subject"
              value={values.subject}
              onChange={update('subject')}
              onBlur={() => handleBlur('subject')}
              error={errors.subject}
              touched={touched.subject}
              placeholder="What's this about?"
            />
          </div>
          <div className="mt-5">
            <Field
              id="message"
              label="Message"
              textarea
              value={values.message}
              onChange={update('message')}
              onBlur={() => handleBlur('message')}
              error={errors.message}
              touched={touched.message}
              placeholder="Tell me about it"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-gold hover:shadow-[0_0_24px_-4px_rgba(197,160,89,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-espresso-950/40 border-t-espresso-950" />
                Opening mail client…
              </>
            ) : sent ? (
              <>
                <Check size={16} strokeWidth={2.5} /> Sent
              </>
            ) : (
              <>
                <Send size={16} strokeWidth={2} /> Send message
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-sand/45">
            Opens your email client with the message prefilled — no data stored.
          </p>
        </motion.form>
      </div>
    </section>
  );
}