import { NeynarUser, NeynarCast, UserData } from './types';

const API_KEY = process.env.NEYNAR_API_KEY;
const BASE_URL = 'https://api.neynar.com/v2/farcaster';

if (!API_KEY) {
  console.warn("NEYNAR_API_KEY is not set. API calls will fail.");
}

async function fetchWithAuth(url: string) {
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'api_key': API_KEY || '',
    },
    next: { revalidate: 300 } // Cache for 5 minutes
  } as RequestInit & { next?: { revalidate: number } });
  
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Neynar API error: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchUserByFid(fid: number): Promise<NeynarUser | null> {
  const data = await fetchWithAuth(`${BASE_URL}/user/bulk?fids=${fid}`);
  return data?.users?.[0] || null;
}

export async function fetchUserByUsername(username: string): Promise<NeynarUser | null> {
  const data = await fetchWithAuth(`${BASE_URL}/user/by_username?username=${username}`);
  return data?.user || null;
}

export async function fetchUserCasts(fid: number, limit: number = 100): Promise<NeynarCast[]> {
  const data = await fetchWithAuth(`${BASE_URL}/feed/user/casts?fid=${fid}&limit=${limit}`);
  return data?.casts || [];
}

export async function fetchFullUserData(identifier: string | number): Promise<UserData | null> {
  let user: NeynarUser | null = null;
  
  // Clean identifier if string
  if (typeof identifier === 'string' && /^\d+$/.test(identifier)) {
    identifier = parseInt(identifier, 10);
  }

  if (typeof identifier === 'number') {
    user = await fetchUserByFid(identifier);
  } else {
    user = await fetchUserByUsername(identifier as string);
  }

  if (!user) return null;

  const casts = await fetchUserCasts(user.fid, 100);
  
  // Calculate account age (approximate from fid or if provided by API in future)
  // Neynar v2 user object doesn't strictly have created_at in the basic response sometimes,
  // but let's assume active_status or similar gives a hint, or just default to 0 for now if missing.
  // Actually, let's look for a timestamp in the first cast if available, or just use 0.
  // For MVP, if we can't get age, we set it to 0.
  const accountAgeDays = 0; // Placeholder as exact registration date might need another endpoint or inference

  return {
    profile: user,
    casts,
    accountAgeDays
  };
}