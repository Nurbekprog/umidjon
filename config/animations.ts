export const animationConfig = {
  duration: {
    fast: 0.3,
    base: 0.6,
    slow: 0.8,
    xslow: 1.2,
  },
  ease: {
    out: "power2.out",
    inOut: "power2.inOut",
    expo: "expo.out",
    back: "back.out(1.7)",
    elastic: "elastic.out(1, 0.4)",
  },
  scrollTrigger: {
    start: "top 85%",
    toggleActions: "play none none reverse" as const,
  },
  cursor: {
    arrow: { duration: 0.15, ease: "power2.out" },
    pointer: { duration: 0.1, ease: "power3.out" },
    grab: { duration: 0.2, ease: "power2.out" },
  },
} as const;
