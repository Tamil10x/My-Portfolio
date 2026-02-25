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
import { GlowTracer } from '@/components/glow-tracer'

// Dynamic import for heavy 3D scene (pure Three.js, no R3F)
const SceneCanvas = dynamic(
  () => import('@/components/scenes/scene-canvas').then(mod => ({ default: mod.SceneCanvas })),
  { ssr: false, loading: () => null }
)

// Lazy load quote divider
const QuoteDivider = lazy(() =>
  import('@/components/quote-divider').then(mod => ({ default: mod.QuoteDivider }))
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

const QUOTES = [
  { quote: "The best way to predict the future is to invent it.", author: "Alan Kay", highlightWords: ["predict", "future", "invent"] },
  { quote: "Code is like humor. When you have to explain it, it is bad.", author: "Cory House", highlightWords: ["humor", "explain", "bad"] },
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson", highlightWords: ["solve", "problem", "code"] },
  { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler", highlightWords: ["Good", "programmers", "humans", "understand"] },
  { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman", highlightWords: ["Simplicity", "soul", "efficiency"] },
  { quote: "Make it work, make it right, make it fast.", author: "Kent Beck", highlightWords: ["work", "right", "fast"] },
  { quote: "The only way to go fast is to go well.", author: "Robert C. Martin", highlightWords: ["fast", "well"] },
  { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", highlightWords: ["Innovation", "leader", "follower"] },
]

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

          {/* Glow tracer line */}
          <GlowTracer />

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

            <Suspense fallback={null}>
              <QuoteDivider {...QUOTES[0]} />
            </Suspense>

            <Suspense fallback={null}>
              <SkillsSection />
            </Suspense>

            <Suspense fallback={null}>
              <QuoteDivider {...QUOTES[1]} />
            </Suspense>

            <Suspense fallback={null}>
              <ExperienceSection />
            </Suspense>

            <Suspense fallback={null}>
              <QuoteDivider {...QUOTES[2]} />
            </Suspense>

            <TechMarquee />

            <Suspense fallback={null}>
              <PhilosophySection />
            </Suspense>

            <Suspense fallback={null}>
              <QuoteDivider {...QUOTES[3]} />
            </Suspense>

            <Suspense fallback={null}>
              <ProjectsSection />
            </Suspense>

            <Suspense fallback={null}>
              <QuoteDivider {...QUOTES[4]} />
            </Suspense>

            <Suspense fallback={null}>
              <ExploringSection />
            </Suspense>

            <Suspense fallback={null}>
              <QuoteDivider {...QUOTES[5]} />
            </Suspense>

            <Suspense fallback={null}>
              <DifferentiatorsSection />
            </Suspense>

            <Suspense fallback={null}>
              <QuoteDivider {...QUOTES[6]} />
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
