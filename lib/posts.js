import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { formatDate, tagClass, TAG_STYLES } from './blog-helpers.js';

export { formatDate, tagClass, TAG_STYLES };

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * posts.js
 * -------
 * Local MDX/markdown post utilities. All functions are synchronous and run
 * only on the server (Node fs), so they are safe to call from Server
 * Components, generateStaticParams and generateMetadata — never from client
 * components.
 *
 * Frontmatter contract:
 *   title:     string
 *   date:      'YYYY-MM-DD'
 *   excerpt:   string (plain text, used in cards + OG descriptions)
 *   tags:      string[] (e.g. ['ComfyUI', 'LLMs'])
 *   author:    string (optional, defaults to site author)
 *   cover:     string (optional, path to OG/cover image)
 */

// Words-per-minute baseline for read-time estimation.
const WPM = 220;

/** Reading time in minutes from raw markdown body text. */
function estimateReadTime(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WPM));
}

/** Parse one .mdx file into a post metadata object (without body). */
function parsePostFile(filePath, slug) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(raw);
  const date = frontmatter.date instanceof Date ? frontmatter.date.toISOString().slice(0, 10) : String(frontmatter.date || '');

  return {
    slug,
    title: frontmatter.title || slug,
    date,
    excerpt: frontmatter.excerpt || '',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    author: frontmatter.author || 'Tuan Nguyen',
    cover: frontmatter.cover || null,
    readTime: estimateReadTime(content),
  };
}

/** List all post metadata, newest first. */
export function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    return parsePostFile(path.join(BLOG_DIR, file), slug);
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Newest N posts — used by the homepage BlogSection. */
export function getRecentPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}

/** Get the raw (frontmatter + body) source for a single slug, or null. */
export function getPostBySlug(slug) {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(raw);
  const date = frontmatter.date instanceof Date ? frontmatter.date.toISOString().slice(0, 10) : String(frontmatter.date || '');
  return {
    slug,
    title: frontmatter.title || slug,
    date,
    excerpt: frontmatter.excerpt || '',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    author: frontmatter.author || 'Tuan Nguyen',
    cover: frontmatter.cover || null,
    readTime: estimateReadTime(content),
    content,
  };
}

/** Slugs for generateStaticParams. */
export function getAllSlugs() {
  return getAllPosts().map((p) => p.slug);
}

// formatDate / tagClass / TAG_STYLES are re-exported from ./blog-helpers.js
// (see the import at the top of this file) so client components can import
// them without pulling in this file's node:fs / node:path dependencies.