import { useState, useEffect } from 'react'

interface Props {
  words: string[]
  speed?: number
  pause?: number
  style?: React.CSSProperties
}

export function TypeWriter({ words, speed = 75, pause = 2200, style }: Props) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1))
        setCharIdx(i => i + 1)
        if (charIdx + 1 === current.length)
          setTimeout(() => setDeleting(true), pause)
      } else {
        setDisplay(current.slice(0, charIdx - 1))
        setCharIdx(i => i - 1)
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx(i => (i + 1) % words.length)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return (
    <span style={style}>
      {display}
      <span style={{
        display: 'inline-block', width: '2px', height: '0.85em',
        backgroundColor: 'var(--accent)', marginLeft: '3px',
        verticalAlign: 'middle', animation: 'blink 1s step-end infinite'
      }} />
    </span>
  )
}
