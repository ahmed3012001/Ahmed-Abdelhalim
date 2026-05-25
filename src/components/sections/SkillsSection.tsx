import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { staggerContainer, fadeInUp, scaleIn, slideUp } from '../../lib/motion'
import { skillCategories } from '../../data/skills'

export default function SkillsSection() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced  = useReducedMotion()

  const ap = reduced ? {} : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <section
      id="skills"
      ref={ref}
      aria-labelledby="skills-heading"
      className="py-24 lg:py-36 relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        {/* Heading */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          {...ap}
          className="text-center mb-20 space-y-4"
        >
          <motion.p
            variants={reduced ? undefined : fadeInUp}
            className="font-label text-xs uppercase tracking-[0.18em]"
            style={{ color: 'var(--primary)' }}
          >
            02 / Skills
          </motion.p>

          <motion.h2
            id="skills-heading"
            variants={reduced ? undefined : slideUp}
            className="font-headline text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            Tech Stack
          </motion.h2>

          <motion.p
            variants={reduced ? undefined : fadeInUp}
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Technologies, tools, and workflows I use to build scalable and production-ready web applications.
          </motion.p>
        </motion.div>

        {/* Skill cards */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          {...ap}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon
            return (
              /*
                animated-gradient-border--hover:
                  - No border at rest (transparent)
                  - Gradient border fades in on hover via ::before opacity transition
                  - No glow, no background bloom
                  - Inner card uses agb-inner-card for opaque bg (blocks bleed-through)
              */
              <div
                key={cat.id}
                className="animated-gradient-border--hover rounded-3xl p-[3px]"
              >
                <motion.div
                  variants={reduced ? undefined : scaleIn}
                  custom={i}
                  className="group relative flex flex-col gap-6 p-7 rounded-3xl cursor-default skill-card agb-inner-card h-full"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 skill-icon-bg">
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" className="text-primary" />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-headline text-lg font-bold tracking-tight"
                    style={{ color: 'var(--text)' }}
                  >
                    {cat.label}
                  </h3>

                  {/* Divider */}
                  <div className="skill-card-divider h-px w-full" aria-hidden="true" />

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-chip inline-flex items-center px-3 py-1.5 rounded-full text-xs font-label font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
