import type { LucideIcon } from 'lucide-react'
import { Code2, Palette, Wrench, Layers } from 'lucide-react'

export interface SkillCategory {
  id:     string
  label:  string
  icon:   LucideIcon
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id:     'frontend',
    label:  'Frontend Core',
    icon:   Code2,
    skills: ['JavaScript (ES2020+)', 'TypeScript', 'React.js', 'HTML5', 'CSS3'],
  },
  {
    id:     'styling',
    label:  'Styling & UI',
    icon:   Palette,
    skills: ['Tailwind CSS', 'Bootstrap' ,'CSS / SASS', 'Framer Motion', 'CSS Modules', 'Styled Components'],
  },
  {
    id:     'architecture',
    label:  'Architecture',
    icon:   Layers,
    skills: ['Component Architecture', 'REST APIs', 'React Hook Form + Zod', 'Performance Optimization', 'Web Accessibility (WCAG)'],
  },
  {
    id:     'tools-workflow',
    label:  'Tools & Workflow',
    icon:   Code2,
    skills: ['Git & GitHub', 'npm Basics', 'Agile (basic understanding)', 'Code Reviews' ,'Version Control' ,'Docker (basic)' ],
  },
  {
    id:     'Productivity-Tools',
    label:  'Productivity Tools',
    icon:   Code2,
    skills: ['Figma (basic)', 'VS Code', 'VS Code Shortcuts'],
  },
  {
    id:     'debugging-devtools',
    label:  'Debugging & DevTools',
    icon:   Code2,
    skills: ['Chrome DevTools (Performance, Network, Console)', 'Debugging & Optimization'],
  },
    {
    id:     'Build Tools',
    label:  'Tools',
    icon:   Wrench,
    skills: ['Vite', 'Webpack'],
  },
  {
    id:     'ui-ux-principles',
    label:  'UI/UX & Principles',
    icon:   Wrench,
    skills: ['Pixel-Perfect Implementation', 'Basic Accessibility (a11y)'],
  },
]
