/**
 * blog-helpers.js
 * Pure, client-safe helpers shared by server and client components.
 * No Node-only imports (fs/path) here — those live in lib/posts.js.
 */

/** Topic -> tailwind class for colored tag chips. */
export const TAG_STYLES = {
  ComfyUI: 'bg-amber-500/10 text-amber-300 ring-amber-500/20',
  LLMs: 'bg-sky-500/10 text-sky-500/20',
  default: 'bg-white/5 text-white/70 ring-white/10',
};

export function tagClass(tag) {
  return TAG_STYLES[tag] || TAG_STYLES.default;
}

/** Format an ISO 'YYYY-MM-DD' into a human label. */
export function formatDate(date) {
  const d = new Date(`${date}T00:00:00Z`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}