interface Props {
  top?: string; left?: string; right?: string; bottom?: string
  size?: number; color?: string; opacity?: number
}

export function GlowOrb({
  top, left, right, bottom,
  size = 600, color = '200, 169, 110', opacity = 0.07
}: Props) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom,
      width: `${size}px`, height: `${size}px`,
      borderRadius: '50%',
      background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, transparent 70%)`,
      pointerEvents: 'none', zIndex: 0,
      transform: 'translate(-50%, -50%)'
    }} />
  )
}
