import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="text-red-500 w-12 h-12 mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Connection Severed</h3>
      <p className="text-gray-400 mb-6">{message}</p>
      <button 
        onClick={onRetry}
        className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};