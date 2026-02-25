"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/section-heading'
import { Compass, Brain, Sparkles, Cloud, Layers } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const EXPLORATIONS = [
  { icon: Layers, title: 'Advanced Next.js Server Components', desc: 'Pushing the boundaries of streaming and server-side rendering.', color: 'oklch(0.65 0.25 260)' },
  { icon: Brain, title: 'AI/ML Integration in Frontend', desc: 'Embedding intelligence directly into user interfaces.', color: 'oklch(0.55 0.28 200)' },
  { icon: Sparkles, title: 'Micro-Interactions & Motion Design', desc: 'Crafting delightful, purposeful animations.', color: 'oklch(0.65 0.25 260)' },
  { icon: Compass, title: 'System Design for SaaS', desc: 'Scaling architectures for millions of users.', color: 'oklch(0.55 0.28 200)' },
  { icon: Cloud, title: 'Cloud-Native Architectures', desc: 'Leveraging serverless and edge computing.', color: 'oklch(0.65 0.25 260)' },
]

export function ExploringSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.explore-card')
      if (!cards) return

      // Cards spiral in from different angles
      cards.forEach((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2
        const radius = 80
        gsap.fromTo(
          card,
          {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius + 60,
            opacity: 0,
            scale: 0.7,
            rotation: (i - 2) * 8,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        )
      })

      // Icon float animation on scroll
      const icons = sectionRef.current?.querySelectorAll('.explore-icon')
      icons?.forEach((icon, i) => {
        gsap.to(icon, {
          y: -8,
          rotation: i % 2 === 0 ? 5 : -5,
          scrollTrigger: {
            trigger: icon,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 2,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="exploring" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="05" title="Currently Exploring" subtitle="What excites me right now" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPLORATIONS.map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={title}
              className={`explore-card glass rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_oklch(0.65_0.25_260_/_0.12)] group ${
                i === EXPLORATIONS.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="explore-icon w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary" style={{ color: 'oklch(0.9 0.01 260)' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.5 0.03 260)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
