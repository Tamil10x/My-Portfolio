"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/section-heading'
import { Lightbulb, Gauge, Code, TestTube, Eye, GraduationCap, Puzzle } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const DIFFERENTIATORS = [
  { icon: Lightbulb, text: 'Strong frontend architecture mindset', color: 'oklch(0.65 0.25 260)' },
  { icon: Gauge, text: 'Performance-first development approach', color: 'oklch(0.55 0.28 200)' },
  { icon: Code, text: 'Clean, scalable, reusable code', color: 'oklch(0.65 0.25 260)' },
  { icon: TestTube, text: 'Testing-driven development', color: 'oklch(0.55 0.28 200)' },
  { icon: Eye, text: 'Deep understanding of user experience', color: 'oklch(0.65 0.25 260)' },
  { icon: GraduationCap, text: 'Mentor & technical guide for 100+ students', color: 'oklch(0.55 0.28 200)' },
  { icon: Puzzle, text: 'Blends engineering precision with UI creativity', color: 'oklch(0.65 0.25 260)' },
]

export function DifferentiatorsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.diff-item')
      if (!items) return

      // Horizontal clip-path wipe reveal per item
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0,
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'top 70%',
              scrub: 1,
            },
          }
        )
      })

      // Icon bar progress animation
      const iconBars = sectionRef.current?.querySelectorAll('.diff-icon-bar')
      iconBars?.forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="differentiators" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg" />

      <div className="max-w-4xl mx-auto">
        <SectionHeading number="06" title="What Sets Me Apart" subtitle="The difference I bring" />

        <div className="space-y-4">
          {DIFFERENTIATORS.map(({ icon: Icon, text, color }, i) => (
            <div
              key={text}
              className="diff-item glass rounded-xl p-5 flex items-center gap-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_oklch(0.65_0.25_260_/_0.08)] group relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Animated bottom line */}
              <div
                className="diff-icon-bar absolute bottom-0 left-0 h-px w-full"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: `${color}10`, border: `1px solid ${color}25` }}
              >
                <Icon className="w-5 h-5 transition-all duration-300" style={{ color }} />
              </div>
              <span
                className="text-base md:text-lg font-medium transition-colors duration-300"
                style={{ color: 'oklch(0.75 0.02 260)' }}
              >
                {text}
              </span>
              <div className="ml-auto hidden md:block">
                <span className="text-xs font-mono gradient-text-animated">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
