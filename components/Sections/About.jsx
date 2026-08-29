'use client';

import { motion } from 'framer-motion';
import { STATS } from '@/lib/stats';

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
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl scroll-mt-20 flex-col px-6 py-20"
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
            The seam that
            <br />
            <span className="text-champagne">speeds teams up</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand">
            I focus on the integration boundary — the place where modular web and
            Electron desktop surfaces meet distributed services. The work is
            making that boundary invisible: clean contracts, independent
            deployments, and quality bars that hold under release pressure.
          </p>
          <p className="mt-4 max-w-xl text-sand/70">
            For teams shipping hardware-adjacent software, that seam is usually
            where delivery slows down. I make it the part that speeds up —
            owning the contracts between firmware, mechanical, and QA units so
            modules ship independently and integrate cleanly.
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