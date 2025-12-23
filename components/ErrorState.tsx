'use client';

import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-white text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-white/50 text-sm text-center mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-all"
      >
        Try Again
      </button>
    </div>
  );
};









