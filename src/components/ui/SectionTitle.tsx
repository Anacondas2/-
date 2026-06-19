import Laurel from './Laurel'

type Props = {
  overline?: string
  title: string
  greek?: string
  light?: boolean
  align?: 'center' | 'left'
  className?: string
}

/**
 * Section heading with laurel flourishes and an optional Greek-script line.
 * `align="left"` drops the right (mirrored) laurel for an editorial, left-aligned
 * heading; the default stays centered with twin laurels.
 */
export default function SectionTitle({
  overline,
  title,
  greek,
  light = false,
  align = 'center',
  className = '',
}: Props) {
  const accent = light ? 'text-[var(--color-gold-l)]' : 'text-[var(--color-terracotta)]'
  const main = light ? 'text-[var(--color-parchment)]' : 'text-[var(--color-aegean)]'
  const left = align === 'left'

  return (
    <div className={`${left ? 'text-left' : 'text-center'} ${className}`}>
      {overline && (
        <p className={`font-heading tracking-antique text-xs sm:text-sm uppercase ${accent}`}>
          {overline}
        </p>
      )}
      <div className={`mt-3 flex items-center gap-4 ${left ? 'justify-start' : 'justify-center'}`}>
        <Laurel className={`hidden sm:block h-5 w-14 ${accent}`} />
        <h2 className={`font-display text-4xl sm:text-5xl ${main}`}>{title}</h2>
        {!left && <Laurel className={`hidden sm:block h-5 w-14 ${accent}`} mirrored />}
      </div>
      {greek && (
        <p className={`font-script italic text-xl sm:text-2xl mt-2 ${accent}`}>{greek}</p>
      )}
    </div>
  )
}
