"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <footer ref={footerRef} className="relative py-12 px-6 md:px-12 lg:px-24" style={{ opacity: 0 }}>
      <div className="gradient-line mb-12" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold" style={{ color: 'oklch(0.85 0.02 260)' }}>
            Tamilarasan
            <span style={{ color: 'oklch(0.65 0.25 260)' }}>.</span>
          </p>
          <p className="text-sm mt-1" style={{ color: 'oklch(0.4 0.03 260)' }}>
            Engineered with clarity, performance, and purpose.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {[
            { icon: Github, href: 'https://github.com/tamilgithubid', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/tamil-arasan-769b88247/', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:tamilarasansundarraj@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110"
              aria-label={label}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: 'oklch(0.4 0.05 260)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.65 0.25 260)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.4 0.05 260)')}
              />
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'oklch(0.3 0.02 260)' }}>
          {'\u00A9'} {new Date().getFullYear()} Tamilarasan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
