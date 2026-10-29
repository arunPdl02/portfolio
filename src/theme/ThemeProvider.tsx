import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { writeStorage } from '../storage'
import { THEME_KEY, ThemeContext, type Theme } from './ThemeContext'

// index.html sets data-theme before first paint; start from whatever it set.
function initialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next
    writeStorage(THEME_KEY, next)
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme],
  )

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
