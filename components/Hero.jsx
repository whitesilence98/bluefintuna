'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { STATS } from '@/lib/stats';
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

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 lg:h-[calc(100vh-4rem)] lg:grid lg:grid-cols-[1.05fr_1.2fr_0.5fr] lg:items-stretch lg:gap-8 lg:overflow-hidden"
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
          Engineering
          <br />
          <span className="text-champagne">enterprise-scale</span> systems
        </h1>

        {/* Elevator pitch: value proposition in two sentences — no title words,
            no years (those live in the tag above and the stats sidebar). */}
        <p className="mt-6 max-w-md text-base leading-relaxed text-sand sm:text-lg">
          Decoupling client engines from high-throughput backends at enterprise
          scale — modular web, Electron desktop, and microservice integration.
          The seam between them is usually where delivery slows; I make it the
          part that speeds teams up.
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

        {/* Compact icon social strip — contact details live in #contact. */}
        <div className="mt-9 flex items-center gap-5">
          <a
            href="mailto:98tuannguyen@gmail.com"
            aria-label="Email"
            className="text-sand/70 transition-colors hover:text-champagne"
          >
            <Mail size={20} strokeWidth={1.75} />
          </a>
          <a
            href="https://github.com/whitesilence98"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-sand/70 transition-colors hover:text-champagne"
          >
            <Github size={20} strokeWidth={1.75} />
          </a>
          <a
            href="https://linkedin.com/in/tuan-nguyend"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-sand/70 transition-colors hover:text-champagne"
          >
            <Linkedin size={20} strokeWidth={1.75} />
          </a>
        </div>
      </motion.div>

      {/* CENTER COLUMN: interactive 3D canvas — fills the hero height on lg. */}
      <motion.div
        className="relative h-[55vh] w-full min-h-0 lg:h-full"
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

      {/* RIGHT COLUMN: vertical stats sidebar — single source in lib/stats.js */}
      <motion.aside
        className="hidden flex-col justify-center gap-8 border-l border-rule pl-6 lg:flex"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        aria-label="Career stats"
      >
        {STATS.map((s, i) => (
          <StatBlock key={s.k} value={s.k} label={s.v} last={i === STATS.length - 1} />
        ))}
      </motion.aside>
    </section>
  );
}