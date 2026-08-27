/**
 * toast.js
 * Tiny framework-agnostic pub/sub toast store. No React import here so it can
 * be called from any client component or event handler via `toast(msg)`.
 * <Toaster /> (components/Toaster.jsx) subscribes and renders the stack.
 */

let toasts = [];
const listeners = new Set();
let nextId = 0;

function emit() {
  for (const l of listeners) l(toasts);
}

/** Push a toast. Auto-dismisses after `duration` ms (default 2800). */
export function toast(message, { duration = 2800, tone = 'info' } = {}) {
  const id = ++nextId;
  toasts = [...toasts, { id, message, tone }];
  emit();
  if (duration > 0) {
    setTimeout(() => dismiss(id), duration);
  }
  return id;
}

/** Manually remove a toast. */
export function dismiss(id) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

/** Subscribe to the toast list. Returns an unsubscribe fn. */
export function subscribe(listener) {
  listeners.add(listener);
  listener(toasts); // immediate sync so late mounters catch up
  return () => listeners.delete(listener);
}