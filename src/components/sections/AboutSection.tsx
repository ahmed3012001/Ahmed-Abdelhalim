import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from '../../animations/motionVariants'
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div className="space-y-2 mb-2">
      <p className="font-label text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--primary)' }}>
        {eyebrow}
      </p>
      <h2 id={id} className="font-headline text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
        {title}
      </h2>
    </div>
  )
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4 sm:px-8">{children}</div>
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()
  const [openImage, setOpenImage] = useState(false)

  useEffect(() => {
    document.body.style.overflow = openImage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openImage])

  useEffect(() => {
    if (!openImage) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenImage(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [openImage])

  const animProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  return (
    <>
      <section
        id="about"
        ref={ref}
        aria-labelledby="about-heading"
        className="py-24 lg:py-32 bg-transparent relative"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(75,77,216,0.05) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        <Container>
          <motion.div
            variants={staggerContainer}
            {...animProps}
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
          >
            {/* ── Left: Profile Image ── */}
            <motion.div
              variants={fadeInLeft}
              className="flex-shrink-0 w-full lg:w-72 xl:w-80"
            >
              <div className="relative mx-auto w-64 h-64 lg:w-72 lg:h-72">
                {/*
                  animated-gradient-border--slow: same glow as project/skill cards.
                  p-[4px]: thicker border stroke, consistent with all other cards.
                */}
                <div className="animated-gradient-border animated-gradient-border--slow rounded-2xl p-[4px]">
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden cursor-pointer group relative"
                    onClick={() => setOpenImage(true)}
                    role="button"
                    tabIndex={0}
                    aria-label="Open profile photo"
                    onKeyDown={e => e.key === 'Enter' && setOpenImage(true)}
                    style={{ background: 'var(--card)' }}
                  >
                    <img
                      src="/my-photo.jpg"
                      alt="Ahmed Abdelhalim"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(0,0,0,0.30)' }}
                    >
                      <span className="text-white text-xs tracking-widest uppercase font-semibold">View</span>
                    </div>
                  </div>
                </div>

                {/* Corner accent glow */}
                <div
                  className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, #c0c1ff, #4b4dd8)',
                    opacity: 0.18,
                    filter: 'blur(12px)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* ── Right: Text ── */}
            <motion.div variants={fadeInRight} className="flex-1 space-y-6">
              <motion.div variants={staggerContainer} {...animProps}>
                <SectionHeading
                  eyebrow="01 / About"
                  title="About Me"
                  id="about-heading"
                />
              </motion.div>

              <motion.div variants={staggerContainer} className="space-y-5 mt-[-12px]">
                {[
                  `I'm a Front-End Software Engineer focused on building fast, scalable, and accessible web interfaces. I work primarily with React and TypeScript, and I care deeply about turning design systems into real, production-ready UI with strong attention to performance and usability.\n\nMy experience includes building reusable components, optimizing rendering performance, and ensuring responsive layouts across devices.\n\nI value clean architecture, consistency in UI systems, and delivering interfaces that feel smooth and intentional to use.`,
                  `My core stack is built on strong fundamentals in HTML, CSS, and JavaScript, along with modern tools like React and TypeScript. I also work comfortably with styling frameworks such as Tailwind CSS and Bootstrap.\n\nI work across the full UI layer — from building scalable design systems to optimizing performance and ensuring accessibility in production-grade interfaces.`,
                  `Outside of code, I'm drawn to good design in all forms — from minimal product interfaces to thoughtful typography.`,
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    variants={fadeInUp}
                    className="leading-relaxed text-base whitespace-pre-line"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>

              {/* Tech stack row */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 pt-4">
                {[
                  { metric: 'HTML',       label: 'Markup Language' },
                  { metric: 'CSS',        label: 'Styling Language' },
                  { metric: 'JavaScript', label: 'Core Language' },
                  { metric: 'Bootstrap',  label: 'CSS Framework' },
                  { metric: 'Tailwind',   label: 'Styling System' },
                  { metric: 'TypeScript', label: 'Daily Language' },
                  { metric: 'React',      label: 'Primary Stack' },
                ].map((item) => (
                  <div key={item.metric} className="flex flex-col gap-1">
                    <span className="font-headline font-bold text-xl" style={{ color: 'var(--primary)' }}>
                      {item.metric}
                    </span>
                    <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {openImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 flex items-center justify-center"
            style={{
              zIndex: 99999,
              background: 'rgba(0,0,0,0.80)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            onClick={() => setOpenImage(false)}
          >
            <button
              onClick={e => { e.stopPropagation(); setOpenImage(false) }}
              aria-label="Close image"
              style={{
                position: 'fixed',
                top: 20,
                right: 24,
                zIndex: 100000,
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.30)',
                background: 'rgba(0,0,0,0.60)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#fff',
                fontSize: 20,
                fontWeight: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                lineHeight: 1,
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.transform = 'scale(1.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.60)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              ✕
            </button>

            <motion.img
              src="/my-photo.jpg"
              alt="Ahmed Abdelhalim — profile photo"
              initial={{ scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '82vw',
                maxHeight: '82vh',
                objectFit: 'contain',
                borderRadius: 16,
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                cursor: 'default',
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                position: 'fixed',
                bottom: 28,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.4)',
                fontSize: 11,
                letterSpacing: '0.14em',
                fontFamily: 'monospace',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              ESC or click outside to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
