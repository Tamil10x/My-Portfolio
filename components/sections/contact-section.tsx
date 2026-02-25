"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/section-heading'
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react'
import { useMagnetic } from '@/hooks/use-magnetic'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/tamilgithubid', desc: 'Check out my code', color: 'oklch(0.75 0.02 260)' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tamil-arasan-769b88247/', desc: 'Connect professionally', color: 'oklch(0.55 0.2 250)' },
  { icon: Mail, label: 'Email', href: 'mailto:tamilarasansundarraj@gmail.com', desc: 'Drop me a message', color: 'oklch(0.55 0.28 200)' },
  { icon: FileText, label: 'Resume', href: '#', desc: 'Download my resume', color: 'oklch(0.65 0.25 260)' },
]

function ContactLink({ icon: Icon, label, href, desc, color }: (typeof SOCIAL_LINKS)[0]) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.15)

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="glass rounded-2xl p-6 flex items-center gap-5 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_oklch(0.65_0.25_260_/_0.1)] group block"
        style={{ border: '1px solid oklch(0.2 0.03 260)' }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: `${color}10`, border: `1px solid ${color}25` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold" style={{ color: 'oklch(0.9 0.01 260)' }}>{label}</h4>
          <p className="text-sm" style={{ color: 'oklch(0.5 0.03 260)' }}>{desc}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'oklch(0.4 0.05 260)' }} />
      </a>
    </div>
  )
}

const OPEN_TO = [
  'Senior Frontend Opportunities',
  'AI Product Engineering Roles',
  'Freelance SaaS Architecture',
  'Tech Mentorship Collaborations',
  'Startup Collaborations',
]

// Key words that get scale pulse
const PULSE_WORDS = ['technical', 'depth,', 'architectural', 'thinking,', 'UI', 'craftsmanship', 'connect.']

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced word-by-word reveal with scale pulse on key words
      const ctaWords = sectionRef.current?.querySelectorAll('.cta-word')
      if (ctaWords) {
        gsap.fromTo(
          ctaWords,
          { opacity: 0.08, y: 30, filter: 'blur(4px)', scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            stagger: 0.03,
            scrollTrigger: {
              trigger: '.contact-cta',
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        )

        // Scale pulse on key words after reveal
        ctaWords.forEach((word) => {
          if (word.classList.contains('cta-pulse')) {
            gsap.fromTo(
              word,
              { scale: 1 },
              {
                scale: 1.15,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                scrollTrigger: {
                  trigger: word,
                  start: 'top 60%',
                  toggleActions: 'play none none none',
                },
              }
            )
          }
        })
      }

      // Contact cards fly in from sides
      const cards = sectionRef.current?.querySelectorAll('.contact-link')
      cards?.forEach((card, i) => {
        const isLeft = i % 2 === 0
        gsap.fromTo(
          card,
          { x: isLeft ? -80 : 80, y: 40, opacity: 0, scale: 0.9, rotateY: isLeft ? -8 : 8, transformPerspective: 800 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 65%',
              scrub: 1,
            },
          }
        )
      })

      // Open-to items pop in
      const openItems = sectionRef.current?.querySelectorAll('.open-to-item')
      if (openItems) {
        gsap.fromTo(
          openItems,
          { scale: 0, opacity: 0, rotation: -10 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: openItems[0],
              start: 'top 90%',
              once: true,
            },
          }
        )
      }

      // Background glow parallax
      gsap.to('.contact-glow', {
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

  // Split CTA text into words
  const ctaText = "If you're looking for someone who combines technical depth, architectural thinking, and UI craftsmanship -- let's connect."

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg" />

      <div
        className="contact-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, oklch(0.65 0.25 260), transparent)', filter: 'blur(100px)' }}
      />

      <div className="max-w-4xl mx-auto">
        <SectionHeading number="07" title="Get In Touch" subtitle="Let's build something impactful" />

        <div className="contact-cta mb-16">
          <p className="text-2xl md:text-3xl font-bold leading-relaxed">
            {ctaText.split(' ').map((word, i) => {
              const isPulse = PULSE_WORDS.some(pw => word.includes(pw))
              let color = 'oklch(0.75 0.02 260)'
              if (['technical', 'depth,'].includes(word)) color = 'oklch(0.65 0.25 260)'
              if (['architectural', 'thinking,'].includes(word)) color = 'oklch(0.55 0.28 200)'
              if (['UI', 'craftsmanship'].includes(word)) color = 'oklch(0.65 0.25 260)'
              return (
                <span
                  key={i}
                  className={`cta-word inline-block mr-[0.3em] ${isPulse ? 'cta-pulse' : ''}`}
                  style={{ color }}
                >
                  {word}
                </span>
              )
            })}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {SOCIAL_LINKS.map((link) => (
            <div key={link.label} className="contact-link" style={{ opacity: 0 }}>
              <ContactLink {...link} />
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="text-lg font-semibold mb-6" style={{ color: 'oklch(0.85 0.02 260)' }}>
            I&apos;m always open to
          </h3>
          <div className="flex flex-wrap gap-3">
            {OPEN_TO.map((item) => (
              <span
                key={item}
                className="open-to-item px-4 py-2 rounded-full text-sm tracking-wide glow-border transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_oklch(0.65_0.25_260_/_0.15)] cursor-default"
                style={{ color: 'oklch(0.6 0.15 260)', opacity: 0 }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
