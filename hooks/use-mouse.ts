"use client";

import { useEffect, useRef } from "react";

interface MousePosition {
  /** Raw pixel coords */
  x: number;
  y: number;
  /** Normalized -1 to 1 (Three.js / shader uniforms) */
  nx: number;
  ny: number;
}

/**
 * Returns a ref holding the current mouse position.
 * Uses a ref (not state) to avoid re-renders on every mouse move.
 *
 * Usage:
 *   const mouse = useMouse();
 *   // Read mouse.current.nx inside useFrame / requestAnimationFrame
 */
export function useMouse() {
  const ref = useRef<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ref.current = {
        x: e.clientX,
        y: e.clientY,
        nx:  (e.clientX / window.innerWidth)  * 2 - 1,
        ny: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return ref;
}
