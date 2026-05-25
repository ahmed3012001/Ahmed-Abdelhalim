import { motion } from 'framer-motion'
import { fadeInUp } from '../../lib/motion'
import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  eyebrow?:   string
  title:      string
  subtitle?:  string
  centered?:  boolean
  id?:        string
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <motion.p
          variants={fadeInUp}
          className="font-label text-xs uppercase tracking-[0.15em] text-primary mb-4"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        id={id}
        variants={fadeInUp}
        className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-lg text-on-surface-variant max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
