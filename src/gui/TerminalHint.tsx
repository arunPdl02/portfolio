import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isFirstVisitOnPhone, saveMode } from '../mode'
import { readStorage, writeStorage } from '../storage'

const DISMISS_KEY = 'tuiHintDismissed'

/** Shown once to first-time phone visitors who were sent straight to the GUI. */
export default function TerminalHint() {
  const [visible, setVisible] = useState(() => isFirstVisitOnPhone() && !readStorage(DISMISS_KEY))
  if (!visible) return null

  const dismiss = () => {
    writeStorage(DISMISS_KEY, '1')
    setVisible(false)
  }

  return (
    <aside className="hint" role="note">
      <Link to="/tui" onClick={() => saveMode('tui')}>
        Try the terminal version →
      </Link>
      <button type="button" className="hint-close" onClick={dismiss} aria-label="Dismiss">
        ×
      </button>
    </aside>
  )
}
