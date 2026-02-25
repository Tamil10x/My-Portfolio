"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progressRef.current) return

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]" style={{ background: 'oklch(0.1 0.02 260)' }}>
      <div
        ref={progressRef}
        className="h-full origin-left"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, oklch(0.65 0.25 260), oklch(0.55 0.28 200))',
          boxShadow: '0 0 10px oklch(0.65 0.25 260 / 0.5)',
        }}
      />
    </div>
  )
}
