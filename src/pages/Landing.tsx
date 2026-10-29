import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className="placeholder">
      <h1>Arun Paudel</h1>
      <p>Portfolio under construction.</p>
      <nav>
        <Link to="/gui">[ GUI ]</Link> <Link to="/tui">[ TUI ]</Link>
      </nav>
    </main>
  )
}
