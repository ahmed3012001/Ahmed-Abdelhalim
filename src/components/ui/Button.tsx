import { type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ButtonProps {
  variant?:  'primary' | 'secondary' | 'ghost'
  size?:     'sm' | 'md' | 'lg'
  href?:     string
  onClick?:  () => void
  disabled?: boolean
  loading?:  boolean
  children:  ReactNode
  className?: string
  type?:     'button' | 'submit' | 'reset'
  external?: boolean
  ariaLabel?: string
}

export default function Button({
  variant  = 'primary',
  size     = 'md',
  href,
  onClick,
  disabled,
  loading,
  children,
  className,
  type     = 'button',
  external,
  ariaLabel,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2',
    'font-headline font-bold transition-all duration-200 cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    size === 'sm' && 'px-5 py-2 text-sm rounded-full',
    size === 'md' && 'px-8 py-3.5 text-base rounded-full',
    size === 'lg' && 'px-10 py-4 text-lg rounded-full',
    variant === 'primary' && [
      'gradient-primary text-on-primary',
      'glow-hover',
      'active:scale-[0.97]',
    ],
    variant === 'secondary' && [
      'bg-transparent text-on-surface border border-outline-variant/20',
      'hover:bg-surface-container-high hover:border-outline-variant/40',
      'active:scale-[0.97]',
    ],
    variant === 'ghost' && [
      'bg-transparent text-on-surface-variant',
      'hover:text-on-surface hover:bg-surface-container-high',
    ],
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={base}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled ?? loading}
      className={base}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : children}
    </button>
  )
}
