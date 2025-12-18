import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const color = searchParams.get('color') || '#ffffff';
    const archetype = searchParams.get('archetype') || 'Base Soul';
    const username = searchParams.get('username') || 'Anon';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Background Gradient */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              backgroundImage: `radial-gradient(circle at center, ${color}20, transparent 40%)`,
            }}
          />

          {/* Orb */}
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, #ffffff, ${color}, #000000)`,
              boxShadow: `0 0 80px ${color}80`,
              marginBottom: 40,
            }}
          />

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: color, fontSize: 60, fontWeight: 'bold', marginBottom: 10 }}>
              {archetype}
            </div>
            <div style={{ color: '#888888', fontSize: 30 }}>
              @{username}
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 40, color: '#444', fontSize: 20 }}>
            BASE SOUL
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}