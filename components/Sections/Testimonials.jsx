'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// PLACEHOLDER testimonials — replace these with real, attributed
// recommendations from colleagues or clients. The structure (name, title,
// company, quote) is wired; only the content is illustrative right now.
const TESTIMONIALS = [
  {
    name: '[ Colleague name ]',
    title: 'Engineering Manager · [ Company ]',
    quote:
      'A placeholder recommendation — replace with a real quote from a colleague describing your impact, ownership, and collaboration. Real endorsements carry far more weight than these stubs.',
  },
  {
    name: '[ Client / Tech lead name ]',
    title: 'Tech Lead · [ Client ]',
    quote:
      'A second placeholder — swap in a recommendation that speaks to specific outcomes: delivery speed, quality, mentoring, or architecture decisions you drove.',
  },
  {
    name: '[ Peer name ]',
    title: 'Senior Engineer · [ Company ]',
    quote:
      'A third placeholder — once you have real recommendations, drop them in here and remove this notice. The slider and layout are production-ready.',
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

// Initials avatar placeholder — no real photos on placeholder testimonials.
function Avatar({ name }) {
  const initials = name
    .replace(/[\[\]]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase();
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-card font-serif text-sm font-semibold text-accent">
      {initials || '··'}
    </div>
  );
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  const go = (dir) => setIdx((p) => (p + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      id="testimonials"
      aria-label="Recommendations"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col px-6 py-20"
    >
      <div className="mb-10 text-center">
        <div className="flex justify-center">
          <CategoryTag>Recommendations</CategoryTag>
        </div>
        <motion.h2
          className="grunge-text mt-5 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          In their words
        </motion.h2>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <Quote
          aria-hidden
          size={48}
          strokeWidth={1}
          className="mx-auto mb-6 text-accent/30"
        />

        <div className="relative min-h-[220px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <blockquote className="text-lg leading-relaxed text-sand sm:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-3">
                <Avatar name={t.name} />
                <div className="text-left">
                  <div className="font-serif text-base font-semibold text-ink">
                    {t.name}
                  </div>
                  <div className="text-xs uppercase tracking-[0.15em] text-sand/70">
                    {t.title}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-card/70 text-sand transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? 'w-6 bg-accent' : 'w-1.5 bg-rule hover:bg-sand/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-card/70 text-sand transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-sand/60">
          Placeholder quotes — real recommendations coming soon.
        </p>
      </div>
    </section>
  );
}