"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/section-heading'
import { Code2, Users, Rocket, Zap } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const STATS = [
  { icon: Code2, value: '3+', label: 'Years Experience', color: 'oklch(0.65 0.25 260)' },
  { icon: Users, value: '100+', label: 'Students Mentored', color: 'oklch(0.55 0.28 200)' },
  { icon: Rocket, value: '8+', label: 'Projects Shipped', color: 'oklch(0.65 0.25 260)' },
  { icon: Zap, value: '45%', label: 'Load Time Reduced', color: 'oklch(0.55 0.28 200)' },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text block parallax reveal with horizontal slide
      gsap.fromTo(
        textBlockRef.current,
        { y: 120, opacity: 0, x: -60 },
        {
          y: 0,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textBlockRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )

      // Text paragraphs stagger in
      const paragraphs = textBlockRef.current?.querySelectorAll('.about-para')
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { y: 50, opacity: 0, filter: 'blur(5px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textBlockRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Tags fly in from different directions
      const tags = sectionRef.current?.querySelectorAll('.about-tag')
      if (tags) {
        tags.forEach((tag, i) => {
          gsap.fromTo(
            tag,
            { scale: 0, opacity: 0, rotation: (i % 2 === 0 ? -15 : 15) },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: tag,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.08,
            }
          )
        })
      }

      // Cards stagger with 3D tilt
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.stat-card')
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              y: 120,
              opacity: 0,
              scale: 0.8,
              rotateY: i % 2 === 0 ? -15 : 15,
              transformPerspective: 800,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 1,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.15,
            }
          )
        })

        // Counter animation for stat values
        cards.forEach((card) => {
          const valueEl = card.querySelector('.stat-value')
          if (valueEl) {
            const originalText = valueEl.textContent || ''
            const numMatch = originalText.match(/\d+/)
            if (numMatch) {
              const targetNum = parseInt(numMatch[0])
              const suffix = originalText.replace(/\d+/, '')
              ScrollTrigger.create({
                trigger: card,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                  gsap.from({ val: 0 }, {
                    val: targetNum,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function () {
                      valueEl.textContent = Math.round(this.targets()[0].val) + suffix
                    },
                  })
                },
              })
            }
          }
        })
      }

      // Parallax background elements with different speeds
      gsap.to('.about-bg-circle-1', {
        yPercent: -60,
        xPercent: 20,
        scale: 1.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

      gsap.to('.about-bg-circle-2', {
        yPercent: -40,
        xPercent: -15,
        scale: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="about-bg-circle-1 absolute top-20 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.25 260 / 0.4), transparent)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="about-bg-circle-2 absolute bottom-20 left-0 w-72 h-72 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, oklch(0.55 0.28 200 / 0.4), transparent)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionHeading number="01" title="About Me" subtitle="Who I am & what drives me" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Text content */}
          <div ref={textBlockRef} className="space-y-6" style={{ opacity: 0 }}>
            <p className="about-para text-lg leading-relaxed" style={{ color: 'oklch(0.7 0.02 260)' }}>
              I am <span className="font-semibold" style={{ color: 'oklch(0.95 0.01 260)' }}>Tamilarasan</span>, a results-driven Senior Software Engineer with 3+ years of hands-on experience building scalable, high-performance web applications.
            </p>
            <p className="about-para text-lg leading-relaxed" style={{ color: 'oklch(0.6 0.02 260)' }}>
              I specialize in the React.js and Next.js ecosystems, architecting modern frontend systems that are fast, accessible, maintainable, and production-ready. I combine strong engineering fundamentals with clean UI thinking and performance-first architecture.
            </p>
            <p className="about-para text-lg leading-relaxed" style={{ color: 'oklch(0.6 0.02 260)' }}>
              Beyond engineering, I am also a teaching mentor, having trained 100+ students in React.js, Next.js, JavaScript, System Design, and more. I believe great software is not just built -- it is engineered with clarity, performance, and purpose.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              {['React Expert', 'Next.js Architect', 'Firebase Specialist', 'Performance Wizard', 'AI Builder', 'Tech Mentor'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="about-tag px-4 py-1.5 rounded-full text-xs tracking-wider uppercase glow-border cursor-default transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_oklch(0.65_0.25_260_/_0.2)]"
                    style={{ color: 'oklch(0.6 0.15 260)', opacity: 0 }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Stats cards */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-4">
            {STATS.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="stat-card glass rounded-2xl p-6 flex flex-col items-start gap-3 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_oklch(0.65_0.25_260_/_0.15)] group cursor-default"
                style={{ opacity: 0 }}
              >
                <Icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" style={{ color }} />
                <span className="stat-value text-3xl md:text-4xl font-bold tracking-tight" style={{ color }}>
                  {value}
                </span>
                <span className="text-sm" style={{ color: 'oklch(0.5 0.03 260)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
