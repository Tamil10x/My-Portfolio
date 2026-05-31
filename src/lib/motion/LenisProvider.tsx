import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    // Advanced Lenis config for cinematic scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    // Wire Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Advanced dynamic scrolling physics: Velocity-based Skew
    const skewElements = document.querySelectorAll('.skew-on-scroll');
    const setters = Array.from(skewElements).map((el) => gsap.quickTo(el, "skewY", { ease: "power3", duration: 0.5 }));

    lenis.on('scroll', (e: any) => {
      // e.velocity gives the current scroll speed
      const velocity = e.velocity || 0;
      // Clamp the skew so it doesn't break the layout at high speeds
      const maxSkew = 5;
      let skew = velocity * 0.15;
      skew = Math.max(-maxSkew, Math.min(maxSkew, skew));

      setters.forEach(set => set(skew));
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
