import { content } from '../content'
import { Badge, ExtLink, LinkButtons, Section, Tags } from './ui'

export function Projects() {
  return (
    <Section id="projects" copy={content.sections.projects}>
      <div className="project-grid">
        {content.featuredProjects.map((p) => (
          <article key={p.slug} className="card">
            <header className="card-head">
              <h3>{p.name}</h3>
              {p.context ? <Badge>{p.context}</Badge> : null}
            </header>
            <p>{p.description}</p>
            <Tags items={p.tech} />
            <LinkButtons links={p.links} />
          </article>
        ))}
      </div>

      <details className="more">
        <summary>$ ls ./more-projects</summary>
        <ul className="more-list">
          {content.otherProjects.map((p) => (
            <li key={p.slug} className="more-row">
              <span className="more-name">{p.name}</span>
              <span className="more-desc">{p.description}</span>
              <span className="more-tech">{p.tech.join(' · ')}</span>
              {p.links[0] ? (
                <ExtLink href={p.links[0].url} className="btn btn-sm">
                  {p.links[0].label} ↗
                </ExtLink>
              ) : null}
            </li>
          ))}
        </ul>
      </details>
    </Section>
  )
}
