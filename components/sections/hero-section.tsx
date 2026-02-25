"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, Mail, ChevronDown, Play } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
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
      // --- Entrance timeline ---
      const tl = gsap.timeline({ delay: 3.2 })

      // Video overlay fades to reveal
      tl.to(overlayRef.current, {
        opacity: 0.4,
        duration: 2,
        ease: 'power2.out',
      })

      // Image entrance - dramatic scale from large
      tl.fromTo(
        imageRef.current,
        { scale: 1.5, opacity: 0, y: 80, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.8, ease: 'power4.out' },
        '-=1.5'
      )

      // Name lines reveal with 3D rotation
      tl.fromTo(
        '.hero-line',
        { y: 140, opacity: 0, rotateX: -60, transformPerspective: 800 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.18, duration: 1.2, ease: 'power4.out' },
        '-=1'
      )

      // Subtitle fade up
      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.5'
      )

      // CTA buttons scale in
      tl.fromTo(
        '.cta-btn',
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.4'
      )

      // Social links slide in from left
      tl.fromTo(
        '.social-link',
        { x: -30, opacity: 0, scale: 0.5 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(2)' },
        '-=0.6'
      )

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.3'
      )

      // --- Scroll-driven parallax animations ---

      // Video zoom on scroll
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

      // Image parallax - moves up and fades while scaling down
      gsap.to(imageRef.current, {
        yPercent: -60,
        scale: 0.6,
        opacity: 0,
        filter: 'blur(10px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '80% top',
          scrub: 1.5,
        },
      })

      // Heading moves up faster (parallax depth)
      gsap.to(headingRef.current, {
        yPercent: -100,
        opacity: 0,
        scale: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      })

      // Subtitle parallax (different speed)
      gsap.to(subtitleRef.current, {
        yPercent: -40,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 0.8,
        },
      })

      // CTA buttons scatter on scroll
      gsap.to('.cta-btn', {
        y: -80,
        opacity: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '50% top',
          scrub: 1,
        },
      })

      // Social links slide out
      gsap.to(socialsRef.current, {
        x: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '40% top',
          scrub: 1,
        },
      })

      // Overlay darkens on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.95,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

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
        {/* Fallback gradient while video loads */}
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

      {/* Radial spotlight effect */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 45%, oklch(0.15 0.1 260 / 0.4), transparent)',
        }}
      />

      {/* Scan lines effect */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.03) 2px, oklch(0 0 0 / 0.03) 4px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center max-w-5xl mx-auto">
        {/* Hero Image */}
        <div ref={imageRef} className="relative mb-2" style={{ opacity: 0 }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden">
            <Image
              src="/images/hero.png"
              alt="Tamilarasan - Senior Software Engineer"
              fill
              className="object-cover object-top scale-110"
              priority
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
            />
            {/* Inner shadow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 0 0 60px oklch(0.04 0.02 260 / 0.5)',
              }}
            />
          </div>
          {/* Animated glow rings */}
          <div
            className="absolute -inset-2 rounded-full animate-pulse-glow"
            style={{
              border: '1px solid oklch(0.65 0.25 260 / 0.25)',
              boxShadow: '0 0 60px oklch(0.65 0.25 260 / 0.15), inset 0 0 60px oklch(0.65 0.25 260 / 0.05)',
            }}
          />
          <div
            className="absolute -inset-4 rounded-full"
            style={{
              border: '1px solid oklch(0.55 0.28 200 / 0.1)',
              animation: 'pulse-glow 4s ease-in-out infinite 1s',
            }}
          />
          {/* Orbiting dot */}
          <div
            className="absolute -inset-6 rounded-full"
            style={{ animation: 'spin 8s linear infinite' }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{
                background: 'oklch(0.65 0.25 260)',
                boxShadow: '0 0 12px oklch(0.65 0.25 260 / 0.8)',
              }}
            />
          </div>
        </div>

        {/* Heading */}
        <div ref={headingRef}>
          <div className="overflow-hidden">
            <div className="hero-line" style={{ opacity: 0 }}>
              <span
                className="text-sm md:text-base tracking-[0.4em] uppercase font-light inline-block"
                style={{ color: 'oklch(0.55 0.15 200)' }}
              >
                Senior Software Engineer
              </span>
            </div>
          </div>
          <div className="overflow-hidden mt-3">
            <div className="hero-line" style={{ opacity: 0 }}>
              <h1
                className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none"
                style={{ color: 'oklch(0.97 0.01 260)' }}
              >
                Tamilarasan
              </h1>
            </div>
          </div>
          <div className="overflow-hidden mt-2">
            <div className="hero-line" style={{ opacity: 0 }}>
              <p className="text-lg md:text-2xl font-light tracking-widest uppercase" style={{ color: 'oklch(0.5 0.1 260)' }}>
                React & Next.js Architect
              </p>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-2" style={{ opacity: 0 }}>
          <p
            className="max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ color: 'oklch(0.55 0.03 260)' }}
          >
            Building scalable, high-performance web applications with
            modern frontend architecture, AI-driven solutions, and cinematic user experiences.
          </p>
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex items-center gap-4 mt-4">
          <a
            href="#projects"
            className="cta-btn group relative px-8 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_oklch(0.65_0.25_260_/_0.4)]"
            style={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, oklch(0.55 0.25 260), oklch(0.5 0.2 240))',
              }}
            />
            <span className="relative z-10" style={{ color: 'oklch(0.98 0 0)' }}>View Projects</span>
          </a>
          <a
            href="#contact"
            className="cta-btn px-8 py-3.5 rounded-full font-medium text-sm tracking-wider uppercase glow-border transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_oklch(0.65_0.25_260_/_0.2)]"
            style={{ color: 'oklch(0.65 0.25 260)', opacity: 0 }}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Contact Me
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
        <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: 'oklch(0.4 0.05 260)' }}>
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: '1px solid oklch(0.3 0.08 260)' }}>
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: 'oklch(0.65 0.25 260)',
              animation: 'scrollDot 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
