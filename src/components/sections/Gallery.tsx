import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { galleryImages } from '../../data/menu'
import SectionTitle from '../ui/SectionTitle'

export default function Gallery() {
  const prefersReduced = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }
  const item: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="galerie" className="bg-[var(--color-sand)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle overline="Eindrücke" title="Galerie" greek="Στιγμές" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
        >
          {galleryImages.map((img, i) => (
            <motion.figure
              key={img.src}
              variants={item}
              className={`group relative overflow-hidden rounded-sm shadow-md ${
                i % 5 === 0 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--color-aegean-d)]/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-script italic text-lg text-[var(--color-parchment)]">
                  {img.alt}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
