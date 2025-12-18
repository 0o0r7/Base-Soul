import React from 'react';
import { Archetype, SoulColor } from '@/lib/types';

interface ArchetypeCardProps {
  archetype: Archetype;
  color: SoulColor;
  reasoning: string;
}

export const ArchetypeCard: React.FC<ArchetypeCardProps> = ({ archetype, color, reasoning }) => {
  return (
    <div className="text-center max-w-md mx-auto p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm mt-8">
      <h2 
        className="text-3xl font-bold mb-2 tracking-tight"
        style={{ color: color.hex, textShadow: `0 0 10px ${color.hex}60` }}
      >
        {archetype.name}
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed">
        {reasoning}
      </p>
    </div>
  );
};