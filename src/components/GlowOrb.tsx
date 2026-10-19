import { useEffect, useState } from 'react'
import { getThemeMode, subscribeToThemeMode } from '@/utils/themeMode'

interface Props {
  top?: string
  left?: string
  right?: string
  bottom?: string
  size?: number
  color?: string
  opacity?: number
  className?: string
}

export function GlowOrb({
  top,
  left,
  right,
  bottom,
  size = 650,
  color,
  opacity = 0.2,
  className = ''
}: Props) {
  const [theme, setTheme] = useState(getThemeMode())

  useEffect(() => {
    return subscribeToThemeMode(setTheme)
  }, [])

  // If no specific color is passed, dynamically follow the active theme
  const resolvedColor = color || (theme === 'studio' ? '0, 245, 160' : '200, 169, 110')

  return (
    <div
      className={`glow-orb-pulse ${className}`}
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${resolvedColor}, ${opacity}) 0%, rgba(${resolvedColor}, ${opacity * 0.4}) 45%, transparent 72%)`,
        filter: 'blur(45px)',
        pointerEvents: 'none',
        zIndex: 0,
        transform: 'translate(-50%, -50%)',
        animation: 'orb-float 18s ease-in-out infinite alternate'
      }}
    />
  )
}
