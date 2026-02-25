"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '@/hooks/use-mobile'

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
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const words = containerRef.current!.querySelectorAll('.qd-word')
      const lines = containerRef.current!.querySelectorAll('.qd-line')
      const glow = containerRef.current!.querySelector('.qd-glow')
      const authorEl = containerRef.current!.querySelector('.qd-author')

      if (isMobile) {
        // Mobile: simple scrubbed reveal (no pin)
        gsap.fromTo(words, { opacity: 0.08, filter: 'blur(6px)' }, {
          opacity: 1, filter: 'blur(0px)', stagger: 0.03,
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%', end: 'top 30%', scrub: 1 },
        })
        gsap.fromTo(lines, { scaleX: 0 }, {
          scaleX: 1, stagger: 0.2,
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%', end: 'top 45%', scrub: 1 },
        })
        if (authorEl) {
          gsap.fromTo(authorEl, { opacity: 0, y: 10 }, {
            opacity: 1, y: 0,
            scrollTrigger: { trigger: containerRef.current, start: 'top 40%', end: 'top 25%', scrub: 1 },
          })
        }
        return
      }

      // Desktop: short pin with scrubbed timeline for breathing space between sections
      const tl = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=60%',
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          fastScrollEnd: true,
        },
      })

      // Word-by-word reveal scrubbed to scroll
      if (words.length > 0) {
        gsap.set(words, { opacity: 0.08, filter: 'blur(6px)' })
        tl.to(words, { opacity: 1, filter: 'blur(0px)', stagger: 0.02, duration: 0.6, ease: 'power2.out' }, 0)
      }

      // Gradient lines draw in
      if (lines.length > 0) {
        gsap.set(lines, { scaleX: 0 })
        tl.to(lines, { scaleX: 1, stagger: 0.1, duration: 0.3, ease: 'power2.out' }, 0.1)
      }

      // Author fade in
      if (authorEl) {
        gsap.set(authorEl, { opacity: 0, y: 10 })
        tl.to(authorEl, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.6)
      }

      // Background glow fades in/out over pin duration
      if (glow) {
        tl.fromTo(glow, { opacity: 0, scale: 0.8 }, { opacity: 0.08, scale: 1.3, duration: 0.5, ease: 'power2.inOut' }, 0)
        tl.to(glow, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.7)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile])

  const words = quote.split(' ')

  return (
    <div ref={containerRef} className="relative min-h-[50vh] flex items-center py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Parallax background glow */}
      <div
        className="qd-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, oklch(0.65 0.25 260 / 0.08), transparent)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative w-full">
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
