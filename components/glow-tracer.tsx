"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function GlowTracer() {
  const tracerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tracerRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(tracerRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="glow-tracer hidden lg:block">
      <div
        ref={tracerRef}
        className="w-full h-full origin-top"
        style={{
          background: 'linear-gradient(180deg, transparent, oklch(0.65 0.25 260 / 0.6), oklch(0.55 0.28 200 / 0.4), transparent)',
          boxShadow: '0 0 12px oklch(0.65 0.25 260 / 0.4), 0 0 24px oklch(0.65 0.25 260 / 0.2)',
          transform: 'scaleY(0)',
        }}
      />
    </div>
  )
}
