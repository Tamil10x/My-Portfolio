"use client"

import { useState, useCallback, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useLenis } from '@/hooks/use-lenis'
import { LoadingScreen } from '@/components/loading-screen'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { Footer } from '@/components/footer'
import { TechMarquee } from '@/components/tech-marquee'
import { CustomCursor } from '@/components/custom-cursor'
import { FloatingDecorations } from '@/components/floating-decorations'
import { ScrollProgress } from '@/components/scroll-progress'

// Dynamic import for heavy 3D scene (pure Three.js, no R3F)
const SceneCanvas = dynamic(
  () => import('@/components/scenes/scene-canvas').then(mod => ({ default: mod.SceneCanvas })),
  { ssr: false, loading: () => null }
)

// Lazy load sections below the fold
const AboutSection = lazy(() =>
  import('@/components/sections/about-section').then(mod => ({ default: mod.AboutSection }))
)
const SkillsSection = lazy(() =>
  import('@/components/sections/skills-section').then(mod => ({ default: mod.SkillsSection }))
)
const ExperienceSection = lazy(() =>
  import('@/components/sections/experience-section').then(mod => ({ default: mod.ExperienceSection }))
)
const ProjectsSection = lazy(() =>
  import('@/components/sections/projects-section').then(mod => ({ default: mod.ProjectsSection }))
)
const PhilosophySection = lazy(() =>
  import('@/components/sections/philosophy-section').then(mod => ({ default: mod.PhilosophySection }))
)
const ExploringSection = lazy(() =>
  import('@/components/sections/exploring-section').then(mod => ({ default: mod.ExploringSection }))
)
const DifferentiatorsSection = lazy(() =>
  import('@/components/sections/differentiators-section').then(mod => ({ default: mod.DifferentiatorsSection }))
)
const ContactSection = lazy(() =>
  import('@/components/sections/contact-section').then(mod => ({ default: mod.ContactSection }))
)

function SectionDivider() {
  return (
    <div className="relative py-8 flex items-center justify-center">
      <div className="gradient-line w-full max-w-xs" />
    </div>
  )
}

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false)

  useLenis()

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      {loaded && (
        <>
          {/* Scroll progress */}
          <ScrollProgress />

          {/* Custom cursor */}
          <CustomCursor />

          {/* Floating decorations */}
          <FloatingDecorations />

          {/* 3D Background */}
          <SceneCanvas />

          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main className="relative z-10">
            <HeroSection />

            <TechMarquee />

            <Suspense fallback={null}>
              <AboutSection />
            </Suspense>

            <SectionDivider />

            <Suspense fallback={null}>
              <SkillsSection />
            </Suspense>

            <SectionDivider />

            <Suspense fallback={null}>
              <ExperienceSection />
            </Suspense>

            <TechMarquee />

            <Suspense fallback={null}>
              <PhilosophySection />
            </Suspense>

            <SectionDivider />

            <Suspense fallback={null}>
              <ProjectsSection />
            </Suspense>

            <SectionDivider />

            <Suspense fallback={null}>
              <ExploringSection />
            </Suspense>

            <SectionDivider />

            <Suspense fallback={null}>
              <DifferentiatorsSection />
            </Suspense>

            <TechMarquee />

            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>

            <Footer />
          </main>
        </>
      )}
    </>
  )
}
