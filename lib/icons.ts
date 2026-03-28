import {
  Pen,
  PenTool,
  Image,
  Play,
  Film,
  Layout,
  RotateCcw,
  Star,
  Monitor,
  Type,
  Palette,
  Globe,
  Cpu,
  type LucideIcon,
} from "lucide-react";

/** Maps skill `icon` field → Lucide component. Falls back to Cpu. */
export const SKILL_ICON_MAP: Record<string, LucideIcon> = {
  Pen,
  PenTool,
  Image,
  Play,
  Film,
  Layout,
  RotateCcw,
  Star,
  Monitor,
  Type,
  Palette,
  Globe,
  Cpu,
};

/** Tailwind text-color class per category — used in Sidebar */
export const CATEGORY_TEXT_COLOR: Record<string, string> = {
  Design: "text-blue-500",
  Motion: "text-amber-500",
  Print: "text-pink-500",
  "3D": "text-purple-500",
  Strategy: "text-green-500",
  Digital: "text-slate-500",
};

/** Tailwind badge classes per category — used in Skills card */
export const CATEGORY_BADGE_COLOR: Record<string, string> = {
  Design: "bg-blue-100 text-blue-700",
  Motion: "bg-amber-100 text-amber-700",
  Print: "bg-pink-100 text-pink-700",
  "3D": "bg-purple-100 text-purple-700",
  Strategy: "bg-green-100 text-green-700",
  Digital: "bg-slate-100 text-slate-600",
};
