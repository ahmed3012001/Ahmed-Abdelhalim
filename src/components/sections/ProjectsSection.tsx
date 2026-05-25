import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Code2 } from 'lucide-react'
import { staggerContainer, fadeInUp, scaleIn, slideUpReveal } from '../../lib/motion'
import { projects } from '../../data/projects'
import Container from '../ui/Container'
export default function ProjectsSection() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced  = useReducedMotion()
  const ap = reduced ? {} : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }
  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
      className="py-24 lg:py-36 relative"
    >
      <Container>
        {/* Heading */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          {...ap}
          className="space-y-4 mb-20">
          <motion.p
            variants={reduced ? undefined : fadeInUp}
            className="font-label text-xs uppercase tracking-[0.18em]"
            style={{ color: 'var(--primary)' }}>
            03 / Work
          </motion.p>
          <motion.h2
            id="projects-heading"
            variants={reduced ? undefined : slideUpReveal}
            className="font-headline text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: 'var(--text)' }}>
            Featured Work
          </motion.h2>
          <motion.p
            variants={reduced ? undefined : fadeInUp} className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }} >
            A selection of premium digital products built with modern stacks.
          </motion.p>
        </motion.div>
        {/* Cards */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          {...ap}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            /*
              animated-gradient-border--hover:
                - No border visible at rest
                - Gradient border fades in on hover
                - agb-inner-card ensures opaque bg on article
                - No box-shadow, no background bloom
            */
            <div
              key={project.id}
              className="animated-gradient-border--hover rounded-3xl p-[3px] overflow-hidden">
              <motion.article
                variants={reduced ? undefined : scaleIn}
                custom={i}
                className="group relative flex flex-col rounded-[20px] overflow-hidden project-card agb-inner-card h-full">
                {/* Image area */}
                {/* Image area */}
              <div className="h-52 relative overflow-hidden rounded-t-[20px]">
              <img src={project.imageBg} alt={project.title} className="w-full h-full object-cover  transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0 project-card-overlay" />
              <div className="absolute top-4 right-5 font-headline font-bold text-6xl select-none" style={{ color: 'rgba(192,193,255,0.08)' }} aria-hidden="true">
              0{i + 1}
              </div>
                  <div className="absolute inset-0 project-card-overlay" />
                  <div className="absolute top-4 right-5 font-headline font-bold text-6xl select-none"
                    style={{ color: 'rgba(192,193,255,0.08)' }}
                    aria-hidden="true">
                    0{i + 1}
                  </div>
                </div>
                {/* Body */}
                <div className="p-7 flex flex-col flex-grow gap-5">
                  <div className="space-y-2">
                    <h3
                      className="font-headline text-xl font-bold transition-colors duration-200 group-hover:text-primary"
                      style={{ color: 'var(--text)' }}>
                      {project.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed line-clamp-3"
                      style={{ color: 'var(--text-muted)' }}>
                      {project.description}
                    </p>
                  </div>
                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="skill-chip inline-flex items-center px-3 py-1.5 rounded-full text-xs font-label font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Links */}
                  <div className="flex gap-5 pt-4 project-card-divider">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo of ${project.title}`}
                        className="flex items-center gap-1.5 font-headline font-semibold text-sm transition-colors duration-200 hover:opacity-80"
                        style={{ color: 'var(--primary)' }}>
                        Live Demo
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repo for ${project.title}`}
                        className="flex items-center gap-1.5 font-headline font-semibold text-sm transition-colors duration-200 hover:text-primary"
                        style={{ color: 'var(--text-muted)' }}>
                        Code
                        <Code2 size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
