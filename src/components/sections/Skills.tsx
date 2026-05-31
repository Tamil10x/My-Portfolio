import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Layout, Server, Database, GitBranch, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  desc: string;
  category: 'frontend' | 'backend' | 'genai' | 'database' | 'devops' | 'testing';
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  const col1: SkillItem[] = [
    { name: 'React.js', desc: 'Hooks, Context API', category: 'frontend' },
    { name: 'Next.js', desc: 'App Router, Server Components', category: 'frontend' },
    { name: 'TypeScript', desc: 'Strict Typed Logic', category: 'frontend' },
    { name: 'JavaScript', desc: 'ES6+ Architecture', category: 'frontend' },
    { name: 'Tailwind CSS', desc: 'Fluid Design System', category: 'frontend' },
    { name: 'Shadcn/UI', desc: 'Accessible Radix Components', category: 'frontend' },
    { name: 'Figma', desc: 'High-Fidelity Prototyping', category: 'frontend' },
    { name: 'Responsive Design', desc: 'Fluid Grid Layouts', category: 'frontend' },
    { name: 'Cross-Browser', desc: 'Compatibility & Testing', category: 'frontend' },
    { name: 'Component-Driven', desc: 'Atomic Architecture', category: 'frontend' },
    { name: 'Storybook', desc: 'Isolated Component Testing', category: 'frontend' },
    { name: 'Redux', desc: 'Global State Stores', category: 'frontend' },
    { name: 'React Context API', desc: 'Subtree State Management', category: 'frontend' },
    { name: 'Client & Server State', desc: 'Data Sync & Cache', category: 'frontend' }
  ];

  const col2: SkillItem[] = [
    { name: 'LangChain', desc: 'Agent & Chain Orchestration', category: 'genai' },
    { name: 'OpenAI API', desc: 'GPT-4 Models Integration', category: 'genai' },
    { name: 'Claude API', desc: 'Anthropic LLMs Integration', category: 'genai' },
    { name: 'Hugging Face', desc: 'Transformer Model Sync', category: 'genai' },
    { name: 'RAG Pipelines', desc: 'Retrieval-Augmented Gen', category: 'genai' },
    { name: 'Prompt Engineering', desc: 'Context & Prompt Opt', category: 'genai' },
    { name: 'Embeddings', desc: 'Semantic Vector Math', category: 'genai' },
    { name: 'Pinecone', desc: 'Serverless Vector DB', category: 'database' },
    { name: 'Chroma', desc: 'Open-Source Embeddings DB', category: 'database' },
    { name: 'Typesense', desc: 'Fast Search Engine DB', category: 'database' },
    { name: 'AI Chatbots', desc: 'Conversational Pipelines', category: 'genai' },
    { name: 'Voice Agents', desc: 'Speech-to-Text Pipelines', category: 'genai' },
    { name: 'MCP Protocols', desc: 'Model Context Protocol', category: 'genai' },
    { name: 'PostgreSQL', desc: 'Relational Database', category: 'database' },
    { name: 'MongoDB', desc: 'Document Storage NoSQL', category: 'database' },
    { name: 'Redis', desc: 'High-Performance Caching', category: 'database' },
    { name: 'Firebase', desc: 'Serverless Datastore Sync', category: 'database' }
  ];

  const col3: SkillItem[] = [
    { name: 'Python', desc: 'AI Base & Scripting Core', category: 'backend' },
    { name: 'FastAPI', desc: 'Async High-Speed APIs', category: 'backend' },
    { name: 'Flask', desc: 'Microservices Framework', category: 'backend' },
    { name: 'Django', desc: 'Robust Server Architecture', category: 'backend' },
    { name: 'REST APIs', desc: 'Endpoint Design Architecture', category: 'backend' },
    { name: 'GraphQL', desc: 'Data Graph Query Schema', category: 'backend' },
    { name: 'WebSockets', desc: 'Real-time Streaming Client', category: 'backend' },
    { name: 'Microservices', desc: 'Distributed Python Nodes', category: 'backend' },
    { name: 'Node.js', desc: 'V8 Server Runtime', category: 'backend' },
    { name: 'Jest', desc: 'Unit Testing Engine', category: 'testing' },
    { name: 'React Testing Library', desc: 'Component Testing', category: 'testing' },
    { name: 'Cypress', desc: 'End-to-End Testing', category: 'testing' },
    { name: 'ESLint & Prettier', desc: 'Static Analysis Linting', category: 'testing' },
    { name: 'Git', desc: 'Branching, Merging, Rebasing', category: 'devops' },
    { name: 'GitHub Actions', desc: 'Automated CI/CD Pipelines', category: 'devops' },
    { name: 'Docker', desc: 'Secure Containerization', category: 'devops' },
    { name: 'Kubernetes', desc: 'Scale Node Orchestration', category: 'devops' },
    { name: 'AWS & Azure', desc: 'Cloud Architect Deployment', category: 'devops' },
    { name: 'Vercel', desc: 'Serverless Edge Deployment', category: 'devops' }
  ];

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Elegant sticky text fade-in
      if (leftColRef.current) {
        gsap.from(leftColRef.current.children, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Layout size={14} className="text-[var(--color-accent-cyan)]" />;
      case 'genai':
        return <Cpu size={14} className="text-[var(--color-accent-purple)]" />;
      case 'backend':
        return <Server size={14} className="text-[var(--color-accent-cyan)]" />;
      case 'database':
        return <Database size={14} className="text-white/60" />;
      case 'devops':
        return <GitBranch size={14} className="text-[var(--color-accent-purple)]" />;
      default:
        return <ShieldCheck size={14} className="text-white/40" />;
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'border-[var(--color-accent-cyan)]/15 group-hover:border-[var(--color-accent-cyan)]/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]';
      case 'genai':
        return 'border-[var(--color-accent-purple)]/15 group-hover:border-[var(--color-accent-purple)]/50 group-hover:shadow-[0_0_15px_rgba(108,99,255,0.15)]';
      case 'backend':
        return 'border-[var(--color-accent-cyan)]/15 group-hover:border-[var(--color-accent-cyan)]/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]';
      case 'database':
        return 'border-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]';
      case 'devops':
        return 'border-[var(--color-accent-purple)]/15 group-hover:border-[var(--color-accent-purple)]/50 group-hover:shadow-[0_0_15px_rgba(108,99,255,0.15)]';
      default:
        return 'border-white/5 group-hover:border-white/20';
    }
  };

  const renderTrackItems = (items: SkillItem[]) => {
    // Duplicate items to guarantee seamless looping transitions
    const doubleItems = [...items, ...items];
    return doubleItems.map((item, idx) => (
      <div
        key={`${item.name}-${idx}`}
        className={`group flex items-start gap-4 p-5 rounded-2xl glass-panel border transition-all duration-300 ${getCategoryStyle(
          item.category
        )}`}
      >
        <div className="p-2 rounded-lg bg-white/5 border border-white/5 shrink-0">
          {getCategoryIcon(item.category)}
        </div>
        <div>
          <div className="font-display font-semibold text-sm text-white group-hover:text-white transition-colors">
            {item.name}
          </div>
          <div className="font-sans text-[11px] text-white/50 font-light mt-0.5 leading-relaxed">
            {item.desc}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 bg-[var(--color-base)] border-t border-white/5 overflow-hidden">
      
      {/* Decorative vertical glowing grid grids */}
      <div className="absolute inset-y-0 right-0 w-[50vw] bg-[radial-gradient(circle_at_right,rgba(34,211,238,0.02),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-y-0 left-0 w-[50vw] bg-[radial-gradient(circle_at_left,rgba(108,99,255,0.02),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column (Sticky Title & Description) */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-8 lg:pr-8">
            <div className="font-mono text-sm tracking-[0.3em] uppercase text-[var(--color-accent-cyan)]">
              // Competencies
            </div>
            
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight uppercase leading-[0.95] text-white">
              Tectonic <br/>
              <span className="text-[var(--color-accent-purple)] italic">Tech Stack</span>.
            </h2>
            
            <p className="font-sans text-lg text-white/60 font-light leading-relaxed">
              A comprehensive, modular engineering toolkit structured for enterprise scalability, real-time sync speed, and context-intelligent Generative AI automation.
            </p>

            {/* Custom high-tech indicator key legend */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8 mt-8">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_8px_var(--color-accent-cyan)]" />
                <span className="font-mono text-xs text-white/60 uppercase tracking-widest">Frontend & APIs</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-purple)] shadow-[0_0_8px_var(--color-accent-purple)]" />
                <span className="font-mono text-xs text-white/60 uppercase tracking-widest">GenAI & DevOps</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-white/60 shadow-[0_0_8px_white]" />
                <span className="font-mono text-xs text-white/60 uppercase tracking-widest">Databases</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Testing & QA</span>
              </div>
            </div>
          </div>

          {/* Right Column (Vertical Scrolling Infinite Badges Grid) */}
          <div className="lg:col-span-7 relative h-[600px] w-full overflow-hidden px-2">
            
            {/* Elegant fade mask covering top and bottom rows */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-base)] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-base)] to-transparent z-20 pointer-events-none" />
            
            {/* Grid Track Wrapper */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full select-none">
              
              {/* Column Track 1: Scrolls UP */}
              <div className="relative h-full overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)' }}>
                <div 
                  className="flex flex-col gap-6 scroll-up-track absolute top-0 w-full"
                  style={{
                    animation: 'scrollUp 28s linear infinite',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
                >
                  {renderTrackItems(col1)}
                </div>
              </div>

              {/* Column Track 2: Scrolls DOWN */}
              <div className="relative h-full overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)' }}>
                <div 
                  className="flex flex-col gap-6 scroll-down-track absolute top-0 w-full"
                  style={{
                    animation: 'scrollDown 32s linear infinite',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
                >
                  {renderTrackItems(col2)}
                </div>
              </div>

              {/* Column Track 3: Scrolls UP */}
              <div className="relative h-full overflow-hidden animate-pulse-slow" style={{ maskImage: 'linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, white 15%, white 85%, transparent)' }}>
                <div 
                  className="flex flex-col gap-6 scroll-up-track absolute top-0 w-full"
                  style={{
                    animation: 'scrollUp 30s linear infinite',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
                >
                  {renderTrackItems(col3)}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Global CSS styles for keyframes animations of vertical tickers */}
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
