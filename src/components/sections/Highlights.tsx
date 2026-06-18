import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { highlights } from '../../data/menu'
import AnimatedSection from '../ui/AnimatedSection'
import FramedImage from '../ui/FramedImage'
import GreekMeander from '../ui/GreekMeander'
import SectionTitle from '../ui/SectionTitle'

type Highlight = (typeof highlights)[number]

function SpotlightRow({ item, index }: { item: Highlight; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const reversed = index % 2 === 1

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [48, -48])
  const numY = useTransform(scrollYProgress, [0, 1], [24, -24])

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6"
    >
      {/* Image side */}
      <div className={`relative lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
        {/* Ghost number */}
        <motion.span
          aria-hidden="true"
          style={{ y: prefersReduced ? 0 : numY }}
          className={`pointer-events-none absolute -top-10 select-none font-display leading-none text-[clamp(5rem,13vw,11rem)] text-[var(--color-turmeric)] opacity-20 ${
            reversed ? '-right-2 lg:-right-6' : '-left-2 lg:-left-6'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        <AnimatedSection>
          <FramedImage
            src={item.img}
            alt={item.name}
            rotate={reversed ? 1.5 : -1.5}
            parallax={imgY}
            className="relative z-[1] aspect-[4/5] w-full"
          />
        </AnimatedSection>
      </div>

      {/* Text side */}
      <div
        className={`relative z-10 lg:col-span-5 ${
          reversed ? 'lg:order-1 lg:-mr-10 lg:text-right' : 'lg:-ml-10'
        }`}
      >
        <AnimatedSection delay={0.12}>
          <p
            className={`font-heading tracking-antique text-xs uppercase text-[var(--color-turmeric-d)] ${
              reversed ? 'lg:text-right' : ''
            }`}
          >
            {item.tagline}
          </p>
          <p className="mt-2 font-script text-xl italic text-[var(--color-terracotta)]">
            {item.greek}
          </p>
          <h3 className="mt-1 font-display text-5xl leading-[0.95] text-[var(--color-ink)] sm:text-6xl">
            {item.name}
          </h3>

          <span
            className={`mt-5 block h-px w-20 bg-[var(--color-gold)]/70 ${reversed ? 'lg:ml-auto' : ''}`}
            aria-hidden="true"
          />

          <p className="mt-5 max-w-md text-[var(--color-ink)]/80 lg:inline-block">
            {item.description}
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default function Highlights() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-parchment)] py-24 sm:py-32">
      <GreekMeander className="absolute inset-x-0 top-0 opacity-40" color="var(--color-gold)" />

      {/* Watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display leading-none text-[28vw] text-[var(--color-sienna)] opacity-[0.04]"
      >
        ΓΕΥΣΗ
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <SectionTitle
            overline="Empfehlungen des Hauses"
            title="Spezialitäten"
            greek="Οἱ ἐκλεκτές μας"
          />
        </AnimatedSection>

        <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
          {highlights.map((item, i) => (
            <SpotlightRow key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
