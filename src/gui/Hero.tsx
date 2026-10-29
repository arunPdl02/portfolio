import { content } from '../content'
import { mailtoUrl } from '../contact'
import { ExtLink } from './ui'

export default function Hero() {
  const { profile, resume } = content
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="label"># hello, world</p>
      <h1 id="hero-title" className="hero-name">
        {profile.name}
      </h1>
      <p className="hero-headline">{profile.headline}</p>
      <p className="hero-line">{profile.heroLine}</p>
      <div className="link-row">
        <a className="btn btn-primary" href={resume.path} download={resume.filename}>
          Resume
        </a>
        <ExtLink className="btn" href={mailtoUrl(profile.email)}>
          Email
        </ExtLink>
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
