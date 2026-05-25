import { useEffect, useState } from 'react'
import {
  Menu, X,
  Home,
  User,
  Cpu,
  FolderOpen,
  Mail,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'
import { useTheme } from '../../theme/ThemeContext'



const NAV_LINKS = [
  { label: 'Home',     href: '#hero',     icon: Home       },
  { label: 'About',    href: '#about',    icon: User       },
  { label: 'Skills',   href: '#skills',   icon: Cpu        },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Contact',  href: '#contact',  icon: Mail       },
]

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [openImage, setOpenImage] = useState(false)
  const activeId                    = useScrollSpy(SECTION_IDS)

  // Track scroll so we can strengthen the backdrop when user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      {/* ── Navbar row ─────────────────────────────────────────
          The full-width row has a dark background so NO content
          bleeds through it while scrolling.
       ─────────────────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-3 transition-all duration-300"
        style={{
          /* Solid dark background that fully blocks scrolling content */
          background: scrolled
          ? 'var(--bg)'
          : 'var(--bg)',
          opacity: scrolled ? 0.95 : 0.85,
          backdropFilter:       'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled
           ? '1px solid var(--border)'
           : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 40px rgba(0,0,0,0.5)'
            : 'none',
        }}
      >
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
        {/* ── Logo ── */}
        <div className="flex flex-col items-start">
  <a href="#hero"
    onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
    className="font-headline font-bold text-lg tracking-tight text-primary hover:opacity-80 transition-opacity shrink-0"
  >
    Eng.Ahmed Abdelhalim
  </a>

<img
  src="/Icon.png"
  alt="Ahmed"
  onClick={() => setOpenImage(true)}
  className="w-12 h-12 rounded-full mt-2 object-cover border border-white/20 cursor-pointer hover:scale-105 transition"
/>
</div>

        {/* ── Center glass pill ── */}
        <div
          className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl mx-auto"
          style={{
            background: 'var(--card)',
            backdropFilter:       'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border)',
            boxShadow:            '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <NavPillItem
              key={link.href}
              link={link}
              isActive={activeId === link.href.slice(1)}
              onClick={handleNavClick}
            />
          ))}
        </div>

        {/* ── Right: CV + hamburger ── */}
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          href="/cv/Front-end-Developer-Ahmed-Mahmoud-Abdelhalim-cv.pdf"
          external
          className="hidden md:inline-flex"
        >
          View CV
        </Button>

        {/* Theme toggle (fixed inside navbar alignment) */}
        {(() => {
          const { mode, toggle } = useTheme()
          return (
            <button
              type="button"
              onClick={toggle}
              className="theme-btn hidden md:inline-flex items-center px-5 py-2 rounded-2xl font-bold"
              aria-label="Toggle theme"
            >
              <span className="leading-none">{mode === 'dark' ? '☀️ Light' : '🌙 Dark'}</span>
            </button>
          )
        })()}


        <button
          onClick={() => setIsMenuOpen((p) => !p)}
          className="md:hidden p-2 rounded-xl text-[var(--text)] opacity-70 hover:text-primary hover:bg-white/5 transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
        </div>
      </nav>


      {/* ── Mobile menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-[60px] left-0 right-0 z-40 md:hidden mx-4 rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg)',
              backdropFilter:       'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border:               '1px solid rgba(255,255,255,0.08)',
              boxShadow:            '0 20px 50px rgba(0,0,0,0.6)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.href.slice(1)
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-headline font-medium transition-all duration-200',
                      isActive
                        ? 'text-primary bg-white/5'
                        : 'text-[var(--text)] opacity-70 hover:text-primary hover:bg-white/5',
                    )}
                  >
                    <link.icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    {link.label}
                  </a>
                )
              })}
              <div className="pt-2 pb-1">
                <Button variant="primary" size="md" href="/cv/ahmed-mahmoud-cv.pdf" external className="w-full">
                  Download CV
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
  {openImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-surface-container-highest/70 dark:bg-black/95 flex items-center justify-center"
    >
      {/* Close button */}
      <button
        onClick={() => setOpenImage(false)}
      className="absolute top-6 right-6 text-on-surface text-4xl hover:text-primary transition"
      >
        ×
      </button>

      {/* Image */}
      <motion.img
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        src="/Icon.png"
        alt="Ahmed"
        className="max-w-[90%] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
      />
    </motion.div>
  )}
</AnimatePresence>
    </>
  )
}

/* ── NavPillItem ── slide-up icon animation ─────────────── */
interface NavPillItemProps {
  link:     { label: string; href: string; icon: React.ElementType }
  isActive: boolean
  onClick:  (href: string) => void
}

function NavPillItem({ link, isActive, onClick }: NavPillItemProps) {
  const Icon = link.icon
  return (
    <div className="relative">
      <a
        href={link.href}
        onClick={(e) => { e.preventDefault(); onClick(link.href) }}
        className="relative block overflow-hidden rounded-2xl"
        style={{ width: '96px', height: '44px' }}
        aria-label={link.label}
        aria-current={isActive ? 'page' : undefined}
      >
        {/* Slide container — 2 × 44px tall */}
        <div
          className="w-full transition-transform duration-500"
          style={{
            height:                   '88px',
            transform:                isActive ? 'translateY(-44px)' : 'translateY(0)',
            transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          }}
        >
          {/* Top slot: text */}
          <div className="flex items-center justify-center" style={{ height: '44px' }}>
            <span
              className={cn(
                'text-sm font-headline font-semibold tracking-wide transition-colors duration-300',
                isActive ? 'text-[var(--text)]' : 'text-[var(--text)] opacity-70',
              )}
            >
              {link.label}
            </span>
          </div>

          {/* Bottom slot: icon — slides up into view when active */}
          <div className="flex items-center justify-center" style={{ height: '44px' }}>
            <Icon
              size={19}
              strokeWidth={1.8}
              aria-hidden="true"
              className="text-primary drop-shadow-[0_0_8px_rgba(192,193,255,0.8)]"
            />
          </div>
        </div>

        {/* Hover bg */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        />
      </a>

      {/* Active glow indicator */}
      <div
        className="absolute -bottom-1 left-1/2 h-[3px] rounded-full"
        style={{
          width:              '20px',
          background:         'linear-gradient(to right, #c0c1ff, #4b4dd8)',
          boxShadow:          '0 0 10px rgba(192,193,255,0.9)',
          transform:          `translateX(-50%) scaleX(${isActive ? 1 : 0})`,
          transition:         'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      />
    </div>
  )
}
