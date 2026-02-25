"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsapScrollTrigger() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return ref
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [speed])

  return ref
}

/**
 * Multi-layer parallax: returns refs for foreground, midground, background
 * at different scroll speeds for depth effect.
 */
export function useMultiLayerParallax(triggerRef: React.RefObject<HTMLElement | null>) {
  const fgRef = useRef<HTMLDivElement>(null)
  const mgRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!triggerRef.current) return

    const ctx = gsap.context(() => {
      const layers = [
        { ref: fgRef.current, speed: -20 },
        { ref: mgRef.current, speed: -40 },
        { ref: bgRef.current, speed: -60 },
      ]

      layers.forEach(({ ref, speed }) => {
        if (!ref) return
        gsap.to(ref, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })
    }, triggerRef)

    return () => ctx.revert()
  }, [triggerRef])

  return { fgRef, mgRef, bgRef }
}

/**
 * Depth blur parallax: elements blur as they scroll away from center viewport.
 */
export function useDepthBlurParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const el = ref.current
    gsap.to(el, {
      y: speed * -100,
      filter: 'blur(4px)',
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [speed])

  return ref
}

export { gsap, ScrollTrigger }
