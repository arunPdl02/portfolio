import { content } from '../content'
import { ExtLink, LinkButtons, SectionHeading, Tags } from './ui'

export function Projects() {
  return (
    <section aria-labelledby="projects">
      <SectionHeading id="projects">featured projects</SectionHeading>
      <div className="stack">
        {content.featuredProjects.map((p) => (
          <article key={p.slug} className="card">
            <header className="card-head">
              <h3>{p.name}</h3>
              {p.context ? <span className="badge">{p.context}</span> : null}
            </header>
            <p>{p.description}</p>
            {p.role ? (
              <p className="role">
                <span className="label">// my role</span> {p.role}
              </p>
            ) : null}
            <Tags items={p.tech} />
            <LinkButtons links={p.links} />
          </article>
        ))}
      </div>
    </section>
  )
}

export function OtherProjects() {
  return (
    <section aria-labelledby="other-projects">
      <SectionHeading id="other-projects">other projects</SectionHeading>
      <ul className="compact-list">
        {content.otherProjects.map((p) => (
          <li key={p.slug} className="compact-item">
            <div className="compact-main">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <Tags items={p.tech} />
            </div>
            {p.links[0] ? (
              <ExtLink href={p.links[0].url} className="btn btn-sm">
                {p.links[0].label} ↗
              </ExtLink>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
