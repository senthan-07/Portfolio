import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Theme } from '../lib/theme'
import { ScrollProgressStore } from '../lib/store'
import { L } from './layout'
import { live } from './live'
import { smooth } from './math'
import { palette, signal } from './palette'
import { labelTexture } from './labels'

/**
 * 04 — Archive. Each entry is shown as its own small system, built from the
 * same parts as the main story: a client, a gateway, a service, a database,
 * storage, a pipeline. Traffic runs through the one you're reading.
 */

type Kind = 'user' | 'ring' | 'stack' | 'db' | 'bucket' | 'gates' | 'core' | 'frames' | 'pages' | 'rack' | 'screen' | 'blueprint' | 'tiles' | 'slide'
type Node = { kind: Kind; at: [number, number]; label: string }
type Diorama = { title: string; sub: string; nodes: Node[]; edges: [number, number][]; routes: number[][] }

// Employer entries stay generic by design: no internal names, no stack details.
const DIORAMAS: Diorama[] = [
  {
    title: 'Citi — Enterprise backend',
    sub: 'APIs · Auth · CI',
    nodes: [
      { kind: 'user', at: [-3.1, 0], label: 'Client' },
      { kind: 'ring', at: [-1.5, 0], label: 'Auth' },
      { kind: 'stack', at: [0.4, 0], label: 'API' },
      { kind: 'db', at: [2.6, 0], label: 'Database' },
      { kind: 'gates', at: [0.4, -2.1], label: 'CI · 250+ tests' },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [4, 2]],
    routes: [[0, 1, 2, 3, 2, 1, 0], [4, 2]],
  },
  {
    title: 'Dexio Designs',
    sub: 'Design first, then build',
    nodes: [
      { kind: 'blueprint', at: [-2.6, 0], label: 'HLD / LLD' },
      { kind: 'tiles', at: [0, 0], label: 'Components' },
      { kind: 'stack', at: [2.5, 0], label: 'REST APIs' },
      { kind: 'user', at: [2.5, 2.1], label: 'Product' },
    ],
    edges: [[0, 1], [1, 2], [3, 2]],
    routes: [[0, 1, 2], [3, 2, 3]],
  },
  {
    title: 'AstraStore',
    sub: 'Distributed storage engine',
    nodes: [
      { kind: 'user', at: [-3.2, 0], label: 'Client' },
      { kind: 'tiles', at: [-1.4, 0], label: 'Chunker' },
      { kind: 'stack', at: [0.9, -1.5], label: 'Node A' },
      { kind: 'stack', at: [0.9, 1.5], label: 'Node B' },
      { kind: 'stack', at: [3.0, 0], label: 'Node C' },
      { kind: 'ring', at: [3.0, -2.2], label: 'Self-healing' },
    ],
    edges: [[0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [4, 2], [5, 4]],
    routes: [[0, 1, 2], [0, 1, 3], [2, 3, 4, 2], [5, 4]],
  },
  {
    title: 'QEMU Lab Orchestrator',
    sub: 'Virtual labs on demand',
    nodes: [
      { kind: 'user', at: [-3.1, 0], label: 'Browser' },
      { kind: 'screen', at: [-1.3, 1.2], label: 'Guacamole' },
      { kind: 'stack', at: [-1.3, -1.15], label: 'Express API' },
      { kind: 'rack', at: [1.6, 0], label: 'QEMU VMs' },
      { kind: 'db', at: [3.3, -1.5], label: 'State' },
    ],
    edges: [[0, 1], [1, 3], [0, 2], [2, 3], [2, 4]],
    routes: [[0, 1, 3, 1, 0], [0, 2, 3], [2, 4, 2]],
  },
  {
    title: 'Bento Slides',
    sub: 'Ghost Cut · merged PR #679',
    nodes: [
      { kind: 'slide', at: [-2.6, 0.2], label: 'Slide A' },
      { kind: 'slide', at: [0, 0.2], label: 'Slide B' },
      { kind: 'slide', at: [2.6, 0.2], label: 'Slide C' },
      { kind: 'tiles', at: [0, -2.1], label: 'Clipboard' },
      { kind: 'blueprint', at: [0, 2.2], label: 'Undo' },
    ],
    edges: [[0, 3], [3, 2], [2, 4], [4, 0], [1, 3]],
    routes: [[0, 3, 2], [2, 4, 0], [1, 3, 1]],
  },
]

const W = 7.6
const D = 6

/* ---------------------------------------------------------------- */

function Part({ kind, focus }: { kind: Kind; focus: React.MutableRefObject<number> }) {
  const spin = useRef<THREE.Group>(null)
  const rack = useRef<THREE.InstancedMesh>(null)
  const o = useMemo(() => new THREE.Object3D(), [])
  const c = useMemo(() => new THREE.Color(), [])
  const edges = useMemo(() => {
    if (kind === 'core') return new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.42, 0))
    if (kind === 'blueprint' || kind === 'bucket') return new THREE.EdgesGeometry(new THREE.BoxGeometry(0.95, 0.55, 0.95))
    return null
  }, [kind])

  useFrame((state, dt) => {
    const f = focus.current
    if (spin.current) spin.current.rotation[kind === 'ring' ? 'x' : 'y'] += dt * (0.3 + f * 1.4)
    if (rack.current) {
      const t = state.clock.elapsedTime
      for (let i = 0; i < 9; i++) {
        o.position.set(((i % 3) - 1) * 0.34, 0.2, (Math.floor(i / 3) - 1) * 0.34)
        o.updateMatrix()
        rack.current.setMatrixAt(i, o.matrix)
        const on = f > 0.3 && Math.sin(t * 1.3 + i * 2.1) > -0.2 ? 1 : 0
        c.copy(palette.base).lerp(palette.lit, on * 0.9)
        rack.current.setColorAt(i, c)
      }
      rack.current.instanceMatrix.needsUpdate = true
      if (rack.current.instanceColor) rack.current.instanceColor.needsUpdate = true
    }
  })

  const solid = (color = palette.slab) => <meshStandardMaterial color={color} metalness={palette.metal} roughness={palette.rough} />

  switch (kind) {
    case 'user':
      return (
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.16, 0.44, 0.16]} />
          {solid(palette.pin)}
        </mesh>
      )
    case 'ring':
      return (
        <group position={[0, 0.62, 0]} rotation={[0, Math.PI / 2, 0]}>
          <group ref={spin}>
            <mesh>
              <torusGeometry args={[0.52, 0.045, 12, 48]} />
              {solid(palette.slabTop)}
            </mesh>
          </group>
        </group>
      )
    case 'stack':
      return (
        <group>
          {[0.12, 0.36, 0.6].map((y, i) => (
            <mesh key={y} position={[0, y, 0]}>
              <boxGeometry args={[1, 0.18, 1]} />
              {solid(i === 2 ? palette.slabTop : palette.slab)}
            </mesh>
          ))}
        </group>
      )
    case 'db':
      return (
        <group>
          {[0.12, 0.36, 0.6].map((y, i) => (
            <mesh key={y} position={[0, y, 0]}>
              <cylinderGeometry args={[0.45, 0.45, 0.2, 32]} />
              {solid(i === 2 ? palette.slabTop : palette.slab)}
            </mesh>
          ))}
        </group>
      )
    case 'bucket':
      return (
        <group position={[0, 0.28, 0]}>
          <lineSegments geometry={edges!}>
            <lineBasicMaterial color={palette.edge} transparent opacity={0.7} />
          </lineSegments>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={i} position={[((i % 3) - 1) * 0.26, -0.16 + (i % 2) * 0.12, (Math.floor(i / 3) - 1) * 0.26]}>
              <boxGeometry args={[0.16, 0.16, 0.16]} />
              {solid(i % 3 === 0 ? palette.slabTop : palette.slab)}
            </mesh>
          ))}
        </group>
      )
    case 'gates':
      return (
        <group>
          {[-0.45, 0, 0.45].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              {[-0.35, 0.35].map((z) => (
                <mesh key={z} position={[0, 0.35, z]}>
                  <boxGeometry args={[0.06, 0.7, 0.06]} />
                  {solid()}
                </mesh>
              ))}
              <mesh position={[0, 0.72, 0]}>
                <boxGeometry args={[0.06, 0.06, 0.76]} />
                {solid(palette.slabTop)}
              </mesh>
            </group>
          ))}
        </group>
      )
    case 'core':
      return (
        <group position={[0, 0.65, 0]}>
          <group ref={spin}>
            <lineSegments geometry={edges!}>
              <lineBasicMaterial color={palette.edge} transparent opacity={0.85} />
            </lineSegments>
          </group>
          <mesh>
            <icosahedronGeometry args={[0.16, 1]} />
            <meshBasicMaterial color={signal(2.5)} toneMapped={false} />
          </mesh>
        </group>
      )
    case 'frames':
      return (
        <group>
          {[-0.28, 0, 0.28].map((z, i) => (
            <mesh key={z} position={[i * 0.12 - 0.12, 0.36, z]} rotation={[0, Math.PI / 2 - 0.25, 0.04 * (i - 1)]}>
              <boxGeometry args={[0.6, 0.46, 0.03]} />
              {solid(i === 1 ? palette.slabTop : palette.slab)}
            </mesh>
          ))}
        </group>
      )
    case 'pages':
      return (
        <group>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, 0.05 + i * 0.07, 0]} rotation={[0, i * 0.08, 0]}>
              <boxGeometry args={[0.75, 0.035, 0.95]} />
              {solid(i === 3 ? palette.slabTop : palette.slab)}
            </mesh>
          ))}
        </group>
      )
    case 'rack':
      return (
        <group>
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[1.15, 0.06, 1.15]} />
            {solid()}
          </mesh>
          <instancedMesh ref={rack} args={[undefined, undefined, 9]}>
            <boxGeometry args={[0.26, 0.26, 0.26]} />
            <meshStandardMaterial metalness={palette.metal} roughness={palette.rough} />
          </instancedMesh>
        </group>
      )
    case 'screen':
      return (
        <group>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.06, 0.5, 0.06]} />
            {solid()}
          </mesh>
          <mesh position={[0, 0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[1, 0.62, 0.04]} />
            {solid(palette.slabTop)}
          </mesh>
        </group>
      )
    case 'blueprint':
      return (
        <group position={[0, 0.3, 0]}>
          <group ref={spin}>
            <lineSegments geometry={edges!}>
              <lineBasicMaterial color={palette.edge} transparent opacity={0.8} />
            </lineSegments>
          </group>
        </group>
      )
    case 'slide':
      // An upright slide with one element on it — the thing Ghost Cut moves.
      return (
        <group>
          <mesh position={[0, 0.48, 0]}>
            <boxGeometry args={[1.25, 0.8, 0.05]} />
            {solid(palette.slabTop)}
          </mesh>
          <mesh position={[-0.22, 0.52, 0.04]}>
            <boxGeometry args={[0.4, 0.26, 0.03]} />
            {solid(palette.slab)}
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.5, 0.08, 0.3]} />
            {solid()}
          </mesh>
        </group>
      )
    case 'tiles':
      return (
        <group>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={i} position={[((i % 3) - 1) * 0.32, 0.05, (Math.floor(i / 3) - 1) * 0.32]}>
              <boxGeometry args={[0.26, 0.08, 0.26]} />
              {solid(i === 4 ? palette.slabTop : palette.slab)}
            </mesh>
          ))}
        </group>
      )
  }
}

/* ---------------------------------------------------------------- */

function Diorama({ d, i, theme }: { d: Diorama; i: number; theme: Theme }) {
  const root = useRef<THREE.Group>(null)
  const bar = useRef<THREE.Mesh>(null)
  const dots = useRef<THREE.InstancedMesh>(null)
  const focus = useRef(0)
  const N = 16
  const o = useMemo(() => new THREE.Object3D(), [])

  const title = useMemo(
    () => labelTexture([`0${i + 1}  ${d.title}`, d.sub], { width: 1536, height: 256 }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  )
  const nodeLabels = useMemo(
    () => d.nodes.map((n) => labelTexture([n.label], { width: 768, height: 128, size: 64 })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  )
  const lines = useMemo(
    () =>
      d.edges.map(([a, b]) => {
        const g = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(d.nodes[a].at[0], 0.07, d.nodes[a].at[1]),
          new THREE.Vector3(d.nodes[b].at[0], 0.07, d.nodes[b].at[1]),
        ])
        return new THREE.Line(g, new THREE.LineBasicMaterial({ color: palette.edge, transparent: true, opacity: palette.edgeOpacity }))
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  )
  const routes = useMemo(
    () =>
      d.routes.map((r) => {
        const pts = r.map((k) => new THREE.Vector3(d.nodes[k].at[0], 0.55, d.nodes[k].at[1]))
        const cum = [0]
        for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + pts[k].distanceTo(pts[k - 1]))
        return { pts, cum, len: cum[cum.length - 1] }
      }),
    [d],
  )

  useFrame((state, dt) => {
    // Rise out of the floor when the archive arrives; focus follows the entry being read.
    const rise = smooth((live.scene - 2.84 - i * 0.04) / 0.3)
    const r = root.current!
    r.scale.set(1, Math.max(0.0001, rise), 1)
    r.visible = rise > 0.01
    const inArchive = live.scene > 2.7 && live.scene < 4.15
    const pos = ScrollProgressStore.current.archiveT * (DIORAMAS.length - 1)
    const target = inArchive ? Math.max(0, 1 - Math.abs(pos - i) * 1.3) : 0
    focus.current = THREE.MathUtils.lerp(focus.current, target, 1 - Math.exp(-dt * 6))
    bar.current!.scale.x = Math.max(0.0001, focus.current)

    const t = state.clock.elapsedTime
    const m = dots.current!
    const show = focus.current > 0.05
    for (let k = 0; k < N; k++) {
      const route = routes[k % routes.length]
      const u = ((t * (0.12 + focus.current * 0.1) + k / N) % 1) * route.len
      let s = 1
      while (s < route.cum.length - 1 && route.cum[s] < u) s++
      const seg = route.cum[s] - route.cum[s - 1] || 1
      o.position.lerpVectors(route.pts[s - 1], route.pts[s], (u - route.cum[s - 1]) / seg)
      o.scale.setScalar(show ? focus.current : 0.0001)
      o.updateMatrix()
      m.setMatrixAt(k, o.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <group position={[L.dioramas[i], 0, L.dioramaZ]}>
      <group ref={root}>
        {/* Plinth */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[W, 0.04, D]} />
          <meshStandardMaterial color={palette.base} metalness={0.2} roughness={0.8} transparent opacity={0.55} />
        </mesh>
        {lines.map((l, k) => (
          <primitive key={k} object={l} />
        ))}
        {d.nodes.map((n, k) => (
          <group key={k} position={[n.at[0], 0.04, n.at[1]]}>
            <Part kind={n.kind} focus={focus} />
            <mesh position={[0.62, 0.02, 0.72]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.8, 0.3]} />
              <meshBasicMaterial map={nodeLabels[k]} transparent depthWrite={false} />
            </mesh>
          </group>
        ))}
        <instancedMesh ref={dots} args={[undefined, undefined, N]} frustumCulled={false}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={palette.flow} toneMapped={false} />
        </instancedMesh>
      </group>
      {/* Title on the floor in front of the plinth, and the focus bar */}
      <mesh position={[-W / 2 + 2.6, 0.03, D / 2 + 0.75]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 1]} />
        <meshBasicMaterial map={title} transparent depthWrite={false} />
      </mesh>
      <mesh ref={bar} position={[0, 0.05, D / 2 + 0.12]}>
        <boxGeometry args={[W, 0.03, 0.05]} />
        <meshBasicMaterial color={signal(3)} toneMapped={false} />
      </mesh>
    </group>
  )
}

export function Dioramas({ theme }: { theme: Theme }) {
  return (
    <group>
      {DIORAMAS.map((d, i) => (
        <Diorama key={d.title} d={d} i={i} theme={theme} />
      ))}
    </group>
  )
}
