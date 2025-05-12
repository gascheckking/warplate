// app/api/frame-image.js
import { ImageResponse } from 'next/og';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');
    
    // Hämta användardata från din backend/database
    const userData = await fetchUserData(fid); // Ersätt med din datahämtning
    
    return new ImageResponse(
      (
        <div style={{
          display: 'flex',
          background: '#0F0F0F',
          width: '100%',
          height: '100%',
          color: 'white',
          padding: '40px',
          fontFamily: 'Inter',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Logo */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '32px'
          }}>
            <span style={{ color: '#00FF88' }}>Warp</span>.ai
          </div>

          {/* Huvudinnehåll */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '72px', background: 'linear-gradient(90deg, #00FF88, #00A3FF)', 
                        backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {userData.xp} XP
            </div>
            
            {/* Progress bar */}
            <div style={{
              width: '500px',
              height: '12px',
              background: '#2D2D2D',
              borderRadius: '8px'
            }}>
              <div style={{
                width: `${userData.xpProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00FF88, #00A3FF)',
                borderRadius: '8px'
              }}/>
            </div>

            <div style={{ fontSize: '32px' }}>
              Rank: #{userData.rank}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

  } catch (error) {
    console.error('Frame Image Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Mockad datahämtning - ersätt med din riktiga implementation
async function fetchUserData(fid) {
  // Exempel: Hämta data från din database/contract
  return {
    xp: 1420,
    xpProgress: 65,
    rank: 42
  };
}
