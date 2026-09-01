'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Lock, ExternalLink } from 'lucide-react';

// Professional work engagements. Most are under NDA — no public URLs or code
// links exposed. Each card surfaces a project's name, a screenshot (drop a real
// file at `image` under /public/projects/), a one-line tagline, an optional key
// metric, and the tech stack. The "Confidential" chip makes the NDA context
// explicit so recruiters don't expect a live link. A `live` URL is only set on
// the NDA context explicit so recruiters don't expect a live link.
const PROJECTS = [
  {
    title: 'Razer NPI Platform',
    company: 'Razer',
    tagline: 'Modular microfrontends + desktop UI',
    tags: ['Microfrontends', 'Electron', 'Next.js', 'Enterprise'],
    desc: 'Decoupled deployments talking to underlying microservices across firmware, mechanical, and QA units for Razer’s New Product Introduction team.',
    metric: '25% faster cross-team delivery',
    stack: ['Next.js', 'Electron', 'Microfrontends', 'NestJS'],
    image: '/projects/razer-npi.png',
  },
  {
    title: 'LLM-Assisted Debugging Tooling',
    company: 'Razer',
    tagline: 'Internal AI tools for engineering velocity',
    tags: ['AI', 'Ollama', 'Claude', 'Internal Tools'],
    desc: 'Local-model (Ollama, Claude) tooling for automated log analysis and debugging — built to lift engineering velocity and code maintainability across the team.',
    metric: 'Team-wide debugging speedup',
    stack: ['Ollama', 'Claude', 'TypeScript', 'Prompt Engineering'],
    image: '/projects/llm-debug-tooling.png',
  },
  {
    title: 'Cross-Platform Mobile Apps',
    company: 'Rexy Technology',
    tagline: 'iOS + Android from a shared core',
    tags: ['Mobile', 'React Native', 'GraphQL', 'AWS'],
    desc: 'iOS + Android apps with shared core business logic and API clients abstracted from the web platform, accelerating feature delivery across surfaces.',
    metric: 'Shared core → faster feature ship',
    stack: ['React Native', 'GraphQL', 'AWS SDK', 'Cognito'],
    image: '/projects/cross-platform-mobile.png',
  },
  {
    title: 'Optimized Data Layer',
    company: 'Rexy Technology',
    tagline: 'Query optimization + AWS integrations',
    tags: ['Web', 'TypeScript', 'Optimization', 'AWS'],
    desc: 'Production React/TypeScript apps with GraphQL/REST APIs and AWS SDK (S3 uploads, Cognito auth) — query optimization cut payload size by 40%.',
    metric: '40% payload reduction',
    stack: ['TypeScript', 'REST', 'GraphQL', 'PostgreSQL'],
    image: '/projects/optimized-data-layer.png',
  },
  {
    title: 'Beauty Undercover',
    company: 'Rexy Technology',
    tagline: 'Spa booking & blog platform',
    tags: ['Web', 'Next.js', 'GraphQL', 'AWS'],
    desc: 'A booking platform for spas in Singapore — primarily a spa appointment booking system, with an editorial blog (skincare, makeup, hair, wellness) as a secondary content surface. Built the Next.js front-end with a GraphQL data layer, AWS SDK integrations, and an SEO-optimized content architecture (circa 2020–2021).',
    metric: 'Live platform',
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

// Deterministic warm gradient keyed off the project title, used as the image
// slot fallback before a real screenshot is dropped into /public/projects/.
// Two-stop espresso → champagne wash, unique per project but always on-brand.
const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg, #1B1714 0%, #2E2924 50%, #C5A059 140%)',
  'linear-gradient(135deg, #14110E 0%, #241F1A 55%, #D4AF37 160%)',
  'linear-gradient(135deg, #0E0C0A 0%, #2E2924 60%, #C5A059 150%)',
  'linear-gradient(135deg, #1B1714 0%, #241F1A 45%, #D4AF37 130%)',
];

function projectFallback(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash * 31 + title.charCodeAt(i)) | 0;
  }
  return FALLBACK_GRADIENTS[Math.abs(hash) % FALLBACK_GRADIENTS.length];
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
function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-rule bg-espresso-900/60">
      <div className="skeleton aspect-[16/9] w-full" />
      <div className="p-7">
        <div className="skeleton h-3 w-24 rounded-full" />
        <div className="skeleton mt-4 h-6 w-2/3 rounded" />
        <div className="skeleton mt-4 h-16 w-full rounded" />
        <div className="skeleton mt-4 h-4 w-1/2 rounded-full" />
        <div className="mt-6 flex gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, i }) {
  const fallback = projectFallback(p.title);
  const monogram = p.title.charAt(0);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
      transition={{ duration: 0.45, delay: i * 0.05 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-espresso-900/60 transition-colors hover:border-champagne/40"
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
          <span className="font-serif text-6xl font-semibold text-ink/15">
            {monogram}
          </span>
        </div>

        {/* Confidential / NDA chip — always visible, top-right. */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-rule/70 bg-espresso-950/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-sand/80 backdrop-blur-sm">
          <Lock size={11} className="text-champagne/80" />
          Confidential
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <span className="text-[11px] uppercase tracking-[0.3em] text-champagne/70">
          {p.tagline}
        </span>
        <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">
          {p.title}
        </h3>
        {/* Company chip — makes the employer context explicit. */}
        <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-sand/55">
          {p.company}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-sand/70">{p.desc}</p>

        {/* Key metric */}
        {p.metric && (
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
            <Gauge size={15} className="text-champagne/80" />
            {p.metric}
          </p>
        )}

        {/* Tech badges */}
        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-rule bg-espresso-950/50 px-2.5 py-1 text-[11px] text-sand/80"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Footer — only renders a Live link when `live` is set (public
            projects). NDA-locked cards have no footer, so nothing looks
            broken or like a missing link. */}
        {p.live && (
          <div className="mt-6 flex items-center border-t border-rule pt-5">
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-champagne/90 transition-colors hover:text-champagne"
            >
              <ExternalLink size={15} /> Live site
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');
  const [loading, setLoading] = useState(false);

  // Simulate a brief skeleton flash on filter change so the grid communicates
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
      <div className="mb-8">
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
          aren't shared publicly.
        </p>
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
                  ? 'border-champagne bg-champagne/15 text-champagne'
                  : 'border-rule bg-espresso-900/60 text-sand/70 hover:border-champagne/40 hover:text-ink'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {loading ? (
          <>
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