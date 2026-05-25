import { Code2, Briefcase, Mail, Phone, Send } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface SocialLink {
  label: string
  href: string
  icon: LucideIcon
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/ahmed3012001',
    icon: Code2,
  },
  {
    label: 'Phone',
    href: 'tel:+201013054739',
    icon: Phone,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ahmedabdelhalim2001',
    icon: Briefcase,
  },
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=aabdelhalim961@gmail.com',
    icon: Mail,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ahmed.abdelhalim.233073',
    icon: Send,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/halimo_92/',
    icon: Send,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/Halimo_91',
    icon: Send,
  },
]

