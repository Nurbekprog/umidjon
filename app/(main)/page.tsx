"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Social } from "@/components/sections/social";
import { Contact } from "@/components/sections/contact";
import { SectionErrorBoundary } from "@/components/error-boundary";

const Preloader = dynamic(
  () => import("@/components/layout/loader").then((m) => ({ default: m.Loader })),
  { ssr: false }
);

const ParticleCanvas = dynamic(
  () =>
    import("@/components/canvas/particle-canvas").then((m) => ({
      default: m.ParticleCanvas,
    })),
  { ssr: false }
);

export default function HomePage() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <ParticleCanvas />

      <SectionErrorBoundary sectionName="Hero">
        <Hero ready={ready} />
      </SectionErrorBoundary>
      <SectionErrorBoundary sectionName="About">
        <About />
      </SectionErrorBoundary>
      <SectionErrorBoundary sectionName="Skills">
        <Skills />
      </SectionErrorBoundary>
      <SectionErrorBoundary sectionName="Projects">
        <Projects />
      </SectionErrorBoundary>
      <SectionErrorBoundary sectionName="Experience">
        <Experience />
      </SectionErrorBoundary>
      <SectionErrorBoundary sectionName="Social">
        <Social />
      </SectionErrorBoundary>
      <SectionErrorBoundary sectionName="Contact">
        <Contact />
      </SectionErrorBoundary>
    </>
  );
}
