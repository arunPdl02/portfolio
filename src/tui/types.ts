import type { Theme } from '../theme/ThemeContext'

export type Style = 'accent' | 'muted' | 'ok' | 'err' | 'cyan' | 'pink' | 'orange' | 'yellow' | 'bold' | 'chip'

export interface Segment {
  text: string
  style?: Style
  /** Renders as a link (mailto:, http(s), or a site path). */
  href?: string
  download?: string
  /** Renders as a button that runs this command line when clicked. */
  command?: string
}

export interface Line {
  segments: Segment[]
  /** ms to wait before this line appears (skipped on keypress / reduced motion). */
  delay?: number
  /** Hanging indent in characters, so wrapped bullets stay aligned. */
  hang?: number
  /** ASCII art: tight line height so glyph rows touch. */
  art?: boolean
}

export interface CommandContext {
  commands: Command[]
  theme: Theme
  setTheme: (theme: Theme) => void
  clear: () => void
  navigate: (to: string) => void
  downloadResume: () => void
}

export interface Command {
  name: string
  aliases?: string[]
  /** Shown in `help` instead of `name`, e.g. "project <name>". */
  usage?: string
  description: string
  run: (args: string[], ctx: CommandContext) => Line[]
}
