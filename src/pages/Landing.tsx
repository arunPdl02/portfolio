import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../Banner'
import { MonitorIcon, TerminalIcon } from '../Icons'
import { content } from '../content'
import ThemeToggle from '../theme/ThemeToggle'
import './Landing.css'

type Mode = 'gui' | 'tui'

const MODES: { mode: Mode; key: string; caption: string; Icon: typeof MonitorIcon }[] = [
  { mode: 'gui', key: 'g', caption: 'A regular scrollable site', Icon: MonitorIcon },
  { mode: 'tui', key: 't', caption: 'An interactive terminal', Icon: TerminalIcon },
]

function ModeSelector() {
  const navigate = useNavigate()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const lastFocused = useRef(0)
  const { profile, resume } = content

  useEffect(() => {
    const go = (mode: Mode) => {
      navigate(`/${mode}`)
    }
    const focusButton = (i: number) => buttons.current[(i + MODES.length) % MODES.length]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const current = buttons.current.findIndex((b) => b === document.activeElement)
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          focusButton(current + 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          focusButton(current < 0 ? MODES.length - 1 : current - 1)
          break
        case 'Enter':
          if (document.activeElement === document.body) go(MODES[lastFocused.current].mode)
          break
        default: {
          const match = MODES.find((m) => m.key === e.key.toLowerCase())
          if (match) go(match.mode)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  return (
    <main className="landing">
      <ThemeToggle className="landing-theme" />
      <Banner />
      <p className="landing-intro">{profile.tagline}</p>

      <div className="landing-modes" role="group" aria-label="Choose an interface">
        {MODES.map(({ mode, key, caption, Icon }, i) => (
          <button
            key={mode}
            type="button"
            className="mode-btn"
            ref={(el) => {
              buttons.current[i] = el
            }}
            onFocus={() => {
              lastFocused.current = i
            }}
            onClick={() => navigate(`/${mode}`)}
            aria-keyshortcuts={key}
          >
            <Icon className="mode-icon" />
            <span className="mode-label">[ {mode.toUpperCase()} ]</span>
            <span className="mode-caption">{caption}</span>
            <span className="mode-key">press {key}</span>
          </button>
        ))}
      </div>

      <p className="landing-hint">← → to choose · Enter to select</p>
      <a className="landing-resume" href={resume.path} download={resume.filename}>
        # download resume
      </a>
    </main>
  )
}

export default function Landing() {
  return <ModeSelector />
}
