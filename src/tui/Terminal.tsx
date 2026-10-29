import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { content } from '../content'
import { useTheme } from '../theme/useTheme'
import { bootLines, commands, findCommand, projectSlugs } from './commands'
import { complete } from './complete'
import { line, t, err } from './out'
import type { CommandContext, Line, Segment } from './types'

const QUICK_COMMANDS = ['help', 'projects', 'experience', 'toolbox', 'contact', 'resume', 'gui']

const promptSegments = (): Segment[] => [
  t('guest@arunpaudel.com', 'ok'),
  t(':'),
  t('~', 'cyan'),
  t('$ ', 'pink'),
]

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Seg({ seg, onCommand }: { seg: Segment; onCommand: (c: string) => void }) {
  const cls = seg.style ? `t-${seg.style}` : undefined
  if (seg.command) {
    const command = seg.command
    return (
      <button type="button" className={`t-cmd ${cls ?? ''}`} onClick={() => onCommand(command)}>
        {seg.text}
      </button>
    )
  }
  if (seg.href) {
    const external = seg.href.startsWith('http')
    return (
      <a
        className="t-link"
        href={seg.href}
        download={seg.download}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {seg.text}
      </a>
    )
  }
  return <span className={cls}>{seg.text}</span>
}

const Lines = memo(function Lines({ lines, onCommand }: { lines: Line[]; onCommand: (c: string) => void }) {
  return (
    <>
      {lines.map((l, i) => (
        <div
          key={i}
          className={l.art ? 'tui-line tui-art' : 'tui-line'}
          style={l.hang ? { paddingLeft: `${l.hang}ch`, textIndent: `-${l.hang}ch` } : undefined}
        >
          {l.segments.map((seg, j) => (
            <Seg key={j} seg={seg} onCommand={onCommand} />
          ))}
        </div>
      ))}
    </>
  )
})

export default function Terminal() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const queue = useRef<Line[]>([])
  const timer = useRef<number | undefined>(undefined)
  const booted = useRef(false)
  const history = useRef<string[]>([])
  const historyIndex = useRef(-1)
  const draft = useRef('')

  const append = useCallback((added: Line[]) => setLines((prev) => [...prev, ...added]), [])

  // Reveal queued lines in order, honouring each line's delay.
  const pump = useCallback(() => {
    const run = () => {
      if (timer.current !== undefined) return
      const batch: Line[] = []
      while (queue.current.length > 0) {
        const next = queue.current[0]
        if (next.delay) {
          if (batch.length > 0) break
          timer.current = window.setTimeout(() => {
            timer.current = undefined
            const shown = queue.current.shift()
            if (shown) append([{ ...shown, delay: undefined }])
            run()
          }, next.delay)
          return
        }
        batch.push(queue.current.shift()!)
      }
      if (batch.length > 0) append(batch)
      if (queue.current.length > 0) run()
    }
    run()
  }, [append])

  const skipAll = useCallback(() => {
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
    if (queue.current.length > 0) append(queue.current.splice(0))
  }, [append])

  const push = useCallback(
    (added: Line[]) => {
      queue.current.push(...(prefersReducedMotion() ? added.map((l) => ({ ...l, delay: undefined })) : added))
      pump()
    },
    [pump],
  )

  const hardClear = useCallback(() => {
    queue.current = []
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
    setLines([])
  }, [])

  const execute = useCallback(
    (raw: string) => {
      const input = raw.trim()
      const echo = line(...promptSegments(), t(raw))
      if (!input) {
        push([echo])
        return
      }
      if (history.current[history.current.length - 1] !== input) history.current.push(input)

      let cleared = false
      const ctx: CommandContext = {
        commands,
        theme,
        setTheme,
        clear: () => {
          cleared = true
        },
        navigate,
        downloadResume: () => {
          const a = document.createElement('a')
          a.href = content.resume.path
          a.download = content.resume.filename
          a.click()
        },
      }

      const [name, ...args] = input.split(/\s+/)
      const command = findCommand(name)
      const output = command ? command.run(args, ctx) : [err(`command not found: ${name}. Type 'help'.`)]
      if (cleared) {
        hardClear()
        push(output)
      } else {
        push([echo, ...output])
      }
    },
    [theme, setTheme, navigate, push, hardClear],
  )

  // Boot sequence. The guard keeps StrictMode's double-invoked effect from printing twice.
  useEffect(() => {
    if (!booted.current) {
      booted.current = true
      push(bootLines(window.matchMedia('(max-width: 639px)').matches, window.matchMedia('(pointer: coarse)').matches))
    }
    pump()
    return () => {
      if (timer.current !== undefined) {
        window.clearTimeout(timer.current)
        timer.current = undefined
      }
    }
  }, [push, pump])

  // Auto-scroll to the newest output.
  useEffect(() => {
    const el = screenRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  // Any keypress skips animations; typing anywhere focuses the prompt.
  useEffect(() => {
    const onKeyDown = () => {
      skipAll()
      if (document.activeElement === document.body) inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [skipAll])

  // Keep the prompt above the on-screen keyboard on phones.
  useEffect(() => {
    const vv = window.visualViewport
    const root = screenRef.current?.parentElement
    if (!vv || !root) return
    const fit = () => {
      root.style.height = `${vv.height}px`
      const el = screenRef.current
      if (el) el.scrollTop = el.scrollHeight
    }
    vv.addEventListener('resize', fit)
    return () => {
      vv.removeEventListener('resize', fit)
      root.style.height = ''
    }
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    execute(value)
    setValue('')
    historyIndex.current = -1
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const h = history.current
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault()
      hardClear()
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault()
      push([line(...promptSegments(), t(`${value}^C`))])
      setValue('')
      historyIndex.current = -1
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (h.length === 0) return
      if (historyIndex.current === -1) {
        draft.current = value
        historyIndex.current = h.length - 1
      } else {
        historyIndex.current = Math.max(0, historyIndex.current - 1)
      }
      setValue(h[historyIndex.current])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex.current === -1) return
      if (historyIndex.current < h.length - 1) {
        historyIndex.current += 1
        setValue(h[historyIndex.current])
      } else {
        historyIndex.current = -1
        setValue(draft.current)
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const result = complete(value, commands, projectSlugs)
      if (result.value !== value) {
        setValue(result.value)
      } else if (result.options.length > 1) {
        push([line(...promptSegments(), t(value)), line(t(result.options.join('   '), 'cyan'))])
      }
    }
  }

  const onScreenClick = (e: MouseEvent) => {
    if (window.getSelection()?.toString()) return
    if ((e.target as HTMLElement).closest('a, button')) return
    inputRef.current?.focus()
  }

  const runCommand = useCallback(
    (command: string) => {
      execute(command)
      inputRef.current?.focus()
    },
    [execute],
  )

  return (
    <div className="tui-terminal">
      <div className="tui-screen" ref={screenRef} onClick={onScreenClick}>
        <div className="tui-inner">
          <Lines lines={lines} onCommand={runCommand} />
          <form className="tui-input-line" onSubmit={submit}>
            <label htmlFor="tui-input" className="tui-prompt">
              {promptSegments().map((seg, i) => (
                <span key={i} className={seg.style ? `t-${seg.style}` : undefined}>
                  {seg.text}
                </span>
              ))}
            </label>
            <input
              id="tui-input"
              ref={inputRef}
              className="tui-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              aria-label="Terminal command"
            />
          </form>
        </div>
      </div>
      <div className="tui-quick" aria-label="Quick commands">
        {QUICK_COMMANDS.map((c) => (
          <button
            key={c}
            type="button"
            className="quick-btn"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => runCommand(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
