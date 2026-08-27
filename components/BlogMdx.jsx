/**
 * BlogMdx.jsx
 * Shared inline components available inside MDX post bodies.
 * Keep these tiny — they're bundled into each post's render tree.
 */

export function Alert({ type = 'info', children }) {
  const palette = {
    info: 'border-sky-500/30 bg-sky-500/5 text-sky-100',
    tip: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-100',
    warn: 'border-amber-500/30 bg-amber-500/5 text-amber-100',
  }[type] || 'border-white/15 bg-white/5 text-white/85';

  const label = { info: 'Note', tip: 'Tip', warn: 'Heads up' }[type] || 'Note';

  return (
    <aside
      className={`not-prose my-6 rounded-xl border px-4 py-3 text-sm leading-relaxed ${palette}`}
    >
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-80">
        {label}
      </span>
      <div className="[&>p]:my-0 [&>p+p]:mt-2">{children}</div>
    </aside>
  );
}

export function Code({ children }) {
  return (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
      {children}
    </code>
  );
}