import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export function Reveal({ children, delay = 0, direction = 'up' }: RevealProps) {
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 24 : 0,
    x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
