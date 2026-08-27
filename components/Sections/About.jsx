'use client';

import { motion } from 'framer-motion';

// Stats live here; skills moved to <Skills/>.
const STATS = [
  { k: '6+', v: 'Years engineering production software' },
  { k: '4,000+', v: 'Defects triaged, 100% QA pass rate' },
  { k: '40%', v: 'API payload reduction via query optimization' },
  { k: '25%', v: 'Faster delivery through cross-functional integration' },
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

export default function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl scroll-mt-20 flex-col justify-center px-6 py-20"
    >
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <CategoryTag>About Me</CategoryTag>
          <h2 className="grunge-text mt-5 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Engineering software
            <br />
            that <span className="italic text-champagne">millions</span> rely on
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand">
            I&apos;m a Senior Software Engineer with 6+ years architecting and
            delivering global-scale web, Electron desktop, and modular
            application systems for enterprise brands like Razer.
          </p>
          <p className="mt-4 max-w-xl text-sand/70">
            My focus is end-to-end systems integration — connecting
            client-side engines with high-throughput microservices and
            distributed backends. I&apos;m an early adopter of local AI
            workflows (Ollama, Claude) for automated debugging and faster
            engineering velocity, and I mentor engineers across cross-functional
            architecture.
          </p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {STATS.map((s) => (
            <li
              key={s.v}
              className="rounded-2xl border border-rule bg-espresso-900/60 p-6"
            >
              <div className="font-serif text-3xl font-semibold text-ink">
                {s.k}
              </div>
              <div className="mt-2 text-sm text-sand/70">{s.v}</div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}