import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Section tracking logic
      const sections = ['hero', 'about', 'services', 'skills', 'work', 'insights', 'contact'];
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top is above 40% height of screen, mark active
          if (rect.top <= window.innerHeight * 0.4) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Stack', href: '#skills', id: 'skills' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Insights', href: '#insights', id: 'insights' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'py-4 px-6 md:px-12' 
          : 'py-6 px-6 md:px-12 border-b border-white/5 bg-[var(--color-base)]/40 backdrop-blur-sm'
      }`}
    >
      <div
        className={`mx-auto w-full transition-all duration-500 ease-out ${
          isScrolled
            ? 'max-w-2xl rounded-full glass-panel border border-white/10 px-8 py-3 bg-[var(--color-surface)]/75 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
            : 'max-w-7xl flex items-center justify-between'
        }`}
      >
        <div className={`flex items-center justify-between w-full ${isScrolled ? 'gap-8' : ''}`}>
          
          {/* Logo Brand Title (Hidden inside scrolled pill on tiny screens to preserve spacing) */}
          <span 
            className={`font-display font-black text-lg tracking-tight uppercase text-white hover:text-[var(--color-accent-cyan)] transition-colors shrink-0 ${
              isScrolled ? 'hidden sm:block' : 'block'
            }`}
          >
            Tamil<span className="text-[var(--color-accent-cyan)]">.</span>
          </span>

          {/* Centered Navigation Links */}
          <div className="flex items-center gap-6 md:gap-8 font-mono text-[11px] md:text-xs uppercase tracking-widest mx-auto sm:mx-0">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-[var(--color-accent-cyan)] font-medium'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {/* Active Indicator Sliding/Fade Dot */}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_8px_var(--color-accent-cyan)] animate-pulse" />
                )}
              </a>
            ))}
          </div>

          {/* Magnetic Contact Button (Hides when scrolled for absolute simplicity) */}
          <a
            href="mailto:tamilarasansundarraj@gmail.com"
            className={`hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 hover:border-[var(--color-accent-purple)] hover:bg-[var(--color-accent-purple)]/10 px-4 py-2 rounded-full text-white/80 hover:text-white transition-all duration-300 shrink-0 ${
              isScrolled ? 'lg:flex' : ''
            }`}
          >
            Email Me <ArrowUpRight size={12} />
          </a>

        </div>
      </div>
    </nav>
  );
}
