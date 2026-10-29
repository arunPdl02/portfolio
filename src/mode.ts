import { readStorage, writeStorage } from './storage'

export type Mode = 'gui' | 'tui'

const MODE_KEY = 'mode'

export function getSavedMode(): Mode | null {
  const saved = readStorage(MODE_KEY)
  return saved === 'gui' || saved === 'tui' ? saved : null
}

export function saveMode(mode: Mode): void {
  writeStorage(MODE_KEY, mode)
}

/** No saved preference, touch-first device, narrow screen. */
export function isFirstVisitOnPhone(): boolean {
  if (getSavedMode()) return false
  if (typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(pointer: coarse) and (max-width: 767px)').matches
}
