import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import { MAX_DEPTH, SCENE_COUNT, ScrollProgressStore } from '../lib/store'
import { sections, profile } from '../lib/data'
import { synth } from '../lib/sound'
import { toggleTheme, useTheme } from '../lib/theme'

const pad = (n: number, len = 2) => String(n).padStart(len, '0')

function SoundToggle() {
  const [on, setOn] = useState(false)
  useEffect(() => synth.subscribe(setOn), [])
  return (
    <button
      type="button"
      onClick={() => synth.toggle()}
      aria-pressed={on}
      className="meta flex items-center gap-2 text-bone/70 transition-colors hover:text-bone"
    >
      <span
        aria-hidden
        className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${on ? 'bg-signal' : 'bg-bone/25'}`}
      />
      [Sound {on ? 'On' : 'Off'}]
    </button>
  )
}

function ThemeToggle() {
  const theme = useTheme()
  return (
    <button
      type="button"
      onClick={() => {
        synth.click()
        toggleTheme()
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="meta flex items-center gap-2 text-bone/70 transition-colors hover:text-bone"
    >
      <span aria-hidden className="relative inline-block h-2.5 w-2.5 overflow-hidden rounded-full border border-bone/60">
        <span className="absolute inset-y-0 left-0 w-1/2 bg-bone" />
      </span>
      <span className="hidden sm:inline">[{theme === 'dark' ? 'Dark' : 'Light'}]</span>
    </button>
  )
}

function Clock() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata',
    })
    const tick = () => {
      if (ref.current) ref.current.textContent = fmt.format(new Date())
    }
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return <span ref={ref}>--:--</span>
}

export function HudChrome() {
  const root = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLSpanElement>(null)
  const sceneRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const lenis = useLenis()

  // Read the store on GSAP's ticker and write straight to the DOM. No React state.
  useGSAP(
    () => {
      let lastSection = -1
      const navItems = gsap.utils.toArray<HTMLElement>('[data-nav]')
      const update = () => {
        const s = ScrollProgressStore.current
        if (depthRef.current) {
          const d = Math.round(s.progress * MAX_DEPTH)
          depthRef.current.textContent = d === 0 ? '0 m' : `−${pad(d, 3)} m`
        }
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${s.progress})`
        if (s.section !== lastSection) {
          lastSection = s.section
          if (sceneRef.current) sceneRef.current.textContent = `${pad(s.section + 1)} / ${pad(SCENE_COUNT)}`
          if (labelRef.current) labelRef.current.textContent = sections[s.section]?.label ?? ''
          navItems.forEach((el, i) => el.toggleAttribute('data-active', i === s.section))
          synth.scene(s.section)
        }
      }
      gsap.ticker.add(update)

      gsap.from('[data-hud]', {
        autoAlpha: 0,
        y: -8,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.05,
        delay: 0.2,
      })
      return () => gsap.ticker.remove(update)
    },
    { scope: root },
  )

  const go = (id: string) => {
    synth.click()
    lenis?.scrollTo(`#${id}`, { duration: 1.6 })
  }

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-50">
      {/* Top bar */}
      <header className="pointer-events-auto absolute inset-x-0 top-0 border-b hairline bg-ink/85">
        <div className="grid h-12 grid-cols-[auto_1fr_auto] items-stretch">
          <button
            data-hud
            type="button"
            onClick={() => go('origin')}
            onMouseEnter={() => synth.hover()}
            className="meta flex items-center gap-2 border-r hairline px-4 text-bone md:px-6"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span className="hidden sm:inline">B.T. Senthan Amuthan</span>
            <span className="sm:hidden">Senthan</span>
          </button>

          <nav aria-label="Sections" className="hidden items-stretch justify-center lg:flex">
            {sections.map((s) => (
              <button
                key={s.id}
                data-hud
                data-nav
                type="button"
                onClick={() => go(s.id)}
                onMouseEnter={() => synth.hover()}
                className="group meta flex items-center gap-2 border-r hairline px-5 text-bone/45 transition-colors first:border-l hover:text-bone data-[active]:text-bone"
              >
                <span className="text-bone/30 group-data-[active]:text-signal">{s.index}</span>
                {s.label}
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-signal opacity-0 transition-opacity group-data-[active]:opacity-100"
                />
              </button>
            ))}
          </nav>
          <div className="lg:hidden" />

          <div data-hud className="flex items-stretch border-l hairline">
            <div className="flex items-center border-r hairline px-4 md:px-5">
              <ThemeToggle />
            </div>
            <div className="flex items-center px-4 md:px-6">
              <SoundToggle />
            </div>
            <button
              type="button"
              onClick={() => go('contact')}
              onMouseEnter={() => synth.hover()}
              className="meta hidden items-center border-l hairline bg-bone px-5 text-ink transition-colors hover:bg-signal sm:flex"
            >
              06 · Contact
            </button>
          </div>
        </div>
      </header>

      {/* Right rail: depth gauge, live section, coordinates */}
      <aside
        data-hud
        aria-hidden
        className="absolute bottom-0 right-0 top-12 hidden w-[72px] flex-col items-center py-6 md:flex"
      >
        <span className="meta text-bone/40">0 m</span>
        <div className="relative my-4 w-px flex-1 bg-bone/10">
          <div ref={fillRef} className="absolute inset-0 origin-top bg-signal" style={{ transform: 'scaleY(0)' }} />
          {Array.from({ length: SCENE_COUNT }).map((_, i) => (
            <span
              key={i}
              className="absolute -left-1 h-px w-2 bg-bone/30"
              style={{ top: `${(i / (SCENE_COUNT - 1)) * 100}%` }}
            />
          ))}
        </div>
        <div className="meta mb-6 flex rotate-180 items-center gap-4 whitespace-nowrap text-bone/40 [writing-mode:vertical-rl]">
          <span>
            <span className="text-signal">●</span> <span ref={labelRef} className="text-bone/70">Origin</span>
          </span>
          <span>{profile.coords}</span>
          <span>
            IST <Clock />
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em]">
          <span ref={depthRef} className="text-bone tabular-nums">
            0 m
          </span>
          <span ref={sceneRef} className="text-bone/40 tabular-nums">
            01 / 06
          </span>
        </div>
      </aside>
    </div>
  )
}
