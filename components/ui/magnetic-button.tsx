"use client";

import React from "react";
import { useMagnetic } from "@/animations/shared/use-magnetic";
import { useCursorState } from "@/animations/shared/cursor-context";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  label?: string; // shown inside cursor ring
  type?: "button" | "submit";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  style,
  strength = 0.35,
  onClick,
  onMouseEnter: externalEnter,
  onMouseLeave: externalLeave,
  href,
  target,
  rel,
  label,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const { ref, handlers } = useMagnetic(strength);
  const { setState, setLabel } = useCursorState();

  const cursorHandlers = {
    onMouseEnter: () => {
      setState("hover");
      if (label) setLabel(label);
      externalEnter?.();
    },
    onMouseLeave: () => {
      setState("default");
      setLabel("");
      externalLeave?.();
    },
  };

  const combined = { ...handlers, ...cursorHandlers };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={style}
        {...combined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={className}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...combined}
    >
      {children}
    </button>
  );
}
