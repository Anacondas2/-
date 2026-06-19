import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { Menu as MenuIcon, Phone, X } from 'lucide-react'
import { CONTACT } from '../../data/menu'

const links = [
  { href: '#start', label: 'Start' },
  { href: '#ueber-uns', label: 'Über uns' },
  { href: '#speisekarte', label: 'Speisekarte' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#standort', label: 'Standort' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close the menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Stagger the menu items in.
  const listV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: prefersReduced ? 0 : 0.05, delayChildren: 0.06 } },
    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  }
  const itemV: Variants = prefersReduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, x: -14 },
        show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
      }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'bg-[var(--color-aegean-d)]/95 shadow-lg backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a
          href="#start"
          className="font-display text-2xl text-[var(--color-parchment)]"
          onClick={() => setOpen(false)}
        >
          Café Greco
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-heading tracking-antique text-xs uppercase text-[var(--color-cream)] transition-colors hover:text-[var(--color-gold-l)]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="flex items-center gap-2 rounded-sm bg-[var(--color-gold)] px-4 py-2 font-heading tracking-antique text-xs uppercase text-[var(--color-aegean-d)] transition-transform hover:scale-105"
            >
              <Phone className="h-3.5 w-3.5" />
              Anrufen
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center text-[var(--color-parchment)] md:hidden"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={open ? 'close' : 'open'}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute"
            >
              {open ? <X className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile drawer + scrim */}
      <AnimatePresence>
        {open && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 top-[var(--nav-h,64px)] z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
            />

            {/* Panel ("card") */}
            <motion.div
              key="panel"
              id="mobile-menu"
              initial={
                prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12, scaleY: 0.97 }
              }
              animate={
                prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, scaleY: 1 }
              }
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scaleY: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top' }}
              className="relative z-40 origin-top border-t border-[var(--color-gold)]/30 bg-[var(--color-aegean-d)]/98 shadow-xl md:hidden"
            >
              <motion.ul
                variants={listV}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-1 px-5 pb-6 pt-2"
              >
                {links.map((l) => (
                  <motion.li key={l.href} variants={itemV}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-heading tracking-antique text-sm uppercase text-[var(--color-cream)] transition-colors hover:text-[var(--color-gold-l)]"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li variants={itemV}>
                  <a
                    href={`tel:${CONTACT.phoneHref}`}
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-[var(--color-gold)] px-4 py-3 font-heading tracking-antique text-sm uppercase text-[var(--color-aegean-d)] transition-transform active:scale-95"
                  >
                    <Phone className="h-4 w-4" />
                    {CONTACT.phone}
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
