import type { Line, Segment, Style } from './types'

export const t = (text: string, style?: Style): Segment => ({ text, style })
export const link = (text: string, href: string, download?: string): Segment => ({ text, href, download })
export const copy = (text: string, value: string): Segment => ({ text, copy: value })
export const cmd = (text: string, command: string, style?: Style): Segment => ({ text, command, style })

export const line = (...parts: (Segment | string)[]): Line => ({
  segments: parts.map((p) => (typeof p === 'string' ? { text: p } : p)),
})

export const blank = (): Line => line('')
export const heading = (text: string): Line => line(t(text, 'accent'))
export const err = (text: string): Line => line(t(text, 'err'))

export const bullet = (text: string): Line => ({
  segments: [{ text: '  - ' }, { text }],
  hang: 4,
})

export const labeled = (label: string, ...parts: (Segment | string)[]): Line =>
  line('  ', t(`${label}: `, 'muted'), ...parts)

export const delayed = (l: Line, delay: number): Line => ({ ...l, delay })
