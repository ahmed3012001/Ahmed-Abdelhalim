import type React from 'react'
import { useEffect, useRef } from 'react'
import { Code2, Briefcase, Phone, Mail, Send } from 'lucide-react'

const ICONS = [Code2, Briefcase, Phone, Mail, Send, Code2]

export default function Dock(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const pointerX = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)
  // Track animated values per-item to smooth between frames
  const currentScales = useRef<number[]>([])
  const currentYs = useRef<number[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = itemRefs.current
    const maxDistance = 140
    const maxScale = 1.8
    const maxTranslate = 28
    const lerpFactor = 0.18 // smoothing

    // initialize arrays
    const count = items.length
    currentScales.current = new Array(count).fill(1)
    currentYs.current = new Array(count).fill(0)

    const animate = () => {
      // compute target values
      const rect = container.getBoundingClientRect()
      const px = pointerX.current != null ? pointerX.current - rect.left : null

      let anyActive = false

      for (let i = 0; i < items.length; i++) {
        const el = items[i]
        if (!el) continue
        const r = el.getBoundingClientRect()
        const centerX = r.left - rect.left + r.width / 2

        // distance-based influence
        const distance = px == null ? Infinity : Math.abs(px - centerX)
        const influence = Math.max(0, 1 - distance / maxDistance)
        const targetScale = 1 + influence * (maxScale - 1) // 1 -> maxScale
        const targetY = -influence * maxTranslate

        // lerp current values towards target for smooth spring-like motion
        const cs = currentScales.current[i] ?? 1
        const cy = currentYs.current[i] ?? 0
        const newScale = cs + (targetScale - cs) * lerpFactor
        const newY = cy + (targetY - cy) * lerpFactor
        currentScales.current[i] = newScale
        currentYs.current[i] = newY

        // apply transform
        el.style.transform = `translate3d(0, ${newY}px, 0) scale(${newScale})`
        el.style.zIndex = `${Math.round(newScale * 100)}`
        el.style.boxShadow = `0 ${4 + (newScale - 1) * 12}px ${10 + (newScale - 1) * 28}px rgba(2,6,23,${0.06 + (newScale - 1) * 0.12})`

        if (Math.abs(newScale - 1) > 0.001 || Math.abs(newY) > 0.5) anyActive = true
      }

      // continue animation while active
      if (anyActive || pointerX.current != null) {
        rafId.current = requestAnimationFrame(animate)
      } else {
        rafId.current = null
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      pointerX.current = e.clientX
      // ensure arrays length matches current items
      if (currentScales.current.length !== items.length) {
        currentScales.current = new Array(items.length).fill(1)
        currentYs.current = new Array(items.length).fill(0)
      }
      if (rafId.current == null) rafId.current = requestAnimationFrame(animate)
      // remove hard transitions for immediate responsiveness
      items.forEach((el) => { if (el) el.style.transition = '' })
    }

    const onPointerLeave = () => {
      // clear pointer and let animate lerp back to rest
      pointerX.current = null
      if (rafId.current == null) rafId.current = requestAnimationFrame(animate)
      // but also ensure a smooth reset finishes
      items.forEach((el) => {
        if (!el) return
        el.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 360ms'
        el.style.transform = 'translate3d(0,0,0) scale(1)'
        el.style.boxShadow = ''
        el.style.zIndex = ''
      })
      // clear transitions after reset
      window.setTimeout(() => items.forEach((el) => { if (el) el.style.transition = '' }), 460)
    }

    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerleave', onPointerLeave)
    container.addEventListener('pointercancel', onPointerLeave)

    // cleanup
    return () => {
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      container.removeEventListener('pointercancel', onPointerLeave)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
      // reset inline styles
      items.forEach((el) => {
        if (!el) return
        el.style.transform = ''
        el.style.transition = ''
        el.style.boxShadow = ''
        el.style.zIndex = ''
      })
    }
  }, [])

  return (
    <div className="mac-dock" ref={containerRef} aria-hidden="false">
      <div className="mac-dock-inner" role="navigation" aria-label="Application dock">
        {ICONS.map((IconComp, i) => (
          <div key={i} className="dock-item" ref={(el) => { itemRefs.current[i] = el }}>
            <div className="icon-wrap">
              <IconComp size={36} strokeWidth={1.6} aria-hidden="true" />
              <div className="reflection" aria-hidden="true">
                <IconComp size={36} strokeWidth={1.6} aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
