import { useEffect, useRef, useState } from 'react'
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
 * A sticky 100svh stage is pinned while you scroll; scroll progress glides a
 * vertical carousel of portrait cards (neighbours peek above/below), rolls the
 * big name over, and morphs the backdrop colour per slide.
 *
 * The carousel geometry is measured in pixels from the actual stage height, so
 * it adapts cleanly to any phone or desktop instead of relying on fragile
 * viewport units. Reduced-motion users get a calm static grid.
 */
const SLIDE_BG = ['#2a2312', '#5a3a1e', '#3c4030', '#6b4423', '#332618', '#4a4628']

type Geo = { card: number; spacing: number; center: number }

export default function Gallery() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const geoRef = useRef<Geo>({ card: 0, spacing: 0, center: 0 })
  const count = galleryImages.length
  const [active, setActive] = useState(0)
  const [geo, setGeo] = useState<Geo>({ card: 0, spacing: 0, center: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const bg = useTransform(
    scrollYProgress,
    galleryImages.map((_, i) => i / (count - 1)),
    SLIDE_BG,
  )

  // Column glide, in pixels, read from the live measured geometry.
  const columnY = useTransform(scrollYProgress, (v) => {
    const { center, spacing } = geoRef.current
    return center - v * (count - 1) * spacing
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round(v * (count - 1)))))
  })

  // Measure the stage to derive card height/spacing in px.
  useEffect(() => {
    if (prefersReduced) return
    const measure = () => {
      const h = stageRef.current?.clientHeight ?? 0
      const card = Math.round(h * 0.82)
      const gap = Math.round(h * 0.07)
      const g: Geo = { card, spacing: card + gap, center: h / 2 - card / 2 }
      geoRef.current = g
      setGeo(g)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [prefersReduced])

  // ── Reduced-motion fallback: a quiet grid ──────────────────────
  if (prefersReduced) {
    return (
      <section id="galerie" className="bg-[var(--color-aegean)] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle light overline="Eindrücke" title="Galerie" greek="Στιγμές" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
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
      ref={sectionRef}
      className="relative"
      style={{ height: `${count * 72}vh` }}
    >
      <motion.div
        style={{ backgroundColor: bg }}
        className="sticky top-0 flex h-[100svh] flex-col overflow-hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-6 sm:pt-20">
          <SectionTitle light overline="Eindrücke" title="Galerie" greek="Στιγμές" />
        </div>

        {/* Stage */}
        <div ref={stageRef} className="relative mx-auto w-full max-w-6xl flex-1 px-5 sm:px-6">
          {/* Name + counter — left, vertically centered (image overlaps it) */}
          <div className="absolute left-5 top-1/2 z-0 w-[58%] -translate-y-1/2 sm:left-[6%] sm:w-auto sm:max-w-[44%]">
            <p className="font-heading tracking-antique text-xs text-[var(--color-turmeric)] sm:text-sm">
              {String(active + 1).padStart(2, '0')}
              <span className="opacity-50"> / {String(count).padStart(2, '0')}</span>
            </p>

            <div className="mt-2 h-[1.05em] overflow-hidden text-[clamp(2.75rem,13vw,7rem)] font-display leading-[0.95]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h3
                  key={active}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-110%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="whitespace-nowrap text-[var(--color-parchment)]"
                >
                  {galleryImages[active].name}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="mt-2 h-[1.7em] overflow-hidden text-lg sm:text-xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active}
                  initial={{ y: '120%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-120%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="font-script italic text-[var(--color-cream)]"
                >
                  {galleryImages[active].de}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel — right, vertically centered */}
          <div
            className="absolute right-2 top-0 z-10 h-full overflow-hidden sm:right-[6%]"
            style={{ width: geo.card ? geo.card * 0.75 : '40%' }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-black/25 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-black/25 to-transparent" />

            <motion.div style={{ y: columnY }} className="absolute inset-x-0 top-0">
              {galleryImages.map((img, i) => {
                const dist = Math.abs(i - active)
                return (
                  <div
                    key={img.src}
                    style={{ height: geo.card || undefined, marginBottom: (geo.spacing - geo.card) || undefined }}
                    className={`relative aspect-[3/4] w-full overflow-hidden rounded-md transition-all duration-500 ease-out ${
                      dist === 0
                        ? 'scale-100 opacity-100 shadow-2xl ring-2 ring-[var(--color-turmeric)]/60'
                        : dist === 1
                          ? 'scale-[0.86] opacity-45'
                          : 'scale-[0.72] opacity-20'
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
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-6 pb-8 sm:pb-12">
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
