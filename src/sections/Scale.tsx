import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MaskLines, useReveals } from '../components/Reveal'
import { education, scaleSteps, stack } from '../lib/data'
import { ScrollProgressStore } from '../lib/store'

/**
 * 03 — Scale. A pinned 600vh runway grows the system one stage at a time:
 * traffic, a separate database, a load balancer and replicas, a cache, a
 * queue with workers, read replicas. The text names the stage; the world
 * shows it. Followed by the spec sheet of tools.
 */
export function Scale() {
  const ref = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  useReveals(ref)

  useGSAP(
    () => {
      const store = ScrollProgressStore.current
      const steps = gsap.utils.toArray<HTMLElement>('[data-scale-step]')
      const ticks = gsap.utils.toArray<HTMLElement>('[data-scale-tick]')
      gsap.set(steps.slice(1), { autoAlpha: 0, y: 40 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '[data-scale-runway]',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            store.scaleT = self.progress
            const idx = Math.min(scaleSteps.length - 1, Math.floor(self.progress * scaleSteps.length))
            if (counterRef.current) counterRef.current.textContent = `${scaleSteps[idx].index} / 0${scaleSteps.length}`
            ticks.forEach((t, i) => t.toggleAttribute('data-active', i <= idx))
          },
          onLeave: () => (store.scaleT = 1),
          onLeaveBack: () => (store.scaleT = 0),
        },
      })
      // Strictly sequential: one stage's text is gone before the next arrives.
      steps.forEach((step, i) => {
        if (i === 0) return
        tl.to(steps[i - 1], { autoAlpha: 0, y: -40, duration: 0.14 }, i - 0.2)
        tl.to(step, { autoAlpha: 1, y: 0, duration: 0.14 }, i - 0.04)
      })
      tl.to({}, { duration: 0.8 })

      gsap.from('[data-cell]', {
        autoAlpha: 0,
        y: 30,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-grid]', start: 'top 80%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="scale" data-scene="2" className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="scrim-l px-4 py-24 md:col-span-7 md:px-6 md:py-32">
          <div data-reveal className="meta mb-10 text-bone/60">
            <span className="text-bone">[03 · Scale]</span> &nbsp; From one server to many
          </div>
          <MaskLines lines={['Start small.', <em className="text-bone/60">Grow on purpose.</em>]} />
          <p data-reveal="0.2" className="mt-8 max-w-[44ch] text-base text-bone/75">
            Six stages every growing system goes through. Each piece is added when the last one runs out of
            room — never before.
          </p>
        </div>
      </div>

      {/* Pinned runway */}
      <div data-scale-runway className="relative h-[600vh]">
        <div className="sticky top-0 flex h-svh flex-col pt-12">
          <div className="grid flex-1 grid-cols-1 md:grid-cols-12">
            <div className="scrim-l relative flex flex-col justify-between px-4 py-8 max-md:mt-[38svh] md:col-span-6 md:px-6 lg:col-span-5 md:py-12">
              <div className="meta flex items-center justify-between text-bone/50">
                <span>Stage</span>
                <span ref={counterRef} className="whitespace-nowrap tabular-nums text-bone">
                  01 / 06
                </span>
              </div>

              <div className="relative flex-1">
                {scaleSteps.map((s) => (
                  <article key={s.index} data-scale-step className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                    <div className="meta mb-5 text-signal">
                      Stage {s.index} — {s.name}
                    </div>
                    <h3 className="display-sm max-w-[17ch]">{s.headline}</h3>
                    <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-bone/80 md:text-base">{s.body}</p>
                    <div className="mt-6 max-w-[46ch] border-l border-signal pl-4">
                      <div className="meta text-bone/55">{s.index === '04' ? 'Why it matters' : 'In my work'}</div>
                      <p className="mt-2 text-sm leading-relaxed text-bone">{s.work}</p>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-1">
                      {s.chips.map((c) => (
                        <li key={c} className="border hairline px-2 py-1 font-mono text-[11px] text-bone/80">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <ol className="grid grid-cols-6 border-t hairline">
                {scaleSteps.map((s) => (
                  <li key={s.index} data-scale-tick className="group pt-3">
                    <span className="block h-px -translate-y-3 bg-transparent transition-colors duration-500 group-data-[active]:bg-signal" />
                    <span className="meta text-bone/40 transition-colors group-data-[active]:text-bone">
                      {s.index} <span className="hidden lg:inline">{s.name}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Spec sheet */}
      <div className="border-t hairline bg-ink px-4 pb-6 pt-16 md:px-6">
        <div className="meta text-bone/60">
          <span className="text-bone">[03 · Stack]</span> &nbsp; The tools behind every stage
        </div>
      </div>
      <div data-grid className="grid grid-cols-1 bg-ink sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((g, i) => (
          <div key={g.group} data-cell className="group relative border-b border-r hairline px-4 py-8 transition-colors hover:bg-ink-2 md:px-6">
            <div className="meta flex justify-between text-bone/55">
              <span>
                {String(i + 1).padStart(2, '0')} / {String(stack.length).padStart(2, '0')}
              </span>
              <span className="text-bone/40">{g.items.length} items</span>
            </div>
            <h3 className="display-sm mt-8">{g.group}</h3>
            <ul className="mt-6 flex flex-wrap gap-1">
              {g.items.map((item) => (
                <li key={item} className="border hairline px-2 py-1 font-mono text-[11px] text-bone/80">
                  {item}
                </li>
              ))}
            </ul>
            <span aria-hidden className="absolute right-4 top-8 h-1.5 w-1.5 rounded-full bg-signal opacity-0 transition-opacity group-hover:opacity-100 md:right-6" />
          </div>
        ))}

        <div data-cell className="flex flex-col justify-between border-b border-r hairline bg-bone px-4 py-8 text-ink md:px-6">
          <div className="meta flex justify-between text-ink/60">
            <span>Foundation</span>
            <span>{education.period}</span>
          </div>
          <div className="mt-8">
            <h3 className="display-sm">{education.school}</h3>
            <p className="mt-4 text-sm text-ink/75">{education.degree}</p>
          </div>
          <div className="mt-8 flex items-end justify-between border-t border-ink/15 pt-4">
            <span className="meta text-ink/60">CGPA</span>
            <span className="font-display text-5xl leading-none tracking-tight">{education.cgpa}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
