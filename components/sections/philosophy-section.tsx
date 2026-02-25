"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PRINCIPLES = [
  { word: 'Scalable', desc: 'Architecting systems that grow' },
  { word: 'Performant', desc: 'Speed is a feature, not a luxury' },
  { word: 'Accessible', desc: 'Building for everyone, always' },
  { word: 'Maintainable', desc: 'Clean code, clear patterns' },
  { word: 'Purpose-Driven', desc: 'Every line serves a purpose' },
]

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const quoteWords = quoteRef.current?.querySelectorAll('.quote-word')

      // Pin the section while quote reveals word-by-word
      if (quoteWords && quoteRef.current) {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          anticipatePin: 1,
          scrub: 1,
        })

        gsap.fromTo(
          quoteWords,
          { opacity: 0.08, y: 20, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=100%',
              scrub: 1,
            },
          }
        )
      }

      // Quote container scale
      gsap.fromTo(
        quoteRef.current,
        { scale: 0.85 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=80%',
            scrub: 1,
          },
        }
      )

      // Principles stagger in with line drawing effect
      const principles = sectionRef.current?.querySelectorAll('.principle-item')
      if (principles) {
        principles.forEach((item, i) => {
          gsap.fromTo(
            item,
            { x: i % 2 === 0 ? -100 : 100, opacity: 0, scale: 0.9 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top+=${60 + i * 12}% top`,
                end: `top+=${70 + i * 12}% top`,
                scrub: 1,
              },
            }
          )
        })
      }

      // Parallax background
      gsap.to('.philosophy-glow', {
        yPercent: -40,
        scale: 1.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split quote into individually animatable words
  const quotePart1 = 'Great software is not just built --'.split(' ')
  const quotePart2 = 'it is engineered'.split(' ')
  const quotePart3 = 'with clarity, performance, and purpose.'.split(' ')

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg" />

      <div
        className="philosophy-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(ellipse, oklch(0.65 0.25 260), transparent)', filter: 'blur(120px)' }}
      />

      <div className="max-w-4xl mx-auto text-center w-full">
        <div ref={quoteRef} className="mb-20">
          <p className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
            <span style={{ color: 'oklch(0.85 0.02 260)' }}>
              &ldquo;{quotePart1.map((w, i) => (
                <span key={`p1-${i}`} className="quote-word inline-block mr-[0.3em]">{w}</span>
              ))}
            </span>
            <br />
            <span className="gradient-text-animated" style={{ WebkitTextFillColor: 'oklch(0.65 0.25 260)' }}>
              {quotePart2.map((w, i) => (
                <span key={`p2-${i}`} className="quote-word inline-block mr-[0.3em]">{w}</span>
              ))}
            </span>
            {' '}
            <span style={{ color: 'oklch(0.85 0.02 260)' }}>
              {quotePart3.map((w, i) => (
                <span key={`p3-${i}`} className="quote-word inline-block mr-[0.3em]">{w === 'purpose.' ? 'purpose.\u201D' : w}</span>
              ))}
            </span>
          </p>
        </div>

        <div className="space-y-6 max-w-xl mx-auto">
          {PRINCIPLES.map(({ word, desc }) => (
            <div
              key={word}
              className="principle-item flex items-center gap-6 group cursor-default"
              style={{ opacity: 0 }}
            >
              <div className="gradient-line flex-1" />
              <div className="flex items-baseline gap-3">
                <span
                  className="text-xl md:text-2xl font-bold tracking-tight transition-all duration-500 group-hover:scale-110"
                  style={{ color: 'oklch(0.8 0.02 260)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'oklch(0.65 0.25 260)'
                    e.currentTarget.style.textShadow = '0 0 20px oklch(0.65 0.25 260 / 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'oklch(0.8 0.02 260)'
                    e.currentTarget.style.textShadow = 'none'
                  }}
                >
                  {word}
                </span>
                <span className="text-sm hidden md:inline" style={{ color: 'oklch(0.45 0.03 260)' }}>{desc}</span>
              </div>
              <div className="gradient-line flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
