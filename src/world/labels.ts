import * as THREE from 'three'
import { palette } from './palette'

/** Mono annotation drawn to a canvas — like a callout on an architectural drawing. */
export function labelTexture(lines: string[], opts: { width?: number; height?: number; size?: number } = {}) {
  const { width = 1024, height = 256, size = 56 } = opts
  const c = document.createElement('canvas')
  c.width = width
  c.height = height
  const g = c.getContext('2d')!
  g.textBaseline = 'top'
  lines.forEach((line, i) => {
    const first = i === 0
    g.font = `${first ? 500 : 400} ${first ? size : size * 0.62}px "JetBrains Mono", ui-monospace, monospace`
    const y = first ? 0 : size * 1.25 + (i - 1) * size * 0.85
    if (first) {
      g.fillStyle = palette.signal
      g.fillRect(0, size * 0.32, size * 0.32, size * 0.32)
    }
    g.fillStyle = first ? palette.label : palette.labelMuted
    g.fillText(line.toUpperCase(), size * 0.62, y)
  })
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}
