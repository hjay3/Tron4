import React, { useEffect, useState } from 'react';
import { Gauge, Cpu, HardDrive } from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
  };
  cpu: number;
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: {
      usedJSHeapSize: 0,
      totalJSHeapSize: 0,
    },
    cpu: 0,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let frameTimes: number[] = [];
    const maxFrameTimes = 60;

    const updateMetrics = () => {
      const now = performance.now();
      const delta = now - lastTime;
      
      // Calculate FPS
      frameCount++;
      if (delta >= 1000) {
        const fps = Math.round((frameCount * 1000) / delta);
        frameTimes.push(fps);
        if (frameTimes.length > maxFrameTimes) {
          frameTimes.shift();
        }
        const avgFps = Math.round(frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length);
        
        // Get memory usage
        const memory = (performance as any).memory || {
          usedJSHeapSize: 0,
          totalJSHeapSize: 0,
        };

        // Estimate CPU usage based on frame time
        const cpuLoad = Math.min(100, Math.round((delta / (1000 / 60)) * 100));

        setMetrics({
          fps: avgFps,
          memory: {
            usedJSHeapSize: memory.usedJSHeapSize,
            totalJSHeapSize: memory.totalJSHeapSize,
          },
          cpu: cpuLoad,
        });

        frameCount = 0;
        lastTime = now;
      }

      requestAnimationFrame(updateMetrics);
    };

    requestAnimationFrame(updateMetrics);
  }, []);

  const formatMemory = (bytes: number) => {
    return `${Math.round(bytes / (1024 * 1024))}MB`;
  };

  return (
    <div className="fixed top-4 left-4 space-y-2 z-20">
      <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
        <Gauge className="w-4 h-4 text-green-400" />
        <span className="text-green-400 font-mono">FPS: {metrics.fps}</span>
      </div>
      <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
        <Cpu className="w-4 h-4 text-purple-400" />
        <span className="text-purple-400 font-mono">CPU: {metrics.cpu}%</span>
      </div>
      <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/30">
        <HardDrive className="w-4 h-4 text-cyan-400" />
        <span className="text-cyan-400 font-mono">
          MEM: {formatMemory(metrics.memory.usedJSHeapSize)} / {formatMemory(metrics.memory.totalJSHeapSize)}
        </span>
      </div>
    </div>
  );
};