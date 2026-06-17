import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'bg-[var(--color-aegean-d)]/95 shadow-lg backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
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
          className="text-[var(--color-parchment)] md:hidden"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-[var(--color-gold)]/30 bg-[var(--color-aegean-d)]/98 px-5 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-heading tracking-antique text-sm uppercase text-[var(--color-cream)]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-[var(--color-gold)] px-4 py-3 font-heading tracking-antique text-sm uppercase text-[var(--color-aegean-d)]"
            >
              <Phone className="h-4 w-4" />
              {CONTACT.phone}
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
