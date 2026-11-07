import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Grid } from '@react-three/drei'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useTheme } from '../lib/theme'
import { CameraRig } from './CameraRig'
import { System } from './System'
import { Regions } from './Regions'
import { Dioramas } from './Dioramas'
import { NewService } from './NewService'
import { City } from './City'
import { usePaletteFor } from './palette'

const small = typeof window !== 'undefined' && Math.min(window.innerWidth, window.innerHeight) < 700

/**
 * Layer 0 — the fixed stage. One world, one camera. The scroll grows a
 * system from a single server into three regions; the DOM above never
 * depends on it.
 */
export default function World() {
  const theme = useTheme()
  const p = usePaletteFor(theme)

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={small ? [1, 1.5] : [1, 1.75]}
        camera={{ position: [-22, 3, 9], fov: 34, near: 0.1, far: 300 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
        }}
      >
        <color attach="background" args={[p.bg]} />
        <fog attach="fog" args={[p.bg, 18, 80]} />
        <ambientLight intensity={p.ambient} />
        <directionalLight position={[20, 30, 14]} intensity={p.sun} color="#f4f3ef" />
        <directionalLight position={[-20, 10, -30]} intensity={0.35} color="#8a8f99" />

        <Grid
          infiniteGrid
          cellSize={1}
          cellThickness={0.5}
          cellColor={p.gridCell}
          sectionSize={8}
          sectionThickness={0.9}
          sectionColor={p.gridSection}
          fadeDistance={120}
          fadeStrength={2}
        />

        <CameraRig />
        <System main theme={theme} />
        <Regions theme={theme} />
        <Dioramas theme={theme} />
        <NewService theme={theme} />
        <City count={small ? 220 : 380} theme={theme} />

        <Suspense fallback={null}>
          {/* Self-hosted (same file as drei's "city" preset) so production never depends on a third-party mirror. */}
          <Environment files="/env/potsdamer_platz_1k.hdr" environmentIntensity={p.env} />
        </Suspense>

        <EffectComposer multisampling={small ? 0 : 4}>
          <Bloom mipmapBlur intensity={p.bloom} luminanceThreshold={1} luminanceSmoothing={0.2} />
          <Noise opacity={theme === 'light' ? 0.02 : 0.035} />
          <Vignette eskil={false} offset={0.25} darkness={p.vignette} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
