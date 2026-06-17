type IconProps = { className?: string }

/** Inline brand glyphs — lucide no longer ships trademarked logos. */

export function InstagramIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 8.5V7c0-.83.67-1.5 1.5-1.5H17V3h-2c-2.21 0-4 1.79-4 4v1.5H9V11h2v8h3v-8h2.2l.3-2.5H14Z"
        fill="currentColor"
      />
    </svg>
  )
}
