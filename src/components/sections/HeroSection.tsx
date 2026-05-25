import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { heroContainer, fadeInUp, fadeInRight } from '../../lib/motion'

const CODE_SNIPPET = `const engineer = {
  name: "Ahmed Abdelhalim",
  role: "Frontend Software Engineer",
  stack: [
    "React",
    "TypeScript",
    "Tailwind",
    "Bootstrap",
    "JavaScript",
    "CSS",
    "HTML",
  ],
  passion: "Pixel Perfection",
  build() {
    return this.passion
      + this.stack;
  }
};`

const socialLinks = [
  { label: 'Gemail',  href: 'mailto:aabdelhalim961@gmail.com', icon: 'gM' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/ahmedabdelhalim2001/', icon: 'in' },
  { label: 'GitHub',    href: 'https://github.com/ahmed3012001',   icon: 'gh' },
  { label: 'Facebook',  href: 'https://www.facebook.com/ahmed.abdelhalim.233073', icon: 'fb' },
  { label: 'Instagram', href: 'https://www.instagram.com/halimo_92/',icon: 'ins' },
]

// ─────────────────────────────────────────────────────────────────
// HeroTitle — UNIFIED
//
// All three lines ("Front-End", "Software", "Engineer") now share:
//   • the same gradient + sweep animation
//   • the same font-weight (900)
//   • the same animation behavior (full-line fade+slide — NO char-by-char,
//     which breaks background-clip:text on gradient lines)
//
// Each line gets a progressively longer delay so they cascade in nicely,
// but the motion type is identical for all three.
// ─────────────────────────────────────────────────────────────────
function HeroTitle({ reduced }: { reduced: boolean }) {
  const lines: { text: string; cls: string; delay: number }[] = [
    { text: 'Front-End',  cls: 'hero-title-line hero-title-line--gradient hero-title-line--first', delay: 0.14 },
    { text: 'Software',   cls: 'hero-title-line hero-title-line--gradient',                        delay: 0.30 },
    { text: 'Engineer',   cls: 'hero-title-line hero-title-line--gradient hero-title-line--sub',   delay: 0.46 },
  ]

  return (
    <h1
      id="hero-heading"
      aria-label="Front-End Software Engineer"
      className="hero-animated-title"
    >
      {lines.map(({ text, cls, delay }) => (
        <motion.span
          key={text}
          className={cls}
          initial={reduced ? undefined : { opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.span>
      ))}
    </h1>
  )
}

function NameBadge() {
  return (
    <div className="inline-block animated-gradient-border rounded-full p-[3px]">
      <span className="hero-name-badge-inner">
        Ahmed Mahmoud Abdelhalim
      </span>
    </div>
  )
}

export default function HeroSection() {
  const reduced = useReducedMotion()
  const cp = reduced ? {} : { variants: heroContainer, initial: 'hidden', animate: 'visible' }
  const ip = reduced ? {} : { variants: fadeInUp }
  const rp = reduced ? {} : { variants: fadeInRight }

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center"
    >
      <motion.div
        {...cp}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pb-20 lg:pb-0"
        style={{
          paddingTop: 'calc(var(--nav-height, 80px) + 32px)',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        {/* ── Left column ── */}
        <div className="flex-1 space-y-8 w-full">

          <motion.div {...ip} className="hero-name-badge-wrapper">
            <NameBadge />
          </motion.div>

          {/* Title renders outside the stagger container so its own
              per-line delays are respected independently */}
          <HeroTitle reduced={!!reduced} />

          <motion.p
            {...ip}
            className="text-lg md:text-xl font-light leading-relaxed max-w-xl"
            style={{ color: 'var(--text-muted)' }}
          >
            Architecting modern, responsive web experiences with technical
            precision. I build high-performance user interfaces that merge
            structural engineering with ethereal art.
          </motion.p>

          <motion.div {...ip} className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-headline font-semibold transition-all glow-hover"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              View Projects <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a
              href="/cv/ahmed-mahmoud-cv.pdf"
              download="Ahmed-CV.pdf"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border transition cv-btn"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div {...ip} className="flex items-center gap-3 pt-2">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  background: 'var(--card)',
                }}
              >
                {link.icon.toUpperCase()}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Code block ── */}
        <motion.div
          {...rp}
          className="flex-1 hidden lg:flex justify-center w-full max-w-md"
        >
          <div className="animated-gradient-border--slow rounded-3xl p-[3px] w-full">
            <div className="w-full rounded-3xl p-7 glass-panel agb-inner-panel">
              <div className="flex gap-2 mb-6" aria-hidden="true">
                <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(239,68,68,0.7)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(234,179,8,0.7)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(34,197,94,0.7)' }} />
              </div>
              <pre
                className="font-mono text-sm leading-relaxed overflow-x-auto"
                style={{ color: 'var(--text)' }}
              >
                <code>{CODE_SNIPPET}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
      </motion.div>
    </section>
  )
}
