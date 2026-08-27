'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton
 * Wraps any CTA and applies a subtle spring "magnetic" pull toward the cursor,
 * plus a gentle lift on hover. Respects prefers-reduced-motion via Framer's
 * global config (transitions collapse to ~0ms there).
 *
 * Pass a normal anchor/button as children; the wrapper renders a motion.span
 * so it composes with existing element-level styling (bg, px, py, etc.).
 */
export default function MagneticButton({
  children,
  strength = 18,
  className = '',
  as: Tag = 'span',
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set((relX / r.width) * strength);
    y.set((relY / r.height) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      {...rest}
    >
      {children}
    </motion.span>
  );
}