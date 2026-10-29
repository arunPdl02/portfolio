import { BANNER_FULL, BANNER_SMALL } from '../banner'
import { copyText, gmailUrl } from '../contact'
import { content, displayUrl, type Project, type SectionCopy } from '../content'
import { saveMode } from '../mode'
import type { Theme } from '../theme/ThemeContext'
import { bullet, blank, cmd, copy, delayed, err, labeled, line, link, t } from './out'
import type { Command, Line } from './types'

const { profile, resume, contact } = content
const allProjects: Project[] = [...content.featuredProjects, ...content.otherProjects]
export const projectSlugs = allProjects.map((p) => p.slug)

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

function findProject(query: string): Project | undefined {
  const q = norm(query)
  if (!q) return undefined
  const exact = allProjects.find((p) => norm(p.slug) === q || norm(p.name) === q)
  if (exact) return exact
  const prefixed = allProjects.filter((p) => norm(p.slug).startsWith(q))
  return prefixed.length === 1 ? prefixed[0] : undefined
}

/** `> title` plus the friendly subtitle, mirroring the GUI section headings. */
const sectionHead = (copy: SectionCopy): Line[] => [
  line(t('> ', 'ok'), t(copy.title, 'bold')),
  line(t(copy.subtitle, 'muted')),
  blank(),
]

const linkLines = (links: { label: string; url: string }[]): Line[] =>
  links.map((l) => labeled(l.label, link(l.url, l.url)))

function projectDetail(p: Project): Line[] {
  return [
    line(t(p.name, 'accent'), p.context ? t(`  [${p.context}]`, 'orange') : ''),
    line(p.description),
    labeled('Tech', t(p.tech.join(', '), 'cyan')),
    ...linkLines(p.links),
  ]
}

function projectsOutput(): Line[] {
  const width = Math.max(...content.otherProjects.map((p) => p.slug.length)) + 2
  return [
    ...sectionHead(content.sections.projects),
    ...content.featuredProjects.flatMap((p): Line[] => [
      line(cmd(p.name, `project ${p.slug}`, 'accent'), p.context ? t(`  [${p.context}]`, 'orange') : ''),
      { segments: [{ text: '  ' }, { text: p.description }], hang: 2 },
      labeled('Tech', t(p.tech.join(', '), 'cyan')),
      blank(),
    ]),
    line(t('$ ls ./more-projects', 'ok')),
    ...content.otherProjects.map(
      (p): Line => ({
        segments: [
          { text: '  ' },
          cmd(p.slug, `project ${p.slug}`, 'cyan'),
          { text: ' '.repeat(width - p.slug.length) + p.description },
        ],
        hang: width + 2,
      }),
    ),
    blank(),
    line('Use ', t('project <name>', 'cyan'), ' for links and details, e.g. ', cmd('project bleet', 'project bleet', 'cyan')),
  ]
}

function contactOutput(): Line[] {
  return [
    line(t(contact.eyebrow, 'muted')),
    line(t(contact.heading, 'accent')),
    line(t(contact.subtitle, 'muted')),
    blank(),
    line(t(contact.reasonsTitle, 'bold')),
    ...contact.reasons.map((r): Line => ({ segments: [{ text: '  ' }, t('✓ ', 'ok'), { text: r }], hang: 4 })),
    blank(),
    line('  ', t('email:    ', 'muted'), profile.email, '  ', copy('[ copy ]', profile.email), ' ', link('[ Gmail ]', gmailUrl({ to: profile.email }))),
    line('  ', t('github:   ', 'muted'), link(displayUrl(profile.github), profile.github)),
    line('  ', t('linkedin: ', 'muted'), link(displayUrl(profile.linkedin), profile.linkedin)),
    blank(),
  ]
}

async function copyEmail(): Promise<Line[]> {
  if (await copyText(profile.email)) return [line(t('✓ copied to clipboard', 'ok'))]
  return [err("Couldn't copy automatically. Here's the address:"), line('  ', t(profile.email, 'cyan'))]
}

export function bootLines(narrow: boolean, touch: boolean): Line[] {
  const banner = (narrow ? BANNER_SMALL : BANNER_FULL).split('\n')
  return [
    ...banner.map((text, i) => ({ segments: [t(text, 'accent')], delay: i === 0 ? 0 : 45, art: true })),
    delayed(blank(), 150),
    delayed(line('Welcome! Type ', cmd('help', 'help', 'cyan'), ' to see available commands.'), 200),
    ...(touch ? [] : [delayed(line(t('Tab completes · ↑/↓ history · Ctrl+L clears', 'muted')), 80)]),
    blank(),
  ]
}

export const commands: Command[] = [
  {
    name: 'help',
    description: 'List available commands',
    run: (_args, ctx) => {
      const rows = ctx.commands.map((c) => {
        const label = c.usage ?? c.name
        const alias = c.aliases?.length ? ` (alias: ${c.aliases.join(', ')})` : ''
        return { c, label, text: `${c.description}${alias}` }
      })
      const width = Math.max(...rows.map((r) => r.label.length)) + 2
      // Two columns don't fit on a phone: stack the description under the name.
      if (window.matchMedia('(max-width: 639px)').matches) {
        return [
          line(t('Available commands:', 'accent')),
          ...rows.flatMap(({ c, label, text }) => [
            line('  ', cmd(label, c.name, 'cyan')),
            { segments: [t(`    ${text}`, 'muted')], hang: 4 },
          ]),
        ]
      }
      return [
        line(t('Available commands:', 'accent')),
        ...rows.map(({ c, label, text }) => ({
          segments: [
            { text: '  ' },
            cmd(label, c.name, 'cyan'),
            { text: ' '.repeat(width - label.length) + text },
          ],
          hang: width + 2,
        })),
      ]
    },
  },
  {
    name: 'whoami',
    description: 'A short intro',
    run: () => [
      line(t(profile.greeting, 'accent')),
      blank(),
      line(profile.intro),
      blank(),
      line(t(profile.metaLine, 'muted')),
      blank(),
      line(
        'Next: ',
        cmd('experience', 'experience', 'cyan'),
        ', ',
        cmd('projects', 'projects', 'cyan'),
        ', ',
        cmd('leadership', 'leadership', 'cyan'),
        ', ',
        cmd('contact', 'contact', 'cyan'),
      ),
    ],
  },
  {
    name: 'experience',
    description: 'Work and research experience',
    run: () => [
      ...sectionHead(content.sections.experience),
      ...content.experience.flatMap((e): Line[] => [
        line(t(e.role, 'accent'), ' @ ', t(e.org, 'cyan')),
        line(t(`  ${e.dates}${e.location ? ` · ${e.location}` : ''}`, 'muted')),
        ...e.bullets.map(bullet),
        labeled('Tech', t(e.tech.join(', '), 'cyan')),
        ...linkLines(e.links),
        blank(),
      ]),
    ],
  },
  {
    name: 'projects',
    description: 'Featured and other projects',
    run: projectsOutput,
  },
  {
    name: 'project',
    usage: 'project <name>',
    description: 'Details and links for one project',
    run: (args) => {
      if (args.length === 0) return [err('usage: project <name>'), blank(), ...projectsOutput()]
      const p = findProject(args.join(' '))
      if (!p) {
        return [
          err(`project not found: ${args.join(' ')}`),
          line('Try one of: ', t(projectSlugs.join(', '), 'cyan')),
        ]
      }
      return [...projectDetail(p), blank()]
    },
  },
  {
    name: 'leadership',
    description: 'Leadership roles',
    run: () => [
      ...sectionHead(content.sections.leadership),
      ...content.leadership.flatMap((l): Line[] => [
        line(t(l.role, 'accent'), ' · ', t(l.org, 'cyan')),
        line(t(`  ${l.dates}`, 'muted')),
        { segments: [{ text: '  ' }, { text: l.description }], hang: 2 },
        blank(),
      ]),
    ],
  },
  {
    name: 'contact',
    usage: 'contact [--copy]',
    description: 'Say hi: email, GitHub, LinkedIn',
    run: (args) => (args.includes('--copy') ? copyEmail() : contactOutput()),
  },
  {
    name: 'copy',
    usage: 'copy email',
    description: 'Copy my email address',
    run: (args) => (args[0]?.toLowerCase() === 'email' ? copyEmail() : [err('usage: copy email')]),
  },
  {
    name: 'resume',
    description: 'Download my resume',
    run: (_args, ctx) => {
      ctx.downloadResume()
      return [
        line('Downloading ', t(resume.filename, 'cyan'), '...'),
        line('If nothing happened: ', link(`${window.location.origin}${resume.path}`, resume.path, resume.filename)),
      ]
    },
  },
  {
    name: 'theme',
    usage: 'theme [dark|light]',
    description: 'Toggle or set the colour theme',
    run: (args, ctx) => {
      const arg = args[0]?.toLowerCase()
      if (arg !== undefined && arg !== 'dark' && arg !== 'light') return [err('usage: theme [dark|light]')]
      const next: Theme = arg ?? (ctx.theme === 'dark' ? 'light' : 'dark')
      ctx.setTheme(next)
      return [line('Theme set to ', t(next === 'dark' ? 'Dracula (dark)' : 'Alucard (light)', 'accent'))]
    },
  },
  {
    name: 'gui',
    description: 'Switch to the GUI version',
    run: (_args, ctx) => {
      saveMode('gui')
      ctx.navigate('/gui')
      return [line('Switching to GUI...')]
    },
  },
  {
    name: 'credits',
    description: 'Theme credits',
    run: () => [
      line('Theme: Dracula & Alucard by the ', link('Dracula Theme team', 'https://draculatheme.com')),
      line(t('https://draculatheme.com', 'muted')),
    ],
  },
  {
    name: 'clear',
    description: 'Clear the screen (Ctrl+L)',
    run: (_args, ctx) => {
      ctx.clear()
      return []
    },
  },
  {
    name: 'sudo',
    usage: 'sudo hire-arun',
    description: 'Try it. Recruiters only.',
    run: (args) => {
      const sub = args[0]?.toLowerCase()
      if (!sub) return [err('usage: sudo <command>'), line(t("Hint: you probably want 'sudo hire-arun'.", 'muted'))]
      if (sub !== 'hire-arun') {
        return [
          err(`sudo: ${args.join(' ')}: nice try.`),
          line(t('guest is not in the sudoers file. This incident will be reported to a very disappointed rubber duck.', 'muted')),
        ]
      }
      return [
        delayed(line('[sudo] password for recruiter: ********'), 400),
        delayed(line('Verifying caffeine levels... ', t('OK', 'ok')), 700),
        delayed(line('Compiling enthusiasm... ', t('OK', 'ok')), 700),
        delayed(line('Linking resume.pdf... ', t('OK', 'ok')), 600),
        delayed(line(t('Permission granted ✔', 'ok')), 600),
        delayed(blank(), 100),
        line('Send the offer to ', t(profile.email, 'cyan')),
        line('  ', link('[ Open in Gmail ]', gmailUrl({ to: profile.email, subject: "Let's talk" })), ' ', copy('[ copy email ]', profile.email)),
        blank(),
      ]
    },
  },
]

export function findCommand(name: string): Command | undefined {
  const n = name.toLowerCase()
  return commands.find((c) => c.name === n || c.aliases?.includes(n))
}
