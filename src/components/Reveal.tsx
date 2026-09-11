import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** Subtle scroll-linked drift (luxury parallax, not flashy) */
  parallax?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  parallax = false,
}: RevealProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const drift = useTransform(scrollYProgress, [0, 1], parallax ? [16, -16] : [0, 0])
  const smoothDrift = useSpring(drift, { stiffness: 80, damping: 28 })

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {parallax ? (
        <motion.div style={{ y: smoothDrift }}>{children}</motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}

/** Gold rule that draws left→right as it enters the viewport */
export function GoldRuleDraw({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.45'],
  })
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  if (reduce) {
    return <div ref={ref} className={`gold-rule ${className}`} />
  }

  return (
    <motion.div
      ref={ref}
      className={`gold-rule-draw ${className}`}
      style={{ scaleX }}
    />
  )
}

/** Hero background with gentle scroll-synced Ken Burns */
export function ParallaxHeroImage({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])

  if (reduce) {
    return (
      <div ref={ref} className="absolute inset-0">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover will-change-transform"
        style={{ y, scale }}
      />
    </div>
  )
}
