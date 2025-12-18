import React from 'react';
import { SoulColor } from '@/lib/types';

interface SoulOrbProps {
  color: SoulColor;
  size?: number;
  animate?: boolean;
}

export const SoulOrb: React.FC<SoulOrbProps> = ({ color, size = 200, animate = true }) => {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer Glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl opacity-50 ${animate ? 'animate-pulse-slow' : ''}`}
        style={{ backgroundColor: color.hex }}
      />
      
      {/* Inner Core */}
      <div 
        className="relative rounded-full shadow-2xl"
        style={{ 
          width: size * 0.8, 
          height: size * 0.8,
          background: `radial-gradient(circle at 30% 30%, #ffffff, ${color.hex}, #000000)`,
          boxShadow: `0 0 60px ${color.hex}80` 
        }}
      />
      
      {/* Shine */}
      <div 
        className="absolute top-[15%] left-[20%] w-[20%] h-[20%] bg-white rounded-full blur-xl opacity-80"
      />
    </div>
  );
};