import { content } from '../content'
import PromptText from '../PromptText'
import { ExtLink } from './ui'

export default function Hero() {
  const { profile, resume } = content
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero-prompt" aria-hidden="true">
        <PromptText />
        whoami
        <span className="cursor" />
      </p>
      <h1 id="hero-title" className="hero-name">
        {profile.greeting}
      </h1>
      <p className="hero-line">{profile.intro}</p>
      <p className="hero-meta">{profile.metaLine}</p>
      <div className="link-row">
        <a className="btn btn-primary" href="#contact">
          Say hi
        </a>
        <a className="btn" href={resume.path} download={resume.filename}>
          Resume
        </a>
        <ExtLink className="btn" href={profile.github}>
          GitHub
        </ExtLink>
        <ExtLink className="btn" href={profile.linkedin}>
          LinkedIn
        </ExtLink>
      </div>
    </section>
  )
}
