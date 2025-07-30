// app/api/og/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          color: "white",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "monospace", // Use system fallback
        }}
      >
        {/* Top: Badge */}
        <div
          style={{
            fontSize: 32,
            padding: "10px 24px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "999px",
            display: "inline-block",
            width: "fit-content",
          }}
        >
          Personal Blog
        </div>

        {/* Middle: Main content */}
        <div>
          <h1 style={{ fontSize: 100, margin: 0 }}>Samir Lama</h1>
          <p
            style={{
              fontSize: 48,
              opacity: 0.85,
              marginTop: "20px",
              maxWidth: "90%",
            }}
          >
            Full‑Stack Developer & Designer
          </p>
        </div>

        {/* Bottom: URL or signature */}
        <div
          style={{
            fontSize: 28,
            opacity: 0.5,
          }}
        >
          samirlama.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
