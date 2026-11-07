import { lazy, Suspense, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SmoothScroll } from './components/SmoothScroll'
import { HudChrome } from './components/HudChrome'
import { Origin } from './sections/Origin'
import { Deconstruction } from './sections/Deconstruction'
import { Scale } from './sections/Scale'
import { Archive } from './sections/Archive'
import { Process } from './sections/Process'
import { Contact } from './sections/Contact'
import { ScrollProgressStore } from './lib/store'

const World = lazy(() => import('./world/World'))

/** Exposed Swiss column grid, fixed behind the content. */
function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] grid grid-cols-4 md:grid-cols-12">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className={`border-r border-bone/[0.035] ${i >= 4 ? 'hidden md:block' : ''} ${i % 3 !== 2 ? 'md:border-transparent' : ''}`}
        />
      ))}
    </div>
  )
}

export default function App() {
  const main = useRef<HTMLElement>(null)

  // Scroll → ScrollProgressStore. Mutates a plain object; never sets state.
  useGSAP(
    () => {
      const store = ScrollProgressStore.current

      gsap.to(store, {
        progress: 1,
        ease: 'none',
        scrollTrigger: { trigger: main.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })

      // One range per section (first and last pinned to the document edges so story
      // time runs 0 → 6 exactly). Story position is derived from the scroll offset on
      // every update rather than from enter/leave callbacks, so large jumps — nav
      // clicks, End key, scrollbar drags — can never skip a section's state.
      const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]')
      const ranges = scenes.map((section, n) =>
        ScrollTrigger.create({
          trigger: section,
          start: n === 0 ? 'top top' : 'top center',
          end: n === scenes.length - 1 ? 'bottom bottom' : 'bottom center',
        }),
      )
      const locate = (y: number) => {
        let i = 0
        while (i < ranges.length - 1 && y >= ranges[i].end) i++
        const r = ranges[i]
        const p = gsap.utils.clamp(0, 0.9999, (y - r.start) / Math.max(1, r.end - r.start))
        store.section = Number(scenes[i].dataset.scene)
        store.scene = store.section + p
      }
      ScrollTrigger.create({
        trigger: main.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => locate(self.scroll()),
        onRefresh: (self) => locate(self.scroll()),
      })

      // Fonts shift layout once they land; re-measure.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: main },
  )

  return (
    <SmoothScroll>
      <Suspense fallback={null}>
        <World />
      </Suspense>
      <GridLines />
      <HudChrome />
      <main ref={main} className="relative z-10 md:mr-[72px] md:border-r md:hairline">
        <Origin />
        <Deconstruction />
        <Scale />
        <Archive />
        <Process />
        <Contact />
      </main>
    </SmoothScroll>
  )
}
