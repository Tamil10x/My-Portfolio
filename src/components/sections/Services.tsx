import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getServices, Service } from '../../lib/dataAdapter';
import { BrainCircuit, LayoutTemplate, Server } from 'lucide-react';
import VoiceAgentPlayground from '../ui/VoiceAgentPlayground';
import RagDebugger from '../ui/RagDebugger';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  'BrainCircuit': <BrainCircuit size={32} className="text-[var(--color-accent-purple)]" />,
  'LayoutTemplate': <LayoutTemplate size={32} className="text-[var(--color-accent-cyan)]" />,
  'Server': <Server size={32} className="text-white" />
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeGenAiTab, setActiveGenAiTab] = useState<'voice' | 'rag'>('voice');

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  useEffect(() => {
    if (services.length === 0) return;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Reveal Timeline
      gsap.fromTo(cardsRef.current, 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          },
          onComplete: () => {
            // 2. Infinite Staggered Floating Animation (Runs once the card has fully entered)
            cardsRef.current.forEach((card, index) => {
              if (!card) return;
              gsap.to(card, {
                y: -10, // Float up by 10px
                duration: 3 + index * 0.6, // Staggered cycle duration for asynchronous breathing
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.25 // Subtle staggered delay
              });
            });
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  // Premium Mouse Spotlight Glow Effect Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section ref={sectionRef} id="services" className="relative py-32 bg-[var(--color-base)] overflow-hidden">
      
      {/* Dynamic backlighting under bento grid */}
      <div className="absolute top-[20%] left-[50%] -translate-x-[50%] w-[60vw] h-[40vh] bg-[radial-gradient(circle,rgba(108,99,255,0.03),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <h2 className="font-display font-bold text-4xl md:text-5xl mb-16 text-center uppercase tracking-tight">
          Core <span className="text-glow text-[var(--color-accent-cyan)] italic">Expertise</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div 
              key={service.id}
              ref={el => { cardsRef.current[i] = el; }}
              onMouseMove={handleMouseMove}
              className={`group relative p-8 rounded-3xl glass-panel border border-white/10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Dynamic Interactive Mouse-Tracking Spotlight Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${
                    i === 0 
                      ? 'rgba(108,99,255,0.12)' 
                      : i === 1 
                        ? 'rgba(34,211,238,0.12)' 
                        : 'rgba(255,255,255,0.08)'
                  }, transparent 80%)`
                }}
              />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-6 p-4 inline-block rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">{service.title}</h3>
                  <p className="font-sans font-light text-white/60 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm font-mono text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)] mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Render Interactive Switchable Sandbox Console on GenAI Card */}
                {service.id === 'genai' && (
                  <div className="mt-8 border-t border-white/5 pt-6">
                    {/* High-tech selector switcher */}
                    <div className="flex gap-2 font-mono text-[9px] uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                      <button
                        onClick={() => setActiveGenAiTab('voice')}
                        className={`px-3 py-1 rounded-md border transition-all duration-300 cursor-pointer ${
                          activeGenAiTab === 'voice'
                            ? 'border-[var(--color-accent-cyan)]/30 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] font-semibold'
                            : 'border-white/5 text-white/40 hover:text-white'
                        }`}
                      >
                        [Voice Call Simulator]
                      </button>
                      <button
                        onClick={() => setActiveGenAiTab('rag')}
                        className={`px-3 py-1 rounded-md border transition-all duration-300 cursor-pointer ${
                          activeGenAiTab === 'rag'
                            ? 'border-[var(--color-accent-purple)]/30 bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)] font-semibold'
                            : 'border-white/5 text-white/40 hover:text-white'
                        }`}
                      >
                        [RAG Pipeline Tracer]
                      </button>
                    </div>

                    {/* Active Sandbox rendering */}
                    {activeGenAiTab === 'voice' ? <VoiceAgentPlayground /> : <RagDebugger />}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
