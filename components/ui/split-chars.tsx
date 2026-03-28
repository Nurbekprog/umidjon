"use client";

import React from "react";

interface SplitCharsProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Tag to render as */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Splits text into individually-animatable span characters.
 * Each char is wrapped in .char-wrap > .char-inner
 * for clip-path / y-transform reveals.
 * Spaces render as non-breaking spaces.
 * Supports ref forwarding for GSAP targeting.
 */
export const SplitChars = React.forwardRef<HTMLElement, SplitCharsProps>(
  function SplitChars({ text, className = "", style, as: Tag = "span" }, ref) {
    return (
      // @ts-expect-error dynamic tag + forwarded ref
      <Tag ref={ref} className={className} style={style} aria-label={text}>
        {text.split("").map((char, i) => (
          <span key={i} className="char-wrap" aria-hidden="true">
            <span className="char-inner">
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </Tag>
    );
  }
);
