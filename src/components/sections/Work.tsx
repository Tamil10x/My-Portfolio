import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getCaseStudies, CaseStudy } from '../../lib/dataAdapter';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sparklineRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    getCaseStudies().then(setStudies);
  }, []);

  useEffect(() => {
    if (studies.length === 0) return;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Draw the central glowing line
      if (!isReducedMotion) {
        gsap.fromTo(lineRef.current, 
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true
            }
          }
        );
      }

      // Reveal timeline items
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const xOffset = index % 2 === 0 ? 50 : -50;
        
        gsap.fromTo(item,
          { opacity: 0, x: isReducedMotion ? 0 : xOffset, y: 50 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 50%',
              scrub: true
            }
          }
        );
      });

      // Animate SVG Sparklines
      if (!isReducedMotion) {
        sparklineRefs.current.forEach((path) => {
          if (!path) return;
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: path,
              start: 'top 85%'
            }
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [studies]);

  const generatePath = (data: number[], width: number, height: number) => {
    if (!data || data.length === 0) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    
    return data.map((val, i) => {
      const x = i * stepX;
      const y = height - ((val - min) / range) * (height - 20) - 10;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <section ref={sectionRef} id="work" className="relative py-32 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 w-full relative">
        <h2 className="font-display font-bold text-5xl md:text-7xl mb-24 text-center tracking-tighter uppercase">
          Selected <span className="text-glow text-[var(--color-accent-purple)]">Works.</span>
        </h2>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0">
          
          {/* Desktop Central Line */}
          <div 
            ref={lineRef} 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-accent-purple)] via-[var(--color-accent-cyan)] to-transparent origin-top"
          ></div>

          <div className="space-y-32">
            {studies.map((study, index) => (
              <div 
                key={study.id}
                ref={el => { itemsRef.current[index] = el; }}
                className={`relative pl-8 md:pl-0 md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} justify-between items-center w-full`}
              >
                
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_15px_var(--color-accent-cyan)] z-10 border border-black"></div>

                <div className={`md:w-[40%] skew-on-scroll group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-500 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  
                  {/* Top Gradient Glow */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

                  {study.image && (
                    <div className="w-full aspect-square overflow-hidden relative border-b border-white/5 bg-[#0a0a0a]">
                      <img src={study.image} alt={study.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 opacity-100" />
                    </div>
                  )}

                  <div className={`p-6 md:p-8 relative z-10 ${study.image ? 'pt-6' : ''}`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="font-mono text-xs text-[var(--color-accent-purple)] uppercase tracking-widest">{study.role}</div>
                      <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full">0{index + 1}</div>
                    </div>
                    
                    <h3 className="font-display font-black text-3xl md:text-4xl mb-4 text-white group-hover:text-[var(--color-accent-cyan)] transition-colors leading-none tracking-tight">{study.title}</h3>
                    <p className="font-sans font-light text-base text-white/70 mb-8 leading-relaxed">{study.description}</p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="border-l-2 border-[var(--color-accent-purple)]/50 pl-4">
                        <h4 className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-accent-purple)] mb-2">The Problem</h4>
                        <p className="font-sans text-sm font-light text-white/60 line-clamp-2">{study.problem}</p>
                      </div>
                      <div className="border-l-2 border-[var(--color-accent-cyan)]/50 pl-4">
                        <h4 className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-accent-cyan)] mb-2">The Approach</h4>
                        <p className="font-sans text-sm font-light text-white/60 line-clamp-2">{study.approach}</p>
                      </div>
                    </div>

                    {/* Integrated Sparkline Background */}
                    <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0 mix-blend-screen">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[var(--color-accent-cyan)]/30 to-transparent"></div>
                        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full stroke-[var(--color-accent-cyan)] fill-none stroke-[2px] vector-effect-non-scaling-stroke">
                          <path 
                            ref={el => { sparklineRefs.current[index] = el; }}
                            d={generatePath(study.sparklineData, 1000, 200)} 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                    </div>

                    <div className="relative z-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-8 mt-4">
                      {study.impactMetrics.map((metric, i) => (
                        <div key={i} className="text-center">
                          <div className="font-display font-bold text-2xl text-white mb-1 tracking-tight">{metric.value}</div>
                          <div className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-accent-purple)] leading-tight">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="relative z-10 flex flex-wrap gap-2 pt-6">
                      {study.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 text-[9px] uppercase font-mono text-white/50 tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block md:w-[40%]"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
