/**
 * localStorage helpers guarded for SSR and for browsers where storage is blocked
 * (private mode, embedded webviews, iOS storage partitioning).
 */

const memory = new Map<string, string>();

function backing(): Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> {
  try {
    const probe = '__gc_probe__';
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return {
      getItem: (key) => memory.get(key) ?? null,
      setItem: (key, value) => void memory.set(key, value),
      removeItem: (key) => void memory.delete(key),
    };
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = backing().getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    backing().setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the in-session store still works */
  }
}

export function removeKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    backing().removeItem(key);
  } catch {
    /* no-op */
  }
}
