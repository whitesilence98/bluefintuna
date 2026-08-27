/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Three.js ships ESM; transpile to avoid SSR/edge build issues.
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;