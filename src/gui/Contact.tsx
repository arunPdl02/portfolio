import { content } from '../content'
import { gmailUrl, mailtoUrl } from '../contact'
import CopyButton from './CopyButton'
import { ExtLink, SectionHeading } from './ui'

export function Contact() {
  const { profile } = content
  return (
    <section aria-labelledby="contact">
      <SectionHeading id="contact">contact</SectionHeading>
      <p className="contact-line">Open to 2027 co-op/internship opportunities. Say hi:</p>
      <div className="link-row">
        <ExtLink className="btn btn-primary" href={mailtoUrl(profile.email)}>
          {profile.email}
        </ExtLink>
        <ExtLink className="btn" href={gmailUrl(profile.email)}>
          Open in Gmail ↗
        </ExtLink>
        <CopyButton text={profile.email} />
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

export function Footer() {
  return (
    <footer className="footer">
      <p>
        Theme: Dracula &amp; Alucard by the{' '}
        <a href="https://draculatheme.com" target="_blank" rel="noopener noreferrer">
          Dracula Theme team
        </a>
      </p>
      <p>© {new Date().getFullYear()} {content.profile.name}</p>
    </footer>
  )
}
