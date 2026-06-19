type Props = {
  className?: string
  color?: string
}

/**
 * Repeating Greek meander (key) border — drawn as a tiled SVG pattern.
 * Used as a decorative divider between sections.
 */
export default function GreekMeander({ className = '', color = 'var(--color-gold)' }: Props) {
  return (
    <div
      className={`w-full ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        className="h-6 w-full"
        viewBox="0 0 80 20"
        preserveAspectRatio="xMidYMid"
        fill="none"
      >
        <defs>
          <pattern id="meander" width="40" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M2 18 V6 H30 V14 H10 V10 H22"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
        <rect width="100%" height="20" fill="url(#meander)" />
      </svg>
    </div>
  )
}
