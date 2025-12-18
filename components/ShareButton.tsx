import React from 'react';
import { SoulResult } from '@/lib/types';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  result: SoulResult;
  username: string;
  fid: number;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ result, username, fid }) => {
  const handleShare = () => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const shareUrl = `${appUrl}/share?fid=${fid}`;
    const text = `My soul burns ${result.color.hex}. I am ${result.archetype.name}. Discover your Base Soul:`;
    
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(shareUrl)}`;
    
    window.open(warpcastUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform mt-6"
    >
      <Share2 size={20} />
      Share on Farcaster
    </button>
  );
};