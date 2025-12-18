'use client';

import React, { useEffect, useState } from 'react';
import { UserData, SoulResult } from '@/lib/types';
import { computeSoul } from '@/lib/soulEngine';
import { SoulOrb } from '@/components/SoulOrb';
import { ArchetypeCard } from '@/components/ArchetypeCard';
import { ShareButton } from '@/components/ShareButton';
import { UsernameInput } from '@/components/UsernameInput';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { SoulReading } from '@/components/SoulReading';

export default function Home() {
  const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [soul, setSoul] = useState<SoulResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-detection logic (mocked for browser, real app would use SDK)
  useEffect(() => {
    // Check for FID in search params as simple Mini App context fallback
    const params = new URLSearchParams(window.location.search);
    const fid = params.get('fid');
    if (fid) {
      handleFetch(fid);
    }
  }, []);

  const handleFetch = async (identifier: string) => {
    setStep('loading');
    setError(null);
    try {
      const res = await fetch(`/api/user/${identifier}`);
      if (!res.ok) {
        throw new Error('User not found or API unavailable');
      }
      const data: UserData = await res.json();
      setUserData(data);
      
      // Compute soul client-side
      const soulResult = computeSoul(data);
      setSoul(soulResult);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStep('input');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto animate-in fade-in duration-700">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-600">
          BASE SOUL
        </h1>
        <p className="text-gray-500 mt-2">The protocol reflects who you are.</p>
      </header>

      {error && <div className="mb-8"><ErrorState message={error} onRetry={() => setError(null)} /></div>}

      {step === 'input' && !error && (
        <UsernameInput onSubmit={handleFetch} loading={false} />
      )}

      {step === 'loading' && <LoadingState />}

      {step === 'result' && soul && userData && (
        <div className="flex flex-col items-center w-full animate-in slide-in-from-bottom-10 duration-1000">
          <SoulOrb color={soul.color} />
          
          <ArchetypeCard 
            archetype={soul.archetype} 
            color={soul.color}
            reasoning={soul.reasoning.short}
          />

          <SoulReading result={soul} />

          <ShareButton 
            result={soul} 
            username={userData.profile.username}
            fid={userData.profile.fid}
          />
        </div>
      )}
    </div>
  );
}