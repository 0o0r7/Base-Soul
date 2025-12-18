import React, { useState } from 'react';
import { SoulResult } from '@/lib/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const SoulReading: React.FC<{ result: SoulResult }> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
      >
        <span className="font-semibold text-gray-200">Read Full Prophecy</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      
      {isOpen && (
        <div className="mt-4 p-6 bg-black/40 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-gray-300 leading-relaxed mb-6">
            {result.reasoning?.long || result.archetype.description}
          </p>
          
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Soul Dimensions</h4>
            {Object.entries(result.dimensions).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="w-24 capitalize text-sm text-gray-400">{key}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(value as number) * 100}%`,
                      backgroundColor: result.color.hex 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};