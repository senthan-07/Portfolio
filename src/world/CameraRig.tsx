import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { ScrollProgressStore, SCENE_COUNT } from '../lib/store'
import { L } from './layout'
import { smooth } from './math'
import { live, tick } from './live'

/**
 * Scroll is the camera. Each section has a shot; near the end of a section
 * it hands off to the next one. Lens shift moves the subject away from the
 * text column instead of moving the camera.
 */
type Shot = { pos: THREE.Vector3; look: THREE.Vector3; shift: [number, number] }
const mk = (): Shot => ({ pos: new THREE.Vector3(), look: new THREE.Vector3(), shift: [0, 0] })

/** Fraction of each section after which its shot hands off to the next. */
const HANDOFF = [0.6, 0.88, 0.84, 0.95, 0.8, 1]

/** Scale framings per stage: [look x, camera y, camera z, look z]. */
const SCALE_FRAMES: [number, number, number, number][] = [
  [-8, 17, 29, 0], // one server, one user
  [-8, 19, 31, 0], // traffic: the users multiply
  [4, 22, 35, 0.5], // separate database
  [3, 24, 37, 0.5], // load balancer + replicas
  [4, 25, 38, 1], // cache
  [4.5, 28, 41, 2], // queue + workers
  [5, 30, 43, 1.5], // read replicas
]

let portrait = false

function shot(i: number, t: number, out: Shot, time: number) {
  switch (i) {
    case 0: {
      if (portrait) {
        // Narrow frame: look down the line from behind the user to the server.
        const e = smooth(t)
        out.pos.set(-27 - e * 2, 3.4 + e * 0.8, 3.5)
        out.look.set(-4, 0.9, -0.2)
        out.shift = [0, 0]
        break
      }
      // Origin — one user, one server, one request going back and forth.
      const e = smooth(t)
      out.pos.set(-22 - e * 2, 3 + e * 1.2, 9 + e * 1.5)
      out.look.set(-6, 1, -0.5)
      out.shift = [0.3, -0.02]
      break
    }
    case 1: {
      // Layers — close on the first server, opened up.
      out.pos.set(6.4, 4.8, 9.6)
      out.look.set(0, 2.3, 0)
      out.shift = [0.3, 0]
      break
    }
    case 2: {
      // Scale — one framing per stage, so whatever was just added is in shot.
      const g = THREE.MathUtils.clamp(live.g, 0, 6)
      const k = Math.min(5, Math.floor(g))
      const f = smooth(g - k)
      const A = SCALE_FRAMES[k]
      const B = SCALE_FRAMES[k + 1]
      const lx = THREE.MathUtils.lerp(A[0], B[0], f)
      out.look.set(lx, 0, THREE.MathUtils.lerp(A[3], B[3], f))
      out.pos.set(lx + 2, THREE.MathUtils.lerp(A[1], B[1], f), THREE.MathUtils.lerp(A[2], B[2], f))
      out.shift = [0.22, 0.04]
      break
    }
    case 3: {
      // Archive — glide along the row of architecture dioramas, looking down at each.
      const x = THREE.MathUtils.lerp(L.dioramas[0], L.dioramas[L.dioramas.length - 1], ScrollProgressStore.current.archiveT)
      out.pos.set(x + 0.4, 11.5, L.dioramaZ + 15)
      out.look.set(x, 0, L.dioramaZ + 0.8)
      out.shift = [-0.36, 0.06]
      break
    }
    case 4: {
      // Process — the empty slot in the running system, where the new service is built.
      const f = L.slot
      out.pos.set(f.x + 9, 12.5, f.z + 9)
      out.look.set(f.x - 0.5, 0.5, f.z - 0.5)
      out.shift = [0.28, 0.02]
      break
    }
    default: {
      // Contact — rise until all three regions are in frame; slow drift.
      const e = smooth(t * 3.2)
      out.pos.set(Math.sin(time * 0.04) * 6, THREE.MathUtils.lerp(44, 138, e), THREE.MathUtils.lerp(36, 40, e))
      out.look.set(3, 0, -19)
      out.shift = [0.2, 0.3]
    }
  }
  return out
}

export function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const a = useMemo(mk, [])
  const b = useMemo(mk, [])
  const look = useMemo(() => new THREE.Vector3(-6, 1, -0.5), [])
  const shift = useMemo(() => ({ x: 0.3, y: 0 }), [])
  const req = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    // Generous clamp: slow devices still catch up instead of drifting in slow motion.
    const dt = Math.min(delta, 0.12)
    tick(state.clock.elapsedTime, dt)
    const s = THREE.MathUtils.clamp(live.scene, 0, SCENE_COUNT - 0.0001)
    const i = Math.floor(s)
    const t = s - i
    const time = state.clock.elapsedTime
    portrait = state.size.height > state.size.width

    shot(i, t, a, time)
    const h0 = HANDOFF[i]
    const hand = i < SCENE_COUNT - 1 ? smooth((t - h0) / (1 - h0)) : 0
    if (hand > 0) {
      shot(i + 1, 0, b, time)
      a.pos.lerp(b.pos, hand)
      a.look.lerp(b.look, hand)
      a.shift = [THREE.MathUtils.lerp(a.shift[0], b.shift[0], hand), THREE.MathUtils.lerp(a.shift[1], b.shift[1], hand)]
    }

    // Portrait: frame is narrow — aim at the server on the Layers close-up,
    // and climb higher for the three-region finale.
    if (portrait && i === 1) {
      req.set(0, 1.2, 0)
      a.look.lerp(req, 0.5 * (1 - hand))
      a.pos.z += 4
    }
    if (portrait && i === SCENE_COUNT - 1) a.pos.y *= 1.4

    a.pos.x += state.pointer.x * 0.35
    a.pos.y += state.pointer.y * 0.2

    const k = 1 - Math.exp(-dt * 3)
    camera.position.lerp(a.pos, k)
    look.lerp(a.look, k)
    camera.lookAt(look)

    const { width, height } = state.size
    const sx = portrait ? 0 : a.shift[0]
    const sy = portrait ? 0.3 : a.shift[1]
    shift.x = THREE.MathUtils.lerp(shift.x, sx, k)
    shift.y = THREE.MathUtils.lerp(shift.y, sy, k)
    camera.setViewOffset(width, height, (-shift.x * width) / 2, (shift.y * height) / 2, width, height)
    const fov = portrait ? 48 : 34
    if (camera.fov !== fov) camera.fov = fov
    camera.updateProjectionMatrix()

    // Fog follows altitude: dense at street level, clear from above.
    const fog = state.scene.fog as THREE.Fog | null
    if (fog) {
      const y = camera.position.y
      const h = smooth((y - 6) / 50)
      fog.near = THREE.MathUtils.lerp(18, 60, h) + Math.max(0, y - 56) * 0.8
      fog.far = THREE.MathUtils.lerp(80, 200, h) + Math.max(0, y - 56) * 1.6
    }
  })

  return null
}
