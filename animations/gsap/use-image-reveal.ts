"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap-init";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Attaches a GSAP ScrollTrigger image-reveal to every <img> inside the ref element.
 * Images start: grayscale(0.85) blur(3px) scale(1.05) opacity(0.5)
 * On scroll entry: grayscale(0) blur(0px) scale(1) opacity(1)
 * GPU hint: scale/opacity are composited; filter is one-shot (no loop).
 */
export function useImageReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    const container = ref.current;
    if (!container) return;

    const imgs = Array.from(container.querySelectorAll<HTMLElement>("img, [data-reveal-img]"));
    if (!imgs.length) return;

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    imgs.forEach((img) => {
      gsap.set(img, {
        filter: "grayscale(0.85) blur(3px)",
        scale: 1.05,
        opacity: 0.4,
        willChange: "transform, opacity",
      });

      const st = ScrollTrigger.create({
        trigger: img,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(img, {
            filter: "grayscale(0) blur(0px)",
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power2.out",
            onComplete: () => {
              // Release will-change after animation to free compositor memory
              gsap.set(img, { clearProps: "willChange,filter" });
            },
          });
        },
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(imgs);
    };
  }, [reduced]);

  return ref;
}
