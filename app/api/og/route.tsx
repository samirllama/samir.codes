import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to right, #1a202c, #2d3748)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '0 50px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 160, fontWeight: 'bold', marginBottom: -40 }}>Samir Llama</p>
        <p style={{ fontSize: 60, opacity: 0.8 }}>Full-Stack Developer & Designer</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}