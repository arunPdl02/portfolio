import { Link } from 'react-router-dom'
import { content } from '../content'
import { useTheme } from '../theme/useTheme'

// Temporary stub: replaced by the real landing page in Phase 2.
export default function Landing() {
  const { theme, toggleTheme } = useTheme()
  const { profile } = content
  return (
    <main className="placeholder">
      <h1>{profile.name}</h1>
      <p>{profile.tagline}</p>
      <nav>
        <Link to="/gui">[ GUI ]</Link> <Link to="/tui">[ TUI ]</Link>
      </nav>
      <button onClick={toggleTheme}>theme: {theme}</button>
    </main>
  )
}
