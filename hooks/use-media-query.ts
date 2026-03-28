"use client";

import { useEffect, useState } from "react";

/**
 * Reactive media query hook.
 *
 * @param query  e.g. "(max-width: 768px)" or "(pointer: fine)"
 * @returns      true when the query matches
 *
 * Usage:
 *   const isMobile = useMediaQuery("(max-width: 768px)");
 *   const isMouse  = useMediaQuery("(pointer: fine)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
