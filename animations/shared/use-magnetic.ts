"use client";

import { useRef, useCallback } from "react";
import { gsap } from "../gsap/gsap-init";

/**
 * Magnetic hover effect.
 * Attach `ref` to the element and spread `handlers` on it.
 * strength: 0 = no pull, 1 = full cursor offset
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  return { ref, handlers: { onMouseMove, onMouseLeave } };
}
