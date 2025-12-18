'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SoulResult, UserData } from '@/lib/types';
import { computeSoul } from '@/lib/soulEngine';
import { SoulDisplay } from '@/components/SoulDisplay';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { APP_URL } from '@/lib/constants';

function SharePageContent() {
  const searchParams = useSearchParams();
  const fid = searchParams.get('fid');
  const [soul, setSoul] = useState<SoulResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fid) {
      setError('No FID provided');
      setIsLoading(false);
      return;
    }

    const fetchSoul = async () => {
      try {
        const response = await fetch(`/api/user/${fid}`);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch user');
        }

        const userData: UserData = await response.json();
        const soulResult = computeSoul(userData);
        setSoul(soulResult);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSoul();
  }, [fid]);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleDiscoverOwn = () => {
    window.location.href = APP_URL;
  };

  return (
    <main className="min-h-screen bg-soul-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <LoadingState />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <ErrorState message={error} onRetry={handleRetry} />
          </div>
        ) : soul ? (
          <>
            <SoulDisplay soul={soul} />
            <button
              onClick={handleDiscoverOwn}
              className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all text-center"
            >
              Discover Your Soul
            </button>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-soul-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoadingState />
        </div>
      </main>
    }>
      <SharePageContent />
    </Suspense>
  );
}

