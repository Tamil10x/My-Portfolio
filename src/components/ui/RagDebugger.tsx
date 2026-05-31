import { useState } from 'react';
import { Play, CheckCircle2, Database, Cpu, FileSearch, Sparkles } from 'lucide-react';

type StepState = 'idle' | 'running' | 'completed';

export default function RagDebugger() {
  const [query, setQuery] = useState('Does Tamil have Next.js production experience?');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepStates, setStepStates] = useState<StepState[]>(['idle', 'idle', 'idle', 'idle', 'idle']);
  const [llmOutput, setLlmOutput] = useState('');

  const preSets = [
    "Does Tamil have Next.js production experience?",
    "Has Tamil built FastAPI backends with WebSockets?",
    "What vector databases does Tamil use?"
  ];

  const getSimulatedLlmResponse = (q: string) => {
    const text = q.toLowerCase();
    if (text.includes('next')) {
      return "Tamil has 3 years of Next.js experience at 10xScale.ai, building production App Router & Server Components systems for 10k+ active users.";
    }
    if (text.includes('fastapi') || text.includes('websocket')) {
      return "Yes. Tamil built FastAPI backends with real-time WebSockets streaming for the Wonder-AI map chatbot and async voice integrations.";
    }
    return "Tamil is proficient in vector databases including Pinecone, Chroma, and Typesense for contextual document matching pipelines.";
  };

  const runDebugger = () => {
    setLlmOutput('');
    setCurrentStep(1);
    setStepStates(['running', 'idle', 'idle', 'idle', 'idle']);

    // Step 1: Input Query complete
    setTimeout(() => {
      setStepStates(['completed', 'running', 'idle', 'idle', 'idle']);
      setCurrentStep(2);
    }, 800);

    // Step 2: Embedding complete
    setTimeout(() => {
      setStepStates(['completed', 'completed', 'running', 'idle', 'idle']);
      setCurrentStep(3);
    }, 1600);

    // Step 3: Vector retrieval complete
    setTimeout(() => {
      setStepStates(['completed', 'completed', 'completed', 'running', 'idle']);
      setCurrentStep(4);
    }, 2400);

    // Step 4: System prompt complete -> stream LLM response
    setTimeout(() => {
      setStepStates(['completed', 'completed', 'completed', 'completed', 'running']);
      setCurrentStep(5);
      
      // Stream LLM text response
      const response = getSimulatedLlmResponse(query);
      let idx = 0;
      const interval = setInterval(() => {
        setLlmOutput(() => response.slice(0, idx + 1));
        idx++;
        if (idx >= response.length) {
          clearInterval(interval);
          setStepStates(['completed', 'completed', 'completed', 'completed', 'completed']);
        }
      }, 25);
    }, 3200);
  };

  return (
    <div className="mt-6 p-5 rounded-2xl glass-panel border border-white/5 bg-black/30 select-none">
      
      {/* HUD Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <span className="px-2 py-0.5 rounded text-[8px] font-mono border border-[var(--color-accent-purple)]/20 bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)] uppercase tracking-wider">
          RAG Pipeline Analyzer
        </span>
        <span className="font-mono text-[9px] text-white/30 tracking-widest">TRACE_SYS: ACTIVE</span>
      </div>

      {/* Query Selector Input / Presets */}
      <div className="space-y-3 mb-5">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={currentStep > 0 && currentStep < 5}
            className="flex-1 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] font-mono text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-accent-cyan)]/45 focus:bg-white/5 transition-all duration-300"
          />
          
          <button
            onClick={runDebugger}
            disabled={currentStep > 0 && currentStep < 5}
            className="px-3 rounded-xl border border-white/10 hover:border-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)]/10 font-mono text-[9px] uppercase tracking-widest text-white/80 hover:text-white flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer disabled:opacity-50"
          >
            <Play size={10} />
            <span>Trace</span>
          </button>
        </div>

        {/* Suggestion Chips */}
        {currentStep === 0 && (
          <div className="flex flex-col gap-1.5">
            {preSets.map((preset) => (
              <button
                key={preset}
                onClick={() => setQuery(preset)}
                className="text-[9px] font-mono text-left text-white/40 hover:text-[var(--color-accent-cyan)] hover:underline truncate"
              >
                &gt; {preset}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Flow Chart Node Pipeline Mapping */}
      <div className="space-y-4">
        
        {/* Node 1: Embedding */}
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg border shrink-0 ${
            stepStates[1] === 'completed' 
              ? 'border-green-400/20 bg-green-400/5 text-green-400' 
              : stepStates[1] === 'running'
                ? 'border-[var(--color-accent-cyan)]/30 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] animate-pulse'
                : 'border-white/5 bg-white/[0.01] text-white/20'
          }`}>
            <Cpu size={12} />
          </div>
          <div className="flex-1 font-mono text-[9px]">
            <div className={`font-semibold ${stepStates[1] !== 'idle' ? 'text-white' : 'text-white/20'}`}>
              1. text-embedding-3-small
            </div>
            {stepStates[1] === 'running' && <div className="text-[var(--color-accent-cyan)] font-semibold mt-0.5 animate-pulse">[0.015, -0.092, 0.412, ...]</div>}
            {stepStates[1] === 'completed' && <div className="text-white/40 mt-0.5">Vector Dimensions: 1536 float arrays</div>}
          </div>
          {stepStates[1] === 'completed' && <CheckCircle2 size={10} className="text-green-400 shrink-0" />}
        </div>

        {/* Node 2: Vector DB */}
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg border shrink-0 ${
            stepStates[2] === 'completed' 
              ? 'border-green-400/20 bg-green-400/5 text-green-400' 
              : stepStates[2] === 'running'
                ? 'border-[var(--color-accent-cyan)]/30 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] animate-pulse'
                : 'border-white/5 bg-white/[0.01] text-white/20'
          }`}>
            <Database size={12} />
          </div>
          <div className="flex-1 font-mono text-[9px]">
            <div className={`font-semibold ${stepStates[2] !== 'idle' ? 'text-white' : 'text-white/20'}`}>
              2. Vector Index Query (FAISS)
            </div>
            {stepStates[2] === 'running' && <div className="text-[var(--color-accent-cyan)] font-semibold mt-0.5 animate-pulse">Running Cosine Similarity Search...</div>}
            {stepStates[2] === 'completed' && <div className="text-white/40 mt-0.5">Matched document: 'tamil_cv.md' (score: 0.94)</div>}
          </div>
          {stepStates[2] === 'completed' && <CheckCircle2 size={10} className="text-green-400 shrink-0" />}
        </div>

        {/* Node 3: Retrieval Context */}
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg border shrink-0 ${
            stepStates[3] === 'completed' 
              ? 'border-green-400/20 bg-green-400/5 text-green-400' 
              : stepStates[3] === 'running'
                ? 'border-[var(--color-accent-cyan)]/30 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] animate-pulse'
                : 'border-white/5 bg-white/[0.01] text-white/20'
          }`}>
            <FileSearch size={12} />
          </div>
          <div className="flex-1 font-mono text-[9px]">
            <div className={`font-semibold ${stepStates[3] !== 'idle' ? 'text-white' : 'text-white/20'}`}>
              3. Prompt Context Injection
            </div>
            {stepStates[3] === 'running' && <div className="text-[var(--color-accent-cyan)] font-semibold mt-0.5 animate-pulse">Injecting fetched context into LLM prompt...</div>}
            {stepStates[3] === 'completed' && <div className="text-white/40 mt-0.5 truncate max-w-[200px]">System: Use context 'Tamil holds B.Sc CS...`</div>}
          </div>
          {stepStates[3] === 'completed' && <CheckCircle2 size={10} className="text-green-400 shrink-0" />}
        </div>

        {/* Node 4: LLM Generation */}
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg border shrink-0 ${
            stepStates[4] === 'completed' 
              ? 'border-green-400/20 bg-green-400/5 text-green-400' 
              : stepStates[4] === 'running'
                ? 'border-[var(--color-accent-cyan)]/30 bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] animate-pulse'
                : 'border-white/5 bg-white/[0.01] text-white/20'
          }`}>
            <Sparkles size={12} />
          </div>
          <div className="flex-1 font-mono text-[9px]">
            <div className={`font-semibold ${stepStates[4] !== 'idle' ? 'text-white' : 'text-white/20'}`}>
              4. Claude-3.5-Sonnet Generation
            </div>
            {stepStates[4] === 'running' && <div className="text-[var(--color-accent-cyan)] font-semibold mt-0.5 animate-pulse">Streaming response generation...</div>}
            {stepStates[4] === 'completed' && <div className="text-white/40 mt-0.5">Execution complete | Latency: 140ms</div>}
          </div>
          {stepStates[4] === 'completed' && <CheckCircle2 size={10} className="text-green-400 shrink-0" />}
        </div>

      </div>

      {/* Real-time LLM Output Stream */}
      {llmOutput && (
        <div className="mt-5 p-3 rounded-lg border border-white/5 bg-black/40 font-mono text-[9px] leading-relaxed text-[var(--color-accent-cyan)]">
          <div className="text-white/30 uppercase tracking-widest text-[7px] mb-1.5">LLM Stream:</div>
          <div>{llmOutput}</div>
        </div>
      )}

    </div>
  );
}
