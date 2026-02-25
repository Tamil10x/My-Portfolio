"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function SectionHeading({
  title,
  subtitle,
  number,
}: {
  title: string
  subtitle: string
  number: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const numberEl = container.querySelector('.sh-number')
    const lineEl = container.querySelector('.sh-line')
    const titleChars = container.querySelectorAll('.sh-char')
    const subtitleEl = container.querySelector('.sh-subtitle')

    const ctx = gsap.context(() => {
      // Number reveal with clipPath wipe
      if (numberEl) {
        gsap.fromTo(
          numberEl,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // Gradient line draws from left
      if (lineEl) {
        gsap.fromTo(
          lineEl,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              once: true,
            },
            delay: 0.2,
          }
        )
      }

      // Character-split title with 3D rotation cascade
      if (titleChars.length > 0) {
        gsap.fromTo(
          titleChars,
          { rotateX: -60, opacity: 0, y: 40, transformPerspective: 800 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              once: true,
            },
            delay: 0.1,
          }
        )
      }

      // Subtitle fade
      if (subtitleEl) {
        gsap.fromTo(
          subtitleEl,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              once: true,
            },
            delay: 0.4,
          }
        )
      }
    }, container)

    return () => ctx.revert()
  }, [])

  const titleChars = title.split('')

  return (
    <div ref={containerRef} className="section-heading mb-16 md:mb-24">
      <div className="flex items-center gap-4 mb-4">
        <span className="sh-number text-sm font-mono tracking-wider gradient-text-animated">
          {number}
        </span>
        <div className="sh-line gradient-line flex-1 max-w-32" />
      </div>
      <h2
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
        style={{ color: 'oklch(0.95 0.01 260)' }}
      >
        {titleChars.map((char, i) => (
          <span
            key={i}
            className="sh-char inline-block"
            style={{ opacity: 0 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
      <p
        className="sh-subtitle mt-4 text-lg md:text-xl font-light tracking-wide"
        style={{ color: 'oklch(0.5 0.05 260)', opacity: 0 }}
      >
        {subtitle}
      </p>
    </div>
  )
}
