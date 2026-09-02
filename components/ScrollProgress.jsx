'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress
 * Thin fixed teal accent line at the very top of the viewport that tracks
 * page scroll progress. Pure presentational; mounts once in the root layout.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-gradient-to-r from-accent/0 via-accent to-teal-400/90"
    />
  );
}