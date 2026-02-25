"use client"

import { useEffect } from 'react'
import { useSectionPin, gsap } from '@/hooks/use-gsap'
import { SectionHeading } from '@/components/section-heading'
import { Compass, Brain, Sparkles, Cloud, Layers } from 'lucide-react'

const EXPLORATIONS = [
  { icon: Layers, title: 'Advanced Next.js Server Components', desc: 'Pushing the boundaries of streaming and server-side rendering.', color: 'oklch(0.65 0.25 260)' },
  { icon: Brain, title: 'AI/ML Integration in Frontend', desc: 'Embedding intelligence directly into user interfaces.', color: 'oklch(0.55 0.28 200)' },
  { icon: Sparkles, title: 'Micro-Interactions & Motion Design', desc: 'Crafting delightful, purposeful animations.', color: 'oklch(0.65 0.25 260)' },
  { icon: Compass, title: 'System Design for SaaS', desc: 'Scaling architectures for millions of users.', color: 'oklch(0.55 0.28 200)' },
  { icon: Cloud, title: 'Cloud-Native Architectures', desc: 'Leveraging serverless and edge computing.', color: 'oklch(0.65 0.25 260)' },
]

export function ExploringSection() {
  const { sectionRef, timelineRef, isMobile } = useSectionPin({ pinDuration: '+=100%' })

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.explore-card')

      if (isMobile) {
        // Mobile: simple cascade entrance
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { scale: 0.5, opacity: 0, rotation: (i - 2) * 6, filter: 'blur(10px)', y: 60 },
            {
              scale: 1, opacity: 1, rotation: 0, filter: 'blur(0px)', y: 0,
              duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 90%', once: true }, delay: i * 0.1,
            }
          )
        })
        return
      }

      // Desktop: pinned timeline — cascade with scale + rotation + blur clear
      const tl = timelineRef.current
      const heading = sectionRef.current!.querySelector('.section-heading')

      // Heading
      if (heading) {
        gsap.set(heading, { clipPath: 'inset(0 100% 0 0)', opacity: 0 })
        tl.to(heading, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.15, ease: 'power3.out' }, 0)
      }

      // Cards cascade
      if (cards.length > 0) {
        cards.forEach((card, i) => {
          gsap.set(card, {
            scale: 0.5, opacity: 0, rotation: (i - 2) * 6, filter: 'blur(10px)', y: 60,
          })
        })
        tl.to(cards, {
          scale: 1, opacity: 1, rotation: 0, filter: 'blur(0px)', y: 0,
          stagger: 0.08, duration: 0.7, ease: 'power3.out',
        }, 0.15)
      }

      // Icon float within timeline
      const icons = sectionRef.current!.querySelectorAll('.explore-icon')
      if (icons.length > 0) {
        tl.to(icons, {
          y: -8, stagger: 0.05, duration: 0.5, ease: 'power1.inOut',
        }, 0.5)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, sectionRef, timelineRef])

  return (
    <section ref={sectionRef} id="exploring" className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg" />

      <div className="max-w-6xl mx-auto w-full py-20">
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
