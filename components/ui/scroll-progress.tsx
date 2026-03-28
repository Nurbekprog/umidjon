"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SECTIONS = [
  { id: "home",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "social",     label: "Social" },
  { id: "contact",    label: "Contact" },
];

/**
 * Signal Trace — a creative fixed-right scroll progress indicator.
 * A 1px vertical line with a glowing dot that travels down as you scroll.
 * Section ticks light up as their section enters view.
 * Desktop-only (hidden below lg).
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      if (dotRef.current)  dotRef.current.style.top  = `${progress * 100}%`;
      if (fillRef.current) fillRef.current.style.height = `${progress * 100}%`;

      // Active section detection
      let current = "home";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= window.innerHeight * 0.5) current = s.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  if (!isMounted || reduced) return null;

  return (
    <div
      className="hidden lg:flex"
      style={{
        position: "fixed",
        right: "1.75rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        height: "240px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Track */}
      <div
        style={{
          position: "relative",
          width: "1px",
          height: "100%",
          background: "var(--border-subtle)",
        }}
      >
        {/* Fill */}
        <div
          ref={fillRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "0%",
            background: "linear-gradient(to bottom, var(--signal-primary), rgba(0,212,255,0.3))",
            transition: "height 0.1s linear",
          }}
        />

        {/* Section ticks */}
        {SECTIONS.map((s, i) => {
          const topPct = (i / (SECTIONS.length - 1)) * 100;
          const isActive = s.id === active;
          return (
            <div
              key={s.id}
              style={{
                position: "absolute",
                left: "50%",
                top: `${topPct}%`,
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {/* Tick dot */}
              <div
                style={{
                  width: isActive ? "5px" : "3px",
                  height: isActive ? "5px" : "3px",
                  borderRadius: "50%",
                  background: isActive ? "var(--signal-primary)" : "var(--border-subtle)",
                  boxShadow: isActive ? "0 0 6px var(--signal-primary)" : "none",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
              />
              {/* Label — appears on hover */}
              <span
                style={{
                  fontSize: "0.5625rem",
                  fontFamily: "var(--font-jetbrains), monospace",
                  color: isActive ? "var(--signal-primary)" : "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateX(0)" : "translateX(4px)",
                  transition: "opacity 0.25s ease, transform 0.25s ease",
                  pointerEvents: "none",
                  cursor: "default",
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}

        {/* Glowing travel dot */}
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "0%",
            transform: "translate(-50%, -50%)",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "var(--signal-primary)",
            boxShadow: "0 0 10px 2px rgba(0, 212, 255, 0.5)",
            transition: "top 0.1s linear",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}
