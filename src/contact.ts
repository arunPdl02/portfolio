import { content } from './content'

interface Note {
  to: string
  subject: string
  body: string
}

export function buildNote(input: { name: string; email: string; message: string }): Note {
  const name = input.name.trim()
  const email = input.email.trim()
  const message = input.message.trim()
  return {
    to: content.profile.email,
    subject: name ? `Hey Arun, it's ${name}` : 'Hey Arun!',
    body: [message, email && `You can reach me at ${email}`].filter(Boolean).join('\n\n'),
  }
}

export function gmailUrl({ to, subject, body }: { to: string; subject?: string; body?: string }): string {
  const q = [`view=cm`, `fs=1`, `to=${encodeURIComponent(to)}`]
  if (subject) q.push(`su=${encodeURIComponent(subject)}`)
  if (body) q.push(`body=${encodeURIComponent(body)}`)
  return `https://mail.google.com/mail/?${q.join('&')}`
}

export const noteAsText = ({ to, subject, body }: Note): string => `To: ${to}\nSubject: ${subject}\n\n${body}`

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
