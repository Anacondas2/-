import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Hero section — neo-antique banquet video.
 *
 * The video autoplays and loops (this is rock-solid even when the built
 * index.html is opened directly from disk via file://, where seeking a video's
 * currentTime is blocked by browsers — the reason an earlier scroll-scrub
 * version showed nothing but a dark frame).
 *
 * The "scroll animation" is a cinematic parallax: while the sticky stage is
 * pinned, the footage slowly scales up and drifts while the title + CTAs rise
 * and fade. All driven by transform/opacity only (UX guideline) and disabled
 * under prefers-reduced-motion.
 */
export default function HeroScrubVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Cinematic parallax: gentle zoom + drift across the pinned stage.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 0.78], [1, 1, 0])
  const overlayY = useTransform(scrollYProgress, [0, 0.8], [0, -70])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  // Make sure autoplay actually starts (some browsers need a nudge).
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const play = () => void video.play().catch(() => {})
    play()
    video.addEventListener('canplay', play, { once: true })
    return () => video.removeEventListener('canplay', play)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="start"
      className="relative"
      style={{ height: prefersReduced ? '100svh' : '185vh' }}
      aria-label="Willkommen bei Café Greco"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--color-malt-d)]">
        {/* Banquet video */}
        <motion.video
          ref={videoRef}
          style={prefersReduced ? undefined : { scale: videoScale, y: videoY }}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-greco.mp4"
          poster="/hero-greco-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        {/* Warm vignette for legible text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(28,24,16,0.20) 0%, rgba(28,24,16,0.78) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Title + CTAs */}
        <motion.div
          style={prefersReduced ? undefined : { opacity: overlayOpacity, y: overlayY }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-heading tracking-antique text-xs sm:text-sm uppercase text-[var(--color-turmeric)]">
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
              className="rounded-sm bg-[var(--color-turmeric)] px-8 py-3 font-heading tracking-antique text-sm uppercase text-[var(--color-malt)] shadow-lg transition-transform duration-200 hover:scale-[1.04] hover:bg-[var(--color-turmeric-l)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-turmeric-l)]"
            >
              Tisch reservieren
            </a>
            <a
              href="#speisekarte"
              className="rounded-sm border border-[var(--color-cream)]/70 px-8 py-3 font-heading tracking-antique text-sm uppercase text-[var(--color-parchment)] transition-colors duration-200 hover:bg-[var(--color-parchment)]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-turmeric-l)]"
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
