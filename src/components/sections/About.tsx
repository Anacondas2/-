import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'
import Column from '../ui/Column'
import FramedImage from '../ui/FramedImage'
import GreekMeander from '../ui/GreekMeander'
import SectionTitle from '../ui/SectionTitle'

const stats = [
  { n: '1987', l: 'Gegründet' },
  { n: '36+', l: 'Jahre Tradition' },
  { n: '40', l: 'Gerichte' },
  { n: '★★★★★', l: 'Gäste-Liebe' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Layered parallax for cinematic depth.
  const primaryY = useTransform(scrollYProgress, [0, 1], [70, -70])
  const secondaryY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const ghostY = useTransform(scrollYProgress, [0, 1], [50, -90])
  const columnY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      id="ueber-uns"
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-malt)] py-24 sm:py-32"
    >
      <GreekMeander className="absolute inset-x-0 top-0 opacity-40" />
      <GreekMeander className="absolute inset-x-0 bottom-0 rotate-180 opacity-40" />

      {/* Warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl"
        style={{ background: 'var(--color-turmeric)' }}
      />

      {/* Ghost numeral */}
      <motion.span
        aria-hidden="true"
        style={{ y: prefersReduced ? 0 : ghostY }}
        className="pointer-events-none absolute -right-2 top-24 select-none font-display leading-none text-[clamp(8rem,22vw,20rem)] text-[var(--color-cream)] opacity-[0.06]"
      >
        1987
      </motion.span>

      {/* Faint column */}
      <motion.div
        aria-hidden="true"
        style={{ y: prefersReduced ? 0 : columnY }}
        className="pointer-events-none absolute -left-6 top-16 hidden text-[var(--color-malt-l)] opacity-50 lg:block"
      >
        <Column className="h-[460px] w-16" />
      </motion.div>

      {/* Vertical edge label */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 font-heading tracking-antique text-[10px] uppercase text-[var(--color-cream)]/40 [writing-mode:vertical-rl] lg:block"
      >
        Est. 1987 · Hamburg-Bergedorf
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <SectionTitle
            light
            align="left"
            overline="Kalós Orísate — Willkommen"
            title="Unsere Geschichte"
            greek="Ἡ ἱστορία μας"
          />
        </AnimatedSection>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Layered imagery */}
          <AnimatedSection className="relative lg:col-span-6">
            <FramedImage
              src="hero-mobile.webp"
              alt="Neo-antike Bankettszene — das Symposion im Café Greco"
              rotate={-2}
              parallax={primaryY}
              className="mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
            />
            <FramedImage
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80"
              alt="Stimmungsvolles Interieur des Café Greco"
              rotate={3}
              parallax={secondaryY}
              className="absolute -bottom-10 -right-2 hidden aspect-square w-2/5 max-w-[220px] sm:block"
            />
          </AnimatedSection>

          {/* Editorial text */}
          <div className="lg:col-span-6">
            <AnimatedSection>
              <p className="text-[var(--color-cream)]/90">
                <span className="float-left pr-3 pt-1 font-display text-7xl leading-[0.7] text-[var(--color-turmeric)]">
                  S
                </span>
                eit über drei Jahrzehnten bringt das <strong className="text-[var(--color-parchment)]">Café Greco</strong> die
                Wärme des Mittelmeers nach Hamburg-Bergedorf. Was als kleine Taverne begann, ist heute
                ein Ort, an dem Familie, Freunde und Nachbarn an einem langen Tisch zusammenkommen —
                ganz wie beim antiken Symposion.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <blockquote className="my-8 border-l-2 border-[var(--color-gold)] pl-5 font-script text-2xl italic leading-snug text-[var(--color-turmeric-l)] sm:text-3xl">
                „Gastfreundschaft ist eine heilige Pflicht.“
              </blockquote>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-[var(--color-cream)]/90">
                Wir kochen nach Rezepten, die über Generationen weitergegeben wurden: mit nativem
                Olivenöl, Kräutern aus den Bergen und Fisch aus dem Mittelmeer. Jeder Teller erzählt
                eine Geschichte von Sonne, Salz und gemeinsamer Tafel.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Stat strip */}
        <AnimatedSection delay={0.1}>
          <div className="mt-20 grid grid-cols-2 gap-y-8 border-y border-[var(--color-gold)]/30 py-10 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`text-center ${i > 0 ? 'sm:border-l sm:border-[var(--color-gold)]/20' : ''}`}
              >
                <p className="font-display text-4xl text-[var(--color-turmeric)] sm:text-5xl">{s.n}</p>
                <p className="mt-2 font-heading tracking-antique text-[10px] uppercase text-[var(--color-cream)]/70 sm:text-xs">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
