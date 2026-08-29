'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { formatDate, tagClass } from '@/lib/blog-helpers';

/**
 * BlogFilters
 * ----------
 * Client-side tag filter for the blog index. Receives the full post list
 * (fetched server-side in page.js) and renders the interactive filter row +
 * the animated post list. Mirrors the Projects section's filter aesthetic:
 * pill tags, AnimatePresence re-layout on change.
 */
export default function BlogFilters({ posts }) {
  const allTags = useMemo(
    () => ['All', ...Array.from(new Set(posts.flatMap((p) => p.tags)))],
    [posts]
  );
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? posts : posts.filter((p) => p.tags.includes(active))),
    [active, posts]
  );

  return (
    <>
      {/* Tag filter row */}
      <div className="mb-10 flex flex-wrap gap-2">
        {allTags.map((t) => {
          const on = active === t;
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
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

      {/* Post list with layout animation on filter change */}
      <ul className="divide-y divide-rule">
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4 }}
              className="py-8"
            >
              <article className="group">
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${tagClass(t)}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-ink transition-colors hover:text-champagne"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 max-w-2xl text-sand/70">{post.excerpt}</p>

                <div className="mt-4 flex items-center gap-3 text-xs text-sand/50">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {post.readTime} min read
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm text-champagne/80 transition-transform group-hover:translate-x-1"
                >
                  Read article →
                </Link>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-sand/50">
          No posts under this tag yet.
        </p>
      )}
    </>
  );
}