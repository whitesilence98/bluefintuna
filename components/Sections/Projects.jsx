'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Lock, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import useIsDark from '@/lib/use-is-dark';

// Professional work engagements. Most are under NDA — no public URLs or code
// links exposed. Each card surfaces a project's name, a screenshot (drop a real
// file at `image` under /public/projects/), a one-line tagline, an optional key
// metric, and the tech stack. The "Confidential" chip makes the NDA context
// explicit so recruiters don't expect a live link. A `live` URL is only set on
// public projects.
const PROJECTS = [
  {
    title: 'Razer Synapse 4',
    company: 'Razer',
    tagline: 'Desktop device-config platform',
    tags: ['Desktop', 'Electron', 'Microfrontends', 'Enterprise'],
    desc: 'Razer’s flagship desktop app for configuring and controlling Razer hardware — button remapping, macros, performance tuning, and Chroma effects across Windows and macOS. Built modular microfrontend UI mounted inside the Electron shell, decoupled deployments talking to underlying microservices across firmware, mechanical, and QA units.',
    metric: '25% faster cross-team delivery',
    stack: ['Electron', 'Next.js', 'Microfrontends', 'NestJS'],
    image: '/projects/razer-synapse-4.png',
    live: 'https://www.razer.com/synapse-4',
  },
  {
    title: 'LLM-Assisted Debugging Tooling',
    company: 'Razer',
    tagline: 'Internal AI tooling for engineering velocity',
    tags: ['AI', 'Claude', 'Internal Tools', 'Tooling'],
    desc: 'An internal tool built for Razer’s engineering org to automate log analysis and accelerate debugging. Implemented as a set of Claude skills — modular prompt-driven workflows — that triage errors, suggest fixes, and lift team-wide debugging velocity and code maintainability.',
    metric: 'Team-wide debugging speedup',
    stack: ['Claude', 'Prompt Engineering', 'TypeScript', 'Tooling'],
    image: '/projects/llm-debug-tooling.png',
  },
  {
    title: 'Hello Clever',
    company: 'Hello Clever',
    tagline: 'Fintech payments mobile app',
    tags: ['Mobile', 'React Native', 'Fintech', 'Australia'],
    desc: 'A mobile app for an Australian fintech payments platform that turns payments into business growth for merchants. Built the cross-platform React Native client against the platform’s payment APIs, with PCI/SOC-compliant flows and merchant-facing dashboards.',
    metric: 'Live fintech app',
    stack: ['React Native', 'TypeScript', 'Payments', 'API Integration'],
    image: '/projects/hello-clever.png',
    live: 'https://helloclever.co/',
  },
  {
    title: 'Beauty Undercover',
    company: 'Rexy Technology',
    tagline: 'Spa booking & blog platform',
    tags: ['Web', 'Next.js', 'GraphQL', 'AWS'],
    desc: 'A booking platform for spas in Singapore — primarily a spa appointment booking system, with an editorial blog (skincare, makeup, hair, wellness) as a secondary content surface. Built the Next.js front-end with a GraphQL data layer, AWS SDK integrations (S3 uploads, Cognito auth), and an SEO-optimized content architecture. Query optimization cut payload size by 40% (circa 2020–2021).',
    metric: '40% payload reduction',
    stack: ['Next.js', 'GraphQL', 'AWS SDK', 'Easy Peasy', 'SEO'],
    image: '/projects/beauty-undercover.png',
    live: 'https://beautyundercover.sg/',
  },
  {
    title: 'Beauty Undercover CRM',
    company: 'Rexy Technology',
    tagline: 'Internal CRM for spa operations',
    tags: ['Web', 'React', 'GraphQL', 'Ruby'],
    desc: 'The internal CRM powering the Beauty Undercover platform — managing spa listings, bookings, and editorial content. Built the React front-end against a GraphQL API with a Ruby backend, including a Quill-based rich-text editor for content authoring (circa 2020–2021).',
    metric: 'Internal CRM',
    stack: ['React', 'GraphQL', 'Ruby', 'Quill'],
    image: '/projects/beauty-undercover-crm.png',
  },
];

const ALL_TAGS = ['All', ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

// Deterministic gradient keyed off the project title, used as the image
// slot fallback before a real screenshot is dropped into /public/projects/.
// Two-stop mist → teal wash on light, espresso → champagne on dark —
// unique per project but always on-brand.
const FALLBACK_GRADIENTS = {
  light: [
    'linear-gradient(135deg, #E8F5F2 0%, #CFFAF4 50%, #0D9488 140%)',
    'linear-gradient(135deg, #ECFAF8 0%, #D6F0EA 55%, #0F766E 160%)',
    'linear-gradient(135deg, #E8EEFF 0%, #CFFAF4 60%, #0D9488 150%)',
    'linear-gradient(135deg, #E8F5F2 0%, #D6F0EA 45%, #14B8A6 130%)',
  ],
  dark: [
    'linear-gradient(135deg, #1B1714 0%, #2E2924 50%, #C5A059 140%)',
    'linear-gradient(135deg, #14110E 0%, #241F1A 55%, #D4AF37 160%)',
    'linear-gradient(135deg, #0E0C0A 0%, #2E2924 60%, #C5A059 150%)',
    'linear-gradient(135deg, #1B1714 0%, #241F1A 45%, #D4AF37 130%)',
  ],
};

function projectFallback(title, dark) {
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash * 31 + title.charCodeAt(i)) | 0;
  }
  const set = dark ? FALLBACK_GRADIENTS.dark : FALLBACK_GRADIENTS.light;
  return set[Math.abs(hash) % set.length];
}

function CategoryTag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-sand/70">
      <span aria-hidden className="h-3 w-px bg-rule" />
      {children}
      <span aria-hidden className="h-3 w-px bg-rule" />
    </span>
  );
}

// Skeleton card shown for a beat while the grid settles / filters animate.
// Matches the real card's fixed width + height behavior so the rail doesn't
// shift when content swaps in.
function CardSkeleton() {
  return (
    <div className="flex h-full w-[80vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-rule bg-card/70 sm:w-[420px]">
      <div className="skeleton aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col p-6">
        <div className="skeleton h-3 w-24 rounded-full" />
        <div className="skeleton mt-3 h-6 w-2/3 rounded" />
        <div className="skeleton mt-3 h-16 w-full rounded" />
        <div className="skeleton mt-3 h-4 w-1/2 rounded-full" />
        <div className="mt-4 flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, i }) {
  const dark = useIsDark();
  const fallback = projectFallback(p.title, dark);
  const monogram = p.title.charAt(0);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
      transition={{ duration: 0.45, delay: i * 0.05 }}
      // Fixed width so adjacent cards peek out of the viewport on every
      // breakpoint, signalling the rail is scrollable. snap-start aligns
      // cards to the left edge when the user scrolls. h-full + the rail's
      // items-stretch equalize all card heights to the tallest in the row.
      data-card
      className="group relative flex h-full w-[80vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-rule bg-card/70 shadow-[0_2px_16px_rgba(15,23,42,0.04)] transition-colors hover:border-accent/40 sm:w-[420px] dark:shadow-none"
    >
      {/* Image slot — 16:9. Shows a real screenshot when `image` exists in
          /public/projects/, otherwise a branded gradient + project monogram
          so the card never looks broken before assets are dropped in. */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{ background: fallback }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          // If the screenshot isn't dropped in yet, hide the broken <img> so the
          // gradient + monogram fallback shows through instead.
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Monogram shown over the gradient fallback (hidden once the real
            image loads, since it sits above the <img> via z-order). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="font-serif text-6xl font-semibold text-ink/10 dark:text-ink/15">
            {monogram}
          </span>
        </div>

        {/* Confidential / NDA chip — always visible, top-right. */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-rule/70 bg-card/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-700 backdrop-blur-sm dark:bg-[#0E0C0A]/80 dark:text-sand/80">
          <Lock size={11} className="text-accent" />
          Confidential
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[11px] uppercase tracking-[0.3em] text-accent/80">
          {p.tagline}
        </span>
        <h3 className="mt-3 font-serif text-2xl font-semibold text-ink">
          {p.title}
        </h3>
        {/* Company chip — makes the employer context explicit. */}
        <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-sand/70">
          {p.company}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-sand/70">{p.desc}</p>

        {/* Key metric */}
        {p.metric && (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink">
            <Gauge size={15} className="text-accent" />
            {p.metric}
          </p>
        )}

        {/* Tech badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-rule bg-mist/80 px-2.5 py-1 text-[11px] text-sand"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Footer — only renders a Live link when `live` is set (public
            projects). NDA-locked cards have no footer, so nothing looks
            broken or like a missing link. */}
        {p.live && (
          <div className="mt-5 flex items-center border-t border-rule pt-4">
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-deep"
            >
              <ExternalLink size={15} /> Live site
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

// Scroll the rail by roughly one card width. Used by the arrow buttons so the
// rail is navigable without a drag-capable pointer (desktop / keyboard users).
function scrollByCard(rail, dir) {
  if (!rail.current) return;
  const card = rail.current.querySelector('[data-card]');
  const step = card ? card.offsetWidth + 24 : 420; // 24 = gap-6
  rail.current.scrollBy({ left: dir * step, behavior: 'smooth' });
}

export default function Projects() {
  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(false);
  const railRef = useRef(null);

  // Translate vertical wheel/trackpad scrolling into horizontal rail scrolling
  // — the browser's native horizontal scroll only fires on shift+wheel, which
  // nobody discovers. We only redirect when the gesture is mostly vertical so
  // a genuine horizontal trackpad swipe still works natively. This keeps the
  // rail fully on native scroll momentum (no JS position setting), which is
  // why it stays smooth — we only nudge the input, never the output.
  function onWheel(e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      railRef.current.scrollLeft += e.deltaY;
    }
  }

  // Simulate a brief skeleton flash on filter change so the rail communicates
  // state change (and demonstrates the skeleton) without a real network hop.
  function selectTag(tag) {
    if (tag === active) return;
    setLoading(true);
    setActive(tag);
    setTimeout(() => setLoading(false), 220);
  }

  const filtered = useMemo(
    () =>
      active === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.tags.includes(active)),
    [active]
  );

  return (
    <section
      id="projects"
      aria-label="Work Projects"
      className="mx-auto flex max-w-7xl flex-col px-6 py-20"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <CategoryTag>Professional Work</CategoryTag>
          <motion.h2
            className="grunge-text mt-5 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            Work Projects
          </motion.h2>
          <p className="mt-3 max-w-2xl text-sand/70">
            Global-scale web, desktop, and mobile systems shipped for enterprise
            brands — and the AI tooling that keeps the team fast behind them.
            These are professional engagements under NDA, so links and source
            aren&apos;t shared publicly.
          </p>
        </div>

        {/* Arrow controls — desktop only. Visible at sm+ where a drag surface
            is less discoverable. Hidden on mobile, where native touch scroll
            is the natural interaction. */}
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(railRef, -1)}
            aria-label="Scroll projects left"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-card/70 text-sand transition-colors hover:border-accent/40 hover:text-ink"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(railRef, 1)}
            aria-label="Scroll projects right"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-card/70 text-sand transition-colors hover:border-accent/40 hover:text-ink"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Tag filter row */}
      <div className="mb-8 flex flex-wrap gap-2">
        {ALL_TAGS.map((t) => {
          const on = active === t;
          return (
            <button
              key={t}
              onClick={() => selectTag(t)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                on
                  ? 'border-accent bg-accent/10 text-accent-deep'
                  : 'border-rule bg-card/70 text-sand hover:border-accent/40 hover:text-ink'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Horizontal rail. Native scroll + scroll-snap-proximity gives the
          smoothest feel (no JS position-setting fighting momentum). onWheel
          redirects vertical trackpad/wheel input so the rail is scrollable
          without shift+wheel. items-stretch + h-full on cards equalizes card
          heights to the tallest in the row. */}
      <div
        ref={railRef}
        onWheel={onWheel}
        className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overscroll-x-contain pb-2 [scroll-padding-left:0] [scroll-padding-right:24px] [touch-action:pan-x]"
      >
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}