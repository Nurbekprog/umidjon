"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "./gsap-init";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Initialises Lenis smooth scroll and syncs it with GSAP ScrollTrigger.
 * Call once at the top-level client component.
 */
export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;

    let lenis: import("lenis").default | null = null;
    let rafId: number;
    let destroyed = false;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;

      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

      function raf(time: number) {
        if (destroyed) return;
        lenis?.raf(time);
        ScrollTrigger.update();
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [reduced]);
}
