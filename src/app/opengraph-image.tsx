import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aryan Mehta — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#e2e8f0",
          fontFamily: "ui-monospace, Menlo, monospace",
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#ff5f57",
            }}
          />
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#ffbd2e",
            }}
          />
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#28c840",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ color: "#6b7280", fontSize: 32 }}>
            visitor@aryan.me:~$
          </div>
          <div
            style={{
              color: "#00ff9f",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Aryan Mehta
          </div>
          <div style={{ color: "#d1d5db", fontSize: 36 }}>
            Software Engineer · B.Sc. Honours @ USask
          </div>
          <div style={{ color: "#6b7280", fontSize: 26 }}>
            Backend · Integrations · OS internals · Full-stack
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280", fontSize: 22 }}>
          <span>github.com/aryan-mht</span>
          <span>aryanmht9@gmail.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
