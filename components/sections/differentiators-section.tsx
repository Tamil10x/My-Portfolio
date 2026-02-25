"use client"

import { useEffect } from 'react'
import { useSectionPin, gsap } from '@/hooks/use-gsap'
import { SectionHeading } from '@/components/section-heading'
import { Lightbulb, Gauge, Code, TestTube, Eye, GraduationCap, Puzzle } from 'lucide-react'

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
  const { sectionRef, timelineRef, isMobile } = useSectionPin({ pinDuration: '+=110%' })

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll('.diff-item')
      const iconBars = sectionRef.current!.querySelectorAll('.diff-icon-bar')

      if (isMobile) {
        // Mobile: simple clip-path wipe
        items.forEach((item) => {
          gsap.fromTo(item,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            {
              clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 90%', once: true },
            }
          )
        })
        iconBars.forEach((bar) => {
          gsap.fromTo(bar,
            { scaleX: 0 },
            {
              scaleX: 1, transformOrigin: 'left', duration: 1, ease: 'power2.out',
              scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
            }
          )
        })
        return
      }

      // Desktop: pinned timeline — horizontal clip-path wipe per item, staggered
      const tl = timelineRef.current
      const heading = sectionRef.current!.querySelector('.section-heading')

      // Heading
      if (heading) {
        gsap.set(heading, { clipPath: 'inset(0 100% 0 0)', opacity: 0 })
        tl.to(heading, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.12, ease: 'power3.out' }, 0)
      }

      // Items wipe in staggered
      if (items.length > 0) {
        gsap.set(items, { clipPath: 'inset(0 100% 0 0)', opacity: 0 })
        tl.to(items, {
          clipPath: 'inset(0 0% 0 0)', opacity: 1,
          stagger: 0.08, duration: 0.8, ease: 'power3.out',
        }, 0.12)
      }

      // Icon bars draw in
      if (iconBars.length > 0) {
        gsap.set(iconBars, { scaleX: 0, transformOrigin: 'left' })
        tl.to(iconBars, {
          scaleX: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out',
        }, 0.25)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, sectionRef, timelineRef])

  return (
    <section ref={sectionRef} id="differentiators" className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg" />

      <div className="max-w-4xl mx-auto w-full py-20">
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
