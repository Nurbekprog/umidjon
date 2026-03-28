"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, Globe, Linkedin, Mail, Instagram, Pen, PenTool, Film } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SplitChars } from "@/components/ui/split-chars";
import { SignalLine } from "@/components/ui/signal-line";
import { useTextReveal } from "@/animations/gsap/use-text-reveal";
import { gsap } from "@/animations/gsap/gsap-init";
import {
  AUTHOR_NAME,
  BEHANCE_URL,
  LINKEDIN_URL,
  AUTHOR_EMAIL,
  INSTAGRAM_URL,
} from "@/data/constants";
import { scrollToSection } from "@/lib/utils";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "30+", label: "Clients" },
  { value: "1+", label: "Yrs Exp" },
];

const capabilities = [
  {
    icon: Pen,
    title: "Brand Identity",
    desc: "Logo, palette & guidelines",
    color: "rgba(0, 212, 255, 0.06)",
    border: "rgba(0, 212, 255, 0.15)",
    iconColor: "#00d4ff",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    desc: "Figma prototypes & systems",
    color: "rgba(127, 255, 138, 0.05)",
    border: "rgba(127, 255, 138, 0.15)",
    iconColor: "#7fff8a",
  },
  {
    icon: Film,
    title: "Motion Graphics",
    desc: "After Effects & animation",
    color: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    iconColor: "#8b8b9e",
  },
];

interface HeroProps {
  /** fired after loader exits so we can trigger GSAP */
  ready?: boolean;
}

export function Hero({ ready = false }: HeroProps) {
  const nameRef1 = useTextReveal({ trigger: "mount", delay: 0, stagger: 0.04, duration: 0.8, y: 90 });
  const nameRef2 = useTextReveal({ trigger: "mount", delay: 0.18, stagger: 0.04, duration: 0.8, y: 90 });
  const subRefs = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  // Fade-in sub-elements after name reveal
  useEffect(() => {
    if (!ready) return;
    if (!subRefs.current || !rightRef.current) return;

    const subs = subRefs.current.querySelectorAll<HTMLElement>("[data-reveal]");
    gsap.set(subs, { y: 20, opacity: 0 });
    gsap.to(subs, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.55,
      ease: "power3.out",
    });

    gsap.set(rightRef.current, { x: 40, opacity: 0 });
    gsap.to(rightRef.current, { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" });
  }, [ready]);

  return (
    <section
      id="home"
      aria-label="Introduction"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        paddingTop: "5rem",
        paddingBottom: "4rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="lg:grid-cols-[60%_40%]"
        >
          {/* ── LEFT: Content ───────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Status badge */}
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.375rem 0.875rem",
                  borderRadius: "999px",
                  background: "rgba(127, 255, 138, 0.08)",
                  border: "1px solid rgba(127, 255, 138, 0.20)",
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-jetbrains), monospace",
                  color: "#7fff8a",
                  letterSpacing: "0.08em",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#7fff8a",
                    animation: "pulse 2s infinite",
                    display: "inline-block",
                  }}
                />
                AVAILABLE FOR WORK
              </span>
            </div>

            {/* Name — split char reveal */}
            <div style={{ lineHeight: 1, marginTop: "0.5rem" }}>
              <SplitChars
                text="Umidjon"
                as="h1"
                ref={nameRef1 as React.Ref<HTMLHeadingElement>}
                className="block"
                style={{
                  fontFamily: "var(--font-syne), system-ui",
                  fontSize: "var(--text-display)",
                  fontWeight: 800,
                  color: "#f0f0f5",
                  letterSpacing: "-0.04em",
                  margin: 0,
                  lineHeight: 1.0,
                }}
              />
              <SplitChars
                text="Haydarov"
                as="span"
                ref={nameRef2 as React.Ref<HTMLSpanElement>}
                className="block text-gradient-signal"
                style={{
                  fontFamily: "var(--font-syne), system-ui",
                  fontSize: "var(--text-display)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                }}
              />
            </div>

            {/* Sub-elements (fade in after name) */}
            <div
              ref={subRefs}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {/* Role */}
              <p
                data-reveal
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "var(--text-sm)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                Graphic Designer &amp; Visual Artist
              </p>

              {/* Stats row */}
              <div
                data-reveal
                style={{ display: "flex", alignItems: "center", gap: "0", flexWrap: "wrap" }}
              >
                {stats.map((s, i) => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", padding: "0 1.25rem 0 0" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-syne), system-ui",
                          fontSize: "clamp(1.5rem, 3vw, 2rem)",
                          fontWeight: 700,
                          color: "#f0f0f5",
                          lineHeight: 1,
                        }}
                      >
                        {s.value}
                      </span>
                      <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "0.2rem", fontFamily: "var(--font-jetbrains), monospace" }}>
                        {s.label}
                      </span>
                    </div>
                    {i < stats.length - 1 && (
                      <div style={{ width: "1px", height: "32px", background: "var(--border-subtle)", marginRight: "1.25rem" }} />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div
                data-reveal
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}
              >
                <MagneticButton
                  onClick={() => scrollToSection("projects")}
                  label="View"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.65rem 1.5rem",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--signal-primary)",
                    color: "#000",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    border: "none",
                    fontFamily: "var(--font-syne), system-ui",
                    transition: "opacity 0.2s, transform 0.2s",
                  } as React.CSSProperties}
                >
                  View Projects <ArrowRight size={14} />
                </MagneticButton>

                <MagneticButton
                  onClick={() => scrollToSection("contact")}
                  label="Contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.65rem 1.5rem",
                    borderRadius: "var(--radius-pill)",
                    background: "transparent",
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    border: "1px solid var(--glass-border)",
                    fontFamily: "var(--font-syne), system-ui",
                    transition: "border-color 0.2s, background 0.2s",
                  } as React.CSSProperties}
                >
                  Contact Me
                </MagneticButton>

                {/* Social icons — MagneticButton for premium micro-interaction */}
                <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto" }}>
                  {[
                    { href: BEHANCE_URL, icon: Globe, label: "Behance" },
                    { href: LINKEDIN_URL, icon: Linkedin, label: "Linkedin" },
                    { href: INSTAGRAM_URL, icon: Instagram, label: "Instagram" },
                    { href: `mailto:${AUTHOR_EMAIL}`, icon: Mail, label: "Email" },
                  ].map(({ href, icon: Icon, label }) => (
                    <MagneticButton
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      strength={0.5}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "36px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--glass-border)",
                        color: "var(--text-secondary)",
                        transition: "border-color 0.2s, color 0.2s",
                        background: "transparent",
                      } as React.CSSProperties}
                    >
                      <Icon size={15} strokeWidth={1.8} aria-label={label} />
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Avatar + Capabilities ────────── */}
          <div
            ref={rightRef}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem", opacity: 0 }}
          >
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  position: "relative",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  padding: "2px",
                  background: "linear-gradient(135deg, var(--signal-primary), transparent)",
                  flexShrink: 0,
                }}
              >
                <div style={{ borderRadius: "50%", overflow: "hidden", width: "100%", height: "100%", position: "relative" }}>
                  <Image
                    src="/avatar.jpeg"
                    alt={AUTHOR_NAME}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", margin: 0, fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.06em" }}>
                  Based in
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: "0.2rem 0 0", fontWeight: 500 }}>
                  Tashkent, Uzbekistan
                </p>
              </div>
            </div>

            {/* Capability cards */}
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    padding: "1rem 1.125rem",
                    borderRadius: "var(--radius-card)",
                    background: cap.color,
                    border: `1px solid ${cap.border}`,
                    transition: "border-color 0.25s, background 0.25s",
                  }}
                >
                  <Icon size={16} color={cap.iconColor} strokeWidth={1.8} style={{ marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: "0.8125rem", fontWeight: 700, color: "#f0f0f5", fontFamily: "var(--font-syne), system-ui" }}>
                      {cap.title}
                    </p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.6875rem", color: "var(--text-muted)" }}>
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom signal line */}
      <SignalLine
        className="absolute bottom-0 left-0 right-0"
        style={{ opacity: 0.5 } as React.CSSProperties}
      />
    </section>
  );
}
