// app/api/og/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "StreamLine";
    const description =
      searchParams.get("description") || "Streamline Your Workflow";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            backgroundImage: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "20px",
              padding: "40px",
              margin: "40px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              ⚡ {title}
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "#666666",
                textAlign: "center",
                maxWidth: "800px",
              }}
            >
              {description}
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
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}

// export async function GET() {
//   return new ImageResponse(
//     (
//       <div
//         style={{
//           width: "1200px",
//           height: "630px",
//           background: "linear-gradient(to right, #0f172a, #1e293b)",
//           color: "white",
//           padding: "60px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           fontFamily: "monospace", // Use system fallback
//         }}
//       >
//         {/* Top: Badge */}
//         <div
//           style={{
//             fontSize: 32,
//             padding: "10px 24px",
//             background: "rgba(255,255,255,0.1)",
//             borderRadius: "999px",
//             display: "inline-block",
//             width: "fit-content",
//           }}
//         >
//           Personal Blog
//         </div>

//         {/* Middle: Main content */}
//         <div>
//           <h1 style={{ fontSize: 100, margin: 0 }}>Samir Lama</h1>
//           <p
//             style={{
//               fontSize: 48,
//               opacity: 0.85,
//               marginTop: "20px",
//               maxWidth: "90%",
//             }}
//           >
//             Full‑Stack Developer & Designer
//           </p>
//         </div>

//         {/* Bottom: URL or signature */}
//         <div
//           style={{
//             fontSize: 28,
//             opacity: 0.5,
//           }}
//         >
//           samirlama.dev
//         </div>
//       </div>
//     ),
//     {
//       width: 1200,
//       height: 630,
//     }
//   );
// }
