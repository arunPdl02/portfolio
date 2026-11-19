import { Link } from 'react-router-dom'
import { content } from '../content'
import ThemeToggle from '../theme/ThemeToggle'
import Terminal from './Terminal'
import './tui.css'

export default function Tui() {
  const { resume } = content
  return (
    <div className="tui">
      <header className="tui-bar">
        <span className="tui-title">guest@arunpaudel.com</span>
        <div className="tui-bar-actions">
          <Link to="/gui" className="pill-btn">
            GUI →
          </Link>
          <ThemeToggle className="pill-btn" />
          <a className="pill-btn" href={resume.path} download={resume.filename}>
            Resume
          </a>
        </div>
      </header>
      <Terminal />
    </div>
  )
}
