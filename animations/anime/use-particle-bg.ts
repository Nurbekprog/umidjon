"use client";

import { useEffect, useRef } from "react";

interface ParticleConfig {
  count?: number;
  color?: string;
  lineColor?: string;
  connectionRadius?: number;
  speed?: number;
}

/**
 * Anime.js-powered 2D canvas particle network.
 * Much lighter than Three.js — no WebGL, pure Canvas 2D.
 */
export function useParticleBg(config: ParticleConfig = {}) {
  const {
    count,
    color = "#00d4ff",
    lineColor = "rgba(0, 212, 255, 0.12)",
    connectionRadius = 120,
    speed = 0.35,
  } = config;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const isMobile = w < 768;
    const particleCount = count ?? (isMobile ? 30 : 60);

    type Particle = {
      x: number; y: number; vx: number; vy: number; radius: number; opacity: number;
    };

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const spd = speed * (0.5 + Math.random() * 0.5);
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        radius: 1.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4,
      };
    });

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      // Draw connection lines
      ctx.globalAlpha = 1;
      const r2 = connectionRadius * connectionRadius;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (dx * dx + dy * dy < r2) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            const alpha = (1 - dist / connectionRadius) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [count, color, lineColor, connectionRadius, speed]);

  return canvasRef;
}
