import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MaskLines, useReveals } from '../components/Reveal'
import { layers } from '../lib/data'
import { ScrollProgressStore } from '../lib/store'

/**
 * 02 — Layers. A pinned 400vh runway. Its progress moves the request
 * through the four stations in the world; the text panel only names
 * what the visitor is already watching.
 */
export function Deconstruction() {
  const ref = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  useReveals(ref)

  useGSAP(
    () => {
      const store = ScrollProgressStore.current
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]')
      const ticks = gsap.utils.toArray<HTMLElement>('[data-tick]')
      gsap.set(steps.slice(1), { autoAlpha: 0, y: 40 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '[data-runway]',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            store.layerT = self.progress
            const idx = Math.min(layers.length - 1, Math.floor(self.progress * layers.length))
            store.layer = idx
            if (counterRef.current) counterRef.current.textContent = `${layers[idx].index} / 0${layers.length}`
            ticks.forEach((t, i) => t.toggleAttribute('data-active', i === idx))
          },
          onLeave: () => {
            store.layerT = 1
            store.layer = -1
          },
          onLeaveBack: () => {
            store.layerT = 0
            store.layer = -1
          },
        },
      })

      // Strictly sequential: the old panel is gone before the new one arrives.
      steps.forEach((step, i) => {
        if (i === 0) return
        tl.to(steps[i - 1], { autoAlpha: 0, y: -40, duration: 0.14 }, i - 0.2)
        tl.to(step, { autoAlpha: 1, y: 0, duration: 0.14 }, i - 0.04)
      })
      tl.to({}, { duration: 0.8 })
      tl.fromTo('[data-progress]', { scaleX: 0 }, { scaleX: 1, duration: tl.duration() }, 0)
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="layers" data-scene="1" className="relative">
      {/* Intro */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="scrim-l px-4 py-24 md:col-span-7 md:px-6 md:py-32">
          <div data-reveal className="meta mb-10 text-bone/60">
            <span className="text-bone">[02 · Layers]</span> &nbsp; Inside one server
          </div>
          <MaskLines lines={['Open the', <em className="text-bone/60">first server.</em>]} />
          <p data-reveal="0.2" className="mt-8 max-w-[46ch] text-base text-bone/75">
            Every request passes four layers before it gets an answer. I designed and shipped each of them
            in production at Citi.
          </p>
        </div>
      </div>

      {/* Pinned runway */}
      <div data-runway className="relative h-[400vh]">
        <div className="sticky top-0 flex h-svh flex-col pt-12">
          <div className="grid flex-1 grid-cols-1 md:grid-cols-12">
            <div className="scrim-l relative flex flex-col justify-between px-4 py-8 max-md:mt-[38svh] md:col-span-6 md:px-6 md:py-12">
              <div className="meta flex items-center justify-between text-bone/50">
                <div className="flex gap-4">
                  {layers.map((l) => (
                    <span key={l.index} data-tick className="group flex items-center gap-1.5 transition-colors data-[active]:text-bone">
                      <span aria-hidden className="h-1 w-1 rounded-full bg-bone/25 group-data-[active]:bg-signal" />
                      <span className="hidden sm:inline">{l.name}</span>
                    </span>
                  ))}
                </div>
                <span ref={counterRef} className="whitespace-nowrap tabular-nums text-bone">
                  01 / 04
                </span>
              </div>

              <div className="relative flex-1">
                {layers.map((l) => (
                  <article key={l.index} data-step className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                    <div className="meta mb-5 text-bone/55">
                      Layer {l.index} — <span className="text-signal">{l.name}</span>
                    </div>
                    <h3 className="display-sm max-w-[16ch]">{l.headline}</h3>
                    <p className="mt-5 max-w-[48ch] text-sm leading-relaxed text-bone/75 md:text-base">{l.body}</p>
                    <p className="meta mt-6 text-bone sm:hidden">
                      <span className="text-signal">●</span> {l.proof}
                    </p>
                    <dl className="mt-8 hidden max-w-[560px] grid-cols-2 border-t hairline sm:grid">
                      <div className="border-b border-r hairline py-4 pr-4">
                        <dt className="meta text-bone/50">What you get</dt>
                        <dd className="mt-2 text-sm text-bone">{l.get}</dd>
                      </div>
                      <div className="border-b hairline py-4 pl-4">
                        <dt className="meta text-bone/50">Proof</dt>
                        <dd className="mt-2 text-sm text-bone">{l.proof}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>

              <div className="h-px w-full bg-bone/10">
                <div data-progress className="h-px origin-left bg-signal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
