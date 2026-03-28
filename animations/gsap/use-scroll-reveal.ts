"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap-init";

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  childSelector?: string;
}

/**
 * Generic scroll-triggered reveal.
 * If childSelector is provided, animates matching children with stagger.
 * Otherwise animates the container itself.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(options: ScrollRevealOptions = {}) {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 0.7,
    delay = 0,
    stagger = 0.1,
    ease = "power3.out",
    start = "top 82%",
    childSelector,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = childSelector
        ? el.querySelectorAll<HTMLElement>(childSelector)
        : [el];

      gsap.set(targets, { y, x, opacity });

      ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () => {
          gsap.to(targets, {
            y: 0,
            x: 0,
            opacity: 1,
            duration,
            delay,
            stagger,
            ease,
            overwrite: true,
          });
        },
        once: true,
      });
    }, el);

    return () => ctx.revert();
  }, [y, x, opacity, duration, delay, stagger, ease, start, childSelector]);

  return ref as React.RefObject<T>;
}
