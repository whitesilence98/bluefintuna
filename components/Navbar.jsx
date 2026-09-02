'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

/**
 * Navbar
 * ------
 * Minimal editorial header matching the reference:
 *   - Left: small teal emblem only (no brand text)
 *   - Right: small all-caps tracked-out links
 *   - At rest: full-width, transparent
 *   - On scroll: shrinks into a centered floating pill (blur + border)
 *   - Mobile: minimal fullscreen drawer
 *
 * The at-rest → pill transition tweens `width` in *pixels on both ends*
 * (measured via refs). Animating `100%` → `fit-content` snaps because
 * framer-motion can't interpolate between those value types — and the old
 * className ternary swapped padding/layout/border classes instantly while
 * the motion values tweened, so the two halves of the change desynced.
 * Measuring both states lets every property (width, padding, radius, y,
 * background, blur, border, shadow) animate together as one transformation.
 */

// Nav order mirrors the actual section order in app/page.js so the links
// map 1:1 to what a visitor sees scrolling top→bottom.
// Blog points to /#blog (homepage section), not /blog (blog index route).
const NAV = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Praise', href: '/#testimonials' },
  { label: 'Blog', href: '/#blog' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

// Pronounced ease-out so the pill "settles" into place instead of
// decelerating linearly.
const EASE = [0.22, 1, 0.36, 1];

// Minimal geometric emblem — small, subtle, teal.
function Emblem({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Eight-point compass/star */}
      <path
        d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="12" cy="11" r="1.5" fill="#0E0C0A" opacity="0.6" className="dark:fill-white dark:opacity-85" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const [viewport, setViewport] = useState(0); // px width of the at-rest bar
  const [pill, setPill] = useState(0); // px width of the shrunk pill

  // Deliberately NOT gated on prefers-reduced-motion: the full-width → pill
  // morph is a functional state change (it signals "you are scrolled"),
  // not decorative motion — it's small, doesn't sweep the viewport, and
  // can't trigger vestibular discomfort. Gating it makes the navbar appear
  // to teleport. The mobile drawer keeps its own (unaffected) springs.
  const duration = 0.45;

  // Lock body scroll while drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Measure both navbar widths. The pill width is derived by summing the
  // visible children + horizontal padding + gaps, because the element
  // itself never renders at its natural width (it's 100% at rest).
  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav) return;
      const cs = getComputedStyle(nav);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const gap = parseFloat(cs.columnGap) || 0;
      // Hidden children (e.g. the desktop <ul> on mobile) report 0 width.
      const visible = [...nav.children].filter(
        (child) => child.getBoundingClientRect().width > 0
      );
      const content = visible.reduce(
        (sum, child) => sum + child.getBoundingClientRect().width,
        0
      );
      // Cap at the max-w-7xl content width so the navbar's edges line up
      // with the section containers below on large viewports.
      setViewport(Math.min(window.innerWidth, 1280));
      setPill(Math.round(padX + content + gap * Math.max(visible.length - 1, 0)));
    };

    measure();
    window.addEventListener('resize', measure);
    // Re-measure once webfonts land — the tracked-out nav text reflows.
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Flip to pill mode past 24px of scroll, but only flip back below 8px.
  // The hysteresis band prevents flicker when scrolling near the threshold.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (y > 24 ? true : y < 8 ? false : prev));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Both states are px so the width tween interpolates. '100%' is only the
  // pre-measurement fallback (visually identical to `viewport` at rest).
  // At rest the bar matches the content grid: max-w-7xl (80rem = 1280px),
  // same px-6 gutters — so on big screens it aligns with the sections
  // below instead of spanning edge-to-edge.
  const targetWidth = !viewport
    ? '100%'
    : scrolled
      ? Math.min(pill || viewport, viewport - 32)
      : viewport;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Full-width at rest; on scroll the measured width + mx-auto shrink
          the bar symmetrically, so both edges slide inward to form the
          pill. Layout classes are static — every visual difference between
          the two states is tweened by framer-motion. */}
      <motion.nav
        ref={navRef}
        initial={false}
        animate={{
          width: targetWidth,
          y: scrolled ? 16 : 0,
          paddingTop: scrolled ? 12 : 20,
          paddingBottom: scrolled ? 12 : 20,
        }}
        transition={{ duration, ease: EASE }}
        className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6"
        aria-label="Primary"
      >
        {/* Pill skin: blur / border / shadow live here, STATIC, and only
            `opacity` is animated. Interpolating backdrop-filter or
            box-shadow repaints (and re-blurs the WebGL canvas behind)
            every frame — a plain opacity fade is compositor-only, so the
            pill appears already fully formed and just fades in. Rendered
            only while scrolled so no blur layer exists at rest. */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration, ease: EASE }}
              className="absolute inset-0 rounded-2xl border border-rule bg-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-md dark:bg-[#14110E]/85 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            />
          )}
        </AnimatePresence>

        {/* Left: emblem */}
        <Link
          href="/#home"
          className="relative text-accent transition-opacity hover:opacity-80"
          aria-label="Tuan Nguyen — home"
        >
          <motion.span
            className="block"
            animate={{ scale: scrolled ? 0.85 : 1 }}
            transition={{ duration, ease: EASE }}
          >
            <Emblem className="h-6 w-6" />
          </motion.span>
        </Link>

        {/* Right (desktop): nav links + theme toggle; Mobile: toggle + hamburger. */}
        <div className="relative flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="flex items-center text-sand transition-colors hover:text-ink"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Right (desktop): nav links + theme toggle */}
        <ul className="relative hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-sand transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </motion.nav>

      {/* Mobile fullscreen drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-white/85 backdrop-blur-sm dark:bg-[#0E0C0A]/90"
            />

            {/* Panel */}
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col items-center justify-center px-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <button
                className="absolute right-6 top-6 text-sand transition-colors hover:text-ink"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={22} strokeWidth={1.5} />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Emblem className="mb-12 h-8 w-8 text-accent" />
              </motion.div>

              <ul className="flex flex-col items-center gap-7">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, type: 'spring', stiffness: 280, damping: 24 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-xs font-medium uppercase tracking-[0.35em] text-sand transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}