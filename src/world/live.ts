import * as THREE from 'three'
import { ScrollProgressStore } from '../lib/store'
import { smooth } from './math'

/**
 * Per-frame derived story state shared by every object in the world.
 * Computed once per frame (keyed by clock time) inside useFrame.
 */
export const live = {
  key: -1,
  /** Damped story time (0 → 6). */
  scene: 0,
  /** Growth of the system (0 → 6): one step per stage of scaling. */
  g: 0,
  /** How far the first server is opened up into its layers (0 → 1). */
  explode: 0,
  /** Damped Layers runway progress. */
  layerT: 0,
  /** The new service from the Process chapter is live and taking traffic (0 → 1). */
  ship: 0,
  /** Multi-region expansion at the end (0 → 1). */
  regions: 0,
}

const lerp = THREE.MathUtils.lerp

export function tick(time: number, dt: number) {
  if (time === live.key) return live
  live.key = time
  const s = ScrollProgressStore.current
  live.scene = lerp(live.scene, s.scene, 1 - Math.exp(-dt * 3.5))
  live.g = lerp(live.g, Math.min(6, s.scaleT * 6.25), 1 - Math.exp(-dt * 4))
  live.layerT = lerp(live.layerT, s.layerT, 1 - Math.exp(-dt * 5))
  const sc = live.scene
  live.explode = smooth((sc - 0.75) / 0.35) * (1 - smooth((sc - 1.8) / 0.2))
  live.regions = smooth((sc - 5.02) / 0.32)
  live.ship = smooth((s.processT - 0.8) / 0.12)
  return live
}

/**
 * Appearance of the component introduced at scaling step k (1–6).
 * Step k spans g ∈ [k-1, k]; the component builds in over its middle.
 */
export const appear = (k: number, g = live.g) => smooth((g - (k - 1) - 0.2) / 0.6)

/** Discrete routing level: traffic starts using step k's component once it's half built. */
export const level = (g = live.g) => Math.floor(g + 0.5)

/** The single server is overloaded between "traffic arrives" and "load balancer". */
export const heat = (g = live.g) => smooth((g - 0.35) / 0.5) * (1 - appear(3, g))
