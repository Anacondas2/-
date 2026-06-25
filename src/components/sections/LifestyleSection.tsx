import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const photos = [
  {
    gradient: 'linear-gradient(145deg, #1a2e3d 0%, #0d1f2b 50%, #ff4103 200%)',
    accent: '#ff4103',
    label: 'CAMPUS 00s',
    sub: 'Brown / Chalk White',
    tall: true,
    svg: (
      <svg viewBox="0 0 220 160" className="w-full max-w-[180px] opacity-80" fill="none">
        <path d="M20 120 Q 60 60 160 50 Q 200 48 210 80 Q 215 110 180 130 Q 120 155 60 150 Q 20 145 20 120 Z"
          fill="#3a4f5c" stroke="#ff4103" strokeWidth="1.5" />
        <line x1="35" y1="100" x2="180" y2="70" stroke="white" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
        <line x1="30" y1="115" x2="175" y2="88" stroke="white" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
        <line x1="25" y1="130" x2="170" y2="106" stroke="white" strokeWidth="14" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="115" cy="138" rx="100" ry="18" fill="#0d1f2b" />
      </svg>
    ),
  },
  {
    gradient: 'linear-gradient(135deg, #0a1a24 0%, #1e3040 100%)',
    accent: '#ff4103',
    label: 'SAMBA OG',
    sub: 'Core Black / Cloud White',
    tall: false,
    svg: (
      <svg viewBox="0 0 200 120" className="w-full max-w-[160px] opacity-75" fill="none">
        <path d="M15 90 Q 55 40 155 32 Q 188 30 193 60 Q 197 88 165 100 Q 100 120 45 118 Q 10 115 15 90 Z"
          fill="#162535" stroke="#ff4103" strokeWidth="1.5" />
        <line x1="30" y1="74" x2="170" y2="48" stroke="white" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
        <line x1="27" y1="88" x2="167" y2="63" stroke="white" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
        <ellipse cx="100" cy="112" rx="88" ry="14" fill="#0a1a24" />
      </svg>
    ),
  },
  {
    gradient: 'linear-gradient(160deg, #001621 0%, #0f2535 60%, #1a0800 100%)',
    accent: '#ff4103',
    label: 'GAZELLE',
    sub: 'Vulkaniko / Noturno',
    tall: false,
    svg: (
      <svg viewBox="0 0 200 120" className="w-full max-w-[160px] opacity-75" fill="none">
        <path d="M12 92 Q 50 42 148 35 Q 185 33 190 62 Q 194 90 160 103 Q 98 122 42 120 Q 8 118 12 92 Z"
          fill="#200b00" stroke="#ff4103" strokeWidth="1.5" />
        <line x1="28" y1="76" x2="165" y2="50" stroke="#ff4103" strokeWidth="11" strokeLinecap="round" opacity="0.85" />
        <line x1="25" y1="90" x2="162" y2="65" stroke="#ff4103" strokeWidth="11" strokeLinecap="round" opacity="0.85" />
        <ellipse cx="98" cy="114" rx="86" ry="13" fill="#1a0800" />
      </svg>
    ),
  },
]

function PhotoCard({
  gradient,
  label,
  sub,
  svg,
  tall,
  delay,
}: (typeof photos)[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${tall ? 'row-span-2' : ''}`}
      style={{ background: gradient, minHeight: tall ? '480px' : '220px' }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Shoe illustration */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {svg}
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p className="font-display text-lg leading-none text-white">{label}</p>
        <p className="font-body text-[10px] uppercase tracking-widest text-[#c4c4c4]">{sub}</p>
      </div>

      {/* Orange corner accent */}
      <div className="absolute top-0 right-0 h-1 w-12 bg-[#ff4103]" />
    </motion.div>
  )
}

export default function LifestyleSection() {
  const textRef = useRef<HTMLDivElement>(null)
  const textInView = useInView(textRef, { once: true, margin: '-40px' })

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#001621] py-28"
      aria-label="Lifestyle"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#ff4103] via-[#ff4103]/30 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">

        {/* ── Left: text ──────────────────────────────────────────── */}
        <motion.div
          ref={textRef}
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -40 }}
          animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff4103]">
            The Culture
          </span>

          <h2 className="font-display text-[clamp(3rem,7vw,7.5rem)] leading-[0.9] text-white">
            Not Just<br />
            Shoes<br />
            <span className="text-[#ff4103]">A Lifestyle</span>
          </h2>

          <p className="max-w-sm font-body text-sm font-light leading-relaxed text-[#c4c4c4]">
            Every pair is designed to match your grind, your goals, and your style
            comfort. From the streets to the studio — these are the shoes that move
            with you.
          </p>

          {/* Stats */}
          <div className="flex gap-10 border-t border-white/10 pt-6">
            {[
              { value: '200+', label: 'Silhouettes' },
              { value: '40+', label: 'Colourways' },
              { value: '12K+', label: 'Happy Kicks' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl text-[#ff4103]">{value}</p>
                <p className="font-body text-[11px] uppercase tracking-wider text-[#6b6b6b]">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#drops"
            className="group inline-flex w-fit items-center gap-3 border-b-2 border-[#ff4103] pb-1 font-body text-sm font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:text-[#ff4103]"
          >
            Shop The Drop
            <svg
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>

        {/* ── Right: broken photo grid ─────────────────────────────── */}
        <div className="grid h-[500px] grid-cols-2 grid-rows-2 gap-3">
          <PhotoCard {...photos[0]} delay={0.1} />
          <PhotoCard {...photos[1]} delay={0.22} />
          <PhotoCard {...photos[2]} delay={0.34} />
        </div>
      </div>
    </section>
  )
}
