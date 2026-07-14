// app/work/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import React from "react";
import { getWorkSummaryBySlug } from "@/lib/work.server";
import { WORK_STATUS_LABELS, WorkStatus } from "@/types/work";

export const runtime = "nodejs";

export const alt = "Case study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const STATUS_COLORS: Record<WorkStatus, string> = {
  live: "#4ade80",
  production: "#f97316",
  proprietary: "#9aa4b2",
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const study = getWorkSummaryBySlug(slug);

  if (!study) {
    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "#0e1116",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f0f3f8",
        }}
      >
        Case study not found
      </div>,
      { ...size },
    );
  }

  const summary = study.summary.length > 160 ? `${study.summary.slice(0, 157)}...` : study.summary;

  return new ImageResponse(
    <div
      style={{
        background: "#0e1116",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(240,243,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,243,248,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-220px",
          left: "-160px",
          width: "640px",
          height: "640px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0) 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", color: "#9aa4b2", fontSize: 28 }}>samir.codes</div>
        <div
          style={{
            display: "flex",
            color: "#f97316",
            border: "2px solid rgba(249,115,22,0.55)",
            borderRadius: 999,
            padding: "8px 24px",
            fontSize: 22,
            letterSpacing: "0.14em",
          }}
        >
          CASE STUDY
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 980 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {study.status.map((s) => (
            <React.Fragment key={s}>
              <div
                style={{
                  display: "flex",
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: STATUS_COLORS[s],
                }}
              />
              <div
                key={s}
                style={{
                  display: "flex",
                  color: STATUS_COLORS[s],
                  fontSize: 24,
                  letterSpacing: "0.12em",
                }}
              >
                {WORK_STATUS_LABELS[s]?.toUpperCase() || s?.toUpperCase()}
              </div>
            </React.Fragment>
          ))}

          {study.timeline ? (
            <div style={{ display: "flex", color: "#9aa4b2", fontSize: 24 }}>
              · {study.timeline}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            color: "#f0f3f8",
            fontSize: study.title.length > 56 ? 52 : 60,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {study.title}
        </div>
        <div
          style={{
            display: "flex",
            color: "#9aa4b2",
            fontSize: 26,
            lineHeight: 1.45,
          }}
        >
          {summary}
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {study.stack.slice(0, 5).map((tech) => (
          <div
            key={tech}
            style={{
              display: "flex",
              color: "#c6cdd8",
              border: "1px solid rgba(240,243,248,0.18)",
              borderRadius: 10,
              padding: "8px 18px",
              fontSize: 21,
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
