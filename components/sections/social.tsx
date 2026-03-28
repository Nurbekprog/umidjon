"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/animations/gsap/use-scroll-reveal";
import { SignalLine } from "@/components/ui/signal-line";

const BLOG_IMAGES = [
  "/blog/img1.jpeg",
  "/blog/img2.jpeg",
  "/blog/img3.jpeg",
  "/blog/img4.jpeg",
  "/blog/img5.jpeg",
  "/blog/img6.jpeg",
  "/blog/img7.jpeg",
];

const ROW_1 = [...BLOG_IMAGES, ...BLOG_IMAGES];
const ROW_2 = [...BLOG_IMAGES].reverse().concat([...BLOG_IMAGES].reverse());

function ImageCard({ src, index }: { src: string; index: number }) {
  return (
    <div
      style={{
        position: "relative",
        width: "clamp(200px, 22vw, 320px)",
        height: "clamp(140px, 16vw, 220px)",
        borderRadius: "12px",
        overflow: "hidden",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "var(--void-2)",
      }}
    >
      <Image
        src={src}
        alt={`Visual work ${(index % 7) + 1}`}
        fill
        className="object-cover"
        sizes="320px"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function MarqueeRow({
  images,
  direction,
  speed,
}: {
  images: string[];
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
          gap: "0.75rem",
          width: "max-content",
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {images.map((src, i) => (
          <ImageCard key={`${src}-${i}`} src={src} index={i} />
        ))}
      </div>
    </div>
  );
}

export function Social() {
  const containerRef = useScrollReveal<HTMLElement>({ y: 30, start: "top 85%" });

  return (
    <section
      ref={containerRef}
      aria-label="Visual diary"
      style={{ padding: "5rem 0", position: "relative", overflow: "hidden" }}
    >
      {/* Section label + heading */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          maxWidth: "1400px",
          margin: "0 auto 2.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            05 / Visual Diary
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--text-muted)",
            }}
          >
            {BLOG_IMAGES.length} moments
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
          Behind the{" "}
          <span
            style={{
              WebkitTextStroke: "1px rgba(0, 212, 255, 0.6)",
              WebkitTextFillColor: "transparent",
            }}
          >
            Scenes
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
          A glimpse into the creative process
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* Row 1 — left */}
      <div style={{ marginBottom: "0.75rem" }}>
        <MarqueeRow images={ROW_1} direction="left" speed={28} />
      </div>

      {/* Row 2 — right */}
      <MarqueeRow images={ROW_2} direction="right" speed={34} />

      <SignalLine
        className="absolute bottom-0 left-0 right-0"
        style={{ opacity: 0.3 } as React.CSSProperties}
      />
    </section>
  );
}
