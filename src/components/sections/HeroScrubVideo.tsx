import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Hero section with scroll-scrubbing video.
 *
 * The section is tall (≈ 320vh). A sticky 100vh stage holds the video, whose
 * currentTime is driven by how far the user has scrolled through the section.
 * A requestAnimationFrame loop lerps toward the target time for buttery seeking.
 *
 * Reduced-motion: the video simply autoplays + loops and the section collapses
 * to a single viewport height.
 */
export default function HeroScrubVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTime = useRef(0)
  const currentTime = useRef(0)
  const prefersReduced = useReducedMotion()

  // Fade the title/CTA out as we scroll through the hero.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55, 0.8], [1, 1, 0])
  const overlayY = useTransform(scrollYProgress, [0, 0.8], [0, -60])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Reduced motion → just loop it, no scrubbing.
    if (prefersReduced) {
      video.loop = true
      video.muted = true
      void video.play().catch(() => {})
      return
    }

    // iOS/Safari requires a play()→pause() to unlock frame seeking.
    const unlock = () => {
      void video
        .play()
        .then(() => video.pause())
        .catch(() => {})
    }
    unlock()

    let raf = 0
    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      const dur = video.duration || 3
      // Leave a hair of headroom so the last frame stays clean.
      targetTime.current = progress * (dur - 0.05)
    }

    const tick = () => {
      // Lerp toward target for smoothness.
      currentTime.current += (targetTime.current - currentTime.current) * 0.12
      if (video.readyState >= 2 && Math.abs(video.currentTime - currentTime.current) > 0.01) {
        try {
          video.currentTime = currentTime.current
        } catch {
          /* seeking not ready yet */
        }
      }
      raf = requestAnimationFrame(tick)
    }

    onScroll()
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="start"
      className="relative"
      style={{ height: prefersReduced ? '100svh' : '320vh' }}
      aria-label="Willkommen bei Café Greco"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--color-aegean-d)]">
        {/* Scrubbing video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-greco.mp4"
          poster="/hero-greco-poster.jpg"
          muted
          playsInline
          preload="auto"
        />

        {/* Vignette + warm tint for legible text (Vintage Analog) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(26,42,54,0.25) 0%, rgba(26,42,54,0.72) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Title + CTAs */}
        <motion.div
          style={{ opacity: overlayOpacity, y: overlayY }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-heading tracking-antique text-xs sm:text-sm uppercase text-[var(--color-gold-l)]">
            Hamburg · Bergedorf · seit 1987
          </p>

          <h1 className="mt-4 font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[var(--color-parchment)] text-engraved">
            Café Greco
          </h1>

          <p className="mt-5 max-w-xl font-script italic text-xl sm:text-2xl md:text-3xl text-[var(--color-cream)]">
            Authentische griechische Küche im Herzen von Hamburg-Bergedorf
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#reservierung"
              className="rounded-sm bg-[var(--color-gold)] px-8 py-3 font-heading tracking-antique text-sm uppercase text-[var(--color-aegean-d)] shadow-lg transition-transform duration-200 hover:scale-[1.04] hover:bg-[var(--color-gold-l)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold-l)]"
            >
              Tisch reservieren
            </a>
            <a
              href="#speisekarte"
              className="rounded-sm border border-[var(--color-cream)]/70 px-8 py-3 font-heading tracking-antique text-sm uppercase text-[var(--color-parchment)] transition-colors duration-200 hover:bg-[var(--color-parchment)]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold-l)]"
            >
              Zur Speisekarte
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        {!prefersReduced && (
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--color-cream)]"
            aria-hidden="true"
          >
            <span className="block text-center font-heading tracking-antique text-[10px] uppercase">
              Scrollen
            </span>
            <ChevronDown className="mx-auto mt-1 h-5 w-5 animate-bounce" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
