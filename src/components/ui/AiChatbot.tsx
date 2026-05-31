import { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquareCode, Send, User, Sparkles, X } from 'lucide-react';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message stream
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'ai',
          text: "Hi there! I am Tamil's AI Co-Pilot. Ask me anything about his technical stack, RAG pipelines, SaaS projects, or role availability!"
        }
      ]);
    }
  }, [messages]);

  // Scroll to bottom whenever messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    "What is your tech stack?",
    "Are you available for hire?",
    "Explain your RAG experience."
  ];

  // Local Semantic Intent Rules Engine (simulates a highly robust RAG chatbot client-side!)
  const queryIntent = (query: string): string => {
    const q = query.toLowerCase();
    
    // 1. Tech Stack / Skills Intent
    if (q.includes('stack') || q.includes('skill') || q.includes('technolog') || q.includes('lang') || q.includes('code') || q.includes('react') || q.includes('next') || q.includes('python')) {
      return "Tamil's robust tech stack is designed for scalable, production-ready systems:\n\n" +
             "• <b>Frontend:</b> React.js, Next.js (App Router, Server Components), TypeScript, Tailwind CSS, Shadcn/UI, Storybook.\n" +
             "• <b>Backend & APIs:</b> Python, FastAPI, Flask, Django, REST APIs, GraphQL, WebSockets.\n" +
             "• <b>GenAI & RAG:</b> LangChain, OpenAI/Claude APIs, Hugging Face, vector databases (Pinecone, Chroma, Typesense), Prompt Engineering, and MCP.\n" +
             "• <b>Databases:</b> PostgreSQL, MongoDB, Redis, Firebase.\n" +
             "• <b>DevOps:</b> Git, GitHub Actions (CI/CD), Docker, Kubernetes, AWS, Azure, Vercel.";
    }

    // 2. Availability / Hire / Location Intent
    if (q.includes('hire') || q.includes('job') || q.includes('availab') || q.includes('work') || q.includes('role') || q.includes('freelance')) {
      return "Tamil is currently **available** for selected freelance opportunities and open to discussing full-time engineering positions in high-impact development teams.\n\n" +
             "• <b>Status:</b> Open for Hire\n" +
             "• <b>Preferred Locations:</b> Hyderabad, India / Remote\n" +
             "• <b>Primary Roles:</b> Full Stack Developer, Frontend Architect, GenAI & RAG Engineer\n\n" +
             "You can directly invite him to interview at <b>tamilarasansundarraj@gmail.com</b>!";
    }

    // 3. RAG / Generative AI Intent
    if (q.includes('rag') || q.includes('ai') || q.includes('genai') || q.includes('chatbot') || q.includes('langchain') || q.includes('vector') || q.includes('agent')) {
      return "Tamil has deep expertise in Generative AI and Retrieval-Augmented Generation (RAG):\n\n" +
             "• <b>10xScale.ai:</b> Designed and deployed context-aware RAG pipelines using LangChain and FastAPI, boosting chatbot accuracy by **40%**.\n" +
             "• <b>Wonder-AI:</b> Engineered a full-scale conversational map agent in Next.js integrating streaming WebSocket responses and session-context memory.\n" +
             "• <b>AI Resume Builder:</b> Integrated LangChain and parsing models to semantically optimize candidate resumes for ATS compliance.\n" +
             "• <b>Voice Agents:</b> Engineered asynchronous Python-based voice pipelines automating WhatsApp/email triggers.";
    }

    // 4. Contact / Email Intent
    if (q.includes('contact') || q.includes('email') || q.includes('social') || q.includes('github') || q.includes('linkedin') || q.includes('twitter')) {
      return "You can easily connect with Tamil across multiple channels:\n\n" +
             "• <b>Primary Email:</b> <a href='mailto:tamilarasansundarraj@gmail.com' class='text-[var(--color-accent-cyan)] underline'>tamilarasansundarraj@gmail.com</a>\n" +
             "• <b>GitHub:</b> github.com (Standard layouts link in footer)\n" +
             "• <b>LinkedIn:</b> linkedin.com\n\n" +
             "Feel free to drop an inquiry inside the **Inquiry Console** at the bottom of the page!";
    }

    // 5. Education / Graduation Intent
    if (q.includes('educat') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('graduat')) {
      return "Tamil graduated with a <b>Bachelor of Science in Computer Science</b> from Government Arts and Science College, Coimbatore in 2023.\n\n" +
             "During his studies, he specialized in database management systems, software engineering lifecycles, and atomic web design.";
    }

    // 6. Experience / Years Intent
    if (q.includes('experienc') || q.includes('year') || q.includes('history') || q.includes('career') || q.includes('traject')) {
      return "Tamil has **3 years** of production experience as a Full Stack Developer:\n\n" +
             "• <b>10xScale.ai (Present):</b> Creates responsive AI-powered CRM systems and enterprise SaaS web portals serving 10,000+ active users.\n" +
             "• <b>Technical Mentor (Present):</b> Has coached and trained 100+ students in full-stack JavaScript, React, Next.js, and Docker.\n" +
             "• <b>Industry-Pilot (2023-2024):</b> Led a cross-functional microservices team of 5+ developers delivering learning platforms.\n" +
             "• <b>Freelance AI Developer (2022-2023):</b> Shipped 4 full-stack GenAI projects.";
    }

    // 7. General Fallback Response
    return "I appreciate your query! Tamil is a detail-oriented **Full Stack Developer & GenAI/RAG Architect** with 3 years of experience shipping React/Next.js frontends, FastAPI backends, and LangChain pipelines.\n\n" +
           "Try asking me about:\n" +
           "• <i>'What is your tech stack?'</i>\n" +
           "• <i>'Tell me about your RAG experience'</i>\n" +
           "• <i>'Are you open to full-time roles?'</i>";
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Append user message
    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    setInput('');
    setIsTyping(true);

    // 2. Simulate AI "thinking" and stream response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = queryIntent(textToSend);
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* 1. Floating Interactive Toggle Container */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        
        {/* Elegant cyber label that fades/slides out, inviting interactions */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-[var(--color-accent-purple)]/50 text-[10px] font-mono text-white/80 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,99,255,0.15)] group select-none"
          >
            {/* Blinking green dot */}
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10b981]"></span>
            </div>
            <span className="text-white/60 tracking-wider">AI_COPILOT:</span>
            <span className="text-[var(--color-accent-cyan)] font-semibold uppercase tracking-widest group-hover:text-white transition-colors">Ask Tamil Anything</span>
          </div>
        )}

        {/* Floating Toggle Orb */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.55)] cursor-pointer group transition-all duration-500 overflow-hidden shrink-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-cyan) 100%)'
          }}
        >
          {/* Inner ambient glow layer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity duration-300" />
          
          {/* Orbital rings rotation effect on hover */}
          <div className="absolute inset-1 rounded-full border border-white/15 group-hover:rotate-45 transition-transform duration-700" />
          <div className="absolute inset-2 rounded-full border border-dashed border-white/10 group-hover:-rotate-45 transition-transform duration-1000" />

          {isOpen ? (
            <X className="w-5 h-5 md:w-6 md:h-6 rotate-90 transition-transform duration-300 relative z-10" />
          ) : (
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <MessageSquareCode className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-115 transition-transform duration-300" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#10b981] border-2 border-[var(--color-accent-purple)] animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* 2. Glassmorphic Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-[360px] h-[500px] rounded-3xl glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col z-50 transition-all duration-500 ease-out transform origin-bottom-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Chat Console Header */}
        <div className="p-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--color-accent-purple)]/25 to-[var(--color-accent-cyan)]/25 border border-white/15 flex items-center justify-center text-[var(--color-accent-cyan)] shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              <Bot size={18} className="animate-pulse" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10b981] border border-[var(--color-surface)]" />
            </div>
            <div>
              <div className="font-display font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Co-Pilot</span>
                <Sparkles size={10} className="text-[var(--color-accent-purple)] animate-pulse" />
              </div>
              <div className="font-mono text-[9px] text-[var(--color-accent-cyan)] uppercase tracking-widest">SYS: ONLINE</div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Message logs area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text bg-black/10">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border ${
                  msg.sender === 'user'
                    ? 'border-[var(--color-accent-purple)]/30 bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)]'
                    : 'border-[var(--color-accent-cyan)]/20 bg-[var(--color-accent-cyan)]/5 text-[var(--color-accent-cyan)]'
                }`}
              >
                {msg.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
              </div>
              
              <div
                className={`p-3 rounded-2xl text-xs font-sans leading-relaxed border ${
                  msg.sender === 'user'
                    ? 'bg-[var(--color-accent-purple)]/15 border-[var(--color-accent-purple)]/25 text-white rounded-tr-none'
                    : 'bg-white/5 border-white/5 text-white/80 rounded-tl-none'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }}
              />
            </div>
          ))}

          {/* Typing simulated indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-7 h-7 rounded-full border border-[var(--color-accent-cyan)]/20 bg-[var(--color-accent-cyan)]/5 text-[var(--color-accent-cyan)] flex items-center justify-center shrink-0">
                <Bot size={13} />
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length === 1 && !isTyping && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="text-[10px] font-mono text-[var(--color-accent-cyan)] hover:text-white bg-[var(--color-accent-cyan)]/[0.04] hover:bg-[var(--color-accent-cyan)]/15 border border-[var(--color-accent-cyan)]/20 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Typing Input */}
        <div className="p-4 border-t border-white/5 bg-white/[0.01]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask me a question..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-accent-cyan)]/40 focus:bg-white/[0.08] transition-all duration-300"
            />
            <button
              onClick={() => handleSend(input)}
              className="absolute right-2 p-1.5 rounded-lg text-white/40 hover:text-[var(--color-accent-cyan)] hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <Send size={12} />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
