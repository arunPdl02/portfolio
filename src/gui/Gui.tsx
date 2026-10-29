import { Contact, Footer } from './Contact'
import Education from './Education'
import { Experience, Leadership } from './Experience'
import Hero from './Hero'
import { OtherProjects, Projects } from './Projects'
import TerminalHint from './TerminalHint'
import Toolbox from './Toolbox'
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
        <Leadership />
        <Projects />
        <OtherProjects />
        <Toolbox />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
