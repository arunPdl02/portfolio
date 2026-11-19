import { content } from '../content'
import PromptText from '../PromptText'
import { GitHubIcon, LinkedInIcon, DownloadIcon } from '../Icons'
import { ExtLink } from './ui'

export default function Hero() {
  const { profile, resume } = content
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="cmd-head hero-whoami" aria-hidden="true">
        <PromptText short />
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
          <DownloadIcon className="inline-icon" />
          Resume
        </a>
        <ExtLink className="btn" href={profile.github}>
          <GitHubIcon className="inline-icon" />
          GitHub
        </ExtLink>
        <ExtLink className="btn" href={profile.linkedin}>
          <LinkedInIcon className="inline-icon" />
          LinkedIn
        </ExtLink>
      </div>
    </section>
  )
}
