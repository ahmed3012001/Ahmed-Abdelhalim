import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'
import AIChatbot from './components/sections/AIChatbot'
import Intro from './components/sections/Intro'

// ─── Ambient orbs ─────────────────────────────────────────────────────────────
function AmbientOrbs() {
  return (
    <div className="bg-orbs" aria-hidden="true">
      <div className="orb orb-purple" />
      <div className="orb orb-indigo" />
      <div className="orb orb-cyan" />
      <div className="orb orb-pink" />
    </div>
  )
}

// ─── Session key ──────────────────────────────────────────────────────────────
// sessionStorage lives only for this browser tab/session.
// It survives React re-renders and SPA navigation,
// but is wiped on explicit refresh (F5 / Ctrl+R) and on tab close.
const SESSION_KEY = 'portfolio_intro_entered'

export default function App() {
  // Initialise from sessionStorage so a re-render never re-shows the Intro
  const [entered, setEntered] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      // Private-browsing environments may block sessionStorage
      return false
    }
  })
  const [fading, setFading] = useState(false)

  // Watch dark/light toggle so components re-render with correct CSS vars
  const [, forceUpdate] = useState(0)
  useEffect(() => {
    const obs = new MutationObserver(() => forceUpdate(n => n + 1))
    obs.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  function handleEnter() {
    setFading(true)
    setTimeout(() => {
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* ignore */ }
      setEntered(true)
    }, 400)
  }

  if (!entered) {
    return (
      <div style={{ transition: 'opacity 0.4s ease', opacity: fading ? 0 : 1 }}>
        <Intro onEnter={handleEnter} />
      </div>
    )
  }

  return (
    <>
      {/* Ambient orbs */}
      <AmbientOrbs />

      <Navbar />

      <main className="relative surface" style={{ zIndex: 1, position: 'relative' }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* AI Chatbot — floats over everything */}
      <AIChatbot />
    </>
  )
}
