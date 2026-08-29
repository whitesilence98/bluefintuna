import { getAllSlugs } from '@/lib/posts';

/**
 * sitemap.js
 * Next.js file-based sitemap. Served at /sitemap.xml — referenced by robots.js.
 * Static routes are listed manually; blog post routes are generated from the
 * MDX frontmatter so new posts appear without editing this file.
 */
export default function sitemap() {
  const base = 'https://bluefintuna.vercel.app';
  const lastModified = new Date();

  const staticRoutes = [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const postRoutes = getAllSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified,
  }));

  return [...staticRoutes, ...postRoutes];
}