// Single source of truth for the GUI and the TUI. Edit here; both update.
// Search for TODO to find anything still missing.

export interface Link {
  label: string
  url: string
}

export interface Profile {
  name: string
  /** One-liner used on the landing page. */
  tagline: string
  greeting: string
  intro: string
  /** The line under the hero intro: place · top tools · availability. */
  metaLine: string
  email: string
  github: string
  linkedin: string
}

export interface Resume {
  path: string
  filename: string
}

export interface SectionCopy {
  title: string
  subtitle: string
}

export interface Experience {
  role: string
  org: string
  location?: string
  dates: string
  bullets: string[]
  tech: string[]
  links: Link[]
}

export interface Leadership {
  role: string
  org: string
  dates: string
  description: string
}

export interface Project {
  slug: string
  name: string
  /** Hackathon / event name, shown as a small badge. */
  context?: string
  description: string
  tech: string[]
  links: Link[]
}

export interface ContactCopy {
  eyebrow: string
  heading: string
  subtitle: string
  reasonsTitle: string
  reasons: string[]
}

export interface Content {
  profile: Profile
  resume: Resume
  sections: { experience: SectionCopy; projects: SectionCopy; leadership: SectionCopy }
  experience: Experience[]
  featuredProjects: Project[]
  otherProjects: Project[]
  leadership: Leadership[]
  contact: ContactCopy
  /** Shown after the `guest@arunpaudel.com:~$` prompt in the GUI footer. */
  footerLine: string
}

export const content: Content = {
  profile: {
    name: 'Arun Paudel',
    tagline: 'Backend & ML/AI engineer · CS @ SFU · Seeking 2027 co-op/internships',
    greeting: "Hey, I'm Arun.",
    intro:
      "I'm a 4th-year CS student at SFU who likes building backends and ML pipelines that people actually use, from campus event kiosks to phishing detection research. Outside of code I run residence events and help keep res life a good place to live.",
    metaLine: 'Vancouver, BC · Python · Go · TypeScript · Open to 2027 co-op',
    email: 'mailarunpaudel@gmail.com',
    github: 'https://github.com/arunPdl02',
    linkedin: 'https://www.linkedin.com/in/arunPdl02',
  },

  resume: { path: '/resume.pdf', filename: 'Arun_Paudel_Resume.pdf' },

  sections: {
    experience: { title: 'experience', subtitle: "Where I've been shipping code lately." },
    projects: {
      title: 'projects',
      subtitle: 'Mostly hackathon builds and things I made because I wanted them to exist.',
    },
    leadership: { title: 'leadership', subtitle: 'The part where I help make residence feel like home.' },
  },

  experience: [
    {
      role: 'Backend Developer',
      org: 'SFU Computer Science Student Society (CSSS)',
      location: 'Vancouver, BC',
      dates: 'Apr 2026 – Present',
      bullets: [
        'Own the events backend behind sfucsss.org and the CSSS Common Room kiosk.',
        'Shipped a FastAPI + PostgreSQL events service with reversible Alembic migrations.',
        'Iterate through PR reviews with a senior developer.',
      ],
      tech: ['Python', 'FastAPI', 'PostgreSQL', 'Alembic'],
      links: [
        { label: 'Code', url: 'https://github.com/CSSS/csss-site-backend' },
        { label: 'Live', url: 'https://sfucsss.org/events/' },
      ],
    },
    {
      role: 'Capstone Research: PhishX & PhishForge',
      org: 'SFU',
      dates: 'Jan 2026 – Present',
      bullets: [
        'Turned published phishing models into deployable Python pipelines.',
        'Cut inference from 48s to 1.3s per URL (37×) with containers and model warmup, while keeping 97.85% F1.',
        'Built an evaluation harness and a generative benchmark-data pipeline for other researchers.',
      ],
      tech: ['Python', 'SPARQL', 'ChromaDB', 'Ollama', 'HPC', 'Apptainer'],
      links: [],
    },
  ],

  featuredProjects: [
    {
      slug: 'bleet',
      name: 'bLeet',
      context: 'nwHacks 2026',
      description:
        'LeetCode for 3D modeling in Blender, with live green/red vertex feedback and LLM-powered hints. I built the Next.js + MongoDB web app, the API, and the integration with the Python Blender add-on.',
      tech: ['Next.js', 'MongoDB', 'Python', 'FastAPI', 'Blender', 'Ollama'],
      links: [
        { label: 'Code', url: 'https://github.com/arunPdl02/nwHacks' },
        { label: 'Devpost', url: 'https://devpost.com/software/bleet' },
        { label: 'Demo', url: 'https://www.youtube.com/watch?v=9xuOPX_LH7Q' },
      ],
    },
    {
      slug: 'budgetbrawl',
      name: 'BudgetBrawl',
      context: 'Mountain Madness 2026',
      description:
        "Turns your Google Calendar into spending predictions with Snowflake Cortex, then lets you bet friends you'll stay under budget.",
      tech: ['React', 'FastAPI', 'Snowflake Cortex', 'Google OAuth'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/BudgetBrawl' }],
    },
    {
      slug: 'easy-code',
      name: 'Easy Code',
      description:
        'A sandboxed command-line coding agent that uses Gemini function calling to inspect, edit, and run code inside a bounded directory.',
      tech: ['Python', 'Gemini API'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/easy-code' }],
    },
    {
      slug: 'clash-of-typers',
      name: 'Clash of Typers',
      description:
        'A real-time multiplayer typing game: race to break locks on a 5×5 grid, built on raw TCP sockets.',
      tech: ['Python', 'TCP sockets'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/ClashOfTypers' }],
    },
  ],

  otherProjects: [
    {
      slug: 'gator',
      name: 'Gator',
      description: 'A command-line RSS blog aggregator.',
      tech: ['Go', 'PostgreSQL'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/gator' }],
    },
    {
      slug: 'web-generator',
      name: 'Web Generator',
      description: 'A dependency-free static site generator in Python: Markdown to HTML via a template.',
      tech: ['Python'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/web_generator' }],
    },
    {
      slug: 'cable-tv-erp',
      name: 'Cable TV ERP',
      description: 'A full-stack ERP for cable TV operations, with a RAG chatbot over the business data.',
      tech: ['Python', 'Flask', 'MySQL', 'RAG'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/ERP-software' }],
    },
  ],

  leadership: [
    {
      role: 'VP Internal',
      org: 'SFU Residence Hall Association',
      dates: 'May 2025 – Present',
      description:
        'The student body that advocates for residents. I act as a bridge between residents and SFU Residence Management, plan events, maintain the RHA website, and hold office hours.',
    },
    {
      role: 'Area Coordinator',
      org: 'SFU Residence and Housing',
      dates: 'May 2026 – Present',
      description:
        'As an international student, SFU Residence has been my home since first year. I started as a Community (Resident) Advisor in January 2024 and have been working to make residence life better ever since. As Area Coordinator, I support a team of 9 Community Advisors with conflict resolution, programming and resident engagement, and I plan large-scale residence events, bringing staff together and coordinating logistics across teams.',
    },
  ],

  contact: {
    eyebrow: 'CONTACT',
    heading: "Let's grab a coffee.",
    subtitle:
      "Whether it's a project, a hackathon team, or a hobby you want company on, I'm always happy to chat. Bonus points if there's a bakery nearby.",
    reasonsTitle: 'Good reasons to reach out',
    reasons: [
      'You need an excuse for coffee and baked goods (so do I)',
      "You're building something and want a backend or ML person",
      'You need a teammate for a hackathon',
      'You want to nerd out about a hobby project',
    ],
  },

  footerLine: 'exit · built with way too much coffee',
}

/** `https://github.com/x` -> `github.com/x` */
export const displayUrl = (url: string): string => url.replace(/^https?:\/\/(www\.)?/, '')
