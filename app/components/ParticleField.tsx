'use client';

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// Romantic particle / VFX field.
// Uses canvas-confetti for reliable bursts + a lightweight 2D particle system for ambient floating motes.
// Trigger via exported functions from anywhere (play song, expand letter, finale).
export function triggerHeartBurst(x?: number, y?: number) {
  const origin = x && y ? { x, y } : undefined;
  confetti({
    particleCount: 42,
    spread: 70,
    origin: origin || { y: 0.6 },
    colors: ['#f4d35e', '#f472b6', '#34d399'],
    ticks: 90,
  });
  // Second softer burst
  setTimeout(() => {
    confetti({
      particleCount: 28,
      angle: 60,
      spread: 55,
      origin: origin || { y: 0.7 },
      colors: ['#818cf8', '#f8f8fa'],
    });
  }, 140);
}

export function triggerLetterOpenVFX() {
  // Gentle ambient celebration on expand
  confetti({
    particleCount: 18,
    spread: 90,
    origin: { y: 0.75 },
    colors: ['#f4d35e', '#ffffff'],
    ticks: 60,
    scalar: 0.8,
  });
}

interface ParticleFieldProps {
  className?: string;
}

export default function ParticleField({ className = '' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number}>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed ambient floating motes (liquid / romantic dust)
    particlesRef.current = Array.from({ length: 38 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.9,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.18 - 0.03,
      size: Math.random() * 2.2 + 0.7,
      alpha: Math.random() * 0.55 + 0.25,
      hue: 48 + Math.random() * 28, // warm gold-rose range
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle wrap + drift
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height * 0.92;
        if (p.y > canvas.height * 0.94) p.y = 10;

        ctx.save();
        ctx.fillStyle = `hsla(${p.hue}, 82%, 78%, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow
        ctx.fillStyle = `hsla(${p.hue}, 70%, 88%, ${p.alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-overlay ${className}`}
      style={{ zIndex: 2 }}
    />
  );
}
