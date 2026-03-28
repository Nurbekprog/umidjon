"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/constants";
import { useScrollReveal } from "@/animations/gsap/use-scroll-reveal";
import { SignalLine } from "@/components/ui/signal-line";

type Project = (typeof PROJECTS)[0];

// ── Modal Carousel ──────────────────────────────────────────────────────────

function ImageModal({
  project,
  startIndex,
  onClose,
}: {
  project: Project;
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const total = project.images.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Lock scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(6, 6, 8, 0.96)",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          color: "#f0f0f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        <X size={18} strokeWidth={2} />
      </button>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          top: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "0.6875rem",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em",
        }}
      >
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          aspectRatio: "4 / 3",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Image
          src={project.images[current]}
          alt={`${project.title} — ${current + 1}`}
          fill
          className="object-cover"
          sizes="900px"
          priority
        />
      </motion.div>

      {/* Arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute",
              left: "clamp(0.5rem, 3vw, 2rem)",
              top: "50%",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "#f0f0f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute",
              right: "clamp(0.5rem, 3vw, 2rem)",
              top: "50%",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "#f0f0f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </>
      )}

      {/* Bottom: title + dots */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.625rem",
              color: "var(--signal-primary)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "block",
              textAlign: "center",
              marginBottom: "0.25rem",
            }}
          >
            {project.category}
          </span>
          <p
            style={{
              fontFamily: "var(--font-syne), system-ui",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#f0f0f5",
              margin: 0,
              textAlign: "center",
            }}
          >
            {project.title}
          </p>
        </div>

        {/* Dot indicators */}
        {total > 1 && (
          <div style={{ display: "flex", gap: "6px" }}>
            {project.images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === current ? "var(--signal-primary)" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.25s, background 0.25s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onOpen,
  span,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
  span?: "wide" | "tall" | "normal";
}) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  const gridStyle: React.CSSProperties =
    span === "wide"
      ? { gridColumn: "span 2" }
      : span === "tall"
      ? { gridRow: "span 2" }
      : {};

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: span === "wide" ? "21 / 9" : span === "tall" ? "3 / 4" : "4 / 3",
        background: "var(--void-2)",
        border: hovered ? "1px solid rgba(0, 212, 255, 0.35)" : "1px solid rgba(255,255,255,0.04)",
        boxShadow: hovered
          ? "0 0 40px rgba(0, 212, 255, 0.08), 0 24px 48px rgba(0,0,0,0.5)"
          : "0 8px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        ...gridStyle,
      }}
    >
      {/* Cover image */}
      <Image
        src={project.images[0]}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Always-visible gradient bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(6,6,8,0.85) 0%, rgba(6,6,8,0.1) 50%, transparent 100%)",
          transition: "opacity 0.4s",
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Top-left: number + category */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.625rem",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
          }}
        >
          {num}
        </span>
        <span
          style={{
            padding: "0.2rem 0.625rem",
            borderRadius: "999px",
            background: "rgba(0, 212, 255, 0.12)",
            border: "1px solid rgba(0, 212, 255, 0.25)",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.5625rem",
            color: "var(--signal-primary)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Top-right: image count */}
      {project.images.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "999px",
            background: "rgba(6,6,8,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Images size={10} color="rgba(255,255,255,0.6)" strokeWidth={2} />
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.5625rem",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.06em",
            }}
          >
            {project.images.length}
          </span>
        </div>
      )}

      {/* Bottom info */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.25rem",
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "transform 0.4s ease",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-syne), system-ui",
            fontSize: "clamp(1rem, 2vw, 1.375rem)",
            fontWeight: 700,
            color: "#f0f0f5",
            margin: "0 0 0.375rem",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 0.625rem",
            lineHeight: 1.5,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.375rem",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s",
          }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: "0.2rem 0.5rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.07)",
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "0.5625rem",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.04em",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* View gallery hint */}
        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease 0.05s",
          }}
        >
          <ExternalLink size={11} color="var(--signal-primary)" strokeWidth={2} />
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.625rem",
              color: "var(--signal-primary)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            View Gallery
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ── Main Section ────────────────────────────────────────────────────────────

const SPANS: Array<"wide" | "tall" | "normal"> = [
  "wide", "normal", "normal", "normal", "wide", "normal",
];

export function Projects() {
  const containerRef = useScrollReveal<HTMLElement>({ y: 30, start: "top 85%" });
  const [modal, setModal] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        aria-label="Project portfolio"
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
            02 / Selected Works
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--text-muted)",
            }}
          >
            {PROJECTS.length} projects
          </span>
        </div>

        {/* Creative heading */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-syne), system-ui",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "#f0f0f5",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Creative
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(0, 212, 255, 0.6)",
                WebkitTextFillColor: "transparent",
              }}
            >
              Portfolio
            </span>
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-jetbrains), monospace",
              letterSpacing: "0.04em",
            }}
          >
            Click any project to view the full gallery
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
          className="projects-grid"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setModal}
              span={SPANS[i] ?? "normal"}
            />
          ))}
        </div>

        <SignalLine
          className="absolute bottom-0 left-0 right-0"
          style={{ opacity: 0.3 } as React.CSSProperties}
        />
      </section>

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-grid > * {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <ImageModal
            project={modal}
            startIndex={0}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
