"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/section-heading'
import { MapPin, Calendar, TrendingUp, Bug, Smartphone } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const IMPACTS = [
  { icon: TrendingUp, text: 'Reduced application load time by 45%', color: 'oklch(0.55 0.28 200)' },
  { icon: Bug, text: 'Reduced production bugs by 60%', color: 'oklch(0.65 0.25 260)' },
  { icon: Smartphone, text: 'Improved mobile retention by 35%', color: 'oklch(0.55 0.28 200)' },
]

const RESPONSIBILITIES = [
  'Architect modular, reusable UI systems using React, Next.js, Tailwind CSS, and Shadcn UI',
  'Design scalable frontend architecture patterns',
  'Integrate Firebase (Auth, Firestore, Storage, Cloud Functions, FCM)',
  'Implement advanced state management using Redux Toolkit & TanStack Query',
  'Optimize frontend performance (lazy loading, code splitting, bundle analysis)',
  'Improve Core Web Vitals and mobile-first responsiveness',
  'Build testing pipelines using Vitest & Cypress',
  'Mentor junior developers & contribute to Agile sprints',
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draws itself on scroll
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      )

      // Timeline dot pulses in
      gsap.fromTo(
        '.timeline-dot',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(3)',
          scrollTrigger: {
            trigger: '.timeline-dot',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Experience card slides in from left with rotation
      gsap.fromTo(
        '.exp-card-main',
        { x: -100, opacity: 0, rotateY: -8, transformPerspective: 1000 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-card-main',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      )

      // Responsibilities draw in one by one with connecting lines
      const items = sectionRef.current?.querySelectorAll('.resp-item')
      if (items) {
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { x: -60, opacity: 0, filter: 'blur(4px)' },
            {
              x: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.05,
            }
          )
        })
      }

      // Impact cards fly in with spring effect
      const impactCards = sectionRef.current?.querySelectorAll('.impact-card')
      if (impactCards) {
        impactCards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0, scale: 0.8, rotateX: 15, transformPerspective: 600 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 1,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
              delay: i * 0.15,
            }
          )
        })
      }

      // Mentoring card slides from right
      gsap.fromTo(
        '.exp-card-mentor',
        { x: 100, opacity: 0, rotateY: 8, transformPerspective: 1000 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-card-mentor',
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="03" title="Experience" subtitle="Where I have been building" />

        <div className="relative flex gap-8">
          {/* Timeline line */}
          <div className="hidden md:block relative w-px flex-shrink-0">
            <div
              className="timeline-line absolute top-0 left-0 w-full h-full"
              style={{
                background: 'linear-gradient(180deg, oklch(0.65 0.25 260), oklch(0.55 0.28 200), transparent)',
              }}
            />
            <div
              className="timeline-dot absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                background: 'oklch(0.65 0.25 260)',
                boxShadow: '0 0 20px oklch(0.65 0.25 260 / 0.6)',
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8">
            <div className="exp-card-main glass rounded-2xl p-8 md:p-10" style={{ opacity: 0 }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: 'oklch(0.95 0.01 260)' }}>
                    Senior Software Engineer
                  </h3>
                  <p className="text-lg font-medium mt-1" style={{ color: 'oklch(0.65 0.25 260)' }}>
                    10xScale.ai
                  </p>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="flex items-center gap-2 text-sm" style={{ color: 'oklch(0.5 0.03 260)' }}>
                    <MapPin className="w-4 h-4" /> Hyderabad, India
                  </span>
                  <span className="flex items-center gap-2 text-sm" style={{ color: 'oklch(0.5 0.03 260)' }}>
                    <Calendar className="w-4 h-4" /> Oct 2023 -- Present
                  </span>
                </div>
              </div>

              <p className="text-base leading-relaxed mb-8" style={{ color: 'oklch(0.6 0.02 260)' }}>
                Leading frontend architecture and development of scalable, high-performance applications serving real users at 10xScale.ai.
              </p>

              <div className="space-y-3 mb-10">
                <h4 className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: 'oklch(0.55 0.15 200)' }}>
                  Core Responsibilities
                </h4>
                {RESPONSIBILITIES.map((resp, i) => (
                  <div key={i} className="resp-item flex items-start gap-3" style={{ opacity: 0 }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'oklch(0.65 0.25 260)' }} />
                    <span className="text-sm leading-relaxed" style={{ color: 'oklch(0.6 0.03 260)' }}>{resp}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ color: 'oklch(0.55 0.15 200)' }}>
                Key Impact
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {IMPACTS.map(({ icon: Icon, text, color }) => (
                  <div
                    key={text}
                    className="impact-card glass rounded-xl p-5 flex items-start gap-4 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_oklch(0.65_0.25_260_/_0.1)]"
                    style={{ opacity: 0 }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
                    <span className="text-sm leading-relaxed" style={{ color: 'oklch(0.75 0.02 260)' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentoring */}
            <div className="exp-card-mentor glass rounded-2xl p-8" style={{ opacity: 0 }}>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'oklch(0.95 0.01 260)' }}>
                Technical Mentor & Educator
              </h3>
              <p className="text-sm mb-4" style={{ color: 'oklch(0.6 0.02 260)' }}>
                Trained 100+ students (online & offline) across key technologies:
              </p>
              <div className="flex flex-wrap gap-2">
                {['React.js & Next.js', 'JavaScript (ES6+)', 'System Design', 'LeetCode', 'Jest/Cypress', 'Docker & Deployment'].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-lg text-xs tracking-wide transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'oklch(0.15 0.03 260)',
                        color: 'oklch(0.65 0.15 200)',
                        border: '1px solid oklch(0.22 0.05 200)',
                      }}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
