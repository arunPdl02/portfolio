import { Link } from 'react-router-dom'
import { content } from '../content'
import { DownloadIcon, MonitorIcon } from '../Icons'
import ThemeToggle from '../theme/ThemeToggle'
import Terminal from './Terminal'
import './tui.css'

export default function Tui() {
  const { resume } = content
  return (
    <div className="tui">
      <header className="topbar">
        <div className="topbar-inner">
          <span className="topbar-title">guest@arunpaudel.com</span>
          <div className="topbar-actions">
            <Link to="/gui" className="pill-btn">
              <MonitorIcon className="inline-icon" />
              GUI →
            </Link>
            <ThemeToggle className="pill-btn" />
            <a className="pill-btn" href={resume.path} download={resume.filename}>
              <DownloadIcon className="inline-icon" />
              Resume
            </a>
          </div>
        </div>
      </header>
      <Terminal />
    </div>
  )
}
