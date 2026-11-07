import * as THREE from 'three'

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

/**
 * Where every part of the system stands. Traffic flows left → right:
 * users → load balancer → app tier → cache → database (→ replicas),
 * with slow work branching off to a queue and its workers.
 */
export const L = {
  clients: V(-17, 0, 0),
  lb: V(-9, 0, 0),
  apps: [V(0, 0, 0), V(0, 0, -4.2), V(0, 0, 4.2)],
  cache: V(6.5, 0, 0),
  db: V(13, 0, 0),
  replicas: [V(16.8, 0, -3.8), V(16.8, 0, 3.8)],
  queue: V(6.5, 0, 7.8),
  workers: [V(11.6, 0, 7), V(11.6, 0, 8.8)],
  /** Empty slot in the app tier where the new service is designed, built, verified and shipped. */
  slot: V(6.5, 0, -7.6),
  /** The archive: one small architecture diorama per entry, in a row behind the system. */
  dioramaZ: -22,
  dioramas: [-21, -10.5, 0, 10.5, 21] as const,
  // Two more regions behind everything — a triangle, seen from above at the end.
  regions: [V(-25, 0, -46), V(29, 0, -46)],
}

/** Slab geometry of an app server. */
export const SLAB = { w: 2, h: 0.28, base: 0.2, pitch: 0.34, explodedPitch: 1.3 }

/** Top of the app server stack (compact). */
export const APP_TOP = 1.6

export const CLIENT_GRID = 7
export const CLIENT_GAP = 0.62
