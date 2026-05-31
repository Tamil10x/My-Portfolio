import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { getStats, DeveloperStats } from '../../lib/dataAdapter';
import LiveClock from '../ui/LiveClock';
import FuturisticAvatar from '../ui/FuturisticAvatar';
import ParticleCanvas from '../ui/ParticleCanvas';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [stats, setStats] = useState<DeveloperStats | null>(null);

  // Counters refs
  const expRef = useRef<HTMLSpanElement>(null);
  const shippedRef = useRef<HTMLSpanElement>(null);

  // Video ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      const handleCanPlay = () => setVideoLoaded(true);
      videoRef.current.addEventListener('canplaythrough', handleCanPlay);
      return () => videoRef.current?.removeEventListener('canplaythrough', handleCanPlay);
    }
  }, []);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (!isReducedMotion) {
        // Loader exit
        tl.to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          delay: 0.5
        });

        // Kinetic Headline Reveal
        if (headlineRef.current) {
          const lines = headlineRef.current.querySelectorAll('.reveal-line');
          tl.from(lines, {
            y: 100,
            opacity: 0,
            rotationZ: 5,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out'
          }, "-=0.5");
        }
      } else {
        gsap.set(loaderRef.current, { display: 'none' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (stats && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (expRef.current) {
        gsap.fromTo(expRef.current, { innerHTML: 0 }, {
          innerHTML: stats.yearsOfExperience,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: { trigger: expRef.current, start: 'top 80%' }
        });
      }
      if (shippedRef.current) {
        gsap.fromTo(shippedRef.current, { innerHTML: 0 }, {
          innerHTML: stats.productsShipped,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: { trigger: shippedRef.current, start: 'top 80%' }
        });
      }
    }
  }, [stats]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoLoaded ? 0.3 : 0, transition: 'opacity 1.5s ease' }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to blend video with the cinematic design */}
        <div className="absolute inset-0 bg-[var(--color-base)]/85"></div>
        {/* Dynamic Neural Particle Canvas */}
        <ParticleCanvas />
      </div>

      {/* Page Loader */}
      <div ref={loaderRef} className="absolute inset-0 z-50 bg-[var(--color-base)] flex items-center justify-center pointer-events-none">
        <div className="text-white font-mono text-sm tracking-widest uppercase">Initializing<span className="animate-pulse">...</span></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Hero copy and CTAs) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="overflow-hidden mb-6">
               <div className="font-mono text-sm tracking-[0.3em] uppercase text-white/70">
                  <span className="text-[var(--color-accent-purple)]">{'>'} </span>
                  Full Stack Developer <span className="mx-2 text-white/30">|</span> GenAI & RAG Engineer
               </div>
            </div>

            <h1 ref={headlineRef} className="font-display font-black text-6xl md:text-8xl tracking-tight leading-[0.9] text-glow mb-6 uppercase">
              <div className="overflow-hidden"><div className="reveal-line pb-2">Tamilarasan.</div></div>
            </h1>
            
            <div className="font-mono text-lg md:text-xl text-[var(--color-accent-cyan)] tracking-wider mb-8">
              <span className="text-white/40">{'// '}</span>React.js · Next.js · Python
            </div>

            <p className="font-sans text-xl md:text-2xl text-white/70 max-w-2xl mb-12 font-light leading-relaxed">
              Building end-to-end, production-ready web applications — from scalable Python APIs to intelligent Generative AI pipelines and cinematic user experiences.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <a href="#work" className="magnetic glass-panel px-8 py-4 rounded-full font-sans font-medium text-white hover:bg-white/10 transition-colors border border-white/20">
                View Projects
              </a>
              <a href="mailto:tamilarasansundarraj@gmail.com" className="magnetic px-8 py-4 font-mono text-sm uppercase tracking-wider hover:text-[var(--color-accent-cyan)] transition-colors">
                Contact Me
              </a>
              <div className="ml-auto hidden md:block">
                <LiveClock />
              </div>
            </div>
          </div>

          {/* Right Column (Futuristic Interactive Avatar) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FuturisticAvatar />
          </div>

        </div>

        {/* Live Data Widgets (Count Up) */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          <div>
            <div className="font-display font-bold text-4xl text-[var(--color-accent-cyan)] mb-2">
              <span ref={expRef}>{stats?.yearsOfExperience || '0'}</span>+
            </div>
            <div className="font-mono text-xs text-white/50 uppercase tracking-widest">Years Experience</div>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-[var(--color-accent-purple)] mb-2">
              <span ref={shippedRef}>{stats?.productsShipped || '0'}</span>+
            </div>
            <div className="font-mono text-xs text-white/50 uppercase tracking-widest">Projects Shipped</div>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-white mb-2">
              100+
            </div>
            <div className="font-mono text-xs text-white/50 uppercase tracking-widest">Students Mentored</div>
          </div>
          <div>
            <div className="font-display font-bold text-4xl text-white mb-2">
              45%
            </div>
            <div className="font-mono text-xs text-white/50 uppercase tracking-widest">Load Time Reduced</div>
          </div>
        </div>
      </div>
    </section>
  );
}
