import React, { useEffect, useRef } from 'react';
import { Cpu, Activity, Zap } from 'lucide-react';
import { Hexagon } from './Hexagon';
import { PerformanceMonitor } from './PerformanceMonitor';
import { PulsingCircles } from './PulsingCircles';

const HexGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      containerRef.current.style.setProperty('--mouse-x', x.toString());
      containerRef.current.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      <PerformanceMonitor />
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-purple-900/10 to-cyan-900/10 animate-gradient-shift" />
      <PulsingCircles />
      <div className="hex-grid">
        {[...Array(150)].map((_, i) => (
          <Hexagon
            key={i}
            delay={Math.random() * 5}
            scale={0.8 + Math.random() * 0.4}
            position={{
              x: Math.random() * 100,
              y: Math.random() * 100
            }}
            colorOffset={i * 2.4}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10 backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
          <div className="relative">
            <Cpu className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <Activity className="absolute top-6 right-[calc(50%-2rem)] w-4 h-4 text-purple-400 animate-pulse" />
            <Zap className="absolute top-6 left-[calc(50%-2rem)] w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-gradient tracking-wider mb-2">
            SYSTEM ACTIVE
          </h1>
          <p className="text-cyan-300/80 tracking-widest text-sm">
            GRID INITIALIZATION COMPLETE
          </p>
        </div>
      </div>
    </div>
  );
};

export default HexGrid;