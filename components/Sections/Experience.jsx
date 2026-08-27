'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ChevronDown, MapPin } from 'lucide-react';

// Roles drawn from the CV's PROFESSIONAL EXPERIENCE + EDUCATION.
const ROLES = [
  {
    kind: 'work',
    company: 'S3 Corporation',
    client: 'Client: Razer Inc',
    title: 'Software Engineer (Outsourced to Razer)',
    period: 'Oct 2022 — Present',
    location: 'Ho Chi Minh, VN',
    summary:
      'Architecting modular microfrontends and desktop UI for Razer’s New Product Introduction team, plus internal AI tooling for the wider engineering org.',
    points: [
      'Spearheaded integration of modular microfrontends and desktop UI components for Razer’s NPI team — decoupled deployments with seamless microservice communication.',
      'Led end-to-end integration of new modules across firmware, mechanical, and QA units, reducing cross-team integration friction and cutting delivery time by 25%.',
      'Expanded unit test coverage and mock suites across complex state-driven components, triaging 4,000+ defects and maintaining a 100% QA pass rate across all major releases.',
      'Built internal AI tooling on Ollama and Claude for LLM-assisted debugging, lifting team debugging efficiency and code maintainability.',
    ],
    metrics: [
      { value: '25%', label: 'Faster delivery' },
      { value: '4,000+', label: 'Defects triaged' },
      { value: '100%', label: 'QA pass rate' },
    ],
    stack: ['Next.js', 'Electron', 'Microfrontends', 'Ollama', 'Claude'],
  },
  {
    kind: 'work',
    company: 'Rexy Technology',
    title: 'Frontend / Mobile Developer',
    period: 'Jun 2020 — Sep 2022',
    location: 'Ho Chi Minh, VN',
    summary:
      'Shipped production React/TypeScript web apps and cross-platform React Native mobile clients on AWS, with zero-regression CI/CD.',
    points: [
      'Built production React/TypeScript applications with GraphQL/REST APIs and AWS SDK (S3 uploads, Cognito auth), optimizing queries to reduce payload size by 40%.',
      'Developed iOS and Android applications using React Native, abstracting shared core business logic and API client modules from web platforms to accelerate feature delivery.',
      'Configured automated CI/CD workflows using Docker, Git, and Jest/React Testing Library, maintaining high test coverage and zero-regression Agile sprint releases.',
    ],
    metrics: [
      { value: '40%', label: 'Payload reduction' },
      { value: '0', label: 'Regressions shipped' },
    ],
    stack: ['React', 'TypeScript', 'React Native', 'GraphQL', 'AWS SDK', 'Docker'],
  },
];

const EDUCATION = [
  {
    school: 'University of Information Technology',
    degree: 'Bachelor of Engineering',
    period: '2016 — 2020',
    location: 'Ho Chi Minh, VN',
  },
];

function CategoryTag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-sand/70">
      <span aria-hidden className="h-3 w-px bg-rule" />
      {children}
      <span aria-hidden className="h-3 w-px bg-rule" />
    </span>
  );
}

// A single timeline milestone. Expandable for the bullet detail so the column
// stays scannable; summary + metrics always visible.
function TimelineCard({ role, index, isOpen, onToggle }) {
  const Icon = role.kind === 'work' ? Briefcase : GraduationCap;
  return (
    <motion.article
      className="relative pb-6 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      {/* Timeline node */}
      <span
        aria-hidden
        className="absolute -left-[33px] top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-champagne bg-espresso-950 sm:-left-[41px]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
      </span>

      <div
        className={`group rounded-2xl border bg-espresso-900/60 p-6 transition-colors sm:p-7 ${
          isOpen ? 'border-champagne/40' : 'border-rule hover:border-champagne/25'
        }`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="flex items-center gap-2.5">
            <Icon size={16} strokeWidth={1.5} className="text-champagne/80" />
            <h3 className="font-serif text-2xl font-semibold text-ink">
              {role.company}
            </h3>
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-champagne/80">
            {role.period}
          </span>
        </div>
        {role.client && (
          <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-sand/50">
            {role.client}
          </p>
        )}
        <p className="mt-2 text-sm text-sand">
          {role.title} · {role.location}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sand/75">
          {role.summary}
        </p>

        {/* Metrics row */}
        {role.metrics && (
          <div className="mt-5 flex flex-wrap gap-6">
            {role.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-serif text-2xl font-semibold leading-none text-ink">
                  {m.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-sand/55">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stack badges */}
        {role.stack && (
          <div className="mt-5 flex flex-wrap gap-2">
            {role.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-rule bg-espresso-950/50 px-2.5 py-1 text-[11px] text-sand/80"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Expandable detail */}
        {role.points && (
          <>
            <button
              onClick={onToggle}
              aria-expanded={isOpen}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-champagne/80 transition-colors hover:text-champagne"
            >
              {isOpen ? 'Hide details' : 'Read details'}
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={14} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  key="detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <li className="mt-4 space-y-2.5">
                    {role.points.map((p) => (
                      <p
                        key={p}
                        className="flex gap-3 text-sm leading-relaxed text-sand/75"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne/70"
                        />
                        {p}
                      </p>
                    ))}
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const [openIdx, setOpenIdx] = useState(0); // first role open by default

  return (
    <section
      id="experience"
      aria-label="Experience"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl scroll-mt-20 flex-col justify-center px-6 py-20"
    >
      <div className="mb-10">
        <CategoryTag>Professional Experience</CategoryTag>
        <motion.h2
          className="grunge-text mt-5 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          Career
        </motion.h2>
        <p className="mt-3 max-w-2xl text-sand/70">
          Six years shipping global-scale web, desktop, and mobile systems for
          enterprise brands — with the quality and AI-tooling rigor behind them.
        </p>
      </div>

      <div className="relative border-l border-rule pl-8 sm:pl-10">
        {ROLES.map((r, i) => (
          <TimelineCard
            key={r.company}
            role={r}
            index={i}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
          />
        ))}
      </div>

      {/* Education */}
      <div className="mt-12">
        <CategoryTag>Education</CategoryTag>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <motion.div
              key={e.school}
              className="rounded-2xl border border-rule bg-espresso-900/60 p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap size={16} strokeWidth={1.5} className="text-champagne/80" />
                <h3 className="font-serif text-xl font-semibold text-ink">
                  {e.school}
                </h3>
              </div>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-sm text-sand">{e.degree}</p>
                <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-champagne/80">
                  {e.period}
                </span>
              </div>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-sand/55">
                <MapPin size={12} /> {e.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}