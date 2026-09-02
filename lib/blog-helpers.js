/**
 * blog-helpers.js
 * Pure, client-safe helpers shared by server and client components.
 * No Node-only imports (fs/path) here — those live in lib/posts.js.
 */

/** Topic -> tailwind class for colored tag chips (light + dark variants). */
export const TAG_STYLES = {
  ComfyUI:
    'bg-amber-100/80 text-amber-800 ring-amber-300/50 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20',
  LLMs: 'bg-sky-100/80 text-sky-800 ring-sky-300/50 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20',
  default:
    'bg-lavender text-slate-700 ring-indigo-200 dark:bg-white/5 dark:text-white/70 dark:ring-white/10',
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