import { useEffect } from 'react';
import LenisProvider from './lib/motion/LenisProvider';
import CustomCursor from './lib/motion/CustomCursor';
import Background from './components/ui/Background';
import Navbar from './components/ui/Navbar';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Work from './components/sections/Work';
import Testimonials from './components/sections/Testimonials';
import Writing from './components/sections/Writing';
import Contact from './components/sections/Contact';

function App() {
  // Graceful degradation check
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      document.body.classList.add('reduced-motion');
    }
  }, []);

  return (
    <LenisProvider>
      <div className="relative min-h-screen">
        <CustomCursor />
        <Background />
        
        <Navbar />

        <main className="relative z-10 flex flex-col">
          <Hero />
          <About />
          <Services />
          <Skills />
          <Experience />
          <Work />
          <Testimonials />
          <Writing />
          <Contact />
        </main>
        
        {/* Global Noise Overlay */}
        <div className="noise-overlay pointer-events-none"></div>
      </div>
    </LenisProvider>
  );
}

export default App;
