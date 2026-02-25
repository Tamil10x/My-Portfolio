"use client"

import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const { clientX, clientY } = e
      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const x = (clientX - left - width / 2) * strength
      const y = (clientY - top - height / 2) * strength
      gsap.to(ref.current, { x, y, duration: 0.4, ease: 'power2.out' })
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}
