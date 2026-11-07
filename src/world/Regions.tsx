import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Theme } from '../lib/theme'
import { L } from './layout'
import { live } from './live'
import { System } from './System'
import { signal } from './palette'

const SEG = 120
const RADIAL = 5

/** One arc between the main load balancer and a region's, drawn in as the regions come up. */
function Arc({ to }: { to: THREE.Vector3 }) {
  const { geo, curve } = useMemo(() => {
    const a = new THREE.Vector3(L.lb.x, 0.7, L.lb.z)
    const b = new THREE.Vector3(to.x + L.lb.x, 0.7, to.z + L.lb.z)
    const mid = a.clone().lerp(b, 0.5).setY(14)
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    return { geo: new THREE.TubeGeometry(curve, SEG, 0.06, RADIAL, false), curve }
  }, [to])
  const dots = useRef<THREE.InstancedMesh>(null)
  const o = useMemo(() => new THREE.Object3D(), [])
  const N = 10

  useFrame((state) => {
    const r = live.regions
    geo.setDrawRange(0, Math.round(r * SEG) * RADIAL * 6)
    const m = dots.current!
    const t = state.clock.elapsedTime
    for (let i = 0; i < N; i++) {
      const u = (i / N + t * 0.08 * (i % 2 ? 1 : -1) + 1) % 1
      curve.getPointAt(u, o.position)
      o.scale.setScalar(r > 0.98 ? 1 : 0.0001)
      o.updateMatrix()
      m.setMatrixAt(i, o.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      <mesh geometry={geo}>
        <meshBasicMaterial color={signal(3)} toneMapped={false} />
      </mesh>
      <instancedMesh ref={dots} args={[undefined, undefined, N]} frustumCulled={false}>
        <sphereGeometry args={[0.16, 10, 10]} />
        <meshBasicMaterial color={signal(3)} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

function Region({ at, theme }: { at: THREE.Vector3; theme: Theme }) {
  const g = useRef<THREE.Group>(null)
  useFrame(() => {
    const r = live.regions
    // Rise out of the floor once the arc has reached it.
    const e = THREE.MathUtils.clamp((r - 0.55) / 0.45, 0, 1)
    g.current!.scale.set(1, Math.max(0.0001, e), 1)
    g.current!.visible = e > 0.01
  })
  return (
    <group position={at}>
      <group ref={g}>
        <System main={false} theme={theme} />
      </group>
    </group>
  )
}

/** 06 — Go global: the grown system, replicated into two more regions. */
export function Regions({ theme }: { theme: Theme }) {
  return (
    <group>
      {L.regions.map((r, i) => (
        <group key={i}>
          <Arc to={r} />
          <Region at={r} theme={theme} />
        </group>
      ))}
    </group>
  )
}
