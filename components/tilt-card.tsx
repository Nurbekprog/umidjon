"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  glowStrength?: number;
}

export function TiltCard({
  children,
  className = "",
  style,
  intensity = 8,
  glowStrength = 0.18,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const springCfg = { stiffness: 220, damping: 26, mass: 0.4 };
  const rotX = useSpring(useTransform(my, [0, 1], [intensity,  -intensity]), springCfg);
  const rotY = useSpring(useTransform(mx, [0, 1], [-intensity,  intensity]), springCfg);

  // Cyan-tinted glare for Void Signal aesthetic
  const gX    = useTransform(mx, [0, 1], [0, 100]);
  const gY    = useTransform(my, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gX}% ${gY}%, rgba(0,212,255,${glowStrength}) 0%, transparent 55%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return;
    mx.set((e.clientX - b.left) / b.width);
    my.set((e.clientY - b.top)  / b.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  // ── Gyroscope support (mobile / tablet) ─────────────
  useEffect(() => {
    if (typeof window === "undefined" || reduced) return;
    if (!("DeviceOrientationEvent" in window)) return;

    const listen = () => {
      const handler = (e: DeviceOrientationEvent) => {
        const beta  = Math.max(-45, Math.min(45, e.beta  ?? 0));
        const gamma = Math.max(-45, Math.min(45, e.gamma ?? 0));
        mx.set(gamma / 45 * 0.5 + 0.5);
        my.set(beta  / 45 * 0.5 + 0.5);
      };
      window.addEventListener("deviceorientation", handler, { passive: true });
      return () => window.removeEventListener("deviceorientation", handler);
    };

    // iOS 13+ requires explicit permission
    const DevOrient = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>;
    };

    let cleanup: (() => void) | undefined;
    if (typeof DevOrient.requestPermission === "function") {
      DevOrient.requestPermission()
        .then((res) => { if (res === "granted") cleanup = listen(); })
        .catch(() => {});
    } else {
      cleanup = listen();
    }

    return () => cleanup?.();
  }, [reduced, mx, my]);

  if (reduced) {
    return (
      <div ref={ref} className={`relative ${className}`} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
        willChange: "transform",
        ...style,
      }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
        style={{ background: glare }}
        aria-hidden
      />
    </motion.div>
  );
}
