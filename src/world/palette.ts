import * as THREE from 'three'
import type { Theme } from '../lib/theme'

export type Palette = {
  bg: string
  /** Accent for active state: the request, live links, focus bars. */
  signal: string
  gridCell: string
  gridSection: string
  /** Default surface of built parts. */
  base: THREE.Color
  /** "Done / healthy" state — bone in dark mode, ink in light mode. */
  lit: THREE.Color
  slab: string
  slabTop: string
  pin: string
  edge: string
  flow: THREE.Color
  label: string
  labelMuted: string
  screenBg: string
  screenLine: string
  city: string
  cityLit: string
  env: number
  vignette: number
  bloom: number
  /** Surface finish of built parts. */
  metal: number
  rough: number
  /** Opacity of connection lines. */
  edgeOpacity: number
  ambient: number
  sun: number
}

export const palettes: Record<Theme | 'darkClassic', Palette> = {
  // Dark — jet black ground, cerulean structure, neon-rose accent.
  dark: {
    bg: '#0a0a0a',
    signal: '#ff2950',
    gridCell: '#0f1a24',
    gridSection: '#123a56',
    base: new THREE.Color('#16222e'),
    lit: new THREE.Color('#e6f5ff'),
    slab: '#1d5f8f',
    slabTop: '#a6dcfa',
    pin: '#8fd0f7',
    edge: '#2a9df4',
    flow: new THREE.Color('#5cc6ff').multiplyScalar(1.6),
    label: '#eaf6ff',
    labelMuted: 'rgba(143,208,247,0.7)',
    screenBg: '#0d1218',
    screenLine: 'rgba(42,157,244,0.28)',
    city: '#0c1117',
    cityLit: '#14324a',
    env: 0.45,
    vignette: 0.6,
    bloom: 0.8,
    metal: 0.4,
    rough: 0.38,
    edgeOpacity: 0.55,
    ambient: 0.4,
    sun: 1.5,
  },
  // Previous dark palette — set THEME_DARK below to 'darkClassic' to switch back.
  darkClassic: {
    bg: '#0a0a0a',
    signal: '#ff3b00',
    gridCell: '#1d1d1c',
    gridSection: '#36352f',
    base: new THREE.Color('#3a3936'),
    lit: new THREE.Color('#f4f3ef'),
    slab: '#7c7a74',
    slabTop: '#ecebe6',
    pin: '#d6d4cd',
    edge: '#f4f3ef',
    flow: new THREE.Color('#f4f3ef').multiplyScalar(1.5),
    label: '#f4f3ef',
    labelMuted: 'rgba(244,243,239,0.6)',
    screenBg: '#121212',
    screenLine: 'rgba(244,243,239,0.16)',
    city: '#161615',
    cityLit: '#2c2b28',
    env: 0.5,
    vignette: 0.55,
    bloom: 0.7,
    metal: 0.35,
    rough: 0.42,
    edgeOpacity: 0.42,
    ambient: 0.45,
    sun: 1.6,
  },
  light: {
    bg: '#f4f3ef',
    signal: '#ff3b00',
    gridCell: '#dcdad3',
    gridSection: '#c3c0b7',
    base: new THREE.Color('#d6d3cb'),
    lit: new THREE.Color('#141414'),
    slab: '#2a2a2a',
    slabTop: '#0f0f0f',
    pin: '#2a2a2a',
    edge: '#0b0b0b',
    flow: new THREE.Color('#141414'),
    label: '#0b0b0b',
    labelMuted: 'rgba(11,11,11,0.55)',
    screenBg: '#ecebe6',
    screenLine: 'rgba(11,11,11,0.16)',
    city: '#e2e0d9',
    cityLit: '#cac7be',
    env: 0.7,
    vignette: 0.28,
    bloom: 0.45,
    metal: 0.9,
    rough: 0.25,
    edgeOpacity: 0.32,
    ambient: 0.5,
    sun: 1.4,
  },
}

/** The active palette — mutated in place when the theme changes, read every frame. */
export const palette: Palette = { ...palettes.dark }

/** Which palette dark mode uses. 'dark' = jet / cerulean / neon rose; 'darkClassic' = the previous one. */
export const THEME_DARK: 'dark' | 'darkClassic' = 'dark'

export function usePaletteFor(theme: Theme) {
  Object.assign(palette, palettes[theme === 'dark' ? THEME_DARK : 'light'])
  return palette
}

/** The accent as a colour, optionally pushed past 1.0 so bloom picks it up. */
export const signal = (k = 1) => new THREE.Color(palette.signal).multiplyScalar(k)
