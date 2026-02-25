"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const CODE_SYMBOLS = [
  { text: '</>', top: '15%', left: '5%', size: '1.2rem', opacity: 0.08 },
  { text: '{}', top: '25%', left: '92%', size: '1.4rem', opacity: 0.06 },
  { text: '()', top: '42%', left: '3%', size: '1rem', opacity: 0.1 },
  { text: '//', top: '58%', left: '95%', size: '1.1rem', opacity: 0.07 },
  { text: '=>', top: '72%', left: '8%', size: '1.3rem', opacity: 0.09 },
  { text: '&&', top: '35%', left: '88%', size: '1rem', opacity: 0.06 },
  { text: '[]', top: '85%', left: '93%', size: '1.2rem', opacity: 0.08 },
  { text: '/**/', top: '48%', left: '7%', size: '0.9rem', opacity: 0.07 },
  { text: '#!/', top: '92%', left: '12%', size: '1rem', opacity: 0.06 },
  { text: '0x', top: '8%', left: '85%', size: '1.1rem', opacity: 0.08 },
  { text: '< />', top: '65%', left: '2%', size: '1rem', opacity: 0.07 },
  { text: '::',  top: '20%', left: '50%', size: '1rem', opacity: 0.05 },
]

const BINARY_COLUMNS = [
  { left: '15%', opacity: 0.04, speed: 25 },
  { left: '45%', opacity: 0.03, speed: 35 },
  { left: '75%', opacity: 0.04, speed: 30 },
  { left: '90%', opacity: 0.03, speed: 40 },
]

function generateBinaryString(length: number) {
  return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0').join(' ')
}

export function FloatingDecorations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Original floating elements
      const els = containerRef.current!.querySelectorAll('.floating-el')
      els.forEach((el, i) => {
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

        gsap.to(el, {
          y: `+=${10 + i * 3}`,
          x: `+=${5 + i * 2}`,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Code symbols — parallax scroll + gentle float
      const codeEls = containerRef.current!.querySelectorAll('.code-sym')
      codeEls.forEach((el, i) => {
        // Parallax scroll
        gsap.to(el, {
          y: `${-100 - i * 40}`,
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2 + i * 0.3,
          },
        })

        // Gentle sine float
        gsap.to(el, {
          y: `+=${8 + (i % 4) * 3}`,
          x: `+=${4 + (i % 3) * 2}`,
          duration: 4 + (i % 3),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        })
      })

      // Circuit SVG line draw on scroll
      const circuits = containerRef.current!.querySelectorAll('.circuit-line')
      circuits.forEach((line) => {
        gsap.fromTo(
          line,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 3,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Original glowing dots */}
      <div className="floating-el absolute top-[12%] right-[8%] w-1.5 h-1.5 rounded-full" style={{ background: 'oklch(0.65 0.25 260 / 0.4)', boxShadow: '0 0 20px oklch(0.65 0.25 260 / 0.3)' }} />
      <div className="floating-el absolute top-[28%] left-[4%] w-2 h-2 rounded-full" style={{ background: 'oklch(0.55 0.28 200 / 0.35)', boxShadow: '0 0 18px oklch(0.55 0.28 200 / 0.25)' }} />
      <div className="floating-el absolute top-[78%] right-[6%] w-1 h-1 rounded-full" style={{ background: 'oklch(0.55 0.28 200 / 0.3)' }} />
      <div className="floating-el absolute top-[18%] left-[38%] w-1 h-1 rounded-full" style={{ background: 'oklch(0.65 0.25 260 / 0.5)', boxShadow: '0 0 10px oklch(0.65 0.25 260 / 0.4)' }} />

      {/* Original lines */}
      <div className="floating-el absolute top-[48%] right-[12%] w-px h-24 rotate-45" style={{ background: 'linear-gradient(180deg, oklch(0.65 0.25 260 / 0.15), transparent)' }} />
      <div className="floating-el absolute top-[38%] left-[82%] w-px h-20" style={{ background: 'linear-gradient(180deg, transparent, oklch(0.55 0.28 200 / 0.12), transparent)' }} />

      {/* Original geometric shapes */}
      <div className="floating-el absolute top-[62%] left-[10%] w-3 h-3" style={{ border: '1px solid oklch(0.65 0.25 260 / 0.12)', transform: 'rotate(45deg)' }} />
      <div className="floating-el absolute top-[68%] left-[58%] w-4 h-4 rounded-full" style={{ border: '1px solid oklch(0.65 0.25 260 / 0.06)' }} />

      {/* Original ambient orbs */}
      <div className="floating-el absolute top-[35%] right-[25%] w-32 h-32 rounded-full opacity-[0.02]" style={{ background: 'radial-gradient(circle, oklch(0.65 0.25 260), transparent)', filter: 'blur(40px)' }} />
      <div className="floating-el absolute top-[75%] left-[20%] w-24 h-24 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, oklch(0.55 0.28 200), transparent)', filter: 'blur(30px)' }} />

      {/* Original cross shapes */}
      <div className="floating-el absolute top-[55%] left-[90%]">
        <div className="w-3 h-px" style={{ background: 'oklch(0.65 0.25 260 / 0.15)' }} />
        <div className="w-px h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: 'oklch(0.65 0.25 260 / 0.15)' }} />
      </div>

      {/* === NEW: Floating code symbols === */}
      {CODE_SYMBOLS.map((sym, i) => (
        <div
          key={`code-${i}`}
          className="code-sym code-symbol"
          style={{
            top: sym.top,
            left: sym.left,
            fontSize: sym.size,
            opacity: sym.opacity,
          }}
        >
          {sym.text}
        </div>
      ))}

      {/* === NEW: Binary rain columns === */}
      {BINARY_COLUMNS.map((col, i) => (
        <div
          key={`binary-${i}`}
          className="binary-rain"
          style={{
            left: col.left,
            top: 0,
            opacity: col.opacity,
            animation: `binary-rain ${col.speed}s linear infinite`,
          }}
        >
          {generateBinaryString(80)}
        </div>
      ))}

      {/* === NEW: SVG circuit board patterns === */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
        <path
          className="circuit-line"
          d="M 50 200 L 50 400 L 150 400 L 150 600 L 80 600"
          fill="none"
          stroke="oklch(0.65 0.25 260)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          className="circuit-line"
          d="M 1200 100 L 1200 300 L 1100 300 L 1100 500 L 1250 500"
          fill="none"
          stroke="oklch(0.55 0.28 200)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <path
          className="circuit-line"
          d="M 800 700 L 900 700 L 900 850 L 750 850 L 750 950"
          fill="none"
          stroke="oklch(0.65 0.25 260)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        {/* Circuit dots at junctions */}
        <circle cx="50" cy="400" r="3" fill="oklch(0.65 0.25 260)" opacity="0.3" />
        <circle cx="150" cy="600" r="3" fill="oklch(0.65 0.25 260)" opacity="0.3" />
        <circle cx="1200" cy="300" r="3" fill="oklch(0.55 0.28 200)" opacity="0.3" />
        <circle cx="1100" cy="500" r="3" fill="oklch(0.55 0.28 200)" opacity="0.3" />
        <circle cx="900" cy="850" r="3" fill="oklch(0.65 0.25 260)" opacity="0.3" />
      </svg>
    </div>
  )
}
