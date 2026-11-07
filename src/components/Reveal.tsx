import { Fragment, type ElementType, type ReactNode, type RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/** Headline whose lines sit in overflow-hidden masks. Animated by useReveals. */
export function MaskLines({
  lines,
  as: Tag = 'h2',
  className = 'display',
}: {
  lines: ReactNode[]
  as?: ElementType
  className?: string
}) {
  return (
    <Tag className={className} data-mask-group>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {/* A real space between lines, so the heading reads "Senthan Amuthan." to crawlers and screen readers. */}
          {i > 0 && ' '}
          <span className="mask">
            <span>{line}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}

/**
 * Wires every masked headline and [data-reveal] element inside `scope`
 * to a ScrollTrigger entry reveal.
 */
export function useReveals(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-mask-group]').forEach((group) => {
          gsap.from(group.querySelectorAll('.mask > span'), {
            yPercent: 105,
            rotate: 2,
            duration: 1.25,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 88%', once: true },
          })
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 24,
            autoAlpha: 0,
            duration: 1.1,
            ease: 'power4.out',
            delay: Number(el.dataset.reveal) || 0,
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          })
        })
      })
    },
    { scope },
  )
}
