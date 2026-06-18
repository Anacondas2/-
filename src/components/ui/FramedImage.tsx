type Props = {
  src: string
  alt: string
  className?: string
  /** Load eagerly (above-the-fold). Defaults to lazy. */
  eager?: boolean
}

/**
 * Image with an offset gold frame — the recurring "museum plate" motif.
 * Purely presentational (plain DOM + CSS hover zoom); entrance/parallax motion
 * is driven externally by GSAP so transforms stay under one controller.
 */
export default function FramedImage({ src, alt, className = '', eager = false }: Props) {
  return (
    <div className={`group relative ${className}`}>
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
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
    </div>
  )
}
