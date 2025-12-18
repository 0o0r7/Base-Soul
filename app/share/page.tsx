'use client';

import React, { useEffect, useState } from 'react';
import { UserData, SoulResult } from '@/lib/types';
import { computeSoul } from '@/lib/soulEngine';
import { SoulOrb } from '@/components/SoulOrb';
import { ArchetypeCard } from '@/components/ArchetypeCard';
import { LoadingState } from '@/components/LoadingState';
import Link from 'next/link';

export default function SharePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [soul, setSoul] = useState<SoulResult | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fid = params.get('fid');
    if (fid) {
      fetch(`/api/user/${fid}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          setSoul(computeSoul(data));
        })
        .catch(console.error);
    }
  }, []);

  if (!soul || !userData) return <LoadingState />;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto pt-12">
       <div className="mb-6 text-gray-500 text-sm uppercase tracking-widest">
         Soul Revealed: @{userData.profile.username}
       </div>
       
       <SoulOrb color={soul.color} size={250} />
       
       <ArchetypeCard 
         archetype={soul.archetype} 
         color={soul.color}
         reasoning={soul.reasoning.short}
       />

       <div className="mt-12">
         <Link 
           href="/"
           className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-block"
         >
           Reveal My Soul
         </Link>
       </div>
    </div>
  );
}