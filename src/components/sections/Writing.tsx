import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getInsights, Insight } from '../../lib/dataAdapter';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Writing() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    getInsights().then((data) => {
      setInsights(data);
      // Wait for DOM to paint, then recalculate offsets
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
  }, []);

  useEffect(() => {
    if (insights.length === 0) return;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      const validRows = rowsRef.current.filter(Boolean);
      gsap.set(validRows, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const validRows = rowsRef.current.filter(Boolean);
      
      gsap.fromTo(validRows, 
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [insights]);

  return (
    <section ref={sectionRef} id="insights" className="relative py-28 bg-[var(--color-base)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Clean, Structured Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono text-xs text-[var(--color-accent-cyan)] tracking-[0.25em] uppercase mb-3">
              // Engineering logs
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-3 text-white uppercase">
              Architectural Insights
            </h2>
            <p className="font-sans text-base text-white/50 font-light">
              System architecture, machine learning pipelines, and backend performance.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-accent-cyan)] hover:text-white transition-colors group">
            View All Articles 
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Structured Horizontal List Table */}
        <div className="border-t border-white/10 mt-8">
          {insights.map((insight, index) => (
            <div 
              key={insight.id}
              ref={el => { rowsRef.current[index] = el; }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-white/10 transition-all duration-300 cursor-pointer px-3"
              style={{ opacity: 0 }}
            >
              
              {/* Glassmorphic hover backdrop reveal sliding upwards */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-purple)]/[0.03] to-[var(--color-accent-cyan)]/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 pointer-events-none" />

              {/* Left/Middle: Structured Metadata and Medium Title */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 flex-1 mr-4">
                
                {/* Meta block with category and date */}
                <div className="flex items-center gap-4 w-44 shrink-0">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono uppercase tracking-wider text-white/70 group-hover:border-[var(--color-accent-cyan)] group-hover:text-[var(--color-accent-cyan)] transition-colors">
                    {insight.category}
                  </span>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider shrink-0">
                    {insight.date}
                  </span>
                </div>

                {/* Medium Title Typography */}
                <h3 className="font-sans font-medium text-base md:text-[17px] text-white/80 group-hover:text-white transition-colors leading-relaxed">
                  {insight.title}
                </h3>
              </div>

              {/* Right Column details (Read Time & Rotating Arrow Icon) */}
              <div className="relative z-10 flex items-center justify-between md:justify-end gap-6 mt-3 md:mt-0 shrink-0">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  {insight.readTime}
                </span>
                
                {/* Medium arrow indicator */}
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-[var(--color-accent-cyan)] group-hover:bg-[var(--color-accent-cyan)]/10 transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <button className="md:hidden mt-8 w-full py-4 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-colors">
          View All Articles <ArrowUpRight size={14} />
        </button>

      </div>
    </section>
  );
}
