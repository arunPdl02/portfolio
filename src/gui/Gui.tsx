import { Contact, Footer } from './Contact'
import { Experience, Leadership } from './Experience'
import Hero from './Hero'
import { Projects } from './Projects'
import TerminalHint from './TerminalHint'
import TopBar from './TopBar'
import './gui.css'

export default function Gui() {
  return (
    <div className="gui" id="top">
      <TopBar />
      <TerminalHint />
      <main className="gui-main">
        <Hero />
        <Experience />
        <Projects />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
