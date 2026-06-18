import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import Column from '../ui/Column'
import GreekMeander from '../ui/GreekMeander'
import SectionTitle from '../ui/SectionTitle'

const stats = [
  { n: '1987', l: 'Gegründet' },
  { n: '36+', l: 'Jahre Tradition' },
  { n: '40', l: 'Gerichte' },
  { n: '★★★★★', l: 'Gäste-Liebe' },
]

/**
 * Unsere Geschichte — compact, image-free, dark cinematic.
 * GSAP reveals the text once on enter (not scrubbed); decorative layers drift
 * subtly with scroll. Honours reduced-motion (content simply stays visible).
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about-reveal', {
          autoAlpha: 0,
          y: 26,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        })
        gsap.to('.about-ghost', {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="ueber-uns"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-malt)] py-20 sm:py-24"
    >
      <GreekMeander className="absolute inset-x-0 top-0 opacity-40" />
      <GreekMeander className="absolute inset-x-0 bottom-0 rotate-180 opacity-40" />

      {/* Decorative depth (right) */}
      <span
        aria-hidden="true"
        className="about-ghost pointer-events-none absolute -right-4 top-10 select-none font-display leading-none text-[clamp(7rem,18vw,16rem)] text-[var(--color-cream)] opacity-[0.06]"
      >
        1987
      </span>
      <div
        aria-hidden="true"
        className="about-ghost pointer-events-none absolute -right-8 bottom-0 hidden text-[var(--color-malt-l)] opacity-40 lg:block"
      >
        <Column className="h-[380px] w-14" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="about-reveal">
          <SectionTitle
            light
            align="left"
            overline="Kalós Orísate — Willkommen"
            title="Unsere Geschichte"
            greek="Ἡ ἱστορία μας"
          />
        </div>

        <p className="about-reveal mt-10 text-[var(--color-cream)]/90">
          <span className="float-left pr-3 pt-1 font-display text-6xl leading-[0.7] text-[var(--color-turmeric)]">
            S
          </span>
          eit über drei Jahrzehnten bringt das{' '}
          <strong className="text-[var(--color-parchment)]">Café Greco</strong> die Wärme des
          Mittelmeers nach Hamburg-Bergedorf. Was als kleine Taverne begann, ist heute ein Ort, an
          dem Familie, Freunde und Nachbarn an einem langen Tisch zusammenkommen — wie beim antiken
          Symposion.
        </p>

        <blockquote className="about-reveal my-8 border-l-2 border-[var(--color-gold)] pl-5 font-script text-2xl italic leading-snug text-[var(--color-turmeric-l)] sm:text-3xl">
          „Gastfreundschaft ist eine heilige Pflicht.“
        </blockquote>

        <p className="about-reveal text-[var(--color-cream)]/90">
          Wir kochen nach Rezepten, die über Generationen weitergegeben wurden: mit nativem Olivenöl,
          Kräutern aus den Bergen und Fisch aus dem Mittelmeer. Jeder Teller erzählt eine Geschichte
          von Sonne, Salz und gemeinsamer Tafel.
        </p>

        {/* Stat strip */}
        <div className="about-reveal mt-12 grid grid-cols-2 gap-y-6 border-y border-[var(--color-gold)]/30 py-7 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`text-center ${i > 0 ? 'sm:border-l sm:border-[var(--color-gold)]/20' : ''}`}
            >
              <p className="font-display text-3xl text-[var(--color-turmeric)] sm:text-4xl">{s.n}</p>
              <p className="mt-1.5 font-heading tracking-antique text-[10px] uppercase text-[var(--color-cream)]/70">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
