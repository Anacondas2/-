import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const links = [
  { href: '#home', label: 'Home', active: true },
  { href: '#about', label: 'About', active: false },
  { href: '#drops', label: 'Drops', active: false },
  { href: '#fresh', label: 'Fresh In', active: false, badge: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-[#001621]/95 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <a
          href="#home"
          className="font-display text-3xl tracking-wider text-white"
          onClick={() => setOpen(false)}
        >
          STRK.
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                className={`font-body text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  l.active ? 'text-[#ff4103]' : 'text-[#c4c4c4] hover:text-white'
                }`}
              >
                {l.label}
                {l.badge && (
                  <span className="absolute -top-3 -right-5 rounded-full bg-[#ff4103] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-white">
                    New
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Cart + User icons */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            aria-label="Cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[#ff4103] hover:text-[#ff4103]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Account"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[#ff4103] hover:text-[#ff4103]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={open ? 'close' : 'open'}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: -90 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, rotate: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
              className="absolute"
            >
              {open ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#001621]/98 md:hidden"
          >
            <ul className="flex flex-col gap-0 px-6 pb-8 pt-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="border-b border-white/8"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-4 font-display text-2xl tracking-wide transition-colors ${
                      l.active ? 'text-[#ff4103]' : 'text-white'
                    }`}
                  >
                    {l.label}
                    {l.badge && (
                      <span className="rounded-full bg-[#ff4103] px-2 py-0.5 text-[10px] font-body font-semibold uppercase text-white">
                        New
                      </span>
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
