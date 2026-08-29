export default function manifest() {
  return {
    name: 'Tuan Nguyen — Senior Software Engineer',
    short_name: 'Tuan Nguyen',
    description: 'Senior Software Engineer — TypeScript, React, Next.js, Electron, microservices, and local AI workflows.',
    start_url: '/',
    background_color: '#0E0C0A',
    theme_color: '#0E0C0A',
    display: 'standalone',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}