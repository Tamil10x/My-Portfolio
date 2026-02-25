"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TECH_ITEMS = [
  'React.js', 'Next.js', 'TypeScript', 'Firebase', 'GraphQL', 'Tailwind CSS',
  'Redux', 'Docker', 'Node.js', 'Python', 'Flutter', 'Cypress',
  'Three.js', 'GSAP', 'WebSockets', 'Vitest', 'Kubernetes', 'PostgreSQL',
]

export function TechMarquee() {
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (row1Ref.current) {
      gsap.to(row1Ref.current, {
        xPercent: -50,
        duration: 30,
        ease: 'linear',
        repeat: -1,
      })
    }
    if (row2Ref.current) {
      gsap.to(row2Ref.current, {
        xPercent: 50,
        duration: 35,
        ease: 'linear',
        repeat: -1,
      })
    }
  }, [])

  return (
    <div className="py-16 overflow-hidden relative">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10"
        style={{ background: 'linear-gradient(90deg, oklch(0.07 0.02 260), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10"
        style={{ background: 'linear-gradient(270deg, oklch(0.07 0.02 260), transparent)' }}
      />

      {/* Row 1 */}
      <div ref={row1Ref} className="flex gap-6 mb-4 whitespace-nowrap" style={{ width: 'fit-content' }}>
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-2xl md:text-4xl font-bold tracking-tighter"
            style={{ color: i % 2 === 0 ? 'oklch(0.2 0.04 260)' : 'oklch(0.15 0.03 260)' }}
          >
            {item}
            <span style={{ color: 'oklch(0.3 0.1 260)', margin: '0 16px' }}>{'/'}</span>
          </span>
        ))}
      </div>

      {/* Row 2 */}
      <div ref={row2Ref} className="flex gap-6 whitespace-nowrap" style={{ width: 'fit-content', transform: 'translateX(-50%)' }}>
        {[...TECH_ITEMS.slice().reverse(), ...TECH_ITEMS.slice().reverse()].map((item, i) => (
          <span
            key={`r2-${item}-${i}`}
            className="text-2xl md:text-4xl font-bold tracking-tighter"
            style={{ color: i % 2 === 0 ? 'oklch(0.15 0.03 260)' : 'oklch(0.2 0.04 260)' }}
          >
            {item}
            <span style={{ color: 'oklch(0.25 0.08 200)', margin: '0 16px' }}>{'/'}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
