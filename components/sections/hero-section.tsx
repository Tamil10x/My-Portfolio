"use client"

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const typewriterRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
      const handleCanPlay = () => setVideoLoaded(true)
      videoRef.current.addEventListener('canplaythrough', handleCanPlay)
      return () => videoRef.current?.removeEventListener('canplaythrough', handleCanPlay)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 })

      // Video overlay fades to reveal
      tl.to(overlayRef.current, {
        opacity: 0.4,
        duration: 2,
        ease: 'power2.out',
      })

      // Code bracket decorations fade in
      const brackets = sectionRef.current?.querySelectorAll('.hero-bracket')
      if (brackets) {
        tl.fromTo(
          brackets,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: 'back.out(2)' },
          '-=1.5'
        )
      }

      // Character cascade animation for name
      const heroChars = sectionRef.current?.querySelectorAll('.hero-char')
      if (heroChars) {
        tl.fromTo(
          heroChars,
          { rotateX: -90, opacity: 0, y: 80, transformPerspective: 800 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 1.4,
            ease: 'power4.out',
          },
          '-=0.8'
        )
      }

      // After name reveals, add glow effect
      tl.add(() => {
        if (nameRef.current) {
          nameRef.current.classList.add('glow-text')
        }
      })

      // Typewriter for "Senior Software Engineer"
      tl.add(() => {
        if (!typewriterRef.current) return
        const text = 'Senior Software Engineer'
        let i = 0
        typewriterRef.current.textContent = ''
        const timer = setInterval(() => {
          if (typewriterRef.current && i < text.length) {
            typewriterRef.current.textContent = text.slice(0, i + 1)
            i++
          } else {
            clearInterval(timer)
          }
        }, 60)
      }, '-=0.6')

      // Typewriter container fade in
      tl.fromTo(
        sectionRef.current?.querySelector('.hero-typewriter'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '<'
      )

      // "// React & Next.js Architect" code comment subtitle
      tl.fromTo(
        sectionRef.current?.querySelector('.hero-role-text'),
        { y: 30, opacity: 0, x: -20 },
        { y: 0, opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=1'
      )

      // Description paragraph fade up
      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.5'
      )

      // CTA buttons — staggered entrance with spring
      const ctaBtns = sectionRef.current?.querySelectorAll('.cta-btn')
      if (ctaBtns) {
        tl.fromTo(
          ctaBtns,
          { scale: 0.8, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'back.out(1.7)' },
          '-=0.4'
        )
      }

      // Arrow icon slide-in on View Projects button
      const arrowIcon = sectionRef.current?.querySelector('.cta-arrow')
      if (arrowIcon) {
        tl.fromTo(
          arrowIcon,
          { x: -10, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.5'
        )
      }

      // Social links slide in from left
      const socialLinks = sectionRef.current?.querySelectorAll('.social-link')
      if (socialLinks) {
        tl.fromTo(
          socialLinks,
          { x: -30, opacity: 0, scale: 0.5 },
          { x: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(2)' },
          '-=0.6'
        )
      }

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.3'
      )

      // --- Scroll-driven parallax ---

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          if (videoContainerRef.current) {
            gsap.set(videoContainerRef.current, {
              scale: 1 + p * 0.3,
              filter: `blur(${p * 8}px)`,
            })
          }
        },
      })

      gsap.to(headingRef.current, {
        yPercent: -100,
        opacity: 0,
        scale: 0.9,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '60% top', scrub: 1 },
      })

      gsap.to(subtitleRef.current, {
        yPercent: -40,
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '50% top', scrub: 0.8 },
      })

      if (ctaBtns) {
        gsap.to(ctaBtns, {
          y: -80, opacity: 0, stagger: 0.05,
          scrollTrigger: { trigger: sectionRef.current, start: '10% top', end: '50% top', scrub: 1 },
        })
      }

      gsap.to(socialsRef.current, {
        x: -60, opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: '10% top', end: '40% top', scrub: 1 },
      })

      gsap.to(overlayRef.current, {
        opacity: 0.95,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nameChars = 'Tamilarasan'.split('')

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div ref={videoContainerRef} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.12 0.08 260 / 0.8), oklch(0.05 0.02 260))',
            opacity: videoLoaded ? 0 : 1,
            transition: 'opacity 1.5s ease',
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, oklch(0.04 0.02 260 / 0.7) 0%, oklch(0.04 0.02 260 / 0.5) 40%, oklch(0.04 0.02 260 / 0.8) 100%)',
          opacity: 0.85,
        }}
      />

      {/* Radial spotlight */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 45%, oklch(0.15 0.1 260 / 0.4), transparent)' }}
      />

      {/* Scan lines */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.03) 2px, oklch(0 0 0 / 0.03) 4px)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center max-w-6xl mx-auto">
        <div ref={headingRef}>
          {/* Typewriter — code-style font */}
          <div className="overflow-hidden mb-5">
            <div className="hero-typewriter" style={{ opacity: 0 }}>
              <span className="font-code text-sm md:text-base tracking-[0.3em] uppercase inline-flex items-center gap-2">
                <span style={{ color: 'oklch(0.45 0.1 200)' }}>{'>'}</span>
                <span ref={typewriterRef} style={{ color: 'oklch(0.65 0.25 260)' }}></span>
                <span className="typewriter-cursor" />
              </span>
            </div>
          </div>

          {/* Name — code font with decorative brackets */}
          <div className="overflow-hidden">
            <div className="flex items-center justify-center gap-3 md:gap-5">
              {/* Opening bracket */}
              <span
                className="hero-bracket code-bracket text-4xl md:text-6xl lg:text-8xl"
                style={{ color: 'oklch(0.45 0.15 260)', opacity: 0 }}
              >
                {'<'}
              </span>

              <h1
                ref={nameRef}
                className="font-code text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tight leading-none"
                style={{ color: 'oklch(0.97 0.01 260)' }}
              >
                {nameChars.map((char, i) => (
                  <span key={i} className="hero-char inline-block" style={{ opacity: 0 }}>
                    {char}
                  </span>
                ))}
              </h1>

              {/* Closing bracket */}
              <span
                className="hero-bracket code-bracket text-4xl md:text-6xl lg:text-8xl"
                style={{ color: 'oklch(0.45 0.15 260)', opacity: 0 }}
              >
                {'/>'}
              </span>
            </div>
          </div>

          {/* Role — styled as code comment */}
          <div className="overflow-hidden mt-4">
            <p className="hero-role-text font-code text-base md:text-xl tracking-wider" style={{ opacity: 0 }}>
              <span style={{ color: 'oklch(0.4 0.08 200)' }}>{'// '}</span>
              <span style={{ color: 'oklch(0.55 0.15 200)' }}>React</span>
              <span style={{ color: 'oklch(0.4 0.05 260)' }}>{' & '}</span>
              <span style={{ color: 'oklch(0.55 0.15 200)' }}>Next.js</span>
              <span style={{ color: 'oklch(0.4 0.05 260)' }}>{' Architect'}</span>
            </p>
          </div>
        </div>

        {/* Description with keyword highlights */}
        <div ref={subtitleRef} className="mt-3" style={{ opacity: 0 }}>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed font-light" style={{ color: 'oklch(0.5 0.03 260)' }}>
            Building{' '}
            <span className="font-code text-sm" style={{ color: 'oklch(0.65 0.25 260)' }}>scalable</span>,{' '}
            <span className="font-code text-sm" style={{ color: 'oklch(0.55 0.28 200)' }}>high-performance</span>{' '}
            web applications with modern frontend architecture, AI-driven solutions, and cinematic user experiences.
          </p>
        </div>

        {/* CTA Buttons — animated */}
        <div ref={ctaRef} className="flex items-center gap-5 mt-6">
          {/* View Projects — primary with animated border + arrow */}
          <a
            href="#projects"
            className="cta-btn btn-glow-border btn-pulse-glow group relative px-8 py-3.5 rounded-full font-code font-medium text-sm tracking-wider uppercase overflow-visible transition-all duration-500"
            style={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <div
              className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, oklch(0.55 0.25 260), oklch(0.45 0.2 240))' }}
            />
            <span className="relative z-10 flex items-center gap-2" style={{ color: 'oklch(0.98 0 0)' }}>
              View Projects
              <ArrowRight className="cta-arrow w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </a>

          {/* Contact Me — outline with glow */}
          <a
            href="#contact"
            className="cta-btn btn-glow-border group relative px-8 py-3.5 rounded-full font-code font-medium text-sm tracking-wider uppercase overflow-visible transition-all duration-500 hover:scale-105"
            style={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="relative z-10 transition-colors duration-300" style={{ color: 'oklch(0.65 0.25 260)' }}>
              Contact Me
            </span>
          </a>
        </div>
      </div>

      {/* Social links - left side */}
      <div
        ref={socialsRef}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-10"
      >
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
            className="social-link group transition-all duration-300 hover:scale-125"
            aria-label={label}
            style={{ opacity: 0 }}
          >
            <Icon
              className="w-5 h-5 transition-all duration-300"
              style={{ color: 'oklch(0.4 0.05 260)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'oklch(0.65 0.25 260)'
                e.currentTarget.style.filter = 'drop-shadow(0 0 8px oklch(0.65 0.25 260 / 0.6))'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'oklch(0.4 0.05 260)'
                e.currentTarget.style.filter = 'none'
              }}
            />
          </a>
        ))}
        <div className="w-px h-20 mx-auto" style={{ background: 'linear-gradient(180deg, oklch(0.35 0.1 260), transparent)' }} />
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        style={{ opacity: 0 }}
      >
        <span className="font-code text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.4 0.05 260)' }}>
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: '1px solid oklch(0.3 0.08 260)' }}>
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: 'oklch(0.65 0.25 260)', animation: 'scrollDot 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
