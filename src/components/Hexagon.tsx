import React from 'react';

interface HexagonProps {
  delay: number;
  scale: number;
  position: {
    x: number;
    y: number;
  };
  colorOffset: number;
}

export const Hexagon: React.FC<HexagonProps> = ({ delay, scale, position, colorOffset }) => {
  return (
    <div
      className="hex"
      style={{
        '--delay': `${delay}s`,
        '--scale': scale.toString(),
        '--x': `${position.x}%`,
        '--y': `${position.y}%`,
        '--color-offset': `${colorOffset}`,
      } as React.CSSProperties}
    >
      <div className="hex-inner">
        <div className="hex-pulse" />
        <div className="hex-glow" />
      </div>
    </div>
  );
};