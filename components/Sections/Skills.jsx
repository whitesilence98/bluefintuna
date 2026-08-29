'use client';

import { motion } from 'framer-motion';

// Skills split into their own section so each #section fits one viewport.
const SKILL_GROUPS = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'C#'] },
  { label: 'Client', items: ['Next.js', 'Electron.js', 'React Native', 'Microfrontends', 'Redux/RTK', 'Zustand', 'XState', 'GraphQL'] },
  { label: 'Backend', items: ['NestJS', 'Express.js', 'ASP.NET', 'REST', 'GraphQL', 'Microservices'] },
  { label: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'TypeORM', 'Indexing'] },
  { label: 'DevOps', items: ['Docker', 'CI/CD', 'Git', 'Vite', 'Webpack', 'Linux'] },
  { label: 'Testing', items: ['Jest', 'Vitest', 'React Testing Library', 'Cypress'] },
  { label: 'AI', items: ['Ollama', 'Claude', 'Copilot', 'Prompt Engineering', 'AI-assisted Debugging'] },
];

// Uppercase tracked-out category tag wrapped in vertical pipes (editorial style).
function CategoryTag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-sand/70">
      <span aria-hidden className="h-3 w-px bg-rule" />
      {children}
      <span aria-hidden className="h-3 w-px bg-rule" />
    </span>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl scroll-mt-20 flex-col px-6 py-20"
    >
      <div className="mb-10">
        <CategoryTag>Technical Skills</CategoryTag>
        <motion.h2
          className="grunge-text mt-5 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          The Stack
        </motion.h2>
      </div>

      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-champagne/80">
              {g.label}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-rule bg-espresso-900/60 px-3 py-1 text-xs text-sand"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}