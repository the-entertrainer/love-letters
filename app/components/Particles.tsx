'use client';

import { useEffect, useRef } from 'react';

// Subtle global particle field - always visible but very low key.
// Adapted from the "for-you" reference for the exact vertical reactive layout feel.
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrame: number;
    let particles: Array<{
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; hue: number;
    }> = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles = [];
      // Subtle density
      const count = Math.floor((window.innerWidth * window.innerHeight) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.2 + 0.7,
          speedX: (Math.random() - 0.5) * 0.28,
          speedY: (Math.random() - 0.5) * 0.28,
          opacity: Math.random() * 0.35 + 0.12,
          hue: 42 + Math.random() * 35, // warm gold / soft rose range for romantic feel
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.shadowBlur = 9;
        ctx.shadowColor = `hsla(${p.hue}, 75%, 78%, ${p.opacity * 0.7})`;

        ctx.fillStyle = `hsla(${p.hue}, 65%, 82%, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // tiny bright core
        ctx.fillStyle = `hsla(${p.hue}, 90%, 96%, ${p.opacity * 1.1})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener('resize', onResize);
    resize();
    createParticles();
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen', opacity: 0.65 }}
    />
  );
}
