import { NextRequest, NextResponse } from 'next/server';
import { fetchFullUserData } from '@/lib/neynar';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW);

  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return false;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { identifier } = params;

    // Validate identifier
    if (!identifier || identifier.length > 50) {
      return NextResponse.json(
        { error: 'Invalid identifier' },
        { status: 400 }
      );
    }

    // Clean the identifier
    const cleanIdentifier = identifier.trim().replace('@', '');

    if (!process.env.NEYNAR_API_KEY) {
      return NextResponse.json(
        { error: 'API configuration error: NEYNAR_API_KEY not found in environment' },
        { status: 500 }
      );
    }
    
    const userData = await fetchFullUserData(cleanIdentifier);

    return NextResponse.json(userData);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('not found') || message.includes('404')) {
      return NextResponse.json(
        { error: 'User not found', details: message },
        { status: 404 }
      );
    }

    if (message.includes('NEYNAR_API_KEY')) {
      return NextResponse.json(
        { error: 'API configuration error', details: message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch user data', details: message },
      { status: 500 }
    );
  }
}

