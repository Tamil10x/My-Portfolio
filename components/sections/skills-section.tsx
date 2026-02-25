"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/section-heading'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SKILL_CATEGORIES = [
  { title: 'Frontend Frameworks', skills: ['React.js', 'Next.js', 'React Native', 'Flutter'], color: 'oklch(0.65 0.25 260)' },
  { title: 'Languages', skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Python'], color: 'oklch(0.55 0.28 200)' },
  { title: 'State & Data', skills: ['Redux Toolkit', 'TanStack Query', 'Context API', 'GraphQL'], color: 'oklch(0.65 0.25 260)' },
  { title: 'UI & Styling', skills: ['Tailwind CSS', 'Shadcn UI', 'Material UI', 'Styled Components'], color: 'oklch(0.55 0.28 200)' },
  { title: 'Firebase Ecosystem', skills: ['Auth', 'Firestore', 'Cloud Functions', 'FCM', 'Hosting'], color: 'oklch(0.65 0.25 260)' },
  { title: 'DevOps & Testing', skills: ['Docker', 'Git/GitHub', 'Vitest', 'Cypress', 'Playwright'], color: 'oklch(0.55 0.28 200)' },
  { title: 'APIs & Backend', skills: ['REST APIs', 'GraphQL', 'WebSockets', 'Django', 'FastAPI'], color: 'oklch(0.65 0.25 260)' },
  { title: 'Performance', skills: ['Web Vitals', 'Code Splitting', 'Lazy Loading', 'SEO', 'Bundle Analysis'], color: 'oklch(0.55 0.28 200)' },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.skill-category')

      // Cinematic staggered cascade — each card from different angle with 3D depth
      cards.forEach((card, i) => {
        const col = i % 4
        const row = Math.floor(i / 4)

        gsap.fromTo(
          card,
          {
            y: 80 + row * 20,
            opacity: 0,
            scale: 0.8,
            rotateY: (col - 1.5) * 8,
            rotateX: 5,
            filter: 'blur(8px)',
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              once: true,
            },
            delay: i * 0.1,
          }
        )
      })

      // Skill pills pop in sequentially per card
      const pillRows = sectionRef.current!.querySelectorAll('.skill-pills')
      pillRows.forEach((row, rowIdx) => {
        const pills = row.querySelectorAll('.skill-pill')
        gsap.fromTo(
          pills,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: row,
              start: 'top 92%',
              once: true,
            },
            delay: rowIdx * 0.1 + 0.3,
          }
        )
      })

      // Background glow parallax
      gsap.to('.skills-bg-glow', {
        yPercent: -30,
        scale: 1.5,
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

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg" />

      {/* Background glow */}
      <div
        className="skills-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.25 260), transparent)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading number="02" title="Technical Arsenal" subtitle="Technologies I architect with" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map(({ title, skills, color }) => (
            <div
              key={title}
              className="skill-category glass rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_oklch(0.65_0.25_260_/_0.1)] group"
              style={{ opacity: 0 }}
            >
              {/* Card top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />

              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-150"
                  style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                />
                <h3
                  className="text-sm font-semibold tracking-wider uppercase transition-colors duration-300"
                  style={{ color }}
                >
                  {title}
                </h3>
              </div>

              <div className="skill-pills flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all duration-300 hover:scale-110 cursor-default"
                    style={{
                      background: 'oklch(0.15 0.02 260)',
                      color: 'oklch(0.7 0.03 260)',
                      border: '1px solid oklch(0.22 0.03 260)',
                      opacity: 0,
                      transform: 'scale(0)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = color
                      e.currentTarget.style.boxShadow = `0 0 20px ${color}44`
                      e.currentTarget.style.color = color
                      e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'oklch(0.22 0.03 260)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.color = 'oklch(0.7 0.03 260)'
                      e.currentTarget.style.transform = 'scale(1) translateY(0)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
