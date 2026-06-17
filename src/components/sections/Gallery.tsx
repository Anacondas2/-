import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { galleryImages } from '../../data/menu'
import SectionTitle from '../ui/SectionTitle'

/**
 * Organic / broken-grid gallery.
 *
 * Few but strong images placed on an explicit 12-column editorial grid with
 * varied spans, deliberate vertical offsets and gentle rotations — an
 * asymmetric collage rather than a tidy matrix. On small screens it reflows to
 * a staggered two-column masonry. Each tile reveals on scroll (opacity + lift),
 * keeping its resting tilt; reduced-motion users get a plain fade with no tilt.
 */

// Per-tile placement: mobile classes + desktop grid-area, plus a resting tilt.
const tiles = [
  { area: 'md:[grid-area:1/1/6/8]', m: 'col-span-2 aspect-[16/10]', rot: -1.5 },
  { area: 'md:[grid-area:1/8/8/13]', m: 'col-span-1 aspect-[3/4]', rot: 1.5 },
  { area: 'md:[grid-area:6/1/12/5]', m: 'col-span-1 aspect-[3/4] mt-6', rot: 1 },
  { area: 'md:[grid-area:6/5/10/8]', m: 'col-span-1 aspect-square', rot: -1 },
  { area: 'md:[grid-area:8/8/13/13]', m: 'col-span-1 aspect-square mt-6', rot: 1.5 },
  { area: 'md:[grid-area:10/5/13/8]', m: 'col-span-2 aspect-[16/9]', rot: -1.5 },
]

export default function Gallery() {
  const prefersReduced = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }
  const item: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.95 },
    show: (rot: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: prefersReduced ? 0 : rot,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section id="galerie" className="relative overflow-hidden bg-[var(--color-sand)] py-24 sm:py-32">
      {/* Soft turmeric glow for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'var(--color-turmeric)' }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle overline="Eindrücke" title="Galerie" greek="Στιγμές" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-12 md:[grid-auto-rows:3.2rem] md:gap-6"
        >
          {galleryImages.map((img, i) => {
            const t = tiles[i % tiles.length]
            return (
              <motion.figure
                key={img.src}
                custom={t.rot}
                variants={item}
                whileHover={prefersReduced ? undefined : { scale: 1.03, rotate: 0, zIndex: 10 }}
                className={`group relative overflow-hidden rounded-sm shadow-xl ring-1 ring-[var(--color-malt)]/15 ${t.m} ${t.area} md:mt-0 md:aspect-auto`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                {/* Caption on hover */}
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--color-malt)]/85 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-script italic text-lg text-[var(--color-parchment)]">
                    {img.alt}
                  </span>
                </figcaption>
                {/* Thin turmeric inner frame on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-sm border border-[var(--color-turmeric)]/0 transition-colors duration-300 group-hover:border-[var(--color-turmeric)]/70"
                />
              </motion.figure>
            )
          })}
        </motion.div>

        <p className="mt-12 text-center font-script italic text-xl text-[var(--color-sienna)]">
          Καλῶς ὁρίσατε — treten Sie ein und genießen Sie.
        </p>
      </div>
    </section>
  )
}
