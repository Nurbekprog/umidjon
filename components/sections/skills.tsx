"use client";

import { useRef } from "react";
import { Cpu } from "lucide-react";
import { SKILLS } from "@/data/constants";
import { SKILL_ICON_MAP } from "@/lib/icons";
import { useScrollReveal } from "@/animations/gsap/use-scroll-reveal";
import { SignalLine } from "@/components/ui/signal-line";

const CATEGORY_COLOR: Record<string, string> = {
  Design: "#00d4ff",
  Motion: "#fbbf24",
  Print: "#f472b6",
  "3D": "#a78bfa",
  Strategy: "#7fff8a",
  Digital: "#8b8b9e",
};

// Three rows with different ordering for visual variety
const ROW_1 = [...SKILLS, ...SKILLS];
const ROW_2 = [...[...SKILLS].reverse(), ...[...SKILLS].reverse()];
const ROW_3 = [
  ...SKILLS.slice(6),
  ...SKILLS.slice(0, 6),
  ...SKILLS.slice(6),
  ...SKILLS.slice(0, 6),
];

function SkillCard({ skill }: { skill: (typeof SKILLS)[0] }) {
  const Icon = (skill.icon ? SKILL_ICON_MAP[skill.icon] : undefined) ?? Cpu;
  const color = (skill.category ? CATEGORY_COLOR[skill.category] : undefined) ?? "#8b8b9e";
  const dots = Math.round(skill.level / 20);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.875rem",
        padding: "0.875rem 1.25rem",
        borderRadius: "var(--radius-card)",
        border: `1px solid ${color}20`,
        background: "var(--glass-bg)",
        backdropFilter: "blur(8px)",
        flexShrink: 0,
        minWidth: "210px",
        cursor: "default",
      }}
    >
      {/* Icon circle */}
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: `${color}14`,
          border: `1px solid ${color}28`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={15} color={color} strokeWidth={1.8} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-syne), system-ui",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#f0f0f5",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {skill.name}
        </p>
        {/* Level bars */}
        <div style={{ display: "flex", gap: "2px", marginTop: "0.375rem" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "16px",
                height: "2px",
                borderRadius: "2px",
                background: i < dots ? color : "var(--border-subtle)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Category badge */}
      <span
        style={{
          padding: "0.2rem 0.5rem",
          borderRadius: "999px",
          background: `${color}10`,
          border: `1px solid ${color}22`,
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "0.5rem",
          color: color,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        {skill.category}
      </span>
    </div>
  );
}

function SkillRow({
  skills,
  direction,
  speed,
}: {
  skills: (typeof SKILLS)[0][];
  direction: "left" | "right";
  speed: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        ref={rowRef}
        onMouseEnter={() => {
          if (rowRef.current) rowRef.current.style.animationPlayState = "paused";
        }}
        onMouseLeave={() => {
          if (rowRef.current) rowRef.current.style.animationPlayState = "running";
        }}
        style={{
          display: "flex",
          gap: "0.625rem",
          width: "max-content",
          animation: `skill-marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {skills.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const containerRef = useScrollReveal<HTMLElement>({ y: 30, start: "top 85%" });

  return (
    <section
      id="skills"
      ref={containerRef}
      aria-label="Design skills"
      style={{ padding: "5rem 0", position: "relative", overflow: "hidden" }}
    >
      {/* Section header */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          maxWidth: "1400px",
          margin: "0 auto 2.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            03 / Design Skills
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--text-muted)",
            }}
          >
            {SKILLS.length} tools
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-syne), system-ui",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 800,
            color: "#f0f0f5",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: "0 0 0.75rem",
          }}
        >
          Tools &{" "}
          <span
            style={{
              WebkitTextStroke: "1px rgba(0, 212, 255, 0.6)",
              WebkitTextFillColor: "transparent",
            }}
          >
            Expertise
          </span>
        </h2>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-jetbrains), monospace",
            letterSpacing: "0.04em",
            margin: 0,
          }}
        >
          Hover to pause · Every tool mastered with purpose
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes skill-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes skill-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* Row 1 — scrolls left */}
      <div style={{ marginBottom: "0.625rem" }}>
        <SkillRow skills={ROW_1} direction="left" speed={28} />
      </div>

      {/* Row 2 — scrolls right */}
      <div style={{ marginBottom: "0.625rem" }}>
        <SkillRow skills={ROW_2} direction="right" speed={34} />
      </div>

      {/* Row 3 — scrolls left */}
      <SkillRow skills={ROW_3} direction="left" speed={24} />

      <SignalLine
        className="absolute bottom-0 left-0 right-0"
        style={{ opacity: 0.3 } as React.CSSProperties}
      />
    </section>
  );
}
