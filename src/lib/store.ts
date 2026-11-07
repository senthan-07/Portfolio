/**
 * ScrollProgressStore — the zero-re-render bridge.
 *
 * GSAP ScrollTrigger writes into this object; R3F's useFrame and the HUD's
 * ticker read from it. Nothing here touches React state, so scrolling never
 * triggers a render.
 */
export type ScrollProgress = {
  /** 0 → 1 across the whole document (scrubbed). */
  progress: number
  /** Section currently crossing the viewport centre (0–5). */
  section: number
  /** Story time: section index + progress inside that section (0 → 6). */
  scene: number
  /** Active layer inside the 02 / Layers runway (0–3), -1 outside. */
  layer: number
  /** 0 → 1 across the Layers runway — opens the first server layer by layer. */
  layerT: number
  /** 0 → 1 across the Scale runway — grows the system one stage at a time. */
  scaleT: number
  /** 0 → 1 across the Archive list — dollies past the four monoliths. */
  archiveT: number
  /** 0 → 1 across the Process runway — drives the forge: design, build, verify, ship. */
  processT: number
}

export const ScrollProgressStore: { current: ScrollProgress } = {
  current: { progress: 0, section: 0, scene: 0, layer: -1, layerT: 0, scaleT: 0, archiveT: 0, processT: 0 },
}

export const SCENE_COUNT = 6
export const MAX_DEPTH = 140
