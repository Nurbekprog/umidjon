"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";

// Three.js Canvas is loaded client-side only — ssr:false prevents hydration issues
const HeroCanvas = dynamic(
  () => import("@/components/3d/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

interface WebGLProviderProps {
  children: ReactNode;
  /** Show the global 3D background canvas. Default: true */
  enabled?: boolean;
}

export function WebGLProvider({ children, enabled = true }: WebGLProviderProps) {
  return (
    <>
      {enabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
        >
          <HeroCanvas />
        </div>
      )}
      {children}
    </>
  );
}
