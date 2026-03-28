"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Layers, X, Cpu } from "lucide-react";
import { SKILLS, AUTHOR_NAME } from "@/data/constants";
import { SKILL_ICON_MAP, CATEGORY_TEXT_COLOR } from "@/lib/icons";
import { useCursor } from "@/components/cursor/cursor-provider";

const DARK_CATEGORY_COLOR: Record<string, string> = {
  Design:   "#00d4ff",
  Motion:   "#fbbf24",
  Print:    "#f472b6",
  "3D":     "#a78bfa",
  Strategy: "#7fff8a",
  Digital:  "#8b8b9e",
};

const categories = Array.from(
  new Set(SKILLS.map((s) => s.category).filter((c): c is string => !!c))
);

export function Sidebar() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map((c) => [c, true]))
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCursor } = useCursor();

  const toggle = (cat: string) =>
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const panel = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--void-3)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Layers size={13} color="var(--text-muted)" strokeWidth={2} />
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-jetbrains), monospace",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Layers
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden"
          aria-label="Close layers panel"
          data-cursor="pointer"
          style={{
            padding: "0.25rem",
            borderRadius: "6px",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
          }}
        >
          <X size={13} strokeWidth={2} />
        </button>
      </div>

      {/* Skills tree */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
        {categories.map((cat) => {
          const skills = SKILLS.filter((s) => s.category === cat);
          const color = DARK_CATEGORY_COLOR[cat] ?? "#8b8b9e";
          return (
            <div key={cat} style={{ marginBottom: "2px" }}>
              <button
                type="button"
                onClick={() => toggle(cat)}
                onMouseEnter={() => setCursor("pointer")}
                onMouseLeave={() => setCursor("arrow")}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-jetbrains), monospace",
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "var(--glass-bg)")}
                onMouseOut={(e)  => (e.currentTarget.style.background = "transparent")}
              >
                <ChevronRight
                  size={11}
                  strokeWidth={2.5}
                  color="var(--text-muted)"
                  style={{
                    transition: "transform 0.15s",
                    transform: expanded[cat] ? "rotate(90deg)" : "none",
                  }}
                />
                {cat}
              </button>

              <AnimatePresence initial={false}>
                {expanded[cat] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    {skills.map((skill, i) => {
                      const Icon = SKILL_ICON_MAP[skill.icon] ?? Cpu;
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.625rem",
                            paddingLeft: "1.75rem",
                            paddingRight: "0.75rem",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            margin: "0 0.25rem",
                            borderRadius: "6px",
                          }}
                          className="group"
                        >
                          <Icon size={13} color={color} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                          <span
                            style={{
                              fontSize: "0.8125rem",
                              color: "var(--text-secondary)",
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {skill.name}
                          </span>
                          <span
                            style={{
                              fontSize: "0.625rem",
                              fontFamily: "var(--font-jetbrains), monospace",
                              color: "var(--text-muted)",
                              opacity: 0,
                              fontVariantNumeric: "tabular-nums",
                              transition: "opacity 0.15s",
                            }}
                            className="group-hover:opacity-100"
                          >
                            {skill.level}%
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "0.875rem 1rem",
          borderTop: "1px solid var(--glass-border)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            fontFamily: "var(--font-syne), system-ui",
            fontWeight: 600,
            color: "#f0f0f5",
          }}
        >
          {AUTHOR_NAME}
        </p>
        <p
          style={{
            margin: "0.2rem 0 0",
            fontSize: "0.6875rem",
            fontFamily: "var(--font-jetbrains), monospace",
            color: "var(--text-muted)",
          }}
        >
          Graphic Designer
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        onMouseEnter={() => setCursor("pointer")}
        onMouseLeave={() => setCursor("arrow")}
        className="lg:hidden"
        aria-label="Open layers panel"
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 50,
          padding: "0.5rem",
          borderRadius: "10px",
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          color: "var(--text-secondary)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Layers size={16} strokeWidth={2} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(6, 6, 8, 0.7)",
                zIndex: 40,
              }}
              className="lg:hidden"
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              style={{
                position: "fixed",
                left: 0, top: 0,
                height: "100%",
                width: "240px",
                zIndex: 50,
                borderRight: "1px solid var(--glass-border)",
                backdropFilter: "blur(20px)",
              }}
              className="lg:hidden"
            >
              {panel}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        initial={{ x: -240, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
        style={{
          position: "fixed",
          left: 0, top: 0,
          height: "100%",
          width: "240px",
          zIndex: 40,
          borderRight: "1px solid var(--glass-border)",
          backdropFilter: "blur(20px)",
        }}
        className="hidden lg:flex flex-col"
      >
        {panel}
      </motion.aside>
    </>
  );
}
