import type { Theme } from '../theme/ThemeContext'

export type Style = 'accent' | 'muted' | 'ok' | 'err' | 'cyan' | 'pink' | 'orange' | 'bold'

export interface Segment {
  text: string
  style?: Style
  href?: string
  download?: string
  command?: string
  copy?: string
}

export interface Line {
  segments: Segment[]
  delay?: number
  hang?: number
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
  usage?: string
  description: string
  run: (args: string[], ctx: CommandContext) => Line[] | Promise<Line[]>
}
