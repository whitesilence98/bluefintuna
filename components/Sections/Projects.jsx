'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Gauge } from 'lucide-react';

// Project cards drawn from real CV experience, enriched with case-study
// indicators: live link, repo link, key metric, and dynamic tech badges.
const PROJECTS = [
  {
    title: 'Razer NPI Platform',
    tagline: 'Modular microfrontends + desktop UI',
    tags: ['Microfrontends', 'Electron', 'Next.js', 'Enterprise'],
    desc: 'Decoupled deployments talking to underlying microservices across firmware, mechanical, and QA units for Razer’s New Product Introduction team.',
    metric: '25% faster cross-team delivery',
    stack: ['Next.js', 'Electron', 'Microfrontends', 'NestJS'],
    live: 'https://linkedin.com/in/tuan-nguyend',
    repo: null, // proprietary — no public repo
  },
  {
    title: 'LLM-Assisted Debugging Tooling',
    tagline: 'Internal AI tools for engineering velocity',
    tags: ['AI', 'Ollama', 'Claude', 'Internal Tools'],
    desc: 'Local-model (Ollama, Claude) tooling for automated log analysis and debugging — built to lift engineering velocity and code maintainability across the team.',
    metric: 'Team-wide debugging speedup',
    stack: ['Ollama', 'Claude', 'TypeScript', 'Prompt Engineering'],
    live: null,
    repo: 'https://github.com/whitesilence98',
  },
  {
    title: 'Cross-Platform Mobile Apps',
    tagline: 'iOS + Android from a shared core',
    tags: ['Mobile', 'React Native', 'GraphQL', 'AWS'],
    desc: 'iOS + Android apps with shared core business logic and API clients abstracted from the web platform, accelerating feature delivery across surfaces.',
    metric: 'Shared core → faster feature ship',
    stack: ['React Native', 'GraphQL', 'AWS SDK', 'Cognito'],
    live: 'https://linkedin.com/in/tuan-nguyend',
    repo: 'https://github.com/whitesilence98',
  },
  {
    title: 'Optimized Data Layer',
    tagline: 'Query optimization + AWS integrations',
    tags: ['Web', 'TypeScript', 'Optimization', 'AWS'],
    desc: 'Production React/TypeScript apps with GraphQL/REST APIs and AWS SDK (S3 uploads, Cognito auth) — query optimization cut payload size by 40%.',
    metric: '40% payload reduction',
    stack: ['TypeScript', 'REST', 'GraphQL', 'PostgreSQL'],
    live: 'https://linkedin.com/in/tuan-nguyend',
    repo: 'https://github.com/whitesilence98',
  },
];

const ALL_TAGS = ['All', ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))];

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
    <div className="rounded-2xl border border-rule bg-espresso-900/60 p-7">
      <div className="skeleton h-3 w-24 rounded-full" />
      <div className="skeleton mt-4 h-6 w-2/3 rounded" />
      <div className="skeleton mt-4 h-16 w-full rounded" />
      <div className="skeleton mt-4 h-4 w-1/2 rounded-full" />
      <div className="mt-6 flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

function ProjectCard({ p, i }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
      transition={{ duration: 0.45, delay: i * 0.05 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-espresso-900/60 p-7 transition-colors hover:border-champagne/40"
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx,50%) var(--my,0%), rgba(197,160,89,0.08), transparent 40%)',
        }}
      />
      <span className="text-[11px] uppercase tracking-[0.3em] text-champagne/70">
        {p.tagline}
      </span>
      <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">
        {p.title}
      </h3>
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

      {/* Case-study links */}
      <div className="mt-6 flex items-center gap-4 border-t border-rule pt-5">
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-champagne/90 transition-colors hover:text-champagne"
          >
            <ExternalLink size={15} /> Live
          </a>
        )}
        {p.repo && (
          <a
            href={p.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-sand/70 transition-colors hover:text-ink"
          >
            <Github size={15} /> Code
          </a>
        )}
        <span className="ml-auto inline-flex items-center gap-1 text-sm text-sand/50 transition-transform group-hover:translate-x-1">
          Case study <ArrowUpRight size={14} />
        </span>
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
      aria-label="Projects"
      className="mx-auto flex max-w-7xl scroll-mt-20 flex-col px-6 py-20"
    >
      <div className="mb-8">
        <CategoryTag>Selected Work</CategoryTag>
        <motion.h2
          className="grunge-text mt-5 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <p className="mt-3 max-w-2xl text-sand/70">
          Global-scale web, desktop, and mobile systems shipped for enterprise
          brands — and the AI tooling that keeps the team fast behind them.
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