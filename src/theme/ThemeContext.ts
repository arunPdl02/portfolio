import { createContext } from 'react'

export type Theme = 'dark' | 'light'

export const THEME_KEY = 'theme'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
