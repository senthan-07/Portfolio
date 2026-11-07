import { useRef, type ReactNode } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Lenis drives the scroll; GSAP's ticker drives Lenis; Lenis tells ScrollTrigger. */
function ScrollTriggerBridge() {
  useLenis(ScrollTrigger.update)
  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useGSAP(() => {
    const raf = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(raf)
  })

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.085, smoothWheel: !reduced, wheelMultiplier: 0.9 }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  )
}
