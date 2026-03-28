"use client";

import { useParticleBg } from "@/animations/anime/use-particle-bg";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ParticleCanvas() {
  const reduced = useReducedMotion();
  const canvasRef = useParticleBg({
    color: "#00d4ff",
    lineColor: "rgba(0, 212, 255, 0.10)",
    connectionRadius: 130,
    speed: 0.3,
  });

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
}
