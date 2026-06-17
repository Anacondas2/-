import { Mail, Phone } from 'lucide-react'
import { CONTACT } from '../../data/menu'
import GreekMeander from '../ui/GreekMeander'
import { FacebookIcon, InstagramIcon } from '../ui/SocialIcons'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-aegean-d)] text-[var(--color-cream)]">
      <GreekMeander className="opacity-40" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-3xl text-[var(--color-parchment)]">Café Greco</p>
            <p className="mt-3 font-script italic text-lg text-[var(--color-gold-l)]">
              Φιλοξενία — Gastfreundschaft seit 1987
            </p>
          </div>

          <div>
            <h3 className="font-heading tracking-antique text-xs uppercase text-[var(--color-gold-l)]">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-2 hover:text-[var(--color-gold-l)]">
                  <Phone className="h-4 w-4" /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-[var(--color-gold-l)]">
                  <Mail className="h-4 w-4" /> {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading tracking-antique text-xs uppercase text-[var(--color-gold-l)]">
              Adresse
            </h3>
            <p className="mt-4 text-sm">
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </p>
          </div>

          <div>
            <h3 className="font-heading tracking-antique text-xs uppercase text-[var(--color-gold-l)]">
              Folgen Sie uns
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/40 transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-aegean-d)]"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/40 transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-aegean-d)]"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-gold)]/20 pt-6 text-xs text-[var(--color-cream)]/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Café Greco · Hamburg-Bergedorf</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[var(--color-gold-l)]">Impressum</a>
            <a href="#" className="hover:text-[var(--color-gold-l)]">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
