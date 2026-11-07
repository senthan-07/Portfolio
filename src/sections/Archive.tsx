import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'
import { MaskLines, useReveals } from '../components/Reveal'
import { archive } from '../lib/data'
import { ScrollProgressStore } from '../lib/store'
import { synth } from '../lib/sound'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * 04 — Archive. Each entry has a monolith in the world. Reading down the
 * list carries the request past them; the one you are reading lights up.
 */
export function Archive() {
  const ref = useRef<HTMLElement>(null)
  useReveals(ref)

  useGSAP(
    () => {
      const store = ScrollProgressStore.current
      const entries = gsap.utils.toArray<HTMLElement>('[data-entry]')

      // One trigger from the first entry's centre to the last entry's centre:
      // archiveT = i / (n - 1) exactly when entry i is centred.
      if (entries.length) {
        ScrollTrigger.create({
          trigger: entries[0],
          endTrigger: entries[entries.length - 1],
          start: 'center center',
          end: 'center center',
          onUpdate: (self) => (store.archiveT = self.progress),
          onLeave: () => (store.archiveT = 1),
          onLeaveBack: () => (store.archiveT = 0),
        })
      }

      entries.forEach((el) => {
        gsap.from(el.querySelectorAll('[data-entry-part]'), {
          autoAlpha: 0,
          y: 28,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => el.toggleAttribute('data-active', self.isActive),
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="archive" data-scene="3" className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left: sticky heading over a scrim; below it the monoliths are visible */}
        <div className="md:col-span-6">
          <div className="scrim-b px-4 pb-16 pt-24 md:bg-none md:px-6 md:pt-28">
            <div className="md:scrim-l md:-mx-6 md:px-6 md:py-6">
              <div data-reveal className="meta mb-10 text-bone/60">
                <span className="text-bone">[04 · Archive]</span> &nbsp; Case studies
              </div>
              <MaskLines lines={['Where it', <em className="text-bone/60">ran.</em>]} />
              <p data-reveal="0.2" className="mt-8 max-w-[38ch] text-base text-bone/75">
                Where I’ve built. Each entry appears behind the system as its own architecture — the one you’re reading comes alive.
              </p>
            </div>
          </div>
        </div>

        <div className="scrim-r md:col-span-6 md:bg-ink/95 md:[background-image:none]">
          {(['Experience', 'Project', 'Open source'] as const).map((kind) => {
            const items = archive.map((e, i) => ({ e, i })).filter(({ e }) => e.kind === kind)
            return (
              <div key={kind}>
                <div className="sticky top-12 z-10 flex items-center justify-between border-b hairline bg-ink px-4 py-4 md:border-l md:px-8">
                  <span className="meta text-bone">
                    <span className="text-signal">●</span> &nbsp;{kind === 'Project' ? 'Projects' : kind}
                  </span>
                  <span className="meta text-bone/50">{String(items.length).padStart(2, '0')} {items.length === 1 ? 'entry' : 'entries'}</span>
                </div>
                <ol>
          {items.map(({ e, i }) => {
            const link = e.href ?? e.repo
            return (
              <li
                key={e.title}
                data-entry
                className="group relative border-b hairline px-4 py-14 md:border-l md:px-8 md:py-20"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signal transition-transform duration-700 ease-out group-data-[active]:scale-y-100"
                />
                <div data-entry-part className="meta flex flex-wrap items-center justify-between gap-2 text-bone/55">
                  <span>
                    [Archive · {pad(i + 1)}] &nbsp; <span className="text-bone/80">{e.kind}</span>
                  </span>
                  <span className="flex items-center gap-2 tabular-nums">
                    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${e.period === 'Live' ? 'bg-signal' : 'bg-bone/30'}`} />
                    {e.period}
                  </span>
                </div>

                <h3 data-entry-part className="display-sm mt-8">
                  {e.title}
                </h3>
                <p data-entry-part className="mt-4 text-sm text-bone">
                  {e.role}
                </p>

                <ul data-entry-part className="mt-8 space-y-3 border-l hairline pl-5">
                  {e.points.map((p) => (
                    <li key={p} className="max-w-[60ch] text-sm leading-relaxed text-bone/75">
                      {p}
                    </li>
                  ))}
                </ul>

                <div data-entry-part className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t hairline pt-5">
                  <span className="font-mono text-[11px] tracking-[0.08em] text-bone/60">{e.stack}</span>
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => synth.hover()}
                      onClick={() => synth.click()}
                      className="meta inline-flex items-center gap-1.5 text-bone transition-colors hover:text-signal"
                    >
                      {e.hrefLabel ?? 'Source on GitHub'}
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} />
                    </a>
                  )}
                </div>
              </li>
            )
          })}
                </ol>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
