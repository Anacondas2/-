import { useState } from 'react'
import { motion } from 'framer-motion'

const filters = ['Comfort', 'Style', 'Trendy']

const EASE = [0.22, 1, 0.36, 1] as const

export default function HeroSection() {
  const [activeFilter, setActiveFilter] = useState('Style')

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden bg-[#001621]"
      aria-label="Hero"
    >
      {/* ── Background — abstract brutalist visual ────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main atmospheric gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 65% 50%, #0d2a3a 0%, #001621 60%)',
          }}
        />

        {/* Large abstract sneaker-sole shape (decorative SVG) */}
        <motion.div
          className="absolute right-0 top-0 h-full w-[60%] opacity-20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        >
          <svg viewBox="0 0 600 700" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            {/* Sole silhouette */}
            <ellipse cx="300" cy="400" rx="260" ry="100" fill="none" stroke="#ff4103" strokeWidth="2" />
            <ellipse cx="300" cy="400" rx="220" ry="75" fill="none" stroke="#ff4103" strokeWidth="1" opacity="0.5" />
            {/* Stripes */}
            <line x1="120" y1="280" x2="480" y2="320" stroke="white" strokeWidth="28" strokeLinecap="round" opacity="0.6" />
            <line x1="100" y1="330" x2="460" y2="375" stroke="white" strokeWidth="28" strokeLinecap="round" opacity="0.6" />
            <line x1="80" y1="385" x2="440" y2="430" stroke="white" strokeWidth="28" strokeLinecap="round" opacity="0.6" />
            {/* Upper body */}
            <path d="M80 380 Q 150 200 400 180 Q 520 175 560 300 Q 580 380 500 430 Q 400 470 200 465 Q 100 460 80 380 Z"
              fill="#1a2e3d" stroke="#ff4103" strokeWidth="1.5" opacity="0.9" />
          </svg>
        </motion.div>

        {/* Diagonal orange accent line */}
        <motion.div
          className="absolute top-1/4 right-1/4 h-[1px] w-64 rotate-45 bg-[#ff4103]/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Edge fades */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001621] via-transparent to-[#001621]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001621] via-transparent to-transparent" />
      </div>

      {/* ── Content grid ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 pt-28">
        <div className="flex flex-1 flex-col justify-between">

          {/* Top row: tagline right */}
          <div className="flex justify-end">
            <motion.div
              className="max-w-xs text-right"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            >
              <p className="font-body text-xs font-light leading-relaxed text-[#c4c4c4]">
                Built For Every Mood, Every<br />
                Outfit, And Every Move Lace<br />
                Up And Show Vibe.
              </p>
              <div className="mt-4 flex justify-end gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActiveFilter(f)}
                    className={`rounded-full px-4 py-1.5 font-body text-[11px] font-medium uppercase tracking-wider transition-all duration-200 ${
                      activeFilter === f
                        ? 'bg-[#ff4103] text-white'
                        : 'border border-white/30 bg-white/5 text-white hover:border-white/60'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle: giant headline */}
          <div className="-mt-8 flex-1 flex items-center">
            <div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(4.5rem,13vw,13rem)] leading-none text-white"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
                >
                  REIMAGINED
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(4.5rem,13vw,13rem)] leading-none text-[#ff4103]"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
                >
                  COMFORT
                </motion.h1>
              </div>
            </div>
          </div>

          {/* Bottom row: left tagline + right flash drop */}
          <div className="mb-8 flex items-end justify-between">
            {/* Left: sub-tagline + rating */}
            <div className="flex flex-col gap-5">
              <motion.p
                className="font-body text-sm font-light text-[#c4c4c4]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.48 }}
              >
                Comfort Evolved<br />
                Style Perfected.
              </motion.p>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.56 }}
              >
                {/* Avatar stack */}
                <div className="flex -space-x-2">
                  {['#e8845a', '#7ba7d4', '#5ab87c'].map((color, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[#001621]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div>
                  <span className="font-body text-[11px] font-semibold text-white">4.8/5</span>
                  <span className="ml-1 font-body text-[11px] text-[#6b6b6b]">From 12,000+ Customers</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Flash Drop + Scroll */}
            <div className="flex flex-col items-end gap-5">
              <motion.div
                className="text-right"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.62 }}
              >
                <p className="font-display text-3xl tracking-wide text-white">Flash Drop 25%</p>
                <p className="font-body text-xs text-[#6b6b6b]">Our All New Arrival</p>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.button
                  type="button"
                  aria-label="Scroll to explore"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-[#ff4103] hover:text-[#ff4103]"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                  </svg>
                </motion.button>
                <span className="font-body text-[9px] uppercase tracking-[0.18em] text-[#6b6b6b]">
                  Scroll To Explore
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle orange accent line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#ff4103]"
        initial={{ width: 0 }}
        animate={{ width: '40%' }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
      />
    </section>
  )
}
