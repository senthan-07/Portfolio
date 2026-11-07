import { useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { MaskLines, useReveals } from '../components/Reveal'
import { education, profile } from '../lib/data'

export function Origin() {
  const ref = useRef<HTMLElement>(null)
  useReveals(ref)

  return (
    <section ref={ref} id="origin" data-scene="0" className="relative flex min-h-svh flex-col pt-12">
      <div className="grid flex-1 grid-cols-1 md:grid-cols-12">
        {/* Stage cell on phones: the request sits here, above the name */}
        <div className="relative h-[34svh] md:hidden">
          <span className="meta absolute right-4 top-4 text-bone/50">Fig. 01 — One user, one server</span>
        </div>

        <div className="scrim-l flex flex-col justify-between gap-10 px-4 pb-10 pt-6 md:col-span-7 md:px-6 md:pt-14">
          <div data-reveal className="meta flex flex-wrap gap-x-6 gap-y-1 text-bone/60">
            <span className="text-bone">[01 · Origin]</span>
            <span>{profile.location}</span>
            <span>{profile.role}</span>
          </div>

          <div>
            <MaskLines
              as="h1"
              className="display text-[clamp(3.25rem,10vw,10.5rem)]"
              lines={[profile.first, <em className="text-bone/60">{profile.last}.</em>]}
            />
            <p data-reveal="0.3" className="mt-8 max-w-[42ch] text-lg leading-snug text-bone md:text-xl">
              Backend engineer. Every system starts with one request. I build them to keep answering as
              the traffic grows.
            </p>
            <div data-reveal="0.45" className="meta mt-10 flex items-center gap-3 text-bone/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Scroll — watch it grow
            </div>
          </div>
        </div>

        <div className="relative hidden md:col-span-5 md:block">
          <span className="meta absolute right-6 top-14 text-bone/50">Fig. 01 — One user, one server</span>
        </div>
      </div>

      {/* Fact strip */}
      <div className="grid grid-cols-2 border-y hairline bg-ink md:grid-cols-4">
        {[
          ['Latest', 'Summer Analyst Intern', 'Citi · Jun – Jul 2026'],
          ['Studying', 'B.Tech CSE, Cyber Security', `${education.school.replace(' Chennai', '')} · CGPA ${education.cgpa}`],
          ['Focus', 'APIs · Auth · Data · CI/CD', 'FastAPI · PostgreSQL · Docker'],
        ].map(([k, v, sub], i) => (
          <div key={k} data-reveal={0.4 + i * 0.06} className="border-r hairline px-4 py-5 md:px-6 [&:nth-child(2)]:max-md:border-r-0">
            <div className="meta text-bone/50">
              {String(i + 1).padStart(2, '0')} · {k}
            </div>
            <div className="mt-3 text-sm text-bone">{v}</div>
            <div className="mt-1 text-sm text-bone/60">{sub}</div>
          </div>
        ))}
        <a
          data-reveal="0.58"
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col justify-between px-4 py-5 transition-colors hover:bg-bone hover:text-ink md:px-6 max-md:col-span-2 max-md:border-t max-md:hairline"
        >
          <span className="meta text-bone/50 group-hover:text-ink/60">04 · Resume</span>
          <span className="mt-3 flex items-end justify-between text-sm">
            Download PDF
            <ArrowDownRight className="h-4 w-4" strokeWidth={1.25} />
          </span>
        </a>
      </div>
    </section>
  )
}
