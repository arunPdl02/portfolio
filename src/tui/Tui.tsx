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
      <header className="tui-bar">
        <span className="tui-title">guest@arunpaudel.com</span>
        <div className="tui-bar-actions">
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
      </header>
      <Terminal />
    </div>
  )
}
