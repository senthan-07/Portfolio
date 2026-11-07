import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { MaskLines, useReveals } from '../components/Reveal'
import { areas, intents, links, profile } from '../lib/data'
import { synth } from '../lib/sound'

type Intent = (typeof intents)[number]
type Area = (typeof areas)[number]

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => {
        synth.click()
        onClick()
      }}
      onMouseEnter={() => synth.hover()}
      className={`meta inline-flex items-center gap-2 border px-4 py-3 transition-colors ${
        active ? 'border-bone bg-bone text-ink' : 'hairline text-bone/75 hover:border-bone/40 hover:text-bone'
      }`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-signal' : 'bg-bone/20'}`} />[{children}]
    </button>
  )
}

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  useReveals(ref)

  const [intent, setIntent] = useState<Intent>(intents[0])
  const [area, setArea] = useState<Area>(areas[0])
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  const message = useMemo(() => {
    const who = name.trim() ? `I'm ${name.trim()}. ` : ''
    const what =
      intent === 'Just Saying Hi'
        ? 'Just wanted to say hi after seeing your portfolio.'
        : `I'd like to talk about a ${intent.toLowerCase()} — ${area}.`
    const extra = note.trim() ? `\n\n${note.trim()}` : ''
    return `Hi Senthan, ${who}${what}${extra}`
  }, [intent, area, name, note])

  const subject = intent === 'Just Saying Hi' ? 'Hello from your portfolio' : `${intent} · ${area}`
  const mail = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`

  return (
    <section ref={ref} id="contact" data-scene="5" className="relative">
      <div className="grid min-h-[110svh] grid-cols-1 md:grid-cols-12">
        <div className="scrim-l flex flex-col justify-end px-4 py-20 md:col-span-7 md:px-6 md:py-28">
          <div data-reveal className="meta mb-10 text-bone/60">
            <span className="text-bone">[06 · Contact]</span> &nbsp; Three regions. One system.
          </div>
          <MaskLines lines={['Every request', <em className="text-bone/60">gets a response.</em>]} />
          <p data-reveal="0.2" className="mt-8 max-w-[44ch] text-base text-bone/75">
            Pick what fits. The email writes itself — it reaches me directly.
          </p>
        </div>
      </div>

      {/* Builder */}
      <div className="grid grid-cols-1 border-t hairline bg-ink lg:grid-cols-12">
        <div className="border-b hairline px-4 py-10 md:px-6 lg:col-span-7 lg:border-r">
          <fieldset data-reveal>
            <legend className="meta mb-5 text-bone/55">01 · What is this about?</legend>
            <div className="flex flex-wrap gap-2">
              {intents.map((i) => (
                <Pill key={i} active={intent === i} onClick={() => setIntent(i)}>
                  {i}
                </Pill>
              ))}
            </div>
          </fieldset>

          <fieldset data-reveal="0.08" className={`mt-10 transition-opacity ${intent === 'Just Saying Hi' ? 'opacity-35' : ''}`}>
            <legend className="meta mb-5 text-bone/55">02 · Which area?</legend>
            <div className="flex flex-wrap gap-2">
              {areas.map((a) => (
                <Pill key={a} active={area === a} onClick={() => setArea(a)}>
                  {a}
                </Pill>
              ))}
            </div>
          </fieldset>

          <div data-reveal="0.16" className="mt-10 grid grid-cols-1 gap-px border hairline bg-bone/10 sm:grid-cols-2">
            <label className="block bg-ink px-4 py-3">
              <span className="meta text-bone/55">03 · Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Optional"
                className="mt-2 block w-full bg-transparent text-base text-bone placeholder:text-bone/25 focus:outline-none"
              />
            </label>
            <label className="block bg-ink px-4 py-3">
              <span className="meta text-bone/55">04 · One line of context</span>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional"
                className="mt-2 block w-full bg-transparent text-base text-bone placeholder:text-bone/25 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* Live preview + send */}
        <div className="flex flex-col border-b hairline lg:col-span-5">
          <div className="flex-1 px-4 py-10 md:px-6">
            <div className="meta flex items-center justify-between text-bone/55">
              <span>Preview</span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" /> Live
              </span>
            </div>
            <p aria-live="polite" className="mt-6 whitespace-pre-line font-mono text-[13px] leading-relaxed text-bone/80">
              {message}
            </p>
          </div>
          <a
            href={mail}
            onMouseEnter={() => synth.hover()}
            onClick={() => synth.click()}
            className="meta flex items-center justify-between gap-2 border-t hairline bg-bone px-4 py-6 text-ink transition-colors hover:bg-signal md:px-6"
          >
            <span>Send email · {profile.email}</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-ink">
        <div className="grid grid-cols-2 border-b hairline md:grid-cols-4">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => synth.hover()}
              className="group flex items-center justify-between border-r hairline px-4 py-6 transition-colors hover:bg-ink-2 md:px-6 [&:nth-child(2)]:max-md:border-r-0 [&:nth-child(-n+2)]:max-md:border-b"
            >
              <span className="meta text-bone/70 group-hover:text-bone">
                <span className="text-bone/45">{String(i + 1).padStart(2, '0')}</span> &nbsp; {l.label}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-bone/55 transition-colors group-hover:text-signal" strokeWidth={1.25} />
            </a>
          ))}
        </div>
        <div className="meta flex flex-col gap-2 px-4 py-6 pb-20 text-bone/45 md:flex-row md:justify-between md:px-6 md:pb-6 md:pr-24">
          <span>
            <a href={`mailto:${profile.email}`} className="hover:text-bone">
              {profile.email}
            </a>
          </span>
          <span>© {new Date().getFullYear()} {profile.name} · Built with React, GSAP & Three.js</span>
        </div>
      </footer>
    </section>
  )
}
