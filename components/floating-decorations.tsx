"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FloatingDecorations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const els = containerRef.current!.querySelectorAll('.floating-el')
      els.forEach((el, i) => {
        // Each element moves at a different parallax speed
        gsap.to(el, {
          y: `${-150 - i * 60}`,
          x: `${(i % 2 === 0 ? 1 : -1) * (20 + i * 10)}`,
          rotation: i % 2 === 0 ? 360 : -360,
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5 + i * 0.4,
          },
        })

        // Subtle floating animation independent of scroll
        gsap.to(el, {
          y: `+=${10 + i * 3}`,
          x: `+=${5 + i * 2}`,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Glowing dots */}
      <div className="floating-el absolute top-[12%] right-[8%] w-1.5 h-1.5 rounded-full" style={{ background: 'oklch(0.65 0.25 260 / 0.4)', boxShadow: '0 0 20px oklch(0.65 0.25 260 / 0.3)' }} />
      <div className="floating-el absolute top-[28%] left-[4%] w-2 h-2 rounded-full" style={{ background: 'oklch(0.55 0.28 200 / 0.35)', boxShadow: '0 0 18px oklch(0.55 0.28 200 / 0.25)' }} />
      <div className="floating-el absolute top-[78%] right-[6%] w-1 h-1 rounded-full" style={{ background: 'oklch(0.55 0.28 200 / 0.3)' }} />
      <div className="floating-el absolute top-[18%] left-[38%] w-1 h-1 rounded-full" style={{ background: 'oklch(0.65 0.25 260 / 0.5)', boxShadow: '0 0 10px oklch(0.65 0.25 260 / 0.4)' }} />

      {/* Lines */}
      <div className="floating-el absolute top-[48%] right-[12%] w-px h-24 rotate-45" style={{ background: 'linear-gradient(180deg, oklch(0.65 0.25 260 / 0.15), transparent)' }} />
      <div className="floating-el absolute top-[38%] left-[82%] w-px h-20" style={{ background: 'linear-gradient(180deg, transparent, oklch(0.55 0.28 200 / 0.12), transparent)' }} />

      {/* Geometric shapes */}
      <div className="floating-el absolute top-[62%] left-[10%] w-3 h-3" style={{ border: '1px solid oklch(0.65 0.25 260 / 0.12)', transform: 'rotate(45deg)' }} />
      <div className="floating-el absolute top-[68%] left-[58%] w-4 h-4 rounded-full" style={{ border: '1px solid oklch(0.65 0.25 260 / 0.06)' }} />

      {/* Larger ambient orbs */}
      <div className="floating-el absolute top-[35%] right-[25%] w-32 h-32 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, oklch(0.65 0.25 260), transparent)', filter: 'blur(40px)' }} />
      <div className="floating-el absolute top-[75%] left-[20%] w-24 h-24 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, oklch(0.55 0.28 200), transparent)', filter: 'blur(30px)' }} />

      {/* Cross shapes */}
      <div className="floating-el absolute top-[55%] left-[90%]">
        <div className="w-3 h-px" style={{ background: 'oklch(0.65 0.25 260 / 0.15)' }} />
        <div className="w-px h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: 'oklch(0.65 0.25 260 / 0.15)' }} />
      </div>
    </div>
  )
}
