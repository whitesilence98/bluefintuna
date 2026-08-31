import { Figtree } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ScrollProgress';
import Toaster from '@/components/Toaster';

// Single typeface for the entire project. Figtree is an open-source geometric
// humanist sans — the closest legitimate substitute for Google Sans (which is
// proprietary and not licensed for third-party use). Legible at body sizes on
// the dark espresso background and carries headlines at semibold/bold weights.
// All three font tokens (sans/serif/display) map to it so existing utility
// classes keep working without per-file edits. Self-hosted via next/font — no
// external runtime font request.
const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

const siteUrl = 'https://bluefintuna.vercel.app';

export const viewport = {
  themeColor: '#0E0C0A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tuan Nguyen — Senior Software Engineer',
    template: '%s · Tuan Nguyen',
  },
  description:
    'Senior Software Engineer with 6+ years architecting modular web, Electron desktop, and microservice systems for enterprise brands like Razer. TypeScript, React, Next.js, Electron, and systems integration.',
  keywords: [
    'Tuan Nguyen',
    'Nguyen Duc Tuan',
    'Senior Software Engineer',
    'TypeScript',
    'React',
    'Next.js',
    'Electron',
    'React Native',
    'Microfrontends',
    'NestJS',
    'GraphQL',
    'Microservices',
    'PostgreSQL',
    'AWS',
    'Docker',
    'CI/CD',
    'Ollama',
    'Claude',
    'AI-assisted debugging',
    'portfolio',
  ],
  authors: [{ name: 'Tuan Nguyen', url: siteUrl }],
  creator: 'Tuan Nguyen',
  applicationName: 'Tuan Nguyen Portfolio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Tuan Nguyen',
    title: 'Tuan Nguyen — Senior Software Engineer',
    description:
      'Senior Software Engineer architecting global-scale web, desktop, and modular systems — TypeScript, React, Next.js, microservices, and local AI workflows.',
    // Drop a 1200×630 PNG at public/og.png to fill the social card.
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Tuan Nguyen — Senior Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tuan Nguyen — Senior Software Engineer',
    description:
      'Senior Software Engineer — TypeScript, React, Next.js, Electron, microservices, and local AI workflows (Ollama, Claude).',
    creator: '@whitesilence98',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Icons are served via Next.js file-based metadata:
  // app/icon.svg (browser tab) and app/apple-icon.png (Apple touch).
  // No manual /favicon.ico reference — Next handles it automatically.
};

export default function RootLayout({ children }) {
  // JSON-LD structured data for rich SEO results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tuan Nguyen',
    givenName: 'Tuan',
    familyName: 'Nguyen',
    url: siteUrl,
    email: 'mailto:98tuannguyen@gmail.com',
    telephone: '+84976649000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN',
    },
    jobTitle: 'Senior Software Engineer',
    knowsAbout: [
      'TypeScript',
      'React',
      'Next.js',
      'Electron',
      'Microfrontends',
      'Microservices',
      'NestJS',
      'GraphQL',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Ollama',
      'AI-assisted debugging',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Information Technology',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ho Chi Minh City',
        addressCountry: 'VN',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: 'S3 Corporation',
    },
    sameAs: [
      'https://github.com/whitesilence98',
      'https://www.linkedin.com/in/tuan-nguyend',
    ],
  };

  return (
    <html lang="en" className={figtree.variable}>
      <body className="font-sans bg-espresso-950 text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        {children}
        <Toaster />
      </body>
    </html>
  );
}