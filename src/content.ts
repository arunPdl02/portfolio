// Single source of truth for the GUI and the TUI. Edit here; both update.
// Search for TODO to find anything still missing.

export interface Link {
  label: string
  url: string
}

export interface Profile {
  name: string
  headline: string
  tagline: string
  heroLine: string
  summary: string
  location: string
  email: string
  github: string
  linkedin: string
}

export interface Resume {
  path: string
  filename: string
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

export interface Education {
  school: string
  location: string
  degree: string
  minor?: string
  graduation: string
}

export interface Project {
  slug: string
  name: string
  context?: string
  description: string
  role?: string
  tech: string[]
  links: Link[]
}

export interface ToolboxItem {
  name: string
  /** react-icons/si export name, e.g. 'SiPython'. Omit for a text badge. */
  icon?: string
}

export interface Content {
  profile: Profile
  resume: Resume
  experience: Experience[]
  leadership: Leadership[]
  education: Education[]
  featuredProjects: Project[]
  otherProjects: Project[]
  toolbox: { subtitle: string; items: ToolboxItem[] }
}

export const content: Content = {
  profile: {
    name: 'Arun Paudel',
    headline: 'Backend & ML/AI Engineer',
    tagline: 'Backend & ML/AI engineer · CS @ SFU · Seeking 2027 co-op/internships',
    heroLine: '4th-year CS student at SFU seeking 2027 co-op/internships.',
    summary:
      '4th-year Computer Science student at Simon Fraser University (Minor in Statistics) who builds things end to end, with a focus on backend systems and ML/AI pipelines. Seeking co-op/internship roles for 2027.',
    location: 'Burnaby, BC',
    email: 'mailarunpaudel@gmail.com',
    github: 'https://github.com/arunPdl02',
    linkedin: 'https://www.linkedin.com/in/arunPdl02',
  },

  resume: { path: '/resume.pdf', filename: 'Arun_Paudel_Resume.pdf' },

  experience: [
    {
      role: 'Backend Developer',
      org: 'SFU Computer Science Student Society (CSSS)',
      location: 'Burnaby, BC',
      dates: 'Apr 2026 to Present',
      bullets: [
        'Own the events section of the CSSS web backend, which serves both the sfucsss.org events page and the events kiosk in the CSSS Common Room.',
        'Shipped a FastAPI and PostgreSQL events service for kiosks displaying upcoming campus events.',
        'Refined implementations through GitHub pull request reviews with a senior developer to meet team standards.',
        'Structured event schemas and reversible Alembic migrations in PostgreSQL to support safe rollbacks.',
      ],
      tech: ['Python', 'FastAPI', 'PostgreSQL', 'Alembic'],
      links: [
        { label: 'Code', url: 'https://github.com/CSSS/csss-site-backend' },
        { label: 'Live', url: 'https://sfucsss.org/events/' },
      ],
    },
    {
      role: 'Capstone Research: PhishX & PhishForge',
      org: 'Simon Fraser University',
      // TODO: add location if wanted (not provided).
      dates: 'Jan 2026 to Present',
      bullets: [
        'Translated published phishing models into deployable Python pipelines under faculty supervision.',
        'Optimized model inference by 2.2× while maintaining 97.85% F1 through benchmarking.',
        'Accelerated inference with collaborators by 37× (48s to 1.3s per URL) via containers and model warmup.',
        'Created an extensible evaluation harness to benchmark generated datasets and document results for researchers.',
        'Devised a generative AI pipeline to produce benchmark data and document methods for fellow researchers.',
      ],
      tech: ['Python', 'SPARQL', 'ChromaDB', 'Ollama', 'HPC', 'Apptainer'],
      links: [],
    },
  ],

  leadership: [
    {
      role: 'Area Coordinator',
      org: 'SFU Residence and Housing',
      dates: 'May 2026 to Present',
      description: 'Coordinating a team of 9 Resident Advisors.',
    },
  ],

  education: [
    {
      school: 'Simon Fraser University',
      location: 'Burnaby, BC',
      degree: 'Bachelor of Applied Sciences in Computer Science',
      minor: 'Statistics',
      graduation: 'December 2027',
    },
  ],

  featuredProjects: [
    {
      slug: 'bleet',
      name: 'bLeet',
      context: 'nwHacks 2026 · team of 4',
      description:
        'LeetCode for 3D modeling in Blender: pick a problem on the web app, model it in Blender, and a custom add-on validates your vertices against the target with real-time green/red feedback and LLM-powered hints.',
      role: 'Built the Next.js + MongoDB web app and API, and the integration between the Python Blender add-on and the Next.js server.',
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
      // TODO: replace with the hackathon name if you want it shown.
      context: 'Hackathon project',
      description:
        "Turns your Google Calendar into spending predictions with Snowflake Cortex, then lets you bet friends you'll stay under budget.",
      tech: ['React', 'FastAPI', 'Snowflake Cortex', 'Google OAuth'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/BudgetBrawl' }],
    },
    {
      slug: 'easy-code',
      name: 'Easy Code',
      description:
        'A sandboxed command-line coding agent that uses Gemini function calling to inspect, edit, and run code safely inside a bounded directory.',
      tech: ['Python', 'Gemini API'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/easy-code' }],
    },
    {
      slug: 'clash-of-typers',
      name: 'Clash of Typers',
      description:
        'A real-time multiplayer typing game: race to break locks on a 5×5 grid, built on raw TCP sockets with a lobby and synchronized start.',
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
      description:
        'A dependency-free static site generator in Python that converts Markdown to HTML via a template, with unit tests (built through the Boot.dev course).',
      tech: ['Python'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/web_generator' }],
    },
    {
      slug: 'cable-tv-erp',
      name: 'Cable TV ERP',
      description:
        'A full-stack ERP for cable TV operations (customers, billing, inventory, support tickets) with a RAG chatbot that answers questions about the business data.',
      tech: ['Python', 'Flask', 'MySQL', 'RAG'],
      links: [{ label: 'Code', url: 'https://github.com/arunPdl02/ERP-software' }],
    },
  ],

  toolbox: {
    subtitle:
      'The stack I reach for to build backends, ML pipelines, and the occasional hackathon chaos.',
    items: [
      { name: 'Python', icon: 'SiPython' },
      { name: 'Go', icon: 'SiGo' },
      { name: 'TypeScript', icon: 'SiTypescript' },
      { name: 'Java' }, // no Simple Icons glyph: renders a text badge
      { name: 'C++', icon: 'SiCplusplus' },
      { name: 'FastAPI', icon: 'SiFastapi' },
      { name: 'PostgreSQL', icon: 'SiPostgresql' },
      { name: 'Docker', icon: 'SiDocker' },
      { name: 'React', icon: 'SiReact' },
      { name: 'Next.js', icon: 'SiNextdotjs' },
      { name: 'Ollama', icon: 'SiOllama' },
      { name: 'scikit-learn', icon: 'SiScikitlearn' },
      { name: 'Linux', icon: 'SiLinux' },
      { name: 'Git', icon: 'SiGit' },
    ],
  },
}
