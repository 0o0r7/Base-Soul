'use client';

import React from 'react';
import { SoulResult } from '@/lib/types';
import { APP_URL, FRAME_URL } from '@/lib/constants';

interface NascentSoulProps {
  soul: SoulResult;
}

export const NascentSoul: React.FC<NascentSoulProps> = ({ soul }) => {
  const handleShare = () => {
    const shareText = `My Base Soul is still forming... 🌱\n\nDiscover yours:`;
    const shareUrl = `${FRAME_URL}?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(APP_URL)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="relative w-64 h-64 flex flex-col items-center justify-center">
      {/* Muted Orb */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
          filter: 'blur(30px)'
        }}
      />
      <div
        className="absolute inset-6 rounded-full"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: '1px solid rgba(255,255,255,0.08)'
        }}
      />
      
      {/* Identity */}
      <div className="text-center mb-6 relative z-10">
        <p className="text-white/40 text-sm font-mono mb-1">@{soul.username}</p>
        <h3 className="text-white text-xl font-semibold mb-2">Nascent Soul</h3>
        <p className="text-white/50 text-sm max-w-xs">
          Your soul is still forming. Cast more to reveal your true colors.
        </p>
      </div>

      {/* Share anyway */}
      <button
        onClick={handleShare}
        className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-all relative z-10"
      >
        Share Anyway
      </button>
    </div>
  );
};









