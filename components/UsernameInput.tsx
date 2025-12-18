import React, { useState } from 'react';

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  loading: boolean;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({ onSubmit, loading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm">
      <input
        type="text"
        placeholder="Enter Farcaster Username"
        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !value}
        className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {loading ? 'Reading Soul...' : 'Reveal My Soul'}
      </button>
    </form>
  );
};