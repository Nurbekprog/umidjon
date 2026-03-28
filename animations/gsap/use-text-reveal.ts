"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap-init";

interface TextRevealOptions {
  trigger?: "mount" | "scroll";
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
}

/**
 * Attaches a GSAP char-by-char reveal animation.
 * Targets `.char-inner` spans inside the container ref.
 * Works with the <SplitChars> component that wraps each char.
 */
export function useTextReveal(options: TextRevealOptions = {}) {
  const {
    trigger = "mount",
    delay = 0,
    stagger = 0.035,
    duration = 0.7,
    y = 80,
  } = options;

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>(".char-inner");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.set(chars, { y, opacity: 0 });

      const animate = () => {
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          overwrite: true,
        });
      };

      if (trigger === "mount") {
        animate();
      } else {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: animate,
          once: true,
        });
      }
    }, el);

    return () => ctx.revert();
  }, [trigger, delay, stagger, duration, y]);

  return ref;
}
