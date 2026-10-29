import { Link } from 'react-router-dom'
import { content } from '../content'
import { saveMode } from '../mode'
import ThemeToggle from '../theme/ThemeToggle'

const SECTIONS = [
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['leadership', 'Leadership'],
  ['contact', 'Contact'],
] as const

export default function TopBar() {
  const { profile, resume } = content
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#top" className="topbar-name">
          <span className="prompt" aria-hidden="true">
            &gt;
          </span>{' '}
          {profile.name}
        </a>
        <nav className="topbar-sections" aria-label="Sections">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="topbar-actions">
          <Link to="/tui" className="pill-btn" onClick={() => saveMode('tui')}>
            TUI →
          </Link>
          <ThemeToggle className="pill-btn" />
          <a className="pill-btn" href={resume.path} download={resume.filename}>
            Resume
          </a>
        </div>
      </div>
    </header>
  )
}
