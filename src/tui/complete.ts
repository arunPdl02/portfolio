import type { Command } from './types'

export interface Completion {
  value: string
  options: string[]
}

function commonPrefix(words: string[]): string {
  let prefix = words[0] ?? ''
  for (const w of words) while (!w.startsWith(prefix)) prefix = prefix.slice(0, -1)
  return prefix
}

function pick(prefix: string, candidates: string[], head: string, trailing: string): Completion {
  const matches = candidates.filter((c) => c.startsWith(prefix.toLowerCase()))
  if (matches.length === 0) return { value: head + prefix, options: [] }
  if (matches.length === 1) return { value: head + matches[0] + trailing, options: matches }
  return { value: head + commonPrefix(matches), options: matches }
}

/** Tab completion for command names and for `project <name>` / `theme` / `sudo` arguments. */
export function complete(input: string, commands: Command[], projectSlugs: string[]): Completion {
  const match = /^(\S*)(\s+)(\S*)$/.exec(input)
  if (!match) {
    if (/\s/.test(input) || input === '') return { value: input, options: [] }
    const names = commands.flatMap((c) => [c.name, ...(c.aliases ?? [])])
    return pick(input, names, '', ' ')
  }
  const [, name, space, partial] = match
  const head = `${name}${space}`
  const argCandidates: Record<string, string[]> = {
    project: projectSlugs,
    copy: ['email'],
    contact: ['--copy'],
    theme: ['dark', 'light'],
    sudo: ['hire-arun'],
  }
  const candidates = argCandidates[name.toLowerCase()]
  return candidates ? pick(partial, candidates, head, '') : { value: input, options: [] }
}
