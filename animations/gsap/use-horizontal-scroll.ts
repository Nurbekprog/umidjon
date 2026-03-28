"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap-init";

/**
 * GSAP ScrollTrigger horizontal scroll.
 * - outerRef:  the 400vh tall wrapper div
 * - stickyRef: the 100vh sticky container
 * - trackRef:  the 400vw flex track that moves
 * Returns refs to attach to the three divs.
 */
export function useHorizontalScroll(cardCount = 4) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!outer || !sticky || !track) return;

    // Disable on mobile
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const totalWidth = (cardCount - 1) * 100; // in vw units

      const st = ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: `+=${cardCount * 100}%`,
        pin: sticky,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const x = -(self.progress * totalWidth);
          gsap.set(track, { x: `${x}vw` });
        },
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, [cardCount]);

  return { outerRef, stickyRef, trackRef };
}
