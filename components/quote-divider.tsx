"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface QuoteDividerProps {
  quote: string
  author: string
  highlightWords?: string[]
}

export function QuoteDivider({ quote, author, highlightWords = [] }: QuoteDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const words = containerRef.current!.querySelectorAll('.qd-word')
      const lines = containerRef.current!.querySelectorAll('.qd-line')
      const glow = containerRef.current!.querySelector('.qd-glow')

      // Word-by-word scroll-scrubbed reveal
      gsap.fromTo(
        words,
        { opacity: 0.08, filter: 'blur(6px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.03,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      )

      // Gradient lines draw in
      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1,
          },
        }
      )

      // Background glow parallax
      if (glow) {
        gsap.to(glow, {
          yPercent: -30,
          scale: 1.3,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })
      }

      // Author fade in
      gsap.fromTo(
        containerRef.current!.querySelector('.qd-author'),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            end: 'top 25%',
            scrub: 1,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const words = quote.split(' ')

  return (
    <div ref={containerRef} className="relative py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Parallax background glow */}
      <div
        className="qd-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, oklch(0.65 0.25 260 / 0.08), transparent)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Top gradient line */}
        <div
          className="qd-line gradient-line w-full max-w-xs mx-auto mb-10"
          style={{ transformOrigin: 'center' }}
        />

        {/* Quote */}
        <p className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-relaxed mb-6">
          <span style={{ color: 'oklch(0.5 0.03 260)' }}>&ldquo;</span>
          {words.map((word, i) => {
            const cleanWord = word.replace(/[.,!?"]/g, '')
            const isHighlight = highlightWords.some(hw => cleanWord.toLowerCase() === hw.toLowerCase())
            return (
              <span
                key={i}
                className={`qd-word inline-block mr-[0.3em] ${isHighlight ? 'gradient-text-animated' : ''}`}
                style={isHighlight ? undefined : { color: 'oklch(0.7 0.02 260)' }}
              >
                {word}
              </span>
            )
          })}
          <span style={{ color: 'oklch(0.5 0.03 260)' }}>&rdquo;</span>
        </p>

        {/* Author */}
        <p className="qd-author text-sm tracking-widest uppercase" style={{ color: 'oklch(0.45 0.1 260)' }}>
          — {author}
        </p>

        {/* Bottom gradient line */}
        <div
          className="qd-line gradient-line w-full max-w-xs mx-auto mt-10"
          style={{ transformOrigin: 'center' }}
        />
      </div>
    </div>
  )
}
