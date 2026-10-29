import { useEffect, useRef } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import Banner from '../Banner'
import { content } from '../content'
import { getSavedMode, isFirstVisitOnPhone, saveMode, type Mode } from '../mode'
import ThemeToggle from '../theme/ThemeToggle'
import './Landing.css'

const MODES: { mode: Mode; key: string }[] = [
  { mode: 'gui', key: 'g' },
  { mode: 'tui', key: 't' },
]

function ModeSelector() {
  const navigate = useNavigate()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const lastFocused = useRef(0)
  const { profile, resume } = content

  useEffect(() => {
    const go = (mode: Mode) => {
      saveMode(mode)
      navigate(`/${mode}`)
    }
    const focusButton = (i: number) => buttons.current[(i + MODES.length) % MODES.length]?.focus()

    buttons.current[0]?.focus()

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
          // Focused buttons and links handle Enter natively; this covers lost focus.
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
        {MODES.map(({ mode, key }, i) => (
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
            onClick={() => {
              saveMode(mode)
              navigate(`/${mode}`)
            }}
            aria-keyshortcuts={key}
          >
            [ {mode.toUpperCase()} ]
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
  const [params] = useSearchParams()

  if (!params.has('choose')) {
    const target = getSavedMode() ?? (isFirstVisitOnPhone() ? 'gui' : null)
    if (target) return <Navigate to={`/${target}`} replace />
  }
  return <ModeSelector />
}
