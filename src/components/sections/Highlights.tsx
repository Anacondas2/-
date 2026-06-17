import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { highlights } from '../../data/menu'
import SectionTitle from '../ui/SectionTitle'

/**
 * Spezialitäten des Hauses — three signature dishes with imagery.
 * Adds visual weight and a clear reason-to-visit between story and full menu.
 */
export default function Highlights() {
  const prefersReduced = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const card: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="bg-[var(--color-parchment-d)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          overline="Empfehlungen des Hauses"
          title="Spezialitäten"
          greek="Οἱ ἐκλεκτές μας"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {highlights.map((h, i) => (
            <motion.article
              key={h.name}
              variants={card}
              whileHover={prefersReduced ? undefined : { y: -8 }}
              className={`group overflow-hidden rounded-sm bg-[var(--color-parchment)] shadow-lg ring-1 ring-[var(--color-malt)]/10 ${
                i === 1 ? 'md:-mt-8' : i === 2 ? 'md:mt-6' : ''
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={h.img}
                  alt={h.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <span className="absolute right-3 top-3 rounded-full bg-[var(--color-turmeric)] px-3 py-1 font-heading tracking-antique text-[10px] uppercase text-[var(--color-malt)]">
                  Empfehlung
                </span>
              </div>
              <div className="p-6">
                <p className="font-script italic text-lg text-[var(--color-terracotta)]">{h.greek}</p>
                <h3 className="mt-1 font-display text-2xl text-[var(--color-ink)]">{h.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/80">
                  {h.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
