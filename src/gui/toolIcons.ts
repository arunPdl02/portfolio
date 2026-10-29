import type { IconType } from 'react-icons'
import {
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGo,
  SiLinux,
  SiNextdotjs,
  SiOllama,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTypescript,
} from 'react-icons/si'

// Individual imports keep the bundle tree-shaken. Keys match `icon` in content.ts;
// to add a tool, import its Si* icon here and reference the name in content.ts.
export const toolIcons: Record<string, IconType> = {
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGo,
  SiLinux,
  SiNextdotjs,
  SiOllama,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTypescript,
}
