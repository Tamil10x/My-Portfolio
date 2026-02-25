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

    const els = containerRef.current.querySelectorAll('.sh-animate')

    gsap.fromTo(
      els,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <div ref={containerRef} className="mb-16 md:mb-24">
      <div className="flex items-center gap-4 mb-4">
        <span
          className="sh-animate text-sm font-mono tracking-wider"
          style={{ color: 'oklch(0.65 0.25 260)' }}
        >
          {number}
        </span>
        <div className="sh-animate gradient-line flex-1 max-w-32" />
      </div>
      <h2
        className="sh-animate text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
        style={{ color: 'oklch(0.95 0.01 260)' }}
      >
        {title}
      </h2>
      <p
        className="sh-animate mt-4 text-lg md:text-xl font-light tracking-wide"
        style={{ color: 'oklch(0.5 0.05 260)' }}
      >
        {subtitle}
      </p>
    </div>
  )
}
