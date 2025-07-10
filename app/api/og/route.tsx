import { ImageResponse } from "next/og";

// Route segment config - essential for ImageResponse
export const runtime = "edge";

// Image metadata
export const alt = "Samir Lama - Full-Stack Developer & Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const monaspaceArgon = await fetch(
    new URL(
      "../../../public/fonts/MonaspaceArgon-Regular.woff2",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const monaspaceNeon = await fetch(
    new URL(
      "../../../public/fonts/MonaspaceNeon-Regular.woff2",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(to right, #1a202c, #2d3748)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontFamily: "'Monaspace Argon', sans-serif",
          padding: "0 50px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 160,
            fontWeight: "bold",
            marginBottom: -40,
            fontFamily: "'Monaspace Neon', sans-serif",
          }}
        >
          Samir Lama
        </p>
        <p
          style={{
            fontSize: 60,
            opacity: 0.8,
            fontFamily: "'Monaspace Argon', sans-serif",
          }}
        >
          Full-Stack Developer & Designer
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Monaspace Argon",
          data: monaspaceArgon,
          style: "normal",
          weight: 400,
        },
        {
          name: "Monaspace Neon",
          data: monaspaceNeon,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
