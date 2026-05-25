import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface IconLinkProps {
  href:       string
  icon:       LucideIcon
  label:      string
  external?:  boolean
  className?: string
  size?:      number
}

export default function IconLink({
  href,
  icon: Icon,
  label,
  external,
  className,
  size = 20,
}: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center',
        'w-10 h-10 rounded-full',
        'border border-outline-variant/20',
        'text-on-surface-variant',
        'transition-all duration-200',
        'hover:border-outline-variant/50 hover:text-primary hover:bg-surface-container-high',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Icon size={size} aria-hidden="true" strokeWidth={1.5} />
    </a>
  )
}
