import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <section ref={containerRef} id="contact" className="relative pt-32 pb-16 border-t border-white/5 bg-[var(--color-surface)] overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute bottom-0 right-[10%] w-[45vw] h-[45vh] bg-[radial-gradient(circle,rgba(108,99,255,0.03),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vh] bg-[radial-gradient(circle,rgba(34,211,238,0.02),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Big Brand Pitch & Direct Contact Details */}
          <div className="lg:col-span-6 space-y-8 lg:pr-12">
            <div className="font-mono text-sm tracking-[0.3em] uppercase text-[var(--color-accent-cyan)]">
              // Connection
            </div>
            
            <h2 className="font-display font-black text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-glow">
              LET'S <span className="text-[var(--color-accent-purple)] italic">INNOVATE</span> <br/>
              TOGETHER.
            </h2>
            
            <p className="font-sans text-lg text-white/60 font-light leading-relaxed max-w-xl">
              Have an advanced web application to engineer, a Generative AI agent to deploy, or a production RAG pipeline to optimize? Get in touch and let's construct it.
            </p>

            <div className="space-y-6 pt-6">
              {/* Direct email card */}
              <a 
                href="mailto:tamilarasansundarraj@gmail.com" 
                className="group flex items-center gap-4 p-5 rounded-2xl glass-panel border border-white/5 hover:border-[var(--color-accent-cyan)]/30 hover:bg-white/[0.02] transition-all duration-300 max-w-md"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[var(--color-accent-cyan)] group-hover:scale-110 transition-transform duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Direct Mailbox</div>
                  <div className="font-display font-bold text-base md:text-lg text-white group-hover:text-[var(--color-accent-cyan)] transition-colors">
                    tamilarasansundarraj@gmail.com
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Premium Glassmorphic Inquiry Form */}
          <div className="lg:col-span-6 w-full">
            <div className="p-8 md:p-10 rounded-3xl glass-panel border border-white/10 relative overflow-hidden bg-white/[0.01]">
              <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6 pb-4 border-b border-white/5 flex justify-between">
                <span>Inquiry Console</span>
                <span className="text-[var(--color-accent-cyan)]">SYS: ACTIVE</span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-white/50 uppercase tracking-widest block">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-accent-purple)]/50 focus:bg-white/[0.08] transition-all duration-300"
                    />
                  </div>
                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-white/50 uppercase tracking-widest block">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@example.com" 
                      className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-accent-cyan)]/50 focus:bg-white/[0.08] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-white/50 uppercase tracking-widest block">Message Details</label>
                  <textarea 
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your engineering requirements or project details..." 
                    className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-accent-purple)]/50 focus:bg-white/[0.08] transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 border border-white/20 hover:border-white text-white bg-white/5 hover:bg-white/15 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>transmitting...</span>
                  ) : submitStatus === 'success' ? (
                    <span className="text-[var(--color-accent-cyan)]">transmission successful</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer standard legal and social panel */}
        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-6 font-mono text-sm uppercase tracking-widest text-white/40">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="magnetic flex items-center gap-1.5 hover:text-white transition-colors group">
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="magnetic flex items-center gap-1.5 hover:text-[var(--color-accent-cyan)] transition-colors group">
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="magnetic flex items-center gap-1.5 hover:text-[var(--color-accent-purple)] transition-colors group">
              <Twitter size={14} />
              <span>Twitter</span>
            </a>
          </div>
          
          <div className="font-mono text-xs text-white/20 flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Tamilarasan. All rights reserved.</span>
            <span className="text-white/10">|</span>
            <span className="text-white/30">engineered from scratch</span>
          </div>
        </div>

      </div>
    </section>
  );
}
