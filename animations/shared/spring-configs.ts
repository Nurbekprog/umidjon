/** Shared Framer Motion spring configs */
export const SPRING_SNAPPY = { type: "spring", stiffness: 400, damping: 30 } as const;
export const SPRING_SMOOTH = { type: "spring", stiffness: 200, damping: 25 } as const;
export const SPRING_ELASTIC = { type: "spring", stiffness: 280, damping: 18 } as const;
export const SPRING_SLOW   = { type: "spring", stiffness: 120, damping: 20 } as const;

/** GSAP ease shortcuts */
export const EASE_OUT  = "power3.out";
export const EASE_IN   = "power3.in";
export const EASE_EXPO = "expo.out";
export const EASE_BACK = "back.out(1.4)";
export const EASE_ELASTIC = "elastic.out(1, 0.4)";
