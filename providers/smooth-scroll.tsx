"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;

    let lenis: import("lenis").default | null = null;
    let rafId: number;
    let destroyed = false;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;

      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

      lenis.on("scroll", ScrollTrigger.update);

      function raf(time: number) {
        if (destroyed) return;
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && lenis) {
            lenis.scrollTo(value as number, { immediate: true });
          }
          return window.scrollY;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });

      ScrollTrigger.addEventListener("refresh", () => lenis?.resize());
      ScrollTrigger.refresh();
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
