import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap, useGSAP } from '../../lib/gsap'
import { highlights } from '../../data/menu'
import FramedImage from '../ui/FramedImage'
import GreekMeander from '../ui/GreekMeander'
import SectionTitle from '../ui/SectionTitle'

/**
 * Spezialitäten — «Die Bühne».
 *
 * A compact, theatrical 3D stage: the three signature dishes sit in a CSS-3D
 * coverflow on a dark stage. The active dish is centred in a warm spotlight, the
 * neighbours angle back into depth. It auto-advances and can be driven by arrows,
 * dots, side-card clicks, swipe and (desktop) a subtle pointer-tilt parallax. The
 * spotlight tints to each dish's colour and the story crossfades. Built on GSAP.
 *
 * Reduced-motion: a calm static stack instead of the 3D auto-play.
 */
const N = highlights.length
const wrapIndex = gsap.utils.wrap(0, N)

function slotVars(offset: number) {
  if (offset === 0) {
    return { xPercent: 0, z: 0, rotationY: 0, scale: 1, opacity: 1, filter: 'blur(0px)', zIndex: 3 }
  }
  const side = offset > 0 ? 1 : -1
  return {
    xPercent: side * 56,
    z: -230,
    rotationY: -side * 34,
    scale: 0.82,
    opacity: 0.4,
    filter: 'blur(1.5px)',
    zIndex: 1,
  }
}

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const firstRun = useRef(true)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])

  const next = () => setActive((a) => wrapIndex(a + 1))
  const prev = () => setActive((a) => wrapIndex(a - 1))

  // Entrance reveal + pointer-tilt parallax (mount).
  useGSAP(
    () => {
      if (reduced) return
      // Place cards at their initial slots instantly.
      cardRefs.current.forEach((card, i) => {
        if (card) gsap.set(card, slotVars(gsap.utils.wrap(-1, N - 1, i)))
      })
      gsap.from('.stage-reveal', {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { dependencies: [reduced], scope: sectionRef },
  )

  // Desktop pointer-tilt on the deck.
  useEffect(() => {
    if (reduced) return
    const stage = sectionRef.current?.querySelector('.stage-zone') as HTMLElement | null
    const deck = deckRef.current
    if (!stage || !deck || window.matchMedia('(hover: none)').matches) return
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      gsap.to(deck, { rotationY: x * 10, rotationX: -y * 6, duration: 0.5, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(deck, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' })
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  // Animate to the active dish (cards, spotlight, story).
  useEffect(() => {
    if (reduced) return
    const dur = firstRun.current ? 0 : 0.9
    cardRefs.current.forEach((card, i) => {
      if (card) gsap.to(card, { ...slotVars(gsap.utils.wrap(-1, N - 1, i - active)), duration: dur, ease: 'power3.inOut' })
    })
    if (glowRef.current) {
      gsap.to(glowRef.current, { backgroundColor: highlights[active].glow, duration: 0.7, ease: 'power2.out' })
    }
    if (!firstRun.current && storyRef.current) {
      gsap.fromTo(
        storyRef.current.querySelectorAll('.story-el'),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
      )
    }
    firstRun.current = false
  }, [active, reduced])

  // Auto-advance (pauses on hover/focus/hidden tab; off under reduced-motion).
  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((a) => wrapIndex(a + 1))
    }, 4500)
    return () => window.clearInterval(id)
  }, [reduced, paused])

  // Swipe (touch).
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: TouchEvent) => (touchX.current = e.touches[0].clientX)
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
    touchX.current = null
  }

  const dish = highlights[active]

  // ── Reduced-motion fallback: calm static stack ─────────────────
  if (reduced) {
    return (
      <section id="spezialitaeten" className="bg-[var(--color-malt-d)] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <SectionTitle light overline="Empfehlungen des Hauses" title="Spezialitäten" greek="Οἱ ἐκλεκτές μας" />
          <div className="mt-12 space-y-8">
            {highlights.map((d) => (
              <article key={d.name} className="grid gap-5 sm:grid-cols-[200px_1fr] sm:items-center">
                <FramedImage src={d.img} alt={d.name} className="aspect-[4/3] w-full" />
                <div>
                  <p className="font-script text-lg italic text-[var(--color-terracotta)]">{d.greek}</p>
                  <h3 className="font-display text-3xl text-[var(--color-parchment)]">{d.name}</h3>
                  <p className="mt-2 font-script text-base italic text-[var(--color-cream)]/80">{d.story}</p>
                  <p className="mt-2 text-sm text-[var(--color-cream)]/80">{d.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── 3D stage ───────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="spezialitaeten"
      aria-roledescription="carousel"
      aria-label="Spezialitäten des Hauses"
      className="relative overflow-hidden bg-[var(--color-malt-d)] py-16 sm:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <GreekMeander className="absolute inset-x-0 top-0 opacity-30" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="stage-reveal">
          <SectionTitle light overline="Empfehlungen des Hauses" title="Spezialitäten" greek="Οἱ ἐκλεκτές μας" />
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Story panel — left */}
          <div ref={storyRef} className="stage-reveal order-2 text-center lg:order-1 lg:text-left">
            <p className="story-el font-heading tracking-antique text-xs text-[var(--color-turmeric)]">
              {String(active + 1).padStart(2, '0')}
              <span className="opacity-50"> / {String(N).padStart(2, '0')}</span>
              <span className="ml-3 text-[var(--color-cream)]/60">{dish.tagline}</span>
            </p>
            <p className="story-el mt-3 font-script text-xl italic text-[var(--color-terracotta)]">{dish.greek}</p>
            <h3 className="story-el mt-1 font-display text-4xl leading-[1.05] text-[var(--color-parchment)] sm:text-5xl">
              {dish.name}
            </h3>
            <p className="story-el mx-auto mt-4 max-w-sm font-script text-lg italic leading-snug text-[var(--color-turmeric-l)] lg:mx-0">
              {dish.story}
            </p>
            <p className="story-el mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-cream)]/75 lg:mx-0">
              {dish.description}
            </p>

            {/* Controls */}
            <div className="mt-7 flex items-center justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={prev}
                aria-label="Vorheriges Gericht"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-malt)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2" role="tablist" aria-label="Gericht auswählen">
                {highlights.map((d, i) => (
                  <button
                    key={d.name}
                    type="button"
                    role="tab"
                    aria-label={`Gericht ${i + 1}: ${d.name}`}
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-[var(--color-turmeric)]' : 'w-2 bg-[var(--color-cream)]/30 hover:bg-[var(--color-cream)]/60'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                aria-label="Nächstes Gericht"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-parchment)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-malt)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 3D stage — right */}
          <div
            className="stage-zone stage-reveal relative order-1 h-[360px] select-none sm:h-[440px] lg:order-2"
            style={{ perspective: '1400px' }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Spotlight */}
            <div
              ref={glowRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
              style={{ backgroundColor: highlights[0].glow }}
            />
            {/* Deck */}
            <div
              ref={deckRef}
              className="relative h-full w-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {highlights.map((d, i) => (
                <button
                  key={d.name}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  type="button"
                  aria-label={`${d.name} anzeigen`}
                  onClick={() => setActive(i)}
                  className="absolute inset-0 m-auto h-[300px] w-[225px] cursor-pointer rounded-sm sm:h-[360px] sm:w-[270px]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <FramedImage src={d.img} alt={d.name} className="h-full w-full" eager={i === 0} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
