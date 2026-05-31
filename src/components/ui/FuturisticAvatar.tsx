import { useState, useRef } from 'react';

export default function FuturisticAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Rotate max 12 degrees
    const rx = -(y / (rect.height / 2)) * 12;
    const ry = (x / (rect.width / 2)) * 12;
    setCoords({ rx, ry });
  };

  const handleMouseLeave = () => {
    setCoords({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[460px] mx-auto select-none cursor-pointer group"
      style={{
        transform: `perspective(1000px) rotateX(${coords.rx}deg) rotateY(${coords.ry}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {/* Outer ambient glow behind the avatar */}
      <div className="absolute inset-8 rounded-full opacity-35 blur-[45px] bg-gradient-to-tr from-[var(--color-accent-purple)] to-[var(--color-accent-cyan)] transition-all duration-500 group-hover:opacity-55 group-hover:scale-105 z-0" />

      {/* Main SVG Graphic */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 group-hover:drop-shadow-[0_0_30px_rgba(108,99,255,0.4)]"
      >
        <defs>
          {/* Neon/Glow Filter */}
          <filter id="glow-heavy" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-subtle" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 
            HIGH-FIDELITY CYBERNETIC GRADIENT DUOTONE MAP
            Maintains the crisp resolution and facial recognizability of your photo
            while mapping it to a stunning, premium neon cyan-purple-black art piece.
          */}
          <filter id="vectorArtFilter">
            {/* 1. Convert to high-fidelity grayscale */}
            <feColorMatrix 
              type="matrix" 
              values="0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0     0     0     1 0" 
              result="grayscale"
            />
            
            {/* 2. Soft contrast adjustment (preserves facial detail) */}
            <feComponentTransfer in="grayscale" result="softContrast">
              <feFuncR type="linear" slope="1.3" intercept="-0.1" />
              <feFuncG type="linear" slope="1.3" intercept="-0.1" />
              <feFuncB type="linear" slope="1.3" intercept="-0.1" />
            </feComponentTransfer>

            {/* 3. Non-linear Gradient Map:
                 - Shadows (0.0) -> Space Black/Deep Purple (#05020c)
                 - Midtones (0.5) -> Brand Lavender/Purple (#6c63ff)
                 - Highlights (1.0) -> Ultra-bright Glowing Cyan-White (#d4f8ff)
            */}
            <feComponentTransfer in="softContrast" result="duotoneMap">
              <feFuncR type="table" tableValues="0.02 0.38 0.80" />
              <feFuncG type="table" tableValues="0.01 0.22 0.96" />
              <feFuncB type="table" tableValues="0.05 0.92 0.99" />
            </feComponentTransfer>
          </filter>

          {/* Gradients */}
          <linearGradient id="cyber-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-purple)" />
            <stop offset="100%" stopColor="var(--color-accent-cyan)" />
          </linearGradient>

          {/* Tech Grid Background Pattern */}
          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.2" fill="white" fillOpacity="0.08" />
          </pattern>

          {/* Fine screen halftone matrix for tech illustration feel */}
          <pattern id="halftonePattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1" fill="#22d3ee" fillOpacity="0.1" />
          </pattern>

          {/* Circular mask for the user's avatar photo */}
          <clipPath id="avatarClip">
            <circle cx="250" cy="250" r="132" />
          </clipPath>

          {/* Circular mask for general grid background */}
          <mask id="containerMask">
            <circle cx="250" cy="250" r="190" fill="white" />
          </mask>
        </defs>

        <style>{`
          /* Rotations */
          @keyframes rotCW {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes rotCCW {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }

          /* General Nodes breathing */
          @keyframes breathNode {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 1; }
          }

          /* Floating Tech Symbols */
          @keyframes floatTech {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(3deg); }
          }

          /* Matrix Code Stream Drift */
          @keyframes codeDrift {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -120; }
          }

          .rotate-clockwise {
            transform-origin: 250px 250px;
            animation: rotCW 40s linear infinite;
          }
          .rotate-clockwise-fast {
            transform-origin: 250px 250px;
            animation: rotCW 20s linear infinite;
          }
          .rotate-counter-clockwise {
            transform-origin: 250px 250px;
            animation: rotCCW 30s linear infinite;
          }
          .animated-node {
            transform-origin: center;
            animation: breathNode 4s ease-in-out infinite;
          }
          .floating-symbol {
            transform-origin: center;
            animation: floatTech 5s ease-in-out infinite;
          }
          .code-stream {
            stroke-dasharray: 20 80;
            animation: codeDrift 4s linear infinite;
          }
        `}</style>

        {/* 1. Base Tech grid background within beautiful glass circle */}
        <g mask="url(#containerMask)">
          <circle cx="250" cy="250" r="190" fill="var(--color-surface)" fillOpacity="0.4" stroke="url(#cyber-grad-1)" strokeWidth="1.5" strokeOpacity="0.1" />
          <rect x="50" y="50" width="400" height="400" fill="url(#gridPattern)" />
          
          {/* Glowing central target coordinate guides */}
          <line x1="250" y1="60" x2="250" y2="440" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="5,5" />
          <line x1="60" y1="250" x2="440" y2="250" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="5,5" />
          
          {/* Subtle concentric tech grids */}
          <circle cx="250" cy="250" r="120" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" fill="none" />
          <circle cx="250" cy="250" r="160" stroke="white" strokeWidth="0.5" strokeOpacity="0.03" fill="none" />
        </g>

        {/* 2. Generated Cyber Art Portrait (Clipped to Cyber-Frame) */}
        <g>
          {/* Cyber outer frame ring for the portrait */}
          <circle
            cx="250"
            cy="250"
            r="138"
            fill="none"
            stroke="url(#cyber-grad-1)"
            strokeWidth="3.5"
            opacity="0.9"
            filter="url(#glow-subtle)"
            className="transition-all duration-300 group-hover:stroke-width-5"
          />

          {/* 
            Clipped portrait photo.
            - preserveAspectRatio="xMidYMin slice" keeps the top of the photo (the head/face)
              perfectly in focus and centered, preventing vertical clipping.
            - vectorArtFilter transforms the portrait into a highly detailed cyber-art style.
          */}
          <image
            href="/images/tamil-avatar.jpg"
            x="115"
            y="115"
            width="270"
            height="270"
            preserveAspectRatio="xMidYMin slice"
            clipPath="url(#avatarClip)"
            filter="url(#vectorArtFilter)"
            className="transition-all duration-750 group-hover:scale-[1.03]"
            style={{ transformOrigin: '250px 250px' }}
          />

          {/* Subtle Halftone print overlay to reinforce technical screen feeling */}
          <circle
            cx="250"
            cy="250"
            r="132"
            fill="url(#halftonePattern)"
            clipPath="url(#avatarClip)"
            className="pointer-events-none"
            opacity="0.6"
          />

          {/* 
            INTEGRATED CODING & COMPILER GRAPHICS (Directly layered on the picture)
          */}
          <g clipPath="url(#avatarClip)" opacity="0.3" fontFamily="monospace" fontSize="8" fill="#22d3ee" letterSpacing="1">
            {/* Real Code Snippets floating in the background of portrait */}
            <text x="135" y="160">{"const [ai, setAi] = useState(true);"}</text>
            <text x="135" y="172">{"import { RAG } from 'genai';"}</text>
            <text x="135" y="184">{"def query_llm(prompt):"}</text>
            <text x="150" y="196">{"return model.generate(prompt)"}</text>
            <text x="135" y="208">{"await pipeline.sync();"}</text>
            
            {/* Right side background code */}
            <text x="255" y="150" fill="var(--color-accent-purple)">{"class VectorStore:"}</text>
            <text x="265" y="162" fill="var(--color-accent-purple)">{"def __init__(self):"}</text>
            <text x="275" y="174" fill="white">{"self.db = FAISS()"}</text>
            <text x="255" y="280">{"npm run build"}</text>
            <text x="255" y="292">{"STATUS: COMPILING..."}</text>
          </g>

          {/* Neon inner edge-glow ring to frame the vector art */}
          <circle
            cx="250"
            cy="250"
            r="132"
            fill="none"
            stroke="url(#cyber-grad-1)"
            strokeWidth="2"
            opacity="0.4"
            clipPath="url(#avatarClip)"
          />
        </g>

        {/* 3. Cybernetic Target Brackets & HUD Graphics directly over/around the portrait */}
        <g className="pointer-events-none">
          {/* Scan line overlays representing digital rendering */}
          <line
            x1="123"
            y1="230"
            x2="377"
            y2="230"
            stroke="#22d3ee"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            strokeDasharray="4,4"
          />
          {/* Target lock reticle indicators */}
          <circle cx="250" cy="180" r="4" fill="#22d3ee" fillOpacity="0.4" stroke="#22d3ee" strokeWidth="1" />
          <circle cx="210" cy="230" r="3" fill="#6c63ff" fillOpacity="0.5" />
          <circle cx="290" cy="230" r="3" fill="#6c63ff" fillOpacity="0.5" />

          {/* Target corner bracket crosshairs */}
          <path d="M 105,250 L 115,250" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 385,250 L 395,250" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 250,105 L 250,115" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 250,385 L 250,395" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 
          Futuristic Live Terminal Box floating at the bottom of the portrait 
          Shows you compiling active developer server code!
        */}
        <g transform="translate(145, 335)" filter="url(#glow-subtle)">
          <rect
            width="210"
            height="36"
            rx="5"
            fill="#050505"
            fillOpacity="0.85"
            stroke="url(#cyber-grad-1)"
            strokeWidth="1.5"
          />
          {/* Console Header Bar */}
          <line x1="0" y1="10" x2="210" y2="10" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx="8" cy="5" r="2" fill="#ef4444" />
          <circle cx="15" cy="5" r="2" fill="#f59e0b" />
          <circle cx="22" cy="5" r="2" fill="#10b981" />
          {/* Console Text Lines */}
          <text x="35" y="6" fill="white" fillOpacity="0.3" fontFamily="monospace" fontSize="5" letterSpacing="0.5">{"tamil@genai: ~"}</text>
          
          <text x="10" y="21" fill="#22d3ee" fontFamily="monospace" fontSize="7" fontWeight="bold">{"tamil@genai:~$ pnpm run dev"}</text>
          <text x="10" y="30" fill="#10b981" fontFamily="monospace" fontSize="6" opacity="0.8">{"&gt; Server ready at localhost:5173"}</text>
        </g>

        {/* 4. Floating Coding Symbols & Syntax Ornaments (Scattered around outer orbits) */}
        
        {/* HTML/React brackets code tag floating top-left */}
        <g transform="translate(70, 110)" className="floating-symbol">
          <rect width="28" height="18" rx="3" fill="#111" fillOpacity="0.7" stroke="#22d3ee" strokeWidth="0.75" />
          <text x="14" y="12" fill="#22d3ee" fontFamily="monospace" fontSize="9" fontWeight="bold" textAnchor="middle">{"</>"}</text>
        </g>

        {/* Curly brackets coding tag floating top-right */}
        <g transform="translate(390, 120)" className="floating-symbol" style={{ animationDelay: '2s' }}>
          <rect width="28" height="18" rx="3" fill="#111" fillOpacity="0.7" stroke="#6c63ff" strokeWidth="0.75" />
          <text x="14" y="12" fill="#6c63ff" fontFamily="monospace" fontSize="10" fontWeight="bold" textAnchor="middle">{"{}"}</text>
        </g>

        {/* Parentheses tag floating bottom-left */}
        <g transform="translate(55, 360)" className="floating-symbol" style={{ animationDelay: '1.2s' }}>
          <rect width="24" height="16" rx="3" fill="#111" fillOpacity="0.7" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
          <text x="12" y="11" fill="white" fillOpacity="0.6" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle">{"()"}</text>
        </g>

        {/* Python tag floating bottom-right */}
        <g transform="translate(415, 350)" className="floating-symbol" style={{ animationDelay: '3.5s' }}>
          <rect width="26" height="16" rx="3" fill="#111" fillOpacity="0.7" stroke="#22d3ee" strokeWidth="0.75" />
          <text x="13" y="11" fill="#22d3ee" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle">{"py"}</text>
        </g>

        {/* 5. Concentric Orbiting UI Rings (Premium high-tech details) */}
        
        {/* Outer Ring: Rotating Text */}
        <g className="rotate-counter-clockwise">
          {/* Path for text to slide on */}
          <path
            id="orbitTextPath"
            d="M 250,55 A 195,195 0 1,1 249.9,55"
            fill="none"
            stroke="none"
          />
          <text fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" fill="white" fillOpacity="0.35" letterSpacing="3.5">
            <textPath href="#orbitTextPath" startOffset="0%">
              • TAMILARASAN • DEVELOPER • AI ENGINEER • RAG SYSTEM BUILDER • FULL STACK
            </textPath>
          </text>
        </g>

        {/* Mid Ring: Glowing Tech Dashed Orbit */}
        <g className="rotate-clockwise">
          <circle
            cx="250"
            cy="250"
            r="180"
            fill="none"
            stroke="url(#cyber-grad-1)"
            strokeWidth="1.5"
            strokeDasharray="10 30 50 15 5 15"
            opacity="0.5"
            filter="url(#glow-subtle)"
            className="transition-all duration-300 group-hover:opacity-85"
          />
        </g>

        {/* Inner Ring: Fine Dot Orbit */}
        <g className="rotate-clockwise-fast">
          <circle
            cx="250"
            cy="250"
            r="165"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1"
            strokeDasharray="2, 6"
            opacity="0.3"
          />
          {/* Small orbital core dot indicator */}
          <circle cx="250" cy="85" r="3.5" fill="#22d3ee" filter="url(#glow-subtle)" />
          <circle cx="85" cy="250" r="3.5" fill="#6c63ff" filter="url(#glow-subtle)" />
        </g>

        {/* 6. Beautiful floating HUD details around the frame corners */}
        
        {/* Top-left target guide */}
        <path d="M 65,95 L 65,65 L 95,65" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="73" cy="73" r="2.5" fill="white" opacity="0.8" />
        
        {/* Bottom-right target guide */}
        <path d="M 435,405 L 435,435 L 405,435" fill="none" stroke="#6c63ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="427" cy="427" r="2.5" fill="white" opacity="0.8" />

        {/* Tech diagnostic readings (small text overlays) */}
        <g fontFamily="var(--font-mono)" fontSize="8" fill="white" opacity="0.4" letterSpacing="1">
          <text x="80" y="425" textAnchor="start">LOC: 12.97° N</text>
          <text x="80" y="437" textAnchor="start" fill="#22d3ee">COGNITIVE: OK</text>
          
          <text x="420" y="75" textAnchor="end">SYS.STATUS: ONLINE</text>
          <text x="420" y="87" textAnchor="end" fill="#6c63ff">INTEL.GEN: 99.8%</text>
        </g>

      </svg>
    </div>
  );
}
