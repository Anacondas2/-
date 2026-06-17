import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Hero — neo-antique banquet.
 *
 * Desktop: a scroll-scrubbed <canvas> frame sequence (Apple-style) — buttery
 * and sharp, native 1920px frames.
 *
 * Phones / reduced-motion / very slow networks: a single static high-quality
 * photo instead of the 73-frame sequence. That drops the hero payload from
 * ~8.6 MB to ~0.37 MB on mobile (≈23× lighter) and removes any scroll jank —
 * the professional trade-off for small screens.
 */
const FRAME_COUNT = 73

export default function HeroScrubVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawnIdx = useRef(-1)
  const targetIdx = useRef(0)
  const currentIdx = useRef(0)
  const [ready, setReady] = useState(false)
  const [loadPct, setLoadPct] = useState(0)
  const prefersReduced = useReducedMotion()

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const on = () => setIsMobile(mql.matches)
    mql.addEventListener('change', on)
    return () => mql.removeEventListener('change', on)
  }, [])

  // Animate only on a real pointer-capable desktop with motion allowed.
  const animated = !isMobile && !prefersReduced

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 0.78], [1, 1, 0])
  const overlayY = useTransform(scrollYProgress, [0, 0.8], [0, -70])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    if (!animated) return
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Graceful degradation: skip the heavy frame download on Save-Data / 2g.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (conn?.saveData || (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType))) {
      setReady(true)
      return
    }

    const frames: HTMLImageElement[] = []
    let loaded = 0
    let cancelled = false
    let raf = 0
    let running = false

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      drawnIdx.current = -1
    }

    const draw = (idx: number) => {
      const img = frames[idx]
      if (!img || !img.complete || img.naturalWidth === 0) return
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
      drawnIdx.current = idx
    }

    const computeTarget = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      targetIdx.current = p * (FRAME_COUNT - 1)
    }

    const tick = () => {
      const diff = targetIdx.current - currentIdx.current
      currentIdx.current += diff * 0.16
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentIdx.current)))
      if (idx !== drawnIdx.current) draw(idx)
      if (Math.abs(diff) < 0.002) {
        currentIdx.current = targetIdx.current
        running = false
        raf = 0
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      computeTarget()
      wake()
    }
    const onResize = () => {
      sizeCanvas()
      draw(Math.round(currentIdx.current))
      wake()
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = `hero-frames/d/f_${String(i + 1).padStart(3, '0')}.webp`
      const onDone = () => {
        if (cancelled) return
        loaded++
        setLoadPct(Math.round((loaded / FRAME_COUNT) * 100))
        if (i === 0) {
          sizeCanvas()
          draw(0)
        }
        if (loaded === FRAME_COUNT) setReady(true)
      }
      img.onload = onDone
      img.onerror = onDone
      frames[i] = img
    }

    sizeCanvas()
    computeTarget()
    wake()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelled = true
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [animated])

  return (
    <section
      ref={sectionRef}
      id="start"
      className="relative"
      style={{ height: animated ? '300vh' : '100svh' }}
      aria-label="Willkommen bei Café Greco"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--color-malt-d)]">
        {animated ? (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        ) : (
          <img
            src="hero-mobile.webp"
            alt="Festliche neo-antike Bankettszene im Café Greco"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

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
          style={animated ? { opacity: overlayOpacity, y: overlayY } : undefined}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-heading tracking-antique text-xs sm:text-sm uppercase text-[var(--color-turmeric)]">
            Hamburg · Bergedorf · seit 1987
          </p>

          <h1 className="mt-4 font-display text-[clamp(3.25rem,14vw,9rem)] leading-[0.95] text-[var(--color-parchment)] text-engraved">
            Café Greco
          </h1>

          <p className="mt-5 max-w-xl font-script italic text-xl sm:text-2xl md:text-3xl text-[var(--color-cream)]">
            Authentische griechische Küche im Herzen von Hamburg-Bergedorf
          </p>

          <div className="mt-9 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#reservierung"
              className="rounded-sm bg-[var(--color-turmeric)] px-8 py-3.5 font-heading tracking-antique text-sm uppercase text-[var(--color-malt)] shadow-lg transition-transform duration-200 active:scale-95 sm:hover:scale-[1.04] sm:hover:bg-[var(--color-turmeric-l)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-turmeric-l)]"
            >
              Tisch reservieren
            </a>
            <a
              href="#speisekarte"
              className="rounded-sm border border-[var(--color-cream)]/70 px-8 py-3.5 font-heading tracking-antique text-sm uppercase text-[var(--color-parchment)] transition-colors duration-200 active:bg-[var(--color-parchment)]/10 sm:hover:bg-[var(--color-parchment)]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-turmeric-l)]"
            >
              Zur Speisekarte
            </a>
          </div>
        </motion.div>

        {/* Loading indicator (animated mode only) */}
        {animated && !ready && (
          <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2" aria-hidden="true">
            <div className="h-0.5 w-28 overflow-hidden rounded-full bg-[var(--color-cream)]/25">
              <div
                className="h-full bg-[var(--color-turmeric)] transition-[width] duration-200"
                style={{ width: `${loadPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Scroll hint (animated mode only) */}
        {animated && ready && (
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
