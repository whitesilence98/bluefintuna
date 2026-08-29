/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './content/blog/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#0E0C0A', // base background — deep warm espresso
          900: '#14110E',
          800: '#1B1714',
          700: '#241F1A',
        },
        ink: '#F5F2EC',        // primary text — warm ivory
        sand: '#C4BCB3',       // body copy — muted beige
        rule: '#2E2924',        // subtle warm borders / dividers
        champagne: '#C5A059',   // primary button fill — champagne/gold
        gold: '#D4AF37',
      },
      fontFamily: {
        // Single typeface (Cormorant Garamond) for the whole project.
        // All three tokens resolve to it so existing font-sans / font-serif /
        // font-display classes keep working without per-file edits.
        sans: ['var(--font-serif)', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#C4BCB3',
            '--tw-prose-headings': '#F5F2EC',
            '--tw-prose-links': '#C5A059',
            '--tw-prose-bold': '#F5F2EC',
            '--tw-prose-code': '#F5F2EC',
            '--tw-prose-quotes': '#C4BCB3',
            '--tw-prose-quote-borders': '#2E2924',
            '--tw-prose-bullets': '#2E2924',
            '--tw-prose-hr': '#2E2924',
            '--tw-prose-th-borders': '#2E2924',
            '--tw-prose-td-borders': '#2E2924',
            maxWidth: 'none',
            a: {
              textDecoration: 'underline',
              textDecorationColor: 'rgba(197,160,89,0.45)',
              textUnderlineOffset: '3px',
              fontWeight: '500',
            },
            'a:hover': { textDecorationColor: 'rgba(197,160,89,0.9)' },
            code: {
              background: 'rgba(245,242,236,0.06)',
              padding: '0.15em 0.4em',
              borderRadius: '0.3rem',
              fontWeight: '500',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            pre: {
              background: '#0E0C0A',
              border: '1px solid #2E2924',
              borderRadius: '0.75rem',
              padding: '1.1rem 1.25rem',
              overflowX: 'auto',
              fontSize: '0.85rem',
              lineHeight: '1.6',
            },
            'pre code': {
              background: 'transparent',
              padding: '0',
              border: 'none',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};