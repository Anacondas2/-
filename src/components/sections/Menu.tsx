import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { menu } from '../../data/menu'
import GreekMeander from '../ui/GreekMeander'
import SectionTitle from '../ui/SectionTitle'

export default function Menu() {
  const [active, setActive] = useState(menu[0].id)
  const prefersReduced = useReducedMotion()
  const category = menu.find((c) => c.id === active) ?? menu[0]

  return (
    <section id="speisekarte" className="relative bg-[var(--color-aegean)] py-24 sm:py-32">
      <GreekMeander className="absolute inset-x-0 top-0 opacity-50" />

      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle light overline="Καλὴ ὄρεξη — Guten Appetit" title="Speisekarte" greek="Ὁ κατάλογος" />

        {/* Category tabs */}
        <div
          className="antique-scroll mt-12 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center"
          role="tablist"
          aria-label="Speisekategorien"
        >
          {menu.map((c) => {
            const isActive = c.id === active
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(c.id)}
                className={`shrink-0 rounded-sm border px-5 py-2.5 font-heading tracking-antique text-xs uppercase transition-colors duration-200 ${
                  isActive
                    ? 'border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-aegean-d)]'
                    : 'border-[var(--color-cream)]/30 text-[var(--color-cream)] hover:border-[var(--color-gold-l)] hover:text-[var(--color-gold-l)]'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        {/* Dish list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-12"
          >
            <p className="mb-8 text-center font-script italic text-2xl text-[var(--color-gold-l)]">
              {category.greek}
            </p>

            <ul className="grid gap-x-12 gap-y-7 md:grid-cols-2">
              {category.dishes.map((dish) => (
                <li key={dish.name} className="group">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-heading text-lg text-[var(--color-parchment)]">
                      {dish.name}
                    </h3>
                    <span
                      className="mx-1 flex-1 border-b border-dotted border-[var(--color-cream)]/30"
                      aria-hidden="true"
                    />
                    <span className="font-body tabular-nums text-[var(--color-gold-l)]">
                      {dish.price} €
                    </span>
                  </div>
                  <p className="mt-1 max-w-prose text-sm leading-relaxed text-[var(--color-cream)]/80">
                    {dish.description}
                  </p>
                  {dish.tags && (
                    <div className="mt-2 flex gap-2">
                      {dish.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--color-olive)]/60 px-2 py-0.5 font-heading tracking-antique text-[9px] uppercase text-[var(--color-cream)]/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <p className="mt-14 text-center text-xs text-[var(--color-cream)]/60">
          Alle Preise in Euro inkl. MwSt. · Bei Allergien beraten wir Sie gerne persönlich.
        </p>
      </div>

      <GreekMeander className="absolute inset-x-0 bottom-0 rotate-180 opacity-50" />
    </section>
  )
}
