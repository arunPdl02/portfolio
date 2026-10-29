import type { ReactNode } from 'react'
import type { Link } from '../content'

export function ExtLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function Tags({ items }: { items: string[] }) {
  if (items.length === 0) return null
  return (
    <ul className="tags" aria-label="Tech">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

export function LinkButtons({ links }: { links: Link[] }) {
  if (links.length === 0) return null
  return (
    <div className="link-row">
      {links.map((l) => (
        <ExtLink key={l.url} href={l.url} className="btn btn-sm">
          {l.label} ↗
        </ExtLink>
      ))}
    </div>
  )
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="section-title">
      <span className="prompt" aria-hidden="true">
        &gt;
      </span>{' '}
      {children}
    </h2>
  )
}
