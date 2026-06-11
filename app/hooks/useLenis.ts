'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Lightweight Lenis wrapper for buttery cinematic scroll + snap enhancement.
// Mobile optimized with syncTouch. Can be extended with GSAP ScrollTrigger.
export function useLenis(options?: { 
  lerp?: number; 
  duration?: number; 
  smoothTouch?: boolean;
  snap?: boolean;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: options?.lerp ?? 0.085,
      duration: options?.duration ?? 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Optional: simple snap points can be enhanced later with lenis/snap or GSAP
    if (options?.snap) {
      // Placeholder: native CSS snap still provides the "stop" feeling
      // Full custom snap would observe sections + lenis.scrollTo
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [options?.lerp, options?.duration, options?.smoothTouch, options?.snap]);

  const scrollTo = (target: string | number, options?: { offset?: number; duration?: number }) => {
    lenisRef.current?.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // nice cinematic ease
    });
  };

  return { lenis: lenisRef.current, scrollTo };
}
