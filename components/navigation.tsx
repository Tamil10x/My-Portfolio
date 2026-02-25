"use client"

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useMagnetic } from '@/hooks/use-magnetic'

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function NavItem({ label, href }: { label: string; href: string }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.2)

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <a
        href={href}
        className="relative text-sm tracking-wider uppercase transition-colors duration-300 hover:text-primary group px-3 py-2"
        style={{ color: 'oklch(0.6 0.02 260)' }}
        onClick={(e) => {
          e.preventDefault()
          const el = document.querySelector(href)
          el?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        {label}
        <span
          className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
          style={{ background: 'oklch(0.65 0.25 260)' }}
        />
      </a>
    </div>
  )
}

export function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power3.out' }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500 ${
        scrolled ? 'glass-strong' : ''
      }`}
      style={{ opacity: 0 }}
    >
      <a
        href="#hero"
        className="text-xl font-bold tracking-tight"
        style={{ color: 'oklch(0.95 0.01 260)' }}
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        Tamil
        <span style={{ color: 'oklch(0.65 0.25 260)' }}>.</span>
      </a>

      <div className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      <a
        href="#contact"
        className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 glow-border hover:scale-105"
        style={{ color: 'oklch(0.65 0.25 260)' }}
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Let&apos;s Talk
      </a>
    </nav>
  )
}
