import { NextRequest, NextResponse } from 'next/server';
import { fetchFullUserData } from '@/lib/neynar';

export async function GET(
  request: NextRequest,
  { params }: { params: { identifier: string } }
) {
  try {
    const identifier = params.identifier;
    
    // Basic validation
    if (!identifier || identifier.length > 50) {
      return NextResponse.json({ error: 'Invalid identifier' }, { status: 400 });
    }

    const userData = await fetchFullUserData(identifier);
    
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}