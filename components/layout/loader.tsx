"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/gsap/gsap-init";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const locationRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only show loader once per session
    if (sessionStorage.getItem("umidjon-loaded")) {
      setVisible(false);
      onComplete?.();
      return;
    }

    if (reduced) {
      sessionStorage.setItem("umidjon-loaded", "1");
      setVisible(false);
      onComplete?.();
      return;
    }

    const line = lineRef.current;
    const logo = logoRef.current;
    const subtitle = subtitleRef.current;
    const location = locationRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!line || !logo || !subtitle || !location || !top || !bottom) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("umidjon-loaded", "1");
        setVisible(false);
        onComplete?.();
      },
    });

    // 1. Draw the signal line L→R
    const len = line.getTotalLength?.() ?? 400;
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });

    tl.to(line, {
      strokeDashoffset: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // 2. Logo clip-path reveal (center split)
    gsap.set(logo, { clipPath: "inset(50% 0 50% 0)", opacity: 1 });
    tl.to(
      logo,
      { clipPath: "inset(0% 0 0% 0)", duration: 0.38, ease: "expo.out" },
      "-=0.05"
    );

    // 3. Subtitle letter-spacing collapse
    gsap.set(subtitle, { opacity: 0, letterSpacing: "0.3em" });
    tl.to(
      subtitle,
      { opacity: 1, letterSpacing: "0.10em", duration: 0.3, ease: "power2.out" },
      "-=0.1"
    );

    // 4. Location tag
    gsap.set(location, { opacity: 0 });
    tl.to(location, { opacity: 1, duration: 0.2, ease: "none" }, "+=0.05");

    // 5. Hold briefly
    tl.to({}, { duration: 0.2 });

    // 6. Curtain split exit
    tl.to(
      [top, bottom],
      {
        yPercent: (i) => (i === 0 ? -100 : 100),
        duration: 0.45,
        ease: "power3.inOut",
        stagger: 0,
      },
      "+=0.05"
    );
  }, [reduced, onComplete]);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Loading portfolio"
      style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "all" }}
    >
      {/* Top curtain */}
      <div
        ref={topRef}
        className="loader-panel-top"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
      >
        {/* Signal line SVG */}
        <svg
          width="320"
          height="2"
          viewBox="0 0 320 2"
          fill="none"
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <line
            ref={lineRef}
            x1="0" y1="1" x2="320" y2="1"
            stroke="#00d4ff"
            strokeWidth="1.5"
          />
        </svg>

        {/* Logo */}
        <div
          ref={logoRef}
          style={{
            opacity: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-syne), system-ui",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 800,
              color: "#f0f0f5",
              letterSpacing: "-0.04em",
              display: "block",
              lineHeight: 1,
            }}
          >
            Umidjon
          </span>

          <span
            ref={subtitleRef}
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.6875rem",
              color: "#8b8b9e",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            GRAPHIC DESIGNER
          </span>
        </div>

        {/* Location — bottom right */}
        <span
          ref={locationRef}
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "0.6875rem",
            color: "#4a4a5c",
            letterSpacing: "0.08em",
          }}
        >
          Tashkent, UZ
        </span>
      </div>

      {/* Bottom curtain */}
      <div ref={bottomRef} className="loader-panel-bottom" />
    </div>
  );
}
