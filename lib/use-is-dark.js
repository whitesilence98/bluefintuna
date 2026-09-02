'use client';

import { useEffect, useState } from 'react';

/**
 * useIsDark
 * ---------
 * Tracks whether the site is currently in dark mode by watching the `dark`
 * class on <html> (toggled by ThemeToggle + the no-flash script in
 * app/layout.js). Re-renders on change via MutationObserver, so consumers
 * relight/re-paint without a remount. Returns TRUE during SSR — dark is the
 * site default (<html> is SSR'd with the class), so server and first client
 * paint agree. (The no-flash script removes the class pre-paint when the
 * stored preference is light; the observer then syncs this hook to that.)
 */
export default function useIsDark() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
}