import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import {
  getAllSlugs,
  getPostBySlug,
  formatDate,
  tagClass,
} from '@/lib/posts';
import MdxServer from '@/components/MdxServer.jsx';
import TableOfContents from '@/components/TableOfContents.jsx';

const siteUrl = 'https://bluefintuna.vercel.app';

// Pipe-tagged category label (editorial style).
function CategoryTag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-sand/70">
      <span aria-hidden className="h-3 w-px bg-rule" />
      {children}
      <span aria-hidden className="h-3 w-px bg-rule" />
    </span>
  );
}

/** SSG: pre-render every post at build time. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** Dynamic per-post metadata for SEO + social cards. */
export function generateMetadata({ params }) {
  const post = getPostBySlug(params?.slug);
  if (!post) return {};

  const url = `${siteUrl}/blog/${post.slug}`;
  const title = post.title;
  const description = post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    twitter: {
      card: post.cover ? 'summary_large_image' : 'summary',
      title,
      description,
      images: post.cover ? [post.cover] : undefined,
    },
    keywords: post.tags,
  };
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params?.slug);
  if (!post) notFound();

  // JSON-LD Article schema for rich results. Pairs with the Person schema in
  // the root layout (author references the same entity).
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Tuan Nguyen',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-sand/70 transition-colors hover:text-champagne"
      >
        <ArrowLeft size={15} /> All posts
      </Link>

      {/* Header */}
      <header className="mb-10 max-w-3xl">
        <CategoryTag>Article</CategoryTag>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${tagClass(t)}`}
            >
              {t}
            </span>
          ))}
        </div>
        <h1 className="grunge-text mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-4 text-sm text-sand/60">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} strokeWidth={1.5} className="text-champagne/80" /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} strokeWidth={1.5} className="text-champagne/80" /> {post.readTime} min read
          </span>
          <span className="text-sand/60">by {post.author}</span>
        </div>
      </header>

      {/* Body + TOC */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div
          id="article-body"
          className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight prose-pre:bg-[#0E0C0A] prose-pre:border prose-pre:border-rule"
        >
          <MdxServer source={post.content} />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents />
          </div>
        </aside>
      </div>

      {/* Footer nav */}
      <div className="mt-16 border-t border-rule pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-sand/70 transition-colors hover:text-champagne"
        >
          <ArrowLeft size={15} /> Back to all posts
        </Link>
      </div>
    </article>
  );
}