"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { User, FolderOpen, Cpu, Mail } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { useCursor } from "@/components/cursor/cursor-provider";

const NAV_ITEMS = [
  { label: "About",    Icon: User,       id: "about"    },
  { label: "Projects", Icon: FolderOpen, id: "projects" },
  { label: "Skills",   Icon: Cpu,        id: "skills"   },
  { label: "Contact",  Icon: Mail,       id: "contact"  },
];

function DockItem({
  item,
  mouseX,
}: {
  item: (typeof NAV_ITEMS)[0];
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { setCursor } = useCursor();

  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current;
    if (!el) return 9999;
    const bounds = el.getBoundingClientRect();
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-80, 0, 80], [40, 56, 40]);
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 180, damping: 12 });

  const opacityTransform = useTransform(distance, [-80, 0, 80], [0.5, 1, 0.5]);
  const iconOpacity = useSpring(opacityTransform, { mass: 0.1, stiffness: 180, damping: 12 });

  return (
    <motion.button
      ref={ref}
      onClick={() => scrollToSection(item.id)}
      style={{ width: size, height: size }}
      onMouseEnter={() => setCursor("pointer")}
      onMouseLeave={() => setCursor("arrow")}
      className="flex flex-col items-center justify-center gap-0.5 rounded-xl flex-shrink-0 transition-colors"
      aria-label={item.label}
    >
      <motion.div style={{ opacity: iconOpacity }}>
        <item.Icon
          className="w-5 h-5"
          strokeWidth={1.6}
          style={{ color: "var(--text-secondary)" }}
        />
      </motion.div>
      <span
        style={{
          fontSize: "0.5625rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-jetbrains), monospace",
          letterSpacing: "0.06em",
          lineHeight: 1,
        }}
      >
        {item.label}
      </span>
    </motion.button>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 28 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
      aria-label="Main navigation"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          padding: "0.5rem 0.75rem",
          borderRadius: "18px",
          background: "rgba(17, 17, 24, 0.85)",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <DockItem key={item.id} item={item} mouseX={mouseX} />
        ))}
      </motion.div>
    </motion.nav>
  );
}

export const Navbar = Dock;
