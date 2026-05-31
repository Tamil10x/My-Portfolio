import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface LottieRobotProps {
  className?: string;
  fallback?: React.ReactNode;
  url?: string;
}

export default function LottieRobot({ 
  className = "w-full h-full", 
  fallback, 
  url = 'https://assets5.lottiefiles.com/packages/lf20_myejio2g.json' 
}: LottieRobotProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Lottie');
        return res.json();
      })
      .then((data) => {
        setAnimationData(data);
      })
      .catch((err) => {
        console.warn('Lottie loading failed, falling back to SVG:', err);
        setError(true);
      });
  }, [url]);

  if (error || !animationData) {
    return <>{fallback}</>;
  }

  return (
    <div className={className}>
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true} 
      />
    </div>
  );
}
