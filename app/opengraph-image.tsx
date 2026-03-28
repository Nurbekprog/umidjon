import { ImageResponse } from "next/og";
import {
  AUTHOR_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/data/constants";

export const runtime = "edge";
export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const domain = SITE_URL.replace("https://", "");

  return new ImageResponse(
    <div
      style={{
        background: "#0c0c10",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(0,212,255,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Signal accent line — top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(to right, transparent, #00d4ff, transparent)",
        }}
      />

      {/* Signal accent line — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(0,212,255,0.4), transparent)",
        }}
      />

      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Available badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 16px",
          borderRadius: "999px",
          border: "1px solid rgba(127,255,138,0.3)",
          background: "rgba(127,255,138,0.08)",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#7fff8a",
          }}
        />
        <span
          style={{
            fontSize: "13px",
            color: "#7fff8a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          AVAILABLE FOR WORK
        </span>
      </div>

      {/* Author name */}
      <div
        style={{
          fontSize: "78px",
          fontWeight: 800,
          color: "#f0f0f5",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          marginBottom: "16px",
        }}
      >
        {AUTHOR_NAME}
      </div>

      {/* Role */}
      <div
        style={{
          fontSize: "22px",
          color: "#00d4ff",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: "28px",
        }}
      >
        GRAPHIC DESIGNER · VISUAL ARTIST
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: "18px",
          color: "#6b6b80",
          lineHeight: 1.6,
          maxWidth: "680px",
        }}
      >
        {SITE_DESCRIPTION}
      </div>

      {/* Domain tag */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          right: "80px",
          fontSize: "13px",
          fontFamily: "monospace",
          color: "#3a3a4c",
          letterSpacing: "0.06em",
        }}
      >
        {domain}
      </div>
    </div>,
    { ...size },
  );
}
