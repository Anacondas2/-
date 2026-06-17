import Laurel from './Laurel'

type Props = {
  overline?: string
  title: string
  greek?: string
  light?: boolean
  className?: string
}

/**
 * Section heading with twin laurel branches and an optional Greek-script line.
 */
export default function SectionTitle({
  overline,
  title,
  greek,
  light = false,
  className = '',
}: Props) {
  const accent = light ? 'text-[var(--color-gold-l)]' : 'text-[var(--color-terracotta)]'
  const main = light ? 'text-[var(--color-parchment)]' : 'text-[var(--color-aegean)]'

  return (
    <div className={`text-center ${className}`}>
      {overline && (
        <p className={`font-heading tracking-antique text-xs sm:text-sm uppercase ${accent}`}>
          {overline}
        </p>
      )}
      <div className="mt-3 flex items-center justify-center gap-4">
        <Laurel className={`hidden sm:block h-5 w-14 ${accent}`} />
        <h2 className={`font-display text-4xl sm:text-5xl ${main}`}>{title}</h2>
        <Laurel className={`hidden sm:block h-5 w-14 ${accent}`} mirrored />
      </div>
      {greek && (
        <p className={`font-script italic text-xl sm:text-2xl mt-2 ${accent}`}>{greek}</p>
      )}
    </div>
  )
}
