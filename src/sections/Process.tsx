import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MaskLines, useReveals } from '../components/Reveal'
import { achievements, process } from '../lib/data'
import { ScrollProgressStore } from '../lib/store'

/**
 * 05 — Process. One object in the world goes through the four phases as you
 * scroll: scattered parts in a blueprint → assembled → scanned → shipped.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  useReveals(ref)

  useGSAP(
    () => {
      const store = ScrollProgressStore.current
      const steps = gsap.utils.toArray<HTMLElement>('[data-phase]')
      const ticks = gsap.utils.toArray<HTMLElement>('[data-phase-tick]')
      gsap.set(steps.slice(1), { autoAlpha: 0, y: 40 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '[data-forge-runway]',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            store.processT = self.progress
            const idx = Math.min(process.length - 1, Math.floor(self.progress * process.length))
            if (counterRef.current) counterRef.current.textContent = `${process[idx].index} / 0${process.length}`
            ticks.forEach((t, i) => t.toggleAttribute('data-active', i <= idx))
          },
          onLeave: () => (store.processT = 1),
          onLeaveBack: () => (store.processT = 0),
        },
      })
      steps.forEach((step, i) => {
        if (i === 0) return
        tl.to(steps[i - 1], { autoAlpha: 0, y: -40, duration: 0.14 }, i - 0.2)
        tl.to(step, { autoAlpha: 1, y: 0, duration: 0.14 }, i - 0.04)
      })
      tl.to({}, { duration: 0.8 })

      gsap.fromTo(
        '[data-ticker]',
        { xPercent: 0 },
        {
          xPercent: -18,
          ease: 'none',
          scrollTrigger: { trigger: '[data-ticker]', start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="process" data-scene="4" className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="scrim-l px-4 py-24 md:col-span-7 md:px-6 md:py-32">
          <div data-reveal className="meta mb-10 text-bone/60">
            <span className="text-bone">[05 · Process]</span> &nbsp; Every new service
          </div>
          <MaskLines lines={['Design first.', <em className="text-bone/60">Then the code.</em>]} />
          <p data-reveal="0.2" className="mt-8 max-w-[44ch] text-base text-bone/75">
            The system needs one more service. Watch it go from blueprint to live traffic — the same four phases I follow on every feature.
          </p>
        </div>
      </div>

      <div data-forge-runway className="relative h-[400vh]">
        <div className="sticky top-0 flex h-svh flex-col pt-12">
          <div className="grid flex-1 grid-cols-1 md:grid-cols-12">
            <div className="scrim-l relative flex flex-col justify-between px-4 py-8 max-md:mt-[38svh] md:col-span-6 md:px-6 md:py-12">
              <div className="meta flex items-center justify-between text-bone/50">
                <span>Phase</span>
                <span ref={counterRef} className="whitespace-nowrap tabular-nums text-bone">
                  01 / 04
                </span>
              </div>

              <div className="relative flex-1">
                {process.map((p) => (
                  <article key={p.index} data-phase className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                    <div className="meta mb-5 text-signal">Step {p.index}</div>
                    <h3 className="display">{p.phase}</h3>
                    <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-bone/80">{p.does}</p>
                    <div className="mt-8 max-w-[460px] border-l border-signal pl-4">
                      <div className="meta text-bone/55">You get</div>
                      <div className="mt-2 text-sm text-bone">{p.get}</div>
                      <div className="meta mt-3 text-bone/60">{p.proof}</div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Phase rail */}
              <ol className="grid grid-cols-4 border-t hairline">
                {process.map((p) => (
                  <li key={p.index} data-phase-tick className="group pt-3">
                    <span className="block h-px -translate-y-3 bg-transparent transition-colors duration-500 group-data-[active]:bg-signal" />
                    <span className="meta text-bone/40 transition-colors group-data-[active]:text-bone">
                      {p.index} <span className="hidden sm:inline">{p.phase}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="overflow-hidden border-y hairline bg-ink">
        <div data-ticker className="flex w-max">
          {[...achievements, ...achievements].map((a, i) => (
            <div key={i} className="flex min-w-[280px] items-baseline gap-4 border-r hairline px-6 py-8">
              <span className="meta text-bone/40">{String((i % achievements.length) + 1).padStart(2, '0')}</span>
              <span className="font-display text-4xl leading-none tracking-tight">{a.value}</span>
              <span className="meta text-bone/60">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
