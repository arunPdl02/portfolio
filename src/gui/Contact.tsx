import { useEffect, useRef, useState, type FormEvent } from 'react'
import { buildNote, copyText, gmailUrl, noteAsText } from '../contact'
import { content, displayUrl } from '../content'
import PromptText from '../PromptText'

const { profile } = content

function EmailRow() {
  const [state, setState] = useState<'idle' | 'copied' | 'selected'>('idle')
  const textRef = useRef<HTMLSpanElement>(null)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    window.clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setState('copied')
      timer.current = window.setTimeout(() => setState('idle'), 1600)
    } catch {
      const el = textRef.current
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      setState('selected')
      timer.current = window.setTimeout(() => setState('idle'), 4000)
    }
  }

  const label = state === 'copied' ? '✓ copied' : state === 'selected' ? 'selected, ⌘/Ctrl+C' : 'copy'

  return (
    <li className="contact-row">
      <span className="contact-key">email</span>
      <span className="contact-val">
        <span ref={textRef} className="email-text">
          {profile.email}
        </span>
        <button type="button" className="copy-btn" onClick={copy}>
          {label}
        </button>
        <span className="sr-only" role="status">
          {state === 'copied' ? 'Email copied to clipboard' : state === 'selected' ? 'Email selected' : ''}
        </span>
      </span>
    </li>
  )
}

function NoteForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const gmailRef = useRef<HTMLAnchorElement>(null)

  const note = buildNote({ name, email, message })

  const copyNote = async () => {
    setStatus(
      (await copyText(noteAsText(note)))
        ? '✓ Note copied. Paste it anywhere.'
        : "Couldn't copy automatically. Use Open in Gmail instead.",
    )
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    gmailRef.current?.click()
  }

  return (
    <form className="term-col note-form" onSubmit={onSubmit}>
      <label className="field">
        <span>name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="field">
        <span>email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="field">
        <span>message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="A project, a hackathon idea, or your favourite bakery..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <div className="link-row">
        <a
          ref={gmailRef}
          className="btn btn-primary"
          href={gmailUrl(note)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setStatus('Opening Gmail in a new tab...')}
        >
          Open in Gmail
        </a>
        <button type="button" className="btn" onClick={copyNote}>
          Copy note
        </button>
      </div>
      <p className="note-hint">
        No mail app needed. Gmail opens in a new tab, or copy the note and paste it anywhere.
      </p>
      <p className="note-status" role="status">
        {status}
      </p>
    </form>
  )
}

export function Contact() {
  const { contact } = content
  return (
    <section id="contact" aria-labelledby="contact-title" className="contact">
      <p className="eyebrow">{contact.eyebrow}</p>
      <h2 id="contact-title" className="contact-heading">
        {contact.heading}
      </h2>
      <p className="contact-sub">{contact.subtitle}</p>

      <div className="term-card">
        <div className="term-bar">
          <span className="term-title">
            <PromptText path="~/contact" />
            ./say-hi.sh
          </span>
          <span className="term-shell">bash</span>
        </div>
        <div className="term-body">
          <div className="term-col">
            <h3>{contact.reasonsTitle}</h3>
            <ul className="reasons">
              {contact.reasons.map((r) => (
                <li key={r}>
                  <span className="check" aria-hidden="true">
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <ul className="contact-rows">
              <EmailRow />
              <li className="contact-row">
                <span className="contact-key">github</span>
                <span className="contact-val">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    {displayUrl(profile.github)}
                  </a>
                </span>
              </li>
              <li className="contact-row">
                <span className="contact-key">linkedin</span>
                <span className="contact-val">
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    {displayUrl(profile.linkedin)}
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <NoteForm />
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-main">
        <PromptText />
        {content.footerLine}
      </p>
      <p className="footer-credit">
        Theme: Dracula &amp; Alucard by the{' '}
        <a href="https://draculatheme.com" target="_blank" rel="noopener noreferrer">
          Dracula Theme team
        </a>{' '}
        · © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
