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
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.skill-category')
      if (!cards) return

      // Each card enters from a different direction based on grid position
      cards.forEach((card, i) => {
        const col = i % 4
        const row = Math.floor(i / 4)
        const xStart = (col - 1.5) * 40
        const yStart = 100 + row * 30

        gsap.fromTo(
          card,
          {
            y: yStart,
            x: xStart,
            opacity: 0,
            scale: 0.85,
            rotateY: (col - 1.5) * 10,
            rotateX: 5,
            transformPerspective: 1000,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        )
      })

      // Skill pills wave animation
      const pillRows = sectionRef.current?.querySelectorAll('.skill-pills')
      pillRows?.forEach((row, i) => {
        const pills = row.querySelectorAll('.skill-pill')
        gsap.fromTo(
          pills,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.05,
          }
        )
      })

      // Parallax on background glow
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
      {/* Background glow */}
      <div
        className="skills-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.25 260), transparent)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionHeading number="02" title="Technical Arsenal" subtitle="Technologies I architect with" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map(({ title, skills, color }) => (
            <div
              key={title}
              className="skill-category glass rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_oklch(0.65_0.25_260_/_0.1)] group"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_12px]" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                <h3 className="text-sm font-semibold tracking-wider uppercase transition-colors duration-300" style={{ color }}>
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
