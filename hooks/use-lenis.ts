"use client"

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useLenis() {
  useEffect(() => {
    ScrollTrigger.config({ limitCallbacks: true })
    ScrollTrigger.defaults({ scroller: document.documentElement })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
}
