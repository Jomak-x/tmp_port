import { ImageResponse } from "next/og";

const size = { width: 1200, height: 630 };

function clean(value: string | null, fallback: string, limit: number) {
  return (value || fallback).replace(/\s+/g, " ").trim().slice(0, limit);
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = clean(searchParams.get("title"), "Jakob Laise", 92);
  const description = clean(
    searchParams.get("description"),
    "Software engineer and UCF computer science student.",
    190,
  );
  const label = clean(
    searchParams.get("label"),
    "Software Engineering Portfolio",
    48,
  );
  const titleSize = title.length > 68 ? 58 : title.length > 48 ? 68 : 82;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          color: "#f7f2e8",
          background:
            "radial-gradient(circle at 82% 15%, rgba(249,115,22,.4), transparent 30%), radial-gradient(circle at 10% 90%, rgba(56,189,248,.18), transparent 34%), linear-gradient(135deg, #09090b 0%, #18181b 55%, #3b1608 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#fb923c",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 1040,
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 980,
              color: "rgba(247,242,232,.72)",
              fontSize: 27,
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,.2)",
            paddingTop: 24,
            color: "rgba(247,242,232,.72)",
            fontSize: 22,
          }}
        >
          <span>Jakob Laise</span>
          <span style={{ color: "#fdba74" }}>jlaise.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=604800, stale-while-revalidate=2592000",
      },
    },
  );
}
