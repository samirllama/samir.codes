import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "edge";
export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Image({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "linear-gradient(135deg, #2563eb 0%, #f59e0b 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontFamily: "Inter",
          }}
        >
          Post Not Found
        </div>
      ),
      { ...size }
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #2563eb 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #f59e0b 2px, transparent 2px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.1,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "900px",
            zIndex: 1,
          }}
        >
          {/* Brand */}
          <div
            style={{
              color: "#2563eb",
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563eb, #f59e0b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              JD
            </div>
            Samir Lama
          </div>

          {/* Title */}
          <h1
            style={{
              color: "#f9fafb",
              fontSize: post.title.length > 50 ? "52px" : "64px",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "20px",
              maxWidth: "100%",
            }}
          >
            {post.title}
          </h1>

          {/* Date */}
          <div
            style={{
              color: "#d1d5db",
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            {formatDate(post.date)}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
