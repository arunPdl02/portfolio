import type { Segment } from './tui/types'

const PROMPT_USER = 'guest@arunpaudel.com'

export const promptSegments = (path = '~'): Segment[] => [
  { text: PROMPT_USER, style: 'ok' },
  { text: ':' },
  { text: path, style: 'cyan' },
  { text: '$ ', style: 'pink' },
]

export const shortPromptSegments = (path = '~'): Segment[] => promptSegments(path).slice(1)
