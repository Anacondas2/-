import { useState, type FormEvent } from 'react'
import { Check, Phone } from 'lucide-react'
import { CONTACT } from '../../data/menu'
import AnimatedSection from '../ui/AnimatedSection'
import SectionTitle from '../ui/SectionTitle'

const fieldClass =
  'w-full rounded-sm border border-[var(--color-olive)]/40 bg-[var(--color-parchment)] px-4 py-3 font-body text-base text-[var(--color-ink)] placeholder:text-[var(--color-olive)]/60 focus:border-[var(--color-gold)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-gold)]/50'

const labelClass =
  'mb-1.5 block font-heading tracking-antique text-[11px] uppercase text-[var(--color-sienna)]'

export default function Reservation() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    // Kein Backend — vorerst nur Bestätigung. Später an E-Mail/API anbinden.
    console.log('Reservierungsanfrage:', data)
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <section id="reservierung" className="relative bg-[var(--color-aegean-d)] py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle
          light
          overline="Reservierung"
          title="Tisch reservieren"
          greek="Κράτηση τραπεζιού"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <AnimatedSection className="rounded-sm bg-[var(--color-parchment)] p-7 shadow-xl sm:p-9">
            {sent ? (
              <div
                className="flex flex-col items-center justify-center py-12 text-center"
                role="status"
                aria-live="polite"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gold)]">
                  <Check className="h-8 w-8 text-[var(--color-aegean-d)]" />
                </span>
                <h3 className="mt-5 font-display text-3xl text-[var(--color-aegean)]">
                  Efcharistó!
                </h3>
                <p className="mt-2 max-w-sm text-[var(--color-ink)]/80">
                  Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze zur
                  Bestätigung. Bei dringenden Wünschen rufen Sie uns gerne an.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 font-heading tracking-antique text-xs uppercase text-[var(--color-terracotta)] underline"
                >
                  Weitere Reservierung
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="firstname">Vorname</label>
                    <input id="firstname" name="firstname" required autoComplete="given-name" className={fieldClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="lastname">Nachname</label>
                    <input id="lastname" name="lastname" required autoComplete="family-name" className={fieldClass} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className={labelClass} htmlFor="date">Datum</label>
                    <input id="date" name="date" type="date" required className={fieldClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="time">Uhrzeit</label>
                    <input id="time" name="time" type="time" required className={fieldClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="guests">Personen</label>
                    <select id="guests" name="guests" required defaultValue="2" className={fieldClass}>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                      <option value="13+">13+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="phone">Telefonnummer</label>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
                </div>

                <div>
                  <label className={labelClass} htmlFor="notes">Anmerkungen <span className="lowercase opacity-60">(optional)</span></label>
                  <textarea id="notes" name="notes" rows={3} className={fieldClass} placeholder="Hochstuhl, Allergien, besonderer Anlass …" />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-sm bg-[var(--color-gold)] px-6 py-4 font-heading tracking-antique text-sm uppercase text-[var(--color-aegean-d)] transition-transform duration-200 active:scale-[0.98] sm:hover:scale-[1.02] sm:hover:bg-[var(--color-gold-l)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
                >
                  Anfrage senden
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* Call panel */}
          <AnimatedSection delay={0.15} className="flex flex-col justify-center">
            <p className="font-script italic text-2xl text-[var(--color-gold-l)]">
              Lieber persönlich?
            </p>
            <h3 className="mt-2 font-display text-4xl text-[var(--color-parchment)]">
              Rufen Sie uns an
            </h3>
            <p className="mt-4 text-[var(--color-cream)]/80">
              Unser Team reserviert Ihren Tisch gerne direkt am Telefon — auch für
              größere Gesellschaften und besondere Anlässe.
            </p>

            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-sm border-2 border-[var(--color-gold)] px-6 py-4 font-heading tracking-antique text-base text-[var(--color-gold-l)] transition-colors duration-200 hover:bg-[var(--color-gold)] hover:text-[var(--color-aegean-d)]"
            >
              <Phone className="h-5 w-5" />
              {CONTACT.phone}
            </a>

            <p className="mt-6 font-heading tracking-antique text-[11px] uppercase text-[var(--color-cream)]/60">
              Geöffnet Di – So · Montag Ruhetag
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
