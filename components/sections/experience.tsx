"use client";

import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/animations/gsap/use-scroll-reveal";
import { SignalLine } from "@/components/ui/signal-line";

const jobs = [
  {
    role: "Graphic Designer",
    company: "Freelance",
    period: "2025 – Present",
    link: "https://www.behance.net/khaydarov_off",
    status: "Active",
    highlights: [
      "Brand identity systems for 10+ local and international clients",
      "Logo design, color palettes, typography, and brand guidelines",
      "Social media kits — 12+ templates per project, 3 color themes",
      "UI/UX design for mobile apps using Figma with interactive prototypes",
      "Motion graphics and kinetic typography for product launches",
      "Poster series and print design for events and campaigns",
    ],
    stack: ["Figma", "Illustrator", "Photoshop", "After Effects", "InDesign"],
    accent: "#00d4ff",
    accentBg: "rgba(0, 212, 255, 0.06)",
    accentBorder: "rgba(0, 212, 255, 0.15)",
  },
  {
    role: "Visual Designer",
    company: "Personal Projects",
    period: "2024",
    link: "https://www.behance.net/khaydarov_off",
    status: "Shipped",
    highlights: [
      "Dark mode design system — glass layers, deep tones, sharp contrast",
      "3D product visualizations and abstract art with Blender",
      "Typography-driven poster series with bold layout composition",
      "Color theory studies — strategic palette creation for brands",
    ],
    stack: ["Photoshop", "Blender", "Illustrator", "Figma"],
    accent: "#7fff8a",
    accentBg: "rgba(127, 255, 138, 0.05)",
    accentBorder: "rgba(127, 255, 138, 0.15)",
  },
];

export function Experience() {
  const containerRef = useScrollReveal<HTMLElement>({ y: 30, start: "top 85%" });

  return (
    <section
      id="experience"
      ref={containerRef}
      aria-label="Work experience"
      style={{
        padding: "5rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
        <span
          style={{
            fontSize: "0.6875rem",
            fontFamily: "var(--font-jetbrains), monospace",
            color: "var(--text-muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          04 / Experience
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
        <span
          style={{
            fontSize: "0.6875rem",
            fontFamily: "var(--font-jetbrains), monospace",
            color: "var(--text-muted)",
          }}
        >
          {jobs.length} roles
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
        }}
        className="lg:grid-cols-2"
      >
        {jobs.map((job) => (
          <article
            key={job.company}
            style={{
              padding: "1.75rem",
              borderRadius: "var(--radius-card)",
              border: `1px solid ${job.accentBorder}`,
              background: job.accentBg,
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background: `linear-gradient(to right, ${job.accent}, transparent)`,
              }}
            />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-syne), system-ui",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#f0f0f5",
                    margin: "0 0 0.375rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {job.role}
                </h3>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.8125rem",
                    color: job.accent,
                    textDecoration: "none",
                    fontFamily: "var(--font-syne), system-ui",
                    fontWeight: 600,
                  }}
                >
                  {job.company} <ExternalLink size={11} />
                </a>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.375rem", flexShrink: 0 }}>
                <span
                  style={{
                    padding: "0.2rem 0.625rem",
                    borderRadius: "var(--radius-pill)",
                    border: `1px solid ${job.accentBorder}`,
                    fontSize: "0.6875rem",
                    fontFamily: "var(--font-jetbrains), monospace",
                    color: job.accent,
                  }}
                >
                  {job.period}
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontFamily: "var(--font-jetbrains), monospace",
                    color: "var(--text-muted)",
                  }}
                >
                  {job.status}
                </span>
              </div>
            </div>

            {/* Bullets */}
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {job.highlights.map((h) => (
                <li
                  key={h}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.625rem",
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      color: job.accent,
                      fontSize: "0.625rem",
                      flexShrink: 0,
                      marginTop: "2px",
                      opacity: 0.7,
                    }}
                  >
                    ▸
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            {/* Stack chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "auto" }}>
              {job.stack.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "0.2rem 0.5rem",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--glass-border)",
                    background: "var(--glass-bg)",
                    fontSize: "0.625rem",
                    fontFamily: "var(--font-jetbrains), monospace",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <SignalLine className="absolute bottom-0 left-0 right-0" style={{ opacity: 0.3 } as React.CSSProperties} />
    </section>
  );
}
