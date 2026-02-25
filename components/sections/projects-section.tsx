"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/section-heading'
import { ExternalLink, ArrowRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PROJECTS = [
  {
    id: 1, title: 'Hire10x.ai', subtitle: 'AI-Powered Hiring Platform',
    description: 'Streamlined recruitment workflows with AI-based candidate filtering, dynamic dashboards, and optimized performance for recruiter workflows.',
    tech: ['Next.js', 'Redux Toolkit', 'Firebase', 'GraphQL'],
    highlights: ['AI candidate filtering', 'Dynamic dashboards', 'Recruiter workflow optimization'],
    color: 'oklch(0.65 0.25 260)',
  },
  {
    id: 2, title: 'IndustryPilot', subtitle: 'Learning Ecosystem Platform',
    description: 'A structured learning ecosystem for aspiring developers with real-time learning progress tracking, scalable course modules, and student performance analytics.',
    tech: ['React', 'Next.js', 'Firebase', 'TanStack Query'],
    highlights: ['Full frontend architecture', 'Real-time progress tracking', 'Performance analytics'],
    color: 'oklch(0.55 0.28 200)',
  },
  {
    id: 3, title: 'Training10x.ai', subtitle: 'Corporate Website & Tools',
    description: 'SEO-optimized corporate website with onboarding, engagement tools, analytics tracking, and structured metadata for improved performance.',
    tech: ['Next.js', 'Tailwind CSS', 'Firebase'],
    highlights: ['SEO optimization', 'Analytics tracking', 'Performance improvement'],
    color: 'oklch(0.65 0.25 260)',
  },
  {
    id: 4, title: 'TaskPilot', subtitle: 'Micro-Task Management Platform',
    description: 'Online earning & micro-task management platform with task tracking dashboards, wallet system, and role-based access architecture.',
    tech: ['React', 'Firebase', 'Redux'],
    highlights: ['Task tracking dashboards', 'Wallet system', 'Role-based access'],
    color: 'oklch(0.55 0.28 200)',
  },
  {
    id: 5, title: 'ResumePilot', subtitle: 'AI Resume Builder',
    description: 'AI-powered modern resume builder with AI suggestions, live preview engine, PDF export system, and template architecture.',
    tech: ['Next.js', 'Tailwind', 'Firebase'],
    highlights: ['AI resume suggestions', 'Live preview engine', 'PDF export system'],
    color: 'oklch(0.65 0.25 260)',
  },
  {
    id: 6, title: 'EduMaster', subtitle: 'Mobile Learning App (Flutter)',
    description: 'Mobile-first learning application with course video streaming, student tracking system, and real-time notifications.',
    tech: ['Flutter', 'Firebase', 'Dart'],
    highlights: ['Video streaming', 'Student tracking', 'Real-time notifications'],
    color: 'oklch(0.55 0.28 200)',
  },
  {
    id: 7, title: 'DevAnalytics', subtitle: 'Enterprise Analytics Dashboard',
    description: 'Enterprise-grade analytics dashboard with real-time data visualization, role-based dashboards, and optimized API data fetching.',
    tech: ['React', 'Recharts', 'TanStack Query'],
    highlights: ['Real-time visualization', 'Role-based dashboards', 'Optimized fetching'],
    color: 'oklch(0.65 0.25 260)',
  },
  {
    id: 8, title: 'E-Commerce Store', subtitle: 'Performance Optimized Store',
    description: 'High-performance SEO-ready eCommerce platform with server-side rendering, cart system with optimistic updates, and Core Web Vitals optimized.',
    tech: ['Next.js', 'GraphQL', 'Firebase'],
    highlights: ['SSR', 'Optimistic updates', 'Web Vitals optimized'],
    color: 'oklch(0.55 0.28 200)',
  },
]

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const glowLineRef = useRef<HTMLDivElement>(null)

  // 3D tilt on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(cardRef.current, {
      rotateY: x * 12,
      rotateX: -y * 8,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    setIsHovered(false)
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
  }, [])

  useEffect(() => {
    if (!cardRef.current) return

    const isEven = index % 2 === 0
    gsap.fromTo(
      cardRef.current,
      {
        y: 100,
        x: isEven ? -50 : 50,
        opacity: 0,
        filter: 'blur(6px)',
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      }
    )

    // Glow accent line traces top border on scroll
    if (glowLineRef.current) {
      gsap.fromTo(
        glowLineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className="group glass rounded-2xl overflow-hidden transition-shadow duration-500 cursor-pointer"
      style={{
        opacity: 0,
        boxShadow: isHovered ? `0 0 50px ${project.color}22, 0 20px 40px oklch(0 0 0 / 0.3)` : 'none',
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top accent line — glowing trace */}
      <div
        ref={glowLineRef}
        className="h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          boxShadow: `0 0 8px ${project.color}`,
        }}
      />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-mono tracking-wider gradient-text-animated">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3
              className="text-xl md:text-2xl font-bold tracking-tight mt-1 transition-colors duration-300"
              style={{ color: isHovered ? project.color : 'oklch(0.95 0.01 260)' }}
            >
              {project.title}
            </h3>
            <p className="text-sm mt-1" style={{ color: 'oklch(0.55 0.05 260)' }}>{project.subtitle}</p>
          </div>
          <ExternalLink
            className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{ color: isHovered ? project.color : 'oklch(0.4 0.05 260)' }}
          />
        </div>

        <p className="text-sm leading-relaxed mb-6" style={{ color: 'oklch(0.55 0.03 260)' }}>
          {project.description}
        </p>

        <div className="space-y-2 mb-6">
          {project.highlights.map((h) => (
            <div key={h} className="flex items-center gap-2">
              <ArrowRight className="w-3 h-3 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color: project.color }} />
              <span className="text-xs" style={{ color: 'oklch(0.6 0.03 260)' }}>{h}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase transition-all duration-300"
              style={{
                background: isHovered ? `${project.color}15` : 'oklch(0.12 0.02 260)',
                color: isHovered ? project.color : 'oklch(0.55 0.1 260)',
                border: `1px solid ${isHovered ? `${project.color}40` : 'oklch(0.2 0.03 260)'}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background glow parallax
      gsap.to('.projects-bg-glow', {
        yPercent: -50,
        xPercent: 20,
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

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg" />

      <div
        className="projects-bg-glow absolute top-40 left-1/4 w-[500px] h-[500px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, oklch(0.55 0.28 200), transparent)', filter: 'blur(120px)' }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionHeading number="04" title="Projects" subtitle="What I have built" />
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
