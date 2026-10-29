import { content } from '../content'
import { LinkButtons, Section, Tags } from './ui'

export function Experience() {
  return (
    <Section id="experience" copy={content.sections.experience}>
      <div className="stack">
        {content.experience.map((e) => (
          <article key={e.role} className="card">
            <header className="card-head">
              <h3>{e.role}</h3>
              <p className="meta">{e.dates}</p>
            </header>
            <p className="org">
              {e.org}
              {e.location ? <span className="meta"> · {e.location}</span> : null}
            </p>
            <ul className="bullets">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <Tags items={e.tech} />
            <LinkButtons links={e.links} />
          </article>
        ))}
      </div>
    </Section>
  )
}

export function Leadership() {
  return (
    <Section id="leadership" copy={content.sections.leadership}>
      <div className="stack">
        {content.leadership.map((l) => (
          <article key={l.role} className="card">
            <header className="card-head">
              <h3>{l.role}</h3>
              <p className="meta">{l.dates}</p>
            </header>
            <p className="org">{l.org}</p>
            <p>{l.description}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
