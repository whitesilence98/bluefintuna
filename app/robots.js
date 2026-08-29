export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://bluefintuna.vercel.app/sitemap.xml',
  };
}