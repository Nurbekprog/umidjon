"use client";

import React from "react";

interface SignalLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  animated?: boolean;
  style?: React.CSSProperties;
}

/** Decorative SVG accent line — "Signal Graphics" aesthetic */
export function SignalLine({ orientation = "horizontal", className = "", animated = false, style }: SignalLineProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={`w-px bg-gradient-to-b from-transparent via-[var(--border-signal)] to-transparent ${className}`}
        style={style}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-[var(--border-signal)] to-transparent ${
        animated ? "animate-pulse" : ""
      } ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
