/**
 * stats.js
 * Single source of truth for the headline career metrics. Imported by both
 * the Hero sidebar (compact) and the About grid (verbose label), so the two
 * never drift out of sync. Keep all numerical claims here — the copy layers
 * (title / tagline / summary) deliberately avoid restating these numbers.
 */
export const STATS = [
  { k: '6+', v: 'Years engineering production software' },
  { k: '4,000+', v: 'Defects triaged' },
  { k: '100%', v: 'QA pass rate across major releases' },
  { k: '40%', v: 'API payload reduction' },
  { k: '25%', v: 'Faster cross-team delivery' },
];