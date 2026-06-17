import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { galleryImages } from '../../data/menu'
import SectionTitle from '../ui/SectionTitle'

/**
 * Galerie — scroll-driven vertical slider.
 *
 * The section is tall; a sticky 100svh stage is pinned while you scroll. Scroll
 * progress glides a vertical carousel of portrait cards (neighbours peek above
 * and below), swaps the big name with a rolling transition, and morphs the
 * background colour to match each slide. Inspired by the reference clip.
 *
 * Reduced-motion users get a calm static grid instead of the pinned slider.
 */

// Warm backdrop colour per slide (harmonises with the turmeric/malt palette).
const SLIDE_BG = ['#2a2312', '#5a3a1e', '#3c4030', '#6b4423', '#332618', '#4a4628']

// Carousel geometry, in svh units.
const STAGE = 64
const CARD = 40
const GAP = 4
const SPACING = CARD + GAP
const CENTER = STAGE / 2 - CARD / 2

export default function Gallery() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const count = galleryImages.length
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Background colour morph across the slides.
  const bg = useTransform(
    scrollYProgress,
    galleryImages.map((_, i) => i / (count - 1)),
    SLIDE_BG,
  )

  // Continuous glide of the card column, tied directly to scroll.
  const columnY = useTransform(
    scrollYProgress,
    (v) => `${CENTER - v * (count - 1) * SPACING}svh`,
  )

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(count - 1, Math.max(0, Math.round(v * (count - 1))))
    setActive(idx)
  })

  // ── Reduced-motion fallback: a quiet grid ──────────────────────
  if (prefersReduced) {
    return (
      <section id="galerie" className="bg-[var(--color-aegean)] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle light overline="Eindrücke" title="Galerie" greek="Στιγμές" />
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryImages.map((img) => (
              <figure key={img.src} className="overflow-hidden rounded-sm shadow-lg">
                <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                <figcaption className="bg-[var(--color-malt-d)] px-3 py-2 font-heading text-sm text-[var(--color-parchment)]">
                  {img.name} <span className="text-[var(--color-cream)]/60">· {img.de}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── Scroll-driven slider ───────────────────────────────────────
  return (
    <section
      id="galerie"
      ref={ref}
      className="relative"
      style={{ height: `${count * 80}vh` }}
    >
      <motion.div
        style={{ backgroundColor: bg }}
        className="sticky top-0 flex h-[100svh] flex-col overflow-hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-6 pt-20 sm:pt-24">
          <SectionTitle light overline="Eindrücke" title="Galerie" greek="Στιγμές" />
        </div>

        {/* Stage */}
        <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-6 px-6 md:grid-cols-2">
          {/* Left — counter + rolling name */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="font-heading tracking-antique text-sm text-[var(--color-turmeric)]">
              {String(active + 1).padStart(2, '0')}
              <span className="opacity-50"> / {String(count).padStart(2, '0')}</span>
            </p>

            <div className="mt-3 h-[4.5rem] overflow-hidden sm:h-[5.5rem] md:h-[7rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h3
                  key={active}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-110%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-6xl leading-none text-[var(--color-parchment)] sm:text-7xl md:text-8xl"
                >
                  {galleryImages[active].name}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="mt-3 h-8 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active}
                  initial={{ y: '120%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="font-script text-xl italic text-[var(--color-cream)]"
                >
                  {galleryImages[active].de}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="mt-8 hidden max-w-xs text-sm text-[var(--color-cream)]/55 md:block">
              Scrollen Sie, um durch unsere Eindrücke zu blättern.
            </p>
          </div>

          {/* Right — vertical carousel */}
          <div className="relative order-1 h-[64svh] overflow-hidden md:order-2">
            {/* soft fades top/bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black/30 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-black/30 to-transparent" />

            <motion.div
              style={{ y: columnY }}
              className="absolute left-1/2 top-0 -translate-x-1/2"
            >
              {galleryImages.map((img, i) => {
                const dist = Math.abs(i - active)
                return (
                  <div
                    key={img.src}
                    style={{ height: `${CARD}svh`, marginBottom: `${GAP}svh` }}
                    className={`relative aspect-[3/4] overflow-hidden rounded-md transition-all duration-500 ease-out ${
                      dist === 0
                        ? 'scale-100 opacity-100 shadow-2xl ring-2 ring-[var(--color-turmeric)]/60'
                        : dist === 1
                          ? 'scale-[0.84] opacity-45'
                          : 'scale-[0.7] opacity-20'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-6 pb-10 sm:pb-12">
          {galleryImages.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-[var(--color-turmeric)]' : 'w-2 bg-[var(--color-cream)]/30'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
