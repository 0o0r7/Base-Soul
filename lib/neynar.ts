import { NeynarUser, NeynarCast, UserData } from './types';

// Get API key from environment - try both possible names
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || process.env.NEXT_PUBLIC_NEYNAR_API_KEY || '';
const NEYNAR_BASE_URL = 'https://api.neynar.com/v2/farcaster';

async function neynarFetch<T>(endpoint: string): Promise<T> {
  if (!NEYNAR_API_KEY) {
    console.error('NEYNAR_API_KEY is missing!');
    throw new Error('NEYNAR_API_KEY is not set in environment variables');
  }

  const url = `${NEYNAR_BASE_URL}${endpoint}`;
  console.log(`Fetching from Neynar: ${url}`);
  console.log(`API Key present: ${NEYNAR_API_KEY ? 'Yes' : 'No'}`);

  // Try both header formats - Neynar API v2 uses 'api_key' header
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'api_key': NEYNAR_API_KEY,
    },
    cache: 'no-store', // Don't cache API calls
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Neynar API error [${response.status}]:`, errorText);
    throw new Error(`Neynar API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function fetchUserByFid(fid: number): Promise<NeynarUser> {
  const data = await neynarFetch<{ users: NeynarUser[] }>(
    `/user/bulk?fids=${fid}`
  );

  if (!data.users || data.users.length === 0) {
    throw new Error('User not found');
  }

  return data.users[0];
}

export async function fetchUserByUsername(username: string): Promise<NeynarUser> {
  const cleanUsername = username.replace('@', '').toLowerCase().trim();
  const data = await neynarFetch<{ user: NeynarUser }>(
    `/user/by_username?username=${cleanUsername}`
  );

  if (!data.user) {
    throw new Error('User not found');
  }

  return data.user;
}

export async function fetchUserCasts(fid: number, limit: number = 100): Promise<NeynarCast[]> {
  const data = await neynarFetch<{ casts: NeynarCast[] }>(
    `/feed/user/casts?fid=${fid}&limit=${limit}`
  );

  return data.casts || [];
}

export async function fetchFullUserData(identifier: string | number): Promise<UserData> {
  let user: NeynarUser;

  if (typeof identifier === 'number' || /^\d+$/.test(String(identifier))) {
    user = await fetchUserByFid(Number(identifier));
  } else {
    user = await fetchUserByUsername(String(identifier));
  }

  const casts = await fetchUserCasts(user.fid, 100);

  return { user, casts };
}

