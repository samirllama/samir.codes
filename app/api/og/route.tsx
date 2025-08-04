// app/api/og/route.tsx
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Welcome to My Blog";
  const subtitle =
    searchParams.get("subtitle") ||
    "Thoughts on web development and technology";
  const theme = searchParams.get("theme") || "gradient";
  const author = searchParams.get("author") || "Your Name";

  // Different theme configurations
  const themes = {
    gradient: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "white",
      accentColor: "rgba(255, 255, 255, 0.2)",
    },
    dark: {
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      textColor: "white",
      accentColor: "rgba(255, 255, 255, 0.1)",
    },
    light: {
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      textColor: "#1a202c",
      accentColor: "rgba(0, 0, 0, 0.1)",
    },
    tech: {
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      textColor: "#00d9ff",
      accentColor: "rgba(0, 217, 255, 0.2)",
    },
  };

  const currentTheme = themes[theme as keyof typeof themes] || themes.gradient;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: currentTheme.background,
          padding: "60px",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "300px",
            height: "300px",
            background: currentTheme.accentColor,
            borderRadius: "50%",
            transform: "translate(150px, -150px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "200px",
            height: "200px",
            background: currentTheme.accentColor,
            borderRadius: "50%",
            transform: "translate(-100px, 100px)",
          }}
        />

        {/* Header with enhanced logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill={currentTheme.textColor}
            style={{ marginRight: "20px" }}
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: currentTheme.textColor,
              }}
            >
              {author}'s Blog
            </span>
            <span
              style={{
                fontSize: "16px",
                color: currentTheme.textColor,
                opacity: 0.8,
              }}
            >
              Personal thoughts & insights
            </span>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            width: "100%",
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: currentTheme.textColor,
              lineHeight: "1.1",
              marginBottom: "20px",
              textShadow:
                theme === "light" ? "none" : "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: "24px",
                color: currentTheme.textColor,
                opacity: 0.8,
                lineHeight: "1.4",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Footer with social proof */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            color: currentTheme.textColor,
            opacity: 0.9,
            fontSize: "18px",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>📚 Personal Blog</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>✨ Latest Post</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
