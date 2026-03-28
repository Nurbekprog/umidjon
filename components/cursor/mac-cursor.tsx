"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/gsap/gsap-init";
import { useCursor } from "./cursor-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { CursorVariant } from "./cursor-types";

const SVG_MAP: Record<CursorVariant, string> = {
  arrow:      "/Cursors/Cursor/Arrow.svg",
  pointer:    "/Cursors/Cursor/Pointer.svg",
  grab:       "/Cursors/Cursor/Grab.svg",
  grabbed:    "/Cursors/Cursor/Grabbed.svg",
  text:       "/Cursors/Cursor/Text.svg",
  "zoom-in":  "/Cursors/Cursor/ZoomIn.svg",
  "zoom-out": "/Cursors/Cursor/ZoomOut.svg",
  move:       "/Cursors/Cursor/Move.svg",
  help:       "/Cursors/Cursor/Help.svg",
};

const SVG_SRCS = Object.values(SVG_MAP) as string[];

export function MacCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const svgRef   = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const { variant, setCursor } = useCursor();
  const reduced = useReducedMotion();

  // Keep setCursor stable in a ref — avoids re-registering the mousemove
  // listener on every cursor variant change (was causing GSAP quickTo reset)
  const setCursorRef = useRef(setCursor);
  useEffect(() => { setCursorRef.current = setCursor; }, [setCursor]);

  // Only render on fine-pointer (mouse) devices — no custom cursor on touch
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setShow(true);
  }, []);

  // ── GSAP quickTo position tracking ─────────────────────────────────────
  // Deps: only [show, reduced] — intentionally excludes variant/setCursor
  // so the quickTo instances and the event listener are never torn down on
  // variant changes. setCursor is accessed via ref instead.
  useEffect(() => {
    if (!show || reduced) return;

    const dot   = dotRef.current;
    const svg   = svgRef.current;
    const trail = trailRef.current;
    if (!dot || !svg || !trail) return;

    // Fixed-speed quickTo — variant-dependent speed caused needless re-runs
    const dotX   = gsap.quickTo(dot,   "x", { duration: 0.06, ease: "none" });
    const dotY   = gsap.quickTo(dot,   "y", { duration: 0.06, ease: "none" });
    const svgX   = gsap.quickTo(svg,   "x", { duration: 0.08, ease: "none" });
    const svgY   = gsap.quickTo(svg,   "y", { duration: 0.08, ease: "none" });
    const trailX = gsap.quickTo(trail, "x", { duration: 0.30, ease: "power2.out" });
    const trailY = gsap.quickTo(trail, "y", { duration: 0.30, ease: "power2.out" });

    gsap.set(dot,   { xPercent: -50, yPercent: -50 });
    gsap.set(trail, { xPercent: -50, yPercent: -50 });
    gsap.set([dot, svg, trail], { x: -300, y: -300 });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      svgX(e.clientX - 4);
      svgY(e.clientY - 2);
      trailX(e.clientX);
      trailY(e.clientY);

      // data-cursor attribute auto-detection
      const target = e.target as Element;
      const attr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (attr && attr in SVG_MAP) {
        setCursorRef.current(attr as CursorVariant);
      } else if (!attr) {
        setCursorRef.current("arrow");
      }
    };

    const onLeave = () => gsap.to([dot, svg, trail], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot, trail],      { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [show, reduced]); // ← NO variant or setCursor here

  // ── SVG morph when variant changes ─────────────────────────────────────
  useEffect(() => {
    if (!show || reduced) return;
    const svg = svgRef.current;
    const dot = dotRef.current;
    if (!svg || !dot) return;

    const nextSrc = SVG_MAP[variant];

    if (!svg.src.endsWith(nextSrc)) {
      gsap.to(svg, {
        scale: 0.6,
        opacity: 0,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          svg.src = nextSrc;
          gsap.fromTo(
            svg,
            { scale: 1.25, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.18, ease: "back.out(1.7)" }
          );
        },
      });
    }

    const hideDot = variant === "text" || variant === "zoom-in" || variant === "zoom-out";
    gsap.to(dot, hideDot
      ? { opacity: 0, scale: 0.3, duration: 0.15 }
      : { opacity: 1, scale: 1,   duration: 0.18 }
    );
  }, [variant, show, reduced]);

  if (!show) return null;

  return (
    <>
      {/* Preload all SVGs into browser cache on mount */}
      <div aria-hidden className="hidden">
        {SVG_SRCS.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" />
        ))}
      </div>

      {/* Core dot — mix-blend-mode: difference */}
      <div ref={dotRef} className="cursor-dot" aria-hidden />

      {/* SVG cursor */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={svgRef}
        src={SVG_MAP.arrow}
        alt=""
        aria-hidden
        draggable={false}
        className="cursor-svg"
      />

      <div ref={trailRef} className="cursor-trail" aria-hidden />
    </>
  );
}
