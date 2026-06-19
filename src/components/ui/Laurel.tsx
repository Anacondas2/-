type Props = {
  className?: string
  mirrored?: boolean
}

/**
 * A single laurel branch (olive/bay leaves) used as a heading flourish.
 * Pair two — one mirrored — to frame a section title.
 */
export default function Laurel({ className = '', mirrored = false }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 24"
      fill="none"
      aria-hidden="true"
      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M58 12 C40 12 18 12 4 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[10, 18, 26, 34, 42].map((x, i) => (
        <g key={i}>
          <path
            d={`M${x} 12 Q${x + 4} 4 ${x + 9} 6 Q${x + 5} 11 ${x} 12`}
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d={`M${x} 12 Q${x + 4} 20 ${x + 9} 18 Q${x + 5} 13 ${x} 12`}
            fill="currentColor"
            opacity="0.85"
          />
        </g>
      ))}
      <circle cx="4" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}
