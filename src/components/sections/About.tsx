import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AnimatedSection from '../ui/AnimatedSection'
import Column from '../ui/Column'
import SectionTitle from '../ui/SectionTitle'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Subtle parallax drift for the decorative columns.
  const colY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      id="ueber-uns"
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-parchment)] py-24 sm:py-32"
    >
      {/* Decorative columns */}
      <motion.div
        style={{ y: prefersReduced ? 0 : colY }}
        className="pointer-events-none absolute -left-4 top-10 hidden text-[var(--color-sand)] opacity-40 lg:block"
        aria-hidden="true"
      >
        <Column className="h-[420px] w-16" />
      </motion.div>
      <motion.div
        style={{ y: prefersReduced ? 0 : colY }}
        className="pointer-events-none absolute -right-4 top-10 hidden text-[var(--color-sand)] opacity-40 lg:block"
        aria-hidden="true"
      >
        <Column className="h-[420px] w-16" />
      </motion.div>

      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle overline="Kalós Orísate — Willkommen" title="Unsere Geschichte" greek="Ἡ ἱστορία μας" />

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          <AnimatedSection>
            <p className="font-script italic text-2xl text-[var(--color-terracotta)]">
              „Gastfreundschaft ist eine heilige Pflicht.“
            </p>
            <p className="mt-6 text-[var(--color-ink)]/90">
              Seit über drei Jahrzehnten bringt das <strong>Café Greco</strong> die
              Wärme des Mittelmeers nach Hamburg-Bergedorf. Was als kleine Taverne
              begann, ist heute ein Ort, an dem Familie, Freunde und Nachbarn an einem
              langen Tisch zusammenkommen — ganz wie beim antiken Symposion.
            </p>
            <p className="mt-4 text-[var(--color-ink)]/90">
              Wir kochen nach Rezepten, die über Generationen weitergegeben wurden:
              mit nativem Olivenöl, Kräutern aus den Bergen und Fisch aus dem
              Mittelmeer. Jeder Teller erzählt eine Geschichte von Sonne, Salz und
              gemeinsamer Tafel.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-sm border border-[var(--color-gold)]/60" aria-hidden="true" />
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
                alt="Stimmungsvolles Interieur des Café Greco"
                loading="lazy"
                className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-xl"
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Stat strip */}
        <div className="mt-20 grid grid-cols-2 gap-8 border-y border-[var(--color-gold)]/40 py-10 text-center sm:grid-cols-4">
          {[
            { n: '1987', l: 'Gegründet' },
            { n: '36+', l: 'Jahre Tradition' },
            { n: '40', l: 'Gerichte' },
            { n: '★★★★★', l: 'Gäste-Liebe' },
          ].map((s, i) => (
            <AnimatedSection key={s.l} delay={i * 0.08}>
              <p className="font-display text-3xl text-[var(--color-terracotta)] sm:text-4xl">{s.n}</p>
              <p className="mt-1 font-heading tracking-antique text-[10px] uppercase text-[var(--color-olive)] sm:text-xs">
                {s.l}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
