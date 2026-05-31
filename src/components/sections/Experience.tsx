import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Full Stack Developer — Frontend, Backend & GenAI',
    company: '10xScale.ai',
    period: 'Nov 2022 — Present',
    location: 'Hyderabad, India',
    achievements: [
      'Designed and developed responsive UIs for AI-powered CRM and SaaS platforms serving 10,000+ active users.',
      'Architected end-to-end RAG pipelines using LangChain, improving chatbot accuracy by 40%.',
      'Designed scalable backend REST APIs using FastAPI and Flask (Python).',
      'Wrote unit and integration tests using Jest and React Testing Library; maintained >80% code coverage.',
    ]
  },
  {
    role: 'Technical Mentor & Educator',
    company: 'Community & Institutes',
    period: '2023 — Present',
    location: 'Remote',
    achievements: [
      'Trained 100+ students (online & offline) across key modern web technologies.',
      'Taught React.js, Next.js, JavaScript (ES6+), and full-stack System Design.',
      'Mentored students in LeetCode problem solving, Jest/Cypress testing, and Docker deployments.',
      'Hosted the FREE Web Dev Bootcamp 2026 for aspiring frontend developers.',
    ]
  },
  {
    role: 'Project Lead',
    company: 'Industry-Pilot',
    period: '2023 — 2024',
    location: 'Hybrid',
    achievements: [
      'Led end-to-end development of an Ed-Tech learning platform for beginner developers.',
      'Managed a cross-functional team of 5+ developers in Agile sprint environments.',
      'Designed backend APIs and oversaw cross-platform iOS/Android deployment via Flutter.',
    ]
  },
  {
    role: 'Freelance AI Developer',
    company: 'Independent',
    period: '2022 — 2023',
    location: 'Remote',
    achievements: [
      'Independently designed and shipped 4 full-stack AI projects including Wonder-AI and an AI Voice Agent.',
      'Implemented streaming responses via WebSockets and LLM-powered context memory.',
      'Built custom UI component registries to accelerate independent project delivery.'
    ]
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      // Instantly show everything on reduced motion
      if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 });
      itemsRef.current.forEach(item => {
        if (item) gsap.set(item, { opacity: 1, x: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Draw the central line down the timeline
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

      // Reveal timeline items from their respective columns
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const isLeft = index % 2 === 0;
        
        // Balanced slides: Left cards slide from left, right cards slide from right on desktop.
        // Mobile cards always slide from left.
        const startX = window.innerWidth >= 768 ? (isLeft ? -60 : 60) : -30;

        gsap.fromTo(item,
          { opacity: 0, x: startX },
          {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 overflow-hidden bg-[var(--color-base)]">
      
      {/* Subtle backlighting under timeline */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[30vw] bg-[radial-gradient(circle,rgba(34,211,238,0.01),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        <h2 className="font-display font-bold text-4xl md:text-5xl mb-24 text-center uppercase tracking-tight">
          Career <span className="text-glow text-[var(--color-accent-purple)] italic">Trajectory</span>
        </h2>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0">
          {/* Desktop Central Line */}
          <div 
            ref={lineRef} 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent-purple)] via-[var(--color-accent-cyan)] to-transparent origin-top"
          ></div>

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                ref={el => { itemsRef.current[index] = el; }}
                className={`relative pl-8 md:pl-0 md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} justify-between items-center w-full`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_10px_var(--color-accent-cyan)] z-10"></div>

                <div className="md:w-5/12 p-8 rounded-2xl glass-panel border border-white/10 hover:border-[var(--color-accent-cyan)]/30 hover:bg-white/[0.02] transition-all duration-300 group">
                  <div className="font-mono text-xs text-[var(--color-accent-purple)] mb-2 font-medium">{exp.period}</div>
                  <h3 className="font-display font-bold text-2xl mb-1 text-white group-hover:text-[var(--color-accent-cyan)] transition-colors leading-tight">{exp.role}</h3>
                  
                  <div className="font-sans text-white/50 text-sm mb-6 flex justify-between items-center pb-3 border-b border-white/5">
                    <span className="font-medium text-white/70">{exp.company}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest">{exp.location}</span>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="font-sans font-light text-sm text-white/60 flex items-start leading-relaxed">
                        <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-purple)] shrink-0"></span>
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
