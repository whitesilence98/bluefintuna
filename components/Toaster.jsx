'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Info, X } from 'lucide-react';
import { subscribe, dismiss } from '@/lib/toast';

/**
 * Toaster
 * Single mount (in root layout) that renders the global toast stack.
 * Decoupled from whatever triggers a toast — see lib/toast.js.
 */
const TONE = {
  info: { ring: 'border-rule', icon: <Info size={14} className="text-sand/70" /> },
  success: { ring: 'border-champagne/40', icon: <Check size={14} className="text-champagne" /> },
};

export default function Toaster() {
  const [items, setItems] = useState([]);

  useEffect(() => subscribe(setItems), []);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-6 right-6 z-[60] flex w-[min(92vw,360px)] flex-col gap-2.5"
    >
      <AnimatePresence initial={false}>
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl border bg-espresso-900/95 px-4 py-3 text-sm text-ink shadow-[0_8px_30px_-8px_rgba(0,0,0,0.7)] backdrop-blur ${TONE[t.tone]?.ring || TONE.info.ring}`}
          >
            <span className="shrink-0">{TONE[t.tone]?.icon || TONE.info.icon}</span>
            <span className="flex-1 leading-snug">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="shrink-0 text-sand/50 transition-colors hover:text-ink"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}