"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

/**
 * Drifting indigo dots that repel from the cursor, with violet lines
 * connecting nearby dots — ported 1:1 from Portfolio_nextjs
 * ParticleBackground (vanilla canvas, no dependency).
 * Disabled under prefers-reduced-motion.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let animationId = 0;

    const createParticles = () => {
      const count = Math.floor((width * height) / 15000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // slightly brighter dots on the dark theme
      const dark = document.documentElement.classList.contains("dark");
      const dotRgb = dark ? "129, 140, 248" : "99, 102, 241";
      const lineRgb = dark ? "167, 139, 250" : "139, 92, 246";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // repel from the cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;

        // bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRgb}, ${p.opacity})`;
        ctx.fill();

        // connect nearby dots
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j];
          const dx2 = p.x - o.x;
          const dy2 = p.y - o.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(${lineRgb}, ${0.15 * (1 - dist2 / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.6 }}
      aria-hidden
    />
  );
}
