import { AUTHOR_NAME, BEHANCE_URL, LINKEDIN_URL, AUTHOR_EMAIL, INSTAGRAM_URL } from "@/data/constants";

const SOCIAL_LINKS = [
  { label: "Behance",   href: BEHANCE_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Email",    href: `mailto:${AUTHOR_EMAIL}` },
];

export function Footer() {
  return (
    <footer
      style={{
        padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
        borderTop: "1px solid var(--border-subtle)",
      }}
      className="lg:pl-60"
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="sm:flex-row"
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-jetbrains), monospace",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} {AUTHOR_NAME}. All rights reserved.
        </p>
        <nav
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
          aria-label="Social links"
        >
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--font-jetbrains), monospace",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
