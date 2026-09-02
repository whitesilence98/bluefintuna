/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './content/blog/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // All theme colors are defined as CSS channel variables (space-
        // separated R G B) declared in app/globals.css — light values on
        // :root, dark (original espresso) values under .dark. The
        // <alpha-value> placeholder means every opacity modifier
        // (bg-accent/40, text-ink/15, …) keeps working in both themes.
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        sand: 'rgb(var(--c-sand) / <alpha-value>)',
        rule: 'rgb(var(--c-rule) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        mist: 'rgb(var(--c-mist) / <alpha-value>)',
        lavender: 'rgb(var(--c-lavender) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-deep': 'rgb(var(--c-accent-deep) / <alpha-value>)',
      },
      fontFamily: {
        // Single typeface (Figtree) for the whole project. All three tokens
        // resolve to var(--font-sans) (injected by next/font in app/layout.js)
        // so existing font-sans / font-serif / font-display classes keep
        // working without per-file edits.
        sans: ['var(--font-sans)', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-sans)', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-sans)', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
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
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--c-sand))',
            '--tw-prose-headings': 'rgb(var(--c-ink))',
            '--tw-prose-links': 'rgb(var(--c-accent))',
            '--tw-prose-bold': 'rgb(var(--c-ink))',
            '--tw-prose-code': 'rgb(var(--c-ink))',
            '--tw-prose-quotes': 'rgb(var(--c-sand))',
            '--tw-prose-quote-borders': 'rgb(var(--c-accent))',
            '--tw-prose-bullets': 'rgb(var(--c-rule))',
            '--tw-prose-hr': 'rgb(var(--c-rule))',
            '--tw-prose-th-borders': 'rgb(var(--c-rule))',
            '--tw-prose-td-borders': 'rgb(var(--c-rule))',
            maxWidth: 'none',
            a: {
              textDecoration: 'underline',
              textDecorationColor: 'rgb(var(--c-accent) / 0.4)',
              textUnderlineOffset: '3px',
              fontWeight: '500',
            },
            'a:hover': { textDecorationColor: 'rgb(var(--c-accent) / 0.9)' },
            code: {
              background: 'rgb(var(--c-rule) / 0.45)',
              padding: '0.15em 0.4em',
              borderRadius: '0.3rem',
              fontWeight: '500',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            pre: {
              background: 'rgb(var(--c-pre))',
              border: '1px solid rgb(var(--c-rule))',
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
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};