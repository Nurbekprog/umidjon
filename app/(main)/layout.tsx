"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { Sidebar } from "@/components/layout/sidebar";
import { Dock } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { useLenis } from "@/animations/gsap/use-lenis";

const MacCursor = dynamic(
  () => import("@/components/cursor/mac-cursor").then((m) => ({ default: m.MacCursor })),
  { ssr: false }
);

function LayoutShell({ children }: { children: ReactNode }) {
  useLenis();

  return (
    <div className="signal-grid min-h-screen" style={{ background: "var(--void-1)" }}>
      <GrainOverlay />
      <MacCursor />
      <Sidebar />

      <main className="lg:pl-60" style={{ position: "relative", zIndex: 2 }}>
        {children}
      </main>

      <ScrollProgress />
      <Footer />
      <Dock />
    </div>
  );
}

export default function MainLayout({ children }: { children: ReactNode }) {
  return <LayoutShell>{children}</LayoutShell>;
}
