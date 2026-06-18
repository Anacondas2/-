import { motion, useReducedMotion, type MotionValue } from 'framer-motion'

type Props = {
  src: string
  alt: string
  className?: string
  /** Resting tilt in degrees (ignored under reduced-motion). */
  rotate?: number
  /** Optional scroll-linked vertical drift for parallax depth. */
  parallax?: MotionValue<number>
  /** Load eagerly (above-the-fold). Defaults to lazy. */
  eager?: boolean
}

/**
 * Image with an offset gold frame — the recurring "museum plate" motif.
 * Gentle resting tilt, hover zoom and optional scroll parallax; all motion is
 * disabled under prefers-reduced-motion.
 */
export default function FramedImage({
  src,
  alt,
  className = '',
  rotate = 0,
  parallax,
  eager = false,
}: Props) {
  const prefersReduced = useReducedMotion()
  const tilt = prefersReduced ? 0 : rotate

  return (
    <motion.div
      style={prefersReduced || !parallax ? undefined : { y: parallax }}
      className={`group relative ${className}`}
    >
      <div
        className="relative"
        style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
      >
        {/* Offset gold frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-sm border border-[var(--color-gold)]/60 sm:-inset-3"
        />
        <div className="relative overflow-hidden rounded-sm shadow-2xl ring-1 ring-[var(--color-malt)]/20">
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            className={`h-full w-full object-cover ${
              prefersReduced ? '' : 'transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]'
            }`}
          />
        </div>
      </div>
    </motion.div>
  )
}
