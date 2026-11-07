import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { Theme } from '../lib/theme'
import { L } from './layout'
import { seeded } from './math'
import { palette } from './palette'

/**
 * A quiet skyline at the edge of the board — context, not content. Keeps
 * clear of the system, the region sites, the monolith row and the forge.
 */
export function City({ count = 360, theme }: { count?: number; theme: Theme }) {
  const mesh = useRef<THREE.InstancedMesh>(null)

  const blocks = useMemo(() => {
    const rnd = seeded(42)
    const out: { x: number; z: number; w: number; d: number; h: number; lit: boolean }[] = []
    let guard = 0
    while (out.length < count && guard++ < count * 40) {
      const x = Math.round(-90 + rnd() * 180)
      const z = Math.round(-80 + rnd() * 110)
      if (Math.abs(x) < 27 && z > -30 && z < 26) continue // main system and the archive row
      if (L.regions.some((r) => Math.abs(x - r.x) < 23 && Math.abs(z - r.z) < 14)) continue
      if (z < -24 && z > -60 && Math.abs(x) < 50) continue // the arcs between regions
      if (z > 6 && Math.abs(x) < 40) continue // keep the camera side open
      const far = Math.hypot(x, z + 10)
      const h = 0.2 + Math.pow(rnd(), 3) * (far > 50 ? 10 : 4)
      out.push({ x, z, w: 0.8 + rnd() * 1.6, d: 0.8 + rnd() * 1.6, h, lit: rnd() > 0.92 })
    }
    return out
  }, [count])

  useLayoutEffect(() => {
    const m = mesh.current!
    const o = new THREE.Object3D()
    const c = new THREE.Color()
    blocks.forEach((b, i) => {
      o.position.set(b.x, b.h / 2, b.z)
      o.scale.set(b.w, b.h, b.d)
      o.updateMatrix()
      m.setMatrixAt(i, o.matrix)
      c.set(b.lit ? palette.cityLit : palette.city)
      m.setColorAt(i, c)
    })
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [blocks, theme])

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, blocks.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial metalness={0.6} roughness={0.5} />
    </instancedMesh>
  )
}
