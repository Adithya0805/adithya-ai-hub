import { useEffect, useRef } from 'react'
import { getThemeMode, subscribeToThemeMode } from '@/utils/themeMode'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let nodes: Node[] = []
    let width = 0
    let height = 0
    let dpr = 1

    // Theme color management
    let colorRgb = getThemeMode() === 'studio' ? '0, 245, 160' : '200, 169, 110'
    const unsubTheme = subscribeToThemeMode((mode) => {
      colorRgb = mode === 'studio' ? '0, 245, 160' : '200, 169, 110'
    })

    // Mouse tracking for interactive synapses
    const mouse = { x: -9999, y: -9999, active: false }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active =
        mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height
    }

    const onPointerLeave = () => {
      mouse.active = false
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    const MAX_DIST = 145
    const MOUSE_RADIUS = 160

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || {
        width: window.innerWidth,
        height: window.innerHeight
      }
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      const nodeCount = width < 768 ? 32 : 64
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 1.4 + 1.2,
        opacity: Math.random() * 0.45 + 0.32
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Move nodes
      if (!prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          n.x += n.vx
          n.y += n.vy

          // Bounce off boundaries
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1

          // Gentle mouse gravity
          if (mouse.active) {
            const mdx = mouse.x - n.x
            const mdy = mouse.y - n.y
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
            if (mdist < MOUSE_RADIUS && mdist > 0) {
              const force = (1 - mdist / MOUSE_RADIUS) * 0.22
              n.x += (mdx / mdist) * force
              n.y += (mdy / mdist) * force
            }
          }
        }
      }

      // Draw connection lines between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.28
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${colorRgb}, ${alpha})`
            ctx.lineWidth = 0.75
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw connections to mouse cursor
      if (mouse.active) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          const mdx = mouse.x - n.x
          const mdy = mouse.y - n.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < MOUSE_RADIUS) {
            const mouseAlpha = (1 - mdist / MOUSE_RADIUS) * 0.42
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${colorRgb}, ${mouseAlpha})`
            ctx.lineWidth = 0.9
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }

        // Cursor focal core
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorRgb}, 0.65)`
        ctx.fill()
      }

      // Draw nodes (halo + solid core)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Outer soft glow
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius * 2.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorRgb}, ${n.opacity * 0.22})`
        ctx.fill()

        // Inner solid core
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorRgb}, ${n.opacity * 0.9})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const onResize = () => {
      resize()
      init()
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      unsubTheme()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1
      }}
    />
  )
}
