export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export const smooth = (t: number) => {
  const c = clamp01(t)
  return c * c * (3 - 2 * c)
}

/** Deterministic PRNG so the world is identical on every load. */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
