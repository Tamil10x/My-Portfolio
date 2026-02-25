"use client"

import { useEffect } from 'react'
import { useSectionPin, gsap } from '@/hooks/use-gsap'
import { SectionHeading } from '@/components/section-heading'
import { Github, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react'
import { useMagnetic } from '@/hooks/use-magnetic'

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

const PULSE_WORDS = ['technical', 'depth,', 'architectural', 'thinking,', 'UI', 'craftsmanship', 'connect.']

export function ContactSection() {
  const { sectionRef, timelineRef, isMobile } = useSectionPin({ pinDuration: '+=80%' })

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const ctaWords = sectionRef.current!.querySelectorAll('.cta-word')
      const contactLinks = sectionRef.current!.querySelectorAll('.contact-link')
      const openItems = sectionRef.current!.querySelectorAll('.open-to-item')

      if (isMobile) {
        // Mobile: simple entrance animations
        if (ctaWords.length > 0) {
          gsap.fromTo(ctaWords,
            { opacity: 0.08, y: 30, filter: 'blur(4px)', scale: 0.9 },
            {
              opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, stagger: 0.03,
              scrollTrigger: { trigger: '.contact-cta', start: 'top 80%', end: 'top 50%', scrub: 1 },
            }
          )
        }
        contactLinks.forEach((card, i) => {
          const isLeft = i % 2 === 0
          gsap.fromTo(card,
            { x: isLeft ? -80 : 80, opacity: 0, scale: 0.9 },
            {
              x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            }
          )
        })
        if (openItems.length > 0) {
          gsap.fromTo(openItems,
            { scale: 0, opacity: 0, rotation: -10 },
            {
              scale: 1, opacity: 1, rotation: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(2)',
              scrollTrigger: { trigger: openItems[0], start: 'top 90%', once: true },
            }
          )
        }
        return
      }

      // Desktop: pinned timeline — word-by-word reveal with scale pulse on key words
      const tl = timelineRef.current
      const heading = sectionRef.current!.querySelector('.section-heading')

      // Heading
      if (heading) {
        gsap.set(heading, { clipPath: 'inset(0 100% 0 0)', opacity: 0 })
        tl.to(heading, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.1, ease: 'power3.out' }, 0)
      }

      // 0.1→0.5: CTA word-by-word reveal
      if (ctaWords.length > 0) {
        gsap.set(ctaWords, { opacity: 0.08, y: 30, filter: 'blur(4px)', scale: 0.9 })
        tl.to(ctaWords, {
          opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, stagger: 0.01, duration: 0.4, ease: 'power2.out',
        }, 0.1)

        // Scale pulse on key words
        ctaWords.forEach((word) => {
          if (word.classList.contains('cta-pulse')) {
            tl.fromTo(word, { scale: 1 }, {
              scale: 1.15, duration: 0.03, yoyo: true, repeat: 1, ease: 'power2.inOut',
            }, 0.5)
          }
        })
      }

      // 0.5→0.8: Contact links fly in
      if (contactLinks.length > 0) {
        contactLinks.forEach((card, i) => {
          const isLeft = i % 2 === 0
          gsap.set(card, { x: isLeft ? -80 : 80, y: 40, opacity: 0, scale: 0.9, rotateY: isLeft ? -8 : 8, transformPerspective: 800 })
        })
        tl.to(contactLinks, {
          x: 0, y: 0, opacity: 1, scale: 1, rotateY: 0,
          stagger: 0.04, duration: 0.25, ease: 'power3.out',
        }, 0.5)
      }

      // 0.8→1.0: Open-to items pop in
      if (openItems.length > 0) {
        gsap.set(openItems, { scale: 0, opacity: 0, rotation: -10 })
        tl.to(openItems, {
          scale: 1, opacity: 1, rotation: 0, stagger: 0.03, duration: 0.2, ease: 'back.out(2)',
        }, 0.8)
      }

      // Background glow parallax
      const glow = sectionRef.current!.querySelector('.contact-glow')
      if (glow) {
        tl.to(glow, { yPercent: -30, scale: 1.5, duration: 1, ease: 'none' }, 0)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, sectionRef, timelineRef])

  // Split CTA text into words
  const ctaText = "If you're looking for someone who combines technical depth, architectural thinking, and UI craftsmanship -- let's connect."

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg" />

      <div
        className="contact-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, oklch(0.65 0.25 260), transparent)', filter: 'blur(100px)' }}
      />

      <div className="max-w-4xl mx-auto w-full py-20">
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
