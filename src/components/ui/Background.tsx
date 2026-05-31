import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aurora1 = useRef<HTMLDivElement>(null);
  const aurora2 = useRef<HTMLDivElement>(null);
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Aurora slow breathing / drifting
      gsap.to(aurora1.current, {
        x: '10vw',
        y: '5vh',
        scale: 1.1,
        rotation: 15,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(aurora2.current, {
        x: '-10vw',
        y: '-5vh',
        scale: 1.2,
        rotation: -15,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Floating Orbs Parallax linked to mouse (subtle)
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(orb1.current, {
          x: x * 40,
          y: y * 40,
          duration: 2,
          ease: 'power2.out'
        });

        gsap.to(orb2.current, {
          x: x * -60,
          y: y * -60,
          duration: 2.5,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden bg-[var(--color-base)] pointer-events-none">
      {/* Animated Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      ></div>

      {/* Aurora Blobs */}
      <div 
        ref={aurora1}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--color-accent-purple) 0%, transparent 70%)' }}
      ></div>
      <div 
        ref={aurora2}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] rounded-full opacity-20 blur-[150px]"
        style={{ background: 'radial-gradient(circle, var(--color-accent-cyan) 0%, transparent 70%)' }}
      ></div>

      {/* Floating Orbs */}
      <div 
        ref={orb1}
        className="absolute top-[30%] left-[20%] w-32 h-32 rounded-full opacity-30 blur-[40px]"
        style={{ background: 'var(--color-accent-purple)' }}
      ></div>
      <div 
        ref={orb2}
        className="absolute bottom-[20%] right-[30%] w-24 h-24 rounded-full opacity-30 blur-[30px]"
        style={{ background: 'var(--color-accent-cyan)' }}
      ></div>

      {/* SVG Noise / Film Grain Filter Overlay */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.15] mix-blend-overlay pointer-events-none z-50">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
