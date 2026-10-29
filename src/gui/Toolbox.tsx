import { content } from '../content'
import { toolIcons } from './toolIcons'

export default function Toolbox() {
  const { subtitle, items } = content.toolbox
  return (
    <section aria-labelledby="toolbox">
      <div className="card toolbox">
        <h2 id="toolbox" className="section-title">
          <span className="prompt" aria-hidden="true">
            &gt;
          </span>{' '}
          Toolbox
        </h2>
        <p className="toolbox-sub">{subtitle}</p>
        <ul className="chips">
          {items.map(({ name, icon }) => {
            const Icon = icon ? toolIcons[icon] : undefined
            return (
              <li key={name} className="chip">
                {Icon ? (
                  <Icon className="chip-icon" aria-hidden="true" />
                ) : (
                  <span className="chip-icon chip-text" aria-hidden="true">
                    {name.slice(0, 2)}
                  </span>
                )}
                {name}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
