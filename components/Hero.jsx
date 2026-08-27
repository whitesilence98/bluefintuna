'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Check, Copy } from 'lucide-react';
import { toast } from '@/lib/toast';
import MagneticButton from '@/components/MagneticButton';

// Lazy-load the WebGL canvas so it never blocks first paint / LCP.
// ssr:false keeps Three.js off the server bundle entirely.
const Character3D = dynamic(
  () => import('@/components/Canvas/Character3D'),
  {
    ssr: false,
    loading: () => <CanvasSkeleton />,
  }
);

// Lightweight styled placeholder shown while the 3D mesh hydrates.
function CanvasSkeleton() {
  return (
    <div className="canvas-slot h-full w-full" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-44 w-44">
          <div className="absolute inset-0 rounded-full border border-rule" />
          <div className="absolute inset-0 rounded-full border-t border-champagne/60 animate-spin [animation-duration:1.2s]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-sand/60">
              Loading 3D
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Uppercase, tracked-out category tag wrapped in vertical pipes.
function CategoryTag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-sand/70">
      <span aria-hidden className="h-3 w-px bg-rule" />
      {children}
      <span aria-hidden className="h-3 w-px bg-rule" />
    </span>
  );
}

// Thin icon + label row for the sub-metadata contact card.
function MetaRow({ Icon, children, href }) {
  const content = (
    <>
      <Icon size={14} strokeWidth={1.5} className="text-champagne/80" />
      <span className="truncate">{children}</span>
    </>
  );
  return href ? (
    <a
      href={href}
      className="flex items-center gap-2.5 text-xs text-sand/80 transition-colors hover:text-ink"
    >
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-2.5 text-xs text-sand/80">{content}</div>
  );
}

// Vertical stat block for the right sidebar.
function StatBlock({ value, label, last }) {
  return (
    <div className={last ? '' : 'border-b border-rule pb-6'}>
      <div className="font-serif text-4xl font-semibold leading-none text-ink">
        {value}
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-sand/60">
        {label}
      </div>
    </div>
  );
}

// Email row with copy-to-clipboard: clicking the icon copies the address and
// fires a toast. The mailto: link still opens on label click.
const EMAIL = '98tuannguyen@gmail.com';

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast('Copied to clipboard', { tone: 'success' });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast('Copy failed — long-press to copy', { tone: 'info' });
    }
  }

  return (
    <div className="flex items-center gap-2.5 text-xs text-sand/80">
      <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 truncate transition-colors hover:text-ink">
        <Mail size={14} strokeWidth={1.5} className="text-champagne/80" />
        <span className="truncate">{EMAIL}</span>
      </a>
      <button
        onClick={copy}
        aria-label="Copy email to clipboard"
        className="shrink-0 text-sand/50 transition-colors hover:text-champagne"
      >
        {copied ? <Check size={13} strokeWidth={2.5} className="text-champagne" /> : <Copy size={13} />}
      </button>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-12 px-6 pb-24 pt-28 md:pt-32 lg:grid lg:grid-cols-[1.05fr_1.2fr_0.5fr] lg:items-stretch lg:gap-8"
    >
      {/* Ambient warm radial spotlight behind the center 3D character. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(197,160,89,0.12),transparent_70%)]"
      />

      {/* LEFT COLUMN: badge, editorial title, description, CTAs, sub-metadata. */}
      <motion.div
        className="flex flex-col justify-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <CategoryTag>Senior Software Engineer</CategoryTag>

        <h1 className="grunge-text mt-6 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
          I&apos;m a Web Engineer
          <br />
          &amp; <span className="italic text-champagne">AI Workflows</span> Builder
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-sand sm:text-lg">
          6+ years architecting global-scale web, Electron desktop, and modular
          systems for enterprise brands — connecting client engines to
          high-throughput microservices, and pioneering local AI workflows for
          faster engineering.
        </p>

        {/* Dual CTA: champagne primary + dark ghost secondary. */}
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <MagneticButton strength={14}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3 text-sm font-semibold text-espresso-950 transition-all hover:bg-gold hover:shadow-[0_0_24px_-4px_rgba(197,160,89,0.5)]"
            >
              View Work
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </MagneticButton>
          <MagneticButton strength={10}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-rule px-7 py-3 text-sm font-semibold text-ink transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              Get in touch
            </a>
          </MagneticButton>
        </div>

        {/* Sub-metadata cards: quick contact + socials. */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-rule bg-espresso-900/60 p-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-sand/50">
              Quick Contact
            </p>
            <div className="space-y-2.5">
              <CopyEmail />
              <MetaRow Icon={Phone} href="tel:+84976649000">
                +84 976 649 000
              </MetaRow>
              <MetaRow Icon={MapPin}>Ho Chi Minh, Vietnam</MetaRow>
            </div>
          </div>

          <div className="rounded-xl border border-rule bg-espresso-900/60 p-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-sand/50">
              Socials
            </p>
            <div className="space-y-2.5">
              <MetaRow Icon={Github} href="https://github.com/whitesilence98">
                github.com/whitesilence98
              </MetaRow>
              <MetaRow Icon={Linkedin} href="https://linkedin.com/in/tuan-nguyend">
                linkedin.com/in/tuan-nguyend
              </MetaRow>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CENTER COLUMN: interactive 3D canvas — full height, warm-lit. */}
      <motion.div
        className="relative h-[60vh] w-full sm:h-[70vh] lg:h-auto lg:min-h-[82vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="canvas-slot absolute inset-0">
          <Suspense fallback={<CanvasSkeleton />}>
            {/* <Character3D /> */}
          </Suspense>
        </div>
        {/* Warm espresso vignette so the character sits in the lit space. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,#0E0C0A_80%)]" />
      </motion.div>

      {/* RIGHT COLUMN: vertical stats sidebar. */}
      <motion.aside
        className="hidden flex-col justify-center gap-8 border-l border-rule pl-6 lg:flex"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        aria-label="Career stats"
      >
        <StatBlock value="6+" label="Years of experience" />
        <StatBlock value="4,000+" label="Defects triaged" />
        <StatBlock value="40%" label="Payload reduction" />
        <StatBlock value="25%" label="Faster delivery" last />
      </motion.aside>
    </section>
  );
}