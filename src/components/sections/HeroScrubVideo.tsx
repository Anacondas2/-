import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Hero section — neo-antique banquet video, scrubbed by scroll.
 *
 * The section is tall (~300vh). A sticky 100svh stage holds the video, whose
 * currentTime is driven by how far you have scrolled through the section — so
 * the footage only ever moves while you scroll, forward or back, and freezes
 * the moment you stop. A requestAnimationFrame loop eases toward the target
 * time for smooth, buttery seeking. The video is encoded with a keyframe on
 * every frame, which makes that frame-accurate seeking possible.
 *
 * Reduced-motion: the poster frame is shown static, with no scrubbing.
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
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 0.78], [1, 1, 0])
  const overlayY = useTransform(scrollYProgress, [0, 0.8], [0, -70])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section || prefersReduced) return

    // Unlock frame seeking (needed by Safari/iOS): play then immediately pause.
    const unlock = () => {
      void video
        .play()
        .then(() => video.pause())
        .catch(() => {})
    }
    if (video.readyState >= 1) unlock()
    else video.addEventListener('loadedmetadata', unlock, { once: true })

    let raf = 0
    const computeTarget = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      const dur = video.duration || 3
      targetTime.current = progress * (dur - 0.05)
    }

    const tick = () => {
      // Ease toward the scroll-derived target; settles (and stops) when reached.
      currentTime.current += (targetTime.current - currentTime.current) * 0.1
      if (
        video.readyState >= 2 &&
        Math.abs(video.currentTime - currentTime.current) > 0.01
      ) {
        try {
          video.currentTime = currentTime.current
        } catch {
          /* not seekable yet */
        }
      }
      raf = requestAnimationFrame(tick)
    }

    computeTarget()
    tick()
    window.addEventListener('scroll', computeTarget, { passive: true })
    window.addEventListener('resize', computeTarget)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', computeTarget)
      window.removeEventListener('resize', computeTarget)
      video.removeEventListener('loadedmetadata', unlock)
    }
  }, [prefersReduced])

  return (
    <section
      ref={sectionRef}
      id="start"
      className="relative"
      style={{ height: prefersReduced ? '100svh' : '300vh' }}
      aria-label="Willkommen bei Café Greco"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--color-malt-d)]">
        {/* Scrubbed banquet video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="hero-greco.mp4"
          poster="hero-greco-poster.jpg"
          muted
          playsInline
          preload="auto"
        />

        {/* Warm vignette for legible text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(28,24,16,0.18) 0%, rgba(28,24,16,0.76) 100%)',
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
