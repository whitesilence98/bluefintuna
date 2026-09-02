'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/**
 * ThemeToggle
 * -----------
 * Light/dark switch for the class-based Tailwind dark mode. DARK is the
 * site default (<html> is SSR'd with the class); the stored preference
 * wins once set, persisting in localStorage under 'theme'
 * ('light' | 'dark').
 *
 * The pre-paint state is settled by the inline no-flash script in
 * app/layout.js (removes the class when the stored preference is light),
 * so this component only needs to read the current DOM state once mounted
 * and keep the button icon in sync. A brief mount gate prevents the icon
 * from flashing the wrong phase during SSR/hydration.
 */
const STORAGE_KEY = 'theme';

export default function ThemeToggle({ className = '' }) {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      /* private mode / storage blocked — theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      className={
        'inline-flex h-9 w-9 items-center justify-center rounded-full text-sand transition-colors hover:text-accent ' +
        className
      }
    >
      {/* Render a stable placeholder until mounted so SSR and client agree. */}
      {mounted ? (
        dark ? (
          <Sun size={16} strokeWidth={1.75} />
        ) : (
          <Moon size={16} strokeWidth={1.75} />
        )
      ) : (
        <span aria-hidden className="h-4 w-4" />
      )}
    </button>
  );
}