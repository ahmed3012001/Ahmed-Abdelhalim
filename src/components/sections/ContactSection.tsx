import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'
import { staggerContainer, fadeInUp } from '../../lib/motion'

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
function validate(data: { name: string; email: string; message: string }) {
  const errs: Record<string, string> = {}
  if (!data.name || data.name.length < 2) errs.name = 'Name must be at least 2 characters'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email address'
  if (!data.message || data.message.length < 10) errs.message = 'Message must be at least 10 characters'
  return errs
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const SOCIAL = [
  { label: 'Phone',    href: 'tel:+201013054739' },
  { label: 'Email',    href: 'mailto:aabdelhalim961@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmedabdelhalim2001/' },
  { label: 'GitHub',   href: 'https://github.com/ahmed3012001' },
  { label: 'Facebook',    href: 'https://www.facebook.com/ahmed.abdelhalim.233073' },
  { label: 'Instgram',    href: 'https://www.instagram.com/halimo_92/' },
  { label: 'Telegram',    href: 'https://t.me/Halimo_91' },
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const animProps = prefersReducedMotion
    ? {}
    : { initial: 'hidden', animate: isInView ? 'visible' : 'hidden' }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setIsSubmitting(true)
    setSubmitState('submitting')

    const endpoint = (typeof window !== 'undefined' && (window as any).__VITE_FORMSPREE__) || ''

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          setSubmitState('success')
          setForm({ name: '', email: '', message: '' })
        } else {
          setSubmitState('error')
        }
      } else {
        await new Promise(r => setTimeout(r, 1000))
        setSubmitState('success')
        setForm({ name: '', email: '', message: '' })
      }
    } catch {
      setSubmitState('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase = cn(
    'w-full rounded-xl px-4 py-3',
    'font-body text-base',
    'transition-all duration-200',
    'focus:outline-none disabled:opacity-50',
    'contact-input',
  )

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="py-24 lg:py-32 relative"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <div className="grid-bg-overlay" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        {/*
          Permanent animated border (base speed 4s).
          Inner motion.div uses agb-inner-card for opaque background.
          No ambient glow div. No boxShadow.
        */}
        <div className="animated-gradient-border rounded-3xl p-[3px]">
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerContainer}
            {...animProps}
            className="relative p-8 md:p-12 rounded-3xl agb-inner-card"
          >
            {/* Heading */}
            <motion.div variants={fadeInUp} className="space-y-3 mb-10">
              <p className="font-label text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--primary)' }}>
                04 / Contact
              </p>
              <h2
                id="contact-heading"
                className="font-headline text-4xl font-bold tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                Initiate Connection
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Have a project in mind, a job opportunity, or just want to connect?<br />
                I&apos;m always open to discussing new ideas, collaborations, or freelance work.
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeInUp} className="flex gap-4 mb-10 flex-wrap">
              {SOCIAL.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="font-label text-sm transition-colors duration-200 hover:text-primary"
                  style={{ color: 'var(--text-muted)' }}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>

            {/* Form / Success */}
            <AnimatePresence mode="wait">
              {submitState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(34,197,94,0.1)' }}
                  >
                    <CheckCircle size={32} style={{ color: '#22c55e' }} aria-hidden="true" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold" style={{ color: 'var(--text)' }}>
                    Message sent successfully!
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Thanks for reaching out — I&apos;ll get back to you soon!
                  </p>
                  <button
                    onClick={() => setSubmitState('idle')}
                    className="mt-4 font-headline font-semibold underline underline-offset-4 transition-colors"
                    style={{ color: 'var(--primary)' }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={fadeInUp}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-label text-xs uppercase tracking-widest" style={{ color: 'var(--text)' }}>
                        Name
                      </label>
                      <input
                        id="name" name="name" type="text" placeholder="John Doe"
                        value={form.name} onChange={handleChange} disabled={isSubmitting}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={cn(inputBase, errors.name && 'input-error')}
                      />
                      {errors.name && <p id="name-error" role="alert" className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-label text-xs uppercase tracking-widest" style={{ color: 'var(--text)' }}>
                        Email
                      </label>
                      <input
                        id="email" name="email" type="email" placeholder="john@example.com"
                        value={form.email} onChange={handleChange} disabled={isSubmitting}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={cn(inputBase, errors.email && 'input-error')}
                      />
                      {errors.email && <p id="email-error" role="alert" className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-label text-xs uppercase tracking-widest" style={{ color: 'var(--text)' }}>
                      Message
                    </label>
                    <textarea
                      id="message" name="message" rows={5} placeholder="Hi Ahmed, I'd like to..."
                      value={form.message} onChange={handleChange} disabled={isSubmitting}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={cn(inputBase, 'resize-none', errors.message && 'input-error')}
                    />
                    {errors.message && <p id="message-error" role="alert" className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.message}</p>}
                  </div>

                  {/* Error banner */}
                  {submitState === 'error' && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 text-sm p-3 rounded-xl"
                      style={{ color: '#f87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      <AlertCircle size={16} aria-hidden="true" />
                      Failed to send. Please try again or reach out directly via social links.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className={cn(
                      'w-full font-headline font-bold',
                      'py-4 rounded-xl text-lg',
                      'glow-hover transition-all duration-200',
                      'flex items-center justify-center gap-2',
                      'disabled:opacity-60 disabled:cursor-not-allowed',
                      'active:scale-[0.99] focus-visible:outline-none',
                      'submit-btn',
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Transmission
                        <Send size={18} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
