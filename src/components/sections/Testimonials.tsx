import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { getTestimonials, Testimonial } from '../../lib/dataAdapter';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Infinite Marquee
      const track = trackRef.current;
      if (track) {
        // Clone the content for seamless looping
        const content = track.innerHTML;
        track.innerHTML = content + content;

        gsap.to(track, {
          xPercent: -50,
          ease: 'none',
          duration: 30, // Adjust for speed
          repeat: -1,
        });
      }
    }, marqueeRef);

    return () => ctx.revert();
  }, [testimonials]);

  return (
    <section id="testimonials" className="relative py-24 bg-[var(--color-base)] overflow-hidden border-t border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-accent-purple)_0%,transparent_50%)] opacity-[0.03] pointer-events-none"></div>

      <div className="mb-16 max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-sm tracking-[0.3em] uppercase text-white/50 text-center">
          Industry <span className="text-[var(--color-accent-purple)]">Recognition</span>
        </h2>
      </div>

      <div ref={marqueeRef} className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-base)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-base)] to-transparent z-10 pointer-events-none"></div>

        <div ref={trackRef} className="flex gap-8 w-fit px-4">
          {testimonials.map((test, i) => (
            <div 
              key={`${test.id}-${i}`}
              className="w-[400px] md:w-[500px] shrink-0 p-8 md:p-10 rounded-3xl glass-panel border border-white/10 hover:border-[var(--color-accent-purple)]/50 transition-colors"
            >
              <Quote className="text-[var(--color-accent-purple)]/40 mb-6" size={40} />
              <p className="font-sans text-lg md:text-xl font-light text-white/80 leading-relaxed mb-8">
                "{test.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-display font-bold text-xl text-[var(--color-accent-cyan)]">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-bold text-white">{test.name}</div>
                  <div className="font-mono text-xs text-white/50 uppercase tracking-widest">{test.role} · {test.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
