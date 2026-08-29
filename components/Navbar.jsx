'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * Navbar
 * ------
 * Minimal editorial header matching the reference:
 *   - Left: small gold emblem only (no brand text)
 *   - Right: small all-caps tracked-out links
 *   - Completely transparent, no border
 *   - Mobile: minimal fullscreen drawer
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

// Minimal geometric emblem — small, subtle, gold.
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
      <circle cx="12" cy="11" r="1.5" fill="#0E0C0A" opacity="0.6" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll while drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Add a translucent espresso backdrop + blur once the user scrolls past the
  // top, so page content no longer shows through the fixed navbar. Also slides
  // in a thin bottom border for definition. Respects reduced-motion via CSS.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // set initial state (e.g. on route change / refresh mid-page)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Animated backdrop: fades + slides in on scroll so content underneath
          is hidden once you leave the hero. Pointer events disabled so it
          never blocks clicks when invisible. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{
          opacity: scrolled ? 1 : 0,
          y: scrolled ? 0 : -8,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 -z-10 border-b border-rule bg-espresso-950/80 backdrop-blur-md"
      />
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
        aria-label="Primary"
      >
        {/* Left: emblem only */}
        <Link
          href="/#home"
          className="text-champagne transition-opacity hover:opacity-80"
          aria-label="Tuan Nguyen — home"
        >
          <Emblem className="h-6 w-6" />
        </Link>

        {/* Right: nav links (desktop) */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C4BCB3] transition-colors hover:text-[#F5F2EC]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex items-center text-[#C4BCB3] transition-colors hover:text-ink md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </nav>

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
              className="absolute inset-0 bg-[#0E0C0A]/90 backdrop-blur-sm"
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
                className="absolute right-6 top-6 text-[#C4BCB3] transition-colors hover:text-ink"
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
                <Emblem className="mb-12 h-8 w-8 text-champagne" />
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
                      className="text-xs font-medium uppercase tracking-[0.35em] text-[#C4BCB3] transition-colors hover:text-[#F5F2EC]"
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