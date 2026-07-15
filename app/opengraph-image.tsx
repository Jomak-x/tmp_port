import { ImageResponse } from "next/og";

export const alt = "Jakob Laise - Software Engineer and UCF Computer Science Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 84px",
          color: "white",
          background:
            "radial-gradient(circle at 82% 18%, rgba(251,146,60,.34), transparent 30%), linear-gradient(135deg, #09090b 0%, #1c1917 55%, #431407 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#fdba74",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Software Engineering Portfolio
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 82, fontWeight: 800 }}>
          Jakob Laise
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            maxWidth: 970,
            fontSize: 32,
            lineHeight: 1.35,
            color: "rgba(255,255,255,.78)",
          }}
        >
          Twilio Intern · Databricks Student Fellow · Google x BASTA Fellow · UCF Computer Science
        </div>
        <div style={{ display: "flex", marginTop: 52, gap: 18, fontSize: 24, color: "#fed7aa" }}>
          Full-stack systems <span>·</span> AI & data <span>·</span> Developer advocacy
        </div>
      </div>
    ),
    size,
  );
}
