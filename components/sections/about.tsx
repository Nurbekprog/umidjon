"use client";

import { GraduationCap, MapPin, Briefcase } from "lucide-react";
import { useScrollReveal } from "@/animations/gsap/use-scroll-reveal";
import { SignalLine } from "@/components/ui/signal-line";

const softSkills = [
  "Creative Thinking",
  "Attention to Detail",
  "Client Communication",
  "Time Management",
  "Visual Storytelling",
];

const education = [
  {
    school: "TUIT",
    detail: "Graphic Design & Visual Communications",
    period: "2024 – 2029",
    status: "In Progress",
    color: "#00d4ff",
  },
  {
    school: "Najot Ta'lim",
    detail: "Graphic Design & Brand Identity",
    period: "2024 – 2025",
    status: "Completed",
    color: "#fbbf24",
  },
  {
    school: "Self-taught",
    detail: "Figma, brand identity, motion graphics & UI/UX",
    period: "2023 – 2024",
    status: "Completed",
    color: "#8b8b9e",
  },
];

export function About() {
  const containerRef = useScrollReveal<HTMLElement>({ y: 30, start: "top 85%" });

  return (
    <section
      id="about"
      ref={containerRef}
      aria-label="About me"
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
          01 / About
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}
        className="lg:grid-cols-[1fr_320px]"
      >
        {/* Left: bio + education */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {/* Bio */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-syne), system-ui",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#f0f0f5",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: "0 0 1rem",
              }}
            >
              Visual-first
              <br />
              <span style={{ color: "var(--signal-primary)" }}>Graphic</span> Designer
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: 0,
              }}
            >
              Based in Tashkent, Uzbekistan. Crafting bold visual identities, UI/UX designs,
              and motion graphics for brands and digital products. 1 year of hands-on
              experience turning ideas into compelling visuals.
            </p>
          </div>

          {/* Education */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <GraduationCap size={14} color="var(--text-muted)" strokeWidth={1.8} />
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-jetbrains), monospace",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Education
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {education.map((e, i) => (
                <div key={e.school} style={{ display: "flex", gap: "1rem", paddingBottom: "1.25rem" }}>
                  {/* Timeline line + dot */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                      paddingTop: "3px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: e.color,
                        boxShadow: `0 0 8px ${e.color}66`,
                        flexShrink: 0,
                      }}
                    />
                    {i < education.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          flex: 1,
                          minHeight: "24px",
                          background: "var(--border-subtle)",
                          marginTop: "4px",
                        }}
                      />
                    )}
                  </div>

                  <div style={{ flex: 1, paddingTop: "0" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-syne), system-ui",
                          fontSize: "0.9375rem",
                          fontWeight: 700,
                          color: "#f0f0f5",
                        }}
                      >
                        {e.school}
                      </span>
                      <span
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "var(--font-jetbrains), monospace",
                          color: "var(--text-muted)",
                          flexShrink: 0,
                        }}
                      >
                        {e.period}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)",
                        margin: "0.2rem 0 0",
                        lineHeight: 1.5,
                      }}
                    >
                      {e.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: status cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Location */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
            }}
          >
            <MapPin size={16} color="var(--signal-secondary)" strokeWidth={1.8} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontSize: "0.6875rem", color: "var(--text-muted)", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.06em" }}>
                Based in
              </p>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.875rem", color: "#f0f0f5", fontWeight: 600 }}>
                Tashkent, Uzbekistan
              </p>
            </div>
          </div>

          {/* Open to work */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "var(--radius-card)",
              border: "1px solid rgba(127, 255, 138, 0.2)",
              background: "rgba(127, 255, 138, 0.05)",
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#7fff8a",
                animation: "pulse 2s infinite",
                flexShrink: 0,
              }}
            />
            <div>
              <p style={{ margin: 0, fontSize: "0.6875rem", color: "rgba(127,255,138,0.7)", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.06em" }}>
                Status
              </p>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.875rem", color: "#7fff8a", fontWeight: 600 }}>
                Available for Work
              </p>
            </div>
          </div>

          {/* Work type */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
            }}
          >
            <Briefcase size={16} color="var(--text-muted)" strokeWidth={1.8} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontSize: "0.6875rem", color: "var(--text-muted)", fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.06em" }}>
                Preferred
              </p>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                Remote · Freelance · Full-time
              </p>
            </div>
          </div>

          {/* Soft skills */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
            }}
          >
            <p
              style={{
                margin: "0 0 0.875rem",
                fontSize: "0.6875rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-jetbrains), monospace",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Soft Skills
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {softSkills.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "0.25rem 0.625rem",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid rgba(0, 212, 255, 0.15)",
                    background: "rgba(0, 212, 255, 0.06)",
                    fontSize: "0.6875rem",
                    fontFamily: "var(--font-jetbrains), monospace",
                    color: "var(--signal-primary)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SignalLine className="absolute bottom-0 left-0 right-0" style={{ opacity: 0.3 } as React.CSSProperties} />
    </section>
  );
}
