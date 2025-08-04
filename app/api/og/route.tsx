// app/api/og/route.ts
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// This makes Next.js deploy it as an Edge Function
export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Welcome to My Blog";
  const subtitle =
    searchParams.get("subtitle") ||
    "Thoughts on web development and technology";
  const theme = searchParams.get("theme") || "gradient";
  const author = searchParams.get("author") || "Your Name";

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
          // full-bleed
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
        {/* Accents */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
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
            bottom: 0,
            left: 0,
            width: "200px",
            height: "200px",
            background: currentTheme.accentColor,
            borderRadius: "50%",
            transform: "translate(-100px, 100px)",
          }}
        />

        {/* Logo + author */}
        <div style={{ display: "flex", alignItems: "center", zIndex: 1 }}>
          <svg
            width="70"
            height="56"
            viewBox="0 0 70 56"
            fill={currentTheme.textColor}
            style={{ marginRight: "20px" }}
          >
            <g id="SL-vector">
              <path d="M94.7778 4.76976C93.628 4.43618 93.2994 4.13987 93.2994 3.43615V2.53158H135.313L135.312 3.41876C135.311 4.13418 134.838 4.50432 132.865 5.33153C128.353 7.22299 125.37 10.7728 124.227 15.6097C123.987 16.6267 123.815 34.3962 123.815 58.1713V98.9872L128.348 98.7622C136.3 98.3672 140.719 97.0134 145.168 93.6084C148.994 90.6804 150.618 88.7403 154.551 82.4023C157.355 77.8826 158.272 76.6998 158.973 76.6998C159.674 76.6998 159.886 76.9727 159.994 78.0143C160.173 79.7503 156.331 101.084 155.389 103.581C155.169 104.165 153.298 104.202 124.227 104.202H93.2994L93.3052 103.227C93.3105 102.382 93.6811 102.108 96.0692 101.186C99.0774 100.025 101.274 98.0791 102.189 95.7653C102.566 94.8136 102.837 83.8611 103.157 56.6496C103.642 15.4163 103.583 13.8786 101.38 10.2692C99.9712 7.96005 96.8701 5.37695 94.7778 4.76976Z" />
              <path d="M27.8469 4.02664C31.1111 2.51098 37.4825 0.767494 41.6308 0.255413C45.9688 -0.280443 57.0462 0.0726529 61.486 0.888504C68.7804 2.22886 75.7418 4.85491 79.2546 7.59097C81.7396 9.52715 82.4693 11.4179 82.4374 15.8393C82.4074 19.9909 81.675 22.0165 79.0374 25.2434C77.8341 26.7157 77.3627 27.0177 76.2685 27.0177C75.0577 27.0177 74.9188 26.8875 74.5667 25.4208C71.2999 11.821 65.6347 5.56571 55.2662 4.10967C46.6755 2.90347 37.4149 6.42841 34.0401 12.1894C30.783 17.7495 32.5033 24.0148 38.7469 29.3294C42.7696 32.7535 46.5805 35.0304 57.6986 40.6537C75.7476 49.7817 82.1725 54.5686 86.3898 62.0294C88.9672 66.5888 89.5076 68.6928 89.5187 74.2157C89.5302 80.042 88.8859 82.4693 86.0316 87.346C82.0779 94.1017 75.0046 99.4283 65.9774 102.448C40.2859 111.043 8.79129 103.362 1.39735 86.6987C-0.108502 83.3051 -0.454345 77.9174 0.639775 74.8978C3.49625 67.0125 11.7592 61.9691 21.8124 61.9748C27.5103 61.9776 30.5424 63.0195 31.1752 65.1913C31.4123 66.0054 31.1376 66.2605 28.6128 67.5707C21.9972 71.0038 18.5773 75.9659 18.5649 82.1492C18.5468 91.0682 26.0761 98.802 37.1341 101.223C41.4583 102.169 49.2547 102.112 53.2761 101.104C62.5483 98.781 68.8945 93.0101 70.5494 85.3974C72.8292 74.9109 65.7364 66.8003 45.623 56.8955C31.919 50.1469 26.4661 47.0825 22.5712 43.9412C16.3586 38.9304 13.3624 33.4384 12.9303 26.2714C12.634 21.3579 13.4574 18.0753 16.0149 13.9755C18.2036 10.4669 23.416 6.08419 27.8469 4.02664Z" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: currentTheme.textColor,
              }}
            >
              {author}’s Blog
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

        {/* Title + subtitle */}
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
              lineHeight: 1.1,
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
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Footer */}
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
          <span>📚 Personal Blog</span>
          <span>✨ Latest Post</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
