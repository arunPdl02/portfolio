import { useTheme } from './useTheme'

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button type="button" className={className} onClick={toggleTheme} aria-label={`Switch to ${next} theme`}>
      theme: {theme}
    </button>
  )
}
