import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Delay in seconds before the entrance starts. */
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li'
}

/**
 * Fade-in-up wrapper that animates when scrolled into view.
 * Animates only transform + opacity (UX guideline) and respects reduced-motion.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: Props) {
  const prefersReduced = useReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: prefersReduced ? 0.3 : 0.7, ease: 'easeOut', delay }}
    >
      {children}
    </MotionTag>
  )
}
