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
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#0b0b14",
        border: hovered
          ? "1px solid rgba(0,212,255,0.28)"
          : "1px solid rgba(255,255,255,0.05)",
        boxShadow: hovered
          ? "0 0 40px rgba(0,212,255,0.08), 0 20px 40px rgba(0,0,0,0.55)"
          : "0 4px 20px rgba(0,0,0,0.32)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Image area — aspect-ratio based, always fills equally ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          background: "#0e0e1a",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Cover image */}
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />

        {/* Idle gradient — fades bottom for title legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 45%, rgba(8,8,16,0.72) 100%)",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.35s ease",
            pointerEvents: "none",
          }}
        />

        {/* Hover overlay — dark scrim + content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(4,4,14,0.88)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "1.375rem",
            gap: "0.8rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.87)",
              lineHeight: 1.65,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  padding: "0.2rem 0.5rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(0,212,255,0.22)",
                  background: "rgba(0,212,255,0.08)",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "0.5rem",
                  color: "var(--signal-primary)",
                  letterSpacing: "0.05em",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              marginTop: "0.15rem",
            }}
          >
            <ExternalLink size={10} color="var(--signal-primary)" strokeWidth={2} />
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "0.5625rem",
                color: "var(--signal-primary)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Open Gallery
            </span>
          </div>
        </div>

        {/* Top-left: index + category — always on top */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.5625rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            {num}
          </span>
          <span
            style={{
              padding: "0.175rem 0.5rem",
              borderRadius: "999px",
              background: "rgba(0,212,255,0.14)",
              border: "1px solid rgba(0,212,255,0.22)",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.5rem",
              color: "var(--signal-primary)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backdropFilter: "blur(4px)",
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
              top: "0.75rem",
              right: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.2rem 0.45rem",
              borderRadius: "999px",
              background: "rgba(6,6,10,0.78)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              zIndex: 3,
            }}
          >
            <Images size={9} color="rgba(255,255,255,0.55)" strokeWidth={2} />
            <span
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "0.5rem",
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.06em",
              }}
            >
              {project.images.length}
            </span>
          </div>
        )}
      </div>

      {/* ── Info bar — always visible ─────────────── */}
      <div
        style={{
          padding: "0.8rem 1rem",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          background: hovered ? "rgba(0,212,255,0.03)" : "transparent",
          transition: "background 0.35s",
          flexShrink: 0,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-syne), system-ui",
            fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
            fontWeight: 700,
            color: "#f0f0f5",
            margin: 0,
            lineHeight: 1.2,
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.title}
        </h3>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.2, x: hovered ? 0 : -3 }}
          transition={{ duration: 0.28 }}
          style={{ flexShrink: 0 }}
        >
          <ExternalLink size={12} color="var(--signal-primary)" strokeWidth={2} />
        </motion.div>
      </div>
    </motion.article>
  );
}

// ── Main Section ────────────────────────────────────────────────────────────

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

        {/* Heading */}
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
                WebkitTextStroke: "1px rgba(0,212,255,0.6)",
                WebkitTextFillColor: "transparent",
              }}
            >
              Portfolio
            </span>
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-jetbrains), monospace",
              letterSpacing: "0.04em",
            }}
          >
            Click any project to open the gallery
          </p>
        </div>

        {/* ── Grid: 3-col desktop, 2-col tablet, 1-col mobile ── */}
        <div className="proj-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setModal}
            />
          ))}
        </div>

        <SignalLine
          className="absolute bottom-0 left-0 right-0"
          style={{ opacity: 0.3 } as React.CSSProperties}
        />
      </section>

      <style>{`
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.875rem;
        }
        @media (max-width: 1024px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .proj-grid { grid-template-columns: 1fr; gap: 0.75rem; }
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
