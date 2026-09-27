import { useState, useEffect } from 'react'

interface TypeWriterProps {
  words: string[]
  speed?: number
  pause?: number
  style?: React.CSSProperties
}

export function TypeWriter({ words, speed = 80, pause = 2000, style }: TypeWriterProps) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    if (waiting) return
    const current = words[wordIdx]

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = charIdx + 1
        setDisplay(current.slice(0, next))
        setCharIdx(next)
        if (next === current.length) {
          setWaiting(true)
          setTimeout(() => {
            setWaiting(false)
            setDeleting(true)
          }, pause)
        }
      } else {
        const next = charIdx - 1
        setDisplay(current.slice(0, next))
        setCharIdx(next)
        if (next === 0) {
          setDeleting(false)
          setWordIdx(i => (i + 1) % words.length)
        }
      }
    }, deleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, waiting, wordIdx, words, speed, pause])

  return (
    <span style={style}>
      {display}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '0.85em',
        backgroundColor: 'var(--accent)',
        marginLeft: '3px',
        verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  )
}
