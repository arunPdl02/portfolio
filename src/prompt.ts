import type { Segment } from './tui/types'

export const PROMPT_USER = 'guest@arunpaudel.com'

/** The shell prompt, shared by the TUI and the GUI (hero, contact card, footer). */
export const promptSegments = (path = '~'): Segment[] => [
  { text: PROMPT_USER, style: 'ok' },
  { text: ':' },
  { text: path, style: 'cyan' },
  { text: '$ ', style: 'pink' },
]
