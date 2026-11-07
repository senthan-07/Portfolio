import { useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'
const KEY = 'theme'

function initial(): Theme {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'dark' || v === 'light') return v
  } catch {
    /* storage blocked — fall through to system preference */
  }
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

let current: Theme = typeof document !== 'undefined' ? initial() : 'dark'
const listeners = new Set<() => void>()

function apply(t: Theme) {
  document.documentElement.dataset.theme = t
  // An explicit choice overrides the per-scheme theme-color tags in index.html.
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', t === 'dark' ? '#0a0a0a' : '#f4f3ef'))
}
if (typeof document !== 'undefined') apply(current)

export function getTheme() {
  return current
}

export function setTheme(t: Theme) {
  current = t
  apply(t)
  try {
    localStorage.setItem(KEY, t)
  } catch {
    /* non-persistent is fine */
  }
  listeners.forEach((l) => l())
}

export function toggleTheme() {
  setTheme(current === 'dark' ? 'light' : 'dark')
}

export function useTheme() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    getTheme,
    getTheme,
  )
}
