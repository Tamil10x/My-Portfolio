import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { getHeatmapData, HeatmapContribution } from '../../lib/dataAdapter';

export default function Heatmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<HeatmapContribution[]>([]);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    getHeatmapData().then(setData);
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Stagger animate the blocks in when scrolling into view
      gsap.fromTo(blocksRef.current, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        stagger: {
          each: 0.005,
          from: "random"
        },
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  // Determine colors based on count
  const getColor = (count: number) => {
    if (count === 0) return 'bg-white/5 border-white/5';
    if (count < 3) return 'bg-[var(--color-accent-purple)]/30 border-[var(--color-accent-purple)]/50';
    if (count < 6) return 'bg-[var(--color-accent-purple)]/60 border-[var(--color-accent-purple)]/80';
    if (count < 9) return 'bg-[var(--color-accent-cyan)]/60 border-[var(--color-accent-cyan)]/80';
    return 'bg-[var(--color-accent-cyan)] border-[var(--color-accent-cyan)] shadow-[0_0_8px_var(--color-accent-cyan)]';
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-sm text-[var(--color-accent-cyan)] uppercase tracking-widest">Coding Activity</h4>
        <span className="font-mono text-xs text-white/50">Last 90 Days</span>
      </div>
      
      <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-white/5">
        <div className="flex flex-wrap gap-1.5 justify-start">
          {data.map((day, i) => (
            <div
              key={i}
              ref={el => { blocksRef.current[i] = el; }}
              className={`w-4 h-4 rounded-[3px] border ${getColor(day.count)} transition-all hover:scale-125 cursor-crosshair`}
              title={`${day.count} commits on ${day.date}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
