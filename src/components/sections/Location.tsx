import { Clock, MapPin } from 'lucide-react'
import { CONTACT } from '../../data/menu'
import AnimatedSection from '../ui/AnimatedSection'
import SectionTitle from '../ui/SectionTitle'

export default function Location() {
  const mapQuery = encodeURIComponent(`${CONTACT.street}, ${CONTACT.city}`)

  return (
    <section id="standort" className="bg-[var(--color-parchment)] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle overline="So finden Sie uns" title="Standort & Zeiten" greek="Ποῦ θὰ μᾶς βρεῖτε" />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <AnimatedSection>
            <div className="overflow-hidden rounded-sm border border-[var(--color-gold)]/50 shadow-lg">
              <iframe
                title="Karte zum Café Greco"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-[340px] w-full lg:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="flex flex-col justify-center gap-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-[var(--color-terracotta)]" />
              <div>
                <h3 className="font-heading tracking-antique text-sm uppercase text-[var(--color-sienna)]">
                  Adresse
                </h3>
                <p className="mt-1 text-lg text-[var(--color-ink)]">{CONTACT.street}</p>
                <p className="text-lg text-[var(--color-ink)]">{CONTACT.city}</p>
                <a
                  href={`https://www.google.com/maps?q=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block font-heading tracking-antique text-xs uppercase text-[var(--color-terracotta)] underline"
                >
                  Route planen
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-[var(--color-terracotta)]" />
              <div className="w-full">
                <h3 className="font-heading tracking-antique text-sm uppercase text-[var(--color-sienna)]">
                  Öffnungszeiten
                </h3>
                <dl className="mt-2 space-y-1.5">
                  {CONTACT.hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between gap-4 border-b border-[var(--color-olive)]/20 pb-1.5"
                    >
                      <dt className="text-[var(--color-ink)]/90">{h.day}</dt>
                      <dd className="font-body tabular-nums text-[var(--color-sienna)]">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
