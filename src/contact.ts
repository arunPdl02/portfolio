// mailto: only works if the visitor has a default mail app, so offer fallbacks too.

export const mailtoUrl = (email: string, subject?: string): string =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

export const gmailUrl = (email: string, subject?: string): string =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}${
    subject ? `&su=${encodeURIComponent(subject)}` : ''
  }`

/** Copies text to the clipboard; resolves false if the browser refuses. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fall back to a hidden textarea for insecure contexts / older browsers.
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    try {
      return document.execCommand('copy')
    } catch {
      return false
    } finally {
      el.remove()
    }
  }
}
