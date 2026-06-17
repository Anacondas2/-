import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../../data/menu'
import SectionTitle from '../ui/SectionTitle'

/**
 * Gästestimmen — guest quotes for social proof and warmth.
 */
export default function Testimonials() {
  const prefersReduced = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const card: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="bg-[var(--color-parchment)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle overline="Was Gäste sagen" title="Stimmen" greek="Μαρτυρίες" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-7 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.author}
              variants={card}
              className="relative flex flex-col rounded-sm border border-[var(--color-turmeric)]/30 bg-[var(--color-parchment-d)] p-7 shadow-md"
            >
              <Quote className="h-8 w-8 text-[var(--color-turmeric-d)]" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 font-script text-xl italic leading-relaxed text-[var(--color-ink)]">
                „{t.quote}“
              </blockquote>
              <figcaption className="mt-6 border-t border-[var(--color-malt)]/15 pt-4">
                <span className="block font-heading text-base text-[var(--color-sienna)]">
                  {t.author}
                </span>
                <span className="font-heading tracking-antique text-[10px] uppercase text-[var(--color-olive)]">
                  {t.source}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
