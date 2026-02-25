"use client"

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

// Pure Three.js scene - no React Three Fiber
export function SceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0a1a, 15, 55)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 15)

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)
    const pointLight1 = new THREE.PointLight(0x4f46e5, 0.5)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)
    const pointLight2 = new THREE.PointLight(0x06b6d4, 0.3)
    pointLight2.position.set(-10, -10, 5)
    scene.add(pointLight2)

    // Particles
    const PARTICLE_COUNT = 1200
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.4 + Math.random() * 0.3)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Floating orbs
    const orbData = [
      { pos: [-8, 3, -5], color: 0x4f46e5, speed: 0.3, size: 0.8 },
      { pos: [6, -2, -8], color: 0x06b6d4, speed: 0.5, size: 0.6 },
      { pos: [-3, -4, -3], color: 0x8b5cf6, speed: 0.4, size: 0.5 },
      { pos: [8, 5, -10], color: 0x3b82f6, speed: 0.2, size: 1 },
      { pos: [-5, 6, -7], color: 0x06b6d4, speed: 0.35, size: 0.7 },
      { pos: [3, -5, -6], color: 0x4f46e5, speed: 0.45, size: 0.4 },
    ]

    const orbs: THREE.Mesh[] = []
    orbData.forEach((o) => {
      const geo = new THREE.SphereGeometry(o.size, 32, 32)
      const mat = new THREE.MeshStandardMaterial({
        color: o.color,
        emissive: o.color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.3,
        roughness: 0.2,
        metalness: 0.8,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(o.pos[0], o.pos[1], o.pos[2])
      mesh.userData = { initial: new THREE.Vector3(o.pos[0], o.pos[1], o.pos[2]), speed: o.speed }
      scene.add(mesh)
      orbs.push(mesh)
    })

    // Animation
    const clock = new THREE.Clock()
    let animationId: number

    function animate() {
      animationId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Animate particles
      particles.rotation.y = t * 0.02
      particles.rotation.x = Math.sin(t * 0.01) * 0.1

      const posArr = particleGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArr[i * 3 + 1] += Math.sin(t * 0.3 + i * 0.01) * 0.002
      }
      particleGeometry.attributes.position.needsUpdate = true

      // Animate orbs
      orbs.forEach((orb) => {
        const { initial, speed } = orb.userData as { initial: THREE.Vector3; speed: number }
        orb.position.x = initial.x + Math.sin(t * speed) * 2
        orb.position.y = initial.y + Math.cos(t * speed * 0.7) * 1.5
        orb.position.z = initial.z + Math.sin(t * speed * 0.5) * 1
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      orbs.forEach((o) => {
        (o.geometry as THREE.BufferGeometry).dispose();
        (o.material as THREE.Material).dispose()
      })
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      rendererRef.current = null
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default SceneCanvas
