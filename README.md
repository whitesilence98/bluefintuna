# Bluefin Tuna — Tuan Nguyen Portfolio

High-performance, SEO-friendly Next.js portfolio with an interactive WebGL
3D character in the hero.

## Stack
- Next.js (App Router) + React 18
- Three.js via `@react-three/fiber` + `@react-three/drei`
- Tailwind CSS · Framer Motion · lucide-react
- Fonts via `next/font/google` (zero render-blocking)

## Getting started
```bash
npm install
npm run dev
```

## Adding a real 3D character
Drop a `.glb` file at `public/models/character.glb`.
`components/Canvas/Character3D.jsx` already loads it via `useGLTF` and
preloads the cache. Until the file exists, a primitive-built bust renders
as a fallback so the hero is never empty.

## Structure
```
app/
  layout.js          # Metadata API + next/font + JSON-LD
  page.js            # Composes Header + Hero + sections
  globals.css        # Tailwind + grunge utilities
components/
  Canvas/Character3D.jsx   # R3F canvas, lighting, mouse-tracking, pills
  Header.jsx               # Brand + smooth-scroll nav + socials
  Hero.jsx                 # 2-col layout, dynamic ssr:false 3D import
  Sections/                # Projects / About / Contact skeletons
```

## Performance notes
- 3D Canvas is `next/dynamic` with `ssr:false` → never blocks FCP/LCP.
- `dpr={[1,2]}` caps pixel ratio to avoid mobile GPU thrash.
- `Suspense` fallback skeleton while the mesh hydrates.
- `prefers-reduced-motion` respected.