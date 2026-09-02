'use client';

import { useEffect, useState } from 'react';

/**
 * TableOfContents
 * Client component: builds a nav from the rendered article's <h2>/<h3>
 * headings, tracks scroll position, and highlights the active section.
 *
 * Reads headings from the DOM (rendered by MDXServer) rather than parsing
 * markdown, so it stays decoupled from the content engine.
 */
export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const article = document.getElementById('article-body');
    if (!article) return;
    const els = Array.from(article.querySelectorAll('h2, h3'));
    const items = els
      .map((el) => {
        const id = el.id || slugify(el.textContent);
        el.id = id;
        return {
          id,
          text: el.textContent.replace(/^#\s*/, ''),
          level: el.tagName === 'H2' ? 2 : 3,
        };
      })
      .filter((h) => h.text);
    setHeadings(items);

    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0 }
    );

    items.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sand/60">
        On this page
      </p>
      <ul className="space-y-2 border-l border-rule">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'ml-3' : ''}>
            <a
              href={`#${h.id}`}
              className={
                'block border-l-2 px-3 -ml-px transition-colors ' +
                (activeId === h.id
                  ? 'border-accent text-ink'
                  : 'border-transparent text-sand/70 hover:text-ink')
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}