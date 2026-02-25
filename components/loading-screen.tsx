"use client"

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [, setProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Cinematic wipe transition
        gsap.to(containerRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete,
        })
      },
    })

    // Name reveal
    tl.fromTo(
      '.loader-name',
      { y: 40, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    )

    // Counter animation
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: function () {
          const val = Math.round(this.targets()[0].val)
          setProgress(val)
          if (counterRef.current) counterRef.current.textContent = `${val}`
          if (progressRef.current) progressRef.current.style.width = `${val}%`
        },
      },
      '-=0.5'
    )

    // Fade out text elements
    tl.to(
      '.loading-text',
      { y: -30, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power2.in' },
      '+=0.2'
    )

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, oklch(0.04 0.02 260), oklch(0.06 0.03 260))',
        clipPath: 'inset(0 0 0 0)',
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Name */}
        <div className="loader-name" style={{ opacity: 0 }}>
          <span className="text-sm tracking-[0.5em] uppercase" style={{ color: 'oklch(0.4 0.1 260)' }}>
            Portfolio of
          </span>
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-2">
          <span
            ref={counterRef}
            className="loading-text text-8xl md:text-9xl font-bold tracking-tighter tabular-nums"
            style={{ color: 'oklch(0.65 0.25 260)' }}
          >
            0
          </span>
          <span className="loading-text text-3xl font-light" style={{ color: 'oklch(0.4 0.1 260)' }}>
            %
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-px relative overflow-hidden" style={{ background: 'oklch(0.15 0.03 260)' }}>
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full"
            style={{
              width: '0%',
              background: 'linear-gradient(90deg, oklch(0.65 0.25 260), oklch(0.75 0.15 200))',
              boxShadow: '0 0 30px oklch(0.65 0.25 260 / 0.5)',
            }}
          />
        </div>

        {/* Status text */}
        <p className="loading-text text-xs tracking-[0.4em] uppercase" style={{ color: 'oklch(0.35 0.05 260)' }}>
          Initializing cinematic experience
        </p>
      </div>
    </div>
  )
}
