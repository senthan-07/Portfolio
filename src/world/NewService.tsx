import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Theme } from '../lib/theme'
import { ScrollProgressStore } from '../lib/store'
import { L } from './layout'
import { live } from './live'
import { seeded, smooth } from './math'
import { palette, signal } from './palette'
import { labelTexture } from './labels'

const N = 3
const COUNT = N * N * N
const GAP = 0.5
const SIZE = 0.44
const CY = 0.78 // block centre height — matches the app servers

/**
 * 05 — Process, inside the running system. An empty slot in the app tier:
 *   Design  a blueprint footprint and dashed connections appear; parts float
 *   Build   the parts lock into a service block
 *   Verify  a scan passes top to bottom; checked parts turn "healthy"
 *   Ship    the connections go solid and live traffic starts routing to it
 */
export function NewService({ theme }: { theme: Theme }) {
  const root = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.InstancedMesh>(null)
  const scan = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const footprint = useRef<THREE.LineSegments>(null)
  const dashMats = useRef<THREE.LineDashedMaterial[]>([])
  const solidMats = useRef<THREE.LineBasicMaterial[]>([])
  const labelMat = useRef<THREE.MeshBasicMaterial>(null)

  const { home, scatter, spin } = useMemo(() => {
    const rnd = seeded(7)
    const home: THREE.Vector3[] = []
    const scatter: THREE.Vector3[] = []
    const spin: THREE.Euler[] = []
    for (let x = 0; x < N; x++)
      for (let y = 0; y < N; y++)
        for (let z = 0; z < N; z++) {
          home.push(new THREE.Vector3((x - 1) * GAP, (y - 1) * GAP, (z - 1) * GAP))
          const a = rnd() * Math.PI * 2
          const r = 1.3 + rnd() * 1.3
          scatter.push(new THREE.Vector3(Math.cos(a) * r, 0.6 + rnd() * 1.6, Math.sin(a) * r))
          spin.push(new THREE.Euler(rnd() * 3, rnd() * 3, rnd() * 3))
        }
    return { home, scatter, spin }
  }, [])

  const footGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 0.001, 2)), [])

  // Connections: load balancer → new service → database. Dashed while designed, solid once shipped.
  const links = useMemo(() => {
    const s = new THREE.Vector3(L.slot.x, 0.05, L.slot.z)
    const pairs: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(L.lb.x, 0.05, L.lb.z), s],
      [s, new THREE.Vector3(L.db.x, 0.05, L.db.z)],
    ]
    dashMats.current = []
    solidMats.current = []
    return pairs.map(([a, b]) => {
      const g = new THREE.BufferGeometry().setFromPoints([a, b])
      const dm = new THREE.LineDashedMaterial({ color: palette.edge, dashSize: 0.35, gapSize: 0.25, transparent: true, opacity: 0 })
      const dl = new THREE.Line(g, dm)
      dl.computeLineDistances()
      const sm = new THREE.LineBasicMaterial({ color: signal(), transparent: true, opacity: 0 })
      const sl = new THREE.Line(g, sm)
      dashMats.current.push(dm)
      solidMats.current.push(sm)
      return [dl, sl]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  const label = useMemo(
    () => labelTexture(['New service', 'Design · Build · Verify · Ship']),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  )

  const tmp = useMemo(() => new THREE.Object3D(), [])
  const col = useMemo(() => new THREE.Color(), [])
  const p = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const t = THREE.MathUtils.clamp(ScrollProgressStore.current.processT, 0, 1) * 4
    const arrive = smooth((live.scene - 3.6) / 0.4)
    const design = smooth(t * 1.4) * arrive
    const build = smooth(t - 1)
    const verify = THREE.MathUtils.clamp(t - 2, 0, 1)
    const ship = live.ship

    root.current!.visible = arrive > 0.01
    ;(footprint.current!.material as THREE.LineBasicMaterial).opacity = design * 0.8
    labelMat.current!.opacity = design
    dashMats.current.forEach((m) => (m.opacity = design * (1 - ship) * 0.85))
    solidMats.current.forEach((m) => (m.opacity = ship * 0.9))

    const scanY = THREE.MathUtils.lerp(CY + 0.85, CY - 0.85, verify)
    scan.current!.position.y = scanY
    scan.current!.visible = verify > 0.001 && verify < 0.999

    const m = mesh.current!
    for (let i = 0; i < COUNT; i++) {
      p.copy(scatter[i]).lerp(home[i].clone().setY(home[i].y + CY), build)
      p.y += Math.sin(time * 0.8 + i) * 0.06 * (1 - build)
      tmp.position.copy(p)
      const free = 1 - build
      tmp.rotation.set(spin[i].x * free, spin[i].y * free + time * 0.25 * free, spin[i].z * free)
      tmp.scale.setScalar(Math.max(0.0001, THREE.MathUtils.lerp(0.6, 1, build) * design))
      tmp.updateMatrix()
      m.setMatrixAt(i, tmp.matrix)
      const checked = verify > 0 && home[i].y + CY > scanY - 0.04 ? 1 : 0
      col.copy(palette.base).lerp(palette.lit, Math.max(checked * 0.9, ship * 0.9))
      m.setColorAt(i, col)
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true

    // Ship: a pulse ring spreads from the slot, once per cycle.
    const wave = ship > 0.01 ? (time * 0.55) % 1 : 0
    ring.current!.scale.setScalar(1 + wave * 2.2)
    ;(ring.current!.material as THREE.MeshBasicMaterial).opacity = ship * (1 - wave) * 0.9
  })

  return (
    <group>
      {links.map(([dl, sl], i) => (
        <group key={i}>
          <primitive object={dl} />
          <primitive object={sl} />
        </group>
      ))}
      <group ref={root} position={[L.slot.x, 0, L.slot.z]}>
        <lineSegments ref={footprint} geometry={footGeo} position={[0, 0.03, 0]}>
          <lineBasicMaterial color={palette.edge} transparent opacity={0} />
        </lineSegments>
        <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
          <boxGeometry args={[SIZE, SIZE, SIZE]} />
          <meshStandardMaterial metalness={palette.metal} roughness={palette.rough} />
        </instancedMesh>
        <mesh ref={scan} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.9, 1.9]} />
          <meshBasicMaterial color={signal(2)} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
        </mesh>
        <mesh ref={ring} position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.26, 96]} />
          <meshBasicMaterial color={signal(3)} transparent opacity={0} toneMapped={false} />
        </mesh>
        <mesh position={[2.6, 0.03, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 1]} />
          <meshBasicMaterial ref={labelMat} map={label} transparent depthWrite={false} opacity={0} />
        </mesh>
      </group>
    </group>
  )
}
