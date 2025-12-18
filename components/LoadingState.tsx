import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-24 h-24 rounded-full border-4 border-t-neon-blue border-r-neon-purple border-b-neon-pink border-l-transparent animate-spin mb-8" />
      <p className="text-gray-400 animate-pulse text-lg">Communing with the protocol...</p>
    </div>
  );
};