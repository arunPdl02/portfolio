import { content } from '../content'
import { SectionHeading } from './ui'

export default function Education() {
  return (
    <section aria-labelledby="education">
      <SectionHeading id="education">education</SectionHeading>
      <div className="stack">
        {content.education.map((e) => (
          <article key={e.school} className="card">
            <header className="card-head">
              <h3>{e.school}</h3>
              <p className="meta">Expected {e.graduation}</p>
            </header>
            <p className="org">
              {e.degree}
              {e.minor ? `, Minor in ${e.minor}` : ''}
              <span className="meta"> · {e.location}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
