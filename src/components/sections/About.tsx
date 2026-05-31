import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Heatmap from '../ui/Heatmap';
import { getEducation, getCertifications, Education, Certification } from '../../lib/dataAdapter';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<(SVGCircleElement | null)[]>([]);
  
  const [education, setEducation] = useState<Education[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);

  useEffect(() => {
    getEducation().then(setEducation);
    getCertifications().then(setCerts);
  }, []);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Text block reveal
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          }
        });
      }

      // Animate Radial Rings
      ringsRef.current.forEach((ring) => {
        if (!ring) return;
        const radius = ring.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const targetPercent = parseInt(ring.dataset.percent || '0');
        const offset = circumference - (targetPercent / 100) * circumference;

        gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference });
        gsap.to(ring, {
          strokeDashoffset: offset,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ring,
            start: 'top 85%'
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [education, certs]);

  const skills = [
    { name: 'React', percent: 95, color: 'var(--color-accent-cyan)' },
    { name: 'Next.js', percent: 90, color: 'var(--color-accent-purple)' },
    { name: 'Python', percent: 85, color: 'var(--color-accent-cyan)' },
    { name: 'GenAI/RAG', percent: 90, color: 'var(--color-accent-purple)' },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-32 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Bio & Philosophy */}
          <div ref={textRef} className="space-y-8">
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight uppercase">
              Engineered with <span className="text-[var(--color-accent-cyan)] italic">Clarity</span> & Purpose.
            </h2>
            <div className="font-sans text-lg text-white/70 space-y-6 font-light leading-relaxed">
              <p>
                I am <strong className="text-white">Tamilarasan Sundarraj</strong>, a detail-oriented Full Stack Developer with 3 years of experience specializing in creating production-ready web applications.
              </p>
              <p>
                From responsive, pixel-perfect React.js/Next.js frontends to scalable Python APIs (FastAPI) and intelligent Generative AI pipelines, I build end-to-end solutions serving thousands of active users.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <Heatmap />
            </div>
          </div>

          {/* Right Column: Skills, Education, Certs */}
          <div className="space-y-16">
            
            {/* Radial Skill Meters */}
            <div>
              <h3 className="font-mono text-sm text-white/50 uppercase tracking-widest mb-6">Technical Proficiency</h3>
              <div className="grid grid-cols-4 gap-4">
                {skills.map((skill, i) => (
                  <div key={skill.name} className="flex flex-col items-center gap-3">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Background Ring */}
                        <circle cx="50" cy="50" r="40" className="stroke-white/10 fill-none stroke-[4px]" />
                        {/* Animated Ring */}
                        <circle 
                          ref={el => { ringsRef.current[i] = el; }}
                          cx="50" cy="50" r="40" 
                          className="fill-none stroke-[4px] stroke-current drop-shadow-[0_0_8px_currentColor] transition-all"
                          style={{ color: skill.color }}
                          strokeLinecap="round"
                          data-percent={skill.percent}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white">
                        {skill.percent}%
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase text-white/60 tracking-wider">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-mono text-sm text-white/50 uppercase tracking-widest mb-6">Education</h3>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i} className="group border-l-2 border-white/10 pl-6 hover:border-[var(--color-accent-purple)] transition-colors">
                    <div className="font-mono text-[10px] text-[var(--color-accent-purple)] tracking-widest mb-1">{edu.period}</div>
                    <div className="font-display font-bold text-xl text-white mb-1">{edu.degree}</div>
                    <div className="font-sans text-sm text-white/60 mb-2">{edu.institution}</div>
                    <ul className="list-disc list-inside font-sans text-xs text-white/40 space-y-1">
                      {edu.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-mono text-sm text-white/50 uppercase tracking-widest mb-6">Certifications</h3>
              <div className="space-y-6">
                {certs.map((cert, i) => (
                  <div key={i} className="skew-on-scroll p-5 rounded-2xl glass-panel border border-white/5 hover:border-[var(--color-accent-cyan)]/50 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-display font-bold text-lg text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">{cert.title}</div>
                      <div className="font-mono text-[10px] bg-white/10 px-2 py-1 rounded text-white/60">{cert.year}</div>
                    </div>
                    <div className="font-sans text-xs text-[var(--color-accent-purple)] mb-2">{cert.issuer}</div>
                    <p className="font-sans text-sm font-light text-white/50">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
