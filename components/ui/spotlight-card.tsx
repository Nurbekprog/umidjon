"use client";

import React, { useRef, useCallback } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Accent color for the spotlight (defaults to signal-primary cyan) */
  accentRgb?: string;
}

/**
 * Glassmorphism 2.0 — card with a mouse-tracked radial gradient border glow.
 * The border "lights up" under the cursor using CSS custom properties.
 *
 * Uses the CSS `background: ... padding-box, ... border-box` trick for
 * a gradient border that follows the mouse without repaints.
 */
export function SpotlightCard({
  children,
  className = "",
  style,
  accentRgb = "0, 212, 255",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  }, []);

  const onEnter = useCallback(() => {
    ref.current?.style.setProperty("--spot-opacity", "1");
  }, []);

  const onLeave = useCallback(() => {
    ref.current?.style.setProperty("--spot-opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      style={
        {
          "--accent-rgb": accentRgb,
          "--sx": "50%",
          "--sy": "50%",
          "--spot-opacity": "0",
          ...style,
        } as React.CSSProperties
      }
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Inner glow layer */}
      <div className="spotlight-card__glow" aria-hidden />
      {children}
    </div>
  );
}
