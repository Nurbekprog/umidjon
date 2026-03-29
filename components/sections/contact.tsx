"use client";

import { Globe, Linkedin, Mail, Phone, Send, Instagram } from "lucide-react";
import { useScrollReveal } from "@/animations/gsap/use-scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SplitChars } from "@/components/ui/split-chars";
import { useTextReveal } from "@/animations/gsap/use-text-reveal";
import { BEHANCE_URL, LINKEDIN_URL, AUTHOR_EMAIL, AUTHOR_PHONE, TELEGRAM_URL, TELEGRAM_HANDLE, INSTAGRAM_URL, INSTAGRAM_HANDLE, PINTEREST_URL } from "@/data/constants";
import { useCursorState } from "@/animations/shared/cursor-context";

function PinterestIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.099.12.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

type LinkEntry = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> | null;
  accent: string;
  accentBg: string;
  accentBorder: string;
};

const links: LinkEntry[] = [
  {
    label: "Behance",
    href: BEHANCE_URL,
    Icon: Globe,
    accent: "#f0f0f5",
    accentBg: "rgba(240, 240, 245, 0.06)",
    accentBorder: "rgba(240, 240, 245, 0.12)",
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    Icon: Linkedin,
    accent: "#00d4ff",
    accentBg: "rgba(0, 212, 255, 0.06)",
    accentBorder: "rgba(0, 212, 255, 0.15)",
  },
  {
    label: AUTHOR_EMAIL,
    href: `mailto:${AUTHOR_EMAIL}`,
    Icon: Mail,
    accent: "#7fff8a",
    accentBg: "rgba(127, 255, 138, 0.05)",
    accentBorder: "rgba(127, 255, 138, 0.15)",
  },
  {
    label: AUTHOR_PHONE,
    href: `tel:${AUTHOR_PHONE.replace(/\s/g, "")}`,
    Icon: Phone,
    accent: "#fbbf24",
    accentBg: "rgba(251, 191, 36, 0.05)",
    accentBorder: "rgba(251, 191, 36, 0.15)",
  },
  {
    label: TELEGRAM_HANDLE,
    href: TELEGRAM_URL,
    Icon: Send,
    accent: "#60a5fa",
    accentBg: "rgba(96, 165, 250, 0.05)",
    accentBorder: "rgba(96, 165, 250, 0.15)",
  },
  {
    label: `@${INSTAGRAM_HANDLE}`,
    href: INSTAGRAM_URL,
    Icon: Instagram,
    accent: "#f472b6",
    accentBg: "rgba(244, 114, 182, 0.05)",
    accentBorder: "rgba(244, 114, 182, 0.15)",
  },
  {
    label: "Pinterest",
    href: PINTEREST_URL,
    Icon: null,
    accent: "#e60023",
    accentBg: "rgba(230, 0, 35, 0.05)",
    accentBorder: "rgba(230, 0, 35, 0.15)",
  },
];

export function Contact() {
  const containerRef = useScrollReveal<HTMLElement>({ y: 30, start: "top 85%" });
  const line1Ref = useTextReveal({ trigger: "scroll", stagger: 0.03, duration: 0.75, y: 80 });
  const line2Ref = useTextReveal({ trigger: "scroll", stagger: 0.03, duration: 0.75, y: 80, delay: 0.1 });
  const line3Ref = useTextReveal({ trigger: "scroll", stagger: 0.03, duration: 0.75, y: 80, delay: 0.2 });
  const { setState } = useCursorState();

  return (
    <section
      id="contact"
      ref={containerRef}
      aria-label="Contact information"
      style={{
        padding: "5rem clamp(1.5rem, 5vw, 4rem) 8rem",
        position: "relative",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}>
        <span
          style={{
            fontSize: "0.6875rem",
            fontFamily: "var(--font-jetbrains), monospace",
            color: "var(--text-muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          07 / Contact
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
      </div>

      {/* Giant display heading */}
      <div style={{ marginBottom: "4rem", lineHeight: 1 }}>
        <SplitChars
          text="Let's"
          as="h2"
          ref={line1Ref as React.Ref<HTMLHeadingElement>}
          style={{
            fontFamily: "var(--font-syne), system-ui",
            fontSize: "var(--text-display)",
            fontWeight: 800,
            color: "#f0f0f5",
            letterSpacing: "-0.04em",
            margin: 0,
            lineHeight: 1,
            display: "block",
          }}
        />
        <SplitChars
          text="Work"
          as="span"
          ref={line2Ref as React.Ref<HTMLSpanElement>}
          style={{
            fontFamily: "var(--font-syne), system-ui",
            fontSize: "var(--text-display)",
            fontWeight: 800,
            color: "var(--signal-primary)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "block",
          }}
        />
        <SplitChars
          text="Together"
          as="span"
          ref={line3Ref as React.Ref<HTMLSpanElement>}
          style={{
            fontFamily: "var(--font-syne), system-ui",
            fontSize: "var(--text-display)",
            fontWeight: 800,
            color: "#f0f0f5",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            display: "block",
          }}
        />
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "1rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          maxWidth: "420px",
          marginBottom: "3rem",
        }}
      >
        Open to freelance and full-time opportunities. Feel free to reach out —
        I&apos;ll get back to you within 24 hours.
      </p>

      {/* Contact cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          maxWidth: "900px",
        }}
      >
        {links.map(({ label, href, Icon, accent, accentBg, accentBorder }) => (
          <MagneticButton
            key={label}
            href={href}
            target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
            rel="noopener noreferrer"
            label={label === AUTHOR_PHONE || label === AUTHOR_EMAIL ? undefined : label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 1.25rem",
              borderRadius: "var(--radius-card)",
              border: `1px solid ${accentBorder}`,
              background: accentBg,
              color: accent,
              fontSize: "0.8125rem",
              fontFamily: "var(--font-syne), system-ui",
              fontWeight: 600,
              textDecoration: "none",
              transition: "border-color 0.2s, background 0.2s",
              cursor: "pointer",
            } as React.CSSProperties}
          >
            {Icon ? <Icon size={16} strokeWidth={1.8} /> : <PinterestIcon size={16} />}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {label}
            </span>
          </MagneticButton>
        ))}
      </div>
    </section>
  );
}
