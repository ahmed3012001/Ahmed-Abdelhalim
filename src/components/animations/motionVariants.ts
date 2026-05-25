import type { Variants } from 'framer-motion'

// ── Stagger containers ───────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
}

// ── Directional fade-ins ─────────────────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: -24, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -36, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 36, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Hero-specific ────────────────────────────────────────────────────────────
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

// ── Card hover spring ────────────────────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0,  scale: 1,    transition: { duration: 0.25, ease: 'easeOut' } },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } },
}

// ── Slide-up (modals / toasts) ───────────────────────────────────────────────
export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, y: 24,
    transition: { duration: 0.22, ease: 'easeIn' },
  },
}
