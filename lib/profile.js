/**
 * profile.js
 * At-a-glance profile facts for the Hero sidebar — the "who I am" layer
 * (role, years, location, core stack). Distinct from lib/stats.js, which
 * holds the achievement metrics (defects, payload reduction, etc.) that
 * belong in the Experience section. Everything here traces to the CV.
 */
export const PROFILE = {
  role: 'Senior Software Engineer',
  focus: 'Web · Desktop · Systems Integration',
  yoe: '6+',
  yoeLabel: 'Years engineering production software',
  location: 'Ho Chi Minh, VN',
  // Curated top-of-funnel stack — the full list lives in the Skills section.
  stack: [
    'TypeScript',
    'React',
    'Next.js',
    'Electron',
    'Microfrontends',
    'NestJS',
    'GraphQL',
    'PostgreSQL',
  ],
};