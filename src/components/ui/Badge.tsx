import { cn } from '../../lib/utils'

interface BadgeProps {
  label: string
  className?: string
  size?: 'sm' | 'md'
}

export default function Badge({ label, className, size = 'md' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-label font-medium',
        'bg-surface-container-highest text-on-surface-variant',
        'transition-colors duration-150',
        size === 'sm' && 'px-3 py-1 text-xs',
        size === 'md' && 'px-4 py-1.5 text-sm',
        className,
      )}
    >
      {label}
    </span>
  )
}
