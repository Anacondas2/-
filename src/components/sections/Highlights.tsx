import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { highlights } from '../../data/menu'
import FramedImage from '../ui/FramedImage'
import GreekMeander from '../ui/GreekMeander'
import SectionTitle from '../ui/SectionTitle'

/**
 * Spezialitäten — compact, GSAP-driven.
 * Text sits on the left and reveals once (not scrubbed); the dish photo on the
 * right slides in right→left tied to scroll; the section background gently
 * tints to each dish's colour as it comes into view. Honours reduced-motion.
 */
export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('.spec-row')
        rows.forEach((row) => {
          const photo = row.querySelector('.spec-photo')
          const textEls = row.querySelectorAll('.spec-text > *')
          const accent = row.dataset.accent || 'var(--color-parchment)'

          // Photo glides in right→left, tied to scroll.
          if (photo) {
            gsap.fromTo(
              photo,
              { xPercent: 65, autoAlpha: 0 },
              {
                xPercent: 0,
                autoAlpha: 1,
                ease: 'none',
                scrollTrigger: { trigger: row, start: 'top 85%', end: 'top 42%', scrub: true },
              },
            )
          }

          // Text reveals once (no scrub).
          gsap.from(textEls, {
            autoAlpha: 0,
            x: -28,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 78%', toggleActions: 'play none none none' },
          })

          // Background tints to this dish's colour while it is on screen.
          ScrollTrigger.create({
            trigger: row,
            start: 'top 60%',
            end: 'bottom 55%',
            onEnter: () =>
              gsap.to(bgRef.current, { backgroundColor: accent, duration: 0.6, overwrite: 'auto' }),
            onEnterBack: () =>
              gsap.to(bgRef.current, { backgroundColor: accent, duration: 0.6, overwrite: 'auto' }),
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="spezialitaeten" className="relative overflow-hidden py-20 sm:py-24">
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--color-parchment)]"
      />
      <GreekMeander className="absolute inset-x-0 top-0 opacity-40" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle overline="Empfehlungen des Hauses" title="Spezialitäten" greek="Οἱ ἐκλεκτές μας" />

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          {highlights.map((item, i) => (
            <div
              key={item.name}
              data-accent={item.accent}
              className="spec-row grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              {/* Text — left */}
              <div className="spec-text">
                <p className="font-heading tracking-antique text-xs uppercase text-[var(--color-turmeric-d)]">
                  {String(i + 1).padStart(2, '0')} · {item.tagline}
                </p>
                <p className="mt-3 font-script text-xl italic text-[var(--color-terracotta)]">
                  {item.greek}
                </p>
                <h3 className="mt-1 font-display text-4xl leading-[1.05] text-[var(--color-ink)] sm:text-5xl">
                  {item.name}
                </h3>
                <span aria-hidden="true" className="mt-4 block h-px w-16 bg-[var(--color-gold)]/70" />
                <p className="mt-4 max-w-md leading-relaxed text-[var(--color-ink)]/80">
                  {item.description}
                </p>
              </div>

              {/* Photo — right */}
              <div className="lg:px-2">
                <div className="spec-photo">
                  <FramedImage src={item.img} alt={item.name} className="aspect-[4/3] w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
