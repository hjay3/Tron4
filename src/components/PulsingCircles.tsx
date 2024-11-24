import React from 'react';

export const PulsingCircles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen animate-pulse-circle"
          style={{
            width: `${30 + i * 10}vmin`,
            height: `${30 + i * 10}vmin`,
            left: `${20 + Math.sin(i * 1.5) * 10}%`,
            top: `${20 + Math.cos(i * 1.5) * 10}%`,
            background: `radial-gradient(circle at center, 
              hsl(${180 + i * 45}, 100%, 50%, 0.3) 0%,
              transparent 70%)`,
            filter: 'blur(8px)',
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen animate-pulse-circle"
          style={{
            width: `${25 + i * 10}vmin`,
            height: `${25 + i * 10}vmin`,
            right: `${20 + Math.cos(i * 1.5) * 10}%`,
            bottom: `${20 + Math.sin(i * 1.5) * 10}%`,
            background: `radial-gradient(circle at center, 
              hsl(${270 + i * 45}, 100%, 50%, 0.3) 0%,
              transparent 70%)`,
            filter: 'blur(8px)',
            animationDelay: `${i * 0.5 + 0.25}s`,
          }}
        />
      ))}
    </div>
  );
};