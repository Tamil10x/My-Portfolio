import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export default function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Initial set
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  // Convert to IST
  const istTime = toZonedTime(time, 'Asia/Kolkata');
  const formattedTime = format(istTime, 'HH:mm');

  return (
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-cyan)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-cyan)]"></span>
      </span>
      <span>Currently Coding &middot; {formattedTime} IST</span>
    </div>
  );
}
