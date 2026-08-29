import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import BlogFilters from '@/components/BlogFilters';

export const metadata = {
  title: 'Blog',
  description:
    'Technical articles by Tuan Nguyen — React Server Components, Next.js architecture, LLM prompt engineering, and local model deployment.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Tuan Nguyen — Blog',
    description:
      'Technical articles on React/Next.js architecture, LLM prompt engineering, and local model deployment.',
    url: '/blog',
    type: 'website',
  },
};

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

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/#blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-sand/70 transition-colors hover:text-champagne"
      >
        <ArrowLeft size={15} /> Back to home
      </Link>

      <header className="mb-12">
        <CategoryTag>Technical Blog</CategoryTag>
        <h1 className="grunge-text mt-5 font-serif text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
          Writing
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-sand/70">
          Technical writing on React architecture, LLM engineering, and the
          tools I build with. All posts are static — fast to read, easy to cite.
        </p>
      </header>

      {/* Client-side tag filter — posts are fetched server-side here, the
          filter state + animated list live in the BlogFilters client component. */}
      <BlogFilters posts={posts} />
    </div>
  );
}