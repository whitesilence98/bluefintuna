import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { getAllPosts, formatDate, tagClass } from '@/lib/posts';

export const metadata = {
  title: 'Blog',
  description:
    'Technical articles on ComfyUI workflows, AI image synthesis, LLM prompt engineering, and local model deployment by Tuan Nguyen.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Tuan Nguyen — Blog',
    description:
      'Technical articles on ComfyUI workflows, LLM prompt engineering, and local model deployment.',
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
          Technical writing on ComfyUI pipelines, LLM engineering, and the
          tools I build with. All posts are static — fast to read, easy to cite.
        </p>
      </header>

      <ul className="divide-y divide-rule">
        {posts.map((post) => (
          <li key={post.slug} className="py-8">
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
          </li>
        ))}
      </ul>
    </div>
  );
}