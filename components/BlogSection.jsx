'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { formatDate, tagClass } from '@/lib/blog-helpers';

/**
 * BlogSection
 * Homepage grid of recent technical articles. Pure presentational —
 * receives posts from the server component (app/page.js).
 * One viewport on desktop; ambient light palette; serif headline.
 */
export default function BlogSection({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section
      id="blog"
      aria-label="Blog"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-6 py-20"
    >
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-sand/70">
            <span aria-hidden className="h-3 w-px bg-rule" />
            Technical Blog
            <span aria-hidden className="h-3 w-px bg-rule" />
          </span>
          <motion.h2
            className="grunge-text mt-5 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            Writing
          </motion.h2>
          <p className="mt-3 max-w-xl text-sand/70">
            Technical notes on ComfyUI pipelines, LLM engineering, and the
            tools I build with.
          </p>
        </div>
        <Link
          href="/blog"
          className="hidden shrink-0 items-center gap-1 text-sm text-sand/70 transition-colors hover:text-accent sm:inline-flex"
        >
          All posts
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 sm:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-sand/70"
        >
          All posts <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}

function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-rule bg-card/70 p-6 shadow-[0_2px_16px_rgba(15,23,42,0.04)] transition-colors hover:border-accent/40 dark:shadow-none"
    >
      <div className="flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span
            key={t}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${tagClass(t)}`}
          >
            {t}
          </span>
        ))}
      </div>

      <h3 className="mt-4 font-serif text-xl font-semibold leading-snug text-ink">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-sand/70">
        {post.excerpt}
      </p>

      <div className="mt-5 flex items-center gap-3 text-xs text-sand/50">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {post.readTime} min
        </span>
      </div>

      <span className="mt-5 inline-flex items-center gap-1 text-sm text-accent transition-transform group-hover:translate-x-1">
        Read article
        <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}