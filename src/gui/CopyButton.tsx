import { useEffect, useRef, useState } from 'react'
import { copyText } from '../contact'

export default function CopyButton({ text, label = 'Copy email' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onClick = async () => {
    setState((await copyText(text)) ? 'copied' : 'failed')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button type="button" className="btn" onClick={onClick}>
      {state === 'copied' ? 'Copied ✓' : state === 'failed' ? 'Copy failed' : label}
      <span className="sr-only" role="status">
        {state === 'copied' ? 'Email copied to clipboard' : ''}
      </span>
    </button>
  )
}
