type Props = {
  className?: string
  color?: string
}

/**
 * Stylised Ionic column — fluted shaft with a volute capital.
 * Decorative only; sits behind content at low opacity.
 */
export default function Column({ className = '', color = 'currentColor' }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 400"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Capital — Ionic volutes */}
      <path
        d="M6 34 H54 V44 H6 Z"
        fill={color}
      />
      <path
        d="M10 34 C2 26 6 14 16 16 C24 18 22 30 14 30 M50 34 C58 26 54 14 44 16 C36 18 38 30 46 30"
        stroke={color}
        strokeWidth="2.4"
        fill="none"
      />
      {/* Shaft with flutes */}
      <rect x="12" y="44" width="36" height="332" fill={color} opacity="0.9" />
      {[18, 24, 30, 36, 42].map((x) => (
        <line
          key={x}
          x1={x}
          y1="46"
          x2={x}
          y2="374"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1.4"
        />
      ))}
      {/* Base */}
      <path d="M4 376 H56 V392 H4 Z" fill={color} />
      <rect x="0" y="392" width="60" height="8" fill={color} />
    </svg>
  )
}
