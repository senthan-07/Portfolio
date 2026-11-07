import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import * as THREE from 'three'
import { ScrollProgressStore } from '../lib/store'
import type { Theme } from '../lib/theme'
import { APP_TOP, CLIENT_GAP, CLIENT_GRID, L, SLAB } from './layout'
import { appear, heat, level, live, tick } from './live'
import { seeded, smooth } from './math'
import { palette, signal } from './palette'
import { labelTexture } from './labels'

const V = THREE.Vector3

/**
 * A system's growth state. The main system follows the scroll; region
 * copies at the end are fully grown and static.
 */
type Mode = { main: boolean }
const gOf = (m: Mode) => (m.main ? live.g : 6)
const ap = (m: Mode, k: number) => (m.main ? appear(k) : 1)

/* ------------------------------------------------------------------ */
/* Users                                                               */
/* ------------------------------------------------------------------ */

/** Pin order: centre first, then outward — so "one user" is the middle pin. */
const PIN_ORDER = (() => {
  const idx = Array.from({ length: CLIENT_GRID * CLIENT_GRID }, (_, i) => i)
  const c = (CLIENT_GRID - 1) / 2
  const d = (i: number) => Math.hypot((i % CLIENT_GRID) - c, Math.floor(i / CLIENT_GRID) - c)
  return idx.sort((a, b) => d(a) - d(b) || a - b)
})()

export function pinPos(n: number, out = new V()) {
  const i = PIN_ORDER[n]
  const c = (CLIENT_GRID - 1) / 2
  return out.set(L.clients.x + ((i % CLIENT_GRID) - c) * CLIENT_GAP, 0, L.clients.z + (Math.floor(i / CLIENT_GRID) - c) * CLIENT_GAP)
}

const visibleClients = (g: number) => 1 + Math.round(48 * smooth(g / 0.9))

function Clients({ mode }: { mode: Mode }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const o = useMemo(() => new THREE.Object3D(), [])
  const p = useMemo(() => new V(), [])
  useFrame(() => {
    const m = mesh.current!
    const shown = visibleClients(gOf(mode))
    for (let n = 0; n < PIN_ORDER.length; n++) {
      pinPos(n, p)
      o.position.set(p.x, 0.22, p.z)
      o.scale.setScalar(n < shown ? 1 : 0.0001)
      o.updateMatrix()
      m.setMatrixAt(n, o.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PIN_ORDER.length]}>
      <boxGeometry args={[0.16, 0.44, 0.16]} />
      <meshStandardMaterial color={palette.pin} metalness={0.5} roughness={0.4} />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------ */
/* App server — four slabs: Interface, Guard, Data, Pipeline           */
/* ------------------------------------------------------------------ */

function AppServer({ at, primary, mode }: { at: THREE.Vector3; primary: boolean; mode: Mode }) {
  const group = useRef<THREE.Group>(null)
  const slabs = useRef<(THREE.Group | null)[]>([])
  const mats = useRef<(THREE.MeshStandardMaterial | null)[]>([])
  const leds = useRef<(THREE.MeshStandardMaterial | null)[]>([])
  const core = useRef<THREE.Mesh>(null)
  const isMainPrimary = primary && mode.main

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const g = gOf(mode)
    const explode = isMainPrimary ? live.explode : 0
    const split = primary ? (mode.main ? appear(2) : 1) : 1
    const pitch = THREE.MathUtils.lerp(SLAB.pitch, SLAB.explodedPitch, explode)
    const hot = isMainPrimary ? heat(g) : 0
    const pulse = 0.5 + 0.5 * Math.sin(t * 7)

    // Replicas build in at step 3.
    if (!primary) {
      const a = ap(mode, 3)
      group.current!.scale.set(a, a, a)
      group.current!.visible = a > 0.01
    }

    // rank from the bottom: Pipeline 0, Data 1, Guard 2 − split, Interface 3 − split
    const rank = [3 - split, 2 - split, 1, 0]
    for (let k = 0; k < 4; k++) {
      const s = slabs.current[k]
      if (!s) continue
      if (k === 2) {
        // The Data slab leaves the server and becomes the database.
        const home = SLAB.base + rank[k] * pitch
        const dst = new V(L.db.x - at.x, 1.25, L.db.z - at.z)
        const e = smooth(split)
        s.position.set(dst.x * e, THREE.MathUtils.lerp(home, dst.y, e) + Math.sin(Math.PI * e) * 2.6, dst.z * e)
        s.scale.setScalar(THREE.MathUtils.lerp(1, 0.45, e))
        s.visible = split < 0.985 && primary
      } else {
        s.position.set(0, SLAB.base + rank[k] * pitch, 0)
      }
      s.rotation.y = isMainPrimary ? explode * (k - 1.5) * 0.18 : 0

      const m = mats.current[k]
      if (m) m.emissive.set(palette.signal).multiplyScalar(hot * (0.25 + pulse * 0.55))
      const led = leds.current[k]
      if (led) {
        const active = isMainPrimary && explode > 0.5 && ScrollProgressStore.current.layer === k ? 1 : 0
        led.emissiveIntensity = THREE.MathUtils.lerp(led.emissiveIntensity, active * 3.4 + hot * pulse * 3 + 0.2, 0.15)
      }
    }
    if (core.current) {
      core.current.scale.y = Math.max(0.001, explode)
      core.current.visible = explode > 0.02
      core.current.position.y = SLAB.base + 1.5 * pitch
    }
  })

  const names = ['Interface', 'Guard', 'Data', 'Pipeline']
  return (
    <group position={at}>
      <group ref={group}>
        {names.map((n, k) => (
          <group key={n} ref={(el) => { slabs.current[k] = el }}>
            <mesh>
              <boxGeometry args={[SLAB.w, SLAB.h, SLAB.w]} />
              <meshStandardMaterial
                ref={(el) => { mats.current[k] = el }}
                color={k === 0 ? palette.slabTop : palette.slab}
                metalness={k === 0 ? 0.4 : palette.metal}
                roughness={k === 0 ? 0.35 : palette.rough}
              />
            </mesh>
            <mesh position={[SLAB.w / 2 + 0.005, 0, SLAB.w / 4]}>
              <boxGeometry args={[0.02, 0.06, 0.5]} />
              <meshStandardMaterial ref={(el) => { leds.current[k] = el }} color={palette.signal} emissive={palette.signal} emissiveIntensity={0.2} toneMapped={false} />
            </mesh>
          </group>
        ))}
        {isMainPrimary && (
          <mesh ref={core}>
            <cylinderGeometry args={[0.3, 0.3, 4.2, 40]} />
            <meshPhysicalMaterial color="#ffffff" transmission={1} thickness={1} roughness={0.08} ior={1.4} transparent opacity={0.9} />
          </mesh>
        )}
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Other components                                                    */
/* ------------------------------------------------------------------ */

function Appear({ k, mode, at, children }: { k: number; mode: Mode; at: THREE.Vector3; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null)
  useFrame(() => {
    const a = ap(mode, k)
    g.current!.scale.set(a, a, a)
    g.current!.visible = a > 0.01
  })
  return (
    <group position={at}>
      <group ref={g}>{children}</group>
    </group>
  )
}

function LoadBalancer({ mode }: { mode: Mode }) {
  const ring = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    ring.current!.rotation.z += dt * 0.6
  })
  return (
    <Appear k={3} mode={mode} at={L.lb}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1, 1.05, 0.4, 6]} />
        <meshStandardMaterial color={palette.slab} metalness={palette.metal} roughness={palette.rough} />
      </mesh>
      <mesh position={[0, 0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.02, 6]} />
        <meshStandardMaterial color={palette.slabTop} metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh ref={ring} position={[0, 0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.018, 8, 6]} />
        <meshStandardMaterial color={palette.slabTop} metalness={1} roughness={0.2} />
      </mesh>
    </Appear>
  )
}

function Cache({ mode }: { mode: Mode }) {
  return (
    <Appear k={4} mode={mode} at={L.cache}>
      {[0.2, 0.46, 0.72].map((y, i) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.14, 48]} />
          <meshStandardMaterial color={i === 2 ? palette.slabTop : palette.slab} metalness={palette.metal} roughness={palette.rough} />
        </mesh>
      ))}
    </Appear>
  )
}

function Database({ at, k, r, mode }: { at: THREE.Vector3; k: number; r: number; mode: Mode }) {
  return (
    <Appear k={k} mode={mode} at={at}>
      {[0.22, 0.66, 1.1].map((y, i) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[r, r, 0.38, 48]} />
          <meshStandardMaterial color={i === 2 ? palette.slabTop : palette.slab} metalness={palette.metal} roughness={palette.rough} />
        </mesh>
      ))}
    </Appear>
  )
}

function Queue({ mode }: { mode: Mode }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const o = useMemo(() => new THREE.Object3D(), [])
  const N = 7
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const m = mesh.current!
    for (let i = 0; i < N; i++) {
      const u = (i / N + t * 0.12) % 1
      o.position.set(-2 + u * 4, 0.33, 0)
      o.scale.setScalar(Math.sin(Math.PI * u) ** 0.4)
      o.updateMatrix()
      m.setMatrixAt(i, o.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })
  return (
    <Appear k={5} mode={mode} at={L.queue}>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[4.6, 0.12, 1]} />
        <meshStandardMaterial color={palette.slab} metalness={palette.metal} roughness={palette.rough} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, N]}>
        <boxGeometry args={[0.32, 0.32, 0.32]} />
        <meshStandardMaterial color={palette.slabTop} metalness={0.5} roughness={0.35} />
      </instancedMesh>
    </Appear>
  )
}

function Worker({ at, mode }: { at: THREE.Vector3; mode: Mode }) {
  return (
    <Appear k={5} mode={mode} at={at}>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.1, 0.84, 1.1]} />
        <meshStandardMaterial color={palette.slab} metalness={palette.metal} roughness={palette.rough} />
      </mesh>
      <mesh position={[0, 0.86, 0]}>
        <boxGeometry args={[1.1, 0.03, 1.1]} />
        <meshStandardMaterial color={palette.slabTop} metalness={0.5} roughness={0.3} />
      </mesh>
    </Appear>
  )
}

/* ------------------------------------------------------------------ */
/* Edges                                                               */
/* ------------------------------------------------------------------ */

type EdgeSpec = { a: THREE.Vector3; b: THREE.Vector3; on: (m: Mode) => number }

const y = (v: THREE.Vector3, h: number) => new V(v.x, h, v.z)

const EDGES: EdgeSpec[] = [
  { a: y(L.clients, 0.05), b: y(L.apps[0], 0.05), on: (m) => (m.main ? 1 - appear(3) : 0) },
  { a: y(L.clients, 0.05), b: y(L.lb, 0.05), on: (m) => ap(m, 3) },
  ...L.apps.map((app) => ({ a: y(L.lb, 0.05), b: y(app, 0.05), on: (m: Mode) => ap(m, 3) })),
  { a: y(L.apps[0], 0.05), b: y(L.db, 0.05), on: (m) => (m.main ? appear(2) * (1 - appear(4)) : 0) },
  ...L.apps.map((app) => ({ a: y(app, 0.05), b: y(L.cache, 0.05), on: (m: Mode) => ap(m, 4) })),
  { a: y(L.cache, 0.05), b: y(L.db, 0.05), on: (m) => ap(m, 4) },
  ...L.apps.map((app) => ({ a: y(app, 0.05), b: new V(L.queue.x - 2.3, 0.05, L.queue.z), on: (m: Mode) => ap(m, 5) })),
  ...L.workers.map((w) => ({ a: new V(L.queue.x + 2.3, 0.05, L.queue.z), b: y(w, 0.05), on: (m: Mode) => ap(m, 5) })),
  ...L.replicas.map((r) => ({ a: y(L.db, 0.05), b: y(r, 0.05), on: (m: Mode) => ap(m, 6) })),
]

function Edges({ mode, theme }: { mode: Mode; theme: Theme }) {
  const lines = useMemo(
    () =>
      EDGES.map((e) => {
        const geo = new THREE.BufferGeometry().setFromPoints([e.a, e.b])
        const mat = new THREE.LineBasicMaterial({ color: palette.edge, transparent: true, opacity: 0 })
        return new THREE.Line(geo, mat)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  )
  useFrame(() => {
    lines.forEach((l, i) => {
      ;(l.material as THREE.LineBasicMaterial).opacity = EDGES[i].on(mode) * palette.edgeOpacity
    })
  })
  return (
    <group>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Floor labels                                                        */
/* ------------------------------------------------------------------ */

const LABELS: { at: [number, number]; lines: string[]; on: (m: Mode) => number }[] = [
  { at: [L.clients.x - 1.6, 3.4], lines: ['Users', 'Clients'], on: () => 1 },
  { at: [L.apps[0].x - 0.6, 2.1], lines: ['Server', 'Everything on one box'], on: (m) => (m.main ? 1 - appear(3) : 0) },
  { at: [L.lb.x - 0.6, 2.2], lines: ['Load balancer', 'One front door'], on: (m) => ap(m, 3) },
  { at: [L.apps[0].x - 0.6, -6.6], lines: ['App tier ×3', 'Stateless replicas'], on: (m) => ap(m, 3) },
  { at: [L.cache.x - 0.4, 1.7], lines: ['Cache', 'Hot reads'], on: (m) => ap(m, 4) },
  { at: [L.db.x - 0.6, 2.0], lines: ['Database', 'PostgreSQL'], on: (m) => ap(m, 2) },
  { at: [L.queue.x - 1.8, 9.4], lines: ['Queue', 'Slow work'], on: (m) => ap(m, 5) },
  { at: [L.workers[0].x + 0.2, 10.6], lines: ['Workers', 'Background jobs'], on: (m) => ap(m, 5) },
  { at: [L.replicas[1].x - 0.6, 5.7], lines: ['Read replicas', 'Scale reads'], on: (m) => ap(m, 6) },
]

function Labels({ mode, theme }: { mode: Mode; theme: Theme }) {
  const textures = useMemo(
    () => LABELS.map((l) => labelTexture(l.lines)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  )
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([])
  useFrame(() => {
    LABELS.forEach((l, i) => {
      const m = mats.current[i]
      if (m) m.opacity = l.on(mode)
    })
  })
  return (
    <group>
      {LABELS.map((l, i) => (
        <mesh key={i} position={[l.at[0] + 2, 0.02, l.at[1]]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 1]} />
          <meshBasicMaterial ref={(el) => { mats.current[i] = el }} map={textures[i]} transparent depthWrite={false} opacity={0} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Traffic                                                             */
/* ------------------------------------------------------------------ */

const TRAFFIC = [0, 46, 70, 96, 124, 150, 180]
const trafficFor = (g: number) => {
  const i = Math.min(5, Math.floor(g))
  return Math.round(THREE.MathUtils.lerp(TRAFFIC[i], TRAFFIC[i + 1], g - i))
}

type Particle = { pts: THREE.Vector3[]; cum: number[]; len: number; d: number; speed: number; alive: boolean }

function buildPath(lv: number, rnd: () => number, clients: number, shipped = false): THREE.Vector3[] {
  const c = pinPos(Math.floor(rnd() * clients)).setY(0.5)
  const out: THREE.Vector3[] = [c]
  if (lv >= 3) out.push(y(L.lb, 0.62))
  // Once the Process chapter ships the new service, the balancer sends it a share of traffic.
  if (shipped && rnd() < 0.3) {
    out.push(y(L.slot, 1.65), y(L.db, 1.35))
    return [...out, ...out.slice(0, -1).reverse()]
  }
  const app = lv >= 3 ? L.apps[Math.floor(rnd() * 3)] : L.apps[0]
  out.push(y(app, APP_TOP + 0.12))

  if (lv >= 5 && rnd() < 0.22) {
    // Slow work: hand off to the queue, a worker picks it up. No round trip.
    out.push(new V(L.queue.x - 2.1, 0.5, L.queue.z), new V(L.queue.x + 2.1, 0.5, L.queue.z))
    out.push(y(L.workers[Math.floor(rnd() * 2)], 1.0))
    return out
  }
  if (lv >= 2) {
    if (lv >= 4) {
      out.push(y(L.cache, 0.9))
      if (rnd() < 0.55) return [...out, ...out.slice(0, -1).reverse()] // cache hit
    }
    const db = lv >= 6 && rnd() < 0.5 ? L.replicas[Math.floor(rnd() * 2)] : L.db
    out.push(y(db, 1.35))
  }
  return [...out, ...out.slice(0, -1).reverse()]
}

function Traffic({ mode, cap }: { mode: Mode; cap: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const rnd = useMemo(() => seeded(mode.main ? 11 : 23), [mode.main])
  const parts = useMemo<Particle[]>(
    () => Array.from({ length: cap }, () => ({ pts: [], cum: [], len: 0, d: 0, speed: 1, alive: false })),
    [cap],
  )
  const o = useMemo(() => new THREE.Object3D(), [])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 20)
    const g = gOf(mode)
    const lv = mode.main ? level() : 6
    const n = Math.min(cap, mode.main ? trafficFor(g) : cap)
    const slow = 1 - 0.65 * (mode.main ? heat() : 0)
    const clients = visibleClients(g)
    const m = mesh.current!

    for (let i = 0; i < cap; i++) {
      const p = parts[i]
      if (i >= n) {
        p.alive = false
        o.scale.setScalar(0.0001)
        o.updateMatrix()
        m.setMatrixAt(i, o.matrix)
        continue
      }
      if (!p.alive || p.d >= p.len) {
        p.pts = buildPath(lv, rnd, clients, mode.main && live.ship > 0.5)
        p.cum = [0]
        for (let k = 1; k < p.pts.length; k++) p.cum.push(p.cum[k - 1] + p.pts[k].distanceTo(p.pts[k - 1]))
        p.len = p.cum[p.cum.length - 1]
        p.d = p.alive ? 0 : -rnd() * p.len // stagger first spawn
        p.speed = 6 + rnd() * 3
        p.alive = true
      }
      p.d += p.speed * dt * slow
      if (p.d < 0) {
        o.scale.setScalar(0.0001)
      } else {
        let k = 1
        while (k < p.cum.length - 1 && p.cum[k] < p.d) k++
        const a = p.pts[k - 1]
        const b = p.pts[k]
        const seg = p.cum[k] - p.cum[k - 1] || 1
        o.position.lerpVectors(a, b, THREE.MathUtils.clamp((p.d - p.cum[k - 1]) / seg, 0, 1))
        o.scale.setScalar(1)
      }
      o.updateMatrix()
      m.setMatrixAt(i, o.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, cap]} frustumCulled={false}>
      <sphereGeometry args={[0.075, 8, 8]} />
      <meshBasicMaterial color={palette.flow} toneMapped={false} />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------ */
/* The first request — the hero of chapters 01 and 02                   */
/* ------------------------------------------------------------------ */

function FirstRequest() {
  const group = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Mesh>(null)
  const from = useMemo(() => pinPos(0).setY(0.7), [])
  const to = useMemo(() => y(L.apps[0], APP_TOP + 0.4), [])
  const a = useMemo(() => new V(), [])

  useFrame((state, delta) => {
    tick(state.clock.elapsedTime, Math.min(delta, 0.12))
    const t = state.clock.elapsedTime
    // Origin: ping-pong between the user and the server (request → response).
    const u = 0.5 - 0.5 * Math.cos(t * 0.75)
    a.lerpVectors(from, to, u)
    a.y += Math.sin(Math.PI * u) * 1.8
    // Layers: descend through the opened server.
    const top = SLAB.base + 3 * SLAB.explodedPitch + 0.75
    const bottom = SLAB.base - 0.15
    const ly = THREE.MathUtils.lerp(top, bottom, live.layerT)
    a.lerp(new V(L.apps[0].x, ly, L.apps[0].z), live.explode)

    const g = group.current!
    g.position.copy(a)
    const vis = 1 - smooth((live.scene - 1.88) / 0.18)
    g.scale.setScalar(Math.max(0.0001, vis))
    g.visible = vis > 0.01
    halo.current!.scale.setScalar(1 + Math.sin(t * 3.2) * 0.12)
  })

  return (
    <group ref={group}>
      <Trail width={0.9} length={6} decay={1.2} color={palette.signal} attenuation={(w) => w * w}>
        <mesh>
          <icosahedronGeometry args={[0.15, 2]} />
          <meshBasicMaterial color={signal(3)} toneMapped={false} />
        </mesh>
      </Trail>
      <mesh ref={halo}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color={palette.signal} transparent opacity={0.1} depthWrite={false} toneMapped={false} />
      </mesh>
      <pointLight color={palette.signal} intensity={6} distance={6} decay={1.6} />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */

export function System({ main, theme }: { main: boolean; theme: Theme }) {
  const mode = useMemo(() => ({ main }), [main])
  return (
    <group>
      <Clients mode={mode} />
      <LoadBalancer mode={mode} />
      {L.apps.map((at, i) => (
        <AppServer key={i} at={at} primary={i === 0} mode={mode} />
      ))}
      <Cache mode={mode} />
      <Database at={L.db} k={2} r={1.05} mode={mode} />
      {L.replicas.map((r, i) => (
        <Database key={i} at={r} k={6} r={0.78} mode={mode} />
      ))}
      <Queue mode={mode} />
      {L.workers.map((w, i) => (
        <Worker key={i} at={w} mode={mode} />
      ))}
      <Edges mode={mode} theme={theme} />
      {main && <Labels mode={mode} theme={theme} />}
      <Traffic mode={mode} cap={main ? 190 : 110} />
      {main && <FirstRequest />}
    </group>
  )
}

