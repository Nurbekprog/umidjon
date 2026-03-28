"use client";

import { useGSAP as _useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Thin wrapper around @gsap/react's useGSAP.
 * Provides automatic cleanup via gsap.context() on unmount.
 *
 * Usage:
 *   useGSAP(() => {
 *     gsap.from(".title", { opacity: 0, y: 40, duration: 0.8 });
 *   }, { scope: containerRef });
 */
export const useGSAP = _useGSAP;
export { gsap, ScrollTrigger };
