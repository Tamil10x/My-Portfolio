import { useState, useEffect } from 'react';
import { PhoneCall, PhoneOff, Mic, RefreshCw, Volume2 } from 'lucide-react';

type CallState = 'idle' | 'connecting' | 'connected' | 'thinking' | 'speaking';

export default function VoiceAgentPlayground() {
  const [callState, setCallState] = useState<CallState>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [waveHeights, setWaveHeights] = useState<number[]>([15, 15, 15, 15, 15, 15, 15, 15, 15, 15]);

  // Handle equalizer wave animation based on states
  useEffect(() => {
    if (callState === 'idle') {
      setWaveHeights([4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
      return;
    }

    let intervalId: number;

    const animateWave = () => {
      setWaveHeights(() => {
        return Array.from({ length: 10 }, () => {
          if (callState === 'connecting') return Math.random() * 8 + 4;
          if (callState === 'thinking') return Math.sin(Date.now() / 150) * 8 + 10; // Slow, breathing roll
          if (callState === 'speaking') return Math.random() * 32 + 8; // High active spikes
          return Math.random() * 12 + 6; // Listening state (small activity)
        });
      });
    };

    intervalId = window.setInterval(animateWave, 100);
    return () => clearInterval(intervalId);
  }, [callState]);

  // Automated conversation transcript sequence to simulate full call RAG loops!
  const triggerSimulation = () => {
    setCallState('connecting');
    setTranscript('Establishing secure WebSocket connection...');

    setTimeout(() => {
      setCallState('speaking');
      setTranscript("Agent: 'Connected. Hello! I am Tamil's RAG Voice Agent. Ask me about his scalable Python microservices.'");
    }, 1500);

    setTimeout(() => {
      setCallState('connected'); // Listening
      setTranscript("User: 'Tell me about his FastAPI RAG pipelines.'");
    }, 4500);

    setTimeout(() => {
      setCallState('thinking');
      setTranscript("Thinking... Searching Vector Database (Pinecone) & querying LLM...");
    }, 6500);

    setTimeout(() => {
      setCallState('speaking');
      setTranscript("Agent: 'Tamil builds high-speed FastAPI APIs using LangChain. He optimized CRM pipelines to deliver 40% chatbot accuracy improvements.'");
    }, 8500);

    setTimeout(() => {
      setCallState('connected'); // Back to listening
      setTranscript("Agent IDLE. Listening for microphone input...");
    }, 13500);
  };

  const startCall = () => {
    triggerSimulation();
  };

  const endCall = () => {
    setCallState('idle');
    setTranscript('Call disconnected.');
  };

  const getStatusText = () => {
    switch (callState) {
      case 'connecting': return 'CONNECTING...';
      case 'connected': return 'AGENT LISTENING';
      case 'thinking': return 'THINKING...';
      case 'speaking': return 'AGENT SPEAKING';
      default: return 'AGENT OFFLINE';
    }
  };

  const getStatusColor = () => {
    switch (callState) {
      case 'connecting': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'connected': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'thinking': return 'text-[var(--color-accent-purple)] bg-[var(--color-accent-purple)]/10 border-[var(--color-accent-purple)]/20';
      case 'speaking': return 'text-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/10 border-[var(--color-accent-cyan)]/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="mt-6 p-5 rounded-2xl glass-panel border border-white/5 bg-black/30 relative overflow-hidden select-none">
      
      {/* HUD Header Status */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${callState !== 'idle' ? 'bg-[#10b981] animate-ping' : 'bg-white/20'}`} />
          <span className={`px-2 py-0.5 rounded text-[8px] font-mono border uppercase tracking-wider ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <span className="font-mono text-[9px] text-white/30 tracking-widest">VOICE_RAG: v1.0</span>
      </div>

      {/* Main Equalizer Visualizer Block */}
      <div className="h-16 flex items-center justify-center gap-1.5 mb-4 border border-white/5 bg-white/[0.01] rounded-xl relative">
        {/* Dynamic Equalizer Bars */}
        {waveHeights.map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full transition-all duration-100 ease-out"
            style={{
              height: `${h}px`,
              background: callState === 'speaking' 
                ? 'var(--color-accent-cyan)' 
                : callState === 'thinking' 
                  ? 'var(--color-accent-purple)' 
                  : 'rgba(255, 255, 255, 0.25)',
              boxShadow: callState === 'speaking' 
                ? '0 0 10px var(--color-accent-cyan)' 
                : callState === 'thinking' 
                  ? '0 0 10px var(--color-accent-purple)' 
                  : 'none'
            }}
          />
        ))}

        {/* Ambient mic icon indicator inside the wave block */}
        {callState === 'connected' && (
          <Mic size={12} className="absolute right-3 text-green-400 animate-pulse" />
        )}
        {callState === 'speaking' && (
          <Volume2 size={12} className="absolute right-3 text-[var(--color-accent-cyan)] animate-bounce" />
        )}
        {callState === 'thinking' && (
          <RefreshCw size={12} className="absolute right-3 text-[var(--color-accent-purple)] animate-spin" />
        )}
      </div>

      {/* Simulated Transcript Output Box */}
      <div className="h-14 overflow-y-auto mb-5 p-3 rounded-lg border border-white/5 bg-black/40 font-mono text-[9px] leading-relaxed text-white/70">
        {transcript ? (
          <div className="transition-all duration-300">
            {transcript}
          </div>
        ) : (
          <div className="text-white/30 italic">Initialize voice call to run RAG conversation simulations...</div>
        )}
      </div>

      {/* Dial Call Controls */}
      <div className="flex gap-4">
        {callState === 'idle' ? (
          <button
            onClick={startCall}
            className="flex-1 py-2.5 rounded-xl border border-white/10 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 font-mono text-[9px] uppercase tracking-widest text-white/80 hover:text-green-400 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall size={10} />
            <span>Dial AI Agent</span>
          </button>
        ) : (
          <button
            onClick={endCall}
            className="flex-1 py-2.5 rounded-xl border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 font-mono text-[9px] uppercase tracking-widest text-red-500/80 hover:text-red-500 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneOff size={10} />
            <span>End Call</span>
          </button>
        )}
      </div>

    </div>
  );
}
