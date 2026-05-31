import { useEffect, useRef, useState } from 'react';
import { Terminal, Shield, CornerDownLeft } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output';
  text: string;
  isHtml?: boolean;
}

export default function CommandConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize greeting logs
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        { type: 'output', text: 'Tectonic Developer Terminal [v1.0.0]' },
        { type: 'output', text: "Type 'help' to view the list of available commands." }
      ]);
    }
  }, [history]);

  // Global keydown listeners for Ctrl+K, Cmd+K, and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const execCommand = (cmd: string) => {
    const cleanCmd = cmd.trim();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: 'input' as const, text: `tamil@genai:~$ ${cleanCmd}` }];
    const parts = cleanCmd.toLowerCase().split(' ');
    const base = parts[0];
    const arg = parts[1];

    let outputText = '';
    let isHtml = false;

    switch (base) {
      case 'help':
        isHtml = true;
        outputText = `<div class="space-y-1.5 text-white/70">
          <div><span class="text-[var(--color-accent-cyan)] font-bold">help</span> - List all available commands</div>
          <div><span class="text-[var(--color-accent-cyan)] font-bold">sysinfo</span> - Display developer hardware and stack specifications</div>
          <div><span class="text-[var(--color-accent-cyan)] font-bold">cat resume.md</span> - Output Tamil's formatted CV profile</div>
          <div><span class="text-[var(--color-accent-cyan)] font-bold">goto [section]</span> - Scroll to: about, services, stack, work, insights, contact</div>
          <div><span class="text-[var(--color-accent-cyan)] font-bold">download</span> - Transmit direct CV download trigger</div>
          <div><span class="text-[var(--color-accent-cyan)] font-bold">clear</span> - Clear terminal logs</div>
        </div>`;
        break;

      case 'sysinfo':
        isHtml = true;
        outputText = `<div class="space-y-1 text-white/70 font-mono text-[10px]">
          <div><span class="text-[var(--color-accent-purple)]">OS:</span> GenAI Node v19.5 (React Native Engine)</div>
          <div><span class="text-[var(--color-accent-purple)]">ENGINE:</span> Next.js App Router & FastAPI Server</div>
          <div><span class="text-[var(--color-accent-purple)]">RAG PIPELINE:</span> LangChain & Pinecone Context Memory (FAISS Mode)</div>
          <div><span class="text-[var(--color-accent-purple)]">ACCURACY:</span> +40% LLM contextual grounding</div>
          <div><span class="text-[var(--color-accent-purple)]">LATENCY:</span> &lt;120ms WebSocket Response stream</div>
          <div class="text-[var(--color-accent-cyan)]">STATUS: 100% OPERATIONAL (ONLINE)</div>
        </div>`;
        break;

      case 'cat':
        if (arg === 'resume.md' || arg === 'resume') {
          isHtml = true;
          outputText = `<div class="space-y-2 text-white/75 font-sans leading-relaxed">
            <div class="font-display font-bold text-sm border-b border-white/10 pb-1">TAMILARASAN SUNDARRAJ - Full Stack & GenAI Engineer</div>
            <div class="text-[10px] font-mono text-[var(--color-accent-cyan)]">EXPERIENCE: 3 Years | coimbatore / Hyderabad, India</div>
            <div>• <b>Full Stack Developer at 10xScale.ai:</b> Designed CRM platforms for 10k+ users; engineered active RAG search databases.</div>
            <div>• <b>Ed-Tech Project Lead at Industry-Pilot:</b> Managed 5+ microservices nodes and Flutter mobile builds.</div>
            <div>• <b>Backend Frameworks:</b> React, Next.js, Python, FastAPI, Flask, Docker, Kubernetes, AWS, PostgreSQL.</div>
          </div>`;
        } else {
          outputText = `File not found. Try typing 'cat resume.md'`;
        }
        break;

      case 'goto':
        if (['about', 'services', 'stack', 'work', 'insights', 'contact', 'skills', 'hero'].includes(arg)) {
          const targetId = arg === 'stack' ? 'skills' : arg;
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            setIsOpen(false);
            setTimeout(() => {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }, 300);
            return;
          }
          outputText = `Navigating to section: ${arg}`;
        } else {
          outputText = `Section not found. Options: about, services, stack, work, insights, contact`;
        }
        break;

      case 'download':
        isHtml = true;
        outputText = `<div class="text-green-400 font-mono">
          Initiating direct transmission pipeline... <br/>
          Opening connection: <a href="mailto:tamilarasansundarraj@gmail.com" class="underline text-[var(--color-accent-cyan)]">tamilarasansundarraj@gmail.com</a>
        </div>`;
        setTimeout(() => {
          window.open('mailto:tamilarasansundarraj@gmail.com');
        }, 1000);
        break;

      case 'clear':
        setHistory([
          { type: 'output', text: 'Tectonic Developer Terminal [v1.0.0]' },
          { type: 'output', text: "Type 'help' to view the list of available commands." }
        ]);
        setInput('');
        return;

      default:
        outputText = `Command not recognized: '${base}'. Type 'help' to view valid commands.`;
    }

    setHistory([...newHistory, { type: 'output', text: outputText, isHtml }]);
    setInput('');
  };

  if (!isOpen) {
    return (
      <>
        {/* Mobile Floating Terminal Trigger */}
        <div 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex md:hidden w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-[var(--color-accent-cyan)]/50 items-center justify-center text-white/80 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 active:scale-95"
        >
          <div className="relative">
            <Terminal size={18} className="text-[var(--color-accent-cyan)]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--color-accent-cyan)] animate-pulse" />
          </div>
        </div>

        {/* Desktop Floating Console Trigger */}
        <div 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-[var(--color-accent-cyan)]/50 hover:bg-black/80 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] text-[11px] font-mono text-white/80 cursor-pointer transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group select-none"
        >
          {/* Animated Cyber Indicator */}
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-cyan)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-cyan)]"></span>
          </div>
          
          <Terminal size={13} className="text-[var(--color-accent-cyan)] group-hover:rotate-12 transition-transform duration-300" />
          
          <div className="flex items-center gap-1.5">
            <span className="font-semibold tracking-wider text-white/90">SYS_CONSOLE:</span>
            <span className="text-white/60">Press</span>
            <kbd className="bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-white text-[9px] uppercase tracking-normal font-sans shadow-inner">Cmd</kbd>
            <span className="text-white/40">/</span>
            <kbd className="bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-white text-[9px] uppercase tracking-normal font-sans shadow-inner">Ctrl</kbd>
            <span className="text-white/40">+</span>
            <kbd className="bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-white text-[9px] uppercase tracking-normal font-sans shadow-inner">K</kbd>
          </div>
        </div>
      </>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="glass-panel max-w-2xl w-full rounded-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.75)] flex flex-col h-[400px] overflow-hidden bg-black/85">
        
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 border-b border-white/5 bg-white/[0.01] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] border border-red-500/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] border border-amber-500/30" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] border border-green-500/30" />
            </div>
            <span className="font-mono text-[10px] text-white/35 ml-3 flex items-center gap-1.5">
              <Shield size={10} className="text-[var(--color-accent-cyan)]" />
              <span>tamil@genai: ~ (bash)</span>
            </span>
          </div>

          <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">[ESC to Exit]</span>
        </div>

        {/* Console Logs Panel */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 space-y-3 font-mono text-[11px] text-white/60 bg-black/30 selection:bg-[var(--color-accent-purple)]/30 select-text"
        >
          {history.map((line, idx) => (
            <div 
              key={idx}
              className={`leading-relaxed ${
                line.type === 'input' 
                  ? 'text-[var(--color-accent-cyan)] font-semibold' 
                  : 'text-white/80'
              }`}
            >
              {line.isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: line.text }} />
              ) : (
                <div className="whitespace-pre-wrap">{line.text}</div>
              )}
            </div>
          ))}
        </div>

        {/* Console Typing Prompt Input */}
        <div className="px-5 py-3 border-t border-white/5 bg-white/[0.01] flex items-center gap-2 shrink-0">
          <span className="font-mono text-[11px] text-[var(--color-accent-purple)] font-semibold shrink-0">tamil@genai:~$</span>
          
          <input 
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && execCommand(input)}
            placeholder="Type 'help'..."
            className="flex-1 font-mono text-[11px] bg-transparent text-white placeholder-white/10 focus:outline-none focus:ring-0 py-0.5"
          />

          <div className="flex items-center gap-1 text-[9px] font-mono text-white/25 shrink-0">
            <CornerDownLeft size={10} />
            <span>Enter</span>
          </div>
        </div>

      </div>
    </div>
  );
}
